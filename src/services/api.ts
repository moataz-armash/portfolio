import axios from "axios";
import { PageContent } from "../types";
import { Project } from "../types";

const homepageApi =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://portfolio-9dc44-default-rtdb.firebaseio.com/";

export const fetchPageContent = async (): Promise<PageContent> => {
  try {
    const response = await axios.get<PageContent>(
      `${homepageApi}/pageContent.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching page content:", error);
    throw error;
  }
};

const projectsApi =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://portfolio-9dc44-default-rtdb.firebaseio.com/";

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await axios.get<Record<string, Project> | null>(
      `${projectsApi}/projects.json`
    );
    if (!response.data) return [];
    return Object.entries(response.data).map(([id, project]) => ({ ...project, id }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const addProject = async (project: Omit<Project, "id">): Promise<string> => {
  const response = await axios.post<{ name: string }>(
    `${projectsApi}/projects.json`,
    project
  );
  return response.data.name;
};

export const updateProject = async (id: string, project: Omit<Project, "id">): Promise<void> => {
  await axios.patch(`${projectsApi}/projects/${id}.json`, project);
};

export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete(`${projectsApi}/projects/${id}.json`);
};
