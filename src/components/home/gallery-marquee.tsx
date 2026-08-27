import { getRecentGalleryPosts } from "@/lib/data/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { ButtonLink } from "@/components/ui/button";

export async function GalleryMarquee() {
  const posts = await getRecentGalleryPosts(4);
  const doubled = [...posts, ...posts];

  return (
    <section className="overflow-hidden bg-surface-soft py-20">
      <div className="container-shell mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Galeri Hidup</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-navy md:text-5xl">Dokumentasi nilai Pancasila dalam keseharian.</h2>
        </div>
        <ButtonLink href="/gallery" variant="secondary">Buka Semua Galeri</ButtonLink>
      </div>
      {posts.length === 0 ? (
        <div className="container-shell rounded-3xl border border-dashed border-border-soft bg-white p-8 text-center text-navy/70">Belum ada dokumentasi.</div>
      ) : (
        <div className="marquee-wrap space-y-6">
          <div className="marquee-track flex w-max gap-6 px-4">
            {doubled.map((post, index) => <div className="w-[310px] shrink-0" key={`${post.id}-a-${index}`}><GalleryCard post={post} /></div>)}
          </div>
          <div className="marquee-track-reverse hidden w-max gap-6 px-4 md:flex">
            {doubled.map((post, index) => <div className="w-[310px] shrink-0" key={`${post.id}-b-${index}`}><GalleryCard post={post} /></div>)}
          </div>
        </div>
      )}
    </section>
  );
}
