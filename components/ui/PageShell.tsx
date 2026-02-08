type PageShellProps = {
  title: string;
  description?: string;
  tag?: string;
  children: preact.ComponentChildren;
};

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/account/profile", label: "Account" },
  { href: "/learning", label: "Learning" },
  { href: "/course", label: "Course" },
  { href: "/presence", label: "Presence" },
  { href: "/economy", label: "Economy" },
  { href: "/finance", label: "Finance" },
  { href: "/crm", label: "CRM" },
  { href: "/workforce", label: "Workforce" },
  { href: "/mobility", label: "Mobility" },
  { href: "/logistics", label: "Logistics" },
  { href: "/output", label: "Output" },
];

export default function PageShell({
  title,
  description,
  tag,
  children,
}: PageShellProps) {
  return (
    <section>
      <header>
        <p>Picker</p>
      </header>
      <details>
        <summary>Menu</summary>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
      <main>
        <header>
          {tag ? <p>{tag}</p> : null}
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </header>
        <section>{children}</section>
      </main>
    </section>
  );
}
