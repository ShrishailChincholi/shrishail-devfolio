import '../styles/Contact.css';
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiMail,
  FiMapPin,
  FiSend
} from "react-icons/fi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  // ✅ Fix: Get API URL and remove trailing slash if exists
  const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL || window.location.origin || 'http://localhost:5000';
    // Remove trailing slash if exists
    url = url.replace(/\/$/, '');
    return url;
  };

  const API_URL = getApiUrl();

  // ✅ Log the API URL for debugging
  useEffect(() => {
    console.log('🔗 API URL:', API_URL);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({
      type: "",
      message: ""
    });

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Validation
    if (name.length < 2) {
      setStatus({
        type: "error",
        message: "Please enter your name."
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address."
      });
      return;
    }

    if (message.length < 5) {
      setStatus({
        type: "error",
        message: "Please enter a message."
      });
      return;
    }

    try {
      setLoading(true);

      // ✅ Fix: Construct URL without double slashes
      const url = `${API_URL}/api/contacts`;
      console.log('📤 Sending to:', url);

      const response = await axios.post(
        url,
        {
          name,
          email,
          message
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 15000
        }
      );

      if (response.data.success) {
        setStatus({
          type: "success",
          message: "✅ Your message has been sent successfully. Thank you!"
        });

        setFormData({
          name: "",
          email: "",
          message: ""
        });
      }

    } catch (error) {
      console.error('❌ Contact form error:', error);
      
      let errorMessage = "Unable to send your message. Please try again.";
      
      if (error.code === 'ECONNABORTED') {
        errorMessage = "⏱️ Request timed out. Please try again.";
      } else if (error.response) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "🔌 Cannot connect to server. Please try again later.";
      }

      setStatus({
        type: "error",
        message: errorMessage
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-heading center">
          <span>Contact</span>
          <h2>Let's Build Something Together</h2>
          <p>Have a project, opportunity or question? Send me a message.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-details">
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <FiMail />
              </div>
              <div>
                <span>Email</span>
                <a href="mailto:shrishailchincholi306@gmail.com">
                  shrishailchincholi306@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">
                <FiMapPin />
              </div>
              <div>
                <span>Location</span>
                <p>Kalaburagi, Karnataka, India</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="7"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {status.message && (
              <div className={`form-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              className="primary-btn submit-btn"
              disabled={loading}
            >
              {loading ? "⏳ Sending..." : "📩 Send Message"}
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;