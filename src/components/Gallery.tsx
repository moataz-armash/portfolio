import Link from "next/link";
import Image from "next/image";
import img1 from "../../public/wallpaperflare.com_wallpaper (1).jpg";
import img2 from "../../public/wallpaperflare.com_wallpaper (10).jpg";
import img3 from "../../public/wallpaperflare.com_wallpaper (2).jpg";
import img4 from "../../public/wallpaperflare.com_wallpaper (3).jpg";
import img5 from "../../public/wallpaperflare.com_wallpaper (6).jpg";
import img6 from "../../public/wallpaperflare.com_wallpaper.jpg";

function Gallery() {
  return (
    <div>
      <div className="category-container">
        <div className="category-skills">
          <p className="title">Gallery</p>
          <div className="gallery-score-line"></div>
        </div>
        <div className="category">
          <Link className="category-filter" href="#">
            All
          </Link>
          <Link className="category-filter" href="#">
            Portfolio
          </Link>
          <Link className="category-filter" href="#">
            Blog
          </Link>
          <Link className="category-filter" href="#">
            Business
          </Link>
        </div>
        <div className="projects-container">
          <div className="first-column">
            <div className="snapshot-text-container">
              <div className="up-down-text-container">
                <div className="up-category-text">Portfolio</div>
                <div className="down-category-text">DevMoataz</div>
              </div>
              <Image className="project-snapshot" src={img1} alt="portfolio" />
            </div>
            <div className="snapshot-text-container">
              <div className="up-down-text-container">
                <div className="up-category-text">Blog</div>
                <div className="down-category-text">AquaGenix</div>
              </div>
              <Image className="project-snapshot" src={img2} alt="portfolio" />
            </div>
            <div className="snapshot-text-container">
              <div className="up-down-text-container">
                <div className="up-category-text">Business</div>
                <div className="down-category-text">AeroNex</div>
              </div>
              <Image className="project-snapshot" src={img3} alt="portfolio" />
            </div>
          </div>
          <div className="second-column">
            <div className="snapshot-text-container">
              <div className="up-down-text-container">
                <div className="up-category-text">Portfolio</div>
                <div className="down-category-text">LunaWave</div>
              </div>
              <Image className="project-snapshot" src={img4} alt="portfolio" />
            </div>
            <div className="snapshot-text-container">
              <div className="up-down-text-container">
                <div className="up-category-text">Blog</div>
                <div className="down-category-text">BioSynth</div>
              </div>
              <Image className="project-snapshot" src={img5} alt="portfolio" />
            </div>
            <div className="snapshot-text-container">
              <div className="up-down-text-container">
                <div className="up-category-text">Business</div>
                <div className="down-category-text">NanoGlobe</div>
              </div>
              <Image className="project-snapshot" src={img6} alt="portfolio" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
