"use client";

import DatePicker from "react-multi-date-picker";
import type DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/layouts/prime.css";
import "react-multi-date-picker/styles/colors/teal.css";
import {
  gregorianDateStringToPickerValue,
  gregorianDatetimeLocalToPickerValue,
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

/** Mirrors SelectTrigger chevron (see components/ui/select.tsx). */
function PickerChevronIcon() {
  return (
    <svg
      className="chevron-icon size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out"
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
}: PersianDatePickerProps) {
  return (
    <div dir="rtl" className={cn("w-full", className)}>
      {name ? (
        <input type="hidden" name={name} value={value} readOnly tabIndex={-1} />
      ) : null}
      <DatePicker
        disabled={disabled}
        editable={false}
        calendar={persian}
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
          return (
            <button
              type="button"
              id={id}
              disabled={disabled}
              aria-haspopup="dialog"
              className={cn(triggerClassName, "text-foreground", inputClassName)}
              onClick={() => openCalendar()}
            >
              <span
                className={cn(
                  "min-w-0 flex-1 truncate",
                  !text && "text-muted-foreground",
                )}
              >
                {text || placeholder}
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
}: PersianDateTimePickerProps) {
  return (
    <div dir="rtl" className={cn("w-full", className)}>
      {name ? (
        <input type="hidden" name={name} value={value} readOnly tabIndex={-1} />
      ) : null}
      <DatePicker
        disabled={disabled}
        editable={false}
        calendar={persian}
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
          return (
            <button
              type="button"
              id={id}
              disabled={disabled}
              aria-haspopup="dialog"
              className={cn(triggerClassName, "text-foreground", inputClassName)}
              onClick={() => openCalendar()}
            >
              <span
                className={cn(
                  "min-w-0 flex-1 truncate",
                  !text && "text-muted-foreground",
                )}
              >
                {text || placeholder}
              </span>
              <PickerChevronIcon />
            </button>
          );
        }}
      />
    </div>
  );
}
