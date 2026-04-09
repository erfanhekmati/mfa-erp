import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function gregorianDateStringToPickerValue(
  isoDate: string,
): DateObject | null {
  if (!isoDate) return null;
  try {
    const js = new Date(`${isoDate}T12:00:00`);
    if (Number.isNaN(js.getTime())) return null;
    return new DateObject(js).convert(persian).setLocale(persian_fa);
  } catch {
    return null;
  }
}

export function pickerToGregorianDateString(d: DateObject | null): string {
  if (!d || !d.isValid) return "";
  return new DateObject(d).convert(gregorian).format("YYYY-MM-DD");
}

export function gregorianDatetimeLocalToPickerValue(
  local: string,
): DateObject | null {
  if (!local) return null;
  try {
    const js = new Date(local);
    if (Number.isNaN(js.getTime())) return null;
    return new DateObject(js).convert(persian).setLocale(persian_fa);
  } catch {
    return null;
  }
}

export function pickerToGregorianDatetimeLocal(d: DateObject | null): string {
  if (!d || !d.isValid) return "";
  const g = new DateObject(d).convert(gregorian);
  return `${g.format("YYYY-MM-DD")}T${g.format("HH:mm")}`;
}
