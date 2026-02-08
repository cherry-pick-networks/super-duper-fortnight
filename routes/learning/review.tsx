import PageShell from "../../components/ui/PageShell.tsx";

export default function LearningReview() {
  return (
    <PageShell
      title="Review Schedule"
      tag="Learning Review"
      description="Upcoming reviews and FSRS memory state insights."
    >
      <section>
        <details>
          <summary>Next Reviews</summary>
          <p>Schedule data will be loaded from the learning API.</p>
          <table>
            <caption>Upcoming review counts</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Items</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vocabulary review</td>
                <td>12</td>
              </tr>
              <tr>
                <td>Listening review</td>
                <td>6</td>
              </tr>
              <tr>
                <td>Formula drills</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
