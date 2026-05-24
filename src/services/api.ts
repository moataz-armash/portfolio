import axios from "axios";
import { PageContent, Project, AboutContent } from "../types";

const defaultAboutContent: AboutContent = {
  pageTitle: "Full Stack & Security",
  whatIDoTitle: "what do i do?",
  items: [
    {
      icon: "pen-nib",
      title: "Design to Code",
      description:
        "Started as a frontend dev converting Figma designs into precise HTML, CSS, and JavaScript — pixel-perfect and responsive.",
    },
    {
      icon: "layer-group",
      title: "Full Stack Development",
      description:
        "Evolved into full stack, building end-to-end apps with React, Next.js, Node.js, and Firebase.",
    },
    {
      icon: "shield-halved",
      title: "Security & Bug Hunting",
      description:
        "Now shifting into cybersecurity — exploring web vulnerabilities, CTF challenges, and bug bounty hunting.",
    },
  ],
  skillsTitle: "Coding skills",
  skills: [
    { name: "HTML", percentage: 100 },
    { name: "CSS / SCSS", percentage: 90 },
    { name: "JavaScript", percentage: 90 },
    { name: "TypeScript", percentage: 85 },
    { name: "React / Next.js", percentage: 85 },
    { name: "Node.js", percentage: 75 },
    { name: "Web Security", percentage: 60 },
  ],
};

const homepageApi =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://portfolio-9dc44-default-rtdb.firebaseio.com/";

export const fetchPageContent = async (): Promise<PageContent | null> => {
  try {
    const response = await axios.get<PageContent | null>(
      `${homepageApi}/pageContent.json`,
    );
    return response.data;
  } catch {
    return null;
  }
};

export const updatePageContent = async (
  content: PageContent,
): Promise<void> => {
  await axios.put(`${homepageApi}/pageContent.json`, content);
};

export const fetchBrandName = async (): Promise<string> => {
  try {
    const res = await axios.get<string | null>(
      `${homepageApi}/pageContent/brandName.json`,
    );
    return res.data || "MotazSec";
  } catch {
    return "MotazSec";
  }
};

const projectsApi =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://portfolio-9dc44-default-rtdb.firebaseio.com/";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Record<string, Project> | null>(
      `${projectsApi}/projects.json`,
    );
    if (!response.data) return [];
    return Object.entries(response.data).map(([id, project]) => ({
      ...project,
      id,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const addProject = async (
  project: Omit<Project, "id">,
): Promise<string> => {
  const response = await axios.post<{ name: string }>(
    `${projectsApi}/projects.json`,
    project,
  );
  return response.data.name;
};

export const updateProject = async (
  id: string,
  project: Omit<Project, "id">,
): Promise<void> => {
  await axios.patch(`${projectsApi}/projects/${id}.json`, project);
};

export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete(`${projectsApi}/projects/${id}.json`);
};

export const fetchAboutContent = async (): Promise<AboutContent> => {
  try {
    const response = await axios.get<AboutContent | null>(
      `${homepageApi}/aboutContent.json`,
    );
    return response.data ?? defaultAboutContent;
  } catch {
    return defaultAboutContent;
  }
};

export const updateAboutContent = async (
  content: AboutContent,
): Promise<void> => {
  await axios.put(`${homepageApi}/aboutContent.json`, content);
};
