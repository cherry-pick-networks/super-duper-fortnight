import PageShell from "../../components/ui/PageShell.tsx";

export default function AccountHome() {
  return (
    <PageShell
      title="Account Overview"
      tag="Account"
      description="Authentication, profile, and security entry points."
    >
      <section>
        <details open>
          <summary>Account Entry Points</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="/account/login">Login</a>
                </td>
                <td>Sign in and manage authentication flows.</td>
              </tr>
              <tr>
                <td>
                  <a href="/account/profile">Profile</a>
                </td>
                <td>View identity details and permissions.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
