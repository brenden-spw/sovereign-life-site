"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#050505", borderTop: "1px solid #1e1e1e", paddingTop: "5rem", paddingBottom: "3rem" }}>
      <div className="container-site">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", marginBottom: "4rem" }}>
          {/* Brand */}
          <div style={{ maxWidth: "28rem" }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.5rem" }}>
              <Image src="/logo/brandmark.png" alt="Sovereign Life" width={32} height={32} style={{ objectFit: "contain" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", letterSpacing: "0.2em", color: "#f5f2ed", fontWeight: 300 }}>
                SOVEREIGN LIFE
              </span>
            </Link>
            <p className="body-sm" style={{ marginBottom: "1.5rem" }}>
              Independent life insurance, structured with intention.
            </p>
            <p className="body-sm" style={{ color: "#9a9690" }}>
              Sovereign Life is an independent life insurance firm serving individuals, families, and business owners. Licensed professionals. Objective recommendations.
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            <div>
              <p className="label" style={{ marginBottom: "1.25rem" }}>Services</p>
              {[
                { href: "/services", label: "Services" },
                { href: "/the-safe-method", label: "The SAFE Method" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  style={{ display: "block", fontSize: "0.8rem", color: "#9a9690", textDecoration: "none", marginBottom: "0.75rem", letterSpacing: "0.02em", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D3CFC3")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9690")}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              <p className="label" style={{ marginBottom: "1.25rem" }}>Company</p>
              {[
                { href: "https://sovereignprivatewealth.com", label: "Sovereign Private Wealth" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  style={{ display: "block", fontSize: "0.8rem", color: "#9a9690", textDecoration: "none", marginBottom: "0.75rem", letterSpacing: "0.02em", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D3CFC3")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9690")}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="rule" style={{ marginBottom: "2rem" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
          <p style={{ fontSize: "0.7rem", color: "#9a9690", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} Sovereign Life. All rights reserved.
          </p>
          <p style={{ fontSize: "0.65rem", color: "#707070", letterSpacing: "0.05em", maxWidth: "52rem" }}>
            Sovereign Life and its representatives are licensed insurance professionals. Content on this website is for educational purposes only and does not constitute financial, legal, or tax advice. Life insurance products vary by state and individual qualification. Results described are illustrative and not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
