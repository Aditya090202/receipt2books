/**
 * Receipt service: business logic for the expense list.
 * Task: S1-T09 | Stories: US-03, US-04, US-05, US-06
 *
 * Rules:
 *   - every query filters by userId (ownership isolation, US-03)
 *   - a receipt that doesn't exist OR belongs to another user returns 404, never 403
 *     (don't reveal that it exists)
 *   - categoryId must belong to the same user
 *   - list: newest first, paginated, optional month (YYYY-MM), category and status filters
 *   - update: confirming sets status "confirmed" and clears reviewFlags (Sprint 2, US-08)
 *
 * Functions: list, create, getById, update, remove
 *
 * TODO (S1-T09): implement
 */
