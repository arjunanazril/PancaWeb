import type { Metadata } from "next";
import { auth } from "@/auth";
import { Button, ButtonLink } from "@/components/ui/button";
import { StatusMessage } from "@/components/ui/status-message";
import { createFeedback } from "@/lib/actions/feedback";

export const metadata: Metadata = { title: "Feedback" };

type FeedbackPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const session = await auth();
  const params = await searchParams;

  return (
    <section className="museum-grid py-16">
      <div className="container-shell grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="museum-kicker">Feedback</p>
          <h1 className="museum-heading mt-4 text-4xl">Berikan Masukan</h1>
          <p className="mt-5 leading-7 text-navy/70">Masukanmu membantu PancaRuang menjaga konten tetap jelas, desain nyaman, dan pengalaman belajar lebih baik.</p>
        </div>
        <div className="museum-card rounded-[2rem] p-6 md:p-8">
          <StatusMessage status={typeof params.status === "string" ? params.status : undefined} message={typeof params.message === "string" ? params.message : undefined} />
          {!session?.user ? (
            <div className="mt-4 rounded-3xl bg-surface-soft p-6 text-center">
              <p className="font-bold text-navy">Login diperlukan</p>
              <p className="mt-2 text-sm text-navy/70">User harus login sebelum mengirim feedback.</p>
              <ButtonLink href="/auth" className="mt-5">Login dengan Google</ButtonLink>
            </div>
          ) : (
            <form action={createFeedback} className="mt-4 grid gap-5">
              <label className="grid gap-2 text-sm font-semibold text-navy">Rating
                <select name="rating" required className="min-h-11 rounded-2xl border border-border-soft px-4">
                  {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{"★".repeat(rating)} ({rating})</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy">Kategori
                <select name="category" required className="min-h-11 rounded-2xl border border-border-soft px-4">
                  <option value="CONTENT">Konten</option>
                  <option value="DESIGN">Desain</option>
                  <option value="BUG">Bug</option>
                  <option value="SUGGESTION">Saran</option>
                  <option value="OTHER">Lainnya</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-navy">Pesan
                <textarea name="message" required minLength={10} rows={6} className="rounded-2xl border border-border-soft p-4" placeholder="Bagaimana pengalamanmu menggunakan PancaRuang?" />
              </label>
              <Button type="submit">Kirim Feedback</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
