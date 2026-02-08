import PageShell from "../../components/ui/PageShell.tsx";

export default function AccountLogin() {
  return (
    <PageShell
      title="Login"
      tag="Account"
      description="Use your account credentials to access the platform."
    >
      <section>
        <details open>
          <summary>Sign In</summary>
          <form>
            <fieldset>
              <legend>Credentials</legend>
              <label>
                <strong>Email</strong>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                />
              </label>
              <label>
                <strong>Password</strong>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
              </label>
              <button type="button">Sign In</button>
            </fieldset>
          </form>
        </details>
      </section>
    </PageShell>
  );
}
