import '../styles/Footer.css';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowUp
} from "react-icons/fi";

function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-brand">

          <a
            href="#home"
            className="logo"
          >
            <span>&lt;</span>
            Shrishail
            <span>/&gt;</span>
          </a>

          <p>
            Full Stack MERN Developer
            building modern web
            experiences.
          </p>

        </div>

        <div className="footer-social">

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

          <button
            onClick={scrollTop}
            aria-label="Back to top"
          >
            <FiArrowUp />
          </button>

        </div>

      </div>

      <div className="footer-bottom">

        <div className="container">

          <p>
            © {new Date().getFullYear()}
            {" "}
            Shrishail Chincholi.
            All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;