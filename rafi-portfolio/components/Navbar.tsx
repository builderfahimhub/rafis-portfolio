"use client";

import { LayoutDashboard } from "lucide-react";

interface NavbarProps {
  view: "public" | "admin";
  setView: (v: "public" | "admin") => void;
}

export default function Navbar({ view, setView }: NavbarProps) {
  const scrollTo = (id: string) => {
    setView("public");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-8 border-b"
      style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderColor: "var(--border)" }}>
      {/* Logo */}
      <button onClick={() => setView("public")}
        className="font-display text-xl tracking-widest"
        style={{ color: "var(--accent)", letterSpacing: "0.08em" }}>
        Rafi Ahmed
      </button>

      {/* Links */}
      <ul className="flex items-center gap-8 list-none">
        {[
          { label: "Work", action: () => scrollTo("gallery") },
          { label: "Contact", action: () => scrollTo("contact") },
        ].map(({ label, action }) => (
          <li key={label}>
            <button onClick={action}
              className="text-sm tracking-wide hover:text-white transition-colors"
              style={{ color: "var(--text2)", letterSpacing: "0.04em" }}>
              {label}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setView(view === "admin" ? "public" : "admin")}
            className="flex items-center gap-1.5 text-sm tracking-wide transition-colors"
            style={{ color: view === "admin" ? "var(--accent)" : "var(--accent2)", letterSpacing: "0.04em" }}>
            <LayoutDashboard size={14} />
            {view === "admin" ? "Portfolio" : "Admin"}
          </button>
        </li>
      </ul>

      {/* CTA */}
      <button onClick={() => scrollTo("contact")}
        className="text-xs font-medium px-4 py-2 rounded-sm transition-opacity hover:opacity-80"
        style={{ background: "var(--accent)", color: "#0a0a0a", letterSpacing: "0.04em" }}>
        Hire Me
      </button>
    </nav>
  );
}
