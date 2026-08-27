import type { Metadata } from "next";
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
      <div className="rounded-[2rem] border border-border-soft bg-white p-6 shadow-sm md:p-8">
        <StatusMessage status={typeof params.status === "string" ? params.status : undefined} message={typeof params.message === "string" ? params.message : undefined} />
        <form action={createGalleryPost} className="mt-5 grid gap-6 md:grid-cols-[0.9fr_1.1fr]" encType="multipart/form-data">
          <label className="grid min-h-72 place-items-center rounded-[1.5rem] border-2 border-dashed border-border-soft bg-surface-soft p-6 text-center text-sm font-semibold text-navy/70">
            <span>Drop image here atau pilih file</span>
            <input name="image" type="file" required accept="image/jpeg,image/png,image/webp" className="mt-4 w-full rounded-2xl border border-border-soft bg-white p-3" />
          </label>
          <div className="grid gap-5">
            <label className="grid gap-2 text-sm font-semibold text-navy">Judul
              <input name="title" required minLength={4} className="min-h-11 rounded-2xl border border-border-soft px-4" />
            </label>
            <fieldset className="grid gap-2">
              <legend className="text-sm font-semibold text-navy">Sila terkait</legend>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((sila) => <label key={sila} className="rounded-full border border-border-soft px-4 py-2 text-sm font-semibold"><input type="checkbox" name="sila" value={sila} className="mr-2" />{sila}</label>)}
              </div>
            </fieldset>
            <label className="grid gap-2 text-sm font-semibold text-navy">Deskripsi
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
            <Button type="submit">Publikasikan</Button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
