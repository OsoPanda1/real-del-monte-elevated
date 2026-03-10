import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-realmont.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroImage}
          alt="Calles empedradas de Real del Monte envueltas en niebla"
          className="w-full h-full object-cover ken-burns"
        />
      </motion.div>

      {/* Fog overlay layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/30 via-transparent to-carbon/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-carbon/20 via-transparent to-carbon/20" />

      {/* Animated fog */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-niebla/10 to-transparent animate-fog-drift" />
      </div>

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-6"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-body text-xs tracking-[0.5em] uppercase text-niebla/60 mb-6"
        >
          Pueblo Mágico · Hidalgo · 2,660 msnm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-9xl text-niebla text-center tracking-tight leading-none"
        >
          Real del Monte
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-24 h-px bg-oxido mt-8 mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="font-display text-lg md:text-xl text-niebla/70 italic text-center max-w-xl"
        >
          Donde cada calle empedrada guarda un secreto entre la bruma
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-12 flex gap-6"
        >
          <button
            onClick={() => document.getElementById("mapa")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-oxido"
          >
            Explorar Mapa
          </button>
          <button
            onClick={() => document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-cristal border-niebla/30 text-niebla/80 hover:border-oxido hover:text-oxido"
          >
            Descubrir
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-niebla/40" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
