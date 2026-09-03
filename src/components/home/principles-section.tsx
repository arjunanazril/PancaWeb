import { principles } from "@/data/pancasila";

export function PrinciplesSection() {
  return (
    <section className="relative overflow-hidden bg-white/70 py-20 dark:bg-transparent" id="sila">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="museum-kicker">Lima Sila</p>
            <h2 className="museum-heading mt-4 text-3xl md:text-5xl">Ruang nilai yang hadir di museum kehidupan.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-navy/65">
            Setiap sila dibaca sebagai koleksi hidup: punya simbol, konteks, dan contoh yang bisa ditemukan di sekitar kita.
          </p>
        </div>
        <div className="mt-10 grid gap-5">
          {principles.map((principle, index) => (
            <article key={principle.number} id={`sila-${principle.number}`} className="museum-card group grid gap-6 overflow-hidden rounded-[2rem] p-5 transition hover:-translate-y-1 md:grid-cols-[150px_1fr_280px] md:p-7">
              <div className="relative rounded-[1.5rem] bg-navy p-5 text-white">
                <div className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_20%_10%,rgba(243,200,93,0.32),transparent_42%)]" aria-hidden />
                <p className="relative text-6xl font-black tracking-[-0.08em] text-gold">{String(principle.number).padStart(2, "0")}</p>
                <p className="relative mt-8 text-sm font-bold uppercase tracking-[0.18em] text-white/70">{principle.symbol}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Archive #{index + 1}</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-navy md:text-3xl">{principle.title}</h3>
                <p className="mt-3 leading-7 text-navy/70">{principle.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {principle.values.map((value) => (
                    <span key={value} className="rounded-full border border-green/20 bg-green/10 px-3 py-1 text-xs font-bold text-green">{value}</span>
                  ))}
                </div>
              </div>
              <ul className="grid gap-3 text-sm leading-6 text-navy/70">
                {principle.examples.map((example) => <li key={example} className="rounded-2xl bg-surface-soft/70 p-3">{example}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
