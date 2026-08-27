import { desc } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { feedback, users } from "@/lib/db/schema";

export async function getFeedbackList() {
  if (!db) return [];

  return db
    .select({
      id: feedback.id,
      category: feedback.category,
      rating: feedback.rating,
      message: feedback.message,
      createdAt: feedback.createdAt,
      userName: users.name,
      userEmail: users.email,
    })
    .from(feedback)
    .leftJoin(users, eq(users.id, feedback.userId))
    .orderBy(desc(feedback.createdAt));
}
