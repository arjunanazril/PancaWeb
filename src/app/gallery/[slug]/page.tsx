import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SilaBadge } from "@/components/pancasila/sila-badge";
import { getGalleryPostBySlug } from "@/lib/data/gallery";
import { formatDate } from "@/lib/utils";

type GalleryDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GalleryDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getGalleryPostBySlug(slug);
  if (!post) return { title: "Dokumentasi tidak ditemukan" };
  return {
    title: post.title,
    description: post.description,
    openGraph: { images: [post.imageUrl] },
  };
}

export default async function GalleryDetailPage({ params }: GalleryDetailProps) {
  const { slug } = await params;
  const post = await getGalleryPostBySlug(slug);
  if (!post) notFound();

  return (
    <section className="bg-surface-soft py-12 md:py-16">
      <article className="container-shell overflow-hidden rounded-[2rem] border border-border-soft bg-white shadow-xl">
        <div className="relative aspect-[16/10] bg-surface-soft md:aspect-[16/7]">
          <Image src={post.imageUrl} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="grid gap-8 p-6 md:grid-cols-[1fr_280px] md:p-10">
          <div>
            <div className="flex flex-wrap gap-2">{post.sila.map((sila) => <SilaBadge key={sila} number={sila} />)}</div>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-navy md:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-8 text-navy/72">{post.description}</p>
          </div>
          <aside className="rounded-3xl bg-surface-soft p-5 text-sm text-navy/70">
            <p className="font-bold text-navy">Metadata</p>
            <dl className="mt-4 space-y-4">
              <div><dt className="font-semibold">Tanggal</dt><dd>{formatDate(post.documentedAt ?? post.createdAt)}</dd></div>
              <div><dt className="font-semibold">Lokasi</dt><dd>{post.location ?? "Belum dicatat"}</dd></div>
              <div><dt className="font-semibold">Relasi Sila</dt><dd>{post.sila.map((sila) => `Sila ${sila}`).join(", ")}</dd></div>
            </dl>
          </aside>
        </div>
      </article>
    </section>
  );
}
