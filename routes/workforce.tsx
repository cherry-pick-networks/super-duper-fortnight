import PageShell from "../components/ui/PageShell.tsx";

export default function WorkforcePage() {
  return (
    <PageShell
      title="Workforce"
      tag="Workforce Domain"
      description="Time tracking, leave, and staff operations."
    >
      <section>
        <details>
          <summary>Workforce Overview</summary>
          <table>
            <caption>Workforce sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Time Tracking</td>
                <td>Clock-in/out and attendance alignment.</td>
              </tr>
              <tr>
                <td>Leave Requests</td>
                <td>Pending approvals and leave balances.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
