# Architecture

<!-- TODO (S2-T14): replace with a proper diagram (e.g. Mermaid) once the system is built -->

```
Expo app (React Native)
   |  HTTPS, JWT bearer
   v
Express API ──> MongoDB (users, receipts, categories)
   |
   └──> Claude API (image + JSON schema -> parsed fields)
```

## API layers

`routes` → `middleware` (auth, validation) → `controllers` (HTTP only) → `services` (business logic) → `models` (Mongoose)

## Design decisions

<!-- TODO: record decisions as you make them (one short paragraph each):
  - Why MongoDB (document-shaped receipts, raw LLM JSON stored as-is)
  - Ownership scoping: every query filters by userId; other users' records return 404
  - Structured LLM output validated with zod + human-in-the-loop correction
  - Images on local disk / Docker volume (limitation, and what production would use)
-->
