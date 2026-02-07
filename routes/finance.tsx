import PageShell from "../components/ui/PageShell.tsx";

export default function FinancePage() {
  return (
    <PageShell
      title="Finance"
      tag="Finance Domain"
      description="Invoices, payments, and payroll summaries."
    >
      <section class="section-grid">
        <div class="card">
          <h2>Invoices</h2>
          <p class="muted">Open invoices and payment status.</p>
        </div>
        <div class="card">
          <h2>Payroll</h2>
          <p class="muted">Payroll cycles and payout summaries.</p>
        </div>
      </section>
    </PageShell>
  );
}
