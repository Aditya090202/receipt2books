/**
 * Jest configuration. Tests are TypeScript, compiled on the fly by ts-jest.
 *
 * TODO (S1-T08): run tests/setup.ts for the in-memory MongoDB lifecycle
 *   (setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'])
 * TODO (S1-T11): add a JUnit reporter for Jenkins (used by `npm run test:ci`)
 */

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/server.ts', '!src/types/**'],
  coverageDirectory: 'coverage',
  clearMocks: true,
};
