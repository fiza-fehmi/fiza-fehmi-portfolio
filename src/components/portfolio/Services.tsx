import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { SERVICES } from "./data";

export function Services() {
  const { ref, inView } = useInView();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="section divider"
      aria-label="Services"
    >
      <div className="container-xl">

        {/* Header */}
        <div
          className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all 0.6s ease" }}
        >
          <div>
            <span className="eyebrow">02 — Services</span>
            <h2
              className="mt-4 font-display font-black leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
            >
              WHAT I<br />
              <span style={{ color: "var(--accent)" }}>CAN BUILD.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed" style={{ color: "var(--fg3)" }}>
            End-to-end web development — from polished UI to secure, scalable backend.
          </p>
        </div>

        {/* Service rows */}
        <div className="space-y-0">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className="group relative flex flex-col gap-4 border-t py-8 transition-all duration-300 last:border-b md:flex-row md:items-start md:gap-12"
              style={{
                borderColor: hovered === svc.num ? "rgba(183,255,50,0.15)" : "rgba(255,255,255,0.07)",
                background: hovered === svc.num ? "rgba(183,255,50,0.025)" : "transparent",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateX(-20px)",
                transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, background 0.3s ease, border-color 0.3s ease`,
              }}
              onMouseEnter={() => setHovered(svc.num)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Number */}
              <span
                className="font-display text-4xl font-black leading-none transition-colors duration-300"
                style={{
                  color: hovered === svc.num ? "var(--accent)" : "rgba(255,255,255,0.08)",
                  minWidth: "2.5rem",
                }}
              >
                {svc.num}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="font-display text-xl font-bold tracking-tight transition-colors duration-200 md:text-2xl"
                  style={{ color: hovered === svc.num ? "#fff" : "var(--fg)" }}
                >
                  {svc.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg3)" }}>
                  {svc.description}
                </p>
              </div>

              {/* Arrow */}
              <span
                className="self-start text-lg transition-all duration-300"
                style={{
                  color: "var(--accent)",
                  opacity: hovered === svc.num ? 1 : 0,
                  transform: hovered === svc.num ? "translate(2px,-2px)" : "translate(0,0)",
                }}
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
