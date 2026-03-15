import { useState, useCallback, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import CinematicIntro from "@/components/CinematicIntro";

const Index = lazy(() => import("./pages/Index"));
const Historia = lazy(() => import("./pages/Historia"));
const Rutas = lazy(() => import("./pages/Rutas"));
const Comercios = lazy(() => import("./pages/Comercios"));
const RegistroComercio = lazy(() => import("./pages/RegistroComercio"));
const Gastronomia = lazy(() => import("./pages/Gastronomia"));
const Cultura = lazy(() => import("./pages/Cultura"));
const Eventos = lazy(() => import("./pages/Eventos"));
const MapaVivo = lazy(() => import("./pages/MapaVivo"));
const Apoya = lazy(() => import("./pages/Apoya"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 rounded-full mx-auto mb-4 pulse-gold"
        style={{ background: "radial-gradient(circle, hsl(43, 80%, 55%), hsl(43, 60%, 35%))" }} />
      <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Cargando...</span>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />} key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/gastronomia" element={<Gastronomia />} />
          <Route path="/cultura" element={<Cultura />} />
          <Route path="/rutas" element={<Rutas />} />
          <Route path="/comercios" element={<Comercios />} />
          <Route path="/registro-comercio" element={<RegistroComercio />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/mapa" element={<MapaVivo />} />
          <Route path="/apoya" element={<Apoya />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const AppInner = () => {
  const [introComplete, setIntroComplete] = useState(() => {
    if (sessionStorage.getItem("rdm_intro")) return true;
    sessionStorage.setItem("rdm_intro", "1");
    return false;
  });

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}
      {introComplete && <AnimatedRoutes />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
