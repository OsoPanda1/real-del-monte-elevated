import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import heroImg from "@/assets/rdm-plaza.jpeg";
import logoImg from "@/assets/rdm-logo.png";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImg}
          alt="Plaza principal de Real del Monte con iglesia amarilla"
          className="w-full h-full object-cover ken-burns"
        />
      </motion.div>

      {/* Overlay layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-night-900/70 via-night-800/40 to-night-900/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsla(43,80%,55%,0.08),transparent_50%)]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      {/* Fog layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-electric/5 to-transparent animate-fog-drift" />
      </div>

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center justify-center min-h-screen px-6 pb-20 pt-24"
        style={{ opacity }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-8"
        >
          <img src={logoImg} alt="RDM Digital" className="w-28 h-28 md:w-36 md:h-36 object-contain animate-float" 
            style={{ filter: "drop-shadow(0 0 30px hsla(43, 80%, 55%, 0.3))" }} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-full px-5 py-2 mb-6 flex items-center gap-2"
        >
          <MapPin className="w-3.5 h-3.5 text-gold" />
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-platinum">
            Pueblo Mágico · Hidalgo · 2,660 msnm
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-9xl text-center tracking-tight leading-none"
        >
          <span className="text-gradient-gold">Real del Monte</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="font-display text-lg md:text-2xl text-platinum/70 italic text-center max-w-2xl mt-6"
        >
          Innovación Turística Inteligente — Donde la niebla revela lo extraordinario
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => document.getElementById("mapa")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-hero-primary"
          >
            Explorar Mapa Vivo
          </button>
          <button
            onClick={() => document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-hero-glass"
          >
            Descubrir la Historia
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-16 glass rounded-2xl px-8 py-4 flex gap-8 md:gap-12"
        >
          {[
            { label: "Fundación", value: "1739" },
            { label: "Altitud", value: "2,660m" },
            { label: "Patrimonio", value: "UNESCO" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-xl md:text-2xl text-gradient-gold block">{stat.value}</span>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        <ChevronDown className="w-4 h-4 text-gold/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
