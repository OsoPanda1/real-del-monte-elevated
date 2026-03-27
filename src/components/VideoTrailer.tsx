import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const VideoTrailer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={ref} id="trailer" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-night-900 to-background" />

      <div className="relative container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-body text-[9px] tracking-[0.5em] uppercase text-foreground/25">
            Experiencia Cinematográfica
          </span>
          <h2 className="font-display text-4xl md:text-6xl mt-4 tracking-tight text-gradient-gold">
            Leyendas de la Mina
          </h2>
          <p className="font-display text-base text-foreground/30 italic mt-4 max-w-lg mx-auto">
            Una inmersión audiovisual en el corazón de la montaña
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-video overflow-hidden rounded-xl glass-card">
            {!isPlaying ? (
              <div className="absolute inset-0 bg-night-900 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(43,80%,55%,0.06),transparent_60%)]" />
                <button onClick={() => setIsPlaying(true)} className="group relative z-10">
                  <motion.div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: "hsla(43, 80%, 55%, 0.08)",
                      border: "1px solid hsla(43, 80%, 55%, 0.2)",
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 hsla(43, 80%, 55%, 0.15)",
                        "0 0 0 20px hsla(43, 80%, 55%, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-7 h-7 text-gold/70 group-hover:text-gold group-hover:scale-110 transition-all ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-body text-[9px] tracking-[0.3em] uppercase text-foreground/20 whitespace-nowrap">
                    Reproducir
                  </span>
                </button>
              </div>
            ) : (
              <video src="/video/leyenda1.mp4" className="w-full h-full object-cover" controls autoPlay />
            )}
          </div>

          <p className="text-center font-body text-[9px] tracking-[0.25em] uppercase text-foreground/15 mt-8">
            🎧 Recomendado con audífonos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTrailer;
