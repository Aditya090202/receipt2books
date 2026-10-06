/**
 * Receipt model: one expense in the user's expense list.
 * Task: S1-T05 | Stories: US-04, US-05, US-07, US-08
 *
 * Fields:
 *   - userId: ObjectId ref User, required
 *   - vendor: string (required once confirmed; may be empty on a parsed receipt Claude couldn't read)
 *   - date: Date (same rule as vendor)
 *   - total: number, positive (same rule; decide: store as a decimal number or integer cents)
 *   - currency: string, ISO 4217 code, default from config (e.g. "USD")
 *   - categoryId: ObjectId ref Category
 *   - itemsSummary: string, optional: short text of what was bought (from Claude; used by Jev)
 *   - imagePath: string, optional (set by the parse flow in S1-T15)
 *   - status: "parsed" (needs review) | "confirmed" (manual entries start as "confirmed")
 *   - categorySource: "jev" | "claude" | "user": who chose the category
 *       (manual entries are "user"; becomes "user" when the person changes an AI choice)
 *   - categoryConfidence: number 0–1, only when Jev chose; otherwise null
 *   - reviewFlags: array of { field: "vendor" | "date" | "total" | "category", reason: string },
 *       cleared when the user confirms
 *   - rawAiOutput: object, optional: Claude's extraction and Jev's judgment as returned
 *       (for debugging and accuracy stats, e.g. % confirmed without edits)
 *   - createdAt / updatedAt: Mongoose timestamps
 *
 * Indexes:
 *   - { userId, date } for the list (newest first) and monthly reports
 *     (reports count status "confirmed" only)
 *
 * TODO (S1-T05): define the schema and model
 */
