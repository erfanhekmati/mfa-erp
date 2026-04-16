"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@repo/ui";
import { useNavLayout } from "../providers/nav-layout-provider";
import type { NavLayoutId } from "../../lib/nav-layout";

const options: { id: NavLayoutId; label: string; description: string }[] = [
  {
    id: "sidebar",
    label: "نوار کناری",
    description: "منوی اصلی در کنار صفحه، مانند حالت پیش‌فرض.",
  },
  {
    id: "topbar",
    label: "نوار بالا",
    description: "فقط آیکون‌ها در نوار بالا؛ زیرمنوها با قرار گرفتن موس روی هر آیکون.",
  },
];

export function NavLayoutPicker() {
  const { navLayout, setNavLayout } = useNavLayout();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">چیدمان منوی اصلی</CardTitle>
        <CardDescription>
          انتخاب کنید منوی اصلی در کنار صفحه باشد یا به صورت آیکون در نوار بالا
          نمایش داده شود.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul
          className="grid gap-3 sm:grid-cols-2"
          role="listbox"
          aria-label="چیدمان منوی اصلی"
        >
          {options.map((opt) => {
            const selected = navLayout === opt.id;
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => setNavLayout(opt.id)}
                  className={cn(
                    "flex w-full flex-col gap-2 rounded-xl border bg-card p-4 text-start shadow-sm transition-[box-shadow,border-color]",
                    "hover:border-primary/40 hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                      : "border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {opt.label}
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
                    {opt.description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
