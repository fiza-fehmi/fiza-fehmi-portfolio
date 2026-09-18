import { useInView } from "../../hooks/useInView";
import { TECH_STACK } from "./data";

export function TechStack() {
  const { ref, inView } = useInView();

  return (
    <section
      id="tech"
      ref={ref as React.RefObject<HTMLElement>}
      className="section divider"
      aria-label="Technologies"
    >
      <div className="container-xl">

        <div
          className="mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}
        >
          <span className="eyebrow">Technologies I Work With</span>
          <h2
            className="mt-4 font-display font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
          >
            MY <span style={{ color: "var(--accent)" }}>STACK.</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(TECH_STACK).map(([category, skills], ci) => (
            <div
              key={category}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.6s ease ${ci * 80}ms`,
              }}
            >
              {/* Category label */}
              <p className="eyebrow mb-5">{category}</p>

              {/* Skills list */}
              <ul className="space-y-2.5">
                {skills.map((skill, si) => (
                  <li
                    key={skill}
                    className="group flex items-center justify-between border-b py-2 transition-all duration-200 cursor-default"
                    style={{
                      borderColor: "rgba(255,255,255,0.05)",
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.4s ease ${ci * 80 + si * 40}ms, border-color 0.2s ease`,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(183,255,50,0.25)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <span
                      className="text-sm font-medium transition-colors duration-200 group-hover:text-white"
                      style={{ color: "var(--fg2)" }}
                    >
                      {skill}
                    </span>
                    <span
                      className="text-xs opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--accent)" }}
                    >
                      →
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
