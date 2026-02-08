---
description: Phase 0 frontend domain list and boundaries
---

# Phase 0 Domain List Finalization (Frontend)

This document defines the UI domain list and ownership boundaries for the frontend.

## 1. UI Domain List (Bounded Contexts)
- Shell
- Account
- Learning
- Course
- Presence
- Economy
- CRM
- Finance
- Workforce
- Mobility
- Logistics
- Output

## 2. One-Sentence UI Domain Definitions
- Shell: Provides navigation, layout, and route gating.
- Account: Handles login, profile, and session identity surfaces.
- Learning: Renders quiz, review, and progress flows.
- Course: Manages course listing, details, and enrollment UI.
- Presence: Shows attendance history and check-in/out views.
- Economy: Displays wallet balance, rewards, and ledger history.
- CRM: Surfaces contacts, notes, and communication timelines.
- Finance: Presents billing, invoices, and payment status.
- Workforce: Supports time tracking and leave requests.
- Mobility: Displays routes and schedules.
- Logistics: Shows inventory summaries and alerts.
- Output: Tracks printer usage and job logs.

## 3. Boundary Principles
- Each UI domain owns its routes, components, and local state.
- Cross-domain data is read-only unless explicitly authorized.
- Shared UI lives in `components/ui/` and stays domain-agnostic.
- Routes are thin; UI logic lives in components or islands.
- Client interactivity is isolated in `islands/`.
- Quiz and review flows are mobile-first; other flows are desktop-first.

## 4. Phase 1 Readiness Check
- UI domain list is stable.
- Each domain is described by a single responsibility.
- Ownership boundaries are clear enough to define user flows.
