import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";

import minaImg from "@/assets/rdm-mina.jpeg";
import iglesiaImg from "@/assets/rdm-iglesia.jpeg";
import plazaImg from "@/assets/rdm-plaza.jpeg";
import calleImg from "@/assets/rdm-calle.jpeg";

interface Chapter {
  number: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  paragraphs: string[];
  quote?: string;
}

const chapters: Chapter[] = [
  {
    number: "I",
    title: "El Descubrimiento de la Veta",
    subtitle: "Los orígenes de un pueblo forjado en plata",
    year: "1739",
    image: minaImg,
    paragraphs: [
      "En las profundidades de la Sierra de Pachuca, donde la niebla se confunde con el aliento de la tierra, los primeros mineros descubrieron vetas de plata que cambiarían el destino de una montaña. Real del Monte nació como un campamento que se convirtió en leyenda.",
      "La Mina de Acosta, con sus 400 metros de profundidad, es hoy un museo viviente. Descender por sus galerías es escuchar los ecos de picos sobre roca, sentir el frío mineral y comprender por qué los hombres arriesgaban todo por el brillo de un metal.",
    ],
    quote: "El mineral que sacamos de estas montañas construyó imperios, pero lo que dejaron los mineros fue algo más valioso: una identidad.",
  },
  {
    number: "II",
    title: "La Llegada Cornish",
    subtitle: "Cuando Cornwall se encontró con México",
    year: "1824",
    image: iglesiaImg,
    paragraphs: [
      "En 1824, un grupo de mineros de Cornwall, Inglaterra, cruzó el Atlántico con la promesa de plata y nuevas oportunidades. Trajeron consigo tecnología de vanguardia, tradiciones centenarias y un platillo que se convertiría en símbolo: el Cornish pasty.",
      "La primera huelga laboral de América Latina estalló aquí en 1766, un acto de dignidad que resonó por los túneles. Los mineros cornish dejaron su huella en la arquitectura, la gastronomía y hasta en el panteón, donde sus tumbas miran hacia Inglaterra.",
    ],
    quote: "Un paste no es solo comida. Es la nostalgia de un minero inglés convertida en receta mexicana.",
  },
  {
    number: "III",
    title: "El Pueblo Mágico",
    subtitle: "Patrimonio vivo entre la niebla",
    year: "2004",
    image: plazaImg,
    paragraphs: [
      "En 2004, Real del Monte recibió el nombramiento de Pueblo Mágico, un reconocimiento que validó lo que sus habitantes siempre supieron: que este lugar tiene algo que no se puede explicar, solo sentir.",
      "Las calles empedradas, las fachadas de colores, el aroma a paste recién horneado mezclado con el frío de montaña… cada elemento contribuye a una experiencia sensorial que ha atraído a viajeros de todo el mundo.",
    ],
  },
  {
    number: "IV",
    title: "La Transformación Digital",
    subtitle: "RDM Digital: el futuro del turismo inteligente",
    year: "2026",
    image: calleImg,
    paragraphs: [
      "RDM Digital representa la evolución natural de un pueblo que siempre ha estado a la vanguardia. La inteligencia artificial, los mapas vivos y la gamificación se unen para crear una experiencia turística sin precedentes.",
      "Realito AI, el copiloto inteligente del pueblo, conecta la historia con el presente: guía a los visitantes por rutas personalizadas, recomienda comercios locales y mantiene viva la memoria colectiva de Real del Monte.",
    ],
    quote: "La niebla no oculta. Revela lo esencial eliminando lo superfluo.",
  },
];

const ChapterSection = ({ chapter, index }: { chapter: Chapter; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative min-h-screen">
      <div className={`grid md:grid-cols-2 min-h-screen`}>
        <motion.div
          className={`relative overflow-hidden ${isEven ? "" : "md:order-2"}`}
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <div className="img-zoom h-full min-h-[50vh]">
            <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-6 left-6 glass rounded-full px-4 py-2">
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold">
              Capítulo {chapter.number} · {chapter.year}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={`flex flex-col justify-center py-16 md:py-24 px-8 md:px-16 ${isEven ? "" : "md:order-1"}`}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-4">
            Capítulo {chapter.number}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 text-gradient-gold">
            {chapter.title}
          </h2>
          <div className="w-16 h-px mb-6 bg-gold" />
          <p className="font-display text-lg text-platinum/70 italic mb-8">{chapter.subtitle}</p>

          {chapter.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-sm md:text-base text-foreground/70 leading-relaxed mb-4">
              <span className={i === 0 ? "text-3xl font-display text-gold float-left mr-2 mt-1 leading-none" : ""}>
                {i === 0 ? p[0] : ""}
              </span>
              {i === 0 ? p.slice(1) : p}
            </p>
          ))}

          {chapter.quote && (
            <blockquote className="mt-8 pl-6 border-l-2 border-gold/30">
              <p className="font-display text-lg italic text-platinum/60">"{chapter.quote}"</p>
            </blockquote>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Historia = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <BrumaHeader />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={minaImg} alt="Mina de Acosta" className="w-full h-full object-cover ken-burns opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="relative text-center px-6">
          <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-xs tracking-wider uppercase">Volver al inicio</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="font-body text-[10px] tracking-[0.5em] uppercase text-gold/60 block mb-4">La Crónica Completa</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-gradient-gold">
              Historia Minera
            </h1>
            <p className="font-display text-lg md:text-xl text-platinum/60 italic mt-6 max-w-xl mx-auto">
              Cuatro siglos de plata, sudor y memoria colectiva
            </p>
          </motion.div>
          <motion.div
            className="mt-12"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-gold/40 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Timeline indicator */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-electric/20 to-transparent hidden md:block" />
        {chapters.map((chapter, i) => (
          <ChapterSection key={chapter.number} chapter={chapter} index={i} />
        ))}
      </div>

      <BrumaFooter />
      <RealitoBubble />
    </div>
  );
};

export default Historia;
