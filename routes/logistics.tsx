import PageShell from "../components/ui/PageShell.tsx";

export default function LogisticsPage() {
  return (
    <PageShell
      title="Logistics"
      tag="Logistics Domain"
      description="Inventory snapshots and safety stock alerts."
    >
      <section>
        <details>
          <summary>Logistics Overview</summary>
          <table>
            <caption>Logistics sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
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
