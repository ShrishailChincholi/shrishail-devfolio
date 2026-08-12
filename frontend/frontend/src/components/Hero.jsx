import '../styles/Hero.css';
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi';
import profilePhoto from '../assets/profile.jpeg';

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
              <FiArrowRight className="btn-icon" />
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
              href="https://www.linkedin.com/in/shrishailchincholi/"
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
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <img 
                src={profilePhoto} 
                alt="Shrishail Chincholi - Full Stack Developer"
                className="hero-image"
              />
              <div className="hero-image-overlay"></div>
            </div>
            
            {/* Decorative Elements */}
            <div className="floating-badge badge-1">
              <span className="badge-icon">⚛️</span>
              <span className="badge-text">React</span>
            </div>
            
            <div className="floating-badge badge-2">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">MERN Stack</span>
            </div>
            
            <div className="floating-badge badge-3">
              <span className="badge-icon">💡</span>
              <span className="badge-text">Problem Solver</span>
            </div>
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