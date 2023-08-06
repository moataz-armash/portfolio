import VideoPlayer from "./VideoPlayer";
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
  );
}

export default PageContent;
