import PDFDocument from "pdfkit";
import type { CombinedResume } from "@/lib/types";
import { formatMonthYear } from "@/lib/experience";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 46;
const INK = "#111827";
const BODY = "#1f2937";
const MUTED = "#6b7280";
const ACCENT = "#4338ca";
const ACCENT_LIGHT = "#c7d2fe";

function ensureSpace(doc: PDFKit.PDFDocument, needed: number) {
  if (doc.y + needed > PAGE_H - M) doc.addPage();
}

function rule(doc: PDFKit.PDFDocument) {
  const y = doc.y + 3;
  doc.moveTo(M, y).lineTo(PAGE_W - M, y).lineWidth(0.6).strokeColor(ACCENT_LIGHT).stroke();
  doc.y = y + 7;
}

function heading(doc: PDFKit.PDFDocument, title: string) {
  ensureSpace(doc, 60);
  doc.moveDown(0.55);
  doc.font("Helvetica-Bold").fontSize(11).fillColor(ACCENT).text(title.toUpperCase(), {
    characterSpacing: 0.6,
    lineGap: 0,
  });
  rule(doc);
}

function body(doc: PDFKit.PDFDocument, text: string) {
  doc.font("Helvetica").fontSize(9.5).fillColor(BODY).text(text, {
    width: PAGE_W - 2 * M,
    lineGap: 1.8,
  });
}

function bullets(doc: PDFKit.PDFDocument, items: string[]) {
  doc.font("Helvetica").fontSize(9).fillColor(BODY).list(items, {
    bulletIndent: 8,
    textIndent: 12,
    lineGap: 1,
    width: PAGE_W - 2 * M - 4,
  });
}

function meta(doc: PDFKit.PDFDocument, text: string) {
  doc.font("Helvetica").fontSize(8.5).fillColor(MUTED).text(text, {
    lineGap: 0.8,
    width: PAGE_W - 2 * M,
  });
}

function stack(doc: PDFKit.PDFDocument, value: string) {
  doc.font("Helvetica-Bold").fontSize(8.5).fillColor(MUTED).text("Stack: ", { continued: true });
  doc.font("Helvetica").fillColor(MUTED).text(value);
}

function header(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  doc.font("Helvetica-Bold").fontSize(23).fillColor(INK).text(resume.name, { characterSpacing: 0.4 });
  doc.font("Helvetica-Bold").fontSize(12).fillColor(ACCENT).text(resume.roleTitle, { lineGap: 1 });
  doc.font("Helvetica").fontSize(9.5).fillColor(MUTED).text(resume.tagline, { lineGap: 1 });
  doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(resume.contact.join("   |   "), { lineGap: 1 });
  doc.moveDown(0.3);
  rule(doc);
}

function summary(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Professional Summary");
  body(doc, resume.summary);
}

function focus(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Core Focus");
  resume.focus.forEach((f) => {
    ensureSpace(doc, 28);
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor(INK).text(f.title, { lineGap: 0.5 });
    bullets(doc, f.highlights);
  });
}

function experience(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Work Experience");
  resume.jobs.forEach((job) => {
    ensureSpace(doc, 44);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(INK).text(job.title, { lineGap: 0.5 });
    meta(doc, `${job.company}${job.location ? ` | ${job.location}` : ""}`);
    meta(doc, formatMonthYear(job.start) + " – " + (job.end ? formatMonthYear(job.end) : "Present"));
    doc.moveDown(0.15);
    bullets(doc, job.points);
    if (job.stack) {
      doc.moveDown(0.1);
      stack(doc, job.stack);
    }
    doc.moveDown(0.4);
  });
}

function aiProjects(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  if (!resume.aiProjects.length) return;
  heading(doc, "Python & AI Projects");
  resume.aiProjects.forEach((p) => {
    ensureSpace(doc, 36);
    doc.font("Helvetica-Bold").fontSize(10).fillColor(INK).text(p.name, { lineGap: 0.5 });
    meta(doc, p.timeline ?? p.org);
    meta(doc, p.period);
    doc.moveDown(0.1);
    body(doc, p.summary);
    if (p.details && p.details.length) {
      doc.moveDown(0.1);
      bullets(doc, p.details);
    }
    doc.moveDown(0.35);
  });
}

function projects(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Key Projects");
  resume.projects.forEach((p) => {
    ensureSpace(doc, 30);
    doc.font("Helvetica-Bold").fontSize(9.75).fillColor(INK).text(p.name, { lineGap: 0.5 });
    meta(doc, `${p.period}${p.org ? `  ·  ${p.org}` : ""}`);
    body(doc, p.summary);
    if (p.tags.length) {
      doc
        .font("Helvetica-Oblique")
        .fontSize(8)
        .fillColor(ACCENT)
        .text(p.tags.join("  ·  "), { lineGap: 0 });
    }
    doc.moveDown(0.35);
  });
}

function skills(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Technical Skills");
  resume.skills.forEach((s) => {
    ensureSpace(doc, 18);
    doc.font("Helvetica-Bold").fontSize(9).fillColor(INK).text(`${s.label}: `, { continued: true });
    doc.font("Helvetica").fontSize(9).fillColor(BODY).text(s.value, {
      width: PAGE_W - 2 * M,
      lineGap: 0.8,
    });
    doc.moveDown(0.05);
  });
}

function education(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Education");
  bullets(doc, resume.education);
}

function achievements(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Achievements");
  bullets(doc, resume.achievements);
}

function languages(doc: PDFKit.PDFDocument, resume: CombinedResume) {
  heading(doc, "Languages");
  body(doc, resume.languages);
}

export function generatePdf(resume: CombinedResume): Promise<Buffer> {
  const doc = new PDFDocument({
    size: "A4",
    margin: M,
    info: { Title: `${resume.name} Resume`, Author: resume.name },
    bufferPages: false,
  });

  const chunks: Uint8Array[] = [];
  doc.on("data", (c: Uint8Array) => chunks.push(c));
  const done = new Promise<Buffer>((resolve) =>
    doc.on("end", () => resolve(Buffer.concat(chunks)))
  );

  header(doc, resume);
  summary(doc, resume);
  focus(doc, resume);
  experience(doc, resume);
  aiProjects(doc, resume);
  projects(doc, resume);
  skills(doc, resume);
  education(doc, resume);
  achievements(doc, resume);
  languages(doc, resume);

  doc.end();
  return done;
}