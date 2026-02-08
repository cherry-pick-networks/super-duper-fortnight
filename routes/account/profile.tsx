import PageShell from "../../components/ui/PageShell.tsx";

export default function AccountProfile() {
  return (
    <PageShell
      title="Profile"
      tag="Account"
      description="Profile details and role assignments will appear here."
    >
      <section>
        <details open>
          <summary>Profile Areas</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identity</td>
                <td>Name, email, and role metadata will be shown.</td>
              </tr>
              <tr>
                <td>Security</td>
                <td>Password, MFA, and session data will live here.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
