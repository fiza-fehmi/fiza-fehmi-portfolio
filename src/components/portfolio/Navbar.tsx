import { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const NAV_LINKS = [
  { id: "about",      label: "About"      },
  { id: "projects",   label: "Projects"   },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact"    },
];

const SOCIALS = [
  { href: "mailto:fzafehmi@gmail.com",     icon: Mail,     label: "Email"    },
  { href: "https://github.com/fiza-fehmi", icon: Github,   label: "GitHub"   },
  { href: "https://linkedin.com",          icon: Linkedin, label: "LinkedIn" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("home");
  const [open,      setOpen]      = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const doc = document.documentElement;
      setScrollPct(Math.min(100, (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", ...NAV_LINKS.map(l => l.id)];
    const obs = new IntersectionObserver(
      entries => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) { const el = document.getElementById(id); if (el) obs.observe(el); }
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-enter { animation: navSlideDown 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      <header
        className="nav-enter"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
          background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        }}
      >
        {/* Scroll progress bar */}
        <div style={{
          position: "absolute", bottom: -1, left: 0, height: 1.5,
          background: "linear-gradient(90deg, #A259FF, rgba(162,89,255,0.3))",
          width: `${scrollPct}%`, transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(162,89,255,0.5)",
        }} aria-hidden="true" />

        <nav style={{ maxWidth: 1280, margin: "0 auto", display: "flex", height: 80, alignItems: "center", justifyContent: "space-between", padding: "0 3rem" }}>

          {/* Logo */}
          <button onClick={() => scrollTo("home")} aria-label="Home"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <span style={{ fontFamily: "Sora,sans-serif", fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.12em", color: "white", transition: "color 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#A259FF"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "white"}
            >
              FIZA<span style={{ color: "#A259FF" }}>.</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul style={{ display: "flex", alignItems: "center", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
            {NAV_LINKS.map(link => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button onClick={() => scrollTo(link.id)} style={{
                    background: "none", border: "none", cursor: "pointer", padding: "4px 0",
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                    color: isActive ? "#A259FF" : "rgba(255,255,255,0.45)",
                    transition: "color 0.2s ease", position: "relative",
                  }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
                  >
                    {link.label}
                    {isActive && (
                      <span style={{
                        position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
                        width: 4, height: 4, borderRadius: "50%", background: "#A259FF", display: "block",
                        boxShadow: "0 0 6px rgba(162,89,255,0.6)",
                      }} aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Socials + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="hidden md:flex">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", transition: "all 0.2s ease", textDecoration: "none" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(162,89,255,0.45)"; el.style.color = "#A259FF"; el.style.transform = "scale(1.12)"; el.style.boxShadow = "0 0 12px rgba(162,89,255,0.3)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "rgba(255,255,255,0.3)"; el.style.transform = "scale(1)"; el.style.boxShadow = "none"; }}
              >
                <Icon size={14} />
              </a>
            ))}
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />
            <button onClick={() => scrollTo("contact")}
              style={{ background: "transparent", border: "1px solid rgba(162,89,255,0.35)", borderRadius: 999, padding: "8px 20px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A259FF", cursor: "pointer", transition: "all 0.25s ease", display: "flex", alignItems: "center", gap: 6 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#A259FF"; el.style.color = "#050505"; el.style.borderColor = "#A259FF"; el.style.boxShadow = "0 0 20px rgba(162,89,255,0.4)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#A259FF"; el.style.borderColor = "rgba(162,89,255,0.35)"; el.style.boxShadow = "none"; }}
            >
              Let's Talk ↗
            </button>
          </div>

          {/* Mobile toggle */}
          <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)" }}
            onClick={() => setOpen(v => !v)} aria-label="Toggle menu" className="md:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <div style={{ overflow: "hidden", maxHeight: open ? "320px" : 0, background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)", borderBottom: open ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)" }} className="md:hidden">
          <ul style={{ listStyle: "none", margin: 0, padding: "1rem 2rem" }}>
            {NAV_LINKS.map(link => (
              <li key={link.id}>
                <button onClick={() => { scrollTo(link.id); setOpen(false); }}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "12px 0", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: active === link.id ? "#A259FF" : "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, padding: "0 2rem 1.5rem" }}>
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
