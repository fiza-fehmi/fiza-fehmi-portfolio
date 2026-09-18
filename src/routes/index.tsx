import { createFileRoute } from "@tanstack/react-router";
import { Navbar }          from "../components/portfolio/Navbar";
import { Hero }            from "../components/portfolio/Hero";
import { About }           from "../components/portfolio/About";
import { ProjectShowcase } from "../components/portfolio/ProjectShowcase";
import { Experience }      from "../components/portfolio/Experience";
import { Contact }         from "../components/portfolio/Contact";
import { CustomCursor }    from "../components/portfolio/CustomCursor";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <>
      <CustomCursor />
      <div style={{ background: "#050505", color: "#f5f5f5", cursor: "none", minHeight: "100vh" }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <ProjectShowcase />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
}
