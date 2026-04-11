import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cn } from "./lib/utils";

const borderColor = "var(--border, #e5e5e5)";

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  /** Classes for the scroll/border wrapper around `<table>`. */
  wrapperClassName?: string;
};

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, style, wrapperClassName, ...props },
  ref,
) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-md border border-border bg-background",
        wrapperClassName,
      )}
    >
      <table
        ref={ref}
        className={cn("w-full border-collapse text-[0.9375rem] leading-normal text-foreground", className)}
        style={style}
        {...props}
      />
    </div>
  );
});

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableHeader({ className, style, ...props }, ref) {
  return (
    <thead
      ref={ref}
      className={cn("bg-muted", className)}
      style={style}
      {...props}
    />
  );
});

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, style, ...props }, ref) {
  return (
    <tbody ref={ref} className={cn(className)} style={style} {...props} />
  );
});

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, style, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn("bg-muted font-medium", className)}
      style={style}
      {...props}
    />
  );
});

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(function TableRow({ className, style, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(className)}
      style={{
        borderBottom: `1px solid ${borderColor}`,
        ...style,
      }}
      {...props}
    />
  );
});

export const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(function TableHead({ className, style, ...props }, ref) {
  return (
    <th
      ref={ref}
      className={cn(
        "px-3 py-2.5 text-left text-[0.8125rem] font-semibold uppercase tracking-wide text-muted-foreground",
        className,
      )}
      style={{
        borderBottom: `1px solid ${borderColor}`,
        ...style,
      }}
      {...props}
    />
  );
});

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(function TableCell({ className, style, ...props }, ref) {
  return (
    <td
      ref={ref}
      className={cn("px-3 py-2.5 align-middle", className)}
      style={style}
      {...props}
    />
  );
});

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(function TableCaption({ className, style, ...props }, ref) {
  return (
    <caption
      ref={ref}
      className={cn("caption-bottom px-3 py-2 text-[0.8125rem] text-muted-foreground", className)}
      style={style}
      {...props}
    />
  );
});
