import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

// Consistent ROLES definition
const ROLES = [
  { value: "ADMIN", label: "Admin", icon: "🛡️", desc: "Verify projects & manage platform" },
  { value: "PROJECT_OWNER", label: "Project Owner", icon: "🌱", desc: "Create & manage carbon projects" },
  { value: "BUYER", label: "Buyer", icon: "💼", desc: "Purchase carbon credits" },
];

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // State for the selected role
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation for both email and role
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!role) {
      setError("Please select your role.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Passing both email and role to the backend
      const res = await API.post(`/users/login?email=${encodeURIComponent(email)}&role=${role}`);
      const user = res.data;
      
      // Update local auth context
      login(user);

      // Role-based redirect
      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "PROJECT_OWNER") navigate("/owner");
      else if (user.role === "BUYER") navigate("/buyer");
      else navigate("/");
      
    } catch (err) {
      setError("Login failed. Please check your email and role or register first.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-glow" />
      {/* Added auth-card--wide if you want the cards to look like the register page */}
      <div className="auth-card auth-card--wide"> 
        <div className="auth-logo">
          <span className="auth-logo-icon">🌿</span>
          <span className="auth-logo-text">CarbonCredit</span>
        </div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <div className="auth-field">
          <label className="auth-label">Email Address</label>
          <input
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Role Selection UI */}
        <div className="auth-field">
          <label className="auth-label">Select Your Role *</label>
          <div className="role-grid">
            {ROLES.map((r) => (
              <div
                key={r.value}
                className={`role-card ${role === r.value ? "role-card--active" : ""}`}
                onClick={() => setRole(r.value)}
              >
                <span className="role-icon">{r.icon}</span>
                <span className="role-name">{r.label}</span>
                <span className="role-desc">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button
          className="auth-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <span className="auth-spinner" /> : "Sign In"}
        </button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;