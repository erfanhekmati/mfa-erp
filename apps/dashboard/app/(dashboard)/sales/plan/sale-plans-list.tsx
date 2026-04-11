"use client";

import {
  Button,
  formatGregorianDateToPersianDisplay,
  Input,
  PersianDatePicker,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  discountTypeLabel,
  getUniqueCreatedByNames,
  MOCK_SALE_PLANS,
  type MockSalePlan,
} from "../../../../lib/mock-sale-plans";

const PAGE_SIZE = 10;

function normalizeSearch(s: string) {
  return s.trim().toLowerCase();
}

function rowMatchesSearch(row: MockSalePlan, q: string) {
  if (!q) return true;
  const n = normalizeSearch(q);
  const hay = [row.productName, row.createdByName, row.id]
    .join(" ")
    .toLowerCase();
  return hay.includes(n);
}

function rowMatchesCreator(row: MockSalePlan, name: string) {
  if (!name) return true;
  return row.createdByName === name;
}

function rowMatchesDateRange(
  row: MockSalePlan,
  from: string,
  to: string,
) {
  const d = row.startAt;
  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}

function FilterChip({
  children,
  onRemove,
  removeLabel,
}: {
  children: ReactNode;
  onRemove: () => void;
  removeLabel: string;
}) {
  return (
    <span className="inline-flex max-w-full items-center gap-0.5 rounded-md border border-input bg-muted/50 py-1 pl-1 pr-1 text-sm text-foreground shadow-sm">
      <span className="min-w-0 truncate px-2 py-1">{children}</span>
      <button
        type="button"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={removeLabel}
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </span>
  );
}

export function SalePlansList() {
  const [search, setSearch] = useState("");
  const [creator, setCreator] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const creatorOptions = useMemo(() => getUniqueCreatedByNames(), []);

  const hasActiveFilters =
    creator !== "" || dateFrom !== "" || dateTo !== "";

  function clearFilters() {
    setCreator("");
    setDateFrom("");
    setDateTo("");
  }

  const filtered = useMemo(() => {
    return MOCK_SALE_PLANS.filter(
      (row) =>
        rowMatchesSearch(row, search) &&
        rowMatchesCreator(row, creator) &&
        rowMatchesDateRange(row, dateFrom, dateTo),
    );
  }, [search, creator, dateFrom, dateTo]);

  useEffect(() => {
    setPage(1);
  }, [search, creator, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageSlice = useMemo(() => {
    const p = Math.min(Math.max(1, page), totalPages);
    const start = (p - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page, totalPages]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">برنامه فروش</h1>
        <Button asChild className="w-full shrink-0 sm:w-auto">
          <Link href="/sales/plan/new">افزودن برنامه فروش</Link>
        </Button>
      </div>

      <div className="space-y-2">
        <label htmlFor="sale-plan-search" className="text-sm font-medium">
          جستجو
        </label>
        <Input
          id="sale-plan-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="کالا، ثبت‌کننده..."
          className="!max-w-none"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="filter-creator" className="text-sm font-medium">
              ثبت‌کننده
            </label>
            <Select
              value={creator === "" ? "__all__" : creator}
              onValueChange={(v) => setCreator(v === "__all__" ? "" : v)}
            >
              <SelectTrigger id="filter-creator" className="text-right" dir="rtl">
                <SelectValue placeholder="همه" />
              </SelectTrigger>
              <SelectContent position="popper" dir="rtl" className="text-right">
                <SelectGroup>
                  <SelectItem value="__all__">همه</SelectItem>
                  {creatorOptions.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="date-from" className="text-sm font-medium">
              از تاریخ شروع
            </label>
            <PersianDatePicker
              id="date-from"
              value={dateFrom}
              onChange={setDateFrom}
              className="!max-w-none text-left"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date-to" className="text-sm font-medium">
              تا تاریخ شروع
            </label>
            <PersianDatePicker
              id="date-to"
              value={dateTo}
              onChange={setDateTo}
              className="!max-w-none text-left"
            />
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full shrink-0 lg:w-auto"
          disabled={!hasActiveFilters}
          onClick={clearFilters}
        >
          پاک کردن فیلترها
        </Button>
      </div>

      <div
        className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        dir="rtl"
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {creator ? (
            <FilterChip
              onRemove={() => setCreator("")}
              removeLabel="حذف فیلتر ثبت‌کننده"
            >
              <span className="text-muted-foreground">ثبت‌کننده:</span>{" "}
              {creator}
            </FilterChip>
          ) : null}
          {dateFrom ? (
            <FilterChip
              onRemove={() => setDateFrom("")}
              removeLabel="حذف فیلتر از تاریخ"
            >
              <span className="text-muted-foreground">از تاریخ:</span>{" "}
              {formatGregorianDateToPersianDisplay(dateFrom)}
            </FilterChip>
          ) : null}
          {dateTo ? (
            <FilterChip
              onRemove={() => setDateTo("")}
              removeLabel="حذف فیلتر تا تاریخ"
            >
              <span className="text-muted-foreground">تا تاریخ:</span>{" "}
              {formatGregorianDateToPersianDisplay(dateTo)}
            </FilterChip>
          ) : null}
        </div>
        <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
          {filtered.length.toLocaleString("fa-IR")} نتیجه
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="!text-right !normal-case !tracking-normal">
              کالا
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              ثبت‌کننده
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              قیمت فروش
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              تخفیف
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              نوع تخفیف
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              شروع
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              پایان
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageSlice.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                موردی یافت نشد.
              </TableCell>
            </TableRow>
          ) : (
            pageSlice.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-right">{row.productName}</TableCell>
                <TableCell className="text-right">{row.createdByName}</TableCell>
                <TableCell className="text-right tabular-nums" dir="ltr">
                  {row.salePrice}
                </TableCell>
                <TableCell className="text-right tabular-nums" dir="ltr">
                  {row.discountAmount}
                </TableCell>
                <TableCell className="text-right">
                  {discountTypeLabel(row.discountType)}
                </TableCell>
                <TableCell className="text-right tabular-nums" dir="rtl">
                  {formatGregorianDateToPersianDisplay(row.startAt)}
                </TableCell>
                <TableCell className="text-right tabular-nums" dir="rtl">
                  {formatGregorianDateToPersianDisplay(row.endAt)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {filtered.length > 0 ? (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            صفحه {safePage} از {totalPages} — {filtered.length} مورد
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              قبلی
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              بعدی
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
