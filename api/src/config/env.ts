/**
 * Environment config, validated at startup.
 * Task: S1-T03
 *
 * Fail fast: if a required variable is missing or invalid, the process exits with a clear message
 * instead of failing later at runtime.
 *
 * Variables (see api/.env.example):
 *   NODE_ENV, PORT, LOG_LEVEL, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN,
 *   ANTHROPIC_API_KEY (optional until S1-T15)
 *
 * TODO (S1-T03): load .env, validate with a zod schema, export a typed `env` object
 */
