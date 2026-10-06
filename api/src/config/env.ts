/**
 * Environment config, validated at startup.
 * Task: S1-T03
 *
 * Fail fast: if a required variable is missing or invalid, the process exits with a clear message
 * instead of failing later at runtime.
 *
 * Variables (see api/.env.example):
 *   NODE_ENV, PORT, LOG_LEVEL, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN,
 *   ANTHROPIC_API_KEY (optional until S1-T15), TYPESAFE_API_KEY (optional until S1-T16),
 *   CATEGORY_FLAG_BELOW and CATEGORY_SUGGESTED_BELOW (numbers 0–1, defaults 0.5 and 0.9),
 *   CATEGORY_CLASSIFIER ("jev" | "claude" | "none", default "jev"), JEV_TIMEOUT_MS (default 3000)
 *
 * Cross-field rule: CATEGORY_CLASSIFIER=jev requires TYPESAFE_API_KEY.
 *
 * TODO (S1-T03): load .env, validate with a zod schema, export a typed `env` object
 */
