/* Opty Data Sources custom element. Tag: opty-data-sources. Reads ../status/status.json and ../data.json */
(function(){
if(customElements.get("opty-data-sources"))return;
var SRC=(document.currentScript&&document.currentScript.src)||"https://nohs10.github.io/Opty-Data/data/opty-data-sources.js";
var STATUS_URL=new URL("../status/status.json",SRC).href, BOARD_URL=new URL("../data.json",SRC).href;
var CSS=`
:host{display:block;--bg:#f4f7fb;--card:#fff;--ink:#0e1b2c;--soft:#5d6b7d;--line:#e3e9f1;--blue:#2f6bff;--g:#16a457;--g-soft:#e3f6ec;--r:#d93a2c;--r-soft:#fde7e5;--gr:#9aa6b5;--gr-soft:#eef1f5;
--head:"Bricolage Grotesque","DM Sans",system-ui,sans-serif;--body:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:light;-webkit-text-size-adjust:100%}
*{box-sizing:border-box}
.shell{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.45}
.wrap{max-width:1040px;margin:0 auto;padding:22px 16px 40px;display:grid;gap:18px}
h1,h2,h3{font-family:var(--head);margin:0;letter-spacing:-.02em}h1{font-size:clamp(28px,6vw,40px);font-weight:800;line-height:1.05}h2{font-size:21px;font-weight:800}h3{font-size:17px;font-weight:800}
p{margin:0}a{color:var(--blue);text-decoration:none;font-weight:700}a:hover{text-decoration:underline}a:focus-visible,button:focus-visible{outline:3px solid var(--blue);outline-offset:2px;border-radius:6px}
.lead{color:var(--soft);max-width:68ch}
.card{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:16px 18px;display:grid;gap:12px;min-width:0}
.sum{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px}
.big{font-family:var(--head);font-size:30px;font-weight:800}
.pill{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;border-radius:999px;padding:4px 11px;width:fit-content}
.pill.g{background:var(--g-soft);color:var(--g)}.pill.r{background:var(--r-soft);color:var(--r)}.pill.x{background:var(--gr-soft);color:var(--soft)}
.dot{width:14px;height:14px;border-radius:50%;flex:none;display:inline-block;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12)}
.dot.g{background:var(--g)}.dot.r{background:var(--r)}.dot.x{background:var(--gr)}
.lights{display:grid;gap:0}
.lrow{display:grid;grid-template-columns:auto minmax(0,1.3fr) minmax(0,1fr) minmax(0,1.4fr) auto;gap:10px 14px;align-items:center;padding:10px 2px;border-top:1px solid var(--line)}
.lrow:first-child{border-top:0}
.lrow b{font-size:14.5px}.lrow .k{font-size:13px;color:var(--soft)}.lrow .t{font-size:13px;color:var(--soft);white-space:nowrap;font-variant-numeric:tabular-nums}
.lhead{font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--soft);font-weight:700;padding-bottom:6px}
@media (max-width:720px){.lrow{grid-template-columns:auto minmax(0,1fr) auto}.lrow .pg,.lrow .nt{display:none}.lhead .pg,.lhead .nt{display:none}}
.legend{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13px;color:var(--soft)}.legend span{display:inline-flex;align-items:center;gap:6px}
.page{display:grid;gap:12px}
.ph{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 14px}
.ph a{font-size:14px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:12px}
.src{border-left:6px solid var(--c);gap:8px}
.src .top{display:flex;align-items:center;gap:8px;justify-content:space-between}
.src .top h3{display:block;line-height:1.3}.src .top h3 .dot{vertical-align:-1px;margin-right:8px}
.kv{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;font-size:13.5px}.kv dt{color:var(--soft)}.kv dd{margin:0}
.foot{font-size:12.5px;color:var(--soft);text-align:center}
.mute{color:var(--soft);font-size:13px}
`;
var P={vibes:{n:"Market Vibes",e:"\ud83c\udf9b\ufe0f",href:"https://www.optymystz.com/test"},ins:{n:"Index Insurance",e:"\ud83e\uddfe",href:"https://www.optymystz.com/stock-insurance"},
 kpi:{n:"KPI Tracker",e:"\ud83d\udcca",href:"https://www.optymystz.com/kpi-test"},cal:{n:"Market Calendar",e:"\ud83d\uddd3\ufe0f"}};
var L={yahoo:"https://finance.yahoo.com",coingecko:"https://www.coingecko.com",ssga:"https://www.ssga.com",nasdaq:"https://www.nasdaq.com",alpaca:"https://alpaca.markets",cboe:"https://www.cboe.com",
 nyse:"https://www.nyse.com/markets/hours-calendars",sifma:"https://www.sifma.org/resources/general/holiday-schedule/",fed:"https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm"};
function a(k,t){return '<a href="'+L[k]+'" target="_blank" rel="noopener">'+t+'</a>'}
/* id = status id; page; who (linked); what it provides; what it updates; how often */
var CAT=[
 {id:"yahoo",pg:"vibes",who:a("yahoo","Yahoo Finance"),gives:"Prices for 9 currencies + the dollar index, 10 commodity futures, index leaders and ETF giants",upd:"Currencies, Commodities, Index leaders and ETF giants tiles, and every vibe score",every:"Hourly"},
 {id:"coingecko",pg:"vibes",who:a("coingecko","CoinGecko"),gives:"Top 10 coins by market value, with 7-day trend lines",upd:"Crypto tiles and their vibe scores",every:"Hourly, 24/7"},
 {id:"holdings",pg:"vibes",who:a("ssga","State Street (SSGA)")+" and "+a("nasdaq","Nasdaq.com"),gives:"The 10 biggest holdings of the Dow, S&P 500, Nasdaq-100 and Russell 2000 funds",upd:"Which stocks appear in Index leaders",every:"Every morning"},
 {id:"etfrank",pg:"vibes",who:a("nasdaq","Nasdaq.com"),gives:"Assets and fees of the largest US ETFs",upd:"Which funds appear in ETF giants, and their order",every:"Every morning"},
 {id:"plays",pg:"ins",who:"Brokerage option quotes",gives:"SPY, QQQ and DIA option prices each market morning",upd:"The 9 monthly spreads and the Spotlight",every:"Market mornings, about 10:05 AM ET"},
 {id:"tracker",pg:"ins",who:a("alpaca","Alpaca"),gives:"Live option and fund prices for the posted plays",upd:"Hourly play checks (better / steady / worse)",every:"Hourly in market hours"},
 {id:"weekly",pg:"ins",who:a("cboe","Cboe")+", "+a("yahoo","Yahoo Finance")+" and "+a("alpaca","Alpaca"),gives:"Option open interest, VIX term structure, credit and sector funds",upd:"Friday Play and the Market mood box",every:"Fridays, 3:40 PM ET"},
 {id:"vix",pg:"ins",who:a("yahoo","Yahoo Finance"),gives:"The VIX index",upd:"Market insurance price bar at the top",every:"Hourly, 10:05 AM to 4:05 PM ET"},
 {id:"insurance",pg:"ins",who:a("alpaca","Alpaca"),gives:"Option quotes and daily prices for 13 index leaders plus SPY, QQQ, DIA",upd:"Stock insurance tiles (IV rank \ud83d\udfe2\ud83d\udfe1\ud83d\udd34), implied and actual moves",every:"Hourly, 10:05 AM to 4:05 PM ET"},
 {id:"insurance",pg:"kpi",who:a("alpaca","Alpaca"),gives:"The same hourly option data as Index Insurance",upd:"Insurance lights and IV rank on every stock",every:"Hourly, 10:05 AM to 4:05 PM ET"},
 {id:"earnings",pg:"kpi",who:a("nasdaq","Nasdaq.com"),gives:"Next earnings dates and the last quarters of results vs. estimates",upd:"\ud83d\ude80\u2696\ufe0f\u26a0\ufe0f emoji, quarter boxes, earnings countdowns",every:"Weekdays, 7:40 AM ET"},
 {id:"kpilist",pg:"kpi",who:a("cboe","Cboe")+" announcement (October 2026)",gives:"Which companies and metrics have KPI contracts",upd:"\u2705 and \ud83d\udc40 labels",every:"Updated by hand"},
 {id:"calendar",pg:"cal",who:a("nyse","NYSE")+", "+a("sifma","SIFMA")+" and the "+a("fed","Federal Reserve"),gives:"Market holidays, early closes, bond-only closures, Fed meetings and minutes",upd:"Calendar days and the open/closed stoplight on Market Vibes",every:"Built in for 2026 to 2027"},
 {id:"earnings",pg:"cal",who:a("nasdaq","Nasdaq.com"),gives:"Earnings dates for the tracked companies",upd:"\ud83d\udcc5 earnings days on the calendar",every:"Weekdays, 7:40 AM ET"}];
function fmt(s){if(!s)return"";var d=new Date(s);if(isNaN(d))return s;
 var m=Math.round((Date.now()-d)/60000),ago=m<1?"just now":m<60?m+" min ago":m<1440?Math.round(m/60)+" hr ago":Math.round(m/1440)+" days ago";
 return d.toLocaleString("en-US",{timeZone:"America/New_York",weekday:"short",hour:"numeric",minute:"2-digit"})+" ET \u00b7 "+ago}
function esc(t){return String(t==null?"":t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
class OptyDataSources extends HTMLElement{
 connectedCallback(){
  if(this._on)return;this._on=true;
  if(!document.getElementById("opty-sd-fonts")){var l=document.createElement("link");l.id="opty-sd-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap";document.head.appendChild(l);}
  var R=this.attachShadow({mode:"open"});R.innerHTML="<style>"+CSS+"</style><div class='shell'><div class='wrap'><p class='card'>Checking data sources\u2026</p></div></div>";
  var t=Math.floor(Date.now()/120000);
  function j(u){return fetch(u+"?t="+t,{cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.json()}).catch(function(){return null})}
  Promise.all([j(STATUS_URL),j(BOARD_URL)]).then(function(x){render(R,x[0],x[1])});
 }
}
function render(R,S,B){
 var by={};((S&&S.sources)||[]).forEach(function(s){by[s.id]=s});
 /* watchdog: if the hourly board itself is over 3 hours old, the updater has stopped reporting */
 var bu=B&&B.updated?new Date(B.updated.replace(" ","T")+":00-05:00"):null, dead=!bu||(Date.now()-bu)>3*3600e3;
 function st(id){if(id==="kpilist")return{ok:null,note:"Checked by hand when Cboe updates its list"};var s=by[id];if(!s)return{ok:null,note:"Status not available yet"};
  if(dead&&id!=="calendar")return{ok:false,last:s.last,note:"Updates have stopped reporting; numbers may be out of date"};return s}
 function cls(s){return s.ok===true?"g":s.ok===false?"r":"x"}
 var rows=[],seen={},g=0,r=0;
 CAT.forEach(function(c){var key=c.id+"|"+c.pg;if(seen[key])return;seen[key]=1;var s=st(c.id);if(s.ok===true)g++;else if(s.ok===false)r++;
  rows.push('<div class="lrow" role="row"><span class="dot '+cls(s)+'" role="img" aria-label="'+(s.ok===true?"Green":s.ok===false?"Red":"No light")+'"></span><span><b>'+c.who.replace(/<[^>]+>/g,"")+'</b><span class="k" style="display:block">'+esc(c.gives)+'</span></span><span class="k pg">'+P[c.pg].e+" "+P[c.pg].n+'</span><span class="k nt">'+esc(s.note||"")+'</span><span class="t">'+(s.last?fmt(s.last).split(" \u00b7 ")[1]:"")+'</span></div>')});
 var tot=g+r, allg=r===0&&tot>0;
 var html='<header style="display:grid;gap:8px"><h1>\ud83d\udef0\ufe0f Data Sources</h1><p class="lead">Every number on this site comes from the outside services below. Each one is checked every 15 minutes: \ud83d\udfe2 means its last update arrived on schedule and looked complete; \ud83d\udd34 means it failed, is late, or the numbers may be wrong.</p></header>'
 +'<section class="card"><div class="sum"><span class="big">'+(allg?"\ud83d\udfe2 All clear":"\ud83d\udd34 "+r+" need attention")+'</span><span class="pill '+(allg?"g":"r")+'">'+g+' of '+tot+' sources green</span></div>'
 +'<div class="lights" role="table" aria-label="Data source stoplight"><div class="lrow lhead" role="row"><span></span><span>Source</span><span class="pg">Page</span><span class="nt">Status</span><span>Last update</span></div>'+rows.join("")+'</div>'
 +'<div class="legend"><span><i class="dot g"></i>Last update worked</span><span><i class="dot r"></i>Failed, late, or may be wrong</span><span><i class="dot x"></i>Updated by hand / no automatic check</span></div></section>';
 ["vibes","ins","kpi","cal"].forEach(function(pk){var p=P[pk];
  html+='<section class="page"><div class="ph"><h2>'+p.e+" "+p.n+'</h2>'+(p.href?'<a href="'+p.href+'" target="_top">Open '+p.n+' \u2192</a>':"")+'</div><div class="grid">';
  CAT.filter(function(c){return c.pg===pk}).forEach(function(c){var s=st(c.id),k=cls(s);
   html+='<article class="card src" style="--c:var(--'+(k==="x"?"gr":k)+')"><div class="top"><h3><span class="dot '+k+'"></span>'+c.who+'</h3></div>'
   +'<dl class="kv"><dt>Provides</dt><dd>'+esc(c.gives)+'</dd><dt>Updates</dt><dd>'+c.upd+'</dd><dt>How often</dt><dd>'+esc(c.every)+'</dd><dt>Last update</dt><dd>'+(s.last?esc(fmt(s.last)):'<span class="mute">\u2014</span>')+'</dd><dt>Status</dt><dd>'+esc(s.note||"")+'</dd></dl></article>'});
  html+='</div></section>'});
 html+='<p class="foot">Times are US Eastern. Data is for information and education only and may be delayed. Not investment advice.</p>';
 R.querySelector(".wrap").innerHTML=html;
}
customElements.define("opty-data-sources",OptyDataSources);
})();
