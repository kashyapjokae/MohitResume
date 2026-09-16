export type Track = "dotnet" | "python";

export interface Job {
  title: string;
  company: string;
  location?: string;
  start: string;
  end?: string;
  points: string[];
  stack?: string;
}

export interface ProjectHighlight {
  name: string;
  period: string;
  org: string;
  summary: string;
  tags: string[];
  track: Track;
}

export interface AiProject extends ProjectHighlight {
  timeline?: string;
  details?: string[];
}

export interface PersonalProject {
  name: string;
  period: string;
  points: string[];
}

export interface SkillGroup {
  label: string;
  value: string;
}

export interface FocusSection {
  key: Track;
  title: string;
  badge: string;
  summary: string[];
  highlights: string[];
}

export interface CombinedResume {
  name: string;
  roleTitle: string;
  tagline: string;
  contact: string[];
  summary: string;
  focus: FocusSection[];
  skills: SkillGroup[];
  jobs: Job[];
  projects: ProjectHighlight[];
  aiProjects: AiProject[];
  personalProjects: PersonalProject[];
  education: string[];
  achievements: string[];
  languages: string;
  downloads: { label: string; href: string; kind: "pdf" | "docx" }[];
  careerStart: string;
}