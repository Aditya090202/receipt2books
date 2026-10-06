# Receipt2Books: 4-Week Plan

Dates: Thu 2026-10-01 to Wed 2026-10-28.
Pace: 1 to 2 hours a day, about 46 hours total, run as two 2-week sprints.
See [PROJECT_DEFINITION.md](PROJECT_DEFINITION.md) for scope, stack and API, and [docs/agile/](docs/agile/) for the backlog and sprint details.

## Roadmap

| Week | Dates | Sprint | Milestone at the end of the week |
|---|---|---|---|
| 1 | Oct 1 – Oct 7 | Sprint 1 | API with JWT auth, MongoDB models and tested receipt CRUD |
| 2 | Oct 8 – Oct 14 | Sprint 1 | Jenkins runs lint + tests; Expo app logs in, lists receipts, and snaps a receipt that Claude parses |
| 3 | Oct 15 – Oct 21 | Sprint 2 | Edit/confirm flow, delete, monthly chart, monthly total header; Dockerfile + compose |
| 4 | Oct 22 – Oct 28 | Sprint 2 | Jenkins builds the image; live on Render; README, demo video, resume updated |

The order puts the headline feature (AI capture) and Jenkins in the first two weeks, so the repo is worth showing by mid-October even if later work slips.

| Sprint | Goal | Stories | Points |
|---|---|---|---|
| [Sprint 1](docs/agile/sprint-1.md) | Snap a receipt and see it parsed in the expense list; every push linted and tested in Jenkins | US-01–05, US-07, EN-02 | 24 |
| [Sprint 2](docs/agile/sprint-2.md) | Correct parses, see monthly spending; containerised, deployed, portfolio-ready | US-06, US-08, US-09, US-15, EN-01, EN-03, EN-04 | 22 |

## Each session

1. 2 to 3 min: standup entry in `docs/agile/standups.md` (last session / this session / blockers)
2. Work on one task in a `feature/*` branch
3. Before stopping: commit, push, open or merge the PR, move the board card, note the next task
4. If a session runs short, stop at a clean commit rather than half-finishing a task

Short sessions make context switching the main cost. Ending each session with a note on the exact next step makes the next one start fast.

## Applying

Apply to the Intuit role now rather than waiting for the project. List the repo on your resume as in progress; daily commits and a visible sprint board are fine to show. Update the resume and LinkedIn when Sprint 2 ships.

## Resume and application output (end of Sprint 2)

Draft bullets (fill in real numbers):
- Built Receipt2Books, a cross-platform React Native (Expo) expense tracker with a Node/Express REST API and MongoDB; users photograph receipts, Claude extracts the vendor, date and total, and Jev (TypeSafe AI) picks the category with a confidence score, feeding an expense list with monthly spending charts.
- Designed an AI pipeline that separates extraction (structured-output LLM with schema validation) from classification (calibrated confidence), with rule-based review flags and a human-in-the-loop confirm step; N% of test receipts confirmed without edits.
- Containerised the API with Docker and built a Jenkins CI pipeline (lint, test, image build); deployed to Render with MongoDB Atlas.
- Ran the project in two 2-week Scrum sprints with user stories, story points, a burndown, sprint reviews and retrospectives.

Keyword map to the JD: React Native (mobile track), Express + MongoDB (backend track), Jenkins + Git + Agile/Scrum (fullstack track), REST APIs, GenAI, cloud/SaaS.

## Next (backlog after Sprint 2)

- Item prices on receipts (US-12), the first candidate if Sprint 2 finishes early
- Custom categories in the app, CSV export, 6-month trend chart, multi-currency
