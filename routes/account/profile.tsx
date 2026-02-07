import PageShell from "../../components/ui/PageShell.tsx";

export default function AccountProfile() {
  return (
    <PageShell
      title="Profile"
      tag="Account"
      description="Profile details and role assignments will appear here."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Identity</h2>
          <p class="muted">Name, email, and role metadata will be shown.</p>
        </div>
        <div class="card">
          <h2>Security</h2>
          <p class="muted">Password, MFA, and session data will live here.</p>
        </div>
      </section>
    </PageShell>
  );
}
