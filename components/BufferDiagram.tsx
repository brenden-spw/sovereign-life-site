// Before/After buffer diagrams — SAFE Method page
//
// Based on real sequence-of-returns math:
//   - $1M starting portfolio, $60k/year income (6% distribution)
//   - Markets: UP years = +12%, DOWN years = -25%
//   - Pattern: up, up, DOWN, up, DOWN, up, DOWN, up, DOWN, up, DOWN, up, DOWN, up, up
//   - WITHOUT buffer: income taken from portfolio every year → depleted by year 13
//   - WITH buffer:    income drawn from $360k buffer during 6 down years →
//                    portfolio only suffers market loss, recovers each up year
//
// All labels are in HTML in the parent component — SVGs are chart-only.

// ── Chart geometry ───────────────────────────────────────────────────────────
// viewBox: 0 0 400 278
// Chart area: x=38..390, y=18..248
// Scale: $1.2M maps to 230px height → y = 248 - (value / 1_200_000) * 230
// X axis: 16 points over 15 years → x = 38 + (year / 15) * 352

function y(value: number): number {
  return +(248 - (value / 1_200_000) * 230).toFixed(1);
}
function x(year: number): number {
  return +(38 + (year / 15) * 352).toFixed(1);
}

// ── WITHOUT BUFFER — portfolio year-by-year ──────────────────────────────────
// yr 0-2: growth phase. yr 3,5,7,9,11,13: down market + forced withdrawal.
const WITHOUT_PTS: [number, number][] = [
  [0,  1_000_000],  // yr 0  start
  [1,  1_060_000],  // yr 1  +12% - $60k
  [2,  1_127_000],  // yr 2  +12% - $60k
  [3,    785_000],  // yr 3  DOWN: -25% - $60k = $785k
  [4,    819_000],  // yr 4  +12% - $60k
  [5,    554_000],  // yr 5  DOWN: -25% - $60k
  [6,    561_000],  // yr 6  +12% - $60k
  [7,    361_000],  // yr 7  DOWN: -25% - $60k
  [8,    344_000],  // yr 8  +12% - $60k (barely recovering)
  [9,    198_000],  // yr 9  DOWN: -25% - $60k
  [10,   162_000],  // yr 10 +12% - $60k
  [11,    62_000],  // yr 11 DOWN: -25% - $60k
  [12,     9_000],  // yr 12 +12% - $60k → nearly zero
  [13,         0],  // yr 13 DOWN: depleted — buffer empty, must stop withdrawals
  [14,         0],
  [15,         0],
];

// ── WITH BUFFER — portfolio & buffer year-by-year ────────────────────────────
// Buffer starts at $360k (6 yrs × $60k). During DOWN years, income comes from
// the buffer — portfolio only suffers market loss, not income withdrawal.
const WITH_PORT_PTS: [number, number][] = [
  [0,  1_000_000],
  [1,  1_060_000],
  [2,  1_127_000],
  [3,    845_000],  // yr 3 DOWN: -25% only (no withdrawal from portfolio)
  [4,    887_000],  // yr 4 +12% - $60k
  [5,    665_000],  // yr 5 DOWN: -25% only
  [6,    685_000],  // yr 6 +12% - $60k
  [7,    514_000],  // yr 7 DOWN: -25% only
  [8,    516_000],  // yr 8 +12% - $60k
  [9,    387_000],  // yr 9 DOWN: -25% only
  [10,   373_000],  // yr 10 +12% - $60k
  [11,   280_000],  // yr 11 DOWN: -25% only
  [12,   254_000],  // yr 12 +12% - $60k
  [13,   191_000],  // yr 13 DOWN: -25% only (buffer now empty)
  [14,   154_000],  // yr 14 +12% - $60k
  [15,   113_000],  // yr 15 +12% - $60k → still has capital
];

// Buffer steps DOWN during each down year (6 down years × $60k = $360k total drawn)
const WITH_BUF_PTS: [number, number][] = [
  [0,  360_000],
  [1,  360_000],
  [2,  360_000],
  [3,  300_000],  // DOWN — drew $60k
  [4,  300_000],
  [5,  240_000],  // DOWN — drew $60k
  [6,  240_000],
  [7,  180_000],  // DOWN — drew $60k
  [8,  180_000],
  [9,  120_000],  // DOWN — drew $60k
  [10, 120_000],
  [11,  60_000],  // DOWN — drew $60k
  [12,  60_000],
  [13,      0],   // DOWN — drew final $60k → buffer exhausted
  [14,      0],
  [15,      0],
];

function toPath(pts: [number, number][]): string {
  return pts.map(([yr, val], i) => `${i === 0 ? "M" : "L"} ${x(yr)},${y(val)}`).join(" ");
}

function toAreaPath(pts: [number, number][], floor: number): string {
  const line = pts.map(([yr, val]) => `${x(yr)},${y(val)}`).join(" L ");
  return `M ${line} L ${x(15)},${y(floor)} L ${x(0)},${y(floor)} Z`;
}

// ── Grid & axes helpers ───────────────────────────────────────────────────────
const Y_GRID = [0, 250_000, 500_000, 750_000, 1_000_000];
const DOWN_YEARS = [3, 5, 7, 9, 11, 13];

function ChartBase({ showBufferZone = false }: { showBufferZone?: boolean }) {
  return (
    <>
      {/* Down-year bands */}
      {DOWN_YEARS.map((yr) => (
        <rect
          key={yr}
          x={x(yr) - 10} y="18" width="20" height="230"
          fill={showBufferZone ? "rgba(99,132,121,0.04)" : "rgba(255,80,80,0.05)"}
        />
      ))}

      {/* Y-axis grid */}
      {Y_GRID.map((val) => (
        <g key={val}>
          <line
            x1="38" y1={y(val)} x2="390" y2={y(val)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="0.75"
          />
          <text
            x="34" y={y(val) + 2.5}
            fontSize="6.5" textAnchor="end"
            fill="rgba(255,255,255,0.25)"
            fontFamily="Inter, sans-serif"
          >
            {val === 0 ? "$0" : val === 1_000_000 ? "$1M" : `$${val / 1_000}k`}
          </text>
        </g>
      ))}

      {/* X-axis */}
      <line x1="38" y1="248" x2="390" y2="248" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
      {[0, 3, 6, 9, 12, 15].map((yr) => (
        <g key={yr}>
          <line x1={x(yr)} y1="248" x2={x(yr)} y2="253" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
          <text
            x={x(yr)} y="263"
            fontSize="6.5" textAnchor="middle"
            fill="rgba(255,255,255,0.28)"
            fontFamily="Inter, sans-serif" letterSpacing="0.06em"
          >
            Yr {yr}
          </text>
        </g>
      ))}

      {/* Zero baseline */}
      <line x1="38" y1={y(0)} x2="390" y2={y(0)} stroke="rgba(255,255,255,0.08)" strokeWidth="0.75" />
    </>
  );
}

// ── WITHOUT BUFFER ────────────────────────────────────────────────────────────
export function WithoutBufferDiagram() {
  const portfolioPath = toPath(WITHOUT_PTS);
  const areaPath      = toAreaPath(WITHOUT_PTS, 0);

  return (
    <svg
      viewBox="0 0 400 278"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <ChartBase />

      {/* Area fill under portfolio line */}
      <path d={areaPath} fill="rgba(255,80,80,0.04)" />

      {/* Portfolio line */}
      <path
        d={portfolioPath}
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Forced-withdrawal markers at each down year */}
      {[3, 5, 7, 9, 11, 12].map((yr) => {
        const val = WITHOUT_PTS[yr][1];
        return (
          <circle
            key={yr}
            cx={x(yr)} cy={y(val)}
            r="3"
            fill="rgba(255,80,80,0.75)"
            stroke="rgba(255,80,80,0.35)"
            strokeWidth="3"
          />
        );
      })}

      {/* "DEPLETED" callout at yr 13 */}
      <g>
        <line
          x1={x(13)} y1={y(0) - 4}
          x2={x(13)} y2={y(0) - 20}
          stroke="rgba(255,80,80,0.45)" strokeWidth="0.85"
        />
        <text
          x={x(13)} y={y(0) - 24}
          fontSize="6.5" textAnchor="middle"
          fill="rgba(255,80,80,0.6)"
          fontFamily="Inter, sans-serif" letterSpacing="0.1em"
        >
          DEPLETED
        </text>
      </g>
    </svg>
  );
}

// ── WITH BUFFER ───────────────────────────────────────────────────────────────
export function WithBufferDiagram() {
  const portPath   = toPath(WITH_PORT_PTS);
  const portArea   = toAreaPath(WITH_PORT_PTS, 0);
  const bufPath    = toPath(WITH_BUF_PTS);
  const bufArea    = toAreaPath(WITH_BUF_PTS, 0);

  return (
    <svg
      viewBox="0 0 400 278"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <ChartBase showBufferZone />

      {/* Buffer area fill */}
      <path d={bufArea}  fill="rgba(99,132,121,0.06)" />

      {/* Portfolio area fill */}
      <path d={portArea} fill="rgba(255,255,255,0.025)" />

      {/* Buffer line — dashed olive staircase */}
      <path
        d={bufPath}
        stroke="#638479"
        strokeWidth="1.1"
        strokeDasharray="4 3"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Portfolio line — solid white */}
      <path
        d={portPath}
        stroke="rgba(255,255,255,0.72)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Buffer withdrawal dots — olive, at each down year on the BUFFER line */}
      {[3, 5, 7, 9, 11, 13].map((yr) => {
        const val = WITH_BUF_PTS[yr][1];
        return (
          <circle
            key={yr}
            cx={x(yr)} cy={y(val)}
            r="3"
            fill="#638479"
            stroke="rgba(99,132,121,0.35)"
            strokeWidth="3"
          />
        );
      })}

      {/* "STILL FUNDED" callout at yr 15 */}
      <g>
        <line
          x1={x(15)} y1={y(113_000) - 4}
          x2={x(15)} y2={y(113_000) - 22}
          stroke="rgba(99,132,121,0.55)" strokeWidth="0.85"
        />
        <text
          x={x(15) - 2} y={y(113_000) - 26}
          fontSize="6.5" textAnchor="end"
          fill="rgba(99,132,121,0.7)"
          fontFamily="Inter, sans-serif" letterSpacing="0.1em"
        >
          STILL FUNDED
        </text>
      </g>
    </svg>
  );
}
