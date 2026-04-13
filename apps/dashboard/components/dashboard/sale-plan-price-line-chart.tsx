"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type SalePlanPricePoint = { label: string; price: number };

function formatFa(n: number) {
  return Math.round(n).toLocaleString("fa-IR");
}

function formatYAxis(v: number) {
  if (v >= 1_000_000) {
    return `${(v / 1_000_000).toLocaleString("fa-IR", { maximumFractionDigits: 0 })}M`;
  }
  return v.toLocaleString("fa-IR");
}

type TooltipPayloadItem = { value?: number };

export function SalePlanPriceLineChart({ points }: { points: SalePlanPricePoint[] }) {
  const data = useMemo(
    () => points.map((p) => ({ name: p.label, price: p.price })),
    [points],
  );

  if (data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        داده‌ای برای نمایش نیست.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-nav-sales/10 via-muted/20 to-transparent p-3 dark:from-nav-sales/15">
        <div className="w-full min-w-0" dir="ltr">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data} margin={{ top: 12, right: 6, left: 4, bottom: 4 }}>
              <CartesianGrid
                strokeDasharray="4 6"
                stroke="hsl(var(--border))"
                strokeOpacity={0.55}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))", strokeOpacity: 0.6 }}
                interval={0}
                angle={data.length > 4 ? -18 : 0}
                textAnchor={data.length > 4 ? "end" : "middle"}
                height={data.length > 4 ? 44 : 28}
                dy={data.length > 4 ? 6 : 8}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={48}
                domain={["auto", "auto"]}
              />
              <Tooltip
                cursor={{ stroke: "hsl(var(--nav-icon-sales))", strokeOpacity: 0.35 }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0] as TooltipPayloadItem | undefined;
                  const val = typeof item?.value === "number" ? item.value : 0;
                  return (
                    <div className="rounded-xl border border-border/80 bg-popover px-3.5 py-2.5 shadow-lg ring-1 ring-black/5 backdrop-blur-sm dark:ring-white/10">
                      <p className="text-[0.7rem] font-medium text-muted-foreground">{label}</p>
                      <p
                        className="mt-0.5 text-base font-semibold tabular-nums text-foreground"
                        dir="ltr"
                      >
                        {formatFa(val)}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">ریال (قیمت فروش)</p>
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--nav-icon-sales))"
                strokeWidth={2.5}
                dot={{
                  r: 4,
                  fill: "hsl(var(--background))",
                  stroke: "hsl(var(--nav-icon-sales))",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--nav-icon-sales))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className="text-center text-[0.7rem] text-muted-foreground">
        محور افقی: شروع برنامه · محور عمودی: قیمت فروش (ریال)
      </p>
    </div>
  );
}
