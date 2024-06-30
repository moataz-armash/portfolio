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
    const response = await axios.get<Record<string, Project>>(
      `${projectsApi}/projects.json`
    );
    // Convert the object to an array
    return Object.values(response.data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
