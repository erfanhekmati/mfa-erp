import { AddProductForm } from "../../../../../components/inventory/add-product-form";

export const metadata = {
  title: "معرفی کالا | مدیران فولاد آذر",
  description: "اطلاعات معرفی کالا را وارد کنید.",
};

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <AddProductForm />
    </div>
  );
}
