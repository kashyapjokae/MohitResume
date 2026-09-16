"use client";

import { useEffect, useState } from "react";
import VisitorAPI from "visitorapi";

type VisitorData = { count: number | null };

const PROJECT_ID = "oVogddGtPHWSp3BEuz0c";

function countryFlag(countryCode: string) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
    .join("");
}

export default function VisitorCounter({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [country, setCountry] = useState<{ code: string; name: string } | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/visitors")
      .then((res) => {
        if (!res.ok) throw new Error("visitor counter unavailable");
        return res.json() as Promise<VisitorData>;
      })
      .then((data) => {
        if (active && typeof data.count === "number") setCount(data.count);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    VisitorAPI(PROJECT_ID)
      .then((data) => {
        if (active && data.countryCode) {
          setCountry({ code: data.countryCode, name: data.countryName });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (count === null) return null;

  return (
    <span
      className={`glass-capsule inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/60 ${className}`}
      title={country ? `Visitor from ${country.name}` : "Total visitors"}
    >
      <svg className="h-3.5 w-3.5 text-sky-400/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {count.toLocaleString()} visitors
      {country && (
        <>
          <span className="h-3 w-px bg-white/10" />
          <span title={country.name}>{countryFlag(country.code)}</span>
          <span>{country.name}</span>
        </>
      )}
    </span>
  );
}