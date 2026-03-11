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
  { name: "Artesanías del Monte", category: "Artesanías", description: "Piezas únicas talladas en madera y obsidiana por artesanos locales de tercera generación.", image: iglesiaImg, rating: 4.4 },
  { name: "Recorridos Mineros RDM", category: "Recorridos", description: "Tours guiados a las minas históricas con guías certificados y equipo profesional.", image: minaImg, isPremium: true, rating: 4.7, phone: "771-567-8901" },
  { name: "Miscelánea Doña María", category: "Tienda", description: "Todo lo necesario para tu estadía: desde snacks hasta recuerdos artesanales.", image: calleImg, rating: 4.1 },
  { name: "Posada del Minero", category: "Hospedaje", description: "Habitaciones acogedoras con chimenea y desayuno incluido. Ambiente rústico-elegante.", image: heroImg, rating: 4.6, phone: "771-678-9012" },
  { name: "Cuatrimotos Aventura RDM", category: "Recorridos", description: "Explora los caminos de terracería de la sierra en cuatrimoto. Adrenalina pura.", image: heroImg, rating: 4.5, phone: "771-789-0123" },
  { name: "Café de la Mina", category: "Pastería", description: "Café de altura cultivado en la región con repostería artesanal y vista al bosque.", image: gastroImg, rating: 4.4 },
];

const events = [
  { name: "Festival del Paste 2026", date: "15 Sep", time: "10:00 - 20:00", location: "Plaza Principal", description: "El festival gastronómico más importante del pueblo con más de 30 variedades de pastes." },
  { name: "Noche de Leyendas", date: "22 Mar", time: "19:00 - 21:30", location: "Panteón Inglés", description: "Recorrido nocturno con actores que representan las leyendas más escalofriantes." },
  { name: "Feria de la Plata", date: "08 Abr", time: "09:00 - 18:00", location: "Centro Cultural", description: "Exposición y venta de las mejores piezas de platería artesanal de la región." },
  { name: "Carrera del Minero", date: "01 May", time: "07:00 - 12:00", location: "Mina de Acosta", description: "Carrera de montaña de 10K que atraviesa los senderos históricos mineros." },
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

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={calleImg} alt="Calles de Real del Monte" className="w-full h-full object-cover ken-burns opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="relative text-center px-6">
          <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-xs tracking-wider uppercase">Volver al inicio</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60 block mb-4">Catálogo Editorial</span>
            <h1 className="font-display text-5xl md:text-7xl tracking-tight text-gradient-gold">
              Directorio de Comercios
            </h1>
            <p className="font-display text-lg text-platinum/60 italic mt-6 max-w-xl mx-auto">
              Los mejores establecimientos del pueblo mágico
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 py-12">
        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="glass rounded-full flex items-center gap-3 px-5 py-3">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar comercios..."
              className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Filter className="w-4 h-4 text-gold/60" />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-body text-[11px] tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "btn-premium !px-5 !py-2 !text-[11px]"
                  : "glass text-muted-foreground hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Business listings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl text-foreground">{filtered.length} Comercios</h2>
              <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                {activeCategory === "Todos" ? "Todos los giros" : activeCategory}
              </span>
            </div>
            {filtered.map((biz, i) => (
              <BusinessCard key={biz.name} {...biz} index={i} />
            ))}
          </div>

          {/* Sidebar: Events */}
          <div>
            <h3 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
              <span className="text-gradient-gold">Próximos Eventos</span>
            </h3>
            <div className="space-y-4">
              {events.map((event, i) => (
                <EventCard key={event.name} {...event} index={i} />
              ))}
            </div>

            {/* CTA: Register business */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 glass-card rounded-2xl p-6 text-center"
            >
              <h4 className="font-display text-lg text-foreground mb-2">¿Tienes un negocio?</h4>
              <p className="font-body text-xs text-muted-foreground mb-4">
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
