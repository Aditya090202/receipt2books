/**
 * Category model.
 * Task: S1-T05 | Story: US-01 (default categories), US-05
 *
 * Fields:
 *   - userId: ObjectId ref User, required
 *   - name: string, required
 *   - description: string, required: what belongs in this category, in plain words
 *       (sent to Jev as this option's criteria, so clearer descriptions mean better category choices)
 *   - color: string (hex, used by the chart in Sprint 2)
 *   - isDefault: boolean (seeded on registration)
 *
 * Indexes:
 *   - unique on { userId, name } so a user can't have duplicate category names
 *
 * TODO (S1-T05): define the schema and model
 */
