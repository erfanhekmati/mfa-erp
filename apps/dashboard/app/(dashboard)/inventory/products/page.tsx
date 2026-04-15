import { ProductsList } from "./products-list";

export const metadata = {
  title: "کالاها | مدیران فولاد آذر",
  description: "فهرست کالاها و واحدهای اندازه‌گیری.",
};

export default function ProductsPage() {
  return (
    <div className="pb-8">
      <ProductsList />
    </div>
  );
}
