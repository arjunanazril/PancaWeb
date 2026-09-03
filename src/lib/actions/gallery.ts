"use server";

import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import { assertDb } from "@/lib/db";
import { galleryPosts, galleryPostSila } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guards";
import { galleryBaseSchema, galleryUpdateSchema, validateImage } from "@/lib/validations/gallery";
import { slugify } from "@/lib/utils";

function getSilaValues(formData: FormData) {
  return formData.getAll("sila").map((value) => Number(value));
}

function parseOptionalDate(value: string | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getBlobToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  return token;
}

function getImageExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension) return extension;
  if (file.type === "image/heic") return "heic";
  if (file.type === "image/heif") return "heif";
  return file.type.split("/")[1] ?? "webp";
}

function isHeicImage(file: File) {
  const lowerName = file.name.toLowerCase();
  return file.type === "image/heic" || file.type === "image/heif" || lowerName.endsWith(".heic") || lowerName.endsWith(".heif");
}

async function prepareImageForUpload(file: File) {
  if (!isHeicImage(file)) {
    return { body: file, extension: getImageExtension(file) };
  }

  const input = Buffer.from(await file.arrayBuffer());
  const output = await sharp(input).rotate().jpeg({ quality: 88 }).toBuffer();
  return { body: output, extension: "jpg" };
}

export async function createGalleryPost(formData: FormData) {
  const session = await requireAdmin();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    redirect("/admin/upload?status=error&message=Gambar wajib diunggah");
  }

  const imageError = validateImage(image);
  if (imageError) redirect(`/admin/upload?status=error&message=${encodeURIComponent(imageError)}`);

  const parsed = galleryBaseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location") || undefined,
    documentedAt: formData.get("documentedAt") || undefined,
    sila: getSilaValues(formData),
  });

  if (!parsed.success) {
    redirect(`/admin/upload?status=error&message=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Data dokumentasi tidak valid")}`);
  }

  try {
    const database = assertDb();
    const id = randomUUID();
    const slug = `${slugify(parsed.data.title)}-${id.slice(0, 8)}`;
    const uploadImage = await prepareImageForUpload(image);
    const blob = await put(`gallery/${slug}.${uploadImage.extension}`, uploadImage.body, {
      access: "public",
      addRandomSuffix: false,
      contentType: uploadImage.extension === "jpg" ? "image/jpeg" : image.type,
      token: getBlobToken(),
    });

    await database.insert(galleryPosts).values({
      id,
      slug,
      title: parsed.data.title,
      description: parsed.data.description,
      imageUrl: blob.url,
      location: parsed.data.location || null,
      documentedAt: parseOptionalDate(parsed.data.documentedAt),
      createdBy: session.user.id,
    });

    await database.insert(galleryPostSila).values(
      parsed.data.sila.map((silaNumber) => ({ postId: id, silaNumber })),
    );
  } catch (error) {
    console.error("Gallery creation failed", error);
    redirect(`/admin/upload?status=error&message=${encodeURIComponent("Dokumentasi belum dapat disimpan saat ini. Periksa koneksi layanan dan coba lagi.")}`);
  }

  revalidatePath("/gallery");
  revalidatePath("/admin");
  redirect("/admin/gallery?status=created");
}

export async function updateGalleryPost(formData: FormData) {
  await requireAdmin();
  const parsed = galleryUpdateSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location") || undefined,
    documentedAt: formData.get("documentedAt") || undefined,
    sila: getSilaValues(formData),
  });

  if (!parsed.success) {
    redirect(`/admin/gallery?status=error&message=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Data dokumentasi tidak valid")}`);
  }

  try {
    const database = assertDb();
    await database
      .update(galleryPosts)
      .set({
        title: parsed.data.title,
        description: parsed.data.description,
        location: parsed.data.location || null,
        documentedAt: parseOptionalDate(parsed.data.documentedAt),
        updatedAt: new Date(),
      })
      .where(eq(galleryPosts.id, parsed.data.id));

    await database.delete(galleryPostSila).where(eq(galleryPostSila.postId, parsed.data.id));
    await database.insert(galleryPostSila).values(
      parsed.data.sila.map((silaNumber) => ({ postId: parsed.data.id, silaNumber })),
    );
  } catch (error) {
    console.error("Gallery update failed", error);
    redirect(`/admin/gallery?status=error&message=${encodeURIComponent("Dokumentasi belum dapat diperbarui.")}`);
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?status=updated");
}

export async function deleteGalleryPost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (!id || confirmation !== "DELETE") {
    redirect("/admin/gallery?status=error&message=Konfirmasi hapus tidak valid");
  }

  try {
    const database = assertDb();
    await database.delete(galleryPosts).where(eq(galleryPosts.id, id));
  } catch (error) {
    console.error("Gallery deletion failed", error);
    redirect(`/admin/gallery?status=error&message=${encodeURIComponent("Dokumentasi belum dapat dihapus.")}`);
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?status=deleted");
}
