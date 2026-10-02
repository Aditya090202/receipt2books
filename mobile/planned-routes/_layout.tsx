/**
 * Root layout: wraps every screen.
 * Task: S1-T12 | Story: US-02
 *
 *   - providers: TanStack QueryClientProvider, AuthProvider (src/auth/auth-context.tsx)
 *   - auth gate: while the stored token loads, show a splash/loader;
 *     no token -> redirect to (auth)/login, token -> (tabs)
 *
 * TODO (S1-T12): implement
 */
