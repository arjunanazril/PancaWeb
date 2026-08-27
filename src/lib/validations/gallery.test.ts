import { describe, expect, it } from "vitest";
import { galleryBaseSchema, validateImage } from "./gallery";

describe("gallery validation", () => {
  it("requires at least one sila", () => {
    const result = galleryBaseSchema.safeParse({
      title: "Kegiatan Gotong Royong",
      description: "Warga bekerja bersama membersihkan lingkungan sekitar.",
      sila: [],
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid image type and size", () => {
    const file = new File(["image"], "photo.webp", { type: "image/webp" });

    expect(validateImage(file)).toBeNull();
  });

  it("rejects non-image uploads", () => {
    const file = new File(["text"], "note.txt", { type: "text/plain" });

    expect(validateImage(file)).toMatch(/JPEG/);
  });
});
