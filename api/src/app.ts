/**
 * app.ts: builds and exports the Express app (does not listen).
 * Task: S1-T03 (later wiring: S1-T07)
 *
 * Middleware order matters:
 *   1. Security headers (helmet) and CORS (allow-list from env.CORS_ORIGIN)
 *   2. JSON body parser with a size limit
 *   3. Request logging (pino-http)
 *   4. GET /health (no auth)
 *   5. API routes mounted at /api (routes/index.ts)
 *   6. 404 handler for unknown routes
 *   7. Central error handler (middleware/errorHandler.ts), always last
 *
 * TODO (S1-T03): create and export the app with steps 1–4 and 6
 * TODO (S1-T07): mount routes (5) and the error handler (7)
 */
