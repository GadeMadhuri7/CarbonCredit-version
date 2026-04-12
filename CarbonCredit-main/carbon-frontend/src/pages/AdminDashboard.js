import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "./Navbar";

function AdminDashboard() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const verifyProject = async (id) => {
    await API.post(`/verifications/approve?projectId=${id}&reduction=100`);
    fetchProjects();
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h2>Admin Dashboard</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Verify</th>
            </tr>
          </thead>

          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.projectName}</td>
                <td>{p.status}</td>
                <td>
                  <button onClick={()=>verifyProject(p.id)}>Verify</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AdminDashboard;