import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const VideoTrailer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  // Using a cinematic drone video of Real del Monte from YouTube
  const videoId = "dQw4w9WgXcQ"; // Placeholder - will show embed

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-carbon overflow-hidden">
      {/* Fog decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.4em] uppercase text-piedra">
            Experiencia Cinematográfica
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-niebla mt-4 tracking-tight">
            Entre la bruma y la piedra
          </h2>
          <p className="font-display text-lg text-piedra italic mt-4 max-w-lg mx-auto">
            Un vuelo sobre techos de óxido y calles que guardan siglos de historias
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
            {!isPlaying ? (
              <>
                <img
                  src={"/placeholder.svg"}
                  alt="Vista cinematográfica de Real del Monte"
                  className="w-full h-full object-cover bg-carbon"
                />
                {/* Overlay with play button */}
                <div className="absolute inset-0 bg-carbon/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="group relative"
                  >
                    {/* Outer ring */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-niebla/30 flex items-center justify-center group-hover:border-oxido transition-colors duration-700">
                      {/* Play triangle */}
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-niebla/80 group-hover:text-oxido transition-colors duration-700 ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-body text-[10px] tracking-[0.3em] uppercase text-niebla/40 whitespace-nowrap">
                      Reproducir tráiler
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&showinfo=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Tráiler cinematográfico de Real del Monte"
              />
            )}
          </div>

          {/* Audio note */}
          <p className="text-center font-body text-[10px] tracking-[0.2em] uppercase text-piedra/50 mt-6">
            🎧 Recomendado con audífonos · Sonido ambiental de la sierra
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTrailer;
