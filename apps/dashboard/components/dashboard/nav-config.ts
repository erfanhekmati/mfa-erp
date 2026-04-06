export type NavItem = {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  { id: "home", label: "خانه", href: "/" },
  {
    id: "sales",
    label: "فروش",
    children: [
      { id: "orders", label: "سفارش‌ها", href: "/example/orders" },
      { id: "invoices", label: "فاکتورها", href: "/example/invoices" },
    ],
  },
  {
    id: "inventory",
    label: "انبار",
    children: [
      { id: "products", label: "کالاها", href: "/example/products" },
      { id: "stock", label: "موجودی", href: "/example/stock" },
    ],
  },
  {
    id: "settings",
    label: "تنظیمات",
    children: [
      { id: "users", label: "کاربران", href: "/example/users" },
      { id: "permissions", label: "دسترسی‌ها", href: "/example/permissions" },
    ],
  },
];
