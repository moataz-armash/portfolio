import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchProjects } from "../../services/api";
import { Project } from "../../types";

const parseStack = (s?: string): string[] =>
  s ? s.split(",").map((t) => t.trim()).filter(Boolean) : [];

/* ── Project card ─────────────────────────────────────── */
function ProjectComponent({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div className="snapshot-text-container" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="up-down-text-container">
        <Image
          className="project-snapshot"
          src={project.imageUrl}
          alt={project.name}
          width={500}
          height={300}
          unoptimized
        />
        <div className="up-category-text">{project.category}</div>
        <div className="down-category-text">{project.name}</div>
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

/* ── Modal ────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const techs = project.techStack ? Object.entries(project.techStack) : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-image-wrap">
          <Image
            src={project.imageUrl}
            alt={project.name}
            width={600}
            height={300}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            unoptimized
          />
        </div>

        <div className="modal-body">
          <div className="modal-header-row">
            <h2 className="modal-project-name">{project.name}</h2>
            {parseStack(project.mainStack).length > 0 && (
              <div className="modal-main-stacks">
                {parseStack(project.mainStack).map((tech) => (
                  <span key={tech} className="modal-main-stack">{tech}</span>
                ))}
              </div>
            )}
          </div>
          <span className="modal-category-tag">{project.category}</span>

          {project.description && (
            <p className="modal-description">{project.description}</p>
          )}

          {techs.length > 0 && (
            <div className="modal-tech-section">
              <div className="modal-tech-title">Tech Stack</div>
              <div className="modal-tech-grid">
                {techs.map(([name, desc]) => (
                  <span
                    key={name}
                    className="modal-tech-badge"
                    {...(desc ? { "data-desc": desc } : {})}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-view-btn">
            View Project →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Gallery ──────────────────────────────────────────── */
function Gallery() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetched = await fetchProjects();
        setProjects(fetched);
        setFilteredProjects(fetched);
      } catch {
        setError("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  const availableTechs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      parseStack(p.mainStack).forEach((t) => set.add(t));
      if (p.techStack) Object.keys(p.techStack).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [projects]);

  useEffect(() => {
    let filtered = projects;
    if (currentFilter !== "All") {
      filtered = filtered.filter((p) => p.category === currentFilter);
    }
    if (techFilter !== "All") {
      filtered = filtered.filter(
        (p) =>
          (p.techStack && techFilter in p.techStack) ||
          parseStack(p.mainStack).includes(techFilter)
      );
    }
    setFilteredProjects(filtered);
  }, [currentFilter, techFilter, projects]);

  const handleCategoryClick = (filter: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentFilter(filter);
  };

  const getLinkStyle = (filter: string) => ({
    fontWeight: currentFilter === filter ? "bold" : "normal",
    color: currentFilter === filter ? "white" : "rgba(255, 255, 255, 0.5019607843)",
  });

  return (
    <div>
      <div className="category-skills">
        <p className="title">Gallery</p>
        <div className="progress-bar outline">
          <div className="progress-fill"></div>
        </div>
      </div>

      {/* Category filter */}
      <div
        className="category"
        style={availableTechs.length > 0 ? { paddingBottom: "1.2rem" } : {}}>
        {["All", "App", "Practice", "Game"].map((filter) => (
          <Link
            key={filter}
            className="category-filter"
            href="#"
            onClick={handleCategoryClick(filter)}
            style={getLinkStyle(filter)}>
            {filter}
          </Link>
        ))}
      </div>

      {/* Tech stack filter */}
      {availableTechs.length > 0 && (
        <div className="tech-filter-row">
          {["All", ...availableTechs].map((tech) => (
            <button
              key={tech}
              className={`tech-filter-btn${techFilter === tech ? " active" : ""}`}
              onClick={() => setTechFilter(tech)}>
              {tech}
            </button>
          ))}
        </div>
      )}

      {error ? (
        <div>{error}</div>
      ) : (
        <div className="projects-container">
          {isLoading
            ? Array(6).fill(0).map((_, i) => <SkeletonProject key={i} />)
            : filteredProjects.map((project, i) => (
                <ProjectComponent
                  key={project.id ?? i}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
        </div>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default Gallery;
