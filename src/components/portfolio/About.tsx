import { useInView } from "../../hooks/useInView";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="section divider"
      aria-label="About me"
    >
      <div className="container-xl">

        {/* eyebrow */}
        <div
          className="mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}
        >
          <span className="eyebrow">01 — About Me</span>
        </div>

        {/* two-col layout */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24 lg:items-start">

          {/* Left — headline */}
          <div>
            <h2
              className="font-display font-black leading-[0.88] tracking-tight"
              style={{ opacity: inView ? 1 : 0, transition: "all 0.7s ease 0.1s" }}
            >
              {["I BUILD", "WEBSITES", "THAT FEEL", "ALIVE."].map((w, i) => (
                <div key={w} className="overflow-hidden">
                  <span
                    className="block"
                    style={{
                      fontSize: "clamp(2.8rem,6vw,5.5rem)",
                      color: w === "ALIVE." ? "var(--accent)" : "var(--fg)",
                      textShadow: w === "ALIVE." ? "0 0 40px rgba(183,255,50,0.3)" : "none",
                      display: "inline-block",
                      animation: inView ? `slideUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards` : "none",
                      animationDelay: `${i * 100}ms`,
                      opacity: inView ? undefined : 0,
                    }}
                  >
                    {w}
                  </span>
                </div>
              ))}
            </h2>

            {/* Accent line */}
            <div
              className="mt-8 h-px rounded-full"
              style={{
                background: "linear-gradient(90deg, var(--accent), transparent)",
                width: inView ? "200px" : "0px",
                transition: "width 1s cubic-bezier(0.16,1,0.3,1) 0.5s",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Right — bio */}
          <div
            style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all 0.7s ease 0.25s" }}
          >
            <p className="text-base leading-relaxed" style={{ color: "var(--fg2)", fontSize: "clamp(0.95rem,1.5vw,1.05rem)" }}>
              I'm a full-stack developer focused on creating modern web experiences
              that combine thoughtful design with reliable functionality. I work
              across the frontend and backend to turn ideas into complete,
              responsive digital products.
            </p>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--fg3)" }}>
              My stack centres on React, Node.js, Express and MongoDB — and I care
              about clean code, good architecture and features that hold up in
              real-world use.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t pt-10" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {[["5+", "Projects Built"], ["1+", "Year Experience"], ["∞", "Coffee Consumed"]].map(([val, label]) => (
                <div key={label}>
                  <p
                    className="font-display font-black leading-none"
                    style={{ fontSize: "clamp(2rem,4vw,3rem)", color: val === "∞" ? "var(--accent)" : "var(--fg)" }}
                  >
                    {val}
                  </p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-widest" style={{ color: "var(--fg3)" }}>{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo("work")}
              className="group mt-10 flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              style={{ color: "var(--accent)" }}
            >
              See my work
              <span className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
