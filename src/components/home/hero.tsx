import { ArrowRight, Images } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#f7f7f5_100%)] py-20 md:py-28">
      <div className="absolute right-4 top-10 hidden text-[11rem] font-black leading-none text-primary/[0.04] md:block">Garuda</div>
      <div className="container-shell grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-gold-dark/25 bg-gold/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-navy">
            Digital Living Gallery
          </p>
          <h1 className="max-w-3xl text-5xl font-black tracking-[-0.06em] text-navy sm:text-6xl md:text-7xl">
            Pancasila dalam kehidupan kita.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/72">
            Mengenal, memahami, dan melihat bagaimana nilai-nilai Pancasila hidup dalam keseharian, bukan sekadar hafalan.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/pancasila">Jelajahi Pancasila <ArrowRight className="ml-2 size-4" /></ButtonLink>
            <ButtonLink href="/gallery" variant="secondary"><Images className="mr-2 size-4" /> Lihat Galeri</ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[360px] rounded-[2rem] border border-border-soft bg-white p-4 shadow-xl">
          <div className="absolute -left-4 top-8 h-24 w-24 rounded-3xl bg-primary" aria-hidden />
          <div className="absolute -right-3 bottom-10 h-20 w-20 rounded-full bg-gold" aria-hidden />
          <div className="relative grid h-full grid-cols-2 gap-4">
            <div className="rounded-[1.5rem] bg-[url('https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" />
            <div className="mt-10 rounded-[1.5rem] bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" />
            <div className="rounded-[1.5rem] bg-navy p-5 text-white">
              <p className="text-4xl font-black">5</p>
              <p className="mt-2 text-sm text-white/75">Sila sebagai ruang belajar dan refleksi.</p>
            </div>
            <div className="rounded-[1.5rem] bg-[url('https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=700&q=80')] bg-cover bg-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
