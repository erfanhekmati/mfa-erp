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
      { id: "sales-plan", label: "برنامه فروش", href: "/sales/plan" },
      { id: "sales-list", label: "فروش‌ها", href: "/sales" },
    ],
  },
  {
    id: "inventory",
    label: "موجودی و خریدها",
    icon: "inventory",
    children: [
      { id: "purchases", label: "پروژه‌ها", href: "/inventory/purchases" },
      {
        id: "purchase-project-add",
        label: "اضافه کردن پروژه خرید",
        href: "/inventory/purchases/new",
      },
      { id: "products", label: "کالاها", href: "/inventory/products" },
    ],
  },
  { id: "reports", label: "گزارش‌ها", href: "/reports", icon: "reports" },
  {
    id: "more",
    label: "بیشتر",
    icon: "more",
    children: [
      { id: "customers", label: "مشتریان", href: "/customers" },
      { id: "settings", label: "تنظیمات", href: "/settings" },
    ],
  },
];
