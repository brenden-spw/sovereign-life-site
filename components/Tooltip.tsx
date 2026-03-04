"use client";
import { useState, useRef } from "react";

export default function Tooltip({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({ x: r.left + r.width / 2, y: r.top });
    }
    setVisible(true);
  };

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setVisible(false)}
        style={{
          borderBottom: "1px dotted rgba(99,132,121,0.55)",
          cursor: "help",
          color: "inherit",
        }}
      >
        {term}
      </span>

      {visible && (
        <div
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y - 14,
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
            background: "#111111",
            border: "1px solid rgba(99,132,121,0.18)",
            borderRadius: "2px",
            padding: "0.875rem 1.125rem",
            maxWidth: "260px",
            pointerEvents: "none",
            boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 300,
              color: "#9a9690",
              lineHeight: 1.65,
              fontFamily: "'Raleway', sans-serif",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            {definition}
          </p>
          {/* Downward arrow */}
          <div
            style={{
              position: "absolute",
              bottom: -5,
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 8,
              height: 8,
              background: "#111111",
              borderRight: "1px solid rgba(99,132,121,0.18)",
              borderBottom: "1px solid rgba(99,132,121,0.18)",
            }}
          />
        </div>
      )}
    </>
  );
}
