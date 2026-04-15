/** حداکثر تعداد برچسب روی محور افقی در نمای روزانه تا روی هم نیفتند. */
export const CHART_DAY_MAX_X_TICKS = 8;

/** اندیس‌هایی که برچسب نمایش داده می‌شود (اول و آخر و فاصلهٔ یکنواخت). */
export function visibleDayTickIndices(total: number, maxTicks: number): Set<number> {
  if (total <= 0) return new Set();
  if (total <= maxTicks) return new Set(Array.from({ length: total }, (_, i) => i));
  const set = new Set<number>();
  for (let i = 0; i < maxTicks; i++) {
    const idx = Math.round((i * (total - 1)) / (maxTicks - 1));
    set.add(idx);
  }
  return set;
}

/** تیک سفارشی: فقط اندیس‌های انتخاب‌شده؛ چرخش برای جلوگیری از هم‌پوشانی. */
export function SparseDayAxisTick({
  x,
  y,
  payload,
  index,
  visible,
}: {
  x: number;
  y: number;
  payload: { value?: string };
  index: number;
  visible: Set<number>;
}) {
  if (!visible.has(index)) return <g />;
  const label = payload?.value ?? "";
  return (
    <text
      x={x}
      y={y}
      dy={12}
      textAnchor="end"
      fill="hsl(var(--muted-foreground))"
      fontSize={9}
      transform={`rotate(-48, ${x}, ${y})`}
    >
      {label}
    </text>
  );
}
