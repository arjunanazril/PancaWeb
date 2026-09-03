import type { Metadata } from "next";
import { ImagePlus } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { createGalleryPost } from "@/lib/actions/gallery";
import { requireAdmin } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Upload Dokumentasi" };

type AdminUploadPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminUploadPage({ searchParams }: AdminUploadPageProps) {
  await requireAdmin();
  const params = await searchParams;

  return (
    <AdminShell title="Tambah Dokumentasi">
      <div className="museum-card overflow-hidden rounded-[2.25rem] p-5 md:p-8">
        <StatusMessage status={typeof params.status === "string" ? params.status : undefined} message={typeof params.message === "string" ? params.message : undefined} />
        <form action={createGalleryPost} className="mt-5 grid gap-6 md:grid-cols-[0.9fr_1.1fr]" encType="multipart/form-data">
          <label className="group grid min-h-[26rem] place-items-center rounded-[2rem] border-2 border-dashed border-border-soft bg-[radial-gradient(circle_at_50%_15%,rgba(243,200,93,0.25),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.75),rgba(239,232,217,0.75))] p-6 text-center text-sm font-semibold text-navy/70 transition hover:border-primary/40 dark:bg-surface-soft">
            <span className="grid place-items-center">
              <span className="grid size-16 place-items-center rounded-3xl bg-navy text-gold shadow-xl transition group-hover:scale-105"><ImagePlus className="size-7" /></span>
              <span className="mt-5 text-xl font-black tracking-tight text-navy">Tambahkan artefak visual</span>
              <span className="mt-2 max-w-xs font-normal leading-6">Unggah JPG, PNG, WebP, HEIC, atau HEIF sebagai dokumentasi penerapan nilai Pancasila.</span>
            </span>
            <input name="image" type="file" required accept="image/*,.heic,.HEIC,.heif,.HEIF" className="mt-6 w-full rounded-2xl border border-border-soft bg-white/80 p-3" />
          </label>
          <div className="grid gap-5 rounded-[2rem] bg-white/50 p-5 dark:bg-white/5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Metadata Koleksi</p>
              <p className="mt-2 text-sm text-navy/65">Isi detail agar dokumentasi mudah dicari dan dipahami pengunjung.</p>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-navy">Judul Koleksi
              <input name="title" required minLength={4} className="min-h-11 rounded-2xl border border-border-soft px-4" />
            </label>
            <fieldset className="grid gap-2">
              <legend className="text-sm font-semibold text-navy">Sila terkait</legend>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((sila) => <label key={sila} className="rounded-full border border-border-soft bg-white/70 px-4 py-2 text-sm font-bold shadow-sm"><input type="checkbox" name="sila" value={sila} className="mr-2" />Sila {sila}</label>)}
              </div>
            </fieldset>
            <label className="grid gap-2 text-sm font-semibold text-navy">Narasi Dokumentasi
              <textarea name="description" required minLength={20} rows={6} className="rounded-2xl border border-border-soft p-4" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-navy">Lokasi
                <input name="location" className="min-h-11 rounded-2xl border border-border-soft px-4" />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy">Tanggal dokumentasi
                <input name="documentedAt" type="date" className="min-h-11 rounded-2xl border border-border-soft px-4" />
              </label>
            </div>
            <Button type="submit" className="shadow-lg shadow-primary/15">Publikasikan ke Galeri</Button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
