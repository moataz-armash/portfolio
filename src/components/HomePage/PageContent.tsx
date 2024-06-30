import { useEffect, useState } from "react";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import { fetchPageContent } from "../../services/api";
import { PageContent as PageContentType } from "../../types";
import { DEFAULT_PAGE_CONTENT } from "../../utils/constants";

const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="hero">
      <div className="hero-video-box skeleton-video"></div>
      <div className="hero-text-box">
        <div className="heading-secondary skeleton-subtitle"></div>
        <div className="heading-primary skeleton-title"></div>
        <div className="hero-description skeleton-description"></div>
        <div className="buttons">
          <div className="btn btn--full skeleton-button"></div>
          <div className="btn btn--outline skeleton-button"></div>
          <div className="btn btn--outline skeleton-button"></div>
        </div>
      </div>
    </div>
  </div>
);

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

  const { title, subtitle, description, videoUrl, cvUrl } = pageContent;

  return (
    <main>
      <section className="section-hero">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
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
                    My CV
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default PageContent;
