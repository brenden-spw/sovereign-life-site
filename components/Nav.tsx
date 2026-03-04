"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { href: "/services", label: "Services" },
  { href: "/the-safe-method", label: "The SAFE Method" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* ── HEADER BAR ──────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: "1px solid #1e1e1e",
          backgroundColor: "rgba(5,5,5,0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "5rem",
            width: "100%",
            padding: "0 15px",
            boxSizing: "border-box",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
          >
            <Image src="/logo/brandmark.png" alt="Sovereign Life" width={36} height={36} style={{ objectFit: "contain" }} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.1rem",
                letterSpacing: "0.2em",
                color: "#f5f2ed",
                fontWeight: 300,
              }}
            >
              SOVEREIGN LIFE
            </span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-end",
            }}
          >
            <span style={{ display: "block", width: "24px", height: "1px", backgroundColor: "#f5f2ed" }} />
            <span style={{ display: "block", width: "24px", height: "1px", backgroundColor: "#f5f2ed" }} />
            <span style={{ display: "block", width: "16px", height: "1px", backgroundColor: "#f5f2ed" }} />
          </button>
        </div>
      </header>

      {/* ── BACKDROP ────────────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* ── SLIDE-IN PANEL ──────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(440px, 100vw)",
          zIndex: 70,
          backgroundColor: "#0a0a0a",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          padding: "0 2.5rem 3rem",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Panel header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "5rem",
            flexShrink: 0,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "3rem",
          }}
        >
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#6a6760" }}>
            Menu
          </span>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: "20px", height: "20px" }}>
              <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: "#f5f2ed", transform: "rotate(45deg)", marginTop: "-0.5px" }} />
              <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", backgroundColor: "#f5f2ed", transform: "rotate(-45deg)", marginTop: "-0.5px" }} />
            </div>
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1 }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                fontFamily: "'Raleway', sans-serif",
                fontSize: "clamp(1.5rem, 5vw, 2rem)",
                fontWeight: 200,
                letterSpacing: "0.04em",
                color: "#f5f2ed",
                textDecoration: "none",
                padding: "1.1rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#638479")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#f5f2ed")}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ paddingTop: "2.5rem", flexShrink: 0 }}>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn-primary"
            style={{ display: "block", textAlign: "center" }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
}
