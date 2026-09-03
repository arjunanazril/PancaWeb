import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";

export const DEFAULT_MUSEUM_DISPLAY = {
  id: "museum-display",
  heroImageOne: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
  heroImageTwo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  heroImageThree: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80",
  collectionLabel: "Koleksi",
  collectionValue: "Live",
  featureNumber: "01",
  featureText: "Nilai tidak dipajang, tapi dipraktikkan.",
  curationTitle: "Kurasi Hari Ini",
  curationDescription: "Toleransi, gotong royong, musyawarah, dan keadilan sosial dalam frame yang dekat.",
};

export async function getMuseumDisplay() {
  if (!db) return DEFAULT_MUSEUM_DISPLAY;

  try {
    const setting = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, DEFAULT_MUSEUM_DISPLAY.id),
    });

    return setting ?? DEFAULT_MUSEUM_DISPLAY;
  } catch (error) {
    console.error("Museum display settings unavailable", error);
    return DEFAULT_MUSEUM_DISPLAY;
  }
}
