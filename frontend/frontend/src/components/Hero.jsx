import '../styles/Hero.css';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="status-dot"></span>
            🚀 Building my developer journey
          </div>

          <p className="hero-greeting">Hello, I'm</p>

          <h1>
            Shrishail
            <span> Chincholi</span>
          </h1>

          <h2>
            Full Stack <span>Developer</span>
          </h2>

          <p className="hero-description">
            I build modern, responsive and scalable web applications using
            the MERN stack. I enjoy turning ideas into clean and
            user-friendly digital experiences.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="hero-btn primary-btn">
              View My Work
              <span>↗</span>
            </a>

            <a href="#contact" className="hero-btn secondary-btn">
              Contact Me
            </a>
          </div>

          <div className="hero-socials">
            <a
              href="https://github.com/ShrishailChincholi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/shrishail-chincholi"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>

            <a
              href="mailto:shrishailchincholi306@gmail.com"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>
          <div className="hero-profile">
            <span>SC</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span></span>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;