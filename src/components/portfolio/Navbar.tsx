import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "about",      label: "About" },
  { id: "projects",   label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Let's Talk" },
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
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
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
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-display text-lg font-bold tracking-widest text-white hover:text-[#B8FF2C] transition-colors duration-300"
          aria-label="Go to home"
        >
          FIZA<span className="text-[#B8FF2C]">.</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => {
            const isContact = link.id === "contact";
            const isActive = active === link.id;
            if (isContact) {
              return (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="label rounded-full border border-white/15 px-4 py-1.5 text-white/70 transition-all duration-300 hover:border-[#B8FF2C]/50 hover:text-[#B8FF2C]"
                  >
                    {link.label}
                  </button>
                </li>
              );
            }
            return (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className={`label transition-colors duration-300 ${
                    isActive ? "text-[#B8FF2C]" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center text-white/70 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-b border-white/5 bg-[#050505]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => { scrollTo(link.id); setOpen(false); }}
                className={`label w-full py-2.5 text-left transition-colors duration-200 ${
                  active === link.id ? "text-[#B8FF2C]" : "text-white/50"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
