import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Volume2, VolumeX, MapPin, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import logoImg from "@/assets/rdm-logo.png";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/realito-chat`;

const suggestions = [
  "¿Qué ruta me recomiendas?",
  "¿Dónde están los mejores pastes?",
  "Cuéntame una leyenda",
  "¿Qué eventos hay?",
];

const RealitoBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const playSound = useCallback((freq: number) => {
    if (!soundEnabled) return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {}
  }, [soundEnabled]);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;
    playSound(440);

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text, timestamp: new Date() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsTyping(true);

    const assistantId = crypto.randomUUID();
    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Error de conexión");
      }

      setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              const finalContent = assistantContent;
              setMessages(prev => prev.map(m => m.id === assistantId ? { ...m, content: finalContent } : m));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      playSound(880);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: assistantId,
        role: "assistant",
        content: `Lo siento, hubo un error: ${err.message}. Intenta de nuevo.`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, playSound]);

  return (
    <>
      {/* Floating Realito Orb */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
        style={{
          background: "radial-gradient(circle at 40% 40%, hsl(43, 80%, 60%), hsl(43, 70%, 40%))",
          boxShadow: "0 0 30px -4px hsla(43, 80%, 55%, 0.5)",
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
        {open ? (
          <span className="text-base sm:text-lg font-bold text-night-900">✕</span>
        ) : (
          <img src={logoImg} alt="Realito" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[340px] md:w-[400px] max-w-[400px] rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsla(220, 25%, 10%, 0.97), hsla(220, 30%, 7%, 0.99))",
              backdropFilter: "blur(30px)",
              border: "1px solid hsla(43, 80%, 55%, 0.15)",
              boxShadow: "0 20px 60px -15px hsla(0, 0%, 0%, 0.7), 0 0 40px -10px hsla(43, 80%, 55%, 0.1)",
            }}
          >
            {/* Header */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3" style={{ borderBottom: "1px solid hsla(43, 80%, 55%, 0.1)" }}>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center pulse-gold overflow-hidden"
                style={{ background: "radial-gradient(circle, hsl(43, 80%, 55%), hsl(43, 60%, 35%))" }}>
                <img src={logoImg} alt="Realito" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-sm text-foreground flex items-center gap-1.5">
                  Realito AI
                  <Sparkles className="w-3 h-3 text-gold" />
                </h4>
                <p className="font-body text-[9px] sm:text-[10px] text-gold tracking-wider uppercase flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> Real del Monte
                </p>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 rounded-full glass text-muted-foreground hover:text-gold transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="p-3 sm:p-4 min-h-[200px] sm:min-h-[250px] max-h-[300px] sm:max-h-[350px] overflow-y-auto space-y-3">
              {messages.length === 0 && (
                <>
                  <div className="glass-card rounded-xl p-3 sm:p-4">
                    <p className="font-body text-xs sm:text-sm text-foreground/90 leading-relaxed">
                      ¡Hola! Soy <span className="text-gradient-gold font-semibold">Realito</span>, tu guía inteligente de Real del Monte. 🏔️
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(s)}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-body text-[10px] sm:text-[11px] text-gold-light border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 ${
                    m.role === "user"
                      ? "bg-gold/15 border border-gold/20"
                      : "glass-card"
                  }`}>
                    {m.role === "assistant" ? (
                      <div className="font-body text-xs sm:text-sm text-foreground/90 leading-relaxed prose prose-sm prose-invert max-w-none
                        [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display
                        [&_h3]:text-gold [&_strong]:text-gold [&_em]:text-platinum/70
                        [&_li]:text-foreground/80 [&_p]:text-foreground/90">
                        <ReactMarkdown>{m.content || "..."}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="font-body text-xs sm:text-sm text-foreground">{m.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />
                  <span className="font-body text-[11px]">Realito está pensando...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregúntale a Realito..."
                  disabled={isTyping}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full glass font-body text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/40 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center btn-premium !p-0 disabled:opacity-50"
                >
                  {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RealitoBubble;
