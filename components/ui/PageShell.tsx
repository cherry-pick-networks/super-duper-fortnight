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
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-dot" />
          <span>Picker</span>
        </div>
        <nav class="nav">
          {navItems.map((item) => (
            <a class="nav-link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <div class="shell-content">
        <header class="shell-header">
          {tag ? <span class="tag">{tag}</span> : null}
          <h1>{title}</h1>
          {description ? <p class="muted">{description}</p> : null}
        </header>
        <section class="shell-body">{children}</section>
      </div>
    </div>
  );
}
