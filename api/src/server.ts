/**
 * server.ts: process entry point.
 * Task: S1-T03
 *
 * Responsibilities:
 *   - Load validated config from config/env.ts before anything else
 *   - Connect to MongoDB (config/db.ts), then start the app from app.ts on env.PORT
 *   - Graceful shutdown on SIGTERM/SIGINT: stop accepting requests, close the DB connection, exit
 *   - Log startup and fatal errors with utils/logger.ts
 *
 * Kept separate from app.ts so tests can import the app without opening a port or a real DB.
 *
 * TODO (S1-T03): implement
 */
