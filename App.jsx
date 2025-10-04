// src/App.jsx
import Navbar from "./components/Navbar";
import HeroSection from "./pages/HeroSection";
import RoadmapSection from "./pages/RoadMapSection";

export default function App() {
  return (
    <div className="min-h-screen ">
      <Navbar
        brand="Learning Roadmap"
        ctaLabel="Comenzar"
        onCtaClick={() =>
          document
            .getElementById("roadmap")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        links={[
          { label: "Inicio", href: "#inicio" },
          { label: "Roadmap", href: "#roadmap" },
          { label: "Módulos", href: "#modulos" },
        ]}
      />
      <main className="pt-28" id="inicio">
        <HeroSection />
        <section id="roadmap">
          <RoadmapSection />
        </section>
      </main>
    </div>
  );
}
