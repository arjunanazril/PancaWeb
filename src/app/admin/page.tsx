import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button, ButtonLink } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { updateMuseumDisplay } from "@/lib/actions/site-settings";
import { requireAdmin } from "@/lib/auth/guards";
import { getFeedbackList } from "@/lib/data/feedback";
import { getGalleryPosts, getRecentGalleryPosts } from "@/lib/data/gallery";
import { getMuseumDisplay } from "@/lib/data/site-settings";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin Dashboard" };

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const [posts, feedback, recent, display] = await Promise.all([getGalleryPosts(), getFeedbackList(), getRecentGalleryPosts(3), getMuseumDisplay()]);

  return (
    <AdminShell title="Dashboard Admin">
      <StatusMessage status={typeof params.status === "string" ? params.status : undefined} message={typeof params.message === "string" ? params.message : undefined} />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="museum-card rounded-3xl p-6"><p className="text-sm text-navy/60">Total Dokumentasi</p><p className="mt-3 text-4xl font-black text-primary">{posts.length}</p></div>
        <div className="museum-card rounded-3xl p-6"><p className="text-sm text-navy/60">Total Feedback</p><p className="mt-3 text-4xl font-black text-green">{feedback.length}</p></div>
        <div className="rounded-3xl border border-white/10 bg-navy p-6 text-white shadow-2xl"><p className="text-sm text-white/60">Aksi Cepat</p><ButtonLink href="/admin/upload" className="mt-4 bg-white text-navy hover:bg-gold">Upload Dokumentasi</ButtonLink></div>
      </div>
      <section className="museum-card mt-6 rounded-3xl p-6">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Hero Display</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-navy">Edit panel koleksi di halaman utama.</h2>
            <p className="mt-3 text-sm leading-6 text-navy/65">
              Bagian ini mengatur kartu visual di hero: tiga gambar, label Koleksi Live, angka highlight, dan teks Kurasi Hari Ini. Pakai URL gambar publik dari Vercel Blob atau sumber gambar lain.
            </p>
          </div>
          <form action={updateMuseumDisplay} className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-navy">Gambar 1 URL<input name="heroImageOne" defaultValue={display.heroImageOne} className="min-h-11 rounded-2xl border border-border-soft px-4" /></label>
              <label className="grid gap-2 text-sm font-semibold text-navy">Gambar 2 URL<input name="heroImageTwo" defaultValue={display.heroImageTwo} className="min-h-11 rounded-2xl border border-border-soft px-4" /></label>
              <label className="grid gap-2 text-sm font-semibold text-navy">Gambar 3 URL<input name="heroImageThree" defaultValue={display.heroImageThree} className="min-h-11 rounded-2xl border border-border-soft px-4" /></label>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-navy">Label Koleksi<input name="collectionLabel" defaultValue={display.collectionLabel} className="min-h-11 rounded-2xl border border-border-soft px-4" /></label>
              <label className="grid gap-2 text-sm font-semibold text-navy">Nilai Koleksi<input name="collectionValue" defaultValue={display.collectionValue} className="min-h-11 rounded-2xl border border-border-soft px-4" /></label>
              <label className="grid gap-2 text-sm font-semibold text-navy">Nomor Highlight<input name="featureNumber" defaultValue={display.featureNumber} className="min-h-11 rounded-2xl border border-border-soft px-4" /></label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-navy">Teks Highlight<textarea name="featureText" defaultValue={display.featureText} rows={2} className="rounded-2xl border border-border-soft p-4" /></label>
            <label className="grid gap-2 text-sm font-semibold text-navy">Judul Kurasi<input name="curationTitle" defaultValue={display.curationTitle} className="min-h-11 rounded-2xl border border-border-soft px-4" /></label>
            <label className="grid gap-2 text-sm font-semibold text-navy">Deskripsi Kurasi<textarea name="curationDescription" defaultValue={display.curationDescription} rows={3} className="rounded-2xl border border-border-soft p-4" /></label>
            <Button type="submit" className="w-fit">Simpan Display Museum</Button>
          </form>
        </div>
      </section>
      <section className="museum-card mt-6 rounded-3xl p-6">
        <h2 className="text-xl font-black text-navy">Recent Uploads</h2>
        {recent.length === 0 ? <p className="mt-4 text-navy/70">Belum ada dokumentasi.</p> : (
          <div className="mt-4 grid gap-3">
            {recent.map((post) => <div key={post.id} className="rounded-2xl bg-surface-soft p-4"><p className="font-bold text-navy">{post.title}</p><p className="text-sm text-navy/60">{formatDate(post.createdAt)}</p></div>)}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
