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

describe('security middleware', () => {
  it('adds security headers (helmet)', async () => {
    const res = await request(app).get('/health');

    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });

  it('allows a listed origin and ignores an unlisted one (CORS)', async () => {
    const allowed = await request(app).get('/health').set('Origin', 'http://localhost:8081');
    const blocked = await request(app).get('/health').set('Origin', 'https://evil.example');

    expect(allowed.headers['access-control-allow-origin']).toBe('http://localhost:8081');
    expect(blocked.headers['access-control-allow-origin']).toBeUndefined();
  });

  it('rejects a JSON body over the 1mb limit with 413', async () => {
    const res = await request(app)
      .post('/api')
      .send({ data: 'x'.repeat(2 * 1024 * 1024) });

    expect(res.status).toBe(413);
  });
});
