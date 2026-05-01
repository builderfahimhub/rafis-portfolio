"use client";

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 px-16 relative overflow-hidden"
      style={{ maxWidth: "100%" }}>
      {/* Ambient glow */}
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,168,130,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-3xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6 text-xs tracking-widest uppercase"
          style={{ color: "var(--accent2)", letterSpacing: "0.18em" }}>
          <span className="block w-8 h-px" style={{ background: "var(--accent2)" }} />
          Visual Design & Brand Identity
        </div>

        {/* Title */}
        <h1 className="font-display leading-none mb-8"
          style={{ fontSize: "clamp(64px, 10vw, 120px)", letterSpacing: "0.02em", lineHeight: 0.92 }}>
          RAFI<br />
          <span style={{ color: "var(--accent)" }}>AHMED</span>
        </h1>

        {/* Desc */}
        <p className="text-base leading-relaxed mb-10 max-w-md"
          style={{ color: "var(--text2)", lineHeight: 1.75 }}>
          Crafting visual identities that resonate. From brand strategy to editorial
          typography — design with intent, executed with precision.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("gallery")}
            className="px-7 py-3 rounded-sm text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}>
            View Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-7 py-3 rounded-sm text-sm transition-all hover:opacity-80"
            style={{ border: "0.5px solid var(--border2)", color: "var(--text2)" }}>
            Get in Touch
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-12 mt-16 pt-10"
          style={{ borderTop: "0.5px solid var(--border)" }}>
          {[
            { num: "8+", label: "Years Experience" },
            { num: "120+", label: "Projects Done" },
            { num: "40+", label: "Happy Clients" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="font-display text-4xl" style={{ color: "var(--accent)", lineHeight: 1 }}>{num}</div>
              <div className="text-xs mt-1 uppercase tracking-wider" style={{ color: "var(--text3)", letterSpacing: "0.05em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
