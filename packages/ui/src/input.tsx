"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "./lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/** Matches SelectTrigger / PersianDatePicker field focus and border tokens. */
const inputVariants = cn(
  "flex h-10 w-full max-w-[20rem] rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background transition-colors",
  "placeholder:text-muted-foreground",
  "hover:border-input/90 hover:bg-muted/30",
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
);

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(inputVariants, className)}
      {...props}
    />
  );
});
