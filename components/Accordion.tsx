"use client";
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            style={{
              borderTop: "1px solid #1e1e1e",
              borderBottom: i === items.length - 1 ? "1px solid #1e1e1e" : "none",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "1.75rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                gap: "2rem",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 300,
                  color: "#f5f2ed",
                  letterSpacing: "0.02em",
                  lineHeight: 1.4,
                }}
              >
                {item.question}
              </span>
              <span
                style={{
                  color: "#638479",
                  flexShrink: 0,
                  fontSize: "1.4rem",
                  fontWeight: 200,
                  lineHeight: 1,
                  fontFamily: "'Raleway', sans-serif",
                  display: "inline-block",
                  transition: "transform 0.35s ease",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  width: "1.4rem",
                  textAlign: "center",
                }}
              >
                +
              </span>
            </button>

            {/* CSS grid trick for smooth height animation */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.35s ease",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  className="body-lg"
                  style={{
                    paddingBottom: "1.75rem",
                    color: "#9a9690",
                    margin: 0,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
