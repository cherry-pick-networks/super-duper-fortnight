import PageShell from "../../components/ui/PageShell.tsx";

export default function AccountLogin() {
  return (
    <PageShell
      title="Login"
      tag="Account"
      description="Use your account credentials to access the platform."
    >
      <section class="card">
        <form class="form">
          <label class="label" for="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            class="input"
            placeholder="you@example.com"
          />
          <label class="label" for="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            class="input"
            placeholder="••••••••"
          />
          <button type="button" class="button">
            Sign In
          </button>
        </form>
      </section>
    </PageShell>
  );
}
