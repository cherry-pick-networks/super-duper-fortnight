import PageShell from "../components/ui/PageShell.tsx";

export default function MobilityPage() {
  return (
    <PageShell
      title="Mobility"
      tag="Mobility Domain"
      description="Route management, stops, and schedules."
    >
      <section>
        <details open>
          <summary>Mobility Overview</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Details</th>
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
