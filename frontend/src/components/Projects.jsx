import '../styles/Project.css';
import {
  FiGithub,
  FiExternalLink
} from "react-icons/fi";
import {
  FaChartLine,
  FaWallet,
  FaSpotify,
  FaBriefcase,
  FaCalculator
} from "react-icons/fa";

import { projects } from "../data/projects";

// Map project titles to icons
const projectIcons = {
  "AI Smart Business Advisor": <FaChartLine />,
  "WalletNotes-App": <FaWallet />,
  "notSpotify": <FaSpotify />,
  "Small Business Management System": <FaBriefcase />,
  "EMI Calculator": <FaCalculator />
};

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-heading center">
          <span>My Work</span>
          <h2>Featured Projects</h2>
          <p>
            Some of the applications I've built while learning
            and developing my skills.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="project-top">
                <div className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="project-icon-wrapper">
                  {projectIcons[project.title] || <FaBriefcase />}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <FiGithub />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Live project"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>

              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-tech">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;