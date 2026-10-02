# Receipt2Books: Scaffold Plan (for review, nothing is created yet)

Stack: React Native (Expo, TypeScript), Node.js + Express (TypeScript), MongoDB (Mongoose), Jest + Supertest, Docker, Jenkins.
Related: [PROJECT_DEFINITION.md](PROJECT_DEFINITION.md), [PLAN.md](PLAN.md)

## 1. Repo layout: a simple monorepo

Two independent packages (`api`, `mobile`), each with its own `package.json`. No workspace tooling (Nx/Turborepo): Expo and Metro are fragile with hoisted dependencies, and a project this size does not need it.

```
receipt2books/
├── .github/
│   └── pull_request_template.md
├── api/                          # Express + MongoDB backend
├── mobile/                       # Expo React Native app
├── docs/
│   ├── agile/
│   │   ├── backlog.md            # user stories, acceptance criteria, points
│   │   ├── sprint-1.md           # Sprint 1 goal + backlog (Oct 1–14)
│   │   ├── sprint-2.md           # Sprint 2 goal + backlog (Oct 15–28)
│   │   ├── standups.md           # daily log
│   │   └── retro.md              # review + retrospective per sprint
│   ├── api.md                    # endpoint reference (or openapi.yaml)
│   ├── architecture.md           # diagram + design decisions
│   └── screenshots/              # README images
├── jenkins/
│   └── docker-compose.jenkins.yml  # run Jenkins locally in Docker
├── Jenkinsfile                   # declarative pipeline (repo root)
├── docker-compose.yml            # api + mongo (dev/demo)
├── .env.example                  # root-level compose variables
├── .gitignore
├── .editorconfig
├── LICENSE
├── PROJECT_DEFINITION.md
├── PLAN.md
├── SCAFFOLD_PLAN.md
└── README.md
```

## 2. Backend: `api/`

Layered structure (routes -> controllers -> services -> models). Controllers stay thin, business logic and the LLM call live in services, so they are easy to test and mock. `app.ts` builds the Express app without listening, so Supertest can import it; `server.ts` connects to the DB and listens.

```
api/
├── src/
│   ├── server.ts                 # connect DB, app.listen, graceful shutdown
│   ├── app.ts                    # express(), middleware, routes, error handler
│   ├── config/
│   │   ├── env.ts                # zod-validated env, fail fast on bad config
│   │   └── db.ts                 # mongoose.connect
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── receipt.model.ts
│   │   └── category.model.ts
│   ├── routes/
│   │   ├── index.ts              # mounts /api/*
│   │   ├── auth.routes.ts
│   │   ├── receipt.routes.ts
│   │   ├── category.routes.ts
│   │   └── report.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── receipt.controller.ts
│   │   ├── category.controller.ts
│   │   └── report.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── receipt.service.ts
│   │   ├── category.service.ts   # default category seeding, list/create
│   │   ├── report.service.ts     # Mongo aggregation
│   │   ├── reviewFlags.ts        # code checks -> per-field review flags (S2-T03)
│   │   └── ai/
│   │       ├── receiptExtractor.ts   # image -> structured fields (Claude API, S1-T15)
│   │       ├── extraction.schema.ts  # zod schema for Claude's output
│   │       └── categoryClassifier.ts # fields + user's categories -> category + confidence (Jev, S1-T16)
│   ├── middleware/
│   │   ├── auth.ts               # verify JWT, attach req.user
│   │   ├── validate.ts           # zod validation for body/query/params
│   │   ├── upload.ts             # multer limits + mime filter
│   │   ├── rateLimit.ts          # express-rate-limit for auth routes
│   │   └── errorHandler.ts       # one error JSON shape
│   ├── validators/               # zod request schemas per resource
│   │   ├── auth.schema.ts
│   │   ├── receipt.schema.ts
│   │   ├── category.schema.ts
│   │   └── report.schema.ts
│   ├── utils/
│   │   ├── AppError.ts           # typed errors with status + code
│   │   ├── asyncHandler.ts
│   │   └── logger.ts             # pino
│   └── types/
│       └── express.d.ts          # augment Request with user
├── tests/
│   ├── setup.ts                  # mongodb-memory-server lifecycle
│   ├── helpers/                  # createUser, authHeader factories
│   ├── health.test.ts
│   ├── auth.test.ts
│   ├── receipts.test.ts
│   ├── reports.test.ts
│   └── parse.test.ts             # LLM client mocked
├── uploads/                      # runtime image storage (gitignored, .gitkeep)
├── Dockerfile                    # multi-stage, non-root
├── .dockerignore
├── .env.example
├── eslint.config.js              # flat config, typescript-eslint
├── .prettierrc
├── jest.config.ts
├── tsconfig.json
├── tsconfig.build.json           # excludes tests from the build
└── package.json
```

**API dependencies**
- Runtime: `express`, `mongoose`, `zod`, `jsonwebtoken`, `bcrypt`, `multer`, `helmet`, `cors`, `express-rate-limit`, `pino` + `pino-http`, `dotenv`, `@anthropic-ai/sdk`, `@typesafe-ai/sdk`
- Dev: `typescript`, `tsx` (dev runner), `@types/*`, `jest`, `ts-jest`, `supertest`, `mongodb-memory-server`, `eslint`, `typescript-eslint`, `prettier`

**Scripts:** `dev` (tsx watch), `build` (tsc), `start` (node dist), `lint`, `format`, `test`, `test:ci` (with coverage + JUnit report for Jenkins).

**Best practices applied**
- App/server split for testability
- Env validated at startup; no secrets in code
- `helmet`, CORS allow-list, rate limiting on auth routes, request body size limits
- Passwords hashed with bcrypt; JWT secret from env; generic login error messages
- Every query scoped by `req.user.id` (ownership isolation) with a test
- zod at every boundary: requests and AI output
- AI split by job: Claude extracts fields, Jev picks the category with a confidence score, plain code computes review flags; confidence thresholds live in config
- Single error shape and `asyncHandler` so controllers never need try/catch
- Mongoose indexes: unique `User.email`, compound `Receipt {userId, date}`
- Upload limits (size, `image/jpeg|png|webp` only), generated filenames
- Structured logging, `/health` endpoint, graceful shutdown on SIGTERM

## 3. Mobile: `mobile/`

Expo SDK 57 (managed workflow, default template) with Expo Router. Following the current Expo template, routes live in `src/app/` alongside feature code in `src/`, and filenames are kebab-case. Route files stay thin.

```
mobile/
├── src/
│   ├── app/                      # Expo Router routes (target layout below; Expo starter screens until S1-T12)
│   │   ├── _layout.tsx           # root providers, auth gate
│   │   ├── (auth)/
│   │   │   ├── _layout.tsx
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx         # expense list
│   │   │   ├── add.tsx           # camera / gallery / manual add
│   │   │   └── reports.tsx       # monthly chart
│   │   └── receipt/
│   │       └── [id].tsx          # view / edit / confirm / delete
│   ├── api/
│   │   ├── client.ts             # fetch wrapper: base URL, token, error mapping
│   │   ├── auth.ts
│   │   ├── receipts.ts
│   │   └── reports.ts
│   ├── auth/
│   │   ├── auth-context.tsx
│   │   └── token-storage.ts      # expo-secure-store
│   ├── components/               # receipt-card, monthly-total-header, button, text-field (+ Expo themed-text/view)
│   ├── constants/theme.ts        # colors, spacing, fonts (from the Expo template)
│   ├── hooks/                    # use-receipts, use-monthly-report (TanStack Query) + Expo theme hooks
│   ├── types/                    # API types (mirror of API schemas)
│   └── utils/                    # format (currency, dates), image compression
├── planned-routes/               # placeholder route files, moved into src/app/ in S1-T12
├── assets/                       # icons, splash (from the Expo template)
├── __tests__/                    # a few component/util tests (Jest + RN Testing Library)
├── README.md                     # how to run + S1-T12 steps
├── AGENTS.md  .claude/           # AI-tool guidance shipped with the Expo template
├── app.json                      # Expo config
├── .env.example                  # EXPO_PUBLIC_API_URL
├── eslint.config.js              # created by `npx expo lint` (S1-T12)
├── .prettierrc
├── tsconfig.json                 # extends expo/tsconfig.base, `@/*` -> src/*
└── package.json
```

**Mobile dependencies:** `expo`, `expo-router`, `expo-image-picker`, `expo-image-manipulator`, `expo-secure-store`, `@tanstack/react-query`, `react-native-svg` plus a chart lib (`react-native-gifted-charts` or `victory-native`), `@react-native-community/datetimepicker`; dev: `jest-expo`, `@testing-library/react-native`, `eslint-config-expo`, `prettier`.

**Best practices applied**
- Token in SecureStore, never AsyncStorage
- All HTTP in `src/api`, screens never call `fetch` directly
- TanStack Query for server state (caching, loading and error states, refetch on confirm)
- API URL via `EXPO_PUBLIC_API_URL`; on a real phone this is the PC's LAN IP, not `localhost`
- Compress and resize images before upload
- Loading, empty and error states on every screen

## 4. Docker and CI files

| File | Notes |
|---|---|
| `api/Dockerfile` | Multi-stage (build, then slim runtime with prod deps only), non-root user, `HEALTHCHECK` |
| `docker-compose.yml` | Services: `api`, `mongo`; named volumes for Mongo data and uploads; env from `.env`; healthcheck-gated `depends_on` |
| `Jenkinsfile` | Declarative: Checkout, Install (`npm ci`), Lint, Test (JUnit + coverage published), Build image; runs in the `api` directory |
| `jenkins/docker-compose.jenkins.yml` | Jenkins LTS container with Docker socket mounted, persistent volume |

Mobile is not built in Jenkins (Expo builds need EAS); optionally lint + test the mobile package as a parallel stage.

## 5. Config and repo hygiene

- `.gitignore`: `node_modules`, `dist`, `.env*` (but keep `.env.example`), `uploads/*` (keep `.gitkeep`), `coverage`, `.expo`, OS/editor files
- `.editorconfig`, shared Prettier settings (single quotes, trailing commas, 100 cols)
- `.env.example` files: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `ANTHROPIC_API_KEY`, `TYPESAFE_API_KEY`, `CORS_ORIGIN`, `PORT`; mobile: `EXPO_PUBLIC_API_URL`
- Conventional commits (`feat:`, `fix:`, `chore:`), feature branches, PR template with a Definition of Done checklist
- Pin Node version (`.nvmrc`, `engines`), commit lockfiles
- Never commit real receipts or API keys; demo uses synthetic receipts

## 6. Starter files that get created on scaffold (Sprint 1, Week 1 foundation)

The first scaffold creates only the minimum to run: root files (`.gitignore`, `.editorconfig`, `README` stub, docs/agile stubs), the `api/` config files, `src/server.ts`, `app.ts`, `config/`, the three models, auth routes/controller/service/middleware, error handler, `/health`, `tests/setup.ts` plus an auth test, and `docker-compose.yml` with Mongo only. `mobile/`, the Dockerfile, the Jenkinsfile and the other endpoints come in their planned sessions (see docs/agile/sprint-1.md), so each commit is meaningful.

## 7. Decisions (all confirmed by Aditya)

Confirmed: Expo Router, TanStack Query, Mongoose, pino logging, npm, single monorepo. The original options and rationale are kept below.

1. **Expo Router vs React Navigation.** I recommend Expo Router (the Expo default, simpler file-based setup). React Navigation is more commonly seen in existing codebases.
2. **TanStack Query** for mobile data fetching, instead of hand-rolled `useEffect` fetching. Recommended.
3. **Mongoose** (as planned) vs the native MongoDB driver. Mongoose is more common and gives schemas and validation.
4. **Logging with pino.** Small addition; skip if you want fewer dependencies.
5. **Package manager:** npm (assumed). Say so if you prefer pnpm or yarn.
6. **Monorepo vs two repos.** I recommend one repo, since recruiters see everything in one place.

Once you've reviewed this, tell me what to change and when to scaffold.
