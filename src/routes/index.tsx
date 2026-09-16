import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  MapPin,
  Mail,
  Send,
  LayoutGrid,
  Server,
  Database,
  Wrench,
  Briefcase,
  Layers,
  ShieldCheck,
  Globe,
  Braces,
  Rocket,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fiza Fehmi — Junior MERN Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Fiza Fehmi, a Junior MERN Stack Developer in Bahawalpur, Pakistan — building responsive, secure full-stack apps with React, Node.js, Express and MongoDB.",
      },
      { property: "og:title", content: "Fiza Fehmi — Junior MERN Stack Developer" },
      {
        property: "og:description",
        content:
          "Responsive, scalable, user-focused web applications with the MERN stack.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const { id } of NAV_LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#home" className="font-display text-base font-bold tracking-tight">
          Fiza Fehmi<span className="text-primary">.dev</span>
        </a>
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`relative py-1 text-sm font-medium transition-colors hover:text-primary ${
                  active === link.id ? "text-primary" : "text-muted-foreground"
                } after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-primary after:transition-all ${
                  active === link.id ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <ul className="border-t border-border/70 bg-background px-5 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary ${
                  active === link.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="mb-3 flex items-center gap-4">
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
        {children}
      </h2>
      <span className="h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-14 md:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

function Hero() {
  const stack = ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"];
  return (
    <section id="home" className="scroll-mt-20 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Bahawalpur, Pakistan · Open to opportunities
        </p>
        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Hi, I'm <span className="text-primary">Fiza Fehmi</span>
        </h1>
        <p className="mt-3 font-display text-xl font-semibold text-foreground/85 sm:text-2xl">
          Junior MERN Stack Developer
        </p>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Building responsive, scalable, and user-focused web applications with
          the MERN stack.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_var(--color-primary)] transition-all hover:brightness-110"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Contact Me
          </a>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const ABOUT_POINTS = [
  { icon: Globe, title: "Responsive frontends", text: "Component-driven React interfaces that work on every screen size." },
  { icon: Braces, title: "RESTful APIs", text: "Structured Express.js endpoints following MVC architecture." },
  { icon: ShieldCheck, title: "Auth & authorization", text: "JWT sessions, protected routes, role-based access and bcrypt hashing." },
  { icon: Database, title: "Database-driven apps", text: "MongoDB schemas, relationships and Mongoose populate()." },
  { icon: Rocket, title: "Full-stack delivery", text: "End-to-end features from data model to polished UI." },
];

function About() {
  return (
    <Section id="about" className="border-t border-border/60">
      <SectionHeading>About</SectionHeading>
      <h3 className="font-display text-lg font-semibold text-foreground/85 md:text-xl">
        A developer who ships across the full stack
      </h3>
      <div className="mt-4 max-w-3xl space-y-3 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          I'm a Junior MERN Stack Developer based in Bahawalpur, Pakistan, with
          hands-on experience building complete web applications — from responsive
          React interfaces to secure Express APIs backed by MongoDB.
        </p>
        <p>
          I work day to day with React.js, Node.js, Express.js, MongoDB and
          Mongoose, and I care about clean structure, readable code and features
          that hold up in real use.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ABOUT_POINTS.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <Icon className="h-5 w-5 text-primary" />
            <h4 className="mt-3 text-sm font-semibold">{title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const SKILL_GROUPS = [
  {
    icon: LayoutGrid,
    title: "Frontend",
    skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "React Router", "Context API", "Axios", "Vite"],
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "Authorization", "bcrypt", "Middleware", "MVC Architecture", "Multer", "ImageKit"],
  },
  {
    icon: Database,
    title: "Database",
    skills: ["MongoDB", "Mongoose", "MongoDB Relationships", "populate()"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "GitHub", "Postman", "npm"],
  },
];

function Skills() {
  return (
    <Section id="skills" className="border-t border-border/60">
      <SectionHeading>Skills</SectionHeading>
      <h3 className="font-display text-lg font-semibold text-foreground/85 md:text-xl">
        Technologies I work with
      </h3>
      <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">
        The stack I use to design, build and secure full-stack applications.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map(({ icon: Icon, title, skills }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <Icon className="h-4 w-4 text-accent-foreground" />
              </span>
              <h4 className="text-sm font-semibold">{title}</h4>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const EXPERIENCE_TAGS = [
  "React.js & Tailwind CSS",
  "Node.js & Express.js",
  "MongoDB & Mongoose",
  "JWT authentication",
  "Role-based authorization",
  "bcrypt",
  "Git / GitHub",
];

function Experience() {
  return (
    <Section id="experience" className="border-t border-border/60">
      <SectionHeading>Experience</SectionHeading>
      <h3 className="font-display text-lg font-semibold text-foreground/85 md:text-xl">
        Where I'm building
      </h3>
      <div className="mt-8 max-w-3xl rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
              <Briefcase className="h-4.5 w-4.5 text-accent-foreground" />
            </span>
            <div>
              <h4 className="text-base font-semibold">MERN Stack Developer Intern</h4>
              <p className="mt-0.5 text-sm text-muted-foreground">
                AI TechSpine LLC · Remote
              </p>
            </div>
          </div>
          <span className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
            Jul 2026 – Present
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {EXPERIENCE_TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

const PROJECTS = [
  {
    title: "Spotify Clone",
    subtitle: "Backend API",
    category: "Backend",
    featured: true,
    description:
      "RESTful backend with JWT authentication, role-based authorization, bcrypt security, and Music & Album APIs using MongoDB and Mongoose.",
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt"],
  },
  {
    title: "Postage",
    subtitle: "Full-Stack Social Media Application",
    category: "Full-Stack",
    featured: true,
    description:
      "Full-stack social platform with login, posts, feed, JWT authentication, authorization, REST APIs, and image uploads.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "Multer", "ImageKit"],
  },
  {
    title: "ShopSphere",
    subtitle: "E-commerce Store",
    category: "Frontend",
    featured: false,
    description:
      "Responsive e-commerce website featuring product listings, categories, and checkout functionality.",
    tech: ["React.js", "Tailwind CSS"],
    liveDemo: "#",
  },
  {
    title: "TaskFlow",
    subtitle: "To-Do Application",
    category: "Frontend",
    featured: false,
    description:
      "Task management app with add, edit, complete, and clear-all functionality.",
    tech: ["HTML", "JavaScript", "Tailwind CSS"],
    liveDemo: "#",
  },
  {
    title: "Stack Calculator",
    subtitle: "Utility App",
    category: "Frontend",
    featured: false,
    description:
      "Interactive calculator supporting basic arithmetic operations and result calculation.",
    tech: ["HTML", "JavaScript", "Tailwind CSS"],
    liveDemo: "#",
  },
];

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {project.category}
        </span>
        {project.featured && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            Featured
          </span>
        )}
      </div>
      <h4 className="mt-3 font-display text-xl font-semibold tracking-tight">
        {project.title}
      </h4>
      <p className="mt-0.5 text-sm font-medium text-muted-foreground">{project.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
      {"liveDemo" in project && project.liveDemo && (
        <div className="mt-auto pt-5">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>
        </div>
      )}
    </article>
  );
}

function Projects() {
  return (
    <Section id="projects" className="border-t border-border/60">
      <SectionHeading>Projects</SectionHeading>
      <h3 className="font-display text-lg font-semibold text-foreground/85 md:text-xl">
        Selected work
      </h3>
      <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">
        Projects built across the MERN stack — from secure backend APIs to
        responsive frontend applications.
      </p>
      <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2">
        {PROJECTS.slice(0, 4).map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
        <div className="md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)]">
          <ProjectCard project={PROJECTS[4]!} />
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:fzafehmi@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputClass =
    "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <Section id="contact" className="border-t border-border/60">
      <SectionHeading>Contact</SectionHeading>
      <h3 className="font-display text-lg font-semibold text-foreground/85 md:text-xl">
        Let's Build Something Together
      </h3>
      <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">
        Open to junior MERN stack roles and collaborative projects. Send a message
        and I'll get back to you.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h4 className="text-sm font-semibold">Reach me directly</h4>
          <div className="mt-4 space-y-4">
            <a
              href="mailto:fzafehmi@gmail.com"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                <Mail className="h-4 w-4 text-accent-foreground" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground/80">Email</span>
                fzafehmi@gmail.com
              </span>
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                <MapPin className="h-4 w-4 text-accent-foreground" />
              </span>
              <span>
                <span className="block text-xs text-muted-foreground/80">Location</span>
                Bahawalpur, Pakistan
              </span>
            </div>
          </div>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Name
              </label>
              <input id="name" name="name" required className={inputClass} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input id="email" name="email" type="email" required className={inputClass} placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Tell me about your project or role…"
            />
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
          >
            <Send className="h-4 w-4" />
            {sent ? "Opening your email client…" : "Send Message"}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Index() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-border/60 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 text-xs text-muted-foreground sm:flex-row md:px-8">
          <p>© 2026 Fiza Fehmi. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-primary" />
            Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
