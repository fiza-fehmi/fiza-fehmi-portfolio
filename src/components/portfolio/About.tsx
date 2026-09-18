import { useInView } from "../../hooks/useInView";

const TECH = [
  "React", "Node.js", "Express", "MongoDB",
  "Mongoose", "JWT", "Tailwind CSS", "JavaScript",
  "REST APIs", "Git",
];

export function About() {
  const { ref, inView } = useInView();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-20 divider"
      aria-label="About me"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section label */}
        <div
          className={`mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="label-lime">01 — About Me</span>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Left — large headline */}
          <div>
            <h2
              className={`font-display font-black leading-[0.92] tracking-tight transition-all duration-700 delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] text-white">I build</span>
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] text-white">websites</span>
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] text-white">that feel</span>
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] text-[#B8FF2C] lime-glow-text">
                alive.
              </span>
            </h2>
          </div>

          {/* Right — bio + stack */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-base leading-relaxed text-white/50 md:text-[17px]">
              I'm a full-stack web developer who enjoys turning ideas into
              clean, interactive and useful digital products.
            </p>
            <p className="mt-5 text-base leading-relaxed text-white/35 md:text-[15px]">
              I work with React, Node.js, Express, MongoDB and modern JavaScript
              to build responsive interfaces and secure, scalable APIs. I care
              about clean code, good structure and features that hold up in
              real-world use.
            </p>

            {/* Tech tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {TECH.map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full border border-white/8 px-3.5 py-1 font-mono text-xs text-white/40 transition-all duration-500 ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${300 + i * 40}ms` }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Thin divider with stat */}
            <div className="mt-12 pt-8 border-t border-white/6">
              <div className="flex gap-12">
                <div>
                  <p className="font-display text-4xl font-black text-white">5+</p>
                  <p className="label mt-1 text-white/30">Projects built</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-black text-white">1+</p>
                  <p className="label mt-1 text-white/30">Year experience</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-black text-[#B8FF2C]">∞</p>
                  <p className="label mt-1 text-white/30">Coffee cups</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
