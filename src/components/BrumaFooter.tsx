import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Heart } from "lucide-react";
import fogImg from "@/assets/landscape-fog.jpg";
import logoImg from "@/assets/rdm-logo.png";

const footerLinks = [
  { label: "Historia", path: "/historia" },
  { label: "Gastronomía", path: "/gastronomia" },
  { label: "Cultura", path: "/cultura" },
  { label: "Rutas", path: "/rutas" },
  { label: "Comercios", path: "/comercios" },
  { label: "Eventos", path: "/eventos" },
  { label: "Mapa Vivo", path: "/mapa" },
  { label: "Apoya", path: "/apoya" },
  { label: "Registrar Negocio", path: "/registro-comercio" },
];

const BrumaFooter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <img src={fogImg} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/98 to-background/90" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <img src={logoImg} alt="RDM Digital" className="w-16 h-16 mx-auto mb-6 object-contain"
            style={{ filter: "drop-shadow(0 0 15px hsla(43, 80%, 55%, 0.2))" }} />

          <h3 className="font-display text-3xl md:text-5xl tracking-tight mb-4">
            <span className="text-gradient-gold">La niebla siempre vuelve</span>
          </h3>
          <p className="font-display text-lg text-platinum/50 italic max-w-lg mx-auto mb-12">
            Y con ella, la invitación a perderse entre calles empedradas,
            ecos mineros y el aroma de un paste recién horneado.
          </p>

          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Donate CTA */}
          <Link
            to="/apoya"
            className="inline-flex items-center gap-2 btn-hero-glass !px-6 mb-12"
          >
            <Heart className="w-4 h-4" />
            <span>Apoya este proyecto</span>
          </Link>

          <div className="separator-gradient mb-12 max-w-md mx-auto opacity-40" />

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
            {[
              { label: "Coordenadas", value: "20.1417° N, 98.6743° W" },
              { label: "Altitud", value: "2,660 msnm" },
              { label: "Fundación", value: "1739" },
            ].map((item) => (
              <div key={item.label}>
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/40 block mb-2">{item.label}</span>
                <span className="font-display text-lg text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="separator-gradient mt-16 mb-8 opacity-30" />

        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-gold/40" />
            <p className="font-body text-[10px] text-muted-foreground tracking-wider">
              © 2026 RDM Digital · Innovación Turística Inteligente
            </p>
          </div>
          <p className="font-body text-[10px] text-muted-foreground tracking-wider mt-2 md:mt-0">
            Powered by Realito AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BrumaFooter;
