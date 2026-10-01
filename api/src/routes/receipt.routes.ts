/**
 * Receipt routes. All require auth.
 * Task: S1-T09 | Stories: US-04, US-05, US-06
 *
 *   GET    /       list (query: month=YYYY-MM, categoryId, page, limit)
 *   POST   /       create manually
 *   GET    /:id    get one
 *   PATCH  /:id    update (Sprint 2 adds confirm)
 *   DELETE /:id    delete
 *
 *   POST /parse    image upload + AI parse (S1-T15, Sprint 1 week 2)
 *
 * TODO (S1-T09): define the routes with auth + validation middleware
 */
