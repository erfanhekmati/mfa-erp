"use client";

import { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export type BranchSlice = { name: string; total: number };

/** رنگ‌های ثابت (پالت تم default)، وابسته به تم نیستند تا در همهٔ تم‌ها خوانا باشند. */
const BRANCH_PIE_FILL: Record<string, string> = {
  تهران: "hsl(221 83% 53%)",
  تبریز: "hsl(142 71% 40%)",
  اصفهان: "hsl(45 97% 44%)",
  مشهد: "hsl(0 72% 51%)",
};

const FALLBACK_FILLS = [
  "hsl(262 83% 56%)",
  "hsl(199 89% 48%)",
  "hsl(330 81% 60%)",
  "hsl(221 83% 53%)",
  "hsl(142 71% 40%)",
  "hsl(45 97% 44%)",
  "hsl(0 72% 51%)",
] as const;

function fillForBranch(name: string, index: number): string {
  if (BRANCH_PIE_FILL[name]) return BRANCH_PIE_FILL[name]!;
  return FALLBACK_FILLS[index % FALLBACK_FILLS.length]!;
}

function formatFa(n: number) {
  return Math.round(n).toLocaleString("fa-IR");
}

export function PurchaseBranchPieChart({
  items,
  footerCaption = "سهم هر شعبه از جمع مبلغ کل خرید (ریال)",
}: {
  items: BranchSlice[];
  /** زیر نمودار (مثلاً خرید در مقابل سهم فروش) */
  footerCaption?: string;
}) {
  const data = useMemo(
    () => items.map((x) => ({ name: x.name, value: x.total })),
    [items],
  );

  const total = useMemo(
    () => items.reduce((s, x) => s + x.total, 0),
    [items],
  );

  if (data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">موردی نیست.</p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-muted/40 via-muted/20 to-transparent p-3">
        <div className="w-full min-w-0" dir="ltr">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="46%"
                outerRadius={112}
                innerRadius={54}
                paddingAngle={2}
                stroke="none"
                strokeWidth={0}
              >
                {data.map((d, i) => (
                  <Cell key={d.name} fill={fillForBranch(d.name, i)} />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const row = payload[0] as {
                    name?: string;
                    value?: number;
                    payload?: { name?: string; value?: number };
                  };
                  const name = row.payload?.name ?? row.name ?? "";
                  const idx = data.findIndex((x) => x.name === name);
                  const val =
                    typeof row.value === "number"
                      ? row.value
                      : typeof row.payload?.value === "number"
                        ? row.payload.value
                        : 0;
                  const pct = total > 0 ? (val / total) * 100 : 0;
                  const dotColor = fillForBranch(name, idx >= 0 ? idx : 0);
                  return (
                    <div
                      className="rounded-xl border border-border/60 bg-popover/95 px-3.5 py-2.5 text-right shadow-md backdrop-blur-sm"
                      dir="rtl"
                    >
                      <p className="flex items-center justify-end gap-2 text-[0.7rem] font-medium text-muted-foreground">
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: dotColor }}
                          aria-hidden
                        />
                        {name}
                      </p>
                      <p
                        className="mt-0.5 text-base font-semibold tabular-nums text-foreground"
                        dir="ltr"
                      >
                        {formatFa(val)}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">
                        {pct.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}٪ از جمع
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-1 pt-1 text-sm"
          dir="rtl"
        >
          {items.map((item, i) => (
            <li key={item.name} className="flex items-center gap-2">
              <span
                className="size-3 shrink-0 rounded-full shadow-sm ring-1 ring-background/80"
                style={{ backgroundColor: fillForBranch(item.name, i) }}
                aria-hidden
              />
              <span className="font-medium text-foreground/90">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-[0.7rem] text-muted-foreground">{footerCaption}</p>
    </div>
  );
}
