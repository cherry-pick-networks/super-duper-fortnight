---
description: Phase 2 frontend component map and ownership
---

# Phase 2 Aggregate, Entity, and Value Object Map (Frontend)

This document defines the frontend composition map and ownership rules.

## 1. Shell

Aggregate: PageShell (root)
- Entities: NavigationMenu, Header, MainContent
- Value Objects: RouteLink, PageTitle
- Ownership: Shell UI

## 2. Routes

Aggregate: RoutePage (root)
- Entities: RouteSection, DomainPanel
- Value Objects: RouteParams, ViewState
- Ownership: Domain UI

## 3. Learning

Aggregate: QuizSession (root)
- Entities: QuizItem, QuizChoice, ProgressCounter
- Value Objects: SkillType, QuizFeedback
- Ownership: Learning UI

Aggregate: ReceptiveQuiz (root)
- Entities: FilterPanel, QuizPreview
- Value Objects: AtomFilter, SourceFilter
- Ownership: Learning UI

## 4. Data Access

Aggregate: ApiClient (root)
- Entities: ApiRequest, ApiResponse
- Value Objects: ApiError, RetryPolicy
- Ownership: Shared UI

## 5. Ownership Rules

- Routes are grouped by domain: `routes/account/`, `routes/learning/`, etc.
- Client interactivity is isolated in `islands/`.
- Shared primitives live in `components/ui/`.
- UI layout uses semantic HTML only; avoid custom CSS and class-based styling.
- Quiz views are mobile-first; other routes are desktop-first.
