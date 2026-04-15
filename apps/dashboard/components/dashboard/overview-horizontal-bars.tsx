const NAV_ICON_VARS = [
  "--nav-icon-overview",
  "--nav-icon-sales",
  "--nav-icon-inventory",
  "--nav-icon-reports",
  "--nav-icon-base-info",
] as const;

type NavIconVarName = (typeof NAV_ICON_VARS)[number];

const BAR_FILL: Record<NavIconVarName, string> = {
  "--nav-icon-overview": "hsl(var(--nav-icon-overview) / 0.88)",
  "--nav-icon-sales": "hsl(var(--nav-icon-sales) / 0.88)",
  "--nav-icon-inventory": "hsl(var(--nav-icon-inventory) / 0.88)",
  "--nav-icon-reports": "hsl(var(--nav-icon-reports) / 0.88)",
  "--nav-icon-base-info": "hsl(var(--nav-icon-base-info) / 0.88)",
};

function barColorByIndex(index: number): string {
  const k = NAV_ICON_VARS[index % NAV_ICON_VARS.length]!;
  return BAR_FILL[k];
}

function formatFaAmount(n: number): string {
  return Math.round(n).toLocaleString("fa-IR");
}

function maxNamedTotal(items: { total: number }[]): number {
  let m = 0;
  for (const x of items) m = Math.max(m, x.total);
  return m || 1;
}

export function HorizontalBars({ items }: { items: { name: string; total: number }[] }) {
  const max = maxNamedTotal(items);
  if (items.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">موردی نیست.</p>
    );
  }
  return (
    <ul className="space-y-3">
      {items.map((row, index) => {
        const pct = (row.total / max) * 100;
        return (
          <li key={row.name} className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="min-w-0 truncate font-medium text-foreground/90">
                {row.name}
              </span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {formatFaAmount(row.total)}
              </span>
            </div>
            <div
              className="h-2.5 overflow-hidden rounded-full bg-muted"
              role="presentation"
            >
              <div
                className="h-full rounded-full transition-[width]"
                style={{
                  width: `${pct}%`,
                  backgroundColor: barColorByIndex(index),
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
