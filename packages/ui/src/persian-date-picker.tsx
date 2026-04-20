"use client";

import { useId } from "react";
import DatePicker from "react-multi-date-picker";
import type DateObject from "react-date-object";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/layouts/prime.css";
import "react-multi-date-picker/styles/colors/teal.css";
import {
  formatGregorianDateToPersianDisplay,
  formatGregorianDatetimeToPersianDisplay,
  gregorianDateStringToPickerValue,
  gregorianDatetimeLocalToPickerValue,
  persianCalendar,
  pickerToGregorianDateString,
  pickerToGregorianDatetimeLocal,
} from "./lib/jalali-bridge";
import { cn } from "./lib/utils";

const DEFAULT_DATE_PLACEHOLDER = "--/--/----";
const DEFAULT_DATETIME_PLACEHOLDER = "--/--/---- --:--";

/** react-multi-date-picker may pass a string, array, or other value to `render`. */
function pickerDisplayString(displayValue: unknown): string {
  if (displayValue == null) return "";
  if (typeof displayValue === "string") return displayValue.trim();
  if (Array.isArray(displayValue)) {
    return displayValue.map((v) => String(v ?? "")).join(" ").trim();
  }
  return String(displayValue).trim();
}

/** Leading icon for date fields (matches form inputs with start icons). */
function PickerFieldIcon() {
  return (
    <svg
      className="size-4 shrink-0 text-primary/75"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

/** Mirrors SelectTrigger chevron (see components/ui/select.tsx). */
function PickerChevronIcon() {
  return (
    <svg
      className="chevron-icon size-4 shrink-0 text-primary/75 transition-transform duration-200 ease-out"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChipRemoveIcon() {
  return (
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
  );
}

const triggerClassName = cn(
  "flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 py-2 text-start text-sm shadow-sm ring-offset-background transition-colors",
  "hover:border-input/90 hover:bg-muted/30",
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export type PersianDatePickerProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  /**
   * `chip`: when a date is selected, show a removable chip (×) instead of the
   * full-width trigger; click the chip to change the date.
   */
  variant?: "field" | "chip";
};

export function PersianDatePicker({
  id,
  name,
  value,
  onChange,
  placeholder = DEFAULT_DATE_PLACEHOLDER,
  disabled,
  className,
  inputClassName,
  variant = "field",
}: PersianDatePickerProps) {
  const instanceId = useId();
  const pickerKey = `${id ?? instanceId}-${value || "empty"}`;

  return (
    <div dir="rtl" className={cn("w-full", className)}>
      {name ? (
        <input type="hidden" name={name} value={value} readOnly tabIndex={-1} />
      ) : null}
      <DatePicker
        key={pickerKey}
        disabled={disabled}
        editable={false}
        onOpenPickNewDate={false}
        calendar={persianCalendar}
        locale={persian_fa}
        format="YYYY/MM/DD"
        value={value ? gregorianDateStringToPickerValue(value) ?? undefined : undefined}
        onChange={(date: DateObject | null) => {
          onChange(pickerToGregorianDateString(date));
        }}
        placeholder={placeholder}
        calendarPosition="bottom-start"
        containerClassName="w-full !block !visible"
        containerStyle={{
          width: "100%",
          display: "block",
          visibility: "visible",
          minHeight: "2.5rem",
        }}
        render={(displayValue, openCalendar) => {
          const text = pickerDisplayString(displayValue);
          const hasValue = value.trim() !== "";
          const fieldLabel = hasValue
            ? formatGregorianDateToPersianDisplay(value)
            : text || placeholder;
          if (variant === "chip" && value) {
            const chipLabel = formatGregorianDateToPersianDisplay(value);
            return (
              <div className="flex min-h-10 w-full items-center">
                <div
                  className={cn(
                    "inline-flex max-w-full items-center gap-0.5 rounded-md border border-input bg-muted/50 py-1 pl-1 pr-1 text-sm text-foreground shadow-sm ring-offset-background",
                    inputClassName,
                  )}
                >
                  <button
                    type="button"
                    id={id}
                    disabled={disabled}
                    className="min-w-0 max-w-[min(100%,14rem)] truncate rounded px-2 py-1.5 text-start hover:bg-muted/80"
                    onClick={() => openCalendar()}
                    aria-haspopup="dialog"
                  >
                    {chipLabel}
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="پاک کردن"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange("");
                    }}
                  >
                    <ChipRemoveIcon />
                  </button>
                </div>
              </div>
            );
          }
          return (
            <button
              type="button"
              id={id}
              disabled={disabled}
              aria-haspopup="dialog"
              className={cn(triggerClassName, "text-foreground", inputClassName)}
              onClick={() => openCalendar()}
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <PickerFieldIcon />
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-start",
                    !hasValue && "text-muted-foreground",
                  )}
                >
                  {fieldLabel}
                </span>
              </span>
              <PickerChevronIcon />
            </button>
          );
        }}
      />
    </div>
  );
}

export type PersianDateTimePickerProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  variant?: "field" | "chip";
};

export function PersianDateTimePicker({
  id,
  name,
  value,
  onChange,
  placeholder = DEFAULT_DATETIME_PLACEHOLDER,
  disabled,
  className,
  inputClassName,
  variant = "field",
}: PersianDateTimePickerProps) {
  const instanceId = useId();
  const pickerKey = `${id ?? instanceId}-${value || "empty"}`;

  return (
    <div dir="rtl" className={cn("w-full", className)}>
      {name ? (
        <input type="hidden" name={name} value={value} readOnly tabIndex={-1} />
      ) : null}
      <DatePicker
        key={pickerKey}
        disabled={disabled}
        editable={false}
        onOpenPickNewDate={false}
        calendar={persianCalendar}
        locale={persian_fa}
        format="YYYY/MM/DD HH:mm"
        plugins={[<TimePicker key="time" position="bottom" hideSeconds />]}
        value={
          value ? gregorianDatetimeLocalToPickerValue(value) ?? undefined : undefined
        }
        onChange={(date: DateObject | null) => {
          onChange(pickerToGregorianDatetimeLocal(date));
        }}
        placeholder={placeholder}
        calendarPosition="bottom-start"
        containerClassName="w-full !block !visible"
        containerStyle={{
          width: "100%",
          display: "block",
          visibility: "visible",
          minHeight: "2.5rem",
        }}
        render={(displayValue, openCalendar) => {
          const text = pickerDisplayString(displayValue);
          const hasValue = value.trim() !== "";
          const fieldLabel = hasValue
            ? formatGregorianDatetimeToPersianDisplay(value)
            : text || placeholder;
          if (variant === "chip" && value) {
            const chipLabel = formatGregorianDatetimeToPersianDisplay(value);
            return (
              <div className="flex min-h-10 w-full items-center">
                <div
                  className={cn(
                    "inline-flex max-w-full items-center gap-0.5 rounded-md border border-input bg-muted/50 py-1 pl-1 pr-1 text-sm text-foreground shadow-sm ring-offset-background",
                    inputClassName,
                  )}
                >
                  <button
                    type="button"
                    id={id}
                    disabled={disabled}
                    className="min-w-0 max-w-[min(100%,18rem)] truncate rounded px-2 py-1.5 text-start hover:bg-muted/80"
                    onClick={() => openCalendar()}
                    aria-haspopup="dialog"
                  >
                    {chipLabel}
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="پاک کردن"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onChange("");
                    }}
                  >
                    <ChipRemoveIcon />
                  </button>
                </div>
              </div>
            );
          }
          return (
            <button
              type="button"
              id={id}
              disabled={disabled}
              aria-haspopup="dialog"
              className={cn(triggerClassName, "text-foreground", inputClassName)}
              onClick={() => openCalendar()}
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <PickerFieldIcon />
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-start",
                    !hasValue && "text-muted-foreground",
                  )}
                >
                  {fieldLabel}
                </span>
              </span>
              <PickerChevronIcon />
            </button>
          );
        }}
      />
    </div>
  );
}
