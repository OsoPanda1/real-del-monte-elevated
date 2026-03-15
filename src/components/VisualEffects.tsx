import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

export const TextReveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerContainer = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const GlowCard = ({ children, className = "", color = "electric" }: { children: ReactNode; className?: string; color?: "electric" | "gold" | "copper" }) => {
  const glowColors = {
    electric: "hsla(210, 100%, 55%, 0.15)",
    gold: "hsla(43, 80%, 55%, 0.15)",
    copper: "hsla(25, 55%, 45%, 0.15)",
  };

  return (
    <motion.div
      className={`relative glass-card rounded-xl overflow-hidden group ${className}`}
      whileHover={{ y: -6, boxShadow: `0 20px 50px -15px ${glowColors[color]}` }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${glowColors[color]}, transparent 70%)` }} />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const ParallaxSection = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};
