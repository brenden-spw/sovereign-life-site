// Hero background — 36 radial lines emanating from a focal point (upper-right).
// Structured and precise: every 10°, not random. Two groups breathe out of phase
// for a subtle living quality. Left-pointing rays are slightly brighter to draw
// the eye toward the hero content.

const FOCAL_X = 1085;
const FOCAL_Y = 252;
const LENGTH  = 1320;
const N_RAYS  = 36;

const RAYS = Array.from({ length: N_RAYS }, (_, i) => {
  const angle  = (i / N_RAYS) * Math.PI * 2;
  const cos    = Math.cos(angle);
  const sin    = Math.sin(angle);
  // Left-pointing rays (cos ≈ -1) are brighter; right-pointing (cos ≈ 1) dimmer
  const opacity = Math.max(0.02, 0.068 - 0.04 * cos);
  // Two rays get an olive accent (pointing toward lower-left, into content)
  const olive   = i === 17 || i === 18; // ~170° and ~180°
  return {
    x2: +(FOCAL_X + cos * LENGTH).toFixed(1),
    y2: +(FOCAL_Y + sin * LENGTH).toFixed(1),
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
        {/* Radial glow at the focal origin */}
        <radialGradient
          id="rlh-focal"
          cx={`${(FOCAL_X / 1400) * 100}%`}
          cy={`${(FOCAL_Y / 600) * 100}%`}
          r="28%"
        >
          <stop offset="0%"   stopColor="rgba(255,255,255,0.07)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Left fade — hero text lives here, keep dark */}
        <linearGradient id="rlh-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#050505" />
          <stop offset="42%" stopColor="transparent" />
        </linearGradient>

        {/* Bottom fade */}
        <linearGradient id="rlh-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="transparent" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>

        {/* Top fade */}
        <linearGradient id="rlh-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#050505" />
          <stop offset="20%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Ray group A — breathe phase 0 */}
      <g style={{ animation: "ray-breathe 11s ease-in-out infinite" }}>
        {groupA.map((r, i) => (
          <line
            key={i}
            x1={FOCAL_X} y1={FOCAL_Y}
            x2={r.x2}    y2={r.y2}
            stroke={r.olive ? "#638479" : "white"}
            strokeWidth={r.olive ? "0.85" : "0.65"}
            opacity={r.olive ? r.opacity * 1.5 : r.opacity}
          />
        ))}
      </g>

      {/* Ray group B — breathe phase offset by half period */}
      <g style={{ animation: "ray-breathe 11s ease-in-out -5.5s infinite" }}>
        {groupB.map((r, i) => (
          <line
            key={i}
            x1={FOCAL_X} y1={FOCAL_Y}
            x2={r.x2}    y2={r.y2}
            stroke={r.olive ? "#638479" : "white"}
            strokeWidth={r.olive ? "0.85" : "0.65"}
            opacity={r.olive ? r.opacity * 1.5 : r.opacity}
          />
        ))}
      </g>

      {/* Focal origin — subtle rings */}
      <circle cx={FOCAL_X} cy={FOCAL_Y} r="24"
        stroke="rgba(99,132,121,0.15)" strokeWidth="0.75" />
      <circle cx={FOCAL_X} cy={FOCAL_Y} r="6"
        stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      <circle cx={FOCAL_X} cy={FOCAL_Y} r="1.8"
        fill="rgba(255,255,255,0.45)" />

      {/* Focal radial glow */}
      <rect width="1400" height="600" fill="url(#rlh-focal)" />

      {/* Fade overlays */}
      <rect width="1400" height="600" fill="url(#rlh-left)"   />
      <rect width="1400" height="600" fill="url(#rlh-bottom)" />
      <rect width="1400" height="600" fill="url(#rlh-top)"    />
    </svg>
  );
}
