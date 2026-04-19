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
import { Box, Hierarchy2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  addProductGroup,
  getProductGroupsTreeOrder,
  loadProductGroups,
  PRODUCT_GROUPS_CHANGED_EVENT,
  getProductGroupDepth,
  type ProductGroup,
} from "../../lib/product-groups";

const PARENT_NONE = "__none__";

const textareaClassName =
  "min-h-[5.5rem] w-full max-w-none rounded-md border border-[#ccc] bg-[var(--background,#fff)] px-3 py-2 text-[0.9375rem] leading-relaxed text-[var(--foreground,#171717)] outline-none placeholder:text-muted-foreground";

export function ProductGroupCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);
  const [parents, setParents] = useState<ProductGroup[]>([]);

  const refreshParents = useCallback(() => {
    setParents(getProductGroupsTreeOrder(loadProductGroups()));
  }, []);

  useEffect(() => {
    refreshParents();
    function onChange() {
      refreshParents();
    }
    window.addEventListener(PRODUCT_GROUPS_CHANGED_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(PRODUCT_GROUPS_CHANGED_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refreshParents]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addProductGroup({
      name: trimmed,
      description: description.trim(),
      parentId,
    });
    router.push("/inventory/product-groups");
  }

  function handleReset() {
    setName("");
    setDescription("");
    setParentId(null);
  }

  return (
    <div className="ms-0 me-auto w-full max-w-5xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="rounded-2xl border-border/70">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              ایجاد دسته‌بندی کالا
            </CardTitle>
            <CardDescription>
              نام و در صورت نیاز توضیحات را وارد کنید؛ با انتخاب «دسته والد»
              زیرشاخهٔ یک دستهٔ بزرگ‌تر را بسازید (مثلاً میلگرد زیر «محصولات
              فولادی»).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="product-group-name"
                className="text-sm font-medium leading-none"
              >
                نام دسته
                <span className="mr-1 text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Box size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="product-group-name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="مثال: میلگرد، تیرآهن، ورق گرم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="!max-w-none pr-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="product-group-parent"
                className="text-sm font-medium leading-none"
              >
                دسته والد
              </label>
              <p className="text-xs text-muted-foreground">
                اگر این دسته زیرمجموعهٔ دستهٔ دیگری است، والد را انتخاب کنید؛
                در غیر این صورت خالی بگذارید (دستهٔ ریشه).
              </p>
              <Select
                value={parentId ?? PARENT_NONE}
                onValueChange={(v) =>
                  setParentId(v === PARENT_NONE ? null : v)
                }
              >
                <SelectTrigger
                  id="product-group-parent"
                  className="w-full max-w-none"
                  aria-label="دسته والد"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Hierarchy2
                      size={16}
                      variant="Bulk"
                      className="shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                    <SelectValue placeholder="بدون والد (ریشه)" />
                  </span>
                </SelectTrigger>
                <SelectContent dir="rtl">
                  <SelectItem value={PARENT_NONE}>بدون والد (ریشه)</SelectItem>
                  {parents.map((g) => {
                    const depth = getProductGroupDepth(parents, g.id);
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
            </div>

            <div className="space-y-2">
              <label
                htmlFor="product-group-desc"
                className="text-sm font-medium leading-none"
              >
                توضیحات
              </label>
              <textarea
                id="product-group-desc"
                name="description"
                rows={4}
                placeholder="توضیح اختیاری برای کاربران، گزارش‌ها یا قوانین دسته‌بندی…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={textareaClassName}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-4 pb-2">
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={handleReset}>
              بازنشانی فرم
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
            >
              ثبت دسته
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
