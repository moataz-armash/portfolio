import VideoPlayer from "./VideoPlayer";
import Link from "next/link";
import next from "next/types";
function PageContent() {
  const video =
    "https://res.cloudinary.com/dkkqltqzb/video/upload/v1691113449/ezgif.com-resize_c0pixj.mp4";
  return (
    <article className="developer-container">
      <div className="frame">
        <VideoPlayer publicId={video} />
      </div>
      <div className="developer-info">
        <div className="job-title">Front-End Developer</div>
        <div className="short-logo">DevMoataz</div>
        <div className="about-me">
          Experienced frontend developer with 1 year of practice, proficient in
          HTML, CSS, and JavaScript. Skilled in creating interactive web
          interfaces using React. Collaborated with cross-functional teams to
          optimize webpage performance and ensure responsive designs. Committed
          to delivering visually appealing, user-centric frontend solutions.
          Eager to contribute expertise and continue growing in web development.
        </div>
        <div className="buttons">
          <button className="portfolio-btn">
            <Link className="portfolio" href="/portfolio">
              Portfolio
            </Link>
          </button>
          <button className="contact-btn">
            <Link className="contact" href="/contact">
              Contact
            </Link>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PageContent;
