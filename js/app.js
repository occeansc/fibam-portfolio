/* ════════════════════════════════════════════════
   FIBAM PORTFOLIO — app.js  v2.0
   Rendering logic, event handlers, chart init
   Requires: data.js loaded first
════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────
   CHART REGISTRY — destroy before re-create to prevent memory leaks
   Usage: safeChart(canvas, config) instead of new Chart(canvas, config)
──────────────────────────────────────────── */
function safeChart(canvasOrId, config) {
  const canvas = typeof canvasOrId === 'string'
    ? document.getElementById(canvasOrId)
    : canvasOrId;
  if (!canvas) return null;
  // Destroy any existing Chart instance on this canvas
  const existing = Chart.getChart(canvas);
  if (existing) existing.destroy();
  return new Chart(canvas, config);
}

/* ────────────────────────────────────────────
   UTILITIES
──────────────────────────────────────────── */
const fmt     = (n,p='$',d=2) => n==null?'—':(n<0?'-':'')+p+(Math.abs(n)>=1000?((Math.abs(n)/1000).toFixed(1)+'k'):Math.abs(n).toFixed(d));
const fmtFull = (n,p='$')    => n==null?'—':(n<0?'-':'')+p+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const fmtPct  = (n,d=2)      => n==null?'—':(n>0?'+':'')+((n*100).toFixed(d))+'%';
const fmtDate = d => d ? new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : 'Present';
const fmtShrt = d => d ? new Date(d+'T00:00:00').toLocaleDateString('en-GB',{month:'short',year:'2-digit'}) : 'Now';
const daysBetween = (a,b) => Math.max(1,Math.round((new Date((b||new Date().toISOString().slice(0,10))+'T00:00:00')-new Date(a+'T00:00:00'))/86400000));

function tradeStats(trades) {
  if (!trades || !trades.length) return null;
  const wins   = trades.filter(t=>t.netPnl>0);
  const losses = trades.filter(t=>t.netPnl<0);
  const total  = parseFloat(trades.reduce((s,t)=>s+t.netPnl,0).toFixed(2));
  const gw     = wins.reduce((s,t)=>s+t.netPnl,0);
  const gl     = Math.abs(losses.reduce((s,t)=>s+t.netPnl,0));
  // daily aggregation, sorted
  const daily = {};
  trades.forEach(t => { daily[t.closeDate] = parseFloat(((daily[t.closeDate]||0)+t.netPnl).toFixed(2)); });
  const days = Object.entries(daily).sort((a,b)=>a[0].localeCompare(b[0]));
  const best  = days.reduce((a,b)=>b[1]>a[1]?b:a, days[0]);
  const worst = days.reduce((a,b)=>b[1]<a[1]?b:a, days[0]);
  let cum = 0;
  const equityCurve = days.map(([d,v]) => { cum=parseFloat((cum+v).toFixed(2)); return {date:d,cum}; });
  return {
    total, count:trades.length,
    wins:wins.length, losses:losses.length,
    winRate: wins.length/trades.length,
    avgWin:  wins.length   ? parseFloat((gw/wins.length).toFixed(2))   : 0,
    avgLoss: losses.length ? parseFloat((gl/losses.length).toFixed(2)) : 0,
    profitFactor: gl>0 ? parseFloat((gw/gl).toFixed(2)) : (gw>0?99:0),
    totalComm: parseFloat(trades.reduce((s,t)=>s+t.commission,0).toFixed(2)),
    totalSwap: parseFloat(trades.reduce((s,t)=>s+t.swap,0).toFixed(2)),
    daily, bestDay:best, worstDay:worst, equityCurve
  };
}

/* ────────────────────────────────────────────
   NAV
──────────────────────────────────────────── */
function initNav() {
  const nav=document.getElementById('nav'), btn=document.getElementById('menuBtn'), mob=document.getElementById('mobileMenu');
  const secs=['hero','overview','accounts','live','calendars','trading','funds','performance'];
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',window.scrollY>20);
    let cur='hero'; secs.forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-120)cur=id;});
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+cur));
  },{passive:true});
  btn.addEventListener('click',()=>{const isOpen=mob.classList.toggle('open');btn.setAttribute('aria-expanded',isOpen);document.body.style.overflow=isOpen?'hidden':'';});
  document.querySelectorAll('.nav-mobile-link').forEach(l=>l.addEventListener('click',()=>{mob.classList.remove('open');btn.setAttribute('aria-expanded','false');document.body.style.overflow='';}));
  // Close mobile nav on outside tap
  document.addEventListener('click',e=>{if(mob.classList.contains('open')&&!mob.contains(e.target)&&!btn.contains(e.target)){mob.classList.remove('open');btn.setAttribute('aria-expanded','false');document.body.style.overflow='';}});
}

/* ────────────────────────────────────────────
   COUNT-UP
──────────────────────────────────────────── */
function initCountUp() {
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target,target=parseInt(el.dataset.target),suffix=el.dataset.suffix||'',dur=1200,start=performance.now();
      const run=now=>{const p=Math.min((now-start)/dur,1),ease=1-Math.pow(1-p,3);el.textContent=Math.floor(ease*target).toLocaleString()+suffix;if(p<1)requestAnimationFrame(run);};
      requestAnimationFrame(run); obs.unobserve(el);
    });
  },{threshold:0.5});
  document.querySelectorAll('.hero-stat-num').forEach(n=>obs.observe(n));
}

/* ────────────────────────────────────────────
   HERO TIMELINE
──────────────────────────────────────────── */
function buildHeroTimeline() {
  const track=document.getElementById('heroTimeline'); if(!track)return;
  const minD=new Date('2020-03-01T00:00:00'),maxD=new Date('2026-07-01T00:00:00'),totalMs=maxD-minD;
  const C={spot:'#40B5AD',futures:'#6366f1',stocks:'#16a34a',ngx:'#d97706',personal:'#7c3aed'};
  ACCOUNTS.forEach(acc=>{
    const s=new Date(acc.startDate+'T00:00:00'),e=acc.endDate?new Date(acc.endDate+'T00:00:00'):new Date();
    const left=((s-minD)/totalMs)*100,width=Math.max(0.5,((e-s)/totalMs)*100);
    const color=acc.type==='personal'?C.personal:C[acc.market]||'#aaa';
    const bar=document.createElement('div');
    bar.className='timeline-bar';
    bar.style.cssText=`left:${left}%;width:${width}%;background:${color};`;
    bar.title=`${acc.shortName} · ${fmtDate(acc.startDate)} → ${fmtDate(acc.endDate)}`;
    bar.textContent=width>4?acc.shortName:'';
    bar.addEventListener('click',()=>openDrawer(acc.id));
    track.appendChild(bar);
  });
}

/* ────────────────────────────────────────────
   OVERVIEW CHARTS
──────────────────────────────────────────── */
const CD={plugins:{legend:{display:false},tooltip:{enabled:false}},animation:{duration:900,easing:'easeOutCubic'}};
const TIP={backgroundColor:'#fff',titleColor:'#141f1e',bodyColor:'#3d5452',borderColor:'#ddecea',borderWidth:1,padding:10};

function buildOverviewCharts() {
  buildDonut('marketDonut','marketLegend',[
    {label:'US Futures',value:250000,color:'#6366f1'},
    {label:'Spot FX',value:31000,color:'#40B5AD'},
    {label:'US Stocks',value:1000,color:'#16a34a'},
    {label:'Personal',value:722,color:'#7c3aed'},
  ],v=>'$'+(v/1000).toFixed(0)+'k');
  buildDonut('typeDonut','typeLegend',[
    {label:'Prop Eval',value:9,color:'#40B5AD'},
    {label:'Live Funds',value:2,color:'#16a34a'},
    {label:'Personal',value:2,color:'#7c3aed'},
    {label:'Active Eval',value:2,color:'#d97706'},
  ],v=>v+' accts');
  buildPnlBar();
}
function buildDonut(cId,lId,data,fv) {
  const c=document.getElementById(cId);if(!c)return;
  safeChart(c,{type:'doughnut',data:{labels:data.map(d=>d.label),datasets:[{data:data.map(d=>d.value),backgroundColor:data.map(d=>d.color),borderWidth:3,borderColor:'#fff',hoverOffset:6}]},options:{cutout:'72%',...CD,plugins:{legend:{display:false},tooltip:{enabled:true,...TIP,callbacks:{label:ctx=>` ${ctx.label}: ${fv(ctx.raw)}`}}}}});
  const l=document.getElementById(lId);if(!l)return;
  data.forEach(d=>{l.innerHTML+=`<div class="legend-item"><span class="legend-dot" style="background:${d.color}"></span><span>${d.label}</span><span class="legend-val">${fv(d.value)}</span></div>`;});
}
function buildPnlBar() {
  const c=document.getElementById('pnlBar');if(!c)return;
  const cl=ACCOUNTS.filter(a=>a.pnl!=null);
  safeChart(c,{type:'bar',data:{labels:cl.map(a=>a.shortName),datasets:[{data:cl.map(a=>a.pnl),backgroundColor:cl.map(a=>a.pnl>=0?'rgba(22,163,74,0.8)':'rgba(220,38,38,0.8)'),borderRadius:4,borderSkipped:false}]},options:{responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` P&L: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10},maxRotation:40}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>'$'+(v/1000).toFixed(1)+'k'}}}}});
}

/* ────────────────────────────────────────────
   ACCOUNT CARDS
──────────────────────────────────────────── */
function buildAccountCards(filter='all') {
  const grid=document.getElementById('accountsGrid');if(!grid)return;
  const list=filter==='all'?ACCOUNTS:ACCOUNTS.filter(a=>{
    if(filter==='active')    return a.status==='active';
    if(filter==='prop-eval') return a.type==='prop-eval';
    if(filter==='personal')  return a.type==='personal';
    if(filter==='fund')      return a.type==='fund';
    return true;
  });
  grid.innerHTML=list.map(acc=>{
    const days=daysBetween(acc.startDate,acc.endDate);
    const sB=acc.status==='active'
      ? `<span class="badge badge--active">● Active</span>`
      : acc.type==='personal'
        ? `<span class="badge badge--completed">✓ Closed</span>`
        : `<span class="badge badge--completed">✓ Ended</span>`;
    const tB=acc.type==='prop-eval'?`<span class="badge badge--eval">Prop Eval</span>`:acc.type==='fund'?`<span class="badge badge--fund">Fund</span>`:`<span class="badge badge--personal">Personal</span>`;
    const mB=`<span class="badge badge--${acc.market}">${acc.marketLabel}</span>`;
    const sV=acc.currency==='NGN'?`<span class="account-card-stat-val neutral">NGN</span>`:`<span class="account-card-stat-val neutral">${fmt(acc.size)}</span>`;
    const pV=acc.pnl!=null?`<span class="account-card-stat-val ${acc.pnl>=0?'positive':'negative'}">${fmtFull(acc.pnl)}</span>`:`<span class="account-card-stat-val neutral">Active</span>`;
    const rV=acc.performance!=null?`<span class="account-card-stat-val ${acc.performance>=0?'positive':'negative'}">${fmtPct(acc.performance)}</span>`:`<span class="account-card-stat-val neutral">—</span>`;
    const tV=acc.trades>0?`<span class="account-card-stat-val">${acc.trades.toLocaleString()}</span>`:`<span class="account-card-stat-val neutral">—</span>`;
    return `<div class="account-card" data-status="${acc.status}" data-type="${acc.type}" onclick="openDrawer('${acc.id}')">
      <div class="account-card-top"><div class="account-card-badges">${sB}${tB}${mB}</div><span class="account-card-platform">${acc.platform}</span></div>
      <div class="account-card-name">${acc.shortName}</div>
      <div class="account-card-title">${acc.platform}</div>
      <div class="account-card-period">${fmtDate(acc.startDate)} → ${fmtDate(acc.endDate)} · ${days}d</div>
      <div class="account-card-stats">
        <div class="account-card-stat"><div class="account-card-stat-label">Size</div>${sV}</div>
        <div class="account-card-stat"><div class="account-card-stat-label">Net P&L</div>${pV}</div>
        <div class="account-card-stat"><div class="account-card-stat-label">Return</div>${rV}</div>
        <div class="account-card-stat"><div class="account-card-stat-label">Trades</div>${tV}</div>
      </div>
      <div class="account-card-footer"><span class="account-card-cta">View details →</span><span class="account-card-trades">${acc.instruments.slice(0,3).join(' · ')}</span></div>
    </div>`;
  }).join('');
}
function initAccountFilters() {
  document.querySelectorAll('.filter-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.filter-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); buildAccountCards(btn.dataset.filter);
    });
  });
}

/* ────────────────────────────────────────────
   LIVE DASHBOARDS
──────────────────────────────────────────── */
function buildLiveDashboards() {
  buildLiveCard('FDNT-6KX1','fdntMetrics','fdntEquity','fdntTargetPct','fdntTargetBar','fdntDDPct','fdntDDBar');
  buildLiveCard('T5RS-5KX1','t5rsMetrics','t5rsEquity','t5rsTargetPct','t5rsTargetBar','t5rsDDPct','t5rsDDBar');
}
function buildLiveCard(id,mId,cId,tPId,tBId,dPId,dBId) {
  const trades=TRADE_DATA[id], targets=PROP_TARGETS[id];
  if(!trades||!targets)return;
  const s=tradeStats(trades);

  const el=document.getElementById(mId);
  if(el) {
    const pc=s.total>=0?'pos':'neg';
    el.style.gridTemplateColumns='repeat(4,1fr)';
    el.innerHTML=`
      <div class="live-metric"><div class="live-metric-label">Net P&L</div><div class="live-metric-val ${pc}">${fmtFull(s.total)}</div></div>
      <div class="live-metric"><div class="live-metric-label">Win Rate</div><div class="live-metric-val neu">${(s.winRate*100).toFixed(0)}%</div></div>
      <div class="live-metric"><div class="live-metric-label">Profit Factor</div><div class="live-metric-val ${s.profitFactor>=1?'pos':'neg'}">${s.profitFactor}</div></div>
      <div class="live-metric"><div class="live-metric-label">Trades</div><div class="live-metric-val neu">${s.count}</div></div>
      <div class="live-metric"><div class="live-metric-label">Avg Win</div><div class="live-metric-val pos small">+${fmtFull(s.avgWin)}</div></div>
      <div class="live-metric"><div class="live-metric-label">Avg Loss</div><div class="live-metric-val neg small">−${fmtFull(s.avgLoss)}</div></div>
      <div class="live-metric"><div class="live-metric-label">Best Day</div><div class="live-metric-val pos small">${fmtFull(s.bestDay[1])}</div></div>
      <div class="live-metric"><div class="live-metric-label">Costs</div><div class="live-metric-val neg small">−${fmtFull(s.totalComm+s.totalSwap)}</div></div>`;
  }

  // Progress bars
  const profitPct=Math.max(0,(s.total/targets.profitTarget)*100);
  const ddAbs=Math.abs(Math.min(0,s.total));
  const ddPct=(ddAbs/targets.maxDD)*100;
  const tPE=document.getElementById(tPId),tBE=document.getElementById(tBId);
  const dPE=document.getElementById(dPId),dBE=document.getElementById(dBId);
  if(tPE) tPE.textContent=`${fmtFull(Math.max(0,s.total))} / ${fmtFull(targets.profitTarget)} (${Math.min(100,profitPct).toFixed(1)}%)`;
  if(tBE) setTimeout(()=>{ tBE.style.width=Math.min(100,profitPct)+'%'; },300);
  if(dPE) dPE.textContent=`${fmtFull(ddAbs)} used of ${fmtFull(targets.maxDD)} (${ddPct.toFixed(1)}%)`;
  if(dBE) setTimeout(()=>{ dBE.style.width=Math.min(100,ddPct)+'%'; },300);

  // Equity curve
  const canvas=document.getElementById(cId);
  if(!canvas||!s.equityCurve.length)return;
  const labels=s.equityCurve.map(p=>new Date(p.date+'T00:00:00').toLocaleDateString('en-GB',{month:'short',day:'numeric'}));
  const values=s.equityCurve.map(p=>p.cum);
  const lc=values[values.length-1]>=0?'#16a34a':'#dc2626';
  safeChart(canvas,{type:'line',data:{labels,datasets:[{data:values,borderColor:lc,borderWidth:2.5,pointRadius:4,pointBackgroundColor:lc,pointBorderColor:'#fff',pointBorderWidth:2,tension:0.3,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,90);g.addColorStop(0,lc+'33');g.addColorStop(1,lc+'00');return g;}}]},options:{responsive:true,animation:{duration:800},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` Cumulative: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10,family:'JetBrains Mono'}}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10,family:'JetBrains Mono'},callback:v=>'$'+v}}}}});
}

/* ════════════════════════════════════════════════
   PNL CALENDARS — 3-level drill-down
   Levels: years-overview → year (12 months) → month (daily grid)
   Covers all accounts with trade data
════════════════════════════════════════════════ */

const CAL_ACCOUNTS = [
  { id:'FDNT-6KX1',   label:'FDNT',      group:'Active' },
  { id:'T5RS-5KX1',   label:'T5RS',      group:'Active' },
  { id:'1KHOOD',       label:'1kHooD',    group:'Active' },
  { id:'NGX',          label:'NGX',       group:'Active' },
  { id:'MFFX-X1',     label:'MFFX X1',   group:'FX Evals' },
  { id:'MFFX-X2',     label:'MFFX X2',   group:'FX Evals' },
  { id:'MFFX-X3',     label:'MFFX X3',   group:'FX Evals' },
  { id:'MFFX-X4',     label:'MFFX X4',   group:'FX Evals' },
  { id:'ALPARI-2020',  label:"ALP '20",   group:'Personal' },
  { id:'ALPARI-2023',  label:"ALP '23",   group:'Personal' },
  { id:'MFFU-X1',     label:'MFFU X1',   group:'Futures' },
  { id:'MFFU-X2',     label:'MFFU X2',   group:'Futures' },
  { id:'MFFU-X3',     label:'MFFU X3',   group:'Futures' },
  { id:'MFFU-X4',     label:'MFFU X4',   group:'Futures' },
  { id:'MFFU-X5',     label:'MFFU X5',   group:'Futures' },
];

// Calendar state
let CAL = { accId: 'FDNT-6KX1', view: 'year', year: null, month: null, dm: {} };

function _calDailyMap(accId) {
  const trades = TRADE_DATA[accId] || [];
  const dm = {};
  trades.forEach(t => {
    // Only show closed trades on calendar (open positions have no closeDate)
    if (t.open) return;
    const key = (t.closeDate || '').slice(0,10);
    if (!key) return;
    if (!dm[key]) dm[key] = { pnl:0, trades:[] };
    dm[key].pnl = parseFloat((dm[key].pnl + (t.netPnl||0)).toFixed(2));
    dm[key].trades.push(t);
  });
  return dm;
}

function _calCurrency(accId) {
  // Returns currency symbol for given account
  const ngn = ['NGX'];
  return ngn.includes(accId) ? '₦' : '$';
}

function _calYears(dm) {
  return [...new Set(Object.keys(dm).map(d=>d.slice(0,4)))].sort();
}

function initCalendars() {
  const root = document.getElementById('calRoot');
  if (!root) return;

  // Build tabs
  const tabBar = document.getElementById('calTabBar');
  if (tabBar) {
    let lastGroup = '';
    CAL_ACCOUNTS.forEach(ac => {
      const trades = TRADE_DATA[ac.id];
      if (!trades || !trades.length) return;
      if (ac.group !== lastGroup) {
        const sep = document.createElement('span');
        sep.className = 'cal-tab-sep';
        sep.textContent = ac.group;
        tabBar.appendChild(sep);
        lastGroup = ac.group;
      }
      const btn = document.createElement('button');
      btn.className = 'cal-tab' + (ac.id === CAL.accId ? ' active' : '');
      btn.textContent = ac.label;
      btn.dataset.account = ac.id;
      btn.addEventListener('click', () => {
        tabBar.querySelectorAll('.cal-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        CAL.accId = ac.id;
        CAL.dm = _calDailyMap(ac.id);
        const years = _calYears(CAL.dm);
        CAL.year = years[years.length-1] ? parseInt(years[years.length-1]) : new Date().getFullYear();
        CAL.view = 'year';
        _calRender();
      });
      tabBar.appendChild(btn);
    });
  }

  // Initial render
  CAL.dm = _calDailyMap(CAL.accId);
  const years = _calYears(CAL.dm);
  CAL.year = years[years.length-1] ? parseInt(years[years.length-1]) : new Date().getFullYear();
  CAL.view = 'year';
  _calRender();
}

function _calRender() {
  const root = document.getElementById('calRoot');
  if (!root) return;
  if (CAL.view === 'year') _calRenderYear(root);
  else if (CAL.view === 'month') _calRenderMonth(root);
}

// ── Year view: 12 month tiles ───────────────────
function _calRenderYear(root) {
  const years = _calYears(CAL.dm);
  const yr = CAL.year;

  let html = `<div class="cal-header">`;

  // Year navigation
  if (years.length > 1) {
    html += `<div class="cal-year-nav">`;
    years.forEach(y => {
      const yr2 = parseInt(y);
      const yearTrades = Object.entries(CAL.dm).filter(([d])=>d.startsWith(y));
      const total = yearTrades.reduce((s,[,v])=>s+v.pnl, 0);
      const cls = total >= 0 ? 'pos' : 'neg';
      html += `<button class="cal-yr-pill ${yr2===yr?'active':''}" data-yr="${yr2}">${y} <span class="${cls}">${total>=0?'+':''}${_calCurrency(CAL.accId)}${Math.abs(total).toFixed(0)}</span></button>`;
    });
    html += `</div>`;
  }

  html += `<div class="cal-breadcrumb"><span class="cal-bc-current">${yr}</span></div></div>`;
  html += `<div class="cal-months-grid">`;

  for (let m = 1; m <= 12; m++) {
    const ym = `${yr}-${String(m).padStart(2,'0')}`;
    const monthDays = Object.entries(CAL.dm).filter(([d])=>d.startsWith(ym));
    const total = parseFloat(monthDays.reduce((s,[,v])=>s+v.pnl,0).toFixed(2));
    const tradeCount = monthDays.reduce((s,[,v])=>s+v.trades.length,0);
    const winDays = monthDays.filter(([,v])=>v.pnl>0).length;
    const monthName = new Date(yr, m-1, 1).toLocaleDateString('en-GB',{month:'short'});
    const cls = monthDays.length === 0 ? 'empty' : total >= 0 ? 'pos' : 'neg';
    const sym = _calCurrency(CAL.accId);
    const totalStr = total >= 0 ? `+${sym}${total.toFixed(0)}` : `-${sym}${Math.abs(total).toFixed(0)}`;

    // Mini heatmap (max 31 cells)
    let heat = '<div class="cal-mini-heat">';
    const daysInMonth = new Date(yr, m, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${ym}-${String(d).padStart(2,'0')}`;
      const dd = CAL.dm[ds];
      if (dd) heat += `<div class="cal-heat-cell ${dd.pnl>=0?'g':'r'}" title="${ds}: ${dd.pnl>=0?'+':''}${dd.pnl.toFixed(2)}"></div>`;
      else heat += `<div class="cal-heat-cell"></div>`;
    }
    heat += '</div>';

    html += `<div class="cal-month-tile ${cls}" data-ym="${ym}">
      <div class="cal-tile-name">${monthName}</div>
      ${heat}
      <div class="cal-tile-total ${cls}">${monthDays.length ? totalStr : '—'}</div>
      ${tradeCount ? `<div class="cal-tile-meta">${tradeCount} trades · ${winDays}W/${monthDays.length-winDays}L</div>` : '<div class="cal-tile-meta cal-tile-meta--none">no trades</div>'}
    </div>`;
  }

  html += `</div>`;
  root.innerHTML = html;

  // Year pill clicks
  root.querySelectorAll('.cal-yr-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      CAL.year = parseInt(btn.dataset.yr);
      _calRenderYear(root);
    });
  });

  // Month tile clicks
  root.querySelectorAll('.cal-month-tile:not(.empty)').forEach(tile => {
    if (!tile.dataset.ym) return;
    const [y, mo] = tile.dataset.ym.split('-').map(Number);
    const hasTrades = Object.keys(CAL.dm).some(d => d.startsWith(tile.dataset.ym));
    if (!hasTrades) return;
    tile.style.cursor = 'pointer';
    tile.addEventListener('click', () => {
      CAL.view = 'month';
      CAL.year = y;
      CAL.month = mo;
      _calRenderMonth(root);
    });
  });
}

// ── Month view: daily grid ──────────────────────
function _calRenderMonth(root) {
  const yr = CAL.year, mo = CAL.month;
  const ym = `${yr}-${String(mo).padStart(2,'0')}`;
  const monthName = new Date(yr, mo-1, 1).toLocaleDateString('en-GB',{month:'long', year:'numeric'});
  const daysInMonth = new Date(yr, mo, 0).getDate();
  const monthDays = Object.entries(CAL.dm).filter(([d])=>d.startsWith(ym));
  const total = parseFloat(monthDays.reduce((s,[,v])=>s+v.pnl,0).toFixed(2));
  const winDays = monthDays.filter(([,v])=>v.pnl>0).length;
  const allTrades = monthDays.flatMap(([,v])=>v.trades);
  const mStats = allTrades.length ? tradeStats(allTrades) : null;
  const maxPnl = Math.max(...monthDays.map(([,v])=>Math.abs(v.pnl)), 1);

  const prevMo = mo === 1 ? `${yr-1}-12` : `${yr}-${String(mo-1).padStart(2,'0')}`;
  const nextMo = mo === 12 ? `${yr+1}-01` : `${yr}-${String(mo+1).padStart(2,'0')}`;
  const hasPrev = Object.keys(CAL.dm).some(d=>d.startsWith(prevMo));
  const hasNext = Object.keys(CAL.dm).some(d=>d.startsWith(nextMo));

  let html = `
  <div class="cal-header">
    <button class="cal-back-btn" id="calBack">&#8592; ${yr}</button>
    <div class="cal-month-nav">
      <button class="cal-nav-btn" id="calPrev" ${hasPrev?'':'disabled'}>&#8249;</button>
      <span class="cal-month-label">${monthName}</span>
      <button class="cal-nav-btn" id="calNext" ${hasNext?'':'disabled'}>&#8250;</button>
    </div>
  </div>
  <div class="cal-month-stats-bar">
    <div class="cal-ms-item"><span class="cal-ms-label">Net P&L</span><span class="cal-ms-val ${total>=0?'pos':'neg'}">${total>=0?'+':''}${_calCurrency(CAL.accId)}${fmtFull(Math.abs(total))}</span></div>
    <div class="cal-ms-item"><span class="cal-ms-label">Days</span><span class="cal-ms-val">${winDays}W / ${monthDays.length-winDays}L</span></div>
    <div class="cal-ms-item"><span class="cal-ms-label">Trades</span><span class="cal-ms-val">${allTrades.length}</span></div>
    ${mStats ? `<div class="cal-ms-item"><span class="cal-ms-label">Win Rate</span><span class="cal-ms-val ${mStats.winRate>=0.5?'pos':'neg'}">${(mStats.winRate*100).toFixed(0)}%</span></div>` : ''}
  </div>
  <div class="cal-grid-wrap">
    <div class="cal-dow-row">
      <div class="cal-dow">M</div><div class="cal-dow">T</div><div class="cal-dow">W</div>
      <div class="cal-dow">T</div><div class="cal-dow">F</div>
      <div class="cal-dow">S</div><div class="cal-dow">S</div>
    </div>
    <div class="cal-grid" id="calGrid"></div>
  </div>`;

  root.innerHTML = html;

  // Back button
  root.querySelector('#calBack').addEventListener('click', () => {
    CAL.view = 'year';
    _calRenderYear(root);
  });

  // Prev/Next month
  root.querySelector('#calPrev').addEventListener('click', () => {
    if (mo === 1) { CAL.year = yr-1; CAL.month = 12; }
    else CAL.month = mo - 1;
    _calRenderMonth(root);
  });
  root.querySelector('#calNext').addEventListener('click', () => {
    if (mo === 12) { CAL.year = yr+1; CAL.month = 1; }
    else CAL.month = mo + 1;
    _calRenderMonth(root);
  });

  // Build grid
  const grid = root.querySelector('#calGrid');
  let startDow = new Date(yr, mo-1, 1).getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;

  // Empty start cells
  for (let i = 0; i < startDow; i++) {
    const e = document.createElement('div');
    e.className = 'cal-day cal-day--empty';
    grid.appendChild(e);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${ym}-${String(d).padStart(2,'0')}`;
    const isWknd = ((startDow + d - 1) % 7) >= 5;
    const dayEl = document.createElement('div');
    const dayData = CAL.dm[ds];

    if (dayData) {
      const cls = dayData.pnl >= 0 ? 'cal-day--profit' : 'cal-day--loss';
      const intensity = Math.min(0.9, 0.25 + (Math.abs(dayData.pnl) / maxPnl) * 0.65);
      const _sym = _calCurrency(CAL.accId);
      const _abs = Math.abs(dayData.pnl);
      const pStr = (dayData.pnl >= 0 ? '+' : '-') + _sym + (_abs >= 1000 ? Math.round(_abs/1000)+'k' : _abs >= 100 ? Math.round(_abs) : _abs.toFixed(1));
      dayEl.className = `cal-day ${cls}`;
      dayEl.style.setProperty('--cal-intensity', intensity);
      dayEl.innerHTML = `<span class="cal-d-num">${d}</span><span class="cal-d-pnl">${pStr}</span><span class="cal-d-cnt">${dayData.trades.length}</span>`;
      dayEl.addEventListener('click', () => _calShowDayPanel(ds, dayData));
    } else {
      dayEl.className = `cal-day${isWknd ? ' cal-day--wknd' : ' cal-day--blank'}`;
      dayEl.innerHTML = `<span class="cal-d-num">${d}</span>`;
    }
    grid.appendChild(dayEl);
  }
}

// ── Day detail panel (bottom sheet on mobile, inline on desktop) ──
let _calPanel = null;
function _calClosePanel() {
  if (_calPanel) _calPanel.classList.remove('open');
  const ov = document.getElementById('calPanelOverlay');
  if (ov) ov.classList.remove('open');
}

function _calShowDayPanel(dateStr, dayData) {
  if (!_calPanel) {
    // Create overlay
    let overlay = document.getElementById('calPanelOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'calPanelOverlay';
      overlay.className = 'cal-day-panel-overlay';
      overlay.addEventListener('click', _calClosePanel);
      document.body.appendChild(overlay);
    }
    _calPanel = document.createElement('div');
    _calPanel.className = 'cal-day-panel';
    _calPanel.innerHTML = '<div class="cal-panel-handle"><button class="cal-panel-close" aria-label="Close">&#x2715;</button></div><div class="cal-panel-body"></div>';
    document.body.appendChild(_calPanel);
    _calPanel.querySelector('.cal-panel-close').addEventListener('click', _calClosePanel);
    _calPanel.querySelector('.cal-panel-handle').addEventListener('click', e => {
      if (!e.target.closest('.cal-panel-close')) _calClosePanel();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') _calClosePanel(); });
    // Swipe down to dismiss
    let ty = 0;
    _calPanel.addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, {passive:true});
    _calPanel.addEventListener('touchend', e => { if (e.changedTouches[0].clientY - ty > 60) _calClosePanel(); }, {passive:true});
  }
  // Show overlay on mobile
  const overlay = document.getElementById('calPanelOverlay');
  if (overlay && window.innerWidth < 768) overlay.classList.add('open');
  const df = new Date(dateStr+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const pc = dayData.pnl >= 0 ? 'pos' : 'neg';
  const _panelSym = _calCurrency(CAL.accId);
  const ps = (dayData.pnl >= 0 ? '+' : '') + _panelSym + fmtFull(Math.abs(dayData.pnl));
  const rows = dayData.trades.map(t => {
    const tc = t.netPnl >= 0 ? 'pos' : 'neg';
    const ts = (t.netPnl >= 0 ? '+' : '') + _panelSym + fmtFull(Math.abs(t.netPnl));
    const instr = t.instrument || t.ticker || '—';
    // Summary-only accounts: show note instead of trade row
    if (instr === 'ACCOUNT SUMMARY') {
      return `<div class="cal-panel-trade cal-panel-summary-row">
        <span class="cal-pt-instr" style="font-style:italic;opacity:0.7">Account summary — no individual trade log</span>
        <span class="cal-pt-pnl ${tc}">${ts}</span>
      </div>${t.notes ? `<div class="cal-panel-note">${t.notes}</div>` : ''}`;
    }
    const dir = t.direction ? (t.direction === 'Long' ? '▲' : '▼') : '';
    const qty  = t.qty  ? ` ×${t.qty}` : (t.lots ? ` ${t.lots}L` : '');
    return `<div class="cal-panel-trade">
      <span class="cal-pt-instr">${instr}</span>
      <span class="cal-pt-dir">${dir}${qty}</span>
      <span class="cal-pt-pnl ${tc}">${ts}</span>
    </div>`;
  }).join('');
    const _isSummary = dayData.trades.every(t => (t.instrument||t.ticker||'') === 'ACCOUNT SUMMARY');
  const _tradeLabel = _isSummary ? 'summary'
    : CAL.accId === 'NGX' ? `${dayData.trades.length} position${dayData.trades.length!==1?'s':''}`
    : `${dayData.trades.length} trade${dayData.trades.length!==1?'s':''}`;
  _calPanel.querySelector('.cal-panel-body').innerHTML = `
    <div class="cal-panel-date">${df}</div>
    <div class="cal-panel-total ${pc}">${ps} · ${_tradeLabel}</div>
    <div class="cal-panel-trades">${rows}</div>`;
  _calPanel.classList.add('open');
}

/* ────────────────────────────────────────────
/* ────────────────────────────────────────────
   TRADING TABLE
──────────────────────────────────────────── */
function buildTradingTable() {
  const rows=document.getElementById('tradingAccountsRows');if(!rows)return;
  const list=ACCOUNTS.filter(a=>a.type==='prop-eval'||a.type==='personal');
  rows.innerHTML=list.map(acc=>{
    const days=daysBetween(acc.startDate,acc.endDate);
    let sc, sl;
    if(acc.status==='active') {
      sc='active'; sl='● Active';
    } else if(acc.type==='personal') {
      sc='completed'; sl='✓ Closed';
    } else if(acc.pnl<0) {
      sc='lost'; sl='× Failed';
    } else {
      sc='completed'; sl='✓ Done';
    }
    const pc=acc.pnl==null?'':(acc.pnl>=0?'pos':'neg');
    return `<div class="tat-row" onclick="openDrawer('${acc.id}')" style="cursor:pointer">
      <div><span class="tat-account-name">${acc.shortName}</span><span class="tat-account-id">${acc.platform} · ${acc.marketLabel}</span></div>
      <div>${acc.platform}</div><div>${acc.marketLabel}</div>
      <div>${fmtShrt(acc.startDate)} → ${fmtShrt(acc.endDate)} <span style="color:var(--text-3);font-size:11px">(${days}d)</span></div>
      <div style="font-family:var(--font-mono);font-size:13px">${acc.currency==='NGN'?'NGN':fmt(acc.size)}</div>
      <div class="tat-pnl ${pc}">${acc.pnl!=null?fmtFull(acc.pnl):'Running'}</div>
      <div><span class="tat-status ${sc}">${sl}</span></div>
    </div>`;
  }).join('');
  const ir=document.getElementById('instrumentsRow');if(!ir)return;
  const ai={};ACCOUNTS.filter(a=>a.type!=='fund').forEach(a=>a.instruments.forEach(i=>{ai[i]=a.market;}));
  const IC={spot:'#40B5AD',futures:'#6366f1',personal:'#7c3aed'};
  ir.innerHTML=Object.entries(ai).map(([s,m])=>`<span class="instrument-chip"><span style="background:${IC[m]||'#aaa'}"></span>${s}</span>`).join('');
}

/* ────────────────────────────────────────────
   FUNDS
──────────────────────────────────────────── */
function buildFunds() {
  const kc=document.getElementById('khoodHoldings');if(kc)kc.textContent=KHOOD_HOLDINGS.length+' positions';
  const nc=document.getElementById('ngxHoldings');if(nc)nc.textContent=NGX_HOLDINGS.length+' open positions';
  const kl=document.getElementById('khoodHoldingsList');
  if(kl)kl.innerHTML=KHOOD_HOLDINGS.slice(0,6).map(h=>{
    const chgHtml = h.change!=null
      ? `<span class="holding-change ${h.change>=0?'pos':'neg'}">${(h.change>=0?'+':'')+(h.change*100).toFixed(1)}%</span>`
      : `<span class="holding-change neutral">Live ↗</span>`;
    return `<div class="holding-row"><span class="holding-ticker">${h.ticker}</span><span class="holding-name">${h.name}</span>${chgHtml}</div>`;
  }).join('');
  const nl=document.getElementById('ngxHoldingsList');
  if(nl)nl.innerHTML=NGX_HOLDINGS.slice(0,6).map(h=>`<div class="holding-row"><span class="holding-ticker">${h.ticker}</span><span class="holding-name">${h.name}</span><span class="holding-change ${h.changeP>=0?'pos':'neg'}">${(h.changeP>=0?'+':'')+(h.changeP*100).toFixed(1)}%</span></div>`).join('');
  buildFundChart('khoodChart',KHOOD_PERF);
  buildFundChart('ngxChart',NGX_PERF);
}
function buildFundChart(cId,perf) {
  const c=document.getElementById(cId);if(!c)return;
  let cum=0;
  const labels=perf.map(p=>new Date(p.date+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'}));
  const values=perf.map(p=>{cum+=p.val;return parseFloat((cum*100).toFixed(2));});
  const lc=values[values.length-1]>=0?'#16a34a':'#dc2626';
  safeChart(c,{type:'line',data:{labels,datasets:[{data:values,borderColor:lc,borderWidth:2,pointRadius:0,pointHoverRadius:4,tension:0.4,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,100);g.addColorStop(0,lc+'22');g.addColorStop(1,lc+'00');return g;}}]},options:{responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` Cumulative: ${ctx.raw}%`}}},scales:{x:{display:false},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>v+'%'}}}}});
}

/* ────────────────────────────────────────────
   PERFORMANCE
──────────────────────────────────────────── */
function buildPerformance() {
  const mp=document.getElementById('monthlyPnlChart');
  if(mp)safeChart(mp,{type:'bar',data:{labels:MONTHLY_PNL.map(m=>m.month),datasets:[{data:MONTHLY_PNL.map(m=>m.pnl),backgroundColor:MONTHLY_PNL.map(m=>m.pnl>=0?'rgba(22,163,74,0.75)':'rgba(220,38,38,0.75)'),borderRadius:4,borderSkipped:false}]},options:{responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` P&L: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10},maxRotation:45}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>'$'+v}}}}});

  const fees=ACCOUNTS.filter(a=>a.costOfFund&&a.type!=='personal'&&a.type!=='fund').reduce((s,a)=>s+a.costOfFund,0);
  const cc=document.getElementById('costChart');
  const costData=[{label:'Eval Fees',value:fees,color:'#dc2626'},{label:'Commission',value:320,color:'#d97706'},{label:'Swap/Overnight',value:58,color:'#6366f1'}];
  if(cc)safeChart(cc,{type:'doughnut',data:{labels:costData.map(d=>d.label),datasets:[{data:costData.map(d=>d.value),backgroundColor:costData.map(d=>d.color),borderWidth:3,borderColor:'#fff',hoverOffset:5}]},options:{cutout:'68%',...CD,plugins:{legend:{display:false},tooltip:{enabled:true,...TIP,callbacks:{label:ctx=>` ${ctx.label}: ${fmtFull(ctx.raw)}`}}}}});
  const bd=document.getElementById('costBreakdown');
  if(bd)bd.innerHTML=costData.map(d=>`<div class="cost-row"><span class="cost-dot" style="background:${d.color}"></span><span class="cost-name">${d.label}</span><span class="cost-val">${fmtFull(d.value)}</span></div>`).join('');

  const ml=document.getElementById('marketPerfList');
  if(ml){const mx=Math.max(...MARKET_PNL.map(m=>Math.abs(m.pnl)));ml.innerHTML=MARKET_PNL.map(m=>`<div class="market-perf-row"><div class="market-perf-top"><span class="market-perf-name">${m.name}</span><span class="market-perf-val ${m.pnl>=0?'pos':'neg'}">${fmtFull(m.pnl)}</span></div><div class="market-perf-bar-wrap"><div class="market-perf-bar" style="width:${(Math.abs(m.pnl)/mx)*100}%;background:${m.pnl>=0?'#16a34a':'#dc2626'}"></div></div></div>`).join('');}

  const dc=document.getElementById('durationChart');
  const da=ACCOUNTS.filter(a=>a.endDate).slice(0,11);
  if(dc)safeChart(dc,{type:'bar',data:{labels:da.map(a=>a.shortName),datasets:[{data:da.map(a=>daysBetween(a.startDate,a.endDate)),backgroundColor:da.map(a=>a.market==='futures'?'#6366f188':'#40B5AD88'),borderRadius:4,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` ${ctx.raw} days`}}},scales:{x:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>v+'d'}},y:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10}}}}}});
}

/* ────────────────────────────────────────────
   ACCOUNT DETAIL DRAWER
──────────────────────────────────────────── */
function openDrawer(id) {
  const acc=ACCOUNTS.find(a=>a.id===id);if(!acc)return;
  const trades=TRADE_DATA[id]||[];
  const s=trades.length?tradeStats(trades):null;
  const days=daysBetween(acc.startDate,acc.endDate);

  document.getElementById('drawerTitle').textContent=acc.name;
  document.getElementById('drawerSubtitle').textContent=`${acc.shortName} · ${acc.platform} · ${acc.marketLabel}`;

  const src = DATA_SOURCE[id] || { label:'Unknown', cls:'source-est', tip:'' };
  let html=`
    <div class="drawer-source-badge ${src.cls}" title="${src.tip}">
      <span class="drawer-source-icon">◈</span> ${src.label}
      <span class="drawer-source-tip">${src.tip}</span>
    </div>
    <div class="drawer-stats">
      <div class="drawer-stat"><div class="drawer-stat-label">Status</div><div class="drawer-stat-val">${acc.status==='active'?'● Active':'✓ Ended'}</div></div>
      <div class="drawer-stat"><div class="drawer-stat-label">Account Size</div><div class="drawer-stat-val">${acc.currency==='NGN'?'NGN':fmt(acc.size)}</div></div>
      <div class="drawer-stat"><div class="drawer-stat-label">Net P&L</div><div class="drawer-stat-val ${acc.pnl==null?'':acc.pnl>=0?'pos':'neg'}">${acc.pnl!=null?fmtFull(acc.pnl):'Active'}</div></div>
      <div class="drawer-stat"><div class="drawer-stat-label">Return</div><div class="drawer-stat-val ${acc.performance==null?'':acc.performance>=0?'pos':'neg'}">${acc.performance!=null?fmtPct(acc.performance):'—'}</div></div>
      <div class="drawer-stat"><div class="drawer-stat-label">Period</div><div class="drawer-stat-val" style="font-size:12px">${fmtDate(acc.startDate)}</div></div>
      <div class="drawer-stat"><div class="drawer-stat-label">Duration</div><div class="drawer-stat-val" style="font-size:12px">${days} days · ${fmtDate(acc.endDate)}</div></div>
    </div>`;

  if(s){
    html+=`
      <div class="drawer-section-title">Analytics</div>
      <div class="drawer-stats">
        <div class="drawer-stat"><div class="drawer-stat-label">Win Rate</div><div class="drawer-stat-val ${s.winRate>=0.5?'pos':'neg'}">${(s.winRate*100).toFixed(0)}%</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Profit Factor</div><div class="drawer-stat-val ${s.profitFactor>=1?'pos':'neg'}">${s.profitFactor}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Avg Win</div><div class="drawer-stat-val pos">+${fmtFull(s.avgWin)}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Avg Loss</div><div class="drawer-stat-val neg">−${fmtFull(s.avgLoss)}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Best Day</div><div class="drawer-stat-val pos">${fmtFull(s.bestDay[1])}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Worst Day</div><div class="drawer-stat-val neg">${fmtFull(s.worstDay[1])}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Commission</div><div class="drawer-stat-val neg">−${fmtFull(s.totalComm)}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Swap / Fees</div><div class="drawer-stat-val neg">−${fmtFull(s.totalSwap)}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Winning Trades</div><div class="drawer-stat-val pos">${s.wins}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Losing Trades</div><div class="drawer-stat-val neg">${s.losses}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Total Trades</div><div class="drawer-stat-val">${s.count}</div></div>
        <div class="drawer-stat"><div class="drawer-stat-label">Trading Days</div><div class="drawer-stat-val">${Object.keys(s.daily).length}</div></div>
      </div>
      <div class="drawer-section-title">Equity Curve</div>
      <canvas id="drawerEquity" height="110" style="margin-bottom:8px"></canvas>`;
  }

  html+=`
    <div class="drawer-section-title">Instruments</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">${acc.instruments.map(i=>`<span class="instrument-chip"><span style="background:#40B5AD;width:6px;height:6px;border-radius:50%"></span>${i}</span>`).join('')}</div>`;

  if(acc.costOfFund){
    html+=`<div class="drawer-section-title">Cost Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      <div class="drawer-stat"><div class="drawer-stat-label">Cost of Fund</div><div class="drawer-stat-val neg">−$${acc.costOfFund}</div></div>
      ${acc.fxRate?`<div class="drawer-stat"><div class="drawer-stat-label">NGN/USD Rate</div><div class="drawer-stat-val">₦${acc.fxRate.toLocaleString()}</div></div>`:''}
    </div>`;
  }

  html+=`<div class="drawer-section-title">Notes</div>
    <p style="font-size:13px;color:var(--text-2);line-height:1.65;padding:14px;background:var(--bg);border-radius:var(--radius-md);margin-bottom:20px">${acc.notes}</p>`;

  if(trades.length){
    html+=`<div class="drawer-section-title">Trade Log — ${trades.length} trades</div>
      <div class="drawer-trades-table">
        <div class="drawer-trades-header"><span>Close</span><span>Instr</span><span>Dir</span><span>Lots</span><span>Pips</span><span>Net P&L</span></div>
        ${trades.slice().reverse().map(t=>{
          const pc=t.netPnl>=0?'pos':'neg';
          const dc=t.direction==='Long'?'drawer-dir-long':'drawer-dir-short';
          return `<div class="drawer-trade-row">
            <span>${t.closeDate.slice(5)}</span>
            <span style="font-weight:600">${t.instrument}</span>
            <span class="${dc}">${t.direction}</span>
            <span style="font-family:var(--font-mono)">${t.lots}</span>
            <span style="font-family:var(--font-mono);color:${t.pips>=0?'var(--green)':'var(--red)'}">${t.pips>=0?'+':''}${t.pips}</span>
            <span class="drawer-pnl ${pc}">${t.netPnl>=0?'+':''}${fmtFull(t.netPnl)}</span>
          </div>`;
        }).join('')}
      </div>`;
  }

  if(acc.type==='fund'&&acc.id==='1KHOOD') html+=drawerHoldings(KHOOD_HOLDINGS,'USD');
  if(acc.type==='fund'&&acc.id==='NGX')    html+=drawerHoldings(NGX_HOLDINGS,'NGN');

  document.getElementById('drawerBody').innerHTML=html;

  // Render equity curve after DOM insert
  if(s&&s.equityCurve.length){
    requestAnimationFrame(()=>{
      const ec=document.getElementById('drawerEquity');if(!ec)return;
      const labels=s.equityCurve.map(p=>new Date(p.date+'T00:00:00').toLocaleDateString('en-GB',{month:'short',day:'numeric'}));
      const values=s.equityCurve.map(p=>p.cum);
      const lc=values[values.length-1]>=0?'#16a34a':'#dc2626';
      safeChart(ec,{type:'line',data:{labels,datasets:[{data:values,borderColor:lc,borderWidth:2.5,pointRadius:4,pointBackgroundColor:lc,pointBorderColor:'#fff',pointBorderWidth:2,tension:0.3,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,110);g.addColorStop(0,lc+'33');g.addColorStop(1,lc+'00');return g;}}]},options:{responsive:true,animation:{duration:600},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` Cumulative: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10}}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>'$'+v}}}}});
    });
  }

  document.getElementById('accountDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function drawerHoldings(holdings,cur) {
  return `<div class="drawer-section-title">Current Holdings</div>
    <div class="drawer-trades-table">
      <div class="drawer-trades-header"><span>Ticker</span><span>Name</span><span>Qty</span><span>Open</span><span>Current</span><span>Change</span></div>
      ${holdings.map(h=>{const chg=h.changeP!==undefined?h.changeP:h.change,cls=chg>=0?'pos':'neg';return `<div class="drawer-trade-row"><span style="font-family:var(--font-mono);font-weight:600">${h.ticker}</span><span>${h.name}</span><span style="font-family:var(--font-mono)">${parseFloat(h.qty).toFixed(2)}</span><span style="font-family:var(--font-mono)">${cur==='NGN'?'₦':'$'}${h.openPrice}</span><span style="font-family:var(--font-mono)">${cur==='NGN'?'₦':'$'}${h.price}</span><span class="drawer-pnl ${cls}">${chg>=0?'+':''}${(chg*100).toFixed(2)}%</span></div>`;}).join('')}
    </div>`;
}

function closeDrawer() {
  document.getElementById('accountDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
  document.body.style.overflow='';
}

function initDrawerSwipe() {
  const drawer = document.getElementById('accountDrawer');
  let startX=0, currentX=0, isDragging=false;
  drawer.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;isDragging=true;},{passive:true});
  drawer.addEventListener('touchmove',e=>{
    if(!isDragging)return;
    currentX=e.touches[0].clientX;
    const dx=currentX-startX;
    if(dx>0)drawer.style.transform=`translateX(${dx}px)`;
  },{passive:true});
  drawer.addEventListener('touchend',()=>{
    if(!isDragging)return;
    isDragging=false;
    const dx=currentX-startX;
    if(dx>80){closeDrawer();setTimeout(()=>drawer.style.transform='',350);}
    else{drawer.style.transform='';}
  });
}

/* ────────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────────── */
function initScrollReveal() {
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(!e.isIntersecting)return;e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target);});
  },{threshold:0.08});
  document.querySelectorAll('.stat-card,.chart-card,.account-card,.fund-card,.perf-card,.market-pill,.live-card,.cal-month-block').forEach(el=>{
    el.style.opacity='0';el.style.transform='translateY(20px)';
    el.style.transition='opacity 0.55s ease,transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    obs.observe(el);
  });
}

/* ────────────────────────────────────────────
   INIT
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  const safe = (label, fn) => { try { fn(); } catch(e) { console.error('[FIBAM]', label, e); } };

  safe('initNav',           initNav);
  safe('initCountUp',       initCountUp);
  safe('buildHeroTimeline', buildHeroTimeline);
  safe('buildOverviewCharts', buildOverviewCharts);
  safe('buildAccountCards', buildAccountCards);
  safe('initAccountFilters', initAccountFilters);
  safe('buildLiveDashboards', buildLiveDashboards);
  safe('initCalendars',     initCalendars);
  safe('buildTradingTable', buildTradingTable);
  safe('buildFunds',        buildFunds);
  safe('buildFundingSection', buildFundingSection);
  safe('buildPerformance',  buildPerformance);
  safe('buildAnalytics',    buildAnalytics);
  safe('fetchLivePrices',   fetchLivePrices);

  const drawerCloseBtn = document.getElementById('drawerClose');
  const drawerOverlayEl = document.getElementById('drawerOverlay');
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlayEl) drawerOverlayEl.addEventListener('click', closeDrawer);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});
  safe('initDrawerSwipe', initDrawerSwipe);
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});
  });
  requestAnimationFrame(()=>safe('initScrollReveal', initScrollReveal));

  // Refresh live prices every 60 seconds
  // Refresh live prices every 60s — pause when tab is hidden to save memory
  let _liveInterval = setInterval(fetchLivePrices, 60000);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(_liveInterval);
    } else {
      fetchLivePrices();
      _liveInterval = setInterval(fetchLivePrices, 60000);
    }
  });
});

/* ════════════════════════════════════════════════
   INVESTORS / FUNDING SECTION
════════════════════════════════════════════════ */
function buildFundingSection() {
  const grid = document.getElementById('fundingGrid');
  if (!grid) return;
  const TAG_CLASS = { IF:'if', TA:'ta', MO:'mo', PO:'po' };
  grid.innerHTML = FUNDING_DATA.map(group => {
    const rows = group.sources.map(s => {
      const tc = TAG_CLASS[s.tag] || 'if';
      return `<div class="funder-row">
        <span class="funder-tag funder-tag--${tc}">${s.tag}</span>
        <span class="funder-amount">$${s.usd.toFixed(2)}</span>
        <span class="funder-pct">${Number.isInteger(s.pct) ? s.pct : s.pct.toFixed(2)}%</span>
      </div>`;
    }).join('');
    return `<div class="funding-card">
      <div class="funding-card-header">
        <div class="funding-card-title">${group.group}</div>
        <div class="funding-card-total">$${group.totalUSD.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>
      </div>
      ${rows}
    </div>`;
  }).join('');
}


/* ════════════════════════════════════════════════
   LIVE PRICE FEED
   Stocks : Yahoo Finance via multiple CORS proxy fallbacks
   FX     : Frankfurter (primary) → Open Exchange Rates (backup)
   Cache  : last-good values held in memory — never shows dashes
            once a price has been fetched successfully
════════════════════════════════════════════════ */

// In-memory cache — survives poll failures, cleared on page refresh
const _priceCache = {};

// CORS proxies tried in order until one succeeds
const CORS_PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://api.codetabs.com/v1/proxy?quest=${url}`,
];

async function _fetchWithProxyFallback(targetUrl) {
  for (const buildProxy of CORS_PROXIES) {
    try {
      const res = await fetch(buildProxy(targetUrl), { signal: AbortSignal.timeout(6000) });
      if (!res.ok) continue;
      const text = await res.text();
      return JSON.parse(text);
    } catch (_) { /* try next proxy */ }
  }
  return null;
}

async function _fetchFX(base, quote) {
  // Primary: Frankfurter
  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=${base}&to=${quote}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.rates?.[quote] != null) return data.rates[quote];
    }
  } catch (_) {}

  // Fallback: Open Exchange Rates (free, no key, covers all majors)
  try {
    const res = await fetch(
      `https://open.er-api.com/v6/latest/${base}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.rates?.[quote] != null) return data.rates[quote];
    }
  } catch (_) {}

  return null;
}

function _applyPrice(ticker, price, openPrice) {
  const chg = openPrice ? (price - openPrice) / openPrice : 0;
  const isPos = chg >= 0;

  const priceEl = document.getElementById(`ticker${ticker}`);
  const chgEl   = document.getElementById(`ticker${ticker}chg`);
  if (priceEl) priceEl.textContent = `$${price.toFixed(2)}`;
  if (chgEl) {
    chgEl.textContent = `${isPos ? '+' : ''}${(chg * 100).toFixed(1)}%`;
    chgEl.className = `ticker-change ${isPos ? 'pos' : 'neg'}`;
  }
  // Sync ticker-strip clones
  const clonePrice = document.querySelector(`.ticker-clone--${ticker.toLowerCase()}`);
  const cloneChg   = document.querySelector(`.ticker-clone--${ticker.toLowerCase()}chg`);
  if (clonePrice) clonePrice.textContent = `$${price.toFixed(2)}`;
  if (cloneChg) {
    cloneChg.textContent = `${isPos ? '+' : ''}${(chg * 100).toFixed(1)}%`;
    cloneChg.className = `ticker-change ${isPos ? 'pos' : 'neg'}`;
  }
  // Update in-memory holdings so fund card reflects current price
  const h = KHOOD_HOLDINGS.find(h => h.ticker === ticker);
  if (h) { h.price = price; h.change = chg; }
}

function _applyFX(pair, rate) {
  const [base, quote] = [pair.slice(0,3), pair.slice(3,6)];
  const decimals = (base === 'USD' && quote === 'JPY') ? 3 : 5;
  const v = rate.toFixed(decimals);
  const el = document.getElementById(`ticker${pair}`);
  if (el) el.textContent = v;
  document.querySelectorAll(`.ticker-clone--${pair.toLowerCase()}`).forEach(el => el.textContent = v);
}

async function fetchLivePrices() {
  // ── FX ───────────────────────────────────────────────────────────────
  const fxPairs = [
    { pair: 'USDJPY', base: 'USD', quote: 'JPY' },
    { pair: 'EURUSD', base: 'EUR', quote: 'USD' },
  ];

  await Promise.allSettled(fxPairs.map(async ({ pair, base, quote }) => {
    const rate = await _fetchFX(base, quote);
    if (rate != null) {
      _priceCache[pair] = rate;
      _applyFX(pair, rate);
    } else if (_priceCache[pair] != null) {
      // Use last-good cached value — stale but better than dash
      _applyFX(pair, _priceCache[pair]);
    }
  }));

  // ── Stocks (1kHooD open positions) ───────────────────────────────────
  const openPositions = [
    { ticker: 'PANW', openPrice: 150.17 },
    { ticker: 'RKLB', openPrice: 71.84  },
    { ticker: 'LMND', openPrice: 51.29  },
  ];

  await Promise.allSettled(openPositions.map(async ({ ticker, openPrice }) => {
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
    const data = await _fetchWithProxyFallback(yahooUrl);
    const meta  = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice ?? meta?.chartPreviousClose ?? null;

    if (price != null) {
      _priceCache[ticker] = price;
      _applyPrice(ticker, price, openPrice);
    } else if (_priceCache[ticker] != null) {
      // Show last known good price rather than leaving as dash
      _applyPrice(ticker, _priceCache[ticker], openPrice);
    }
  }));
}

/* ════════════════════════════════════════════════
   PHASE 5 — ANALYTICS CHARTS
════════════════════════════════════════════════ */
function buildAnalytics() {
  // ── Stat strip ─────────────────────────────
  const s = ANALYTICS_SUMMARY;
  const q = id => document.getElementById(id);
  const pct = v => (v*100).toFixed(1)+'%';
  if(q('anTotalTrades')) q('anTotalTrades').textContent = s.totalTrades.toLocaleString();
  if(q('anWinRate'))     q('anWinRate').textContent     = pct(s.winRate);
  if(q('anAvgWin'))      q('anAvgWin').textContent      = '+$'+s.avgWin.toFixed(2);
  if(q('anAvgLoss'))     q('anAvgLoss').textContent     = '-$'+Math.abs(s.avgLoss).toFixed(2);
  if(q('anCommDrag'))    q('anCommDrag').textContent    = pct(s.commDragPct);
  if(q('anPF'))          q('anPF').textContent          = s.profitFactor.toFixed(2)+'x';

  const TIP2 = {mode:'index',intersect:false,backgroundColor:'#141F1E',titleColor:'#9bbdbb',bodyColor:'#e8f4f3',borderColor:'#2a3f3e',borderWidth:1,padding:10,cornerRadius:6};

  // ── Equity Curve ────────────────────────────
  const ec = document.getElementById('equityChart');
  if(ec) {
    const labels = EQUITY_CURVE.map(p=>p.d);
    const eqVals = EQUITY_CURVE.map(p=>p.eq);
    // Build gradient
    const ctx = ec.getContext('2d');
    const grad = ctx.createLinearGradient(0,0,0,300);
    grad.addColorStop(0,'rgba(64,181,173,0.25)');
    grad.addColorStop(1,'rgba(64,181,173,0)');
    safeChart(ec,{type:'line',data:{labels,datasets:[{
      data:eqVals,
      borderColor:'#40B5AD',borderWidth:2,
      fill:true,backgroundColor:grad,
      pointRadius:0,pointHoverRadius:4,pointHoverBackgroundColor:'#40B5AD',
      tension:0.35
    }]},options:{responsive:true,maintainAspectRatio:false,animation:{duration:1000},plugins:{
      legend:{display:false},
      tooltip:{...TIP2,callbacks:{
        title:ctx=>[ctx[0].label],
        label:ctx=>`Equity: ${ctx.raw>=0?'+':''}$${ctx.raw.toFixed(0)}`
      }}
    },scales:{
      x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:9},maxTicksLimit:10,maxRotation:0}},
      y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>(v>=0?'+':'')+Math.round(v/1000)+'k'}}
    }}});
  }

  // ── Direction stats ─────────────────────────
  const dirWrap = document.getElementById('dirStats');
  if(dirWrap) {
    dirWrap.innerHTML = DIR_STATS.map(d=>`
      <div class="an-dir-block">
        <div class="an-dir-label ${d.dir.toLowerCase()}">${d.dir}</div>
        <div class="an-dir-row"><span>Trades</span><span>${d.n}</span></div>
        <div class="an-dir-row"><span>Win Rate</span><span>${(d.wr*100).toFixed(0)}%</span></div>
        <div class="an-dir-row"><span>Net P&L</span><span style="color:${d.net>=0?'var(--green)':'var(--red)'}">${d.net>=0?'+':''}$${Math.abs(d.net).toFixed(0)}</span></div>
        <div class="an-dir-row"><span>Avg Win</span><span style="color:var(--green)">+$${d.avgW.toFixed(2)}</span></div>
        <div class="an-dir-row"><span>Avg Loss</span><span style="color:var(--red)">-$${Math.abs(d.avgL).toFixed(2)}</span></div>
        <div class="an-dir-bar-wrap"><div class="an-dir-bar ${d.dir.toLowerCase()}" style="width:${(d.wr*100).toFixed(0)}%"></div></div>
      </div>`).join('');
  }

  // ── Instrument bar chart ─────────────────────
  const ic = document.getElementById('instrChart');
  if(ic) {
    const top = INSTR_STATS.slice(0,12);
    safeChart(ic,{type:'bar',data:{
      labels: top.map(x=>x.instr),
      datasets:[{
        data: top.map(x=>x.net),
        backgroundColor: top.map(x=>x.net>=0?'rgba(64,181,173,0.8)':'rgba(220,38,38,0.75)'),
        borderRadius:4,borderSkipped:false
      }]
    },options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,animation:{duration:900},plugins:{
      legend:{display:false},
      tooltip:{...TIP2,callbacks:{label:ctx=>[
        ` Net: ${ctx.raw>=0?'+':''}$${ctx.raw.toFixed(0)}`,
        ` Trades: ${INSTR_STATS[ctx.dataIndex]?.n||''}`,
        ` Win Rate: ${((INSTR_STATS[ctx.dataIndex]?.wr||0)*100).toFixed(0)}%`
      ]}}
    },scales:{
      x:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>(v>=0?'+':'')+Math.round(v/1000)+'k'}},
      y:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10,family:'JetBrains Mono'}}}
    }}});
  }

  // ── Commission drag stacked bar ──────────────
  const cc = document.getElementById('commChart');
  if(cc) {
    const accs = ACC_STATS.filter(a=>Math.abs(a.comm)>0 && !a.acc.includes('ALPARI'));
    const labels = accs.map(a=>a.label || a.acc.replace('MFFU-','MFFU ').replace('MFFX-','MFFX ').replace('-TRADES',''));
    safeChart(cc,{type:'bar',data:{
      labels,
      datasets:[
        {label:'Gross P&L',data:accs.map(a=>a.gross),backgroundColor:'rgba(64,181,173,0.7)',borderRadius:4,borderSkipped:false},
        {label:'Commission',data:accs.map(a=>-Math.abs(a.comm)),backgroundColor:'rgba(220,38,38,0.65)',borderRadius:4,borderSkipped:false}
      ]
    },options:{responsive:true,maintainAspectRatio:false,animation:{duration:900},plugins:{
      legend:{display:true,position:'top',labels:{color:'#7a9896',font:{size:11},boxWidth:12,padding:16}},
      tooltip:{...TIP2,callbacks:{label:ctx=>`${ctx.dataset.label}: ${ctx.raw>=0?'+':''}$${ctx.raw.toFixed(0)}`}}
    },scales:{
      x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:9},maxRotation:35}},
      y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>(v>=0?'+':'')+Math.round(v/1000)+'k'}}
    }}});
  }

  // ── Win rate by account ──────────────────────
  const wc = document.getElementById('wrChart');
  if(wc) {
    const accs = ACC_STATS.filter(a=>!a.acc.includes('ALPARI'));
    const labels = accs.map(a=>a.label||a.acc);
    const wrs = accs.map(a=>+(a.wr*100).toFixed(1));
    safeChart(wc,{type:'bar',data:{
      labels,
      datasets:[{
        data:wrs,
        backgroundColor:wrs.map(w=>w>=50?'rgba(64,181,173,0.8)':'rgba(99,102,241,0.7)'),
        borderRadius:4,borderSkipped:false
      }]
    },options:{responsive:true,maintainAspectRatio:false,animation:{duration:900},plugins:{
      legend:{display:false},
      tooltip:{...TIP2,callbacks:{label:ctx=>[` Win Rate: ${ctx.raw}%`,` Trades: ${accs[ctx.dataIndex]?.n||''}`]}}
    },scales:{
      x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:9},maxRotation:35}},
      y:{min:0,max:100,grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>v+'%'}}
    }}});
  }

  // ── P&L distribution histogram ───────────────
  const dc = document.getElementById('distChart');
  if(dc) {
    const buckets = [
      {label:'<-$200',min:-Infinity,max:-200},
      {label:'-$200\n-$100',min:-200,max:-100},
      {label:'-$100\n-$50',min:-100,max:-50},
      {label:'-$50\n$0',min:-50,max:0},
      {label:'$0\n+$50',min:0,max:50},
      {label:'+$50\n+$100',min:50,max:100},
      {label:'+$100\n+$200',min:100,max:200},
      {label:'>+$200',min:200,max:Infinity},
    ];
    const dailyPnls = EQUITY_CURVE.map(e=>e.pnl);
    const counts = buckets.map(b=>dailyPnls.filter(p=>p>b.min&&p<=b.max).length);
    const colors = buckets.map(b=>b.min>=0?'rgba(64,181,173,0.8)':'rgba(220,38,38,0.7)');
    safeChart(dc,{type:'bar',data:{
      labels:buckets.map(b=>b.label),
      datasets:[{data:counts,backgroundColor:colors,borderRadius:4,borderSkipped:false}]
    },options:{responsive:true,maintainAspectRatio:false,animation:{duration:900},plugins:{
      legend:{display:false},
      tooltip:{...TIP2,callbacks:{label:ctx=>`Days: ${ctx.raw}`}}
    },scales:{
      x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:9}}},
      y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},stepSize:1}}
    }}});
  }
}

/* ════════════════════════════════════════════════
   DARK MODE
════════════════════════════════════════════════ */
(function initDarkMode() {
  const btn = document.getElementById('darkBtn');
  const root = document.documentElement;
  const stored = localStorage.getItem('fibam-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(dark) {
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    }
    localStorage.setItem('fibam-theme', dark ? 'dark' : 'light');
  }

  // Initialise on load
  setTheme(stored === 'dark' || (!stored && prefersDark));

  if (btn) {
    btn.addEventListener('click', () => {
      setTheme(root.getAttribute('data-theme') !== 'dark');
    });
  }

  // Sync with OS preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('fibam-theme')) setTheme(e.matches);
  });
})();

/* ════════════════════════════════════════════════
   LOADING SKELETONS
════════════════════════════════════════════════ */
function showSkeleton(containerId, rows = 3) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({length: rows}, () =>
    `<div class="skeleton-row"><div class="skeleton-pulse"></div></div>`
  ).join('');
}

function hideSkeleton(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.querySelectorAll('.skeleton-row').forEach(r => r.remove());
}

/* ════════════════════════════════════════════════
   ERROR STATE HELPERS
════════════════════════════════════════════════ */
function showError(containerId, message = 'Failed to load data') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="error-state" role="alert">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>${message}</span>
    </div>`;
}

/* ════════════════════════════════════════════════
   PWA SERVICE WORKER REGISTRATION
════════════════════════════════════════════════ */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('[FIBAM] SW registered:', reg.scope))
      .catch(err => console.warn('[FIBAM] SW registration failed:', err));
  });
}
