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
  placeholder,
  disabled,
  className,
  inputClassName,
}: PersianDatePickerProps) {
  return (
    <div dir="rtl" className={className}>
      <DatePicker
        id={id}
        name={name}
        disabled={disabled}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        value={value ? gregorianDateStringToPickerValue(value) ?? undefined : undefined}
        onChange={(date: DateObject | null) => {
          onChange(pickerToGregorianDateString(date));
        }}
        placeholder={placeholder}
        containerClassName="w-full"
        inputClass={["rmdp-input", "w-full", "!max-w-none", inputClassName]
          .filter(Boolean)
          .join(" ")}
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
  placeholder,
  disabled,
  className,
  inputClassName,
}: PersianDateTimePickerProps) {
  return (
    <div dir="rtl" className={className}>
      <DatePicker
        id={id}
        name={name}
        disabled={disabled}
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
        containerClassName="w-full"
        inputClass={["rmdp-input", "w-full", "!max-w-none", inputClassName]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
