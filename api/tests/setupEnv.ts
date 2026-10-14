/**
 * Test environment variables. Runs before each test file (Jest `setupFiles`), so the values
 * are in place before src/config/env.ts is imported. Tests never read a developer's .env.
 * Task: S1-T03
 */
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/receipt2books-test';
process.env.JWT_SECRET = 'test-only-secret-that-is-at-least-32-characters';
process.env.JWT_EXPIRES_IN = '1h';
process.env.CORS_ORIGIN = 'http://localhost:8081';
