/**
 * Auth controller: HTTP layer only.
 * Task: S1-T06 | Stories: US-01, US-02
 *
 * Each handler: read validated input from the request, call services/auth.service.ts,
 * send the response with the right status code. No database calls or business rules here.
 *
 *   register -> 201 with { user, token }
 *   login    -> 200 with { user, token }
 *   me       -> 200 with { user }
 *
 * TODO (S1-T06): implement handlers (wrap with utils/asyncHandler.ts)
 */
