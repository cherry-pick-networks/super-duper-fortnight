---
description: Backend grammar quiz implementation handout
---

# Grammar Quiz Backend Handout

This handout summarizes the backend work needed to expose a grammar quiz
endpoint that the frontend can integrate with. The frontend must follow the
backend payload as the source of truth.

## Goal
- Add a grammar quiz endpoint in `ideal-happiness`.
- Do **not** add a new adapter; route directly to the grammar component.
- Return a payload that supports:
  - leading sentences
  - two-choice sentence options
  - trailing sentences
  - bolded grammar parts in each choice

## Current State
- Component exists: `src/picker/learning/component/grammar.py`
- No adapter will be added by design
- Router does not expose a `/learning/quiz/grammar` endpoint
- Component payload does not match the desired UI structure

## Recommended Payload (Backend Response)
```json
{
  "meta": { "version": "v1.0", "source": "grammar_strategy_v1" },
  "system": { "domain": "grammar", "target": 123, "difficulty": "intermediate" },
  "skill": {
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
}
```

## Implementation Tasks (Backend)
1. **Expose endpoint**
   - File: `src/picker/learning/router.py`
   - Add: `GET /learning/quiz/grammar`
   - Accept `difficulty` and optional `topic`/`grammar` inputs if needed.
   - Call `component/grammar.py` directly (no adapter).

2. **Align component payload**
   - File: `src/picker/learning/component/grammar.py`
   - Replace the current mock structure with `leading_sentences`, `choices`,
     `trailing_sentences`, and `parts` with `is_bold`.

3. **Add schema models (optional but recommended)**
   - File: `src/picker/learning/schema.py`
   - Add Pydantic models for `GrammarChoicePart`, `GrammarChoice`,
     `GrammarQuizContent`, and `GrammarQuizResponse`.

## Notes
- Keep naming consistent with other quiz payloads (`meta`, `system`, `skill`).
- The frontend will render `parts` with `<strong>` when `is_bold` is true.
