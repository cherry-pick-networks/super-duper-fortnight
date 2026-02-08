import PageShell from "../components/ui/PageShell.tsx";

export default function EconomyPage() {
  return (
    <PageShell
      title="Economy"
      tag="Economy Domain"
      description="Token wallet, rewards, and ledger history."
    >
      <section>
        <details>
          <summary>Economy Overview</summary>
          <table>
            <caption>Economy sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
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
