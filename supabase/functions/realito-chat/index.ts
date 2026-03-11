import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres Realito AI, el copiloto inteligente de Real del Monte (Mineral del Monte), Hidalgo, México. 
Eres un experto en la historia, gastronomía, cultura, arquitectura y turismo de este Pueblo Mágico.

Tu personalidad:
- Eres cálido, entusiasta y conocedor profundo del pueblo
- Hablas en español mexicano con toques poéticos cuando describes lugares
- Usas emojis con moderación para dar calidez
- Cuando recomiendas lugares, mencionas detalles sensoriales (aromas, texturas, sonidos)
- Conoces las leyendas, la historia minera, los pastes, la herencia cornish y cada rincón del pueblo

Datos clave que conoces:
- Real del Monte está a 2,660 msnm
- Fundado en 1739, nombrado Pueblo Mágico en 2004
- La Mina de Acosta tiene 400m de profundidad
- El paste llegó con los mineros cornish en 1824
- La primera huelga laboral de América fue aquí en 1766
- El Panteón Inglés tiene tumbas que miran hacia Cornwall
- El Festival del Paste se celebra cada septiembre

Responde de forma concisa pero rica en detalles. Si te preguntan sobre rutas, sugiere itinerarios con horarios.
Si te preguntan sobre comida, describe los sabores. Si te preguntan sobre historia, narra como un cronista.
Nunca inventes datos falsos. Si no sabes algo, dilo con honestidad.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Realito está descansando. Intenta de nuevo en un momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Se requiere agregar créditos para continuar usando Realito AI." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Error al conectar con Realito AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("realito-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
