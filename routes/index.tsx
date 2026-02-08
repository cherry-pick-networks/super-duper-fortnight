import WalletConnect from "../islands/WalletConnect.tsx";
import PageShell from "../components/ui/PageShell.tsx";

export default function Home() {
  return (
    <PageShell
      title="Dashboard"
      tag="Picker Frontend"
      description="Desktop-first overview of product readiness and next steps."
    >
      <section>
        <details open>
          <summary>System Overview</summary>
          <table>
            <tbody>
              <tr>
                <th>API Base URL</th>
                <td>
                  <code>http://127.0.0.1:8000</code>
                </td>
              </tr>
              <tr>
                <th>Environment</th>
                <td>Use a proxy or environment override in production.</td>
              </tr>
            </tbody>
          </table>
          <h3>Endpoints</h3>
          <ul>
            <li>Login: POST /accounts/auth/login</li>
            <li>Profile: GET /accounts/auth/me</li>
            <li>Refresh: POST /accounts/auth/refresh</li>
          </ul>
        </details>
        <details open>
          <summary>Wallet</summary>
          <WalletConnect />
        </details>
      </section>

      <section>
        <details open>
          <summary>Quick Links</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Focus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="/learning">Learning</a>
                </td>
                <td>Mobile-first quiz flow and grading.</td>
              </tr>
              <tr>
                <td>
                  <a href="/account/profile">Account</a>
                </td>
                <td>Login and profile surfaces ready to wire.</td>
              </tr>
              <tr>
                <td>
                  <a href="/economy">Economy</a>
                </td>
                <td>Wallet, rewards, and ledger UI skeleton.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
