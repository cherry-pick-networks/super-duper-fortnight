---
description: English grammar quiz structure
---

# English Grammar Quiz Structure

This document defines the structure and rendering rules for the English grammar
quiz. The layout is designed for No-CSS usage and relies on semantic HTML.

## Status
- Draft specification for a future adapter; not currently returned by backend
  learning adapters.

## Structure
1. Leading sentences (one or more).
2. Two-choice sentence options.
3. Trailing sentence (one or more).

## Rendering Rules
- The choices must be presented as two options only.
- The key grammar portion of each choice must be bolded with `<strong>`.
- Use semantic grouping (`section`, `fieldset`, `legend`, `ol`, `li`, `p`).
- Avoid `div` and `span`.

## Data Shape
```ts
type GrammarChoicePart = {
  text: string;
  is_bold?: boolean;
};

type GrammarChoice = {
  parts: GrammarChoicePart[];
  is_correct: boolean;
};

type GrammarQuizItem = {
  leading_sentences: string[];
  choices: [GrammarChoice, GrammarChoice];
  trailing_sentences: string[];
};
```

## Example
Leading:
- She ____ to the office every day.

Choices:
- She <strong>goes</strong> to the office every day.
- She <strong>go</strong> to the office every day.

Trailing:
- Her schedule is consistent throughout the week.
