import type { Metadata } from "next";
import { PrinciplesSection } from "@/components/home/principles-section";
import ScrollLockedVideoHero from "@/components/ui/scroll-locked-video-hero";

export const metadata: Metadata = {
  title: "Pancasila",
  description: "Makna, nilai, simbol, dan contoh penerapan lima sila Pancasila.",
};

export default function PancasilaPage() {
  return (
    <>
      <ScrollLockedVideoHero
        title="Pancasila"
        tagline="Gulir sampai arsip nilai terbuka."
        scrollHint="Gulir pelan"
      />
      <section className="museum-grid bg-background py-16">
        <div className="container-shell grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <p className="museum-kicker w-fit">Ruang Utama</p>
          <h1 className="museum-heading text-4xl md:text-6xl">Setelah pintu museum terbuka, lima sila dibaca sebagai nilai yang hidup.</h1>
        </div>
      </section>
      <PrinciplesSection />
    </>
  );
}
