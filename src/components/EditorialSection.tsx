import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface EditorialSectionProps {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  body: string[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  accentColor?: "gold" | "electric" | "copper";
}

const accentMap = {
  gold: { text: "text-gradient-gold", line: "bg-gold/50" },
  electric: { text: "text-gradient-electric", line: "bg-electric/50" },
  copper: { text: "text-gradient-gold", line: "bg-copper/50" },
};

const EditorialSection = ({
  id, chapter, title, subtitle, body, image, imageAlt,
  imagePosition = "left", accentColor = "gold",
}: EditorialSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const accent = accentMap[accentColor];

  const imgBlock = (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, x: imagePosition === "left" ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="img-zoom aspect-[3/4] md:aspect-auto md:h-full">
        <img src={image} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
      <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
        <span className="glass rounded-full px-3 py-1.5 font-body text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-gold/80">
          {chapter.split("·")[0]?.trim()}
        </span>
      </div>
    </motion.div>
  );

  const textBlock = (
    <motion.div
      className="flex flex-col justify-center py-10 sm:py-16 md:py-28 px-6 sm:px-8 md:px-20 lg:px-24"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="font-body text-[8px] sm:text-[9px] tracking-[0.5em] uppercase text-foreground/30 mb-4 sm:mb-6">
        {chapter}
      </span>

      <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 sm:mb-5 leading-[1.05] ${accent.text}`}>
        {title}
      </h2>

      <div className={`w-12 h-px mb-6 sm:mb-8 ${accent.line}`} />

      <p className="font-display text-sm sm:text-base md:text-lg text-foreground/40 italic mb-8 sm:mb-10 leading-relaxed">
        {subtitle}
      </p>

      {body.map((paragraph, i) => (
        <p key={i} className="font-body text-xs sm:text-sm md:text-[15px] text-foreground/55 leading-[1.85] mb-4 sm:mb-5 last:mb-0">
          {i === 0 && (
            <span className="text-2xl sm:text-3xl font-display text-gold/70 float-left mr-2 sm:mr-2.5 mt-0.5 leading-none">
              {paragraph[0]}
            </span>
          )}
          {i === 0 ? paragraph.slice(1) : paragraph}
        </p>
      ))}
    </motion.div>
  );

  return (
    <section ref={ref} id={id} className="relative">
      <div className="grid md:grid-cols-5 min-h-[70vh] md:min-h-[80vh]">
        {imagePosition === "left" ? (
          <>
            <div className="md:col-span-3">{imgBlock}</div>
            <div className="md:col-span-2">{textBlock}</div>
          </>
        ) : (
          <>
            <div className="md:col-span-2">{textBlock}</div>
            <div className="md:col-span-3">{imgBlock}</div>
          </>
        )}
      </div>
    </section>
  );
};

export default EditorialSection;
