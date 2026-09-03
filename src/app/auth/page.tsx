import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signInWithGoogle } from "@/lib/actions/auth";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Login" };

type AuthPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const session = await auth();
  if (session?.user) redirect("/");
  const params = await searchParams;
  const reason = typeof params.reason === "string" ? params.reason : null;
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <section className="museum-grid py-20">
      <div className="container-shell museum-card max-w-lg rounded-[2rem] p-8">
        <p className="museum-kicker">Autentikasi</p>
        <h1 className="museum-heading mt-4 text-3xl">Masuk ke Museum</h1>
        <p className="mt-3 leading-7 text-navy/70">Masuk dengan akun Google untuk mengirim feedback dan melanjutkan pengalaman belajar di PancaRuang.</p>
        {reason ? <p className="mt-4 rounded-2xl bg-gold/20 px-4 py-3 text-sm text-navy">{reason === "forbidden" ? "Akses pengelola hanya untuk akun yang berwenang." : "Silakan login untuk melanjutkan."}</p> : null}
        {error ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Login belum bisa diproses. Periksa konfigurasi Google dan environment production, lalu coba lagi.
          </p>
        ) : null}
        <form action={signInWithGoogle} className="mt-6">
          <Button type="submit" className="w-full">Lanjut dengan Google</Button>
        </form>
      </div>
    </section>
  );
}
