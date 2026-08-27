import { getPrinciple } from "@/data/pancasila";

export function SilaBadge({ number }: { number: number }) {
  const principle = getPrinciple(number);
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gold-dark/30 bg-gold/20 px-3 py-1 text-xs font-semibold text-navy">
      Sila {number}{principle ? ` · ${principle.symbol}` : ""}
    </span>
  );
}
