/**
 * Validation middleware: validates body, query and params with zod schemas.
 * Task: S1-T10 | Stories: US-05 (field-level errors)
 *
 *   - takes schemas from validators/*.schema.ts
 *   - on success, replaces the request data with the parsed (typed, coerced) values
 *   - on failure, responds 400 with code VALIDATION_ERROR and per-field details
 *
 * TODO (S1-T10): implement (auth routes in S1-T06 can use it as soon as it exists)
 */
