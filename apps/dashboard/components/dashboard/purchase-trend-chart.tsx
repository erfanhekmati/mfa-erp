"use client";

import { useId, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type TrendPoint = { label: string; total: number };

function formatFa(n: number) {
  return Math.round(n).toLocaleString("fa-IR");
}

/** Short axis labels for large amounts (ریال). */
function formatYAxis(v: number) {
  if (v >= 1_000_000_000) {
    return `${(v / 1_000_000_000).toLocaleString("fa-IR", { maximumFractionDigits: 1 })}B`;
  }
  if (v >= 1_000_000) {
    return `${(v / 1_000_000).toLocaleString("fa-IR", { maximumFractionDigits: 0 })}M`;
  }
  return v.toLocaleString("fa-IR");
}

type TooltipPayloadItem = { value?: number; name?: string };

export function PurchaseTrendChart({ points }: { points: TrendPoint[] }) {
  const reactId = useId();
  const gradId = `ptc-fill-${reactId.replace(/:/g, "")}`;

  const data = useMemo(
    () => points.map((p) => ({ name: p.label, total: p.total })),
    [points],
  );

  const manyTicks = data.length > 5;

  if (data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        داده‌ای برای نمایش نیست.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-primary/5 via-muted/25 to-transparent p-3 shadow-[inset_0_1px_0_0_hsl(var(--border)/0.5)] dark:from-primary/10 dark:via-muted/20">
        <div className="w-full min-w-0" dir="ltr">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 12, right: 4, left: 4, bottom: 4 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="45%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                angle={manyTicks ? -22 : 0}
                textAnchor={manyTicks ? "end" : "middle"}
                height={manyTicks ? 48 : 28}
                dy={manyTicks ? 6 : 8}
              />
              <YAxis
                tickFormatter={formatYAxis}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={52}
                domain={[0, "auto"]}
              />
              <Tooltip
                cursor={{
                  stroke: "hsl(var(--primary))",
                  strokeWidth: 1,
                  strokeOpacity: 0.35,
                }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0] as TooltipPayloadItem | undefined;
                  const val = typeof item?.value === "number" ? item.value : 0;
                  return (
                    <div
                      className={[
                        "rounded-xl border border-border/80 bg-popover px-3.5 py-2.5",
                        "shadow-lg ring-1 ring-black/5 backdrop-blur-sm",
                        "dark:ring-white/10",
                      ].join(" ")}
                    >
                      <p className="text-[0.7rem] font-medium text-muted-foreground">{label}</p>
                      <p
                        className="mt-0.5 text-base font-semibold tabular-nums text-foreground"
                        dir="ltr"
                      >
                        {formatFa(val)}
                      </p>
                      <p className="text-[0.65rem] text-muted-foreground">ریال</p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                fill={`url(#${gradId})`}
                dot={{
                  r: 4,
                  fill: "hsl(var(--background))",
                  stroke: "hsl(var(--primary))",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "hsl(var(--primary))",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className="text-center text-[0.7rem] text-muted-foreground">
        محور افقی: ماه · محور عمودی: مبلغ (B = میلیارد، M = میلیون ریال)
      </p>
    </div>
  );
}
