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
        <details>
          <summary>System Overview</summary>
          <table>
            <caption>System settings</caption>
            <tbody>
              <tr>
                <th scope="row">API Base URL</th>
                <td>
                  <code>http://127.0.0.1:8000</code>
                </td>
              </tr>
              <tr>
                <th scope="row">Environment</th>
                <td>Use a proxy or environment override in production.</td>
              </tr>
            </tbody>
          </table>
          <table>
            <caption>Endpoints</caption>
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Method</th>
                <th scope="col">Path</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Login</td>
                <td>POST</td>
                <td>/accounts/auth/login</td>
              </tr>
              <tr>
                <td>Profile</td>
                <td>GET</td>
                <td>/accounts/auth/me</td>
              </tr>
              <tr>
                <td>Refresh</td>
                <td>POST</td>
                <td>/accounts/auth/refresh</td>
              </tr>
            </tbody>
          </table>
        </details>
        <details>
          <summary>Wallet</summary>
          <WalletConnect />
        </details>
      </section>

      <section>
        <details>
          <summary>Quick Links</summary>
          <table>
            <caption>Primary navigation</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Focus</th>
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
