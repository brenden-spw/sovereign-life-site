"use client";
import { useEffect, useRef, useState } from "react";

// Scroll-animated whole life policy illustration.
// White line  — death benefit (flat, guaranteed face amount).
// Olive line  — cash value (starts near $0, grows exponentially, converges to
//               death benefit by Yr 30 as the policy matures).
//
// The gap between them = "pure insurance cost," which shrinks as your
// accumulated capital takes over more of the policy's total value.
//
// Labels (GUARANTEED, TAX-FREE, etc.) are rendered in HTML by the parent
// to keep the SVG uncluttered and avoid text/curve collisions.

// Anchor points:  (32,272) → (170,250) → (310,152) → (368,28)
// Control points chosen so curve is flat-ish early, then accelerates upward
const DB_PATH = "M 32,28 L 368,28";
const CV_PATH =
  "M 32,272 C 72,271 120,265 170,250 C 220,233 270,200 310,152 C 335,122 352,84 368,28";

// Filled area under cash value curve (olive tint)
const CV_AREA =
  "M 32,272 C 72,271 120,265 170,250 C 220,233 270,200 310,152 C 335,122 352,84 368,28 L 368,282 L 32,282 Z";

// Filled gap between death benefit and cash value (faint white = insurance cost)
const GAP_AREA =
  "M 32,28 L 368,28 L 368,28 C 352,84 335,122 310,152 C 270,200 220,233 170,250 C 120,265 72,271 32,272 Z";

// "Today" sits at ~year 10 on the curve.
// Curve anchor at x=170 has y=250; at x=32 y=272.
// At x=148 (t≈0.84 in first segment) y≈257.
const TODAY_X = 148;
const TODAY_Y = 257;

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
  const fillOp   = Math.min(1, Math.max(0, (progress - 0.05) / 0.65));
  const labelOp  = Math.min(1, Math.max(0, (progress - 0.78) / 0.22));

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
        viewBox="0 0 400 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        {/* Horizontal grid rules */}
        {[80, 150, 210, 272].map((y) => (
          <line key={y}
            x1="32" y1={y} x2="368" y2={y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" strokeDasharray="5 5"
          />
        ))}

        {/* Year axis */}
        <line x1="32" y1="282" x2="368" y2="282"
          stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        {yearTicks.map(({ x, label }) => (
          <g key={x}>
            <line x1={x} y1="282" x2={x} y2="288"
              stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
            <text x={x} y="302" fontSize="7"
              fill="rgba(255,255,255,0.28)"
              fontFamily="Inter, sans-serif" letterSpacing="0.08em"
              textAnchor="middle">
              {label}
            </text>
          </g>
        ))}

        {/* Ghost track paths (shown before animation reaches them) */}
        <path d={DB_PATH} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <path d={CV_PATH} stroke="rgba(99,132,121,0.07)" strokeWidth="1" />

        {/* Insurance cost area (gap between DB and CV) */}
        <path d={GAP_AREA} fill="rgba(255,255,255,0.02)" opacity={fillOp} />

        {/* Cash value accumulated area */}
        <path d={CV_AREA} fill="rgba(99,132,121,0.08)" opacity={fillOp} />

        {/* Death benefit — animated draw left to right */}
        <path
          d={DB_PATH}
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="1.2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - dbP}
          strokeLinecap="round"
        />

        {/* Cash value — animated draw (slow start, fast finish) */}
        <path
          d={CV_PATH}
          stroke="#638479"
          strokeWidth="1.6"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - cvP}
          strokeLinecap="round"
        />

        {/* Labels — fade in after both lines are drawn */}
        <g opacity={labelOp} style={{ transition: "opacity 0.2s linear" }}>

          {/* "DEATH BENEFIT" — top-left, clearly above the line (line is at y=28) */}
          <text x="36" y="19" fontSize="7"
            fill="rgba(255,255,255,0.42)"
            fontFamily="Inter, sans-serif" letterSpacing="0.12em">
            DEATH BENEFIT
          </text>

          {/* "CASH VALUE" — bottom-left, below chart floor (chart ends at y=272, axis at y=282) */}
          <text x="36" y="294" fontSize="7"
            fill="rgba(99,132,121,0.8)"
            fontFamily="Inter, sans-serif" letterSpacing="0.12em">
            CASH VALUE
          </text>

          {/* "INSURANCE COST" label in the gap area, right side.
              At x=285, DB is at y=28, CV curve is at y≈163 (third bezier segment,
              t≈0.57: (1-t)³×152 + 3(1-t)²t×200 + 3(1-t)t²×200 + t³×28 ≈ 110)
              Label at y=72 sits clearly inside the gap. */}
          <text x="362" y="72" fontSize="6.5"
            fill="rgba(255,255,255,0.2)"
            fontFamily="Inter, sans-serif" letterSpacing="0.09em"
            textAnchor="end">
            INSURANCE
          </text>
          <text x="362" y="83" fontSize="6.5"
            fill="rgba(255,255,255,0.2)"
            fontFamily="Inter, sans-serif" letterSpacing="0.09em"
            textAnchor="end">
            COST ↓
          </text>

          {/* "TODAY" marker — anchored on the cash value curve at x=148 */}
          <circle cx={TODAY_X} cy={TODAY_Y} r="2.8" fill="#638479" opacity="0.9" />
          <line
            x1={TODAY_X} y1={TODAY_Y - 5}
            x2={TODAY_X} y2={TODAY_Y - 26}
            stroke="rgba(99,132,121,0.45)" strokeWidth="0.75" strokeDasharray="2 2"
          />
          <text x={TODAY_X + 5} y={TODAY_Y - 28} fontSize="6.5"
            fill="rgba(99,132,121,0.65)"
            fontFamily="Inter, sans-serif" letterSpacing="0.1em">
            TODAY
          </text>
        </g>
      </svg>
    </div>
  );
}
