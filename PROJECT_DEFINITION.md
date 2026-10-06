# Receipt2Books: Project Definition

Owner: Aditya Mathur
Timebox: 4 weeks at 1 to 2 hours/day (2026-10-07 to 2026-11-03), two 2-week sprints
Status: Not started

## 1. Purpose

### Why I'm building it
Paper receipts pile up, and by the end of the month it's hard to say where the money actually went. Typing each receipt into a spreadsheet or budgeting app is tedious enough that most people give up. Receipt2Books removes that step: take a photo, and the app reads the receipt, categorises it and adds it to a monthly picture of your spending.

### What I want to learn
- Building a mobile app end to end with React Native (Expo)
- Designing a REST API with Node.js and Express, backed by a document database (MongoDB)
- Using AI where it is genuinely useful: an LLM to read the receipt, a classifier with a confidence score to pick the category, and a person to confirm anything uncertain
- Automating builds and tests with Docker and Jenkins, and deploying to the cloud
- Running the work as Scrum sprints with a backlog, a board, standups and retrospectives

### Building on earlier work
I've already built full-stack web apps (React, Next.js, FastAPI, PostgreSQL) and AI document pipelines (Azure OpenAI, Document Intelligence, LangChain/CrewAI), so this project deliberately uses a different stack.

## 2. Product summary

An AI expense tracker with a mobile app and a web API. The user snaps a receipt, an LLM extracts vendor, date, total and category, and the result lands in the user's expense list. There is no separate ledger component: the expense list is the receipts stored in MongoDB, shown in the list screen and summarised on the Reports screen. It is built for personal use: people who want their everyday spending categorised and a clear picture of how much they spend each month.

## 3. Scope

### In scope (MVP)
- Register / login with JWT auth
- Receipt CRUD (list, create, view, edit, delete), scoped per user
- Category model: each user has their own categories (a default set with short descriptions is seeded on registration)
- Photo capture or gallery pick in the mobile app, upload to API
- AI receipt parsing: Claude reads the photo and returns structured JSON (vendor, date, total, currency, items summary); Jev (TypeSafe) picks the category from the user's categories with a confidence score
- Review flags: code checks plus category confidence mark the fields a person should check
- Edit screen to review and correct the AI parse, then confirm
- Monthly spending-by-category chart (confirmed receipts only)
- Dockerised API + MongoDB, Jenkins pipeline (lint, test, build image)
- Deployed API, README with screenshots, demo video

### Out of scope (stretch only if time remains)
- Line-item prices (backlog story US-12), multi-currency conversion, CSV export (US-11)
- Offline mode, push notifications, OCR fallback
- Refresh tokens, roles, team accounts
- App store publishing (Expo Go / dev build is enough)

## 3b. Decisions made

- LLM provider: Anthropic Claude (field extraction from the photo)
- Category classifier: Jev by TypeSafe AI (Choice judgment over the user's categories, with confidence)
- Receipts are saved right after parsing as `parsed` (needs review) and become `confirmed` when the user confirms; reports count confirmed receipts only
- Image storage: Docker volume / local disk (limitation noted in README)
- API hosting: Render (with MongoDB Atlas)
- Mobile testing: real phone via Expo Go

## 4. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Mobile | React Native (Expo, TypeScript) | One codebase for iOS and Android; builds on my React experience |
| API | Node.js + Express (TypeScript) | Minimal, widely used web framework; TypeScript end to end with the app |
| Database | MongoDB (Mongoose) | Receipts are self-contained documents, and the AI's JSON output can be stored as-is |
| Auth | JWT (access token), bcrypt | Standard REST auth |
| Validation | zod | Shared request/LLM-output schemas |
| LLM | Anthropic Claude API (vision + structured JSON output) | Reads fields from the receipt photo |
| Classifier | Jev by TypeSafe AI (`@typesafe-ai/sdk`) | Picks the category with a calibrated confidence score |
| Testing | Jest + Supertest + mongodb-memory-server | Fast, no external DB in CI |
| Lint | ESLint + Prettier | Pipeline lint stage |
| Containers | Docker, docker-compose | API + Mongo |
| CI | Jenkins (local, Jenkinsfile in repo) | Pipeline defined as code; lint, test and build on every push |
| Hosting | Render (API), MongoDB Atlas free tier | Free tiers, managed database, deploys from GitHub |
| Charts | react-native-svg based chart lib (e.g. victory-native or react-native-gifted-charts) | Category chart |

## 5. Architecture

```
Expo app (React Native)
   |  HTTPS, JWT bearer
   v
Express API ──> MongoDB (users, receipts, categories)
   |
   ├──> Claude API (image + JSON schema -> vendor, date, total, currency, items summary)
   └──> Jev / TypeSafe (receipt text + user's categories -> category, confidence)
```

Receipt upload flow:
1. App picks/captures a photo, resizes/compresses it client side.
2. `POST /api/receipts/parse` (multipart) sends the image to the API.
3. **Extract (Claude):** the API sends the image with a JSON schema. Claude returns vendor, date, total, subtotal, tax, currency and a short items summary, using `null` for anything it can't read. The response is validated with zod (one retry on invalid output).
4. **Categorise (Jev):** a Choice judgment over the user's categories (name → description), with the vendor and items summary as state. Returns the chosen category, probabilities and a 0–1 confidence. "Uncategorized" is the no-match option.
5. **Flag (code):** review flags are computed per field:
   - vendor missing
   - total not a positive number, or subtotal + tax doesn't match the total
   - date invalid, in the future, or more than a year old
   - category confidence below 0.5
6. **Save:** the receipt is saved immediately with `status: "parsed"` and returned. Nothing is lost if the app closes during review.
7. **Review:** the edit screen highlights flagged fields. A category with confidence 0.5–0.9 is shown as "suggested"; 0.9 or above is shown normally.
8. **Confirm:** `PATCH` with the user's edits sets `status: "confirmed"` and clears the flags. Reports and the monthly total count confirmed receipts only.

Failure handling: if Claude fails or returns invalid output twice, the API returns an error and the app offers retry or manual entry. If Jev fails, the receipt is still saved as "Uncategorized" with the category flagged.

Thresholds (0.5 and 0.9) are starting values, kept in config and tuned after testing sample receipts.

## 6. Data model

The shape of the three document types stored in MongoDB. Mongoose schemas enforce this shape in the app (MongoDB itself doesn't require a schema); zod validates API requests and AI output, which differ from the stored shape (e.g. a request has `password`, the stored user has `passwordHash`).

**User**: `email` (unique), `passwordHash`, `name`, `createdAt`
**Category**: `userId`, `name`, `description` (what belongs in it; sent to Jev as the option's criteria), `color`, `isDefault`
**Receipt**: `userId`, `vendor`, `date`, `total`, `currency`, `categoryId`, `itemsSummary`, `imagePath`, `status` (`parsed` | `confirmed`), `categoryConfidence` (Jev, 0–1; null for manual entries), `reviewFlags` (list of `{ field, reason }`), `rawAiOutput` (Claude's extraction and Jev's judgment, kept for debugging and accuracy stats), `createdAt`, `updatedAt`

Planned (backlog story US-12): `lineItems`, an array of `{ description, quantity, price }` stored *inside* each receipt document rather than in a separate collection. Items are always read together with their receipt, so embedding them is the natural MongoDB design (a relational database would use a separate table and a join).

Indexes (MongoDB is non-relational, but still uses indexes to make queries fast and enforce uniqueness; Mongoose creates them from the schema):
- `User.email` unique, so duplicate accounts are blocked by the database itself
- `Category {userId, name}` unique
- `Receipt {userId, date}` for the newest-first list and monthly queries

`userId` and `categoryId` are references (like foreign keys, but not enforced by MongoDB), so the services check ownership.

## 7. REST API (v1)

| Method | Path | Purpose |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Get JWT |
| GET | /api/auth/me | Current user |
| GET | /api/receipts | List (filter by month, category; paginated) |
| POST | /api/receipts | Create manually |
| POST | /api/receipts/parse | Upload image, Claude extract + Jev categorise, save as `parsed` |
| GET | /api/receipts/:id | Get one |
| PATCH | /api/receipts/:id | Edit / confirm |
| DELETE | /api/receipts/:id | Delete |
| GET | /api/categories | List categories |
| POST | /api/categories | Create category |
| GET | /api/reports/monthly?month=YYYY-MM | Spend by category (confirmed receipts only) |
| GET | /health | Health check |

Errors use one JSON shape: `{ "error": { "code", "message", "details?" } }`.

## 8. Agile / Scrum framing

The project runs as two 2-week sprints (Sprint 1: Oct 7 – Oct 20, Sprint 2: Oct 21 – Nov 3), with a short written standup at the start of each daily session.
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
- At least ~15 automated tests covering auth, receipt CRUD and the parse flow (Claude and Jev mocked).

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Expo camera/build issues eat a day | Use Expo Go + `expo-image-picker` (works with gallery fallback); avoid custom native modules |
| LLM returns malformed JSON | Structured output / JSON schema plus zod validation and one retry; user can always edit |
| Jenkins setup is slow | Run Jenkins in Docker with a prebuilt LTS image; keep the Jenkinsfile to 3 stages |
| LLM API cost / rate limits | Downscale images, cache raw output, mock in tests, set a spend cap |
| Jev / TypeSafe unavailable | Save the receipt as "Uncategorized" with the category flagged; the user picks it on review |
| AI confidence is misleading | Don't ask Claude to rate itself; use Jev's confidence for the category and code checks for other fields; tune thresholds on sample receipts |
| Scope creep | Anything not in section 3 goes to the backlog, not the sprint |
| Receipt images and privacy | Do not commit real receipts; use sample/synthetic receipts in demo and README |
