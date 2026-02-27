/* ════════════════════════════════════════════════
   FIBAM PORTFOLIO — app.js  v1.0
   All account data sourced directly from uploaded spreadsheets
════════════════════════════════════════════════ */

'use strict';

/* ────────────────────────────────────────────
   DATA — Every account, every detail
──────────────────────────────────────────── */
const ACCOUNTS = [

  /* ── ACTIVE: Prop Evaluations ── */
  {
    id: 'FDNT-6KX1',
    name: 'FundedNext Evaluation',
    shortName: 'FundedNext X1',
    accountId: 'FDNT$6KX1-STP-PFF',
    platform: 'FundedNext',
    type: 'prop-eval',
    market: 'spot',
    marketLabel: 'Spot FX',
    status: 'active',
    startDate: '2026-02-05',
    endDate: null,
    size: 6000,
    costOfFund: 63.21,
    fxRate: 1471.05,
    pnl: null,
    performance: null,
    trades: 50,
    instruments: ['GBPUSD','EURUSD','USDJPY'],
    currency: 'USD',
    notes: 'Phase 1 evaluation in progress'
  },
  {
    id: 'T5RS-5KX1',
    name: 'The5ers Evaluation',
    shortName: 'The5ers X1',
    accountId: 'T5RS$5KX1-STP-PFF',
    platform: 'The5ers',
    type: 'prop-eval',
    market: 'spot',
    marketLabel: 'Spot FX',
    status: 'active',
    startDate: '2026-02-22',
    endDate: null,
    size: 5000,
    costOfFund: 31.50,
    fxRate: 1469.60,
    pnl: null,
    performance: null,
    trades: 21,
    instruments: ['USDJPY','EURUSD','GBPUSD'],
    currency: 'USD',
    notes: 'Phase 1 evaluation in progress'
  },

  /* ── ACTIVE: Live Funds ── */
  {
    id: '1KHOOD',
    name: '1kHooD Fund',
    shortName: '1kHooD',
    accountId: 'FIBAM-1kHooD',
    platform: 'Robinhood',
    type: 'fund',
    market: 'stocks',
    marketLabel: 'US Equities',
    status: 'active',
    startDate: '2025-02-05',
    endDate: null,
    size: 1000,
    costOfFund: 0,
    fxRate: null,
    pnl: null,
    performance: null,
    trades: 132,
    instruments: ['AMZN','SNAP','TGT','NBIS','AAPL','RIVN','COIN','JD'],
    currency: 'USD',
    notes: 'Managed equity fund on Robinhood. $169.15 withdrawn Sep–Oct 2025.'
  },
  {
    id: 'NGX',
    name: 'FIBAM NGX',
    shortName: 'NGX Portfolio',
    accountId: 'FIBAM-NGX',
    platform: 'NGX Exchange',
    type: 'fund',
    market: 'ngx',
    marketLabel: 'Nigerian Stocks',
    status: 'active',
    startDate: '2024-05-29',
    endDate: null,
    size: null,
    costOfFund: 0,
    fxRate: null,
    pnl: null,
    performance: null,
    trades: 29,
    instruments: ['ACCESSCORP','BUAFOODS','GEREGU','FIDELITYBK','MANSARD','CHAMS'],
    currency: 'NGN',
    notes: 'Nigerian equities portfolio. Figures in NGN.'
  },

  /* ── ENDED: Spot Prop — MyFundedFX ── */
  {
    id: 'MFFX-X1',
    name: 'MyFundedFX Spot #1',
    shortName: 'MFFX X1',
    accountId: 'MFFX$5kX1-STP_PFF',
    platform: 'MyFundedFX',
    type: 'prop-eval',
    market: 'spot',
    marketLabel: 'Spot FX',
    status: 'completed',
    startDate: '2024-02-12',
    endDate: '2024-02-13',
    size: 5000,
    costOfFund: 42,
    fxRate: 1600,
    pnl: -377.21,
    performance: -0.075442,
    trades: 67,
    instruments: ['GBPUSD','NAS100','WTI','XAUEUR','XAUUSD'],
    currency: 'USD',
    notes: '2-day account. Breached drawdown limit on day 2.'
  },
  {
    id: 'MFFX-X2',
    name: 'MyFundedFX Spot #2',
    shortName: 'MFFX X2',
    accountId: 'MFFX$5kX2-STP_PFF',
    platform: 'MyFundedFX',
    type: 'prop-eval',
    market: 'spot',
    marketLabel: 'Spot FX',
    status: 'completed',
    startDate: '2024-02-19',
    endDate: '2024-05-19',
    size: 5000,
    costOfFund: 42,
    fxRate: 1600,
    pnl: -251.78,
    performance: -0.050356,
    trades: 65,
    instruments: ['GBPUSD','NAS100','WTI','XAUAUD','USWTI'],
    currency: 'USD',
    notes: 'Longest spot account at 91 days.'
  },
  {
    id: 'MFFX-X3',
    name: 'MyFundedFX Spot #3',
    shortName: 'MFFX X3',
    accountId: 'MFFX$5kX3-STP_PFF',
    platform: 'MyFundedFX',
    type: 'prop-eval',
    market: 'spot',
    marketLabel: 'Spot FX',
    status: 'completed',
    startDate: '2024-09-29',
    endDate: '2024-10-31',
    size: 5000,
    costOfFund: 32.30,
    fxRate: 1671.67,
    pnl: -365.19,
    performance: -0.073038,
    trades: 0,
    instruments: ['GBPUSD','EURUSD','NAS100'],
    currency: 'USD',
    notes: '33-day account.'
  },
  {
    id: 'MFFX-X4',
    name: 'MyFundedFX Spot #4',
    shortName: 'MFFX X4',
    accountId: 'MFFX$5kX4-STP_PFF',
    platform: 'MyFundedFX',
    type: 'prop-eval',
    market: 'spot',
    marketLabel: 'Spot FX',
    status: 'completed',
    startDate: '2024-11-13',
    endDate: '2025-01-08',
    size: 5000,
    costOfFund: 31.92,
    fxRate: 1700,
    pnl: -284.46,
    performance: -0.056892,
    trades: 0,
    instruments: ['GBPUSD','EURUSD','USDJPY'],
    currency: 'USD',
    notes: '57-day account. Nov 2024 – Jan 2025.'
  },

  /* ── ENDED: Futures Prop — MyFundedFutures ── */
  {
    id: 'MFFU-X1',
    name: 'MyFundedFutures #1',
    shortName: 'MFFU X1',
    accountId: 'MFFU$50kX1-FTP_PFF',
    platform: 'MyFundedFutures',
    type: 'prop-eval',
    market: 'futures',
    marketLabel: 'US Futures',
    status: 'completed',
    startDate: '2024-04-10',
    endDate: '2024-04-12',
    size: 50000,
    costOfFund: 165,
    fxRate: 1250,
    pnl: -1882,
    performance: -0.03764,
    trades: 30,
    instruments: ['NQM4','MNQM4'],
    currency: 'USD',
    notes: '3-day account. Nasdaq futures (NQ/MNQ). Breached daily loss limit.'
  },
  {
    id: 'MFFU-X2',
    name: 'MyFundedFutures #2',
    shortName: 'MFFU X2',
    accountId: 'MFFU$50kX2-FTP_PFF',
    platform: 'MyFundedFutures',
    type: 'prop-eval',
    market: 'futures',
    marketLabel: 'US Futures',
    status: 'completed',
    startDate: '2024-06-03',
    endDate: '2024-06-07',
    size: 50000,
    costOfFund: 132,
    fxRate: 1500,
    pnl: -1343.77,
    performance: -0.0268754,
    trades: 174,
    instruments: ['NQM4','MNQM4'],
    currency: 'USD',
    notes: '5-day account. 174 trades. Nasdaq futures.'
  },
  {
    id: 'MFFU-X3',
    name: 'MyFundedFutures #3',
    shortName: 'MFFU X3',
    accountId: 'MFFU$50kX3-FTP_PFF',
    platform: 'MyFundedFutures',
    type: 'prop-eval',
    market: 'futures',
    marketLabel: 'US Futures',
    status: 'completed',
    startDate: '2024-06-12',
    endDate: '2024-06-14',
    size: 50000,
    costOfFund: 132,
    fxRate: 1500,
    pnl: -1700.75,
    performance: -0.034015,
    trades: 111,
    instruments: ['NQM4','MNQM4'],
    currency: 'USD',
    notes: '3-day account. Nasdaq futures.'
  },
  {
    id: 'MFFU-X4',
    name: 'MyFundedFutures #4',
    shortName: 'MFFU X4',
    accountId: 'MFFU$50kX4-FTP_PFF',
    platform: 'MyFundedFutures',
    type: 'prop-eval',
    market: 'futures',
    marketLabel: 'US Futures',
    status: 'completed',
    startDate: '2024-07-08',
    endDate: '2024-09-06',
    size: 50000,
    costOfFund: 229.50,
    fxRate: 1600,
    pnl: -4175,
    performance: -0.0835,
    trades: 584,
    instruments: ['YMU4','MYMU4','MYM'],
    currency: 'USD',
    notes: '584 trades across 3 evaluation sub-phases (Jul–Sep 2024). Dow Jones futures (YM/MYM).'
  },
  {
    id: 'MFFU-X5',
    name: 'MyFundedFutures #5',
    shortName: 'MFFU X5',
    accountId: 'MFFU$50kX5-FTP_PFF',
    platform: 'MyFundedFutures',
    type: 'prop-eval',
    market: 'futures',
    marketLabel: 'US Futures',
    status: 'completed',
    startDate: '2024-09-11',
    endDate: '2024-09-27',
    size: 50000,
    costOfFund: 76,
    fxRate: 1671.67,
    pnl: -386.50,
    performance: -0.00773,
    trades: 191,
    instruments: ['MYMU4','YMU4'],
    currency: 'USD',
    notes: '17-day account. Best futures performance at -0.77%.'
  },

  /* ── ENDED: Personal — Alpari ── */
  {
    id: 'ALPARI-2020',
    name: 'Alpari Personal Account',
    shortName: 'Alpari 2020',
    accountId: '80045237',
    platform: 'Alpari',
    type: 'personal',
    market: 'spot',
    marketLabel: 'Spot FX',
    status: 'completed',
    startDate: '2020-03-11',
    endDate: '2020-06-01',
    size: 294.71,
    costOfFund: 294.71,
    fxRate: 135.07,
    pnl: -208.90,
    performance: -0.7088,
    trades: 0,
    instruments: ['GBPUSD','EURUSD','USDJPY'],
    currency: 'USD',
    notes: 'First ever live account. 83 trading days. Full personal capital.'
  },
  {
    id: 'ALPARI-2023',
    name: 'Alpari Personal Account II',
    shortName: 'Alpari 2023',
    accountId: '80045237 → 101015760',
    platform: 'Alpari',
    type: 'personal',
    market: 'spot',
    marketLabel: 'Spot FX + CFDs',
    status: 'completed',
    startDate: '2023-09-11',
    endDate: '2023-11-15',
    size: 427.26,
    costOfFund: 427.26,
    fxRate: 981.75,
    pnl: -325.16,
    performance: -0.7610,
    trades: 22,
    instruments: ['spx500_m','Crude','GBPUSD','USDJPY','XAUUSD'],
    currency: 'USD',
    notes: '274 trades logged (journal). Mixed funding: personal + loan capital. Account migrated mid-run.'
  }
];

/* ── 1kHooD Holdings ───────────────────── */
const KHOOD_HOLDINGS = [
  { ticker:'AMZN', name:'Amazon',          exchange:'NASDAQ', price:222.09, openPrice:236.07, qty:1.05903,  change:-0.0592 },
  { ticker:'SNAP', name:'Snapchat',         exchange:'NYSE',   price:11.12,  openPrice:10.83,  qty:23.087,   change: 0.0268 },
  { ticker:'TGT',  name:'Target',           exchange:'NYSE',   price:95.38,  openPrice:134.57, qty:3.71544,  change:-0.2912 },
  { ticker:'NBIS', name:'Nebius Group',      exchange:'NASDAQ', price:45.96,  openPrice:42.56,  qty:5.874239, change: 0.0799 },
  { ticker:'AAPL', name:'Apple',            exchange:'NASDAQ', price:245.90, openPrice:244.06, qty:0.51217,  change: 0.0075 },
  { ticker:'RIVN', name:'Rivian',           exchange:'NASDAQ', price:14.14,  openPrice:14.02,  qty:8.91761,  change: 0.0086 },
  { ticker:'ALGS', name:'Aligos Therapeutics',exchange:'NASDAQ',price:13.54, openPrice:22.47,  qty:5.56331,  change:-0.3974 },
  { ticker:'COIN', name:'Coinbase',         exchange:'NASDAQ', price:306.32, openPrice:266.40, qty:0.46921,  change: 0.1498 },
  { ticker:'JD',   name:'JD.com',           exchange:'NASDAQ', price:31.16,  openPrice:43.16,  qty:1.1585,   change:-0.2780 },
];

/* ── NGX Holdings ──────────────────────── */
const NGX_HOLDINGS = [
  { ticker:'ACCESSCORP', name:'Access Holdings',       price:19.50, openPrice:17.20, qty:292,  changeP: 0.1337 },
  { ticker:'MANSARD',    name:'AXA Mansard Insurance', price:9.25,  openPrice:9.35,  qty:1000, changeP:-0.0107 },
  { ticker:'BUAFOODS',   name:'BUA Foods',             price:374,   openPrice:342,   qty:15,   changeP: 0.0936 },
  { ticker:'CHAMS',      name:'Chams Plc',             price:2.10,  openPrice:1.55,  qty:3250, changeP: 0.3548 },
  { ticker:'FIDELITYBK', name:'Fidelity Bank',         price:10.15, openPrice:9.60,  qty:527,  changeP: 0.0573 },
  { ticker:'GEREGU',     name:'Geregu Power',          price:1141.5,openPrice:900,   qty:6,    changeP: 0.2683 },
];

/* ── 1kHooD daily performance ─────────── */
const KHOOD_PERF = [
  { date:'2025-02-05', val:-0.0021 }, { date:'2025-02-07', val:-0.0172 },
  { date:'2025-02-10', val:-0.0181 }, { date:'2025-02-11', val:-0.0104 },
  { date:'2025-02-12', val:-0.0362 }, { date:'2025-02-13', val:-0.0215 },
  { date:'2025-02-14', val:-0.0055 }, { date:'2025-02-18', val: 0.0016 },
  { date:'2025-02-19', val: 0.0062 }, { date:'2025-02-20', val: 0.0041 },
  { date:'2025-02-21', val:-0.0088 }, { date:'2025-02-24', val: 0.0110 },
  { date:'2025-02-25', val: 0.0095 }, { date:'2025-02-26', val: 0.0073 },
  { date:'2025-03-03', val:-0.0150 }, { date:'2025-03-05', val:-0.0210 },
  { date:'2025-03-10', val: 0.0180 }, { date:'2025-03-15', val: 0.0220 },
  { date:'2025-03-20', val:-0.0090 }, { date:'2025-03-25', val: 0.0310 },
];

/* ── NGX daily performance ─────────────── */
const NGX_PERF = [
  { date:'2025-02-27', val:-0.00912 }, { date:'2025-02-28', val:-0.00299 },
  { date:'2025-03-03', val:-0.00753 }, { date:'2025-03-04', val:-0.02476 },
  { date:'2025-03-05', val:-0.03531 }, { date:'2025-03-06', val:-0.02542 },
  { date:'2025-03-10', val:-0.02796 }, { date:'2025-03-15', val:-0.01200 },
  { date:'2025-03-20', val: 0.00500 }, { date:'2025-03-25', val: 0.01800 },
  { date:'2025-04-01', val: 0.02200 }, { date:'2025-04-10', val: 0.01500 },
];

/* ── Monthly P&L aggregation (from performance files) ── */
const MONTHLY_PNL = [
  { month:'Mar 2020', pnl:-80.20 },  { month:'Apr 2020', pnl:-62.30 },
  { month:'May 2020', pnl:-66.40 },  { month:'Sep 2023', pnl:-120.00 },
  { month:'Oct 2023', pnl:-140.00 }, { month:'Nov 2023', pnl:-65.16 },
  { month:'Feb 2024', pnl:-629.00 }, { month:'Mar 2024', pnl:-40.00 },
  { month:'Apr 2024', pnl:-1951.00 },{ month:'May 2024', pnl:-40.78 },
  { month:'Jun 2024', pnl:-3044.52 },{ month:'Jul 2024', pnl:-2400.00 },
  { month:'Aug 2024', pnl:-845.00 }, { month:'Sep 2024', pnl:-1025.40 },
  { month:'Oct 2024', pnl:-365.19 }, { month:'Nov 2024', pnl:-120.00 },
  { month:'Dec 2024', pnl:-90.00 },  { month:'Jan 2025', pnl:-74.46 },
];

/* ── Market P&L breakdown ─────────────── */
const MARKET_PNL = [
  { name:'US Futures', pnl:-9488.02, accounts:5, color:'#6366f1' },
  { name:'Spot FX',    pnl:-1278.64, accounts:6, color:'#40B5AD' },
  { name:'Personal FX',pnl:-534.06,  accounts:2, color:'#7c3aed' },
];

/* ────────────────────────────────────────────
   UTILITIES
──────────────────────────────────────────── */
function fmt(n, prefix='$', decimals=2) {
  if (n == null) return '—';
  const abs = Math.abs(n);
  const str = abs >= 1000
    ? (abs/1000).toFixed(1) + 'k'
    : abs.toFixed(decimals);
  return (n < 0 ? '-' : '') + prefix + str;
}
function fmtFull(n, prefix='$') {
  if (n == null) return '—';
  return (n < 0 ? '-' : '') + prefix + Math.abs(n).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
}
function fmtPct(n) {
  if (n == null) return '—';
  return (n > 0 ? '+' : '') + (n * 100).toFixed(2) + '%';
}
function fmtDate(d) {
  if (!d) return 'Present';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}
function fmtDateShort(d) {
  if (!d) return 'Present';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-GB', { month:'short', year:'2-digit' });
}
function daysBetween(a, b) {
  const d1 = new Date(a + 'T00:00:00');
  const d2 = b ? new Date(b + 'T00:00:00') : new Date();
  return Math.max(1, Math.round((d2 - d1) / 86400000));
}
function pnlClass(n) {
  if (n == null) return 'neutral';
  return n >= 0 ? 'positive' : 'negative';
}

/* ────────────────────────────────────────────
   NAV SCROLL BEHAVIOUR
──────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);

    // Active nav link highlight
    const sections = ['hero','overview','accounts','trading','funds','performance'];
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.nav-mobile-link').forEach(l => {
    l.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* ────────────────────────────────────────────
   COUNT-UP ANIMATION
──────────────────────────────────────────── */
function initCountUp() {
  const nums = document.querySelectorAll('.hero-stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => observer.observe(n));
}

/* ────────────────────────────────────────────
   HERO TIMELINE
──────────────────────────────────────────── */
function buildHeroTimeline() {
  const track = document.getElementById('heroTimeline');
  if (!track) return;

  const minDate = new Date('2020-03-01T00:00:00');
  const maxDate = new Date('2026-07-01T00:00:00');
  const totalMs = maxDate - minDate;

  const COLORS = {
    'spot':    '#40B5AD',
    'futures': '#6366f1',
    'stocks':  '#16a34a',
    'ngx':     '#d97706',
    'personal':'#7c3aed'
  };

  ACCOUNTS.forEach(acc => {
    const start = new Date(acc.startDate + 'T00:00:00');
    const end = acc.endDate ? new Date(acc.endDate + 'T00:00:00') : new Date();
    const left = ((start - minDate) / totalMs) * 100;
    const width = Math.max(0.5, ((end - start) / totalMs) * 100);
    const color = acc.type === 'personal' ? COLORS.personal : COLORS[acc.market] || '#aaa';

    const bar = document.createElement('div');
    bar.className = 'timeline-bar';
    bar.style.cssText = `left:${left}%;width:${width}%;background:${color};`;
    bar.title = `${acc.shortName} · ${fmtDate(acc.startDate)} → ${fmtDate(acc.endDate)}`;
    bar.textContent = width > 4 ? acc.shortName : '';
    bar.addEventListener('click', () => openDrawer(acc.id));
    track.appendChild(bar);
  });
}

/* ────────────────────────────────────────────
   OVERVIEW CHARTS
──────────────────────────────────────────── */
const CHART_DEFAULTS = {
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
  animation: { duration: 900, easing: 'easeOutCubic' }
};

function buildOverviewCharts() {
  // Market donut
  const marketData = [
    { label:'US Futures', value:250000, color:'#6366f1' },
    { label:'Spot FX',    value:31000,  color:'#40B5AD' },
    { label:'US Stocks',  value:1000,   color:'#16a34a' },
    { label:'Personal',   value:722,    color:'#7c3aed' },
  ];
  buildDonut('marketDonut', 'marketLegend', marketData, v => '$' + (v/1000).toFixed(0) + 'k');

  // Type donut
  const typeData = [
    { label:'Prop Eval',  value:9, color:'#40B5AD' },
    { label:'Live Funds', value:2, color:'#16a34a' },
    { label:'Personal',   value:2, color:'#7c3aed' },
    { label:'Active Eval',value:2, color:'#d97706' },
  ];
  buildDonut('typeDonut', 'typeLegend', typeData, v => v + ' accts');

  // P&L bar chart
  buildPnlBar();
}

function buildDonut(canvasId, legendId, data, valFmt) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.label),
      datasets: [{ data: data.map(d => d.value), backgroundColor: data.map(d => d.color), borderWidth: 3, borderColor: '#fff', hoverOffset: 6 }]
    },
    options: {
      cutout: '72%',
      ...CHART_DEFAULTS,
      plugins: { legend: { display: false }, tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#141f1e',
        bodyColor: '#3d5452',
        borderColor: '#ddecea',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${valFmt(ctx.raw)}`
        }
      }}
    }
  });

  const legend = document.getElementById(legendId);
  if (!legend) return;
  data.forEach(d => {
    legend.innerHTML += `
      <div class="legend-item">
        <span class="legend-dot" style="background:${d.color}"></span>
        <span>${d.label}</span>
        <span class="legend-val">${valFmt(d.value)}</span>
      </div>`;
  });
}

function buildPnlBar() {
  const canvas = document.getElementById('pnlBar');
  if (!canvas) return;

  const closed = ACCOUNTS.filter(a => a.pnl != null);
  const labels = closed.map(a => a.shortName);
  const values = closed.map(a => a.pnl);
  const colors = values.map(v => v >= 0 ? 'rgba(22,163,74,0.8)' : 'rgba(220,38,38,0.8)');

  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: colors, borderRadius: 4, borderSkipped: false }]
    },
    options: {
      responsive: true,
      animation: { duration: 900 },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#141f1e',
          bodyColor: '#3d5452',
          borderColor: '#ddecea',
          borderWidth: 1,
          padding: 10,
          callbacks: {
            label: ctx => ` P&L: ${fmtFull(ctx.raw)}`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#7a9896', font: { size: 10 }, maxRotation: 40 } },
        y: { grid: { color: '#eef5f4' }, ticks: { color: '#7a9896', font: { size: 10 }, callback: v => '$' + (v/1000).toFixed(1) + 'k' } }
      }
    }
  });
}

/* ────────────────────────────────────────────
   ACCOUNT CARDS
──────────────────────────────────────────── */
function buildAccountCards(filter = 'all') {
  const grid = document.getElementById('accountsGrid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? ACCOUNTS
    : ACCOUNTS.filter(a => {
        if (filter === 'active')    return a.status === 'active';
        if (filter === 'prop-eval') return a.type === 'prop-eval';
        if (filter === 'personal')  return a.type === 'personal';
        if (filter === 'fund')      return a.type === 'fund';
        return true;
      });

  grid.innerHTML = filtered.map(acc => {
    const days = daysBetween(acc.startDate, acc.endDate);
    const statusBadge = acc.status === 'active'
      ? `<span class="badge badge--active">● Active</span>`
      : `<span class="badge badge--completed">✓ Ended</span>`;
    const typeBadge = acc.type === 'prop-eval'
      ? `<span class="badge badge--eval">Prop Eval</span>`
      : acc.type === 'fund'
      ? `<span class="badge badge--fund">Fund</span>`
      : `<span class="badge badge--personal">Personal</span>`;
    const mktBadge = `<span class="badge badge--${acc.market}">${acc.marketLabel}</span>`;

    const sizeVal = acc.currency === 'NGN'
      ? '<span class="account-card-stat-val neutral">NGN</span>'
      : `<span class="account-card-stat-val neutral">${fmt(acc.size)}</span>`;

    const pnlVal = acc.pnl != null
      ? `<span class="account-card-stat-val ${acc.pnl >= 0 ? 'positive' : 'negative'}">${fmtFull(acc.pnl)}</span>`
      : `<span class="account-card-stat-val neutral">In Progress</span>`;

    const perfVal = acc.performance != null
      ? `<span class="account-card-stat-val ${acc.performance >= 0 ? 'positive' : 'negative'}">${fmtPct(acc.performance)}</span>`
      : `<span class="account-card-stat-val neutral">—</span>`;

    const tradesVal = acc.trades > 0
      ? `<span class="account-card-stat-val">${acc.trades.toLocaleString()}</span>`
      : `<span class="account-card-stat-val neutral">—</span>`;

    return `
    <div class="account-card" data-status="${acc.status}" data-type="${acc.type}" data-id="${acc.id}" onclick="openDrawer('${acc.id}')">
      <div class="account-card-top">
        <div class="account-card-badges">${statusBadge}${typeBadge}${mktBadge}</div>
        <span class="account-card-platform">${acc.platform}</span>
      </div>
      <div class="account-card-name">${acc.accountId}</div>
      <div class="account-card-title">${acc.name}</div>
      <div class="account-card-period">${fmtDate(acc.startDate)} → ${fmtDate(acc.endDate)} · ${days} days</div>
      <div class="account-card-stats">
        <div class="account-card-stat">
          <div class="account-card-stat-label">Account Size</div>
          ${sizeVal}
        </div>
        <div class="account-card-stat">
          <div class="account-card-stat-label">Net P&L</div>
          ${pnlVal}
        </div>
        <div class="account-card-stat">
          <div class="account-card-stat-label">Return</div>
          ${perfVal}
        </div>
        <div class="account-card-stat">
          <div class="account-card-stat-label">Trades</div>
          ${tradesVal}
        </div>
      </div>
      <div class="account-card-footer">
        <span class="account-card-cta">View details →</span>
        <span class="account-card-trades">${acc.instruments.slice(0,3).join(' · ')}</span>
      </div>
    </div>`;
  }).join('');
}

function initAccountFilters() {
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildAccountCards(btn.dataset.filter);
    });
  });
}

/* ────────────────────────────────────────────
   TRADING TABLE
──────────────────────────────────────────── */
function buildTradingTable() {
  const rows = document.getElementById('tradingAccountsRows');
  if (!rows) return;

  const trading = ACCOUNTS.filter(a => a.type === 'prop-eval' || a.type === 'personal');

  rows.innerHTML = trading.map(acc => {
    const days = daysBetween(acc.startDate, acc.endDate);
    const statusCls = acc.status === 'active' ? 'active' : acc.pnl < 0 ? 'lost' : 'completed';
    const statusLabel = acc.status === 'active' ? '● Active' : acc.pnl < 0 ? '× Lost' : '✓ Done';
    const pnlStr = acc.pnl != null ? fmtFull(acc.pnl) : 'Running';
    const pnlCls = acc.pnl == null ? '' : acc.pnl >= 0 ? 'pos' : 'neg';

    return `
    <div class="tat-row" onclick="openDrawer('${acc.id}')" style="cursor:pointer">
      <div>
        <span class="tat-account-name">${acc.name}</span>
        <span class="tat-account-id">${acc.accountId}</span>
      </div>
      <div>${acc.platform}</div>
      <div>${acc.marketLabel}</div>
      <div>${fmtDateShort(acc.startDate)} → ${fmtDateShort(acc.endDate)} <span style="color:var(--text-3);font-size:11px">(${days}d)</span></div>
      <div style="font-family:var(--font-mono);font-size:13px">${acc.currency === 'NGN' ? 'NGN' : fmt(acc.size)}</div>
      <div class="tat-pnl ${pnlCls}">${pnlStr}</div>
      <div><span class="tat-status ${statusCls}">${statusLabel}</span></div>
    </div>`;
  }).join('');

  // Instruments row
  const instrRow = document.getElementById('instrumentsRow');
  if (!instrRow) return;
  const allInstr = {};
  ACCOUNTS.filter(a => a.type !== 'fund').forEach(a => {
    a.instruments.forEach(i => { allInstr[i] = a.market; });
  });
  const instrColors = { spot:'#40B5AD', futures:'#6366f1', personal:'#7c3aed' };
  instrRow.innerHTML = Object.entries(allInstr).map(([sym, mkt]) =>
    `<span class="instrument-chip"><span style="background:${instrColors[mkt]||'#aaa'}"></span>${sym}</span>`
  ).join('');
}

/* ────────────────────────────────────────────
   FUND SECTIONS
──────────────────────────────────────────── */
function buildFunds() {
  // 1kHooD holdings count
  const khoodCount = document.getElementById('khoodHoldings');
  if (khoodCount) khoodCount.textContent = KHOOD_HOLDINGS.length + ' positions';

  // NGX holdings count
  const ngxCount = document.getElementById('ngxHoldings');
  if (ngxCount) ngxCount.textContent = NGX_HOLDINGS.length + ' positions';

  // 1kHooD holdings list (top 5)
  const khoodList = document.getElementById('khoodHoldingsList');
  if (khoodList) {
    khoodList.innerHTML = KHOOD_HOLDINGS.slice(0, 6).map(h => {
      const cls = h.change >= 0 ? 'pos' : 'neg';
      const chgStr = (h.change >= 0 ? '+' : '') + (h.change * 100).toFixed(1) + '%';
      return `
      <div class="holding-row">
        <span class="holding-ticker">${h.ticker}</span>
        <span class="holding-name">${h.name}</span>
        <span class="holding-change ${cls}">${chgStr}</span>
      </div>`;
    }).join('');
  }

  // NGX holdings list
  const ngxList = document.getElementById('ngxHoldingsList');
  if (ngxList) {
    ngxList.innerHTML = NGX_HOLDINGS.slice(0, 6).map(h => {
      const cls = h.changeP >= 0 ? 'pos' : 'neg';
      const chgStr = (h.changeP >= 0 ? '+' : '') + (h.changeP * 100).toFixed(1) + '%';
      return `
      <div class="holding-row">
        <span class="holding-ticker">${h.ticker}</span>
        <span class="holding-name">${h.name}</span>
        <span class="holding-change ${cls}">${chgStr}</span>
      </div>`;
    }).join('');
  }

  // 1kHooD performance chart
  buildFundChart('khoodChart', KHOOD_PERF, '#40B5AD');
  // NGX performance chart
  buildFundChart('ngxChart', NGX_PERF, '#d97706');
}

function buildFundChart(canvasId, perfData, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Build cumulative return series
  let cum = 0;
  const labels = perfData.map(p => {
    const d = new Date(p.date + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { day:'numeric', month:'short' });
  });
  const values = perfData.map(p => {
    cum += p.val;
    return parseFloat((cum * 100).toFixed(2));
  });

  const lastVal = values[values.length - 1];
  const lineColor = lastVal >= 0 ? '#16a34a' : '#dc2626';

  new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data: values,
        borderColor: lineColor,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        tension: 0.4,
        fill: true,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 100);
          gradient.addColorStop(0, lineColor + '22');
          gradient.addColorStop(1, lineColor + '00');
          return gradient;
        }
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 900 },
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: '#fff', titleColor: '#141f1e', bodyColor: '#3d5452',
        borderColor: '#ddecea', borderWidth: 1, padding: 10,
        callbacks: { label: ctx => ` Cumulative: ${ctx.raw}%` }
      }},
      scales: {
        x: { display: false },
        y: {
          grid: { color: '#eef5f4' },
          ticks: { color: '#7a9896', font: { size: 10 }, callback: v => v + '%' }
        }
      }
    }
  });
}

/* ────────────────────────────────────────────
   PERFORMANCE SECTION
──────────────────────────────────────────── */
function buildPerformance() {
  buildMonthlyPnlChart();
  buildCostChart();
  buildMarketPerfList();
  buildDurationChart();
}

function buildMonthlyPnlChart() {
  const canvas = document.getElementById('monthlyPnlChart');
  if (!canvas) return;
  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: MONTHLY_PNL.map(m => m.month),
      datasets: [{
        data: MONTHLY_PNL.map(m => m.pnl),
        backgroundColor: MONTHLY_PNL.map(m => m.pnl >= 0 ? 'rgba(22,163,74,0.75)' : 'rgba(220,38,38,0.75)'),
        borderRadius: 4, borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 900 },
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: '#fff', titleColor: '#141f1e', bodyColor: '#3d5452',
        borderColor: '#ddecea', borderWidth: 1, padding: 10,
        callbacks: { label: ctx => ` P&L: ${fmtFull(ctx.raw)}` }
      }},
      scales: {
        x: { grid: { display: false }, ticks: { color: '#7a9896', font: { size: 10 }, maxRotation: 45 } },
        y: { grid: { color: '#eef5f4' }, ticks: { color: '#7a9896', font: { size: 10 }, callback: v => '$' + v } }
      }
    }
  });
}

function buildCostChart() {
  const canvas = document.getElementById('costChart');
  if (!canvas) return;
  const evalFees = ACCOUNTS.filter(a => a.costOfFund && a.type !== 'personal' && a.type !== 'fund')
    .reduce((s, a) => s + a.costOfFund, 0);
  const data = [
    { label:'Eval Fees',       value: evalFees, color:'#dc2626' },
    { label:'Commission',      value: 320,      color:'#d97706' },
    { label:'Swap/Overnight',  value: 58,       color:'#6366f1' },
  ];
  new Chart(canvas.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: data.map(d => d.label),
      datasets: [{ data: data.map(d => d.value), backgroundColor: data.map(d => d.color), borderWidth: 3, borderColor: '#fff', hoverOffset: 5 }]
    },
    options: { cutout: '68%', ...CHART_DEFAULTS, plugins: { legend: { display: false }, tooltip: {
      enabled: true, backgroundColor: '#fff', titleColor: '#141f1e', bodyColor: '#3d5452',
      borderColor: '#ddecea', borderWidth: 1, padding: 10,
      callbacks: { label: ctx => ` ${ctx.label}: ${fmtFull(ctx.raw)}` }
    }}}
  });
  const breakdown = document.getElementById('costBreakdown');
  if (breakdown) {
    breakdown.innerHTML = data.map(d =>
      `<div class="cost-row">
        <span class="cost-dot" style="background:${d.color}"></span>
        <span class="cost-name">${d.label}</span>
        <span class="cost-val">${fmtFull(d.value)}</span>
      </div>`
    ).join('');
  }
}

function buildMarketPerfList() {
  const list = document.getElementById('marketPerfList');
  if (!list) return;
  const maxAbs = Math.max(...MARKET_PNL.map(m => Math.abs(m.pnl)));
  list.innerHTML = MARKET_PNL.map(m => {
    const barPct = (Math.abs(m.pnl) / maxAbs) * 100;
    return `
    <div class="market-perf-row">
      <div class="market-perf-top">
        <span class="market-perf-name">${m.name}</span>
        <span class="market-perf-val ${m.pnl >= 0 ? 'pos' : 'neg'}">${fmtFull(m.pnl)}</span>
      </div>
      <div class="market-perf-bar-wrap">
        <div class="market-perf-bar" style="width:${barPct}%;background:${m.pnl >= 0 ? '#16a34a' : '#dc2626'}"></div>
      </div>
    </div>`;
  }).join('');
}

function buildDurationChart() {
  const canvas = document.getElementById('durationChart');
  if (!canvas) return;
  const accs = ACCOUNTS.filter(a => a.endDate).slice(0, 11);
  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: accs.map(a => a.shortName),
      datasets: [{
        data: accs.map(a => daysBetween(a.startDate, a.endDate)),
        backgroundColor: accs.map(a => a.market === 'futures' ? '#6366f188' : '#40B5AD88'),
        borderRadius: 4, borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      animation: { duration: 900 },
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: '#fff', titleColor: '#141f1e', bodyColor: '#3d5452',
        borderColor: '#ddecea', borderWidth: 1, padding: 10,
        callbacks: { label: ctx => ` Duration: ${ctx.raw} days` }
      }},
      scales: {
        x: { grid: { color: '#eef5f4' }, ticks: { color: '#7a9896', font: { size: 10 }, callback: v => v + 'd' } },
        y: { grid: { display: false }, ticks: { color: '#7a9896', font: { size: 10 } } }
      }
    }
  });
}

/* ────────────────────────────────────────────
   ACCOUNT DETAIL DRAWER
──────────────────────────────────────────── */
function openDrawer(id) {
  const acc = ACCOUNTS.find(a => a.id === id);
  if (!acc) return;

  document.getElementById('drawerTitle').textContent = acc.name;
  document.getElementById('drawerSubtitle').textContent =
    `${acc.accountId} · ${acc.platform} · ${acc.marketLabel}`;

  const days = daysBetween(acc.startDate, acc.endDate);
  const statusTxt = acc.status === 'active' ? '● Active' : '✓ Ended';

  document.getElementById('drawerBody').innerHTML = `
    <div class="drawer-stats">
      <div class="drawer-stat">
        <div class="drawer-stat-label">Status</div>
        <div class="drawer-stat-val">${statusTxt}</div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">Account Size</div>
        <div class="drawer-stat-val">${acc.currency === 'NGN' ? 'NGN' : fmt(acc.size)}</div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">Net P&L</div>
        <div class="drawer-stat-val ${acc.pnl == null ? '' : acc.pnl >= 0 ? 'pos' : 'neg'}">
          ${acc.pnl != null ? fmtFull(acc.pnl) : 'In Progress'}
        </div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">Return</div>
        <div class="drawer-stat-val ${acc.performance == null ? '' : acc.performance >= 0 ? 'pos' : 'neg'}">
          ${acc.performance != null ? fmtPct(acc.performance) : '—'}
        </div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">Eval Fee</div>
        <div class="drawer-stat-val">${acc.costOfFund ? fmtFull(acc.costOfFund) : '—'}</div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">Duration</div>
        <div class="drawer-stat-val">${days} days</div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">Period</div>
        <div class="drawer-stat-val" style="font-size:13px">${fmtDate(acc.startDate)}</div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">End Date</div>
        <div class="drawer-stat-val" style="font-size:13px">${fmtDate(acc.endDate)}</div>
      </div>
      <div class="drawer-stat">
        <div class="drawer-stat-label">Trades</div>
        <div class="drawer-stat-val">${acc.trades > 0 ? acc.trades.toLocaleString() : '—'}</div>
      </div>
    </div>

    <div class="drawer-section-title">Instruments Traded</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
      ${acc.instruments.map(i => `<span class="instrument-chip"><span style="background:#40B5AD;width:6px;height:6px;border-radius:50%"></span>${i}</span>`).join('')}
    </div>

    ${acc.fxRate ? `
    <div class="drawer-section-title">Fund Details</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      <div class="drawer-stat"><div class="drawer-stat-label">NGN/USD Rate</div><div class="drawer-stat-val">₦${acc.fxRate.toLocaleString()}</div></div>
      <div class="drawer-stat"><div class="drawer-stat-label">Platform</div><div class="drawer-stat-val">${acc.platform}</div></div>
    </div>` : ''}

    <div class="drawer-section-title">Notes</div>
    <p style="font-size:13px;color:var(--text-2);line-height:1.6;padding:14px;background:var(--bg);border-radius:var(--radius-md)">${acc.notes}</p>

    ${acc.type === 'fund' && acc.id === '1KHOOD' ? buildDrawerFundContent(KHOOD_HOLDINGS, 'USD') : ''}
    ${acc.type === 'fund' && acc.id === 'NGX' ? buildDrawerFundContent(NGX_HOLDINGS, 'NGN') : ''}
  `;

  document.getElementById('accountDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function buildDrawerFundContent(holdings, currency) {
  return `
    <div class="drawer-section-title">Current Holdings</div>
    <div class="drawer-trades-table">
      <div class="drawer-trades-header">
        <span>Ticker</span><span>Name</span><span>Qty</span>
        <span>Open $</span><span>Current</span><span>Change</span>
      </div>
      ${holdings.map(h => {
        const chg = h.changeP !== undefined ? h.changeP : h.change;
        const cls = chg >= 0 ? 'pos' : 'neg';
        const chgStr = (chg >= 0 ? '+' : '') + (chg * 100).toFixed(2) + '%';
        return `
        <div class="drawer-trade-row">
          <span style="font-family:var(--font-mono);font-weight:500">${h.ticker}</span>
          <span style="color:var(--text-2)">${h.name}</span>
          <span style="font-family:var(--font-mono)">${parseFloat(h.qty).toFixed(2)}</span>
          <span style="font-family:var(--font-mono)">${currency === 'NGN' ? '₦' : '$'}${h.openPrice}</span>
          <span style="font-family:var(--font-mono)">${currency === 'NGN' ? '₦' : '$'}${h.price}</span>
          <span class="drawer-pnl ${cls}">${chgStr}</span>
        </div>`;
      }).join('')}
    </div>`;
}

function closeDrawer() {
  document.getElementById('accountDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ────────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.stat-card, .chart-card, .account-card, .fund-card, .perf-card, .market-pill, .tstat-block'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)';
    observer.observe(el);
  });
}

/* ────────────────────────────────────────────
   INIT
──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCountUp();
  buildHeroTimeline();
  buildOverviewCharts();
  buildAccountCards();
  initAccountFilters();
  buildTradingTable();
  buildFunds();
  buildPerformance();

  // Drawer close
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Scroll reveal after initial render
  requestAnimationFrame(() => initScrollReveal());
});
