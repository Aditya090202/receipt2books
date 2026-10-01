# Product Backlog

The product backlog is the ordered list of everything the product might need. The top items are refined enough to pull into a sprint, and lower items can stay rough. On a team, the Product Owner owns this list. Here you play that role.

## How to read a story

- **Format:** As a *<user>*, I want *<capability>* so that *<benefit>*.
- **Acceptance criteria (AC):** testable conditions that must all be true for the story to count as done. Written as Given / When / Then where it helps.
- **Story points:** relative effort on a Fibonacci scale (1, 2, 3, 5, 8). They compare stories against each other and are not hours. A 5 is roughly "bigger and riskier than a 3".
- **Priority:** Must / Should / Could (MoSCoW).

## Personas

- **Sam, freelancer:** collects paper receipts and wants them categorised for tax time without typing.

---

## Epic A: Accounts and security

### US-01 Register an account (3 pts, Must)
As Sam, I want to create an account with my email and password so that my receipts are private to me.
- AC1: Given a new email and a password of 8+ characters, when I register, then an account is created and I am logged in.
- AC2: Given an email that already exists, when I register, then I see "email already in use" and no account is created.
- AC3: Passwords are stored hashed, never in plain text.
- AC4: A default set of categories is created for my account.

### US-02 Log in and stay logged in (3 pts, Must)
As Sam, I want to log in and stay logged in on my phone so that I don't type my password every time.
- AC1: Given valid credentials, when I log in, then I receive a token and land on my receipt list.
- AC2: Given invalid credentials, then I see a generic "invalid email or password" message.
- AC3: The token is kept in secure storage; reopening the app keeps me logged in until it expires.
- AC4: I can log out, which clears the token.

### US-03 My data is isolated (2 pts, Must)
As Sam, I want only my own receipts to be visible to me so that my finances stay private.
- AC1: Any request without a valid token to a protected endpoint returns 401.
- AC2: Requesting another user's receipt by id returns 404 (it does not reveal that it exists).
- AC3: An automated test covers AC2.

## Epic B: Expense list

### US-04 See my receipts (3 pts, Must)
As Sam, I want to see a list of my receipts, newest first, so that I can review my spending.
- AC1: The list shows vendor, date, total and category for each receipt.
- AC2: I can pull to refresh.
- AC3: With no receipts, I see an empty state that tells me how to add one.
- AC4: The API paginates results and can filter by month and category.

### US-05 Add a receipt manually (2 pts, Must)
As Sam, I want to enter a receipt by hand so that I can log expenses without a photo.
- AC1: Vendor, date, total and category are required; total must be a positive number.
- AC2: Invalid input shows a field-level error and nothing is saved.
- AC3: The new receipt appears in my list immediately.

### US-06 Delete a receipt (1 pt, Should)
As Sam, I want to delete a receipt so that mistakes and duplicates don't skew my totals.
- AC1: Deleting asks for confirmation.
- AC2: After deleting, the receipt is gone from the list and the report.

## Epic C: AI receipt capture

### US-07 Snap a receipt and have it filled in (8 pts, Must)
As Sam, I want to photograph a receipt and have vendor, date, total and category filled in automatically so that I don't type anything.
- AC1: I can take a photo with the camera or pick one from my gallery.
- AC2: The image is compressed before upload; files over the size limit or of the wrong type are rejected with a clear message.
- AC3: Within ~10 seconds I see the parsed receipt with vendor, date, total, currency and a suggested category.
- AC4: The suggested category is one of my categories, or "Uncategorized".
- AC5: If the AI response is invalid or the AI call fails, I see an error and can retry or enter the receipt manually.
- AC6: Automated tests cover success, malformed AI output and AI failure, with the AI mocked.

### US-08 Correct the AI's parse (5 pts, Must)
As Sam, I want to review and fix what the AI extracted so that my expense records are accurate.
- AC1: Every parsed field is editable on the receipt screen, next to a thumbnail of the photo.
- AC2: Fields the AI was not confident about are highlighted.
- AC3: Tapping Confirm saves my edits and marks the receipt as confirmed.
- AC4: The list shows which receipts are still unconfirmed.

## Epic D: Insights

### US-09 See monthly spending by category (5 pts, Must)
As Sam, I want a chart of this month's spending by category so that I know where my money goes.
- AC1: I can switch between months.
- AC2: The chart shows each category's total and share, plus the month's overall total.
- AC3: Totals match the sum of the receipts in that month (covered by an API test).
- AC4: Adding, editing or deleting a receipt updates the chart.

### US-15 See this month's total at a glance (1 pt, Should)
As Sam, I want to see how much I've spent this month at the top of my expense list so that I don't have to open the Reports screen.
- AC1: The expense list shows a header with this month's total spent and number of receipts.
- AC2: The header updates after adding, editing or deleting a receipt.
- AC3: Uses the existing monthly report endpoint (no new API).

## Epic E: Engineering enablers

Enablers are technical stories with no direct user value but needed to deliver it. Writing them as stories keeps them visible on the board.

### EN-01 Containerised API + image build in Jenkins (5 pts, Must)
As a developer, I want the API and database to run with one command, and the image built in CI, so that anyone can run the project and every build is shippable.
- AC1: `docker compose up` starts the API and MongoDB on a fresh clone with only a `.env` file added.
- AC2: The API image runs as a non-root user and has a healthcheck.
- AC3: The Jenkins pipeline has a Build image stage after Test.
- AC4: A failing test fails the build (demonstrated with a deliberate red run), with screenshots of red and green runs.

### EN-02 CI pipeline in Jenkins: lint and test (3 pts, Must)
As a developer, I want every push to be linted and tested automatically so that broken code is caught early.
- AC1: Jenkins runs locally in Docker and is connected to the GitHub repo.
- AC2: The pipeline runs Install, Lint and Test stages from a `Jenkinsfile` in the repo.
- AC3: Test results are published in Jenkins (JUnit report).

### EN-03 Live deployment (3 pts, Must)
As a recruiter, I want to reach a live API so that I can see the project actually runs.
- AC1: The API is deployed on Render with MongoDB Atlas; `/health` returns 200.
- AC2: The mobile app works end to end against the deployed API.

### EN-04 Portfolio-ready README and demo (2 pts, Must)
As a hiring manager, I want a clear README and demo video so that I can understand the project in two minutes.
- AC1: README has a pitch, screenshots, architecture diagram, setup steps, API summary and design decisions.
- AC2: A 60 to 90 second demo video is linked.

---

## Sprint allocation

| Sprint | Stories | Points |
|---|---|---|
| [Sprint 1](sprint-1.md) (Oct 1 – Oct 14) | US-01, US-02, US-03, US-04, US-05, US-07, EN-02 | 24 |
| [Sprint 2](sprint-2.md) (Oct 15 – Oct 28) | US-06, US-08, US-09, US-15, EN-01, EN-03, EN-04 | 22 |

## Future work (not planned in Sprints 1–2)

| ID | Story | Pts | Priority |
|---|---|---|---|
| US-16 | See a 6-month spending trend chart (new aggregation endpoint + bar chart) | 3 | Could |
| US-14 | Export confirmed receipts to QuickBooks Online (OAuth 2.0, map categories to expense accounts) | 8 | Should |
| US-10 | Create and edit my own categories in the app | 3 | Could |
| US-11 | Export a month to CSV for my accountant | 3 | Could |
| US-12 | Extract line items from receipts | 8 | Could |
| US-13 | Convert foreign currencies to my home currency | 5 | Could |
| EN-05 | Refresh tokens | 3 | Could |
| EN-06 | Store images in cloud object storage | 3 | Could |
