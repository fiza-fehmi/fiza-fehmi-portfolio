import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { GitHubIcon } from './SocialIcons';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragX = useMotionValue(0);

  const projects = [
    {
      title: 'BROS GROUP LLC-official portal',
      description: 'A modern corporate portal for Bros Group LLC featuring consultation booking, startup pitch submissions, and a careers portal built with Next.js and TypeScript.',
      image: '/projects/bros-group-llc.png',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
      liveLink: 'https://bros-group-llc-8l4u-alpha.vercel.app/',
      githubLink: 'https://github.com/fiza-fehmi/Bros-group-LLC.git',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Postage',
      description: 'A full-stack social media platform inspired by Instagram. Features include user authentication, create and share posts, image uploads with ImageKit CDN, follow/unfollow users, like and comment on posts, personalized feed, user profiles, and real-time updates. Built with MERN stack.',
      image: '/projects/postage.png',
      tags: ['React', 'MongoDB', 'Node.js', 'Express', 'ImageKit'],
      liveLink: null,
      githubLink: null,
      githubLinks: {
        frontend: 'https://github.com/fiza-fehmi/frontend',
        backend: 'https://github.com/fiza-fehmi/backend'
      },
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      title: 'Spotify Clone',
      description: 'A full-featured music streaming platform with comprehensive API integration. Features include album management, playlist creation, music streaming, user authentication with login/register, artist and user role management, and complete CRUD operations for music library management.',
      image: '/projects/spotify-clone.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'REST API'],
      liveLink: null,
      githubLink: 'https://github.com/fiza-fehmi/spotify-clone',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      title: 'ShopSphere',
      description: 'A modern e-commerce platform featuring product catalog, advanced filtering by category, price, size and color, shopping cart functionality, user authentication, and responsive design. Built with React, HTML5, and Tailwind CSS for a seamless shopping experience.',
      image: '/projects/shopsphere.png',
      tags: ['React', 'HTML', 'Tailwind CSS', 'JavaScript'],
      liveLink: 'https://ecommerce-store-1hqv.vercel.app',
      githubLink: 'https://github.com/Fiza-Fehmi/Ecommerce-Store',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      title: 'To-Do List',
      description: 'An elegant task management application with intuitive interface. Features include add, edit, and delete tasks, filter by status (all, pending, completed), task counters, and beautiful purple gradient design with dark theme.',
      image: '/projects/todo-list.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://to-do-list-seven-nu-51.vercel.app',
      githubLink: 'https://github.com/fiza-fehmi/to-do-list',
      gradient: 'from-purple-600 to-violet-600',
    },
    {
      title: 'Portfolio Website',
      description: 'A premium, fully responsive personal portfolio showcasing projects and skills with smooth animations, custom cursor, glassmorphism effects, and modern design aesthetics. Built with React, Vite, Tailwind CSS v4, and Framer Motion.',
      image: '/projects/portfolio.png',
      tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      liveLink: 'https://portfolio-website-ochre-omega-73.vercel.app',
      githubLink: 'https://github.com/fiza-fehmi/portfolio_website',
      gradient: 'from-violet-600 to-purple-600',
    },
    {
      title: 'Property Hub',
      description: 'A modern real estate platform for property listings and search. Features a clean interface with property search functionality, responsive design, and user-friendly navigation built with HTML5 and Tailwind CSS.',
      image: '/projects/property-hub.png',
      tags: ['HTML', 'Tailwind CSS', 'JavaScript'],
      liveLink: 'https://property-hub-brown-xi.vercel.app',
      githubLink: 'https://github.com/fiza-fehmi/Property_Hub',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Temperature Converter',
      description: 'An elegant temperature conversion tool that converts between Celsius, Fahrenheit, and Kelvin. Features real-time conversion, clean UI design, and responsive layout for seamless temperature calculations.',
      image: '/projects/temperature-converter.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://temprature-converter-orcin.vercel.app',
      githubLink: 'https://github.com/fiza-fehmi/Temprature-Converter',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      title: 'Stack Calculator',
      description: 'A functional calculator application with a clean, modern interface. Built using stack-based operations for arithmetic calculations including addition, subtraction, multiplication, and division.',
      image: '/projects/stack-calculator.png',
      tags: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://stack-calculator-three.vercel.app',
      githubLink: 'https://github.com/fiza-fehmi/stack-calculator',
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-play (optional - can be removed)
  useEffect(() => {
    const interval = setInterval(() => {
      nextProject();
    }, 5000); // Change project every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    
    if (swipe < -10000) {
      nextProject();
    } else if (swipe > 10000) {
      prevProject();
    }
  };

  return (
    <section id="projects" ref={ref} className="py-12 lg:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in full-stack development and modern web technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative max-w-6xl mx-auto"
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={onDragEnd}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                {/* Project Card - Landscape Layout */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass rounded-3xl overflow-hidden hover:border-primary/30 transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Side - Project Image */}
                    <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-violet-500/10 to-purple-500/10">
                      <motion.img
                        src={projects[currentIndex].image}
                        alt={projects[currentIndex].title}
                        className="w-full h-full object-contain p-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 pointer-events-none"></div>
                    </div>

                    {/* Right Side - Project Info */}
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-bold mb-4 text-gradient">
                          {projects[currentIndex].title}
                        </h3>
                        <p className="text-gray-400 text-base mb-6 line-clamp-4">
                          {projects[currentIndex].description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {projects[currentIndex].tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className={`px-3 py-1.5 text-xs rounded-full bg-gradient-to-r ${projects[currentIndex].gradient} bg-opacity-10 border border-white/10 font-medium`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        {projects[currentIndex].liveLink ? (
                          <>
                            <motion.a
                              href={projects[currentIndex].liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            >
                              <ExternalLink size={18} />
                              Live Demo
                            </motion.a>
                            <motion.a
                              href={projects[currentIndex].githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-6 py-3 glass rounded-xl font-medium flex items-center justify-center gap-2 hover:border-primary/50 transition-all"
                            >
                              <GitHubIcon className="w-[18px] h-[18px]" />
                              GitHub
                            </motion.a>
                          </>
                        ) : projects[currentIndex].githubLinks ? (
                          <>
                            <motion.a
                              href={projects[currentIndex].githubLinks.frontend}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                            >
                              <GitHubIcon className="w-[18px] h-[18px]" />
                              Frontend Repo
                            </motion.a>
                            <motion.a
                              href={projects[currentIndex].githubLinks.backend}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 px-6 py-3 glass rounded-xl font-medium flex items-center justify-center gap-2 hover:border-primary/50 transition-all"
                            >
                              <GitHubIcon className="w-[18px] h-[18px]" />
                              Backend Repo
                            </motion.a>
                          </>
                        ) : (
                          <motion.a
                            href={projects[currentIndex].githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                          >
                            <GitHubIcon className="w-[18px] h-[18px]" />
                            View Repository
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center hover:border-primary/50 transition-all z-10"
            >
              <ChevronLeft size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center hover:border-primary/50 transition-all z-10"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 w-12'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Project Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-gray-400">
              <span className="text-2xl font-bold text-primary">{currentIndex + 1}</span>
              <span className="text-lg"> / {projects.length}</span>
            </p>
          </motion.div>
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://www.linkedin.com/in/fiza-fehmi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 glass rounded-full font-medium hover:border-primary/50 hover:text-primary transition-all"
          >
            Want to see more? Let's talk!
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
