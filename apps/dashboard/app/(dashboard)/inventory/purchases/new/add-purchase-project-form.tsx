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
  cn,
} from "@repo/ui";
import { useState } from "react";
import {
  cnFieldTextareaBase,
  cnInputLtrFaPlaceholder,
  cnInputPersian,
  cnTextareaPersian,
  cnTextareaRtlIconPadding,
} from "../../../../../lib/form-input-direction";
import {
  getDefaultProviderPurchaseFormValues,
  type ProviderPurchaseFormValues,
} from "../../../../../lib/provider-purchase-form";
import { formFieldIconClass } from "../../../../../lib/form-field-icon";
import { Box, DocumentText, Money, Profile2User, Shop, Weight } from "iconsax-react";

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
          مشخصات فاکتور خرید
        </CardTitle>
        <CardDescription>
          اطلاعات فاکتور خرید را ثبت کنید.
        </CardDescription>
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
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <Profile2User
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={formFieldIconClass.inventory}
                    aria-hidden
                  />
                </span>
                <Input
                  id="provider"
                  name="provider"
                  dir="rtl"
                  autoComplete="off"
                  value={values.provider}
                  onChange={(e) => setField("provider", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputPersian)}
                  placeholder="تامین‌کننده"
                />
              </div>
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
                  className="!max-w-none text-right [&>span]:!flex [&>span]:min-w-0 [&>span]:flex-1 [&>span]:items-center [&>span]:gap-2"
                  dir="rtl"
                >
                  <span className="!flex min-w-0 flex-1 flex-row items-center gap-2">
                    <Box
                      size={16}
                      variant="Linear"
                      color="currentColor"
                      className={cn("size-4", formFieldIconClass.inventory)}
                      aria-hidden
                    />
                    <SelectValue placeholder="کالا" className="min-w-0 flex-1 truncate" />
                  </span>
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
                  className="!max-w-none text-right [&>span]:!flex [&>span]:min-w-0 [&>span]:flex-1 [&>span]:items-center [&>span]:gap-2"
                  dir="rtl"
                >
                  <span className="!flex min-w-0 flex-1 flex-row items-center gap-2">
                    <Shop
                      size={16}
                      variant="Linear"
                      color="currentColor"
                      className={cn("size-4", formFieldIconClass.inventory)}
                      aria-hidden
                    />
                    <SelectValue placeholder="شعبه" className="min-w-0 flex-1 truncate" />
                  </span>
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
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <Weight
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={formFieldIconClass.inventory}
                    aria-hidden
                  />
                </span>
                <Input
                  id="quantity"
                  name="quantity"
                  type="text"
                  inputMode="decimal"
                  dir="ltr"
                  autoComplete="off"
                  value={values.quantity}
                  onChange={(e) => setField("quantity", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                  placeholder="مقدار"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="unitPrice"
                className="text-sm font-medium leading-none"
              >
                قیمت واحد
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <Money
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={formFieldIconClass.inventory}
                    aria-hidden
                  />
                </span>
                <Input
                  id="unitPrice"
                  name="unitPrice"
                  type="text"
                  inputMode="decimal"
                  dir="ltr"
                  autoComplete="off"
                  value={values.unitPrice}
                  onChange={(e) => setField("unitPrice", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                  placeholder="قیمت واحد"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sumPrice"
                className="text-sm font-medium leading-none"
              >
                جمع کالا
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <Money
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={formFieldIconClass.inventory}
                    aria-hidden
                  />
                </span>
                <Input
                  id="sumPrice"
                  name="sumPrice"
                  type="text"
                  inputMode="decimal"
                  dir="ltr"
                  autoComplete="off"
                  value={values.sumPrice}
                  onChange={(e) => setField("sumPrice", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                  placeholder="جمع کالا"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="taxAndDuties"
                className="text-sm font-medium leading-none"
              >
                مالیات و عوارض
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <Money
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={formFieldIconClass.inventory}
                    aria-hidden
                  />
                </span>
                <Input
                  id="taxAndDuties"
                  name="taxAndDuties"
                  type="text"
                  inputMode="decimal"
                  dir="ltr"
                  autoComplete="off"
                  value={values.taxAndDuties}
                  onChange={(e) => setField("taxAndDuties", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                  placeholder="مالیات و عوارض"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="totalAmount"
                className="text-sm font-medium leading-none"
              >
                مبلغ کل
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                  <Money
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={formFieldIconClass.inventory}
                    aria-hidden
                  />
                </span>
                <Input
                  id="totalAmount"
                  name="totalAmount"
                  type="text"
                  inputMode="decimal"
                  dir="ltr"
                  autoComplete="off"
                  value={values.totalAmount}
                  onChange={(e) => setField("totalAmount", e.target.value)}
                  className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                  placeholder="مبلغ کل"
                />
              </div>
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
                className="!max-w-none"
                placeholder="تاریخ خرید"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-medium leading-none"
              >
                توضیحات
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-3 z-10">
                  <DocumentText
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={formFieldIconClass.inventory}
                    aria-hidden
                  />
                </span>
                <textarea
                  id="description"
                  name="description"
                  dir="rtl"
                  rows={4}
                  value={values.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="توضیحات"
                  className={cn(
                    "min-h-[5.5rem] resize-y",
                    cnFieldTextareaBase,
                    cnTextareaPersian,
                    cnTextareaRtlIconPadding,
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
            <Button type="submit">ثبت فاکتور خرید</Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
