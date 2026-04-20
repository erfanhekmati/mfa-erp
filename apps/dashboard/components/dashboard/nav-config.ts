export type NavIconId =
  | "overview"
  | "sales"
  | "inventory"
  | "warehouse"
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
    id: "inventory",
    label: "تامین",
    icon: "inventory",
    children: [
      { id: "purchases", label: "خرید ها", href: "/inventory/purchases" },
      {
        id: "purchase-project-add",
        label: "ایجاد فاکتور خرید",
        href: "/inventory/purchases/new",
      },
    ],
  },
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
  { id: "warehouse", label: "انبار", href: "/warehouse", icon: "warehouse" },
  { id: "reports", label: "گزارش‌ها", href: "/reports", icon: "reports" },
  {
    id: "base-info",
    label: "اطلاعات پایه",
    icon: "base-info",
    children: [
      {
        id: "base-counterparties",
        label: "طرف حساب‌ها",
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
        ],
      },
      {
        id: "base-products",
        label: "کالاها",
        children: [
          { id: "products", label: "کالاها", href: "/inventory/products" },
          {
            id: "product-intro",
            label: "معرفی کالا",
            href: "/inventory/products/new",
          },
          {
            id: "product-groups",
            label: "فهرست گروه‌های کالا",
            href: "/inventory/product-groups",
          },
          {
            id: "product-groups-new",
            label: "ایجاد گروه کالا",
            href: "/inventory/product-groups/new",
          },
        ],
      },
    ],
  },
];
