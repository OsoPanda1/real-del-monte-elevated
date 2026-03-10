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
  accent?: string;
}

const EditorialSection = ({
  id,
  chapter,
  title,
  subtitle,
  body,
  image,
  imageAlt,
  imagePosition = "left",
  accent,
}: EditorialSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const imgBlock = (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, x: imagePosition === "left" ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="img-zoom-heavy aspect-[3/4] md:aspect-auto md:h-full">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Glass overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background/60 to-transparent" />
    </motion.div>
  );

  const textBlock = (
    <motion.div
      className="flex flex-col justify-center py-12 md:py-24 px-6 md:px-16"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
        {chapter}
      </span>

      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-4 leading-tight">
        {title}
      </h2>

      {accent && (
        <div className="w-12 h-px mb-6" style={{ backgroundColor: accent }} />
      )}

      <p className="font-display text-lg md:text-xl text-muted-foreground italic mb-8">
        {subtitle}
      </p>

      {body.map((paragraph, i) => (
        <p key={i} className="font-body text-sm md:text-base text-foreground/80 leading-relaxed mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </motion.div>
  );

  return (
    <section ref={ref} id={id} className="relative min-h-screen">
      <div className="grid md:grid-cols-5 min-h-screen">
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
