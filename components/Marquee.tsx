"use client";

const ITEMS = [
  "Independent Life Insurance",
  "Non-Correlated Capital",
  "Tax-Free Growth",
  "Guaranteed Returns",
  "Volatility Buffer",
  "Structured with Intention",
  "Protected Retirement",
  "Income That Lasts",
];

// Doubled for seamless infinite loop
const DOUBLED = [...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div
      style={{
        borderTop: "1px solid #1e1e1e",
        borderBottom: "1px solid #1e1e1e",
        backgroundColor: "#030303",
        overflow: "hidden",
        height: "2.625rem",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          animation: "marquee 36s linear infinite",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      >
        {DOUBLED.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#6a6760",
                padding: "0 2.25rem",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "#638479",
                fontSize: "0.45rem",
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
