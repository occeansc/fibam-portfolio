# FIBAM Trading Portfolio

> *...purpose not money, is your real asset*

Personal trading portfolio website built as a static site on GitHub Pages.

## Structure

```
fibam-portfolio/
├── index.html          ← Main site (single page)
├── css/
│   └── style.css       ← Complete design system
├── js/
│   └── app.js          ← All data + rendering logic
└── README.md
```

## Updating Data

All account data lives at the top of `js/app.js` in the `ACCOUNTS` array.

**To update an active account:**
1. Open `js/app.js` on GitHub (click the file → pencil icon)
2. Find the account by `id` in the `ACCOUNTS` array
3. Update `pnl`, `performance`, `trades` fields
4. Commit directly to main

**To add a new account:**
1. Copy any existing account block in `ACCOUNTS`
2. Fill in all fields (set `status: 'active'` and `endDate: null` for new)
3. Commit — the site auto-updates

**To close an account:**
1. Change `status` from `'active'` to `'completed'`
2. Add `endDate: 'YYYY-MM-DD'`
3. Add final `pnl` and `performance` values

## Accounts

| ID | Platform | Market | Status |
|----|----------|--------|--------|
| FDNT$6KX1 | FundedNext | Spot FX | 🟢 Active |
| T5RS$5KX1 | The5ers | Spot FX | 🟢 Active |
| 1kHooD | Robinhood | US Stocks | 🟢 Active |
| FIBAM-NGX | NGX Exchange | Nigerian Stocks | 🟢 Active |
| MFFX X1–X4 | MyFundedFX | Spot FX | ✓ Ended |
| MFFU X1–X5 | MyFundedFutures | US Futures | ✓ Ended |
| Alpari 2020 | Alpari | Spot FX | ✓ Ended |
| Alpari 2023 | Alpari | Spot FX + CFDs | ✓ Ended |

## Tech

- Pure HTML + CSS + JavaScript — no build tools, no framework
- Chart.js 4.4.1 (CDN)
- Google Fonts: Cormorant Garamond + DM Sans + DM Mono
- Hosted on GitHub Pages
