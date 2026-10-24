import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Database, Globe, Zap } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovering, setIsHovering] = useState(false);

  const stats = [
    { icon: Code2, label: 'Projects Completed', value: '10+', gradient: 'from-violet-500 to-purple-500' },
    { icon: Zap, label: 'Technologies', value: '10+', gradient: 'from-purple-500 to-pink-500' },
    { icon: Database, label: 'Full-Stack', value: 'MERN', gradient: 'from-pink-500 to-violet-500' },
    { icon: Globe, label: 'Web Development', value: 'Modern', gradient: 'from-violet-600 to-purple-600' },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section 
      id="about" 
      ref={ref} 
      className="py-12 lg:py-16 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6">
              Passionate <span className="text-gradient">MERN Stack Developer</span>
            </h3>
            <div className="space-y-4 text-gray-400 text-lg">
              <p>
                Hello! I'm Fiza Fehmi, a dedicated MERN Stack Developer with a passion for creating 
                modern, responsive, and user-friendly web applications. I specialize in building 
                full-stack solutions that combine beautiful frontend experiences with robust backend architecture.
              </p>
              <p>
                My expertise spans across the entire MERN ecosystem - from crafting intuitive user 
                interfaces with React to developing scalable server-side applications with Node.js and 
                Express, backed by MongoDB databases.
              </p>
              <p>
                I focus on writing clean, maintainable code while staying up-to-date with the latest 
                web technologies and best practices. Whether it's building RESTful APIs, implementing 
                responsive designs, or integrating third-party services, I bring dedication and 
                attention to detail to every project.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass p-6 rounded-2xl hover:border-primary/30 transition-all group relative overflow-hidden cursor-default"
              >
                {/* Animated Background Gradient - Always active when hovering section */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}`}
                  style={{ opacity: isHovering ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="flex flex-col items-center text-center relative z-10">
                  {/* Icon - Continuous rotation when hovering section */}
                  <motion.div 
                    className="w-16 h-16 glass rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all"
                    animate={isHovering ? { rotate: [0, 360] } : { rotate: 0 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <stat.icon className="text-primary" size={28} />
                  </motion.div>
                  
                  {/* Value - Pulse animation when hovering section */}
                  <motion.div 
                    className="text-3xl font-bold text-gradient mb-2"
                    animate={isHovering ? { 
                      scale: [1, 1.08, 1],
                    } : { scale: 1 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  {/* Label */}
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
                
                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    boxShadow: isHovering ? '0 0 30px rgba(139, 92, 246, 0.3)' : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass p-8 md:p-12 rounded-3xl"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">What I Do</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Frontend Development',
                description: 'Building responsive, interactive UIs with React, JavaScript, and modern CSS frameworks',
              },
              {
                title: 'Backend Development',
                description: 'Creating robust server-side applications with Node.js, Express, and RESTful APIs',
              },
              {
                title: 'Database Management',
                description: 'Designing and implementing efficient MongoDB database schemas and queries',
              },
              {
                title: 'API Integration',
                description: 'Seamlessly integrating third-party APIs and services into web applications',
              },
              {
                title: 'Responsive Design',
                description: 'Ensuring pixel-perfect designs across all devices with Tailwind CSS',
              },
              {
                title: 'Modern UI/UX',
                description: 'Implementing contemporary design patterns and smooth animations for enhanced user experience',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all">
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
