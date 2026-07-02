import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaUserCircle,
  FaEnvelope,
  FaShieldAlt,
  FaChartLine,
  FaCalendarAlt,
  FaEdit,
  FaKey,
  FaSignOutAlt,
  FaUser,
  FaBell,
  FaCog,
  FaCheckCircle,
  FaListUl,
  FaLock,
  FaIdCard,
  FaBookOpen,
  FaArrowRight,
  FaTimes,
  FaClock
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    studentId: "ESP-2026-94",
    course: "Computer Science & Engineering"
  });

  // State Management
  const [activeTab, setActiveTab] = useState("overview");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, text: "🔒 JWT Authentication verified successfully", time: "Just now" },
    { id: 2, text: "✅ Access granted from terminal session IP 192.168.1.42", time: "10 mins ago" },
    { id: 3, text: "📚 Term schedule registration synchronized with Registrar", time: "2 hours ago" }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "⚠️ Term Enrollment window closes tomorrow", unread: true, time: "1h ago" },
    { id: 2, text: "📝 Academic grading sheet for C.S. 104 is now available", unread: true, time: "4h ago" },
    { id: 3, text: "🔑 Security notification: Password updated successfully", unread: false, time: "1 day ago" }
  ]);

  const [checklist, setChecklist] = useState([
    { id: 1, label: "Confirm email verification status", completed: true },
    { id: 2, label: "Upload digital student ID pass avatar", completed: false },
    { id: 3, label: "Synchronize current term schedule details", completed: true },
    { id: 4, label: "Update backup secondary recovery contact", completed: false }
  ]);

  // Form States
  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    studentId: "",
    course: ""
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const mergedUser = {
        studentId: "ESP-2026-94",
        course: "Computer Science & Engineering",
        ...storedUser
      };
      setUser(mergedUser);
      setProfileForm({
        username: mergedUser.username || "",
        email: mergedUser.email || "",
        studentId: mergedUser.studentId || "ESP-2026-94",
        course: mergedUser.course || "Computer Science & Engineering"
      });
    }
  }, [navigate]);

  // Get dynamic greeting based on system hours
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  // Toggle Checklist items & compute completion percentage
  const toggleChecklistItem = (id) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    toast.info("Checklist state updated!");
  };

  const checklistCompletion = Math.round(
    (checklist.filter((item) => item.completed).length / checklist.length) * 100
  );

  // Edit Profile submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!profileForm.username || !profileForm.email) {
      toast.error("Name and Email are required");
      return;
    }

    const updatedUser = { ...user, ...profileForm };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Append to activity log
    const newActivity = {
      id: Date.now(),
      text: "✏️ Academic details updated in Profile settings",
      time: "Just now"
    };
    setRecentActivities([newActivity, ...recentActivities]);

    toast.success("Academic details updated successfully");
    setActiveTab("overview");
  };

  // Change Password submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill all security fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Confirm passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setPasswordLoading(true);
    setTimeout(() => {
      setPasswordLoading(false);
      // Append to activity log
      const newActivity = {
        id: Date.now(),
        text: "🔑 Security configuration: Account password updated",
        time: "Just now"
      };
      setRecentActivities([newActivity, ...recentActivities]);

      // Add to notifications
      const newNotif = {
        id: Date.now(),
        text: "🔐 Your portal passcode credentials were changed",
        unread: true,
        time: "Just now"
      };
      setNotifications([newNotif, ...notifications]);

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Security credentials modified successfully");
      setActiveTab("overview");
    }, 1500);
  };

  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
    toast.success("All notifications marked as read");
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="dashboard-page">
      {/* Background Animated Gradient Mesh */}
      <div className="bg-mesh-container">
        <div className="bg-mesh-bubble bubble-1"></div>
        <div className="bg-mesh-bubble bubble-2"></div>
        <div className="bg-mesh-bubble bubble-3"></div>
      </div>

      {/* Nav bar */}
      <nav className="dashboard-nav glass-card">
        <div className="nav-logo">
          <div className="nav-logo-glow">
            <FaUserGraduate className="logo-grad-icon" />
          </div>
          <h2>EduSphere</h2>
        </div>

        <div className="nav-actions">
          {/* Notifications Trigger */}
          <div className="notif-wrapper">
            <button
              className={`nav-btn ${showNotifDropdown ? "active" : ""}`}
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                setShowProfileDropdown(false);
              }}
            >
              <FaBell />
              {unreadNotifsCount > 0 && (
                <span className="notif-badge">{unreadNotifsCount}</span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="dropdown-panel notif-dropdown glass-card">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  {unreadNotifsCount > 0 && (
                    <button onClick={markAllNotificationsRead} className="action-link">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="dropdown-list">
                  {notifications.length === 0 ? (
                    <p className="empty-dropdown-text">No notifications found</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={`dropdown-item ${n.unread ? "unread" : ""}`}>
                        <div className="notif-body">
                          <p>{n.text}</p>
                          <span><FaClock /> {n.time}</span>
                        </div>
                        <button onClick={() => deleteNotification(n.id)} className="delete-notif-btn">
                          <FaTimes />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <div className="dropdown-footer">
                  <button onClick={() => { setActiveTab("notifications"); setShowNotifDropdown(false); }} className="view-all-btn">
                    <span>View all in Tab</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="nav-btn"
            onClick={() => {
              setActiveTab("profile");
              setShowProfileDropdown(false);
              setShowNotifDropdown(false);
            }}
          >
            <FaCog />
          </button>

          {/* Profile Dropdown Trigger */}
          <div className="profile-dropdown-wrapper">
            <div
              className="user-profile-widget"
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifDropdown(false);
              }}
            >
              <div className="widget-avatar">
                <FaUserCircle />
              </div>
              <span className="widget-name">{user.username || "Student"}</span>
            </div>

            {showProfileDropdown && (
              <div className="dropdown-panel profile-menu-dropdown glass-card">
                <div className="profile-menu-header">
                  <h4>{user.username}</h4>
                  <p>{user.email}</p>
                </div>
                <div className="dropdown-menu-list">
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      setShowProfileDropdown(false);
                    }}
                    className="menu-item"
                  >
                    <FaUser /> Profile Details
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("security");
                      setShowProfileDropdown(false);
                    }}
                    className="menu-item"
                  >
                    <FaLock /> Security Config
                  </button>
                  <div className="menu-divider"></div>
                  <button onClick={logout} className="menu-item logout-item">
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="dashboard-content-layout">
        {/* Sidebar Nav Tabs */}
        <aside className="dashboard-sidebar glass-card">
          <div className="sidebar-links">
            <button
              className={`sidebar-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <FaChartLine />
              <span>Overview</span>
            </button>
            <button
              className={`sidebar-tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser />
              <span>Edit Profile</span>
            </button>
            <button
              className={`sidebar-tab ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
            >
              <FaShieldAlt />
              <span>Security settings</span>
            </button>
            <button
              className={`sidebar-tab ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => setActiveTab("notifications")}
            >
              <FaBell />
              <span>System Alerts</span>
              {unreadNotifsCount > 0 && (
                <span className="sidebar-badge">{unreadNotifsCount}</span>
              )}
            </button>
          </div>

          <div className="sidebar-footer">
            <button className="sidebar-logout-btn" onClick={logout}>
              <FaSignOutAlt />
              <span>Logout Session</span>
            </button>
          </div>
        </aside>

        {/* Dashboard Workspace Panels */}
        <main className="dashboard-workspace">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="tab-pane overview-pane animate-fade-in">
              {/* Hero Banner Card */}
              <div className="welcome-banner-card glass-card">
                <div className="banner-left">
                  <h1>
                    {getGreeting()},{" "}
                    <span className="username-highlight">
                      {user.username || "Student"}
                    </span>
                    👋
                  </h1>
                  <p>Welcome back to EduSphere. You have {unreadNotifsCount} unread system notifications today.</p>
                </div>
                <div className="banner-right-artwork">
                  <FaUserGraduate className="banner-bg-icon" />
                </div>
              </div>

              {/* Analytical KPI Metrics Grid */}
              <div className="metrics-grid">
                {/* Metric Item: Circular GPA Progress */}
                <div className="metric-card glass-card gpa-card">
                  <div className="circle-chart-wrapper">
                    <svg viewBox="0 0 36 36" className="circular-chart primary-glow">
                      <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        strokeDasharray="98, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="chart-inner-text">
                      <h2>3.92</h2>
                      <span>GPA</span>
                    </div>
                  </div>
                  <div className="metric-desc">
                    <h3>Academic standing</h3>
                    <p>Top 5% of class</p>
                  </div>
                </div>

                {/* Metric Item: Attendance */}
                <div className="metric-card glass-card attendance-card">
                  <div className="circle-chart-wrapper">
                    <svg viewBox="0 0 36 36" className="circular-chart accent-glow">
                      <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        strokeDasharray="96, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="chart-inner-text">
                      <h2>96%</h2>
                      <span>Ratio</span>
                    </div>
                  </div>
                  <div className="metric-desc">
                    <h3>Term Attendance</h3>
                    <p>Excellent consistency</p>
                  </div>
                </div>

                {/* Metric Item: Checklist Completion */}
                <div className="metric-card glass-card checklist-card">
                  <div className="circle-chart-wrapper">
                    <svg viewBox="0 0 36 36" className="circular-chart secondary-glow">
                      <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        strokeDasharray={`${checklistCompletion}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="chart-inner-text">
                      <h2>{checklistCompletion}%</h2>
                      <span>Done</span>
                    </div>
                  </div>
                  <div className="metric-desc">
                    <h3>Task checklist</h3>
                    <p>Dynamic completion</p>
                  </div>
                </div>

                {/* Metric Item: Account Date */}
                <div className="metric-card glass-card date-card">
                  <div className="date-icon-box">
                    <FaCalendarAlt className="date-icon" />
                  </div>
                  <div className="date-details">
                    <h2>{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</h2>
                    <span>Current Date Session</span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout Section */}
              <div className="workspace-double-column">
                {/* Column Left: Student Card info & Checklist */}
                <div className="workspace-card-col glass-card">
                  <div className="col-header">
                    <FaListUl className="header-icon" />
                    <h2>Setup Checklist</h2>
                  </div>
                  <div className="checklist-feed">
                    <p className="checklist-sub">Complete these tasks to synchronize your student account index profile.</p>
                    {checklist.map((item) => (
                      <label key={item.id} className="checklist-checkbox-label">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleChecklistItem(item.id)}
                        />
                        <span className="checkmark-box"></span>
                        <span className="checklist-text">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Column Right: Live Activity Logs */}
                <div className="workspace-card-col glass-card">
                  <div className="col-header">
                    <FaShieldAlt className="header-icon" />
                    <h2>Live Activity Logs</h2>
                  </div>
                  <div className="activity-list-container">
                    {recentActivities.map((act) => (
                      <div key={act.id} className="activity-item-card">
                        <div className="activity-icon-container">
                          <FaCheckCircle className="chk-icon" />
                        </div>
                        <div className="activity-content">
                          <p>{act.text}</p>
                          <span>{act.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EDIT PROFILE */}
          {activeTab === "profile" && (
            <div className="tab-pane profile-pane animate-fade-in">
              <div className="pane-header">
                <FaUser className="pane-icon" />
                <div>
                  <h2>Student Credentials</h2>
                  <p>Modify and commit changes to your academic registration details.</p>
                </div>
              </div>

              <div className="settings-form-container glass-card">
                <form onSubmit={handleProfileSubmit} className="workspace-inner-form">
                  <div className="form-grid-columns">
                    <div className="form-input-group">
                      <label>FULL USERNAME</label>
                      <div className="form-input-field">
                        <FaUser />
                        <input
                          type="text"
                          value={profileForm.username}
                          onChange={(e) => setProfileForm({ ...profileForm, username: e.target.value })}
                          placeholder="Your username"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-input-group">
                      <label>EMAIL ADDRESS</label>
                      <div className="form-input-field">
                        <FaEnvelope />
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-input-group">
                      <label>STUDENT REGISTRATION ID</label>
                      <div className="form-input-field readonly">
                        <FaIdCard />
                        <input
                          type="text"
                          value={profileForm.studentId}
                          disabled
                        />
                      </div>
                      <small className="help-subtext">Managed by Central Registrar. Read-only.</small>
                    </div>

                    <div className="form-input-group">
                      <label>MAJOR ACADEMIC COURSE</label>
                      <div className="form-input-field readonly">
                        <FaBookOpen />
                        <input
                          type="text"
                          value={profileForm.course}
                          disabled
                        />
                      </div>
                      <small className="help-subtext">Requires counselor approval to modify. Read-only.</small>
                    </div>
                  </div>

                  <div className="form-submit-actions">
                    <button type="submit" className="form-btn-submit">
                      <FaEdit />
                      <span>Commit Profile Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY TAB */}
          {activeTab === "security" && (
            <div className="tab-pane security-pane animate-fade-in">
              <div className="pane-header">
                <FaLock className="pane-icon" />
                <div>
                  <h2>Portal Password Credentials</h2>
                  <p>Ensure account verification status is secure by updating your secret key.</p>
                </div>
              </div>

              <div className="settings-form-container glass-card">
                <form onSubmit={handlePasswordSubmit} className="workspace-inner-form">
                  <div className="form-flex-rows">
                    <div className="form-input-group">
                      <label>CURRENT PASSWORD</label>
                      <div className="form-input-field">
                        <FaKey />
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                          placeholder="Enter current password"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-input-group">
                      <label>NEW PASSWORD</label>
                      <div className="form-input-field">
                        <FaLock />
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                          placeholder="Enter new password"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-input-group">
                      <label>CONFIRM NEW PASSWORD</label>
                      <div className="form-input-field">
                        <FaLock />
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-submit-actions">
                    <button type="submit" className="form-btn-submit secondary-btn" disabled={passwordLoading}>
                      <FaKey />
                      <span>{passwordLoading ? "Verifying..." : "Update Security passcode"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="tab-pane notifications-pane animate-fade-in">
              <div className="pane-header">
                <FaBell className="pane-icon" />
                <div>
                  <h2>System Alert logs</h2>
                  <p>View administrative bulletins, enrollment updates, and portal activity alerts.</p>
                </div>
              </div>

              <div className="notifications-feed glass-card">
                <div className="feed-header">
                  <h3>Bulletins Archive ({notifications.length})</h3>
                  {unreadNotifsCount > 0 && (
                    <button onClick={markAllNotificationsRead} className="btn-secondary-glow btn-sm">
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="notifications-tab-list">
                  {notifications.length === 0 ? (
                    <div className="empty-state">
                      <FaCheckCircle className="empty-state-icon" />
                      <p>You have cleared all system alerts!</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className={`notif-alert-card glass-card ${n.unread ? "unread-glow" : ""}`}>
                        <div className="alert-badge-indicator">
                          <span className={`dot ${n.unread ? "unread" : ""}`}></span>
                        </div>
                        <div className="alert-content-body">
                          <p>{n.text}</p>
                          <span className="alert-time"><FaClock /> {n.time}</span>
                        </div>
                        <div className="alert-actions">
                          <button onClick={() => deleteNotification(n.id)} className="alert-dismiss-btn">
                            <FaTimes /> Dismiss
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;