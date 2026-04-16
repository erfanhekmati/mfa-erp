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
  listTableBodyRowClassName,
  listTableCellClassName,
  listTableHeadCellClassName,
  listTableHeaderClassName,
  listTableNumericInnerClassName,
  listTablePaginationClassName,
  listTableWrapperClassName,
} from "../../../../components/dashboard/data-table-styles";
import {
  getUniqueBranchNames,
  MOCK_PURCHASE_PROJECTS,
  type MockPurchaseProject,
} from "../../../../lib/mock-purchase-projects";

const PAGE_SIZE = 10;

function normalizeSearch(s: string) {
  return s.trim().toLowerCase();
}

function rowMatchesSearch(row: MockPurchaseProject, q: string) {
  if (!q) return true;
  const n = normalizeSearch(q);
  const hay = [
    row.provider,
    row.productName,
    row.branchName,
    row.id,
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(n);
}

function rowMatchesBranch(row: MockPurchaseProject, branch: string) {
  if (!branch) return true;
  return row.branchName === branch;
}

function rowMatchesDateRange(
  row: MockPurchaseProject,
  from: string,
  to: string,
) {
  const d = row.purchasedAt;
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

export function PurchaseProjectsList() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const branchOptions = useMemo(() => getUniqueBranchNames(), []);

  const hasActiveFilters =
    branch !== "" || dateFrom !== "" || dateTo !== "";

  function clearFilters() {
    setBranch("");
    setDateFrom("");
    setDateTo("");
  }

  const filtered = useMemo(() => {
    return MOCK_PURCHASE_PROJECTS.filter(
      (row) =>
        rowMatchesSearch(row, search) &&
        rowMatchesBranch(row, branch) &&
        rowMatchesDateRange(row, dateFrom, dateTo),
    );
  }, [search, branch, dateFrom, dateTo]);

  useEffect(() => {
    setPage(1);
  }, [search, branch, dateFrom, dateTo]);

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <Button asChild className="w-full shrink-0 sm:w-auto">
          <Link href="/inventory/purchases/new">پروژه خرید جدید</Link>
        </Button>
      </div>

      <div className="space-y-2">
        <label htmlFor="project-search" className="text-sm font-medium">
          جستجو
        </label>
        <Input
          id="project-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="تامین‌کننده، کالا، شعبه..."
          className="!max-w-none"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="filter-branch" className="text-sm font-medium">
              شعبه
            </label>
            <Select
              value={branch === "" ? "__all__" : branch}
              onValueChange={(v) => setBranch(v === "__all__" ? "" : v)}
            >
              <SelectTrigger id="filter-branch" className="text-right" dir="rtl">
                <SelectValue placeholder="همه شعبه‌ها" />
              </SelectTrigger>
              <SelectContent position="popper" dir="rtl" className="text-right">
                <SelectGroup>
                  <SelectItem value="__all__">همه شعبه‌ها</SelectItem>
                  {branchOptions.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="date-from" className="text-sm font-medium">
              از تاریخ
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
              تا تاریخ
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

      <div className="space-y-2">
        <div
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          dir="rtl"
        >
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            {branch ? (
              <FilterChip
                onRemove={() => setBranch("")}
                removeLabel="حذف فیلتر شعبه"
              >
                <span className="text-muted-foreground">شعبه:</span> {branch}
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
            <TableHead className={listTableHeadCellClassName}>تامین‌کننده</TableHead>
            <TableHead className={listTableHeadCellClassName}>کالا</TableHead>
            <TableHead className={listTableHeadCellClassName}>شعبه</TableHead>
            <TableHead className={listTableHeadCellClassName}>مقدار</TableHead>
            <TableHead className={listTableHeadCellClassName}>مبلغ کل</TableHead>
            <TableHead className={listTableHeadCellClassName}>تاریخ خرید</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageSlice.length === 0 ? (
            <TableRow style={{ borderBottom: "none" }} className="hover:bg-transparent">
              <TableCell
                colSpan={6}
                className="bg-muted/15 py-14 text-center text-muted-foreground"
              >
                موردی یافت نشد.
              </TableCell>
            </TableRow>
          ) : (
            pageSlice.map((row, index) => (
              <TableRow key={row.id} className={listTableBodyRowClassName(index)}>
                <TableCell className={`${listTableCellClassName} font-medium`}>
                  {row.provider}
                </TableCell>
                <TableCell className={listTableCellClassName}>{row.productName}</TableCell>
                <TableCell className={listTableCellClassName}>{row.branchName}</TableCell>
                <TableCell className={listTableCellClassName} dir="ltr">
                  <span className={listTableNumericInnerClassName}>
                    {row.quantity}
                  </span>
                </TableCell>
                <TableCell className={listTableCellClassName} dir="ltr">
                  <span className={listTableNumericInnerClassName}>
                    {row.totalAmount}
                  </span>
                </TableCell>
                <TableCell
                  className={`${listTableCellClassName} tabular-nums text-foreground/90`}
                  dir="rtl"
                >
                  {formatGregorianDateToPersianDisplay(row.purchasedAt)}
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
  );
}
