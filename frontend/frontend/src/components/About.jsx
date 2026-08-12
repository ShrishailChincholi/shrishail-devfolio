import '../styles/About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGraduationCap,
  faLocationDot,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import profilePhoto from '../assets/profile2.jpeg';

const About = () => {
  const skills = [
    { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "AI/ML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <span className="about-label">ABOUT ME</span>
          <h2>
            Building digital experiences with
            <span> modern technology.</span>
          </h2>
          <p>
            I am a passionate software developer focused on building
            responsive, user-friendly and scalable web applications.
          </p>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper">
            <div className="about-image">
              <div className="about-image-placeholder">
                <img 
                  src={profilePhoto} 
                  alt="Shrishail Chincholi - Full Stack Developer"
                  className="about-profile-image"
                />
              </div>
            </div>

            <div className="about-experience-card">
              <strong>10+</strong>
              <span>Projects<br />Built</span>
            </div>
          </div>

          <div className="about-info">
            <h3>Hello, I'm Shrishail Chincholi</h3>

            <p>
              I am an MCA student and software developer from Kalaburagi,
              Karnataka. I enjoy creating modern web applications and
              solving real-world problems through technology.
            </p>

            <p>
              My primary expertise is in the MERN stack, including
              MongoDB, Express.js, React.js and Node.js. I also have
              experience with Python, Django, Java, C and AI/ML.
            </p>

            <p>
              I am continuously improving my development and problem-solving
              skills by building projects, learning new technologies and
              practicing Data Structures and Algorithms.
            </p>

            <div className="about-details">
              <div className="detail-item">
                <div className="detail-icon" style={{ background: '#e8f0fe', color: '#4285F4' }}>
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="detail-content">
                  <span>Name</span>
                  <strong>Shrishail Chincholi</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon" style={{ background: '#fce4ec', color: '#E91E63' }}>
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <div className="detail-content">
                  <span>Education</span>
                  <strong>MCA</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon" style={{ background: '#e8f5e9', color: '#4CAF50' }}>
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="detail-content">
                  <span>Location</span>
                  <strong>Kalaburagi, Karnataka</strong>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon" style={{ background: '#fff3e0', color: '#FF9800' }}>
                  <FontAwesomeIcon icon={faCode} />
                </div>
                <div className="detail-content">
                  <span>Focus</span>
                  <strong>Full Stack Development</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section with Real Technology Icons */}
        <div className="skills-section">
          <div className="skills-title">
            <span>MY TECHNOLOGIES</span>
            <h3>Skills & Expertise</h3>
          </div>

          <div className="skills-grid-vertical">
            {skills.map((skill, index) => (
              <div className="skill-card-vertical" key={index}>
                <div className="skill-icon-wrapper">
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    className="skill-icon-image"
                    loading="lazy"
                  />
                </div>
                <span className="skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;