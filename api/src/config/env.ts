/**
 * Environment config, validated at startup.
 * Task: S1-T03
 *
 * Fail fast: if a required variable is missing or invalid, the process exits with a clear message
 * instead of failing later at runtime. Nothing else in the app should read process.env.
 *
 * Variables (see api/.env.example):
 *   NODE_ENV, PORT, LOG_LEVEL, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN,
 *   ANTHROPIC_API_KEY (optional until S1-T15), TYPESAFE_API_KEY (optional until S1-T16),
 *   CATEGORY_FLAG_BELOW and CATEGORY_SUGGESTED_BELOW (numbers 0–1, defaults 0.5 and 0.9),
 *   CATEGORY_CLASSIFIER ("jev" | "claude" | "none", default "jev"), JEV_TIMEOUT_MS (default 3000)
 *
 * TODO (S1-T16): add the cross-field rule that CATEGORY_CLASSIFIER=jev requires TYPESAFE_API_KEY
 */
import { config } from 'dotenv';
import { z } from 'zod';

// A blank value in .env arrives as "", not undefined.
const optionalSecret = z
  .string()
  .optional()
  .transform((v) => v || undefined);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

  MONGODB_URI: z.string().min(1),

  JWT_SECRET: z.string().min(32, 'must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().min(1),

  // Comma-separated list of allowed origins, e.g. "http://localhost:8081,https://example.com"
  CORS_ORIGIN: z
    .string()
    .min(1)
    .transform((v) =>
      v
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),

  ANTHROPIC_API_KEY: optionalSecret,
  TYPESAFE_API_KEY: optionalSecret,

  CATEGORY_CLASSIFIER: z.enum(['jev', 'claude', 'none']).default('jev'),
  JEV_TIMEOUT_MS: z.coerce.number().int().positive().default(3000),
  CATEGORY_FLAG_BELOW: z.coerce.number().min(0).max(1).default(0.5),
  CATEGORY_SUGGESTED_BELOW: z.coerce.number().min(0).max(1).default(0.9),
});

export type Env = z.infer<typeof envSchema>;

/** Validates raw environment variables. Exported so it can be unit tested without exiting. */
export function parseEnv(source: NodeJS.ProcessEnv) {
  return envSchema.safeParse(source);
}

// Tests get their variables from tests/env.ts, so a developer's .env (and its real API keys)
// never leaks into a test run.
if (process.env.NODE_ENV !== 'test') {
  config({ quiet: true });
}

// safeParse never throws: it returns { success: false, error } when validation fails.
const result = parseEnv(process.env);

if (!result.success) {
  console.error('Invalid environment variables:\n' + z.prettifyError(result.error));
  process.exit(1);
}

export const env: Env = result.data;
