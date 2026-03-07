"use client";
import { useEffect, useRef, useState } from "react";

// Four pillars of life insurance converge into Sovereign Life
const STREAMS = [
  { cx: 50,  label: "PROTECTION" },
  { cx: 148, label: "CAPITAL" },
  { cx: 252, label: "TAX" },
  { cx: 350, label: "RETIREMENT" },
];

const DOT_Y    = 390;
const CX       = 200;
const CONV_Y   = 128;
const ICON_CY  = 52;
const ICON_R   = 26;
const STEM_TOP = ICON_CY + ICON_R + 2;

function makePath(dotCx: number) {
  const midY = (DOT_Y + CONV_Y) / 2;
  return `M ${dotCx} ${DOT_Y} C ${dotCx} ${midY - 30}, ${CX} ${midY + 30}, ${CX} ${CONV_Y}`;
}

// Small vault rings icon — matches VaultRingsHero theme
function VaultIcon({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const rings = [r * 0.38, r * 0.62, r * 0.88, r];
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const outerR = r;
    const innerR = r - (i % 3 === 0 ? 5 : 3);
    return {
      x1: cx + Math.cos(angle) * innerR,
      y1: cy + Math.sin(angle) * innerR,
      x2: cx + Math.cos(angle) * outerR,
      y2: cy + Math.sin(angle) * outerR,
    };
  });

  return (
    <g>
      {rings.map((r2, i) => (
        <circle key={i} cx={cx} cy={cy} r={r2}
          stroke={i === rings.length - 1 ? "#638479" : "rgba(99,132,121,0.35)"}
          strokeWidth={i === rings.length - 1 ? 0.85 : 0.5}
          fill="none"
        />
      ))}
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke="#638479" strokeWidth="0.6" />
      ))}
      <circle cx={cx} cy={cy} r={1.8} fill="#638479" />
    </g>
  );
}

export default function LifeConvergence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (wh * 0.85 - rect.top) / (wh * 0.65)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lineProgress = [
    Math.min(1, progress / 1),
    Math.min(1, progress / 0.88),
    Math.min(1, progress / 0.88),
    Math.min(1, progress / 1),
  ];

  const dotActive    = progress > 0.04;
  const convGlow     = Math.min(1, Math.max(0, (progress - 0.7)  / 0.2));
  const iconOpacity  = Math.min(1, Math.max(0, (progress - 0.78) / 0.22));
  const stemOpacity  = Math.min(1, Math.max(0, (progress - 0.65) / 0.25));

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", minHeight: "480px" }}>
      <svg
        viewBox="0 0 400 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        {/* Ghost tracks */}
        {STREAMS.map((s, i) => (
          <path
            key={`track-${i}`}
            d={makePath(s.cx)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Animated convergence lines */}
        {STREAMS.map((s, i) => (
          <path
            key={`line-${i}`}
            d={makePath(s.cx)}
            stroke="white"
            strokeWidth="1.1"
            opacity="0.6"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - lineProgress[i]}
            strokeLinecap="round"
          />
        ))}

        {/* Stem from convergence point up to icon */}
        <line
          x1={CX} y1={CONV_Y}
          x2={CX} y2={STEM_TOP}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1"
          opacity={stemOpacity}
        />

        {/* Convergence glow dot */}
        <circle cx={CX} cy={CONV_Y} r="3.5" fill="#638479" opacity={convGlow} />
        <circle cx={CX} cy={CONV_Y} r="8" stroke="#638479" strokeWidth="0.5" fill="none"
          opacity={convGlow * 0.4} />

        {/* Stream source dots */}
        {STREAMS.map((s, i) => (
          <g key={`dot-${i}`}>
            <circle cx={s.cx} cy={DOT_Y} r="13"
              stroke={dotActive ? "#638479" : "rgba(255,255,255,0.12)"}
              strokeWidth="0.75"
              fill="none"
              style={{ transition: "stroke 0.5s ease" }}
            />
            <circle cx={s.cx} cy={DOT_Y} r="4"
              fill={dotActive ? "#638479" : "rgba(255,255,255,0.2)"}
              style={{ transition: "fill 0.5s ease" }}
            />
            <text
              x={s.cx} y={DOT_Y + 30}
              textAnchor="middle"
              fontSize="7"
              fill="rgba(255,255,255,0.4)"
              fontFamily="Inter, sans-serif"
              letterSpacing="0.14em"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* Sovereign Life vault icon — fades in at end */}
        <g opacity={iconOpacity} style={{ transition: "opacity 0.15s linear" }}>
          <text
            x={CX} y={ICON_CY - ICON_R - 12}
            textAnchor="middle"
            fontSize="7"
            fill="rgba(255,255,255,0.45)"
            fontFamily="Inter, sans-serif"
            letterSpacing="0.18em"
          >
            SOVEREIGN LIFE
          </text>
          <VaultIcon cx={CX} cy={ICON_CY} r={ICON_R} />
        </g>
      </svg>
    </div>
  );
}
