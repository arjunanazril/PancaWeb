import type { Metadata } from "next";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { getGalleryPosts } from "@/lib/data/gallery";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Galeri dokumentasi penerapan nilai Pancasila dalam kehidupan sehari-hari.",
};

type GalleryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const sila = typeof params.sila === "string" ? Number(params.sila) : undefined;
  const posts = await getGalleryPosts({ q, sila: Number.isInteger(sila) ? sila : undefined });

  return (
    <section className="bg-surface-soft py-16">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Galeri</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-navy md:text-6xl">Penerapan nyata nilai Pancasila.</h1>
          <p className="mt-5 text-lg leading-8 text-navy/70">Jelajahi dokumentasi berdasarkan kegiatan, lokasi, dan hubungan antar sila.</p>
        </div>
        <form className="mt-8 grid gap-3 rounded-3xl border border-border-soft bg-white p-4 md:grid-cols-[1fr_180px_auto]" action="/gallery">
          <label className="sr-only" htmlFor="q">Cari dokumentasi</label>
          <input id="q" name="q" defaultValue={q} placeholder="Cari dokumentasi..." className="min-h-11 rounded-full border border-border-soft px-4 text-sm" />
          <label className="sr-only" htmlFor="sila">Filter sila</label>
          <select id="sila" name="sila" defaultValue={sila ?? ""} className="min-h-11 rounded-full border border-border-soft px-4 text-sm">
            <option value="">Semua sila</option>
            {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>Sila {value}</option>)}
          </select>
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">Terapkan</button>
        </form>
        {posts.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-border-soft bg-white p-10 text-center text-navy/70">Belum ada dokumentasi.</div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <GalleryCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </section>
  );
}
