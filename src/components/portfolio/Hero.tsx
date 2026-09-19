import { useEffect, useRef, useState } from "react";

const WORDS = [
  { text: "I BUILD",      accent: false },
  { text: "DIGITAL",      accent: false },
  { text: "EXPERIENCES.", accent: true  },
];

const BADGES = ["React", "Node.js", "MongoDB", "Express", "TypeScript"];

const NAME_CHARS = "Fiza Fehmi".split("");

/* ── drifting orbs ───────────────────────────────────────────── */
function Orbs() {
  return (
    <>
      <div className="hero-orb absolute" style={{ right: "-5%", top: "10%", width: 700, height: 700, background: "radial-gradient(circle, #A259FF 0%, transparent 70%)", animation: "driftFloat 18s ease-in-out infinite", opacity: 0.08 }} />
      <div className="hero-orb absolute" style={{ left: "-8%", bottom: "15%", width: 450, height: 450, background: "radial-gradient(circle, #6C3FC5 0%, transparent 70%)", animation: "driftFloat 22s ease-in-out infinite 6s", opacity: 0.06 }} />
      <div className="hero-orb absolute" style={{ right: "25%", top: "55%", width: 250, height: 250, background: "radial-gradient(circle, #BF80FF 0%, transparent 70%)", animation: "driftFloat 14s ease-in-out infinite 3s", opacity: 0.05 }} />
    </>
  );
}

/* ── animated grid ───────────────────────────────────────────── */
function AnimatedGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.022 }}>
        <defs>
          <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" style={{ animation: "gridDrift 20s linear infinite" }} />
      </svg>
    </div>
  );
}

/* ── typewriter name ─────────────────────────────────────────── */
function TypewriterName({ triggered }: { triggered: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    if (count >= NAME_CHARS.length) return;
    const t = setTimeout(() => setCount(c => c + 1), 55);
    return () => clearTimeout(t);
  }, [triggered, count]);

  return (
    <span style={{ color: "white", fontWeight: 700, letterSpacing: "0.02em" }}>
      {NAME_CHARS.slice(0, count).join("")}
      {count < NAME_CHARS.length && (
        <span style={{ display: "inline-block", width: 2, height: "0.85em", background: "#A259FF", marginLeft: 2, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} aria-hidden="true" />
      )}
    </span>
  );
}

/* ── floating badges ─────────────────────────────────────────── */
function FloatingBadges({ visible }: { visible: boolean }) {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
      {BADGES.map((b, i) => (
        <div
          key={b}
          style={{
            borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
            padding: "6px 16px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem",
            color: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(20px)",
            transition: `opacity 0.5s ease ${900 + i * 80}ms, transform 0.5s ease ${900 + i * 80}ms`,
            animation: visible ? `floatY ${4 + i * 0.5}s ease-in-out infinite ${i * 0.6}s` : "none",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(162,89,255,0.4)";
            el.style.color = "#A259FF";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.08)";
            el.style.color = "rgba(255,255,255,0.3)";
          }}
        >
          {b}
        </div>
      ))}
    </div>
  );
}

/* ── particle canvas ─────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.2,
      dy: -(Math.random() * 0.35 + 0.08),
      alpha: Math.random() * 0.22 + 0.04,
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(162,89,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < -4)  { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < 0)   p.x = W;
        if (p.x > W)   p.x = 0;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}

/* ── main ────────────────────────────────────────────────────── */
export function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 150),
      setTimeout(() => setStep(2), 400),
      setTimeout(() => setStep(3), 1300),
      setTimeout(() => setStep(4), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20" aria-label="Hero">
      <AnimatedGrid />
      <Orbs />
      <ParticleCanvas />
      <FloatingBadges visible={step >= 3} />

      <div className="relative z-10 max-w-5xl w-full">

        {/* Availability badge */}
        <div style={{ marginBottom: "2.5rem", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "none" : "translateY(-12px)", transition: "all 0.6s ease" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(162,89,255,0.2)", background: "rgba(162,89,255,0.06)", padding: "6px 16px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A259FF", flexShrink: 0, boxShadow: "0 0 8px 2px rgba(162,89,255,0.5)", animation: "pulseGlow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A259FF" }}>Available for Freelance Projects</span>
          </span>
        </div>

        {/* Typewriter greeting */}
        <div style={{ marginBottom: "1rem", opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "none" : "translateY(8px)", transition: "all 0.6s ease 0.1s" }}>
          <p style={{ fontSize: "clamp(1rem,2vw,1.3rem)", fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>
            Hi, I'm <TypewriterName triggered={step >= 2} /> —
          </p>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black leading-[0.9] tracking-tight" aria-label="I build digital experiences">
          {WORDS.map((word, i) => (
            <div key={word.text} className="overflow-hidden">
              <span
                className={word.accent ? "v-glow-text" : ""}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(3.2rem,9vw,8rem)",
                  color: word.accent ? "#A259FF" : "white",
                  animation: step >= 2 ? `slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
                  animationDelay: `${i * 130}ms`,
                  opacity: step >= 2 ? undefined : 0,
                }}
              >
                {word.text}
              </span>
            </div>
          ))}
        </h1>

        {/* Sub text */}
        <p style={{
          marginTop: "2.5rem", maxWidth: 420, fontSize: "clamp(0.88rem,1.4vw,1rem)", lineHeight: 1.7, color: "rgba(255,255,255,0.35)",
          animation: step >= 3 ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
          opacity: step >= 3 ? undefined : 0,
        }}>
          Full-stack web developer focused on building modern, responsive
          websites and web applications that are simple, useful and memorable.
        </p>

        {/* Animated line */}
        <div style={{
          marginTop: "2rem", height: 1, borderRadius: 999,
          background: "linear-gradient(90deg, #A259FF 0%, rgba(162,89,255,0.15) 60%, transparent 100%)",
          width: step >= 4 ? "300px" : "0px",
          transition: "width 1.1s cubic-bezier(0.16,1,0.3,1)",
        }} aria-hidden="true" />

        {/* Scroll hint */}
        <div style={{ marginTop: "3.5rem", display: "flex", alignItems: "center", gap: 10, opacity: step >= 4 ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>Scroll to explore</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem", animation: "arrowBounce 2s ease-in-out infinite", display: "inline-block" }}>↓</span>
        </div>
      </div>
    </section>
  );
}
