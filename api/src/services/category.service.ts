/**
 * Category service.
 * Task: S1-T06 (default seeding), S1-T09 (list/create) | Stories: US-01, US-05
 *
 * Default categories seeded on registration, each with a short description (adjust as you like):
 *   Meals, Travel, Office Supplies, Software, Utilities, Transport, Other, Uncategorized
 *   e.g. Meals: "Restaurants, cafes, takeaway and food delivery"
 *   The descriptions are the criteria Jev uses to choose a category (S1-T16).
 *   "Uncategorized" is the no-match option: "None of the other categories fit".
 *
 * Functions:
 *   - seedDefaults(userId)
 *   - list(userId)
 *   - create(userId, input): 409 on duplicate name
 *
 * TODO (S1-T06): seedDefaults
 * TODO (S1-T09): list and create
 */
