---
description: Phase 5 frontend migration direction
---

# Phase 5 Migration Direction (Frontend)

This document defines a staged rollout strategy for frontend changes.

## 1. Migration Principles

- Additive-first: introduce new UI surfaces alongside old ones.
- Backfill before switch: wire new data sources before routing changes.
- Feature-flagged: UI cutover is controlled by flags or route switches.
- Observable changes: track errors and empty states during rollout.
- Rollback ready: keep the previous route available until stability is proven.

## 2. Staged Plan

Stage A: Baseline Alignment
- Align routes and layout with updated phase docs.
- Ensure API clients and types match backend contracts.

Stage B: Domain-Safe Expansion
- Introduce new domain panels or screens behind feature flags.
- Add new view models for updated payloads.

Stage C: Cutover
- Switch default routes to the new UI.
- Remove deprecated navigation entries.

Stage D: Cleanup
- Delete old components and unused islands.
- Remove deprecated API paths and view model types.

## 3. Validation Checklist

- Core flows render without missing data.
- Error and empty states are verified.
- Mobile-first quiz views remain usable at small breakpoints.
