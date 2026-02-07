import PageShell from "../../components/ui/PageShell.tsx";

export default function AccountHome() {
  return (
    <PageShell
      title="Account Overview"
      tag="Account"
      description="Authentication, profile, and security entry points."
    >
      <section class="section-grid">
        <a class="card link-card" href="/account/login">
          <h2>Login</h2>
          <p class="muted">Sign in and manage authentication flows.</p>
        </a>
        <a class="card link-card" href="/account/profile">
          <h2>Profile</h2>
          <p class="muted">View identity details and permissions.</p>
        </a>
      </section>
    </PageShell>
  );
}
