"use client";

import { useState } from "react";
import { Project, Category } from "@/lib/store";

const FILTERS: (Category | "All")[] = ["All", "Branding", "Typography", "Illustrations"];

const CAT_COLORS: Record<Category, string> = {
  Branding: "#1a1510",
  Typography: "#101518",
  Illustrations: "#101418",
};

interface GalleryProps {
  projects: Project[];
}

export default function Gallery({ projects }: GalleryProps) {
  const [filter, setFilter] = useState<Category | "All">("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="py-24 px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent2)", letterSpacing: "0.18em" }}>
          Selected Work
        </div>
        <h2 className="font-display leading-none" style={{ fontSize: "clamp(36px,5vw,54px)", letterSpacing: "0.03em" }}>
          RECENT<br />PROJECTS
        </h2>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-sm text-xs uppercase tracking-wider transition-all"
            style={{
              letterSpacing: "0.06em",
              border: "0.5px solid " + (filter === f ? "var(--accent)" : "var(--border)"),
              background: filter === f ? "var(--accent)" : "transparent",
              color: filter === f ? "#0a0a0a" : "var(--text2)",
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {filtered.map((project, i) => (
          <GalleryCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({ project, index }: { project: Project; index: number }) {
  const heights = [220, 180, 260, 200, 240, 190];
  const h = heights[index % heights.length];
  const bg = CAT_COLORS[project.category];

  return (
    <div className="gallery-item break-inside-avoid mb-6 relative overflow-hidden rounded cursor-pointer group">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="gallery-thumb w-full object-cover block"
          style={{ height: h }}
        />
      ) : (
        <div
          className="gallery-thumb w-full block"
          style={{ height: h, background: bg }}
        />
      )}
      {/* Overlay */}
      <div className="gallery-overlay absolute inset-0 opacity-0 transition-opacity flex items-end p-5"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)" }}>
        <div>
          <div className="text-sm font-medium text-white">{project.title}</div>
          <div className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}>
            {project.category}
          </div>
        </div>
      </div>
    </div>
  );
}
