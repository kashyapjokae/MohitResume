"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function GeniePotReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const potScale = useTransform(scrollYProgress, [0, 0.1, 0.28], [1, 1.3, 0.85]);
  const potY = useTransform(scrollYProgress, [0, 0.1, 0.28], [0, -12, 25]);
  const potOpacity = useTransform(scrollYProgress, [0, 0.22, 0.38], [1, 0.98, 0]);
  const potRotate = useTransform(scrollYProgress, [0, 0.16], [0, -14]);

  const smoke1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.18], [0, 0.9, 0]);
  const smoke1Scale = useTransform(scrollYProgress, [0, 0.08], [0.3, 1.8]);
  const smoke1Y = useTransform(scrollYProgress, [0, 0.08], [0, -80]);
  const smoke1X = useTransform(scrollYProgress, [0, 0.08], [0, -10]);

  const smoke2Opacity = useTransform(scrollYProgress, [0, 0.09, 0.19], [0, 0.75, 0]);
  const smoke2Scale = useTransform(scrollYProgress, [0, 0.09], [0.25, 1.6]);
  const smoke2Y = useTransform(scrollYProgress, [0, 0.09], [0, -90]);
  const smoke2X = useTransform(scrollYProgress, [0, 0.09], [0, 12]);

  const smoke3Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0.6, 0]);
  const smoke3Scale = useTransform(scrollYProgress, [0, 0.1], [0.2, 1.4]);
  const smoke3Y = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const smoke3X = useTransform(scrollYProgress, [0, 0.1], [0, -4]);

  const glowOpacity = useTransform(scrollYProgress, [0, 0.06, 0.16], [0, 0.7, 0]);

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        style={{ scale: potScale, y: potY, opacity: potOpacity, rotate: potRotate }}
        className="pointer-events-none fixed bottom-6 right-6 z-[80] sm:bottom-8 sm:right-8"
      >
        <div className="relative">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -top-16 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-gradient-to-t from-fuchsia-300/40 via-cyan-300/30 to-transparent blur-2xl"
          />
          <motion.div
            style={{ opacity: smoke1Opacity, scale: smoke1Scale, y: smoke1Y, x: smoke1X }}
            className="absolute -top-28 left-1/2 -translate-x-1/2"
          >
            <div className="h-28 w-28 rounded-full bg-gradient-to-t from-fuchsia-400/50 via-violet-400/35 to-transparent blur-3xl" />
          </motion.div>
          <motion.div
            style={{ opacity: smoke2Opacity, scale: smoke2Scale, y: smoke2Y, x: smoke2X }}
            className="absolute -top-32 left-1/2 -translate-x-1/2"
          >
            <div className="h-32 w-32 rounded-full bg-gradient-to-t from-cyan-400/45 via-sky-400/30 to-transparent blur-3xl" />
          </motion.div>
          <motion.div
            style={{ opacity: smoke3Opacity, scale: smoke3Scale, y: smoke3Y, x: smoke3X }}
            className="absolute -top-36 left-1/2 -translate-x-1/2"
          >
            <div className="h-36 w-36 rounded-full bg-gradient-to-t from-indigo-400/40 via-purple-400/25 to-transparent blur-[40px]" />
          </motion.div>
          <div className="relative h-28 w-28 sm:h-34 sm:w-34">
            <div className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 rounded-b-[2.2rem] bg-gradient-to-b from-amber-500/98 via-amber-700/100 to-amber-950 shadow-[0_50px_90px_-30px_rgba(251,191,36,0.55)]" />
            <div className="absolute bottom-18 left-1/2 h-12 w-16 -translate-x-1/2 rounded-t-[1.6rem] bg-gradient-to-b from-amber-400/90 to-amber-600/95" />
            <div className="absolute bottom-28 left-1/2 h-4 w-12 -translate-x-1/2 rounded-full bg-amber-900/90" />
            <div className="absolute -top-1 left-1/2 h-8 w-18 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-300/85 to-amber-500/75 blur-[1px]" />
            <div className="absolute -top-4 left-1/2 h-4 w-14 -translate-x-1/2 rounded-full bg-amber-200/70 blur-[2px]" />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
