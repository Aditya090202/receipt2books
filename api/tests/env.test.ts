/**
 * Environment validation tests.
 * Task: S1-T03
 */
import { parseEnv } from '../src/config/env';

const valid = {
  MONGODB_URI: 'mongodb://localhost:27017/receipt2books',
  JWT_SECRET: 'a-secret-that-is-at-least-32-characters-long',
  JWT_EXPIRES_IN: '7d',
  CORS_ORIGIN: 'http://localhost:8081, https://example.com',
};

describe('parseEnv', () => {
  it('accepts a valid environment and applies defaults', () => {
    const result = parseEnv(valid);

    expect(result.success).toBe(true);
    expect(result.data).toMatchObject({
      NODE_ENV: 'development',
      PORT: 4000,
      LOG_LEVEL: 'info',
      CATEGORY_CLASSIFIER: 'jev',
      CATEGORY_FLAG_BELOW: 0.5,
      CATEGORY_SUGGESTED_BELOW: 0.9,
    });
  });

  it('converts PORT to a number and CORS_ORIGIN to a list', () => {
    const result = parseEnv({ ...valid, PORT: '5000' });

    expect(result.data?.PORT).toBe(5000);
    expect(result.data?.CORS_ORIGIN).toEqual(['http://localhost:8081', 'https://example.com']);
  });

  it('treats blank optional keys as not set', () => {
    const result = parseEnv({ ...valid, ANTHROPIC_API_KEY: '', TYPESAFE_API_KEY: '' });

    expect(result.data?.ANTHROPIC_API_KEY).toBeUndefined();
    expect(result.data?.TYPESAFE_API_KEY).toBeUndefined();
  });

  it('rejects a missing JWT_SECRET', () => {
    const { JWT_SECRET: _omitted, ...withoutSecret } = valid;
    const result = parseEnv(withoutSecret);

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toContain('JWT_SECRET');
  });

  it('rejects a JWT_SECRET shorter than 32 characters', () => {
    const result = parseEnv({ ...valid, JWT_SECRET: 'too-short' });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe('must be at least 32 characters');
  });

  it('rejects an unknown CATEGORY_CLASSIFIER', () => {
    const result = parseEnv({ ...valid, CATEGORY_CLASSIFIER: 'gpt' });

    expect(result.success).toBe(false);
  });
});
