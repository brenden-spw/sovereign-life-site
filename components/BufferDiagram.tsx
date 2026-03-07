// Before/After comparison diagrams for the SAFE Method page
// Shows "Without Buffer" (portfolio depleted by forced withdrawals) vs
// "With Buffer" (portfolio left to recover; buffer absorbs income during downturns)

function ChartLabel({ x, y, text, opacity = 0.4 }: { x: number; y: number; text: string; opacity?: number }) {
  return (
    <text
      x={x} y={y}
      fontSize="6.5"
      fill={`rgba(255,255,255,${opacity})`}
      fontFamily="Inter, sans-serif"
      letterSpacing="0.1em"
      textAnchor="middle"
    >
      {text}
    </text>
  );
}

export function WithoutBufferDiagram() {
  // Portfolio path — starts healthy, each forced withdrawal during a downturn
  // permanently cripples it. Final path approaches zero by year ~13.
  const portfolioPath =
    "M 0,28 C 14,24 22,20 36,22 C 48,24 54,28 64,55 " +
    "C 72,78 76,88 88,82 C 100,76 106,68 118,72 " +
    "C 130,76 136,92 150,118 C 162,138 168,145 182,150 " +
    "C 194,155 198,160 212,175 C 224,188 228,196 244,204 " +
    "C 258,210 268,213 290,216 C 308,218 322,219 340,220";

  // Shaded area under portfolio line → red tint suggesting depletion
  const portfolioArea =
    portfolioPath + " L 340,228 L 0,228 Z";

  // Down-market bands (vertical shaded regions)
  const downBands = [
    { x: 56, w: 36 },   // downturn 1
    { x: 140, w: 32 },  // downturn 2
    { x: 202, w: 30 },  // downturn 3
    { x: 268, w: 36 },  // downturn 4
  ];

  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }} aria-hidden="true">

      {/* Down-market bands */}
      {downBands.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={220}
          fill="rgba(255,80,80,0.055)" />
      ))}

      {/* Grid lines */}
      {[55, 110, 165].map((y) => (
        <line key={y} x1={0} y1={y} x2={340} y2={y}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}

      {/* Portfolio area fill */}
      <path d={portfolioArea} fill="rgba(255,255,255,0.03)" />

      {/* Portfolio line */}
      <path d={portfolioPath}
        stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* Withdrawal arrows at each downturn — forced income taken from portfolio */}
      {[
        { cx: 72, cy: 65 },
        { cx: 156, cy: 128 },
        { cx: 218, cy: 178 },
        { cx: 282, cy: 210 },
      ].map((pt, i) => (
        <g key={i}>
          <line x1={pt.cx} y1={pt.cy - 12} x2={pt.cx} y2={pt.cy + 2}
            stroke="rgba(255,80,80,0.7)" strokeWidth="0.85"
            markerEnd="url(#arrow-red)" />
          <circle cx={pt.cx} cy={pt.cy} r="2.5"
            fill="rgba(255,80,80,0.6)" />
        </g>
      ))}

      <defs>
        <marker id="arrow-red" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4 Z" fill="rgba(255,80,80,0.7)" />
        </marker>
      </defs>

      {/* Zero line */}
      <line x1={0} y1={220} x2={340} y2={220}
        stroke="rgba(255,80,80,0.25)" strokeWidth="1" strokeDasharray="4 3" />

      {/* Year axis labels */}
      <ChartLabel x={0}   y={233} text="Yr 0" />
      <ChartLabel x={85}  y={233} text="Yr 4" />
      <ChartLabel x={170} y={233} text="Yr 8" />
      <ChartLabel x={255} y={233} text="Yr 12" />
      <ChartLabel x={340} y={233} text="Yr 16" />

      {/* Y-axis labels */}
      <ChartLabel x={-10} y={31}  text="$1M" opacity={0.3} />
      <ChartLabel x={-10} y={113} text="$500k" opacity={0.3} />
      <ChartLabel x={-10} y={222} text="$0" opacity={0.3} />

      {/* "Forced withdrawal" label */}
      <text x={170} y={12} fontSize="6" fill="rgba(255,80,80,0.55)"
        fontFamily="Inter, sans-serif" letterSpacing="0.12em" textAnchor="middle">
        INCOME DRAWN FROM PORTFOLIO IN DOWN YEARS
      </text>
    </svg>
  );
}

export function WithBufferDiagram() {
  // Portfolio path — same market conditions but never touched during downturns.
  // It dips with market but recovers. Ends strong.
  const portfolioPath =
    "M 0,28 C 14,24 22,20 36,22 C 48,24 54,28 64,52 " +
    "C 72,64 78,56 90,44 C 102,34 110,28 124,24 " +
    "C 138,20 144,26 156,46 C 166,60 172,50 186,36 " +
    "C 198,24 206,18 220,20 C 232,22 238,32 250,50 " +
    "C 260,62 266,52 280,38 C 296,24 312,18 340,14";

  const portfolioArea =
    portfolioPath + " L 340,228 L 0,228 Z";

  // Buffer line — sits at ~$600k, drawn from during downturns (slight dips),
  // topped back up during good years. Stays in a stable band.
  const bufferPath =
    "M 0,148 C 20,146 36,144 56,148 C 70,151 76,156 90,155 " +
    "C 106,154 114,148 130,145 C 146,142 152,146 166,152 " +
    "C 178,157 184,156 198,153 C 212,150 218,145 232,142 " +
    "C 246,139 252,143 268,149 C 280,153 286,152 300,149 " +
    "C 314,146 324,143 340,140";

  const bufferArea =
    bufferPath + " L 340,228 L 0,228 Z";

  const downBands = [
    { x: 56, w: 36 },
    { x: 140, w: 32 },
    { x: 202, w: 30 },
    { x: 268, w: 36 },
  ];

  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }} aria-hidden="true">

      {/* Down-market bands */}
      {downBands.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={220}
          fill="rgba(99,132,121,0.04)" />
      ))}

      {/* Grid lines */}
      {[55, 110, 165].map((y) => (
        <line key={y} x1={0} y1={y} x2={340} y2={y}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}

      {/* Buffer area fill */}
      <path d={bufferArea} fill="rgba(99,132,121,0.07)" />

      {/* Portfolio area fill */}
      <path d={portfolioArea} fill="rgba(255,255,255,0.025)" />

      {/* Buffer line */}
      <path d={bufferPath}
        stroke="#638479" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="3 2" />

      {/* Portfolio line */}
      <path d={portfolioPath}
        stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* Buffer withdrawal indicators — small arrows pulling from buffer, NOT portfolio */}
      {[
        { bx: 74, by: 154 },
        { bx: 156, by: 151 },
        { bx: 217, by: 152 },
        { bx: 280, by: 150 },
      ].map((pt, i) => (
        <g key={i}>
          <line x1={pt.bx} y1={pt.by - 12} x2={pt.bx} y2={pt.by + 2}
            stroke="rgba(99,132,121,0.8)" strokeWidth="0.85"
            markerEnd="url(#arrow-olive)" />
          <circle cx={pt.bx} cy={pt.by} r="2.5"
            fill="#638479" opacity={0.7} />
        </g>
      ))}

      <defs>
        <marker id="arrow-olive" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4 Z" fill="rgba(99,132,121,0.8)" />
        </marker>
      </defs>

      {/* Zero line */}
      <line x1={0} y1={220} x2={340} y2={220}
        stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Year axis labels */}
      <ChartLabel x={0}   y={233} text="Yr 0" />
      <ChartLabel x={85}  y={233} text="Yr 4" />
      <ChartLabel x={170} y={233} text="Yr 8" />
      <ChartLabel x={255} y={233} text="Yr 12" />
      <ChartLabel x={340} y={233} text="Yr 16" />

      {/* Y-axis labels */}
      <ChartLabel x={-10} y={31}  text="$1M" opacity={0.3} />
      <ChartLabel x={-10} y={113} text="$500k" opacity={0.3} />
      <ChartLabel x={-10} y={152} text="Buffer" opacity={0.5} />

      {/* Legend labels */}
      <g transform="translate(210,10)">
        <line x1={0} y1={4} x2={16} y2={4} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
        <text x={20} y={7} fontSize="6" fill="rgba(255,255,255,0.4)"
          fontFamily="Inter, sans-serif" letterSpacing="0.1em">PORTFOLIO</text>
      </g>
      <g transform="translate(275,10)">
        <line x1={0} y1={4} x2={16} y2={4} stroke="#638479" strokeWidth="1.2" strokeDasharray="3 2" />
        <text x={20} y={7} fontSize="6" fill="rgba(99,132,121,0.7)"
          fontFamily="Inter, sans-serif" letterSpacing="0.1em">BUFFER</text>
      </g>

      {/* "Income drawn from buffer" label */}
      <text x={170} y={12} fontSize="6" fill="rgba(99,132,121,0.6)"
        fontFamily="Inter, sans-serif" letterSpacing="0.12em" textAnchor="middle">
        INCOME DRAWN FROM BUFFER IN DOWN YEARS
      </text>
    </svg>
  );
}
