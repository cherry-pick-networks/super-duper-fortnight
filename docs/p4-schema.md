---
description: Phase 4 frontend data contract draft
---

# Phase 4 Data Contract Draft (Frontend)

This document defines the frontend data contracts and view model rules.
It mirrors backend contracts while focusing on UI consumption.

## 1. Shared Response Envelope

- Responses are typed in `lib/api/`.
- Every quiz response follows:
  - `meta`: version and source
  - `system`: context identifiers and difficulty
  - `skill`: `type` + `content`

## 2. Quiz Payload Shapes (UI-Facing)

### Reading
- `skill.type`: `reading`
- `skill.content.text`

### Lexis 4-Choice
- `skill.type`: `4_choice`
- `skill.content.question`
- `skill.content.options[] { text, is_correct }`

### Swipe (Lexis)
- `skill.type`: `swipe_2_choice`
- `skill.content.question`
- `skill.content.label`
- `skill.content.options[] { text, is_correct }`

### Phonology
- `skill.type`: `swipe_true_false`
- `skill.content.word`
- `skill.content.pronunciation`
- `skill.content.audio_url` (optional)
- `skill.content.is_match`

### Grammar (Two-Choice)
- `skill.type`: `grammar_two_choice`
- `skill.content.leading_sentences[]`
- `skill.content.choices[] { parts[] { text, is_bold }, is_correct }`
- `skill.content.trailing_sentences[]`

### Atom Quiz (Content Atom)
- `GET /learning/quiz/atom`
- `system` includes `atom_id`, `source_id`, `dataset`, `split`, `example_id`, `target_level`
- `skill.type` is one of the quiz types above

## 3. View Model Rules

- Normalize external data at the API boundary (`lib/api/`).
- UI components render directly from `skill.type` and `skill.content`.
- No client-side mutation of backend-owned fields.
- Error/empty states must be explicit in each view.
