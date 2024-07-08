import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProjects } from "../../services/api";
import { Project } from "../../types";

function ProjectComponent({ category, name, imageUrl, link }: Project) {
  return (
    <div className="snapshot-text-container">
      <div className="up-down-text-container">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Image
            className="project-snapshot"
            src={imageUrl}
            alt={name}
            width={500}
            height={300}
            unoptimized
          />
        </a>
        <div className="up-category-text">{category}</div>
        <div className="down-category-text">{name}</div>
      </div>
    </div>
  );
}
function SkeletonProject() {
  return (
    <div className="snapshot-text-container skeleton">
      <div className="up-down-text-container">
        <div className="project-snapshot skeleton-image"></div>
        <div className="up-category-text skeleton-text"></div>
        <div className="down-category-text skeleton-text"></div>
      </div>
    </div>
  );
}

function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    if (currentFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) => project.category === currentFilter
      );
      setFilteredProjects(filtered);
    }
  }, [currentFilter, projects]);

  const handleFilterClick = (filter: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentFilter(filter);
  };

  const getLinkStyle = (filter: string) => {
    return {
      fontWeight: currentFilter === filter ? "bold" : "normal",
      color:
        currentFilter === filter
          ? "white"
          : "rgba(255, 255, 255, 0.5019607843)",
    };
  };

  return (
    <div>
      <div className="category-skills">
        <p className="title">Gallery</p>
        <div className="progress-bar outline">
          <div className="progress-fill"></div>
        </div>
      </div>
      <div className="category">
        {["All", "App", "Practice", "Game"].map((filter) => (
          <Link
            key={filter}
            className="category-filter"
            href="#"
            onClick={handleFilterClick(filter)}
            style={getLinkStyle(filter)}>
            {filter}
          </Link>
        ))}
      </div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="projects-container">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => <SkeletonProject key={index} />)
            : filteredProjects.map((project, index) => (
                <ProjectComponent key={index} {...project} />
              ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
