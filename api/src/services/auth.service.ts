/**
 * Auth service: registration, login and tokens.
 * Task: S1-T06 | Stories: US-01, US-02
 *
 * register:
 *   - reject a duplicate email (409, "email already in use")
 *   - hash the password with bcrypt
 *   - create the user, then seed default categories (category.service.ts)
 *   - return the user (without passwordHash) and a signed JWT
 *
 * login:
 *   - same generic error for unknown email and wrong password (401, "invalid email or password")
 *   - return the user and a signed JWT
 *
 * Token: JWT with the user id as subject, signed with env.JWT_SECRET, expiring after env.JWT_EXPIRES_IN.
 *
 * TODO (S1-T06): implement
 */
