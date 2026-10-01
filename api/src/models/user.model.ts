/**
 * User model.
 * Task: S1-T05 | Story: US-01
 *
 * Fields:
 *   - email: string, required, unique, lowercase, trimmed
 *   - passwordHash: string, required, never returned in API responses
 *   - name: string
 *   - createdAt / updatedAt: Mongoose timestamps
 *
 * Indexes:
 *   - unique on email
 *
 * TODO (S1-T05): define the schema and model; make sure passwordHash is excluded from JSON output
 */
