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
    <section className="museum-grid min-h-[70vh] py-16 md:py-20">
      <div className="container-shell">
        <div className="grid gap-6 md:grid-cols-[1fr_320px] md:items-end">
          <div className="max-w-3xl">
            <p className="museum-kicker">Galeri</p>
            <h1 className="museum-heading mt-4 text-4xl md:text-6xl">Koleksi praktik nilai Pancasila.</h1>
            <p className="mt-5 text-lg leading-8 text-navy/70">Jelajahi dokumentasi berdasarkan kegiatan, lokasi, dan hubungan antar sila.</p>
          </div>
          <div className="museum-card rounded-[2rem] p-5 text-sm leading-6 text-navy/68">
            Setiap dokumentasi adalah artefak sosial: foto, cerita, tempat, dan sila yang saling terhubung.
          </div>
        </div>
        <form className="museum-card mt-8 grid gap-3 rounded-[2rem] p-4 md:grid-cols-[1fr_180px_auto]" action="/gallery">
          <label className="sr-only" htmlFor="q">Cari dokumentasi</label>
          <input id="q" name="q" defaultValue={q} placeholder="Cari dokumentasi..." className="min-h-11 rounded-full border border-border-soft px-4 text-sm" />
          <label className="sr-only" htmlFor="sila">Filter sila</label>
          <select id="sila" name="sila" defaultValue={sila ?? ""} className="min-h-11 rounded-full border border-border-soft px-4 text-sm">
            <option value="">Semua sila</option>
            {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>Sila {value}</option>)}
          </select>
          <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-lg shadow-primary/15">Terapkan</button>
        </form>
        {posts.length === 0 ? (
          <div className="museum-card mt-8 rounded-[2rem] border-dashed p-10 text-center text-navy/70">
            <p className="text-2xl font-black text-navy">Belum ada koleksi.</p>
            <p className="mt-2">Upload dokumentasi pertama dari dashboard admin.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <GalleryCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </section>
  );
}
