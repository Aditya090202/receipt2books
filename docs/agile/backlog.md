# Product Backlog

The product backlog is the ordered list of everything the product might need. The top items are refined enough to pull into a sprint, and lower items can stay rough. On a team, the Product Owner owns this list. Here you play that role.

## How to read a story

- **Format:** As a *<user>*, I want *<capability>* so that *<benefit>*.
- **Acceptance criteria (AC):** testable conditions that must all be true for the story to count as done. Written as Given / When / Then where it helps.
- **Story points:** relative effort on a Fibonacci scale (1, 2, 3, 5, 8). They compare stories against each other and are not hours. A 5 is roughly "bigger and riskier than a 3".
- **Priority:** Must / Should / Could (MoSCoW).

## Personas

- **Sam, everyday spender:** pays for groceries, meals out, transport and shopping, ends up with a pile of paper receipts, and wants to know where their money goes each month without typing anything in.

---

## Epic A: Accounts and security

### US-01 Register an account (3 pts, Must)
As Sam, I want to create an account with my email and password so that my receipts are private to me.
- AC1: Given a new email and a password of 8+ characters, when I register, then an account is created and I am logged in.
- AC2: Given an email that already exists, when I register, then I see "email already in use" and no account is created.
- AC3: Passwords are stored hashed, never in plain text.
- AC4: A default set of categories, each with a short description of what belongs in it, is created for my account (the descriptions guide the AI's category choice).

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
- AC3: Within ~10 seconds I see the parsed receipt with vendor, date, total and currency read from the photo by Claude; anything Claude can't read is left empty, not guessed.
- AC4: The category is chosen from my own categories by Jev (TypeSafe); its confidence score and who chose it (Jev, Claude or me) are saved on the receipt; if nothing fits, it is "Uncategorized".
- AC5: The parsed receipt is saved straight away with status "parsed" (needs review), so nothing is lost if I close the app before reviewing it.
- AC6: If Claude's response is invalid or the call fails, I see an error and can retry or enter the receipt manually. If Jev fails or takes longer than about 3 seconds, the category Claude suggested during extraction is used instead and shown as "suggested"; if neither works, the receipt is saved as "Uncategorized" with the category flagged for review.
- AC7: The classifier can be changed with one config setting (`CATEGORY_CLASSIFIER`: `jev`, `claude` or `none`) and a restart, with no code change.
- AC8: Automated tests cover success, malformed Claude output, Claude failure, Jev failure falling back to Claude, and the switch set to `claude`, with both services mocked.

### US-08 Correct the AI's parse (5 pts, Must)
As Sam, I want to review and fix what the AI extracted so that my expense records are accurate.
- AC1: Every parsed field is editable on the receipt screen, next to a thumbnail of the photo.
- AC2: Fields that need checking are highlighted with a reason: vendor missing; total not a positive number or not matching subtotal + tax; date invalid, in the future or over a year old; category confidence below 0.5.
- AC3: A category with confidence from 0.5 to 0.9, or one chosen by the backup (Claude), is shown as "suggested"; 0.9 or above is shown normally (starting thresholds, kept in config and tuned after testing sample receipts).
- AC4: Tapping Confirm saves my edits, marks the receipt as confirmed and clears its review flags.
- AC5: The list shows which receipts still need review.

## Epic D: Insights

### US-09 See monthly spending by category (5 pts, Must)
As Sam, I want a chart of this month's spending by category so that I know where my money goes.
- AC1: I can switch between months.
- AC2: The chart shows each category's total and share, plus the month's overall total.
- AC3: Only confirmed receipts are counted; the screen shows how many receipts that month still need review.
- AC4: Totals match the sum of the confirmed receipts in that month (covered by an API test).
- AC5: Adding, confirming, editing or deleting a receipt updates the chart.

### US-15 See this month's total at a glance (1 pt, Should)
As Sam, I want to see how much I've spent this month at the top of my expense list so that I don't have to open the Reports screen.
- AC1: The expense list shows a header with this month's total spent (confirmed receipts) and number of receipts, plus how many need review.
- AC2: The header updates after adding, confirming, editing or deleting a receipt.
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
As Sam, I want the app to work wherever I am, not just on my home Wi-Fi, so that I can snap receipts right after I pay.
- AC1: The API is deployed on Render with MongoDB Atlas; `/health` returns 200.
- AC2: The mobile app works end to end against the deployed API.

### EN-04 Clear README and demo video (2 pts, Must)
As a developer discovering the project, I want a clear README and demo video so that I can understand what it does and run it myself within a few minutes.
- AC1: README has a pitch, screenshots, architecture diagram, setup steps, API summary and design decisions.
- AC2: A 60 to 90 second demo video is linked.

---

## Sprint allocation

| Sprint | Stories | Points |
|---|---|---|
| [Sprint 1](sprint-1.md) (Oct 7 – Oct 20) | US-01, US-02, US-03, US-04, US-05, US-07, EN-02 | 24 |
| [Sprint 2](sprint-2.md) (Oct 21 – Nov 3) | US-06, US-08, US-09, US-15, EN-01, EN-03, EN-04 | 22 |

## Future work (not planned in Sprints 1–2)

| ID | Story | Pts | Priority |
|---|---|---|---|
| US-16 | See a 6-month spending trend chart (new aggregation endpoint + bar chart) | 3 | Could |
| US-10 | Create and edit my own categories in the app | 3 | Could |
| US-11 | Export a month of expenses to CSV to use in a spreadsheet | 3 | Could |
| US-12 | See the price of each item on a receipt (refined below) | 5 | Should |
| US-13 | Convert foreign currencies to my home currency | 5 | Could |
| EN-05 | Refresh tokens | 3 | Could |
| EN-06 | Store images in cloud object storage | 3 | Could |

### Refined future stories

Future stories get acceptance criteria once they're likely to be pulled into a sprint (backlog refinement).

### US-12 See the price of each item on a receipt (5 pts, Should)
As Sam, I want each item on a receipt saved with its price so that I can see exactly what I paid for, not just the total.
- AC1: When a receipt is parsed, Claude also returns the line items it can read: description, quantity and price for each (tax and totals are not items; discounts are negative items).
- AC2: Line items are stored on the receipt; a receipt with no readable items still saves normally.
- AC3: If the item prices don't add up to the subtotal (within a small rounding margin), the line items are flagged for review.
- AC4: The receipt screen lists the items with their prices, and I can edit, add or delete an item before confirming.
- AC5: Automated tests cover a receipt with items, one with none, and one whose items don't add up (Claude mocked).
