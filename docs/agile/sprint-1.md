# Sprint 1: Core API, CI and AI capture

| | |
|---|---|
| Dates | Thu 2026-10-01 to Wed 2026-10-14 (2 weeks, 14 sessions) |
| Team | Aditya (Product Owner, Scrum Master and Developer) |
| Capacity | 1 to 2 hours/day, about 21 hours total |
| Planned | 7 stories, 24 points |

## Sprint goal

> A logged-in user can photograph a receipt on their phone and see the AI-parsed receipt in their expense list, with every push linted and tested in Jenkins.

The sprint goal is the one sentence you defend when things slip. If a task does not serve it, it waits.

## Definition of Done (applies to every story)

- [ ] All acceptance criteria met and checked by hand
- [ ] Code merged to `main` through a PR from a `feature/*` branch
- [ ] Lint passes, and tests pass, with new tests for new API behaviour
- [ ] No secrets committed; `.env.example` updated if config changed
- [ ] API docs (`docs/api.md`) updated if endpoints changed
- [ ] Board card moved to Done

## Stories in this sprint

| ID | Story | Pts |
|---|---|---|
| US-01 | Register an account | 3 |
| US-02 | Log in and stay logged in | 3 |
| US-03 | My data is isolated | 2 |
| US-04 | See my receipts | 3 |
| US-05 | Add a receipt manually | 2 |
| EN-02 | CI pipeline in Jenkins (lint + test) | 3 |
| US-07 | Snap a receipt and have it filled in | 8 |
| | **Total** | **24** |

Full acceptance criteria are in the [product backlog](backlog.md).

## Sprint backlog by session

One session = one day's 1 to 2 hours. Task IDs (e.g. `S1-T05`) go in branch names and commit messages, e.g. `feature/S1-T05-auth` and `feat(auth): register and login (S1-T05)`. Hour estimates are rough; weekend sessions can absorb overruns.

### Week 1: Backend foundation

| Session | Task | Description | Story | Est. |
|---|---|---|---|---|
| 1 Thu 10-01 | S1-T01 | Sprint planning: review backlog and this file, set up GitHub Project board | – | 0.5h |
| | S1-T02 | Repo + `api/` scaffold: TypeScript, ESLint, Prettier, Jest | – | 1h |
| 2 Fri 10-02 | S1-T03 | Env validation, `app.ts`/`server.ts`, `/health`, logger | – | 1.5h |
| 3 Sat 10-03 | S1-T04 | `docker-compose.yml` with MongoDB; Mongoose connection | – | 0.5h |
| | S1-T05 | User, Category, Receipt models with indexes | US-01 | 1h |
| 4 Sun 10-04 | S1-T06 | Register, login, `GET /auth/me`; bcrypt, JWT; seed default categories | US-01, US-02 | 2h |
| 5 Mon 10-05 | S1-T07 | Auth middleware, error handler, rate limit on auth routes | US-02, US-03 | 1h |
| | S1-T08 | Auth tests: register, duplicate email, login success/failure, 401 | US-01–03 | 0.5h |
| 6 Tue 10-06 | S1-T09 | Receipt CRUD + category list/create, scoped by user, pagination and filters | US-04, US-05 | 1.5h |
| 7 Wed 10-07 | S1-T10 | zod validation middleware; CRUD tests incl. cross-user 404; `docs/api.md` | US-03–05 | 1.5h |

**Week 1 checkpoint:** API with auth and receipt CRUD, tested from curl/Postman. About 11 points done.

### Week 2: CI, mobile app and AI capture

| Session | Task | Description | Story | Est. |
|---|---|---|---|---|
| 8 Thu 10-08 | S1-T11 | Jenkins in Docker; Jenkinsfile with Install, Lint, Test (JUnit); first green run | EN-02 | 1.5h |
| 9 Fri 10-09 | S1-T12 | `mobile/` scaffold: Expo Router, TanStack Query; API client; SecureStore + AuthContext | US-02 | 1.5h |
| 10 Sat 10-10 | S1-T13 | Login and register screens; run on phone via Expo Go (LAN IP) | US-01, US-02 | 2h |
| 11 Sun 10-11 | S1-T14 | Receipt list (pull to refresh, empty state) and manual add form | US-04, US-05 | 2h |
| 12 Mon 10-12 | S1-T15 | `POST /receipts/parse`: multer limits, disk storage, Claude parser with JSON schema + zod + one retry | US-07 | 1.5h |
| 13 Tue 10-13 | S1-T16 | Category mapping; parse tests with LLM mocked (success, malformed, failure) | US-07 | 1h |
| | S1-T17 | App: camera/gallery picker, compression, upload with loading and error states | US-07 | 1h |
| 14 Wed 10-14 | S1-T18 | Try 8 to 10 sample receipts, note accuracy; fixes | US-07 | 0.5h |
| | S1-T19 | Sprint review + retro in [retro.md](retro.md); plan Sprint 2 | – | 1h |

**End of sprint:** a demoable headline feature. You can snap a receipt and see it in the list.

## Board columns

`Backlog` | `To Do (this sprint)` | `In Progress` (limit 2) | `In Review (PR open)` | `Done`

The work-in-progress limit of 2 keeps you finishing tasks before starting new ones.

## Scrum events, scaled down for one person

| Event | Real team | This sprint |
|---|---|---|
| Sprint planning | 2 to 4 hours with the team: pick stories, agree on the goal | 30 min in session 1 (S1-T01) |
| Daily standup | 15 min: yesterday, today, blockers | 2 to 3 min written entry in [standups.md](standups.md) at the start of each session |
| Backlog refinement | Ongoing: split and estimate upcoming stories | When a task turns out bigger than expected, split it and note why |
| Sprint review | Demo to stakeholders, collect feedback | Session 14: screen-record the snap-to-expense-list flow, list what met the DoD |
| Retrospective | What went well, what didn't, what to change | Session 14: half page in [retro.md](retro.md); feed changes into Sprint 2 |

## Burndown

Record remaining points at the end of each session. A story's points only burn when the whole story meets the DoD, so the actual line will move in steps.

| Session | Ideal remaining | Actual remaining |
|---|---|---|
| Start | 24 | 24 |
| 1 | 22 | |
| 2 | 21 | |
| 3 | 19 | |
| 4 | 17 | |
| 5 | 15 | |
| 6 | 14 | |
| 7 | 12 | |
| 8 | 10 | |
| 9 | 9 | |
| 10 | 7 | |
| 11 | 5 | |
| 12 | 3 | |
| 13 | 2 | |
| 14 | 0 | |

## Scope rules

- New ideas go to the product backlog, not this sprint.
- If behind at the Week 1 checkpoint, move the manual add form in the app (part of US-05) to Sprint 2. Never cut US-07 or EN-02.
- Unfinished stories go back to the backlog and are re-planned in Sprint 2; note them in the retro.
