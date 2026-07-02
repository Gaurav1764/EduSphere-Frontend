import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserPlus
} from "react-icons/fa";
import { toast } from "react-toastify";

import API from "../services/api";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    let label = "Weak";
    if (score >= 4) label = "Strong";
    else if (score >= 2) label = "Medium";

    return { score, label };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (strength.score < 2) {
      toast.error("Please create a stronger password");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/signup", {
        username: form.username,
        email: form.email,
        password: form.password
      });

      toast.success("Account Created Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the Student Portal"
      footerText="Already have an account? "
      footerLink="/login"
      footerLinkText="Sign In"
    >
      <form onSubmit={handleSubmit}>
        <InputField
          label="FULL NAME"
          name="username"
          placeholder="Enter your name"
          value={form.username}
          onChange={handleChange}
          icon={<FaUser />}
        />

        <InputField
          label="EMAIL"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          icon={<FaEnvelope />}
        />

        <InputField
          label="PASSWORD"
          type="password"
          name="password"
          placeholder="Create password"
          value={form.password}
          onChange={handleChange}
          icon={<FaLock />}
        />

        {form.password && (
          <div className="password-strength-container">
            <div className="strength-label-text">
              <span>Password Security</span>
              <span className={`strength-tag ${strength.label.toLowerCase()}`}>
                {strength.label}
              </span>
            </div>
            <div className="strength-bar-track">
              <div
                className={`strength-bar-seg ${
                  strength.score >= 1
                    ? strength.score >= 4
                      ? "active-strong"
                      : strength.score >= 2
                      ? "active-medium"
                      : "active-weak"
                    : ""
                }`}
              ></div>
              <div
                className={`strength-bar-seg ${
                  strength.score >= 2
                    ? strength.score >= 4
                      ? "active-strong"
                      : strength.score >= 2
                      ? "active-medium"
                      : "active-weak"
                    : ""
                }`}
              ></div>
              <div
                className={`strength-bar-seg ${
                  strength.score >= 4 ? "active-strong" : ""
                }`}
              ></div>
            </div>
          </div>
        )}

        <InputField
          label="CONFIRM PASSWORD"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          icon={<FaLock />}
        />

        <div className="terms">
          <input type="checkbox" required />
          <span>I agree to the Terms & Conditions</span>
        </div>

        <Button
          title="CREATE ACCOUNT"
          icon={<FaUserPlus />}
          loading={loading}
        />
      </form>
    </AuthLayout>
  );
}

export default Signup;