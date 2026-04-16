"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { Code, Maximize4, NoteText } from "iconsax-react";
import { useState } from "react";
import {
  INITIAL_PRODUCT_FORM_VALUES,
  type ProductFormValues,
} from "../../lib/product-form";

const UNITS = [
  { value: "ton", label: "تن" },
  { value: "kg", label: "کیلوگرم" },
  { value: "meter", label: "متر" },
  { value: "square_meter", label: "متر مربع" },
  { value: "piece", label: "عدد" },
  { value: "roll", label: "رول" },
  { value: "sheet", label: "ورق" },
  { value: "bar", label: "شاخه" },
];

export function AddProductForm() {
  const [values, setValues] = useState<ProductFormValues>(
    INITIAL_PRODUCT_FORM_VALUES,
  );
  const [saved, setSaved] = useState(false);

  function setField<K extends keyof ProductFormValues>(key: K, val: string) {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
  }

  function handleReset() {
    setValues(INITIAL_PRODUCT_FORM_VALUES);
    setSaved(false);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Card className="rounded-2xl border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">مشخصات کالا</CardTitle>
          <CardDescription>
            اطلاعات کالای جدید را وارد کنید.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Code */}
            <div className="space-y-2">
              <label
                htmlFor="prod-code"
                className="text-sm font-medium leading-none"
              >
                کد کالا
                <span className="mr-1 text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Code size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="prod-code"
                  name="code"
                  type="text"
                  dir="ltr"
                  autoComplete="off"
                  required
                  placeholder="مثال: STL-001"
                  value={values.code}
                  onChange={(e) => setField("code", e.target.value)}
                  className="!max-w-none pr-10 text-left"
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="prod-name"
                className="text-sm font-medium leading-none"
              >
                نام کالا
                <span className="mr-1 text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <NoteText size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="prod-name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="نام کالا را وارد کنید"
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="!max-w-none pr-10"
                />
              </div>
            </div>

            {/* Unit */}
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="prod-unit"
                className="text-sm font-medium leading-none"
              >
                واحد اندازه‌گیری
                <span className="mr-1 text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground">
                  <Maximize4 size={17} variant="Bulk" aria-hidden />
                </span>
                <Select
                  value={values.unit || "__empty__"}
                  onValueChange={(v) =>
                    setField("unit", v === "__empty__" ? "" : v)
                  }
                >
                  <SelectTrigger
                    id="prod-unit"
                    className="!max-w-none pr-10 text-right"
                    dir="rtl"
                  >
                    <SelectValue placeholder="واحد را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent position="popper" dir="rtl" className="text-right">
                    <SelectItem value="__empty__">انتخاب کنید</SelectItem>
                    {UNITS.map((u) => (
                      <SelectItem key={u.value} value={u.value}>
                        {u.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="prod-description"
              className="text-sm font-medium leading-none"
            >
              توضیحات
            </label>
            <textarea
              id="prod-description"
              name="description"
              rows={4}
              value={values.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="توضیحات اختیاری درباره کالا..."
              className="block w-full max-w-none resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-4 pb-6">
        {saved && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            کالا با موفقیت ثبت شد.
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
            ثبت کالا
          </Button>
        </div>
      </div>
    </form>
  );
}
