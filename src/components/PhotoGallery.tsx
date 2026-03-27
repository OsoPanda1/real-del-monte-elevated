import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-realmont.jpg";
import aerialImg from "@/assets/aerial-realmont.jpg";
import gastroImg from "@/assets/gastronomia-pastes.jpg";
import arqImg from "@/assets/arquitectura-iglesia.jpg";
import fogImg from "@/assets/landscape-fog.jpg";
import plazaImg from "@/assets/rdm-plaza.jpeg";
import calleImg from "@/assets/rdm-calle.jpeg";
import minaImg from "@/assets/rdm-mina.jpeg";

const photos = [
  { src: plazaImg, alt: "Plaza principal", caption: "Plaza Principal, atardecer dorado" },
  { src: arqImg, alt: "Arquitectura colonial", caption: "Cantera y plata" },
  { src: minaImg, alt: "Interior de la mina", caption: "Mina de Acosta, nivel 3" },
  { src: gastroImg, alt: "Paste tradicional", caption: "Paste original, receta de 1850" },
  { src: calleImg, alt: "Calle colonial", caption: "Calles coloniales" },
  { src: aerialImg, alt: "Vista aérea", caption: "El pueblo entre la bruma" },
  { src: heroImg, alt: "Calles al amanecer", caption: "Calle Hidalgo, amanecer" },
  { src: fogImg, alt: "Bosques en niebla", caption: "Sierra de Pachuca" },
];

const PhotoGallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section ref={ref} id="galeria" className="py-28 md:py-40 relative">
      <div className="container mx-auto px-6 md:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-foreground/25">Galería</span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight text-gradient-gold">
            Fragmentos de Luz
          </h2>
          <p className="font-display text-base text-foreground/30 italic mt-4 max-w-md mx-auto">
            Cada imagen es una pausa, un suspiro del lugar
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-6xl mx-auto">
          {photos.map((photo, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                  isLarge ? "col-span-2 row-span-2" : ""
                }`}
                onClick={() => setSelectedIdx(i)}
              >
                <div className={`overflow-hidden ${isLarge ? "aspect-[4/3]" : "aspect-square"}`}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                  <p className="font-display text-sm text-foreground/80 italic">{photo.caption}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "hsla(220, 30%, 3%, 0.96)", backdropFilter: "blur(20px)" }}
            onClick={() => setSelectedIdx(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(null); }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.img
              key={selectedIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={photos[selectedIdx].src}
              alt={photos[selectedIdx].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <p className="absolute bottom-12 left-1/2 -translate-x-1/2 font-display text-base text-foreground/40 italic">
              {photos[selectedIdx].caption}
            </p>

            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(Math.max(0, selectedIdx - 1)); }}
              className="absolute left-4 md:left-8 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(Math.min(photos.length - 1, selectedIdx + 1)); }}
              className="absolute right-4 md:right-8 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
