"use client";
import { useEffect, useRef, useState } from "react";

// Scroll-animated whole life policy illustration.
//
// What it shows:
//   White rising curve = Death Benefit (starts at $1M face, grows via dividends
//                        and paid-up additions to ~$1.15M by Yr 30)
//   Olive rising curve = Cash Value (grows from ~$40k at Yr 1 → ~$750k at Yr 30,
//                        reaching ~65% of death benefit as the policy matures)
//
// The gap between them = "pure insurance" element, which shrinks over time.
//
// Data anchors (normalized, typical participating whole life with PUAs):
//   Yr  1: DB ≈ $1.00M  CV ≈  $40k  (~4% of DB)
//   Yr  8: DB ≈ $1.04M  CV ≈ $200k  (~19% of DB)
//   Yr 15: DB ≈ $1.08M  CV ≈ $400k  (~37% of DB)
//   Yr 22: DB ≈ $1.12M  CV ≈ $570k  (~51% of DB)
//   Yr 30: DB ≈ $1.15M  CV ≈ $750k  (~65% of DB)
//
// Chart geometry:
//   viewBox  500 × 320
//   Y-axis   x = 52    ($0 at y=270, $1.2M at y=30, scale: 240px / $1.2M)
//   X-axis   y = 270   (Yr 1 at x=52, Yr 30 at x=478)
//   Chart area x=[52,478], y=[30,270]

// Death benefit: gentle rising curve from $1M (y=70) to $1.15M (y=40)
const DB_PATH =
  "M 52,70 C 90,69 130,63 155,62 " +
  "C 185,61 230,55 258,54 " +
  "C 294,53 332,49 361,48 " +
  "C 400,46 444,41 478,40";

// Cash value: steeper rising curve from $40k (y=262) to $750k (y=120)
const CV_PATH =
  "M 52,262 C 90,258 128,234 155,230 " +
  "C 185,225 225,195 258,190 " +
  "C 294,185 330,158 361,154 " +
  "C 400,148 442,123 478,120";

// Fill area under cash value (olive tint = "your capital")
const CV_AREA =
  "M 52,262 C 90,258 128,234 155,230 " +
  "C 185,225 225,195 258,190 " +
  "C 294,185 330,158 361,154 " +
  "C 400,148 442,123 478,120 L 478,270 L 52,270 Z";

// Gap area: DB path forward → connect to CV end → reverse CV path → close
const GAP_AREA =
  "M 52,70 C 90,69 130,63 155,62 " +
  "C 185,61 230,55 258,54 " +
  "C 294,53 332,49 361,48 " +
  "C 400,46 444,41 478,40 " +
  "L 478,120 " +
  "C 442,123 400,148 361,154 " +
  "C 330,158 294,185 258,190 " +
  "C 225,195 185,225 155,230 " +
  "C 128,234 90,258 52,262 Z";

// Y-axis grid lines and labels ($1.2M scale, 240px / $1.2M)
const Y_TICKS = [
  { y: 30,  label: "$1.2M" },
  { y: 90,  label: "$900k" },
  { y: 150, label: "$600k" },
  { y: 210, label: "$300k" },
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

// "TODAY" marker sits at ~Yr 10 on the CV curve.
// CV segment 2: (155,230)→(258,190), CPs (185,225)(225,195).
// At t≈0.29 → x≈184, y≈220. Verified via cubic bezier evaluation.
const TODAY_X = 184;
const TODAY_Y = 220;

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

          {/* Inline legend — top-left of chart area, above the DB line (y≈70 at this x).
              DB line is at y≈70, so placing legend at y=36/52 gives clear separation. */}
          {/* Death benefit legend row */}
          <line x1="60" y1="36" x2="80" y2="36"
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
          <text x="85" y="40" fontSize="7"
            fill="rgba(255,255,255,0.5)"
            fontFamily="Inter, sans-serif" letterSpacing="0.12em">
            DEATH BENEFIT
          </text>

          {/* Cash value legend row */}
          <line x1="60" y1="52" x2="80" y2="52"
            stroke="#638479" strokeWidth="1.7" />
          <text x="85" y="56" fontSize="7"
            fill="rgba(99,132,121,0.85)"
            fontFamily="Inter, sans-serif" letterSpacing="0.12em">
            CASH VALUE
          </text>

          {/* TODAY marker — verified on CV curve at (184, 220) */}
          <circle cx={TODAY_X} cy={TODAY_Y} r="3" fill="#638479" opacity="0.9" />
          <line
            x1={TODAY_X} y1={TODAY_Y - 5}
            x2={TODAY_X} y2={TODAY_Y - 22}
            stroke="rgba(99,132,121,0.45)" strokeWidth="0.8" strokeDasharray="2 2"
          />
          <text x={TODAY_X + 5} y={TODAY_Y - 25} fontSize="6.5"
            fill="rgba(99,132,121,0.7)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">
            TODAY
          </text>
        </g>
      </svg>
    </div>
  );
}
