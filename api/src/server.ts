/**
 * server.ts: process entry point.
 * Task: S1-T03
 *
 * Starter version: starts the app on PORT (default 4000).
 *
 * Kept separate from app.ts so tests can import the app without opening a port or a real DB.
 *
 * TODO (S1-T03): read PORT from validated config (config/env.ts) instead of process.env
 * TODO (S1-T03): log with utils/logger.ts instead of console
 * TODO (S1-T03): graceful shutdown on SIGTERM/SIGINT (stop accepting requests, close the DB connection)
 * TODO (S1-T04): connect to MongoDB (config/db.ts) before listening
 */
import app from './app';

const port = Number(process.env.PORT) || 4000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
