/* Opty KPI Tracker custom element. Tag: opty-kpi-tracker. Reads ../insurance/data.json. */
(function(){
if(customElements.get("opty-kpi-tracker"))return;
var SRC=(document.currentScript&&document.currentScript.src)||"https://nohs10.github.io/Opty-Data/kpi/opty-kpi-tracker.js";
var INS_URL=new URL("../insurance/data.json",SRC).href;
var CSS="\n:host{display:block;--bg:#f4f7fb;--card:#ffffff;--ink:#0e1b2c;--soft:#5d6b7d;--line:#e3e9f1;--blue:#2f6bff;--g:#16a457;--g-soft:#e3f6ec;--y:#c58f00;--y-soft:#fff5d6;--r:#ec4335;--r-soft:#fde7e5;\n--head:\"Bricolage Grotesque\",\"DM Sans\",system-ui,sans-serif;--body:\"DM Sans\",system-ui,-apple-system,\"Segoe UI\",sans-serif;color-scheme:light}\n\n\n*{box-sizing:border-box}\n.shell{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.45}\n.wrap{max-width:1040px;margin:0 auto;padding-block:22px 40px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:grid;gap:18px}\nh1,h2,h3{font-family:var(--head);margin:0;letter-spacing:-.02em}h1{font-size:clamp(28px,6vw,40px);font-weight:800;line-height:1.05}h2{font-size:21px;font-weight:800}p{margin:0}\n.num{font-variant-numeric:tabular-nums}.k{font-size:12.5px;color:var(--soft);display:block}\n.head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:10px 18px}\n.upd{color:var(--soft);font-size:13px}\n.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:16px 18px;display:grid;gap:10px;min-width:0}\n.tag{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;border-radius:999px;padding:3px 10px;width:fit-content}\n.duo{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px}@media (max-width:760px){.duo{grid-template-columns:minmax(0,1fr)}}\n.next{background:linear-gradient(135deg,#0e1b2c,#1f3a7a);color:#fff;border:0}.next .k{color:#b9c8ea}.next h2{font-size:clamp(20px,4vw,26px)}\n.legend2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.legend2 div{display:grid;gap:4px;font-size:13.5px}.legend2 b{font-size:14px}\n.filters{display:flex;gap:8px;flex-wrap:wrap}\n.chip{font:inherit;font-weight:700;font-size:14px;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:7px 14px;cursor:pointer}\n.chip[aria-pressed=\"true\"]{background:var(--ink);color:var(--card);border-color:var(--ink)}\n.radar{width:100%;border-collapse:collapse;font-size:14px}.radar th{text-align:left;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--soft);padding:0 8px 8px 0}\n.radar td{padding:9px 8px 9px 0;border-top:1px solid var(--line);vertical-align:top}.radar tr{cursor:pointer}.radar tr:hover td{background:var(--bg)}\n.radar .em{font-size:19px;white-space:nowrap}\n.foot{font-size:12.5px;color:var(--soft);text-align:center}\n.ov{position:fixed;inset:0;background:rgba(14,27,44,.45);display:flex;align-items:flex-end;justify-content:center;z-index:20}\n.ov[hidden]{display:none!important}\n.sheet{background:var(--card);color:var(--ink);width:100%;max-width:580px;border-radius:22px 22px 0 0;padding:18px 20px calc(22px + env(safe-area-inset-bottom,0px));display:grid;gap:14px;max-height:90vh;overflow:auto}\n@media (min-width:700px){.ov{align-items:center}.sheet{border-radius:22px}}\n.sheet .x{justify-self:end;font:inherit;border:0;background:var(--bg);color:var(--ink);border-radius:999px;width:36px;height:36px;cursor:pointer;font-size:18px}\n.bigstats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.bigstats div{background:var(--bg);border-radius:14px;padding:10px 12px;display:grid;gap:2px}\n.bigstats b{font-family:var(--head);font-size:22px}.bigstats span{font-size:12px;color:var(--soft)}\n@media (max-width:480px){.bigstats{grid-template-columns:1fr 1fr}.legend2{grid-template-columns:1fr}}\n.livelink{display:inline-flex;align-items:center;gap:6px;font:700 14px var(--body);color:#fff;background:var(--blue,#2f6bff);border-radius:999px;padding:8px 14px;text-decoration:none;width:fit-content}.livelink:focus-visible{outline:3px solid var(--ink);outline-offset:2px}\n.kpibtn{background:var(--ink)!important;color:var(--card)!important}\n@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}\n/* insurance price + KPI tracker */\n.vixm{display:grid;gap:8px}\n.vixm-top{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}\n.vixm-n{font-size:15px;color:var(--soft)}.vixm-n b{font-family:var(--head);font-size:30px;color:var(--ink);margin-left:4px}\n.vixm-bar{position:relative;height:14px;border-radius:999px;background:var(--bg);margin-top:14px}\n.vixm-bar .z{position:absolute;top:0;bottom:0}.vixm-bar .z.r{left:0;background:var(--r-soft);border-radius:999px 0 0 999px}.vixm-bar .z.y{background:var(--y-soft)}.vixm-bar .z.g{background:var(--g-soft);border-radius:0 999px 999px 0}\n.vixm-pin{position:absolute;top:-17px;transform:translateX(-50%);font-size:14px;color:var(--ink)}\n.vixm-lab{display:flex;justify-content:space-between;gap:6px;font-size:12px;color:var(--soft);flex-wrap:wrap}\n.vixm-p{font-size:13.5px;color:var(--soft)}\n.stks{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,170px),1fr));gap:10px}\n.stk{font:inherit;color:var(--ink);text-align:left;background:var(--card);border:1px solid var(--line);border-top:5px solid var(--c);border-radius:14px;padding:10px 12px;display:grid;gap:5px;cursor:pointer;transition:transform .15s,box-shadow .15s}\n.stk:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(14,27,44,.08)}\n.stk:focus-visible{outline:3px solid var(--blue,#2f6bff);outline-offset:2px}\n.stk-top{display:flex;align-items:center;gap:6px}.stk-top b{font-family:var(--head);font-size:19px;flex:1}.stk-e{font-size:18px}\n.stk-name{font-size:12.5px;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.stk-ivr{display:flex;justify-content:space-between;font-size:12.5px;color:var(--soft)}.stk-ivr b{color:var(--ink);font-size:14px}\n.stk-bar{height:6px;border-radius:999px;background:var(--bg);overflow:hidden}.stk-bar i{display:block;height:100%;background:var(--c);border-radius:999px}\n.stk-foot{display:flex;justify-content:space-between;gap:6px;font-size:11.5px;color:var(--soft);flex-wrap:wrap}.stk-foot .soon{color:#b26b00}\n.ivchip{font-family:var(--body);font-size:12px;font-weight:700;border-radius:999px;padding:2px 8px;margin-left:auto}\n.ins{display:grid;gap:12px}\n.ivr{display:grid;gap:4px;margin-top:8px}\n.ivr-bar{position:relative;height:12px;border-radius:999px;background:linear-gradient(90deg,var(--r-soft),var(--y-soft),var(--g-soft))}\n.ivr-bar i{position:absolute;left:0;top:0;bottom:0;border-right:3px solid var(--ink)}\n.ivr-bar span{position:absolute;top:-20px;transform:translateX(-50%);font-size:12px;font-weight:700}\n.ivr-lab{display:flex;justify-content:space-between;font-size:12px;color:var(--soft)}\n.earn{font-size:14.5px}\n.kpibtn{font:inherit;font-weight:700;font-size:15px;border:0;border-radius:12px;padding:11px 14px;cursor:pointer;background:var(--ink);color:#fff}\n.kpibtn:focus-visible{outline:3px solid var(--blue,#2f6bff);outline-offset:2px}\n.kpibox{border:1px solid var(--line);border-radius:14px;padding:12px 14px;display:grid;gap:10px;background:var(--bg)}\n.kpi-head{display:flex;gap:10px;align-items:center}.kpi-head b{display:block;font-size:16px}.kpi-big{font-size:32px}\n.kpi-list{display:grid;gap:8px}\n.kpi-row{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:9px 12px}\n.kpi-row b{display:block;font-size:15px}.kpi-ic{font-size:22px}.kpi-e{font-size:22px}\n.kst{display:block;font-size:12px;margin-top:2px}.kst.named{color:var(--g)}.kst.watch{color:var(--soft)}\n.kpi-sub{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--soft);font-weight:700}\n.eps{display:flex;gap:6px;flex-wrap:wrap}\n.ep{display:grid;justify-items:center;font-size:13px;font-weight:700;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:5px 8px;font-variant-numeric:tabular-nums}\n.ep small{font-weight:500;color:var(--soft);font-size:11px}.ep.hit{color:var(--g)}.ep.miss{color:var(--r)}\n.combo{font-size:14px}\n.kpi-how summary{cursor:pointer;font-weight:700;font-size:13.5px}.kpi-how ul{margin:6px 0 0;padding-left:18px;font-size:13px;display:grid;gap:4px;color:var(--soft)}\n\n\n[hidden]{display:none!important}\n:host{-webkit-text-size-adjust:100%}\n";
var HTML="<div class=\"wrap\">\n  <header class=\"head\"><div style=\"display:grid;gap:6px\"><h1>\ud83d\udcca KPI Tracker</h1><span class=\"upd\" id=\"upd\"></span></div></header>\n  <section class=\"card next\" id=\"next\"></section>\n  <section class=\"card\"><h2>\ud83e\udded Two trackers, one view</h2>\n      <div class=\"legend2\">\n        <div><b>Insurance price (options)</b><span>\ud83d\udfe2 Rich \u00b7 IV rank 60%+</span><span>\ud83d\udfe1 Fair \u00b7 30\u201360%</span><span>\ud83d\udd34 Cheap \u00b7 under 30%</span><span class=\"k\">IV rank: where today's option prices sit in their 52-week range.</span></div>\n        <div><b>KPI emoji (fundamentals)</b><span>\ud83d\ude80 Beating the Street</span><span>\u2696\ufe0f Mostly in line</span><span>\u26a0\ufe0f Miss risk</span><span class=\"k\">From the last 4 quarters of earnings vs. estimates.</span></div>\n      </div></section>\n  <section style=\"display:grid;gap:12px\">\n    <div class=\"head\"><h2>\ud83c\udfe2 Index leaders and KPI companies</h2><span class=\"upd\">\ud83d\udc46 Tap a stock for its insurance price and KPIs</span></div>\n    <div class=\"filters\" id=\"filters\" role=\"group\" aria-label=\"Filter stocks\">\n      <button class=\"chip\" data-f=\"all\" aria-pressed=\"true\">All</button><button class=\"chip\" data-f=\"named\" aria-pressed=\"false\">\u2705 KPI contracts</button>\n      <button class=\"chip\" data-f=\"rich\" aria-pressed=\"false\">\ud83d\udfe2 Rich insurance</button><button class=\"chip\" data-f=\"rocket\" aria-pressed=\"false\">\ud83d\ude80 Beating</button><button class=\"chip\" data-f=\"soon\" aria-pressed=\"false\">\u26a1 Earnings soon</button></div>\n    <div class=\"stks\" id=\"grid\"></div>\n  </section>\n  <section class=\"card\"><h2>\ud83d\udce1 KPI radar</h2><div style=\"overflow-x:auto\"><table class=\"radar\" id=\"radar\"></table></div></section>\n  <p class=\"foot\">\ud83c\udfa8 A data-analysis art project for entertainment and education. Not investment advice and not a recommendation to buy or sell anything. KPI contracts were approved by the SEC in October 2026; Cboe hasn't published the full list of 23 companies, so metrics marked \ud83d\udc40 are ones to watch, not confirmed contracts.</p>\n</div>\n<div class=\"ov\" id=\"ov\" hidden><div class=\"sheet\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"sTitle\"><button class=\"x\" id=\"sx\" aria-label=\"Close\">\u2715</button><div id=\"sbody\"></div></div></div>\n";
class OptyKpiTracker extends HTMLElement{
 connectedCallback(){
  if(this._on)return;this._on=true;
  if(!document.getElementById("opty-sd-fonts")){var l=document.createElement("link");l.id="opty-sd-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap";document.head.appendChild(l);}
  var R=this.attachShadow({mode:"open"}),self=this;
  R.innerHTML="<style>"+CSS+"</style><div class=\"shell\"><div class=\"wrap\" style=\"display:block\"><p class=\"card\">Loading\u2026</p></div></div>";
  fetch(INS_URL+"?t="+Math.floor(Date.now()/300000),{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
   .then(function(d){R.querySelector(".shell").innerHTML=HTML;run(self,R,d)})
   .catch(function(){R.querySelector(".wrap").innerHTML="<p class=\"card\">The KPI Tracker could not load right now. Refresh the page to try again.</p>"});
 }
}
function run(HOST,R,INS){

/* ===== Insurance price + KPI tracker (shared by Index Insurance and KPI Tracker) ===== */
const INSL = {g:{e:"\ud83d\udfe2",n:"Rich",d:"Insurance is expensive: options price in bigger moves than usual",c:"var(--g)",s:"var(--g-soft)"},
  y:{e:"\ud83d\udfe1",n:"Fair",d:"Insurance is normally priced",c:"var(--y)",s:"var(--y-soft)"},
  r:{e:"\ud83d\udd34",n:"Cheap",d:"Insurance is cheap: options price in small moves",c:"var(--r)",s:"var(--r-soft)"}};
const ivLight = r => r >= .6 ? "g" : r >= .3 ? "y" : "r";
const vixLight = v => v >= 20 ? "g" : v >= 12 ? "y" : "r";
const BEAT = {rocket:{e:"\ud83d\ude80",n:"Beating the Street",d:"Beat estimates in each of the last 4 quarters, by 5%+ on average"},
  cruise:{e:"\u2696\ufe0f",n:"Mostly in line",d:"Beat in 3 of the last 4 quarters, or by small margins"},
  bump:{e:"\u26a0\ufe0f",n:"Miss risk",d:"Missed in 2+ of the last 4 quarters, or missed last quarter"}};
const surp = q => (q.a - q.e) / Math.max(Math.abs(q.e), .01);
function beatOf(s) {
  const L = s.eps.slice(-4), beats = L.filter(q => q.a > q.e).length, avg = L.reduce((t, q) => t + surp(q), 0) / L.length, last = L[L.length - 1];
  const k = beats === 4 && avg >= .05 ? "rocket" : (beats <= 2 || last.a < last.e) ? "bump" : "cruise";
  return {k, ...BEAT[k], beats, avg};
}
const dayNum = iso => { const [y, m, d] = iso.split("-").map(Number); return Date.UTC(y, m - 1, d) / 864e5; };
const etToday = () => new Date().toLocaleDateString("en-CA", {timeZone: "America/New_York"});
const daysUntil = iso => Math.round(dayNum(iso) - dayNum(etToday()));
const shortDate = iso => new Date(iso + "T12:00:00Z").toLocaleDateString(undefined, {weekday: "short", month: "short", day: "numeric", timeZone: "UTC"});
const pct = v => Math.round(v * 100) + "%";
const sgnPct = v => (v >= 0 ? "+" : "\u2212") + Math.abs(v * 100).toFixed(Math.abs(v) < .1 ? 1 : 0) + "%";
function earnLine(s) {
  const n = daysUntil(s.earn), when = s.timing === "am" ? "before the open" : "after the close";
  if (n < 0) return `\ud83d\udcc5 Last reported ${shortDate(s.earn)}`;
  return `\ud83d\udcc5 Reports ${shortDate(s.earn)} ${when} \u00b7 ${n === 0 ? "today" : n === 1 ? "tomorrow" : "in " + n + " days"}`;
}
const soon = s => { const n = daysUntil(s.earn); return n >= 0 && n <= 14; };

function vixMeter(v) {
  const L = INSL[vixLight(v)], X = x => Math.min(100, x / 40 * 100);
  return `<div class="vixm"><div class="vixm-top"><span class="vixm-n">VIX <b>${v.toFixed(1)}</b></span><span class="tag" style="background:${L.s};color:${L.c}">${L.e} ${L.n}</span></div>
    <div class="vixm-bar"><i class="z r" style="width:${X(12)}%"></i><i class="z y" style="left:${X(12)}%;width:${X(20) - X(12)}%"></i><i class="z g" style="left:${X(20)}%;right:0"></i><span class="vixm-pin" style="left:${X(v)}%">\u25bc</span></div>
    <div class="vixm-lab"><span>\ud83d\udd34 Cheap \u00b7 under 12</span><span>\ud83d\udfe1 Fair \u00b7 12\u201320</span><span>\ud83d\udfe2 Rich \u00b7 20+</span></div>
    <p class="vixm-p">${L.d}${v >= 18 && v < 20 ? ", close to the rich zone" : ""}. For insurance sellers the colors flip: green means fat premiums, red means thin ones.</p></div>`;
}
function stockTile(s) {
  const L = INSL[ivLight(s.ivr)], B = beatOf(s);
  return `<button class="stk" style="--c:${L.c}" data-stk="${s.sym}" aria-label="${s.sym} insurance and KPIs">
    <span class="stk-top"><b>${s.sym}</b><span class="stk-e" title="${L.n} insurance">${L.e}</span><span class="stk-e" title="${B.n}">${B.e}</span></span>
    <span class="stk-name">${s.name} \u00b7 $${s.price.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
    <span class="stk-ivr"><span>IV rank</span><b>${pct(s.ivr)}</b></span>
    <span class="stk-bar"><i style="width:${Math.round(s.ivr * 100)}%"></i></span>
    <span class="stk-foot">${soon(s) ? `<b class="soon">\u26a1 Earnings ${daysUntil(s.earn) === 0 ? "today" : "in " + daysUntil(s.earn) + "d"}</b>` : `<span>\ud83d\udcc5 ${shortDate(s.earn)}</span>`}<span>${s.kpis.some(k => k.st === "named") ? "\ud83d\udcca KPI contract" : "\ud83d\udcca KPIs to watch"}</span></span>
  </button>`;
}
function insPanel(s) {
  const L = INSL[ivLight(s.ivr)], ratio = s.iv / s.hv, pos = Math.round(s.ivr * 100);
  return `<div class="ins">
    <span class="tag" style="background:${L.s};color:${L.c}">${L.e} ${L.n} insurance \u00b7 IV rank ${pct(s.ivr)}</span>
    <h2 id="sTitle">${s.sym} \u00b7 ${s.name}</h2>
    <p class="k">${s.idx} \u00b7 $${s.price.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
    <p>${L.d}.</p>
    <div class="ivr"><div class="ivr-bar"><i style="width:${pos}%"></i><span style="left:${pos}%">${pct(s.iv)}</span></div><div class="ivr-lab"><span>52-week low ${pct(s.ivl)}</span><span>high ${pct(s.ivh)}</span></div></div>
    <div class="bigstats num"><div><b>${pct(s.iv)}</b><span>\ud83d\udcc8 implied move per year (30-day options)</span></div><div><b>${pct(s.hv)}</b><span>\ud83d\udccf how much it actually moved (past month)</span></div>
      <div><b>${ratio.toFixed(2)}\u00d7</b><span>${ratio >= 1 ? "options priced above" : "options priced below"} recent moves</span></div></div>
    <p class="earn">${earnLine(s)}${soon(s) ? `<br><span class="k">\u26a1 Option prices usually drop right after earnings (the "volatility crush"), so this IV rank includes the earnings bump.</span>` : ""}</p>
    <button class="kpibtn" data-kpi="${s.sym}" aria-expanded="false">\ud83d\udcca View KPIs for ${s.sym}</button>
    <div class="kpibox" id="kpi-${s.sym}" hidden>${kpiPanel(s)}</div>
  </div>`;
}
function kpiPanel(s) {
  const B = beatOf(s), L = INSL[ivLight(s.ivr)];
  const st = {named: `<span class="kst named">\u2705 Named by Cboe for KPI contracts \u00b7 not tradable in Robinhood yet</span>`, watch: `<span class="kst watch">\ud83d\udc40 Metric to watch \u00b7 not a confirmed KPI contract</span>`};
  return `<div class="kpi-head"><span class="kpi-big">${B.e}</span><div><b>${B.n}</b><span class="k">${B.d}</span></div></div>
    <div class="kpi-list">${s.kpis.map(k => `<div class="kpi-row"><span class="kpi-ic">${k.ic}</span><div><b>${k.m}</b>${st[k.st]}</div><span class="kpi-e" title="${B.n}">${B.e}</span></div>`).join("")}</div>
    <div class="kpi-sub">Earnings vs. estimates, last ${s.eps.length} quarters</div>
    <div class="eps">${s.eps.map(q => { const v = surp(q), hit = q.a > q.e, eq = q.a === q.e; return `<span class="ep ${hit ? "hit" : eq ? "eq" : "miss"}" title="${q.d}: estimate ${q.e}, actual ${q.a}">${hit ? "\u2705" : eq ? "\u2796" : "\u274c"} ${eq ? "0%" : sgnPct(v)}<small>${new Date(q.d + "T12:00:00Z").toLocaleDateString(undefined, {month: "short", year: "2-digit", timeZone: "UTC"})}</small></span>`; }).join("")}</div>
    <p class="combo">${L.e} + ${B.e} <b>${L.n} insurance, ${B.n.toLowerCase()}</b></p>
    <details class="kpi-how"><summary>How KPI contracts work</summary><ul>
      <li>A KPI contract asks one yes/no question about a company's reported number, like "Will data center revenue be at or above $X?"</li>
      <li>It pays $1 if the number is at or above the line and $0 if not, based on the company's SEC filing (not the press release).</li>
      <li>The SEC approved Cboe's KPI options in October 2026, for 100+ metrics across 23 companies. Robinhood plans to be the first broker to offer them.</li>
      <li>The ${B.e} emoji comes from the company's earnings track record (EPS vs. estimates), because KPI-level forecasts aren't public yet.</li></ul></details>`;
}
function bindIns(root, openSheet) {
  root.addEventListener("click", e => {
    const t = e.target.closest("[data-stk]"); if (t) { openSheet(t.dataset.stk, t); return; }
  });
  R.addEventListener("click", e => {
    const b = e.target.closest("[data-kpi]"); if (!b) return;
    const box = R.getElementById("kpi-" + b.dataset.kpi), open = box.hidden;
    box.hidden = !open; b.setAttribute("aria-expanded", String(open)); b.textContent = (open ? "\ud83d\udd3c Hide KPIs for " : "\ud83d\udcca View KPIs for ") + b.dataset.kpi;
    if (open) box.scrollIntoView({block: "nearest", behavior: "smooth"});
  });
}

const $=id=>R.getElementById(id);let filt="all";
function render(){
  $("upd").textContent=INS.updated?`\ud83d\udcb2 Updated ${INS.updated} ET \u00b7 options from Alpaca, earnings from Nasdaq`:`\ud83d\udcb2 Snapshot: Robinhood data, ${shortDate(INS.asof)} close${INS.collected?" \u00b7 collected "+shortDate(INS.collected):""}`;
  const up=INS.stocks.filter(s=>daysUntil(s.earn)>=0).sort((a,b)=>a.earn.localeCompare(b.earn))[0];
  if(up){const B=beatOf(up),L=INSL[ivLight(up.ivr)],k=up.kpis[0];
    $("next").innerHTML=`<span class="tag" style="background:rgba(255,255,255,.14)">\u23ed\ufe0f Next KPI moment</span><h2>${up.sym} ${k.ic} ${k.m}</h2><p>${earnLine(up)}</p>
    <p class="k">${B.e} ${B.n} (${B.beats}/4 beats) \u00b7 ${L.e} ${L.n} insurance, IV rank ${pct(up.ivr)}${k.st==="named"?" \u00b7 \u2705 named by Cboe for KPI contracts":""}</p><button class="kpibtn" style="background:#fff!important;color:#0e1b2c!important;width:fit-content" data-stk="${up.sym}">\ud83d\udcca View ${up.sym} KPIs</button>`}
  const L=INS.stocks.filter(s=>filt==="all"||(filt==="named"&&s.kpis.some(k=>k.st==="named"))||(filt==="rich"&&ivLight(s.ivr)==="g")||(filt==="rocket"&&beatOf(s).k==="rocket")||(filt==="soon"&&soon(s)));
  $("grid").innerHTML=L.map(stockTile).join("")||'<p class="upd">Nothing matches this filter right now.</p>';
  $("radar").innerHTML=`<tr><th>Stock</th><th>KPIs</th><th>Track record</th><th>Insurance</th><th>Next report</th></tr>`+INS.stocks.map(s=>{const B=beatOf(s),Li=INSL[ivLight(s.ivr)];
    return `<tr data-stk="${s.sym}" tabindex="0"><td><b>${s.sym}</b><span class="k">${s.name}</span></td><td>${s.kpis.map(k=>`${k.ic} ${k.m} ${k.st==="named"?"\u2705":"\ud83d\udc40"}`).join("<br>")}</td><td class="em">${B.e} <span class="k" style="display:inline">${B.beats}/4</span></td><td class="em">${Li.e} <span class="k" style="display:inline">${pct(s.ivr)}</span></td><td>${shortDate(s.earn)}</td></tr>`}).join("")}
function openSheet(sym,opener){const s=INS.stocks.find(x=>x.sym===sym);if(!s)return;$("sbody").innerHTML=insPanel(s);$("ov").hidden=false;document.body.style.overflow="hidden";
  const b=R.querySelector(`#sbody [data-kpi="${sym}"]`);if(b)b.click();$("sx").focus();$("ov")._opener=opener}
function close(){$("ov").hidden=true;document.body.style.overflow="";$("ov")._opener?.focus()}
bindIns(R.querySelector(".wrap"),openSheet);
R.querySelector(".wrap").addEventListener("keydown",e=>{const r=e.target.closest("tr[data-stk]");if(r&&e.key==="Enter")openSheet(r.dataset.stk,r)});
$("filters").addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;filt=b.dataset.f;R.querySelectorAll("#filters .chip").forEach(c=>c.setAttribute("aria-pressed",String(c===b)));render()});
$("sx").addEventListener("click",close);$("ov").addEventListener("click",e=>{if(e.target.id==="ov")close()});R.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("ov").hidden)close()});
render();

}
customElements.define("opty-kpi-tracker",OptyKpiTracker);
})();
