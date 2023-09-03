import dynamic from "next/dynamic";
import VideoPlayer from "./VideoPlayer";
import Link from "next/link";
import { useEffect } from "react";
function PageContent() {
  const video =
    "https://res.cloudinary.com/dkkqltqzb/video/upload/v1691113449/ezgif.com-resize_c0pixj.mp4";
  return (
    <main>
      <section className="section-hero">
        <div className="hero">
          <div className="hero-video-box">
            <VideoPlayer publicId={video} />
          </div>
          <div className="hero-text-box">
            <div className="heading-secondary">Front-End Developer</div>
            <h1 className="heading-primary">DevMoataz</h1>
            <div className="hero-description">
              Experienced frontend developer with 1 year of practice, proficient
              in HTML, CSS, and JavaScript. Skilled in creating interactive web
              interfaces using React. Collaborated with cross-functional teams
              to optimize webpage performance and ensure responsive designs.
              Committed to delivering visually appealing, user-centric frontend
              solutions. Eager to contribute expertise and continue growing in
              web development.
            </div>
            <div className="buttons">
              <Link className="btn btn--full" href="/portfolio">
                Portfolio
              </Link>
              <Link className="btn btn--outline" href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PageContent;
