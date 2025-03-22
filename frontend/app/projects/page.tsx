"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import API from "@/app/api/api";
import styles from '../layout.module.css'; // Reuse layout styles
import formStyles from '../create/page.module.css'; // Reuse form styles

interface Project {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  owner: {
    username: string;
  };
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
        setError("");
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Delete project
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete(`/projects/${id}`);
        setProjects(projects.filter((project) => project.id !== id));
        alert("Project deleted successfully");
      } catch (error) {
        console.error("Failed to delete project", error);
        alert("Failed to delete project");
      }
    }
  };

  if (loading) {
    return <div className={formStyles.loading}>Loading projects...</div>;
  }

  if (error) {
    return <div className={formStyles.error}>{error}</div>;
  }

  return (
    <div className={styles.mainContent}>
      <div className={formStyles.container}>
        <div className={formStyles.header}>
          <h1>Project Management</h1>
          <Link href="/create-project" className={formStyles.primaryButton}>
            Create Project
          </Link>
        </div>
        
        {projects.length === 0 ? (
          <div className={formStyles.emptyState}>No projects found</div>
        ) : (
          <table className={formStyles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Owner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.owner.username}</td>
                  <td>
                    <div className={formStyles.actions}>
                      <Link
                        href={`/projects/${project.id}`}
                        className={formStyles.secondaryButton}
                      >
                        View
                      </Link>
                      <button 
                        className={formStyles.dangerButton}
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;