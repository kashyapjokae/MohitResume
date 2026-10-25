export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  id?: string;
}) {
  return (
    <div id={id}>
      {eyebrow && (
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-forest-soft/70" />
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-forest-soft">{eyebrow}</p>
        </div>
      )}
      <h2 className="mt-4 max-w-3xl text-[clamp(2.4rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-bone">
        {title}
      </h2>
      {subtitle && <p className="mt-5 max-w-xl text-sm leading-relaxed text-bone/45 sm:text-base">{subtitle}</p>}
    </div>
  );
}
