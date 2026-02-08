import PageShell from "../components/ui/PageShell.tsx";

export default function CoursePage() {
  return (
    <PageShell
      title="Course"
      tag="Course Domain"
      description="Course list, enrollment, and details."
    >
      <section>
        <details open>
          <summary>Course Overview</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Active Courses</td>
                <td>Course list and filters will appear here.</td>
              </tr>
              <tr>
                <td>Enrollment</td>
                <td>Enrollment actions and counts will be shown.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
