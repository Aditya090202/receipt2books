/**
 * zod request schemas for receipts.
 * Task: S1-T10 | Stories: US-04, US-05
 *
 *   createReceiptSchema: vendor, date, total (positive), currency, categoryId (all required except currency)
 *   updateReceiptSchema: same fields, all optional
 *   listReceiptsQuerySchema: month (YYYY-MM), categoryId, page, limit (with sensible max)
 *   idParamSchema: valid ObjectId
 *
 * TODO (S1-T10): define schemas
 */
