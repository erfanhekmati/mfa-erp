import { ProductGroupsList } from "../../../../components/inventory/product-groups-list";

export const metadata = {
  title: "فهرست گروه‌های کالا | مدیران فولاد آذر",
  description:
    "درخت گروه‌های کالا با امکان گروه بالاتر و زیرمجموعه؛ نام، مسیر و توضیحات.",
};

export default function ProductGroupsPage() {
  return <ProductGroupsList />;
}
