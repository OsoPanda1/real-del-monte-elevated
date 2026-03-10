import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import heroImg from "@/assets/hero-realmont.jpg";
import aerialImg from "@/assets/aerial-realmont.jpg";
import gastroImg from "@/assets/gastronomia-pastes.jpg";
import historiaImg from "@/assets/historia-mina.jpg";
import arqImg from "@/assets/arquitectura-iglesia.jpg";
import fogImg from "@/assets/landscape-fog.jpg";

const photos = [
  { src: heroImg, alt: "Calles empedradas de Real del Monte al amanecer", caption: "Calle Hidalgo, amanecer" },
  { src: arqImg, alt: "Parroquia entre la niebla", caption: "Parroquia de la Asunción" },
  { src: historiaImg, alt: "Interior de la Mina de Acosta", caption: "Mina de Acosta, nivel 3" },
  { src: gastroImg, alt: "Paste tradicional de Real del Monte", caption: "Paste original, receta de 1850" },
  { src: aerialImg, alt: "Vista aérea del pueblo entre nubes", caption: "El pueblo y la bruma" },
  { src: fogImg, alt: "Bosques de pino envueltos en niebla", caption: "Sierra de Pachuca" },
];

const PhotoGallery = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section ref={ref} id="galeria" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Capítulo V
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4 tracking-tight">
            Fragmentos de luz
          </h2>
          <p className="font-display text-lg text-muted-foreground italic mt-4 max-w-md mx-auto">
            Cada imagen es una pausa, un suspiro del lugar
          </p>
        </motion.div>

        {/* Asymmetric masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {photos.map((photo, i) => {
            const isLarge = i === 0 || i === 4;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`relative group cursor-pointer img-zoom-heavy ${
                  isLarge ? "col-span-2 row-span-2" : ""
                }`}
                onClick={() => setSelectedIdx(i)}
              >
                <div className={`overflow-hidden ${isLarge ? "aspect-[4/3]" : "aspect-square"}`}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Hover caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-4 md:p-6">
                  <p className="font-display text-sm md:text-base text-niebla italic">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIdx !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-carbon/95 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setSelectedIdx(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative max-w-5xl max-h-[85vh]"
          >
            <img
              src={photos[selectedIdx].src}
              alt={photos[selectedIdx].alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-center font-display text-lg text-niebla/70 italic mt-6">
              {photos[selectedIdx].caption}
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8">
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(Math.max(0, selectedIdx - 1)); }}
              className="font-body text-xs tracking-widest uppercase text-niebla/50 hover:text-oxido transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedIdx(Math.min(photos.length - 1, selectedIdx + 1)); }}
              className="font-body text-xs tracking-widest uppercase text-niebla/50 hover:text-oxido transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default PhotoGallery;
