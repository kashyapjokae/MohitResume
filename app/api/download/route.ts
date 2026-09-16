import { resume } from "@/lib/resume";
import { generatePdf } from "@/lib/download/pdf";
import { generateDocx } from "@/lib/download/docx";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const format = url.searchParams.get("format") === "docx" ? "docx" : "pdf";

  if (format === "docx") {
    const buffer = await generateDocx(resume);
    const body = new Uint8Array(buffer);
    return new Response(body, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="Mohit_Kumar_Resume.docx"',
        "Content-Length": String(buffer.byteLength),
      },
    });
  }

  const buffer = await generatePdf(resume);
  const body = new Uint8Array(buffer);
  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Mohit_Kumar_Resume.pdf"',
      "Content-Length": String(buffer.byteLength),
    },
  });
}