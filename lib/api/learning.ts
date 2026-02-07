import { apiFetch } from "./client.ts";

export type QuizOption = {
  text: string;
  is_correct: boolean;
};

export type QuizSkillContent = {
  question: string;
  options: QuizOption[];
  index?: number;
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
