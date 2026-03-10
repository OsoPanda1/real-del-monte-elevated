import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import landscapeImg from "@/assets/landscape-fog.jpg";

const BrumaFooter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={landscapeImg}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h3 className="font-display text-3xl md:text-5xl text-foreground tracking-tight mb-6">
            La niebla siempre vuelve
          </h3>
          <p className="font-display text-lg text-muted-foreground italic max-w-lg mx-auto mb-12">
            Y con ella, la invitación a perderse entre calles empedradas,
            ecos mineros y el aroma de un paste recién horneado.
          </p>

          <div className="w-16 h-px bg-oxido mx-auto mb-12" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-2">
                Coordenadas
              </span>
              <span className="font-display text-lg text-foreground">
                20.1417° N, 98.6743° W
              </span>
            </div>
            <div>
              <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-2">
                Altitud
              </span>
              <span className="font-display text-lg text-foreground">
                2,660 msnm
              </span>
            </div>
            <div>
              <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground block mb-2">
                Fundación
              </span>
              <span className="font-display text-lg text-foreground">
                1739
              </span>
            </div>
          </div>
        </motion.div>

        <div className="separator-bruma mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © 2026 Taller Bruma · Un archivo digital vivo
          </p>
          <p className="font-body text-xs text-muted-foreground tracking-wider mt-2 md:mt-0">
            Hecho con la melancolía del lugar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BrumaFooter;
