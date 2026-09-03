import Image from "next/image";
import Link from "next/link";
import type { GalleryPostView } from "@/types";
import { SilaBadge } from "@/components/pancasila/sila-badge";
import { formatDate } from "@/lib/utils";

export function GalleryCard({ post }: { post: GalleryPostView }) {
  return (
    <Link href={`/gallery/${post.slug}`} className="museum-card group block overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
        <Image src={post.imageUrl} alt={post.title} fill sizes="(min-width: 768px) 360px, 90vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/78 via-transparent to-transparent opacity-85" />
        <p className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">Koleksi</p>
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap gap-2">
          {post.sila.map((sila) => <SilaBadge key={sila} number={sila} />)}
        </div>
        <div>
          <h3 className="text-lg font-black tracking-tight text-navy">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-navy/70">{post.description}</p>
        </div>
        <p className="border-t border-border-soft pt-3 text-xs font-bold uppercase tracking-[0.16em] text-navy/55">{formatDate(post.documentedAt ?? post.createdAt)}</p>
      </div>
    </Link>
  );
}
