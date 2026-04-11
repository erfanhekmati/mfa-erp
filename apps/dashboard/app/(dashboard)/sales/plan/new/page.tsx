import { AddSalePlanForm } from "../../../../../components/sales/add-sale-plan-form";

export const metadata = {
  title: "افزودن برنامه فروش | مدیران فولاد آذر",
  description: "برنامه فروش جدید را ثبت کنید.",
};

export default function AddSalePlanPage() {
  return (
    <div className="space-y-6 px-1 py-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">افزودن برنامه فروش</h1>
      </div>
      <AddSalePlanForm />
    </div>
  );
}
