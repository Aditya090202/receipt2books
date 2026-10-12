/**
 * Receipt and category tests.
 * Task: S1-T10 | Stories: US-03, US-04, US-05, US-06
 *
 * TODO (S1-T10): replace each it.todo with a real test (Jest reports todos without failing).
 */

describe('POST /api/receipts', () => {
  it.todo('valid receipt -> 201 (US-05 AC1)');
  it.todo('missing fields / negative total -> 400 with field details (US-05 AC2)');
  it.todo('categoryId belonging to another user -> rejected');
});

describe('GET /api/receipts', () => {
  it.todo('newest first, paginated (US-04 AC1, AC4)');
  it.todo('month and category filters');
  it.todo("only returns the caller's receipts");
});

describe('GET / PATCH / DELETE /api/receipts/:id', () => {
  it.todo('own receipt -> 200 / 200 / 204');
  it.todo("another user's receipt -> 404, not 403 (US-03 AC2, AC3)");
});

describe('categories', () => {
  it.todo('GET /api/categories returns the seeded defaults');
  it.todo('POST /api/categories creates a category; duplicate name -> 409');
});
