# Architecture

<!-- TODO (S2-T14): replace with a proper diagram (e.g. Mermaid) once the system is built -->

```
Expo app (React Native)
   |  HTTPS, JWT bearer
   v
Express API ──> MongoDB (users, receipts, categories)
   |
   ├──> Claude API (image + JSON schema -> vendor, date, total, currency, items summary)
   └──> Jev / TypeSafe (fields + user's categories -> category, confidence)
```

## Receipt parse flow

Extract (Claude) → categorise (Jev Choice over the user's categories) → flag (code checks + category confidence) → save as `parsed` → user reviews and confirms → `confirmed`. Reports count confirmed receipts only. Full detail: [PROJECT_DEFINITION.md §5](../PROJECT_DEFINITION.md#5-architecture).

## API layers

`routes` → `middleware` (auth, validation) → `controllers` (HTTP only) → `services` (business logic) → `models` (Mongoose)

## Design decisions

<!-- TODO: record decisions as you make them (one short paragraph each):
  - Why MongoDB (document-shaped receipts, raw LLM JSON stored as-is)
  - Ownership scoping: every query filters by userId; other users' records return 404
  - AI split by job: Claude extracts (structured output + zod), Jev classifies with calibrated confidence,
    code computes review flags; why not ask the LLM to rate its own confidence
  - Save as `parsed` first, confirm later (nothing lost; reports use confirmed data only)
  - Images on local disk / Docker volume (limitation, and what production would use)
-->
