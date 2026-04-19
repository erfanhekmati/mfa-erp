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
        label: "برنامه فروش جدید",
        href: "/sales/plan/new",
      },
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
        label: "پروژه خرید جدید",
        href: "/inventory/purchases/new",
      },
    ],
  },
  { id: "reports", label: "گزارش‌ها", href: "/reports", icon: "reports" },
  {
    id: "base-info",
    label: "اطلاعات پایه",
    icon: "base-info",
    children: [
      {
        id: "counterparty-groups",
        label: "فهرست گروه‌های طرف حساب",
        href: "/customers/groups",
      },
      {
        id: "counterparty-groups-new",
        label: "ایجاد گروه طرف حساب",
        href: "/customers/groups/new",
      },
      {
        id: "counterparty-intro",
        label: "معرفی طرف حساب",
        href: "/customers/new",
      },
      { id: "products", label: "کالاها", href: "/inventory/products" },
      {
        id: "product-intro",
        label: "معرفی کالا",
        href: "/inventory/products/new",
      },
    ],
  },
];
