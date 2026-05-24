export interface PageContent {
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  cvUrl: string;
  brandName?: string;
}

// import { StaticImageData } from "next/image";

export interface Project {
  id?: string;
  category: string;
  name: string;
  imageUrl: string;
  link: string;
  description?: string;
  mainStack?: string;
  techStack?: Record<string, string>;
  createdAt?: number;
}

export interface AboutSkillItem {
  icon: string;
  title: string;
  description: string;
}

export interface AboutSkillBar {
  name: string;
  percentage: number;
}

export interface AboutContent {
  pageTitle: string;
  whatIDoTitle: string;
  items: AboutSkillItem[];
  skillsTitle: string;
  skills: AboutSkillBar[];
}
