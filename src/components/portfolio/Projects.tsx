import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { PROJECTS } from "./data";

/* ── Mock browser preview ──────────────────────────────────── */
function ProjectPreview({ project, hovered }: { project: typeof PROJECTS[number]; hovered: boolean }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl transition-transform duration-700"
      style={{
        background: `linear-gradient(135deg, #0a0a0a 0%, ${project.color}14 100%)`,
        border: `1px solid ${hovered ? project.color + "35" : "rgba(255,255,255,0.07)"}`,
        transform: hovered ? "scale(1.01)" : "scale(1)",
        transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
        aspectRatio: "16/9",
      }}
      role="img"
      aria-label={`${project.title} preview`}
    >
      {/* Browser bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="h-2 w-2 rounded-full bg-red-500/50" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
        <div className="h-2 w-2 rounded-full bg-green-500/50" />
        <div
          className="mx-3 flex-1 rounded-full px-3 py-1 text-center font-mono text-[10px]"
          style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)" }}
        >
          {project.slug}.dev
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex h-full flex-col items-center justify-center p-8 pb-16">
        {/* Glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="rounded-full transition-all duration-700"
            style={{
              width: hovered ? 280 : 200,
              height: hovered ? 280 : 200,
              background: project.color,
              filter: "blur(80px)",
              opacity: hovered ? 0.22 : 0.12,
            }}
          />
        </div>

        {/* Skeleton UI */}
        <div className="relative z-10 w-full max-w-xs space-y-3">
          <div
            className="h-6 w-2/3 rounded-lg mx-auto overflow-hidden"
            style={{ background: `${project.color}22` }}
          >
            <div style={{
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
              backgroundSize: "400px 100%",
              animation: "shimmer 2s linear infinite",
            }} />
          </div>
          {[100, 85, 70].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full overflow-hidden" style={{ width: `${w}%`, background: "rgba(255,255,255,0.05)" }}>
              <div style={{
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                backgroundSize: "400px 100%",
                animation: `shimmer ${2.2 + i * 0.3}s linear infinite ${i * 0.15}s`,
              }} />
            </div>
          ))}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-14 rounded-lg overflow-hidden" style={{ background: `${project.color}${i === 0 ? "20" : "0e"}` }}>
                <div style={{
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                  backgroundSize: "400px 100%",
                  animation: `shimmer ${2 + i * 0.4}s linear infinite ${i * 0.2}s`,
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Project number watermark */}
        <span
          className="absolute bottom-4 right-5 font-display font-black leading-none select-none"
          style={{ fontSize: "5rem", color: project.color, opacity: 0.05 }}
          aria-hidden="true"
        >
          {project.id}
        </span>
      </div>
    </div>
  );
}

/* ── Project row ─────────────────────────────────────────────── */
function ProjectRow({ project, index, inView }: { project: typeof PROJECTS[number]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <article
      className="group relative grid gap-10 py-16 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview — alternating side */}
      <div className={isEven ? "order-1 lg:order-2" : "order-1"}>
        <ProjectPreview project={project} hovered={hovered} />
      </div>

      {/* Info */}
      <div className={isEven ? "order-2 lg:order-1" : "order-2"}>
        {/* Meta */}
        <div className="mb-5 flex items-center gap-4">
          <span className="eyebrow" style={{ color: project.color, opacity: 0.85 }}>
            {project.id}
          </span>
          <span className="eyebrow" style={{ color: "var(--fg3)" }}>{project.year}</span>
          <span className="eyebrow" style={{ color: "var(--fg3)" }}>{project.category}</span>
        </div>

        {/* Title */}
        <h3
          className="font-display font-black tracking-tight transition-colors duration-300"
          style={{
            fontSize: "clamp(2rem,4vw,3.5rem)",
            lineHeight: 0.9,
            color: hovered ? "#fff" : "var(--fg)",
          }}
        >
          {project.title}
        </h3>

        {/* Accent line — draws on hover */}
        <div
          className="mt-3 h-px rounded-full transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
            width: hovered ? "160px" : "0px",
          }}
          aria-hidden="true"
        />

        {/* Description */}
        <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--fg2)" }}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span
              key={t}
              className="rounded-full border px-3 py-1 font-mono text-[11px] transition-all duration-200"
              style={{
                borderColor: hovered ? `${project.color}30` : "rgba(255,255,255,0.08)",
                color: hovered ? project.color : "var(--fg3)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex items-center gap-4">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{ background: project.color, color: "#050505" }}
            >
              View Project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                color: "var(--fg2)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = "var(--fg2)";
              }}
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export function Projects() {
  const { ref, inView } = useInView();

  return (
    <section
      id="work"
      ref={ref as React.RefObject<HTMLElement>}
      className="section divider"
      aria-label="Selected work"
    >
      <div className="container-xl">

        {/* Header */}
        <div
          className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}
        >
          <div>
            <span className="eyebrow">03 — Selected Work</span>
            <h2
              className="mt-4 font-display font-black leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)" }}
            >
              THINGS<br />
              I'VE<br />
              <span style={{ color: "var(--accent)" }}>BUILT.</span>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed lg:text-right" style={{ color: "var(--fg3)" }}>
            A selection of projects built across the full stack — from API design to polished frontend.
          </p>
        </div>

        {/* Project rows */}
        <div>
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
