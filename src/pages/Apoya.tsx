import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Gift, Mountain, Users, Sparkles } from "lucide-react";
import BrumaHeader from "@/components/BrumaHeader";
import BrumaFooter from "@/components/BrumaFooter";
import FloatingParticles from "@/components/FloatingParticles";
import RealitoBubble from "@/components/RealitoBubble";
import GradientSeparator from "@/components/GradientSeparator";
import { StaggerContainer, StaggerItem, GlowCard, TextReveal } from "@/components/VisualEffects";

import plazaImg from "@/assets/rdm-plaza.jpeg";

const tiers = [
  {
    name: "Minero",
    amount: "$50",
    description: "Apoya la preservación digital del pueblo",
    icon: <Mountain className="w-6 h-6" />,
    benefits: ["Tu nombre en el muro de patrocinadores", "Badge de Minero en tu perfil", "Acceso anticipado a nuevas funciones"],
    color: "copper",
  },
  {
    name: "Barretero",
    amount: "$200",
    description: "Contribuye al desarrollo de Realito AI",
    icon: <Sparkles className="w-6 h-6" />,
    benefits: ["Todo lo anterior", "Realito AI sin límites por 3 meses", "Acceso a rutas exclusivas", "Sticker digital de colección"],
    color: "gold",
    featured: true,
  },
  {
    name: "Veta Madre",
    amount: "$500",
    description: "Impulsa la transformación digital del turismo",
    icon: <Gift className="w-6 h-6" />,
    benefits: ["Todo lo anterior", "Tu nombre en la app por 1 año", "Reunión virtual con el equipo", "Pack de minerales digitales exclusivos"],
    color: "electric",
  },
];

const impactStats = [
  { label: "Comercios digitalizados", value: "120+" },
  { label: "Visitantes guiados por Realito", value: "8,500+" },
  { label: "Rutas creadas", value: "24" },
  { label: "Leyendas documentadas", value: "47" },
];

const Apoya = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <FloatingParticles />
    <BrumaHeader />

    {/* Hero */}
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={plazaImg} alt="Real del Monte" className="w-full h-full object-cover ken-burns opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(43,80%,55%,0.05),transparent_60%)]" />
      <div className="relative text-center px-6">
        <Link to="/" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 text-muted-foreground hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-xs tracking-wider uppercase">Inicio</span>
        </Link>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Heart className="w-10 h-10 text-gold mx-auto mb-4 opacity-60" />
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight text-gradient-gold">Apoya RDM</h1>
          <p className="font-display text-lg md:text-xl text-platinum/60 italic mt-6 max-w-xl mx-auto">
            Ayuda a preservar y digitalizar el patrimonio de Real del Monte
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="container mx-auto px-6 md:px-12 py-16 max-w-3xl">
      <TextReveal>
        <p className="font-display text-2xl md:text-3xl text-foreground/80 italic leading-relaxed text-center">
          RDM Digital es un proyecto independiente que busca transformar la experiencia turística de Real del Monte 
          mediante inteligencia artificial, cartografía viva y narrativa inmersiva. Tu apoyo mantiene vivo este sueño.
        </p>
      </TextReveal>
    </section>

    {/* Impact stats */}
    <section className="container mx-auto px-6 md:px-12 py-8">
      <div className="glass rounded-2xl p-8 flex flex-wrap justify-center gap-12">
        {impactStats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="font-display text-3xl text-gradient-gold block">{stat.value}</span>
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>

    <GradientSeparator variant="gold" />

    {/* Donation tiers */}
    <section className="container mx-auto px-6 md:px-12 py-20">
      <div className="text-center mb-16">
        <span className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/60 block mb-3">Elige tu Nivel</span>
        <h2 className="font-display text-4xl md:text-6xl tracking-tight text-gradient-gold">Niveles de Apoyo</h2>
      </div>

      <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <StaggerItem key={tier.name}>
            <GlowCard
              color={tier.color as "gold" | "electric" | "copper"}
              className={`p-8 text-center relative ${tier.featured ? "ring-1 ring-gold/30" : ""}`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 glass-gold rounded-full px-4 py-1">
                  <span className="font-body text-[9px] tracking-wider uppercase text-gold font-medium">Más popular</span>
                </div>
              )}

              <div className="w-14 h-14 rounded-full glass flex items-center justify-center mx-auto mb-4 text-gold">
                {tier.icon}
              </div>
              <h3 className="font-display text-2xl text-foreground mb-1">{tier.name}</h3>
              <div className="font-display text-4xl text-gradient-gold mb-2">{tier.amount} <span className="text-lg text-platinum/50">MXN</span></div>
              <p className="font-body text-xs text-muted-foreground mb-6">{tier.description}</p>

              <div className="w-8 h-px bg-gold/30 mx-auto mb-4" />

              <ul className="space-y-2 text-left mb-8">
                {tier.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-xs text-muted-foreground">
                    <span className="text-gold mt-0.5">✦</span> {b}
                  </li>
                ))}
              </ul>

              <button className={tier.featured ? "btn-premium w-full" : "btn-glass w-full"}>
                <Heart className="w-4 h-4 inline mr-2" /> Apoyar
              </button>
            </GlowCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>

    {/* Thank you */}
    <section className="py-20 text-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Users className="w-8 h-8 text-gold/40 mx-auto mb-4" />
        <p className="font-display text-2xl text-platinum/60 italic max-w-lg mx-auto">
          "Cada peso que inviertes no va a una empresa. Va a mantener viva la memoria de un pueblo que merece ser contado."
        </p>
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/40 mt-4 block">— Equipo RDM Digital</span>
      </motion.div>
    </section>

    <BrumaFooter />
    <RealitoBubble />
  </div>
);

export default Apoya;
