# iTechEys — Frontend

Next.js 16 App Router frontend for the iTechEys blog platform. Bilingual (Bangla + English) with SSR/ISR rendering, fluid typography, and a modern editorial design.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript 5)
- **Tailwind CSS 4** + **shadcn/ui** (base-nova style)
- **Redux Toolkit** for state management
- **React Hook Form** + **Zod** for form validation
- **Lucide** icons
- **Axios** for API calls

## Structure

```
app/
├── page.tsx              # Homepage (assembles all sections)
├── layout.tsx            # Root layout (fonts, header, footer)
├── blog/details/[slug]/  # Blog post pages
├── globals.css           # Tailwind + custom animations
├── error.tsx / loading.tsx / not-found.tsx
components/
├── home/                 # HeroSection, LatestTicker, LatestStories,
│                         # EditorsPicks, MostRead, Newsletter, Recommended
├── blog/                 # Blog-specific components
├── layout/               # Header, Footer
lib/
├── utils.ts              # cn() merge helper
├── data/home-data.ts     # Mock data (replaced by API later)
```

## Fonts

- **Hanken Grotesk** — primary sans-serif (`--font-sans`)
- **Newsreader** — serif for headlines (`--font-newsreader`)
- **Geist Mono** — monospace (`--font-geist-mono`)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Pages hot-reload on save.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Production Build (Docker)

Uses multi-stage Dockerfile with Next.js `standalone` output:

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=https://yourdomain.com/api -t itecheysbd-frontend .
docker run -p 3000:3000 itecheysbd-frontend
```

> `NEXT_PUBLIC_*` variables are baked in at **build time**. Rebuild per environment if URLs differ.
