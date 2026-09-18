import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

const ITEMS = [
  {
    num: "01",
    period: "2026 — Present",
    title: "MERN Stack Developer Intern",
    org: "AI TechSpine LLC · Remote",
    description:
      "Building and maintaining modern web applications using React, Node.js, Express and MongoDB. Implementing JWT authentication, authorization and clean REST APIs.",
    skills: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    num: "02",
    period: "2024 — 2026",
    title: "Graphic Design & Brand Marketing",
    org: "Freelance",
    description:
      "Designing visual identities, digital experiences and marketing materials for clients. Bridging design and development with a full-stack perspective.",
    skills: ["Figma", "Brand Identity", "UI/UX", "Marketing"],
  },
  {
    num: "03",
    period: "2022 — Present",
    title: "BS Computer Science",
    org: "University · Pakistan",
    description:
      "Developing a strong foundation in software engineering, web development, data structures and computer science fundamentals.",
    skills: ["Algorithms", "Data Structures", "OOP", "Web Dev"],
  },
];

/* ── individual item with its own IntersectionObserver ──────── */
function TimelineItem({
  item,
  index,
  lineProgress,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  lineProgress: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [hovered, setHovered] = useState(false);

  const nodeVisible = lineProgress > (index / ITEMS.length) * 100 - 5;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative pl-10 py-10 border-b border-white/5 last:border-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline node */}
      <div
        className="absolute left-[-5px] top-[44px] h-2.5 w-2.5 rounded-full transition-all duration-500"
        style={{
          background: "#A259FF",
          opacity: nodeVisible ? 1 : 0,
          transform: nodeVisible
            ? hovered ? "scale(2)" : "scale(1)"
            : "scale(0)",
          boxShadow: hovered
            ? "0 0 16px 4px rgba(162,89,255,0.6)"
            : "0 0 8px 2px rgba(162,89,255,0.4)",
        }}
        aria-hidden="true"
      />

      {/* Hover highlight */}
      <div
        className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"
        style={{
          background: hovered ? "rgba(162,89,255,0.03)" : "transparent",
          borderLeft: hovered ? "2px solid rgba(162,89,255,0.2)" : "2px solid transparent",
        }}
        aria-hidden="true"
      />

      <div
        className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-12 transition-all duration-600"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-24px)",
          transitionDelay: `${index * 80}ms`,
        }}
      >
        {/* Left meta */}
        <div>
          <p
            className="label-accent transition-all duration-300"
            style={{ letterSpacing: hovered ? "0.22em" : "0.15em" }}
          >
            {item.num}
          </p>
          <p className="label mt-1 text-white/25">{item.period}</p>
        </div>

        {/* Right content */}
        <div>
          <h3 className="font-display text-xl font-bold text-white md:text-2xl">
            {item.title}
          </h3>
          <p className="label mt-1 text-white/30">{item.org}</p>
          <p
            className="mt-3 text-[14px] leading-relaxed transition-all duration-300"
            style={{ color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)" }}
          >
            {item.description}
          </p>

          {/* Skill pills — slide in on hover */}
          <div
            className="mt-4 flex flex-wrap gap-2 overflow-hidden transition-all duration-400"
            style={{ maxHeight: hovered ? "60px" : "0px", opacity: hovered ? 1 : 0 }}
          >
            {item.skills.map((s, i) => (
              <span
                key={s}
                className="rounded-full border border-[#A259FF]/25 bg-[#A259FF]/8 px-3 py-1 text-[11px] font-mono text-[#A259FF]/70"
                style={{
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  transitionDelay: `${i * 40}ms`,
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateY(0)" : "translateY(6px)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── animated line draw ──────────────────────────────────────── */
function useLineProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const visible = window.innerHeight - rect.top;
      const pct = Math.max(0, Math.min(100, (visible / rect.height) * 120 - 10));
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

export function Experience() {
  const { ref: sectionRef, inView } = useInView();
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineProgress = useLineProgress(timelineRef);

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 divider overflow-hidden"
      aria-label="Experience"
    >
      {/* BG orb */}
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-[0.04]"
        style={{ background: "#A259FF", filter: "blur(100px)", animation: "pulseGlow 9s ease-in-out infinite" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div
          className="mb-16 transition-all duration-700"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <span className="label-accent">03 — Experience</span>
          <h2 className="mt-4 font-display font-black leading-[0.9] tracking-tight">
            {["Where I've", "been."].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <span
                  className="block text-[clamp(2.5rem,6vw,5rem)] text-white"
                  style={{
                    display: "inline-block",
                    animation: inView
                      ? `slideReveal 0.7s cubic-bezier(0.16,1,0.3,1) forwards`
                      : "none",
                    animationDelay: `${100 + i * 120}ms`,
                    opacity: inView ? undefined : 0,
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Animated vertical line */}
          <div
            className="absolute left-0 top-0 w-px rounded-full"
            style={{
              height: `${lineProgress}%`,
              background: "linear-gradient(to bottom, #A259FF, rgba(162,89,255,0.15))",
              transition: "height 0.1s linear",
              boxShadow: "0 0 8px rgba(162,89,255,0.4)",
            }}
            aria-hidden="true"
          />
          {/* Ghost line */}
          <div
            className="absolute left-0 top-0 w-px h-full"
            style={{ background: "rgba(255,255,255,0.04)" }}
            aria-hidden="true"
          />

          {ITEMS.map((item, i) => (
            <TimelineItem
              key={item.num}
              item={item}
              index={i}
              lineProgress={lineProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
