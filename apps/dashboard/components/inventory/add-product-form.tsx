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
import { Code, Hierarchy2, NoteText } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  INITIAL_PRODUCT_FORM_VALUES,
  type ProductFormValues,
} from "../../lib/product-form";
import {
  PRODUCT_GROUPS_CHANGED_EVENT,
  getProductGroupDepth,
  getProductGroupsTreeOrder,
  loadProductGroups,
  type ProductGroup,
} from "../../lib/product-groups";

const GROUP_NONE = "__empty__";

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
  const [groups, setGroups] = useState<ProductGroup[]>([]);
  const [groupTouched, setGroupTouched] = useState(false);

  useEffect(() => {
    function refresh() {
      setGroups(getProductGroupsTreeOrder(loadProductGroups()));
    }
    refresh();
    window.addEventListener(PRODUCT_GROUPS_CHANGED_EVENT, refresh);
    return () =>
      window.removeEventListener(PRODUCT_GROUPS_CHANGED_EVENT, refresh);
  }, []);

  function setField<K extends keyof ProductFormValues>(key: K, val: string) {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGroupTouched(true);
    if (!values.productGroupId.trim()) {
      setSaved(false);
      return;
    }
    setSaved(true);
  }

  function handleReset() {
    setValues(INITIAL_PRODUCT_FORM_VALUES);
    setSaved(false);
    setGroupTouched(false);
  }

  const groupError =
    groupTouched && !values.productGroupId.trim()
      ? "گروه کالا را انتخاب کنید."
      : null;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <Card className="rounded-2xl border-border/70">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">فرم معرفی کالا</CardTitle>
          <CardDescription>
            اطلاعات کالا را وارد کنید.
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
                  autoComplete="off"
                  required
                  placeholder="کد کالا را وارد کنید"
                  value={values.code}
                  onChange={(e) => setField("code", e.target.value)}
                  className="!max-w-none pr-10"
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

            {/* Product group */}
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="prod-group"
                className="text-sm font-medium leading-none"
              >
                گروه کالا
                <span className="mr-1 text-destructive">*</span>
              </label>
              {groups.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    هنوز گروه کالایی ثبت نشده است. از{" "}
                    <Link
                      href="/inventory/product-groups/new"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      ایجاد گروه کالا
                    </Link>{" "}
                    شروع کنید.
                  </p>
                  {groupTouched && (
                    <p className="text-sm text-destructive">
                      بدون انتخاب گروه کالا نمی‌توان ثبت کرد؛ ابتدا حداقل یک
                      گروه کالا ایجاد کنید.
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <Select
                    value={values.productGroupId || GROUP_NONE}
                    onValueChange={(v) => {
                      setGroupTouched(true);
                      setField(
                        "productGroupId",
                        v === GROUP_NONE ? "" : v,
                      );
                    }}
                  >
                    <SelectTrigger
                      id="prod-group"
                      name="productGroupId"
                      className="!max-w-none text-right [&>span]:min-w-0 [&>span]:flex-1"
                      dir="rtl"
                      aria-invalid={groupError ? true : undefined}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <Hierarchy2
                          size={16}
                          variant="Bulk"
                          className="shrink-0 text-muted-foreground"
                          aria-hidden
                        />
                        <SelectValue placeholder="گروه کالا را انتخاب کنید" />
                      </span>
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      dir="rtl"
                      className="text-right"
                    >
                      <SelectItem value={GROUP_NONE}>انتخاب کنید</SelectItem>
                      {groups.map((g) => {
                        const depth = getProductGroupDepth(groups, g.id);
                        return (
                          <SelectItem key={g.id} value={g.id}>
                            <span
                              className="block truncate"
                              style={{
                                paddingRight: `${depth * 0.75}rem`,
                              }}
                            >
                              {g.name}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {groupError && (
                    <p className="text-sm text-destructive">{groupError}</p>
                  )}
                </>
              )}
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
              <Select
                value={values.unit || "__empty__"}
                onValueChange={(v) =>
                  setField("unit", v === "__empty__" ? "" : v)
                }
              >
                <SelectTrigger
                  id="prod-unit"
                  className="!max-w-none text-right [&>span]:min-w-0 [&>span]:flex-1"
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
            معرفی کالا با موفقیت ثبت شد.
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
