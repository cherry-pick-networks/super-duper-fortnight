import PageShell from "../components/ui/PageShell.tsx";

export default function FinancePage() {
  return (
    <PageShell
      title="Finance"
      tag="Finance Domain"
      description="Invoices, payments, and payroll summaries."
    >
      <section>
        <details>
          <summary>Finance Overview</summary>
          <table>
            <caption>Finance sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Invoices</td>
                <td>Open invoices and payment status.</td>
              </tr>
              <tr>
                <td>Payroll</td>
                <td>Payroll cycles and payout summaries.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
