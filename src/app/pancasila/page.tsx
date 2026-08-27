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
        tagline="Sebagai arah hidup bersama."
        scrollHint="Gulir untuk membuka"
      />
      <PrinciplesSection />
    </>
  );
}
