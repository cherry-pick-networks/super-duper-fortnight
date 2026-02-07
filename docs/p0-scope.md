---
description: Phase 0 frontend scope and boundaries
---

# Phase 0 Frontend Scope

This document defines the UI domains and ownership boundaries for the frontend.

## 1. UI Domains
- Shell: app frame, navigation, auth gate
- Account: login, profile, permissions surface
- Learning: quiz, review, progress, schedule
- Course: enrollments, course list, details
- Presence: attendance views
- Economy: wallet, rewards, history
- Finance: invoices, payments
- CRM: contacts, notes
- Workforce: time tracking
- Mobility: routes and schedules
- Logistics: inventory snapshots
- Output: printer usage and logs

## 2. Ownership Boundaries
- Each UI domain owns its routes, components, and local state.
- Cross-domain data is read-only unless explicitly authorized.
- Shared UI lives in `components/` and must be domain-agnostic.

## 3. Mobile vs Desktop
- Quiz and review flows are mobile-first.
- All other flows are desktop-first unless specified otherwise.
