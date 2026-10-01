/**
 * Test setup: in-memory MongoDB for every test run.
 * Task: S1-T08
 *
 *   - before all: start mongodb-memory-server and connect Mongoose to it
 *   - after each: clear all collections so tests don't affect each other
 *   - after all: disconnect and stop the server
 *   - set NODE_ENV=test and a test JWT_SECRET before the app is imported
 *
 * TODO (S1-T08): implement
 */
