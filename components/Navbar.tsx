"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadResume from "@/components/DownloadResume";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="no-print sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Mohit Kumar
          </span>
        </Link>
        <div className="hidden items-center gap-1 sm:flex">
          {navLinks.map(({ href, label }) => {
            const active =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <DownloadResume compact />
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <DownloadResume compact />
          <button
            type="button"
            aria-label="Menu"
            className="text-white/60 hover:text-white"
            onClick={() => {
              document.getElementById("mobile-menu")?.classList.toggle("hidden");
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        className="hidden border-t border-white/10 bg-zinc-950/95 px-6 pb-4 pt-2 backdrop-blur-xl sm:hidden"
      >
        {navLinks.map(({ href, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              {label}
            </Link>
          );
        })}
        <a
          href="/resume#projects"
          onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
          className="mt-2 block rounded-lg bg-indigo-600/90 px-3 py-2 text-center text-sm font-semibold text-white"
        >
          .NET &amp; Python Projects
        </a>
      </div>
    </nav>
  );
}