// Hero background — lines converging on an off-screen vanishing point (upper-right,
// outside the SVG viewport). Within the visible frame they appear as structured
// diagonal lines all pointing toward the same invisible destination.
//
// Design intent: conveys direction, precision, and long-term trajectory without
// a visible "starburst" center. The source is implied, not shown.

// Off-screen vanishing point — just outside the upper-right corner
const VX = 1520;
const VY = -118;
const LEN = 2300; // long enough to cross the full viewport from any angle

// Rays sweep from ~102° to ~176° (the angle range that intersects the 1400×600 viewport)
// Higher angles point more left → slightly brighter (cross the content area)
const N = 44;
const START_DEG = 102;
const END_DEG   = 176;

const RAYS = Array.from({ length: N }, (_, i) => {
  const t     = i / (N - 1);
  const deg   = START_DEG + t * (END_DEG - START_DEG);
  const rad   = deg * (Math.PI / 180);
  const cos   = Math.cos(rad);
  const sin   = Math.sin(rad);

  // Opacity rises with angle (left-crossing rays slightly more visible)
  const opacity = 0.026 + t * 0.062;

  // Two olive accent rays around 148°–155° (crossing the lower content area)
  const olive = i === 22 || i === 23;

  // Alternate groups for phase-offset breathing
  return {
    x2: +(VX + cos * LEN).toFixed(1),
    y2: +(VY + sin * LEN).toFixed(1),
    opacity,
    olive,
    group: i % 2,
  };
});

export default function RadialLineHero() {
  const groupA = RAYS.filter((r) => r.group === 0);
  const groupB = RAYS.filter((r) => r.group === 1);

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
        {/* Hint of the off-screen source — very subtle glow in the upper-right */}
        <radialGradient id="rlh-source" cx="110%" cy="-18%" r="38%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.055)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Left fade — keeps hero text readable */}
        <linearGradient id="rlh-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"  stopColor="#050505" />
          <stop offset="40%" stopColor="transparent" />
        </linearGradient>

        {/* Bottom fade */}
        <linearGradient id="rlh-btm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="58%" stopColor="transparent" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>

        {/* Top fade */}
        <linearGradient id="rlh-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#050505" />
          <stop offset="18%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Group A — breathe phase 0 */}
      <g style={{ animation: "ray-breathe 12s ease-in-out infinite" }}>
        {groupA.map((r, i) => (
          <line
            key={i}
            x1={VX} y1={VY}
            x2={r.x2} y2={r.y2}
            stroke={r.olive ? "#638479" : "white"}
            strokeWidth={r.olive ? "0.9" : "0.65"}
            opacity={r.olive ? Math.min(0.22, r.opacity * 2.2) : r.opacity}
          />
        ))}
      </g>

      {/* Group B — breathe phase offset */}
      <g style={{ animation: "ray-breathe 12s ease-in-out -6s infinite" }}>
        {groupB.map((r, i) => (
          <line
            key={i}
            x1={VX} y1={VY}
            x2={r.x2} y2={r.y2}
            stroke={r.olive ? "#638479" : "white"}
            strokeWidth={r.olive ? "0.9" : "0.65"}
            opacity={r.olive ? Math.min(0.22, r.opacity * 2.2) : r.opacity}
          />
        ))}
      </g>

      {/* Implied source glow */}
      <rect width="1400" height="600" fill="url(#rlh-source)" />

      {/* Fade overlays */}
      <rect width="1400" height="600" fill="url(#rlh-left)" />
      <rect width="1400" height="600" fill="url(#rlh-btm)"  />
      <rect width="1400" height="600" fill="url(#rlh-top)"  />
    </svg>
  );
}
