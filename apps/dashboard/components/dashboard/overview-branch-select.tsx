"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import {
  OVERVIEW_BRANCH_OPTIONS,
  type OverviewBranchFilter,
} from "../../lib/overview-stats";

export function OverviewBranchSelect({
  value,
  onChange,
  ariaLabel,
}: {
  value: OverviewBranchFilter;
  onChange: (v: OverviewBranchFilter) => void;
  ariaLabel: string;
}) {
  return (
    <div className="shrink-0" dir="rtl">
      <Select
        value={value}
        onValueChange={(v) => onChange(v as OverviewBranchFilter)}
      >
        <SelectTrigger
          className="h-9 min-w-[200px] max-w-[min(100vw-2rem,20rem)] border-nav-overview/35"
          aria-label={ariaLabel}
        >
          <SelectValue placeholder="شعبه" />
        </SelectTrigger>
        <SelectContent dir="rtl">
          {OVERVIEW_BRANCH_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
