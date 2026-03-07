// Hero background — a field of compound growth curves sweeping from lower-left
// to upper-right. Evokes long-term capital accumulation and compounding.
// Layered at varying opacities with CSS float animations for ambient depth.

export default function GrowthFieldHero() {
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
        {/* Left fade — content lives on left, curves emerge from the dark */}
        <linearGradient id="gfh-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#050505" />
          <stop offset="48%" stopColor="transparent" />
        </linearGradient>
        {/* Bottom fade */}
        <linearGradient id="gfh-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="52%" stopColor="transparent" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        {/* Top fade */}
        <linearGradient id="gfh-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#050505" />
          <stop offset="22%" stopColor="transparent" />
        </linearGradient>
        {/* Subtle apex glow where curves converge top-right */}
        <radialGradient id="gfh-apex" cx="90%" cy="22%" r="20%">
          <stop offset="0%"   stopColor="rgba(99,132,121,0.09)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Back layer — very faint, slow float */}
      <g style={{ animation: "float-a 26s ease-in-out infinite" }}>
        <path d="M 0,555 C 480,538 940,400 1400,148" stroke="rgba(255,255,255,0.032)" strokeWidth="0.75" />
        <path d="M 0,592 C 530,570 1000,438 1400,205" stroke="rgba(255,255,255,0.022)" strokeWidth="0.75" />
        <path d="M 0,502 C 450,484 905,356 1400,108" stroke="rgba(255,255,255,0.038)" strokeWidth="0.75" />
        <path d="M 0,468 C 415,450 870,328 1400,078" stroke="rgba(255,255,255,0.025)" strokeWidth="0.6"  />
        <path d="M 0,620 C 580,595 1060,462 1400,255" stroke="rgba(255,255,255,0.018)" strokeWidth="0.6"  />
      </g>

      {/* Mid layer */}
      <g style={{ animation: "float-b 20s ease-in-out infinite" }}>
        <path d="M 0,528 C 465,508 928,375 1400,122" stroke="rgba(255,255,255,0.068)" strokeWidth="0.9" />
        <path d="M 0,565 C 505,542 972,412 1400,168" stroke="rgba(255,255,255,0.055)" strokeWidth="0.9" />
        <path d="M 0,484 C 438,464 892,335 1400,090" stroke="rgba(255,255,255,0.075)" strokeWidth="0.9" />
      </g>

      {/* Featured layer — slightly brighter, one with olive tint */}
      <g style={{ animation: "float-c 16s ease-in-out infinite" }}>
        <path d="M 0,512 C 455,490 915,358 1400,100" stroke="rgba(255,255,255,0.155)" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M 0,548 C 492,524 952,394 1400,145" stroke="rgba(255,255,255,0.095)" strokeWidth="1.0"  strokeLinecap="round" />
        {/* Olive accent — the "SAFE" curve, slightly warmer */}
        <path d="M 0,530 C 474,508 934,376 1400,120" stroke="rgba(99,132,121,0.14)"  strokeWidth="0.9"  strokeLinecap="round" />
      </g>

      {/* Subtle time-axis baseline + tick marks */}
      <line x1="0" y1="574" x2="1400" y2="574" stroke="rgba(255,255,255,0.04)" strokeWidth="0.75" />
      {[0, 156, 311, 467, 622, 778, 933, 1089, 1244, 1400].map((x, i) => (
        <line key={i} x1={x} y1="574" x2={x} y2="581" stroke="rgba(255,255,255,0.055)" strokeWidth="0.75" />
      ))}

      {/* Apex glow */}
      <rect width="1400" height="600" fill="url(#gfh-apex)" />

      {/* Overlay fades */}
      <rect width="1400" height="600" fill="url(#gfh-left)"   />
      <rect width="1400" height="600" fill="url(#gfh-bottom)" />
      <rect width="1400" height="600" fill="url(#gfh-top)"    />
    </svg>
  );
}
