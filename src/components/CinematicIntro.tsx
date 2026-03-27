import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoImg from "@/assets/rdm-logo.png";
import heroImg from "@/assets/hero-realmont.jpg";

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 5200),
      setTimeout(() => onComplete(), 6400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Background image with Ken Burns */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "easeOut" }}
          >
            <img
              src={heroImg}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.25) saturate(0.7)" }}
            />
          </motion.div>

          {/* Dark vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsla(220,35%,3%,0.85)_70%,hsla(220,35%,3%,0.98)_100%)]" />

          {/* Subtle gold ambient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(43,80%,55%,0.04),transparent_50%)]" />

          {/* Noise */}
          <div className="absolute inset-0 noise-overlay" />

          <div className="relative z-10 text-center px-8">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.div
                  key="p0"
                  initial={{ opacity: 0, letterSpacing: "0.8em" }}
                  animate={{ opacity: 0.4, letterSpacing: "0.6em" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-body text-[10px] uppercase text-foreground/40"
                >
                  RDM Digital presenta
                </motion.div>
              )}

              {phase === 1 && (
                <motion.div key="p1" className="space-y-8">
                  <motion.img
                    src={logoImg}
                    alt="RDM Digital"
                    className="w-20 h-20 mx-auto object-contain"
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    style={{ filter: "drop-shadow(0 0 40px hsla(43, 80%, 55%, 0.4))" }}
                  />
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none"
                  >
                    <span className="text-gradient-gold">Real del Monte</span>
                  </motion.h1>
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="w-24 h-px mx-auto"
                    style={{ background: "var(--gradient-gold)" }}
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="font-body text-xs tracking-[0.3em] uppercase text-foreground/40"
                  >
                    Pueblo Mágico · 2,660 msnm
                  </motion.p>
                </motion.div>
              )}

              {phase === 2 && (
                <motion.div
                  key="p2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-display text-lg md:text-xl text-foreground/30 italic"
                >
                  Donde la niebla revela lo extraordinario
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ background: "var(--gradient-gold)", transformOrigin: "left" }}
            initial={{ scaleX: 0, opacity: 0.6 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            transition={{ duration: 6, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
