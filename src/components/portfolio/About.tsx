import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

const TECH = [
  "React", "Node.js", "Express", "MongoDB",
  "Mongoose", "JWT", "Tailwind CSS", "JavaScript",
  "REST APIs", "Git",
];

const HEADLINE_WORDS = ["I build", "websites", "that feel", "alive."];

/* ── animated counter ────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {val}{suffix}
    </span>
  );
}

/* ── marquee tech strip ──────────────────────────────────────── */
function TechMarquee({ triggered }: { triggered: boolean }) {
  const doubled = [...TECH, ...TECH];
  return (
    <div className="relative mt-10 overflow-hidden">
      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
        style={{ background: "linear-gradient(to right, #050505, transparent)" }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
        style={{ background: "linear-gradient(to left, #050505, transparent)" }} />
      <div
        className="flex gap-3 w-max"
        style={{
          animation: triggered ? "marqueeScroll 18s linear infinite" : "none",
        }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="shrink-0 rounded-full border border-white/8 px-4 py-1.5 font-mono text-xs text-white/35
                       transition-all duration-300 hover:border-[#A259FF]/40 hover:text-[#A259FF] hover:scale-105 cursor-default"
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ── word-by-word staggered reveal ──────────────────────────── */
function AnimatedHeadline({ triggered }: { triggered: boolean }) {
  return (
    <h2 className="font-display font-black leading-[0.92] tracking-tight">
      {HEADLINE_WORDS.map((word, i) => {
        const isLast = i === HEADLINE_WORDS.length - 1;
        return (
          <div key={word} className="overflow-hidden">
            <span
              className={`block text-[clamp(2.8rem,6vw,5.5rem)] ${
                isLast ? "text-[#A259FF] v-glow-text" : "text-white"
              }`}
              style={{
                display: "inline-block",
                animation: triggered
                  ? `slideReveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards`
                  : "none",
                animationDelay: `${i * 110}ms`,
                opacity: triggered ? undefined : 0,
              }}
            >
              {word}
            </span>
          </div>
        );
      })}
    </h2>
  );
}

/* ── stat card with hover lift ───────────────────────────────── */
function StatCard({
  value, suffix, label, delay, triggered,
}: { value: number; suffix: string; label: string; delay: number; triggered: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-2xl border border-white/6 p-6 transition-all duration-300 cursor-default"
      style={{
        opacity: triggered ? 1 : 0,
        transform: triggered
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(20px)",
        transitionDelay: `${delay}ms`,
        background: hovered ? "rgba(162,89,255,0.06)" : "rgba(255,255,255,0.02)",
        boxShadow: hovered ? "0 0 30px -8px rgba(162,89,255,0.3)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="font-display text-4xl font-black text-white">
        <Counter to={value} suffix={suffix} />
      </p>
      <p className="label mt-1 text-white/30">{label}</p>
    </div>
  );
}

export function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 divider overflow-hidden"
      aria-label="About me"
    >
      {/* Background orb */}
      <div
        className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-[0.04]"
        style={{
          background: "#A259FF",
          filter: "blur(120px)",
          animation: "pulseGlow 7s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Label */}
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <span className="label-accent">01 — About Me</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <AnimatedHeadline triggered={inView} />

            {/* Decorative line */}
            <div
              className="mt-8 h-px rounded-full"
              style={{
                background: "linear-gradient(90deg, #A259FF, transparent)",
                width: inView ? "200px" : "0px",
                transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: "500ms",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Right */}
          <div>
            <p
              className="text-base leading-relaxed text-white/50 md:text-[17px] transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "200ms",
              }}
            >
              I'm a full-stack web developer who enjoys turning ideas into
              clean, interactive and useful digital products.
            </p>
            <p
              className="mt-5 text-[15px] leading-relaxed text-white/35 transition-all duration-700"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "320ms",
              }}
            >
              I work with React, Node.js, Express, MongoDB and modern JavaScript
              to build responsive interfaces and secure, scalable APIs.
            </p>

            {/* Marquee tech strip */}
            <TechMarquee triggered={inView} />

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <StatCard value={5}  suffix="+" label="Projects built"   delay={500} triggered={inView} />
              <StatCard value={1}  suffix="+" label="Year experience"  delay={650} triggered={inView} />
              <StatCard value={99} suffix="%" label="Coffee-powered"   delay={800} triggered={inView} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
