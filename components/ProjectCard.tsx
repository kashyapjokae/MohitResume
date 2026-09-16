import Link from "next/link";
import type { ProjectHighlight } from "@/lib/types";

const trackStyle: Record<
  string,
  { label: string; chip: string; accent: string; link: string; glow: string }
> = {
  dotnet: {
    label: ".NET",
    chip: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40",
    accent: "group-hover:text-indigo-300",
    link: "text-indigo-400 hover:text-indigo-300",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.45)] hover:border-indigo-500/50",
  },
  python: {
    label: "Python",
    chip: "bg-teal-500/20 text-teal-300 border border-teal-500/40",
    accent: "group-hover:text-teal-300",
    link: "text-teal-400 hover:text-teal-300",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(20,184,166,0.45)] hover:border-teal-500/50",
  },
};

export default function ProjectCard({ project }: { project: ProjectHighlight }) {
  const style = trackStyle[project.track] ?? trackStyle.dotnet;

  return (
    <div
      className={`group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.06] ${style.glow}`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${style.chip}`}>
          {style.label}
        </span>
        <span className="text-xs font-medium text-white/40">{project.period}</span>
        {project.org && <span className="text-xs text-white/30">· {project.org}</span>}
      </div>
      <h3 className={`text-lg font-semibold text-white transition-colors ${style.accent}`}>
        {project.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{project.summary}</p>
      {project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/50 ring-1 ring-white/10"
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