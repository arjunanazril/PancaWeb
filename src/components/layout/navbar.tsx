import Link from "next/link";
import { Shield, UserCircle } from "lucide-react";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/auth";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/pancasila", label: "Pancasila" },
  { href: "/gallery", label: "Galeri" },
  { href: "/about", label: "Tentang" },
];

export async function Navbar() {
  const session = await auth();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-40 border-b border-border-soft/70 bg-[#f8f4ea]/90 backdrop-blur-xl dark:bg-navy/88">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 font-bold text-navy" aria-label="PancaRuang beranda">
          <span className="grid size-10 place-items-center rounded-2xl bg-navy text-sm text-gold shadow-lg transition group-hover:rotate-3">PR</span>
          <span className="leading-tight"><span className="block">PancaRuang</span><span className="block text-[10px] uppercase tracking-[0.28em] text-primary">Digital Museum</span></span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 text-sm font-medium text-navy/75 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 hover:bg-white/60 hover:text-primary dark:hover:bg-white/10">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <details className="relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-border-soft bg-white px-3 py-2 text-sm font-bold text-[#10213a] shadow-sm shadow-navy/10 hover:bg-[#fffaf0] dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
                {isAdmin ? <Shield className="size-4 text-primary" /> : <UserCircle className="size-4" />}
                <span className="hidden max-w-32 truncate sm:inline">{session.user.name ?? session.user.email}</span>
              </summary>
              <div className="absolute right-0 mt-2 w-60 rounded-3xl border border-border-soft bg-[#fffaf0] p-2 text-sm text-[#10213a] shadow-2xl backdrop-blur-xl dark:bg-navy/95 dark:text-white">
                {isAdmin ? (
                  <>
                    <Link className="block rounded-xl px-3 py-2 font-semibold hover:bg-surface-soft" href="/admin">Dashboard Admin</Link>
                    <Link className="block rounded-xl px-3 py-2 font-semibold hover:bg-surface-soft" href="/admin/upload">Upload Dokumentasi</Link>
                    <Link className="block rounded-xl px-3 py-2 font-semibold hover:bg-surface-soft" href="/admin/gallery">Kelola Galeri</Link>
                    <Link className="block rounded-xl px-3 py-2 font-semibold hover:bg-surface-soft" href="/admin/feedback">Feedback</Link>
                  </>
                ) : (
                  <>
                    <Link className="block rounded-xl px-3 py-2 font-semibold hover:bg-surface-soft" href="/feedback">Feedback Saya</Link>
                    <Link className="block rounded-xl px-3 py-2 font-semibold hover:bg-surface-soft" href="/gallery">Jelajahi Galeri</Link>
                  </>
                )}
                <div className="my-1 h-px bg-border-soft" />
                <ThemeToggle />
                <form action={signOutUser}>
                  <button className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-primary hover:bg-red-50" type="submit">
                    Logout
                  </button>
                </form>
              </div>
            </details>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden w-36 sm:block"><ThemeToggle /></div>
              <ButtonLink href="/auth" className="min-h-10 px-4 shadow-lg shadow-primary/15">Login</ButtonLink>
            </div>
          )}
        </div>
      </div>
      <nav aria-label="Navigasi mobile" className="container-shell flex gap-4 overflow-x-auto pb-3 text-sm font-medium text-navy/75 md:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="shrink-0 hover:text-primary">
            {link.label}
          </Link>
        ))}
        {isAdmin ? <Link href="/admin" className="shrink-0 text-primary">Admin</Link> : null}
      </nav>
    </header>
  );
}
