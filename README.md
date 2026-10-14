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
cp .env.example .env   # then set JWT_SECRET (at least 32 characters: openssl rand -hex 32)
npm run dev            # http://localhost:4000
npm run check      # typecheck + lint + format check + tests (run before every PR)
```

Other scripts: `npm test`, `npm run test:watch`, `npm run test:ci` (with coverage), `npm run lint:fix`, `npm run format`.

**Mobile app** (currently the Expo starter app):

```bash
cd mobile
npm install
npx expo start     # scan the QR code with Expo Go
```

<!-- TODO (S1-T04): document `cp .env.example .env` and `docker compose up -d` for MongoDB -->
The API validates its configuration at startup and exits with a message naming any missing or invalid variable. All variables are described in `api/.env.example`.
