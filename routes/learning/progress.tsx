import PageShell from "../../components/ui/PageShell.tsx";

export default function LearningProgress() {
  return (
    <PageShell
      title="Progress Overview"
      tag="Learning Progress"
      description="Progress metrics and mastery charts will live here."
    >
      <section>
        <details>
          <summary>Progress Sections</summary>
          <table>
            <caption>Progress summary</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weekly Summary</td>
                <td>Time spent and quiz accuracy will be shown here.</td>
              </tr>
              <tr>
                <td>Skill Breakdown</td>
                <td>Component-based mastery levels will be displayed.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
