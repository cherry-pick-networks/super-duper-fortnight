import PageShell from "../components/ui/PageShell.tsx";

export default function LogisticsPage() {
  return (
    <PageShell
      title="Logistics"
      tag="Logistics Domain"
      description="Inventory snapshots and safety stock alerts."
    >
      <section>
        <details open>
          <summary>Logistics Overview</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inventory</td>
                <td>Current stock levels and movements.</td>
              </tr>
              <tr>
                <td>Alerts</td>
                <td>Safety stock and replenishment triggers.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
