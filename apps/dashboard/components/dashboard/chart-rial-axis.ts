/** برچسب محور عمودی برای مبلغ (ریال): عدد با ارقام فارسی + واحد فارسی */
export function formatRialAxisTick(v: number): string {
  if (!Number.isFinite(v)) return "";
  const abs = Math.abs(v);
  if (abs >= 1_000_000_000) {
    return `${(v / 1_000_000_000).toLocaleString("fa-IR", { maximumFractionDigits: 1 })} میلیارد`;
  }
  if (abs >= 1_000_000) {
    return `${(v / 1_000_000).toLocaleString("fa-IR", { maximumFractionDigits: 0 })} میلیون`;
  }
  if (abs >= 1_000) {
    return `${(v / 1_000).toLocaleString("fa-IR", { maximumFractionDigits: 0 })} هزار`;
  }
  return v.toLocaleString("fa-IR");
}
