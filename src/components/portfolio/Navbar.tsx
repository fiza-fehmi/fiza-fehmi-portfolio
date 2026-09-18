import { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const NAV_LINKS = [
  { id: "about",      label: "About"      },
  { id: "projects",   label: "Projects"   },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact"    },
];

const SOCIALS = [
  { href: "mailto:fzafehmi@gmail.com",        icon: Mail,     label: "Email"    },
  { href: "https://github.com/fiza-fehmi",    icon: Github,   label: "GitHub"   },
  { href: "https://linkedin.com",             icon: Linkedin, label: "LinkedIn" },
];

function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = ["home", ...NAV_LINKS.map((l) => l.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-[#050505]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">

        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-display text-xl font-bold tracking-widest text-white transition-colors duration-300 hover:text-[#A259FF]"
          aria-label="Go to home"
        >
          FIZA<span className="text-[#A259FF]">.</span>
        </button>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="relative text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
                  style={{ color: isActive ? "#A259FF" : "rgba(255,255,255,0.45)" }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#A259FF]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right — socials + CTA */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Social icons */}
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200"
              style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(162,89,255,0.4)";
                (e.currentTarget as HTMLElement).style.color = "#A259FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)";
              }}
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}

          {/* Thin divider */}
          <div className="mx-2 h-4 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />

          {/* Let's Talk CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="group flex items-center gap-1.5 rounded-full border px-5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
            style={{ borderColor: "rgba(162,89,255,0.35)", color: "#A259FF" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#A259FF";
              (e.currentTarget as HTMLElement).style.color = "#050505";
              (e.currentTarget as HTMLElement).style.borderColor = "#A259FF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#A259FF";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(162,89,255,0.35)";
            }}
          >
            Let's Talk
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center text-white/60 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-b border-white/5 bg-[#050505]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-5">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => { scrollTo(link.id); setOpen(false); }}
                className="w-full py-3 text-left text-xs font-semibold tracking-widest uppercase transition-colors duration-200"
                style={{ color: active === link.id ? "#A259FF" : "rgba(255,255,255,0.4)" }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        {/* Mobile socials */}
        <div className="flex items-center gap-3 px-6 pb-5">
          {SOCIALS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="flex h-8 w-8 items-center justify-center rounded-full border"
              style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
