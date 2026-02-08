import PageShell from "../../components/ui/PageShell.tsx";
import LoginForm from "../../islands/LoginForm.tsx";

export default function AccountLogin() {
  return (
    <PageShell
      title="Login"
      tag="Account"
      description="Use your account credentials to access the platform."
    >
      <section>
        <LoginForm />
      </section>
    </PageShell>
  );
}
