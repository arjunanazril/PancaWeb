export type UserRole = "USER" | "ADMIN";

export type FeedbackCategory = "CONTENT" | "DESIGN" | "BUG" | "SUGGESTION" | "OTHER";

export interface GalleryPostView {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  sila: number[];
  location?: string | null;
  documentedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
