export interface PageContent {
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  cvUrl: string;
}

// import { StaticImageData } from "next/image";

export interface Project {
  category: string;
  name: string;
  imageUrl: string;
  link: string;
}
