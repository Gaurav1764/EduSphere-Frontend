import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaSignInAlt,
  FaUserPlus,
  FaShieldAlt,
  FaRocket,
  FaChevronRight,
  FaLock,
  FaCheckCircle,
  FaServer,
  FaGraduationCap
} from "react-icons/fa";

import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Dynamic Animated Background Mesh */}
      <div className="bg-mesh-container">
        <div className="bg-mesh-bubble bubble-1"></div>
        <div className="bg-mesh-bubble bubble-2"></div>
        <div className="bg-mesh-bubble bubble-3"></div>
      </div>

      <div className="home-hero-section">
        {/* Left Side: Brand Intro */}
        <div className="hero-left-content">
          <div className="portal-badge">
            <FaGraduationCap className="badge-icon" />
            <span>EduSphere Network</span>
          </div>

          <h1 className="hero-title">
            Next-Gen <br />
            <span className="gradient-text">Student Identity</span> <br />
            Gateway
          </h1>

          <p className="hero-description">
            Access your secure dashboard, verify your credentials, and navigate your academic milestone roadmap through our unified, JWT-encrypted portal.
          </p>

          <div className="hero-action-buttons">
            <Link to="/login" className="btn-link">
              <button className="btn-primary">
                <span>Access Portal</span>
                <FaSignInAlt />
              </button>
            </Link>

            <Link to="/signup" className="btn-link">
              <button className="btn-secondary-glow">
                <span>Create Identity</span>
                <FaUserPlus />
              </button>
            </Link>
          </div>

          <div className="portal-metrics">
            <div className="metric-item">
              <h3>99.9%</h3>
              <p>Portal Uptime</p>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <h3>256-bit</h3>
              <p>JWT Encrypted</p>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <h3>&lt; 50ms</h3>
              <p>Sync Latency</p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Showcase Widgets */}
        <div className="hero-right-showcase">
          {/* Widget 1: 3D-Tilt Style Mock Student ID Card */}
          <div className="showcase-widget student-card-widget glass-card">
            <div className="card-header">
              <div className="chip"></div>
              <span className="card-type">STUDENT PASS</span>
            </div>
            <div className="card-body">
              <div className="student-avatar-placeholder">
                <FaUserGraduate />
              </div>
              <div className="student-details">
                <h4>Alex Mercer</h4>
                <p>Computer Science</p>
                <div className="card-meta">
                  <span>ID: ESP-2026-94</span>
                  <span className="status-indicator-dot active"></span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="barcode">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <span className="scan-text">TAP TO SCAN</span>
            </div>
          </div>

          {/* Widget 2: Micro-animated Security Handshake */}
          <div className="showcase-widget security-node-widget glass-card">
            <div className="security-status-header">
              <div className="status-label">
                <FaServer className="server-icon animate-pulse" />
                <span>AUTH NODE: ACTIVE</span>
              </div>
              <span className="secure-badge">
                <FaLock /> SECURE
              </span>
            </div>
            <div className="handshake-flow">
              <div className="flow-dot node-a">CLIENT</div>
              <div className="flow-line">
                <div className="ping-traveler"></div>
              </div>
              <div className="flow-dot node-b">JWT-SRV</div>
            </div>
            <div className="security-features">
              <span className="feature-pill"><FaCheckCircle /> RSA-4096</span>
              <span className="feature-pill"><FaCheckCircle /> HTTPS</span>
              <span className="feature-pill"><FaCheckCircle /> HttpOnly</span>
            </div>
          </div>

          {/* Widget 3: Academic Progress Tracker Preview */}
          <div className="showcase-widget progress-widget glass-card">
            <div className="progress-header">
              <h4>Current Term GPA</h4>
              <span className="gpa-score">3.92</span>
            </div>
            <div className="gpa-progress-track">
              <div className="gpa-progress-bar" style={{ width: "92%" }}>
                <span className="glow-bar-effect"></span>
              </div>
            </div>
            <div className="activity-micro-feed">
              <div className="feed-item">
                <span className="feed-dot completed"></span>
                <span>System Security Check Cleared</span>
              </div>
              <div className="feed-item">
                <span className="feed-dot pending"></span>
                <span>Term Registration Sync In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;