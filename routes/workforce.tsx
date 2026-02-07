import PageShell from "../components/ui/PageShell.tsx";

export default function WorkforcePage() {
  return (
    <PageShell
      title="Workforce"
      tag="Workforce Domain"
      description="Time tracking, leave, and staff operations."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Time Tracking</h2>
          <p class="muted">Clock-in/out and attendance alignment.</p>
        </div>
        <div class="card">
          <h2>Leave Requests</h2>
          <p class="muted">Pending approvals and leave balances.</p>
        </div>
      </section>
    </PageShell>
  );
}
