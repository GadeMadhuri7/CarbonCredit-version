import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./Auth.css";

const ROLES = [
  { value: "ADMIN", label: "Admin", icon: "🛡️", desc: "Verify projects & manage platform" },
  { value: "PROJECT_OWNER", label: "Project Owner", icon: "🌱", desc: "Create & manage carbon projects" },
  { value: "BUYER", label: "Buyer", icon: "💼", desc: "Purchase carbon credits" },
];

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    organizationName: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.role) {
      setError("Please fill in all required fields and select a role.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await API.post("/users", form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-glow" />
      <div className="auth-card auth-card--wide">
        <div className="auth-logo">
          <span className="auth-logo-icon">🌿</span>
          <span className="auth-logo-text">CarbonCredit</span>
        </div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join the carbon credit marketplace</p>

        <div className="auth-row">
          <div className="auth-field">
            <label className="auth-label">Full Name *</label>
            <input
              className="auth-input"
              name="name"
              placeholder="John Smith"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Email Address *</label>
            <input
              className="auth-input"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="auth-field">
          <label className="auth-label">Organization Name</label>
          <input
            className="auth-input"
            name="organizationName"
            placeholder="Your company or organization"
            value={form.organizationName}
            onChange={handleChange}
          />
        </div>

        <div className="auth-field">
          <label className="auth-label">Select Your Role *</label>
          <div className="role-grid">
            {ROLES.map((r) => (
              <div
                key={r.value}
                className={`role-card ${form.role === r.value ? "role-card--active" : ""}`}
                onClick={() => setForm({ ...form, role: r.value })}
              >
                <span className="role-icon">{r.icon}</span>
                <span className="role-name">{r.label}</span>
                <span className="role-desc">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <button className="auth-btn" onClick={handleRegister} disabled={loading}>
          {loading ? <span className="auth-spinner" /> : "Create Account"}
        </button>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;