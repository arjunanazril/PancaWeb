import Image from "next/image";
import Link from "next/link";
import type { GalleryPostView } from "@/types";
import { SilaBadge } from "@/components/pancasila/sila-badge";
import { formatDate } from "@/lib/utils";

export function GalleryCard({ post }: { post: GalleryPostView }) {
  return (
    <Link href={`/gallery/${post.slug}`} className="group block overflow-hidden rounded-[1.75rem] border border-border-soft bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
        <Image src={post.imageUrl} alt={post.title} fill sizes="(min-width: 768px) 360px, 90vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex flex-wrap gap-2">
          {post.sila.map((sila) => <SilaBadge key={sila} number={sila} />)}
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-navy/70">{post.description}</p>
        </div>
        <p className="text-xs font-medium text-navy/55">{formatDate(post.documentedAt ?? post.createdAt)}</p>
      </div>
    </Link>
  );
}
