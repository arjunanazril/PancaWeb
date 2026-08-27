import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth/guards";
import { getFeedbackList } from "@/lib/data/feedback";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Feedback User" };

const labels = {
  CONTENT: "Konten",
  DESIGN: "Desain",
  BUG: "Bug",
  SUGGESTION: "Saran",
  OTHER: "Lainnya",
};

export default async function AdminFeedbackPage() {
  await requireAdmin();
  const items = await getFeedbackList();

  return (
    <AdminShell title="Feedback User">
      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border-soft bg-white p-8 text-center text-navy/70">Belum ada feedback.</div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-3xl border border-border-soft bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-navy">{item.userName ?? item.userEmail ?? "User"}</p>
                  <p className="text-sm text-navy/55">{formatDate(item.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="rounded-full bg-gold/25 px-3 py-1 text-navy">{labels[item.category]}</span>
                  <span className="text-gold-dark">{"★".repeat(item.rating)}</span>
                </div>
              </div>
              <p className="mt-4 leading-7 text-navy/72">{item.message}</p>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
