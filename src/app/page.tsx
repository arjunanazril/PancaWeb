import { Hero } from "@/components/home/hero";
import { PrinciplesSection } from "@/components/home/principles-section";
import { GalleryMarquee } from "@/components/home/gallery-marquee";
import { ScrollShowcase } from "@/components/home/scroll-showcase";
import { ButtonLink } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollShowcase />
      <section className="bg-white py-20">
        <div className="container-shell grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div className="rounded-[2rem] bg-primary p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Mengapa Penting</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight">Pancasila bekerja ketika dipraktikkan.</h2>
          </div>
          <div className="grid gap-5 text-lg leading-8 text-navy/72">
            <p>
              PancaRuang mengajak pengunjung membaca Pancasila sebagai nilai yang hidup: tampak dalam toleransi, empati, gotong royong, musyawarah, dan keadilan sosial.
            </p>
            <p>
              Materi edukasi memberi konteks, sementara galeri dokumentasi menunjukkan contoh nyata agar pembelajaran terasa dekat dengan keseharian.
            </p>
          </div>
        </div>
      </section>
      <PrinciplesSection />
      <GalleryMarquee />
      <section className="bg-white py-20">
        <div className="container-shell rounded-[2rem] border border-border-soft bg-navy p-8 text-white md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Berinteraksi</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">Bantu PancaRuang tumbuh sebagai ruang belajar yang lebih jelas dan berguna.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/75">Bagikan pengalamanmu setelah menjelajahi materi dan galeri, agar ruang belajar ini tetap relevan dan mudah dipahami.</p>
          <ButtonLink href="/feedback" className="mt-8 bg-white text-navy hover:bg-gold">Kirim Feedback</ButtonLink>
        </div>
      </section>
    </>
  );
}
