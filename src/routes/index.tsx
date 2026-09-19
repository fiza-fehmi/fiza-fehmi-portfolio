import { createFileRoute } from "@tanstack/react-router";
import Navbar from "../components/portfolio/Navbar";
import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import ProjectShowcase from "../components/portfolio/ProjectShowcase";
import Experience from "../components/portfolio/Experience";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";
import { CustomCursor } from "../components/portfolio/CustomCursor";

export const Route = createFileRoute("/")({
  component: Page,
});

function Page() {
  return (
    <>
      <CustomCursor />
      <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">
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
