const VW = 1440;
const VH = 900;
const CX = VW * 0.65;
const CY = VH * 0.50;

// Logarithmically-spaced radii — gaps widen outward, suggesting compounding growth
const RINGS = [22, 45, 75, 112, 158, 215, 280, 355, 440];
const OUTER_R = RINGS[RINGS.length - 1];
const NUM_TICKS = 24;

function toRad(deg: number) { return (deg * Math.PI) / 180; }

export default function VaultRingsHero() {
  // Tick marks on the outermost ring
  const ticks = Array.from({ length: NUM_TICKS }, (_, i) => {
    const angle = (i / NUM_TICKS) * Math.PI * 2;
    const isLong = i % 6 === 0;
    const innerR = OUTER_R - (isLong ? 22 : 10);
    return {
      x1: CX + Math.cos(angle) * innerR,
      y1: CY + Math.sin(angle) * innerR,
      x2: CX + Math.cos(angle) * OUTER_R,
      y2: CY + Math.sin(angle) * OUTER_R,
    };
  });

  // 3 radial lines at 120° apart — vault bolt pattern
  const radials = [90, 210, 330].map((deg) => {
    const a = toRad(deg);
    return {
      x1: CX + Math.cos(a) * RINGS[1],
      y1: CY + Math.sin(a) * RINGS[1],
      x2: CX + Math.cos(a) * RINGS[RINGS.length - 2],
      y2: CY + Math.sin(a) * RINGS[RINGS.length - 2],
    };
  });

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        {/* Fade from left so rings don't compete with hero text */}
        <linearGradient id="vaultFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#050505" stopOpacity="1" />
          <stop offset="38%" stopColor="#050505" stopOpacity="0" />
        </linearGradient>
        <mask id="vaultMask">
          <rect x="0" y="0" width={VW} height={VH} fill="white" />
          <rect x="0" y="0" width={VW} height={VH} fill="url(#vaultFade)" />
        </mask>
      </defs>

      <g opacity="0.09" mask="url(#vaultMask)">
        {/* Concentric rings */}
        {RINGS.map((r, i) => (
          <circle
            key={i}
            cx={CX} cy={CY} r={r}
            fill="none"
            stroke="white"
            strokeWidth={i === RINGS.length - 1 ? 0.7 : 0.5}
          />
        ))}

        {/* Tick marks on outer ring */}
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="white" strokeWidth="0.6" />
        ))}

        {/* Vault bolt radials */}
        {radials.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke="white" strokeWidth="0.4" />
        ))}

        {/* Center hub */}
        <circle cx={CX} cy={CY} r={8} fill="none" stroke="white" strokeWidth="0.4" />
        <circle cx={CX} cy={CY} r={2.5} fill="white" opacity="0.5" />
      </g>
    </svg>
  );
}
