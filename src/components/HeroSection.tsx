import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-realmont.jpg";
import logoImg from "@/assets/rdm-logo.png";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroImg}
          alt="Vista aérea de Real del Monte entre la niebla"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.55) saturate(0.85)" }}
        />
      </motion.div>

      {/* Gradient overlays — clean, not saturated */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsla(220,35%,4%,0.5)_100%)]" />

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center justify-center h-full px-6 pb-24 pt-20"
        style={{ opacity }}
      >
        {/* Logo */}
        <motion.img
          src={logoImg}
          alt="RDM Digital"
          className="w-20 h-20 md:w-24 md:h-24 object-contain mb-10"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ filter: "drop-shadow(0 0 24px hsla(43,80%,55%,0.25))" }}
        />

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-full px-5 py-2 mb-8 flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-breathe" />
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-foreground/60">
            Pueblo Mágico · Hidalgo
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-[7rem] text-center tracking-tight leading-[0.95]"
        >
          <span className="block text-foreground/90">Real del</span>
          <span className="block text-gradient-gold text-glow-gold">Monte</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-display text-base md:text-lg text-foreground/40 italic text-center max-w-lg mt-8 leading-relaxed"
        >
          Historia minera, gastronomía local, rutas culturales y mapa vivo a 2,660 metros de altura.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center gap-8 text-[10px] text-foreground/30 mt-8 font-body tracking-wider uppercase"
        >
          <span>2,660 msnm</span>
          <span className="w-px h-3 bg-foreground/10" />
          <span>Fundado 1739</span>
          <span className="w-px h-3 bg-foreground/10" />
          <span>Pueblo Mágico</span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/mapa" className="btn-hero-primary group inline-flex items-center gap-2.5">
            <Compass className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
            Explorar Mapa Vivo
          </Link>
          <Link to="/rutas" className="btn-hero-glass inline-flex items-center gap-2">
            Ver Rutas Turísticas
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-body text-[8px] tracking-[0.4em] uppercase text-foreground/25">Scroll</span>
        <ChevronDown className="w-4 h-4 text-gold/30" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
