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
  overview: "!text-[hsl(var(--nav-icon-overview))]",
  sales: "!text-[hsl(var(--nav-icon-sales))]",
  inventory: "!text-[hsl(var(--nav-icon-inventory))]",
  reports: "!text-[hsl(var(--nav-icon-reports))]",
  "base-info": "!text-[hsl(var(--nav-icon-base-info))]",
};

const baseProps = {
  size: 20,
  variant: "Linear" as const,
  color: "currentColor",
};

export function NavIcon({
  name,
  className,
  "aria-hidden": ariaHidden = true,
}: {
  name: NavIconId;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  const props = {
    ...baseProps,
    className: cn(iconColorClass[name], className),
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
