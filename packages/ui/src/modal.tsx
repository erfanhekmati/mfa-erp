"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type ModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Extra class for the panel (content box). */
  panelClassName?: string;
  /** Close when clicking the backdrop. Default true. */
  closeOnBackdrop?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "title">;

export function Modal({
  open,
  onOpenChange,
  title,
  children,
  className,
  panelClassName,
  closeOnBackdrop = true,
  onClick,
  ...rest
}: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const backdropStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  };

  const panelStyle: CSSProperties = {
    maxWidth: "min(32rem, 100%)",
    maxHeight: "min(85vh, 100%)",
    overflow: "auto",
    borderRadius: "6px",
    border: "1px solid var(--border, #e5e5e5)",
    backgroundColor: "var(--background, #fff)",
    color: "var(--foreground, #171717)",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.12)",
    outline: "none",
  };

  return (
    <div
      className={className}
      role="presentation"
      style={backdropStyle}
      onClick={(e) => {
        onClick?.(e);
        if (closeOnBackdrop) close();
      }}
      {...rest}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={panelClassName}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {title != null && title !== "" && (
          <div
            id={titleId}
            style={{
              padding: "1rem 1rem 0",
              fontSize: "1.0625rem",
              fontWeight: 600,
              lineHeight: 1.35,
            }}
          >
            {title}
          </div>
        )}
        <div style={{ padding: "1rem" }}>{children}</div>
      </div>
    </div>
  );
}
