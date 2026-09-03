import { z } from "zod";

export const silaSchema = z.coerce.number().int().min(1).max(5);

export const galleryBaseSchema = z.object({
  title: z.string().trim().min(4, "Judul minimal 4 karakter").max(120),
  description: z.string().trim().min(20, "Deskripsi minimal 20 karakter").max(1600),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  documentedAt: z.string().optional().or(z.literal("")),
  sila: z.array(silaSchema).min(1, "Pilih minimal satu sila"),
});

export const galleryCreateSchema = galleryBaseSchema.extend({
  image: z.instanceof(File),
});

export const galleryUpdateSchema = galleryBaseSchema.extend({
  id: z.string().min(1),
});

export function validateImage(file: File) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];
  const maxSize = 30 * 1024 * 1024;
  const lowerName = file.name.toLowerCase();
  const hasAllowedExtension = allowedExtensions.some((extension) => lowerName.endsWith(extension));

  if (!allowedTypes.includes(file.type) && !hasAllowedExtension) {
    return "Format gambar harus JPEG, PNG, WebP, HEIC, atau HEIF.";
  }

  if (file.size > maxSize) {
    return "Ukuran gambar maksimal 30 MB.";
  }

  if (file.size === 0) {
    return "File gambar tidak boleh kosong.";
  }

  return null;
}
