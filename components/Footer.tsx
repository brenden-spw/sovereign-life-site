"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#050505", borderTop: "1px solid #1e1e1e", paddingTop: "5rem", paddingBottom: "3rem" }}>
      <div className="container-site">
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", marginBottom: "1.5rem" }}>
              <Image src="/logo/brandmark.png" alt="Sovereign Life" width={32} height={32} style={{ objectFit: "contain" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", letterSpacing: "0.2em", color: "#f5f2ed", fontWeight: 300 }}>
                SOVEREIGN LIFE
              </span>
            </Link>
            <p className="body-sm" style={{ marginBottom: "1rem" }}>
              Independent life insurance, structured with intention.
            </p>
            <p className="body-sm" style={{ color: "#9a9690" }}>
              Independent firm. Objective recommendations. Licensed professionals.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="label" style={{ marginBottom: "1.25rem" }}>Services</p>
            {[
              { href: "/services", label: "Services" },
              { href: "/the-safe-method", label: "The SAFE Method" },
              { href: "/get-started", label: "Get Started" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                style={{ display: "block", fontSize: "0.8rem", color: "#9a9690", textDecoration: "none", marginBottom: "0.75rem", letterSpacing: "0.02em", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D3CFC3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9690")}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p className="label" style={{ marginBottom: "1.25rem" }}>Company</p>
            {[
              { href: "/contact", label: "About" },
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

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: "1.25rem" }}>Contact</p>
            {[
              { href: "mailto:team@svrn.life",    label: "team@svrn.life" },
              { href: "mailto:carson@svrn.life",  label: "carson@svrn.life" },
              { href: "mailto:brad@svrn.life",    label: "brad@svrn.life" },
            ].map((l) => (
              <a key={l.href} href={l.href}
                style={{ display: "block", fontSize: "0.8rem", color: "#9a9690", textDecoration: "none", marginBottom: "0.75rem", letterSpacing: "0.02em", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D3CFC3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9690")}>
                {l.label}
              </a>
            ))}
            <a
              href="https://calendar.app.google/qWDAQ1Af6VZSWcV56"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", fontSize: "0.8rem", color: "#638479", textDecoration: "none", marginBottom: "0.75rem", letterSpacing: "0.02em", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f2ed")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#638479")}>
              Book a Free Call →
            </a>
          </div>
        </div>

        <hr className="rule" style={{ marginBottom: "2rem" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-start" }}>
          <p style={{ fontSize: "0.7rem", color: "#9a9690", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} Sovereign Life. All rights reserved.
          </p>
          <p style={{ fontSize: "0.65rem", color: "#606060", letterSpacing: "0.04em", maxWidth: "64rem", lineHeight: 1.8 }}>
            Sovereign Life and its representatives are licensed insurance professionals. We are not registered investment advisors, financial planners, attorneys, or tax professionals, and nothing on this website should be construed as financial, investment, legal, or tax advice. All content is for educational and informational purposes only. Insurance products, benefits, and availability vary by state and individual qualification. Strategies and illustrations described are for educational purposes and are not guaranteed. Past performance does not guarantee future results. Always consult with your own qualified financial, legal, and tax professionals before making any financial decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
