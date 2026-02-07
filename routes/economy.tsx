import PageShell from "../components/ui/PageShell.tsx";

export default function EconomyPage() {
  return (
    <PageShell
      title="Economy"
      tag="Economy Domain"
      description="Token wallet, rewards, and ledger history."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Wallet Balance</h2>
          <p class="muted">Balance and recent reward activity.</p>
        </div>
        <div class="card">
          <h2>Redemptions</h2>
          <p class="muted">Rewards catalog and redemption history.</p>
        </div>
      </section>
    </PageShell>
  );
}
