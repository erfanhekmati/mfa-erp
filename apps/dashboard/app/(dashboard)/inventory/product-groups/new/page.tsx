import { ProductGroupCreateForm } from "../../../../../components/inventory/product-group-create-form";

export const metadata = {
  title: "ایجاد دسته‌بندی کالا | مدیران فولاد آذر",
  description:
    "تعریف دسته جدید با نام، توضیحات و در صورت نیاز انتخاب دسته والد.",
};

export default function ProductGroupNewPage() {
  return <ProductGroupCreateForm />;
}
