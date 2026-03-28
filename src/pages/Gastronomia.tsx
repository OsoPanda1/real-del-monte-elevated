import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Star, MapPin, Utensils } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import SectionHeader from "@/components/SectionHeader";
import GradientSeparator from "@/components/GradientSeparator";
import { StaggerContainer, StaggerItem, GlowCard, TextReveal, ImmersiveHero } from "@/components/VisualEffects";

import gastroImg from "@/assets/gastronomia-pastes.jpg";
import calleImg from "@/assets/rdm-calle.jpeg";
import plazaImg from "@/assets/rdm-plaza.jpeg";
import minaImg from "@/assets/rdm-mina.jpeg";

const pastes = [
  { name: "Paste de Papa con Carne", origin: "Cornish Original, 1824", description: "La receta que cruzó el Atlántico. Papa, carne molida, cebolla y perejil envueltos en una masa crujiente de manteca.", time: "Preparación: 45 min", image: gastroImg },
  { name: "Paste de Mole", origin: "Fusión Mexicana, ~1860", description: "Cuando el mole poblano se encontró con la masa cornish. Pollo deshebrado bañado en mole oscuro y complejo.", time: "Preparación: 1h 20min", image: calleImg },
  { name: "Paste de Frijol con Queso", origin: "Tradición Popular", description: "Frijol refrito con queso Oaxaca fundido. Lo que los mineros mexicanos aportaron a la tradición.", time: "Preparación: 35 min", image: plazaImg },
  { name: "Paste de Arroz con Leche", origin: "Dulce Colonial", description: "El postre que cierra toda comida minera. Arroz cremoso con canela y leche condensada, horneado hasta dorar.", time: "Preparación: 50 min", image: minaImg },
];

const restaurants = [
  { name: "Pastes El Portal", specialty: "Paste original de papa", rating: 4.8, years: "4 generaciones", location: "Calle Hidalgo #12" },
  { name: "Pastes Kikos", specialty: "Paste de mole y tinga", rating: 4.7, years: "Desde 1940", location: "Plaza Principal" },
  { name: "El Socavón", specialty: "Cocina de mina y mezcal", rating: 4.5, years: "15 años", location: "Callejón de las Flores" },
  { name: "Café de la Mina", specialty: "Café de altura y repostería", rating: 4.6, years: "8 años", location: "Av. Constitución #45" },
  { name: "Don Horacio", specialty: "Barbacoa y consomé", rating: 4.9, years: "3 generaciones", location: "Calle Real #78" },
  { name: "La Casona Minera", specialty: "Cocina regional gourmet", rating: 4.4, years: "5 años", location: "Plaza de la Cruz" },
];

const PasteCard = ({ paste, index }: { paste: typeof pastes[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="grid md:grid-cols-2 gap-6 md:gap-8 items-center"
    >
      <div className={`relative overflow-hidden rounded-xl img-zoom ${isEven ? "" : "md:order-2"}`}>
        <div className="aspect-[4/3]">
          <img src={paste.image} alt={paste.name} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 glass rounded-full px-3 py-1.5">
          <span className="font-body text-[9px] tracking-[0.2em] uppercase text-gold">{paste.origin}</span>
        </div>
      </div>

      <div className={`space-y-3 sm:space-y-4 ${isEven ? "" : "md:order-1"}`}>
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-copper">Receta Nº{index + 1}</span>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-gradient-gold">{paste.name}</h3>
        <div className="w-12 h-px bg-gold/40" />
        <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{paste.description}</p>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5 text-gold/60" />
          <span className="font-body text-xs">{paste.time}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Gastronomia = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <BrumaHeader />

      <ImmersiveHero image={gastroImg} title="Gastronomía" subtitle="El paste: una carta de amor horneada entre Cornwall y México" label="Sabores que Cruzan Océanos">
        <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-xs tracking-wider uppercase">Inicio</span>
        </Link>
      </ImmersiveHero>

      {/* Story */}
      <section className="container mx-auto px-6 md:px-12 py-16 md:py-20 max-w-4xl">
        <TextReveal>
          <p className="font-display text-xl sm:text-2xl md:text-3xl text-foreground/80 italic leading-relaxed text-center">
            <span className="text-2xl sm:text-3xl md:text-4xl font-display text-gold float-left mr-3 mt-1 leading-none not-italic">"</span>
            En 1824, un minero cornish sacó de su bolsillo una empanada fría.
            Doscientos años después, esa empanada tiene su propio festival,
            su propio monumento y su propia identidad mexicana.
          </p>
        </TextReveal>
      </section>

      <GradientSeparator variant="gold" />

      {/* Paste Catalog */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-20">
        <SectionHeader label="Catálogo de Sabores" title="Los Pastes Esenciales" subtitle="Cada variedad es un capítulo de la historia mestiza" />
        <div className="space-y-16 md:space-y-20 max-w-5xl mx-auto">
          {pastes.map((paste, i) => (
            <PasteCard key={paste.name} paste={paste} index={i} />
          ))}
        </div>
      </section>

      <GradientSeparator variant="full" />

      {/* Restaurants */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-20">
        <SectionHeader label="Dónde Comer" title="Los Mejores de la Sierra" subtitle="Establecimientos que guardan las recetas más auténticas" />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {restaurants.map((r) => (
            <StaggerItem key={r.name}>
              <GlowCard color="gold" className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-foreground">{r.name}</h3>
                    <span className="font-body text-[10px] tracking-wider uppercase text-gold/60">{r.years}</span>
                  </div>
                  <div className="flex items-center gap-1 glass rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span className="font-body text-xs text-foreground font-medium">{r.rating}</span>
                  </div>
                </div>
                <div className="w-8 h-px bg-gold/30 mb-3" />
                <p className="font-body text-xs sm:text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Utensils className="w-3 h-3 text-copper flex-shrink-0" /> {r.specialty}
                </p>
                <p className="font-body text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-electric/60 flex-shrink-0" /> {r.location}
                </p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Festival CTA */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(43,80%,55%,0.04),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center px-6"
        >
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/60 block mb-4">Cada Septiembre</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-gradient-gold mb-4">Festival del Paste</h2>
          <p className="font-display text-base md:text-lg text-platinum/50 italic max-w-lg mx-auto mb-8">
            30+ variedades, maestros pasteleros de 4 generaciones, y el aroma a manteca que invade las calles empedradas.
          </p>
          <Link to="/rutas" className="btn-premium inline-block">Planea tu visita</Link>
        </motion.div>
      </section>

      <BrumaFooter />
      <RealitoBubble />
    </div>
  );
};

export default Gastronomia;
