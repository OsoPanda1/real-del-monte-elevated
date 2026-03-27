import { useEffect, useRef } from "react";

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number; y: number; size: number; speedY: number; speedX: number;
      opacity: number; color: string; pulse: number; pulseSpeed: number;
    }

    const particles: Particle[] = [];
    // More subtle, fewer particles for cleaner look
    const colors = ["hsla(43, 70%, 60%, 1)", "hsla(43, 60%, 50%, 1)", "hsla(210, 60%, 60%, 1)"];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedY: (Math.random() - 0.5) * 0.25,
        speedX: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.25 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.003,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;
        const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();

        // Subtle glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        grd.addColorStop(0, p.color);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.globalAlpha = currentOpacity * 0.15;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default FloatingParticles;
