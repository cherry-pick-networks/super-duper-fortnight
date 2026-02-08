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

export type ReadingReceptiveOption = {
  text: string;
  is_correct: boolean;
};

export type ReadingReceptiveItem = {
  question: string;
  options: ReadingReceptiveOption[];
};

export type ReadingReceptiveContent = {
  passage: string;
  items: ReadingReceptiveItem[];
};

export type QuizSkillContent =
  | ReadingContent
  | CalculationContent
  | LexisFourChoiceContent
  | LexisSwipeContent
  | PhonologySwipeContent
  | GrammarQuizContent
  | ReadingReceptiveContent;

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

export type AtomQuizSystem = LearningQuizSystem & {
  source_id?: number;
  dataset?: string;
  split?: string;
  example_id?: string;
  target_level?: string;
};

export type AtomQuizSkillType = LearningSkillType | "reading_receptive";

export type AtomQuizSkill = {
  type?: AtomQuizSkillType;
  content?: QuizSkillContent;
};

export type AtomQuizResponse = {
  meta?: LearningQuizMeta;
  system?: AtomQuizSystem;
  skill?: AtomQuizSkill;
};

export type ContentSource = {
  id: number;
  source_uri: string;
  parsed_at?: string | null;
  source_body?: Record<string, unknown> | null;
  dataset?: string | null;
  split?: string | null;
  example_id?: string | null;
  curriculum?: string | null;
  subject?: string | null;
  target_level?: string | null;
  tags: string[];
};

export type ContentAtom = {
  id: number;
  atom_type: string;
  atom_body: Record<string, unknown>;
  atom_hash: string;
  source_id: number;
};

export async function fetchLexisQuiz(
  count = 1,
  mode: "4_choice" | "swipe" = "4_choice",
): Promise<LearningQuizResponse> {
  return fetchDomainQuiz("lexis", { count, mode });
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

type DomainQuizParams = {
  difficulty?: string;
  count?: number;
  mode?: "4_choice" | "swipe";
  topic?: string;
  grammar?: string;
};

export async function fetchDomainQuiz(
  domain: string,
  params: DomainQuizParams = {},
): Promise<LearningQuizResponse> {
  const search = new URLSearchParams();
  if (params.difficulty) {
    search.set("difficulty", params.difficulty);
  }
  if (typeof params.count === "number") {
    search.set("count", String(params.count));
  }
  if (params.mode) {
    search.set("mode", params.mode);
  }
  if (params.topic) {
    search.set("topic", params.topic);
  }
  if (params.grammar) {
    search.set("grammar", params.grammar);
  }
  const query = search.toString();
  const suffix = query ? `?${query}` : "";
  return apiFetch<LearningQuizResponse>(`/learning/quiz/${domain}${suffix}`);
}

export async function fetchGrammarQuiz(
  difficulty = "beginner",
  topic = "practice",
  grammar = "present_simple",
): Promise<LearningQuizResponse> {
  return fetchDomainQuiz("grammar", { difficulty, topic, grammar });
}

export async function fetchPhonologyQuiz(
  difficulty = "beginner",
): Promise<LearningQuizResponse> {
  return fetchDomainQuiz("phonology", { difficulty });
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

type SourceFilters = {
  dataset?: string;
  split?: string;
  target_level?: string;
};

type AtomFilters = {
  atom_type?: string;
  source_id?: number;
};

type AtomQuizFilters = {
  atom_type?: string;
  target_level?: string;
  dataset?: string;
  split?: string;
  atom_id?: number;
};

const buildQueryParams = (filters?: Record<string, string | number>) => {
  if (!filters) {
    return "";
  }
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    params.set(key, String(value));
  });
  const query = params.toString();
  return query ? `?${query}` : "";
};

export async function fetchContentSources(
  filters?: SourceFilters,
): Promise<ContentSource[]> {
  const query = buildQueryParams(filters);
  return apiFetch<ContentSource[]>(`/learning/sources${query}`);
}

export async function fetchContentAtoms(
  filters?: AtomFilters,
): Promise<ContentAtom[]> {
  const query = buildQueryParams(filters);
  return apiFetch<ContentAtom[]>(`/learning/atoms${query}`);
}

export async function fetchAtomQuiz(
  filters?: AtomQuizFilters,
): Promise<AtomQuizResponse> {
  const query = buildQueryParams(filters);
  return apiFetch<AtomQuizResponse>(`/learning/quiz/atom${query}`);
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
