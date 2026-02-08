import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import {
  ContextQuizResponse,
  fetchContextQuiz,
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
  const contextQuiz = useSignal<ContextQuizResponse | null>(null);
  const mode = useSignal<"4_choice" | "swipe" | "context">("4_choice");
  const contextText = useSignal(
    "Learning flows improve when practice is short and consistent.",
  );
  const contextTargets = useSignal("practice,consistent");
  const contextDifficulty = useSignal("medium");
  const userId = useSignal(
    typeof globalThis === "undefined" || !("localStorage" in globalThis)
      ? "1"
      : globalThis.localStorage.getItem("picker_user_id") ?? "1",
  );
  const licenseKey = useSignal(
    typeof globalThis === "undefined" || !("localStorage" in globalThis)
      ? ""
      : globalThis.localStorage.getItem("picker_license_key") ?? "",
  );
  const totalCount = () => (mode.value === "context" ? 1 : sessionSize);

  const loadQuiz = async () => {
    step.value = "loading";
    feedback.value = "";
    try {
      if (mode.value === "context") {
        const targets = contextTargets.value
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);
        const response = await fetchContextQuiz(
          contextText.value,
          targets,
          contextDifficulty.value,
        );
        contextQuiz.value = response;
        quiz.value = null;
      } else {
        const response = await fetchLexisQuiz(1, mode.value);
        quiz.value = response;
        contextQuiz.value = null;
      }
      step.value = "answering";
    } catch (error) {
      console.error(error);
      errorMessage.value = "Failed to load quiz data.";
      step.value = "error";
    }
  };

  useEffect(() => {
    void loadQuiz();
  }, []);

  const setMode = (nextMode: "4_choice" | "swipe" | "context") => {
    mode.value = nextMode;
    index.value = 0;
    selectedIndex.value = null;
    correctCount.value = 0;
    feedback.value = "";
    errorMessage.value = "";
    void loadQuiz();
  };

  const saveAuth = () => {
    if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
      return;
    }
    globalThis.localStorage.setItem("picker_user_id", userId.value);
    globalThis.localStorage.setItem("picker_license_key", licenseKey.value);
    void loadQuiz();
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
    if (mode.value === "context") {
      feedback.value = "Context quizzes do not require grading yet.";
      step.value = "checked";
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
    if (mode.value === "context") {
      step.value = "finished";
      return;
    }
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

  const renderToolbar = () => (
    <details open>
      <summary>Controls</summary>
      <section>
        <header>
          <p>Mode</p>
          <nav>
            <ul>
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "4_choice"}
                  onClick={() => setMode("4_choice")}
                >
                  4-Choice
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "swipe"}
                  onClick={() => setMode("swipe")}
                >
                  Swipe
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "context"}
                  onClick={() => setMode("context")}
                >
                  Context
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <fieldset>
          <legend>Authentication</legend>
          <label>
            <strong>User ID</strong>
            <input
              value={userId.value}
              onInput={(event) =>
                (userId.value = (event.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            <strong>License Key</strong>
            <input
              value={licenseKey.value}
              onInput={(event) =>
                (licenseKey.value = (event.target as HTMLInputElement).value)}
            />
          </label>
          <button type="button" onClick={saveAuth}>
            Apply
          </button>
        </fieldset>
        {mode.value === "context" ? (
          <fieldset>
            <legend>Context Quiz</legend>
            <label>
              <strong>Source Text</strong>
              <textarea
                value={contextText.value}
                onInput={(event) =>
                  (contextText.value =
                    (event.target as HTMLTextAreaElement).value)}
              />
            </label>
            <label>
              <strong>Target Words (comma-separated)</strong>
              <input
                value={contextTargets.value}
                onInput={(event) =>
                  (contextTargets.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              <strong>Difficulty</strong>
              <input
                value={contextDifficulty.value}
                onInput={(event) =>
                  (contextDifficulty.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <button type="button" onClick={loadQuiz}>
              Generate Context Quiz
            </button>
          </fieldset>
        ) : null}
      </section>
    </details>
  );

  if (step.value === "loading") {
    return (
      <section>
        {renderToolbar()}
        <details open>
          <summary>Session Status</summary>
          <h2>Loading Quiz</h2>
          <p>Fetching the latest quiz from the learning API.</p>
        </details>
      </section>
    );
  }

  if (step.value === "error") {
    return (
      <section>
        {renderToolbar()}
        <details open>
          <summary>Session Status</summary>
          <h2>Quiz Error</h2>
          <p>{errorMessage.value}</p>
          <button type="button" onClick={loadQuiz}>
            Retry
          </button>
        </details>
      </section>
    );
  }

  if (step.value === "finished") {
    return (
      <section>
        {renderToolbar()}
        <details open>
          <summary>Session Status</summary>
          <h2>Session Complete</h2>
          <p>
            You answered {correctCount.value} out of {totalCount()} correctly.
          </p>
          <button type="button" onClick={restartQuiz}>
            Start New Session
          </button>
        </details>
      </section>
    );
  }

  if (mode.value === "context" && contextQuiz.value) {
    const firstBlank = contextQuiz.value.blanks?.[0];
    const contextOptions = firstBlank?.options ?? [];
    const isChecked = step.value === "checked";
    return (
      <section>
        {renderToolbar()}
        <details open>
          <summary>Question</summary>
          <header>
            <p>Context Quiz</p>
            <p>Score {correctCount.value}</p>
          </header>
          <h2>Fill the blank</h2>
          <p>{contextQuiz.value.blanked_text}</p>
          {contextOptions.length > 0 ? (
            <ul>
              {contextOptions.map((choice, choiceIndex) => {
                const isSelected = choiceIndex === selectedIndex.value;
                const isCorrectChoice =
                  choice.toLowerCase() === firstBlank?.answer?.toLowerCase();
                const showCorrect =
                  step.value === "checked" && (isCorrectChoice || isSelected);
                const statusLabel = showCorrect
                  ? isCorrectChoice
                    ? "Correct answer"
                    : "Your choice"
                  : isSelected
                  ? "Selected"
                  : "";

                return (
                  <li key={`${choice}-${choiceIndex}`}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectChoice(choiceIndex)}
                    >
                      {choice}
                      {statusLabel ? <small> ({statusLabel})</small> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No options provided for this blank yet.</p>
          )}
          <p aria-live="polite">{feedback.value}</p>
        </details>
        <details open>
          <summary>Actions</summary>
          <ul>
            {!isChecked ? (
              <li>
                <button type="button" onClick={checkAnswer}>
                  Mark as Done
                </button>
              </li>
            ) : (
              <li>
                <button type="button" onClick={nextQuestion}>
                  Finish
                </button>
              </li>
            )}
            <li>
              <button type="button" onClick={restartQuiz}>
                Regenerate
              </button>
            </li>
          </ul>
        </details>
      </section>
    );
  }

  const item = quiz.value?.skill?.content;
  const isChecked = step.value === "checked";

  if (!item) {
    return (
      <section>
        {renderToolbar()}
        <details open>
          <summary>Session Status</summary>
          <h2>Quiz Data Missing</h2>
          <p>The API response did not include quiz content.</p>
          <button type="button" onClick={loadQuiz}>
            Reload
          </button>
        </details>
      </section>
    );
  }

  return (
    <section>
      {renderToolbar()}
      <details open>
        <summary>Question</summary>
        <header>
          <p>
            Question {index.value + 1} / {totalCount()}
          </p>
          <p>Score {correctCount.value}</p>
        </header>
        <h2>{item.question}</h2>
        <ul>
          {item.options.map((choice, choiceIndex) => {
            const isSelected = choiceIndex === selectedIndex.value;
            const isCorrectChoice = choice.is_correct;
            const showCorrect =
              isChecked && (isCorrectChoice || isSelected);
            const statusLabel = showCorrect
              ? isCorrectChoice
                ? "Correct answer"
                : "Your choice"
              : isSelected
              ? "Selected"
              : "";

            return (
              <li key={`${choice.text}-${choiceIndex}`}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectChoice(choiceIndex)}
                >
                  {mode.value === "swipe" ? (
                    <strong>{item.label ?? "Swipe"}</strong>
                  ) : null}{" "}
                  {choice.text}
                  {statusLabel ? <small> ({statusLabel})</small> : null}
                </button>
              </li>
            );
          })}
        </ul>
        <p aria-live="polite">{feedback.value}</p>
      </details>
      <details open>
        <summary>Actions</summary>
        <ul>
          {!isChecked ? (
            <li>
              <button type="button" onClick={checkAnswer}>
                Check Answer
              </button>
            </li>
          ) : (
            <li>
              <button type="button" onClick={nextQuestion}>
                Next
              </button>
            </li>
          )}
          <li>
            <a href="/learning">Back to Learning</a>
          </li>
        </ul>
      </details>
    </section>
  );
}
