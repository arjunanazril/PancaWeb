"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertDb } from "@/lib/db";
import { feedback } from "@/lib/db/schema";
import { requireUser } from "@/lib/auth/guards";
import { feedbackSchema } from "@/lib/validations/feedback";

export async function createFeedback(formData: FormData) {
  const session = await requireUser();
  const parsed = feedbackSchema.safeParse({
    category: formData.get("category"),
    rating: formData.get("rating"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    redirect(`/feedback?status=error&message=${encodeURIComponent(parsed.error.issues[0]?.message ?? "Feedback tidak valid")}`);
  }

  try {
    const database = assertDb();
    await database.insert(feedback).values({
      id: randomUUID(),
      userId: session.user.id,
      category: parsed.data.category,
      rating: parsed.data.rating,
      message: parsed.data.message,
    });
  } catch (error) {
    console.error("Feedback submission failed", error);
    redirect(`/feedback?status=error&message=${encodeURIComponent("Feedback belum dapat disimpan saat ini. Silakan coba lagi nanti.")}`);
  }

  revalidatePath("/admin/feedback");
  redirect("/feedback?status=success");
}
