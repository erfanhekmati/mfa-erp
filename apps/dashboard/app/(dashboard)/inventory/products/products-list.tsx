"use client";

import {
  Button,
  cn,
  formatGregorianDateToPersianDisplay,
  Input,
  PersianDatePicker,
  Select,
  SelectContent,
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
import { SearchNormal } from "iconsax-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { DashboardPageActions } from "../../../../components/dashboard/dashboard-page-frame";
import {
  listTableBodyRowClassName,
  listTableCellClassName,
  listTableHeadCellClassName,
  listTableHeaderClassName,
  listTablePaginationClassName,
  listTableWrapperClassName,
} from "../../../../components/dashboard/data-table-styles";
import { formFieldIconClass } from "../../../../lib/form-field-icon";
import {
  MOCK_PRODUCTS,
  PRODUCT_UNIT_LABELS,
  type MockProductRow,
  unitLabelForCode,
} from "../../../../lib/mock-products";

const PAGE_SIZE = 10;

const UNIT_FILTER_OPTIONS = Object.entries(PRODUCT_UNIT_LABELS);

function normalizeSearch(s: string) {
  return s.trim().toLowerCase();
}

function rowMatchesSearch(row: MockProductRow, q: string) {
  if (!q) return true;
  const n = normalizeSearch(q);
  const hay = [row.code, row.name, row.description].join(" ").toLowerCase();
  return hay.includes(n);
}

function rowMatchesUnit(row: MockProductRow, unit: string) {
  if (!unit) return true;
  return row.unit === unit;
}

function rowMatchesDateRange(
  row: MockProductRow,
  from: string,
  to: string,
) {
  const d = row.createdAt;
  if (from && d < from) return false;
  if (to && d > to) return false;
  return true;
}

function truncateText(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max)}…`;
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

export function ProductsList() {
  const [search, setSearch] = useState("");
  const [unit, setUnit] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const hasActiveFilters =
    unit !== "" || dateFrom !== "" || dateTo !== "";

  function clearFilters() {
    setUnit("");
    setDateFrom("");
    setDateTo("");
  }

  const filtered = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (row) =>
        rowMatchesSearch(row, search) &&
        rowMatchesUnit(row, unit) &&
        rowMatchesDateRange(row, dateFrom, dateTo),
    );
  }, [search, unit, dateFrom, dateTo]);

  useEffect(() => {
    setPage(1);
  }, [search, unit, dateFrom, dateTo]);

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

  const unitFilterLabel = unit
    ? UNIT_FILTER_OPTIONS.find(([v]) => v === unit)?.[1] ?? unit
    : "";

  return (
    <>
      <DashboardPageActions>
        <Button asChild className="w-full shrink-0 sm:w-auto">
          <Link href="/inventory/products/new">معرفی کالا</Link>
        </Button>
      </DashboardPageActions>
      <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="space-y-2">
        <label htmlFor="product-search" className="text-sm font-medium">
          جستجو
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
            <SearchNormal
              size={17}
              variant="Linear"
              color="currentColor"
              className={formFieldIconClass.inventory}
              aria-hidden
            />
          </span>
          <Input
            id="product-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="کد، نام یا توضیحات..."
            className={cn("!max-w-none pr-10")}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="product-unit" className="text-sm font-medium">
            واحد
          </label>
          <Select
            value={unit || "__all__"}
            onValueChange={(v) => setUnit(v === "__all__" ? "" : v)}
          >
            <SelectTrigger id="product-unit" className="!max-w-none" dir="rtl">
              <SelectValue placeholder="همه واحدها" />
            </SelectTrigger>
            <SelectContent position="popper" dir="rtl" className="text-right">
              <SelectItem value="__all__">همه واحدها</SelectItem>
              {UNIT_FILTER_OPTIONS.map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="created-from" className="text-sm font-medium">
            از تاریخ ثبت
          </label>
          <PersianDatePicker
            id="created-from"
            value={dateFrom}
            onChange={setDateFrom}
            className="!max-w-none text-left"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="created-to" className="text-sm font-medium">
            تا تاریخ ثبت
          </label>
          <PersianDatePicker
            id="created-to"
            value={dateTo}
            onChange={setDateTo}
            className="!max-w-none text-left"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          className="w-full shrink-0 sm:w-auto"
          disabled={!hasActiveFilters}
          onClick={clearFilters}
        >
          پاک کردن فیلترها
        </Button>
      </div>

      <div className="space-y-2">
        <div
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          dir="rtl"
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {unit ? (
              <FilterChip
                onRemove={() => setUnit("")}
                removeLabel="حذف فیلتر واحد"
              >
                <span className="text-muted-foreground">واحد:</span>{" "}
                {unitFilterLabel}
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

        <Table wrapperClassName={listTableWrapperClassName}>
          <TableHeader className={listTableHeaderClassName}>
            <TableRow
              className="hover:bg-transparent"
              style={{ borderBottom: "none" }}
            >
              <TableHead className={listTableHeadCellClassName}>کد کالا</TableHead>
              <TableHead className={listTableHeadCellClassName}>نام کالا</TableHead>
              <TableHead className={listTableHeadCellClassName}>واحد</TableHead>
              <TableHead className={listTableHeadCellClassName}>توضیحات</TableHead>
              <TableHead className={listTableHeadCellClassName}>تاریخ ثبت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageSlice.length === 0 ? (
              <TableRow
                style={{ borderBottom: "none" }}
                className="hover:bg-transparent"
              >
                <TableCell
                  colSpan={5}
                  className="bg-muted/15 py-14 text-center text-muted-foreground"
                >
                  موردی یافت نشد.
                </TableCell>
              </TableRow>
            ) : (
              pageSlice.map((row, index) => (
                <TableRow key={row.id} className={listTableBodyRowClassName(index)}>
                  <TableCell
                    className={`${listTableCellClassName} font-mono text-sm`}
                    dir="ltr"
                  >
                    {row.code}
                  </TableCell>
                  <TableCell className={`${listTableCellClassName} font-medium`}>
                    {row.name}
                  </TableCell>
                  <TableCell className={listTableCellClassName}>
                    {unitLabelForCode(row.unit)}
                  </TableCell>
                  <TableCell
                    className={`${listTableCellClassName} max-w-[14rem] text-muted-foreground`}
                    title={row.description}
                  >
                    {truncateText(row.description, 48)}
                  </TableCell>
                  <TableCell
                    className={`${listTableCellClassName} tabular-nums text-foreground/90`}
                    dir="rtl"
                  >
                    {formatGregorianDateToPersianDisplay(row.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {filtered.length > 0 ? (
        <div className={listTablePaginationClassName}>
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
    </>
  );
}
