import { ArrowRight, Images, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getMuseumDisplay } from "@/lib/data/site-settings";

export async function Hero() {
  const display = await getMuseumDisplay();

  return (
    <section className="museum-grid relative overflow-hidden py-20 md:py-28">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="absolute right-0 top-8 hidden text-[10rem] font-black leading-none tracking-[-0.08em] text-navy/[0.04] dark:text-white/[0.04] md:block">ARSIP</div>
      <div className="container-shell grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <p className="museum-kicker mb-5"><Sparkles className="size-3.5" /> Digital Museum</p>
          <h1 className="museum-heading max-w-4xl text-5xl leading-[0.92] sm:text-6xl md:text-7xl">
            Pancasila sebagai arsip hidup keseharian.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-navy/72">
            Ruang belajar visual untuk membaca nilai bangsa lewat dokumentasi nyata, cerita warga, dan refleksi lima sila.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/pancasila">Masuk Museum <ArrowRight className="ml-2 size-4" /></ButtonLink>
            <ButtonLink href="/gallery" variant="secondary"><Images className="mr-2 size-4" /> Lihat Koleksi</ButtonLink>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm font-semibold text-navy/70">
            <div className="museum-card rounded-3xl p-4"><span className="block text-3xl font-black text-primary">5</span>Sila</div>
            <div className="museum-card rounded-3xl p-4"><span className="block text-3xl font-black text-green">∞</span>Kisah</div>
            <div className="museum-card rounded-3xl p-4"><span className="block text-3xl font-black text-gold-dark">1</span>Ruang</div>
          </div>
        </div>
        <div className="relative min-h-[430px]">
          <div className="absolute inset-8 rounded-[2.5rem] bg-navy shadow-2xl" aria-hidden />
          <div className="museum-card relative overflow-hidden rounded-[2.5rem] p-4 backdrop-blur-xl">
            <div className="grid h-[390px] grid-cols-5 grid-rows-5 gap-3">
              <div className="col-span-3 row-span-3 rounded-[2rem] bg-cover bg-center" style={{ backgroundImage: `url(${display.heroImageOne})` }} />
              <div className="col-span-2 row-span-2 rounded-[2rem] bg-primary p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">{display.collectionLabel}</p>
                <p className="mt-8 text-4xl font-black">{display.collectionValue}</p>
              </div>
              <div className="col-span-2 row-span-3 rounded-[2rem] bg-cover bg-center" style={{ backgroundImage: `url(${display.heroImageTwo})` }} />
              <div className="col-span-2 row-span-2 rounded-[2rem] bg-gold p-5 text-navy">
                <p className="text-4xl font-black">{display.featureNumber}</p>
                <p className="mt-2 text-sm font-semibold">{display.featureText}</p>
              </div>
              <div className="col-span-3 row-span-2 rounded-[2rem] bg-cover bg-center" style={{ backgroundImage: `url(${display.heroImageThree})` }} />
            </div>
            <div className="absolute inset-x-8 bottom-8 rounded-3xl border border-white/20 bg-navy/80 p-4 text-white backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{display.curationTitle}</p>
              <p className="mt-2 text-sm text-white/75">{display.curationDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
