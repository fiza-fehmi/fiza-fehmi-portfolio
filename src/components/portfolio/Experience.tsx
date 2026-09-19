import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences, skills } from "../../data/portfolio";

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative bg-[#0a0a0a] py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-xs text-[#c4ff00] font-medium tracking-wider uppercase">
              03 — EXPERIENCE
            </span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            Experience<span className="text-[#c4ff00]">.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Timeline */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="relative pl-8 border-l-2 border-white/10 hover:border-[#c4ff00]/50 transition-colors duration-500 group"
              >
                {/* Green Dot Indicator */}
                <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-[#c4ff00] group-hover:scale-125 transition-transform duration-300"></div>

                {/* Period */}
                <div className="text-xs text-[#c4ff00] font-medium tracking-wider uppercase mb-3">
                  {exp.period}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {exp.title}
                </h3>

                {/* Company */}
                <div className="text-sm text-white/60 mb-4">
                  {exp.company} — {exp.location}
                </div>

                {/* Description */}
                <p className="text-white/60 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Skills / Services Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="border border-white/10 p-8 md:p-10 space-y-8 bg-white/[0.02] backdrop-blur-sm">
              <div>
                <span className="text-xs text-white/50 font-medium tracking-wider uppercase">
                  What I Can Build
                </span>
              </div>

              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center space-x-3 py-3 border-b border-white/5 group-hover:border-[#c4ff00]/30 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-[#c4ff00] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border border-[#c4ff00]/30 p-6 bg-[#c4ff00]/5 backdrop-blur-sm"
            >
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#c4ff00] rounded-full mt-2 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-white">
                    Available for Freelance
                  </div>
                  <div className="text-sm text-white/60">
                    Open to new projects and collaborations. Let's build something amazing together.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
