import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Quote, Music, BookOpen, Landmark } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import SectionHeader from "@/components/SectionHeader";
import GradientSeparator from "@/components/GradientSeparator";
import { StaggerContainer, StaggerItem, GlowCard, TextReveal } from "@/components/VisualEffects";

import iglesiaImg from "@/assets/rdm-iglesia.jpeg";
import calleImg from "@/assets/rdm-calle.jpeg";
import plazaImg from "@/assets/rdm-plaza.jpeg";
import minaImg from "@/assets/rdm-mina.jpeg";

const dichos = [
  { text: "El que no conoce la mina, no conoce Real del Monte.", origin: "Dicho minero popular" },
  { text: "Más oscuro que socavón sin lámpara.", origin: "Expresión regional" },
  { text: "Ni la niebla tapa lo que la mina revela.", origin: "Proverbio de los barreteros" },
  { text: "Pa' subir al Monte Real, hay que cargar buen costal.", origin: "Canción de arriero, s. XIX" },
  { text: "Como paste sin repulgue: incompleto.", origin: "Dicho de las pasteras" },
  { text: "La plata se acaba, la historia queda.", origin: "Crónica de Don Refugio, 1910" },
];

const legends = [
  { title: "El Diablo en la Mina", period: "Siglo XVIII", summary: "Un barretero ambicioso hizo un pacto con una figura envuelta en humo negro. Obtuvo la veta más rica, pero cada noche escuchaba golpes desde las profundidades. Cuando otros mineros bajaron a investigar, encontraron solo su lámpara encendida y el silencio.", image: minaImg },
  { title: "La Dama de la Niebla", period: "Siglo XIX", summary: "Cada noviembre, una mujer vestida de blanco aparece en el cruce del Panteón Inglés. Los mineros cornish decían que era el fantasma de Mary, una esposa que esperó a su marido toda la vida. Él nunca salió de la mina.", image: iglesiaImg },
  { title: "El Tesoro de la Veta Madre", period: "Colonial", summary: "Se cuenta que los españoles sellaron un pasaje secreto cargado con lingotes de plata antes de abandonar la mina en 1810. Generaciones de buscadores han excavado sin éxito. La montaña guarda sus secretos.", image: calleImg },
];

const traditions = [
  { name: "Festival del Paste", month: "Septiembre", icon: <Music className="w-5 h-5" />, description: "El evento gastronómico más grande del pueblo. 30+ variedades de pastes, música en vivo, y concursos de recetas centenarias." },
  { name: "Día de Muertos Minero", month: "Noviembre", icon: <Landmark className="w-5 h-5" />, description: "Altares en la bocamina, ofrendas con cascos y lámparas, y el recorrido nocturno por el Panteón Inglés iluminado con velas." },
  { name: "Feria de la Plata", month: "Abril", icon: <BookOpen className="w-5 h-5" />, description: "Exposición de platería artesanal, talleres de orfebrería y la bendición de las herramientas de los plateros." },
];

const DichoBlock = ({ dicho, index }: { dicho: typeof dichos[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="glass-card rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
  >
    <div className="absolute top-3 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Quote className="w-8 h-8 text-gold" />
    </div>
    <p className="font-display text-lg text-foreground/90 italic leading-relaxed mb-3">"{dicho.text}"</p>
    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/50">— {dicho.origin}</span>
  </motion.div>
);

const LegendCard = ({ legend, index }: { legend: typeof legends[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="grid md:grid-cols-5 gap-8 items-center"
    >
      <div className={`md:col-span-2 relative overflow-hidden rounded-xl img-zoom ${isEven ? "" : "md:order-2"}`}>
        <div className="aspect-[3/4]">
          <img src={legend.image} alt={legend.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 glass rounded-full px-3 py-1">
          <span className="font-body text-[9px] tracking-[0.2em] uppercase text-electric">{legend.period}</span>
        </div>
      </div>
      <div className={`md:col-span-3 ${isEven ? "" : "md:order-1"}`}>
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-electric/60 block mb-3">Leyenda {index + 1}</span>
        <h3 className="font-display text-3xl md:text-4xl tracking-tight text-gradient-gold mb-4">{legend.title}</h3>
        <div className="w-12 h-px bg-electric/40 mb-4" />
        <p className="font-body text-sm text-muted-foreground leading-relaxed">{legend.summary}</p>
      </div>
    </motion.div>
  );
};

const Cultura = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <BrumaHeader />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={iglesiaImg} alt="Cultura de Real del Monte" className="w-full h-full object-cover ken-burns opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
        </div>
        <div className="relative text-center px-6">
          <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-xs tracking-wider uppercase">Inicio</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-electric block mb-4">Identidad Viva</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-gradient-gold">
              Cultura
            </h1>
            <p className="font-display text-lg md:text-xl text-platinum/60 italic mt-6 max-w-xl mx-auto">
              Leyendas, dichos, tradiciones y la memoria colectiva del pueblo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dichos Mineros */}
      <section className="container mx-auto px-6 md:px-12 py-20">
        <SectionHeader label="Sabiduría Popular" title="Dichos Mineros" subtitle="Las voces de la mina talladas en piedra" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {dichos.map((d, i) => (
            <DichoBlock key={i} dicho={d} index={i} />
          ))}
        </div>
      </section>

      <GradientSeparator variant="electric" />

      {/* Legends */}
      <section className="container mx-auto px-6 md:px-12 py-20">
        <SectionHeader label="Relatos de la Niebla" title="Leyendas de la Mina" subtitle="Cuando la montaña habla, los mineros escuchan" accent="electric" />
        <div className="space-y-20 max-w-5xl mx-auto">
          {legends.map((legend, i) => (
            <LegendCard key={legend.title} legend={legend} index={i} />
          ))}
        </div>
      </section>

      <GradientSeparator variant="gold" />

      {/* Traditions */}
      <section className="container mx-auto px-6 md:px-12 py-20">
        <SectionHeader label="Calendario Vivo" title="Tradiciones y Festivales" subtitle="Los momentos que definen al pueblo" />
        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {traditions.map((t) => (
            <StaggerItem key={t.name}>
              <GlowCard color="gold" className="p-8 text-center">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center mx-auto mb-4 text-gold">
                  {t.icon}
                </div>
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/50 block mb-2">{t.month}</span>
                <h3 className="font-display text-2xl text-foreground mb-3">{t.name}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{t.description}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <BrumaFooter />
      <RealitoBubble />
    </div>
  );
};

export default Cultura;
