"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
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
  getDefaultSalePlanFormValues,
  type SalePlanFormValues,
} from "../../lib/sale-plan-form";

export function AddSalePlanForm() {
  const [values, setValues] = useState<SalePlanFormValues>(() =>
    getDefaultSalePlanFormValues(),
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function setField<K extends keyof SalePlanFormValues>(
    key: K,
    value: SalePlanFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <Card className="w-full max-w-3xl rounded-2xl border-border/70">
      <CardHeader className="text-right pb-4">
        <CardTitle className="text-base font-semibold">مشخصات برنامه فروش</CardTitle>
        <CardDescription>
          برنامه فروش جدید را ثبت کنید.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
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
                htmlFor="salePrice"
                className="text-sm font-medium leading-none"
              >
                قیمت فروش
              </label>
              <Input
                id="salePrice"
                name="salePrice"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.salePrice}
                onChange={(e) => setField("salePrice", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="discountAmount"
                className="text-sm font-medium leading-none"
              >
                مقدار تخفیف
              </label>
              <Input
                id="discountAmount"
                name="discountAmount"
                type="text"
                inputMode="decimal"
                dir="ltr"
                autoComplete="off"
                value={values.discountAmount}
                onChange={(e) => setField("discountAmount", e.target.value)}
                className="!max-w-none text-left"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="discountType"
                className="text-sm font-medium leading-none"
              >
                نوع تخفیف
              </label>
              <Select
                value={values.discountType}
                onValueChange={(v) =>
                  setField("discountType", v as SalePlanFormValues["discountType"])
                }
              >
                <SelectTrigger
                  id="discountType"
                  className="!max-w-none text-right"
                  dir="rtl"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" dir="rtl" className="text-right">
                  <SelectItem value="PERCENT">درصد</SelectItem>
                  <SelectItem value="FIXED">مبلغ ثابت</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="startAt"
                className="text-sm font-medium leading-none"
              >
                تاریخ شروع
              </label>
              <PersianDateTimePicker
                id="startAt"
                name="startAt"
                value={values.startAt}
                onChange={(v) => setField("startAt", v)}
                className="!max-w-none text-left"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endAt"
                className="text-sm font-medium leading-none"
              >
                تاریخ پایان
              </label>
              <PersianDateTimePicker
                id="endAt"
                name="endAt"
                value={values.endAt}
                onChange={(v) => setField("endAt", v)}
                className="!max-w-none text-left"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <Button type="submit">ثبت برنامه فروش</Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
