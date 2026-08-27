import { describe, expect, it } from "vitest";
import { feedbackSchema } from "./feedback";

describe("feedbackSchema", () => {
  it("accepts valid feedback", () => {
    const result = feedbackSchema.safeParse({
      category: "CONTENT",
      rating: 5,
      message: "Kontennya jelas dan galerinya membantu memahami Pancasila.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid rating", () => {
    const result = feedbackSchema.safeParse({
      category: "BUG",
      rating: 6,
      message: "Ada masalah pada tampilan mobile.",
    });

    expect(result.success).toBe(false);
  });
});
