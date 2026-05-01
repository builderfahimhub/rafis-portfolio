"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, X, LayoutDashboard } from "lucide-react";
import { Project, Category } from "@/lib/store";

interface AdminProps {
  projects: Project[];
  onAdd: (p: Omit<Project, "id">) => void;
  onUpdate: (p: Project) => void;
  onDelete: (id: number) => void;
}

const CATEGORIES: Category[] = ["Branding", "Typography", "Illustrations"];

const CAT_STYLE: Record<Category, { bg: string; color: string }> = {
  Branding: { bg: "rgba(196,168,130,0.12)", color: "#c4a882" },
  Typography: { bg: "rgba(74,124,89,0.15)", color: "#7ab88a" },
  Illustrations: { bg: "rgba(100,120,160,0.15)", color: "#8aabe8" },
};

const emptyForm = { title: "", category: "Branding" as Category, imageUrl: "", description: "" };

export default function AdminDashboard({ projects, onAdd, onUpdate, onDelete }: AdminProps) {
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

  const inputStyle = { background: "var(--bg3)", border: "0.5px solid var(--border)", color: "var(--text)", fontFamily: "inherit" };
  const inputClass = "w-full rounded-sm text-sm px-3.5 py-2.5 outline-none";
  const labelStyle: React.CSSProperties = { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text3)" };

  return (
    <div className="pt-14 min-h-screen">
      {/* Admin Bar */}
      <div className="flex items-center gap-4 px-8 h-11 text-sm"
        style={{ background: "var(--bg2)", borderBottom: "0.5px solid var(--border)" }}>
        <LayoutDashboard size={14} style={{ color: "var(--text3)" }} />
        <span style={{ color: "var(--text3)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Dashboard</span>
        <span style={{ color: "var(--text2)" }}>Rafi Ahmed — Project Manager</span>
        <span className="ml-auto text-xs" style={{ color: "var(--text3)" }}>{projects.length} projects</span>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 items-start">

          {/* ── ADD / EDIT FORM ── */}
          <div className="rounded-md p-6" style={{ background: "var(--bg2)", border: "0.5px solid var(--border)" }}>
            <div className="text-xs uppercase tracking-widest mb-5 pb-4"
              style={{ letterSpacing: "0.1em", color: "var(--text3)", borderBottom: "0.5px solid var(--border)" }}>
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
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ background: "var(--accent)", color: "#0a0a0a" }}>
                  <Plus size={14} />
                  {editingId !== null ? "Update Project" : "Save Project"}
                </button>
                {editingId !== null && (
                  <button onClick={cancelEdit}
                    className="flex items-center justify-center px-3 rounded-sm transition-all hover:opacity-80"
                    style={{ border: "0.5px solid var(--border2)", color: "var(--text2)" }}>
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── PROJECT LIST ── */}
          <div className="rounded-md p-6" style={{ background: "var(--bg2)", border: "0.5px solid var(--border)" }}>
            <div className="text-xs uppercase tracking-widest mb-5 pb-4"
              style={{ letterSpacing: "0.1em", color: "var(--text3)", borderBottom: "0.5px solid var(--border)" }}>
              Current Projects
            </div>

            {projects.length === 0 ? (
              <p className="text-center py-10 text-sm" style={{ color: "var(--text3)" }}>No projects yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded"
                    style={{ border: "0.5px solid var(--border)", background: "var(--bg3)" }}>
                    {/* Thumb */}
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} className="w-12 h-9 rounded object-cover flex-shrink-0"
                        onError={(e) => (e.currentTarget.style.display = "none")} />
                    ) : (
                      <div className="w-12 h-9 rounded flex-shrink-0" style={{ background: "var(--bg4)" }} />
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{p.title}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-sm text-xs uppercase"
                        style={{ ...CAT_STYLE[p.category], letterSpacing: "0.06em", fontSize: 10 }}>
                        {p.category}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => startEdit(p)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs transition-all hover:opacity-80"
                        style={{ border: "0.5px solid var(--border)", color: "var(--accent2)" }}>
                        <Pencil size={11} /> Edit
                      </button>
                      <button onClick={() => { onDelete(p.id); showToast("Project deleted"); }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs transition-all hover:opacity-80"
                        style={{ border: "0.5px solid var(--border)", color: "#a05050" }}>
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

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 text-sm px-5 py-3 rounded"
          style={{ background: "var(--bg3)", border: "0.5px solid var(--border2)", color: "var(--text)", zIndex: 999 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
