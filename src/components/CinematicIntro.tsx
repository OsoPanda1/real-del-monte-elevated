import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2800),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => onComplete(), 6200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Fog layers */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-piedra/10 to-transparent animate-fog-drift" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-piedra/5 to-transparent animate-fog-drift-reverse" />
          </div>

          <div className="relative z-10 text-center px-8">
            <AnimatePresence mode="wait">
              {phase === 0 && (
                <motion.div
                  key="phase0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-body text-xs tracking-[0.4em] uppercase text-piedra"
                >
                  Taller Bruma presenta
                </motion.div>
              )}

              {phase === 1 && (
                <motion.div key="phase1" className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl text-niebla tracking-tight"
                  >
                    Real del Monte
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="w-16 h-px bg-oxido mx-auto"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="font-display text-lg md:text-xl text-piedra italic"
                  >
                    Donde la niebla es el personaje principal
                  </motion.p>
                </motion.div>
              )}

              {phase === 2 && (
                <motion.div
                  key="phase2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-body text-xs tracking-[0.3em] uppercase text-piedra"
                >
                  Un archivo digital vivo de la melancolía y la belleza
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-oxido/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 6, ease: "linear" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
