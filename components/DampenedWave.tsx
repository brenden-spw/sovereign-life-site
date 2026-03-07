const VW = 1440;
const VH = 900;

function buildWavePath(
  centerY: number,
  frequency: number,
  maxAmplitude: number,
  phase: number,
  points = 300
): string {
  const parts: string[] = [];
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * VW;
    const t = x / VW;
    // Amplitude grows from 0 on the left → full height on the right
    const amplitude = maxAmplitude * Math.pow(t, 1.8);
    const y = centerY + Math.sin(t * frequency * Math.PI * 2 + phase) * amplitude;
    parts.push(i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `L ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return parts.join(" ");
}

export default function DampenedWave() {
  const centerY = VH * 0.52;
  const mainPath   = buildWavePath(centerY, 3.5, 135, 0);
  const secondPath = buildWavePath(centerY, 3.0,  85, Math.PI * 0.5);
  const thirdPath  = buildWavePath(centerY, 4.2,  55, Math.PI * 1.1);

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        {/* Fade out the left (text area) and far right edge */}
        <linearGradient id="waveFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#050505" stopOpacity="1" />
          <stop offset="22%"  stopColor="#050505" stopOpacity="0" />
          <stop offset="88%"  stopColor="#050505" stopOpacity="0" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.7" />
        </linearGradient>
        <mask id="waveMask">
          <rect x="0" y="0" width={VW} height={VH} fill="white" />
          <rect x="0" y="0" width={VW} height={VH} fill="url(#waveFade)" />
        </mask>
      </defs>

      <g mask="url(#waveMask)">
        {/* Stable flat baseline on the left — the buffer zone */}
        <line
          x1="0" y1={centerY} x2={VW * 0.20} y2={centerY}
          stroke="white" strokeWidth="0.8" opacity="0.14"
        />

        {/* Main dampened wave — grows volatile toward the right */}
        <path d={mainPath} fill="none" stroke="white" strokeWidth="0.7" opacity="0.07" />

        {/* Secondary wave — offset phase, olive accent */}
        <path d={secondPath} fill="none" stroke="#638479" strokeWidth="0.6" opacity="0.06" />

        {/* Tertiary wave — adds noise and complexity */}
        <path d={thirdPath} fill="none" stroke="white" strokeWidth="0.4" opacity="0.04" />
      </g>
    </svg>
  );
}
