import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(243,200,93,0.18),transparent_28rem),radial-gradient(circle_at_85%_20%,rgba(184,16,45,0.22),transparent_24rem)]" aria-hidden />
      <div className="container-shell relative grid gap-8 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xl font-black tracking-tight">PancaRuang</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-gold">Digital Museum</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
            Pancasila dalam kehidupan, bukan sekadar hafalan. Galeri edukasi untuk melihat nilai bangsa dalam keseharian.
          </p>
        </div>
        <nav aria-label="Footer navigasi" className="grid gap-2 text-sm text-white/75">
          <Link href="/pancasila" className="hover:text-white">Pancasila</Link>
          <Link href="/gallery" className="hover:text-white">Galeri</Link>
          <Link href="/feedback" className="hover:text-white">Feedback</Link>
        </nav>
        <div className="text-sm text-white/65">
          <p>Ruang belajar yang terus tumbuh melalui dokumentasi, refleksi, dan partisipasi.</p>
          <p className="mt-4">© 2026 PancaRuang.</p>
        </div>
      </div>
    </footer>
  );
}
