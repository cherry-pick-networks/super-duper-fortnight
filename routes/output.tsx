import PageShell from "../components/ui/PageShell.tsx";

export default function OutputPage() {
  return (
    <PageShell
      title="Output"
      tag="Output Domain"
      description="Shared resource monitoring and print usage logs."
    >
      <section>
        <details>
          <summary>Output Overview</summary>
          <table>
            <caption>Output sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Print Jobs</td>
                <td>Queue status and job history.</td>
              </tr>
              <tr>
                <td>Usage Logs</td>
                <td>Monthly summaries and device health.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
