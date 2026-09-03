import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const variants = {
  primary: "bg-primary text-white shadow-sm shadow-primary/20 hover:bg-primary/90",
  secondary: "border border-border-soft bg-white/80 text-navy shadow-sm hover:bg-white dark:bg-white/10 dark:hover:bg-white/15",
  ghost: "text-navy hover:bg-surface-soft",
  danger: "bg-red-700 text-white hover:bg-red-800",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({ className, variant = "primary", ...props }: ComponentPropsWithoutRef<typeof Link> & { variant?: ButtonProps["variant"] }) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
        variants[variant ?? "primary"],
        className,
      )}
      {...props}
    />
  );
}
