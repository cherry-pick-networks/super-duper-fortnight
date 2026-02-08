import PageShell from "../components/ui/PageShell.tsx";

export default function CrmPage() {
  return (
    <PageShell
      title="CRM"
      tag="CRM Domain"
      description="Contacts, notes, and relationship history."
    >
      <section>
        <details open>
          <summary>CRM Overview</summary>
          <table>
            <thead>
              <tr>
                <th>Area</th>
                <th>Details</th>
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
