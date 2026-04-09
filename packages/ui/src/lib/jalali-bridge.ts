// Ensures `jalaali-js` types resolve when apps typecheck workspace sources.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- ambient types only in .d.ts
/// <reference path="../types/jalaali-js.d.ts" />
import DateObject from "react-date-object";
import type { Calendar } from "react-date-object";
import { toGregorian, toJalaali } from "jalaali-js";
import gregorianMod from "react-date-object/calendars/gregorian";
import persianMod from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

/**
 * Bundlers may expose calendar subpath imports incorrectly. `DateObject.convert()`
 * is a no-op if the calendar reference is wrong, which leaves UI in میلادی.
 */
function resolveCalendar(mod: unknown): Calendar {
  if (
    mod &&
    typeof mod === "object" &&
    "name" in mod &&
    typeof (mod as { name: string }).name === "string"
  ) {
    return mod as Calendar;
  }
  if (mod && typeof mod === "object" && "default" in mod) {
    return resolveCalendar((mod as { default: unknown }).default);
  }
  throw new Error("Invalid calendar module");
}

const gregorian = resolveCalendar(gregorianMod);

/** Use this for `calendar={…}` on react-multi-date-picker (reliable in Next.js). */
export const persianCalendar = resolveCalendar(persianMod);

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function parseIsoDateParts(iso: string): { gy: number; gm: number; gd: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  return {
    gy: Number(m[1]),
    gm: Number(m[2]),
    gd: Number(m[3]),
  };
}

export function gregorianDateStringToPickerValue(
  isoDate: string,
): DateObject | null {
  if (!isoDate) return null;
  const parts = parseIsoDateParts(isoDate);
  if (!parts) return null;
  try {
    const { jy, jm, jd } = toJalaali(parts.gy, parts.gm, parts.gd);
    return new DateObject({
      year: jy,
      month: jm,
      day: jd,
      calendar: persianCalendar,
      locale: persian_fa,
    });
  } catch {
    return null;
  }
}

export function pickerToGregorianDateString(d: DateObject | null): string {
  if (!d || !d.isValid) return "";
  if (d.calendar.name === "persian") {
    const jy = d.year as number;
    const jm = d.month.number;
    const jd = d.day as number;
    const { gy, gm, gd } = toGregorian(jy, jm, jd);
    return `${gy}-${pad2(gm)}-${pad2(gd)}`;
  }
  return new DateObject(d).convert(gregorian).format("YYYY-MM-DD");
}

export function gregorianDatetimeLocalToPickerValue(
  local: string,
): DateObject | null {
  if (!local) return null;
  const normalized = local.includes("T")
    ? local.replace("T", " ")
    : local;
  const [datePart, timePart] = normalized.split(" ");
  const parts = parseIsoDateParts(datePart ?? "");
  if (!parts) return null;
  try {
    const { jy, jm, jd } = toJalaali(parts.gy, parts.gm, parts.gd);
    let hour = 0;
    let minute = 0;
    if (timePart) {
      const bits = timePart.split(":");
      const h = Number(bits[0]);
      const min = Number(bits[1]);
      hour = Number.isFinite(h) ? h : 0;
      minute = Number.isFinite(min) ? min : 0;
    }
    return new DateObject({
      year: jy,
      month: jm,
      day: jd,
      hour,
      minute,
      calendar: persianCalendar,
      locale: persian_fa,
    });
  } catch {
    return null;
  }
}

export function pickerToGregorianDatetimeLocal(d: DateObject | null): string {
  if (!d || !d.isValid) return "";
  if (d.calendar.name === "persian") {
    const jy = d.year as number;
    const jm = d.month.number;
    const jd = d.day as number;
    const { gy, gm, gd } = toGregorian(jy, jm, jd);
    const hh = d.hour ?? 0;
    const mm = d.minute ?? 0;
    return `${gy}-${pad2(gm)}-${pad2(gd)}T${pad2(hh)}:${pad2(mm)}`;
  }
  const g = new DateObject(d).convert(gregorian);
  return `${g.format("YYYY-MM-DD")}T${g.format("HH:mm")}`;
}

/** Jalali (شمسی) label — uses jalaali-js, not DateObject.convert. */
export function formatGregorianDateToPersianDisplay(isoDate: string): string {
  if (!isoDate) return "";
  const parts = parseIsoDateParts(isoDate);
  if (!parts) return isoDate;
  try {
    const { jy, jm, jd } = toJalaali(parts.gy, parts.gm, parts.gd);
    return `${jy}/${pad2(jm)}/${pad2(jd)}`;
  } catch {
    return isoDate;
  }
}

/** Jalali date + time label for display. */
export function formatGregorianDatetimeToPersianDisplay(local: string): string {
  if (!local) return "";
  const normalized = local.includes("T")
    ? local.replace("T", " ")
    : local.trim();
  const [datePart, ...rest] = normalized.split(" ");
  const timePart = rest.join(" ").trim();
  const jDate = formatGregorianDateToPersianDisplay(datePart ?? "");
  if (!datePart || jDate === datePart) return local;
  return timePart ? `${jDate} ${timePart}` : jDate;
}
