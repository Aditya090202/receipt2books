/**
 * Logger: a single pino instance shared across the app.
 * Task: S1-T03
 *
 *   - level from env.LOG_LEVEL
 *   - pretty output in development, JSON in production (Render and Jenkins read JSON logs well)
 *   - silent when NODE_ENV=test
 *   - never logs passwords, tokens or the Authorization header (redaction)
 */
import pino from 'pino';
import { env } from '../config/env';

export const logger = pino({
  level: env.NODE_ENV === 'test' ? 'silent' : env.LOG_LEVEL,
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'password',
      '*.password',
      'token',
      '*.token',
    ],
    censor: '[redacted]',
  },
  // pino-pretty is a dev dependency, so it is only used in development.
  transport:
    env.NODE_ENV === 'development'
      ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } }
      : undefined,
});
