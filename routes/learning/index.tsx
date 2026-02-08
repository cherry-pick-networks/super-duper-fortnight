import PageShell from "../../components/ui/PageShell.tsx";

export default function LearningHome() {
  return (
    <PageShell
      title="Learning Overview"
      tag="Learning Domain"
      description="Quiz and review flows are optimized for mobile-first execution."
    >
      <section>
        <details>
          <summary>Learning Sections</summary>
          <table>
            <caption>Learning navigation</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Focus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="/learning/quiz">Start Quiz</a>
                </td>
                <td>
                  Begin a short session and check how the quiz experience feels
                  on mobile.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/learning/review">Review Schedule</a>
                </td>
                <td>
                  Review scheduling and memory state insights will be added
                  next.
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/learning/progress">Progress</a>
                </td>
                <td>
                  Learner progress dashboards will live here for teachers and
                  students.
                </td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
