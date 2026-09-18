import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

const words = [
  { text: "I build",       lime: false },
  { text: "digital",       lime: true  },
  { text: "experiences.",  lime: false },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-20"
      aria-label="Hero"
    >
      {/* Ambient lime orb — right side */}
      <div
        className="hero-orb pointer-events-none absolute right-[-10%] top-[15%] h-[600px] w-[600px] opacity-[0.07]"
        style={{ background: "#B8FF2C" }}
        aria-hidden="true"
      />
      {/* Second subtle orb */}
      <div
        className="hero-orb pointer-events-none absolute right-[20%] bottom-[10%] h-[300px] w-[300px] opacity-[0.04]"
        style={{ background: "#B8FF2C" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl w-full">
        {/* Small top label */}
        <div
          className={`mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <span className="label-lime">Full-Stack Web Developer · Pakistan</span>
        </div>

        {/* Giant headline */}
        <h1 className="font-display font-black leading-[0.9] tracking-tight" aria-label="I build digital experiences">
          {words.map((word, i) => (
            <div
              key={word.text}
              className={`block overflow-hidden transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${200 + i * 120}ms` }}
            >
              <span
                className={`block text-[clamp(4rem,12vw,10rem)] ${
                  word.lime
                    ? "text-[#B8FF2C] lime-glow-text"
                    : "text-white"
                }`}
              >
                {word.text}
              </span>
            </div>
          ))}
        </h1>

        {/* Sub-text + CTAs */}
        <div
          className={`mt-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "680ms" }}
        >
          <p className="max-w-sm text-[15px] leading-relaxed text-white/40 md:max-w-xs">
            Full-stack web developer focused on building modern, responsive
            websites and web applications that are simple, useful and memorable.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo("projects")}
              className="group flex h-12 items-center gap-2.5 rounded-full bg-[#B8FF2C] px-7 text-sm font-bold text-black transition-all duration-300 hover:scale-105 lime-glow"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="label text-white/40 transition-colors duration-300 hover:text-white underline-offset-4 hover:underline"
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className={`absolute bottom-10 left-6 md:left-12 lg:left-20 flex items-center gap-3 transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <ArrowDown
            className="h-4 w-4 text-white/20 animate-bounce"
            aria-hidden="true"
          />
          <span className="label text-white/20">Scroll</span>
        </div>
      </div>
    </section>
  );
}
