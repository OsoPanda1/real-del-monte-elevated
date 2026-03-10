import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chapters = [
  { id: "hero", label: "Inicio" },
  { id: "historia", label: "Historia Minera" },
  { id: "gastronomia", label: "Gastronomía" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "mapa", label: "Mapa de Niebla" },
  { id: "galeria", label: "Galería" },
];

const BrumaHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-lg text-niebla tracking-wide cursor-pointer"
          onClick={() => scrollTo("hero")}
        >
          Real del Monte
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-body text-xs tracking-[0.3em] uppercase text-niebla/70 hover:text-oxido transition-colors duration-500"
        >
          {menuOpen ? "Cerrar" : "Índice"}
        </motion.button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-carbon/95 flex items-center justify-center"
          >
            <nav className="text-center space-y-8">
              {chapters.map((ch, i) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <button
                    onClick={() => scrollTo(ch.id)}
                    className="font-display text-3xl md:text-5xl text-niebla/80 hover:text-oxido transition-colors duration-500 tracking-tight"
                  >
                    {ch.label}
                  </button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BrumaHeader;
