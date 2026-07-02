import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

import { toast } from "react-toastify";

import API from "../services/api";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <AuthLayout
      title="Student Sign In"
      subtitle="Access your Student Portal"
      footerText="Don't have an account? "
      footerLink="/signup"
      footerLinkText="Create One"
    >

      <form onSubmit={handleSubmit}>

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
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          icon={<FaLock />}
        />

        <div className="login-options">

          <label className="remember">

            <input type="checkbox" />

            Remember Me

          </label>

          <a href="#">Forgot Password?</a>

        </div>

        <Button
          title="SIGN IN"
          icon={<FaSignInAlt />}
          loading={loading}
        />

      </form>

    </AuthLayout>
  );
}

export default Login;