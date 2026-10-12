/**
 * Health check tests. Also the smoke test for the Jest + ts-jest + Supertest setup (S1-T02).
 * Task: S1-T02, S1-T03
 */
import request from 'supertest';
import app from '../src/app';

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('unknown routes', () => {
  it('return 404 in the standard error format', async () => {
    const res = await request(app).get('/does-not-exist');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
  });
});
