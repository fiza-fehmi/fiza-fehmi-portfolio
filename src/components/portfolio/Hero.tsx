import { useEffect, useState } from "react";

const LINES = [
  { text: "I BUILD",        accent: false },
  { text: "DIGITAL",        accent: false },
  { text: "EXPERIENCES.",   accent: true  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const [step, setStep] = useState(0);
  // step 0 = nothing, 1 = badge, 2 = headline, 3 = sub + btns, 4 = scroll hint

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 500),
      setTimeout(() => setStep(3), 1400),
      setTimeout(() => setStep(4), 1900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      style={{ padding: "0 2rem" }}
      aria-label="Hero"
    >
      {/* ── Subtle grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ opacity: 0.018 }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute"
        aria-hidden="true"
        style={{
          right: "5%", top: "20%",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(183,255,50,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulseGlow 7s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute"
        aria-hidden="true"
        style={{
          left: "-5%", bottom: "15%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(183,255,50,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "pulseGlow 10s ease-in-out infinite 4s",
        }}
      />

      {/* ── Content ── */}
      <div className="container-xl relative z-10 max-w-6xl">

        {/* Availability badge */}
        <div
          className="mb-10"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: "rgba(183,255,50,0.2)", background: "rgba(183,255,50,0.05)" }}>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 6px 2px rgba(183,255,50,0.5)", animation: "pulseGlow 2s ease-in-out infinite" }}
            />
            <span className="eyebrow" style={{ letterSpacing: "0.14em" }}>Available for Freelance Projects</span>
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-black leading-[0.88] tracking-tight" aria-label="I build digital experiences">
          {LINES.map((line, i) => (
            <div key={line.text} className="overflow-hidden">
              <span
                className="block"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9.5rem)",
                  color: line.accent ? "var(--accent)" : "var(--fg)",
                  textShadow: line.accent ? "0 0 60px rgba(183,255,50,0.25)" : "none",
                  display: "block",
                  animation: step >= 2 ? `slideUp 0.75s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
                  animationDelay: `${i * 120}ms`,
                  opacity: step >= 2 ? undefined : 0,
                }}
              >
                {line.text}
              </span>
            </div>
          ))}
        </h1>

        {/* Sub + CTAs */}
        <div
          className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
            className="max-w-md text-base leading-relaxed"
            style={{ color: "var(--fg2)", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
          >
            Full-Stack Developer building modern, scalable web applications
            with React, Node.js, Express and MongoDB.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={() => scrollTo("work")}
              className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:scale-105"
              style={{ background: "var(--accent)", color: "#050505", boxShadow: "0 0 32px -8px rgba(183,255,50,0.5)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 48px -6px rgba(183,255,50,0.65)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px -8px rgba(183,255,50,0.5)"}
            >
              View My Work
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-2 rounded-full border px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "var(--fg2)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.35)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLElement).style.color = "var(--fg2)";
              }}
            >
              Let's Talk
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-0 flex items-center gap-3"
          style={{
            paddingLeft: "clamp(2rem, 5vw, 5rem)",
            opacity: step >= 4 ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span className="eyebrow text-[9px]" style={{ color: "var(--fg3)" }}>Scroll to explore</span>
          <span style={{ color: "var(--fg3)", animation: "arrowBounce 1.8s ease-in-out infinite", display: "inline-block", fontSize: "0.75rem" }}>↓</span>
        </div>
      </div>

      {/* ── Bottom info strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)", opacity: step >= 4 ? 1 : 0, transition: "opacity 1s ease 0.4s" }}
      >
        <span className="eyebrow text-[9px]" style={{ color: "var(--fg3)", letterSpacing: "0.14em" }}>
          Fiza Fehmi — Portfolio 2026
        </span>
        <span className="eyebrow text-[9px]" style={{ color: "var(--fg3)", letterSpacing: "0.14em" }}>
          Bahawalpur, Pakistan
        </span>
      </div>
    </section>
  );
}
