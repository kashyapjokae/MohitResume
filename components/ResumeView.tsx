"use client";

import { useState } from "react";
import Link from "next/link";
import type { CombinedResume, Track } from "@/lib/types";
import { ExperienceShort, DynamicDate, TotalExperience, formatJobPeriod } from "@/components/Experience";
import DownloadResume from "@/components/DownloadResume";
import VisitorCounter from "@/components/VisitorCounter";

const TABS: { key: "all" | Track; label: string }[] = [
  { key: "all", label: "All Projects" },
  { key: "dotnet", label: ".NET Projects" },
  { key: "python", label: "Python Projects" },
];

const tabAccent: Record<"all" | Track, string> = {
  all: "bg-bone text-ink",
  dotnet: "bg-forest text-bone",
  python: "bg-oxblood text-bone",
};

const focusAccent = {
  dotnet: "border-l-forest bg-forest/10",
  python: "border-l-oxblood bg-oxblood/10",
};

const trackChip: Record<Track, string> = {
  dotnet: "bg-forest/15 text-forest border border-forest/40",
  python: "bg-oxblood/10 text-oxblood border border-oxblood/35",
};

export default function ResumeView({ resume }: { resume: CombinedResume }) {
  const [tab, setTab] = useState<"all" | Track>("all");
  const filtered =
    tab === "all" ? resume.projects : resume.projects.filter((p) => p.track === tab);

  return (
    <div className="relative min-h-screen bg-ink px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
      <div className="relative mx-auto max-w-5xl">
        {/* Controls row */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40 transition hover:text-forest-soft"
            >
              ← Back to portfolio
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-bone">
              Resume<span className="text-oxblood-soft">.</span>
            </h1>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/35">
              Updated <DynamicDate /> · Total{" "}
              <TotalExperience start="2021-07" className="text-forest-soft" />
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DownloadResume />
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-5 py-2.5 text-sm font-semibold text-bone/70 transition hover:-translate-y-0.5 hover:border-forest-soft/50 hover:text-forest-soft"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print
            </button>
          </div>
        </div>

        {/* Resume paper */}
        <div className="print-area overflow-hidden rounded-[2rem] border border-bone/15 bg-bone text-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
          <div className="flex h-1.5 w-full">
            <div className="h-full w-1/2 bg-forest" />
            <div className="h-full w-1/2 bg-oxblood" />
          </div>

          <div className="relative overflow-hidden bg-ink px-8 pb-8 pt-10 text-bone sm:px-12">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-forest/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-oxblood/20 blur-3xl" />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-forest-soft">Curriculum Vitae</p>
              <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.04em] sm:text-5xl">
                Mohit <span className="text-outline-bone">Kumar</span>
                <span className="text-oxblood-soft">.</span>
              </h2>
              <p className="mt-2 text-lg font-medium text-forest-soft">{resume.roleTitle}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] text-bone/55">
                {resume.contact.map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-oxblood-soft" />
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/35">{resume.tagline}</p>
            </div>
          </div>

          <div className="px-8 py-8 sm:px-12 sm:py-10">
            {/* Summary */}
            <ResumeSection title="Professional Summary" icon="summary">
              <p className="text-sm leading-relaxed text-ink/70">{resume.summary}</p>
            </ResumeSection>

            {/* Focus cards */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {resume.focus.map((f) => (
                <div key={f.key} className={`rounded-xl border-l-4 p-5 ${focusAccent[f.key]}`}>
                  <h3 className="text-sm font-bold text-ink">{f.title}</h3>
                  <ul className="mt-2 space-y-1">
                    {f.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Work Experience */}
            <ResumeSection title="Work Experience" icon="exp">
              <div className="space-y-7">
                {resume.jobs.map((job, i) => (
                  <div key={i} className="relative">
                    <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-oxblood/60 to-transparent" />
                    <div className="pl-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-base font-bold text-ink">{job.title}</h3>
                        <span className="flex items-center gap-2 text-xs font-semibold text-ink/50">
                          {formatJobPeriod(job.start, job.end)}
                          <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-forest-soft">
                            <ExperienceShort start={job.start} end={job.end} />
                          </span>
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-ink/60">
                        {job.company}
                        {job.location ? ` | ${job.location}` : ""}
                      </p>
                      {!job.end && (
                        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-forest/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-forest ring-1 ring-inset ring-forest/40">
                          <span className="h-1 w-1 rounded-full bg-[#4c6a00]" />
                          Present · <ExperienceShort start={job.start} />
                        </span>
                      )}
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/70">
                        {job.points.map((pt, j) => (
                          <li key={j}>{pt}</li>
                        ))}
                      </ul>
                      {job.stack && (
                        <p className="mt-2 text-xs font-medium text-ink/50">
                          <span className="font-bold text-ink/70">Stack:</span> {job.stack}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* AI Projects */}
            {resume.aiProjects.length > 0 && (
              <ResumeSection title="Python & AI Hands-on Projects" icon="ai">
                <div className="space-y-5">
                  {resume.aiProjects.map((p, i) => (
                    <div key={i}>
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h3 className="text-base font-bold text-ink">{p.name}</h3>
                        <span className="rounded-full bg-oxblood/10 px-2 py-0.5 font-mono text-[10px] font-bold text-oxblood ring-1 ring-inset ring-oxblood/35">
                          {p.timeline}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{p.summary}</p>
                      {p.details && (
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/70">
                          {p.details.map((d, j) => (
                            <li key={j}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </ResumeSection>
            )}

            {/* Projects with tabs */}
            <div id="projects" className="scroll-mt-24">
              <ResumeSection title="Key Projects" icon="proj">
                <div className="no-print mb-4 flex flex-wrap gap-2">
                  {TABS.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)}
                      className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-all ${
                        tab === t.key
                          ? tabAccent[t.key]
                          : "border border-ink/15 text-ink/50 hover:border-ink/30 hover:text-ink"
                      }`}
                    >
                      {t.label}
                      {t.key !== "all" && (
                        <span className="ml-1 opacity-60">
                          ({resume.projects.filter((p) => p.track === t.key).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {filtered.map((p, i) => (
                    <div
                      key={p.name + i}
                      className="group rounded-xl border border-ink/10 p-4 transition-colors hover:border-ink/25 hover:bg-ink/[0.03]"
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide ${trackChip[p.track]}`}>
                          {p.track === "dotnet" ? ".NET" : "Python"}
                        </span>
                        <span className="font-mono text-[10px] text-ink/40">{p.period}</span>
                        {p.org && <span className="text-[10px] text-ink/30">· {p.org}</span>}
                      </div>
                      <h4 className="text-sm font-bold text-ink">{p.name}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-ink/60">{p.summary}</p>
                      {p.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {p.tags.map((t) => (
                            <span key={t} className="rounded bg-ink/[0.06] px-1.5 py-0.5 text-[10px] text-ink/50">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ResumeSection>
            </div>

            {/* Skills */}
            <ResumeSection title="Technical Skills" icon="skill">
              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {resume.skills.map((s) => (
                  <p key={s.label} className="text-sm leading-relaxed text-ink/70">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wide text-ink">
                      {s.label}:
                    </span>{" "}
                    {s.value}
                  </p>
                ))}
              </div>
            </ResumeSection>

            {/* Education */}
            <ResumeSection title="Education" icon="edu">
              {resume.education.map((e, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink/70">
                  {e}
                </p>
              ))}
            </ResumeSection>

            {/* Achievements */}
            <ResumeSection title="Achievements" icon="ach">
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-ink/70">
                {resume.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </ResumeSection>

            {/* Languages */}
            <ResumeSection title="Languages" icon="lang">
              <p className="text-sm leading-relaxed text-ink/70">{resume.languages}</p>
            </ResumeSection>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-4">
          <DownloadResume />
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/35">
              Total experience:{" "}
              <ExperienceShort start="2021-07" className="font-semibold text-forest-soft" />
            </p>
            <VisitorCounter />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- helper section wrapper ---- */
const iconMap: Record<string, React.ReactNode> = {
  summary: <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth={1.5} />,
  exp: <path d="M12 8v4l3 3" strokeWidth={1.5} />,
  ai: (
    <path
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      strokeWidth={1.5}
    />
  ),
  proj: (
    <path
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
      strokeWidth={1.5}
    />
  ),
  skill: (
    <path
      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      strokeWidth={1.5}
    />
  ),
  edu: (
    <path
      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
      strokeWidth={1.5}
    />
  ),
  ach: (
    <path
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      strokeWidth={1.5}
    />
  ),
  lang: (
    <path
      d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-1.98.32m-1.27-1.27a18.026 18.026 0 01-3.31-2.662"
      strokeWidth={1.5}
    />
  ),
};

function ResumeSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center gap-2 border-b border-ink/15 pb-2">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-ink text-forest-soft">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {iconMap[icon]}
          </svg>
        </span>
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">{title}</h2>
      </div>
      {children}
    </div>
  );
}
