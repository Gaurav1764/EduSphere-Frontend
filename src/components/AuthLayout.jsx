import { Link } from "react-router-dom";
import { FaArrowLeft, FaUserGraduate } from "react-icons/fa";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <div className="auth-page">
      {/* Animated Ambient Background Glow Mesh */}
      <div className="bg-mesh-container">
        <div className="bg-mesh-bubble bubble-1"></div>
        <div className="bg-mesh-bubble bubble-2"></div>
        <div className="bg-mesh-bubble bubble-3"></div>
      </div>

      <div className="auth-card-wrapper">
        <div className="auth-card glass-card">
          {/* Back Button */}
          <Link to="/" className="back-link">
            <FaArrowLeft />
            <span>Back to Portal</span>
          </Link>

          {/* Logo */}
          <div className="logo-wrapper">
            <div className="logo-circle-glow">
              <div className="logo-circle">
                <FaUserGraduate />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="auth-title">{title}</h1>
          <p className="subtitle">{subtitle}</p>

          {/* Form Content */}
          <div className="auth-form-content">
            {children}
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Footer Info */}
          <div className="auth-footer">
            <p className="footer-switch">
              {footerText}
              <Link to={footerLink} className="footer-link">
                {footerLinkText}
              </Link>
            </p>

            <p className="help-text">
              Need assistance?{" "}
              <a href="#" className="help-link">
                Student Services
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;