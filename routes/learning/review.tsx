import PageShell from "../../components/ui/PageShell.tsx";

export default function LearningReview() {
  return (
    <PageShell
      title="Review Schedule"
      tag="Learning Review"
      description="Upcoming reviews and FSRS memory state insights."
    >
      <section class="card">
        <h2>Next Reviews</h2>
        <p class="muted">Schedule data will be loaded from the learning API.</p>
        <div class="placeholder-list">
          <div class="placeholder-row">Vocabulary review - 12 items</div>
          <div class="placeholder-row">Listening review - 6 items</div>
          <div class="placeholder-row">Formula drills - 4 items</div>
        </div>
      </section>
    </PageShell>
  );
}
