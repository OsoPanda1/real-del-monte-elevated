import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Clock, Zap } from "lucide-react";

import plazaImg from "@/assets/rdm-plaza.jpeg";
import calleImg from "@/assets/rdm-calle.jpeg";
import minaImg from "@/assets/rdm-mina.jpeg";
import iglesiaImg from "@/assets/rdm-iglesia.jpeg";
import gastroImg from "@/assets/gastronomia-pastes.jpg";
import heroImg from "@/assets/hero-realmont.jpg";

interface Place {
  name: string;
  category: string;
  time: string;
  energy: "Alta" | "Media" | "Baja";
  image: string;
  description: string;
}

const places: Place[] = [
  { name: "Mina de Acosta", category: "Historia", time: "2h", energy: "Alta", image: minaImg, description: "Desciende 400m al corazón de la montaña donde los ecos cornish aún resuenan." },
  { name: "Plaza Principal", category: "Cultura", time: "1h", energy: "Baja", image: plazaImg, description: "Centro vibrante del pueblo con su icónica iglesia y jardines coloniales." },
  { name: "Calles Coloniales", category: "Arquitectura", time: "1.5h", energy: "Media", image: calleImg, description: "Fachadas coloridas que narran cuatro siglos de historia mestiza." },
  { name: "Parroquia de la Asunción", category: "Arquitectura", time: "45min", energy: "Baja", image: iglesiaImg, description: "Cantera labrada que desafía la niebla desde el siglo XVIII." },
  { name: "Pasterías", category: "Gastronomía", time: "30min", energy: "Baja", image: gastroImg, description: "El paste original, herencia de los mineros ingleses, horneado con receta de 1850." },
  { name: "Mirador Peña del Cuervo", category: "Naturaleza", time: "2.5h", energy: "Alta", image: heroImg, description: "Donde el bosque se abre y la vista abraza todo el valle." },
];

const categories = ["Todos", "Historia", "Cultura", "Arquitectura", "Gastronomía", "Naturaleza"];
const energyColor = { Alta: "text-destructive", Media: "text-gold", Baja: "text-electric" };

const TourismSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos" ? places : places.filter(p => p.category === activeCategory);

  return (
    <section ref={ref} id="turismo" className="relative py-28 md:py-40">
      <div className="container mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-foreground/25">Descubre</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight text-gradient-gold">
            Lugares Imperdibles
          </h2>
          <p className="font-display text-base text-foreground/30 italic mt-4 max-w-md mx-auto">
            Los atractivos más emblemáticos del pueblo
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-14 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-body text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gold/15 text-gold border border-gold/30"
                  : "text-foreground/30 hover:text-foreground/60 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((place, i) => (
            <motion.div
              key={place.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="glass-card rounded-xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-500"
            >
              <div className="img-zoom aspect-[4/3] relative">
                <img src={place.image} alt={place.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="glass rounded-full px-3 py-1 font-body text-[8px] tracking-[0.2em] uppercase text-gold/80">
                    {place.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg text-foreground/90 mb-2 group-hover:text-gold transition-colors duration-300">
                  {place.name}
                </h3>
                <p className="font-body text-xs text-foreground/40 leading-relaxed mb-4">
                  {place.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-foreground/20" />
                    <span className="font-body text-[10px] text-foreground/30">{place.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className={`w-3 h-3 ${energyColor[place.energy]}`} />
                    <span className="font-body text-[10px] text-foreground/30">{place.energy}</span>
                  </div>
                  <button className="ml-auto flex items-center gap-1 font-body text-[9px] tracking-wider uppercase text-gold/40 hover:text-gold transition-colors">
                    <MapPin className="w-3 h-3" /> Mapa
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourismSection;
