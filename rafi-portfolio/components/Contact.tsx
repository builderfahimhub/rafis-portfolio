"use client";

import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  const inputClass = "w-full rounded-sm text-sm px-3.5 py-2.5 outline-none focus:border-[var(--border2)]";
  const inputStyle = { background: "var(--bg2)", border: "0.5px solid var(--border)", color: "var(--text)", fontFamily: "inherit" };
  const labelStyle = { fontSize: 11, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "var(--text3)" };

  return (
    <section id="contact" className="py-24 px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent2)", letterSpacing: "0.18em" }}>
          Let's Collaborate
        </div>
        <h2 className="font-display leading-none" style={{ fontSize: "clamp(36px,5vw,54px)", letterSpacing: "0.03em" }}>
          START A<br />PROJECT
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div>
          <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text2)", lineHeight: 1.75 }}>
            Available for freelance projects, brand collaborations, and full-time opportunities.
            Let's build something remarkable together.
          </p>
          <div className="flex flex-col gap-5">
            {[
              { label: "Email", value: "rafi@rafiahmed.design", highlight: true },
              { label: "Based In", value: "Dhaka, Bangladesh", highlight: true },
              { label: "Availability", value: "Open to Work", color: "#7ab88a" },
            ].map(({ label, value, highlight, color }) => (
              <div key={label}>
                <div className="mb-1" style={labelStyle}>{label}</div>
                <div className="text-sm" style={{ color: color || "var(--accent)" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Name</label>
              <input className={inputClass} style={inputStyle} placeholder="Your name" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label style={labelStyle}>Email</label>
              <input type="email" className={inputClass} style={inputStyle} placeholder="Your email" required />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Project Type</label>
            <select className={inputClass} style={inputStyle}>
              <option value="">Select type...</option>
              <option>Brand Identity</option>
              <option>Typography</option>
              <option>Illustration</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label style={labelStyle}>Message</label>
            <textarea className={inputClass} style={{ ...inputStyle, minHeight: 120, resize: "none" }}
              placeholder="Tell me about your project..." required />
          </div>
          <button type="submit"
            className="w-full py-3 rounded-sm text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: sent ? "#4a7c59" : "var(--accent)", color: "#0a0a0a" }}>
            {sent ? "Message Sent!" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
