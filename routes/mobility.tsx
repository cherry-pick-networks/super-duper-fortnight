import PageShell from "../components/ui/PageShell.tsx";

export default function MobilityPage() {
  return (
    <PageShell
      title="Mobility"
      tag="Mobility Domain"
      description="Route management, stops, and schedules."
    >
      <section>
        <details>
          <summary>Mobility Overview</summary>
          <table>
            <caption>Mobility sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Routes</td>
                <td>Active routes and stop sequences.</td>
              </tr>
              <tr>
                <td>Schedules</td>
                <td>Timetables and service status.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
