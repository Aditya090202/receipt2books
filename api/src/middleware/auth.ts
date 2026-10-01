/**
 * Auth middleware: protects routes.
 * Task: S1-T07 | Stories: US-02, US-03
 *
 *   - read the "Authorization: Bearer <token>" header
 *   - verify the JWT with env.JWT_SECRET
 *   - on success, attach the user id to the request (typed in types/express.d.ts)
 *   - on a missing, invalid or expired token, respond 401 through the error handler
 *
 * TODO (S1-T07): implement
 */
