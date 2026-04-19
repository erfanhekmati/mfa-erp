"use client";

import {
  Button,
  formatGregorianDateToPersianDisplay,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  COUNTERPARTY_GROUPS_CHANGED_EVENT,
  loadCounterpartyGroups,
  summarizeGroupPermissions,
  type CounterpartyGroup,
} from "../../lib/counterparty-groups";
import { DashboardPageActions } from "../dashboard/dashboard-page-frame";
import {
  listTableBodyRowClassName,
  listTableCellClassName,
  listTableHeadCellClassName,
  listTableHeaderClassName,
  listTableWrapperClassName,
} from "../dashboard/data-table-styles";

export function CounterpartyGroupsList() {
  const [groups, setGroups] = useState<CounterpartyGroup[]>([]);

  const refresh = useCallback(() => {
    setGroups(loadCounterpartyGroups());
  }, []);

  useEffect(() => {
    refresh();
    function onChange() {
      refresh();
    }
    window.addEventListener(COUNTERPARTY_GROUPS_CHANGED_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(COUNTERPARTY_GROUPS_CHANGED_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  return (
    <>
      <DashboardPageActions>
        <Button asChild className="w-full shrink-0 sm:w-auto">
          <Link href="/customers/groups/new">ایجاد گروه طرف حساب</Link>
        </Button>
      </DashboardPageActions>
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <Table wrapperClassName={listTableWrapperClassName}>
          <TableHeader className={listTableHeaderClassName}>
            <TableRow>
              <TableHead className={listTableHeadCellClassName}>نام گروه</TableHead>
              <TableHead className={listTableHeadCellClassName}>
                خلاصه دسترسی‌ها
              </TableHead>
              <TableHead className={listTableHeadCellClassName}>
                تاریخ ایجاد
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.length === 0 ? (
              <TableRow className={listTableBodyRowClassName(0)}>
                <TableCell
                  colSpan={3}
                  className={`${listTableCellClassName} text-center text-muted-foreground`}
                >
                  هنوز گروهی ثبت نشده است.
                </TableCell>
              </TableRow>
            ) : (
              groups.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={listTableBodyRowClassName(index)}
                >
                  <TableCell className={listTableCellClassName}>
                    {row.name}
                  </TableCell>
                  <TableCell
                    className={`${listTableCellClassName} max-w-md text-muted-foreground`}
                  >
                    {summarizeGroupPermissions(row.permissions)}
                  </TableCell>
                  <TableCell className={listTableCellClassName}>
                    {formatGregorianDateToPersianDisplay(row.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
