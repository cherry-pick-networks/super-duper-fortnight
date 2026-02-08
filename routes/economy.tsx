import PageShell from "../components/ui/PageShell.tsx";

export default function EconomyPage() {
  return (
    <PageShell
      title="Economy"
      tag="Economy Domain"
      description="Token wallet, rewards, and ledger history."
    >
      <section>
        <details open>
          <summary>Economy Overview</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wallet Balance</td>
                <td>Balance and recent reward activity.</td>
              </tr>
              <tr>
                <td>Redemptions</td>
                <td>Rewards catalog and redemption history.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
