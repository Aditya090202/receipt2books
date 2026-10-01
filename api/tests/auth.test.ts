/**
 * Auth tests.
 * Task: S1-T08 | Stories: US-01, US-02, US-03
 *
 * TODO (S1-T08): cover these cases
 *   register
 *     - valid email + password -> 201, returns token, no passwordHash in the response   (US-01 AC1, AC3)
 *     - duplicate email -> 409 "email already in use"                                   (US-01 AC2)
 *     - short password / invalid email -> 400 with field details
 *     - default categories are created for the new user                                 (US-01 AC4)
 *   login
 *     - correct credentials -> 200 with token                                           (US-02 AC1)
 *     - wrong password and unknown email -> same 401 message                            (US-02 AC2)
 *   me
 *     - valid token -> 200 with the user
 *     - no token / bad token -> 401                                                     (US-03 AC1)
 */
