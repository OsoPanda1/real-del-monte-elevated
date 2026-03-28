import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import BusinessCard from "@/components/BusinessCard";
import EventCard from "@/components/EventCard";
import { ImmersiveHero } from "@/components/VisualEffects";
import GradientSeparator from "@/components/GradientSeparator";

import calleImg from "@/assets/rdm-calle.jpeg";
import plazaImg from "@/assets/rdm-plaza.jpeg";
import minaImg from "@/assets/rdm-mina.jpeg";
import iglesiaImg from "@/assets/rdm-iglesia.jpeg";
import gastroImg from "@/assets/gastronomia-pastes.jpg";
import heroImg from "@/assets/hero-realmont.jpg";

const businesses = [
  { name: "Pastes El Portal", category: "Pastería", description: "Los pastes más antiguos de Real del Monte. Receta familiar de 4 generaciones con el sabor auténtico cornish.", image: gastroImg, isPremium: true, rating: 4.8, phone: "771-123-4567" },
  { name: "Hotel Mina Real", category: "Hospedaje", description: "Boutique hotel en una antigua casona minera restaurada con vista panorámica al valle.", image: plazaImg, isPremium: true, rating: 4.9, phone: "771-234-5678" },
  { name: "Platería La Veta", category: "Platería", description: "Joyería artesanal en plata con diseños inspirados en la herencia minera del pueblo.", image: calleImg, rating: 4.5, phone: "771-345-6789" },
  { name: "Bar El Socavón", category: "Bar", description: "Cócteles artesanales con ingredientes locales en un ambiente de mina reconvertida.", image: minaImg, rating: 4.3, phone: "771-456-7890" },
  { name: "Artesanías del Monte", category: "Artesanías", description: "Piezas únicas talladas en madera y obsidiana por artesanos locales.", image: iglesiaImg, rating: 4.4 },
  { name: "Recorridos Mineros RDM", category: "Recorridos", description: "Tours guiados a las minas históricas con guías certificados.", image: minaImg, isPremium: true, rating: 4.7, phone: "771-567-8901" },
  { name: "Miscelánea Doña María", category: "Tienda", description: "Todo lo necesario para tu estadía: snacks y recuerdos artesanales.", image: calleImg, rating: 4.1 },
  { name: "Posada del Minero", category: "Hospedaje", description: "Habitaciones con chimenea y desayuno incluido. Ambiente rústico-elegante.", image: heroImg, rating: 4.6, phone: "771-678-9012" },
  { name: "Cuatrimotos Aventura", category: "Recorridos", description: "Explora los caminos de terracería de la sierra. Adrenalina pura.", image: heroImg, rating: 4.5, phone: "771-789-0123" },
  { name: "Café de la Mina", category: "Pastería", description: "Café de altura con repostería artesanal y vista al bosque.", image: gastroImg, rating: 4.4 },
];

const events = [
  { name: "Festival del Paste 2026", date: "15 Sep", time: "10:00 - 20:00", location: "Plaza Principal", description: "El festival gastronómico más importante con 30+ variedades de pastes." },
  { name: "Noche de Leyendas", date: "22 Mar", time: "19:00 - 21:30", location: "Panteón Inglés", description: "Recorrido nocturno con las leyendas más escalofriantes." },
  { name: "Feria de la Plata", date: "08 Abr", time: "09:00 - 18:00", location: "Centro Cultural", description: "Exposición de platería artesanal de la región." },
  { name: "Carrera del Minero", date: "01 May", time: "07:00 - 12:00", location: "Mina de Acosta", description: "Carrera de montaña de 10K por senderos históricos." },
];

const categories = ["Todos", "Pastería", "Hospedaje", "Platería", "Bar", "Artesanías", "Recorridos", "Tienda"];

const Comercios = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = businesses.filter(b => {
    const matchCategory = activeCategory === "Todos" || b.category === activeCategory;
    const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <BrumaHeader />

      <ImmersiveHero image={calleImg} title="Directorio" subtitle="Los mejores establecimientos del pueblo mágico" label="Catálogo Editorial">
        <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-xs tracking-wider uppercase">Inicio</span>
        </Link>
      </ImmersiveHero>

      <GradientSeparator variant="gold" />

      <section className="container mx-auto px-4 sm:px-6 md:px-12 py-12">
        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="glass rounded-full flex items-center gap-3 px-5 py-3">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar comercios..."
              className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Filter className="w-4 h-4 text-gold/40 flex-shrink-0" />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-body text-[10px] sm:text-[11px] tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "btn-premium !px-4 !py-1.5 !text-[10px]"
                  : "glass text-muted-foreground hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Business listings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl sm:text-2xl text-foreground">{filtered.length} Comercios</h2>
              <span className="font-body text-[10px] text-muted-foreground tracking-wider uppercase">
                {activeCategory === "Todos" ? "Todos" : activeCategory}
              </span>
            </div>
            {filtered.map((biz, i) => (
              <BusinessCard key={biz.name} {...biz} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <div>
            <h3 className="font-display text-lg sm:text-xl text-foreground mb-6">
              <span className="text-gradient-gold">Próximos Eventos</span>
            </h3>
            <div className="space-y-4">
              {events.map((event, i) => (
                <EventCard key={event.name} {...event} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 glass-card rounded-2xl p-6 text-center"
            >
              <h4 className="font-display text-lg text-foreground mb-2">¿Tienes un negocio?</h4>
              <p className="font-body text-[11px] text-muted-foreground mb-4 leading-relaxed">
                Registra tu comercio en el ecosistema RDM Digital y llega a miles de visitantes.
              </p>
              <Link to="/registro-comercio" className="btn-premium inline-block !text-xs">
                Registrar mi negocio
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <BrumaFooter />
      <RealitoBubble />
    </div>
  );
};

export default Comercios;
