import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { socialLinks } from "../../data/portfolio";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: socialLinks.email,
      href: `mailto:${socialLinks.email}`,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/fiza-fehmi",
      href: socialLinks.github,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/fiza",
      href: socialLinks.linkedin,
    },
    {
      icon: ExternalLink,
      label: "Fiverr",
      value: "fiverr.com/fiza",
      href: socialLinks.fiverr,
    },
  ];

  return (
    <section id="contact" ref={ref} className="relative bg-[#0a0a0a] py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-12"
        >
          <span className="text-xs text-[#c4ff00] font-medium tracking-wider uppercase">
            04 — CONTACT
          </span>
          <div className="flex-1 h-px bg-white/10"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Main Heading */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Let's build
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                something
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#c4ff00] leading-[1.1] tracking-tight">
                great<span className="text-white">.</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg"
            >
              Have a project in mind? Let's discuss how we can work together to bring 
              your ideas to life. I'm always open to new opportunities and collaborations.
            </motion.p>

            <motion.a
              href={`mailto:${socialLinks.email}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-[#c4ff00] text-black text-sm font-semibold hover:bg-[#a8d600] transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start a project</span>
              <motion.span
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                →
              </motion.span>
            </motion.a>
          </div>

          {/* Right Column - Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group flex items-start space-x-4 p-6 border border-white/10 hover:border-[#c4ff00]/50 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="p-3 border border-white/10 group-hover:border-[#c4ff00]/50 group-hover:bg-[#c4ff00]/10 transition-all duration-300">
                  <method.icon className="w-5 h-5 text-white/60 group-hover:text-[#c4ff00] transition-colors duration-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/50 font-medium tracking-wider uppercase mb-1">
                    {method.label}
                  </div>
                  <div className="text-white/80 group-hover:text-white transition-colors duration-300 break-all">
                    {method.value}
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="w-4 h-4 text-[#c4ff00]" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 pt-12 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <div className="text-white/60 text-sm">
                Prefer a quick chat?
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">
                {socialLinks.email}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#c4ff00] rounded-full animate-pulse"></div>
              <span className="text-xs text-white/60">Usually responds within 24 hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
