import PageShell from "../components/ui/PageShell.tsx";

export default function CrmPage() {
  return (
    <PageShell
      title="CRM"
      tag="CRM Domain"
      description="Contacts, notes, and relationship history."
    >
      <section>
        <details>
          <summary>CRM Overview</summary>
          <table>
            <caption>CRM sections</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Contacts</td>
                <td>Lead pipeline and contact status.</td>
              </tr>
              <tr>
                <td>Notes</td>
                <td>Communication history and follow-ups.</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>
    </PageShell>
  );
}
