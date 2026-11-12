/* Opty Top Tens custom element. Tag name: opty-top-tens. Data refreshes from data.json next to this file. */
(function(){
if(customElements.get("opty-top-tens"))return;
var SRC=(document.currentScript&&document.currentScript.src)||"https://nohs10.github.io/Opty-Data/opty-top-tens.js";
var DATA_URL=new URL("data.json",SRC).href;
var CSS="\n/* Layout: a market \"weather station\" \u2014 one thermometer strip carries every asset; desks below as instrument panels. */\n:host{display:block;\n  --bg:#F2F4F7; --panel:#FFFFFF; --ink:#11151C; --mute:#5B6474; --line:#DCE1E8; --soft:#E8ECF2;\n  --cold:#2F6BFF; --mid:#A3ABBA; --hot:#F2542D; --up:#0F8A5F; --down:#C93A3A;\n  --fx:#0E9AA7; --crypto:#7A4DE0; --commodities:#D88A0B; --stocks:#2E57E0; --etfs:#E2557A;\n  --display:\"Inter Display\",\"Inter\",system-ui,sans-serif; --body:\"Inter\",system-ui,sans-serif;\n  --mono:\"IBM Plex Mono\",\"DejaVu Sans Mono\",ui-monospace,monospace;\n}\n*{box-sizing:border-box}\n.shell{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.5;\n  padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}\n.wrap{max-width:1120px;margin:0 auto;padding-block:20px 56px}\nh1,h2,h3{font-family:var(--display);text-wrap:balance;margin:0;letter-spacing:-.02em}\n.mono,.num{font-family:var(--mono);font-variant-numeric:tabular-nums}\n.eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}\na{color:inherit}\nbutton{font:inherit;color:inherit}\n:focus-visible{outline:2px solid var(--stocks);outline-offset:2px}\n\n/* header + nav */\nheader.top{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--bg);padding-block:12px 0;border-bottom:1px solid var(--line)}\n.brand{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}\n.brand h1{font-size:22px;font-weight:800}\n.brand h1 span{color:var(--mute);font-weight:600}\nnav.tabs{display:flex;gap:4px;overflow-x:auto;margin-top:10px;scrollbar-width:none}\nnav.tabs a{flex:none;text-decoration:none;padding:8px 12px;border-radius:8px 8px 0 0;font-weight:600;font-size:14px;color:var(--mute);border-bottom:3px solid transparent}\nnav.tabs a:hover{color:var(--ink)}\nnav.tabs a[aria-current=\"page\"]{color:var(--ink);border-bottom-color:var(--c,var(--ink))}\n\n/* hero */\n.hero{display:grid;grid-template-columns:auto 1fr;gap:28px;align-items:center;margin:28px 0 8px}\n.big{display:flex;flex-direction:column;align-items:center;justify-content:center;width:150px;height:150px;border-radius:50%;\n  background:conic-gradient(var(--mc) calc(var(--s)*1%),var(--soft) 0);position:relative}\n.big::after{content:\"\";position:absolute;inset:12px;border-radius:50%;background:var(--bg)}\n.big>*{position:relative;z-index:1}\n.big .e{font-size:40px;line-height:1}\n.big .n{font-family:var(--mono);font-size:30px;font-weight:600;line-height:1.1}\n.hero h2{font-size:clamp(28px,4.4vw,46px);font-weight:800;line-height:1.05}\n.hero p{color:var(--mute);max-width:62ch;margin:10px 0 0}\n\n/* thermometer strip */\n.strip{margin:26px 0 8px;background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 18px 12px}\n.strip h3{font-size:16px;margin-bottom:4px}\n.strip .sub{color:var(--mute);font-size:13px;margin:0 0 10px}\n.thermo{position:relative;height:150px}\n.bar{position:absolute;left:0;right:0;bottom:30px;height:10px;border-radius:6px;background:linear-gradient(90deg,var(--cold),var(--mid) 50%,var(--hot))}\n.dot{position:absolute;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--c);border:2px solid var(--panel);cursor:pointer;padding:0}\n.dot:hover,.dot:focus-visible{transform:scale(1.4);z-index:2}\n.ticks{position:absolute;left:0;right:0;bottom:0;height:24px;font-family:var(--mono);font-size:11px;color:var(--mute)}\n.ticks span{position:absolute;transform:translateX(-50%);white-space:nowrap}.ticks span:first-child{transform:none}.ticks span:last-child{transform:translateX(-100%)}.ticks em{font-style:normal}\n.tip{position:absolute;pointer-events:none;background:var(--ink);color:var(--bg);font-size:12px;padding:4px 8px;border-radius:6px;white-space:nowrap;transform:translate(-50%,-130%);z-index:3}\n.legend{display:flex;flex-wrap:wrap;gap:14px;font-size:13px;color:var(--mute);margin-top:6px}\n.legend i{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--c);margin-right:6px;vertical-align:-1px}\n\n/* desk cards */\n.sec{margin-top:34px}\n.sec>h2{font-size:22px;font-weight:800;margin-bottom:4px}\n.sec>p.lead{color:var(--mute);margin:0 0 14px;max-width:70ch}\n.desks{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}\n.desk{display:flex;flex-direction:column;gap:8px;text-decoration:none;background:var(--panel);border:1px solid var(--line);border-top:4px solid var(--c);border-radius:12px;padding:14px}\n.desk:hover{border-color:var(--c)}\n.desk .t{display:flex;justify-content:space-between;align-items:baseline;font-weight:700}\n.desk .sc{font-family:var(--mono);font-size:26px;font-weight:600}\n.desk .em{font-size:26px}\n.desk .row{display:flex;gap:2px;font-size:15px;flex-wrap:wrap}\n.desk .hl{font-size:13px;color:var(--mute)}\n.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n.list{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:6px 14px}\n.list h3{font-size:15px;padding:8px 0}\n.li{display:grid;grid-template-columns:28px 1fr auto 44px;gap:8px;align-items:center;padding:7px 0;border-top:1px solid var(--line);cursor:pointer;background:none;border-left:0;border-right:0;border-bottom:0;width:100%;text-align:left}\n.li .nm{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.li .nm small{color:var(--mute)}\n.tag{font-size:11px;font-family:var(--mono);padding:1px 6px;border-radius:99px;border:1px solid var(--c);color:var(--c);margin-left:6px}\n\n/* desk page */\n.intro{display:grid;grid-template-columns:1.4fr 1fr;gap:16px;margin-top:24px}\n.intro .card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px}\n.intro h3{font-size:14px;margin-bottom:6px}\n.intro p,.intro li{color:var(--mute);margin:0 0 6px;font-size:14px}\n.intro ul{margin:0;padding-left:18px}\n.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:12px;margin-top:16px}\n.tile{display:grid;grid-template-columns:auto 1fr auto;gap:4px 10px;align-items:center;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px 14px;cursor:pointer;text-align:left;width:100%}\n.tile:hover{border-color:var(--c)}\n.tile .rk{font-family:var(--mono);color:var(--mute);font-size:12px}\n.tile .lb{font-weight:700;min-width:0}\n.tile .lb small{display:block;font-weight:400;color:var(--mute);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.tile .em{font-size:26px}\n.tile .px{grid-column:1/3;font-family:var(--mono);font-size:15px}\n.tile .ch{font-family:var(--mono);font-size:14px;text-align:right}\n.tile svg{grid-column:1/-1;width:100%;height:44px}\n.meter{grid-column:1/-1;display:flex;align-items:center;gap:8px;font-size:12px;color:var(--mute)}\n.meter .m{flex:1;height:6px;border-radius:4px;background:var(--soft);position:relative;overflow:hidden}\n.meter .m b{position:absolute;inset:0 auto 0 0;border-radius:4px;background:var(--mc)}\n.meter .s{font-family:var(--mono);color:var(--ink);font-weight:600}\n.up{color:var(--up)} .down{color:var(--down)}\n.subtabs{display:flex;gap:6px;flex-wrap:wrap;margin-top:18px}\n.subtabs button{border:1px solid var(--line);background:var(--panel);border-radius:99px;padding:6px 14px;cursor:pointer;font-weight:600;font-size:14px}\n.subtabs button[aria-pressed=\"true\"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}\n.idxnote{color:var(--mute);font-size:13px;margin-top:8px}\n.wt{grid-column:1/-1;font-size:12px;color:var(--mute);display:flex;gap:8px;align-items:center}\n.wt .m{flex:1;height:4px;background:var(--soft);border-radius:3px;position:relative}\n.wt .m b{position:absolute;inset:0 auto 0 0;background:var(--c);border-radius:3px}\n.aum{margin-top:16px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px}\n.aum h3{font-size:15px;margin-bottom:8px}\n.ar{display:grid;grid-template-columns:52px 1fr 70px;gap:10px;align-items:center;padding:4px 0;font-size:13px}\n.ar .m{height:16px;background:var(--soft);border-radius:4px;position:relative}\n.ar .m b{position:absolute;inset:0 auto 0 0;background:var(--etfs);border-radius:4px}\n.ar .v{font-family:var(--mono);text-align:right}\n\n/* how */\n.how{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px}\n.how .card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px}\n.how h3{font-size:16px;margin-bottom:8px}\n.how p{color:var(--mute);margin:0 0 10px;font-size:14px}\n.formula{font-family:var(--mono);font-size:13px;background:var(--soft);border-radius:8px;padding:10px 12px;overflow-x:auto;white-space:pre}\n.tiers{display:grid;gap:6px}\n.tiers div{display:grid;grid-template-columns:30px 70px 1fr;gap:8px;align-items:center;font-size:14px}\n.tiers .rg{font-family:var(--mono);color:var(--mute);font-size:12px}\nfooter{margin-top:40px;color:var(--mute);font-size:12px;border-top:1px solid var(--line);padding-top:14px}\n\n/* detail dialog */\ndialog{border:1px solid var(--line);border-radius:16px;background:var(--panel);color:var(--ink);padding:0;width:min(520px,calc(100vw - 32px))}\ndialog::backdrop{background:rgba(10,14,20,.45)}\n.dlg{padding:20px}\n.dlg header{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}\n.dlg h3{font-size:22px}\n.dlg .x{border:1px solid var(--line);background:var(--soft);border-radius:8px;padding:4px 10px;cursor:pointer}\n.dlg svg{width:100%;height:90px;margin:10px 0}\n.brk{display:grid;gap:6px;margin-top:6px}\n.brk div{display:grid;grid-template-columns:1fr 70px;gap:8px;font-size:14px}\n.brk div b{font-family:var(--mono);text-align:right}\n.brk .tot{border-top:1px solid var(--line);padding-top:6px;font-weight:700}\n.kv{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:14px;margin-top:8px}\n.kv dt{color:var(--mute)} .kv dd{margin:0;font-family:var(--mono)}\n\n@media (max-width:760px){\n  .hero{grid-template-columns:1fr;justify-items:start}\n  .pair,.intro,.how{grid-template-columns:1fr}\n  .thermo{height:170px}\n}\n/* phone: compact everything so the board reads like an app */\n@media (max-width:560px){\n  .shell{font-size:14px}\n  .wrap{padding-block:10px 32px}\n  .brand h1{font-size:18px}.brand h1 span{display:none}\n  .brand .eyebrow{font-size:10px}\n  nav.tabs{margin-top:6px;-webkit-mask-image:linear-gradient(90deg,#000 85%,transparent);mask-image:linear-gradient(90deg,#000 85%,transparent)}\n  nav.tabs a{padding:8px 10px;font-size:13px}\n  .hero{grid-template-columns:76px 1fr;gap:14px;align-items:start;margin:16px 0 4px;justify-items:stretch}\n  .big{width:76px;height:76px}.big::after{inset:7px}\n  .big .e{font-size:22px}.big .n{font-size:18px}.big .eyebrow{display:none}\n  .hero h2{font-size:22px;line-height:1.1}\n  .hero p{font-size:13px;margin-top:6px}\n  .hero .eyebrow{font-size:10px}\n  .strip{padding:12px 12px 8px;margin-top:16px}\n  .strip .sub{font-size:12px}\n  .thermo{height:150px}\n  .ticks em{display:none}\n  .legend{gap:6px 12px;font-size:12px}\n  .sec{margin-top:22px}.sec>h2{font-size:18px}.sec>p.lead{font-size:13px}\n  .shell .key{grid-template-columns:1fr;gap:6px}\n  .shell .k{display:grid;grid-template-columns:34px 1fr;gap:0 10px;align-items:center;padding:8px 10px;border-bottom-width:1px;border-left:4px solid var(--mc)}\n  .shell .k .e{grid-row:1/4;font-size:24px}\n  .shell .k b{font-size:14px}.shell .k .rg{font-size:11px}.shell .k p{font-size:12px;margin:0}\n  .desks{grid-template-columns:1fr;gap:8px}\n  .desk{padding:10px 12px;gap:4px}\n  .desk .sc,.desk .em{font-size:20px}\n  .desk .row{font-size:13px}\n  .li{grid-template-columns:24px 1fr auto 30px;gap:6px;font-size:13px}\n  .li .nm small,.li .tag{display:none}\n  .intro{gap:10px;margin-top:14px}\n  .intro .card{padding:12px}\n  .grid{grid-template-columns:1fr;gap:8px}\n  .tile{padding:10px 12px;gap:2px 10px}\n  .tile svg{height:28px}\n  .tile .em{font-size:22px}\n  .subtabs button{padding:5px 11px;font-size:13px}\n  .ar{grid-template-columns:44px 1fr 60px;font-size:12px}\n  .how .card{padding:14px}\n  footer{margin-top:24px}\n}\n/* embed mode (Wix): the board is an app shell that fills whatever box it is placed in */\nhtml.embed,html.embed body,html.embed #app{height:100%;overflow:hidden}\nhtml.embed .wrap{height:100%;display:flex;flex-direction:column;padding-block:0}\nhtml.embed header.top{position:static;flex:none}\nhtml.embed .scroller{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding-bottom:24px;margin-inline:-4px;padding-inline:4px}\n@media (prefers-reduced-motion:reduce){*{transition:none!important}}\n\n/* ===== poster mode (1080x1350, rendered for PDF/PNG export) ===== */\nhtml.poster,html.poster body{width:1080px;height:1350px;overflow:hidden;padding:0;margin:0}\n.P{width:1080px;height:1350px;padding:64px 68px 54px;display:flex;flex-direction:column;background:var(--bg);color:var(--ink);position:relative}\n.P .top{display:flex;justify-content:space-between;align-items:center;font-family:var(--mono);font-size:20px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}\n.P .top b{color:var(--ink);font-family:var(--display);letter-spacing:-.01em;text-transform:none;font-size:28px;font-weight:800}\n.P .head{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end;margin-top:34px;border-bottom:4px solid var(--c,var(--ink));padding-bottom:26px}\n.P h2{font-size:76px;font-weight:800;line-height:.98;letter-spacing:-.035em}\n.P .head p{font-size:24px;color:var(--mute);margin:14px 0 0;line-height:1.35}\n.P .gauge{text-align:center}\n.P .gauge .e{font-size:84px;line-height:1}\n.P .gauge .n{font-family:var(--mono);font-size:56px;font-weight:600;line-height:1.1}\n.P .gauge .l{font-size:20px;color:var(--mute)}\n.P .rows{flex:1;display:flex;flex-direction:column;justify-content:space-evenly;margin-top:14px}\n.P .r{display:grid;grid-template-columns:44px 58px 1fr 170px 130px 200px;gap:14px;align-items:center;font-size:26px}\n.P .r .rk{font-family:var(--mono);color:var(--mute);font-size:20px}\n.P .r .em{font-size:40px;line-height:1}\n.P .r .lb{font-weight:800;font-size:30px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.P .r .lb small{font-weight:400;color:var(--mute);font-size:20px;margin-left:10px}\n.P .r .px{font-family:var(--mono);text-align:right;font-size:24px}\n.P .r .ch{font-family:var(--mono);text-align:right;font-weight:600}\n.P .r .mt{display:flex;align-items:center;gap:10px}\n.P .r .mt .m{flex:1;height:12px;border-radius:6px;background:var(--soft);position:relative;overflow:hidden}\n.P .r .mt .m b{position:absolute;inset:0 auto 0 0;background:var(--mc);border-radius:6px}\n.P .r .mt span{font-family:var(--mono);font-weight:600;width:44px;text-align:right}\n.P .foot{display:flex;justify-content:space-between;gap:30px;align-items:flex-end;font-size:17px;color:var(--mute);border-top:1px solid var(--line);padding-top:18px;line-height:1.4}\n.P .foot b{color:var(--ink);font-size:22px;white-space:nowrap}\n.P .cols{flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:26px}\n.P .cols .cr{padding:12px 0}.P .col h4{font-family:var(--display);font-size:26px;margin:0 0 10px;font-weight:800}\n.P .col h4 small{display:block;font-size:15px;color:var(--mute);font-weight:500;font-family:var(--body)}\n.P .cr{display:grid;grid-template-columns:36px 1fr auto;gap:8px;align-items:center;font-size:23px;padding:9px 0;border-top:1px solid var(--line)}\n.P .cr .em{font-size:28px}\n.P .cr b{font-weight:800}\n.P .cr span{font-family:var(--mono);font-size:19px}\n.P .ov{flex:1;display:flex;flex-direction:column;gap:26px;margin-top:28px}\n.P .pthermo{position:relative}.P .pthermo .thermo{height:230px}\n.P .pthermo .bar{bottom:44px;height:16px;border-radius:8px}\n.P .pthermo .dot{width:22px;height:22px;margin-left:-11px;border:3px solid var(--bg)}\n.P .pthermo .ticks{height:34px;font-size:17px}\n.P .pdesks{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}\n.P .pd{border:1px solid var(--line);border-top:6px solid var(--c);border-radius:14px;padding:16px;background:var(--panel)}\n.P .pd .t{font-weight:800;font-size:21px}\n.P .pd .em{font-size:52px;line-height:1.2}\n.P .pd .sc{font-family:var(--mono);font-size:36px;font-weight:600}\n.P .pd .l{font-size:16px;color:var(--mute)}\n.P .ppair{display:grid;grid-template-columns:1fr 1fr;gap:22px}\n.P .ppair h4{font-family:var(--display);font-size:26px;margin:0 0 6px}\n.P .ppair .cr{grid-template-columns:44px 1fr auto auto;gap:12px}\n.P .ppair .cr .g{font-size:15px;color:var(--mute)}\n\n/* emoji key */\n.key{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}\n.k{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:4px;border-bottom:4px solid var(--mc)}\n.k .e{font-size:30px;line-height:1.1}\n.k b{font-size:15px}\n.k .rg{font-family:var(--mono);font-size:12px;color:var(--mute)}\n.k p{margin:2px 0 0;font-size:13px;color:var(--mute);line-height:1.4}\n.keymini{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:14px;font-size:13px;color:var(--mute);align-items:center}\n.keymini b{color:var(--ink);font-weight:600}\n.keymini a{font-weight:600;color:var(--ink)}\n.P .keyrow{display:flex;justify-content:space-between;gap:6px;margin:10px 0 14px;font-size:17px;color:var(--mute)}\n.P .keyrow span{display:flex;align-items:center;gap:5px;white-space:nowrap}\n.P .keyrow span i{font-style:normal;font-size:24px}\n.P .keyrow span b{color:var(--ink);font-weight:700}\n.P .klist{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-evenly;margin-top:10px}\n.P .kr{display:grid;grid-template-columns:84px 1fr;gap:20px;align-items:center;padding:2px 0}\n.P .kr .e{font-size:58px;line-height:1;text-align:center}\n.P .kr h3{font-size:30px;font-weight:800;display:flex;gap:14px;align-items:baseline}\n.P .kr h3 span{font-family:var(--mono);font-size:22px;color:var(--mute);font-weight:500}\n.P .kr p{margin:2px 0 0;font-size:21px;color:var(--mute);line-height:1.3}\n.P .kr .sw{height:6px;border-radius:3px;background:var(--mc);width:110px;margin-top:6px}\n.P .wild{font-size:20px;color:var(--mute);border-top:1px solid var(--line);padding-top:14px;margin-bottom:6px}\n\n[hidden]{display:none!important}\nheader.top{position:static}\n:host{font-family:var(--body);color:var(--ink);line-height:1.5;font-size:15px;-webkit-text-size-adjust:100%}\ndialog{font-family:var(--body);font-size:15px;line-height:1.5}\n.loading{padding:48px 16px;text-align:center;color:var(--mute)}\n";
class OptyTopTens extends HTMLElement{
 connectedCallback(){
  if(this._on)return;this._on=true;this._view="overview";
  if(!document.getElementById("opty-tt-fonts")){var l=document.createElement("link");l.id="opty-tt-fonts";l.rel="stylesheet";
   l.href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=IBM+Plex+Mono:wght@400;500;600&display=swap";document.head.appendChild(l);}
  var R=this.attachShadow({mode:"open"});this._R=R;
  R.innerHTML="<style>"+CSS+"</style><div class=\"shell\"><div id=\"app\"><div class=\"loading\">Loading today's market moods…</div></div></div><dialog id=\"dlg\"><div class=\"dlg\" id=\"dlgBody\"></div></dialog>";
  var self=this,sh=R.querySelector(".shell");
  if(window.ResizeObserver)new ResizeObserver(function(){self.style.minHeight=sh.offsetHeight+"px"}).observe(sh);
  this.load();this._timer=setInterval(function(){if(!document.hidden)self.load()},15*60*1000);
 }
 disconnectedCallback(){clearInterval(this._timer)}
 load(){var self=this;
  fetch(DATA_URL+"?t="+Math.floor(Date.now()/300000),{cache:"no-store"}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})
   .then(function(d){if(self._stamp===d.updated)return;self._stamp=d.updated;var dlg=self._R.getElementById("dlg");if(dlg.open)dlg.close();run(self,self._R,d)})
   .catch(function(){if(!self._stamp)self._R.getElementById("app").innerHTML="<div class=\"loading\">The board could not load right now. Refresh the page to try again.</div>"});
 }
}
function run(HOST,R,DATA){

const D = DATA;
const EMBED=false;
const DESKS = {
  fx:{name:"Currencies",short:"FX",c:"--fx",
    what:"The ten most-traded currencies, each priced against the US dollar, plus the dollar index (DXY), which tracks the dollar against a basket of six major currencies.",
    why:"Currencies set the price of everything that crosses a border: imports, oil, company earnings abroad. A strong dollar squeezes emerging markets and commodity prices.",
    read:["EUR/USD up means the euro got stronger against the dollar.","USD/JPY up means the dollar got stronger against the yen. The quote's first currency is the one moving.","Moves of 0.5% are big for currencies; 1% is a headline."]},
  crypto:{name:"Crypto",short:"Crypto",c:"--crypto",
    what:"The ten largest crypto assets by market value, with stablecoins (pegged to $1), wrapped coins and tokenized funds removed so only real price-moving coins remain.",
    why:"Crypto trades 24/7 and reacts first to risk appetite and liquidity. Bitcoin leads; the rest usually follow with bigger swings.",
    read:["Change is the last 24 hours, not since a market close, because crypto never closes.","The sparkline covers 7 days.","Moves of 3–5% are a normal day here."]},
  commodities:{name:"Commodities",short:"Commodities",c:"--commodities",
    what:"Ten benchmark futures across energy, metals and farm goods, using the front-month contract (the next one to expire).",
    why:"Commodities are the raw cost of the economy. Oil feeds inflation, copper tracks factory demand, gold rises when people want safety.",
    read:["Units differ: oil in $ per barrel, gold and silver in $ per troy ounce, copper in $ per pound, grains in cents per bushel, coffee in cents per pound, natural gas in $ per MMBtu.","Day change is against the prior settlement price.","About 15 minutes delayed."]},
  stocks:{name:"Index Leaders",short:"Stocks",c:"--stocks",
    what:"The ten heaviest stocks inside each of the four big US indexes: the Dow 30, the S&P 500, the Nasdaq-100 and the Russell 2000 (small companies).",
    why:"A handful of giants drive each index. When the top ten move together the whole index moves with them.",
    read:["Weight is the share of the index each stock makes up, taken from the index funds' holdings (DIA, SPY, Nasdaq.com, IWM).","The Dow is price-weighted, so a high share price means a high weight, not a big company.","Russell 2000 weights are estimates from the latest filing."]},
  etfs:{name:"ETF Giants",short:"ETFs",c:"--etfs",
    what:"The ten largest US-listed ETFs by assets under management (AUM), re-ranked every morning.",
    why:"These funds hold trillions of dollars of everyday savings. Their mood is a quick read on what ordinary portfolios did today.",
    read:["AUM is how much money the fund holds, not how much it trades.","Expense ratio is the yearly fee: 0.03% costs $3 per $10,000 invested.","Several of these track the same S&P 500, so they often share a mood."]}
};
const ORDER=["fx","crypto","commodities","stocks","etfs"];
const IDX={dow:"Dow 30",sp500:"S&P 500",ndx:"Nasdaq-100",r2000:"Russell 2000"};
const IDXETF={dow:"DIA",sp500:"SPY",ndx:"Nasdaq.com",r2000:"IWM"};
const UNITS={"WTI":"$/bbl","Brent":"$/bbl","NatGas":"$/MMBtu","Gold":"$/oz","Silver":"$/oz","Copper":"$/lb","Corn":"¢/bu","Soybeans":"¢/bu","Wheat":"¢/bu","Coffee":"¢/lb"};
const TIERS=[[85,"🚀","Rocket"],[70,"🔥","Hot"],[57,"😎","Warming up"],[44,"😐","Flat"],[31,"🥶","Cooling"],[16,"📉","Sliding"],[0,"🧊","Frozen"]];
const MEAN={"Rocket":"Big jump, much faster than normal for its group, and trading near its recent high.",
 "Hot":"Clearly up today and trending higher.","Warming up":"Leaning positive: a good day or a steady climb.",
 "Flat":"Not much happening. Moving about as much as usual.","Cooling":"Leaning negative: drifting lower.",
 "Sliding":"Clearly down today and trending lower.","Frozen":"Big drop, much worse than normal for its group, near its recent low."};
const rng=k=>`${TIERS[k][0]}–${k?TIERS[k-1][0]-1:100}`;
function keyCards(){return `<div class="key">${[...TIERS].reverse().map((t,j)=>{const k=TIERS.length-1-j;return `<div class="k" style="--mc:${moodColor(Math.min(100,t[0]+7))}"><span class="e">${t[1]}</span><b>${t[2]}</b><span class="rg">${rng(k)}</span><p>${MEAN[t[2]]}</p></div>`}).join("")}</div>`}
function keyMini(){return `<div class="keymini"><span>Emoji key:</span>${[...TIERS].reverse().map(t=>`<span>${t[1]} <b>${t[2]}</b></span>`).join("")}<a href="#how">What they mean</a></div>`}
const tier=s=>TIERS.find(t=>s>=t[0]);
const G={}; D.groups.forEach(g=>G[g.id]=g);
const all=[]; D.groups.forEach(g=>g.items.forEach(i=>{i.g=g.id; if(i.mood) all.push(i)}));
const avg=a=>Math.round(a.reduce((s,x)=>s+x,0)/a.length);
const deskAvg=id=>avg(G[id].items.map(i=>i.mood.score));
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

// mood color along the thermometer
function hex(h){h=h.trim().replace("#","");return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}
function moodColor(s){const cs=getComputedStyle(HOST);
  const a=hex(cs.getPropertyValue("--cold")),m=hex(cs.getPropertyValue("--mid")),b=hex(cs.getPropertyValue("--hot"));
  const t=s/100,[p,q,u]=t<.5?[a,m,t*2]:[m,b,(t-.5)*2];return `rgb(${p.map((v,i)=>Math.round(v+(q[i]-v)*u)).join(",")})`}
const cvar=id=>`var(${DESKS[id].c})`;

// formatting
function fmtPx(i){const p=i.price; if(p==null) return "–";
  if(i.g==="crypto") return "$"+(p>=1000?p.toLocaleString("en-US",{maximumFractionDigits:0}):p>=1?p.toFixed(2):p.toPrecision(3));
  if(i.g==="fx") return p.toFixed(p>=50?2:4);
  if(i.g==="commodities") return (UNITS[i.label]||"").startsWith("¢")?p.toFixed(2)+"¢":"$"+p.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:p<10?3:2});
  return "$"+p.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});}
const fmtCh=c=>c==null?"–":(c>0?"+":c<0?"−":"")+Math.abs(c).toFixed(2)+"%";
const chCls=c=>c>0?"up":c<0?"down":"";
const big=v=>v>=1e12?"$"+(v/1e12).toFixed(2)+"T":"$"+Math.round(v/1e9)+"B";
const when=s=>{const d=new Date(s.replace(" ","T"));return d.toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})+" ET"};
const dayOnly=s=>new Date(s.replace(" ","T")).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric",year:"numeric"});

// score breakdown, same formula as the server
function parts(i){const items=G[i.g].items, mv=items.map(x=>Math.abs(x.chg_pct||0)).sort((a,b)=>a-b);
  const med=mv.length%2?mv[(mv.length-1)/2]:(mv[mv.length/2-1]+mv[mv.length/2])/2, typ=Math.max(med||1,.2);
  const sp=(i.spark||[]).filter(Boolean), z=(i.chg_pct||0)/typ;
  const tr=sp.length>1?(sp[sp.length-1]/sp[0]-1)*100/typ:0, mn=Math.min(...sp), mx=Math.max(...sp);
  const pos=sp.length>1&&mx>mn?(sp[sp.length-1]-mn)/(mx-mn):.5;
  return {typ,z,move:25*Math.tanh(z/2),trend:15*Math.tanh(tr/3),range:20*(pos-.5),pos};}

function spark(sp,c,h=44,w=240){sp=(sp||[]).filter(Boolean); if(sp.length<2) return `<svg viewBox="0 0 ${w} ${h}"></svg>`;
  const mn=Math.min(...sp),mx=Math.max(...sp),r=mx-mn||1,pad=5;
  const pts=sp.map((v,k)=>[k/(sp.length-1)*(w-2*pad)+pad,h-pad-(v-mn)/r*(h-2*pad)]);
  const d=pts.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" "), L=pts[pts.length-1];
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <polygon points="${pad},${h} ${d} ${w-pad},${h}" fill="${c}" opacity=".12"/>
    <polyline points="${d}" fill="none" stroke="${c}" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
    <circle cx="${L[0].toFixed(1)}" cy="${L[1].toFixed(1)}" r="3.5" fill="${c}"/></svg>`;}

function meter(s){return `<div class="meter"><span>${esc(tier(s)[2])}</span><div class="m"><b style="width:${s}%;--mc:${moodColor(s)}"></b></div><span class="s">${s}</span></div>`}

// overview headline
function headline(){
  const ds=ORDER.map(id=>({id,s:deskAvg(id)})).sort((a,b)=>b.s-a.s), hi=ds[0], lo=ds[ds.length-1];
  const tw=(s,id)=>verb(s,id);
  return `${DESKS[hi.id].name} ${tw(hi.s,hi.id)}, ${DESKS[lo.id].name.toLowerCase()} ${tw(lo.s,lo.id)}`;}
function verb(s,id,ing){const one=id==="crypto",l=tier(s)[2];
  if(ing) return (one?"is ":"are ")+({Rocket:"rocketing",Hot:"running hot","Warming up":"warming up",Flat:"flat",Cooling:"cooling off",Sliding:"sliding",Frozen:"frozen"})[l];
  const v={Rocket:"rocket",Hot:"run hot","Warming up":"warm up",Flat:"stay flat",Cooling:"cool off",Sliding:"slide",Frozen:"freeze"}[l];
  return one?v.replace(/^(\w+)/,w=>w==="stay"?"stays":w==="freeze"?"freezes":w+"s"):v;}

function thermo(cls=""){
  // stack dots that land close together
  const placed=[]; const sorted=[...all].sort((a,b)=>a.mood.score-b.mood.score);
  const dots=sorted.map(i=>{const x=i.mood.score; let lvl=0; while(placed.some(p=>p.l===lvl&&Math.abs(p.x-x)<1.7)) lvl++; placed.push({x,l:lvl});
    return `<button class="dot" style="left:${x}%;bottom:${(cls?66:46)+lvl*(cls?20:13)}px;--c:${cvar(i.g)}" data-k="${esc(i.g+"|"+i.sym)}" aria-label="${esc(i.label)} ${i.mood.score}"></button>`}).join("");
  const ticks=[0,16,31,44,57,70,85,100].map(t=>`<span style="left:${t}%">${tier(t)[1]}<em> ${t}</em></span>`).join("");
  return `<div class="thermo ${cls}">${dots}<div class="bar"></div><div class="ticks">${ticks}</div></div>`;}

function deskCard(id){const g=G[id],s=deskAvg(id),t=tier(s),it=[...g.items].sort((a,b)=>b.mood.score-a.mood.score);
  return `<a class="desk" href="#${id}" style="--c:${cvar(id)}"><div class="t"><span>${DESKS[id].name}</span><span class="eyebrow">${g.items.length}</span></div>
  <div style="display:flex;align-items:center;gap:10px"><span class="em">${t[1]}</span><span class="sc">${s}</span><span style="color:var(--mute)">${t[2]}</span></div>
  <div class="row" aria-label="moods">${g.items.map(i=>`<span title="${esc(i.label)} ${i.mood.score}">${i.mood.emoji}</span>`).join("")}</div>
  <div class="hl">Hottest <b>${esc(it[0].label)}</b> ${it[0].mood.score} · Coldest <b>${esc(it[it.length-1].label)}</b> ${it[it.length-1].mood.score}</div></a>`;}

function li(i){return `<button class="li" data-k="${esc(i.g+"|"+i.sym)}"><span style="font-size:20px">${i.mood.emoji}</span>
  <span class="nm"><b>${esc(i.label)}</b> <small>${esc(i.name)}</small><span class="tag" style="--c:${cvar(i.g)}">${DESKS[i.g].short}</span></span>
  <span class="num ${chCls(i.chg_pct)}">${fmtCh(i.chg_pct)}</span><span class="num" style="text-align:right;font-weight:600">${i.mood.score}</span></button>`;}

function overview(){
  const s=avg(all.map(i=>i.mood.score)),t=tier(s),srt=[...all].sort((a,b)=>b.mood.score-a.mood.score);
  const hot=all.filter(i=>i.mood.score>=70).length,cold=all.filter(i=>i.mood.score<31).length;
  return `<section class="hero"><div class="big" style="--s:${s};--mc:${moodColor(s)}"><span class="e">${t[1]}</span><span class="n">${s}</span><span class="eyebrow">${t[2]}</span></div>
   <div><div class="eyebrow">Market mood · ${dayOnly(D.updated)}</div><h2>${headline()}</h2>
   <p>${all.length} assets across five desks, each scored 0 to 100 for how warm its price action is right now. ${hot} are running hot (70+) and ${cold} are cold (under 31). Tap any dot or card for the full read.</p></div></section>
  <div class="strip"><h3>Every asset on one thermometer</h3><p class="sub">Each dot is one asset placed at its mood score. Colour shows its desk.</p>
   ${thermo()}<div class="legend">${ORDER.map(id=>`<span><i style="--c:${cvar(id)}"></i>${DESKS[id].name}</span>`).join("")}</div></div>
  <section class="sec"><h2>What the emojis mean</h2><p class="lead">Every asset gets one of seven moods, from frozen to rocket, based on its 0–100 mood score. Each mood is judged against what is normal for that desk, so a 1% move in the euro counts for more than 1% in Solana. Add " · wild day" when the move was more than three times a normal day.</p>${keyCards()}</section>
  <section class="sec"><h2>The five desks</h2><p class="lead">Average mood per desk. The emoji row shows each member, in rank order.</p><div class="desks">${ORDER.map(deskCard).join("")}</div></section>
  <section class="sec"><div class="pair"><div class="list"><h3>🔥 Hottest right now</h3>${srt.slice(0,6).map(li).join("")}</div>
   <div class="list"><h3>🥶 Coldest right now</h3>${srt.slice(-6).reverse().map(li).join("")}</div></div></section>`;}

function tile(i,rank,extra=""){const c=cvar(i.g);
  return `<button class="tile" style="--c:${c}" data-k="${esc(i.g+"|"+i.sym)}"><span class="rk">#${rank}</span>
   <span class="lb">${esc(i.label)}<small>${esc(i.name)}${UNITS[i.label]?" · "+UNITS[i.label]:""}</small></span><span class="em" title="${esc(i.mood.label)}">${i.mood.emoji}</span>
   <span class="px">${fmtPx(i)}</span><span class="ch ${chCls(i.chg_pct)}">${fmtCh(i.chg_pct)}</span>${spark(i.spark,c)}${meter(i.mood.score)}${extra}</button>`;}

function intro(id){const d=DESKS[id],g=G[id],s=deskAvg(id),t=tier(s);
  return `<section class="hero"><div class="big" style="--s:${s};--mc:${moodColor(s)}"><span class="e">${t[1]}</span><span class="n">${s}</span><span class="eyebrow">${t[2]}</span></div>
   <div><div class="eyebrow">${d.name} desk · updated ${when(g.updated)}</div><h2>${d.name} ${verb(s,id,1)}</h2><p>${d.what}</p></div></section>
   <div class="intro"><div class="card"><h3>Why it matters</h3><p>${d.why}</p><p style="margin-top:8px">${esc(g.note)}</p></div>
   <div class="card"><h3>How to read it</h3><ul>${d.read.map(r=>`<li>${r}</li>`).join("")}</ul></div></div>${keyMini()}`;}

let idxSel="sp500";
function deskView(id){
  if(id==="stocks"){const I=D.indexes[idxSel],by={};G.stocks.items.forEach(i=>by[i.sym]=i);const mx=Math.max(...I.rows.map(r=>r.weight));
    const rows=I.rows.map((r,k)=>by[r.sym]?tile(by[r.sym],k+1,`<span class="wt">Weight<span class="m"><b style="width:${r.weight/mx*100}%"></b></span><span class="num">${r.weight.toFixed(2)}%</span></span>`):"").join("");
    const ia=avg(I.rows.filter(r=>by[r.sym]).map(r=>by[r.sym].mood.score));
    return intro(id)+`<div class="subtabs" role="group" aria-label="Index">${Object.keys(IDX).map(k=>`<button data-idx="${k}" aria-pressed="${k===idxSel}">${IDX[k]}</button>`).join("")}</div>
     <p class="idxnote">${IDX[idxSel]} top ten · mood ${tier(ia)[1]} ${ia} · weights via ${IDXETF[idxSel]}, ${esc(I.asof)}</p><div class="grid">${rows}</div>`;}
  if(id==="etfs"){const it=G.etfs.items,mx=Math.max(...it.map(i=>i.aum));
    return intro(id)+`<div class="aum"><h3>Assets under management</h3>${it.map(i=>`<div class="ar"><b>${esc(i.label)}</b><div class="m"><b style="width:${i.aum/mx*100}%"></b></div><span class="v">${big(i.aum)}</span></div>`).join("")}</div>
     <div class="grid">${it.map((i,k)=>tile(i,k+1,`<span class="wt">${esc(i.desc.split(": ")[1]||i.desc)} · fee ${esc(i.expense)}</span>`)).join("")}</div>`;}
  return intro(id)+`<div class="grid">${G[id].items.map((i,k)=>tile(i,k+1)).join("")}</div>`;}

function how(){return `<section class="hero" style="grid-template-columns:1fr"><div><div class="eyebrow">Method</div><h2>How the mood score works</h2>
  <p>The mood score is a temperature reading for price action. It blends three things, each measured against how much that desk normally moves, so a 1% day means more for the euro than for Solana.</p></div></section>
  <div class="how"><div class="card"><h3>The formula</h3>
   <p><b>Today's move</b> (up to ±25 points): the day change divided by the desk's typical move (the median move of its ten members). A move three times bigger than typical is flagged as a wild day.</p>
   <p><b>Trend</b> (up to ±15 points): the change from the start to the end of the sparkline, on the same scale.</p>
   <p><b>Range position</b> (±10 points): where the latest price sits between the sparkline's low and high.</p>
   <div class="formula">score = 50
      + 25 × tanh(move ÷ typical ÷ 2)
      + 15 × tanh(trend ÷ typical ÷ 3)
      + 20 × (range position − 0.5)</div>
   <p style="margin-top:10px">The tanh curve keeps one extreme day from pinning the score at 0 or 100.</p></div>
  <div class="card" style="grid-column:1/-1"><h3>The seven moods</h3>${keyCards()}<p style="margin-top:12px">" · wild day" is added when today's move is more than three times a normal day for that desk.</p>
   <p style="margin-top:14px">It describes what already happened. It is not a forecast and not a buy or sell signal.</p></div>
  <div class="card"><h3>Where the numbers come from</h3><p>Currencies, commodities, stocks and ETF prices: Yahoo Finance. Crypto prices and rankings: CoinGecko. Dow and S&amp;P 500 weights: State Street (DIA, SPY holdings). Nasdaq-100 weights and ETF assets: Nasdaq.com. Russell 2000: iShares IWM filings.</p>
   <p>Collected every 15 minutes by the Opty data station; the ETF ranking refreshes each morning. Snapshot shown: ${when(D.updated)}.</p></div>
  <div class="card"><h3>Fine print</h3><p>For information and entertainment. Not investment advice. Prices may be delayed and can contain errors; check a primary source before acting.</p></div></div>`;}

// detail dialog
const dlg=R.getElementById("dlg");
function openDetail(k){const [g,sym]=k.split("|"),i=G[g].items.find(x=>x.sym===sym); if(!i) return; const p=parts(i),c=cvar(g),f=n=>(n>=0?"+":"−")+Math.abs(n).toFixed(1);
  const extra=g==="stocks"?Object.keys(IDX).map(x=>{const r=D.indexes[x].rows.find(r=>r.sym===sym);return r?`<dt>${IDX[x]} weight</dt><dd>${r.weight.toFixed(2)}%</dd>`:""}).join("")
    :g==="etfs"?`<dt>Assets</dt><dd>${big(i.aum)}</dd><dt>Yearly fee</dt><dd>${esc(i.expense)}</dd>`:g==="crypto"&&i.mcap?`<dt>Market cap</dt><dd>${big(i.mcap)}</dd>`:UNITS[i.label]?`<dt>Unit</dt><dd>${UNITS[i.label]}</dd>`:"";
  R.getElementById("dlgBody").innerHTML=`<header><div><div class="eyebrow" style="color:${c}">${DESKS[g].name}</div><h3>${i.mood.emoji} ${esc(i.label)} <span style="color:var(--mute);font-weight:500;font-size:16px">${esc(i.name)}</span></h3></div><button class="x" id="dlgX">Close</button></header>
   <div style="display:flex;gap:16px;align-items:baseline;margin-top:8px"><span class="num" style="font-size:26px;font-weight:600">${fmtPx(i)}</span><span class="num ${chCls(i.chg_pct)}" style="font-size:18px">${fmtCh(i.chg_pct)}</span></div>
   ${spark(i.spark,c,90,480)}${meter(i.mood.score)}
   <div class="brk"><div><span>Base</span><b>50.0</b></div><div><span>Today's move (${p.z.toFixed(1)}× a typical ${p.typ.toFixed(2)}% day)</span><b>${f(p.move)}</b></div>
   <div><span>Trend over the sparkline</span><b>${f(p.trend)}</b></div><div><span>Range position (${Math.round(p.pos*100)}% of low→high)</span><b>${f(p.range)}</b></div>
   <div class="tot"><span>Mood score · ${esc(i.mood.label)}</span><b>${i.mood.score}</b></div></div>
   <dl class="kv"><dt>As of</dt><dd>${when(i.time)}</dd>${extra}</dl>`;
  R.getElementById("dlgX").onclick=()=>dlg.close(); dlg.showModal();}
dlg.addEventListener("click",e=>{if(e.target===dlg) dlg.close()});

// app shell
const VIEWS=["overview",...ORDER,"how"];
function render(){let v=HOST._view; if(!VIEWS.includes(v)) v="overview";
  const tabs=VIEWS.map(id=>`<a href="#${id}" ${id===v?'aria-current="page"':""} style="--c:${DESKS[id]?cvar(id):"var(--ink)"}">${id==="overview"?"Overview":id==="how"?"How it works":DESKS[id].name}</a>`).join("");
  R.getElementById("app").innerHTML=`<div class="wrap"><header class="top"><div class="brand"><h1>Opty Top Tens <span>· market mood board</span></h1><span class="eyebrow">Snapshot ${when(D.updated)}</span></div><nav class="tabs" aria-label="Desks">${tabs}</nav></header>${EMBED?'<div class="scroller" id="sc">':""}
   <main>${v==="overview"?overview():v==="how"?how():deskView(v)}</main>
   <footer>Opty Top Tens by Optymystz. Data: Yahoo Finance, CoinGecko, State Street, Nasdaq.com, iShares. Mood scores describe recent price action only. Not investment advice.</footer>${EMBED?"</div>":""}</div>`;
  bind(); if(v!==render.last){if(EMBED){const s=R.getElementById("sc");if(s)s.scrollTop=0}else if(render.last){const y=HOST.getBoundingClientRect().top;if(y<0)window.scrollBy(0,y-10)}render.last=v}}
function bind(){
  R.querySelectorAll("[data-k]").forEach(b=>b.addEventListener("click",()=>openDetail(b.dataset.k)));
  R.querySelectorAll("[data-idx]").forEach(b=>b.addEventListener("click",()=>{idxSel=b.dataset.idx;render()}));
  const th=R.querySelector(".thermo"); if(th){const tip=document.createElement("div");tip.className="tip";tip.hidden=true;th.appendChild(tip);
    th.querySelectorAll(".dot").forEach(d=>{const show=()=>{const [g,s]=d.dataset.k.split("|"),i=G[g].items.find(x=>x.sym===s);tip.textContent=`${i.mood.emoji} ${i.label} ${i.mood.score} · ${fmtCh(i.chg_pct)}`;tip.style.left=d.style.left;tip.style.bottom=d.style.bottom;tip.style.top="auto";tip.style.transform="translate(-50%,-22px)";tip.hidden=false};
      d.addEventListener("mouseenter",show);d.addEventListener("focus",show);d.addEventListener("mouseleave",()=>tip.hidden=true);d.addEventListener("blur",()=>tip.hidden=true)})}}

// ===== poster renderer =====
function poster(id){document.documentElement.classList.add("poster");document.documentElement.setAttribute("data-theme","light");
  const foot=`<div class="foot"><div>Mood 0–100 blends today's move, the recent trend and where price sits in its range, scaled to each desk's normal moves. A temperature, not a trade signal. Not investment advice.<br>Data: Yahoo Finance · CoinGecko · State Street · Nasdaq.com · iShares</div><b>Interactive board → link in bio</b></div>`;
  const keyrow=`<div class="keyrow">${[...TIERS].reverse().map(t=>`<span><i>${t[1]}</i><b>${t[2]}</b>${t[0]}+</span>`).join("")}</div>`;
  const top=`<div class="top"><b>Opty Top Tens</b><span>${dayOnly(D.updated)}</span></div>`;
  const row=(i,k)=>`<div class="r"><span class="rk">${String(k+1).padStart(2,"0")}</span><span class="em">${i.mood.emoji}</span><span class="lb">${esc(i.label)}<small>${esc(id==="etfs"?big(i.aum):i.name===i.label?"":i.name)}</small></span><span class="px">${fmtPx(i)}</span><span class="ch ${chCls(i.chg_pct)}">${fmtCh(i.chg_pct)}</span><span class="mt"><span class="m"><b style="width:${i.mood.score}%;--mc:${moodColor(i.mood.score)}"></b></span><span>${i.mood.score}</span></span></div>`;
  let html;
  if(id==="overview"){const s=avg(all.map(i=>i.mood.score)),t=tier(s),srt=[...all].sort((a,b)=>b.mood.score-a.mood.score);
    const cr=i=>`<div class="cr"><span class="em">${i.mood.emoji}</span><span><b>${esc(i.label)}</b> <span class="g">${DESKS[i.g].short}</span></span><span class="${chCls(i.chg_pct)}">${fmtCh(i.chg_pct)}</span><span><b>${i.mood.score}</b></span></div>`;
    html=`${top}<div class="head"><div><h2>${headline()}</h2><p>${all.length} assets across currencies, crypto, commodities, index leaders and the biggest ETFs, scored by mood.</p></div>
      <div class="gauge"><div class="e">${t[1]}</div><div class="n">${s}</div><div class="l">${t[2]}</div></div></div>
      <div class="ov"><div class="pthermo">${thermo("p").replace('class="thermo p"','class="thermo"')}</div>
      <div class="pdesks">${ORDER.map(d=>{const a=deskAvg(d),tt=tier(a);return `<div class="pd" style="--c:${cvar(d)}"><div class="t">${DESKS[d].short}</div><div class="em">${tt[1]}</div><div class="sc">${a}</div><div class="l">${tt[2]}</div></div>`}).join("")}</div>
      <div class="ppair"><div><h4>🔥 Hottest</h4>${srt.slice(0,3).map(cr).join("")}</div><div><h4>🥶 Coldest</h4>${srt.slice(-3).reverse().map(cr).join("")}</div></div></div>${keyrow}${foot}`;}
  else if(id==="key"){
    html=`${top}<div class="head"><div><h2>How to read the emojis</h2><p>Every asset gets a mood score from 0 to 100: today's move, the recent trend and where the price sits in its range, judged against what is normal for its group.</p></div><div class="gauge"><div class="e">🌡️</div></div></div>
      <div class="klist">${TIERS.map((t,k)=>`<div class="kr"><div class="e">${t[1]}</div><div><h3>${t[2]}<span>${rng(k)}</span></h3><p>${MEAN[t[2]]}</p><div class="sw" style="--mc:${moodColor(Math.min(100,t[0]+7))}"></div></div></div>`).join("")}</div>
      <div class="wild">"· wild day" means the move was more than 3× a normal day for that group. The mood describes what already happened. It is not a forecast.</div>${foot}`;}
  else if(id==="stocks"){const by={};G.stocks.items.forEach(i=>by[i.sym]=i);const s=deskAvg(id),t=tier(s);
    html=`${top}<div class="head" style="--c:${cvar(id)}"><div><h2>Index leaders ${verb(s,id)}</h2><p>The ten heaviest stocks in each of the four big US indexes, scored by mood.</p></div>
      <div class="gauge"><div class="e">${t[1]}</div><div class="n">${s}</div><div class="l">${t[2]}</div></div></div>
      <div class="cols">${Object.keys(IDX).map(x=>{const rows=D.indexes[x].rows.filter(r=>by[r.sym]),ia=avg(rows.map(r=>by[r.sym].mood.score));
        return `<div class="col"><h4>${IDX[x]}<small>mood ${tier(ia)[1]} ${ia}</small></h4>${rows.map(r=>{const i=by[r.sym];return `<div class="cr"><span class="em">${i.mood.emoji}</span><b>${esc(i.label)}</b><span class="${chCls(i.chg_pct)}">${fmtCh(i.chg_pct)}</span></div>`}).join("")}</div>`}).join("")}</div>${keyrow}${foot}`;}
  else{const s=deskAvg(id),t=tier(s),d=DESKS[id];
    html=`${top}<div class="head" style="--c:${cvar(id)}"><div><h2>${d.name} ${verb(s,id)}</h2><p>${esc(G[id].note.split(". ")[0])}.</p></div>
      <div class="gauge"><div class="e">${t[1]}</div><div class="n">${s}</div><div class="l">${t[2]}</div></div></div>
      <div class="rows">${G[id].items.map(row).join("")}</div>${keyrow}${foot}`;}
  R.getElementById("app").innerHTML=`<div class="P" style="--c:${DESKS[id]?cvar(id):"var(--ink)"}">${html}</div>`;}

if(!HOST._clicks){HOST._clicks=1;R.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();HOST._view=a.getAttribute("href").slice(1);HOST._render()})}
HOST._render=render;render();

}
customElements.define("opty-top-tens",OptyTopTens);
})();
