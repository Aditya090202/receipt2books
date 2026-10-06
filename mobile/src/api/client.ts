/**
 * API client: the single place that talks HTTP.
 * Task: S1-T12
 *
 *   - base URL from process.env.EXPO_PUBLIC_API_URL
 *   - attach "Authorization: Bearer <token>" when logged in
 *   - JSON by default; multipart for uploads (S1-T17)
 *   - map the API's error format ({ error: { code, message, details } }) to a typed ApiError
 *   - on 401, clear the token and send the user to login
 *
 * TODO (S1-T12): implement
 */
