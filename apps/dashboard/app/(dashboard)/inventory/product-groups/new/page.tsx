import { ProductGroupCreateForm } from "../../../../../components/inventory/product-group-create-form";

export const metadata = {
  title: "ایجاد گروه کالا | مدیران فولاد آذر",
  description:
    "تعریف گروه کالای جدید با نام، توضیحات و در صورت نیاز انتخاب گروه والد.",
};

export default function ProductGroupNewPage() {
  return <ProductGroupCreateForm />;
}
