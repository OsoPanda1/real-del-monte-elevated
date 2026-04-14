import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import logoImg from "@/assets/rdm-logo.png";

const navItems = [
  { label: "Historia", path: "/historia" },
  { label: "Gastronomía", path: "/gastronomia" },
  { label: "Cultura", path: "/cultura" },
  { label: "Rutas", path: "/rutas" },
  { label: "Comercios", path: "/comercios" },
  { label: "Eventos", path: "/eventos" },
  { label: "Mapa", path: "/mapa" },
];

const BrumaHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass-nav" : ""
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logoImg}
            alt="RDM"
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            style={{ filter: "drop-shadow(0 0 8px hsla(43, 80%, 55%, 0.3))" }}
          />
          <div>
            <span className="font-display text-sm sm:text-base text-foreground tracking-wide group-hover:text-gradient-gold transition-all">
              RDM Digital
            </span>
            <span className="font-body text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-gold/60 block -mt-0.5">
              Real del Monte
            </span>
          </div>
        </Link>

        {/* Desktop nav — unified 11px uppercase */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-gold"
                  : "text-muted-foreground hover:text-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/apoya"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-gold font-body text-[11px] tracking-[0.15em] uppercase text-gold hover:bg-gold/10 transition-all"
          >
            <Heart className="w-3 h-3" /> Apoya
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 xl:hidden"
        >
          <span className="hidden sm:inline">{menuOpen ? "Cerrar" : "Menú"}</span>
          <div className="flex flex-col gap-1 w-5">
            <motion.div animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }} className="w-full h-[1px] bg-gold" />
            <motion.div animate={{ opacity: menuOpen ? 0 : 1 }} className="w-full h-[1px] bg-gold/60" />
            <motion.div animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }} className="w-full h-[1px] bg-gold" />
          </div>
        </button>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsla(220, 30%, 5%, 0.97), hsla(220, 35%, 3%, 0.99))",
              backdropFilter: "blur(30px)",
            }}
          >
            <nav className="text-center space-y-6 sm:space-y-8 relative z-10 px-6 w-full max-w-md">
              {[{ label: "Inicio", path: "/" }, ...navItems, { label: "Apoya RDM", path: "/apoya" }].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Link
                    to={item.path}
                    className={`block font-display text-2xl sm:text-3xl tracking-tight transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-gradient-gold"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
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
