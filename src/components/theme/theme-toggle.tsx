"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("pancaruang-theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("pancaruang-theme");
    if (stored === "dark" || stored === "light") return stored;
    return "light";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(nextTheme);
      }}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-navy hover:bg-surface-soft"
      aria-label={`Ganti ke mode ${nextTheme === "dark" ? "gelap" : "cerah"}`}
    >
      {theme === "dark" ? <Sun className="size-4 text-gold-dark" /> : <Moon className="size-4 text-navy" />}
      <span>{theme === "dark" ? "Mode cerah" : "Mode gelap"}</span>
    </button>
  );
}
