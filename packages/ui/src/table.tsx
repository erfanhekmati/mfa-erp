import {
  forwardRef,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";

const borderColor = "var(--border, #e5e5e5)";
const muted = "var(--muted-foreground, #737373)";

export const Table = forwardRef<
  HTMLTableElement,
  TableHTMLAttributes<HTMLTableElement>
>(function Table({ className, style, ...props }, ref) {
  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        borderRadius: "6px",
        border: `1px solid ${borderColor}`,
      }}
    >
      <table
        ref={ref}
        className={className}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9375rem",
          lineHeight: 1.5,
          color: "var(--foreground, #171717)",
          backgroundColor: "var(--background, #fff)",
          ...style,
        }}
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
      className={className}
      style={{
        backgroundColor: "var(--muted, #fafafa)",
        ...style,
      }}
      {...props}
    />
  );
});

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableBody({ className, style, ...props }, ref) {
  return (
    <tbody ref={ref} className={className} style={style} {...props} />
  );
});

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(function TableFooter({ className, style, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={className}
      style={{
        backgroundColor: "var(--muted, #fafafa)",
        fontWeight: 500,
        ...style,
      }}
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
      className={className}
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
      className={className}
      style={{
        padding: "0.625rem 0.75rem",
        textAlign: "left",
        fontWeight: 600,
        fontSize: "0.8125rem",
        textTransform: "uppercase",
        letterSpacing: "0.02em",
        color: muted,
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
      className={className}
      style={{
        padding: "0.625rem 0.75rem",
        verticalAlign: "middle",
        ...style,
      }}
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
      className={className}
      style={{
        captionSide: "bottom",
        padding: "0.5rem 0.75rem",
        fontSize: "0.8125rem",
        color: muted,
        ...style,
      }}
      {...props}
    />
  );
});
