import { AddProductForm } from "../../../../../components/inventory/add-product-form";

export const metadata = {
  title: "کالای جدید | مدیران فولاد آذر",
  description: "اطلاعات کالای جدید را وارد کنید.",
};

export default function AddProductPage() {
  return (
    <div className="mt-6 space-y-6">
      <AddProductForm />
    </div>
  );
}
