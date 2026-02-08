import QuizSession from "../../islands/QuizSession.tsx";

export default function LearningQuiz() {
  return (
    <main>
      <details>
        <summary>Quiz Overview</summary>
        <header>
          <p>Learning Quiz</p>
          <h1>Quiz Session</h1>
          <p>
            This flow is mobile-first and focuses on quick, focused interactions.
          </p>
        </header>
      </details>
      <QuizSession />
    </main>
  );
}
