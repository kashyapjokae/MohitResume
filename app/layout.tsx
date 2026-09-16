import "./globals.css";

export const metadata = {
  title: "Mohit Kumar | Full Stack Software Engineer",
  description:
    "Portfolio of Mohit Kumar — Full Stack .NET Developer & Software Engineer with 5+ years building enterprise applications for Govt. of Punjab NIC projects. View resumes, projects, skills and downloads.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-zinc-950 font-sans text-zinc-100">
        {children}
      </body>
    </html>
  );
}