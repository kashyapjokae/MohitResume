import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  BorderStyle,
} from "docx";
import type { CombinedResume, Job, AiProject, ProjectHighlight, SkillGroup, FocusSection } from "@/lib/types";
import { formatMonthYear } from "@/lib/experience";

const INK = "111827";
const MUTED = "6B7280";
const ACCENT = "4338CA";
const ACCENT_LIGHT = "C7D2FE";
const BODY = "1F2937";

const ACCENT_BORDER = {
  bottom: { color: ACCENT_LIGHT, size: 4, style: BorderStyle.SINGLE, space: 3 },
};

const HEADING_SPACING = { before: 280, after: 100 };
const BODY_SPACING = { after: 60 };

function heading(title: string) {
  return new Paragraph({
    spacing: HEADING_SPACING,
    border: ACCENT_BORDER,
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 22,
        color: ACCENT,
        font: "Calibri",
        characterSpacing: 20,
      }),
    ],
  });
}

function body(text: string) {
  return new Paragraph({
    spacing: BODY_SPACING,
    children: [
      new TextRun({ text, size: 19, color: BODY, font: "Calibri" }),
    ],
  });
}

function bullet(text: string) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: BODY_SPACING,
    children: [
      new TextRun({ text, size: 19, color: BODY, font: "Calibri" }),
    ],
  });
}

function meta(text: string) {
  return new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({ text, size: 18, color: MUTED, font: "Calibri" }),
    ],
  });
}

function tagLine(tags: string[]) {
  return new Paragraph({
    spacing: { after: 30 },
    children: [
      new TextRun({
        text: tags.join("  ·  "),
        size: 16,
        color: ACCENT,
        italics: true,
        font: "Calibri",
      }),
    ],
  });
}

function stackLine(value: string) {
  return new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({ text: "Stack: ", bold: true, size: 18, color: MUTED, font: "Calibri" }),
      new TextRun({ text: value, size: 18, color: MUTED, font: "Calibri" }),
    ],
  });
}

function nameLine(resume: CombinedResume) {
  return [
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: resume.name,
          bold: true,
          size: 48,
          color: INK,
          font: "Calibri",
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: resume.roleTitle,
          bold: true,
          size: 24,
          color: ACCENT,
          font: "Calibri",
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: resume.tagline, italics: true, size: 19, color: MUTED, font: "Calibri" }),
      ],
    }),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({ text: resume.contact.join("   |   "), size: 18, color: MUTED, font: "Calibri" }),
      ],
    }),
  ];
}

function buildFocus(focus: FocusSection[]) {
  const items: Paragraph[] = [];
  focus.forEach((f) => {
    items.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({ text: f.title, bold: true, size: 19, color: INK, font: "Calibri" }),
        ],
      })
    );
    f.highlights.forEach((h) => items.push(bullet(h)));
  });
  return items;
}

function buildJobs(jobs: Job[]) {
  const items: Paragraph[] = [];
  jobs.forEach((job) => {
    items.push(
      new Paragraph({
        spacing: { before: 100, after: 40 },
        children: [
          new TextRun({ text: job.title, bold: true, size: 21, color: INK, font: "Calibri" }),
        ],
      })
    );
    items.push(meta(`${job.company}${job.location ? ` | ${job.location}` : ""}`));
    items.push(
      meta(
        `${formatMonthYear(job.start)} – ${job.end ? formatMonthYear(job.end) : "Present"}`
      )
    );
    job.points.forEach((p) => items.push(bullet(p)));
    if (job.stack) items.push(stackLine(job.stack));
  });
  return items;
}

function buildAiProjects(aiProjects: AiProject[]) {
  const items: Paragraph[] = [];
  aiProjects.forEach((p) => {
    items.push(
      new Paragraph({
        spacing: { before: 100, after: 40 },
        children: [
          new TextRun({ text: p.name, bold: true, size: 21, color: INK, font: "Calibri" }),
        ],
      })
    );
    if (p.timeline) items.push(meta(p.timeline));
    items.push(meta(p.period));
    items.push(body(p.summary));
    if (p.details?.length) p.details.forEach((d) => items.push(bullet(d)));
  });
  return items;
}

function buildProjects(projects: ProjectHighlight[]) {
  const items: Paragraph[] = [];
  projects.forEach((p) => {
    items.push(
      new Paragraph({
        spacing: { before: 80, after: 40 },
        children: [
          new TextRun({ text: p.name, bold: true, size: 20, color: INK, font: "Calibri" }),
        ],
      })
    );
    items.push(meta(`${p.period}${p.org ? `  ·  ${p.org}` : ""}`));
    items.push(body(p.summary));
    if (p.tags.length) items.push(tagLine(p.tags));
  });
  return items;
}

function buildSkills(skills: SkillGroup[]) {
  const items: Paragraph[] = [];
  skills.forEach((s) => {
    items.push(
      new Paragraph({
        spacing: BODY_SPACING,
        children: [
          new TextRun({ text: `${s.label}: `, bold: true, size: 19, color: INK, font: "Calibri" }),
          new TextRun({ text: s.value, size: 19, color: BODY, font: "Calibri" }),
        ],
      })
    );
  });
  return items;
}

function buildEducation(edu: string[]) {
  return edu.map((e) => bullet(e));
}

function buildAchievements(ach: string[]) {
  return ach.map((a) => bullet(a));
}

function buildLanguages(lang: string) {
  return [body(lang)];
}

export async function generateDocx(resume: CombinedResume): Promise<Buffer> {
  const children = [
    ...nameLine(resume),
    heading("Professional Summary"),
    body(resume.summary),
    heading("Core Focus"),
    ...buildFocus(resume.focus),
    heading("Work Experience"),
    ...buildJobs(resume.jobs),
    heading("Python & AI Projects"),
    ...buildAiProjects(resume.aiProjects),
    heading("Key Projects"),
    ...buildProjects(resume.projects),
    heading("Technical Skills"),
    ...buildSkills(resume.skills),
    heading("Education"),
    ...buildEducation(resume.education),
    heading("Achievements"),
    ...buildAchievements(resume.achievements),
    heading("Languages"),
    ...buildLanguages(resume.languages),
  ];

  const doc = new Document({
    creator: resume.name,
    title: `${resume.name} Resume`,
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 19, color: BODY },
        },
      },
    },
    sections: [{ properties: {}, children }],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer as Buffer;
}