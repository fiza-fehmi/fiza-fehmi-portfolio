import { useEffect, useRef, useState } from "react";

/* ── word list — accent = violet highlight ───────────────────── */
const WORDS = [
  { text: "I build",      accent: false },
  { text: "digital",      accent: true  },
  { text: "experiences.", accent: false },
];

/* ── tiny animated grid background ──────────────────────────── */
function GridBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: 0.025 }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
}

/* ── floating violet orbs ────────────────────────────────────── */
function Orbs() {
  return (
    <>
      {/* Large primary orb — upper right */}
      <div
        className="hero-orb absolute"
        style={{
          right: "-5%",
          top: "5%",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, #A259FF 0%, transparent 70%)",
          animation: "pulseGlow 6s ease-in-out infinite",
          opacity: 0.1,
        }}
      />
      {/* Secondary orb — lower left */}
      <div
        className="hero-orb absolute"
        style={{
          left: "-8%",
          bottom: "10%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, #6C3FC5 0%, transparent 70%)",
          animation: "pulseGlow 8s ease-in-out infinite",
          animationDelay: "3s",
          opacity: 0.07,
        }}
      />
      {/* Tiny accent dot — centre right */}
      <div
        className="hero-orb absolute"
        style={{
          right: "25%",
          top: "55%",
          width: 200,
          height: 200,
          background: "radial-gradient(circle, #BF80FF 0%, transparent 70%)",
          animation: "pulseGlow 5s ease-in-out infinite",
          animationDelay: "1.5s",
          opacity: 0.06,
        }}
      />
    </>
  );
}

/* ── floating tag badges ─────────────────────────────────────── */
const BADGES = ["React", "Node.js", "MongoDB", "Express", "TypeScript"];

function FloatingBadges({ visible }: { visible: boolean }) {
  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
      {BADGES.map((b, i) => (
        <div
          key={b}
          className="rounded-full border border-white/8 bg-white/3 px-4 py-1.5 font-mono text-xs text-white/30 backdrop-blur-sm transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(20px)",
            transitionDelay: `${900 + i * 80}ms`,
            animation: visible
              ? `floatY ${4 + i * 0.4}s ease-in-out infinite`
              : "none",
            animationDelay: `${i * 0.5}s`,
          }}
        >
          {b}
        </div>
      ))}
    </div>
  );
}

/* ── main component ──────────────────────────────────────────── */
export function Hero() {
  const [visible, setVisible] = useState(false);
  const [linesDone, setLinesDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* trigger entrance */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setLinesDone(true), 1200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  /* subtle particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: -(Math.random() * 0.3 + 0.1),
      alpha: Math.random() * 0.25 + 0.05,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(162,89,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < 0)  p.x = W;
        if (p.x > W)  p.x = 0;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-20"
      aria-label="Hero"
    >
      <GridBg />
      <Orbs />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Floating tech badges */}
      <FloatingBadges visible={visible} />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl w-full">

        {/* Top label — slides down */}
        <div
          className="mb-10 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transitionDelay: "80ms",
          }}
        >
          <span className="label-accent">Full-Stack Web Developer · Pakistan</span>
        </div>

        {/* ── Giant headline with clip-mask reveal ── */}
        <h1
          className="font-display font-black leading-[0.92] tracking-tight"
          aria-label="I build digital experiences"
        >
          {WORDS.map((word, i) => (
            <div
              key={word.text}
              className="overflow-hidden"
            >
              <span
                className={`block text-[clamp(3rem,8vw,7rem)] ${
                  word.accent ? "text-[#A259FF] v-glow-text" : "text-white"
                }`}
                style={{
                  display: "inline-block",
                  animation: visible
                    ? `slideReveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards`
                    : "none",
                  animationDelay: `${180 + i * 140}ms`,
                  opacity: visible ? undefined : 0,
                }}
              >
                {word.text}
              </span>
            </div>
          ))}
        </h1>

        {/* ── Sub-paragraph — fades in after headline ── */}
        <p
          className="mt-10 max-w-sm text-[15px] leading-relaxed text-white/35"
          style={{
            animation: linesDone
              ? "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards"
              : "none",
            opacity: linesDone ? undefined : 0,
          }}
        >
          Full-stack web developer focused on building modern, responsive
          websites and web applications that are simple, useful and memorable.
        </p>

        {/* ── Decorative violet line — draws in ── */}
        <div
          className="mt-12 h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #A259FF 0%, rgba(162,89,255,0.1) 60%, transparent 100%)",
            width: linesDone ? "280px" : "0px",
            transition: "width 1s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: "200ms",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
