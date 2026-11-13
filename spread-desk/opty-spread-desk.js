/* Index Insurance (formerly Opty Spread Desk) custom element. Tag name: opty-spread-desk. Reads data.json next to this file. */
(function(){
if(customElements.get("opty-spread-desk"))return;
var SRC=(document.currentScript&&document.currentScript.src)||"https://nohs10.github.io/Opty-Data/spread-desk/opty-spread-desk.js";
var DATA_URL=new URL("data.json",SRC).href;
var CSS="\n/* Layout: one bright column \u2014 header + prices, today's pick, Friday play + mood, 3x3 board, tap any card for a win-zone sheet */\n:host{display:block;\n  --bg:#f4f7fb; --card:#ffffff; --ink:#0e1b2c; --soft:#5d6b7d; --line:#e3e9f1;\n  --blue:#2f6bff; --blue-soft:#e8efff; --g:#16a457; --g-soft:#e3f6ec; --y:#e0a400; --y-soft:#fff5d6; --r:#ec4335; --r-soft:#fde7e5;\n  --purple:#6a4cf0; --purple-soft:#efebff;\n  --head:\"Bricolage Grotesque\",\"DM Sans\",system-ui,sans-serif; --body:\"DM Sans\",system-ui,-apple-system,\"Segoe UI\",sans-serif;\n  color-scheme:light;\n}\n*{box-sizing:border-box}\n.shell{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.45}\n.wrap{max-width:980px;margin:0 auto;padding-block:22px 40px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:18px}\nh1,h2,h3{font-family:var(--head);margin:0;letter-spacing:-.02em}\nh1{font-size:clamp(28px,6vw,40px);font-weight:800;line-height:1.05}\nh2{font-size:21px;font-weight:800}\np{margin:0}\n.num{font-variant-numeric:tabular-nums}\n.head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:10px 18px}\n.date{justify-self:start;display:inline-flex;gap:8px;align-items:center;font-weight:700;background:var(--ink);color:#fff;border-radius:999px;padding:5px 12px;font-size:13.5px}\n.upd{color:var(--soft);font-size:13px}\n.prices{display:flex;gap:8px;flex-wrap:wrap}\n.px{background:var(--card);border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-weight:700;font-size:14px}\n.px span{color:var(--soft);font-weight:500;margin-left:6px}\n.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:16px 18px;display:grid;gap:10px;min-width:0}\nbutton.card{font:inherit;color:inherit;text-align:left;cursor:pointer;transition:transform .15s,box-shadow .15s,border-color .15s}\nbutton.card:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(14,27,44,.08);border-color:#cdd7e4}\nbutton.card:focus-visible,.chip:focus-visible,.x:focus-visible{outline:3px solid var(--blue);outline-offset:2px}\nbutton.card.hero{color:#fff}\n.hero{background:linear-gradient(135deg,#0e1b2c 0%,#1f3a7a 100%);border:0;padding:20px 22px;gap:12px}\n.hero .k{color:#b9c8ea}\n.hero h2{font-size:clamp(22px,4.5vw,30px)}\n.tag{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;border-radius:999px;padding:3px 10px;width:fit-content}\n.stats{display:flex;flex-wrap:wrap;gap:8px 18px;font-size:15px}\n.stats b{font-family:var(--head);font-size:22px}\n.hero .stats b{font-size:26px}\n.k{font-size:12.5px;color:var(--soft);display:block}\n.duo{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:14px;align-items:stretch}\n@media (max-width:760px){.duo{grid-template-columns:minmax(0,1fr)}}\n.friday{border-color:#d8cffc;background:linear-gradient(180deg,var(--purple-soft),#fff 60%)}\n.mood{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}\n.mood div{display:flex;align-items:center;gap:10px;background:var(--bg);border-radius:12px;padding:10px 12px}\n.mood .e{font-size:22px}\n.mood b{display:block;font-size:13px;color:var(--soft);font-weight:500}\n.mood i{font-style:normal;font-weight:700;display:flex;align-items:center;gap:6px}\n.dot{width:11px;height:11px;border-radius:50%;display:inline-block;flex:none}\n.filters{display:flex;gap:8px;flex-wrap:wrap}\n.chip{font:inherit;font-weight:700;font-size:14px;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:7px 14px;cursor:pointer}\n.chip[aria-pressed=\"true\"]{background:var(--ink);color:#fff;border-color:var(--ink)}\n.board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}\n@media (max-width:760px){.board{grid-template-columns:minmax(0,1fr)}}\n.col{display:grid;gap:10px;align-content:start}\n.colh{display:flex;align-items:baseline;gap:8px;font-family:var(--head);font-weight:800;font-size:22px}\n.colh span{font-family:var(--body);font-weight:500;font-size:13px;color:var(--soft)}\n.play{position:relative;border-left:6px solid var(--c)}\n.play .top{display:flex;justify-content:space-between;align-items:center;gap:8px}\n.play .lvl{font-weight:700;font-size:14px}\n.play .win{font-weight:700;font-size:15.5px}\n.play .mini{display:flex;gap:14px;font-size:14px;color:var(--soft)}\n.play .mini b{color:var(--ink);font-size:16px}\n.badge{font-size:12px;font-weight:800;border-radius:999px;padding:3px 9px;background:var(--ink);color:#fff}\n.legend{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:13px;color:var(--soft)}\n.foot{font-size:12.5px;color:var(--soft);text-align:center}\n.legs{display:grid;gap:4px;font-size:13.5px;font-weight:500}\n.legs span{display:flex;gap:6px;align-items:center}\n.legs .lp{color:var(--soft);font-variant-numeric:tabular-nums;margin-left:auto}\n.hero .legs .lp{color:#b9c8ea}\n.legs .net{font-weight:700;border-top:1px dashed var(--line);padding-top:4px;margin-top:2px}\n.hero .legs .net{border-color:rgba(255,255,255,.25)}\n.ctable{width:100%;border-collapse:collapse;font-size:14px}\n.ctable th{text-align:left;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--soft);padding:0 6px 6px 0}\n.ctable td{padding:8px 6px 8px 0;border-top:1px solid var(--line);font-variant-numeric:tabular-nums}\n.ctable td:last-child,.ctable th:last-child{text-align:right;padding-right:0}\n.ctable tr.tot td{font-weight:700;border-top:2px solid var(--ink)}\n.hero .legs{font-size:15px}\n.ticket{display:grid;gap:8px}\n.trow{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;align-items:center;border:1px solid var(--line);border-left:6px solid var(--c);border-radius:14px;padding:10px 12px}\n.trow .n{font-size:22px;grid-row:span 2}\n.trow b{font-size:16px}\n.trow small{color:var(--soft);font-size:13px}\n.order{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\n.order div{background:var(--ink);color:#fff;border-radius:12px;padding:9px 11px;display:grid}\n.order span{font-size:11.5px;color:#b9c8ea;text-transform:uppercase;letter-spacing:.06em;font-weight:700}\n.order b{font-family:var(--head);font-size:18px}\n.copy{font:inherit;font-weight:700;border:0;background:var(--blue);color:#fff;border-radius:12px;padding:11px 14px;cursor:pointer;font-size:15px}\n.copy:focus-visible{outline:3px solid var(--ink);outline-offset:2px}\n/* sheet */\n.ov{position:fixed;inset:0;background:rgba(14,27,44,.45);display:flex;align-items:flex-end;justify-content:center;z-index:20;padding-left:max(0px,env(safe-area-inset-left,0px));padding-right:max(0px,env(safe-area-inset-right,0px))}\n.ov[hidden]{display:none!important}\n.sheet{background:var(--card);width:100%;max-width:560px;border-radius:22px 22px 0 0;padding:18px 20px calc(22px + env(safe-area-inset-bottom,0px));display:grid;gap:14px;max-height:90vh;overflow:auto}\n@media (min-width:700px){.ov{align-items:center}.sheet{border-radius:22px}}\n.sheet .x{justify-self:end;font:inherit;border:0;background:var(--bg);border-radius:999px;width:36px;height:36px;cursor:pointer;font-size:18px}\n.zone{position:relative;height:84px;margin:10px 4px 10px}\n.zone .rail{position:absolute;left:0;right:0;top:44px;height:14px;border-radius:999px;background:var(--r-soft)}\n.zone .ok{position:absolute;top:44px;height:14px;background:var(--g);border-radius:999px}\n.zone .now{position:absolute;top:0;transform:translateX(-50%);display:grid;justify-items:center;font-size:12.5px;font-weight:700}\n.zone .now i{font-style:normal;font-size:18px;line-height:1}\n.zone .lab{position:absolute;top:64px;transform:translateX(-50%);font-size:12.5px;font-weight:700;color:var(--soft);white-space:nowrap}\n.bigstats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}\n.bigstats div{background:var(--bg);border-radius:14px;padding:10px 12px;display:grid}\n.bigstats b{font-family:var(--head);font-size:22px}\n.bigstats span{font-size:12.5px;color:var(--soft)}\n.clock{display:grid;gap:6px}\n.bar{height:10px;border-radius:999px;background:var(--bg);overflow:hidden}\n.bar i{display:block;height:100%;background:var(--blue);border-radius:999px}\n@media (prefers-reduced-motion:reduce){*{transition:none!important}}\n\n[hidden]{display:none!important}\n:host{-webkit-text-size-adjust:100%}\n";
var HTML="<div class=\"wrap\">\n  <header class=\"head\">\n    <div style=\"display:grid;gap:8px\">\n      <span class=\"date\" id=\"date\"></span>\n      <h1>\ud83e\uddfe Index Insurance</h1>\n      <span class=\"upd\" id=\"upd\"></span>\n    </div>\n    <div class=\"prices\" id=\"prices\"></div>\n  </header>\n\n  <div class=\"duo\">\n    <button class=\"card friday\" id=\"friday\"></button>\n    <section class=\"card\">\n      <h2>\ud83c\udf21\ufe0f Market mood</h2>\n      <div class=\"mood\" id=\"mood\"></div>\n    </section>\n  </div>\n\n  <button class=\"card hero\" id=\"hero\"></button>\n\n\n  <section style=\"display:grid;gap:12px\">\n    <div class=\"head\"><h2>\ud83e\uddee The 9 monthly spreads</h2><span class=\"upd\" id=\"expl\"></span></div>\n    <div class=\"filters\" id=\"filters\" role=\"group\" aria-label=\"Filter by risk\">\n      <button class=\"chip\" data-f=\"all\" aria-pressed=\"true\">All</button>\n      <button class=\"chip\" data-f=\"green\" aria-pressed=\"false\">\ud83d\udfe2 Chill</button>\n      <button class=\"chip\" data-f=\"yellow\" aria-pressed=\"false\">\ud83d\udfe1 Balanced</button>\n      <button class=\"chip\" data-f=\"red\" aria-pressed=\"false\">\ud83d\udd34 Spicy</button>\n    </div>\n    <div class=\"board\" id=\"board\"></div>\n  </section>\n\n  <div class=\"legend\"><span>\ud83d\udd3b short \u00b7 \ud83d\udd3a long</span><span>\ud83d\udcb5 net premium</span><span>\u26a0\ufe0f max loss</span><span>\ud83c\udfaf model probability</span><span>\u2b50 top 3 by score</span><span>\ud83d\udc46 tap any card</span></div>\n  <p class=\"foot\">\ud83c\udfa8 A daily data-analysis art project. Snapshots of option prices, for entertainment and education only. Not investment advice and not a recommendation to buy or sell anything.</p>\n</div>\n\n<div class=\"ov\" id=\"ov\" hidden>\n  <div class=\"sheet\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"sTitle\">\n    <button class=\"x\" id=\"sx\" aria-label=\"Close\">\u2715</button>\n    <div id=\"sbody\"></div>\n  </div>\n</div>\n\n";
class OptySpreadDesk extends HTMLElement{
 connectedCallback(){
  if(this._on)return;this._on=true;
  if(!document.getElementById("opty-sd-fonts")){var l=document.createElement("link");l.id="opty-sd-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap";document.head.appendChild(l);}
  var R=this.attachShadow({mode:"open"}),self=this;
  R.innerHTML="<style>"+CSS+"</style><div class=\"shell\"><div class=\"wrap\" style=\"display:block\"><p class=\"card\">Loading today's plays…</p></div></div>";
  fetch(DATA_URL+"?t="+Math.floor(Date.now()/300000),{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
   .then(function(d){R.querySelector(".shell").innerHTML=HTML;run(self,R,d)})
   .catch(function(){R.querySelector(".wrap").innerHTML="<p class=\"card\">Today's plays could not load right now. Refresh the page to try again.</p>"});
 }
}
function run(HOST,R,DATA){

const LV = {green: {e: "🟢", n: "Chill", c: "var(--g)", s: "var(--g-soft)"}, yellow: {e: "🟡", n: "Balanced", c: "var(--y)", s: "var(--y-soft)"}, red: {e: "🔴", n: "Spicy", c: "var(--r)", s: "var(--r-soft)"}, weekly: {e: "🟣", n: "Friday Play", c: "var(--purple)", s: "var(--purple-soft)"}};
const NAME = {SPY: "S&P 500", QQQ: "Nasdaq", DIA: "Dow"};
const DOT = {g: "var(--g)", y: "var(--y)", r: "var(--r)"};
const $ = id => R.getElementById(id);
const D = iso => { const [y, m, d] = iso.split("-").map(Number); return new Date(Date.UTC(y, m - 1, d)); };
const nice = iso => D(iso).toLocaleDateString(undefined, {weekday: "short", month: "short", day: "numeric", timeZone: "UTC"});
const todayET = () => new Date().toLocaleDateString("en-CA", {timeZone: "America/New_York"});
const daysTo = iso => Math.max(0, Math.round((D(iso) - D(todayET())) / 864e5));
const usd = v => "$" + Math.round(v).toLocaleString();
const when = iso => { const t = new Date(iso); return t.toLocaleDateString(undefined, {weekday: "short", month: "short", day: "numeric", timeZone: "America/New_York"}) + " at " + t.toLocaleTimeString(undefined, {hour: "numeric", minute: "2-digit", timeZone: "America/New_York"}) + " ET"; };
const winText = t => t.kind === "iron_condor" ? `between $${t.lo}–$${t.hi}` : t.kind === "call_debit" ? `above $${t.lc}` : `above $${t.lo}`;
const shape = t => t.kind === "iron_condor" ? "🦅 Range play" : t.kind === "call_debit" ? "🚀 Upside play" : "🐂 Stay-above play";
let filter = "all", all = [];
const NUM = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"];
const longDate = iso => D(iso).toLocaleDateString(undefined, {month: "short", day: "numeric", year: "numeric", timeZone: "UTC"});
const legLine = l => `${l.side === "sell" ? "🔻 Short" : "🔺 Long"} ${l.strike} ${l.type === "put" ? "Put" : "Call"} <span class="lp">$${l.px.toFixed(2)}</span>`;
const netLine = t => `🧮 Net $${t.limit.toFixed(2)} ${t.debit ? "debit" : "credit"} · 1 contract each`;
const legsHTML = t => `<div class="legs">${t.legs.map(l => `<span>${legLine(l)}</span>`).join("")}<span class="net">${netLine(t)}</span></div>`;
const strategyName = t => t.kind === "iron_condor" ? "Iron condor" : t.kind === "call_debit" ? "Call debit spread" : "Put credit spread";

function render() {
  const d = DATA;
  $("date").textContent = "📅 " + nice(d.date);
  $("upd").textContent = "💲 Prices collected " + when(d.asof) + " · mid of bid and ask";
  $("prices").innerHTML = Object.entries(d.prices).map(([k, v]) => `<span class="px num">${k}<span>${v.toFixed(2)}</span></span>`).join("");
  $("expl").textContent = `📆 All expire ${nice(d.expiry)} · ⏳ ${daysTo(d.expiry)} days`;
  all = d.trades.map(t => ({...t, expiry: d.expiry, start: d.date, asof: d.asof}));

  const pick = all.find(t => t.rank === 1);
  if (pick) {
    $("hero").dataset.id = pick.id;
    $("hero").innerHTML = `<span class="tag" style="background:rgba(255,255,255,.14)">🔦 Spotlight · top score today</span>
      <h2>${pick.tk} ${LV[pick.lv].e} ${LV[pick.lv].n}</h2>
      <p style="font-size:17px">🟩 Profit zone: ${pick.tk} ${winText(pick)} on ${nice(pick.expiry)}</p>
      ${legsHTML(pick)}
      <div class="stats num"><span><span class="k">💵 Premium</span><b>${usd(pick.collect)}</b></span><span><span class="k">⚠️ Risk</span><b>${usd(pick.risk)}</b></span><span><span class="k">🎯 Probability</span><b>${pick.odds}%</b></span><span><span class="k">📏 Room</span><b>${pick.roomDown}%</b></span></div>`;
  } else $("hero").hidden = true;

  const w = d.weekly;
  if (w) {
    $("mood").innerHTML = w.mood.map(m => `<div><span class="e">${m.emo}</span><span><b>${m.name}</b><i><span class="dot" style="background:${DOT[m.c]}"></span>${m.word}</i></span></div>`).join("");
    const t = w.trades[0];
    if (w.sitOut || !t) {
      $("friday").innerHTML = `<span class="tag" style="background:var(--purple);color:#fff">🗓️ Friday Play</span><h2>😴 No spread this week</h2><p>The readings were too mixed. Back next Friday.</p>`;
    } else {
      all.push({...t, lv: "weekly", expiry: w.expiry, start: w.friday, asof: w.asof || d.asof});
      $("friday").dataset.id = t.id;
      $("friday").innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap"><span class="tag" style="background:var(--purple);color:#fff">🗓️ Friday Play</span>${w.preview ? `<span class="tag" style="background:#fff;border:1px solid #d8cffc;color:var(--purple)">👀 Preview</span>` : ""}</div>
        <h2>${t.tk} ${shape(t)}</h2>
        ${w.asof ? `<span class="k">💲 Prices collected ${when(w.asof)}</span>` : ""}
        <p style="font-size:16px">🟩 Profit zone: ${t.tk} ${winText(t)} on ${nice(w.expiry)}</p>
        ${legsHTML(t)}
        <div class="stats num"><span><span class="k">💵 Premium</span><b>${usd(t.collect)}</b></span><span><span class="k">⚠️ Risk</span><b>${usd(t.risk)}</b></span>${t.odds ? `<span><span class="k">🎯 Probability</span><b>${t.odds}%</b></span>` : ""}<span><span class="k">⏳ Left</span><b>${daysTo(w.expiry)}d</b></span></div>`;
    }
  } else { $("friday").hidden = true; $("mood").closest("section").hidden = true; }
  renderBoard();
}

function renderBoard() {
  $("board").innerHTML = ["SPY", "QQQ", "DIA"].map(tk => {
    const rows = all.filter(t => t.tk === tk && t.lv !== "weekly" && (filter === "all" || t.lv === filter));
    return `<div class="col"><div class="colh">${tk}<span>${NAME[tk]} · ${DATA.prices[tk].toFixed(2)}</span></div>${rows.map(t => `
      <button class="card play" style="--c:${LV[t.lv].c}" data-id="${t.id}">
        <div class="top"><span class="lvl">${LV[t.lv].e} ${LV[t.lv].n}</span>${t.rank ? `<span class="badge">⭐ #${t.rank}</span>` : ""}</div>
        <span class="win">🟩 Profit zone: ${winText(t)}</span>
        ${legsHTML(t)}
        <div class="mini num"><span>💵 <b>${usd(t.collect)}</b></span><span>⚠️ <b>${usd(t.risk)}</b></span><span>🎯 <b>${t.odds}%</b></span></div>
      </button>`).join("")}</div>`;
  }).join("");
}
$("filters").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  filter = b.dataset.f;
  R.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === b)));
  renderBoard();
});

/* detail sheet */
function zone(t) {
  const p = t.price, lo = Math.min(p, t.lo ?? t.lc ?? p) * 0.94, hi = Math.max(p, t.hi ?? p) * 1.05;
  const X = v => ((v - lo) / (hi - lo) * 100).toFixed(2) + "%";
  let ok = "", labs = "";
  if (t.kind === "iron_condor") { ok = `<span class="ok" style="left:${X(t.lo)};width:calc(${X(t.hi)} - ${X(t.lo)})"></span>`; labs = `<span class="lab" style="left:${X(t.lo)}">$${t.lo}</span><span class="lab" style="left:${X(t.hi)}">$${t.hi}</span>`; }
  else if (t.kind === "call_debit") { ok = `<span class="ok" style="left:${X(t.lc)};right:0"></span>`; labs = `<span class="lab" style="left:${X(t.lc)}">$${t.lc}</span>`; }
  else { ok = `<span class="ok" style="left:${X(t.lo)};right:0"></span>`; labs = `<span class="lab" style="left:${X(t.lo)}">$${t.lo}</span>`; }
  return `<div class="zone" aria-label="Win zone"><span class="rail"></span>${ok}<span class="now" style="left:${X(p)}">now ${p.toFixed(0)}<i>📍</i></span>${labs}</div>`;
}
function open(id, opener) {
  const t = all.find(x => x.id === id); if (!t) return;
  const total = Math.max(1, Math.round((D(t.expiry) - D(t.start)) / 864e5)), left = daysTo(t.expiry);
  const room = t.kind === "iron_condor" ? `📏 It can drop ${t.roomDown}% or rise ${t.roomUp}% and still win.`
    : t.kind === "call_debit" ? `🚀 It needs ${t.tk} to rise this week.` : `📏 ${t.tk} can drop ${t.roomDown}% and this still wins.`;
  $("sbody").innerHTML = `<div style="display:grid;gap:12px">
    <span class="tag" style="background:${LV[t.lv].s};color:${LV[t.lv].c}">${LV[t.lv].e} ${LV[t.lv].n}${t.rank ? ` · ⭐ Top ${t.rank}` : ""}</span>
    <h2 id="sTitle">${t.tk} ${shape(t)}</h2>
    <p style="font-size:16px">🟩 Profit zone: ${t.tk} ${winText(t)} on ${nice(t.expiry)}.</p>
    ${zone(t)}
    <p style="color:var(--soft)">🟩 green = winning zone · 🟥 red = losing zone</p>
    <div class="bigstats num">
      <div><b>${usd(t.collect)}</b><span>💵 premium</span></div>
      <div><b>${usd(t.risk)}</b><span>⚠️ max risk</span></div>
      <div><b>${t.odds ? t.odds + "%" : "—"}</b><span>🎯 probability</span></div>
    </div>
    <p>${room}</p>
    <h3 style="font-size:18px">📄 The contracts</h3>
    <div style="overflow-x:auto"><table class="ctable">
      <tr><th>Contract</th><th>Position</th><th>Qty</th><th>Price</th></tr>
      ${t.legs.map(l => `<tr><td>${t.tk} ${longDate(t.expiry)} $${l.strike} ${l.type === "put" ? "Put" : "Call"}</td><td>${l.side === "sell" ? "🔻 Short" : "🔺 Long"}</td><td>1</td><td>$${l.px.toFixed(2)}</td></tr>`).join("")}
      <tr class="tot"><td>${strategyName(t)}</td><td>Net ${t.debit ? "debit" : "credit"}</td><td></td><td>$${t.limit.toFixed(2)}</td></tr>
    </table></div>
    <p style="color:var(--soft);font-size:13px">💲 Mid prices (halfway between bid and ask) collected ${when(t.asof)}. They change all day. Each contract covers 100 shares, so $${t.limit.toFixed(2)} = ${usd(t.limit * 100)} per set.</p>
    <div class="clock"><span>⏳ <b>${left} days</b> to go · ends ${nice(t.expiry)}</span><div class="bar"><i style="width:${Math.min(100, (total - left) / total * 100)}%"></i></div></div>
  </div>`;
  $("ov").hidden = false; document.body.style.overflow = "hidden"; $("sx").focus();
  $("ov")._opener = opener;
}
function close() { $("ov").hidden = true; document.body.style.overflow = ""; $("ov")._opener?.focus(); }
R.addEventListener("click", e => { const c = e.target.closest("button.card[data-id]"); if (c) open(c.dataset.id, c); });
$("sx").addEventListener("click", close);
$("ov").addEventListener("click", e => { if (e.target.id === "ov") close(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("ov").hidden) close(); });

if (DATA) render(); else R.querySelector(".wrap").innerHTML = '<p class="card">📭 Today\'s plays post at about 10:05 AM ET.</p>';

}
customElements.define("opty-spread-desk",OptySpreadDesk);
})();
