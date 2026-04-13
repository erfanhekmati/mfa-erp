export type NavIconId =
  | "overview"
  | "sales"
  | "inventory"
  | "reports"
  | "base-info";

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
      {
        id: "sales-plan-add",
        label: "افزودن برنامه فروش",
        href: "/sales/plan/new",
      },
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
      {
        id: "product-add",
        label: "افزودن کالا",
        href: "/inventory/products/new",
      },
    ],
  },
  { id: "reports", label: "گزارش‌ها", href: "/reports", icon: "reports" },
  {
    id: "base-info",
    label: "اطلاعات پایه",
    icon: "base-info",
    children: [
      { id: "customer-add", label: "اضافه کردن مشتری", href: "/customers/new" },
      { id: "product-add-base", label: "اضافه کردن کالا", href: "/inventory/products/new" },
    ],
  },
];
