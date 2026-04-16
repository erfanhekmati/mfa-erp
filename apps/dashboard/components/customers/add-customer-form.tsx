"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@repo/ui";
import { Call, User } from "iconsax-react";
import { useState } from "react";
import {
  INITIAL_CUSTOMER_FORM_VALUES,
  type CustomerFormValues,
} from "../../lib/customer-form";

export function AddCustomerForm() {
  const [values, setValues] = useState<CustomerFormValues>(
    INITIAL_CUSTOMER_FORM_VALUES,
  );
  const [saved, setSaved] = useState(false);

  function setField<K extends keyof CustomerFormValues>(key: K, val: string) {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
  }

  function handleReset() {
    setValues(INITIAL_CUSTOMER_FORM_VALUES);
    setSaved(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Card className="rounded-2xl border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">اطلاعات مشتری</CardTitle>
          <CardDescription>
            اطلاعات مشتری جدید را وارد کنید.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="cust-name"
                className="text-sm font-medium leading-none"
              >
                نام و نام خانوادگی
                <span className="mr-1 text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="cust-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="نام مشتری را وارد کنید"
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="!max-w-none pr-10"
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="cust-phone"
                className="text-sm font-medium leading-none"
              >
                تلفن تماس
                <span className="mr-1 text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Call size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="cust-phone"
                  name="phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  required
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  value={values.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="!max-w-none pr-10 text-left"
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="cust-notes"
                className="text-sm font-medium leading-none"
              >
                یادداشت
              </label>
              <textarea
                id="cust-notes"
                name="notes"
                rows={3}
                value={values.notes}
                onChange={(e) => setField("notes", e.target.value)}
                placeholder="توضیحات تکمیلی..."
                className="block w-full max-w-none resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4 pb-6">
        {saved && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            اطلاعات مشتری ثبت شد.
          </p>
        )}
        <div className="ms-auto flex gap-3">
          <Button type="button" variant="outline" onClick={handleReset}>
            بازنشانی
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
          >
            ثبت مشتری
          </Button>
        </div>
      </div>
    </form>
  );
}
