import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { EXPERIENCE } from "./data";

export function Experience() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="section divider"
      aria-label="Experience"
    >
      <div className="container-xl">

        {/* Header */}
        <div
          className="mb-16"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}
        >
          <span className="eyebrow">04 — Experience</span>
          <h2
            className="mt-4 font-display font-black leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
          >
            MY <span style={{ color: "var(--accent)" }}>JOURNEY.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 w-px"
            style={{
              background: "linear-gradient(to bottom, var(--accent), rgba(183,255,50,0.05))",
              height: inView ? "100%" : "0%",
              transition: "height 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
              boxShadow: "0 0 6px rgba(183,255,50,0.3)",
            }}
            aria-hidden="true"
          />
          {/* Ghost line */}
          <div className="absolute left-0 top-0 h-full w-px" style={{ background: "rgba(255,255,255,0.04)" }} aria-hidden="true" />

          {/* Items */}
          <div className="space-y-0">
            {EXPERIENCE.map((item, i) => (
              <div
                key={i}
                className="relative border-b pl-12 py-10 last:border-0 transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  background: hovered === i ? "rgba(183,255,50,0.025)" : "transparent",
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms, background 0.3s ease`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Node */}
                <div
                  className="absolute left-[-5px] top-[42px] h-2.5 w-2.5 rounded-full transition-all duration-400"
                  style={{
                    background: "var(--accent)",
                    boxShadow: hovered === i ? "0 0 16px 4px rgba(183,255,50,0.5)" : "0 0 6px 2px rgba(183,255,50,0.3)",
                    transform: hovered === i ? "scale(1.5)" : "scale(1)",
                    opacity: inView ? 1 : 0,
                  }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-16">
                  {/* Left */}
                  <div>
                    <p className="eyebrow" style={{ color: "var(--accent)", opacity: 0.8 }}>{item.period}</p>
                  </div>
                  {/* Right */}
                  <div>
                    <h3
                      className="font-display text-xl font-bold transition-colors duration-200 md:text-2xl"
                      style={{ color: hovered === i ? "#fff" : "var(--fg)" }}
                    >
                      {item.role}
                    </h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-widest" style={{ color: "var(--fg3)" }}>
                      {item.company}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg2)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
