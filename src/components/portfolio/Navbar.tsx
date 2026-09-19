import { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
  { id: "about",      label: "About" },
  { id: "projects",   label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact" },
];

const SOCIALS = [
  { href: "mailto:fzafehmi@gmail.com",     Icon: Mail,     label: "Email" },
  { href: "https://github.com/fiza-fehmi", Icon: Github,   label: "GitHub" },
  { href: "https://linkedin.com",          Icon: Linkedin, label: "LinkedIn" },
];

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("home");
  const [open,      setOpen]      = useState(false);
  const [pct,       setPct]       = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const d = document.documentElement;
      setPct(Math.min(100, window.scrollY / (d.scrollHeight - d.clientHeight) * 100));
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = ["home", ...LINKS.map(l => l.id)];
    const obs = new IntersectionObserver(
      entries => { for (const e of entries) if (e.isIntersecting) setActive(e.target.id); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const navBg = scrolled
    ? "rgba(5,5,5,0.92)"
    : "transparent";
  const navBorder = scrolled
    ? "1px solid rgba(255,255,255,0.05)"
    : "1px solid transparent";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: navBg, backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: navBorder, transition: "all 0.4s ease",
      animation: "navDown 0.6s cubic-bezier(0.16,1,0.3,1) both",
    }}>
      {/* scroll progress */}
      <div style={{
        position: "absolute", bottom: -1, left: 0, height: 1.5,
        width: `${pct}%`, background: "linear-gradient(90deg,#A259FF,rgba(162,89,255,0.2))",
        boxShadow: "0 0 8px rgba(162,89,255,0.5)", transition: "width 0.1s linear",
      }} aria-hidden="true" />

      <nav style={{
        maxWidth: 1280, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 76, padding: "0 3rem",
      }}>
        {/* Logo */}
        <button onClick={() => go("home")} aria-label="Home" style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontFamily: "Sora,sans-serif", fontSize: "1.15rem", fontWeight: 900, letterSpacing: "0.1em", color: "white", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#A259FF"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "white"}
          >FIZA<span style={{ color: "#A259FF" }}>.</span></span>
        </button>

        {/* Desktop links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "2.25rem", listStyle: "none", margin: 0, padding: 0 }} className="hidden md:flex">
          {LINKS.map(l => (
            <li key={l.id}>
              <button onClick={() => go(l.id)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "4px 0", position: "relative",
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                color: active === l.id ? "#A259FF" : "rgba(255,255,255,0.45)",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => { if (active !== l.id) (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={e => { if (active !== l.id) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                {l.label}
                {active === l.id && (
                  <span style={{
                    position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)",
                    width: 4, height: 4, borderRadius: "50%", background: "#A259FF", display: "block",
                    boxShadow: "0 0 6px rgba(162,89,255,0.7)",
                  }} aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: socials + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden md:flex">
          {SOCIALS.map(({ href, Icon, label }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(162,89,255,0.45)"; el.style.color = "#A259FF"; el.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "rgba(255,255,255,0.35)"; el.style.transform = "scale(1)"; }}
            ><Icon size={14} /></a>
          ))}
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.08)", margin: "0 6px" }} />
          <button onClick={() => go("contact")}
            style={{ background: "transparent", border: "1px solid rgba(162,89,255,0.4)", borderRadius: 999, padding: "7px 18px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#A259FF", cursor: "pointer", transition: "all 0.25s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#A259FF"; el.style.color = "#050505"; el.style.boxShadow = "0 0 18px rgba(162,89,255,0.4)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#A259FF"; el.style.boxShadow = "none"; }}
          >Let's Talk ↗</button>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(v => !v)} aria-label="Toggle menu"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)" }}
          className="md:hidden"
        >{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        overflow: "hidden", maxHeight: open ? 300 : 0,
        background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)",
        borderBottom: open ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "max-height 0.3s ease",
      }} className="md:hidden">
        <ul style={{ listStyle: "none", margin: 0, padding: "1rem 2rem" }}>
          {LINKS.map(l => (
            <li key={l.id}>
              <button onClick={() => { go(l.id); setOpen(false); }}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", padding: "12px 0", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: active === l.id ? "#A259FF" : "rgba(255,255,255,0.4)" }}
              >{l.label}</button>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 10, padding: "0 2rem 1.5rem" }}>
          {SOCIALS.map(({ href, Icon, label }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
            ><Icon size={14} /></a>
          ))}
        </div>
      </div>
    </header>
  );
}
