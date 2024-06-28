import { useEffect, useState } from "react";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import { fetchPageContent } from "../../services/api";
import { PageContent as PageContentType } from "../../types";
import { DEFAULT_PAGE_CONTENT } from "../../utils/constants";

const PageContent: React.FC = () => {
  const [pageContent, setPageContent] =
    useState<PageContentType>(DEFAULT_PAGE_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPageContent = async () => {
      try {
        const content = await fetchPageContent();
        setPageContent(content);
      } catch (error) {
        console.error("Error loading page content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageContent();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { title, subtitle, description, videoUrl, cvUrl } = pageContent;

  return (
    <main>
      <section className="section-hero">
        <div className="hero">
          <div className="hero-video-box">
            {videoUrl && <VideoPlayer publicId={videoUrl} />}
          </div>
          <div className="hero-text-box">
            <div className="heading-secondary">{subtitle}</div>
            <h1 className="heading-primary">{title}</h1>
            <div className="hero-description">{description}</div>
            <div className="buttons">
              <Link href="/portfolio" className="btn btn--full">
                Portfolio
              </Link>
              <Link href="/contact" className="btn btn--outline">
                Contact
              </Link>
              {cvUrl && (
                <a
                  href={cvUrl}
                  className="btn btn--outline"
                  target="_blank"
                  rel="noopener noreferrer">
                  View My CV
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PageContent;
