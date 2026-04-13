"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getSectionFromPathname } from "../../lib/section-from-path";
import { defaultThemeId } from "../../lib/themes";
import { useTheme } from "./theme-provider";

/**
 * برای تم پیش‌فرض، بر اساس مسیر، `data-section` را روی `<html>` می‌گذارد تا
 * متغیرهای CSS (--primary، --ring، --accent) رنگ بخش فعلی را بگیرند.
 */
export function SectionThemeSync() {
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (theme !== defaultThemeId) {
      document.documentElement.removeAttribute("data-section");
      return;
    }

    const section = getSectionFromPathname(pathname);
    if (section === "overview") {
      document.documentElement.removeAttribute("data-section");
    } else {
      document.documentElement.dataset.section = section;
    }
  }, [pathname, theme]);

  return null;
}
