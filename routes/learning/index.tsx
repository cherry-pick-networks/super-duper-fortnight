import PageShell from "../../components/ui/PageShell.tsx";

export default function LearningHome() {
  return (
    <PageShell
      title="Learning Overview"
      tag="Learning Domain"
      description="Quiz and review flows are optimized for mobile-first execution."
    >
      <section class="section-grid">
        <a class="card link-card" href="/learning/quiz">
          <h2>Start Quiz</h2>
          <p class="muted">
            Begin a short session and check how the quiz experience feels on
            mobile.
          </p>
        </a>
        <a class="card link-card" href="/learning/review">
          <h2>Review Schedule</h2>
          <p class="muted">
            Review scheduling and memory state insights will be added next.
          </p>
        </a>
        <a class="card link-card" href="/learning/progress">
          <h2>Progress</h2>
          <p class="muted">
            Learner progress dashboards will live here for teachers and
            students.
          </p>
        </a>
      </section>
    </PageShell>
  );
}
