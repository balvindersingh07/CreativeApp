# CreativeApp Server (Express + Prisma + Postgres)

## Setup

```bash
npm install
copy .env.example .env   # Windows PowerShell
# Fill DATABASE_URL and OPENAI_API_KEY
npx prisma generate --schema="prisma\schema.prisma"
npx prisma migrate dev --name init --schema="prisma\schema.prisma"
npm run dev
# API on :8080
```

Health: http://127.0.0.1:8080/health

### Deploy (Render)
- Start command: `npm start`
- Env vars: `DATABASE_URL`, `OPENAI_API_KEY`, `ALLOWED_ORIGIN=https://<your-vercel-app>.vercel.app`

## MVP Business APIs (no UI changes)

Base: `/api/v1`

- **GET /creators** — list creators
- **POST /creators** — create creator
- **GET /creators/:id** — creator detail
- **GET /events** — list events (filters: city, category, date_from, date_to)
- **POST /events** — create event
- **POST /applications** — apply/interest
- **POST /matches/run** — recompute matches
- **GET /matches** — list matches

### Setup
```bash
npm install
# Prisma
npm run db:gen
npm run db:dev     # creates tables
# Seed sample data
npm run seed
# Start dev server
npm run dev
```

> ENV required: `DATABASE_URL` (Postgres), optional `OPENAI_API_KEY`