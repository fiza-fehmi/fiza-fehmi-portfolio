import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    "React.js",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "REST APIs",
    "Git / GitHub"
  ];

  return (
    <section id="about" ref={ref} className="relative bg-[#0a0a0a] py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Statement */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                I build websites
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                that feel
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#c4ff00] leading-[1.1] tracking-tight">
                alive<span className="text-white">.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl"
            >
              I specialize in creating complete web applications using modern frontend and 
              backend technologies. From concept to deployment, I build digital experiences 
              that are not only beautiful but also functional and scalable.
            </motion.p>
          </div>

          {/* Right Column - Currently Building Panel */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border border-white/10 p-8 md:p-10 space-y-6 bg-white/[0.02] backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#c4ff00] rounded-full animate-pulse"></div>
                <span className="text-xs text-white/50 font-medium tracking-wider uppercase">
                  Currently Building
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Full-Stack + AI
                </h3>
                <p className="text-white/60 text-sm md:text-base">
                  Web applications • APIs • AI-powered tools
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-white/50 font-medium tracking-wider uppercase mb-4">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                      className="px-3 py-1.5 text-xs font-medium text-white/70 border border-white/10 hover:border-[#c4ff00]/50 hover:text-[#c4ff00] transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Stats or Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#c4ff00]">6+</div>
                <div className="text-sm text-white/60">Projects Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-[#c4ff00]">100%</div>
                <div className="text-sm text-white/60">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
