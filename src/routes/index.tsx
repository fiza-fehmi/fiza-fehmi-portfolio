import { createFileRoute } from "@tanstack/react-router";
import { Navbar }          from "../components/portfolio/Navbar";
import { Hero }            from "../components/portfolio/Hero";
import { About }           from "../components/portfolio/About";
import { ProjectShowcase } from "../components/portfolio/ProjectShowcase";
import { Experience }      from "../components/portfolio/Experience";
import { Contact }         from "../components/portfolio/Contact";
import { CustomCursor }    from "../components/portfolio/CustomCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fiza Fehmi — Full-Stack Developer" },
      { name: "description", content: "Full-stack developer building modern, responsive web applications with React, Node.js, Express and MongoDB." },
      { property: "og:title", content: "Fiza Fehmi — Full-Stack Developer" },
      { property: "og:type",  content: "website" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <CustomCursor />
      <div style={{ background: "#050505", color: "#f5f5f5", minHeight: "100vh" }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <ProjectShowcase />
          <Experience />
          <Contact />
        </main>
        {/* minimal footer */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "2.5rem 3rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 900, fontSize: "1rem", letterSpacing: "0.1em", color: "white" }}>FIZA<span style={{ color: "#A259FF" }}>.</span></span>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>© 2026 Fiza Fehmi. All rights reserved.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#A259FF"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)"}
            >Back to Top ↑</button>
          </div>
        </footer>
      </div>
    </>
  );
}
