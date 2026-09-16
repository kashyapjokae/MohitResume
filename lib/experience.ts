export interface Tenure {
  years: number;
  months: number;
}

function parseMonthYear(iso: string): { y: number; m: number } {
  const [y, m] = iso.split("-").map(Number);
  return { y, m };
}

export function tenureBetween(startISO: string, endISO?: string): Tenure {
  const start = parseMonthYear(startISO);
  const now = new Date();
  const end = endISO
    ? parseMonthYear(endISO)
    : { y: now.getFullYear(), m: now.getMonth() + 1 };

  let months = (end.y - start.y) * 12 + (end.m - start.m);
  if (months < 0) months = 0;
  return { years: Math.floor(months / 12), months: months % 12 };
}

export function formatTenureLong(t: Tenure): string {
  const parts: string[] = [];
  if (t.years > 0) parts.push(`${t.years} ${t.years === 1 ? "year" : "years"}`);
  if (t.months > 0) parts.push(`${t.months} ${t.months === 1 ? "month" : "months"}`);
  return parts.join(" ") || "0 months";
}

export function formatTenureShort(t: Tenure): string {
  if (t.years === 0) return `${t.months} mo`;
  return `${t.years} yr${t.months > 0 ? ` ${t.months} mo` : ""}`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatMonthYear(iso: string): string {
  const { y, m } = parseMonthYear(iso);
  return `${MONTHS[Math.max(0, Math.min(11, m - 1))]} ${y}`;
}