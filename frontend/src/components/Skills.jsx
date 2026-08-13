import '../styles/Skills.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReact,
  faNodeJs,
  faJava,
  faPython,
  faGitAlt,
  faHtml5,
  faCss3Alt,
  faJs,
  faVuejs,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
  faDatabase,
  faServer,
  faBrain,
  faToolbox,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

import { skills } from '../data/skills';

// Map each category to a specific icon
const categoryIcons = {
  Frontend: <FontAwesomeIcon icon={faReact} />,
  Backend: <FontAwesomeIcon icon={faNodeJs} />,
  Programming: <FontAwesomeIcon icon={faJava} />,
  Tools: <FontAwesomeIcon icon={faGitAlt} />,
  'AI & ML': <FontAwesomeIcon icon={faBrain} />,
};

// Map each individual technology to its own icon
const techIcons = {
  HTML5: <FontAwesomeIcon icon={faHtml5} />,
  CSS3: <FontAwesomeIcon icon={faCss3Alt} />,
  JavaScript: <FontAwesomeIcon icon={faJs} />,
  React: <FontAwesomeIcon icon={faReact} />,
  Vue: <FontAwesomeIcon icon={faVuejs} />,
  'React Router': <FontAwesomeIcon icon={faReact} />,
  'Node.js': <FontAwesomeIcon icon={faNodeJs} />,
  'Express.js': <FontAwesomeIcon icon={faNodeJs} />,
  'REST API': <FontAwesomeIcon icon={faServer} />,
  JWT: <FontAwesomeIcon icon={faDatabase} />,
  MongoDB: <FontAwesomeIcon icon={faDatabase} />,
  Mongoose: <FontAwesomeIcon icon={faDatabase} />,
  Java: <FontAwesomeIcon icon={faJava} />,
  C: <FontAwesomeIcon icon={faCode} />,
  Python: <FontAwesomeIcon icon={faPython} />,
  Git: <FontAwesomeIcon icon={faGitAlt} />,
  GitHub: <FontAwesomeIcon icon={faGithub} />,
  Postman: <FontAwesomeIcon icon={faToolbox} />,
  'VS Code': <FontAwesomeIcon icon={faCode} />,
  NPM: <FontAwesomeIcon icon={faNodeJs} />,
  'Scikit-learn': <FontAwesomeIcon icon={faBrain} />,
  Pandas: <FontAwesomeIcon icon={faDatabase} />,
  NumPy: <FontAwesomeIcon icon={faDatabase} />,
  'Machine Learning': <FontAwesomeIcon icon={faBrain} />,
};

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-heading center">
          <span>My Skills</span>
          <h2>Technologies I work with</h2>
          <p>
            A combination of frontend, backend and programming technologies.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.category}>
              <div className="skill-icon">{categoryIcons[skill.category]}</div>
              <h3>{skill.category}</h3>
              <div className="skill-list">
                {skill.items.map((item) => (
                  <span key={item}>
                    {techIcons[item] && (
                      <span className="tech-icon">{techIcons[item]}</span>
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;