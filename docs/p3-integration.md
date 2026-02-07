---
description: Phase 3 integration boundaries and contracts
---

# Phase 3 Integration

## 1. Backend API
- Base URL defaults to `http://127.0.0.1:8000`.
- Keep API clients in `lib/api/` and type responses.
- Use a single auth/session module for token storage.

## 2. OAuth
- Success redirect: `OAUTH_SUCCESS_REDIRECT` (URL fragment tokens)
- Failure redirect: `OAUTH_FAILURE_REDIRECT` (error in query string)

## 3. WharfKit
- WharfKit is loaded only from islands.
- Chain config lives in `lib/wharfkit/config.ts`.
- Do not store private keys or sensitive wallet data.
