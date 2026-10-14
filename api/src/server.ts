/**
 * server.ts: process entry point.
 * Task: S1-T03
 *
 * Starts the app on env.PORT and shuts down cleanly on SIGTERM/SIGINT.
 *
 * Kept separate from app.ts so tests can import the app without opening a port or a real DB.
 *
 * TODO (S1-T04): connect to MongoDB (config/db.ts) before listening, and close it on shutdown
 */
import app from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const SHUTDOWN_TIMEOUT_MS = 10_000;

const server = app.listen(env.PORT, (error) => {
  if (error) {
    logger.fatal({ err: error }, 'Failed to start the server');
    process.exit(1);
  }
  logger.info(`API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});

function shutdown(signal: NodeJS.Signals) {
  logger.info({ signal }, 'Shutting down');

  // Stop accepting new connections and let in-flight requests finish.
  server.close((error) => {
    if (error) {
      logger.error({ err: error }, 'Error while closing the server');
      process.exit(1);
    }
    process.exit(0);
  });

  // Don't hang forever if a connection never closes.
  setTimeout(() => {
    logger.error('Shutdown timed out, forcing exit');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS).unref();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
