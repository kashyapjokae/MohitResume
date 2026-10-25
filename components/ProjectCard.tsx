"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectHighlight } from "@/lib/types";

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectHighlight;
  index: number;
}) {
  const isDotnet = project.track === "dotnet";
  const accentText = isDotnet ? "text-forest-soft" : "text-oxblood-soft";
  const accentBg = isDotnet ? "bg-forest" : "bg-oxblood";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.035, 0.25) }}
    >
      <Link
        href="/resume#projects"
        className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-bone/10 py-6 sm:items-center sm:gap-6"
      >
        <span
          className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100 ${accentBg}`}
        />
        <span className="relative z-10 pt-1 font-mono text-[10px] tracking-[0.25em] text-bone/30 transition group-hover:text-bone/60 sm:pt-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em]">
            <span className={`${accentText} transition group-hover:text-bone/80`}>
              {isDotnet ? ".NET" : "Python"}
            </span>
            <span className="text-bone/25 transition group-hover:text-bone/60">{project.period}</span>
            {project.org && (
              <span className="text-bone/25 transition group-hover:text-bone/60">— {project.org}</span>
            )}
          </div>
          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-bone transition group-hover:text-bone sm:text-2xl">
            {project.name}
          </h3>
          <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-relaxed text-bone/40 transition group-hover:text-bone/75">
            {project.summary}
          </p>
          {project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-bone/10 px-2 py-0.5 text-[10px] text-bone/40 transition group-hover:border-bone/25 group-hover:text-bone/70"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 6 && (
                <span className="px-1 py-0.5 text-[10px] text-bone/30 transition group-hover:text-bone/60">
                  +{project.tags.length - 6}
                </span>
              )}
            </div>
          )}
        </div>

        <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-bone/15 text-bone/50 transition duration-300 group-hover:rotate-45 group-hover:border-bone/30 group-hover:text-bone">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
