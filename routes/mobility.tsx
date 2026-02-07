import PageShell from "../components/ui/PageShell.tsx";

export default function MobilityPage() {
  return (
    <PageShell
      title="Mobility"
      tag="Mobility Domain"
      description="Route management, stops, and schedules."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Routes</h2>
          <p class="muted">Active routes and stop sequences.</p>
        </div>
        <div class="card">
          <h2>Schedules</h2>
          <p class="muted">Timetables and service status.</p>
        </div>
      </section>
    </PageShell>
  );
}
