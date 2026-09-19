import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { socialLinks } from "../../data/portfolio";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: Mail, href: `mailto:${socialLinks.email}`, label: "Email" },
    { icon: Github, href: socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: ExternalLink, href: socialLinks.fiverr, label: "Fiverr" },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <motion.button
              onClick={scrollToTop}
              className="text-3xl font-bold text-white hover:text-[#c4ff00] transition-colors duration-300 text-left"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FIZA<span className="text-[#c4ff00]">.</span>
            </motion.button>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              MERN Full-Stack Developer crafting modern web experiences that are 
              simple, fast, and built to last.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="text-xs text-white/50 font-medium tracking-wider uppercase">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-3">
              {["About", "Projects", "Experience", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) {
                      const offset = 80;
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                    }
                  }}
                  className="text-white/60 hover:text-[#c4ff00] transition-colors duration-300 text-left text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="space-y-6">
            <h3 className="text-xs text-white/50 font-medium tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex space-x-3">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="p-3 border border-white/10 hover:border-[#c4ff00]/50 hover:bg-[#c4ff00]/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-4 h-4 text-white/60 group-hover:text-[#c4ff00] transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
            <div className="pt-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-[#c4ff00] rounded-full animate-pulse"></div>
                <span className="text-xs text-white/60">Available for freelance</span>
              </div>
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-sm text-white/80 hover:text-[#c4ff00] transition-colors duration-300"
              >
                {socialLinks.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-white/40">
              © {currentYear} Fiza Fehmi. All rights reserved.
            </div>
            <div className="text-sm text-white/40">
              Designed & Built with{" "}
              <span className="text-[#c4ff00]">passion</span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-[#c4ff00] text-black hover:bg-[#a8d600] transition-all duration-300 shadow-lg shadow-[#c4ff00]/20 z-40 group"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
