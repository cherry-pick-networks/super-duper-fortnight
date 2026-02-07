import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import {
  fetchLexisQuiz,
  gradeQuiz,
  LearningQuizResponse,
} from "../lib/api/learning.ts";

type QuizStep = "loading" | "answering" | "checked" | "finished" | "error";

const sessionSize = 5;
const fallbackUserId = 1;

export default function QuizSession() {
  const step = useSignal<QuizStep>("loading");
  const index = useSignal(0);
  const selectedIndex = useSignal<number | null>(null);
  const correctCount = useSignal(0);
  const feedback = useSignal("");
  const errorMessage = useSignal("");
  const quiz = useSignal<LearningQuizResponse | null>(null);

  useEffect(() => {
    void loadQuiz();
  }, []);

  const loadQuiz = async () => {
    step.value = "loading";
    feedback.value = "";
    try {
      const response = await fetchLexisQuiz(1, "4_choice");
      quiz.value = response;
      step.value = "answering";
    } catch (error) {
      console.error(error);
      errorMessage.value = "Failed to load quiz data.";
      step.value = "error";
    }
  };

  const selectChoice = (choiceIndex: number) => {
    if (step.value !== "answering") {
      return;
    }
    selectedIndex.value = choiceIndex;
  };

  const checkAnswer = async () => {
    if (selectedIndex.value === null) {
      feedback.value = "Select an answer before checking.";
      return;
    }
    const item = quiz.value?.skill?.content;
    if (!item) {
      feedback.value = "Quiz content is missing.";
      return;
    }

    const correctIndex = item.options.findIndex((option) => option.is_correct);
    const isCorrect = selectedIndex.value === correctIndex;
    if (isCorrect) {
      correctCount.value += 1;
      feedback.value = "Correct. Nice work.";
    } else {
      feedback.value = "Not quite. Review the hint and try again next time.";
    }
    step.value = "checked";

    const quizId = quiz.value?.system?.target;
    if (typeof quizId === "number") {
      const score = isCorrect ? 100 : 0;
      try {
        await gradeQuiz(fallbackUserId, quizId, score);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const nextQuestion = () => {
    const nextIndex = index.value + 1;
    if (nextIndex >= sessionSize) {
      step.value = "finished";
      return;
    }
    index.value = nextIndex;
    selectedIndex.value = null;
    feedback.value = "";
    void loadQuiz();
  };

  const restartQuiz = () => {
    index.value = 0;
    selectedIndex.value = null;
    correctCount.value = 0;
    feedback.value = "";
    void loadQuiz();
  };

  if (step.value === "loading") {
    return (
      <section class="quiz-card">
        <h2>Loading Quiz</h2>
        <p class="muted">Fetching the latest quiz from the learning API.</p>
      </section>
    );
  }

  if (step.value === "error") {
    return (
      <section class="quiz-card">
        <h2>Quiz Error</h2>
        <p class="muted">{errorMessage.value}</p>
        <button type="button" class="button" onClick={loadQuiz}>
          Retry
        </button>
      </section>
    );
  }

  if (step.value === "finished") {
    return (
      <section class="quiz-card">
        <h2>Session Complete</h2>
        <p class="muted">
          You answered {correctCount.value} out of {sessionSize} correctly.
        </p>
        <button type="button" class="button" onClick={restartQuiz}>
          Start New Session
        </button>
      </section>
    );
  }

  const item = quiz.value?.skill?.content;
  const isChecked = step.value === "checked";

  if (!item) {
    return (
      <section class="quiz-card">
        <h2>Quiz Data Missing</h2>
        <p class="muted">The API response did not include quiz content.</p>
        <button type="button" class="button" onClick={loadQuiz}>
          Reload
        </button>
      </section>
    );
  }

  return (
    <section class="quiz-card">
      <div class="quiz-meta">
        <span class="quiz-step">
          Question {index.value + 1} / {sessionSize}
        </span>
        <span class="quiz-score">Score {correctCount.value}</span>
      </div>
      <h2>{item.question}</h2>
      <div class="quiz-choices">
        {item.options.map((choice, choiceIndex) => {
          const isSelected = choiceIndex === selectedIndex.value;
          const isCorrectChoice = choice.is_correct;
          const showCorrect =
            isChecked && (isCorrectChoice || isSelected);
          const className = [
            "quiz-choice",
            isSelected ? "is-selected" : "",
            showCorrect && isCorrectChoice ? "is-correct" : "",
            showCorrect && isSelected && !isCorrectChoice ? "is-wrong" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              type="button"
              key={`${choice.text}-${choiceIndex}`}
              class={className}
              onClick={() => selectChoice(choiceIndex)}
            >
              {choice.text}
            </button>
          );
        })}
      </div>
      <p class="quiz-feedback">{feedback.value}</p>
      <div class="quiz-actions">
        {!isChecked ? (
          <button type="button" class="button" onClick={checkAnswer}>
            Check Answer
          </button>
        ) : (
          <button type="button" class="button" onClick={nextQuestion}>
            Next
          </button>
        )}
        <a class="text-link" href="/learning">
          Back to Learning
        </a>
      </div>
    </section>
  );
}
