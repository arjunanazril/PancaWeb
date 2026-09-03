"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertDb } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/guards";
import { siteSettings } from "@/lib/db/schema";
import { DEFAULT_MUSEUM_DISPLAY } from "@/lib/data/site-settings";

function readValue(formData: FormData, name: string, fallback: string) {
  const value = String(formData.get(name) ?? "").trim();
  return value || fallback;
}

export async function updateMuseumDisplay(formData: FormData) {
  await requireAdmin();

  try {
    const database = assertDb();
    await database
      .insert(siteSettings)
      .values({
        id: DEFAULT_MUSEUM_DISPLAY.id,
        heroImageOne: readValue(formData, "heroImageOne", DEFAULT_MUSEUM_DISPLAY.heroImageOne),
        heroImageTwo: readValue(formData, "heroImageTwo", DEFAULT_MUSEUM_DISPLAY.heroImageTwo),
        heroImageThree: readValue(formData, "heroImageThree", DEFAULT_MUSEUM_DISPLAY.heroImageThree),
        collectionLabel: readValue(formData, "collectionLabel", DEFAULT_MUSEUM_DISPLAY.collectionLabel),
        collectionValue: readValue(formData, "collectionValue", DEFAULT_MUSEUM_DISPLAY.collectionValue),
        featureNumber: readValue(formData, "featureNumber", DEFAULT_MUSEUM_DISPLAY.featureNumber),
        featureText: readValue(formData, "featureText", DEFAULT_MUSEUM_DISPLAY.featureText),
        curationTitle: readValue(formData, "curationTitle", DEFAULT_MUSEUM_DISPLAY.curationTitle),
        curationDescription: readValue(formData, "curationDescription", DEFAULT_MUSEUM_DISPLAY.curationDescription),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: {
          heroImageOne: readValue(formData, "heroImageOne", DEFAULT_MUSEUM_DISPLAY.heroImageOne),
          heroImageTwo: readValue(formData, "heroImageTwo", DEFAULT_MUSEUM_DISPLAY.heroImageTwo),
          heroImageThree: readValue(formData, "heroImageThree", DEFAULT_MUSEUM_DISPLAY.heroImageThree),
          collectionLabel: readValue(formData, "collectionLabel", DEFAULT_MUSEUM_DISPLAY.collectionLabel),
          collectionValue: readValue(formData, "collectionValue", DEFAULT_MUSEUM_DISPLAY.collectionValue),
          featureNumber: readValue(formData, "featureNumber", DEFAULT_MUSEUM_DISPLAY.featureNumber),
          featureText: readValue(formData, "featureText", DEFAULT_MUSEUM_DISPLAY.featureText),
          curationTitle: readValue(formData, "curationTitle", DEFAULT_MUSEUM_DISPLAY.curationTitle),
          curationDescription: readValue(formData, "curationDescription", DEFAULT_MUSEUM_DISPLAY.curationDescription),
          updatedAt: new Date(),
        },
      });
  } catch (error) {
    console.error("Museum display update failed", error);
    redirect("/admin?status=error&message=Pengaturan display belum dapat disimpan.");
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?status=updated&message=Display museum berhasil diperbarui.");
}
