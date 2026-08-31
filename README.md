<p align="center">
  <strong>iTechEys</strong> — A bilingual (Bangla + English) technology & programming blog platform with AI-assisted content drafting and a human editorial layer.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Django-REST-092E20?logo=django" alt="Django" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Redis-7-DC382D?logo=redis" alt="Redis" />
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss" alt="Tailwind" />
</p>

---

## Architecture

```
Visitors / Google Bot
        │ HTTPS
    ┌───▼───┐
    │ Nginx │  reverse proxy · TLS · gzip
    └─┬───┬─┘
      │   │
 ┌────▼┐ ┌▼──────────┐
 │Next │ │ Django+DRF │
 │(SSR)│ │ (Gunicorn) │
 └──┬──┘ └──┬──────┬──┘
    │       │      │
    └───────┘  ┌───▼──────┐
           ┌───┤PostgreSQL │
           │   └───────────┘
    ┌──────▼───┐  ┌──────────┐
    │  Redis   │◄─┤ Celery   │──► Claude API (AI drafting)
    └──────────┘  └──────────┘
```

95% of reader traffic is served from ISR-cached static pages and never touches Django or Postgres.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16 (App Router, SSR/ISR), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, shadcn/ui (base-nova), Lucide icons |
| **State** | Redux Toolkit, React Hook Form + Zod |
| **Backend** | Django REST Framework, Gunicorn |
| **Database** | PostgreSQL 16, Redis 7 (cache + Celery broker) |
| **Async** | Celery worker + beat (AI drafting, scheduled publishing) |
| **AI** | Anthropic Claude API with versioned prompts |
| **Infra** | Docker Compose, Nginx, Let's Encrypt TLS |

## Project Structure

```
itecheysbd/
├── frontend/                 # Next.js app
│   ├── app/                  # App Router pages
│   │   ├── page.tsx          # Homepage (hero, ticker, stories, etc.)
│   │   ├── blog/details/     # Blog post pages (ISR)
│   │   ├── layout.tsx        # Root layout (Hanken Grotesk + Newsreader fonts)
│   │   └── globals.css       # Tailwind config + custom animations
│   ├── components/
│   │   ├── home/             # HeroSection, LatestTicker, MostRead, Newsletter...
│   │   ├── blog/             # Blog-specific components
│   │   └── layout/           # Header, Footer
│   └── lib/
│       ├── utils.ts          # cn() helper
│       └── data/home-data.ts # Mock data (replaced by API calls later)
├── backend/                  # Django REST API (in progress)
└── Project plan and guideline.md
```

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** (or pnpm/yarn)
- **Docker** & **Docker Compose** (for full-stack setup)

### Frontend Only (Development)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the page hot-reloads on save.

### Full Stack (Docker)

```bash
cp .env.example .env          # fill in real values
docker compose build
docker compose up -d db redis
docker compose run --rm backend python manage.py migrate
docker compose run --rm backend python manage.py createsuperuser
docker compose up -d
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:8000/api |
| Django Admin (CMS) | http://localhost:8000/admin |

### Production

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

## AI Content Pipeline

Posts follow a strict status workflow enforced at the model level:

```
DRAFT → AI_GENERATED → IN_REVIEW → APPROVED → SCHEDULED → PUBLISHED
```

1. **Editor** picks a topic, keywords, and outline
2. **Celery worker** sends the request to Claude API asynchronously
3. AI draft is saved; editor reviews in Django Admin
4. Editor adds the human touch (local context, personal examples, fact-checking)
5. Celery beat publishes at the scheduled time → Next.js ISR revalidates the page

A post **cannot** reach `PUBLISHED` without passing through `IN_REVIEW` with an editor recorded.

## Key Features

- **Bilingual content** — Bangla and English articles with proper font support (Hanken Grotesk + Newsreader serif)
- **Auto-rotating hero carousel** with trending sidebar
- **Live ticker** with infinite CSS scroll animation
- **ISR rendering** — static-fast pages regenerated hourly; minimal server load
- **SEO-first** — server-rendered HTML, structured data, auto-generated sitemap
- **AI-assisted drafting** with human editorial oversight
- **Newsletter subscription** section
- **Responsive design** — mobile-first with fluid `clamp()` typography

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

## Environment Variables

Copy `.env.example` and fill in values:

| Variable | Description |
|---|---|
| `DJANGO_SECRET_KEY` | Django secret key |
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` | Database credentials |
| `REDIS_URL` | Redis connection string |
| `CELERY_BROKER_URL` | Celery broker (Redis) |
| `ANTHROPIC_API_KEY` | Claude API key for AI drafting |
| `NEXT_PUBLIC_API_URL` | Backend API URL (baked at build time) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

## Deployment

Designed for a single VPS (2 vCPU / 4 GB) running everything via Docker Compose behind Nginx with Let's Encrypt TLS. Recommended hosts: Contabo, Hetzner, DigitalOcean.

CI/CD: GitHub Actions → run tests → build images → SSH deploy → `docker compose pull && up -d`.

## License

Private — All rights reserved.