"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import DownloadResume from "@/components/DownloadResume";
import { TotalExperience, DynamicDate } from "@/components/Experience";
import { resume } from "@/lib/resume";
import { tenureBetween } from "@/lib/experience";
import { FadeIn, FadeInScale, Floating, HeroItem, HeroReveal, StaggerContainer, StaggerItem } from "@/components/Motion";
import { motion } from "framer-motion";

export default function Home() {
  const dotnetCount = resume.projects.filter((p) => p.track === "dotnet").length;
  const pythonCount = resume.projects.filter((p) => p.track === "python").length;
  const expDotnet = tenureBetween("2024-06");
  const expCareer = tenureBetween("2021-07");

  const genie = {
    hidden: { opacity: 0, scale: 0.8, y: 60, x: -40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  const genieRight = {
    hidden: { opacity: 0, scale: 0.8, y: 60, x: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="aurora-bg relative min-h-screen overflow-hidden">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <Floating className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-[120px]" />
          <Floating className="absolute -top-20 right-[-10rem] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/18 blur-[140px]" style={{ animationDelay: "2s" } as React.CSSProperties} />
          <Floating className="absolute bottom-[-20rem] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/16 blur-[160px]" style={{ animationDelay: "4s" } as React.CSSProperties} />
        </div>
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 relative">
          {/* Hero */}
          <section className="mb-24 text-center">
            <HeroReveal>
              <HeroItem>
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="glass-capsule rounded-full px-4 py-1.5 text-xs font-bold text-indigo-200">
                    .NET Enterprise
                  </span>
                  <span className="glass-capsule rounded-full px-4 py-1.5 text-xs font-bold text-teal-200">
                    Python &amp; AI
                  </span>
                </div>
              </HeroItem>
              <HeroItem>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
                  Full Stack Software Engineer
                </p>
              </HeroItem>
              <HeroItem>
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                  <span className="bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
                    Mohit Kumar
                  </span>
                </h1>
              </HeroItem>
              <HeroItem>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
                  Building enterprise-scale applications for Government of Punjab NIC projects.
                  .NET backend leadership with Python/FastAPI &amp; AI-powered products on the side.
                </p>
              </HeroItem>

              <HeroItem>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <div className="glass flex items-center gap-3 rounded-3xl px-5 py-3 text-sm text-white/70">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/60" />
                    <span className="text-white/50">Total Experience:</span>
                    <TotalExperience start="2021-07" className="text-white" />
                  </div>
                  <div className="glass rounded-3xl px-5 py-3 text-sm text-white/70">
                    <span className="text-white/50">Current role: </span>
                    <span className="font-semibold text-white">{expDotnet.years}+ yr</span>
                    <span className="text-white/50"> · Last updated: </span>
                    <DynamicDate className="tabular-nums text-white/70" />
                  </div>
                </div>
              </HeroItem>

              <HeroItem>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/resume"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-1px_1px_rgba(255,255,255,0.1),0_20px_45px_-15px_rgba(79,70,229,0.9),0_0_35px_-12px_rgba(56,189,248,0.7)] transition hover:-translate-y-0.5 hover:brightness-110"
                  >
                    View My Resume
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
              <Link
                href="#projects"
                className="glass-capsule inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:bg-white/15"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("projects");
                  if (el) {
                    const navOffset = 80;
                    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Jump to Projects
              </Link>
                </div>
              </HeroItem>

              <HeroItem>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <DownloadResume compact />
                </div>
              </HeroItem>
            </HeroReveal>
          </section>

          {/* Focus areas */}
          <section className="mb-24 grid gap-5 sm:grid-cols-2">
            <StaggerContainer className="contents">
              {resume.focus.map((f) => (
                <StaggerItem key={f.key}>
                  <div className="glass h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.09] hover:shadow-[0_40px_80px_-40px_rgba(99,102,241,0.6)]">
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className={`glass-capsule rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                          f.key === "dotnet" ? "text-indigo-200" : "text-teal-200"
                        }`}
                      >
                        {f.badge}
                      </span>
                      <h3 className="text-lg font-bold text-white">{f.title.replace(/ —.*/, "")}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-white/60">{f.summary[0]}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {f.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[11px] text-white/60 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.12] hover:text-white/80"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-24 scroll-mt-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div variants={genie}>
                <SectionHeading
                  eyebrow="Featured Work"
                  title="Key Projects Highlights"
                  subtitle={`All projects from a single resume — ${dotnetCount} .NET enterprise projects and ${pythonCount} Python/AI hands-on projects.`}
                />
              </motion.div>
              <motion.div variants={genie} className="mb-6 flex flex-wrap justify-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.8)]" /> .NET projects
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.8)]" /> Python projects
                </span>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.14,
                    },
                  },
                }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {resume.projects.map((p) => (
                  <motion.div
                    key={p.name}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        scale: 0.55,
                        y: 90,
                        rotateX: 30,
                        filter: "blur(14px)",
                        transformOrigin: "bottom center",
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                        transformOrigin: "bottom center",
                        transition: {
                          type: "spring" as const,
                          stiffness: 130,
                          damping: 14,
                          mass: 0.9,
                        },
                      },
                    }}
                    style={{ perspective: 1400, transformStyle: "preserve-3d" }}
                  >
                    <ProjectCard project={p} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Skills */}
          <section className="mb-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
            >
              <motion.div variants={genie}>
                <SectionHeading
                  eyebrow="Expertise"
                  title="Technical Skills"
                  subtitle="A full-stack toolkit spanning .NET, Python, React, PostgreSQL, Docker, Kubernetes, and cloud platforms."
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {resume.skills.map((skill) => (
                  <motion.div
                    key={skill.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                      hidden: {
                        opacity: 0,
                        scale: 0.55,
                        y: 90,
                        rotateX: 28,
                        filter: "blur(12px)",
                        transformOrigin: "bottom center",
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotateX: 0,
                        filter: "blur(0px)",
                        transformOrigin: "bottom center",
                        transition: {
                          type: "spring" as const,
                          stiffness: 135,
                          damping: 15,
                          mass: 0.9,
                        },
                      },
                    }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    style={{ perspective: 1100, transformStyle: "preserve-3d" }}
                  >
                    <div className="glass h-full rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.09]">
                      <h3 className="text-sm font-bold text-sky-300">{skill.label}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{skill.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Download CTA */}
          <section className="mb-6">
            <FadeIn>
              <SectionHeading eyebrow="Resume" title="Download Full Resume" subtitle="PDF and Word versions of the complete single-page resume." />
            </FadeIn>
            <FadeInScale delay={0.1}>
              <div className="glass relative mx-auto max-w-xl overflow-hidden rounded-[2rem] p-8 text-center">
                <div className="pointer-events-none absolute -top-20 -left-16 h-56 w-56 rounded-full bg-sky-500/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-fuchsia-500/25 blur-3xl" />
                <p className="relative mb-2 text-sm text-white/50">
                  {expCareer.years}+ years experience · .NET + Python &amp; AI
                </p>
                <div className="relative flex flex-wrap justify-center gap-3">
                  <DownloadResume />
                </div>
              </div>
            </FadeInScale>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}