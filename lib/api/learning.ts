import { apiFetch } from "./client.ts";

export type QuizOption = {
  text: string;
  is_correct: boolean;
};

export type QuizSkillContent = {
  question: string;
  options: QuizOption[];
  index?: number;
  mode?: string;
  label?: string;
  color?: string;
};

export type LearningQuizResponse = {
  meta?: {
    id?: string;
    source?: string;
    version?: string;
  };
  system?: {
    domain?: string;
    target?: number;
    difficulty?: string;
  };
  skill?: {
    type?: string;
    content?: QuizSkillContent;
  };
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
