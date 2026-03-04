"use client";
import { useState, useEffect } from "react";

interface Props {
  lines: string[];
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function TypewriterText({ lines, speed = 38, style, className }: Props) {
  const full = lines.join("\n");
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (count >= full.length) { setDone(true); return; }
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [count, full, speed]);

  // Split back into lines for rendering with <br />
  const rendered = full.slice(0, count);
  const parts = rendered.split("\n");

  return (
    <span className={className} style={style}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
      {!done && (
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "0.85em",
            backgroundColor: "rgba(255,255,255,0.5)",
            marginLeft: "3px",
            verticalAlign: "middle",
            animation: "blink-cursor 0.75s step-end infinite",
          }}
        />
      )}
    </span>
  );
}
