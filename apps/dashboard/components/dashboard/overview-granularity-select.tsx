"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";

/** روزانه / ماهانه / سالانه */
export type OverviewChartGranularity = "day" | "month" | "year";

export function ChartGranularitySelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: OverviewChartGranularity;
  onChange: (v: OverviewChartGranularity) => void;
  ariaLabel: string;
}) {
  return (
    <div className="shrink-0" dir="rtl">
      <Select
        value={value}
        onValueChange={(v) => onChange(v as OverviewChartGranularity)}
      >
        <SelectTrigger className="h-8 min-w-[148px]" aria-label={ariaLabel}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent dir="rtl">
          <SelectItem value="day">روزانه</SelectItem>
          <SelectItem value="month">ماهانه</SelectItem>
          <SelectItem value="year">سالانه</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
