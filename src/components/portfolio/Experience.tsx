import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

const ITEMS = [
  {
    num: "01",
    period: "2026 — Present",
    title: "MERN Stack Developer Intern",
    org: "AI TechSpine LLC · Remote",
    description: "Building and maintaining modern web applications using React, Node.js, Express and MongoDB. Implementing JWT authentication, authorization and clean REST APIs.",
    skills: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    num: "02",
    period: "2024 — 2026",
    title: "Graphic Design & Brand Marketing",
    org: "Freelance",
    description: "Designing visual identities, digital experiences and marketing materials. Bridging design thinking with frontend development.",
    skills: ["Figma", "Brand Identity", "UI/UX", "Marketing"],
  },
  {
    num: "03",
    period: "2022 — Present",
    title: "BS Computer Science",
    org: "University · Pakistan",
    description: "Building a strong foundation in software engineering, web development, data structures and computer science fundamentals.",
    skills: ["Algorithms", "Data Structures", "OOP", "Web Dev"],
  },
];

function useLineProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const visible = window.innerHeight - rect.top;
      const pct = Math.max(0, Math.min(100, (visible / rect.height) * 115 - 8));
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function TimelineItem({ item, index, lineProgress }: { item: typeof ITEMS[number]; index: number; lineProgress: number }) {
  const { ref, inView } = useInView({ threshold: 0.18 });
  const [hovered, setHovered] = useState(false);
  const nodeVisible = lineProgress > (index / ITEMS.length) * 100 - 8;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        position: "relative",
        paddingLeft: "3rem",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: hovered ? "rgba(162,89,255,0.03)" : "transparent",
        borderLeft: hovered ? "2px solid rgba(162,89,255,0.2)" : "2px solid transparent",
        transition: "background 0.3s ease, border-color 0.3s ease",
        opacity: 1,
        transform: inView ? "translateX(0)" : "translateX(-28px)",
        transitionDuration: "0.6s",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline node */}
      <div style={{
        position: "absolute", left: -6, top: 42,
        width: 12, height: 12, borderRadius: "50%",
        background: "#A259FF",
        opacity: nodeVisible ? 1 : 0,
        transform: nodeVisible ? hovered ? "scale(1.8)" : "scale(1)" : "scale(0)",
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered ? "0 0 20px 6px rgba(162,89,255,0.6)" : "0 0 8px 3px rgba(162,89,255,0.4)",
        animation: nodeVisible ? "glowPulseAccent 2.5s ease-in-out infinite" : "none",
      }} aria-hidden="true" />

      <div style={{ display: "grid", gap: "1rem" }} className="md:grid-cols-[200px_1fr] md:gap-16">
        {/* Left */}
        <div>
          <p style={{
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: hovered ? "0.22em" : "0.15em",
            textTransform: "uppercase", color: "#A259FF", opacity: 0.85,
            transition: "letter-spacing 0.3s ease",
          }}>
            {item.num}
          </p>
          <p style={{ fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginTop: 4 }}>
            {item.period}
          </p>
        </div>

        {/* Right */}
        <div>
          <h3 className="font-display font-bold" style={{ fontSize: "clamp(1.1rem,2vw,1.4rem)", color: hovered ? "white" : "rgba(255,255,255,0.9)", transition: "color 0.2s ease" }}>
            {item.title}
          </h3>
          <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{item.org}</p>
          <p style={{ marginTop: "0.75rem", fontSize: "0.875rem", lineHeight: 1.7, color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)", transition: "color 0.3s ease" }}>
            {item.description}
          </p>

          {/* Skill pills — slide in on hover */}
          <div style={{ overflow: "hidden", maxHeight: hovered ? "60px" : 0, opacity: hovered ? 1 : 0, transition: "max-height 0.4s ease, opacity 0.3s ease", marginTop: hovered ? "1rem" : 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {item.skills.map((s, i) => (
              <span key={s} style={{
                borderRadius: 999, border: "1px solid rgba(162,89,255,0.25)", background: "rgba(162,89,255,0.08)",
                padding: "3px 12px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "rgba(162,89,255,0.8)",
                opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.3s ease ${i * 45}ms, transform 0.3s ease ${i * 45}ms`,
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const { ref: sectionRef, inView } = useInView();
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineProgress = useLineProgress(timelineRef);

  return (
    <section id="experience" ref={sectionRef as React.RefObject<HTMLElement>} className="relative divider overflow-hidden" style={{ padding: "8rem 2rem" }} aria-label="Experience">

      {/* BG orb */}
      <div className="pointer-events-none absolute" style={{ left: "-8%", bottom: "5%", width: 400, height: 400, borderRadius: "50%", background: "#A259FF", filter: "blur(110px)", opacity: 0.04, animation: "driftFloat 24s ease-in-out infinite 8s" }} aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: "4rem", opacity: 1, transform: inView ? "none" : "translateY(20px)", transition: "all 0.6s ease" }}>
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#A259FF" }}>03 — Experience</span>
          <h2 className="font-display font-black" style={{ marginTop: "1rem", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            {["WHERE I'VE", "BEEN."].map((line, i) => (
              <div key={line} style={{ overflow: "hidden" }}>
                <span style={{
                  display: "inline-block",
                  fontSize: "clamp(2.5rem,6vw,5rem)",
                  color: "white",
                  animation: inView ? `slideReveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
                  animationDelay: `${100 + i * 120}ms`,
                  opacity: 1,
                }}>
                  {line}
                </span>
              </div>
            ))}
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }} ref={timelineRef}>
          {/* Ghost line */}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1, height: "100%", background: "rgba(255,255,255,0.04)" }} aria-hidden="true" />

          {/* Growing line */}
          <div style={{
            position: "absolute", left: 0, top: 0, width: 1,
            height: `${lineProgress}%`,
            background: "linear-gradient(to bottom, #A259FF, rgba(162,89,255,0.1))",
            transition: "height 0.12s linear",
            boxShadow: "0 0 8px rgba(162,89,255,0.4)",
          }} aria-hidden="true" />

          {/* Traveling glowing dot */}
          <div style={{
            position: "absolute", left: -4, width: 9, height: 9,
            borderRadius: "50%", background: "#A259FF",
            top: `${Math.min(lineProgress, 98)}%`,
            boxShadow: "0 0 16px 4px rgba(162,89,255,0.7)",
            opacity: lineProgress > 2 && lineProgress < 99 ? 1 : 0,
            transition: "top 0.12s linear, opacity 0.3s ease",
            pointerEvents: "none",
          }} aria-hidden="true" />

          {ITEMS.map((item, i) => (
            <TimelineItem key={item.num} item={item} index={i} lineProgress={lineProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
