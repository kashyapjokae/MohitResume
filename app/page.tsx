"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import DownloadResume from "@/components/DownloadResume";
import { TotalExperience, DynamicDate } from "@/components/Experience";
import { resume } from "@/lib/resume";
import { tenureBetween } from "@/lib/experience";
import { HeroItem, HeroReveal } from "@/components/Motion";
import ScrollFX from "@/components/ScrollFX";
import CursorGlow from "@/components/CursorGlow";
import type { Track } from "@/lib/types";

const ticker = [
  "DOTNET",
  "PYTHON",
  "FASTAPI",
  "REACT",
  "NEXT.JS",
  "POSTGRESQL",
  "DOCKER",
  "KUBERNETES",
  "AZURE",
  "AI / ML",
];

const skillTicker = [
  "C#",
  ".NET 9",
  "ASP.NET Core",
  "Minimal APIs",
  "FastAPI",
  "PostgreSQL",
  "React",
  "Next.js",
  "TypeScript",
  "Docker",
  "Kubernetes",
  "Azure",
  "Redis",
  "SignalR",
  "Blazor",
];

function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8m9 0v9" />
    </svg>
  );
}

export default function Home() {
  const expDotnet = tenureBetween("2021-07");
  const expCareer = tenureBetween("2021-07");
  const [track, setTrack] = useState<"all" | Track>("all");
  const projects = track === "all" ? resume.projects : resume.projects.filter((p) => p.track === track);

  const stats = [
    { value: `${expCareer.years}+`, label: "Years shipping software", tone: "text-forest-soft" },
    { value: `${expDotnet.years}+`, label: "Years on .NET", tone: "text-bone" },
    { value: "01", label: "Year on Python / AI", tone: "text-oxblood-soft" },
    { value: `'21`, label: "Building for NIC Punjab", tone: "text-bone/70" },
  ];

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-ink text-bone">
        <CursorGlow />
        <div className="pointer-events-none fixed inset-0 z-[1] noise opacity-[0.055]" />
        <ScrollFX>
          {/* Hero */}
          <section className="relative min-h-[92vh] px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
            <div
              data-parallax="0.12"
              className="pointer-events-none absolute right-[-12%] top-[-12%] h-[36rem] w-[36rem] rounded-full bg-forest/10 blur-[120px]"
            />
            <div className="pointer-events-none absolute bottom-[-22%] left-[-10%] h-[32rem] w-[32rem] rounded-full bg-oxblood/10 blur-[130px]" />

            <div className="relative mx-auto flex max-w-7xl flex-col">
              <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.35em] text-bone/40">
                <span>Portfolio — 2026</span>
                <span className="flex items-center gap-2">
                  <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-forest-soft" />
                  Open to work
                </span>
                <span className="hidden sm:block">Haryana, India</span>
              </div>

              <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
                <HeroReveal>
                  <HeroItem>
                    <p className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-forest-soft">
                      <span className="h-px w-12 bg-forest-soft/60" />
                      Full Stack Software Engineer
                    </p>
                  </HeroItem>
                  <HeroItem>
                    <h1 className="text-[clamp(4rem,13.5vw,10.5rem)] font-black uppercase leading-[0.78] tracking-[-0.055em] text-bone">
                      <span className="block">Mohit</span>
                      <span className="text-outline-bone block">
                        Kumar<span className="text-oxblood-soft">.</span>
                      </span>
                    </h1>
                  </HeroItem>
                  <HeroItem>
                    <div className="mt-10 flex flex-wrap items-center gap-3">
                      <Link
                        href="/resume"
                        className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-bone transition hover:-translate-y-0.5 hover:bg-[#0a5538]"
                      >
                        View resume
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                      <Link
                        href="#work"
                        className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-bone/75 transition hover:-translate-y-0.5 hover:border-bone/25 hover:text-bone"
                      >
                        Selected work
                        <span className="font-mono text-[10px] text-bone/35">
                          01—{String(resume.projects.length).padStart(2, "0")}
                        </span>
                      </Link>
                    </div>
                  </HeroItem>
                </HeroReveal>

                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -24 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden flex-col items-center gap-6 lg:flex"
                >
                  <div className="relative h-44 w-44">
                    <svg className="animate-spin-slow absolute inset-0 h-full w-full" viewBox="0 0 200 200">
                      <defs>
                        <path
                          id="badge-path"
                          d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
                        />
                      </defs>
                      <text className="fill-bone/55 font-mono text-[10px] uppercase" style={{ letterSpacing: "0.32em" }}>
                        <textPath href="#badge-path">Available for work · .NET · Python · AI · </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="grid h-20 w-20 place-items-center rounded-full border border-forest-soft/40 bg-forest/20 text-2xl font-black text-forest-soft">
                        MK
                      </div>
                    </div>
                  </div>
                  <div className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">
                    Scroll to explore
                  </div>
                </motion.div>
              </div>

              <div className="mt-14 grid gap-8 border-t border-bone/10 pt-8 md:grid-cols-[1.2fr_auto] md:items-end">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.65 }}
                  className="max-w-2xl text-base leading-relaxed text-bone/55 sm:text-lg"
                >
                  Building enterprise-scale applications for Government of Punjab NIC projects.
                  .NET backend leadership with Python/FastAPI &amp; AI-powered products on the side.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40"
                >
                  <span>
                    <span className="text-bone">{expCareer.years}+</span> yrs overall
                  </span>
                  <span>
                    <span className="text-forest-soft">{expDotnet.years}+</span> yrs .NET
                  </span>
                  <span>
                    <span className="text-oxblood-soft">1</span> yr Python
                  </span>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Ticker */}
          <div className="relative overflow-hidden border-y border-bone/10 bg-ink-soft py-4">
            <div className="animate-marquee pause-on-hover flex w-max items-center">
              {[...ticker, ...ticker].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex items-center gap-6 px-6 font-mono text-[11px] uppercase tracking-[0.35em] text-bone/45"
                >
                  {item}
                  <span className="text-oxblood-soft">✳</span>
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <div data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group bg-ink p-6 transition hover:bg-ink-soft sm:p-8">
                  <p className={`text-4xl font-black tracking-tight sm:text-5xl ${stat.tone}`}>{stat.value}</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/35">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Focus */}
          <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
            <div data-reveal>
              <SectionHeading
                eyebrow="01 — What I do"
                title="Two tracks. One engineer."
                subtitle="Enterprise .NET architecture on one side. Fast-moving Python and AI products on the other. Both shipped end-to-end."
              />
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {resume.focus.map((f, i) => {
                const isDotnet = f.key === "dotnet";
                const accentText = isDotnet ? "text-forest-soft" : "text-oxblood-soft";
                const accentBg = isDotnet ? "bg-forest" : "bg-oxblood";
                const accentDot = isDotnet ? "bg-forest-soft" : "bg-oxblood-soft";
                const accentBorder = isDotnet ? "border-forest-soft/30" : "border-oxblood-soft/30";
                return (
                  <div
                    data-reveal
                    key={f.key}
                    className="group relative overflow-hidden rounded-[2rem] border border-bone/10 bg-ink-soft p-7 transition duration-500 hover:-translate-y-1 hover:border-bone/20 sm:p-9"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 ${accentBg}`} />
                    <span className="pointer-events-none absolute -right-4 -top-10 text-[9rem] font-black leading-none text-bone/[0.04]">
                      0{i + 1}
                    </span>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] ${accentText} ${accentBorder}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${accentDot}`} />
                      {f.badge}
                    </span>
                    <h3 className="mt-5 text-3xl font-black tracking-tight text-bone sm:text-4xl">
                      {f.title.replace(/ —.*/, "")}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-bone/50">{f.summary[0]}</p>
                    <ul className="mt-6 space-y-2">
                      {f.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-bone/55">
                          <span className={`mt-0.5 font-mono ${accentText}`}>+</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/resume#projects"
                      className={`mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-all group-hover:gap-3 ${accentText}`}
                    >
                      Explore track
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Work */}
          <section id="work" className="relative border-t border-bone/10 px-5 py-20 sm:px-8">
            <div className="mx-auto max-w-7xl">
              <div data-reveal>
                <SectionHeading
                  eyebrow="02 — Selected work"
                  title="The index"
                  subtitle={`One resume, ${resume.projects.length} shipped builds. Filter by track and open any row for the full write-up.`}
                />
              </div>

              <div className="mb-8 flex flex-wrap items-center gap-2" data-reveal>
                {[
                  { key: "all" as const, label: "All" },
                  { key: "dotnet" as const, label: ".NET" },
                  { key: "python" as const, label: "Python / AI" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTrack(item.key)}
                    className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                      track === item.key
                        ? "bg-forest text-bone"
                        : "border border-bone/15 text-bone/50 hover:border-bone/30 hover:text-bone"
                    }`}
                  >
                    {item.label}
                    <span className="ml-2 opacity-50">
                      {item.key === "all"
                        ? resume.projects.length
                        : resume.projects.filter((p) => p.track === item.key).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-t border-bone/10">
                {projects.map((project, index) => (
                  <ProjectCard key={`${project.name}-${index}`} project={project} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* Toolkit */}
          <section className="relative border-t border-bone/10 py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <div data-reveal>
                <SectionHeading
                  eyebrow="03 — Toolkit"
                  title="Always in the loop."
                  subtitle="The stack I reach for when a problem needs shipping, not a slide deck."
                />
              </div>
            </div>

            <div className="mt-10 space-y-4">
              <div className="overflow-hidden">
                <div className="animate-marquee pause-on-hover flex w-max">
                  {[...skillTicker, ...skillTicker].map((skill, index) => (
                    <span
                      key={`a-${skill}-${index}`}
                      className="mx-1.5 inline-flex items-center gap-3 rounded-full border border-bone/10 bg-ink-soft px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-bone/55 transition hover:border-forest-soft/40 hover:text-forest-soft"
                    >
                      <span className="text-forest-soft/70">/</span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="animate-marquee-reverse pause-on-hover flex w-max">
                  {[...skillTicker, ...skillTicker].reverse().map((skill, index) => (
                    <span
                      key={`b-${skill}-${index}`}
                      className="mx-1.5 inline-flex items-center gap-3 rounded-full border border-bone/10 bg-ink-soft px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-bone/55 transition hover:border-oxblood-soft/40 hover:text-oxblood-soft"
                    >
                      <span className="text-oxblood-soft/70">/</span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-7xl px-5 sm:px-8">
              <div data-reveal className="grid gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
                {resume.skills.map((skill) => (
                  <div key={skill.label} className="group bg-ink p-5 transition hover:bg-ink-soft">
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-forest-soft">{skill.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-bone/45">{skill.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden bg-bone text-ink">
            <div className="pointer-events-none absolute inset-0 noise opacity-[0.04] mix-blend-multiply" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-oxblood/10" />
            <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
              <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div data-reveal>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-ink/45">04 — Next step</p>
                  <h2 className="mt-4 text-[clamp(3rem,8vw,6.5rem)] font-black uppercase leading-[0.85] tracking-[-0.045em]">
                    Let&apos;s build
                    <span className="text-oxblood">.</span>
                  </h2>
                  <p className="mt-6 max-w-md text-ink/60">
                    I&apos;m currently leading enterprise delivery at NIC Punjab and open to ambitious
                    .NET, Python and AI work. If it needs to ship, we should talk.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-forest ring-1 ring-ink/10" />
                      {expDotnet.years}+ yrs on .NET
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-oxblood" />
                      1 yr Python
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-ink/30" />
                      {expCareer.years}+ yrs overall
                    </span>
                  </div>
                </div>

                <div
                  data-reveal
                  className="rounded-[2rem] bg-ink p-6 text-bone shadow-[0_30px_80px_-30px_rgba(8,9,10,0.55)] sm:p-8"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                    Resume / PDF + DOCX
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight">Get the full story.</h3>
                  <p className="mt-2 text-sm text-bone/50">One page. Every role, project and stack.</p>
                  <div className="mt-6">
                    <DownloadResume />
                  </div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-bone/10 pt-4 text-[11px] text-bone/35">
                    <span>
                      Updated <DynamicDate />
                    </span>
                    <span className="text-bone/60">
                      <TotalExperience start="2021-07" className="text-bone" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollFX>
      </main>
      <Footer />
    </>
  );
}
