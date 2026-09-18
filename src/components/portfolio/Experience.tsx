import { useInView } from "../../hooks/useInView";

const ITEMS = [
  {
    num: "01",
    period: "2026 — Present",
    title: "MERN Stack Developer Intern",
    org: "AI TechSpine LLC · Remote",
    description:
      "Building and maintaining modern web applications using React, Node.js, Express and MongoDB. Implementing JWT authentication, authorization and clean REST APIs.",
  },
  {
    num: "02",
    period: "2024 — 2026",
    title: "Graphic Design & Brand Marketing",
    org: "Freelance",
    description:
      "Designing visual identities, digital experiences and marketing materials for clients. Bridging design and development with a full-stack perspective.",
  },
  {
    num: "03",
    period: "2022 — Present",
    title: "BS Computer Science",
    org: "University · Pakistan",
    description:
      "Developing a strong foundation in software engineering, web development, data structures and computer science fundamentals.",
  },
];

export function Experience() {
  const { ref, inView } = useInView();

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 divider"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="label-accent">03 — Experience</span>
          <h2 className="mt-4 font-display font-black leading-[0.9] tracking-tight">
            <span className="block text-[clamp(2.5rem,6vw,5rem)] text-white">Where I've</span>
            <span className="block text-[clamp(2.5rem,6vw,5rem)] text-white">been.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-0 top-0 w-px transition-all duration-1000 ${
              inView ? "h-full" : "h-0"
            }`}
            style={{
              background:
                "linear-gradient(to bottom, #A259FF, rgba(162,89,255,0.1))",
              transitionDelay: "300ms",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-0">
            {ITEMS.map((item, i) => (
              <div
                key={item.num}
                className={`group relative pl-10 py-10 border-b border-white/5 last:border-0 transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                }`}
                style={{ transitionDelay: `${400 + i * 150}ms` }}
              >
                {/* Lime node on the line */}
                <div
                  className="absolute left-[-4px] top-[42px] h-2 w-2 rounded-full bg-[#A259FF] transition-all duration-300 group-hover:scale-150"
                  style={{ boxShadow: "0 0 10px 2px rgba(162,89,255,0.5)" }}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-12">
                  {/* Left meta */}
                  <div>
                    <p className="label-accent">{item.num}</p>
                    <p className="label mt-1 text-white/25">{item.period}</p>
                  </div>
                  {/* Right content */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="label mt-1 text-white/30">{item.org}</p>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/35">
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
