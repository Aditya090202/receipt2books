/**
 * app.ts: builds and exports the Express app (does not listen).
 * Task: S1-T03 (later wiring: S1-T07)
 *
 * Starter version: JSON parsing, a welcome route, /health, the /api router and a 404 handler.
 *
 * Target middleware order (order matters):
 *   1. Security headers (helmet) and CORS (allow-list from env.CORS_ORIGIN)
 *   2. JSON body parser with a size limit
 *   3. Request logging (pino-http)
 *   4. GET /health (no auth)
 *   5. API routes mounted at /api (routes/index.ts)
 *   6. 404 handler for unknown routes
 *   7. Central error handler (middleware/errorHandler.ts), always last
 *
 * TODO (S1-T03): add helmet, CORS, a body size limit and request logging (steps 1–3)
 * TODO (S1-T07): move the 404 handler to middleware/errorHandler.ts and add the error handler (7)
 */
import express from 'express';
import apiRouter from './routes';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ name: 'receipt2books-api', message: 'Receipt2Books API is running' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

export default app;
