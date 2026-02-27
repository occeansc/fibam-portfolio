/* ════════════════════════════════════════════════
   FIBAM PORTFOLIO — app.js  v2.0
   Phase 2: Real trade data · PNL calendars · Equity curves · Live dashboards
   Font stack: Outfit + Plus Jakarta Sans + JetBrains Mono (Polymarket-style)
════════════════════════════════════════════════ */
'use strict';

/* ────────────────────────────────────────────
   REAL TRADE DATA — extracted directly from spreadsheets
──────────────────────────────────────────── */
const FDNT_TRADES = [
  {"closeDate":"2026-02-17","openDate":"2026-02-17","instrument":"USDJPY","direction":"Short","lots":0.02,"entry":153.81,"exit":153.289,"pips":521,"grossPnl":6.8,"commission":0.1,"swap":0,"netPnl":6.7},
  {"closeDate":"2026-02-17","openDate":"2026-02-17","instrument":"GBPUSD","direction":"Long","lots":0.02,"entry":1.35051,"exit":1.35592,"pips":541,"grossPnl":10.82,"commission":0.1,"swap":0,"netPnl":10.72},
  {"closeDate":"2026-02-17","openDate":"2026-02-17","instrument":"EURUSD","direction":"Long","lots":0.02,"entry":1.18118,"exit":1.18478,"pips":361,"grossPnl":7.22,"commission":0.1,"swap":0,"netPnl":7.12},
  {"closeDate":"2026-02-17","openDate":"2026-02-17","instrument":"GBPUSD","direction":"Short","lots":0.05,"entry":1.3511,"exit":1.34986,"pips":123,"grossPnl":6.15,"commission":0.25,"swap":0,"netPnl":5.9},
  {"closeDate":"2026-02-17","openDate":"2026-02-17","instrument":"GBPUSD","direction":"Long","lots":0.03,"entry":1.35202,"exit":1.34965,"pips":-237,"grossPnl":-7.11,"commission":0.15,"swap":0,"netPnl":-7.26},
  {"closeDate":"2026-02-17","openDate":"2026-02-17","instrument":"GBPUSD","direction":"Long","lots":0.03,"entry":1.35283,"exit":1.35043,"pips":-240,"grossPnl":-7.2,"commission":0.15,"swap":0,"netPnl":-7.35},
  {"closeDate":"2026-02-17","openDate":"2026-02-09","instrument":"GBPUSD","direction":"Long","lots":0.02,"entry":1.36843,"exit":1.35265,"pips":-1578,"grossPnl":-31.56,"commission":0.1,"swap":3.0,"netPnl":-34.66},
  {"closeDate":"2026-02-17","openDate":"2026-02-06","instrument":"GBPUSD","direction":"Long","lots":0.01,"entry":1.35122,"exit":1.35592,"pips":470,"grossPnl":4.7,"commission":0.05,"swap":2.0,"netPnl":2.65},
  {"closeDate":"2026-02-17","openDate":"2026-02-05","instrument":"GBPUSD","direction":"Long","lots":0.01,"entry":1.35371,"exit":1.35023,"pips":-348,"grossPnl":-3.48,"commission":0.05,"swap":2.0,"netPnl":-5.53},
  {"closeDate":"2026-02-17","openDate":"2026-02-05","instrument":"GBPUSD","direction":"Long","lots":0.01,"entry":1.3545,"exit":1.35004,"pips":-446,"grossPnl":-4.46,"commission":0.05,"swap":2.0,"netPnl":-6.51},
  {"closeDate":"2026-02-17","openDate":"2026-02-05","instrument":"GBPUSD","direction":"Long","lots":0.02,"entry":1.35568,"exit":1.34975,"pips":-593,"grossPnl":-11.86,"commission":0.1,"swap":3.0,"netPnl":-14.96},
  {"closeDate":"2026-02-18","openDate":"2026-02-18","instrument":"GBPUSD","direction":"Short","lots":0.04,"entry":1.35789,"exit":1.35683,"pips":106,"grossPnl":4.24,"commission":0.2,"swap":0,"netPnl":4.04},
  {"closeDate":"2026-02-18","openDate":"2026-02-18","instrument":"USDJPY","direction":"Short","lots":0.06,"entry":153.823,"exit":154.49,"pips":-667,"grossPnl":-25.9,"commission":0.3,"swap":0,"netPnl":-26.2},
  {"closeDate":"2026-02-18","openDate":"2026-02-18","instrument":"USDJPY","direction":"Short","lots":0.06,"entry":153.557,"exit":154.761,"pips":-1204,"grossPnl":-46.68,"commission":0.3,"swap":0,"netPnl":-46.98},
  {"closeDate":"2026-02-18","openDate":"2026-02-18","instrument":"USDJPY","direction":"Short","lots":0.02,"entry":153.663,"exit":154.764,"pips":-1101,"grossPnl":-14.23,"commission":0.1,"swap":0,"netPnl":-14.33},
  {"closeDate":"2026-02-19","openDate":"2026-02-19","instrument":"USDJPY","direction":"Short","lots":0.02,"entry":154.949,"exit":155.339,"pips":-390,"grossPnl":-5.02,"commission":0.1,"swap":0,"netPnl":-5.12},
  {"closeDate":"2026-02-19","openDate":"2026-02-18","instrument":"USDJPY","direction":"Short","lots":0.02,"entry":154.452,"exit":155.062,"pips":-610,"grossPnl":-7.87,"commission":0.1,"swap":2.0,"netPnl":-9.97},
  {"closeDate":"2026-02-19","openDate":"2026-02-18","instrument":"USDJPY","direction":"Short","lots":0.02,"entry":154.189,"exit":155.062,"pips":-873,"grossPnl":-11.26,"commission":0.1,"swap":2.0,"netPnl":-13.36},
  {"closeDate":"2026-02-19","openDate":"2026-02-18","instrument":"USDJPY","direction":"Short","lots":0.04,"entry":154.057,"exit":155.062,"pips":-1005,"grossPnl":-25.93,"commission":0.2,"swap":3.0,"netPnl":-29.13},
  {"closeDate":"2026-02-19","openDate":"2026-02-19","instrument":"USDJPY","direction":"Long","lots":0.04,"entry":155.157,"exit":154.813,"pips":-344,"grossPnl":-8.89,"commission":0.2,"swap":0,"netPnl":-9.09},
  {"closeDate":"2026-02-19","openDate":"2026-02-19","instrument":"GBPUSD","direction":"Long","lots":0.04,"entry":1.34947,"exit":1.3475,"pips":-197,"grossPnl":-7.88,"commission":0.2,"swap":0,"netPnl":-8.08},
  {"closeDate":"2026-02-19","openDate":"2026-02-18","instrument":"EURUSD","direction":"Long","lots":0.02,"entry":1.17867,"exit":1.17757,"pips":-110,"grossPnl":-2.2,"commission":0.1,"swap":1.0,"netPnl":-3.3},
  {"closeDate":"2026-02-19","openDate":"2026-02-18","instrument":"GBPUSD","direction":"Long","lots":0.02,"entry":1.35381,"exit":1.3475,"pips":-631,"grossPnl":-12.62,"commission":0.1,"swap":1.0,"netPnl":-13.72},
  {"closeDate":"2026-02-19","openDate":"2026-02-18","instrument":"GBPUSD","direction":"Long","lots":0.04,"entry":1.35442,"exit":1.3475,"pips":-692,"grossPnl":-27.68,"commission":0.2,"swap":2.0,"netPnl":-29.88},
  {"closeDate":"2026-02-20","openDate":"2026-02-19","instrument":"GBPUSD","direction":"Long","lots":0.02,"entry":1.34544,"exit":1.34954,"pips":410,"grossPnl":8.2,"commission":0.1,"swap":0,"netPnl":8.1},
  {"closeDate":"2026-02-20","openDate":"2026-02-19","instrument":"EURUSD","direction":"Long","lots":0.02,"entry":1.17635,"exit":1.18069,"pips":433,"grossPnl":8.66,"commission":0.1,"swap":0,"netPnl":8.56},
  {"closeDate":"2026-02-23","openDate":"2026-02-23","instrument":"GBPUSD","direction":"Long","lots":0.1,"entry":1.3503,"exit":1.34864,"pips":-166,"grossPnl":-16.6,"commission":0.5,"swap":0,"netPnl":-17.1},
  {"closeDate":"2026-02-23","openDate":"2026-02-23","instrument":"GBPUSD","direction":"Long","lots":0.05,"entry":1.35167,"exit":1.35027,"pips":-140,"grossPnl":-7.0,"commission":0.25,"swap":0,"netPnl":-7.25},
  {"closeDate":"2026-02-23","openDate":"2026-02-23","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":154.619,"exit":154.463,"pips":-156,"grossPnl":-5.05,"commission":0.25,"swap":0,"netPnl":-5.3},
  {"closeDate":"2026-02-24","openDate":"2026-02-23","instrument":"USDJPY","direction":"Long","lots":0.1,"entry":154.332,"exit":155.308,"pips":974,"grossPnl":62.71,"commission":0.5,"swap":1.0,"netPnl":61.21},
  {"closeDate":"2026-02-24","openDate":"2026-02-24","instrument":"USDJPY","direction":"Long","lots":0.1,"entry":156.055,"exit":155.865,"pips":-190,"grossPnl":-12.19,"commission":0.5,"swap":0,"netPnl":-12.69},
  {"closeDate":"2026-02-25","openDate":"2026-02-24","instrument":"USDJPY","direction":"Long","lots":0.1,"entry":155.722,"exit":156.633,"pips":911,"grossPnl":58.16,"commission":0.5,"swap":1.0,"netPnl":56.66},
  {"closeDate":"2026-02-25","openDate":"2026-02-24","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.17857,"exit":1.17888,"pips":31,"grossPnl":1.55,"commission":0.25,"swap":1.0,"netPnl":0.3},
  {"closeDate":"2026-02-25","openDate":"2026-02-25","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":156.777,"exit":156.69,"pips":-87,"grossPnl":-2.78,"commission":0.25,"swap":0,"netPnl":-3.03},
  {"closeDate":"2026-02-25","openDate":"2026-02-25","instrument":"EURUSD","direction":"Long","lots":0.1,"entry":1.1772,"exit":1.17752,"pips":32,"grossPnl":3.2,"commission":0.5,"swap":0,"netPnl":2.7},
  {"closeDate":"2026-02-25","openDate":"2026-02-25","instrument":"EURUSD","direction":"Long","lots":0.1,"entry":1.17916,"exit":1.17969,"pips":53,"grossPnl":5.3,"commission":0.5,"swap":0,"netPnl":4.8},
  {"closeDate":"2026-02-26","openDate":"2026-02-25","instrument":"EURUSD","direction":"Short","lots":0.05,"entry":1.18109,"exit":1.1822,"pips":-111,"grossPnl":-5.55,"commission":0.25,"swap":0,"netPnl":-5.8},
  {"closeDate":"2026-02-26","openDate":"2026-02-25","instrument":"EURUSD","direction":"Short","lots":0.1,"entry":1.18037,"exit":1.1822,"pips":-183,"grossPnl":-18.3,"commission":0.5,"swap":0,"netPnl":-18.8},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":155.998,"exit":156.014,"pips":15,"grossPnl":0.48,"commission":0.25,"swap":0,"netPnl":0.23},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":155.888,"exit":155.955,"pips":67,"grossPnl":2.15,"commission":0.25,"swap":0,"netPnl":1.9},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.18191,"exit":1.18146,"pips":-45,"grossPnl":-2.25,"commission":0.25,"swap":0,"netPnl":-2.5},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Short","lots":0.05,"entry":155.901,"exit":155.888,"pips":13,"grossPnl":0.42,"commission":0.25,"swap":0,"netPnl":0.17},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Long","lots":0.1,"entry":1.18235,"exit":1.18145,"pips":-90,"grossPnl":-9.0,"commission":0.5,"swap":0,"netPnl":-9.5},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":156.02,"exit":155.897,"pips":-122,"grossPnl":-3.91,"commission":0.25,"swap":0,"netPnl":-4.16},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Short","lots":0.05,"entry":156.041,"exit":155.974,"pips":68,"grossPnl":2.18,"commission":0.25,"swap":0,"netPnl":1.93},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.17978,"exit":1.18142,"pips":164,"grossPnl":8.2,"commission":0.25,"swap":0,"netPnl":7.95},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":156.18,"exit":156.39,"pips":210,"grossPnl":6.71,"commission":0.25,"swap":0,"netPnl":6.46},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Short","lots":0.05,"entry":1.18056,"exit":1.17845,"pips":211,"grossPnl":10.55,"commission":0.25,"swap":0,"netPnl":10.3},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":155.942,"exit":156.391,"pips":448,"grossPnl":14.32,"commission":0.25,"swap":0,"netPnl":14.07},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Short","lots":0.05,"entry":1.18107,"exit":1.17844,"pips":263,"grossPnl":13.15,"commission":0.25,"swap":0,"netPnl":12.9}
];

const T5RS_TRADES = [
  {"closeDate":"2026-02-24","openDate":"2026-02-24","instrument":"USDJPY","direction":"Long","lots":0.1,"entry":156.083,"exit":155.867,"pips":-216,"grossPnl":-13.86,"commission":0.4,"swap":0,"netPnl":-14.26},
  {"closeDate":"2026-02-25","openDate":"2026-02-24","instrument":"USDJPY","direction":"Long","lots":0.1,"entry":155.71,"exit":156.613,"pips":903,"grossPnl":57.66,"commission":0.4,"swap":0.21,"netPnl":57.05},
  {"closeDate":"2026-02-25","openDate":"2026-02-24","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.17859,"exit":1.1789,"pips":31,"grossPnl":1.55,"commission":0.2,"swap":0.64,"netPnl":0.71},
  {"closeDate":"2026-02-25","openDate":"2026-02-25","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.17727,"exit":1.17751,"pips":24,"grossPnl":1.2,"commission":0.2,"swap":0,"netPnl":1.0},
  {"closeDate":"2026-02-25","openDate":"2026-02-25","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":156.758,"exit":156.684,"pips":-74,"grossPnl":-2.36,"commission":0.2,"swap":0,"netPnl":-2.56},
  {"closeDate":"2026-02-25","openDate":"2026-02-25","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.17887,"exit":1.17985,"pips":98,"grossPnl":4.9,"commission":0.2,"swap":0,"netPnl":4.7},
  {"closeDate":"2026-02-25","openDate":"2026-02-25","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.17869,"exit":1.17985,"pips":116,"grossPnl":5.8,"commission":0.2,"swap":0,"netPnl":5.6},
  {"closeDate":"2026-02-26","openDate":"2026-02-25","instrument":"EURUSD","direction":"Short","lots":0.1,"entry":1.18047,"exit":1.1822,"pips":-173,"grossPnl":-17.3,"commission":0.4,"swap":1.02,"netPnl":-18.72},
  {"closeDate":"2026-02-26","openDate":"2026-02-25","instrument":"EURUSD","direction":"Short","lots":0.05,"entry":1.18106,"exit":1.1822,"pips":-114,"grossPnl":-5.7,"commission":0.2,"swap":0.51,"netPnl":-6.41},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":156.03,"exit":155.91,"pips":-120,"grossPnl":-3.85,"commission":0.2,"swap":0,"netPnl":-4.05},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Long","lots":0.1,"entry":1.18229,"exit":1.18146,"pips":-83,"grossPnl":-8.3,"commission":0.4,"swap":0,"netPnl":-8.7},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Short","lots":0.05,"entry":155.895,"exit":155.878,"pips":17,"grossPnl":0.55,"commission":0.2,"swap":0,"netPnl":0.35},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.18193,"exit":1.18147,"pips":-46,"grossPnl":-2.3,"commission":0.2,"swap":0,"netPnl":-2.5},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":155.879,"exit":155.687,"pips":-192,"grossPnl":-6.17,"commission":0.2,"swap":0,"netPnl":-6.37},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":155.998,"exit":156.007,"pips":9,"grossPnl":0.29,"commission":0.2,"swap":0,"netPnl":0.09},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Long","lots":0.05,"entry":1.17983,"exit":1.18141,"pips":158,"grossPnl":7.9,"commission":0.2,"swap":0,"netPnl":7.7},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Short","lots":0.05,"entry":156.036,"exit":155.982,"pips":54,"grossPnl":1.73,"commission":0.2,"swap":0,"netPnl":1.53},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Short","lots":0.05,"entry":1.18054,"exit":1.17846,"pips":208,"grossPnl":10.4,"commission":0.2,"swap":0,"netPnl":10.2},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":156.178,"exit":156.392,"pips":214,"grossPnl":6.84,"commission":0.2,"swap":0,"netPnl":6.64},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"USDJPY","direction":"Long","lots":0.05,"entry":155.934,"exit":156.392,"pips":458,"grossPnl":14.64,"commission":0.2,"swap":0,"netPnl":14.44},
  {"closeDate":"2026-02-26","openDate":"2026-02-26","instrument":"EURUSD","direction":"Short","lots":0.05,"entry":1.18118,"exit":1.1785,"pips":268,"grossPnl":13.4,"commission":0.2,"swap":0,"netPnl":13.2}
];

/* ── Lookup map: accountId → trades ──────── */
const TRADE_DATA = {
  'FDNT-6KX1': FDNT_TRADES,
  'T5RS-5KX1': T5RS_TRADES
};

/* ── Prop firm evaluation targets ────────── */
const PROP_TARGETS = {
  'FDNT-6KX1': { profitTarget:600,  maxDD:600,  dailyDD:300, accountSize:6000 },
  'T5RS-5KX1': { profitTarget:250,  maxDD:200,  dailyDD:150, accountSize:5000 }
};

/* ────────────────────────────────────────────
   ACCOUNT MASTER DATA
──────────────────────────────────────────── */
const ACCOUNTS = [
  { id:'FDNT-6KX1', name:'FundedNext Evaluation', shortName:'FundedNext X1', accountId:'FDNT$6KX1-STP-PFF', platform:'FundedNext', type:'prop-eval', market:'spot', marketLabel:'Spot FX', status:'active', startDate:'2026-02-05', endDate:null, size:6000, costOfFund:63.21, fxRate:1471.05, pnl:-136.19, performance:-0.022698, trades:50, instruments:['GBPUSD','EURUSD','USDJPY'], currency:'USD', notes:'Phase 1 in progress. 50 trades · 8 trading days. Best day +$61.43 (Feb 25), worst −$121.65 (Feb 19). Win rate 44%. Recovering after early drawdown.' },
  { id:'T5RS-5KX1', name:'The5ers Evaluation', shortName:'The5ers X1', accountId:'T5RS$5KX1-STP-PFF', platform:'The5ers', type:'prop-eval', market:'spot', marketLabel:'Spot FX', status:'active', startDate:'2026-02-22', endDate:null, size:5000, costOfFund:31.50, fxRate:1469.60, pnl:59.64, performance:0.011928, trades:21, instruments:['USDJPY','EURUSD','GBPUSD'], currency:'USD', notes:'Phase 1 in progress. 21 trades · 3 days. Win rate 62%, profit factor 1.94. Best day +$66.50 (Feb 25). Currently in profit.' },
  { id:'1KHOOD', name:'1kHooD Fund', shortName:'1kHooD', accountId:'FIBAM-1kHooD', platform:'Robinhood', type:'fund', market:'stocks', marketLabel:'US Equities', status:'active', startDate:'2025-02-05', endDate:null, size:1000, costOfFund:0, fxRate:null, pnl:null, performance:null, trades:132, instruments:['AMZN','SNAP','TGT','NBIS','AAPL','RIVN','COIN','JD'], currency:'USD', notes:'Managed equity fund on Robinhood. $169.15 withdrawn (Sep/Oct 2025). 9 active positions as of Feb 2026.' },
  { id:'NGX', name:'FIBAM NGX', shortName:'NGX Portfolio', accountId:'FIBAM-NGX', platform:'NGX Exchange', type:'fund', market:'ngx', marketLabel:'Nigerian Stocks', status:'active', startDate:'2024-05-29', endDate:null, size:null, costOfFund:0, fxRate:null, pnl:null, performance:null, trades:29, instruments:['ACCESSCORP','BUAFOODS','GEREGU','FIDELITYBK','MANSARD','CHAMS'], currency:'NGN', notes:'Nigerian equities portfolio. 6 holdings across banking, consumer goods, energy and insurance sectors. All figures in NGN.' },
  { id:'MFFX-X1', name:'MyFundedFX Spot #1', shortName:'MFFX X1', accountId:'MFFX$5kX1-STP_PFF', platform:'MyFundedFX', type:'prop-eval', market:'spot', marketLabel:'Spot FX', status:'completed', startDate:'2024-02-12', endDate:'2024-02-13', size:5000, costOfFund:42, fxRate:1600, pnl:-377.21, performance:-0.075442, trades:67, instruments:['GBPUSD','NAS100','WTI','XAUEUR'], currency:'USD', notes:'2-day account. Breached drawdown limit on day 2.' },
  { id:'MFFX-X2', name:'MyFundedFX Spot #2', shortName:'MFFX X2', accountId:'MFFX$5kX2-STP_PFF', platform:'MyFundedFX', type:'prop-eval', market:'spot', marketLabel:'Spot FX', status:'completed', startDate:'2024-02-19', endDate:'2024-05-19', size:5000, costOfFund:42, fxRate:1600, pnl:-251.78, performance:-0.050356, trades:65, instruments:['GBPUSD','NAS100','WTI','XAUAUD'], currency:'USD', notes:'Longest spot account at 91 days.' },
  { id:'MFFX-X3', name:'MyFundedFX Spot #3', shortName:'MFFX X3', accountId:'MFFX$5kX3-STP_PFF', platform:'MyFundedFX', type:'prop-eval', market:'spot', marketLabel:'Spot FX', status:'completed', startDate:'2024-09-29', endDate:'2024-10-31', size:5000, costOfFund:32.30, fxRate:1671.67, pnl:-365.19, performance:-0.073038, trades:0, instruments:['GBPUSD','EURUSD','NAS100'], currency:'USD', notes:'33-day account.' },
  { id:'MFFX-X4', name:'MyFundedFX Spot #4', shortName:'MFFX X4', accountId:'MFFX$5kX4-STP_PFF', platform:'MyFundedFX', type:'prop-eval', market:'spot', marketLabel:'Spot FX', status:'completed', startDate:'2024-11-13', endDate:'2025-01-08', size:5000, costOfFund:31.92, fxRate:1700, pnl:-284.46, performance:-0.056892, trades:0, instruments:['GBPUSD','EURUSD','USDJPY'], currency:'USD', notes:'57-day account.' },
  { id:'MFFU-X1', name:'MyFundedFutures #1', shortName:'MFFU X1', accountId:'MFFU$50kX1-FTP_PFF', platform:'MyFundedFutures', type:'prop-eval', market:'futures', marketLabel:'US Futures', status:'completed', startDate:'2024-04-10', endDate:'2024-04-12', size:50000, costOfFund:165, fxRate:1250, pnl:-1882, performance:-0.03764, trades:30, instruments:['NQM4','MNQM4'], currency:'USD', notes:'3-day account. Nasdaq futures. Breached daily loss limit.' },
  { id:'MFFU-X2', name:'MyFundedFutures #2', shortName:'MFFU X2', accountId:'MFFU$50kX2-FTP_PFF', platform:'MyFundedFutures', type:'prop-eval', market:'futures', marketLabel:'US Futures', status:'completed', startDate:'2024-06-03', endDate:'2024-06-07', size:50000, costOfFund:132, fxRate:1500, pnl:-1343.77, performance:-0.0268754, trades:174, instruments:['NQM4','MNQM4'], currency:'USD', notes:'5-day account. 174 trades. Nasdaq futures.' },
  { id:'MFFU-X3', name:'MyFundedFutures #3', shortName:'MFFU X3', accountId:'MFFU$50kX3-FTP_PFF', platform:'MyFundedFutures', type:'prop-eval', market:'futures', marketLabel:'US Futures', status:'completed', startDate:'2024-06-12', endDate:'2024-06-14', size:50000, costOfFund:132, fxRate:1500, pnl:-1700.75, performance:-0.034015, trades:111, instruments:['NQM4','MNQM4'], currency:'USD', notes:'3-day account. Nasdaq futures.' },
  { id:'MFFU-X4', name:'MyFundedFutures #4', shortName:'MFFU X4', accountId:'MFFU$50kX4-FTP_PFF', platform:'MyFundedFutures', type:'prop-eval', market:'futures', marketLabel:'US Futures', status:'completed', startDate:'2024-07-08', endDate:'2024-09-06', size:50000, costOfFund:229.50, fxRate:1600, pnl:-4175, performance:-0.0835, trades:584, instruments:['YMU4','MYMU4','MYM'], currency:'USD', notes:'584 trades across 3 sub-phases. Dow Jones futures (YM/MYM).' },
  { id:'MFFU-X5', name:'MyFundedFutures #5', shortName:'MFFU X5', accountId:'MFFU$50kX5-FTP_PFF', platform:'MyFundedFutures', type:'prop-eval', market:'futures', marketLabel:'US Futures', status:'completed', startDate:'2024-09-11', endDate:'2024-09-27', size:50000, costOfFund:76, fxRate:1671.67, pnl:-386.50, performance:-0.00773, trades:191, instruments:['MYMU4','YMU4'], currency:'USD', notes:'17-day account. Best futures performance at −0.77%.' },
  { id:'ALPARI-2020', name:'Alpari Personal Account', shortName:'Alpari 2020', accountId:'80045237', platform:'Alpari', type:'personal', market:'spot', marketLabel:'Spot FX', status:'completed', startDate:'2020-03-11', endDate:'2020-06-01', size:294.71, costOfFund:294.71, fxRate:135.07, pnl:-208.90, performance:-0.7088, trades:0, instruments:['GBPUSD','EURUSD','USDJPY'], currency:'USD', notes:'First ever live account. 83 trading days.' },
  { id:'ALPARI-2023', name:'Alpari Personal Account II', shortName:'Alpari 2023', accountId:'80045237→101015760', platform:'Alpari', type:'personal', market:'spot', marketLabel:'Spot FX + CFDs', status:'completed', startDate:'2023-09-11', endDate:'2023-11-15', size:427.26, costOfFund:427.26, fxRate:981.75, pnl:-325.16, performance:-0.7610, trades:22, instruments:['spx500_m','Crude','GBPUSD','USDJPY','XAUUSD'], currency:'USD', notes:'Mixed funding: personal + loan. Account migrated mid-run.' }
];

/* ────────────────────────────────────────────
   HOLDINGS + PERFORMANCE DATA
──────────────────────────────────────────── */
const KHOOD_HOLDINGS = [
  { ticker:'AMZN', name:'Amazon',             exchange:'NASDAQ', price:222.09, openPrice:236.07, qty:1.05903,  change:-0.0592 },
  { ticker:'SNAP', name:'Snapchat',            exchange:'NYSE',   price:11.12,  openPrice:10.83,  qty:23.087,   change: 0.0268 },
  { ticker:'TGT',  name:'Target',              exchange:'NYSE',   price:95.38,  openPrice:134.57, qty:3.71544,  change:-0.2912 },
  { ticker:'NBIS', name:'Nebius Group',         exchange:'NASDAQ', price:45.96,  openPrice:42.56,  qty:5.874239, change: 0.0799 },
  { ticker:'AAPL', name:'Apple',               exchange:'NASDAQ', price:245.90, openPrice:244.06, qty:0.51217,  change: 0.0075 },
  { ticker:'RIVN', name:'Rivian',              exchange:'NASDAQ', price:14.14,  openPrice:14.02,  qty:8.91761,  change: 0.0086 },
  { ticker:'ALGS', name:'Aligos Therapeutics', exchange:'NASDAQ', price:13.54,  openPrice:22.47,  qty:5.56331,  change:-0.3974 },
  { ticker:'COIN', name:'Coinbase',            exchange:'NASDAQ', price:306.32, openPrice:266.40, qty:0.46921,  change: 0.1498 },
  { ticker:'JD',   name:'JD.com',              exchange:'NASDAQ', price:31.16,  openPrice:43.16,  qty:1.1585,   change:-0.2780 },
];
const NGX_HOLDINGS = [
  { ticker:'ACCESSCORP', name:'Access Holdings',       price:19.50, openPrice:17.20, qty:292,  changeP: 0.1337 },
  { ticker:'MANSARD',    name:'AXA Mansard Insurance', price:9.25,  openPrice:9.35,  qty:1000, changeP:-0.0107 },
  { ticker:'BUAFOODS',   name:'BUA Foods',             price:374,   openPrice:342,   qty:15,   changeP: 0.0936 },
  { ticker:'CHAMS',      name:'Chams Plc',             price:2.10,  openPrice:1.55,  qty:3250, changeP: 0.3548 },
  { ticker:'FIDELITYBK', name:'Fidelity Bank',         price:10.15, openPrice:9.60,  qty:527,  changeP: 0.0573 },
  { ticker:'GEREGU',     name:'Geregu Power',          price:1141.5,openPrice:900,   qty:6,    changeP: 0.2683 },
];
const KHOOD_PERF = [
  {date:'2025-02-05',val:-0.0021},{date:'2025-02-07',val:-0.0172},{date:'2025-02-10',val:-0.0181},
  {date:'2025-02-11',val:-0.0104},{date:'2025-02-12',val:-0.0362},{date:'2025-02-13',val:-0.0215},
  {date:'2025-02-14',val:-0.0055},{date:'2025-02-18',val: 0.0016},{date:'2025-02-19',val: 0.0062},
  {date:'2025-02-20',val: 0.0041},{date:'2025-02-21',val:-0.0088},{date:'2025-02-24',val: 0.0110},
  {date:'2025-02-25',val: 0.0095},{date:'2025-02-26',val: 0.0073},{date:'2025-03-03',val:-0.0150},
  {date:'2025-03-05',val:-0.0210},{date:'2025-03-10',val: 0.0180},{date:'2025-03-15',val: 0.0220},
  {date:'2025-03-20',val:-0.0090},{date:'2025-03-25',val: 0.0310},
];
const NGX_PERF = [
  {date:'2025-02-27',val:-0.00912},{date:'2025-02-28',val:-0.00299},{date:'2025-03-03',val:-0.00753},
  {date:'2025-03-04',val:-0.02476},{date:'2025-03-05',val:-0.03531},{date:'2025-03-06',val:-0.02542},
  {date:'2025-03-10',val:-0.02796},{date:'2025-03-15',val:-0.01200},{date:'2025-03-20',val: 0.00500},
  {date:'2025-03-25',val: 0.01800},{date:'2025-04-01',val: 0.02200},{date:'2025-04-10',val: 0.01500},
];
const MONTHLY_PNL = [
  {month:'Mar 2020',pnl:-80.20},{month:'Apr 2020',pnl:-62.30},{month:'May 2020',pnl:-66.40},
  {month:'Sep 2023',pnl:-120.00},{month:'Oct 2023',pnl:-140.00},{month:'Nov 2023',pnl:-65.16},
  {month:'Feb 2024',pnl:-629.00},{month:'Mar 2024',pnl:-40.00},{month:'Apr 2024',pnl:-1951.00},
  {month:'May 2024',pnl:-40.78},{month:'Jun 2024',pnl:-3044.52},{month:'Jul 2024',pnl:-2400.00},
  {month:'Aug 2024',pnl:-845.00},{month:'Sep 2024',pnl:-1025.40},{month:'Oct 2024',pnl:-365.19},
  {month:'Nov 2024',pnl:-120.00},{month:'Dec 2024',pnl:-90.00},{month:'Jan 2025',pnl:-74.46},
];
const MARKET_PNL = [
  {name:'US Futures', pnl:-9488.02, color:'#6366f1'},
  {name:'Spot FX',    pnl:-1278.64, color:'#40B5AD'},
  {name:'Personal FX',pnl:-534.06,  color:'#7c3aed'},
];

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
  btn.addEventListener('click',()=>mob.classList.toggle('open'));
  document.querySelectorAll('.nav-mobile-link').forEach(l=>l.addEventListener('click',()=>mob.classList.remove('open')));
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
  new Chart(c.getContext('2d'),{type:'doughnut',data:{labels:data.map(d=>d.label),datasets:[{data:data.map(d=>d.value),backgroundColor:data.map(d=>d.color),borderWidth:3,borderColor:'#fff',hoverOffset:6}]},options:{cutout:'72%',...CD,plugins:{legend:{display:false},tooltip:{enabled:true,...TIP,callbacks:{label:ctx=>` ${ctx.label}: ${fv(ctx.raw)}`}}}}});
  const l=document.getElementById(lId);if(!l)return;
  data.forEach(d=>{l.innerHTML+=`<div class="legend-item"><span class="legend-dot" style="background:${d.color}"></span><span>${d.label}</span><span class="legend-val">${fv(d.value)}</span></div>`;});
}
function buildPnlBar() {
  const c=document.getElementById('pnlBar');if(!c)return;
  const cl=ACCOUNTS.filter(a=>a.pnl!=null);
  new Chart(c.getContext('2d'),{type:'bar',data:{labels:cl.map(a=>a.shortName),datasets:[{data:cl.map(a=>a.pnl),backgroundColor:cl.map(a=>a.pnl>=0?'rgba(22,163,74,0.8)':'rgba(220,38,38,0.8)'),borderRadius:4,borderSkipped:false}]},options:{responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` P&L: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10},maxRotation:40}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>'$'+(v/1000).toFixed(1)+'k'}}}}});
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
    const sB=acc.status==='active'?`<span class="badge badge--active">● Active</span>`:`<span class="badge badge--completed">✓ Ended</span>`;
    const tB=acc.type==='prop-eval'?`<span class="badge badge--eval">Prop Eval</span>`:acc.type==='fund'?`<span class="badge badge--fund">Fund</span>`:`<span class="badge badge--personal">Personal</span>`;
    const mB=`<span class="badge badge--${acc.market}">${acc.marketLabel}</span>`;
    const sV=acc.currency==='NGN'?`<span class="account-card-stat-val neutral">NGN</span>`:`<span class="account-card-stat-val neutral">${fmt(acc.size)}</span>`;
    const pV=acc.pnl!=null?`<span class="account-card-stat-val ${acc.pnl>=0?'positive':'negative'}">${fmtFull(acc.pnl)}</span>`:`<span class="account-card-stat-val neutral">Active</span>`;
    const rV=acc.performance!=null?`<span class="account-card-stat-val ${acc.performance>=0?'positive':'negative'}">${fmtPct(acc.performance)}</span>`:`<span class="account-card-stat-val neutral">—</span>`;
    const tV=acc.trades>0?`<span class="account-card-stat-val">${acc.trades.toLocaleString()}</span>`:`<span class="account-card-stat-val neutral">—</span>`;
    return `<div class="account-card" data-status="${acc.status}" data-type="${acc.type}" onclick="openDrawer('${acc.id}')">
      <div class="account-card-top"><div class="account-card-badges">${sB}${tB}${mB}</div><span class="account-card-platform">${acc.platform}</span></div>
      <div class="account-card-name">${acc.accountId}</div>
      <div class="account-card-title">${acc.name}</div>
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
  new Chart(canvas.getContext('2d'),{type:'line',data:{labels,datasets:[{data:values,borderColor:lc,borderWidth:2.5,pointRadius:4,pointBackgroundColor:lc,pointBorderColor:'#fff',pointBorderWidth:2,tension:0.3,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,90);g.addColorStop(0,lc+'33');g.addColorStop(1,lc+'00');return g;}}]},options:{responsive:true,animation:{duration:800},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` Cumulative: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10,family:'JetBrains Mono'}}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10,family:'JetBrains Mono'},callback:v=>'$'+v}}}}});
}

/* ────────────────────────────────────────────
   PNL CALENDARS
──────────────────────────────────────────── */
let calTooltip=null;

function initCalendars() {
  calTooltip=document.createElement('div');
  calTooltip.className='cal-tooltip';
  document.body.appendChild(calTooltip);
  document.querySelectorAll('.cal-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.cal-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderCalendars(btn.dataset.account);
    });
  });
  renderCalendars('FDNT-6KX1');
}

function renderCalendars(accId) {
  const container=document.getElementById('calContainer');if(!container)return;
  const trades=TRADE_DATA[accId];
  if(!trades){container.innerHTML='<p style="color:var(--text-3);text-align:center;padding:40px">No trade data loaded for this account yet.</p>';return;}
  // Build daily map: date → {pnl, trades[]}
  const dm={};
  trades.forEach(t=>{
    if(!dm[t.closeDate])dm[t.closeDate]={pnl:0,trades:[]};
    dm[t.closeDate].pnl=parseFloat((dm[t.closeDate].pnl+t.netPnl).toFixed(2));
    dm[t.closeDate].trades.push(t);
  });
  // Get unique months
  const months=[...new Set(Object.keys(dm).map(d=>d.slice(0,7)))].sort();
  container.innerHTML='';
  months.forEach(ym=>container.appendChild(buildMonthCalendar(ym,dm)));
}

function buildMonthCalendar(ym,dm) {
  const [year,mon]=ym.split('-').map(Number);
  const monthName=new Date(year,mon-1,1).toLocaleDateString('en-GB',{month:'long',year:'numeric'});
  let monthTotal=0,tradingDays=0,winDays=0;
  Object.entries(dm).forEach(([d,v])=>{if(d.startsWith(ym)){monthTotal=parseFloat((monthTotal+v.pnl).toFixed(2));tradingDays++;if(v.pnl>0)winDays++;}});
  const tc=monthTotal>=0?'pos':'neg';
  const ts=(monthTotal>=0?'+':'')+fmtFull(monthTotal);

  const allTrades=Object.entries(dm).filter(([d])=>d.startsWith(ym)).flatMap(([,v])=>v.trades);
  const mStats=tradeStats(allTrades);
  const maxPnl=Math.max(...Object.entries(dm).filter(([d])=>d.startsWith(ym)).map(([,v])=>Math.abs(v.pnl)),1);

  const block=document.createElement('div');
  block.className='cal-month-block';
  block.innerHTML=`
    <div class="cal-month-title">${monthName}<span class="cal-month-total ${tc}">${ts}</span></div>
    <div class="cal-grid-wrap">
      <div class="cal-dow-row">
        <div class="cal-dow">Mon</div><div class="cal-dow">Tue</div><div class="cal-dow">Wed</div>
        <div class="cal-dow">Thu</div><div class="cal-dow">Fri</div>
        <div class="cal-dow">Sat</div><div class="cal-dow">Sun</div>
      </div>
      <div class="cal-weeks" id="wk_${ym}"></div>
    </div>
    <div class="cal-summary">
      <div class="cal-summary-item"><div class="cal-summary-label">Net P&L</div><div class="cal-summary-val ${tc}">${ts}</div></div>
      <div class="cal-summary-item"><div class="cal-summary-label">Trading Days</div><div class="cal-summary-val">${tradingDays}</div></div>
      <div class="cal-summary-item"><div class="cal-summary-label">Win Days</div><div class="cal-summary-val pos">${winDays} / ${tradingDays}</div></div>
      <div class="cal-summary-item"><div class="cal-summary-label">Trades</div><div class="cal-summary-val">${allTrades.length}</div></div>
      ${mStats?`<div class="cal-summary-item"><div class="cal-summary-label">Win Rate</div><div class="cal-summary-val ${mStats.winRate>=0.5?'pos':'neg'}">${(mStats.winRate*100).toFixed(0)}%</div></div>`:''}
    </div>`;

  const weeksEl=block.querySelector(`#wk_${ym}`);
  // startDow Mon=0
  let startDow=new Date(year,mon-1,1).getDay();
  startDow=startDow===0?6:startDow-1;
  const daysInMonth=new Date(year,mon,0).getDate();
  const numWeeks=Math.ceil((startDow+daysInMonth)/7);

  for(let w=0;w<numWeeks;w++){
    const weekEl=document.createElement('div');
    weekEl.className='cal-week';
    for(let d=0;d<7;d++){
      const idx=w*7+d, dayNum=idx-startDow+1;
      const dayEl=document.createElement('div');
      if(dayNum<1||dayNum>daysInMonth){
        dayEl.className='cal-day cal-day--empty';
      } else {
        const dateStr=`${ym}-${String(dayNum).padStart(2,'0')}`;
        const isWknd=d>=5;
        const dayData=dm[dateStr];
        if(dayData){
          const cls=dayData.pnl>=0?'cal-day--profit':'cal-day--loss';
          dayEl.className=`cal-day ${cls}`;
          const barPct=Math.min(100,(Math.abs(dayData.pnl)/maxPnl)*100);
          const barC=dayData.pnl>=0?'var(--green)':'var(--red)';
          const pStr=(dayData.pnl>=0?'+':'')+fmtFull(dayData.pnl);
          const cnt=dayData.trades.length;
          dayEl.innerHTML=`<div class="cal-day-num">${dayNum}</div><div class="cal-day-pnl">${pStr}</div><div class="cal-day-trades">${cnt} trade${cnt!==1?'s':''}</div><div class="cal-day-bar" style="background:${barC};opacity:0.45;width:${barPct}%"></div>`;
          dayEl.addEventListener('mouseenter',e=>showTip(e,dateStr,dayData));
          dayEl.addEventListener('mousemove',e=>moveTip(e));
          dayEl.addEventListener('mouseleave',hideTip);
        } else {
          dayEl.className=`cal-day${isWknd?' cal-day--weekend':''}`;
          dayEl.innerHTML=`<div class="cal-day-num">${dayNum}</div>`;
        }
      }
      weekEl.appendChild(dayEl);
    }
    weeksEl.appendChild(weekEl);
  }
  return block;
}

function showTip(e,dateStr,dayData) {
  if(!calTooltip)return;
  const df=new Date(dateStr+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'});
  const pc=dayData.pnl>=0?'pos':'neg';
  const ps=(dayData.pnl>=0?'+':'')+fmtFull(dayData.pnl);
  const rows=dayData.trades.map(t=>{
    const tc=t.netPnl>=0?'pos':'neg';
    const ts=(t.netPnl>=0?'+':'')+fmtFull(t.netPnl);
    return `<div class="cal-tooltip-trade"><span class="cal-tooltip-instr">${t.instrument}</span><span class="cal-tooltip-dir">${t.direction==='Long'?'▲':'▼'} ${t.lots}L</span><span class="cal-tooltip-pnl ${tc}">${ts}</span></div>`;
  }).join('');
  calTooltip.innerHTML=`<div class="cal-tooltip-date">${df}</div><div class="cal-tooltip-total ${pc}">${ps}</div>${rows}`;
  calTooltip.classList.add('visible');
  moveTip(e);
}
function moveTip(e) {
  if(!calTooltip)return;
  const vw=window.innerWidth,vh=window.innerHeight,w=calTooltip.offsetWidth||280,h=calTooltip.offsetHeight||200;
  let x=e.clientX+16,y=e.clientY-16;
  if(x+w>vw-16)x=e.clientX-w-16;
  if(y+h>vh-16)y=vh-h-16;
  if(y<8)y=8;
  calTooltip.style.left=x+'px';
  calTooltip.style.top=y+'px';
}
function hideTip(){if(calTooltip)calTooltip.classList.remove('visible');}

/* ────────────────────────────────────────────
   TRADING TABLE
──────────────────────────────────────────── */
function buildTradingTable() {
  const rows=document.getElementById('tradingAccountsRows');if(!rows)return;
  const list=ACCOUNTS.filter(a=>a.type==='prop-eval'||a.type==='personal');
  rows.innerHTML=list.map(acc=>{
    const days=daysBetween(acc.startDate,acc.endDate);
    const sc=acc.status==='active'?'active':acc.pnl<0?'lost':'completed';
    const sl=acc.status==='active'?'● Active':acc.pnl<0?'× Lost':'✓ Done';
    const pc=acc.pnl==null?'':(acc.pnl>=0?'pos':'neg');
    return `<div class="tat-row" onclick="openDrawer('${acc.id}')" style="cursor:pointer">
      <div><span class="tat-account-name">${acc.name}</span><span class="tat-account-id">${acc.accountId}</span></div>
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
  const nc=document.getElementById('ngxHoldings');if(nc)nc.textContent=NGX_HOLDINGS.length+' positions';
  const kl=document.getElementById('khoodHoldingsList');
  if(kl)kl.innerHTML=KHOOD_HOLDINGS.slice(0,6).map(h=>`<div class="holding-row"><span class="holding-ticker">${h.ticker}</span><span class="holding-name">${h.name}</span><span class="holding-change ${h.change>=0?'pos':'neg'}">${(h.change>=0?'+':'')+(h.change*100).toFixed(1)}%</span></div>`).join('');
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
  new Chart(c.getContext('2d'),{type:'line',data:{labels,datasets:[{data:values,borderColor:lc,borderWidth:2,pointRadius:0,pointHoverRadius:4,tension:0.4,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,100);g.addColorStop(0,lc+'22');g.addColorStop(1,lc+'00');return g;}}]},options:{responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` Cumulative: ${ctx.raw}%`}}},scales:{x:{display:false},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>v+'%'}}}}});
}

/* ────────────────────────────────────────────
   PERFORMANCE
──────────────────────────────────────────── */
function buildPerformance() {
  const mp=document.getElementById('monthlyPnlChart');
  if(mp)new Chart(mp.getContext('2d'),{type:'bar',data:{labels:MONTHLY_PNL.map(m=>m.month),datasets:[{data:MONTHLY_PNL.map(m=>m.pnl),backgroundColor:MONTHLY_PNL.map(m=>m.pnl>=0?'rgba(22,163,74,0.75)':'rgba(220,38,38,0.75)'),borderRadius:4,borderSkipped:false}]},options:{responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` P&L: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10},maxRotation:45}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>'$'+v}}}}});

  const fees=ACCOUNTS.filter(a=>a.costOfFund&&a.type!=='personal'&&a.type!=='fund').reduce((s,a)=>s+a.costOfFund,0);
  const cc=document.getElementById('costChart');
  const costData=[{label:'Eval Fees',value:fees,color:'#dc2626'},{label:'Commission',value:320,color:'#d97706'},{label:'Swap/Overnight',value:58,color:'#6366f1'}];
  if(cc)new Chart(cc.getContext('2d'),{type:'doughnut',data:{labels:costData.map(d=>d.label),datasets:[{data:costData.map(d=>d.value),backgroundColor:costData.map(d=>d.color),borderWidth:3,borderColor:'#fff',hoverOffset:5}]},options:{cutout:'68%',...CD,plugins:{legend:{display:false},tooltip:{enabled:true,...TIP,callbacks:{label:ctx=>` ${ctx.label}: ${fmtFull(ctx.raw)}`}}}}});
  const bd=document.getElementById('costBreakdown');
  if(bd)bd.innerHTML=costData.map(d=>`<div class="cost-row"><span class="cost-dot" style="background:${d.color}"></span><span class="cost-name">${d.label}</span><span class="cost-val">${fmtFull(d.value)}</span></div>`).join('');

  const ml=document.getElementById('marketPerfList');
  if(ml){const mx=Math.max(...MARKET_PNL.map(m=>Math.abs(m.pnl)));ml.innerHTML=MARKET_PNL.map(m=>`<div class="market-perf-row"><div class="market-perf-top"><span class="market-perf-name">${m.name}</span><span class="market-perf-val ${m.pnl>=0?'pos':'neg'}">${fmtFull(m.pnl)}</span></div><div class="market-perf-bar-wrap"><div class="market-perf-bar" style="width:${(Math.abs(m.pnl)/mx)*100}%;background:${m.pnl>=0?'#16a34a':'#dc2626'}"></div></div></div>`).join('');}

  const dc=document.getElementById('durationChart');
  const da=ACCOUNTS.filter(a=>a.endDate).slice(0,11);
  if(dc)new Chart(dc.getContext('2d'),{type:'bar',data:{labels:da.map(a=>a.shortName),datasets:[{data:da.map(a=>daysBetween(a.startDate,a.endDate)),backgroundColor:da.map(a=>a.market==='futures'?'#6366f188':'#40B5AD88'),borderRadius:4,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,animation:{duration:900},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` ${ctx.raw} days`}}},scales:{x:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>v+'d'}},y:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10}}}}}});
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
  document.getElementById('drawerSubtitle').textContent=`${acc.accountId} · ${acc.platform} · ${acc.marketLabel}`;

  let html=`
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
      new Chart(ec.getContext('2d'),{type:'line',data:{labels,datasets:[{data:values,borderColor:lc,borderWidth:2.5,pointRadius:4,pointBackgroundColor:lc,pointBorderColor:'#fff',pointBorderWidth:2,tension:0.3,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,110);g.addColorStop(0,lc+'33');g.addColorStop(1,lc+'00');return g;}}]},options:{responsive:true,animation:{duration:600},plugins:{legend:{display:false},tooltip:{...TIP,callbacks:{label:ctx=>` Cumulative: ${fmtFull(ctx.raw)}`}}},scales:{x:{grid:{display:false},ticks:{color:'#7a9896',font:{size:10}}},y:{grid:{color:'#eef5f4'},ticks:{color:'#7a9896',font:{size:10},callback:v=>'$'+v}}}}});
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
  initNav();
  initCountUp();
  buildHeroTimeline();
  buildOverviewCharts();
  buildAccountCards();
  initAccountFilters();
  buildLiveDashboards();
  initCalendars();
  buildTradingTable();
  buildFunds();
  buildPerformance();

  document.getElementById('drawerClose').addEventListener('click',closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click',closeDrawer);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer();});
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});
  });
  requestAnimationFrame(()=>initScrollReveal());
});
