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
    <div id={id} className="mb-10 text-center">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-white/50">{subtitle}</p>}
    </div>
  );
}