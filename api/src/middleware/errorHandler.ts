/**
 * Central error handler: the only place that formats error responses.
 * Task: S1-T07
 *
 * Response shape for every error:
 *   { "error": { "code": string, "message": string, "details"?: unknown } }
 *
 *   - AppError (utils/AppError.ts) -> its status, code and message
 *   - Mongoose validation / cast errors -> 400
 *   - Mongo duplicate key -> 409
 *   - anything else -> 500 with a generic message; log the real error, never leak stack traces
 *
 * Also export a notFound handler for unknown routes (404).
 *
 * TODO (S1-T07): implement
 */
