"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GenieScrollReveal({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom start",
          scrub: 0.4,
        },
      });

      tl.fromTo(
        potRef.current,
        { scale: 1, y: 0, rotate: 0, opacity: 1 },
        { scale: 0.8, y: 30, rotate: -10, opacity: 0.9, ease: "power2.out" }
      )
        .to(
          potRef.current,
          { scale: 0.6, y: 60, opacity: 0, ease: "power2.in" },
          "-=0.3"
        )
        .fromTo(
          smokeRef.current,
          { opacity: 0, scale: 0.4, y: 0 },
          { opacity: 0.9, scale: 1.8, y: -120, ease: "power2.out" },
          0
        )
        .to(
          smokeRef.current,
          { opacity: 0, scale: 2.2, y: -200, ease: "power2.in" },
          0.4
        );

      const items = gsap.utils.toArray<HTMLElement>("[data-genie-item]");

      const reveal = (item: HTMLElement, delay = 0) =>
        gsap.to(item, {
          opacity: 1,
          scale: 1,
          y: 0,
          x: 0,
          rotation: 0,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.6,
          delay,
          overwrite: true,
          onComplete: () => gsap.set(item, { willChange: "auto" }),
        });

      items.forEach((item, index) => {
        gsap.set(item, {
          opacity: 0,
          scale: 0.55,
          y: 60,
          x: 60,
          rotation: 6,
          filter: "blur(10px)",
          transformOrigin: "bottom right",
          willChange: "transform, opacity, filter",
        });

        const rect = item.getBoundingClientRect();
        const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (alreadyInView) {
          reveal(item, index * 0.08);
          return;
        }

        ScrollTrigger.create({
          trigger: item,
          start: "top bottom-=40",
          once: true,
          onEnter: () => reveal(item),
        });
      });
    }, wrapperRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    const t = setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div
        ref={potRef}
        className="pointer-events-none fixed bottom-6 right-6 z-[90] sm:bottom-8 sm:right-8"
      >
        <div className="relative">
          <div className="relative h-32 w-32 sm:h-36 sm:w-36">
            <div className="absolute bottom-0 left-1/2 h-22 w-22 -translate-x-1/2 rounded-b-[2.4rem] bg-gradient-to-b from-amber-500/98 via-amber-700/100 to-amber-950 shadow-[0_60px_100px_-35px_rgba(251,191,36,0.6)]" />
            <div className="absolute bottom-20 left-1/2 h-14 w-18 -translate-x-1/2 rounded-t-[1.8rem] bg-gradient-to-b from-amber-400/92 to-amber-600/98" />
            <div className="absolute bottom-32 left-1/2 h-5 w-14 -translate-x-1/2 rounded-full bg-amber-900/95" />
            <div className="absolute -top-2 left-1/2 h-9 w-20 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-300/90 to-amber-500/80 blur-[1px]" />
            <div className="absolute -top-6 left-1/2 h-5 w-16 -translate-x-1/2 rounded-full bg-amber-200/75 blur-[3px]" />
          </div>
        </div>
      </div>

      <div
        ref={smokeRef}
        className="pointer-events-none fixed bottom-24 right-10 z-[89] opacity-0 sm:bottom-28 sm:right-14"
      >
        <div className="relative">
          <div className="h-40 w-40 rounded-full bg-gradient-to-t from-fuchsia-400/60 via-violet-400/40 to-transparent blur-[60px]" />
          <div className="absolute left-10 top-[-30px] h-32 w-32 rounded-full bg-gradient-to-t from-cyan-400/55 via-sky-400/35 to-transparent blur-[50px]" />
          <div className="absolute left-[-20px] top-[-40px] h-36 w-36 rounded-full bg-gradient-to-t from-indigo-400/50 via-purple-400/30 to-transparent blur-[60px]" />
        </div>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
