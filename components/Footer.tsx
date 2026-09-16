import VisitorCounter from "@/components/VisitorCounter";

export default function Footer() {
  return (
    <footer className="no-print border-t border-white/10 bg-white/[0.02] py-8 backdrop-blur-2xl">
      <div className="mx-auto max-w-5xl space-y-3 px-6 text-center text-sm text-white/30">
        <p>
          © {new Date().getFullYear()} Mohit Kumar · Built with Next.js &amp; Tailwind CSS
        </p>
        <VisitorCounter />
      </div>
    </footer>
  );
}