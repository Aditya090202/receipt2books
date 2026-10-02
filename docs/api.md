# API Reference

Base URL (local): `http://localhost:4000/api`
Auth: `Authorization: Bearer <token>` on all endpoints except register, login and `/health`.

Error format (all endpoints):

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "…", "details": [] } }
```

<!-- TODO (S1-T10): fill in request/response examples and status codes for each endpoint as it's built -->

| Method | Path | Auth | Task | Status |
|---|---|---|---|---|
| GET | /health | No | S1-T03 | TODO |
| POST | /api/auth/register | No | S1-T06 | TODO |
| POST | /api/auth/login | No | S1-T06 | TODO |
| GET | /api/auth/me | Yes | S1-T06 | TODO |
| GET | /api/receipts | Yes | S1-T09 | TODO |
| POST | /api/receipts | Yes | S1-T09 | TODO |
| GET | /api/receipts/:id | Yes | S1-T09 | TODO |
| PATCH | /api/receipts/:id | Yes | S1-T09 | TODO |
| DELETE | /api/receipts/:id | Yes | S1-T09 | TODO |
| GET | /api/categories | Yes | S1-T09 | TODO |
| POST | /api/categories | Yes | S1-T09 | TODO |
| POST | /api/receipts/parse | Yes | S1-T15, S1-T16 | Sprint 1 week 2 |
| GET | /api/reports/monthly | Yes | S2-T05 | Sprint 2 |
