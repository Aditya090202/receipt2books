# Sprint 2: Correction, insights and shipping

| | |
|---|---|
| Dates | Thu 2026-10-15 to Wed 2026-10-28 (2 weeks, 14 sessions) |
| Team | Aditya (Product Owner, Scrum Master and Developer) |
| Capacity | 1 to 2 hours/day, about 22 hours total |
| Planned | 7 stories, 22 points (draft, finalised in Sprint 2 planning) |

> This is a draft. In real Scrum, the next sprint is planned after the previous sprint's review and retro, using what you learned. Revisit it in Sprint 1, session 14: carry over unfinished stories and adjust the plan to your actual velocity.

## Sprint goal

> Users can correct the AI's parse and see monthly spending by category, and the project is containerised, built in Jenkins, live on Render and portfolio-ready.

## Definition of Done

Same as [Sprint 1](sprint-1.md#definition-of-done-applies-to-every-story), plus: README updated for any user-visible change.

## Stories in this sprint

| ID | Story | Pts |
|---|---|---|
| US-08 | Correct the AI's parse | 5 |
| US-06 | Delete a receipt | 1 |
| US-09 | See monthly spending by category | 5 |
| US-15 | See this month's total at a glance | 1 |
| EN-01 | Containerised API + image build in Jenkins | 5 |
| EN-03 | Live deployment | 3 |
| EN-04 | Portfolio-ready README and demo | 2 |
| | **Total** | **22** |

## Sprint backlog by session

### Week 3: Correction flow and insights

| Session | Task | Description | Story | Est. |
|---|---|---|---|---|
| 1 Thu 10-15 | S2-T01 | Sprint planning: carry-overs, confirm goal and capacity | – | 0.5h |
| | S2-T02 | Receipt detail/edit screen with photo thumbnail, editable fields | US-08 | 1h |
| 2 Fri 10-16 | S2-T03 | Low-confidence highlighting; Confirm sets `status: confirmed`; unconfirmed badge in list | US-08 | 1.5h |
| 3 Sat 10-17 | S2-T04 | Delete with confirmation; query invalidation so the list updates after edits | US-06, US-08 | 1.5h |
| 4 Sun 10-18 | S2-T05 | `GET /reports/monthly` aggregation + tests (totals match receipts) | US-09 | 2h |
| 5 Mon 10-19 | S2-T06 | Reports screen: chart by category with totals | US-09 | 1.5h |
| 6 Tue 10-20 | S2-T07 | Month switcher; chart updates after add/edit/delete | US-09 | 1.5h |
| | S2-T08 | Monthly total header on the expense list (reuses report endpoint) | US-15 | 0.5h |
| 7 Wed 10-21 | S2-T09 | Multi-stage Dockerfile (non-root, healthcheck); compose with API + Mongo | EN-01 | 1.5h |

**Week 3 checkpoint:** full user loop works on the phone: snap, correct, see the monthly total and chart.

### Week 4: Ship it

| Session | Task | Description | Story | Est. |
|---|---|---|---|---|
| 8 Thu 10-22 | S2-T10 | Jenkins Build image stage; deliberate red run, then green; screenshots | EN-01 | 1.5h |
| 9 Fri 10-23 | S2-T11 | MongoDB Atlas + Render deploy; env vars; `/health` live | EN-03 | 1.5h |
| 10 Sat 10-24 | S2-T12 | Point the app at the deployed API; end-to-end retest; fixes | EN-03 | 2h |
| 11 Sun 10-25 | S2-T13 | Screenshots and 60 to 90 second demo video | EN-04 | 2h |
| 12 Mon 10-26 | S2-T14 | README: pitch, architecture diagram, setup, API summary, design decisions, what's next | EN-04 | 1.5h |
| 13 Tue 10-27 | S2-T15 | Buffer: overruns, bugs, cleanup (no secrets, pinned versions) | – | 1.5h |
| 14 Wed 10-28 | S2-T16 | Sprint review + project retro; update resume, LinkedIn; pin repo | – | 1h |

## Burndown

| Session | Ideal remaining | Actual remaining |
|---|---|---|
| Start | 22 | 22 |
| 1 | 20 | |
| 2 | 19 | |
| 3 | 17 | |
| 4 | 16 | |
| 5 | 14 | |
| 6 | 13 | |
| 7 | 11 | |
| 8 | 9 | |
| 9 | 8 | |
| 10 | 6 | |
| 11 | 5 | |
| 12 | 3 | |
| 13 | 2 | |
| 14 | 0 | |

## Scope rules

- If behind at the Week 3 checkpoint, cut in this order: monthly total header (US-15), low-confidence highlighting (US-08 AC2), month switcher (show current month only), chart polish.
- Never cut: US-08 confirm flow, EN-01, EN-03, EN-04. Deployment and the README are what recruiters actually see.
