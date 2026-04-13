import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Script from "next/script";
import { SectionThemeSync } from "../components/providers/section-theme-sync";
import { ThemeProvider } from "../components/providers/theme-provider";
import { defaultThemeId, themeIds, THEME_STORAGE_KEY } from "../lib/themes";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * تم + بخش رنگی (فقط تم پیش‌فرض) — منطق مسیر باید با getSectionFromPathname در
 * lib/section-from-path.ts یکی باشد.
 */
const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var v=localStorage.getItem(k);var a=${JSON.stringify(themeIds)};var t=${JSON.stringify(defaultThemeId)};if(v&&a.indexOf(v)!==-1)t=v;document.documentElement.dataset.theme=t;var def=${JSON.stringify(defaultThemeId)};if(t===def){var p=location.pathname||"/";if(p.indexOf("/settings")===0||p.indexOf("/profile")===0)document.documentElement.dataset.section="settings";else if(p.indexOf("/sales")===0)document.documentElement.dataset.section="sales";else if(p.indexOf("/inventory")===0)document.documentElement.dataset.section="inventory";else if(p.indexOf("/customers")===0)document.documentElement.dataset.section="base-info";else if(p.indexOf("/reports")===0)document.documentElement.dataset.section="reports";else document.documentElement.removeAttribute("data-section");}else document.documentElement.removeAttribute("data-section");}catch(e){}})();`;

export const metadata: Metadata = {
  title: "داشبورد ERP",
  description: "سامانه برنامه‌ریزی منابع سازمان مدیران فولاد آذر",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>
          <SectionThemeSync />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
