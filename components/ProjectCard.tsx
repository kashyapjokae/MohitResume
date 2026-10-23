"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectHighlight } from "@/lib/types";

const trackStyle: Record<
  string,
  { label: string; chip: string; accent: string; link: string; glow: string; orb: string }
> = {
  dotnet: {
    label: ".NET",
    chip: "text-indigo-200 ring-indigo-400/40",
    accent: "group-hover:text-indigo-300",
    link: "text-indigo-300 hover:text-indigo-200",
    glow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_40px_80px_-30px_rgba(99,102,241,0.6)] hover:border-indigo-400/50",
    orb: "bg-indigo-400/25",
  },
  python: {
    label: "Python",
    chip: "text-teal-200 ring-teal-400/40",
    accent: "group-hover:text-teal-300",
    link: "text-teal-300 hover:text-teal-200",
    glow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_40px_80px_-30px_rgba(20,184,166,0.6)] hover:border-teal-400/50",
    orb: "bg-teal-400/25",
  },
};

export default function ProjectCard({ project }: { project: ProjectHighlight }) {
  const style = trackStyle[project.track] ?? trackStyle.dotnet;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03, rotateX: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className={`glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:bg-white/[0.09] ${style.glow}`}
    >
      <div className={`pointer-events-none absolute -top-20 right-[-40%] h-48 w-48 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150 ${style.orb}`} />
      <div className="relative mb-3 flex flex-wrap items-center gap-2">
        <span className={`glass-capsule rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${style.chip}`}>
          {style.label}
        </span>
        <span className="text-xs font-medium text-white/40">{project.period}</span>
        {project.org && <span className="text-xs text-white/30">· {project.org}</span>}
      </div>
      <h3 className={`relative text-lg font-semibold text-white transition-colors ${style.accent}`}>
        {project.name}
      </h3>
      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-white/60">{project.summary}</p>
      {project.tags.length > 0 && (
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[11px] font-medium text-white/60 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.12] hover:text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <Link
        href="/resume#projects"
        className={`relative mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors ${style.link}`}
      >
        Explore on resume
        <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </motion.div>
  );
}