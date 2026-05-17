# Aditya Ajay Deshpande — Portfolio

Personal portfolio site built with Next.js, Three.js, and Framer Motion.

**Live:** [adityadeshpande.dev](https://adityadeshpande.dev)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| 3D Background | React Three Fiber + Three.js |
| Theme | next-themes (dark/light) |
| Forms | React Hook Form + Zod + Formspree |
| Icons | Lucide React + React Icons |
| Fonts | Geist Sans/Mono + Space Grotesk |

## Sections

- **Hero** — Typewriter titles, profile photo, live LeetCode counter, resume viewer modal
- **About** — Background and education
- **Experience** — Timeline of roles
- **Projects** — Cards with detail modals using `longDescription`
- **Skills** — Icon grid + live LeetCode stats (solved breakdown)
- **Contact** — Contact form (Formspree), social links, copy-email button

## Project Structure

```
├── app/
│   ├── layout.tsx        # Root layout, fonts, ThemeProvider
│   ├── page.tsx          # Page composition
│   └── globals.css       # CSS custom properties (dark/light palette)
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, About, Experience, Projects, Skills, Contact
│   ├── three/            # R3F 3D background (HeroBackground, NeuralNetwork)
│   └── ui/               # LeetCodeStats
├── lib/
│   ├── data.ts           # All content — EXPERIENCE, PROJECTS, SKILLS, EDUCATION, SOCIALS
│   └── cn.ts             # classname utility
└── public/
    ├── resume.pdf
    └── profile-picture.png
```

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

> `--legacy-peer-deps` is required due to a peer dependency conflict between React Three Fiber v8 and React 19.

## Build & Export

```bash
npm run build
```

Outputs a fully static site to `/out` (configured via `output: "export"` in `next.config.ts`).

## Updating Content

All copy lives in **`lib/data.ts`** — edit `EXPERIENCE`, `PROJECTS`, `SKILLS`, `EDUCATION`, and `SOCIALS` there. No component changes needed for content updates.

## Notes

- `components/three/NeuralNetwork.tsx` uses `// @ts-nocheck` due to R3F v8 JSX type incompatibility with React 19
- LeetCode stats are fetched live from the [alfa-leetcode-api](https://github.com/alfaarghya/alfa-leetcode-api) public API
- Contact form submissions go through [Formspree](https://formspree.io)
