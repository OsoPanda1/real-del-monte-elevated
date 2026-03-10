import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import aerialImage from "@/assets/aerial-realmont.jpg";

interface POI {
  id: string;
  name: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
  category: "historia" | "gastronomia" | "arquitectura" | "naturaleza";
}

const pois: POI[] = [
  { id: "1", name: "Mina de Acosta", description: "Desciende 400 metros al corazón de la montaña, donde los ecos de los mineros cornish aún resuenan.", x: 35, y: 40, category: "historia" },
  { id: "2", name: "Panteón Inglés", description: "El único cementerio en México con tumbas que miran a Cornwall. Un adiós silencioso a tierras lejanas.", x: 62, y: 28, category: "historia" },
  { id: "3", name: "Pastes El Portal", description: "El paste original, herencia de los mineros ingleses, horneado con la receta de 1850.", x: 48, y: 55, category: "gastronomia" },
  { id: "4", name: "Parroquia de la Asunción", description: "Cantera labrada que desafía la niebla. Su torre es el faro de la montaña.", x: 45, y: 45, category: "arquitectura" },
  { id: "5", name: "Peña del Cuervo", description: "Donde el bosque se abre y la vista abraza todo el valle. Silencio absoluto.", x: 78, y: 35, category: "naturaleza" },
  { id: "6", name: "Museo de Medicina", description: "La historia de la salud en un pueblo donde la altitud dictaba las reglas del cuerpo.", x: 28, y: 60, category: "historia" },
];

const categoryColors: Record<string, string> = {
  historia: "hsl(var(--ocre-ingles))",
  gastronomia: "hsl(var(--rojo-oxido))",
  arquitectura: "hsl(var(--piedra))",
  naturaleza: "hsl(var(--musgo))",
};

const FogMap = () => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [fogRevealed, setFogRevealed] = useState(false);
  const [userLocation, setUserLocation] = useState<{ x: number; y: number } | null>(null);
  const revealPoints = useRef<Array<{ x: number; y: number; r: number }>>([]);

  // Geolocation
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Real del Monte approximate bounds: 20.12-20.15 lat, -98.68 to -98.64 lon
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const x = ((lon - (-98.68)) / ((-98.64) - (-98.68))) * 100;
        const y = ((20.15 - lat) / (20.15 - 20.12)) * 100;
        if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
          setUserLocation({ x, y });
        }
      },
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  // Draw fog on canvas
  const drawFog = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Draw fog
    ctx.fillStyle = "hsla(220, 14%, 96%, 0.92)";
    ctx.fillRect(0, 0, w, h);

    // Reveal circles
    ctx.globalCompositeOperation = "destination-out";
    for (const point of revealPoints.current) {
      const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.r);
      gradient.addColorStop(0, "rgba(0,0,0,1)");
      gradient.addColorStop(0.7, "rgba(0,0,0,0.8)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }, []);

  useEffect(() => {
    if (isInView && !fogRevealed) drawFog();
  }, [isInView, fogRevealed, drawFog]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fogRevealed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    revealPoints.current.push({ x, y, r: 60 });

    // Check if enough is revealed
    if (revealPoints.current.length > 80) {
      setFogRevealed(true);
    }
    drawFog();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (fogRevealed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    revealPoints.current.push({ x, y, r: 50 });
    if (revealPoints.current.length > 60) setFogRevealed(true);
    drawFog();
  };

  return (
    <section ref={ref} id="mapa" className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <span className="font-body text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Capítulo IV
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mt-4 tracking-tight">
            Mapa de Niebla
          </h2>
          <p className="font-display text-lg text-muted-foreground italic mt-4 max-w-md mx-auto">
            Limpia la bruma para descubrir los secretos del pueblo
          </p>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative aspect-[16/9] max-w-5xl mx-auto rounded-sm overflow-hidden cursor-crosshair"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Base map image */}
          <img
            src={aerialImage}
            alt="Mapa aéreo de Real del Monte"
            className="w-full h-full object-cover"
          />

          {/* Fog canvas overlay */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${fogRevealed ? "opacity-0 pointer-events-none" : ""}`}
          />

          {/* POI points */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${fogRevealed ? "opacity-100" : "opacity-0"}`}>
            {pois.map((poi) => (
              <button
                key={poi.id}
                className="absolute w-4 h-4 rounded-full pulse-ocre transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${poi.x}%`,
                  top: `${poi.y}%`,
                  backgroundColor: categoryColors[poi.category],
                }}
                onClick={() => setSelectedPOI(selectedPOI?.id === poi.id ? null : poi)}
              />
            ))}

            {/* User location */}
            {userLocation && (
              <div
                className="absolute w-4 h-4 rounded-full bg-oxido pulse-oxido transform -translate-x-1/2 -translate-y-1/2 z-20"
                style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%` }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-body text-[10px] tracking-wider uppercase text-oxido whitespace-nowrap">
                  Tú
                </span>
              </div>
            )}
          </div>

          {/* Selected POI card */}
          {selectedPOI && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 glass-empanado rounded-sm p-6 z-30"
            >
              <button
                onClick={() => setSelectedPOI(null)}
                className="absolute top-3 right-4 text-muted-foreground hover:text-foreground text-sm"
              >
                ×
              </button>
              <span
                className="font-body text-[10px] tracking-[0.3em] uppercase"
                style={{ color: categoryColors[selectedPOI.category] }}
              >
                {selectedPOI.category}
              </span>
              <h3 className="font-display text-xl text-foreground mt-2 mb-3">
                {selectedPOI.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {selectedPOI.description}
              </p>
            </motion.div>
          )}

          {/* Hint text */}
          {!fogRevealed && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.p
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="font-display text-xl md:text-2xl text-carbon/60 italic"
              >
                Desliza para limpiar la niebla
              </motion.p>
            </div>
          )}
        </motion.div>

        {/* Legend */}
        {fogRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-8 mt-8 flex-wrap"
          >
            {Object.entries(categoryColors).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                  {cat}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-oxido" />
              <span className="font-body text-xs tracking-wider uppercase text-muted-foreground">
                Tu ubicación
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FogMap;
