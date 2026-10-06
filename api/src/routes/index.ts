/**
 * API router: mounts every resource router under /api.
 * Task: S1-T07
 *
 * Starter version: GET /api returns a welcome message.
 *
 *   /api/auth        -> auth.routes.ts      (S1-T06)
 *   /api/receipts    -> receipt.routes.ts   (S1-T09)
 *   /api/categories  -> category.routes.ts  (S1-T09)
 *   /api/reports     -> report.routes.ts    (Sprint 2, S2-T05)
 *
 * TODO (S1-T07): mount auth; add the others as they're built
 */
import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Receipt2Books API v1' });
});

export default router;
