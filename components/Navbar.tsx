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
      <div className="glass mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2">
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
          <a
            href="https://www.linkedin.com/in/mohitkumarjokae"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://wa.me/917015325817"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.19-.3a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.1-.25-.16-.54-.28-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.91 1.1-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.28-.02-.43.12-.57.13-.13.29-.34.43-.51.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.48-.16-.01-.34-.01-.52-.01Z" />
            </svg>
            WhatsApp
          </a>
          <DownloadResume compact />
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          <a
            href="https://www.linkedin.com/in/mohitkumarkojae"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="LinkedIn"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
          <a
            href="https://wa.me/917015325817"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="WhatsApp"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.19-.3a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.1-.25-.16-.54-.28-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.91 1.1-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.28-.02-.43.12-.57.13-.13.29-.34.43-.51.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.48-.16-.01-.34-.01-.52-.01Z" />
            </svg>
          </a>
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
        className="glass-deep mx-auto mt-2 hidden max-w-5xl rounded-3xl px-4 py-3 sm:hidden"
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
            href="https://www.linkedin.com/in/mohitkumarkojae"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
            className="mt-1 rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://wa.me/917015325817"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => document.getElementById("mobile-menu")?.classList.add("hidden")}
            className="rounded-full px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            WhatsApp
          </a>
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