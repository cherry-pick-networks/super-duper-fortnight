---
description: Learning adapter quiz payloads
---

# Learning Quiz Adapter Payloads

This document mirrors the backend learning adapter payloads used by the quiz UI.
The frontend should render based on `skill.type` and `skill.content`.

## Endpoints
- `GET /learning/quiz/lexis?count=1&mode=4_choice|swipe`
- `POST /learning/quiz/context`
- `GET /learning/quiz/phonology?difficulty=beginner`
- `GET /learning/quiz/{domain}?difficulty=beginner` where `domain` maps to:
  - `text`, `reading`, `passage` -> text adapter
  - `formula`, `math`, `calculation` -> formula adapter
  - `phonology`, `pronunciation`, `listening` -> media adapter

## Shared Shape
```ts
type LearningQuizResponse = {
  meta?: { id?: string; source?: string; version?: string };
  system?: { domain?: string; target?: number; difficulty?: string };
  skill?: { type?: string; content?: Record<string, unknown> };
};
```

## Skill Types

### 4-choice (Lexis)
```ts
type QuizOption = { text: string; is_correct: boolean };
type LexisFourChoiceContent = { question: string; options: QuizOption[]; index?: number };
```

### Swipe (Lexis)
```ts
type LexisSwipeContent = {
  mode?: string;
  label?: string;
  color?: string;
  question: string;
  options: QuizOption[];
};
```

### Context (Custom)
```ts
type ContextQuizResponse = {
  original_text: string;
  blanked_text: string;
  blanks: { index: number; answer: string; original_idx: number; options: string[] }[];
};
```

### Reading
```ts
type ReadingContent = { text: string };
```

### Calculation
```ts
type CalculationContent = { expression: string; answer_range?: Record<string, unknown> | null };
```

### Phonology (Swipe True/False)
```ts
type PhonologySwipeContent = {
  word: string;
  pronunciation: string;
  audio_url?: string | null;
  syllables?: string | null;
  score?: number | null;
  is_match: boolean;
};
```
