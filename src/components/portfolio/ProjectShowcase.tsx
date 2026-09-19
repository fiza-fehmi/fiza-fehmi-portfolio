import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "../../hooks/useInView";

const PROJECTS = [
  {
    num: "01",
    title: "Decoristic",
    category: "Frontend / Furniture",
    description:
      "Modern, responsive furniture and home décor website showcasing stylish collections with a clean, user-friendly UI design.",
    tech: ["HTML", "CSS", "Responsive Design"],
    color: "#C8A97E",
    bg: "linear-gradient(135deg, #1a1208 0%, #2e2010 50%, #1a1208 100%)",
    live: "https://decoristic-website.vercel.app",
    github: "https://github.com/fiza-fehmi/decoristic-website",
  },
  {
    num: "02",
    title: "Feane Fast Food",
    category: "Frontend / Restaurant",
    description:
      "Responsive fast food restaurant website with menus, offers and online ordering features. Fresh design with bold flavors in every pixel.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#FF6B35",
    bg: "linear-gradient(135deg, #1a0a00 0%, #2e1200 50%, #1a0a00 100%)",
    live: "https://feane-fast-food-website.vercel.app",
    github: "https://github.com/fiza-fehmi/feane-fast-food-website",
  },
  {
    num: "03",
    title: "Ecommerce Store",
    category: "Frontend / E-commerce",
    description:
      "Modern e-commerce store built with React and Vite. Features product listings, cart functionality and a clean responsive shopping experience.",
    tech: ["React.js", "Vite", "JavaScript"],
    color: "#E91E8C",
    bg: "linear-gradient(135deg, #1a0010 0%, #2e0020 50%, #1a0010 100%)",
    live: "https://ecommerce-store-1hqv.vercel.app",
    github: "https://github.com/fiza-fehmi/Ecommerce-Store",
  },
  {
    num: "04",
    title: "Property Hub",
    category: "Frontend / Real Estate",
    description:
      "Responsive real estate website showcasing properties by categories — Apartments, Villas, Commercial Spaces and Plots.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#2196F3",
    bg: "linear-gradient(135deg, #000d1a 0%, #001830 50%, #000d1a 100%)",
    live: "https://fiza-fehmi.github.io/Property_Hub/",
    github: "https://github.com/fiza-fehmi/Property_Hub",
  },
  {
    num: "05",
    title: "Postage",
    category: "Full-Stack / Social",
    description:
      "Full-stack social platform with login, posts, feed, JWT authentication, authorization, REST APIs and image uploads.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Multer"],
    color: "#5865F2",
    bg: "linear-gradient(135deg, #0a0a1a 0%, #0d0e2e 50%, #0a0a1a 100%)",
    live: null,
    github: "https://github.com/fiza-fehmi",
  },
  {
    num: "06",
    title: "Coffee Shop",
    category: "Frontend / Lifestyle",
    description:
      "Modern, responsive coffee shop website with warm aesthetics, menu showcase and a clean browsing experience.",
    tech: ["HTML", "CSS"],
    color: "#8B5E3C",
    bg: "linear-gradient(135deg, #120a04 0%, #241408 50%, #120a04 100%)",
    live: "https://fiza-fehmi.github.io/coffees-website/",
    github: "https://github.com/fiza-fehmi/coffees-website",
  },
];

/* ── animated browser mock with shimmer ─────────────────────── */
function MockBrowser({
  project,
  entering,
}: {
  project: (typeof PROJECTS)[number];
  entering: boolean;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full overflow-hidden rounded-2xl border border-white/8"
      style={{
        background: project.bg,
        opacity: 1,
        transform: entering
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1)`
          : "scale(0.96) translateY(16px)",
        transition: entering ? "opacity 0.5s ease, box-shadow 0.3s ease" : "all 0.5s ease",
        boxShadow: entering ? `0 20px 60px -20px ${project.color}40` : "none",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      role="img"
      aria-label={`${project.title} project preview`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <div className="mx-4 flex-1 rounded-full bg-white/5 px-3 py-1 text-center font-mono text-[10px] text-white/20">
          {project.live ? project.live.replace("https://", "") : `${project.title.toLowerCase().replace(/\s/g, "-")}.dev`}
        </div>
      </div>

      {/* Content area */}
      <div className="relative flex h-72 md:h-96 flex-col items-center justify-center p-8">
        {/* Animated orb */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-72 w-72 rounded-full"
            style={{
              background: project.color,
              filter: "blur(90px)",
              opacity: 0.18,
              animation: "pulseGlow 3.5s ease-in-out infinite",
            }}
          />
        </div>

        {/* Skeleton UI with shimmer */}
        <div className="relative z-10 w-full max-w-xs space-y-3">
          {/* Shimmer title bar */}
          <div
            className="h-7 rounded-lg w-2/3 mx-auto overflow-hidden relative"
            style={{ background: `${project.color}22` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.2s linear infinite",
              }}
            />
          </div>

          {/* Content lines */}
          {[100, 85, 70].map((w, i) => (
            <div
              key={i}
              className="h-2.5 rounded-full overflow-hidden"
              style={{ width: `${w}%`, background: "rgba(255,255,255,0.05)" }}
            >
              <div
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                  backgroundSize: "200% 100%",
                  animation: `shimmer ${2.5 + i * 0.3}s linear infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            </div>
          ))}

          {/* Cards row */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl relative overflow-hidden"
                style={{ background: `${project.color}${i === 0 ? "22" : "12"}` }}
              >
                <div
                  style={{
                    position: "absolute", inset: 0,
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                    backgroundSize: "200% 100%",
                    animation: `shimmer ${2 + i * 0.4}s linear infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* CTA button skeleton */}
          <div className="mt-4 flex justify-center">
            <div
              className="h-8 w-28 rounded-full overflow-hidden"
              style={{ background: `${project.color}28` }}
            >
              <div
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Watermark number */}
        <div
          className="absolute bottom-4 right-6 font-display text-[5rem] font-black select-none leading-none"
          style={{ color: project.color, opacity: 0.06 }}
          aria-hidden="true"
        >
          {project.num}
        </div>
      </div>
    </div>
  );
}

/* ── progress bar ────────────────────────────────────────────── */
function ProgressBar({ active }: { active: number }) {
  return (
    <div className="flex gap-1.5" role="tablist" aria-label="Project navigation">
      {PROJECTS.map((_, i) => (
        <div key={i} className="h-0.5 flex-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: i <= active ? "100%" : "0%",
              background:
                i === active
                  ? "#A259FF"
                  : "rgba(162,89,255,0.35)",
              transitionDelay: i < active ? "0ms" : "0ms",
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── main showcase ───────────────────────────────────────────── */
export function ProjectShowcase() {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [entering, setEntering]   = useState(true);
  const { ref: sectionRef, inView } = useInView({ threshold: 0.05 });
  const scrollAccum = useRef(0);
  const animRef     = useRef(false);
  const STEP = 140;

  const goTo = useCallback((next: number) => {
    if (animRef.current || next === active) return;
    animRef.current = true;
    setDirection(next > active ? 1 : -1);
    setEntering(false);
    setTimeout(() => {
      setActive(next);
      setEntering(true);
      animRef.current = false;
    }, 380);
  }, [active]);

  /* wheel hijack */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current as HTMLElement | null;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inside = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.4;
      if (!inside) return;
      scrollAccum.current += e.deltaY;
      if (scrollAccum.current > STEP) {
        scrollAccum.current = 0;
        goTo(Math.min(active + 1, PROJECTS.length - 1));
      } else if (scrollAccum.current < -STEP) {
        scrollAccum.current = 0;
        goTo(Math.max(active - 1, 0));
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, goTo, sectionRef]);

  const project = PROJECTS[active]!;

  return (
    <section
      id="projects"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 divider"
      aria-label="Selected work"
    >
      {/* Subtle section orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] opacity-[0.04]"
        style={{
          background: `radial-gradient(ellipse, ${project.color} 0%, transparent 70%)`,
          filter: "blur(60px)",
          transition: "background 0.6s ease",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">

        {/* ── Header ── */}
        <div
          className="mb-16 flex items-end justify-between transition-all duration-700"
          style={{
            opacity: 1,
            transform: inView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div>
            <span className="label-accent">02 — Selected Work</span>
            <h2 className="mt-4 font-display font-black leading-[0.9] tracking-tight">
              <span className="block text-[clamp(2.5rem,6vw,5rem)] text-white">Things I've</span>
              <span className="block text-[clamp(2.5rem,6vw,5rem)] text-white">built.</span>
            </h2>
          </div>

          {/* Animated counter */}
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <span
                className="font-display font-black text-white transition-all duration-300"
                style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-xl text-white/20">
                /{String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>
            {/* Prev/Next arrows */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => goTo(Math.max(active - 1, 0))}
                disabled={active === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-[#A259FF]/50 hover:text-[#A259FF] disabled:opacity-20"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => goTo(Math.min(active + 1, PROJECTS.length - 1))}
                disabled={active === PROJECTS.length - 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-[#A259FF]/50 hover:text-[#A259FF] disabled:opacity-20"
                aria-label="Next project"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Showcase grid ── */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16 items-center">

          {/* Left — info panel */}
          <div
            className="transition-all duration-400"
            style={{
              opacity: 1,
              transform: entering
                ? "translateX(0)"
                : `translateX(${direction * -20}px)`,
            }}
          >
            <p
              className="font-display font-black leading-none select-none"
              style={{ fontSize: "clamp(5rem,12vw,9rem)", color: "rgba(255,255,255,0.04)" }}
              aria-hidden="true"
            >
              {project.num}
            </p>
            <div className="-mt-4 md:-mt-6">
              <span className="label text-white/30">{project.category}</span>

              {/* Title with colour accent underline */}
              <h3 className="mt-2 font-display text-4xl font-black tracking-tight text-white md:text-5xl">
                {project.title}
              </h3>
              <div
                className="mt-2 h-0.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                  width: entering ? "140px" : "0px",
                  transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: "200ms",
                }}
                aria-hidden="true"
              />

              <p className="mt-4 text-[15px] leading-relaxed text-white/40">
                {project.description}
              </p>

              {/* Tech pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/8 px-3 py-1 font-mono text-[11px] text-white/30
                               transition-all duration-300 hover:border-[#A259FF]/40 hover:text-[#A259FF]"
                    style={{
                      opacity: 1,
                      transform: entering ? "translateY(0)" : "translateY(8px)",
                      transition: `opacity 0.4s ease, transform 0.4s ease`,
                      transitionDelay: `${250 + i * 50}ms`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 items-center gap-2 rounded-full px-5 text-[11px] font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                    style={{ background: project.color, color: "#050505" }}
                    aria-label={`View ${project.title} live`}
                  >
                    Live Site
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 items-center gap-2 rounded-full border px-5 text-[11px] font-bold tracking-widest uppercase transition-all duration-300"
                    style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${project.color}50`;
                      (e.currentTarget as HTMLElement).style.color = project.color;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                    }}
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right — browser mock */}
          <MockBrowser project={project} entering={entering} />
        </div>

        {/* ── Bottom controls ── */}
        <div className="mt-10 flex flex-col gap-4">
          <ProgressBar active={active} />
          <div className="flex items-center justify-between">
            {/* Dot nav */}
            <div className="flex gap-2" role="tablist">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.num}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={p.title}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all duration-400"
                  style={{
                    width: i === active ? "2rem" : "0.375rem",
                    background: i === active ? "#A259FF" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
            <span className="label text-white/20">Scroll or click to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
