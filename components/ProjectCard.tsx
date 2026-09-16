import Link from "next/link";
import type { ProjectHighlight } from "@/lib/types";

const trackStyle: Record<
  string,
  { label: string; chip: string; accent: string; link: string; glow: string }
> = {
  dotnet: {
    label: ".NET",
    chip: "text-indigo-200 ring-indigo-400/40",
    accent: "group-hover:text-indigo-300",
    link: "text-indigo-300 hover:text-indigo-200",
    glow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_24px_50px_-20px_rgba(99,102,241,0.55)] hover:border-indigo-400/50",
  },
  python: {
    label: "Python",
    chip: "text-teal-200 ring-teal-400/40",
    accent: "group-hover:text-teal-300",
    link: "text-teal-300 hover:text-teal-200",
    glow: "hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_24px_50px_-20px_rgba(20,184,166,0.55)] hover:border-teal-400/50",
  },
};

export default function ProjectCard({ project }: { project: ProjectHighlight }) {
  const style = trackStyle[project.track] ?? trackStyle.dotnet;

  return (
    <div
      className={`glass group flex flex-col rounded-3xl p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.09] ${style.glow}`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`glass-capsule rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${style.chip}`}>
          {style.label}
        </span>
        <span className="text-xs font-medium text-white/40">{project.period}</span>
        {project.org && <span className="text-xs text-white/30">· {project.org}</span>}
      </div>
      <h3 className={`text-lg font-semibold text-white transition-colors ${style.accent}`}>
        {project.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">{project.summary}</p>
      {project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[11px] font-medium text-white/60 ring-1 ring-inset ring-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      <Link
        href="/resume#projects"
        className={`mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors ${style.link}`}
      >
        Explore on resume
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}