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

type GrammarChoicePart = {
  text: string;
  isBold?: boolean;
};

type GrammarChoice = {
  parts: GrammarChoicePart[];
  isCorrect: boolean;
};

type GrammarQuizItem = {
  leadingSentences: string[];
  choices: [GrammarChoice, GrammarChoice];
  trailingSentences: string[];
};

const sessionSize = 5;
const grammarItems: GrammarQuizItem[] = [
  {
    leadingSentences: ["She ____ to the office every day."],
    choices: [
      {
        parts: [
          { text: "She " },
          { text: "goes", isBold: true },
          { text: " to the office every day." },
        ],
        isCorrect: true,
      },
      {
        parts: [
          { text: "She " },
          { text: "go", isBold: true },
          { text: " to the office every day." },
        ],
        isCorrect: false,
      },
    ],
    trailingSentences: ["Her schedule is consistent throughout the week."],
  },
  {
    leadingSentences: ["If he ____ earlier, he would have caught the train."],
    choices: [
      {
        parts: [
          { text: "If he " },
          { text: "had left", isBold: true },
          { text: " earlier, he would have caught the train." },
        ],
        isCorrect: true,
      },
      {
        parts: [
          { text: "If he " },
          { text: "left", isBold: true },
          { text: " earlier, he would have caught the train." },
        ],
        isCorrect: false,
      },
    ],
    trailingSentences: ["He missed it by a few minutes."],
  },
  {
    leadingSentences: ["The report ____ on your desk."],
    choices: [
      {
        parts: [
          { text: "The report " },
          { text: "is", isBold: true },
          { text: " on your desk." },
        ],
        isCorrect: true,
      },
      {
        parts: [
          { text: "The report " },
          { text: "are", isBold: true },
          { text: " on your desk." },
        ],
        isCorrect: false,
      },
    ],
    trailingSentences: ["Please review it before the meeting."],
  },
];
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
  const mode = useSignal<"4_choice" | "swipe" | "context" | "grammar">(
    "4_choice",
  );
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
  const totalCount = () => {
    if (mode.value === "context") {
      return 1;
    }
    if (mode.value === "grammar") {
      return grammarItems.length;
    }
    return sessionSize;
  };

  const loadQuiz = async () => {
    step.value = "loading";
    feedback.value = "";
    try {
      if (mode.value === "grammar") {
        quiz.value = null;
        contextQuiz.value = null;
      } else if (mode.value === "context") {
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

  const setMode = (nextMode: "4_choice" | "swipe" | "context" | "grammar") => {
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
    if (mode.value === "grammar") {
      const item = grammarItems[index.value];
      if (!item) {
        feedback.value = "Quiz content is missing.";
        return;
      }
      const isCorrect = item.choices[selectedIndex.value]?.isCorrect ?? false;
      if (isCorrect) {
        correctCount.value += 1;
        feedback.value = "Correct. Nice work.";
      } else {
        feedback.value = "Not quite. Review the hint and try again next time.";
      }
      step.value = "checked";
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
    const maxCount =
      mode.value === "grammar" ? grammarItems.length : sessionSize;
    if (nextIndex >= maxCount) {
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
    <details>
      <summary>Controls</summary>
      <section>
        <header>
          <p>Mode</p>
          <nav>
            <menu>
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
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "grammar"}
                  onClick={() => setMode("grammar")}
                >
                  Grammar
                </button>
              </li>
            </menu>
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
        <details>
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
        <details>
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
        <details>
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
        <details>
          <summary>Question</summary>
          <header>
            <p>Context Quiz</p>
            <p>Score {correctCount.value}</p>
          </header>
          <h2>Fill the blank</h2>
          <p>{contextQuiz.value.blanked_text}</p>
          {contextOptions.length > 0 ? (
            <ol>
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
            </ol>
          ) : (
            <p>No options provided for this blank yet.</p>
          )}
          <p aria-live="polite">{feedback.value}</p>
        </details>
        <details>
          <summary>Actions</summary>
          <menu>
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
          </menu>
        </details>
      </section>
    );
  }

  if (mode.value === "grammar") {
    const item = grammarItems[index.value];
    const isChecked = step.value === "checked";
    if (!item) {
      return (
        <section>
          {renderToolbar()}
          <details>
            <summary>Session Status</summary>
            <h2>Quiz Data Missing</h2>
            <p>The grammar quiz content is missing.</p>
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
        <details>
          <summary>Question</summary>
          <header>
            <p>
              Question {index.value + 1} / {totalCount()}
            </p>
            <p>Score {correctCount.value}</p>
          </header>
          <section>
            <h2>Leading Sentences</h2>
            <ol>
              {item.leadingSentences.map((sentence, sentenceIndex) => (
                <li key={`${sentence}-${sentenceIndex}`}>{sentence}</li>
              ))}
            </ol>
          </section>
          <fieldset>
            <legend>Choose the best sentence</legend>
            <ol>
              {item.choices.map((choice, choiceIndex) => {
                const isSelected = choiceIndex === selectedIndex.value;
                const showCorrect =
                  isChecked && (choice.isCorrect || isSelected);
                const statusLabel = showCorrect
                  ? choice.isCorrect
                    ? "Correct answer"
                    : "Your choice"
                  : isSelected
                  ? "Selected"
                  : "";

                return (
                  <li key={`grammar-choice-${choiceIndex}`}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectChoice(choiceIndex)}
                    >
                      {choice.parts.map((part, partIndex) =>
                        part.isBold ? (
                          <strong key={`part-${choiceIndex}-${partIndex}`}>
                            {part.text}
                          </strong>
                        ) : (
                          part.text
                        )
                      )}
                      {statusLabel ? <em> ({statusLabel})</em> : null}
                    </button>
                  </li>
                );
              })}
            </ol>
          </fieldset>
          <section>
            <h2>Trailing Sentences</h2>
            <ol>
              {item.trailingSentences.map((sentence, sentenceIndex) => (
                <li key={`${sentence}-${sentenceIndex}`}>{sentence}</li>
              ))}
            </ol>
          </section>
          <p aria-live="polite">{feedback.value}</p>
        </details>
        <details>
          <summary>Actions</summary>
          <menu>
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
              <button type="button" onClick={restartQuiz}>
                Start Over
              </button>
            </li>
          </menu>
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
        <details>
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
      <details>
        <summary>Question</summary>
        <header>
          <p>
            Question {index.value + 1} / {totalCount()}
          </p>
          <p>Score {correctCount.value}</p>
        </header>
        <h2>{item.question}</h2>
        <ol>
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
        </ol>
        <p aria-live="polite">{feedback.value}</p>
      </details>
      <details>
        <summary>Actions</summary>
        <menu>
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
        </menu>
      </details>
    </section>
  );
}
