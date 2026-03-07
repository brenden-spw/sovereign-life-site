// Hero background — flowing curves converging toward the right edge.
//
// Lines sweep from spread positions on the left to a tight focus area
// on the right, creating a sense of direction and intentional convergence.
//
// Design: curves are dimmest at top/bottom edges, brightest in the center
// band. Two olive accent lines add subtle color. Two groups breathe in
// alternating phase for gentle motion.

const N = 30;
const FOCUS_X = 1400;
const FOCUS_Y = 300;

const CURVES = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1);

  // Start: spread vertically along left edge
  const startY = -40 + t * 680;

  // End: converge toward focus area (15% of original spread retained)
  const endY = FOCUS_Y + (startY - FOCUS_Y) * 0.15;

  // Control points: smooth flowing curves with subtle wave offset
  const midY = startY + (endY - startY) * 0.5;
  const wave = Math.sin(t * Math.PI * 2.5) * 35;
  const cp1y = startY + (midY - startY) * 0.65 + wave;
  const cp2y = endY + (midY - endY) * 0.25 - wave * 0.4;

  // Opacity: brighter in center band, dimmer at top/bottom edges
  const edge = Math.abs(t - 0.5) * 2;
  const opacity = 0.022 + (1 - edge * edge) * 0.058;

  // Olive accent lines near center of the field
  const olive = i === 13 || i === 14;

  return {
    d: `M 0,${startY.toFixed(0)} C 400,${cp1y.toFixed(0)} 1000,${cp2y.toFixed(0)} ${FOCUS_X},${endY.toFixed(0)}`,
    opacity: +opacity.toFixed(4),
    olive,
    group: i % 2,
  };
});

export default function FlowFieldHero() {
  const groupA = CURVES.filter((c) => c.group === 0);
  const groupB = CURVES.filter((c) => c.group === 1);

  return (
    <svg
      viewBox="0 0 1400 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle glow near convergence area */}
        <radialGradient id="ffh-glow" cx="95%" cy="50%" r="35%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Left fade — text readability */}
        <linearGradient id="ffh-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#050505" />
          <stop offset="40%" stopColor="transparent" />
        </linearGradient>

        {/* Bottom fade */}
        <linearGradient id="ffh-btm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>

        {/* Top fade */}
        <linearGradient id="ffh-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050505" />
          <stop offset="15%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Group A — breathe phase 0 */}
      <g style={{ animation: "ray-breathe 12s ease-in-out infinite" }}>
        {groupA.map((c, i) => (
          <path
            key={i}
            d={c.d}
            stroke={c.olive ? "#638479" : "white"}
            strokeWidth={c.olive ? "0.9" : "0.6"}
            opacity={c.olive ? Math.min(0.2, c.opacity * 2) : c.opacity}
            fill="none"
          />
        ))}
      </g>

      {/* Group B — breathe phase offset */}
      <g style={{ animation: "ray-breathe 12s ease-in-out -6s infinite" }}>
        {groupB.map((c, i) => (
          <path
            key={i}
            d={c.d}
            stroke={c.olive ? "#638479" : "white"}
            strokeWidth={c.olive ? "0.9" : "0.6"}
            opacity={c.olive ? Math.min(0.2, c.opacity * 2) : c.opacity}
            fill="none"
          />
        ))}
      </g>

      {/* Convergence glow */}
      <rect width="1400" height="600" fill="url(#ffh-glow)" />

      {/* Fade overlays */}
      <rect width="1400" height="600" fill="url(#ffh-left)" />
      <rect width="1400" height="600" fill="url(#ffh-btm)" />
      <rect width="1400" height="600" fill="url(#ffh-top)" />
    </svg>
  );
}
