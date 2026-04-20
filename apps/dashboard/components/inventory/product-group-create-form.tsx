"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
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
import {
  cnFieldTextareaBase,
  cnTextareaPersian,
  cnTextareaRtlIconPadding,
} from "../../lib/form-input-direction";

const PARENT_NONE = "__none__";

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
              ایجاد گروه کالا
            </CardTitle>
            <CardDescription>
              اطلاعات گروه کالا را وارد کنید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="product-group-name"
                  className="text-sm font-medium leading-none"
                >
                  نام گروه کالا
                  <span className="mr-1 text-destructive">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                    <Box
                      size={17}
                      variant="Linear"
                      color="currentColor"
                      className={cn("shrink-0", "!text-nav-inventory")}
                      aria-hidden
                    />
                  </span>
                  <Input
                    id="product-group-name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    required
                    placeholder="نام گروه کالا"
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
                  گروه بالاتر
                </label>
                <Select
                  value={parentId ?? PARENT_NONE}
                  onValueChange={(v) =>
                    setParentId(v === PARENT_NONE ? null : v)
                  }
                >
                  <SelectTrigger
                    id="product-group-parent"
                    className="w-full max-w-none text-right [&>span]:min-w-0 [&>span]:flex-1"
                    dir="rtl"
                    aria-label="گروه بالاتر"
                  >
                    <span className="!flex min-w-0 flex-1 flex-row items-center gap-2">
                      <Hierarchy2
                        size={16}
                        variant="Linear"
                        color="currentColor"
                        className={cn("size-4 shrink-0", "!text-nav-inventory")}
                        aria-hidden
                      />
                      <SelectValue
                        placeholder="بدون گروه بالاتر (ریشه)"
                        className="min-w-0 flex-1 truncate leading-none"
                      />
                    </span>
                  </SelectTrigger>
                  <SelectContent dir="rtl">
                    <SelectItem value={PARENT_NONE}>
                      بدون گروه بالاتر (ریشه)
                    </SelectItem>
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
                <p className="text-xs text-muted-foreground">
                  اگر این گروه زیرمجموعهٔ گروه دیگری است، گروه بالاتر را انتخاب
                  کنید.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="product-group-desc"
                className="text-sm font-medium leading-none"
              >
                توضیحات
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-3 z-10">
                  <Box
                    size={17}
                    variant="Linear"
                    color="currentColor"
                    className={cn("shrink-0", "!text-nav-inventory")}
                    aria-hidden
                  />
                </span>
                <textarea
                  id="product-group-desc"
                  name="description"
                  dir="rtl"
                  rows={4}
                  placeholder="توضیح اختیاری ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={cn(
                    "min-h-[5.5rem] resize-y",
                    cnFieldTextareaBase,
                    cnTextareaPersian,
                    cnTextareaRtlIconPadding,
                  )}
                />
              </div>
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
              ثبت گروه کالا
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
