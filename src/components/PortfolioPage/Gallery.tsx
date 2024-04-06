import Link from "next/link";
import Image from "next/image";
import { StaticImageData } from "next/image";

import img1 from "../../../public/images/tictactoe1.png";
import img2 from "../../../public/images/react-essential.png";
import img3 from "../../../public/images/react-meetup.png";

interface Project {
  category: string;
  name: string;
  image: StaticImageData;
  link: string;
}

const projects: Project[] = [
  {
    category: "Game",
    name: "tictactoe",
    image: img1,
    link: "https://tic-tac-toe-lake-kappa.vercel.app/",
  },
  {
    category: "Practice",
    name: "react",
    image: img2,
    link: "https://moataz-armash.github.io/react-essentials/",
  },
  {
    category: "Practice",
    name: "meetup",
    image: img3,
    link: "https://meetups-app-by-react.vercel.app/",
  },
];

function Project({ category, name, image, link }: Project) {
  return (
    <div className="snapshot-text-container">
      <div className="up-down-text-container">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Image className="project-snapshot" src={image} alt={category} />
        </a>
        <div className="up-category-text">{category}</div>
        <div className="down-category-text">{name}</div>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <div>
      <div className="category-skills">
        <p className="title">Gallery</p>
        <div className="progress-bar outline">
          <div className="progress-fill"></div>
        </div>
      </div>
      <div className="category">
        <Link className="category-filter" href="#">
          All
        </Link>
        <Link className="category-filter" href="#">
          Game
        </Link>
        <Link className="category-filter" href="#">
          Practice
        </Link>
      </div>
      <div className="projects-container">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
