"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/app/api/api";
import styles from '../../create/page.module.css'; // Reuse existing styles

interface Project {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  owner: {
    username: string;
  };
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Failed to fetch project", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading project...</div>;
  }

  if (!project) {
    return <div className={styles.error}>Project not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{project.name}</h1>
      <div className={styles.card}>
        <p><strong>Description:</strong> {project.description}</p>
        <p><strong>Owner:</strong> {project.owner.username}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;