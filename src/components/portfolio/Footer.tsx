import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  return (
    <footer className="divider" style={{ background: "var(--bg2)" }}>
      <div className="container-xl py-14">

        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

          {/* Brand */}
          <div>
            <p className="font-display text-lg font-black tracking-[0.1em] uppercase text-white">
              Fiza <span style={{ color: "var(--accent)" }}>Fehmi</span>
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--fg3)" }}>
              Full-Stack Developer
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6">
              {[
                ["about", "About"],
                ["work", "Work"],
                ["services", "Services"],
                ["experience", "Experience"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 hover:text-white"
                    style={{ color: "var(--fg3)" }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { href: "mailto:fzafehmi@gmail.com", icon: Mail, label: "Email" },
              { href: "https://github.com/fiza-fehmi", icon: Github, label: "GitHub" },
              { href: "#", icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200"
                style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--fg3)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(183,255,50,0.35)";
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "var(--fg3)";
                }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-10 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-[11px] font-medium" style={{ color: "var(--fg3)" }}>
            © 2026 Fiza Fehmi. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 hover:text-white"
            style={{ color: "var(--fg3)" }}
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
