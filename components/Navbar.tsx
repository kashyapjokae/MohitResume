"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import DownloadResume from "@/components/DownloadResume";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohitkumarjokae",
    hover: "hover:border-forest-soft/50 hover:text-forest-soft",
    icon: (
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917015325817",
    hover: "hover:border-oxblood-soft/50 hover:text-oxblood-soft",
    icon: (
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.19-.3a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.1-.25-.16-.54-.28-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.91 1.1-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.28-.02-.43.12-.57.13-.13.29-.34.43-.51.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.48-.16-.01-.34-.01-.52-.01Z" />
    ),
  },
];

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
        active ? "bg-forest text-bone" : "text-bone/50 hover:bg-bone/5 hover:text-bone"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-forest via-bone to-oxblood"
      />
      <nav className="no-print sticky top-3 z-50 px-3">
        <div className="glass mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full py-2 pl-2 pr-2 backdrop-blur-xl sm:pl-3">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-forest font-mono text-xs font-black text-bone transition group-hover:rotate-[-8deg]">
              MK
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-bone sm:block">
              Mohit Kumar
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-bone/30 md:block">
              / Full Stack Engineer
            </span>
          </Link>

          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                active={pathname === href || (href !== "/" && pathname.startsWith(href))}
              />
            ))}
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`ml-1 inline-flex items-center gap-2 rounded-full border border-bone/10 px-3 py-2 text-[11px] font-medium text-bone/55 transition ${social.hover}`}
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  {social.icon}
                </svg>
                <span className="hidden lg:inline">{social.label}</span>
              </a>
            ))}
            <div className="ml-2">
              <DownloadResume compact />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:hidden">
            <DownloadResume compact />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/10 text-bone/70 transition hover:border-forest-soft/40 hover:text-forest-soft"
              onClick={() => setOpen((value) => !value)}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="glass mx-auto mt-2 max-w-7xl rounded-3xl p-3 sm:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  active={pathname === href || (href !== "/" && pathname.startsWith(href))}
                  onClick={() => setOpen(false)}
                />
              ))}
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55 transition ${social.hover}`}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon}
                  </svg>
                  {social.label}
                </a>
              ))}
              <Link
                href="/resume#projects"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-oxblood px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-bone"
              >
                Browse the project index
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
