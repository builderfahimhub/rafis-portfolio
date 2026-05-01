"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, X, LayoutDashboard } from "lucide-react";
import { Project, Category } from "@/lib/store";

interface AdminProps {
  projects: Project[];
  onAdd: (p: Omit<Project, "id">) => void;
  onUpdate: (p: Project) => void;
  onDelete: (id: number) => void;
  onLogout?: () => void;
}

const CATEGORIES: Category[] = ["Branding", "Typography", "Illustrations"];

const CAT_STYLE: Record<Category, { bg: string; color: string }> = {
  Branding: { bg: "rgba(196,168,130,0.12)", color: "#c4a882" },
  Typography: { bg: "rgba(74,124,89,0.15)", color: "#7ab88a" },
  Illustrations: { bg: "rgba(100,120,160,0.15)", color: "#8aabe8" },
};

const emptyForm = { title: "", category: "Branding" as Category, imageUrl: "", description: "" };

export default function AdminDashboard({ projects, onAdd, onUpdate, onDelete, onLogout }: AdminProps) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const handleSave = () => {
    if (!form.title.trim()) return showToast("Please enter a project title");
    if (editingId !== null) {
      onUpdate({ ...form, id: editingId });
      setEditingId(null);
      showToast("Project updated");
    } else {
      onAdd(form);
      showToast("Project added");
    }
    setForm(emptyForm);
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({ title: p.title, category: p.category, imageUrl: p.imageUrl, description: p.description || "" });
  };

  const cancelEdit = () => { setEditingId(null); setForm(emptyForm); };

  const inputStyle = { background: "#1a1a1a", border: "0.5px solid #2a2a2a", color: "#f0ede8", fontFamily: "inherit" };
  const inputClass = "w-full rounded-sm text-sm px-3.5 py-2.5 outline-none";
  const labelStyle: React.CSSProperties = { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#605850" };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Admin Bar */}
      <div className="flex items-center gap-4 px-8 h-11 text-sm"
        style={{ background: "#111111", borderBottom: "0.5px solid #2a2a2a" }}>
        <LayoutDashboard size={14} style={{ color: "#605850" }} />
        <span style={{ color: "#605850", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Dashboard</span>
        <span style={{ color: "#a09890" }}>Rafi Ahmed</span>
        <span className="ml-auto flex items-center gap-4">
          <span className="text-xs" style={{ color: "#605850" }}>{projects.length} projects</span>
          <a href="/" className="text-xs hover:underline" style={{ color: "#605850", textDecoration: "none" }}>← Portfolio</a>
          {onLogout && (
            <button onClick={onLogout}
              className="text-xs px-3 py-1 rounded-sm"
              style={{ border: "0.5px solid #3a2a2a", color: "#a05050", background: "transparent", cursor: "pointer", fontFamily: "inherit" }}>
              Sign Out
            </button>
          )}
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 items-start">

          {/* ADD / EDIT FORM */}
          <div className="rounded-md p-6" style={{ background: "#111111", border: "0.5px solid #2a2a2a" }}>
            <div className="text-xs uppercase tracking-widest mb-5 pb-4"
              style={{ letterSpacing: "0.1em", color: "#605850", borderBottom: "0.5px solid #2a2a2a" }}>
              {editingId !== null ? "Edit Project" : "Add New Project"}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label style={labelStyle}>Project Title</label>
                <input className={inputClass} style={inputStyle}
                  placeholder="e.g. Lumina Brand Identity"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={labelStyle}>Category</label>
                <select className={inputClass} style={inputStyle}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={labelStyle}>Image URL</label>
                <input className={inputClass} style={inputStyle}
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label style={labelStyle}>Description</label>
                <textarea className={inputClass} style={{ ...inputStyle, minHeight: 72, resize: "none" }}
                  placeholder="Short description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <div className="flex gap-2 mt-1">
                <button onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm text-sm font-medium"
                  style={{ background: "#e8d5b0", color: "#0a0a0a", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  <Plus size={14} />
                  {editingId !== null ? "Update Project" : "Save Project"}
                </button>
                {editingId !== null && (
                  <button onClick={cancelEdit}
                    className="flex items-center justify-center px-3 rounded-sm"
                    style={{ border: "0.5px solid #3a3a3a", color: "#a09890", background: "transparent", cursor: "pointer" }}>
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* PROJECT LIST */}
          <div className="rounded-md p-6" style={{ background: "#111111", border: "0.5px solid #2a2a2a" }}>
            <div className="text-xs uppercase tracking-widest mb-5 pb-4"
              style={{ letterSpacing: "0.1em", color: "#605850", borderBottom: "0.5px solid #2a2a2a" }}>
              Current Projects
            </div>

            {projects.length === 0 ? (
              <p className="text-center py-10 text-sm" style={{ color: "#605850" }}>No projects yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded"
                    style={{ border: "0.5px solid #2a2a2a", background: "#1a1a1a" }}>
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} className="w-12 h-9 rounded object-cover flex-shrink-0"
                        onError={(e) => (e.currentTarget.style.display = "none")} />
                    ) : (
                      <div className="w-12 h-9 rounded flex-shrink-0" style={{ background: "#222222" }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: "#f0ede8" }}>{p.title}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-sm text-xs uppercase"
                        style={{ ...CAT_STYLE[p.category], letterSpacing: "0.06em", fontSize: 10 }}>
                        {p.category}
                      </span>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => startEdit(p)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs"
                        style={{ border: "0.5px solid #2a2a2a", color: "#c4a882", background: "transparent", cursor: "pointer", fontFamily: "inherit" }}>
                        <Pencil size={11} /> Edit
                      </button>
                      <button onClick={() => { onDelete(p.id); showToast("Project deleted"); }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs"
                        style={{ border: "0.5px solid #2a2a2a", color: "#a05050", background: "transparent", cursor: "pointer", fontFamily: "inherit" }}>
                        <Trash2 size={11} /> Del
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 text-sm px-5 py-3 rounded"
          style={{ background: "#1a1a1a", border: "0.5px solid #3a3a3a", color: "#f0ede8", zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
