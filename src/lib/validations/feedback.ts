import { z } from "zod";

export const feedbackSchema = z.object({
  category: z.enum(["CONTENT", "DESIGN", "BUG", "SUGGESTION", "OTHER"]),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter").max(1200),
});
