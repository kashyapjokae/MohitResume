"use client";

import { useSyncExternalStore } from "react";
import { tenureBetween, formatTenureShort, formatTenureLong, formatMonthYear } from "@/lib/experience";

const subscribe = (callback: () => void) => {
  const interval = setInterval(callback, 60_000);
  return () => clearInterval(interval);
};

function useNow(): Date {
  const ts = useSyncExternalStore(
    subscribe,
    () => Date.now(),
    () => Date.now(),
  );
  return new Date(ts);
}

export function ExperienceShort({
  start,
  end,
  className,
}: {
  start: string;
  end?: string;
  className?: string;
}) {
  useNow();
  const t = tenureBetween(start, end);
  return (
    <span className={className}>
      <span className="tabular-nums">{formatTenureShort(t)}</span>
    </span>
  );
}

export function ExperienceLong({
  start,
  end,
  className,
}: {
  start: string;
  end?: string;
  className?: string;
}) {
  useNow();
  const t = tenureBetween(start, end);
  return <span className={className}>{formatTenureLong(t)}</span>;
}

export function TotalExperience({
  start,
  className,
}: {
  start: string;
  className?: string;
}) {
  useNow();
  const t = tenureBetween(start);
  return (
    <span className={className}>
      <span className="tabular-nums">{t.years}</span>
      <span className="text-xs uppercase tracking-widest opacity-60 ml-1">
        {t.years === 1 ? "year" : "years"}
      </span>
      {t.months > 0 && (
        <>
          <span className="mx-1 opacity-30">·</span>
          <span className="tabular-nums">{t.months}</span>
          <span className="text-xs uppercase tracking-widest opacity-60 ml-1">
            {t.months === 1 ? "month" : "months"}
          </span>
        </>
      )}
    </span>
  );
}

export function DynamicDate({ className }: { className?: string }) {
  const now = useNow();
  const formatted = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return <span className={className}>{formatted}</span>;
}

export function formatJobPeriod(start: string, end?: string): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : "Present"}`;
}