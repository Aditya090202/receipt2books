# Receipt2Books: 4-Week Plan

Dates: Wed 2026-10-07 to Tue 2026-11-03.
Pace: 1 to 2 hours a day, about 47 hours total, run as two 2-week sprints.
See [PROJECT_DEFINITION.md](PROJECT_DEFINITION.md) for scope, stack and API, and [docs/agile/](docs/agile/) for the backlog and sprint details.

## Roadmap

| Week | Dates | Sprint | Milestone at the end of the week |
|---|---|---|---|
| 1 | Oct 7 – Oct 13 | Sprint 1 | API with JWT auth, MongoDB models and tested receipt CRUD |
| 2 | Oct 14 – Oct 20 | Sprint 1 | Jenkins runs lint + tests; Expo app logs in, lists receipts, and snaps a receipt that Claude parses |
| 3 | Oct 21 – Oct 27 | Sprint 2 | Edit/confirm flow, delete, monthly chart, monthly total header; Dockerfile + compose |
| 4 | Oct 28 – Nov 3 | Sprint 2 | Jenkins builds the image; live on Render; README and demo video |

The order puts the headline feature (AI capture) and Jenkins in the first two weeks, so the repo is worth showing by mid-October even if later work slips.

| Sprint | Goal | Stories | Points |
|---|---|---|---|
| [Sprint 1](docs/agile/sprint-1.md) | Snap a receipt and see it parsed in the expense list; every push linted and tested in Jenkins | US-01–05, US-07, EN-02 | 24 |
| [Sprint 2](docs/agile/sprint-2.md) | Correct parses, see monthly spending; containerised, deployed and documented | US-06, US-08, US-09, US-15, EN-01, EN-03, EN-04 | 22 |

## Each session

1. 2 to 3 min: standup entry in `docs/agile/standups.md` (last session / this session / blockers)
2. Work on one task in a `feature/*` branch
3. Before stopping: commit, push, open or merge the PR, move the board card, note the next task
4. If a session runs short, stop at a clean commit rather than half-finishing a task

Short sessions make context switching the main cost. Ending each session with a note on the exact next step makes the next one start fast.

## Next (backlog after Sprint 2)

- Item prices on receipts (US-12), the first candidate if Sprint 2 finishes early
- Custom categories in the app, CSV export, 6-month trend chart, multi-currency
