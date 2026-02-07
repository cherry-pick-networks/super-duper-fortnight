import QuizSession from "../../islands/QuizSession.tsx";

export default function LearningQuiz() {
  return (
    <main class="quiz-shell">
      <header class="quiz-header">
        <p class="tag">Learning Quiz</p>
        <h1>Quiz Session</h1>
        <p class="muted">
          This flow is mobile-first and focuses on quick, focused interactions.
        </p>
      </header>

      <QuizSession />
    </main>
  );
}
