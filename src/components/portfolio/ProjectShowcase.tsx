import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../../data/portfolio";

const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentProject];

  return (
    <section id="projects" ref={ref} className="relative bg-[#0a0a0a] py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4 mb-6"
          >
            <span className="text-xs text-[#c4ff00] font-medium tracking-wider uppercase">
              02 — SELECTED WORK
            </span>
            <div className="flex-1 h-px bg-white/10"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Things I've
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            built<span className="text-[#c4ff00]">.</span>
          </motion.h2>
        </div>

        {/* Project Display */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Project Image */}
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] border border-white/10 overflow-hidden group"
          >
            {/* Placeholder for project image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c4ff00]/10 to-transparent flex items-center justify-center">
              <div className="text-white/20 text-6xl font-bold">{String(project.id).padStart(2, '0')}</div>
            </div>
            
            {/* Green overlay on hover */}
            <div className="absolute inset-0 bg-[#c4ff00]/0 group-hover:bg-[#c4ff00]/5 transition-all duration-500"></div>
            
            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#c4ff00]/50"></div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            key={`info-${currentProject}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Project Number */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40 font-medium">
                {String(project.id).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h3>

            {/* Project Description */}
            <p className="text-white/60 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="space-y-3">
              <span className="text-xs text-white/50 font-medium tracking-wider uppercase">
                Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium text-[#c4ff00] border border-[#c4ff00]/30 bg-[#c4ff00]/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="flex gap-4 pt-4">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-[#c4ff00] text-black text-sm font-semibold hover:bg-[#a8d600] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Live Demo</span>
                <ExternalLink size={16} />
              </motion.a>

              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold hover:border-[#c4ff00] hover:text-[#c4ff00] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>GitHub</span>
                <Github size={16} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-between mt-12 md:mt-16 pt-8 border-t border-white/10"
        >
          <motion.button
            onClick={prevProject}
            className="flex items-center space-x-2 text-white/60 hover:text-[#c4ff00] transition-colors duration-300 group"
            whileHover={{ x: -5 }}
          >
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Previous</span>
          </motion.button>

          {/* Project Dots */}
          <div className="flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentProject(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? "bg-[#c4ff00] w-8"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextProject}
            className="flex items-center space-x-2 text-white/60 hover:text-[#c4ff00] transition-colors duration-300 group"
            whileHover={{ x: 5 }}
          >
            <span className="text-sm font-medium">Next</span>
            <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
