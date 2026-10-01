/**
 * Receipt model: one expense in the user's expense list.
 * Task: S1-T05 | Stories: US-04, US-05, US-07, US-08
 *
 * Fields:
 *   - userId: ObjectId ref User, required
 *   - vendor: string, required
 *   - date: Date, required
 *   - total: number, required, positive (decide: store as a decimal number or integer cents)
 *   - currency: string, ISO 4217 code, default from config (e.g. "USD")
 *   - categoryId: ObjectId ref Category
 *   - imagePath: string, optional (set by the parse flow in S1-T15)
 *   - status: "parsed" | "confirmed" (manual entries start as "confirmed")
 *   - parseConfidence: number 0–1, optional
 *   - rawLlmOutput: mixed/object, optional (kept for debugging the parser)
 *   - createdAt / updatedAt: Mongoose timestamps
 *
 * Indexes:
 *   - { userId, date } for the list (newest first) and monthly reports
 *
 * TODO (S1-T05): define the schema and model
 */
