import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Navigation, Layers, Search, X, Clock, Zap, Star } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import RealitoBubble from "@/components/RealitoBubble";
import { supabase } from "@/integrations/supabase/client";

import aerialImg from "@/assets/aerial-realmont.jpg";

interface POI {
  id: string;
  name: string;
  description: string;
  map_x: number;
  map_y: number;
  category: string;
  rating?: number;
  visit_duration?: string;
  energy_level?: string;
}

const categoryInfo: Record<string, { color: string; label: string }> = {
  historia: { color: "hsl(43, 80%, 55%)", label: "Historia" },
  gastronomia: { color: "hsl(25, 55%, 45%)", label: "Gastronomía" },
  arquitectura: { color: "hsl(210, 100%, 55%)", label: "Arquitectura" },
  naturaleza: { color: "hsl(145, 35%, 45%)", label: "Naturaleza" },
  comercio: { color: "hsl(43, 70%, 70%)", label: "Comercio" },
};

const MapaVivo = () => {
  const [pois, setPois] = useState<POI[]>([]);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const revealPoints = useRef<Array<{ x: number; y: number; r: number }>>([]);
  const [fogCleared, setFogCleared] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await supabase.from("places").select("*");
      if (data) {
        setPois(data.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          map_x: p.map_x || 50,
          map_y: p.map_y || 50,
          category: p.category,
          rating: p.rating ? Number(p.rating) : undefined,
          visit_duration: p.visit_duration || undefined,
          energy_level: p.energy_level || undefined,
        })));
      }
    };
    fetchPlaces();
  }, []);

  const drawFog = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.scale(2, 2);
    ctx.fillStyle = "hsla(220, 30%, 6%, 0.85)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "destination-out";
    for (const p of revealPoints.current) {
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.7, "rgba(0,0,0,0.8)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }, []);

  useEffect(() => { if (!fogCleared) drawFog(); }, [fogCleared, drawFog]);

  const handleMove = (clientX: number, clientY: number) => {
    if (fogCleared || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    revealPoints.current.push({ x: clientX - rect.left, y: clientY - rect.top, r: 80 });
    if (revealPoints.current.length > 60) setFogCleared(true);
    drawFog();
  };

  const filtered = pois.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <BrumaHeader />

      <div className="pt-16 sm:pt-20 flex flex-col flex-1">
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3 glass-nav">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-[11px] tracking-[0.15em] uppercase hidden sm:inline">Inicio</span>
          </Link>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-display text-base sm:text-lg text-gradient-gold">Mapa Vivo</h1>
          <div className="flex-1" />
          <div className="glass rounded-full flex items-center gap-2 px-3 py-2 max-w-[180px] sm:max-w-xs">
            <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar..."
              className="bg-transparent font-body text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none w-full" />
            {searchQuery && <button onClick={() => setSearchQuery("")}><X className="w-3 h-3 text-muted-foreground" /></button>}
          </div>
          <button className="glass rounded-full p-2 text-electric hover:text-electric-light transition-colors">
            <Navigation className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-[11px] tracking-[0.15em] uppercase transition-all whitespace-nowrap ${
              !activeCategory ? "btn-premium !px-3 !py-1.5" : "glass text-muted-foreground hover:text-gold"
            }`}
          >
            <Layers className="w-3 h-3" /> Todos
          </button>
          {Object.entries(categoryInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(activeCategory === key ? null : key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body text-[11px] tracking-[0.15em] uppercase transition-all whitespace-nowrap ${
                activeCategory === key ? "glass border-gold/40 text-gold" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: info.color }} />
              {info.label}
            </button>
          ))}
        </div>

        {/* Map area */}
        <div className="flex-1 relative mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-xl overflow-hidden glass-card min-h-[50vh]">
          <div
            ref={containerRef}
            className="relative w-full h-full cursor-crosshair"
            style={{ minHeight: "50vh" }}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
          >
            <img src={aerialImg} alt="Mapa aéreo de Real del Monte" className="w-full h-full object-cover absolute inset-0" />

            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${fogCleared ? "opacity-0 pointer-events-none" : ""}`}
              style={{ minHeight: "50vh" }}
            />

            <div className={`absolute inset-0 transition-opacity duration-700 ${fogCleared ? "opacity-100" : "opacity-0"}`}>
              {filtered.map((poi) => (
                <button
                  key={poi.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
                  style={{ left: `${poi.map_x}%`, top: `${poi.map_y}%` }}
                  onClick={() => setSelectedPOI(selectedPOI?.id === poi.id ? null : poi)}
                >
                  <div
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full pulse-gold transition-transform ${selectedPOI?.id === poi.id ? "scale-150" : "group-hover:scale-125"}`}
                    style={{ backgroundColor: categoryInfo[poi.category]?.color || "hsl(43,80%,55%)" }}
                  />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-body text-[9px] text-foreground/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity glass rounded px-1.5 py-0.5">
                    {poi.name}
                  </span>
                </button>
              ))}
            </div>

            {!fogCleared && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.p
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="font-display text-lg sm:text-xl md:text-3xl text-gold/50 italic text-center px-4"
                >
                  Desliza para limpiar la niebla<br />
                  <span className="text-xs sm:text-sm text-platinum/30 not-italic font-body">y descubrir los secretos del pueblo</span>
                </motion.p>
              </div>
            )}
          </div>

          {selectedPOI && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-64 sm:w-72 glass rounded-xl p-4 sm:p-5 z-30"
            >
              <button onClick={() => setSelectedPOI(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryInfo[selectedPOI.category]?.color }} />
                <span className="font-body text-[10px] tracking-[0.15em] uppercase" style={{ color: categoryInfo[selectedPOI.category]?.color }}>
                  {categoryInfo[selectedPOI.category]?.label || selectedPOI.category}
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl text-foreground mb-2">{selectedPOI.name}</h3>
              <p className="font-body text-[11px] sm:text-xs text-muted-foreground leading-relaxed mb-3">{selectedPOI.description}</p>
              <div className="flex items-center gap-3 text-muted-foreground">
                {selectedPOI.rating && (
                  <span className="flex items-center gap-1 font-body text-[10px]">
                    <Star className="w-3 h-3 text-gold fill-gold" /> {selectedPOI.rating}
                  </span>
                )}
                {selectedPOI.visit_duration && (
                  <span className="flex items-center gap-1 font-body text-[10px]">
                    <Clock className="w-3 h-3 text-gold/60" /> {selectedPOI.visit_duration}
                  </span>
                )}
                {selectedPOI.energy_level && (
                  <span className="flex items-center gap-1 font-body text-[10px]">
                    <Zap className="w-3 h-3 text-electric/60" /> {selectedPOI.energy_level}
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {fogCleared && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass rounded-xl p-2.5 sm:p-3 z-20">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {Object.entries(categoryInfo).map(([key, info]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }} />
                    <span className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">{info.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <RealitoBubble />
    </div>
  );
};

export default MapaVivo;
