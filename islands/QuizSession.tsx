import { useSignal } from "@preact/signals";

type QuizItem = {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
};

const quizItems: QuizItem[] = [
  {
    id: "quiz-1",
    prompt: "Which option best matches the word 'resilient'?",
    choices: ["Fragile", "Adaptable", "Silent", "Shallow"],
    answerIndex: 1,
  },
  {
    id: "quiz-2",
    prompt: "Pick the correct meaning of 'allocate'.",
    choices: ["Delay", "Assign", "Refuse", "Measure"],
    answerIndex: 1,
  },
  {
    id: "quiz-3",
    prompt: "Which sentence uses 'sustain' correctly?",
    choices: [
      "She sustained a smile for the photo.",
      "They sustain the proposal yesterday.",
      "He sustain to the meeting.",
      "We sustain about the news.",
    ],
    answerIndex: 0,
  },
];

type QuizStep = "answering" | "checked" | "finished";

export default function QuizSession() {
  const step = useSignal<QuizStep>("answering");
  const index = useSignal(0);
  const selectedIndex = useSignal<number | null>(null);
  const correctCount = useSignal(0);
  const feedback = useSignal("");

  const currentItem = () => quizItems[index.value];

  const selectChoice = (choiceIndex: number) => {
    if (step.value !== "answering") {
      return;
    }
    selectedIndex.value = choiceIndex;
  };

  const checkAnswer = () => {
    if (selectedIndex.value === null) {
      feedback.value = "Select an answer before checking.";
      return;
    }
    const isCorrect = selectedIndex.value === currentItem().answerIndex;
    if (isCorrect) {
      correctCount.value += 1;
      feedback.value = "Correct. Nice work.";
    } else {
      feedback.value = "Not quite. Review the hint and try again next time.";
    }
    step.value = "checked";
  };

  const nextQuestion = () => {
    const nextIndex = index.value + 1;
    if (nextIndex >= quizItems.length) {
      step.value = "finished";
      return;
    }
    index.value = nextIndex;
    selectedIndex.value = null;
    feedback.value = "";
    step.value = "answering";
  };

  const restartQuiz = () => {
    index.value = 0;
    selectedIndex.value = null;
    correctCount.value = 0;
    feedback.value = "";
    step.value = "answering";
  };

  if (step.value === "finished") {
    return (
      <section class="quiz-card">
        <h2>Session Complete</h2>
        <p class="muted">
          You answered {correctCount.value} out of {quizItems.length} correctly.
        </p>
        <button type="button" class="button" onClick={restartQuiz}>
          Start New Session
        </button>
      </section>
    );
  }

  const item = currentItem();
  const isChecked = step.value === "checked";

  return (
    <section class="quiz-card">
      <div class="quiz-meta">
        <span class="quiz-step">
          Question {index.value + 1} / {quizItems.length}
        </span>
        <span class="quiz-score">Score {correctCount.value}</span>
      </div>
      <h2>{item.prompt}</h2>
      <div class="quiz-choices">
        {item.choices.map((choice, choiceIndex) => {
          const isSelected = choiceIndex === selectedIndex.value;
          const isCorrectChoice = choiceIndex === item.answerIndex;
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
              key={choice}
              class={className}
              onClick={() => selectChoice(choiceIndex)}
            >
              {choice}
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
