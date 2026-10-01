/**
 * Rate limiting for sensitive routes (register, login).
 * Task: S1-T07 | Story: US-02
 *
 *   - express-rate-limit, e.g. a small number of attempts per IP per window
 *   - respond 429 using the standard error format
 *   - disabled or relaxed when NODE_ENV=test so tests aren't throttled
 *
 * TODO (S1-T07): implement
 */
