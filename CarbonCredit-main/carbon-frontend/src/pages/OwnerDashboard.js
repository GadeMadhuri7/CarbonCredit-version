import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";
import "../OwnerDashboard.css"; // We'll create this file

function OwnerDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    projectName: "",
    projectType: "",
    location: "",
    estimatedReduction: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assuming user ID 1 for now as per your snippet
      await API.post(`/projects/1`, form);
      alert("Project Created successfully!");
      setForm({
        projectName: "",
        projectType: "",
        location: "",
        estimatedReduction: "",
        startDate: "",
        endDate: ""
      });
      fetchProjects();
    } catch (err) {
      alert("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <p>Manage your carbon offset initiatives</p>
        </header>

        <div className="dashboard-grid">
          {/* Create Project Section */}
          <section className="dashboard-card form-section">
            <h3><span className="icon">🌱</span> Create New Project</h3>
            <form onSubmit={createProject} className="project-form">
              <div className="form-group">
                <label>Project Name</label>
                <input name="projectName" value={form.projectName} onChange={handleChange} placeholder="e.g. Amazon Reforestation" required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Type</label>
                  <input name="projectType" value={form.projectType} onChange={handleChange} placeholder="Solar, Wind, etc." required />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input name="location" value={form.location} onChange={handleChange} placeholder="City, Country" required />
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Reduction (CO2 tons)</label>
                <input type="number" name="estimatedReduction" value={form.estimatedReduction} onChange={handleChange} placeholder="0" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Processing..." : "Submit Project"}
              </button>
            </form>
          </section>

          {/* Project List Section */}
          <section className="dashboard-card table-section">
            <h3><span className="icon">📊</span> My Projects</h3>
            <div className="table-responsive">
              <table className="project-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Project Name</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td className="bold">{p.projectName}</td>
                      <td>{p.projectType}</td>
                      <td>
                        <span className={`status-badge ${p.status?.toLowerCase()}`}>
                          {p.status || "PENDING"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr><td colSpan="4" className="empty-msg">No projects found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OwnerDashboard;