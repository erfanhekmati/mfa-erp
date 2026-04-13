"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@repo/ui";
import { themes } from "../../lib/themes";
import { useTheme } from "../providers/theme-provider";

export function ThemePicker() {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">تم رنگی</CardTitle>
        <CardDescription>
          یکی از تم‌های زیر را انتخاب کنید؛ رنگ‌های داشبورد بلافاصله به‌روز می‌شوند.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="listbox"
          aria-label="انتخاب تم رنگی"
        >
          {themes.map((t) => {
            const selected = activeTheme === t.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setTheme(t.id)}
                  className={cn(
                    "flex w-full flex-col gap-3 rounded-xl border bg-card p-4 text-start shadow-sm transition-[box-shadow,border-color]",
                    "hover:border-primary/40 hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                      : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {t.label}
                    </span>
                    {selected ? (
                      <span
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                        aria-hidden
                      >
                        <svg
                          className="size-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t.description}
                  </p>
                  <div
                    className="flex items-center gap-1.5 pt-0.5"
                    aria-hidden
                  >
                    {t.previewColors.map((hex, i) => (
                      <span
                        key={`${t.id}-swatch-${i}`}
                        className="size-7 rounded-full border border-border/80 shadow-inner"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
