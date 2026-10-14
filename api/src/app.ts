/**
 * app.ts: builds and exports the Express app (does not listen).
 * Task: S1-T03 (later wiring: S1-T07)
 *
 * Middleware order (order matters):
 *   1. Security headers (helmet) and CORS (allow-list from env.CORS_ORIGIN)
 *   2. JSON body parser with a size limit
 *   3. Request logging (pino-http)
 *   4. GET /health (no auth)
 *   5. API routes mounted at /api (routes/index.ts)
 *   6. 404 handler for unknown routes
 *   7. Central error handler (middleware/errorHandler.ts), always last
 *
 * TODO (S1-T07): move the 404 handler to middleware/errorHandler.ts and add the error handler (7).
 *   Until then Express's default handler answers errors such as an oversized body (413).
 */
import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { logger } from './utils/logger';
import apiRouter from './routes';

const app = express();

app.use(helmet());
// Requests without an Origin header (the mobile app, curl) are not affected by CORS.
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.use(
  pinoHttp({
    logger,
    // Health checks arrive every few seconds in production and would drown out real requests.
    autoLogging: { ignore: (req) => req.url === '/health' },
    // One short line per request instead of every header.
    serializers: {
      req: (req) => ({ method: req.method, url: req.url }),
      res: (res) => ({ statusCode: res.statusCode }),
    },
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.json({ name: 'receipt2books-api', message: 'Receipt2Books API is running' });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

export default app;
