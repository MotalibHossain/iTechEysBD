# iTechEys

Bilingual (Bangla + English) tech blog platform — Next.js frontend with Django REST API backend and AI-assisted content drafting.

## Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Redux Toolkit  
**Backend:** Django REST Framework, PostgreSQL, Redis, Celery  
**AI:** Claude API for draft generation with human editorial review  
**Infra:** Docker Compose, Nginx

## Project Structure

```
├── frontend/          # Next.js app
│   ├── app/           # Pages (home, blog)
│   ├── components/    # home/, blog/, layout/
│   └── lib/           # Utilities + mock data
├── backend/           # Django REST API
```

## Getting Started

### Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The API is available at `http://127.0.0.1:8000/api/`. Use `/api/health/` to
verify that the backend is running.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Full Stack (Docker)

```bash
cp .env.example .env
docker compose up -d
```

## Scripts

```bash
npm run dev       # Dev server
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # Lint
```

## License

Private — All rights reserved.