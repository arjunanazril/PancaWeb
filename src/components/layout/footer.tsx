import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-navy text-white">
      <div className="container-shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-lg font-bold">PancaRuang</p>
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
