import WalletConnect from "../islands/WalletConnect.tsx";
import PageShell from "../components/ui/PageShell.tsx";

export default function Home() {
  return (
    <PageShell
      title="Dashboard"
      tag="Picker Frontend"
      description="Desktop-first overview of product readiness and next steps."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Backend Connection</h2>
          <p class="muted">
            API base URL is <code>http://127.0.0.1:8000</code>. Use a proxy or
            environment override in production.
          </p>
          <ul class="list">
            <li>Login: POST /accounts/auth/login</li>
            <li>Profile: GET /accounts/auth/me</li>
            <li>Refresh: POST /accounts/auth/refresh</li>
          </ul>
        </div>
        <WalletConnect />
      </section>

      <section class="section-grid">
        <a class="card link-card" href="/learning">
          <h2>Learning</h2>
          <p class="muted">
            Mobile-first quiz flow with API wiring and grading hook.
          </p>
        </a>
        <a class="card link-card" href="/account/profile">
          <h2>Account</h2>
          <p class="muted">Login and profile surfaces ready to wire.</p>
        </a>
        <a class="card link-card" href="/economy">
          <h2>Economy</h2>
          <p class="muted">Wallet, rewards, and ledger UI skeleton.</p>
        </a>
      </section>
    </PageShell>
  );
}
