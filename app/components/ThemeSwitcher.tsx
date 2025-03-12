"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const themes = ["light", "dark", "neon", "blue", "orange"];

  return (
    <div className="flex gap-4">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t as any)}
          className={`px-4 py-2 rounded-md font-semibold transition-all ${
            theme === t ? "border-2 border-black" : ""
          }`}
          style={{
            backgroundColor: `var(--button-bg)`,
            color: `var(--button-text)`,
          }}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}