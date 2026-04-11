import { AddProductForm } from "../../../../../components/inventory/add-product-form";

export const metadata = {
  title: "افزودن کالا | مدیران فولاد آذر",
  description: "اطلاعات کالای جدید را وارد کنید.",
};

export default function AddProductPage() {
  return (
    <div className="space-y-6 px-1 py-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">افزودن کالا</h1>
      </div>
      <AddProductForm />
    </div>
  );
}
