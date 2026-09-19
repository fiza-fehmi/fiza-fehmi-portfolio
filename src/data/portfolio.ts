export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export interface Experience {
  id: number;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "MERN E-Commerce Platform",
    description: "Full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration. Features include admin dashboard, order tracking, and real-time inventory updates.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Stripe"],
    image: "/projects/ecommerce.jpg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Property Management System",
    description: "Comprehensive property management website with tenant portals, maintenance requests, rent tracking, and automated notifications. Built with modern stack for scalability.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT Auth"],
    image: "/projects/property.jpg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Task Management Application",
    description: "Collaborative task management tool with real-time updates, team collaboration features, deadline tracking, and progress visualization. Clean UI with drag-and-drop functionality.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    image: "/projects/taskmanager.jpg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Full-Stack Business Website",
    description: "Modern business website with CMS integration, contact forms, blog functionality, and analytics dashboard. Optimized for SEO and performance.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    image: "/projects/business.jpg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Modern Portfolio Website",
    description: "Interactive portfolio showcase with smooth animations, dark mode, project filtering, and contact form integration. Built with performance and accessibility in mind.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
    image: "/projects/portfolio.jpg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "AI-Powered Web Application",
    description: "Innovative web application integrating AI capabilities for content generation, data analysis, and intelligent automation. Features modern UI and robust backend API.",
    technologies: ["React", "Node.js", "OpenAI API", "MongoDB", "Express"],
    image: "/projects/ai-app.jpg",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    period: "JUN 2026 — PRESENT",
    title: "MERN Stack Development Intern",
    company: "AI Tech Spine LLC",
    location: "Remote",
    description: "Working with React, JavaScript, Tailwind CSS on the frontend, while building backend APIs using Node.js, Express.js and MongoDB. Developing scalable web applications and implementing modern development practices."
  }
];

export const skills = [
  "Full-Stack Web Applications",
  "Responsive Frontend Development",
  "REST API Development",
  "MongoDB Integration",
  "Authentication & OTP",
  "Third-Party API Integration",
  "Admin Dashboards",
  "AI-Powered Web Applications"
];

export const socialLinks = {
  email: "fiza@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  fiverr: "https://fiverr.com"
};
