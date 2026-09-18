import { createFileRoute } from "@tanstack/react-router";
import { Navbar }          from "../components/portfolio/Navbar";
import { Hero }            from "../components/portfolio/Hero";
import { About }           from "../components/portfolio/About";
import { ProjectShowcase } from "../components/portfolio/ProjectShowcase";
import { Experience }      from "../components/portfolio/Experience";
import { Contact }         from "../components/portfolio/Contact";
import { Footer }          from "../components/portfolio/Footer";
import { CustomCursor }    from "../components/portfolio/CustomCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fiza Fehmi — Full-Stack Web Developer" },
      {
        name: "description",
        content:
          "Portfolio of Fiza Fehmi, a full-stack web developer building modern, responsive websites and web applications with React, Node.js, Express and MongoDB.",
      },
      { property: "og:title",       content: "Fiza Fehmi — Full-Stack Web Developer" },
      { property: "og:description", content: "Building digital experiences that are simple, useful and memorable." },
      { property: "og:type",        content: "website" },
      { name: "twitter:card",       content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen" style={{ background: "#050505", cursor: "none" }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <ProjectShowcase />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
