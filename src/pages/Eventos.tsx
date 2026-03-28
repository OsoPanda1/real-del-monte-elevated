import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import SectionHeader from "@/components/SectionHeader";
import GradientSeparator from "@/components/GradientSeparator";
import { StaggerContainer, StaggerItem, GlowCard, ImmersiveHero } from "@/components/VisualEffects";

import plazaImg from "@/assets/rdm-plaza.jpeg";
import calleImg from "@/assets/rdm-calle.jpeg";
import iglesiaImg from "@/assets/rdm-iglesia.jpeg";
import minaImg from "@/assets/rdm-mina.jpeg";
import gastroImg from "@/assets/gastronomia-pastes.jpg";

const featuredEvent = {
  name: "Festival del Paste 2026",
  date: "13 — 15 de Septiembre, 2026",
  time: "10:00 — 20:00 hrs",
  location: "Plaza Principal y calles aledañas",
  description: "El festival gastronómico más emblemático de Real del Monte celebra su edición 2026 con más de 30 variedades de pastes, concursos de recetas centenarias, música en vivo y la participación de maestros pasteleros de cuatro generaciones.",
  image: gastroImg,
  capacity: "5,000+ visitantes",
};

const events = [
  { name: "Noche de Leyendas", date: "22 Mar", time: "19:00", location: "Panteón Inglés", description: "Recorrido nocturno dramatizado con actores entre las tumbas centenarias.", image: iglesiaImg, category: "Cultural" },
  { name: "Feria de la Plata", date: "08 Abr", time: "09:00", location: "Centro Cultural", description: "Exposición de platería artesanal, talleres de orfebrería y venta directa.", image: calleImg, category: "Artesanal" },
  { name: "Carrera del Minero 10K", date: "01 May", time: "07:00", location: "Mina de Acosta", description: "Ruta de montaña por senderos históricos mineros. Categorías: 5K y 10K.", image: minaImg, category: "Deportivo" },
  { name: "Concierto en la Parroquia", date: "15 May", time: "18:00", location: "Parroquia de la Asunción", description: "Música barroca y contemporánea en el marco de la parroquia iluminada.", image: plazaImg, category: "Musical" },
  { name: "Muestra Gastronómica", date: "20 Jun", time: "11:00", location: "Plaza del Reloj", description: "Degustación de cocina regional: barbacoa, pulque, pastes y dulces.", image: gastroImg, category: "Gastronómico" },
  { name: "Festival de la Niebla", date: "10 Jul", time: "16:00", location: "Mirador Peña del Cuervo", description: "Arte visual, performance y poesía al aire libre cuando la niebla envuelve la sierra.", image: iglesiaImg, category: "Artístico" },
];

const months = [
  { name: "Mar", events: 1 }, { name: "Abr", events: 1 }, { name: "May", events: 2 },
  { name: "Jun", events: 1 }, { name: "Jul", events: 1 }, { name: "Ago", events: 0 },
  { name: "Sep", events: 3 }, { name: "Oct", events: 1 }, { name: "Nov", events: 2 },
  { name: "Dic", events: 1 },
];

const categoryColors: Record<string, string> = {
  Cultural: "text-electric",
  Artesanal: "text-gold",
  Deportivo: "text-destructive",
  Musical: "text-platinum",
  Gastronómico: "text-copper",
  Artístico: "text-electric-light",
};

const Eventos = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <FloatingParticles />
    <BrumaHeader />

    <ImmersiveHero image={plazaImg} title="Eventos" subtitle="La agenda cultural del pueblo que nunca deja de celebrar" label="Calendario Vivo">
      <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="font-body text-xs tracking-wider uppercase">Inicio</span>
      </Link>
    </ImmersiveHero>

    {/* Calendar bar */}
    <section className="container mx-auto px-4 sm:px-6 md:px-12 py-8">
      <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
        {months.map((m) => (
          <div key={m.name} className={`glass rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-center min-w-[50px] sm:min-w-[60px] transition-all duration-300 ${m.events > 0 ? "border-gold/20 hover:border-gold/40 cursor-pointer" : "opacity-40"}`}>
            <span className="font-body text-[9px] sm:text-[10px] tracking-wider uppercase text-muted-foreground block">{m.name}</span>
            {m.events > 0 && (
              <div className="flex justify-center gap-1 mt-1.5">
                {Array.from({ length: Math.min(m.events, 3) }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>

    <GradientSeparator variant="gold" />

    {/* Featured Event */}
    <section className="container mx-auto px-4 sm:px-6 md:px-12 py-14 md:py-16">
      <SectionHeader label="Evento Destacado" title="Festival del Paste 2026" subtitle="El evento más esperado del año" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-xl img-zoom">
          <div className="aspect-[4/3]">
            <img src={featuredEvent.image} alt={featuredEvent.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 glass rounded-full px-4 py-1.5">
            <span className="font-body text-[9px] tracking-wider uppercase text-gold font-medium">★ Destacado</span>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-gradient-gold">{featuredEvent.name}</h3>
          <div className="w-12 h-px bg-gold/40" />
          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{featuredEvent.description}</p>
          <div className="space-y-2">
            {[
              { icon: <Calendar className="w-3.5 h-3.5 text-gold" />, text: featuredEvent.date },
              { icon: <Clock className="w-3.5 h-3.5 text-gold" />, text: featuredEvent.time },
              { icon: <MapPin className="w-3.5 h-3.5 text-gold" />, text: featuredEvent.location },
              { icon: <Users className="w-3.5 h-3.5 text-gold" />, text: featuredEvent.capacity },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                {item.icon}
                <span className="font-body text-xs text-foreground/80">{item.text}</span>
              </div>
            ))}
          </div>
          <button className="btn-premium self-start mt-2 flex items-center gap-2">
            <Ticket className="w-4 h-4" /> Más información
          </button>
        </div>
      </motion.div>
    </section>

    <GradientSeparator variant="electric" />

    {/* All Events */}
    <section className="container mx-auto px-4 sm:px-6 md:px-12 py-14 md:py-16">
      <SectionHeader label="Próximos" title="Agenda 2026" subtitle="Todos los eventos confirmados del año" />
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {events.map((event) => (
          <StaggerItem key={event.name}>
            <GlowCard color="electric" className="overflow-hidden">
              <div className="img-zoom aspect-video relative">
                <img src={event.image} alt={event.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 glass rounded-full px-3 py-1">
                  <span className={`font-body text-[9px] tracking-wider uppercase font-medium ${categoryColors[event.category] || "text-gold"}`}>
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 glass rounded-xl px-2.5 py-1.5 text-center">
                  <span className="font-display text-base sm:text-lg text-gold leading-none block">{event.date.split(" ")[0]}</span>
                  <span className="font-body text-[8px] sm:text-[9px] uppercase text-muted-foreground">{event.date.split(" ")[1]}</span>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-display text-lg sm:text-xl text-foreground mb-1.5">{event.name}</h3>
                <p className="font-body text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-3">{event.description}</p>
                <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1 font-body text-[10px]">
                    <Clock className="w-3 h-3 text-gold/60" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1 font-body text-[10px] truncate">
                    <MapPin className="w-3 h-3 text-gold/60 flex-shrink-0" /> {event.location}
                  </span>
                </div>
              </div>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>

    <BrumaFooter />
    <RealitoBubble />
  </div>
);

export default Eventos;
