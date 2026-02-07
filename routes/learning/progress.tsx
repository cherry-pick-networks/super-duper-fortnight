import PageShell from "../../components/ui/PageShell.tsx";

export default function LearningProgress() {
  return (
    <PageShell
      title="Progress Overview"
      tag="Learning Progress"
      description="Progress metrics and mastery charts will live here."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Weekly Summary</h2>
          <p class="muted">Time spent and quiz accuracy will be shown here.</p>
        </div>
        <div class="card">
          <h2>Skill Breakdown</h2>
          <p class="muted">Component-based mastery levels will be displayed.</p>
        </div>
      </section>
    </PageShell>
  );
}
