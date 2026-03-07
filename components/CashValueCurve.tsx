"use client";
import { useEffect, useRef, useState } from "react";

// Scroll-animated policy illustration:
//   White line  — death benefit (flat, stable at top)
//   Olive line  — cash value (grows exponentially, converges to death benefit by yr 30)
//
// The visual story: over time, more and more of the policy's value is YOUR
// accumulated capital (not insurance cost). The gap shrinks as cash value rises.

const DB_PATH  = "M 32,28 L 368,28"; // death benefit — flat
const CV_PATH  = // cash value — slow start, then accelerating upward
  "M 32,272 C 72,271 120,265 170,250 C 220,233 270,200 310,152 C 335,122 352,84 368,28";

// Area fills
const CV_AREA  =
  "M 32,272 C 72,271 120,265 170,250 C 220,233 270,200 310,152 C 335,122 352,84 368,28 L 368,290 L 32,290 Z";
const GAP_AREA =
  "M 32,28 L 368,28 L 368,28 C 352,84 335,122 310,152 C 270,200 220,233 170,250 C 120,265 72,271 32,272 Z";

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

  const cvP      = Math.min(1, progress / 0.95);
  const dbP      = Math.min(1, progress / 0.72);
  const fillOp   = Math.min(1, Math.max(0, (progress - 0.05) / 0.6));
  const labelOp  = Math.min(1, Math.max(0, (progress - 0.80) / 0.2));

  // Year axis: Yr 1, Yr 8, Yr 15, Yr 22, Yr 30
  const yearTicks = [
    { x: 32,  label: "Yr 1"  },
    { x: 121, label: "Yr 8"  },
    { x: 200, label: "Yr 15" },
    { x: 279, label: "Yr 22" },
    { x: 368, label: "Yr 30" },
  ];

  return (
    <div ref={ref} style={{ width: "100%", height: "100%", minHeight: "480px" }}>
      <svg
        viewBox="0 0 400 330"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        {/* Horizontal grid lines */}
        {[80, 150, 210, 272].map((y) => (
          <line key={y}
            x1="32" y1={y} x2="368" y2={y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="5 5"
          />
        ))}

        {/* Year axis */}
        <line x1="32" y1="290" x2="368" y2="290" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        {yearTicks.map(({ x, label }) => (
          <g key={x}>
            <line x1={x} y1="290" x2={x} y2="296" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
            <text x={x} y="310" fontSize="7" fill="rgba(255,255,255,0.28)"
              fontFamily="Inter, sans-serif" letterSpacing="0.08em" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}

        {/* Ghost tracks */}
        <path d={DB_PATH} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d={CV_PATH} stroke="rgba(99,132,121,0.07)" strokeWidth="1" />

        {/* Gap area (insurance cost portion — faint white) */}
        <path d={GAP_AREA}
          fill="rgba(255,255,255,0.018)"
          opacity={fillOp}
        />

        {/* Cash value area fill (olive tint) */}
        <path d={CV_AREA}
          fill="rgba(99,132,121,0.07)"
          opacity={fillOp}
        />

        {/* Death benefit line — animated draw */}
        <path
          d={DB_PATH}
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="1.2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - dbP}
          strokeLinecap="round"
        />

        {/* Cash value line — animated draw */}
        <path
          d={CV_PATH}
          stroke="#638479"
          strokeWidth="1.6"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - cvP}
          strokeLinecap="round"
        />

        {/* End-state labels — fade in when lines finish drawing */}
        <g opacity={labelOp} style={{ transition: "opacity 0.18s linear" }}>

          {/* Death benefit label */}
          <text x="36" y="20" fontSize="7" fill="rgba(255,255,255,0.4)"
            fontFamily="Inter, sans-serif" letterSpacing="0.13em">
            DEATH BENEFIT
          </text>

          {/* "Insurance cost" brace label — mid-chart, right side */}
          <text x="346" y="142" fontSize="6.5" fill="rgba(255,255,255,0.2)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em" textAnchor="end">
            INSURANCE
          </text>
          <text x="346" y="152" fontSize="6.5" fill="rgba(255,255,255,0.2)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em" textAnchor="end">
            COST ↑
          </text>

          {/* Cash value label + attributes */}
          <text x="36" y="280" fontSize="7" fill="rgba(99,132,121,0.85)"
            fontFamily="Inter, sans-serif" letterSpacing="0.13em">
            CASH VALUE — YOURS
          </text>

          {/* "Today" marker around year 10 (x≈140, y≈258 on CV path) */}
          <circle cx="148" cy="254" r="3" fill="#638479" opacity="0.85" />
          <line x1="148" y1="254" x2="148" y2="234"
            stroke="rgba(99,132,121,0.45)" strokeWidth="0.75" strokeDasharray="2 2" />
          <text x="151" y="231" fontSize="6.5" fill="rgba(99,132,121,0.65)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">
            TODAY
          </text>

          {/* Attributes along curve */}
          <text x="78"  y="268" fontSize="6" fill="rgba(99,132,121,0.45)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">GUARANTEED</text>
          <text x="190" y="244" fontSize="6" fill="rgba(99,132,121,0.45)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">TAX-FREE</text>
          <text x="282" y="196" fontSize="6" fill="rgba(99,132,121,0.45)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">LIQUID</text>
        </g>
      </svg>
    </div>
  );
}
