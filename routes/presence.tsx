import PageShell from "../components/ui/PageShell.tsx";

export default function PresencePage() {
  return (
    <PageShell
      title="Presence"
      tag="Presence Domain"
      description="Attendance views and safety monitoring."
    >
      <section>
        <details>
          <summary>Presence Overview</summary>
          <table>
            <caption>Presence sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Attendance Overview</td>
                <td>Student check-ins and status summaries.</td>
              </tr>
              <tr>
                <td>Notifications</td>
                <td>Guardian alerts and timeline logs.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
