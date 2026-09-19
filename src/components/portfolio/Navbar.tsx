import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-2xl font-bold text-white hover:text-[#c4ff00] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            FIZA<span className="text-[#c4ff00]">.</span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium text-white/70 hover:text-[#c4ff00] transition-colors duration-300 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c4ff00] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-sm font-medium text-white/70 hover:text-[#c4ff00] transition-colors duration-300 relative group"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c4ff00] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-sm font-medium text-white/70 hover:text-[#c4ff00] transition-colors duration-300 relative group"
            >
              Experience
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c4ff00] group-hover:w-full transition-all duration-300"></span>
            </button>
            
            {/* Availability Indicator */}
            <div className="flex items-center space-x-2 px-4 py-2 border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-[#c4ff00] rounded-full animate-pulse"></div>
              <span className="text-xs text-white/60">Available</span>
            </div>

            <motion.button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium px-6 py-2.5 bg-[#c4ff00] text-black hover:bg-[#a8d600] transition-all duration-300 rounded-none relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Let's Talk</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-lg border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={() => scrollToSection("about")}
                className="block w-full text-left text-lg font-medium text-white/70 hover:text-[#c4ff00] transition-colors duration-300"
              >
                About
              </motion.button>
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left text-lg font-medium text-white/70 hover:text-[#c4ff00] transition-colors duration-300"
              >
                Projects
              </motion.button>
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => scrollToSection("experience")}
                className="block w-full text-left text-lg font-medium text-white/70 hover:text-[#c4ff00] transition-colors duration-300"
              >
                Experience
              </motion.button>
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-lg font-medium px-6 py-3 bg-[#c4ff00] text-black hover:bg-[#a8d600] transition-all duration-300"
              >
                Let's Talk
              </motion.button>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-2 pt-4"
              >
                <div className="w-2 h-2 bg-[#c4ff00] rounded-full animate-pulse"></div>
                <span className="text-xs text-white/60">Available for freelance</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
