/** Soft blurred ambient orbs that drift slowly — adds warm depth */
export function AmbientOrbs({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const configs = {
    a: [
      { w: "55%", h: "60%", top: "-10%", left: "28%",  color: "rgba(99,132,121,0.055)", anim: "float-a 20s ease-in-out infinite" },
      { w: "35%", h: "40%", top: "55%",  left: "-5%",  color: "rgba(9,35,52,0.10)",     anim: "float-b 26s ease-in-out infinite" },
      { w: "28%", h: "32%", top: "20%",  left: "72%",  color: "rgba(99,132,121,0.04)",  anim: "float-c 18s ease-in-out infinite" },
    ],
    b: [
      { w: "45%", h: "55%", top: "15%",  left: "-8%",  color: "rgba(99,132,121,0.045)", anim: "float-b 22s ease-in-out infinite" },
      { w: "40%", h: "50%", top: "-5%",  left: "58%",  color: "rgba(9,35,52,0.09)",     anim: "float-a 28s ease-in-out infinite" },
    ],
    c: [
      { w: "50%", h: "60%", top: "12%",  left: "22%",  color: "rgba(99,132,121,0.04)",  anim: "float-c 24s ease-in-out infinite" },
      { w: "30%", h: "38%", top: "58%",  left: "62%",  color: "rgba(9,35,52,0.08)",     anim: "float-a 19s ease-in-out infinite" },
    ],
  };

  return (
    <>
      {configs[variant].map((orb, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(ellipse, ${orb.color} 0%, transparent 70%)`,
            animation: orb.anim,
            pointerEvents: "none",
            filter: "blur(2px)",
          }}
        />
      ))}
    </>
  );
}

/** Horizontal scan line that sweeps top → bottom */
export function ScanLine({
  color = "rgba(99,132,121,0.10)",
  duration = "14s",
}: {
  color?: string;
  duration?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: "1px",
        background: `linear-gradient(90deg, transparent 0%, ${color} 15%, ${color} 85%, transparent 100%)`,
        animation: `scan-line ${duration} linear infinite`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
