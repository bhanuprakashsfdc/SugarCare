# SugarCare

> A free, open-source health app that helps you reduce blood sugar naturally using food tracking, meal planning, and habit coaching.

SugarCare is a static web app for people managing diabetes or pre-diabetes. It provides doctor-guided meal plans (South Indian focused), a glucose tracker with trend visualization, an Indian food database with glycemic index ratings, daily habit coaching with streaks, and an emergency protocol for critical sugar levels. No backend, no login — all data stays in your browser.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![License](https://img.shields.io/badge/license-MIT-green) ![Status](https://img.shields.io/badge/status-active-brightgreen)

---

## Features

- **Glucose Tracker** — Log fasting and post-meal readings, see 14-day trend charts
- **Health Score** — Dynamic score based on sugar levels and habit completion
- **7-Day Meal Plan** — Curated daily meals with focus themes (Stabilization, Lean Protein, High Fiber, Omega-3, Plant-Based)
- **Smart Food Swaps** — White rice to millet, sugar tea to green tea, maida to ragi
- **Indian Food Database** — 29+ foods with GI ratings, search, and filter by safe/moderate/avoid
- **Habit Coach** — 8 daily habits with toggle switches, streak counter, completion ring
- **Sugar Projection** — 30-day simulated improvement curve based on adherence
- **Emergency Mode** — Step-by-step protocol with call 108 integration when sugar exceeds 300 mg/dL
- **Offline Support** — PWA manifest for installable app experience
- **Zero Data Collection** — Everything stored in localStorage, no accounts, no tracking

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build    # static export to /out
```

The build output in `/out` can be deployed to any static host (Vercel, Netlify, GitHub Pages, S3).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with product overview and CTA |
| `/dashboard` | Glucose tracker, health score, trend charts, quick actions |
| `/weekly-plan` | 7-day horizontal meal planner with smart food swaps |
| `/food-guide` | Indian food database with GI ratings, search, categories, and swap suggestions |
| `/habits` | Daily habit checklist with streak counter and progress ring |
| `/emergency` | Emergency protocol for sugar > 300 mg/dL with direct call button |

## Tech Stack

- **Next.js 14** — App Router, static export, server components
- **Tailwind CSS** — Custom design tokens, "Digital Sanctuary" color palette
- **Recharts** — Glucose trend visualization
- **localStorage** — All data persists on device, no backend required
- **PWA** — Installable on mobile via manifest.json

## Project Structure

```
src/
├── app/
│   ├── layout.js            # Root layout, Google Fonts, metadata, viewport
│   ├── page.js              # Landing page
│   ├── globals.css           # Design system, animations, custom CSS
│   ├── robots.js            # SEO robots.txt generation
│   ├── sitemap.js           # SEO sitemap.xml generation
│   ├── dashboard/page.js     # Sugar tracker + charts + quick actions
│   ├── weekly-plan/page.js   # 7-day meal planner
│   ├── food-guide/page.js    # Food database + smart swaps
│   ├── habits/page.js        # Habit checklist + streaks
│   └── emergency/page.js     # Emergency protocol
├── components/
│   ├── Navbar.js             # Desktop sticky navigation
│   ├── BottomNav.js          # Mobile bottom tab bar
│   ├── Footer.js             # Medical disclaimer footer
│   ├── AlertBanner.js        # High/critical sugar warning banner
│   ├── SugarInputForm.js     # Log glucose reading form
│   ├── HealthScoreCard.js    # Score ring, streak, current level
│   ├── GlucoseChart.js       # SVG sparkline with trend visualization
│   └── EmergencyModal.js     # Critical level overlay modal
├── context/
│   └── SugarContext.js       # Global state + localStorage persistence
├── data/
│   └── mockData.js           # Indian foods, weekly plans, habits, nudges
├── lib/
│   └── utils.js              # cn() utility (clsx + tailwind-merge)
└── utils/
    └── helpers.js            # Sugar status, simulation, health score
```

## Agent Skills

This project uses [skills.sh](https://skills.sh/) for AI-assisted development:

- `frontend-design` — UI/UX design system and creative direction
- `next-best-practices` — Next.js RSC patterns, font/image optimization, metadata
- `tailwind-design-system` — CSS-first design tokens, CVA component patterns
- `webapp-testing` — Playwright test automation scripts
- `seo-audit` — SEO metadata, structured data, sitemap generation

## Color System

The "Digital Sanctuary" palette uses Material Design 3 tokens:

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#006e2f` | Main green, buttons, links |
| `primary-container` | `#22c55e` | Accent green, progress rings |
| `secondary` | `#006a61` | Teal accents |
| `tertiary` | `#9e4036` | Warning, error states |
| `surface` | `#f7f9fb` | Page background |
| `on-surface` | `#191c1e` | Primary text |

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## Medical Disclaimer

This app is for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider before making changes to your diet, exercise, or medication.

## License

MIT
