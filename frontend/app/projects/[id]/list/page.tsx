"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/app/api/api";
import FeatureList from "@/app/features/list";
import { Project } from "@/app/types";
import styles from "../project.module.css";

const ProjectListPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    } catch (error) {
      console.error("Failed to fetch project", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      <div className={styles.projectHeader}>
        <h1>{project.name} Features</h1>
      </div>
      <FeatureList projectId={id} onFeatureUpdated={fetchProject} />
    </div>
  );
};

export default ProjectListPage; 