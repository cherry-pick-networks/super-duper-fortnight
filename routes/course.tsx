import PageShell from "../components/ui/PageShell.tsx";

export default function CoursePage() {
  return (
    <PageShell
      title="Course"
      tag="Course Domain"
      description="Course list, enrollment, and details."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Active Courses</h2>
          <p class="muted">Course list and filters will appear here.</p>
        </div>
        <div class="card">
          <h2>Enrollment</h2>
          <p class="muted">Enrollment actions and counts will be shown.</p>
        </div>
      </section>
    </PageShell>
  );
}
