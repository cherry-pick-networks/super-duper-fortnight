import PageShell from "../components/ui/PageShell.tsx";

export default function OutputPage() {
  return (
    <PageShell
      title="Output"
      tag="Output Domain"
      description="Shared resource monitoring and print usage logs."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Print Jobs</h2>
          <p class="muted">Queue status and job history.</p>
        </div>
        <div class="card">
          <h2>Usage Logs</h2>
          <p class="muted">Monthly summaries and device health.</p>
        </div>
      </section>
    </PageShell>
  );
}
