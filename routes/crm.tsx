import PageShell from "../components/ui/PageShell.tsx";

export default function CrmPage() {
  return (
    <PageShell
      title="CRM"
      tag="CRM Domain"
      description="Contacts, notes, and relationship history."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Contacts</h2>
          <p class="muted">Lead pipeline and contact status.</p>
        </div>
        <div class="card">
          <h2>Notes</h2>
          <p class="muted">Communication history and follow-ups.</p>
        </div>
      </section>
    </PageShell>
  );
}
