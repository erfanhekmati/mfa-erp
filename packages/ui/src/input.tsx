"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={className}
      style={{
        display: "block",
        width: "100%",
        maxWidth: "20rem",
        padding: "0.5rem 0.75rem",
        fontSize: "0.9375rem",
        lineHeight: 1.5,
        color: "var(--foreground, #171717)",
        backgroundColor: "var(--background, #fff)",
        border: "1px solid #ccc",
        borderRadius: "6px",
        outline: "none",
      }}
      {...props}
    />
  );
});
