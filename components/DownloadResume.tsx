"use client";

import { useEffect, useRef, useState } from "react";
import { resume } from "@/lib/resume";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
    </svg>
  );
}

function FileIcon({ kind }: { kind: "pdf" | "docx" }) {
  return kind === "pdf" ? (
    <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  ) : (
    <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}

export default function DownloadResume({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pdf = resume.downloads.find((d) => d.kind === "pdf");
  const docx = resume.downloads.find((d) => d.kind === "docx");
  const size = compact ? "px-4 py-2 text-sm" : "px-5 py-2.5 text-sm";

  return (
    <div ref={wrapRef} className="relative inline-block">
      <div className="flex overflow-hidden rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(255,255,255,0.12),0_18px_40px_-16px_rgba(79,70,229,0.85),0_0_30px_-10px_rgba(56,189,248,0.6)]">
        <a
          href={`/${pdf?.href ?? ""}`}
          download={pdf?.href}
          className={`inline-flex items-center gap-2 bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110 ${size}`}
        >
          <DownloadIcon className="h-4 w-4" />
          Download Resume
        </a>
        <button
          type="button"
          title="Choose format"
          aria-label="Choose download format"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center bg-gradient-to-br from-fuchsia-500 to-indigo-600 px-3 text-white transition hover:brightness-110"
        >
          <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="glass-deep absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl">
          <div className="border-b border-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Download Resume
          </div>
          {pdf && (
            <a
              href={`/${pdf.href}`}
              download={pdf.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <FileIcon kind="pdf" />
              PDF Version
            </a>
          )}
          {docx && (
            <a
              href={`/${docx.href}`}
              download={docx.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <FileIcon kind="docx" />
              Word Version
            </a>
          )}
        </div>
      )}
    </div>
  );
}