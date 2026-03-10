import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ChapterDividerProps {
  quote: string;
  author?: string;
}

const ChapterDivider = ({ quote, author }: ChapterDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="py-20 md:py-28 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="container mx-auto px-6 md:px-12 text-center max-w-3xl"
      >
        <div className="separator-bruma mb-12" />
        <blockquote className="font-display text-2xl md:text-3xl text-foreground/80 italic leading-relaxed">
          "{quote}"
        </blockquote>
        {author && (
          <cite className="block font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mt-6 not-italic">
            — {author}
          </cite>
        )}
        <div className="separator-bruma mt-12" />
      </motion.div>
    </div>
  );
};

export default ChapterDivider;
