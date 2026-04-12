import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel = {
    ADMIN: "Admin",
    PROJECT_OWNER: "Project Owner",
    BUYER: "Buyer",
  };

  const roleBadgeColor = {
    ADMIN: "#ef4444",
    PROJECT_OWNER: "#22c55e",
    BUYER: "#3b82f6",
  };

  return (
    <div style={{
      background: "#0f172a",
      borderBottom: "1px solid rgba(34,197,94,0.15)",
      padding: "0.75rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.2rem" }}>🌿</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          color: "#4ade80",
          fontSize: "1.1rem"
        }}>
          CarbonCredit
        </span>
      </div>

      {/* User info + logout */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}>
              {user.name}
            </div>
            <div style={{
              fontSize: "0.75rem",
              color: roleBadgeColor[user.role] || "#94a3b8",
              fontWeight: 500
            }}>
              {roleLabel[user.role] || user.role}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: "8px",
              color: "#f87171",
              padding: "0.4rem 0.9rem",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              transition: "background 0.2s"
            }}
            onMouseOver={e => e.target.style.background = "rgba(248,113,113,0.2)"}
            onMouseOut={e => e.target.style.background = "rgba(248,113,113,0.1)"}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;