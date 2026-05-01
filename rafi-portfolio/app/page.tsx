"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import AdminDashboard from "@/components/AdminDashboard";
import { initialProjects, Project } from "@/lib/store";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [view, setView] = useState<"public" | "admin">("public");

  const addProject = (p: Omit<Project, "id">) => {
    setProjects((prev) => [...prev, { ...p, id: Date.now() }]);
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Navbar view={view} setView={setView} />
      {view === "public" ? (
        <main>
          <Hero />
          <Gallery projects={projects} />
          <Contact />
        </main>
      ) : (
        <AdminDashboard
          projects={projects}
          onAdd={addProject}
          onUpdate={updateProject}
          onDelete={deleteProject}
        />
      )}
    </>
  );
}
