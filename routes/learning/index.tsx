export default function LearningHome() {
  return (
    <main class="page">
      <header class="hero">
        <p class="tag">Learning Domain</p>
        <h1>Learning Overview</h1>
        <p class="muted">
          Quiz and review flows are optimized for mobile-first execution.
        </p>
      </header>

      <section class="learning-grid">
        <a class="card link-card" href="/learning/quiz">
          <h2>Start Quiz</h2>
          <p class="muted">
            Begin a short session and check how the quiz experience feels on
            mobile.
          </p>
        </a>
        <div class="card">
          <h2>Review Schedule</h2>
          <p class="muted">
            Review scheduling and memory state insights will be added next.
          </p>
        </div>
        <div class="card">
          <h2>Progress</h2>
          <p class="muted">
            Learner progress dashboards will live here for teachers and
            students.
          </p>
        </div>
      </section>
    </main>
  );
}
