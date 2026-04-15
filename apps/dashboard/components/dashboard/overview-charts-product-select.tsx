"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { CHART_PRODUCT_ALL } from "../../lib/overview-stats";

export function ChartProductSelect({
  value,
  onChange,
  productNames,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  productNames: string[];
  ariaLabel: string;
}) {
  return (
    <div className="shrink-0" dir="rtl">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-8 min-w-[200px] max-w-[min(100vw-2rem,20rem)]" aria-label={ariaLabel}>
          <SelectValue placeholder="کالا" />
        </SelectTrigger>
        <SelectContent dir="rtl">
          <SelectItem value={CHART_PRODUCT_ALL}>همه کالاها</SelectItem>
          {productNames.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
