import {
  Box,
  Chart21,
  Element4,
  More,
  ShoppingCart,
} from "iconsax-react";
import type { NavIconId } from "./nav-config";

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
    className,
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
    case "more":
      return <More {...props} />;
  }
}
