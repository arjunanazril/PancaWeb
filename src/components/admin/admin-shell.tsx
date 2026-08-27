import Link from "next/link";
import type { ReactNode } from "react";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/upload", label: "Upload" },
  { href: "/admin/feedback", label: "Feedback" },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-surface-soft py-8 md:py-12">
      <div className="container-shell grid gap-6 md:grid-cols-[230px_1fr]">
        <aside className="rounded-[1.5rem] border border-border-soft bg-white p-4 shadow-sm md:sticky md:top-24 md:h-fit">
          <p className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Admin</p>
          <nav className="mt-4 grid gap-1" aria-label="Navigasi admin">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl px-3 py-2 text-sm font-semibold text-navy/75 hover:bg-surface-soft hover:text-primary">
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-navy md:text-5xl">{title}</h1>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
