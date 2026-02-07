import PageShell from "../components/ui/PageShell.tsx";

export default function LogisticsPage() {
  return (
    <PageShell
      title="Logistics"
      tag="Logistics Domain"
      description="Inventory snapshots and safety stock alerts."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Inventory</h2>
          <p class="muted">Current stock levels and movements.</p>
        </div>
        <div class="card">
          <h2>Alerts</h2>
          <p class="muted">Safety stock and replenishment triggers.</p>
        </div>
      </section>
    </PageShell>
  );
}
