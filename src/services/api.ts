import axios from "axios";
import { PageContent } from "../types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://portfolio-9dc44-default-rtdb.firebaseio.com/";

export const fetchPageContent = async (): Promise<PageContent> => {
  try {
    const response = await axios.get<PageContent>(
      `${API_URL}/pageContent.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching page content:", error);
    throw error;
  }
};
