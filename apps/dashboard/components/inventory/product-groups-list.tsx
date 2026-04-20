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
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getProductGroupAncestorPath,
  getProductGroupDepth,
  getProductGroupsTreeOrder,
  loadProductGroups,
  PRODUCT_GROUPS_CHANGED_EVENT,
  type ProductGroup,
} from "../../lib/product-groups";
import { DashboardPageActions } from "../dashboard/dashboard-page-frame";
import {
  listTableBodyRowClassName,
  listTableCellClassName,
  listTableHeadCellClassName,
  listTableHeaderClassName,
  listTableWrapperClassName,
} from "../dashboard/data-table-styles";

export function ProductGroupsList() {
  const [groups, setGroups] = useState<ProductGroup[]>([]);

  const refresh = useCallback(() => {
    setGroups(loadProductGroups());
  }, []);

  useEffect(() => {
    refresh();
    function onChange() {
      refresh();
    }
    window.addEventListener(PRODUCT_GROUPS_CHANGED_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(PRODUCT_GROUPS_CHANGED_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, [refresh]);

  const ordered = useMemo(
    () => getProductGroupsTreeOrder(groups),
    [groups],
  );

  return (
    <>
      <DashboardPageActions>
        <Button asChild className="w-full shrink-0 sm:w-auto">
          <Link href="/inventory/product-groups/new">
            ایجاد گروه کالا
          </Link>
        </Button>
      </DashboardPageActions>
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <Table wrapperClassName={listTableWrapperClassName}>
          <TableHeader className={listTableHeaderClassName}>
            <TableRow>
              <TableHead className={listTableHeadCellClassName}>نام گروه کالا</TableHead>
              <TableHead className={listTableHeadCellClassName}>
                مسیر سلسله‌مراتبی
              </TableHead>
              <TableHead className={listTableHeadCellClassName}>توضیحات</TableHead>
              <TableHead className={listTableHeadCellClassName}>
                تاریخ ایجاد
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordered.length === 0 ? (
              <TableRow className={listTableBodyRowClassName(0)}>
                <TableCell
                  colSpan={4}
                  className={`${listTableCellClassName} text-center text-muted-foreground`}
                >
                  هنوز گروه کالایی ثبت نشده است.
                </TableCell>
              </TableRow>
            ) : (
              ordered.map((row, index) => {
                const depth = getProductGroupDepth(groups, row.id);
                const path = getProductGroupAncestorPath(groups, row.id);
                return (
                  <TableRow
                    key={row.id}
                    className={listTableBodyRowClassName(index)}
                  >
                    <TableCell className={listTableCellClassName}>
                      <span
                        className="inline-block max-w-[min(100%,20rem)]"
                        style={{ marginRight: `${depth * 0.65}rem` }}
                      >
                        {row.name}
                      </span>
                    </TableCell>
                    <TableCell
                      className={`${listTableCellClassName} max-w-xs text-muted-foreground`}
                    >
                      {path ? (
                        <span className="line-clamp-2" title={path}>
                          {path}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/70">—</span>
                      )}
                    </TableCell>
                    <TableCell
                      className={`${listTableCellClassName} max-w-md text-muted-foreground`}
                    >
                      {row.description.trim() ? (
                        <span
                          className="line-clamp-2 break-words"
                          title={row.description.trim()}
                        >
                          {row.description.trim()}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/70">—</span>
                      )}
                    </TableCell>
                    <TableCell className={listTableCellClassName}>
                      {formatGregorianDateToPersianDisplay(row.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
