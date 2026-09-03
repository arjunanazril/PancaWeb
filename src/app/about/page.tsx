import type { Metadata } from "next";
import { MacbookPro } from "@/components/ui/macbook-pro";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Tentang PancaRuang sebagai galeri edukasi nilai Pancasila.",
};

export default function AboutPage() {
  return (
    <section className="museum-grid py-20">
      <div className="container-shell grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-center">
        <div>
          <p className="museum-kicker">Tentang</p>
          <h1 className="museum-heading mt-4 text-4xl md:text-6xl">PancaRuang adalah museum digital nilai bangsa.</h1>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-sm font-semibold text-navy/70">
            <div className="museum-card rounded-2xl p-4"><span className="block text-2xl font-black text-primary">5</span>Sila</div>
            <div className="museum-card rounded-2xl p-4"><span className="block text-2xl font-black text-green">∞</span>Ruang</div>
            <div className="museum-card rounded-2xl p-4"><span className="block text-2xl font-black text-gold-dark">1</span>Nilai</div>
          </div>
        </div>
        <div>
          <div className="relative mx-auto max-w-2xl text-[#10213a] dark:text-[#07111f]">
            <MacbookPro className="h-auto w-full drop-shadow-2xl" />
            <div className="absolute left-[11.5%] top-[7%] flex h-[76%] w-[77%] flex-col justify-between overflow-hidden rounded-md bg-[linear-gradient(135deg,#112A4F_0%,#17365f_45%,#C8102E_100%)] p-5 text-white md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">PancaRuang</p>
                <h2 className="mt-4 max-w-md text-2xl font-black tracking-tight md:text-4xl">Museum digital untuk nilai yang hidup.</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/75 md:text-base">
                Materi, galeri, dan feedback dipadukan agar nilai Pancasila terlihat dekat dengan keseharian.
              </p>
            </div>
          </div>
          <div className="mt-8 space-y-5 text-lg leading-8 text-navy/72">
            <p>PancaRuang dirancang untuk menjembatani materi Pancasila dengan penerapan nyata melalui galeri visual yang mudah dipahami.</p>
            <p>Dokumentasi kegiatan sehari-hari menjadi bagian penting agar pembelajaran terasa dekat, nyata, dan bermakna.</p>
            <p>Setiap halaman dibuat untuk membantu pengunjung belajar, memahami, melihat penerapan, lalu ikut memberi masukan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
