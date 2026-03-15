import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GradientSeparatorProps {
  variant?: "default" | "gold" | "electric" | "full";
  className?: string;
}

const GradientSeparator = ({ variant = "default", className = "" }: GradientSeparatorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const gradients = {
    default: "linear-gradient(90deg, transparent 0%, hsl(var(--electric)) 20%, hsl(var(--gold)) 80%, transparent 100%)",
    gold: "linear-gradient(90deg, transparent 0%, hsla(43, 80%, 55%, 0.6) 50%, transparent 100%)",
    electric: "linear-gradient(90deg, transparent 0%, hsla(210, 100%, 55%, 0.6) 50%, transparent 100%)",
    full: "linear-gradient(90deg, transparent 0%, hsl(var(--electric)) 15%, hsl(var(--gold)) 50%, hsl(var(--copper)) 85%, transparent 100%)",
  };

  return (
    <div ref={ref} className={`py-1 ${className}`}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-px mx-auto max-w-2xl"
        style={{ background: gradients[variant] }}
      />
    </div>
  );
};

export default GradientSeparator;
