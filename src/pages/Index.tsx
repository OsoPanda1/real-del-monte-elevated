import { useState, useCallback } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import FloatingParticles from "@/components/FloatingParticles";
import BrumaHeader from "@/components/BrumaHeader";
import HeroSection from "@/components/HeroSection";
import EditorialSection from "@/components/EditorialSection";
import ChapterDivider from "@/components/ChapterDivider";
import VideoTrailer from "@/components/VideoTrailer";
import TourismSection from "@/components/TourismSection";
import FogMap from "@/components/FogMap";
import PhotoGallery from "@/components/PhotoGallery";
import BrumaFooter from "@/components/BrumaFooter";
import RealitoBubble from "@/components/RealitoBubble";

import minaImg from "@/assets/rdm-mina.jpeg";
import gastroImg from "@/assets/gastronomia-pastes.jpg";
import iglesiaImg from "@/assets/rdm-iglesia.jpeg";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(() => {
    if (sessionStorage.getItem("rdm_intro")) return true;
    sessionStorage.setItem("rdm_intro", "1");
    return false;
  });

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      <div className="min-h-screen bg-background overflow-x-hidden">
        <FloatingParticles />
        <BrumaHeader />
        <HeroSection />

        <ChapterDivider
          quote="El mineral que sacamos de estas montañas construyó imperios, pero lo que dejaron los mineros fue algo más valioso: una identidad."
          author="Crónicas de la Sierra, 1867"
        />

        <EditorialSection
          id="historia"
          chapter="Capítulo I · Historia Minera"
          title="Cuatrocientos metros bajo la tierra"
          subtitle="Donde los ecos de Cornwall se mezclan con la obsidiana"
          body={[
            "En 1824, un grupo de mineros cornish cruzó el Atlántico con la promesa de plata. Lo que encontraron fue una montaña que no se dejaba domar fácilmente. Real del Monte se convirtió en el escenario de la primera huelga laboral de América, un acto de dignidad que resonó en las galerías subterráneas.",
            "Hoy, la Mina de Acosta permite descender 400 metros al corazón de la montaña. El aire se enfría, la luz se vuelve ámbar, y el silencio se llena de goteos y memorias. Cada roca cuenta una historia de sudor, esperanza y el choque de dos mundos.",
          ]}
          image={minaImg}
          imageAlt="Interior iluminado de la Mina de Acosta con vagoneta sobre rieles"
          imagePosition="left"
          accentColor="gold"
        />

        <ChapterDivider
          quote="Un paste no es solo comida. Es la nostalgia de un minero inglés convertida en receta mexicana."
        />

        <EditorialSection
          id="gastronomia"
          chapter="Capítulo II · Gastronomía"
          title="El paste: una carta de amor horneada"
          subtitle="La herencia culinaria que cruzó un océano"
          body={[
            "El Cornish pasty viajó en los bolsillos de los mineros como un pedazo de hogar. En Real del Monte, esa receta se transformó. La papa y la carne se mantuvieron, pero el chile y el mole se abrieron paso. El resultado es un mestizaje que se muerde.",
            "Cada septiembre, el Festival del Paste reúne a maestros pasteleros que hornean con recetas que tienen más de un siglo. El aroma a manteca y cebolla invade las calles empedradas, y por un momento, Cornwall y México son el mismo lugar.",
          ]}
          image={gastroImg}
          imageAlt="Paste tradicional cortado mostrando su relleno de papa y carne"
          imagePosition="right"
          accentColor="copper"
        />

        <VideoTrailer />

        <EditorialSection
          id="arquitectura"
          chapter="Capítulo III · Arquitectura"
          title="Cantera y niebla"
          subtitle="Donde Barragán se encontraría con los Cotswolds"
          body={[
            "Las chimeneas de ladrillo rojo perforan la bruma como faros silenciosos. Los techos de lámina oxidada crean una sinfonía visual de óxidos y verdes. La arquitectura de Real del Monte es un palimpsesto: capas de influencia indígena, colonial y británica superpuestas en cada fachada.",
            "La Parroquia de la Asunción domina el horizonte con su cantera gris, mientras que las casas de los mineros ingleses, con sus jardines cercados y ventanas de guillotina, susurran historias de té de las cinco en una montaña mexicana.",
          ]}
          image={iglesiaImg}
          imageAlt="Parroquia colonial de Real del Monte entre la niebla con techos rojos"
          imagePosition="left"
          accentColor="electric"
        />

        <ChapterDivider
          quote="La niebla no oculta. Revela lo esencial eliminando lo superfluo."
          author="RDM Digital"
        />

        <TourismSection />
        <FogMap />
        <PhotoGallery />
        <BrumaFooter />
        <RealitoBubble />
      </div>
    </>
  );
};

export default Index;
