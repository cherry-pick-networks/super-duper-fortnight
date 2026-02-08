import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import {
  ContextQuizResponse,
  fetchComposedQuiz,
  fetchContextQuiz,
  fetchDomainQuiz,
  fetchGrammarQuiz,
  fetchLexisQuiz,
  fetchPhonologyQuiz,
  gradeQuiz,
  LearningQuizBundleResponse,
  LearningQuizResponse,
  LearningSkillType,
} from "../lib/api/learning.ts";

type QuizStep = "loading" | "answering" | "checked" | "finished" | "error";

const sessionSize = 5;
const fallbackUserId = 1;
const bundleToolList: ReadonlyArray<LearningSkillType> = [
  "reading",
  "calculation",
  "4_choice",
  "swipe_2_choice",
  "swipe_true_false",
  "grammar_two_choice",
];
type QuizMode =
  | "lexis_4_choice"
  | "lexis_swipe"
  | "context"
  | "reading"
  | "calculation"
  | "phonology"
  | "grammar"
  | "bundle";

export default function QuizSession() {
  const step = useSignal<QuizStep>("loading");
  const index = useSignal(0);
  const selectedIndex = useSignal<number | null>(null);
  const correctCount = useSignal(0);
  const feedback = useSignal("");
  const errorMessage = useSignal("");
  const quiz = useSignal<LearningQuizResponse | null>(null);
  const bundleQuiz = useSignal<LearningQuizBundleResponse | null>(null);
  const contextQuiz = useSignal<ContextQuizResponse | null>(null);
  const mode = useSignal<QuizMode>("lexis_4_choice");
  const contextText = useSignal(
    "Learning flows improve when practice is short and consistent.",
  );
  const contextTargets = useSignal("practice,consistent");
  const difficulty = useSignal("beginner");
  const bundleSubjectKey = useSignal("english");
  const bundleTools = useSignal("reading,grammar_two_choice,swipe_true_false");
  const bundleTopic = useSignal("office");
  const bundleGrammar = useSignal("present_simple");
  const userId = useSignal(
    typeof globalThis === "undefined" || !("localStorage" in globalThis)
      ? "1"
      : globalThis.localStorage.getItem("picker_user_id") ?? "1",
  );
  const totalCount = () => {
    if (mode.value === "context") {
      return 1;
    }
    if (mode.value === "bundle") {
      return bundleQuiz.value?.skills?.length ?? 1;
    }
    if (mode.value === "lexis_4_choice" || mode.value === "lexis_swipe") {
      return sessionSize;
    }
    return 1;
  };

  const getActiveSkill = () => {
    if (mode.value === "bundle") {
      return bundleQuiz.value?.skills?.[index.value] ?? null;
    }
    return quiz.value?.skill ?? null;
  };

  const parseBundleTools = (value: string): LearningSkillType[] => {
    const tokens = value
      .split(",")
      .map((token) => token.trim())
      .filter(Boolean);
    return tokens.filter((tool): tool is LearningSkillType =>
      bundleToolList.includes(tool as LearningSkillType),
    );
  };

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
          difficulty.value,
        );
        contextQuiz.value = response;
        quiz.value = null;
        bundleQuiz.value = null;
      } else if (mode.value === "lexis_4_choice") {
        const response = await fetchLexisQuiz(1, "4_choice");
        quiz.value = response;
        contextQuiz.value = null;
        bundleQuiz.value = null;
      } else if (mode.value === "lexis_swipe") {
        const response = await fetchLexisQuiz(1, "swipe");
        quiz.value = response;
        contextQuiz.value = null;
        bundleQuiz.value = null;
      } else if (mode.value === "reading") {
        const response = await fetchDomainQuiz("text", difficulty.value);
        quiz.value = response;
        contextQuiz.value = null;
        bundleQuiz.value = null;
      } else if (mode.value === "calculation") {
        const response = await fetchDomainQuiz("formula", difficulty.value);
        quiz.value = response;
        contextQuiz.value = null;
        bundleQuiz.value = null;
      } else if (mode.value === "phonology") {
        const response = await fetchPhonologyQuiz(difficulty.value);
        quiz.value = response;
        contextQuiz.value = null;
        bundleQuiz.value = null;
      } else if (mode.value === "grammar") {
        const response = await fetchGrammarQuiz(
          difficulty.value,
          bundleTopic.value,
          bundleGrammar.value,
        );
        quiz.value = response;
        contextQuiz.value = null;
        bundleQuiz.value = null;
      } else if (mode.value === "bundle") {
        const tools = parseBundleTools(bundleTools.value);
        if (tools.length === 0) {
          errorMessage.value = "Provide at least one valid tool.";
          step.value = "error";
          return;
        }
        const response = await fetchComposedQuiz({
          subject_key: bundleSubjectKey.value,
          tools,
          difficulty: difficulty.value,
          topic: bundleTopic.value,
          grammar: bundleGrammar.value,
        });
        bundleQuiz.value = response;
        index.value = 0;
        selectedIndex.value = null;
        quiz.value = null;
        contextQuiz.value = null;
      } else {
        const response = await fetchLexisQuiz(1, "4_choice");
        quiz.value = response;
        contextQuiz.value = null;
        bundleQuiz.value = null;
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

  const setMode = (nextMode: QuizMode) => {
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
    void loadQuiz();
  };

  const selectChoice = (choiceIndex: number) => {
    if (step.value !== "answering") {
      return;
    }
    selectedIndex.value = choiceIndex;
  };

  const checkAnswer = async () => {
    const activeSkill = getActiveSkill();
    const activeType = activeSkill?.type;
    const activeContent = activeSkill?.content;
    const requiresSelection =
      mode.value === "context" ||
      activeType === "4_choice" ||
      activeType === "swipe_2_choice" ||
      activeType === "swipe_true_false" ||
      activeType === "grammar_two_choice";
    if (requiresSelection && selectedIndex.value === null) {
      feedback.value = "Select an answer before checking.";
      return;
    }

    if (activeType === "reading" || activeType === "calculation") {
      feedback.value = "Marked as done.";
      step.value = "checked";
      return;
    }
    if (activeType === "swipe_true_false") {
      const isMatch =
        typeof activeContent === "object" &&
        activeContent !== null &&
        "is_match" in activeContent
          ? Boolean(activeContent.is_match)
          : null;
      if (typeof isMatch !== "boolean" || selectedIndex.value === null) {
        feedback.value = "Quiz content is missing.";
        return;
      }
      const isCorrect =
        (selectedIndex.value === 0 && isMatch) ||
        (selectedIndex.value === 1 && !isMatch);
      if (isCorrect) {
        correctCount.value += 1;
        feedback.value = "Correct. Nice work.";
      } else {
        feedback.value = "Not quite. Review the hint and try again next time.";
      }
      step.value = "checked";
      return;
    }
    if (activeType === "grammar_two_choice") {
      const choices =
        typeof activeContent === "object" &&
        activeContent !== null &&
        "choices" in activeContent
          ? activeContent.choices
          : null;
      if (!Array.isArray(choices)) {
        feedback.value = "Quiz content is missing.";
        return;
      }
      const correctIndex = choices.findIndex((choice) => choice.is_correct);
      const isCorrect = selectedIndex.value === correctIndex;
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

    const item = activeContent;
    const options =
      typeof item === "object" && item !== null && "options" in item
        ? item.options
        : null;
    if (!item || !Array.isArray(options)) {
      feedback.value = "Quiz content is missing.";
      return;
    }

    const correctIndex = options.findIndex((option) => option.is_correct);
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
    const maxCount = totalCount();
    if (nextIndex >= maxCount) {
      step.value = "finished";
      return;
    }
    index.value = nextIndex;
    selectedIndex.value = null;
    feedback.value = "";
    if (mode.value === "bundle") {
      step.value = "answering";
      return;
    }
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
                  aria-pressed={mode.value === "lexis_4_choice"}
                  onClick={() => setMode("lexis_4_choice")}
                >
                  Lexis 4-Choice
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "lexis_swipe"}
                  onClick={() => setMode("lexis_swipe")}
                >
                  Lexis Swipe
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
                  aria-pressed={mode.value === "reading"}
                  onClick={() => setMode("reading")}
                >
                  Reading
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "calculation"}
                  onClick={() => setMode("calculation")}
                >
                  Calculation
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "phonology"}
                  onClick={() => setMode("phonology")}
                >
                  Phonology
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
              <li>
                <button
                  type="button"
                  aria-pressed={mode.value === "bundle"}
                  onClick={() => setMode("bundle")}
                >
                  Bundle
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
          <button type="button" onClick={saveAuth}>
            Apply
          </button>
        </fieldset>
        <fieldset>
          <legend>Quiz Settings</legend>
          <label>
            <strong>Difficulty</strong>
            <input
              value={difficulty.value}
              onInput={(event) =>
                (difficulty.value =
                  (event.target as HTMLInputElement).value)}
            />
          </label>
          <button type="button" onClick={loadQuiz}>
            Reload Quiz
          </button>
        </fieldset>
        {mode.value === "grammar" ? (
          <fieldset>
            <legend>Grammar Settings</legend>
            <label>
              <strong>Topic</strong>
              <input
                value={bundleTopic.value}
                onInput={(event) =>
                  (bundleTopic.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              <strong>Grammar</strong>
              <input
                value={bundleGrammar.value}
                onInput={(event) =>
                  (bundleGrammar.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <button type="button" onClick={loadQuiz}>
              Generate Grammar Quiz
            </button>
          </fieldset>
        ) : null}
        {mode.value === "bundle" ? (
          <fieldset>
            <legend>Bundle Settings</legend>
            <label>
              <strong>Subject Key</strong>
              <input
                value={bundleSubjectKey.value}
                onInput={(event) =>
                  (bundleSubjectKey.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              <strong>Tools (comma-separated)</strong>
              <input
                value={bundleTools.value}
                onInput={(event) =>
                  (bundleTools.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              <strong>Topic</strong>
              <input
                value={bundleTopic.value}
                onInput={(event) =>
                  (bundleTopic.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              <strong>Grammar</strong>
              <input
                value={bundleGrammar.value}
                onInput={(event) =>
                  (bundleGrammar.value =
                    (event.target as HTMLInputElement).value)}
              />
            </label>
            <button type="button" onClick={loadQuiz}>
              Generate Bundle
            </button>
          </fieldset>
        ) : null}
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

  const activeSkill = getActiveSkill();
  const content = activeSkill?.content;
  const skillType = activeSkill?.type;
  const isChecked = step.value === "checked";

  if (skillType === "reading") {
    const text =
      typeof content === "object" && content !== null && "text" in content
        ? String(content.text ?? "")
        : "";
    return (
      <section>
        {renderToolbar()}
        <details>
          <summary>Reading</summary>
          <header>
            <p>
              Question {index.value + 1} / {totalCount()}
            </p>
            <p>Score {correctCount.value}</p>
          </header>
          <p>{text}</p>
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
                Start Over
              </button>
            </li>
          </menu>
        </details>
      </section>
    );
  }

  if (skillType === "calculation") {
    const expression =
      typeof content === "object" && content !== null && "expression" in content
        ? String(content.expression ?? "")
        : "";
    const answerRange =
      typeof content === "object" && content !== null && "answer_range" in content
        ? content.answer_range
        : null;
    const answerRangeText = answerRange
      ? JSON.stringify(answerRange, null, 2)
      : "";
    return (
      <section>
        {renderToolbar()}
        <details>
          <summary>Calculation</summary>
          <header>
            <p>
              Question {index.value + 1} / {totalCount()}
            </p>
            <p>Score {correctCount.value}</p>
          </header>
          <section>
            <h2>Expression</h2>
            <p>
              <code>{expression}</code>
            </p>
          </section>
          {answerRangeText ? (
            <section>
              <h2>Answer Range</h2>
              <pre>{answerRangeText}</pre>
            </section>
          ) : null}
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
                Start Over
              </button>
            </li>
          </menu>
        </details>
      </section>
    );
  }

  if (skillType === "swipe_true_false") {
    const isMatch =
      typeof content === "object" && content !== null && "is_match" in content
        ? Boolean(content.is_match)
        : null;
    const word =
      typeof content === "object" && content !== null && "word" in content
        ? String(content.word ?? "")
        : "";
    const pronunciation =
      typeof content === "object" && content !== null && "pronunciation" in content
        ? String(content.pronunciation ?? "")
        : "";
    const audioUrl =
      typeof content === "object" && content !== null && "audio_url" in content
        ? String(content.audio_url ?? "")
        : "";
    const syllables =
      typeof content === "object" && content !== null && "syllables" in content
        ? String(content.syllables ?? "")
        : "";
    const scoreValue =
      typeof content === "object" && content !== null && "score" in content
        ? String(content.score ?? "")
        : "";
    return (
      <section>
        {renderToolbar()}
        <details>
          <summary>Phonology</summary>
          <header>
            <p>
              Question {index.value + 1} / {totalCount()}
            </p>
            <p>Score {correctCount.value}</p>
          </header>
          <table>
            <caption>Prompt</caption>
            <tbody>
              <tr>
                <th scope="row">Word</th>
                <td>{word}</td>
              </tr>
              <tr>
                <th scope="row">Pronunciation</th>
                <td>{pronunciation}</td>
              </tr>
              {syllables ? (
                <tr>
                  <th scope="row">Syllables</th>
                  <td>{syllables}</td>
                </tr>
              ) : null}
              {scoreValue ? (
                <tr>
                  <th scope="row">Score</th>
                  <td>{scoreValue}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {audioUrl ? (
            <section>
              <h2>Audio</h2>
              <audio controls src={audioUrl} />
            </section>
          ) : null}
          <fieldset>
            <legend>Does the audio match the word?</legend>
            <ol>
              <li>
                <button
                  type="button"
                  aria-pressed={selectedIndex.value === 0}
                  onClick={() => selectChoice(0)}
                >
                  True
                </button>
              </li>
              <li>
                <button
                  type="button"
                  aria-pressed={selectedIndex.value === 1}
                  onClick={() => selectChoice(1)}
                >
                  False
                </button>
              </li>
            </ol>
          </fieldset>
          {isChecked && typeof isMatch === "boolean" ? (
            <p>
              Correct answer: {isMatch ? "True" : "False"}
            </p>
          ) : null}
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
                  Finish
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

  if (skillType === "grammar_two_choice") {
    const leadingSentences =
      typeof content === "object" &&
      content !== null &&
      "leading_sentences" in content
        ? content.leading_sentences
        : [];
    const trailingSentences =
      typeof content === "object" &&
      content !== null &&
      "trailing_sentences" in content
        ? content.trailing_sentences
        : [];
    const choices =
      typeof content === "object" && content !== null && "choices" in content
        ? content.choices
        : [];
    if (!Array.isArray(choices)) {
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
          <summary>Grammar</summary>
          <header>
            <p>
              Question {index.value + 1} / {totalCount()}
            </p>
            <p>Score {correctCount.value}</p>
          </header>
          {Array.isArray(leadingSentences) && leadingSentences.length > 0 ? (
            <section>
              <h2>Prompt</h2>
              <ul>
                {leadingSentences.map((sentence, sentenceIndex) => (
                  <li key={`${sentence}-${sentenceIndex}`}>{sentence}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <fieldset>
            <legend>Choose the correct sentence</legend>
            <ol>
              {choices.map((choice, choiceIndex) => {
                const isSelected = choiceIndex === selectedIndex.value;
                const showCorrect =
                  isChecked && (choice.is_correct || isSelected);
                const statusLabel = showCorrect
                  ? choice.is_correct
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
                      {choice.parts?.map((part, partIndex) =>
                        part.is_bold ? (
                          <strong key={`part-${partIndex}`}>{part.text}</strong>
                        ) : (
                          part.text
                        ),
                      )}
                      {statusLabel ? <small> ({statusLabel})</small> : null}
                    </button>
                  </li>
                );
              })}
            </ol>
          </fieldset>
          {Array.isArray(trailingSentences) && trailingSentences.length > 0 ? (
            <section>
              <h2>Notes</h2>
              <ul>
                {trailingSentences.map((sentence, sentenceIndex) => (
                  <li key={`${sentence}-${sentenceIndex}`}>{sentence}</li>
                ))}
              </ul>
            </section>
          ) : null}
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

  if (!content) {
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

  const options =
    typeof content === "object" && content !== null && "options" in content
      ? content.options
      : null;
  const question =
    typeof content === "object" && content !== null && "question" in content
      ? String(content.question ?? "")
      : "";
  const label =
    typeof content === "object" && content !== null && "label" in content
      ? String(content.label ?? "")
      : "";
  if (!Array.isArray(options)) {
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
        <h2>{question}</h2>
        <ol>
          {options.map((choice, choiceIndex) => {
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
                {skillType === "swipe_2_choice" && label ? (
                  <strong>{label}</strong>
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
