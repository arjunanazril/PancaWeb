import { desc, eq, ilike } from "drizzle-orm";
import { db } from "@/lib/db";
import { galleryPosts } from "@/lib/db/schema";
import { mockGalleryPosts } from "@/data/mock-gallery";
import type { GalleryPostView } from "@/types";

async function hydrateSila(posts: typeof galleryPosts.$inferSelect[]): Promise<GalleryPostView[]> {
  if (!db || posts.length === 0) return [];

  const rows = await db.query.galleryPostSila.findMany();
  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    location: post.location,
    documentedAt: post.documentedAt,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    sila: rows.filter((row) => row.postId === post.id).map((row) => row.silaNumber).sort(),
  }));
}

export async function getGalleryPosts(options?: { q?: string; sila?: number }) {
  if (!db) return mockGalleryPosts;

  const q = options?.q?.trim();
  const posts = q
    ? await db.select().from(galleryPosts).where(ilike(galleryPosts.title, `%${q}%`)).orderBy(desc(galleryPosts.createdAt))
    : await db.select().from(galleryPosts).orderBy(desc(galleryPosts.createdAt));

  const hydrated = await hydrateSila(posts);
  return options?.sila ? hydrated.filter((post) => post.sila.includes(options.sila as number)) : hydrated;
}

export async function getGalleryPostBySlug(slug: string) {
  if (!db) return mockGalleryPosts.find((post) => post.slug === slug) ?? null;

  const post = await db.query.galleryPosts.findFirst({ where: eq(galleryPosts.slug, slug) });
  if (!post) return null;
  const [hydrated] = await hydrateSila([post]);
  return hydrated ?? null;
}

export async function getRecentGalleryPosts(limit = 4) {
  const posts = await getGalleryPosts();
  return posts.slice(0, limit);
}
