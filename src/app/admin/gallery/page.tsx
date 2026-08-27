import type { Metadata } from "next";
import Image from "next/image";
import { AdminShell } from "@/components/admin/admin-shell";
import { SilaBadge } from "@/components/pancasila/sila-badge";
import { Button } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { deleteGalleryPost, updateGalleryPost } from "@/lib/actions/gallery";
import { requireAdmin } from "@/lib/auth/guards";
import { getGalleryPosts } from "@/lib/data/gallery";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Kelola Galeri" };

function dateInputValue(date: Date | null | undefined) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

type AdminGalleryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminGalleryPage({ searchParams }: AdminGalleryPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const sila = typeof params.sila === "string" ? Number(params.sila) : undefined;
  const posts = await getGalleryPosts({ q, sila: Number.isInteger(sila) ? sila : undefined });

  return (
    <AdminShell title="Kelola Galeri">
      <div className="space-y-5">
        <StatusMessage status={typeof params.status === "string" ? params.status : undefined} message={typeof params.message === "string" ? params.message : undefined} />
        <form className="grid gap-3 rounded-3xl border border-border-soft bg-white p-4 md:grid-cols-[1fr_180px_auto]" action="/admin/gallery">
          <label className="sr-only" htmlFor="admin-q">Cari dokumentasi</label>
          <input id="admin-q" name="q" defaultValue={q} placeholder="Cari dokumentasi..." className="min-h-11 rounded-full border border-border-soft px-4 text-sm" />
          <select name="sila" defaultValue={sila ?? ""} className="min-h-11 rounded-full border border-border-soft px-4 text-sm" aria-label="Filter sila">
            <option value="">Semua sila</option>
            {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>Sila {value}</option>)}
          </select>
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white" type="submit">Filter</button>
        </form>
        {posts.length === 0 ? <div className="rounded-3xl border border-dashed border-border-soft bg-white p-8 text-center text-navy/70">Belum ada dokumentasi.</div> : null}
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-[2rem] border border-border-soft bg-white shadow-sm">
            <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
              <div className="relative min-h-64 bg-surface-soft"><Image src={post.imageUrl} alt={post.title} fill sizes="280px" className="object-cover" /></div>
              <div className="grid gap-5 p-5">
                <div>
                  <div className="flex flex-wrap gap-2">{post.sila.map((item) => <SilaBadge key={item} number={item} />)}</div>
                  <h2 className="mt-3 text-2xl font-black text-navy">{post.title}</h2>
                  <p className="mt-2 text-sm text-navy/60">{formatDate(post.createdAt)}</p>
                </div>
                <details className="rounded-2xl bg-surface-soft p-4">
                  <summary className="cursor-pointer font-bold text-navy">Edit dokumentasi</summary>
                  <form action={updateGalleryPost} className="mt-4 grid gap-4">
                    <input type="hidden" name="id" value={post.id} />
                    <input name="title" defaultValue={post.title} required className="min-h-11 rounded-2xl border border-border-soft px-4" aria-label="Judul" />
                    <textarea name="description" defaultValue={post.description} required rows={4} className="rounded-2xl border border-border-soft p-4" aria-label="Deskripsi" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((value) => <label key={value} className="rounded-full bg-white px-3 py-2 text-sm"><input type="checkbox" name="sila" value={value} defaultChecked={post.sila.includes(value)} className="mr-2" />Sila {value}</label>)}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input name="location" defaultValue={post.location ?? ""} className="min-h-11 rounded-2xl border border-border-soft px-4" aria-label="Lokasi" />
                      <input name="documentedAt" type="date" defaultValue={dateInputValue(post.documentedAt)} className="min-h-11 rounded-2xl border border-border-soft px-4" aria-label="Tanggal dokumentasi" />
                    </div>
                    <Button type="submit">Simpan perubahan</Button>
                  </form>
                </details>
                <details className="rounded-2xl border border-red-100 bg-red-50 p-4">
                  <summary className="cursor-pointer font-bold text-red-800">Hapus dokumentasi</summary>
                  <form action={deleteGalleryPost} className="mt-4 grid gap-3">
                    <input type="hidden" name="id" value={post.id} />
                    <label className="text-sm text-red-900">Ketik DELETE untuk konfirmasi
                      <input name="confirmation" className="mt-2 min-h-11 w-full rounded-2xl border border-red-200 px-4" />
                    </label>
                    <Button type="submit" variant="danger">Hapus</Button>
                  </form>
                </details>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
