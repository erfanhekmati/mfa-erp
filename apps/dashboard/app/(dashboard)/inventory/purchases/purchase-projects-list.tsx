"use client";

import {
  Button,
  Input,
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
import { useEffect, useMemo, useState } from "react";
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

export function PurchaseProjectsList() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const branchOptions = useMemo(() => getUniqueBranchNames(), []);

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
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">پروژه‌ها</h1>
        <Button asChild className="w-full shrink-0 sm:w-auto">
          <Link href="/inventory/purchases/new">اضافه کردن پروژه خرید</Link>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          <Input
            id="date-from"
            type="date"
            dir="ltr"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="!max-w-none text-left"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="date-to" className="text-sm font-medium">
            تا تاریخ
          </label>
          <Input
            id="date-to"
            type="date"
            dir="ltr"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="!max-w-none text-left"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="!text-right !normal-case !tracking-normal">
              تامین‌کننده
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              کالا
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              شعبه
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              مقدار
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              مبلغ کل
            </TableHead>
            <TableHead className="!text-right !normal-case !tracking-normal">
              تاریخ خرید
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageSlice.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                موردی یافت نشد.
              </TableCell>
            </TableRow>
          ) : (
            pageSlice.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="text-right">{row.provider}</TableCell>
                <TableCell className="text-right">{row.productName}</TableCell>
                <TableCell className="text-right">{row.branchName}</TableCell>
                <TableCell className="text-right tabular-nums" dir="ltr">
                  {row.quantity}
                </TableCell>
                <TableCell className="text-right tabular-nums" dir="ltr">
                  {row.totalAmount}
                </TableCell>
                <TableCell className="text-right tabular-nums" dir="ltr">
                  {row.purchasedAt}
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
