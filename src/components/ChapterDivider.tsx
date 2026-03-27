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
    <div ref={ref} className="py-24 md:py-36 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(43,80%,55%,0.02),transparent_50%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="container mx-auto px-8 md:px-16 text-center max-w-2xl relative"
      >
        <div className="w-12 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <blockquote className="font-display text-xl md:text-2xl text-foreground/45 italic leading-[1.7]">
          "{quote}"
        </blockquote>
        {author && (
          <cite className="block font-body text-[9px] tracking-[0.4em] uppercase text-foreground/20 mt-8 not-italic">
            — {author}
          </cite>
        )}
        <div className="w-12 h-px mx-auto mt-10 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </motion.div>
    </div>
  );
};

export default ChapterDivider;
