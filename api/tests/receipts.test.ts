/**
 * Receipt and category tests.
 * Task: S1-T10 | Stories: US-03, US-04, US-05, US-06
 *
 * TODO (S1-T10): cover these cases
 *   create
 *     - valid receipt -> 201                                                            (US-05 AC1)
 *     - missing fields / negative total -> 400 with field details                       (US-05 AC2)
 *     - categoryId belonging to another user -> rejected
 *   list
 *     - newest first, paginated                                                         (US-04 AC1, AC4)
 *     - month and category filters
 *     - only returns the caller's receipts
 *   get / update / delete
 *     - own receipt -> 200 / 200 / 204
 *     - another user's receipt -> 404 (not 403)                                         (US-03 AC2, AC3)
 *   categories
 *     - list returns the seeded defaults
 *     - create a category; duplicate name -> 409
 */
