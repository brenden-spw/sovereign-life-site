"use client";
import { useEffect, useRef } from "react";

export interface ParticleConfig {
  count?: number;
  speed?: number;
  threshold?: number;  // connection distance in px
  opacity?: number;    // global multiplier
  mouseEffect?: boolean;
  upwardBias?: number; // how strongly particles prefer drifting up (0–1)
}

export default function ParticleNetwork({
  config = {},
  style,
}: {
  config?: ParticleConfig;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  // Hold config in a ref so the effect closure always reads current values
  const cfgRef = useRef(config);
  cfgRef.current = config;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const {
      count = 45,
      speed = 0.18,
      threshold = 130,
      opacity = 1,
      mouseEffect = false,
      upwardBias = 0.4,
    } = cfgRef.current;

    let W = 0;
    let H = 0;

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    if (mouseEffect) {
      canvas.parentElement?.addEventListener("mousemove", onMouseMove);
      canvas.parentElement?.addEventListener("mouseleave", onMouseLeave);
    }

    // ── Particles ────────────────────────────────────────────
    type P = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };

    const particles: P[] = Array.from({ length: count }, () => {
      const spd = speed * (0.6 + Math.random() * 0.8);
      return {
        x: Math.random() * (W || 1200),
        y: Math.random() * (H || 800),
        vx: (Math.random() - 0.5) * spd,
        vy: (Math.random() - 0.5) * spd - upwardBias * spd, // bias upward
        r: Math.random() * 1.1 + 0.4,
        alpha: Math.random() * 0.35 + 0.18,
      };
    });

    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      // ── Move ──────────────────────────────────────────────
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Horizontal bounce
        if (p.x < 0)  { p.vx = Math.abs(p.vx);  p.x = 0; }
        if (p.x > W)  { p.vx = -Math.abs(p.vx); p.x = W; }

        // Vertical: wrap — particles that drift off the top reappear at the bottom,
        // reinforcing the "rising from a foundation" feel
        if (p.y < -12) {
          p.y = H + 12;
          p.x = Math.random() * W;
        }
        if (p.y > H + 12) {
          p.y = -12;
          p.x = Math.random() * W;
        }
      }

      // ── Connections ──────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= threshold) continue;

          const proximity = 1 - dist / threshold;

          let boost = 0;
          if (mouseEffect) {
            const dax = a.x - mx; const day = a.y - my;
            const dbx = b.x - mx; const dby = b.y - my;
            const md = Math.min(
              Math.sqrt(dax * dax + day * day),
              Math.sqrt(dbx * dbx + dby * dby),
            );
            boost = Math.max(0, 1 - md / 160) * 0.18;
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(99,132,121,${(proximity * 0.09 + boost) * opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // ── Dots ─────────────────────────────────────────────
      for (const p of particles) {
        let glow = 0;
        if (mouseEffect) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const md = Math.sqrt(dx * dx + dy * dy);
          glow = Math.max(0, 1 - md / 140) * 0.55;

          if (glow > 0.08) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99,132,121,${glow * 0.07 * opacity})`;
            ctx.fill();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,132,121,${Math.min(1, (p.alpha + glow) * opacity)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (mouseEffect) {
        canvas.parentElement?.removeEventListener("mousemove", onMouseMove);
        canvas.parentElement?.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []); // config read via ref — no re-mount on prop change

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
