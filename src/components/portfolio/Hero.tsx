import { useEffect, useRef, useState } from "react";

const WORDS = [
  { text: "I BUILD",      accent: false },
  { text: "DIGITAL",      accent: false },
  { text: "EXPERIENCES.", accent: true  },
];

const BADGES = ["React", "Node.js", "MongoDB", "Express", "TypeScript"];
const NAME_CHARS = "Fiza Fehmi".split("");

function Orbs() {
  return (
    <>
      <div style={{ position: "absolute", right: "-5%", top: "10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, #A259FF 0%, transparent 70%)", filter: "blur(130px)", pointerEvents: "none", opacity: 0.08, animation: "driftFloat 18s ease-in-out infinite" }} aria-hidden="true" />
      <div style={{ position: "absolute", left: "-8%", bottom: "15%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, #6C3FC5 0%, transparent 70%)", filter: "blur(130px)", pointerEvents: "none", opacity: 0.06, animation: "driftFloat 22s ease-in-out infinite 6s" }} aria-hidden="true" />
    </>
  );
}

function TypewriterName({ triggered }: { triggered: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered || count >= NAME_CHARS.length) return;
    const t = setTimeout(() => setCount(c => c + 1), 60);
    return () => clearTimeout(t);
  }, [triggered, count]);
  return (
    <span style={{ color: "white", fontWeight: 700 }}>
      {NAME_CHARS.slice(0, count).join("")}
      {count < NAME_CHARS.length && (
        <span style={{ display: "inline-block", width: 2, height: "0.85em", background: "#A259FF", marginLeft: 2, verticalAlign: "text-bottom", animation: "blink 0.8s step-end infinite" }} />
      )}
    </span>
  );
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.3 + 0.3,
      dx: (Math.random() - 0.5) * 0.2,
      dy: -(Math.random() * 0.3 + 0.08),
      alpha: Math.random() * 0.2 + 0.04,
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
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true" />;
}

export function Hero() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 100),
      setTimeout(() => setStep(2), 350),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", padding: "0 2rem" }} aria-label="Hero">
      <Orbs />
      <ParticleCanvas />

      {/* Floating badges */}
      <div style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 12 }} className="hidden lg:flex">
        {BADGES.map((b, i) => (
          <div key={b} style={{
            borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
            padding: "6px 16px", fontSize: "0.7rem", fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.3)",
            opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateX(0)" : "translateX(20px)",
            transition: `opacity 0.5s ease ${900 + i * 80}ms, transform 0.5s ease ${900 + i * 80}ms`,
            animation: step >= 3 ? `floatY ${4 + i * 0.5}s ease-in-out infinite ${i * 0.6}s` : "none",
          }}>
            {b}
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, width: "100%" }}>

        {/* Badge */}
        <div style={{ marginBottom: "2.5rem", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "none" : "translateY(-12px)", transition: "all 0.6s ease" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(162,89,255,0.2)", background: "rgba(162,89,255,0.06)", padding: "6px 16px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A259FF", boxShadow: "0 0 8px 2px rgba(162,89,255,0.5)", animation: "pulseGlow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A259FF" }}>Available for Freelance Projects</span>
          </span>
        </div>

        {/* Greeting */}
        <div style={{ marginBottom: "0.75rem", opacity: step >= 1 ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}>
          <p style={{ fontSize: "clamp(1rem,2vw,1.25rem)", color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
            Hi, I'm <TypewriterName triggered={step >= 1} /> —
          </p>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em", margin: 0 }} aria-label="I build digital experiences">
          {WORDS.map((word, i) => (
            <div key={word.text} style={{ overflow: "hidden" }}>
              <span style={{
                display: "inline-block",
                fontSize: "clamp(3rem,9vw,8rem)",
                color: word.accent ? "#A259FF" : "white",
                filter: word.accent ? "drop-shadow(0 0 30px rgba(162,89,255,0.4))" : "none",
                animation: step >= 2 ? `slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
                animationDelay: `${i * 130}ms`,
                opacity: step >= 2 ? undefined : 0,
              }}>
                {word.text}
              </span>
            </div>
          ))}
        </h1>

        {/* Sub text */}
        <p style={{
          marginTop: "2.5rem", maxWidth: 420, fontSize: "clamp(0.875rem,1.5vw,1rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.35)",
          animation: step >= 3 ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards" : "none",
          opacity: step >= 3 ? undefined : 0,
        }}>
          Full-stack web developer building modern, responsive websites and web applications that are simple, useful and memorable.
        </p>

        {/* Line */}
        <div style={{
          marginTop: "2rem", height: 1, borderRadius: 999,
          background: "linear-gradient(90deg, #A259FF 0%, rgba(162,89,255,0.1) 60%, transparent 100%)",
          width: step >= 4 ? "280px" : "0px",
          transition: "width 1.1s cubic-bezier(0.16,1,0.3,1)",
        }} aria-hidden="true" />

        {/* Scroll hint */}
        <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: 10, opacity: step >= 4 ? 0.4 : 0, transition: "opacity 0.8s ease" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "white" }}>Scroll to explore</span>
          <span style={{ color: "white", animation: "arrowBounce 2s ease-in-out infinite", display: "inline-block" }}>↓</span>
        </div>
      </div>
    </section>
  );
}
