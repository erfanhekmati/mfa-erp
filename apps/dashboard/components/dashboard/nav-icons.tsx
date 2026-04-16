import {
  Box,
  Chart21,
  Element4,
  Note,
  ShoppingCart,
} from "iconsax-react";
import { cn } from "@repo/ui";
import type { NavIconId } from "./nav-config";

const iconColorClass: Record<NavIconId, string> = {
  overview: "!text-nav-overview",
  sales: "!text-nav-sales",
  inventory: "!text-nav-inventory",
  reports: "!text-nav-reports",
  "base-info": "!text-nav-base-info",
};

const baseProps = {
  size: 20,
  variant: "Linear" as const,
  color: "currentColor",
};

export function NavIcon({
  name,
  className,
  variant = "default",
  "aria-hidden": ariaHidden = true,
}: {
  name: NavIconId;
  className?: string;
  /** روی نوار برند (پس‌زمینه تیره) — رنگ روشن یکدست */
  variant?: "default" | "onBrand";
  "aria-hidden"?: boolean;
}) {
  const colorClass =
    variant === "onBrand"
      ? "text-brandBar-foreground"
      : iconColorClass[name];
  const props = {
    ...baseProps,
    className: cn(colorClass, className),
    "aria-hidden": ariaHidden,
  };

  switch (name) {
    case "overview":
      return <Element4 {...props} />;
    case "sales":
      return <ShoppingCart {...props} />;
    case "inventory":
      return <Box {...props} />;
    case "reports":
      return <Chart21 {...props} />;
    case "base-info":
      return <Note {...props} />;
  }
}
