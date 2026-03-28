import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Zap, Route, Sun, Moon, Mountain } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import { ImmersiveHero } from "@/components/VisualEffects";
import GradientSeparator from "@/components/GradientSeparator";

import minaImg from "@/assets/rdm-mina.jpeg";
import plazaImg from "@/assets/rdm-plaza.jpeg";
import calleImg from "@/assets/rdm-calle.jpeg";
import iglesiaImg from "@/assets/rdm-iglesia.jpeg";
import gastroImg from "@/assets/gastronomia-pastes.jpg";
import heroImg from "@/assets/hero-realmont.jpg";

interface TimelineStop {
  time: string;
  place: string;
  description: string;
  duration: string;
  energy: "Alta" | "Media" | "Baja";
  image: string;
}

interface RutaData {
  id: string;
  name: string;
  subtitle: string;
  duration: string;
  difficulty: string;
  icon: React.ReactNode;
  stops: TimelineStop[];
}

const rutas: RutaData[] = [
  {
    id: "historica",
    name: "Ruta Histórica",
    subtitle: "Tras las huellas de los mineros cornish",
    duration: "5 horas",
    difficulty: "Moderada",
    icon: <Route className="w-4 h-4" />,
    stops: [
      { time: "09:00", place: "Plaza Principal", description: "Punto de encuentro frente a la parroquia. Briefing histórico.", duration: "30 min", energy: "Baja", image: plazaImg },
      { time: "09:30", place: "Calles Coloniales", description: "Recorrido por las fachadas más emblemáticas del siglo XVIII.", duration: "45 min", energy: "Media", image: calleImg },
      { time: "10:15", place: "Mina de Acosta", description: "Descenso de 400m al corazón de la montaña. La joya de la ruta.", duration: "2 horas", energy: "Alta", image: minaImg },
      { time: "12:15", place: "Pasterías", description: "Degustación de pastes tradicionales. Receta original de 1850.", duration: "45 min", energy: "Baja", image: gastroImg },
      { time: "13:00", place: "Panteón Inglés", description: "Las tumbas que miran hacia Cornwall. Cierre emotivo.", duration: "1 hora", energy: "Media", image: iglesiaImg },
    ],
  },
  {
    id: "gastronomica",
    name: "Ruta Gastronómica",
    subtitle: "Sabores que cruzan océanos",
    duration: "3 horas",
    difficulty: "Fácil",
    icon: <Sun className="w-4 h-4" />,
    stops: [
      { time: "11:00", place: "Pastes El Portal", description: "Los pastes más antiguos del pueblo. Receta familiar de 4 generaciones.", duration: "45 min", energy: "Baja", image: gastroImg },
      { time: "11:45", place: "Mercado de Artesanías", description: "Prueba de licores artesanales y dulces regionales.", duration: "30 min", energy: "Baja", image: calleImg },
      { time: "12:15", place: "Café de la Mina", description: "Café de altura con vista panorámica al valle.", duration: "45 min", energy: "Baja", image: plazaImg },
      { time: "13:00", place: "Restaurante Don Horacio", description: "Comida completa: barbacoa, consomé y pulque curado.", duration: "1 hora", energy: "Baja", image: heroImg },
    ],
  },
  {
    id: "nocturna",
    name: "Ruta Nocturna",
    subtitle: "Cuando la niebla cuenta historias",
    duration: "2.5 horas",
    difficulty: "Fácil",
    icon: <Moon className="w-4 h-4" />,
    stops: [
      { time: "19:00", place: "Plaza Principal", description: "Reunión bajo las farolas. El guía enciende su lámpara.", duration: "15 min", energy: "Baja", image: plazaImg },
      { time: "19:15", place: "Callejón del Diablo", description: "La leyenda del minero que hizo un pacto.", duration: "30 min", energy: "Media", image: calleImg },
      { time: "19:45", place: "Mina Dificultad", description: "Exterior nocturno. Historias de apariciones subterráneas.", duration: "30 min", energy: "Media", image: minaImg },
      { time: "20:15", place: "Panteón Inglés", description: "El clímax: recorrido entre tumbas iluminadas con velas.", duration: "45 min", energy: "Media", image: iglesiaImg },
      { time: "21:00", place: "Mirador", description: "Chocolate caliente y despedida con vista al pueblo.", duration: "30 min", energy: "Baja", image: heroImg },
    ],
  },
  {
    id: "aventura",
    name: "Ruta Aventura",
    subtitle: "Adrenalina en la sierra",
    duration: "6 horas",
    difficulty: "Difícil",
    icon: <Mountain className="w-4 h-4" />,
    stops: [
      { time: "07:00", place: "Peña del Cuervo", description: "Senderismo al mirador más alto. Vistas de 360°.", duration: "2.5 horas", energy: "Alta", image: heroImg },
      { time: "09:30", place: "Cascada Estanzuela", description: "Descenso por bosque de oyamel hasta la cascada.", duration: "1.5 horas", energy: "Alta", image: minaImg },
      { time: "11:00", place: "Cuatrimotos", description: "Recorrido en cuatrimoto por caminos de terracería.", duration: "1 hora", energy: "Alta", image: calleImg },
      { time: "12:00", place: "Comida", description: "Barbacoa y consomé para reponer energías.", duration: "1 hora", energy: "Baja", image: gastroImg },
    ],
  },
];

const energyColors = { Alta: "text-destructive", Media: "text-gold", Baja: "text-electric" };

const Rutas = () => {
  const [activeRuta, setActiveRuta] = useState(rutas[0].id);
  const currentRuta = rutas.find(r => r.id === activeRuta)!;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <BrumaHeader />

      <ImmersiveHero image={heroImg} title="Rutas Turísticas" subtitle="Itinerarios diseñados para cada tipo de explorador" label="Experiencias Curadas">
        <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-xs tracking-wider uppercase">Inicio</span>
        </Link>
      </ImmersiveHero>

      <GradientSeparator variant="gold" />

      {/* Ruta selector tabs */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 py-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {rutas.map((ruta) => (
            <button
              key={ruta.id}
              onClick={() => setActiveRuta(ruta.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 ${
                activeRuta === ruta.id
                  ? "btn-premium !px-5 !py-2.5"
                  : "glass text-muted-foreground hover:text-gold hover:border-gold/30"
              }`}
            >
              {ruta.icon}
              <span className="hidden sm:inline">{ruta.name}</span>
              <span className="sm:hidden">{ruta.name.replace("Ruta ", "")}</span>
            </button>
          ))}
        </div>

        {/* Ruta header */}
        <motion.div
          key={currentRuta.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-gradient-gold mb-3">
            {currentRuta.name}
          </h2>
          <p className="font-display text-base md:text-lg text-platinum/50 italic mb-6">{currentRuta.subtitle}</p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span className="font-body text-[11px] text-foreground">{currentRuta.duration}</span>
            </div>
            <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
              <Zap className="w-3.5 h-3.5 text-electric" />
              <span className="font-body text-[11px] text-foreground">{currentRuta.difficulty}</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-electric/20 to-transparent" />

          {currentRuta.stops.map((stop, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={`${currentRuta.id}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative flex items-start mb-10 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Time node */}
                <div className="absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-gold border-2 border-background pulse-gold" />
                </div>

                {/* Content card */}
                <div className={`ml-14 sm:ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8" : "md:pl-8"} ${isLeft ? "" : "md:ml-auto"}`}>
                  <div className="glass-card rounded-xl overflow-hidden">
                    <div className="img-zoom aspect-video relative">
                      <img src={stop.image} alt={stop.place} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute top-3 left-3 glass rounded-full px-3 py-1">
                        <span className="font-body text-[10px] tracking-wider text-gold font-bold">{stop.time}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="font-display text-lg sm:text-xl text-foreground mb-1.5">{stop.place}</h3>
                      <p className="font-body text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-3">{stop.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-gold/50" />
                          <span className="font-body text-[10px] text-muted-foreground">{stop.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Zap className={`w-3 h-3 ${energyColors[stop.energy]}`} />
                          <span className="font-body text-[10px] text-muted-foreground">{stop.energy}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="btn-premium">Sincronizar con Realito AI</button>
        </motion.div>
      </section>

      <BrumaFooter />
      <RealitoBubble />
    </div>
  );
};

export default Rutas;
