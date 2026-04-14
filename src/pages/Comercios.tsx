import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Loader2 } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import BusinessCard from "@/components/BusinessCard";
import EventCard from "@/components/EventCard";
import { ImmersiveHero } from "@/components/VisualEffects";
import GradientSeparator from "@/components/GradientSeparator";
import { supabase } from "@/integrations/supabase/client";

import calleImg from "@/assets/rdm-calle.jpeg";

const categories = ["Todos", "Pastería", "Hospedaje", "Platería", "Bar", "Artesanías", "Recorridos", "Tienda"];

const Comercios = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [bizRes, evtRes] = await Promise.all([
        supabase.from("businesses").select("*").order("is_premium", { ascending: false }).order("rating", { ascending: false }),
        supabase.from("events").select("*").order("event_date").limit(4),
      ]);
      if (bizRes.data) setBusinesses(bizRes.data);
      if (evtRes.data) setEvents(evtRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = businesses.filter(b => {
    const matchCategory = activeCategory === "Todos" || b.category === activeCategory;
    const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <FloatingParticles />
      <BrumaHeader />

      <ImmersiveHero image={calleImg} title="Directorio" subtitle="Los mejores establecimientos del pueblo mágico" label="Catálogo Editorial">
        <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-[11px] tracking-[0.15em] uppercase">Inicio</span>
        </Link>
      </ImmersiveHero>

      <GradientSeparator variant="gold" />

      <section className="container mx-auto px-4 sm:px-6 md:px-12 py-12">
        <div className="max-w-xl mx-auto mb-8">
          <div className="glass rounded-full flex items-center gap-3 px-5 py-3">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar comercios..."
              className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Filter className="w-4 h-4 text-gold/40 flex-shrink-0" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-body text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "btn-premium !px-4 !py-1.5"
                  : "glass text-muted-foreground hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-gold" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl sm:text-2xl text-foreground">{filtered.length} Comercios</h2>
              </div>
              {filtered.map((biz, i) => (
                <BusinessCard key={biz.id} name={biz.name} category={biz.category} description={biz.description || ""} image={calleImg} isPremium={biz.is_premium} rating={biz.rating} phone={biz.phone} index={i} />
              ))}
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl text-foreground mb-6">
                <span className="text-gradient-gold">Próximos Eventos</span>
              </h3>
              <div className="space-y-4">
                {events.map((event, i) => (
                  <EventCard key={event.id} name={event.name} date={event.event_date || ""} time={event.event_time || ""} location={event.location || ""} description={event.description || ""} index={i} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 glass-card rounded-2xl p-6 text-center"
              >
                <h4 className="font-display text-lg text-foreground mb-2">¿Tienes un negocio?</h4>
                <p className="font-body text-[11px] text-muted-foreground mb-4 leading-relaxed">
                  Registra tu comercio en el ecosistema RDM Digital.
                </p>
                <Link to="/registro-comercio" className="btn-premium inline-block !text-xs">
                  Registrar mi negocio
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      <BrumaFooter />
      <RealitoBubble />
    </div>
  );
};

export default Comercios;
