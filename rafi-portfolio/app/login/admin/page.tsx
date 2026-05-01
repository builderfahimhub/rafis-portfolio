"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { initialProjects, Project } from "@/lib/store";

export default function AdminPage() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const addProject = (p: Omit<Project, "id">) =>
    setProjects((prev) => [...prev, { ...p, id: Date.now() }]);

  const updateProject = (updated: Project) =>
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

  const deleteProject = (id: number) =>
    setProjects((prev) => prev.filter((p) => p.id !== id));

  return (
    <AdminDashboard
      projects={projects}
      onAdd={addProject}
      onUpdate={updateProject}
      onDelete={deleteProject}
      onLogout={() => {
        logout();
        router.push("/login");
      }}
    />
  );
}
