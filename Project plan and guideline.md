# iTechEys — Full Architecture & Business logic

**Stack:** <br>
**Front-End:** Next.js (latest) + TypeScript<br>
        TailwindCSS, shadcn, react hooks form, zod


BackEnd: Django REST API backend · PostgreSQL · Redis · Docker
**Model:** AI-drafted content with a human editorial layer

---

## 1. Architecture at a glance

```
                         ┌──────────────────────────┐
                         │        Visitors           │
                         │   (readers, Google bot)   │
                         └────────────┬──────────────┘
                                      │  HTTPS
                              ┌───────▼────────┐
                              │     Nginx      │  reverse proxy + TLS
                              │  (or Traefik)  │  gzip, caching headers
                              └───┬────────┬───┘
                    /_next, /*    │        │  /api/*
                          ┌───────▼──┐  ┌──▼─────────────┐
                          │ Next.js  │  │  Django + DRF   │
                          │ (SSR/ISR)│  │  (Gunicorn)     │
                          └────┬─────┘  └──┬──────────┬───┘
                               │           │          │
                          fetch API        │          │
                               └───────────┘          │
                                           ┌───────────▼──────────┐
                              ┌────────────┤     PostgreSQL       │
                              │            └──────────────────────┘
                    ┌─────────▼────────┐   ┌──────────────────────┐
                    │      Redis       │◄──┤   Celery worker      │  AI drafting,
                    │  cache + broker  │   │   + Celery beat      │  emails, scheduled
                    └──────────────────┘   └──────────┬───────────┘  publishing
                                                       │
                                            ┌──────────▼───────────┐
                                            │   Anthropic API      │  Claude drafts posts
                                            │   (Claude)           │
                                            └──────────────────────┘
```

### Why this stack (the honest reasoning)
<!-- 
| Choice | Reason | The tradeoff you accept |
|---|---|---|
| Next.js App Router | SSR + ISR + built-in image optimization = strong Core Web Vitals, which directly affects ad revenue and Google ranking | More complex than a plain SPA; caching model takes a week to internalize |
| Django REST Framework | You already know Django; batteries-included admin is a free CMS for your editors | Heavier than FastAPI; you won't need most of it, and that's fine |
| PostgreSQL | Full-text search, JSON fields, rock solid for 5+ years | None worth mentioning for this scale |
| Redis | Page/API caching + Celery broker in one | One more service to run |
| Celery | AI drafting and scheduled publishing must be async — you can't block a web request on a 30-second LLM call | Adds worker + beat containers | -->

---

## 2. File structure

```
blog-platform/
├── frontend/            # Next.js app
├── backend/             # Django API
├── nginx/               # reverse proxy config
├── docker-compose.yml           # base (dev)
├── docker-compose.prod.yml      # production overrides
├── .env.example
├── .env                 # never committed
├── Makefile             # shortcut commands
└── README.md
```

---

## 3. Docker setup

Docker is what lets "it works on my machine" become "it works on the server." Every service below runs in its own container; `docker-compose` wires them together.

### 3.1 Backend Dockerfile — `backend/Dockerfile`

Multi-stage so the final image doesn't carry build tools.

```dockerfile
# backend/Dockerfile
FROM python:3.12-slim AS base
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# System deps (psycopg needs these)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Non-root user (security)
RUN useradd -m appuser && chown -R appuser /app
USER appuser

EXPOSE 8000

# Gunicorn for production; runserver only in dev via compose override
CMD ["gunicorn", "config.wsgi:application", \
     "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "60"]
```

### 3.2 Frontend Dockerfile — `frontend/Dockerfile`

Uses Next.js `standalone` output, which produces a tiny self-contained server. **Set `output: 'standalone'` in `next.config.ts`.**

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build-time public vars must be present at BUILD time, not runtime.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 nodejs && adduser -u 1001 -G nodejs -S nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

> **The one Docker gotcha that will bite you** (you've hit this before): `NEXT_PUBLIC_*` variables are baked in at **build time**, not read at runtime. If your API URL differs between staging and production, you must rebuild the image per environment or pass the ARG at build. Server-side-only secrets (no `NEXT_PUBLIC_` prefix) *are* read at runtime and are safe to inject via compose. Never log the whole `process.env` in the browser bundle — it isn't defined there and will throw `process is not defined`.

### 3.3 `docker-compose.yml` (development)

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: redis-server --save 60 1 --loglevel warning

  backend:
    build: ./backend
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - ./backend:/app
    env_file: .env
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy

  celery:
    build: ./backend
    command: celery -A config worker -l info
    volumes:
      - ./backend:/app
    env_file: .env
    depends_on:
      - backend
      - redis

  celery-beat:
    build: ./backend
    command: celery -A config beat -l info
    volumes:
      - ./backend:/app
    env_file: .env
    depends_on:
      - backend
      - redis

  frontend:
    build:
      context: ./frontend
      args:
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
    command: npm run dev
    volumes:
      - ./frontend:/app
      - /app/node_modules
    env_file: .env
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  pgdata:
```

### 3.4 `docker-compose.prod.yml` (overrides)

```yaml
services:
  backend:
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
    volumes: []          # no code mounting in prod — use the baked image
    ports: []            # only Nginx talks to it
    restart: always

  frontend:
    command: node server.js
    volumes: []
    ports: []
    restart: always

  nginx:
    image: nginx:alpine
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - frontend
      - backend
    restart: always
```

Run prod with:
`docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`

### 3.5 Nginx — `nginx/nginx.conf` (the routing core)

```nginx
events {}
http {
  upstream frontend { server frontend:3000; }
  upstream backend  { server backend:8000; }

  server {
    listen 80;
    server_name yourblog.com;
    return 301 https://$host$request_uri;   # force HTTPS
  }

  server {
    listen 443 ssl http2;
    server_name yourblog.com;
    ssl_certificate     /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    gzip on;
    gzip_types text/plain application/json application/javascript text/css;

    # API and Django admin go to Django
    location /api/    { proxy_pass http://backend; include proxy_headers.conf; }
    location /admin/  { proxy_pass http://backend; include proxy_headers.conf; }
    location /static/ { proxy_pass http://backend; }
    location /media/  { proxy_pass http://backend; }

    # Everything else is the Next.js site
    location / { proxy_pass http://frontend; include proxy_headers.conf; }
  }
}
```

---

## 4. Environment variables — `.env.example`

Commit this template; never commit the real `.env`.

```bash
# --- Django ---
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=0
DJANGO_ALLOWED_HOSTS=yourblog.com,api.yourblog.com
CORS_ALLOWED_ORIGINS=https://yourblog.com

# --- Database ---
POSTGRES_DB=blog
POSTGRES_USER=blog
POSTGRES_PASSWORD=change-me
DATABASE_URL=postgres://blog:change-me@db:5432/blog

# --- Redis / Celery ---
REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/1

# --- AI content ---
ANTHROPIC_API_KEY=sk-ant-...

# --- Frontend (build-time, PUBLIC) ---
NEXT_PUBLIC_API_URL=https://yourblog.com/api
NEXT_PUBLIC_SITE_URL=https://yourblog.com
```

---

## 5. How to start the project — step by step

**One-time setup:**

```bash
git clone <repo> && cd blog-platform
cp .env.example .env          # then fill in real values
docker compose build          # build all images
docker compose up -d db redis # start data services first
docker compose run --rm backend python manage.py migrate
docker compose run --rm backend python manage.py createsuperuser
docker compose up -d           # bring everything up
```

**Daily development:**

```bash
docker compose up              # watch logs live
# Frontend  -> http://localhost:3000
# API       -> http://localhost:8000/api
# Django admin (your CMS) -> http://localhost:8000/admin
```

A `Makefile` makes this muscle-memory:

```makefile
up:       ; docker compose up
build:    ; docker compose build
migrate:  ; docker compose run --rm backend python manage.py migrate
makemig:  ; docker compose run --rm backend python manage.py makemigrations
shell:    ; docker compose run --rm backend python manage.py shell
logs:     ; docker compose logs -f
prod:     ; docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

---

## 6. Production folder structure

### 6.1 Backend (`backend/`)

Split by *feature app*, not by file type. Config lives in a `config/` package so `manage.py` and Docker paths stay stable.

```
backend/
├── config/                     # project package (settings, urls, celery)
│   ├── settings/
│   │   ├── base.py             # shared settings
│   │   ├── dev.py              # DEBUG=True, console email
│   │   └── prod.py             # security headers, cached sessions
│   ├── urls.py
│   ├── wsgi.py
│   └── celery.py               # Celery app instance
├── apps/
│   ├── blog/                   # posts, categories, tags
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py            # DRF ViewSets
│   │   ├── urls.py
│   │   ├── admin.py            # editors work here (the CMS)
│   │   └── tasks.py            # Celery: publish scheduled posts
│   ├── content_ai/             # AI drafting pipeline
│   │   ├── services.py         # calls Anthropic API
│   │   ├── prompts.py          # versioned prompt templates
│   │   └── tasks.py            # async draft generation
│   ├── seo/                    # sitemap, meta, structured data
│   ├── newsletter/             # subscribers, sending
│   ├── analytics/              # internal view counts
│   └── users/                  # authors, editors, roles
├── requirements.txt
├── manage.py
└── Dockerfile
```

### 6.2 Frontend (`frontend/`) — Next.js App Router

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # homepage
│   │   ├── (blog)/
│   │   │   ├── blog/page.tsx           # post listing
│   │   │   └── blog/[slug]/page.tsx    # single post (ISR)
│   │   ├── category/[slug]/page.tsx
│   │   ├── sitemap.ts                  # generated sitemap
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                         # buttons, cards (design system)
│   │   ├── blog/                       # PostCard, PostBody, TOC
│   │   └── layout/                     # Header, Footer, Nav
│   ├── lib/
│   │   ├── api.ts                      # typed fetch wrapper to Django
│   │   └── seo.ts                      # metadata helpers
│   ├── types/                          # shared TS types (mirror API)
│   └── styles/
├── public/
├── next.config.ts                      # output: 'standalone'
├── tsconfig.json
└── Dockerfile
```

**Rendering strategy that matters for SEO and cost:**

- Post pages → **ISR** (`export const revalidate = 3600`). Pages are pre-rendered and regenerated hourly. Readers get static-fast HTML; you don't hit Django on every request.
- Listing/homepage → ISR with a shorter revalidate.
- Admin/preview → dynamic SSR (no caching).

This means 95% of reader traffic never touches Django or Postgres — critical for keeping a $6/month server alive under real traffic.

---

## 7. The AI + human content pipeline

This is your actual product differentiator, so treat it as a first-class subsystem, not a script.

```
  ┌─────────────┐   1. topic     ┌──────────────┐   2. async draft   ┌────────────┐
  │  Editor      │──────────────►│  Django API   │───────────────────►│  Celery    │
  │  (picks      │   keyword,     │  creates      │                    │  worker    │
  │   angle)     │   outline      │  Post(DRAFT)  │◄───────────────────│            │
  └─────────────┘                └──────┬───────┘   4. save draft body └─────┬──────┘
                                        │                                    │ 3. call
                                        │                                    ▼
                                        │                            ┌──────────────┐
                                        │                            │  Claude API   │
                                        │                            └──────────────┘
                          5. human edits │
                          in Django admin ▼
  ┌─────────────┐   6. approve   ┌──────────────┐   7. beat publishes at
  │  Editor      │──────────────►│ Post(REVIEW) │──► scheduled time ──► Post(PUBLISHED)
  └─────────────┘                └──────────────┘                       │
                                                                        ▼ 8. ISR revalidate
                                                                  Next.js rebuilds page
```

### Post status model

`DRAFT → AI_GENERATED → IN_REVIEW → APPROVED → SCHEDULED → PUBLISHED`

The "human touch" is enforced structurally: **a post cannot move to `PUBLISHED` without passing through `IN_REVIEW` with an editor recorded.** Bake this into the model's `save()` / a serializer validator so it's a rule, not a hope.

### The drafting service (sketch)

```python
# apps/content_ai/services.py
import anthropic
from django.conf import settings
from .prompts import DRAFT_PROMPT

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

def generate_draft(topic: str, keywords: list[str], outline: str) -> str:
    msg = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4000,
        messages=[{
            "role": "user",
            "content": DRAFT_PROMPT.format(
                topic=topic, keywords=", ".join(keywords), outline=outline
            ),
        }],
    )
    return "".join(b.text for b in msg.content if b.type == "text")
```

```python
# apps/content_ai/tasks.py
from celery import shared_task
from apps.blog.models import Post
from .services import generate_draft

@shared_task
def draft_post(post_id: int):
    post = Post.objects.get(id=post_id)
    post.body = generate_draft(post.topic, post.keyword_list, post.outline)
    post.status = Post.Status.AI_GENERATED
    post.save(update_fields=["body", "status"])
```

### Prompt discipline (this is what keeps quality up for years)

- Keep prompts in `prompts.py`, **versioned** — when you change a prompt, bump `v2`, `v3`, and store which version produced each post. When quality drifts you'll know why.
- Always feed the model your house style, target audience, and factual constraints. Instruct it to leave `[VERIFY: ...]` markers on any claim it isn't certain of — the human editor resolves these. That single habit prevents the "confident but wrong" AI-content problem that kills blogs.
- Require the editor to add at least one genuinely human element (personal example, local Bangladesh context, original opinion) before approval. That is what Google's helpful-content system rewards and what pure-AT content farms lack.

### Quality gate before publish

- Plagiarism/AI-detection check (optional external API) logged on the post.
- Automated SEO lint: title length, meta description present, at least one internal link, alt text on images.
- Fact-check checklist the editor ticks off.

---

## 8. Deployment

### 8.1 Where to host (from a Bangladesh cost perspective)

| Option | Rough monthly cost | Best for |
|---|---|---|
| Contabo / Hetzner VPS (EU) | $6–15 (৳700–1,800) | Best value; where I'd start |
| DigitalOcean / Vultr / Linode | $12–24 (৳1,400–2,900) | Better dashboards, snapshots |
| Local BD host (ExonHost, Alpha Net) | ৳500–2,000 | If you need local billing/support in Bangla |
| Vercel (frontend) + VPS (backend) | Free tier → $20 | Fastest frontend, but ties you to Vercel |

For a single VPS running everything via `docker-compose.prod.yml`, a 2 vCPU / 4 GB box handles a surprising amount of ISR-cached blog traffic because most requests never reach Django. Start there; scale later.

### 8.2 TLS

Use Let's Encrypt (free). Either run Certbot on the host and mount certs into the Nginx container, or switch Nginx for **Traefik**, which does automatic certificate renewal with almost no config — recommended for a small team that doesn't want to remember to renew.

### 8.3 CI/CD (keep it boring)

GitHub Actions: on push to `main` → run tests → build images → SSH to VPS → `docker compose pull && up -d`. One workflow file. Don't build Kubernetes for a blog; you'll waste months you could spend writing content.

### 8.4 Backups (non-negotiable for a 5-year run)

- Nightly `pg_dump` to an object store (Backblaze B2 is cheap, or Cloudflare R2 with no egress fees).
- Keep 7 daily + 4 weekly + 12 monthly copies.
- **Test a restore once a quarter.** A backup you've never restored is a rumor.

---

## 9. Making it earn money

A blog's revenue is downstream of **traffic × monetization efficiency**. Both take time; plan for the curve.

### Revenue streams, in the order they realistically turn on

1. **Display ads** — Google AdSense from day one (low RPM), then move to **Ezoic** (~10k visits/mo) and **Mediavine/Raptive** (~50k+ sessions/mo, much higher RPM). This is the backbone.
2. **Affiliate marketing** — Amazon Associates, plus local/global SaaS and travel affiliates (relevant given your travel-tech background — flight/hotel affiliate programs pay well). Often out-earns ads per visitor.
3. **Sponsored posts** — brands pay for placement once you have domain authority (usually 6–12 months in).
4. **Digital products** — ebooks, templates, a paid newsletter tier. Highest margin, no traffic-share cut.
5. **Lead gen for your own agency** — a blog that ranks is a client-acquisition machine for your software company. Often the most valuable stream and easy to overlook.

### AdSense/traffic reality check (Bangladesh)

- AdSense pays via a linked bank account or wire in USD; you'll withdraw to your BD bank. There's a $100 payout threshold. Keep records for tax.
- A niche targeting **US/EU/UK readers** earns 5–20× the RPM of Bangladesh-targeted traffic. Write in English for a global audience if revenue is the goal; a Bangla site serves a different (smaller-revenue, higher-loyalty) purpose.

### The unit economics that decide viability

```
Monthly revenue ≈ (monthly pageviews / 1000) × RPM
Example at maturity: 200,000 pv × $8 RPM  ≈ $1,600/mo  (~৳1,90,000)
Costs: VPS $15 + AI API ~$30 + tools ~$20  ≈ $65/mo
```

The AI pipeline is what makes the cost side stay tiny while output stays high — that's the whole thesis.

---

## 10. SEO — the part that actually determines success

No amount of good architecture matters if nobody finds the site. Non-negotiables, all supported by the structure above:

- **Server-rendered HTML** (Next.js SSR/ISR) so Google indexes full content, not an empty JS shell.
- **`sitemap.ts` and `robots.ts`** auto-generated from published posts.
- **Structured data** (JSON-LD `Article`, `BreadcrumbList`) on every post — the `seo/` app can emit this.
- **Core Web Vitals**: Next image optimization, `standalone` build, Nginx gzip + caching. Fast pages rank and earn more.
- **Topic clusters**: pick 3–5 niches you can own, publish depth, interlink. Random one-off posts don't rank.
- **E-E-A-T**: real author bios, editor names, "reviewed by" bylines — this is exactly why the human-in-the-loop step is a business requirement, not just a quality nicety. Google's helpful-content system actively demotes unedited mass AI content.

---

## 11. Running it for 5+ years (sustainability)

The graveyard of side projects is full of things that worked at launch and rotted by year two. To survive:

- **Dependency hygiene**: pin versions; schedule a quarterly `Dependabot`/`npm audit` + Django LTS upgrade day. Django LTS releases give ~3 years of security support each — ride the LTS line.
- **Boring infrastructure**: one VPS, Docker, Postgres, Nginx. Every exotic piece you add is something future-you has to keep alive.
- **Observability**: you already have Sentry connected — wire it into both Django and Next.js so errors reach you before readers complain. Add uptime monitoring (UptimeRobot, free).
- **Documented runbooks**: "how to restore a backup," "how to rotate the AI key," "how to add an author." A 5-year project outlives the memory of why you did things.
- **Content compounding**: 2–3 quality posts/week, sustained, beats 50 posts in month one then silence. The AI pipeline exists to make consistency cheap.
- **Bus factor**: at least two people can deploy and restore. Never let it be one person's secret.

---

## 12. Running this as a real software company in Bangladesh

### Team (lean, realistic)

| Role | Count | Indicative monthly cost (BDT) |
|---|---|---|
| Full-stack dev (you / lead) | 1 | founder / ৳60k–1,20k equivalent |
| Junior React/Next dev | 1 | ৳25k–45k |
| Editor / content lead (owns the "human touch") | 1 | ৳25k–40k |
| Part-time SEO/social | 0.5 | ৳15k–25k |

You can start solo and add the editor first — the editor is the role that protects revenue.

### Legal & financial setup

- **Trade license** from your City Corporation / Union Parishad; register the business name.
- Consider a **Private Limited company** via RJSC once revenue is steady — cleaner for foreign payments and hiring.
- **TIN + VAT/BIN** registration; keep bookkeeping from month one. You already have QuickBooks and Xero connected — use one as the single source of truth and reconcile AdSense/affiliate income there monthly.
- **Foreign income**: AdSense/affiliate USD lands via bank; keep it documented for NBR. Bangladesh offers tax benefits for IT/ITES export income — talk to an accountant about the exemption on IT service export earnings, as it can materially change your take-home.

### Payments (if you sell products/subscriptions)

- Local: **bKash, Nagad, SSLCOMMERZ** (aggregates cards + mobile wallets), **aamarPay**.
- Global: **Stripe** is not directly available to BD entities — common workarounds are Payoneer, Wise, or a partner entity abroad. For a global audience selling digital products, **Paddle or Lemon Squeezy** act as merchant-of-record and handle this cleanly.

### Realistic timeline to launch fast

| Phase | Duration | Deliverable |
|---|---|---|
| 0. Repo + Docker + skeleton | Week 1 | `docker compose up` runs frontend + API + admin |
| 1. Post model, API, ISR pages | Week 2 | You can publish a post and see it live |
| 2. AI drafting + review workflow | Week 3 | Editor generates & approves a real post |
| 3. SEO, sitemap, analytics, ads | Week 4 | AdSense applied, sitemap submitted |
| 4. Deploy to VPS + TLS + backups | Week 5 | Live on your domain, HTTPS, nightly backups |
| 5. Content sprint | Weeks 6–12 | 20–30 pillar posts, submitted to Search Console |

**Six weeks to live, three months to a real content base.** That's an achievable "short time" without cutting the corners that matter (review workflow, SEO, backups).

---

## 13. What to do next (concrete first actions)

1. Create the repo with the folder structure in Section 6.
2. Copy the Dockerfiles and compose files from Section 3; get `docker compose up` green.
3. Build the `blog` app's `Post` model with the status field from Section 7.
4. Wire one ISR post page in Next.js reading from `/api/posts/[slug]`.
5. Add the Celery `draft_post` task and generate your first AI draft.
6. Only then think about ads — traffic first, monetization second.

Build the smallest thing that can publish one reviewed post end-to-end, then repeat. Everything else is elaboration on that loop.
