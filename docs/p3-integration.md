---
description: Phase 3 integration boundaries and contracts
---

# Phase 3 Relationship and Integration Map (Frontend)

## 1. Backend API
- Base URL defaults to `http://127.0.0.1:8000` (proxy via `/api`).
- Keep API clients in `lib/api/` and type responses.
- Use a single auth/session module for token storage.
- Requests include `X-User-Id` or `X-License-Key` as needed by access rules.

## 2. Session and Auth
- Session persistence uses `localStorage` only.
- Account flows own login/logout; other domains read session state.

## 3. OAuth
- Success redirect: `OAUTH_SUCCESS_REDIRECT` (URL fragment tokens)
- Failure redirect: `OAUTH_FAILURE_REDIRECT` (error in query string)

## 4. WharfKit
- WharfKit is loaded only from islands.
- Chain config lives in `lib/wharfkit/config.ts`.
- Do not store private keys or sensitive wallet data.

## 5. Error Handling
- API errors are surfaced with a user-friendly message.
- Empty states must be explicit and actionable.
