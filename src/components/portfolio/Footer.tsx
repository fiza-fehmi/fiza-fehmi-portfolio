import { Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
  { label: "About",      id: "about" },
  { label: "Projects",   id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact",    id: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="divider px-6 md:px-12 lg:px-20 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Logo + tagline */}
          <div>
            <p className="font-display text-lg font-black tracking-widest text-white">
              FIZA<span className="text-[#A259FF]">.</span>
            </p>
            <p className="mt-2 text-xs text-white/25">
              Full-Stack Web Developer · Pakistan
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="label text-white/25 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:fzafehmi@gmail.com"
              aria-label="Email Fiza"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 text-white/30 transition-all duration-200 hover:border-[#A259FF]/40 hover:text-[#A259FF]"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/fiza-fehmi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 text-white/30 transition-all duration-200 hover:border-[#A259FF]/40 hover:text-[#A259FF]"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/8 text-white/30 transition-all duration-200 hover:border-[#A259FF]/40 hover:text-[#A259FF]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-white/20">
            © 2026 Fiza Fehmi. All rights reserved.
          </p>
          <p className="label text-white/15">
            Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
