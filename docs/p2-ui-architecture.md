---
description: Phase 2 UI architecture and layout rules
---

# Phase 2 UI Architecture

## 1. Routing Structure
- Routes are grouped by domain: `routes/account/`, `routes/learning/`, etc.
- Interactive UI goes to `islands/` with minimal client scope.
- Learning backend endpoints: `docs/learning-endpoints.md`.

## 2. Layout Strategy
- Desktop-first layout for most pages.
- Quiz uses a dedicated mobile-first layout and typography scale.

## 3. Component Structure
- Domain components live in `components/<domain>/`.
- Shared primitives live in `components/ui/`.

## 4. Styling Rules
- Vanilla CSS only, colocated in `static/`.
- Keep selectors shallow and class-based.
