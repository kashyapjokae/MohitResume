"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadResume from "@/components/DownloadResume";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
];

function NavLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active
          ? "bg-white/15 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
          : "text-white/50 hover:bg-white/10 hover:text-white/80"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="no-print sticky top-3 z-50 px-3">
      <div className="glass mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            Mohit Kumar
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
          <DownloadResume compact />
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <DownloadResume compact />
          <button
            type="button"
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
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
        className="glass-deep mx-auto mt-2 hidden max-w-4xl rounded-3xl px-4 py-3 sm:hidden"
      >
        <div className="flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              active={pathname === href || (href !== "/" && pathname.startsWith(href))}
              onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
            />
          ))}
          <a
            href="/resume#projects"
            onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
            className="mt-2 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_12px_30px_-12px_rgba(79,70,229,0.9)]"
          >
            .NET &amp; Python Projects
          </a>
        </div>
      </div>
    </nav>
  );
}