import { apiFetch } from "./client.ts";
import type { SuneungSubjectKey, SuneungTaxonomy } from "./taxonomy.ts";

export type QuizOption = {
  text: string;
  is_correct: boolean;
};

export type ReadingContent = {
  text: string;
};

export type CalculationContent = {
  expression: string;
  answer_range?: Record<string, unknown> | null;
};

export type LexisFourChoiceContent = {
  question: string;
  options: QuizOption[];
  index?: number;
};

export type LexisSwipeContent = {
  mode?: string;
  label?: string;
  color?: string;
  question: string;
  options: QuizOption[];
};

export type PhonologySwipeContent = {
  word: string;
  pronunciation: string;
  audio_url?: string | null;
  syllables?: string | null;
  score?: number | null;
  is_match: boolean;
};

export type GrammarChoicePart = {
  text: string;
  is_bold?: boolean;
};

export type GrammarChoice = {
  parts: GrammarChoicePart[];
  is_correct: boolean;
};

export type GrammarQuizContent = {
  leading_sentences: string[];
  choices: GrammarChoice[];
  trailing_sentences: string[];
};

export type QuizSkillContent =
  | ReadingContent
  | CalculationContent
  | LexisFourChoiceContent
  | LexisSwipeContent
  | PhonologySwipeContent
  | GrammarQuizContent;

export type LearningSkillType =
  | "reading"
  | "calculation"
  | "4_choice"
  | "swipe_2_choice"
  | "swipe_true_false"
  | "grammar_two_choice";

export type LearningQuizMeta = {
  id?: string;
  source?: string;
  version?: string;
};

export type LearningQuizSystem = {
  domain?: string;
  target?: number;
  atom_id?: number;
  part_of_speech?: string;
  difficulty?: string;
  taxonomy?: SuneungTaxonomy;
};

export type LearningQuizSkill = {
  type?: LearningSkillType;
  content?: QuizSkillContent;
};

export type LearningQuizResponse = {
  meta?: LearningQuizMeta;
  system?: LearningQuizSystem;
  skill?: LearningQuizSkill;
};

export type LearningQuizBundleResponse = {
  meta?: LearningQuizMeta;
  system?: LearningQuizSystem;
  skills?: LearningQuizSkill[];
};

export type ContextBlank = {
  index: number;
  answer: string;
  original_idx: number;
  options?: string[];
};

export type ContextQuizResponse = {
  original_text: string;
  blanked_text: string;
  blanks: ContextBlank[];
};

export async function fetchLexisQuiz(
  count = 1,
  mode: "4_choice" | "swipe" = "4_choice",
): Promise<LearningQuizResponse> {
  const params = new URLSearchParams({
    count: String(count),
    mode,
  });
  return apiFetch<LearningQuizResponse>(`/learning/quiz/lexis?${params}`);
}

export async function fetchContextQuiz(
  text: string,
  targetWords: string[],
  difficulty = "medium",
): Promise<ContextQuizResponse> {
  return apiFetch<ContextQuizResponse>("/learning/quiz/context", {
    method: "POST",
    body: {
      text,
      target_words: targetWords,
      difficulty,
    },
  });
}

export async function fetchDomainQuiz(
  domain: string,
  difficulty = "beginner",
): Promise<LearningQuizResponse> {
  const params = new URLSearchParams({ difficulty });
  return apiFetch<LearningQuizResponse>(`/learning/quiz/${domain}?${params}`);
}

export async function fetchGrammarQuiz(
  difficulty = "beginner",
  topic = "practice",
  grammar = "present_simple",
): Promise<LearningQuizResponse> {
  const params = new URLSearchParams({ difficulty, topic, grammar });
  return apiFetch<LearningQuizResponse>(`/learning/quiz/grammar?${params}`);
}

export async function fetchPhonologyQuiz(
  difficulty = "beginner",
): Promise<LearningQuizResponse> {
  const params = new URLSearchParams({ difficulty });
  return apiFetch<LearningQuizResponse>(`/learning/quiz/phonology?${params}`);
}

export type ComposedQuizRequest = {
  subject_key: SuneungSubjectKey;
  tools: LearningSkillType[];
  difficulty?: string;
  topic?: string;
  grammar?: string;
};

export async function fetchComposedQuiz(
  request: ComposedQuizRequest,
): Promise<LearningQuizBundleResponse> {
  return apiFetch<LearningQuizBundleResponse>("/learning/quiz/compose", {
    method: "POST",
    body: request,
  });
}

export async function gradeQuiz(
  userId: number,
  quizId: number,
  score: number,
): Promise<{ status: string; perfect: boolean }> {
  const params = new URLSearchParams({
    user_id: String(userId),
    quiz_id: String(quizId),
    score: String(score),
  });
  return apiFetch<{ status: string; perfect: boolean }>(
    `/learning/grade?${params}`,
    { method: "POST" },
  );
}
