/**
 * Logger: a single pino instance shared across the app.
 * Task: S1-T03
 *
 *   - level from env.LOG_LEVEL
 *   - pretty output in development, JSON in production (Render and Jenkins read JSON logs well)
 *   - silent or minimal when NODE_ENV=test
 *   - never log passwords, tokens or the Authorization header (use redaction)
 *
 * TODO (S1-T03): implement
 */
