import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import { ImmersiveHero } from "@/components/VisualEffects";
import GradientSeparator from "@/components/GradientSeparator";

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
  quoteAuthor?: string;
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
    quoteAuthor: "Crónicas de la Sierra, 1867",
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
    quoteAuthor: "RDM Digital",
  },
];

const ChapterSection = ({ chapter, index }: { chapter: Chapter; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative">
      <div className="grid md:grid-cols-2 min-h-[85vh]">
        <motion.div
          className={`relative overflow-hidden ${isEven ? "" : "md:order-2"}`}
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="img-zoom h-full min-h-[50vh]">
            <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-6 left-6">
            <div className="glass rounded-full px-4 py-2">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold">
                Capítulo {chapter.number} · {chapter.year}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`flex flex-col justify-center py-12 md:py-24 px-6 md:px-16 lg:px-20 ${isEven ? "" : "md:order-1"}`}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/50 mb-5">
            Capítulo {chapter.number}
          </span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 text-gradient-gold leading-[1.05]">
            {chapter.title}
          </h2>

          <div className="w-16 h-px mb-6 bg-gold/40" />

          <p className="font-display text-base md:text-lg text-platinum/60 italic mb-8 leading-relaxed">
            {chapter.subtitle}
          </p>

          {chapter.paragraphs.map((p, i) => (
            <p key={i} className="font-body text-sm md:text-[15px] text-foreground/60 leading-[1.85] mb-5 last:mb-0">
              {i === 0 && (
                <span className="text-3xl font-display text-gold/70 float-left mr-2.5 mt-0.5 leading-none">
                  {p[0]}
                </span>
              )}
              {i === 0 ? p.slice(1) : p}
            </p>
          ))}

          {chapter.quote && (
            <blockquote className="mt-10 pl-6 border-l-2 border-gold/25">
              <p className="font-display text-base md:text-lg italic text-platinum/50 leading-relaxed">
                "{chapter.quote}"
              </p>
              {chapter.quoteAuthor && (
                <cite className="font-body text-[10px] tracking-[0.2em] uppercase text-gold/40 mt-2 block not-italic">
                  — {chapter.quoteAuthor}
                </cite>
              )}
            </blockquote>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Historia = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <FloatingParticles />
    <BrumaHeader />

    <ImmersiveHero
      image={minaImg}
      title="Historia Minera"
      subtitle="Cuatro siglos de plata, sudor y memoria colectiva"
      label="La Crónica Completa"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-body text-xs tracking-wider uppercase">Volver al inicio</span>
      </Link>
    </ImmersiveHero>

    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-electric/10 to-transparent hidden md:block" />
      {chapters.map((chapter, i) => (
        <div key={chapter.number}>
          <ChapterSection chapter={chapter} index={i} />
          {i < chapters.length - 1 && <GradientSeparator variant={i % 2 === 0 ? "gold" : "electric"} />}
        </div>
      ))}
    </div>

    <BrumaFooter />
    <RealitoBubble />
  </div>
);

export default Historia;
