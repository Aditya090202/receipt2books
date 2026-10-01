# Receipt2Books: Project Definition

Owner: Aditya Mathur
Timebox: 4 weeks at 1 to 2 hours/day (2026-10-01 to 2026-10-28), two 2-week sprints
Status: Not started

## 1. Purpose

Portfolio project for Intuit's Early Career Software Engineer application (general posting, <2 years experience, added 2026-09-29). The JD spans frontend, backend, fullstack and mobile tracks, and also asks for GenAI awareness, REST APIs, cloud/SaaS experience and rapid prototyping.

### Resume gaps this project closes
MongoDB, Express, React Native/Flutter, Jenkins, explicit Agile/Scrum, mobile experience.

### Already covered by past work (not repeated)
Full-stack web (React, FastAPI, Next.js, PostgreSQL), WebSockets, Azure AI pipeline (Azure OpenAI, Document Intelligence), LangChain/CrewAI.

## 2. Product summary

An AI expense tracker with a mobile app and a web API. The user snaps a receipt, an LLM extracts vendor, date, total and category, and the result lands in the user's expense list. There is no separate ledger component: the expense list is the receipts stored in MongoDB, shown in the list screen and summarised on the Reports screen. It mirrors QuickBooks-style bookkeeping (receipt capture, categorisation, monthly reporting).

## 3. Scope

### In scope (MVP)
- Register / login with JWT auth
- Receipt CRUD (list, create, view, edit, delete), scoped per user
- Category model (default set seeded per user, custom categories allowed)
- Photo capture or gallery pick in the mobile app, upload to API
- LLM receipt parsing with structured JSON output (vendor, date, total, currency, category suggestion, confidence)
- Edit screen to correct the AI parse
- Monthly spending-by-category chart
- Dockerised API + MongoDB, Jenkins pipeline (lint, test, build image)
- Deployed API, README with screenshots, demo video

### Out of scope (stretch only if time remains)
- Line-item extraction, multi-currency conversion, CSV/QuickBooks export
- Offline mode, push notifications, OCR fallback
- Refresh tokens, roles, team accounts
- App store publishing (Expo Go / dev build is enough)

## 3b. Decisions made

- LLM provider: Anthropic Claude
- Image storage: Docker volume / local disk (limitation noted in README)
- API hosting: Render (with MongoDB Atlas)
- Mobile testing: real phone via Expo Go

## 4. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Mobile | React Native (Expo, TypeScript) | Closes mobile gap, reuses React skills |
| API | Node.js + Express (TypeScript) | Closes Express gap |
| Database | MongoDB (Mongoose) | Closes MongoDB gap |
| Auth | JWT (access token), bcrypt | Standard REST auth |
| Validation | zod | Shared request/LLM-output schemas |
| LLM | Anthropic Claude API (vision + structured JSON output) | GenAI keyword |
| Testing | Jest + Supertest + mongodb-memory-server | Fast, no external DB in CI |
| Lint | ESLint + Prettier | Pipeline lint stage |
| Containers | Docker, docker-compose | API + Mongo |
| CI | Jenkins (local, Jenkinsfile in repo) | Closes Jenkins gap |
| Hosting | Render or Railway (API), MongoDB Atlas free tier | Cloud/SaaS keyword |
| Charts | react-native-svg based chart lib (e.g. victory-native or react-native-gifted-charts) | Category chart |

## 5. Architecture

```
Expo app (React Native)
   |  HTTPS, JWT bearer
   v
Express API ──> MongoDB (users, receipts, categories)
   |
   └──> LLM API (image + JSON schema -> parsed fields)
```

Receipt upload flow:
1. App picks/captures a photo, resizes/compresses it client side.
2. `POST /api/receipts/parse` (multipart) sends the image to the API.
3. API calls the LLM with a JSON schema; validates the response with zod.
4. API saves a receipt with `status: "parsed"` and returns it.
5. User reviews and edits on the edit screen; `PATCH` sets `status: "confirmed"`.

## 6. Data model

**User**: `email` (unique), `passwordHash`, `name`, `createdAt`
**Category**: `userId`, `name`, `color`, `isDefault`
**Receipt**: `userId`, `vendor`, `date`, `total`, `currency`, `categoryId`, `imageUrl`/`imagePath`, `status` (`parsed` | `confirmed`), `parseConfidence`, `rawLlmOutput`, `createdAt`, `updatedAt`

Indexes: `User.email` unique; `Receipt {userId, date}` for monthly queries.

## 7. REST API (v1)

| Method | Path | Purpose |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Get JWT |
| GET | /api/auth/me | Current user |
| GET | /api/receipts | List (filter by month, category; paginated) |
| POST | /api/receipts | Create manually |
| POST | /api/receipts/parse | Upload image, LLM parse, save |
| GET | /api/receipts/:id | Get one |
| PATCH | /api/receipts/:id | Edit / confirm |
| DELETE | /api/receipts/:id | Delete |
| GET | /api/categories | List categories |
| POST | /api/categories | Create category |
| GET | /api/reports/monthly?month=YYYY-MM | Spend by category |
| GET | /health | Health check |

Errors use one JSON shape: `{ "error": { "code", "message", "details?" } }`.

## 8. Agile / Scrum framing

The project runs as two 2-week sprints (Sprint 1: Oct 1 – Oct 14, Sprint 2: Oct 15 – Oct 28), with a short written standup at the start of each daily session.
- Artifacts kept in repo under `docs/agile/`: product backlog, sprint backlogs (`sprint-1.md`, `sprint-2.md`), user stories with acceptance criteria and story points, daily standup log, sprint review and retrospective at the end of each sprint.
- Board: GitHub Projects (or a markdown board) with To Do / In Progress / Done.
- Sprint goals: defined per sprint in `docs/agile/sprint-1.md` and `docs/agile/sprint-2.md`.
- Definition of Done: code merged via PR to `main`, lint passes, tests pass, README/API docs updated.

Branching: `main` + short-lived `feature/*` branches, PRs with descriptive commits (shows Git fluency).

## 9. Success criteria

- Fresh clone runs with `docker compose up` (API + Mongo) and `npx expo start` (app).
- End-to-end demo: register, snap receipt, AI fills fields, correct one, see it in the chart.
- Jenkins run shows green lint, test, build-image stages (screenshot in README).
- API is live on the public internet; README links to it.
- At least ~15 automated tests covering auth, receipt CRUD and the parse flow (LLM mocked).
- Resume bullets and keyword mapping written (see PLAN.md).

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Expo camera/build issues eat a day | Use Expo Go + `expo-image-picker` (works with gallery fallback); avoid custom native modules |
| LLM returns malformed JSON | Structured output / JSON schema plus zod validation and one retry; user can always edit |
| Jenkins setup is slow | Run Jenkins in Docker with a prebuilt LTS image; keep the Jenkinsfile to 3 stages |
| LLM API cost / rate limits | Downscale images, cache raw output, mock in tests, set a spend cap |
| Scope creep | Anything not in section 3 goes to the backlog, not the sprint |
| Receipt images and privacy | Do not commit real receipts; use sample/synthetic receipts in demo and README |

## 11. Resume keywords earned

React Native, Express, MongoDB, Jenkins, Agile/Scrum, RESTful APIs, Generative AI, Git, Docker, JWT, cloud deployment.
