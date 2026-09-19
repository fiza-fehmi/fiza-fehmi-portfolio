import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

const TECH = ["React", "Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Tailwind CSS", "JavaScript", "REST APIs", "Git"];

/* ── letter-split headline ───────────────────────────────────── */
const HEADLINE = ["I BUILD", "WEBSITES", "THAT FEEL", "ALIVE."];

function SplitHeadline({ triggered }: { triggered: boolean }) {
  return (
    <h2 className="font-display font-black leading-[0.9] tracking-tight">
      {HEADLINE.map((word, wi) => {
        const isLast = wi === HEADLINE.length - 1;
        const chars = word.split("");
        return (
          <div key={word} className="overflow-hidden">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {chars.map((ch, ci) => (
                <span
                  key={ci}
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(2.8rem,6vw,5.5rem)",
                    color: isLast ? "#A259FF" : "white",
                    animation: triggered ? `slideReveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
                    animationDelay: `${wi * 80 + ci * 28}ms`,
                    opacity: triggered ? undefined : 0,
                    ...(ch === " " ? { width: "0.3em" } : {}),
                    ...(isLast ? { filter: triggered ? "drop-shadow(0 0 20px rgba(162,89,255,0.5))" : "none" } : {}),
                  }}
                >
                  {ch}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </h2>
  );
}

/* ── animated counter with end-pop ──────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const [popped, setPopped] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= to) {
        setVal(to);
        clearInterval(id);
        setTimeout(() => setPopped(true), 50);
        setTimeout(() => setPopped(false), 400);
      } else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      style={{ display: "inline-block", animation: popped ? "scalePop 0.4s ease forwards" : "none" }}
    >
      {val}{suffix}
    </span>
  );
}

/* ── shimmer stat card ───────────────────────────────────────── */
function StatCard({ value, suffix, label, delay, triggered }: { value: number; suffix: string; label: string; delay: number; triggered: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        borderRadius: 16, border: hovered ? "1px solid rgba(162,89,255,0.3)" : "1px solid rgba(255,255,255,0.06)",
        padding: "1.5rem", cursor: "default", position: "relative", overflow: "hidden",
        opacity: triggered ? 1 : 0,
        transform: triggered ? hovered ? "translateY(-8px) scale(1.02)" : "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
        background: hovered ? "rgba(162,89,255,0.07)" : "rgba(255,255,255,0.02)",
        boxShadow: hovered ? "0 0 32px -8px rgba(162,89,255,0.35)" : "none",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* shimmer sweep on hover */}
      {hovered && (
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 40%, rgba(162,89,255,0.08) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmer 0.8s ease forwards", pointerEvents: "none" }} aria-hidden="true" />
      )}
      <p className="font-display font-black text-white" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", lineHeight: 1 }}>
        <Counter to={value} suffix={suffix} />
      </p>
      <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: 8 }}>{label}</p>
    </div>
  );
}

/* ── marquee ─────────────────────────────────────────────────── */
function TechMarquee({ triggered }: { triggered: boolean }) {
  const doubled = [...TECH, ...TECH];
  return (
    <div style={{ position: "relative", marginTop: "2.5rem", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: 64, zIndex: 1, pointerEvents: "none", background: "linear-gradient(to right, #050505, transparent)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: 64, zIndex: 1, pointerEvents: "none", background: "linear-gradient(to left, #050505, transparent)" }} />
      <div style={{ display: "flex", gap: 10, width: "max-content", animation: triggered ? "marqueeScroll 18s linear infinite" : "none" }}>
        {doubled.map((t, i) => (
          <span
            key={i}
            style={{ flexShrink: 0, borderRadius: 999, border: "1px solid rgba(255,255,255,0.07)", padding: "6px 16px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", cursor: "default", transition: "all 0.2s ease", whiteSpace: "nowrap" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(162,89,255,0.4)"; el.style.color = "#A259FF"; el.style.transform = "scale(1.06)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.color = "rgba(255,255,255,0.35)"; el.style.transform = "scale(1)"; }}
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

export function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="relative divider overflow-hidden" style={{ padding: "8rem 2rem" }} aria-label="About me">
      {/* drifting BG orb */}
      <div className="pointer-events-none absolute" style={{ right: "-10%", top: "40%", width: 500, height: 500, borderRadius: "50%", background: "#A259FF", filter: "blur(130px)", opacity: 0.045, animation: "driftFloat 20s ease-in-out infinite" }} aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Label */}
        <div style={{ marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A259FF" }}>01 — About Me</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Left */}
          <div style={{ animation: inView ? "slideInLeft 0.7s ease forwards" : "none", opacity: inView ? undefined : 0 }}>
            <SplitHeadline triggered={inView} />
            <div style={{ marginTop: "2rem", height: 1, borderRadius: 999, background: "linear-gradient(90deg, #A259FF, transparent)", width: inView ? "220px" : "0px", transition: "width 1.3s cubic-bezier(0.16,1,0.3,1) 0.5s" }} aria-hidden="true" />
          </div>

          {/* Right */}
          <div style={{ animation: inView ? "slideInRight 0.7s ease 0.15s forwards" : "none", opacity: inView ? undefined : 0 }}>
            <p style={{ fontSize: "clamp(0.95rem,1.5vw,1.05rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.5)" }}>
              I'm a full-stack web developer who enjoys turning ideas into clean, interactive and useful digital products.
            </p>
            <p style={{ marginTop: "1.2rem", fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(255,255,255,0.3)" }}>
              I work with React, Node.js, Express, MongoDB and modern JavaScript to build responsive interfaces and secure, scalable APIs.
            </p>

            <TechMarquee triggered={inView} />

            <div className="grid grid-cols-3 gap-4" style={{ marginTop: "3rem" }}>
              <StatCard value={5}  suffix="+" label="Projects Built"  delay={400} triggered={inView} />
              <StatCard value={1}  suffix="+" label="Year Experience" delay={550} triggered={inView} />
              <StatCard value={99} suffix="%" label="Coffee Powered"  delay={700} triggered={inView} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
