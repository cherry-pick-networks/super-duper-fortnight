---
description: Frontend development workflow
---

# Development Workflow (Frontend)

This document defines the coding workflow after the docs phase.

## 1. Scope and Entry Criteria
- Phase documents are approved and stable.
- Target domain and flow are explicitly selected.
- API and data contracts are understood.

## 2. Default Implementation Order
1. Route skeleton and layout
2. Domain components
3. Islands for interactivity
4. API client wiring
5. Error handling and empty states
6. Visual polish and responsiveness
7. Tests and verification

## 3. Branching and PR Discipline
- One feature per branch.
- Keep changes in one domain unless integration is required.
- Use clear commit messages that explain intent.

## 4. Quality Gates
- Lint and format pass.
- No CSS framework usage.
- Mobile-first rules are enforced for quiz only.
- Prefer enterprise-grade libraries when they already provide the feature.
