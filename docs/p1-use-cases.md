---
description: Phase 1 core UI use cases and policies
---

# Phase 1 Core Use Cases and Policies (Frontend)

This document defines core UI use cases and policies per domain.
Use cases focus on who, when, and why in the UI flow.

## 1. Shell

Use Cases:
- When a user lands on the app, show navigation and route entry points.
- When a session is missing, redirect to login routes.

Policies:
- Navigation stays visible and consistent across domains.
- Route access is gated by session state only.

## 2. Account

Use Cases:
- Login -> session established -> redirect to dashboard
- Token refresh -> silent session restore
- Logout -> session cleared -> redirect to login

Policies:
- Identity screens never expose sensitive fields.
- Session state is stored in one module only.

## 3. Learning (Mobile-First)

Use Cases:
- Start quiz -> answer -> review feedback -> next item
- Review schedule -> start review -> completion summary

Policies:
- Quiz screens are mobile-first and action-focused.
- Quiz content is rendered from backend payloads only.

## 4. Course

Use Cases:
- Browse courses -> view details -> enroll
- View course -> list students (teacher-only)

Policies:
- Enrollment actions require an active session.
- Teacher-only screens stay gated behind role checks.

## 5. Economy

Use Cases:
- View wallet balance -> view history
- Redeem reward -> confirmation

Policies:
- Balances are display-only; no client-side mutation.

## 6. Presence

Use Cases:
- Check in/out history (student)
- Attendance overview (staff/admin)

Policies:
- Attendance UI is read-only unless the backend explicitly allows edits.
