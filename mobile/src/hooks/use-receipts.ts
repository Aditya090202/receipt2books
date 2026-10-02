/**
 * TanStack Query hooks for receipts.
 * Task: S1-T14 | Stories: US-04, US-05; Sprint 2: US-06, US-08
 *
 *   useReceipts(filters)       -> useQuery for the list
 *   useReceipt(id)             -> useQuery for one receipt
 *   useCreateReceipt()         -> useMutation; invalidate the list on success
 *   useParseReceipt()          -> useMutation for the photo upload (S1-T17)
 *   useUpdateReceipt(), useDeleteReceipt() -> Sprint 2; also invalidate reports
 *
 * TODO (S1-T14): list + create
 * TODO (S1-T17): parse
 */
