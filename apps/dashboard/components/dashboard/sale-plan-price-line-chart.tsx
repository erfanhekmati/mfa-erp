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
import {
  CHART_DAY_MAX_X_TICKS,
  SparseDayAxisTick,
  visibleDayTickIndices,
} from "./chart-x-axis-day";
import { formatRialAxisTick } from "./chart-rial-axis";

export type SalePlanPricePoint = { label: string; price: number };

export type SalePlanPriceXAxisKind = "month" | "day" | "year";

function formatFa(n: number) {
  return Math.round(n).toLocaleString("fa-IR");
}

type TooltipPayloadItem = { value?: number };

export function SalePlanPriceLineChart({
  points,
  xAxisKind = "month",
}: {
  points: SalePlanPricePoint[];
  xAxisKind?: SalePlanPriceXAxisKind;
}) {
  const data = useMemo(
    () => points.map((p) => ({ name: p.label, price: p.price })),
    [points],
  );

  const sparseDayTicks =
    xAxisKind === "day" && data.length > CHART_DAY_MAX_X_TICKS;
  const dayTickVisible = useMemo(
    () => visibleDayTickIndices(data.length, CHART_DAY_MAX_X_TICKS),
    [data.length],
  );

  if (data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        داده‌ای برای نمایش نیست.
      </p>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-primary/5 via-muted/25 to-transparent p-3 shadow-[inset_0_1px_0_0_hsl(var(--border)/0.5)] dark:from-primary/10 dark:via-muted/20">
      <div className="w-full min-w-0" dir="ltr">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={data}
              margin={{ top: 12, right: 6, left: 4, bottom: sparseDayTicks ? 8 : 4 }}
            >
              <CartesianGrid
                strokeDasharray="4 6"
                stroke="hsl(var(--border))"
                strokeOpacity={0.55}
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={
                  sparseDayTicks
                    ? (props) => {
                        const x = Number(props.x);
                        const y = Number(props.y);
                        const index = Number(props.index);
                        if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(index)) {
                          return <g />;
                        }
                        return (
                          <SparseDayAxisTick
                            x={x}
                            y={y}
                            payload={props.payload}
                            index={index}
                            visible={dayTickVisible}
                          />
                        );
                      }
                    : { fontSize: 11, fill: "hsl(var(--muted-foreground))" }
                }
                tickLine={false}
                axisLine={{ stroke: "hsl(var(--border))", strokeOpacity: 0.6 }}
                interval={0}
                angle={
                  sparseDayTicks ? 0 : data.length > 4 ? -18 : 0
                }
                textAnchor={
                  sparseDayTicks ? "middle" : data.length > 4 ? "end" : "middle"
                }
                height={sparseDayTicks ? 76 : data.length > 4 ? 44 : 28}
                dy={sparseDayTicks ? 0 : data.length > 4 ? 6 : 8}
              />
              <YAxis
                tickFormatter={formatRialAxisTick}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={64}
                domain={["auto", "auto"]}
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
                      <p className="text-[0.65rem] text-muted-foreground">ریال (قیمت فروش)</p>
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
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
            </LineChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}
