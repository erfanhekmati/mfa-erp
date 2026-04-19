import { ProductGroupsList } from "../../../../components/inventory/product-groups-list";

export const metadata = {
  title: "فهرست دسته‌بندی کالا | مدیران فولاد آذر",
  description:
    "درخت دسته‌های کالا با امکان والد و زیرمجموعه؛ نام، مسیر و توضیحات.",
};

export default function ProductGroupsPage() {
  return <ProductGroupsList />;
}
