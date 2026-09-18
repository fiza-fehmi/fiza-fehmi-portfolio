import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "about",      label: "About"      },
  { id: "work",       label: "Work"       },
  { id: "services",   label: "Services"   },
  { id: "experience", label: "Experience" },
  { id: "contact",    label: "Contact"    },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...LINKS.map(l => l.id)];
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ids) { const el = document.getElementById(id); if (el) obs.observe(el); }
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,5,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <nav className="container-xl flex h-16 items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          aria-label="Home"
          className="flex flex-col leading-none"
        >
          <span className="font-display text-base font-bold tracking-[0.12em] text-white uppercase">
            Fiza <span style={{ color: "var(--accent)" }}>Fehmi</span>
          </span>
          <span className="mt-0.5 text-[9px] font-medium tracking-[0.2em] uppercase" style={{ color: "var(--fg3)" }}>
            Full-Stack Developer
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map(link => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200"
                style={{ color: active === link.id ? "var(--accent)" : "var(--fg2)" }}
                onMouseEnter={e => { if (active !== link.id) (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { if (active !== link.id) (e.currentTarget as HTMLElement).style.color = "var(--fg2)"; }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => scrollTo("contact")}
            className="group flex items-center gap-1.5 rounded-full border px-5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300"
            style={{ borderColor: "rgba(183,255,50,0.35)", color: "var(--accent)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "#050505";
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(183,255,50,0.35)";
            }}
          >
            Let's Talk <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center md:hidden"
          style={{ color: "var(--fg2)" }}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className="overflow-hidden transition-all duration-300 md:hidden"
        style={{
          maxHeight: open ? "320px" : "0px",
          background: "rgba(5,5,5,0.96)",
          borderBottom: open ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {LINKS.map(link => (
            <li key={link.id}>
              <button
                onClick={() => { scrollTo(link.id); setOpen(false); }}
                className="w-full py-3 text-left text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-200"
                style={{ color: active === link.id ? "var(--accent)" : "var(--fg2)" }}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-3">
            <button
              onClick={() => { scrollTo("contact"); setOpen(false); }}
              className="w-full rounded-full border py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase"
              style={{ borderColor: "rgba(183,255,50,0.35)", color: "var(--accent)" }}
            >
              Let's Talk ↗
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
