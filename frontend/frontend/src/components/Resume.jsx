import '../styles/Resume.css';
import {
  FiBookOpen,
  FiCode,
  FiDatabase,
  FiTool,
  FiTrendingUp,
  FiCpu,
  FiServer,
  FiLayers,
  FiGlobe,
  FiBriefcase,
  FiAward
} from "react-icons/fi";
import { experiences, achievements, skills } from '../data/experienceData';

// Icon mapping for string-based icons
const iconMap = {
  book: <FiBookOpen />,
  code: <FiCode />,
  database: <FiDatabase />,
  tool: <FiTool />,
  award: <FiAward />,
  trending: <FiTrendingUp />,
  cpu: <FiCpu />,
  server: <FiServer />,
  layers: <FiLayers />,
  globe: <FiGlobe />,
  briefcase: <FiBriefcase />
};

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="experience-heading">
          <span>MY JOURNEY</span>
          <h2>
            Education &amp; <strong>Growth</strong>
          </h2>
          <p>
            My journey in computer science has been built on continuous
            learning, hands-on projects, and skill development across
            multiple domains.
          </p>
        </div>

        {/* Education & Experience Timeline */}
        <div className="experience-timeline">
          {experiences.map((experience, index) => (
            <div className="experience-item" key={index}>
              <div className="experience-date">
                <span>{experience.period}</span>
              </div>

              <div className="timeline-line">
                <div className="timeline-dot">
                  {iconMap[experience.icon] || <FiCode />}
                </div>
              </div>

              <div className="experience-card">
                <div className="experience-card-header">
                  <div>
                    <span className="experience-type">
                      {experience.type}
                    </span>
                    <h3>{experience.role}</h3>
                    <h4>{experience.company}</h4>
                  </div>
                  <span className="experience-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <p>{experience.description}</p>

                <div className="experience-skills">
                  {experience.skills.map((skill, skillIndex) => (
                    <span key={skillIndex}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="achievements-section">
          <div className="achievements-header">
            <h3>Key Achievements</h3>
            <p>Highlights of my learning journey</p>
          </div>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div className="achievement-card" key={index}>
                <div className="achievement-icon">
                  {iconMap[achievement.icon] || <FiAward />}
                </div>
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Showcase with Images */}
        <div className="skills-showcase">
          <div className="skills-showcase-header">
            <h3>Technical Skills</h3>
            <p>Technologies and tools I work with</p>
          </div>
          <div className="skills-showcase-grid">
            {skills.map((skill, index) => (
              <div className="skills-showcase-item" key={index}>
                <div className="skills-showcase-image-wrapper">
                  <img 
                    src={skill.image} 
                    alt={skill.name}
                    className="skills-showcase-image"
                    loading="lazy"
                  />
                </div>
                <span className="skills-showcase-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;