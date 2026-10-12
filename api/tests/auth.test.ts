/**
 * Auth tests.
 * Task: S1-T08 | Stories: US-01, US-02, US-03
 *
 * TODO (S1-T08): replace each it.todo with a real test (Jest reports todos without failing).
 */

describe('POST /api/auth/register', () => {
  it.todo(
    'valid email + password -> 201, returns a token, no passwordHash in the response (US-01 AC1, AC3)',
  );
  it.todo('duplicate email -> 409 "email already in use" (US-01 AC2)');
  it.todo('short password / invalid email -> 400 with field details');
  it.todo('default categories are created for the new user (US-01 AC4)');
});

describe('POST /api/auth/login', () => {
  it.todo('correct credentials -> 200 with a token (US-02 AC1)');
  it.todo('wrong password and unknown email -> the same 401 message (US-02 AC2)');
});

describe('GET /api/auth/me', () => {
  it.todo('valid token -> 200 with the user');
  it.todo('no token / bad token -> 401 (US-03 AC1)');
});
