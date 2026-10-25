import Link from "next/link";
import VisitorCounter from "@/components/VisitorCounter";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohitkumarjokae",
    icon: (
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917015325817",
    icon: (
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.19-.3a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.1-.25-.16-.54-.28-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.74.91-.91 1.1-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.28-.02-.43.12-.57.13-.13.29-.34.43-.51.15-.17.2-.28.3-.47.1-.19.05-.36-.02-.51-.07-.14-.64-1.54-.88-2.1-.23-.56-.47-.48-.64-.48-.16-.01-.34-.01-.52-.01Z" />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="no-print relative overflow-hidden border-t border-bone/10 bg-ink">
      <div className="overflow-hidden border-b border-bone/10 py-8">
        <div className="animate-marquee pause-on-hover flex w-max">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-8 px-8 text-[clamp(2.5rem,7vw,5rem)] font-black uppercase leading-none tracking-[-0.04em]"
                >
                  <span className={item % 2 === 0 ? "text-bone" : "text-outline-bone"}>Let&apos;s talk</span>
                  <span className="text-oxblood-soft">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">Say hello</p>
            <a
              href="mailto:mohitkumarjokae@gmail.com"
              className="mt-3 inline-block break-all text-2xl font-bold tracking-tight text-bone transition hover:text-forest-soft"
            >
              mohitkumarjokae@gmail.com
            </a>
            <a
              href="tel:+917015325817"
              className="mt-1 block font-mono text-sm text-bone/45 transition hover:text-bone"
            >
              +91 7015325817
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/35">
              Based in Shahbad, Kurukshetra, Haryana. Leading enterprise delivery at NIC Punjab and open to
              ambitious .NET, Python and AI work.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">Index</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              <Link href="/" className="text-bone/55 transition hover:translate-x-1 hover:text-forest-soft">
                Home
              </Link>
              <Link href="/resume" className="text-bone/55 transition hover:translate-x-1 hover:text-forest-soft">
                Resume
              </Link>
              <Link
                href="/resume#projects"
                className="text-bone/55 transition hover:translate-x-1 hover:text-forest-soft"
              >
                Project index
              </Link>
              <a
                href="/api/download?format=pdf"
                className="text-bone/55 transition hover:translate-x-1 hover:text-forest-soft"
              >
                Download PDF
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">Elsewhere</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-bone/55 transition hover:text-oxblood-soft"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-bone/10 transition group-hover:border-oxblood-soft/40">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      {social.icon}
                    </svg>
                  </span>
                  {social.label}
                </a>
              ))}
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/25">
                mohitjokae.vercel.app
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-6 text-[11px] text-bone/30">
          <p>
            © {new Date().getFullYear()} <span className="text-bone/60">Mohit Kumar</span>
            <span className="mx-2 text-bone/15">·</span>
            Built with Next.js &amp; Tailwind CSS
          </p>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}
