#!/usr/bin/env python3
"""The Third Hustle - hourly play tracker (runs on the Lightsail server).

Every hour during the market day it re-prices the 10 plays (the 9 daily spreads and the
Friday play) and writes spread-desk/hourly.json in the Opty-Data repo:

  * option price move: the spread's current mid price vs the morning quote (day) and vs
    the last reading (hour). This is the price of the options, not anyone's P&L.
  * fund move: SPY / QQQ / DIA vs yesterday's close (day) and vs the last reading (hour).
  * chance of winning now (1 - |short deltas|) vs the morning and the last reading, and a
    plain signal: better / steady / worse.

It sends an ntfy alert only when a play's odds are getting worse.

Runs either on the Lightsail server (Alpaca data) or from a Claude scheduled task that
saves Robinhood/Webull quotes with rh_to_snap.py and passes them with --snapshots.
Setup (server):  see SETUP in the kit README. Settings come from ~/hustle/.env:
  ALPACA_KEY=...  ALPACA_SECRET=...  REPO_DIR=/home/ubuntu/Opty-Data
  NTFY_TOPIC=...  (optional) OPTIONS_FEED=opra   STOCK_FEED=sip   PUSH=1
Cron (server clock in UTC is fine, the script checks New York time itself):
  35 * * * 1-5  /usr/bin/python3 ~/hustle/hustle_hourly.py >> ~/hustle/hourly.log 2>&1

Flags: --force (run outside market hours), --dry (don't commit/push or alert),
       --snapshots FILE (use saved Alpaca responses instead of calling Alpaca; for tests).
Python 3.8+, standard library only.
"""
import json, math, os, subprocess, sys, urllib.parse, urllib.request
from datetime import date, datetime, timedelta, timezone

try:
    from zoneinfo import ZoneInfo
    ET = ZoneInfo("America/New_York")
except Exception:  # very old Python: fall back to a fixed EST/EDT guess
    ET = None

HOLIDAYS = {"2026-11-26", "2026-12-25", "2027-01-01", "2027-01-18", "2027-02-15", "2027-03-26",
            "2027-05-31", "2027-06-18", "2027-07-05", "2027-09-06", "2027-11-25", "2027-12-24"}
EARLY_CLOSE = {"2026-11-27": 13, "2026-12-24": 13, "2027-11-26": 13}  # last hour to run (ET)
HOME = os.path.expanduser("~/hustle")
ARGS = set(sys.argv[1:])
SIGNAL_PTS = 1.0          # odds change (points) that counts as better / worse
ALERT_HOUR_DROP = 3.0     # alert when odds fall this many points in one hour
ALERT_DAY_DROP = 5.0      # ... or this far below the morning (then every further 5)
ALERT_ROOM_PCT = 2.0      # ... or the fund is within this % of a short strike


def now_et():
    u = datetime.now(timezone.utc)
    if ET:
        return u.astimezone(ET)
    # crude fallback: EDT from 2nd Sun Mar to 1st Sun Nov
    off = -4 if 3 < u.month < 11 else -5
    return u + timedelta(hours=off)


def load_env():
    env = {}
    p = os.path.join(HOME, ".env")
    if os.path.exists(p):
        for line in open(p):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip().strip('"').strip("'")
    env.update({k: v for k, v in os.environ.items() if k in (
        "ALPACA_KEY", "ALPACA_SECRET", "REPO_DIR", "NTFY_TOPIC", "OPTIONS_FEED", "STOCK_FEED", "PUSH")})
    return env


def log(*a):
    print(datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), *a, flush=True)


def sh(cmd, cwd):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True)
    if r.returncode:
        raise RuntimeError(f"{' '.join(cmd)} failed: {r.stderr.strip() or r.stdout.strip()}")
    return r.stdout.strip()


# ---------------------------------------------------------------- market data (Alpaca)
def alpaca_get(env, path, params):
    url = "https://data.alpaca.markets" + path + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"APCA-API-KEY-ID": env["ALPACA_KEY"],
                                               "APCA-API-SECRET-KEY": env["ALPACA_SECRET"],
                                               "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def fetch_snapshots(env, occs, funds):
    """Returns ({occ: {bid, ask, mid, delta, iv}}, {fund: {price, prev_close}})."""
    if "--snapshots" in sys.argv:
        raw = json.load(open(sys.argv[sys.argv.index("--snapshots") + 1]))
        opt_raw, stk_raw = raw["options"], raw["stocks"]
    else:
        opt_raw, token = {}, None
        while True:
            p = {"symbols": ",".join(occs), "feed": env.get("OPTIONS_FEED", "opra"), "limit": 1000}
            if token:
                p["page_token"] = token
            r = alpaca_get(env, "/v1beta1/options/snapshots", p)
            opt_raw.update(r.get("snapshots") or {})
            token = r.get("next_page_token")
            if not token:
                break
        stk_raw = alpaca_get(env, "/v2/stocks/snapshots",
                             {"symbols": ",".join(funds), "feed": env.get("STOCK_FEED", "sip")})
    opts = {}
    for occ, s in opt_raw.items():
        q = s.get("latestQuote") or {}
        bid, ask = float(q.get("bp") or 0), float(q.get("ap") or 0)
        last = float((s.get("latestTrade") or {}).get("p") or 0)
        mid = (bid + ask) / 2 if bid > 0 and ask > 0 else (ask or bid or last)
        g = s.get("greeks") or {}
        opts[occ] = dict(bid=bid, ask=ask, mid=mid, delta=g.get("delta"), iv=s.get("impliedVolatility"))
    stocks = {}
    for tk, s in stk_raw.items():
        price = float((s.get("latestTrade") or {}).get("p") or (s.get("dailyBar") or {}).get("c") or 0)
        prev = float((s.get("prevDailyBar") or {}).get("c") or 0)
        stocks[tk] = dict(price=price, prev_close=prev)
    return opts, stocks


# ---------------------------------------------------------------- option math
def ncdf(x):
    return 0.5 * (1 + math.erf(x / math.sqrt(2)))


def bs_delta(S, K, T, iv, typ, r=0.04):
    if not (S > 0 and K > 0 and T > 0 and iv and iv > 0):
        return None
    d1 = (math.log(S / K) + (r + iv * iv / 2) * T) / (iv * math.sqrt(T))
    return ncdf(d1) if typ == "call" else ncdf(d1) - 1


def bs_price(S, K, T, iv, typ, r=0.04):
    d1 = (math.log(S / K) + (r + iv * iv / 2) * T) / (iv * math.sqrt(T))
    d2 = d1 - iv * math.sqrt(T)
    if typ == "call":
        return S * ncdf(d1) - K * math.exp(-r * T) * ncdf(d2)
    return K * math.exp(-r * T) * ncdf(-d2) - S * ncdf(-d1)


def implied_vol(S, K, T, price, typ):
    if not (S > 0 and K > 0 and T > 0 and price > 0):
        return None
    lo, hi = 0.01, 3.0
    for _ in range(60):
        m = (lo + hi) / 2
        if bs_price(S, K, T, m, typ) > price:
            hi = m
        else:
            lo = m
    return (lo + hi) / 2


def leg_delta(q, S, K, T, typ):
    if q.get("delta") is not None:
        return float(q["delta"])
    iv = q.get("iv") or implied_vol(S, K, T, q.get("mid") or 0, typ)
    return bs_delta(S, K, T, iv, typ)


def occ_symbol(tk, expiry, typ, strike):
    d = date.fromisoformat(expiry)
    return f"{tk}{d:%y%m%d}{'P' if typ == 'put' else 'C'}{int(round(strike * 1000)):08d}"


# ---------------------------------------------------------------- plays
def plays_from(data):
    """The 9 daily spreads plus the Friday play(s). Returns (plays, weekly_status)."""
    out = []
    for t in data.get("trades", []):
        out.append(dict(t, expiry=data["expiry"], base_asof=data["asof"], group="daily"))
    w = data.get("weekly") or {}
    if not w:
        wstat = dict(status="missing", text="Friday play not posted yet")
    elif w.get("sitOut"):
        wstat = dict(status="none", friday=w.get("friday"), text="No Friday insurance this week")
    elif w.get("preview"):
        wstat = dict(status="preview", friday=w.get("friday"),
                     text="Friday play is a preview until Friday 3:40 PM ET")
    else:
        wstat = dict(status="live", friday=w.get("friday"), expiry=w.get("expiry"))
        for t in w.get("trades", []):
            out.append(dict(t, expiry=w["expiry"], base_asof=w.get("asof"), group="weekly"))
    return out, wstat


def spread_value(t, opts):
    """Current mid price of the whole spread (what it would cost to close it), and the
    morning price from data.json. Credit spreads: sells minus buys. Debit: buys minus sells."""
    sign = -1 if t.get("debit") else 1
    now = base = 0.0
    for l in t["legs"]:
        q = opts.get(l["occ"])
        if not q or not q["mid"]:
            return None, None
        s = 1 if l["side"] == "sell" else -1
        now += sign * s * q["mid"]
        base += sign * s * l["px"]
    return now, base


def odds_now(t, opts, S, T):
    if t["kind"] == "call_debit":
        ds = [leg_delta(opts[l["occ"]], S, l["strike"], T, "call") for l in t["legs"]]
        if any(d is None for d in ds):
            return None
        return max(0.0, min(1.0, sum(ds) / len(ds)))  # ~ chance of finishing above the middle
    p = 1.0
    for l in t["legs"]:
        if l["side"] == "sell":
            d = leg_delta(opts[l["occ"]], S, l["strike"], T, l["type"])
            if d is None:
                return None
            p -= abs(d)
    return max(0.0, min(1.0, p))


def pct(a, b):
    return round((a / b - 1) * 100, 2) if a is not None and b else None


def signal_for(chg):
    if chg is None:
        return "steady"
    return "better" if chg >= SIGNAL_PTS else "worse" if chg <= -SIGNAL_PTS else "steady"


SIG_TEXT = {"better": "Odds getting better", "steady": "Odds holding steady", "worse": "Odds getting worse"}


def build(data, prev, opts, stocks, asof_utc):
    plays, wstat = plays_from(data)
    prev_plays = {p["id"]: p for p in (prev or {}).get("plays", [])} if prev and prev.get("date") == data["date"] else {}
    prev_funds = (prev or {}).get("funds", {}) if prev and prev.get("date") == data["date"] else {}
    funds = {}
    for tk, s in stocks.items():
        pf = prev_funds.get(tk, {})
        funds[tk] = dict(price=round(s["price"], 2), prev_close=s["prev_close"],
                         day_pct=pct(s["price"], s["prev_close"]),
                         hour_pct=pct(s["price"], pf.get("price")))
    rows = []
    for t in plays:
        S = stocks.get(t["tk"], {}).get("price")
        exp_close = datetime.fromisoformat(t["expiry"] + "T21:00:00+00:00")
        T = max((exp_close - asof_utc).total_seconds() / (365 * 86400), 1 / 365 / 24)
        now, base = spread_value(t, opts)
        o = odds_now(t, opts, S, T) if now is not None else None
        o = round(o * 100, 1) if o is not None else None
        p = prev_plays.get(t["id"], {})
        morning = t.get("odds")
        prev_odds = p.get("odds_now")
        hour_chg = round(o - prev_odds, 1) if o is not None and prev_odds is not None else None
        day_chg = round(o - morning, 1) if o is not None and morning is not None else None
        sig = signal_for(hour_chg if hour_chg is not None else day_chg)
        shorts = [l["strike"] for l in t["legs"] if l["side"] == "sell"]
        room = None
        if S and shorts:
            room = round(min(abs(S - k) / S * 100 for k in shorts), 2)
        if o is None:
            sig, text = "steady", "No live quote this hour"
        else:
            arrow = f"{morning:.0f}% this morning → {o:.0f}% now" if morning is not None else f"{o:.0f}% now"
            hc = f" ({hour_chg:+.1f} this hour)" if hour_chg is not None else ""
            text = f"{SIG_TEXT[sig]}: {arrow}{hc}"
        rows.append(dict(
            id=t["id"], group=t["group"], tk=t["tk"], lv=t["lv"], kind=t["kind"],
            spread_morning=round(base, 2) if base is not None else None,
            spread_now=round(now, 2) if now is not None else None,
            day_pct=pct(now, base),
            hour_pct=pct(now, p.get("spread_now")),
            odds_morning=morning, odds_prev=prev_odds, odds_now=o,
            odds_hour_chg=hour_chg, odds_day_chg=day_chg,
            signal=sig, signal_text=text, room_pct=room,
            fund_day_pct=funds.get(t["tk"], {}).get("day_pct"),
            fund_hour_pct=funds.get(t["tk"], {}).get("hour_pct")))
    readings = list((prev or {}).get("readings", [])) if prev_plays else []
    readings.append(dict(asof=asof_utc.strftime("%Y-%m-%dT%H:%M:%SZ"),
                         odds={r["id"]: r["odds_now"] for r in rows},
                         spread={r["id"]: r["spread_now"] for r in rows},
                         funds={k: v["price"] for k, v in funds.items()}))
    up = sum(r["signal"] == "better" for r in rows)
    dn = sum(r["signal"] == "worse" for r in rows)
    return dict(v=1, date=data["date"], asof=asof_utc.strftime("%Y-%m-%dT%H:%M:%SZ"),
                morning_asof=data["asof"], expiry=data["expiry"], funds=funds, plays=rows,
                weekly=wstat, summary=dict(better=up, steady=len(rows) - up - dn, worse=dn,
                                           total=len(rows) + (0 if wstat["status"] == "live" else 1)),
                readings=readings[-12:])


# ---------------------------------------------------------------- alerts (only when odds worsen)
def alerts_for(out, prev):
    """Alert state lives in hourly.json itself, so it survives on any machine."""
    st = (prev or {}).get("alert_state") or {}
    if st.get("date") != out["date"]:
        st = {"date": out["date"], "low": {}, "room": {}}
    msgs = []
    for r in out["plays"]:
        if r["odds_now"] is None or r["signal"] != "worse":
            continue
        why = []
        if r["odds_hour_chg"] is not None and r["odds_hour_chg"] <= -ALERT_HOUR_DROP:
            why.append(f"{r['odds_hour_chg']:+.1f} pts this hour")
        if r["odds_morning"] is not None:
            floor = st["low"].get(r["id"], r["odds_morning"])
            if r["odds_now"] <= floor - ALERT_DAY_DROP:
                why.append(f"{r['odds_now'] - r['odds_morning']:+.1f} pts since morning")
                st["low"][r["id"]] = r["odds_now"]
        if r["room_pct"] is not None and r["room_pct"] <= ALERT_ROOM_PCT and not st["room"].get(r["id"]):
            why.append(f"{r['tk']} only {r['room_pct']:.1f}% from the short strike")
            st["room"][r["id"]] = True
        if why:
            msgs.append(f"{r['id']}: {r['odds_now']:.0f}% odds ({', '.join(why)})")
    out["alert_state"] = st
    return msgs


def ntfy(env, title, body):
    topic = env.get("NTFY_TOPIC")
    if not topic:
        return
    req = urllib.request.Request("https://ntfy.sh/" + topic, data=body.encode(), method="POST",
                                 headers={"Title": title, "Tags": "chart_with_downwards_trend",
                                          "Click": "https://claude.ai/artifact/QvWx1dRBDA2wgdBQvmU3jv"})
    try:
        urllib.request.urlopen(req, timeout=20).read()
    except Exception as e:
        log("ntfy failed:", e)


# ---------------------------------------------------------------- main
def main():
    env = load_env()
    et = now_et()
    today = et.strftime("%Y-%m-%d")
    last_hour = EARLY_CLOSE.get(today, 15)
    in_hours = et.weekday() < 5 and today not in HOLIDAYS and (
        (et.hour == 10 and et.minute >= 20) or 11 <= et.hour <= last_hour)
    if not in_hours and "--force" not in ARGS:
        log("outside market hours; nothing to do")
        return
    repo = env.get("REPO_DIR") or os.path.expanduser("~/Opty-Data")
    if "--dry" not in ARGS and "--snapshots" not in sys.argv:
        sh(["git", "pull", "--rebase", "-q"], repo)
    data = json.load(open(os.path.join(repo, "spread-desk", "data.json")))
    if data.get("date") != today and "--force" not in ARGS:
        log("morning plays for", today, "not posted yet (data.json is", data.get("date"), "); skipping")
        return
    hp = os.path.join(repo, "spread-desk", "hourly.json")
    prev = json.load(open(hp)) if os.path.exists(hp) else None
    plays, _ = plays_from(data)
    for t in plays:
        for l in t["legs"]:
            l["occ"] = occ_symbol(t["tk"], t["expiry"], l["type"], l["strike"])
    occs = sorted({l["occ"] for t in plays for l in t["legs"]})
    opts, stocks = fetch_snapshots(env, occs, ["SPY", "QQQ", "DIA"])
    missing = [o for o in occs if o not in opts]
    if missing:
        log("no quote for", ", ".join(missing))
    out = build(data, prev, opts, stocks, datetime.now(timezone.utc))
    out["missing_quotes"] = missing
    msgs = alerts_for(out, prev)
    json.dump(out, open(hp, "w"), indent=1)
    s = out["summary"]
    log(f"wrote hourly.json: {s['better']} better, {s['steady']} steady, {s['worse']} worse; weekly {out['weekly']['status']}")
    if "--dry" in ARGS:
        print(json.dumps(out, indent=1)[:4000])
        if msgs:
            print("ALERT:", msgs)
        return
    if env.get("PUSH", "1") == "1":
        sh(["git", "add", "spread-desk/hourly.json"], repo)
        if sh(["git", "status", "--porcelain", "spread-desk/hourly.json"], repo):
            sh(["git", "commit", "-q", "-m", f"hourly {out['asof']}"], repo)
            try:
                sh(["git", "push", "-q"], repo)
            except RuntimeError:
                sh(["git", "pull", "--rebase", "-q"], repo)
                sh(["git", "push", "-q"], repo)
            log("pushed")
    if msgs:
        ntfy(env, f"Third Hustle: odds slipping on {len(msgs)} play{'s' if len(msgs) > 1 else ''}",
             "\n".join(msgs))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        log("ERROR:", e)
        env = load_env()
        if "--dry" not in ARGS:
            ntfy(env, "Third Hustle hourly check failed", str(e)[:300])
        sys.exit(1)
