"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;

    const tick = () => {
      x += (targetX - x) * 0.14;
      y += (targetY - y) * 0.14;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      if (Math.abs(targetX - x) > 0.4 || Math.abs(targetY - y) > 0.4) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full opacity-70 mix-blend-screen blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(127,191,160,0.12) 0%, rgba(209,143,143,0.08) 38%, transparent 68%)",
      }}
    />
  );
}
