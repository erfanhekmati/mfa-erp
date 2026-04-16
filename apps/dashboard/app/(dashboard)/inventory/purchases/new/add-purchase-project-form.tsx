"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  PersianDateTimePicker,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { useState } from "react";
import {
  getDefaultProviderPurchaseFormValues,
  type ProviderPurchaseFormValues,
} from "../../../../../lib/provider-purchase-form";

export function AddPurchaseProjectForm() {
  const [values, setValues] = useState<ProviderPurchaseFormValues>(() =>
    getDefaultProviderPurchaseFormValues(),
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function setField<K extends keyof ProviderPurchaseFormValues>(
    key: K,
    value: ProviderPurchaseFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Card className="w-full max-w-3xl border-border/80">
      <CardHeader className="text-right">
        <CardTitle className="text-xl font-semibold tracking-tight">
          مشخصات پروژه خرید
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="provider"
                className="text-sm font-medium leading-none"
              >
                تامین‌کننده
              </label>
              <Input
                id="provider"
                name="provider"
                autoComplete="off"
                value={values.provider}
                onChange={(e) => setField("provider", e.target.value)}
                className="!max-w-none"
                placeholder="نام یا شرکت تامین‌کننده"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="productId"
                className="text-sm font-medium leading-none"
              >
                کالا
              </label>
              <Select
                value={values.productId || "__empty__"}
                onValueChange={(v) =>
                  setField("productId", v === "__empty__" ? "" : v)
                }
              >
                <SelectTrigger
                  id="productId"
                  className="!max-w-none text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent position="popper" dir="rtl" className="text-right">
                  <SelectItem value="__empty__">انتخاب کنید</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="branchId"
                className="text-sm font-medium leading-none"
              >
                شعبه
              </label>
              <Select
                value={values.branchId || "__empty__"}
                onValueChange={(v) =>
                  setField("branchId", v === "__empty__" ? "" : v)
                }
              >
                <SelectTrigger
                  id="branchId"
                  className="!max-w-none text-right"
                  dir="rtl"
                >
                  <SelectValue placeholder="انتخاب کنید" />
                </SelectTrigger>
                <SelectContent position="popper" dir="rtl" className="text-right">
                  <SelectItem value="__empty__">انتخاب کنید</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="quantity"
                className="text-sm font-medium leading-none"
              >
                مقدار
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.quantity}
                onChange={(e) => setField("quantity", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="unitPrice"
                className="text-sm font-medium leading-none"
              >
                قیمت واحد
              </label>
              <Input
                id="unitPrice"
                name="unitPrice"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.unitPrice}
                onChange={(e) => setField("unitPrice", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sumPrice"
                className="text-sm font-medium leading-none"
              >
                جمع کالا
              </label>
              <Input
                id="sumPrice"
                name="sumPrice"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.sumPrice}
                onChange={(e) => setField("sumPrice", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="taxAndDuties"
                className="text-sm font-medium leading-none"
              >
                مالیات و عوارض
              </label>
              <Input
                id="taxAndDuties"
                name="taxAndDuties"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.taxAndDuties}
                onChange={(e) => setField("taxAndDuties", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="freight"
                className="text-sm font-medium leading-none"
              >
                حمل و نقل
              </label>
              <Input
                id="freight"
                name="freight"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.freight}
                onChange={(e) => setField("freight", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="totalAmount"
                className="text-sm font-medium leading-none"
              >
                مبلغ کل
              </label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.totalAmount}
                onChange={(e) => setField("totalAmount", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="purchasedAt"
                className="text-sm font-medium leading-none"
              >
                تاریخ خرید
              </label>
              <PersianDateTimePicker
                id="purchasedAt"
                name="purchasedAt"
                value={values.purchasedAt}
                onChange={(v) => setField("purchasedAt", v)}
                className="!max-w-none text-left"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none"
              >
                توضیحات
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={values.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="توضیحات اختیاری"
                className="block w-full max-w-none resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
            <Button type="submit">ثبت پروژه خرید</Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
