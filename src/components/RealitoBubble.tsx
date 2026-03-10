import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const RealitoBubble = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const suggestions = [
    "¿Qué ruta me recomiendas hoy?",
    "¿Dónde están los mejores pastes?",
    "Cuéntame una leyenda minera",
    "¿Qué eventos hay esta semana?",
  ];

  return (
    <>
      {/* Floating Realito Orb */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 40%, hsl(43, 80%, 60%), hsl(43, 70%, 40%))",
          boxShadow: "0 0 30px -4px hsla(43, 80%, 55%, 0.5), 0 0 60px -8px hsla(43, 80%, 55%, 0.2)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 20px -4px hsla(43, 80%, 55%, 0.4)",
            "0 0 40px -4px hsla(43, 80%, 55%, 0.6)",
            "0 0 20px -4px hsla(43, 80%, 55%, 0.4)",
          ],
        }}
        transition={{ boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      >
        <span className="text-2xl">⛏️</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsla(220, 25%, 10%, 0.95), hsla(220, 30%, 7%, 0.98))",
              backdropFilter: "blur(30px)",
              border: "1px solid hsla(43, 80%, 55%, 0.15)",
              boxShadow: "0 20px 60px -15px hsla(0, 0%, 0%, 0.6), 0 0 40px -10px hsla(43, 80%, 55%, 0.1)",
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center pulse-gold"
                style={{ background: "radial-gradient(circle, hsl(43, 80%, 55%), hsl(43, 60%, 35%))" }}>
                <span className="text-sm">⛏️</span>
              </div>
              <div>
                <h4 className="font-display text-sm text-foreground">Realito AI</h4>
                <p className="font-body text-[10px] text-gold tracking-wider uppercase">Copiloto de Real del Monte</p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-muted-foreground hover:text-foreground text-lg">×</button>
            </div>

            {/* Chat area */}
            <div className="p-5 min-h-[200px] max-h-[300px] overflow-y-auto">
              <div className="glass-card rounded-xl p-4 mb-4">
                <p className="font-body text-sm text-foreground/90 leading-relaxed">
                  ¡Hola! Soy <span className="text-gradient-gold font-semibold">Realito</span>, tu guía inteligente de Real del Monte. ¿En qué puedo ayudarte hoy?
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(s)}
                    className="px-3 py-1.5 rounded-full font-body text-[11px] text-gold-light border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Pregúntale a Realito..."
                  className="flex-1 px-4 py-2.5 rounded-full bg-muted/50 border border-border/50 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/40"
                />
                <button className="w-10 h-10 rounded-full flex items-center justify-center btn-premium text-xs">
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RealitoBubble;
