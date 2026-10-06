# Receipt2Books

AI expense tracker: snap a receipt on your phone, an LLM extracts the vendor, date, total and category, and it lands in your expense list with monthly spending charts.

**Status:** in progress, Sprint 1 of 2 (Oct 7 – Oct 20, 2026). See the [sprint board docs](docs/agile/).

**Stack:** React Native (Expo) · Node.js + Express · MongoDB · Claude API · Docker · Jenkins

<!-- TODO (S2-T14, EN-04): replace this stub with the full README:
  - pitch + demo video link
  - screenshots (docs/screenshots/)
  - architecture diagram (docs/architecture.md)
  - local setup: docker compose, API, Expo app
  - API summary (docs/api.md)
  - design decisions and known limitations
  - what's next
-->

## Project docs

- [Project definition](PROJECT_DEFINITION.md)
- [4-week plan](PLAN.md)
- [Scaffold plan](SCAFFOLD_PLAN.md)
- [Product backlog](docs/agile/backlog.md) · [Sprint 1](docs/agile/sprint-1.md) · [Sprint 2](docs/agile/sprint-2.md)

## Getting started

Requires Node.js 22+ (see `.nvmrc`).

**API** (starter: `/`, `/health`, `/api`):

```bash
cd api
npm install
npm run dev        # http://localhost:4000
```

**Mobile app** (currently the Expo starter app):

```bash
cd mobile
npm install
npx expo start     # scan the QR code with Expo Go
```

<!-- TODO (S1-T04): document `cp .env.example .env` and `docker compose up -d` for MongoDB -->
<!-- TODO (S1-T03): document api/.env setup (see api/.env.example) -->
