import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenNib, faLayerGroup, faShieldHalved, faCode, faBug,
  faServer, faPalette, faTerminal, faLock, faGlobe, faDatabase,
  faMobileScreen, faNetworkWired, faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Subject from "@/components/Subject";
import { fetchAboutContent } from "../../services/api";
import { AboutContent } from "../../types";

const ICON_MAP: Record<string, { icon: IconDefinition; color: string; bg: string }> = {
  "pen-nib":       { icon: faPenNib,        color: "#e05b4b", bg: "rgba(224,91,75,0.12)" },
  "layer-group":   { icon: faLayerGroup,    color: "#007ced", bg: "rgba(0,124,237,0.12)" },
  "shield-halved": { icon: faShieldHalved,  color: "#27ae60", bg: "rgba(39,174,96,0.12)" },
  "code":          { icon: faCode,          color: "#9b59b6", bg: "rgba(155,89,182,0.12)" },
  "bug":           { icon: faBug,           color: "#e74c3c", bg: "rgba(231,76,60,0.12)" },
  "server":        { icon: faServer,        color: "#f39c12", bg: "rgba(243,156,18,0.12)" },
  "palette":       { icon: faPalette,       color: "#e91e8c", bg: "rgba(233,30,140,0.12)" },
  "terminal":      { icon: faTerminal,      color: "#1abc9c", bg: "rgba(26,188,156,0.12)" },
  "lock":          { icon: faLock,          color: "#27ae60", bg: "rgba(39,174,96,0.12)" },
  "globe":         { icon: faGlobe,         color: "#3498db", bg: "rgba(52,152,219,0.12)" },
  "database":      { icon: faDatabase,      color: "#f39c12", bg: "rgba(243,156,18,0.12)" },
  "mobile":        { icon: faMobileScreen,  color: "#8e44ad", bg: "rgba(142,68,173,0.12)" },
  "network":       { icon: faNetworkWired,  color: "#16a085", bg: "rgba(22,160,133,0.12)" },
  "spy":           { icon: faUserSecret,    color: "#2c3e50", bg: "rgba(44,62,80,0.15)" },
};

const DEFAULT: AboutContent = {
  pageTitle: "Full Stack & Security",
  whatIDoTitle: "what do i do?",
  items: [
    {
      icon: "pen-nib",
      title: "Design to Code",
      description:
        "Started as a frontend dev converting Figma designs into precise HTML, CSS, and JavaScript — pixel-perfect and responsive.",
    },
    {
      icon: "layer-group",
      title: "Full Stack Development",
      description:
        "Evolved into full stack, building end-to-end apps with React, Next.js, Node.js, and Firebase.",
    },
    {
      icon: "shield-halved",
      title: "Security & Bug Hunting",
      description:
        "Now shifting into cybersecurity — exploring web vulnerabilities, CTF challenges, and bug bounty hunting.",
    },
  ],
  skillsTitle: "Coding skills",
  skills: [
    { name: "HTML", percentage: 100 },
    { name: "CSS / SCSS", percentage: 90 },
    { name: "JavaScript", percentage: 90 },
    { name: "TypeScript", percentage: 85 },
    { name: "React / Next.js", percentage: 85 },
    { name: "Node.js", percentage: 75 },
    { name: "Web Security", percentage: 60 },
  ],
};

function SkillIcon({ name }: { name: string }) {
  const entry = ICON_MAP[name];
  if (!entry) return <span style={{ fontSize: "2.8rem", lineHeight: 1 }}>{name}</span>;
  return (
    <div
      className="skill-icon-wrap"
      style={{ background: entry.bg, color: entry.color }}>
      <FontAwesomeIcon icon={entry.icon} />
    </div>
  );
}

function Skills() {
  const [content, setContent] = useState<AboutContent>(DEFAULT);

  useEffect(() => {
    fetchAboutContent().then(setContent).catch(() => {});
  }, []);

  return (
    <>
      <Subject title={content.pageTitle} />
      <section className="skills-section">
        <div className="skills-box">
          <h3 className="title">{content.whatIDoTitle}</h3>
          <div className="progress-bar about">
            <div className="progress-fill"></div>
          </div>
          {content.items.map((item, i) => (
            <div key={i} className="icon-title-description-container">
              <SkillIcon name={item.icon} />
              <div className="title-desciption-container">
                <h4 className="skill-title">{item.title}</h4>
                <p className="skill-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="skills-box">
          <p className="title">{content.skillsTitle}</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="skill-rate-box">
            {content.skills.map((skill, i) => (
              <div key={i} className="skill-rate-container">
                <div className="title-desciption-container">
                  <div className="title-rate-container">
                    <p className="skill-title">{skill.name}</p>
                    <p className="skill-rate">{skill.percentage}%</p>
                  </div>
                  <div className="skill-line-css-background">
                    <div
                      className="skill-line-css"
                      style={{ maxWidth: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Skills;
