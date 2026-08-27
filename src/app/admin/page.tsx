import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { ButtonLink } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth/guards";
import { getFeedbackList } from "@/lib/data/feedback";
import { getGalleryPosts, getRecentGalleryPosts } from "@/lib/data/gallery";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default async function AdminPage() {
  await requireAdmin();
  const [posts, feedback, recent] = await Promise.all([getGalleryPosts(), getFeedbackList(), getRecentGalleryPosts(3)]);

  return (
    <AdminShell title="Dashboard Admin">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-border-soft bg-white p-6"><p className="text-sm text-navy/60">Total Dokumentasi</p><p className="mt-3 text-4xl font-black text-primary">{posts.length}</p></div>
        <div className="rounded-3xl border border-border-soft bg-white p-6"><p className="text-sm text-navy/60">Total Feedback</p><p className="mt-3 text-4xl font-black text-green">{feedback.length}</p></div>
        <div className="rounded-3xl border border-border-soft bg-navy p-6 text-white"><p className="text-sm text-white/60">Aksi Cepat</p><ButtonLink href="/admin/upload" className="mt-4 bg-white text-navy hover:bg-gold">Upload Dokumentasi</ButtonLink></div>
      </div>
      <section className="mt-6 rounded-3xl border border-border-soft bg-white p-6">
        <h2 className="text-xl font-black text-navy">Recent Uploads</h2>
        {recent.length === 0 ? <p className="mt-4 text-navy/70">Belum ada dokumentasi.</p> : (
          <div className="mt-4 grid gap-3">
            {recent.map((post) => <div key={post.id} className="rounded-2xl bg-surface-soft p-4"><p className="font-bold text-navy">{post.title}</p><p className="text-sm text-navy/60">{formatDate(post.createdAt)}</p></div>)}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
