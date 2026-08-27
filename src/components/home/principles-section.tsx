import { principles } from "@/data/pancasila";

export function PrinciplesSection() {
  return (
    <section className="bg-white py-20" id="sila">
      <div className="container-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Lima Sila</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-navy md:text-5xl">Nilai dasar yang hadir di ruang hidup kita.</h2>
        </div>
        <div className="mt-10 grid gap-4">
          {principles.map((principle) => (
            <article key={principle.number} id={`sila-${principle.number}`} className="grid gap-6 rounded-[1.75rem] border border-border-soft bg-surface-soft p-6 md:grid-cols-[120px_1fr_260px] md:p-8">
              <div>
                <p className="text-5xl font-black text-primary">{String(principle.number).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-bold text-gold-dark">{principle.symbol}</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-navy">{principle.title}</h3>
                <p className="mt-3 leading-7 text-navy/70">{principle.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {principle.values.map((value) => (
                    <span key={value} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-green">{value}</span>
                  ))}
                </div>
              </div>
              <ul className="space-y-3 text-sm leading-6 text-navy/70">
                {principle.examples.map((example) => <li key={example}>• {example}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
