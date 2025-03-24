"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/app/api/api";
import FeatureBoard from "@/app/components/FeatureBoard";
import { Project } from "@/app/types";
import styles from "../project.module.css";

const ProjectBoardPage = () => {
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
        <h1>{project.name} Board</h1>
      </div>
      <FeatureBoard projectId={id} onFeatureUpdated={fetchProject} />
    </div>
  );
};

export default ProjectBoardPage;