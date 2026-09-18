import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "../../hooks/useInView";

const PROJECTS = [
  {
    num: "01",
    title: "Spotify Clone",
    category: "Backend / API",
    description:
      "RESTful backend with JWT authentication, role-based authorization, bcrypt security, and Music & Album APIs built with MongoDB and Mongoose.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
    color: "#1DB954",
    bg: "linear-gradient(135deg, #0a1a0a 0%, #0d2e13 50%, #0a1a0a 100%)",
    mockLines: ["green"],
  },
  {
    num: "02",
    title: "Postage",
    category: "Full-Stack / Social",
    description:
      "Full-stack social platform with login, posts, feed, JWT auth, authorization, REST APIs, and image uploads via Multer and ImageKit.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Multer", "ImageKit"],
    color: "#5865F2",
    bg: "linear-gradient(135deg, #0a0a1a 0%, #0d0e2e 50%, #0a0a1a 100%)",
    mockLines: ["blue"],
  },
  {
    num: "03",
    title: "ShopSphere",
    category: "Frontend / E-commerce",
    description:
      "Responsive e-commerce website with product listings, categories, cart and checkout functionality built with React and Tailwind CSS.",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    color: "#FF6B35",
    bg: "linear-gradient(135deg, #1a0a00 0%, #2e1200 50%, #1a0a00 100%)",
    mockLines: ["orange"],
  },
  {
    num: "04",
    title: "TaskFlow",
    category: "Frontend / Productivity",
    description:
      "Task management application with add, edit, complete and clear-all functionality. Clean minimal UI built with vanilla JavaScript.",
    tech: ["HTML", "JavaScript", "Tailwind CSS"],
    color: "#A259FF",
    bg: "linear-gradient(135deg, #0a1300 0%, #141f00 50%, #0a1300 100%)",
    mockLines: ["lime"],
  },
  {
    num: "05",
    title: "Stack Calculator",
    category: "Frontend / Utility",
    description:
      "Interactive calculator supporting basic arithmetic operations. Clean, minimal UI with smooth button interactions.",
    tech: ["HTML", "JavaScript", "Tailwind CSS"],
    color: "#9B59B6",
    bg: "linear-gradient(135deg, #0d0a1a 0%, #1a0d2e 50%, #0d0a1a 100%)",
    mockLines: ["purple"],
  },
];

function MockBrowser({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/8"
      style={{ background: project.bg }}
      role="img"
      aria-label={`${project.title} project preview`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/6 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <div className="mx-4 flex-1 rounded-full bg-white/5 px-3 py-1 text-center font-mono text-[10px] text-white/20">
          {project.title.toLowerCase().replace(" ", "-")}.dev
        </div>
      </div>

      {/* Mock content */}
      <div className="flex h-72 md:h-96 flex-col items-center justify-center gap-6 p-8 relative">
        {/* Project color orb */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-64 w-64 rounded-full blur-[80px] opacity-20"
            style={{ background: project.color }}
          />
        </div>

        {/* Mock UI skeleton */}
        <div className="relative z-10 w-full max-w-xs space-y-3">
          <div
            className="h-6 rounded-md w-3/4 mx-auto"
            style={{ background: `${project.color}25` }}
          />
          <div className="h-3 rounded-md w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="h-3 rounded-md w-5/6" style={{ background: "rgba(255,255,255,0.04)" }} />
          <div className="h-3 rounded-md w-4/6" style={{ background: "rgba(255,255,255,0.04)" }} />
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl"
                style={{ background: `${project.color}${i === 0 ? "20" : "10"}` }}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <div
              className="h-8 w-28 rounded-full"
              style={{ background: `${project.color}30` }}
            />
          </div>
        </div>

        {/* Project number watermark */}
        <div
          className="absolute bottom-4 right-6 font-display text-6xl font-black opacity-5 select-none"
          style={{ color: project.color }}
          aria-hidden="true"
        >
          {project.num}
        </div>
      </div>
    </div>
  );
}

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref: sectionRef, inView } = useInView({ threshold: 0.05 });
  const stickyRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollAccum = useRef(0);
  const STEP = 120; // px of scroll per project change

  const goTo = useCallback(
    (next: number) => {
      if (next === active || animating) return;
      setAnimating(true);
      setTimeout(() => {
        setActive(next);
        setAnimating(false);
      }, 350);
    },
    [active, animating]
  );

  // Wheel-driven project changes inside the sticky viewport
  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    const onWheel = (e: WheelEvent) => {
      const rect = sticky.getBoundingClientRect();
      const inSticky =
        rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!inSticky) return;

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
  }, [active, goTo]);

  const project = PROJECTS[active]!;

  return (
    <section
      id="projects"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 divider"
      aria-label="Selected work"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`mb-16 flex items-end justify-between transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <span className="label-accent">02 — Selected Work</span>
            <h2 className="mt-4 font-display font-black leading-[0.9] tracking-tight">
              <span className="block text-[clamp(2.5rem,6vw,5rem)] text-white">Things I've</span>
              <span className="block text-[clamp(2.5rem,6vw,5rem)] text-white">built.</span>
            </h2>
          </div>
          {/* Counter */}
          <div className="hidden md:block text-right">
            <span className="font-display text-5xl font-black text-white">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-xl text-white/20"> / {String(PROJECTS.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Sticky showcase */}
        <div ref={stickyRef}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-center">

            {/* Left — project info */}
            <div
              className={`transition-all duration-500 ${
                animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
            >
              {/* Number */}
              <p className="font-display text-[8rem] font-black leading-none text-white/5 select-none" aria-hidden="true">
                {project.num}
              </p>
              <div className="-mt-6">
                <span className="label text-white/30">{project.category}</span>
                <h3
                  className="mt-2 font-display text-4xl font-black tracking-tight text-white md:text-5xl"
                  style={{ color: "white" }}
                >
                  {project.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/40">
                  {project.description}
                </p>
                {/* Tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/8 px-3 py-1 font-mono text-[11px] text-white/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* Arrow CTA */}
                <button
                  className="group mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 hover:border-[#A259FF]/50 hover:text-[#A259FF] hover:scale-110"
                  aria-label={`View ${project.title}`}
                  style={{
                    boxShadow: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 0 20px -4px rgba(162,89,255,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  }
                >
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Right — browser mock */}
            <div
              className={`transition-all duration-500 ${
                animating ? "opacity-0 scale-[0.97]" : "opacity-100 scale-100"
              }`}
            >
              <MockBrowser project={project} />
            </div>
          </div>

          {/* Dot navigation */}
          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2" role="tablist" aria-label="Project navigation">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.num}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to project ${p.title}`}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-400 ${
                    i === active
                      ? "w-8 bg-[#A259FF]"
                      : "w-1 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
            <span className="label text-white/20">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
