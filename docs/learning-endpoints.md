---
description: Learning backend endpoints
---

# Learning Backend Endpoints

This document mirrors the backend learning router (`ideal-happiness`) and is
the source of truth for frontend integration. The frontend must align to these
endpoints and payloads.

Base prefix: `/learning`

## Quizzes
- `POST /learning/quiz/context`
  - Request: `ContextQuizRequest { text, target_words[], difficulty }`
  - Response: `ContextQuizResponse { original_text, blanked_text, blanks[] }`
- `GET /learning/quiz/atom?atom_type=lexis&target_level=B2&dataset=race&split=train`
  - Response: quiz payload parsed from `content_atom`
- `GET /learning/quiz/{domain}`
  - Standard quiz endpoint for all domains.
  - Supported query params:
    - `difficulty` (general)
    - `count`, `mode=4_choice|swipe` (lexis)
    - `topic`, `grammar` (grammar)
  - `domain` mapping:
    - `text|reading|passage` -> text adapter
    - `memory|fsrs|memorization` -> memory adapter
    - `formula|math|calculation` -> formula adapter
    - `media|practice|training` -> media adapter
    - `lexis|vocab|vocabulary` -> memory adapter (content_type = lexis)
    - `phonology|pronunciation|listening` -> media adapter (content_type = phonology)
    - `grammar` -> grammar component

## Quiz Payload Summary (UI-Facing)

These are the minimal fields used by the frontend. For exact sources, see:
`ideal-happiness/src/picker/learning/component/*.py` and
`ideal-happiness/src/picker/learning/schema.py`.

### Lexis 4-choice
Source: `ideal-happiness/src/picker/learning/component/lexis.py`
- `skill.type`: `4_choice`
- `skill.content.question`
- `skill.content.options[] { text, is_correct }`

### Lexis swipe
Source: `ideal-happiness/src/picker/learning/component/lexis.py`
- `skill.type`: `swipe_2_choice`
- `skill.content.question`
- `skill.content.label`
- `skill.content.options[] { text, is_correct }`

### Context quiz
Source: `ideal-happiness/src/picker/learning/schema.py`
- `original_text`
- `blanked_text`
- `blanks[] { index, answer, original_idx, options[] }`

### Reading
Source: `ideal-happiness/src/picker/learning/component/text.py`
- `skill.type`: `reading`
- `skill.content.text`

### Calculation
Source: `ideal-happiness/src/picker/learning/component/formula.py`
- `skill.type`: `calculation`
- `skill.content.expression`
- `skill.content.answer_range` (optional)

### Phonology
Source: `ideal-happiness/src/picker/learning/component/phonology.py`
- `skill.type`: `swipe_true_false`
- `skill.content.word`
- `skill.content.pronunciation`
- `skill.content.audio_url` (optional)
- `skill.content.syllables` (optional)
- `skill.content.score` (optional)
- `skill.content.is_match`

### Grammar (two-choice)
Source: `ideal-happiness/src/picker/learning/component/grammar.py`
- `skill.type`: `grammar_two_choice`
- `skill.content.leading_sentences[]`
- `skill.content.choices[] { parts[] { text, is_bold }, is_correct }`
- `skill.content.trailing_sentences[]`

### Atom quizzes (content_atom)
Source: `ideal-happiness/src/picker/learning/atom_quiz.py`
- `GET /learning/quiz/atom`
- `skill.type`: `reading_receptive`, `4_choice`, `swipe_true_false`, `grammar_two_choice`
- `system` includes `atom_id`, `source_id`, `dataset`, `split`, `example_id`, `target_level`

## Composed Quiz (Tool Bundle)
Use this to request a quiz bundle composed by the backend based on subject and
tool selection. The backend combines tool outputs into a single response.

- `POST /learning/quiz/compose`
  - Request:
    ```json
    {
      "subject_key": "english",
      "tools": ["reading", "grammar_two_choice", "swipe_true_false"],
      "difficulty": "intermediate",
      "topic": "office",
      "grammar": "present_simple"
    }
    ```
  - Response:
    ```json
    {
      "meta": { "version": "v1.0", "source": "learning_bundle_v1" },
      "system": {
        "domain": "grammar",
        "difficulty": "intermediate",
        "taxonomy": {
          "exam": "suneung",
          "domain": "humanities",
          "field": "language",
          "track": "common",
          "subject_key": "english",
          "subject_name": "English",
          "nrf": { "domain_name": "Humanities", "code": null }
        }
      },
      "skills": [
        { "type": "reading", "content": { "text": "..." } },
        {
          "type": "grammar_two_choice",
          "content": {
            "leading_sentences": ["She ____ to the office every day."],
            "choices": [
              {
                "parts": [
                  { "text": "She " },
                  { "text": "goes", "is_bold": true },
                  { "text": " to the office every day." }
                ],
                "is_correct": true
              },
              {
                "parts": [
                  { "text": "She " },
                  { "text": "go", "is_bold": true },
                  { "text": " to the office every day." }
                ],
                "is_correct": false
              }
            ],
            "trailing_sentences": ["Her schedule is consistent throughout the week."]
          }
        }
      ]
    }
    ```

## Grading
- `POST /learning/grade?user_id={id}&quiz_id={id}&score={0-100}`
  - Response: `{ status: "graded", perfect: boolean }`

## Components
- `GET /learning/components`
- `POST /learning/components`

## Packages
- `GET /learning/packages`
- `POST /learning/packages`
- `POST /learning/packages/{package_id}/components/{component_id}`

## Sources
- `GET /learning/sources`
- `POST /learning/sources`
- `GET /learning/sources/{source_id}`

## Atoms
- `GET /learning/atoms`
- `POST /learning/atoms`
- `GET /learning/atoms/{atom_id}`

## Tags
- `POST /learning/tags`

## Listening Sync
- `POST /learning/syncs`

## FSRS Profiles
- `POST /learning/profiles`
- `GET /learning/profiles`
- `GET /learning/profiles/{profile_id}`
- `PATCH /learning/profiles/{profile_id}`
