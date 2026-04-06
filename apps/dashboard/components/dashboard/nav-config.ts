export type NavIconId =
  | "overview"
  | "sales"
  | "inventory"
  | "reports"
  | "more";

export type NavItem = {
  id: string;
  label: string;
  href?: string;
  /** Icon for top-level items only (not used on sub-items). */
  icon?: NavIconId;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  { id: "overview", label: "نمای کلی", href: "/", icon: "overview" },
  {
    id: "sales",
    label: "فروش",
    icon: "sales",
    children: [
      { id: "sales-plan", label: "برنامه فروش", href: "/example/sales-plan" },
      { id: "sales-list", label: "فروش‌ها", href: "/example/sales" },
    ],
  },
  {
    id: "inventory",
    label: "موجودی و خریدها",
    icon: "inventory",
    children: [
      { id: "purchases", label: "خریدها", href: "/example/purchases" },
      { id: "products", label: "کالاها", href: "/example/products" },
    ],
  },
  { id: "reports", label: "گزارش‌ها", href: "/example/reports", icon: "reports" },
  {
    id: "more",
    label: "بیشتر",
    icon: "more",
    children: [
      { id: "customers", label: "مشتریان", href: "/example/customers" },
      { id: "settings", label: "تنظیمات", href: "/example/settings" },
    ],
  },
];
