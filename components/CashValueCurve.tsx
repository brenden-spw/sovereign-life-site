"use client";
import { useEffect, useRef, useState } from "react";

// Scroll-animated whole life policy illustration.
//
// What it shows:
//   White flat line  = Death Benefit (guaranteed face amount — stays constant)
//   Olive curve      = Cash Value (grows from near $0 at Yr 1 → converges to
//                      death benefit by Yr 30 as the policy matures)
//
// The gap between them = "Pure Insurance" element, which shrinks over time as
// your accumulated capital takes over more of the policy's total value.
//
// Data anchors (based on typical whole life policy designed for cash accumulation):
//   Yr  1: CSV ≈  5% of death benefit  →  y = 258  (x = 52)
//   Yr  8: CSV ≈ 40% of death benefit  →  y = 174  (x = 155)
//   Yr 15: CSV ≈ 65% of death benefit  →  y = 114  (x = 258)
//   Yr 22: CSV ≈ 85% of death benefit  →  y =  66  (x = 361)
//   Yr 30: CSV ≈100% of death benefit  →  y =  30  (x = 478)
//
// Chart geometry:
//   viewBox  500 × 320
//   Y-axis   x = 52     ($0 at y=270, $1M at y=30, scale: 240px / $1M)
//   X-axis   y = 270    (Yr 1 at x=52, Yr 30 at x=478)
//   Chart area x=[52,478], y=[30,270]

const DB_PATH = "M 52,30 L 478,30";

// Multi-segment cubic bezier passing through the data anchors above
const CV_PATH =
  "M 52,258 C 90,255 130,205 155,174 " +
  "C 185,143 225,124 258,114 " +
  "C 294,104 332,82 361,66 " +
  "C 394,48 440,33 478,30";

// Fill area under cash value (olive tint = "your capital")
const CV_AREA =
  "M 52,258 C 90,255 130,205 155,174 " +
  "C 185,143 225,124 258,114 " +
  "C 294,104 332,82 361,66 " +
  "C 394,48 440,33 478,30 L 478,270 L 52,270 Z";

// Fill area between DB and CV (white tint = "insurance cost")
const GAP_AREA =
  "M 52,30 L 478,30 " +
  "C 440,33 394,48 361,66 " +
  "C 332,82 294,104 258,114 " +
  "C 225,124 185,143 155,174 " +
  "C 130,205 90,255 52,258 Z";

// Y-axis grid lines and labels
const Y_TICKS = [
  { y: 30,  label: "$1M"   },
  { y: 90,  label: "$750k" },
  { y: 150, label: "$500k" },
  { y: 210, label: "$250k" },
  { y: 270, label: "$0"    },
];

// X-axis year labels
const X_TICKS = [
  { x: 52,  label: "Yr 1"  },
  { x: 155, label: "Yr 8"  },
  { x: 258, label: "Yr 15" },
  { x: 361, label: "Yr 22" },
  { x: 478, label: "Yr 30" },
];

// "TODAY" marker sits at ~Yr 10 on the cash value curve
// At x=195 (Yr 10), the bezier yields y ≈ 150
const TODAY_X = 195;
const TODAY_Y = 150;

export default function CashValueCurve() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wh   = window.innerHeight;
      const p    = Math.min(1, Math.max(0, (wh * 0.82 - rect.top) / (wh * 0.68)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dbP     = Math.min(1, progress / 0.60);
  const cvP     = Math.min(1, progress / 0.95);
  const fillOp  = Math.min(1, Math.max(0, (progress - 0.05) / 0.60));
  const labelOp = Math.min(1, Math.max(0, (progress - 0.80) / 0.20));

  return (
    <div ref={ref} style={{ width: "100%", height: "100%", minHeight: "480px" }}>
      <svg
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        {/* ── Y-AXIS ─────────────────────────────────────────── */}
        <line x1="52" y1="30" x2="52" y2="270"
          stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />

        {Y_TICKS.map(({ y, label }) => (
          <g key={y}>
            {/* Tick mark */}
            <line x1="47" y1={y} x2="52" y2={y}
              stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
            {/* Horizontal grid rule (dashed) */}
            <line x1="52" y1={y} x2="478" y2={y}
              stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="4 5" />
            {/* Dollar label */}
            <text x="44" y={y + 3.5} fontSize="7"
              fill="rgba(255,255,255,0.3)"
              fontFamily="Inter, sans-serif" textAnchor="end" letterSpacing="0.04em">
              {label}
            </text>
          </g>
        ))}

        {/* ── X-AXIS ─────────────────────────────────────────── */}
        <line x1="52" y1="270" x2="478" y2="270"
          stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" />

        {X_TICKS.map(({ x, label }) => (
          <g key={x}>
            <line x1={x} y1="270" x2={x} y2="275"
              stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
            <text x={x} y="288" fontSize="7"
              fill="rgba(255,255,255,0.3)"
              fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing="0.06em">
              {label}
            </text>
          </g>
        ))}

        {/* ── FILL AREAS ─────────────────────────────────────── */}
        {/* Gap = pure insurance (white tint) */}
        <path d={GAP_AREA} fill="rgba(255,255,255,0.02)" opacity={fillOp} />
        {/* Cash value area (olive tint) */}
        <path d={CV_AREA}  fill="rgba(99,132,121,0.09)"  opacity={fillOp} />

        {/* ── GHOST TRACKS ───────────────────────────────────── */}
        <path d={DB_PATH} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d={CV_PATH} stroke="rgba(99,132,121,0.06)"  strokeWidth="1" />

        {/* ── DEATH BENEFIT — animated draw ──────────────────── */}
        <path
          d={DB_PATH}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.3"
          pathLength="1" strokeDasharray="1"
          strokeDashoffset={1 - dbP}
          strokeLinecap="round"
        />

        {/* ── CASH VALUE — animated draw ─────────────────────── */}
        <path
          d={CV_PATH}
          stroke="#638479"
          strokeWidth="1.7"
          pathLength="1" strokeDasharray="1"
          strokeDashoffset={1 - cvP}
          strokeLinecap="round"
        />

        {/* ── LABELS (fade in after lines drawn) ─────────────── */}
        <g opacity={labelOp} style={{ transition: "opacity 0.2s linear" }}>

          {/* DEATH BENEFIT — anchored left, ABOVE the line (line is at y=30) */}
          <text x="56" y="22" fontSize="7.5"
            fill="rgba(255,255,255,0.50)"
            fontFamily="Inter, sans-serif" letterSpacing="0.13em">
            DEATH BENEFIT
          </text>

          {/* CASH VALUE — anchored left, BELOW the curve's starting y (curve starts at y=258) */}
          <text x="56" y="287" fontSize="7.5"
            fill="rgba(99,132,121,0.85)"
            fontFamily="Inter, sans-serif" letterSpacing="0.13em">
            CASH VALUE
          </text>

          {/* PURE INSURANCE label — centered in the gap at Yr 15 (x=258)
              Gap spans y=30 to y=114 → midpoint y=72. Label at y=68 is clearly inside. */}
          <text x="256" y="65" fontSize="6.5"
            fill="rgba(255,255,255,0.22)"
            fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing="0.1em">
            PURE INSURANCE ↓
          </text>

          {/* TODAY marker — at Yr 10 on the cash value curve (x=195, y≈150) */}
          <circle cx={TODAY_X} cy={TODAY_Y} r="3" fill="#638479" opacity="0.9" />
          <line
            x1={TODAY_X} y1={TODAY_Y - 5}
            x2={TODAY_X} y2={TODAY_Y - 26}
            stroke="rgba(99,132,121,0.45)" strokeWidth="0.8" strokeDasharray="2 2"
          />
          <text x={TODAY_X + 5} y={TODAY_Y - 28} fontSize="6.5"
            fill="rgba(99,132,121,0.7)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">
            TODAY
          </text>
        </g>
      </svg>
    </div>
  );
}
