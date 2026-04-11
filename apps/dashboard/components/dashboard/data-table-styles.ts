import { cn } from "@repo/ui";

/** Wrapper passed to `<Table wrapperClassName={...} />` for list pages. */
export const listTableWrapperClassName = cn(
  "overflow-hidden rounded-2xl border border-border/70",
  "bg-card shadow-[0_2px_8px_-2px_rgb(0_0_0/0.07),0_8px_24px_-6px_rgb(0_0_0/0.1)]",
  "ring-1 ring-black/[0.04] dark:border-border/80 dark:ring-white/[0.06]",
  "dark:shadow-[0_2px_12px_-2px_rgb(0_0_0/0.45),0_8px_28px_-8px_rgb(0_0_0/0.35)]",
);

/** `<TableHeader className={...} />` — gradient strip behind column titles. */
export const listTableHeaderClassName = cn(
  "bg-gradient-to-l from-muted/70 via-muted/45 to-muted/30",
  "dark:from-muted/40 dark:via-muted/28 dark:to-muted/15",
);

/** Default `<TableHead />` cell for RTL list tables. */
export const listTableHeadCellClassName = cn(
  "!text-right !normal-case !tracking-normal",
  "border-b border-border/60 py-3.5 px-4 text-xs font-semibold text-muted-foreground",
);

/** Zebra + hover for body rows. Pass row index from map. */
export function listTableBodyRowClassName(index: number) {
  return cn(
    "border-b border-border/30 transition-colors duration-150 last:border-b-0",
    "hover:bg-muted/50",
    index % 2 === 0
      ? "bg-background/[0.97]"
      : "bg-muted/[0.18] dark:bg-muted/25",
  );
}

/** Standard body cell padding + text. */
export const listTableCellClassName =
  "py-3.5 px-4 text-sm text-foreground/95";

/** Numeric / amount cells (LTR numbers). */
export const listTableNumericInnerClassName = cn(
  "inline-flex min-w-[4.25rem] justify-end rounded-lg bg-muted/55 px-2.5 py-1",
  "text-sm font-medium tabular-nums tracking-tight text-foreground",
  "ring-1 ring-border/40 dark:bg-muted/40",
);

/** Small pill for tags (e.g. discount type). */
export function listTableTagClassName(variant: "neutral" | "accent" = "neutral") {
  return cn(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
    variant === "accent"
      ? "bg-primary/12 text-primary ring-1 ring-primary/25"
      : "bg-muted/80 text-muted-foreground ring-1 ring-border/50",
  );
}

/** Pagination bar under the table. */
export const listTablePaginationClassName = cn(
  "flex flex-col items-center justify-between gap-3 rounded-xl border border-border/50 bg-muted/20 px-4 py-3",
  "sm:flex-row dark:bg-muted/15",
);
