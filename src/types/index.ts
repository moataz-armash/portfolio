export interface PageContent {
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  cvUrl: string;
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
}
