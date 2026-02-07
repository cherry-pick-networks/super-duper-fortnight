import PageShell from "../components/ui/PageShell.tsx";

export default function PresencePage() {
  return (
    <PageShell
      title="Presence"
      tag="Presence Domain"
      description="Attendance views and safety monitoring."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Attendance Overview</h2>
          <p class="muted">Student check-ins and status summaries.</p>
        </div>
        <div class="card">
          <h2>Notifications</h2>
          <p class="muted">Guardian alerts and timeline logs.</p>
        </div>
      </section>
    </PageShell>
  );
}
