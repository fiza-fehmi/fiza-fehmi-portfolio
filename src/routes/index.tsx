import { createFileRoute } from "@tanstack/react-router";
import { Navbar }       from "../components/portfolio/Navbar";
import { Hero }         from "../components/portfolio/Hero";
import { About }        from "../components/portfolio/About";
import { TechStack }    from "../components/portfolio/TechStack";
import { Services }     from "../components/portfolio/Services";
import { Projects }     from "../components/portfolio/Projects";
import { Experience }   from "../components/portfolio/Experience";
import { Contact }      from "../components/portfolio/Contact";
import { Footer }       from "../components/portfolio/Footer";
import { CustomCursor } from "../components/portfolio/CustomCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fiza Fehmi — Full-Stack Developer" },
      {
        name: "description",
        content:
          "Full-stack developer building modern, responsive web applications with React, Node.js, Express and MongoDB.",
      },
      { property: "og:title",       content: "Fiza Fehmi — Full-Stack Developer" },
      { property: "og:description", content: "Full-stack developer building modern, responsive web applications with React, Node.js, Express and MongoDB." },
      { property: "og:type",        content: "website" },
      { name: "twitter:card",       content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <CustomCursor />
      <div style={{ background: "var(--bg)", color: "var(--fg)", cursor: "none", minHeight: "100vh" }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechStack />
          <Services />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
