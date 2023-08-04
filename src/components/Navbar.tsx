import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
function Navbar() {
  const video =
    "https://res.cloudinary.com/dkkqltqzb/video/upload/v1691113449/ezgif.com-resize_c0pixj.mp4";
  return (
    <div className="container">
      <header className="main-header">
        <div className="logo-side">
          <div className="logo"></div>
          <div className="letter">DevMoataz</div>
        </div>
        <nav>
          <Link className={`nav-link`} href="#">
            Home
          </Link>
          <Link className={`nav-link`} href="#">
            Front-end skills
          </Link>
          <Link className={`nav-link`} href="#">
            portfolio
          </Link>
          <Link className={`nav-link`} href="#">
            contact
          </Link>
        </nav>
      </header>
      <article>
        <div className="frame">
          <VideoPlayer publicId={video} />
        </div>
        <div className="developer-info">
          <div className="job-title">Front-End Developer</div>
          <div className="short-logo">DevMoataz</div>
          <div className="about-me">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab in
            eveniet autem ipsum cum sed, necessitatibus vel, quibusdam nam
            quisquam tenetur ad qui commodi. Iure dignissimos quam consequuntur
            excepturi nemo.
          </div>
          <div className="buttons">
            <button className="portfolio-btn">Portfolio</button>
            <button className="contact-btn">Contact</button>
          </div>
        </div>
      </article>
      <footer>
        <menu className="left-side">
          <ul>
            <Link
              className="footer-link"
              href="https://github.com/moataz-armash/"
              target="_blank">
              Github
            </Link>
            <Link
              className="footer-link"
              href="https://www.linkedin.com/in/moataz-mohamed-b69404204/"
              target="_blank">
              Linkedin
            </Link>
          </ul>
        </menu>
        <aside className="right-side">
          <p className="copywrite">&copy; 2023 Dev Moataz</p>
        </aside>
      </footer>
    </div>
  );
}

export default Navbar;
