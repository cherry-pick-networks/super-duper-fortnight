import PageShell from "../../components/ui/PageShell.tsx";

export default function AccountHome() {
  return (
    <PageShell
      title="Account Overview"
      tag="Account"
      description="Authentication, profile, and security entry points."
    >
      <details>
        <summary>Account Entry Points</summary>
        <table>
          <caption>Account navigation</caption>
          <thead>
            <tr>
              <th scope="col">Area</th>
              <th scope="col">Purpose</th>
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
    </PageShell>
  );
}
