import PageShell from "../../components/ui/PageShell.tsx";
import QuizSession from "../../islands/QuizSession.tsx";
import ReceptiveQuiz from "../../islands/ReceptiveQuiz.tsx";

export default function LearningQuiz() {
  return (
    <PageShell
      title="Learning Quiz"
      tag="Learning Session"
      description="Mobile-first quiz practice with receptive content previews."
    >
      <section>
        <details>
          <summary>Quiz Overview</summary>
          <header>
            <p>Learning Quiz</p>
            <h2>Quiz Session</h2>
            <p>
              Use the live quiz session for skill drills, then review receptive
              sources and atoms for dataset coverage.
            </p>
          </header>
        </details>
      </section>
      <section>
        <QuizSession />
      </section>
      <section>
        <ReceptiveQuiz />
      </section>
    </PageShell>
  );
}
