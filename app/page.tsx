import Link from "next/link";
import TypewriterText from "@/components/TypewriterText";
import FlashlightCard from "@/components/FlashlightCard";
import RadialLineHero from "@/components/RadialLineHero";
import CashValueCurve from "@/components/CashValueCurve";
import Marquee from "@/components/Marquee";
import { MountainCtaBg } from "@/components/MountainCta";
import { ScanLine } from "@/components/SectionBg";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: "#050505",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "5rem",
      }}>
        <RadialLineHero />
        <ScanLine duration="14s" />

        {/* Corner markers */}
        {[
          { style: { top: "1.5rem", left: "1.5rem" },    d: "M0 10 L0 0 L10 0"    },
          { style: { top: "1.5rem", right: "1.5rem" },   d: "M16 10 L16 0 L6 0"   },
          { style: { bottom: "1.5rem", left: "1.5rem" }, d: "M0 6 L0 16 L10 16"   },
          { style: { bottom: "1.5rem", right: "1.5rem" }, d: "M16 6 L16 16 L6 16" },
        ].map((c, i) => (
          <svg key={i} aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"
            style={{ position: "absolute", opacity: 0.22, pointerEvents: "none", ...c.style }}>
            <path d={c.d} fill="none" stroke="#818D8D" strokeWidth="1" />
          </svg>
        ))}

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "4rem 3rem" }}>
          <p className="label animate-in" style={{ marginBottom: "1.75rem" }}>Sovereign Life</p>

          <h1
            className="animate-in animate-in-delay-1"
            style={{
              fontFamily: "'Raleway', sans-serif",
              color: "#ffffff",
              maxWidth: "820px",
              margin: "0 0 1.75rem",
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "0.02em",
              minHeight: "2.2em",
            }}
          >
            <TypewriterText lines={["Independent life insurance,", "structured with intention."]} speed={36} />
          </h1>

          <p className="animate-in animate-in-delay-2" style={{ maxWidth: "540px", marginBottom: "2.5rem", fontSize: "1rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}>
            Sovereign Life is an independent life insurance firm serving individuals, families, and business owners. We design coverage and strategies around what the capital is actually meant to do.
          </p>

          <div className="animate-in animate-in-delay-3" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/get-started" className="btn-primary">Book a Free Call</Link>
            <Link href="/services" className="btn-ghost">Our Services</Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ───────────────────────────────────── */}
      <Marquee />

      {/* ── WHAT WE DO ───────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <ScrollReveal>
              <p className="label" style={{ marginBottom: "0.875rem" }}>What We Do</p>
              <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.75rem" }}>
                Life insurance designed around a specific financial objective.
              </h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                Most life insurance is purchased as a standalone product. We treat it as a financial instrument — one that, when properly structured, serves a clear purpose within a broader financial picture.
              </p>
              <p className="body-lg">
                Our work begins with understanding what a client is trying to accomplish. Coverage and structure follow from that.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} style={{ display: "flex", flexDirection: "column" }}>
              {[
                { title: "Income Protection",              body: "Term and permanent life insurance structured to replace income, cover obligations, and protect the people who depend on it." },
                { title: "Tax Strategy",                   body: "Permanent life insurance policies designed to accumulate cash value on a tax-advantaged basis, providing accessible capital without triggering taxable events." },
                { title: "Capital & Cash Management",      body: "Whole life policies structured to function as a stable, liquid capital reserve — non-correlated to markets and available when needed." },
                { title: "Key Person & Business Coverage", body: "Policies that protect businesses against the loss of a key individual, fund buy-sell agreements, and support continuity planning." },
                { title: "Retirement Income Strategy",     body: "Permanent insurance integrated into a broader retirement plan to stabilize income distribution and reduce the impact of market volatility." },
              ].map((item, i) => (
                <FlashlightCard key={item.title} style={{ padding: "1.75rem 1rem", borderTop: i === 0 ? "1px solid #1e1e1e" : "none", borderBottom: "1px solid #1e1e1e", cursor: "default" }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.95rem", fontWeight: 400, color: "#f5f2ed", marginBottom: "0.5rem", letterSpacing: "0.02em" }}>{item.title}</p>
                  <p className="body-sm">{item.body}</p>
                </FlashlightCard>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── THE FIRM ─────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707" }}>
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <ScrollReveal>
              <p className="label" style={{ marginBottom: "0.875rem" }}>The Firm</p>
              <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.75rem" }}>
                Independent. Objective. Focused on outcomes.
              </h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                Sovereign Life operates as an independent firm, which means our recommendations are guided by what is appropriate for a client's situation — not by product quotas or carrier incentives.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                We work with a select group of highly-rated carriers and design each policy with a clear understanding of how it fits within the client's broader financial picture.
              </p>
              <p className="body-lg">
                Our clients range from individuals and families planning for long-term security to business owners who need coverage that serves a specific strategic function.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { name: "Carson Herlean", title: "Founding Partner", bio: "Carson focuses on retirement income strategy and the structured use of permanent life insurance as a financial planning tool. He works primarily with individuals and families looking to build a more resilient financial foundation." },
                { name: "Bradley Gibb",   title: "Founding Partner", bio: "Bradley brings a background in financial strategy and capital structure to Sovereign Life's client engagements. He specializes in working with business owners and entrepreneurs who need coverage that functions alongside a broader financial plan." },
              ].map((person) => (
                <FlashlightCard key={person.name} className="glass-subtle" style={{ padding: "2.5rem" }}>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1.1rem", fontWeight: 300, color: "#f5f2ed", marginBottom: "0.25rem", letterSpacing: "0.02em" }}>{person.name}</p>
                  <p className="label" style={{ marginBottom: "1.25rem", color: "#638479" }}>{person.title}</p>
                  <p className="body-sm">{person.bio}</p>
                </FlashlightCard>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH — convergence illustration ───────────── */}
      <section className="section" style={{ backgroundColor: "#050505" }}>
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
            <ScrollReveal>
              <p className="label" style={{ marginBottom: "0.875rem" }}>Our Approach</p>
              <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.75rem" }}>
                Coverage that earns its place.
              </h2>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                Every policy we design has a defined role. We don't recommend coverage that doesn't serve a clear purpose, and we don't structure policies around commission — we structure them around outcomes.
              </p>
              <p className="body-lg" style={{ marginBottom: "2.5rem" }}>
                Before any recommendation, we want to understand the full picture: income, obligations, existing coverage, and long-term objectives.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem" }}>
                {["Independent, carrier-agnostic recommendations", "Whole life and term products", "Business and personal coverage", "Coordination with existing financial plans", "Licensed and compliance-focused"].map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: i < 4 ? "0.875rem" : 0 }}>
                    <span style={{ color: "#638479", flexShrink: 0, fontSize: "0.65rem", letterSpacing: "0.1em", marginTop: "0.3rem" }}>——</span>
                    <p className="body-sm" style={{ margin: 0, color: "#D3CFC3" }}>{item}</p>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="btn-ghost">View Our Services</Link>
            </ScrollReveal>

            <div style={{ display: "flex", flexDirection: "column", alignSelf: "stretch", minHeight: "480px" }}>
              <div style={{ flex: 1 }}>
                <CashValueCurve />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {["Guaranteed", "Tax-Free Access", "Non-Correlated", "Liquid"].map((attr) => (
                  <span key={attr} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#638479", flexShrink: 0 }} />
                    <span className="label" style={{ color: "#9a9690" }}>{attr}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#050505", padding: "4rem 0", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container-site">
          <div
            className="glass"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {[
              { value: "2.8%", label: "Current safe withdrawal rate" },
              { value: "→ 8%", label: "With a SAFE Account" },
              { value: "6 yr", label: "Target buffer duration" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  textAlign: "center",
                  padding: "2.5rem 1rem",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div className="stat-value">{stat.value}</div>
                <p className="label" style={{ marginTop: "0.625rem", color: "#9a9690" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────── */}
      <section style={{ backgroundColor: "#070707", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "5rem 0" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <blockquote style={{ borderLeft: "1px solid #638479", paddingLeft: "2.5rem", margin: 0 }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#f5f2ed",
              lineHeight: 1.5,
              marginBottom: "1.5rem",
            }}>
              &ldquo;Perhaps the greatest risk that retirees face is the possibility that stock prices will fall early in retirement. A buffer asset will provide the greatest protection against outliving assets.&rdquo;
            </p>
            <p className="label" style={{ color: "#638479" }}>
              Wade Pfau, PhD — Retirement Income Research
            </p>
          </blockquote>
        </ScrollReveal>
      </section>

      {/* ── MOUNTAIN CTA ─────────────────────────────────────── */}
      <section style={{ position: "relative", backgroundColor: "#030303", overflow: "hidden", padding: "9rem 0" }}>
        <MountainCtaBg />
        <ScrollReveal
          className="container-site"
          style={{ position: "relative", zIndex: 2, maxWidth: "640px", margin: "0 auto", textAlign: "center" }}
        >
          <p className="label" style={{ marginBottom: "1.5rem" }}>Begin</p>
          <h2 className="headline-md" style={{ color: "#ffffff", marginBottom: "1.75rem" }}>
            Start with a conversation.
          </h2>
          <p className="body-lg" style={{ marginBottom: "3rem" }}>
            If you're evaluating coverage or want to understand how a policy might fit your specific situation, we're happy to talk through it.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendar.app.google/qWDAQ1Af6VZSWcV56" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Free Call
            </a>
            <Link href="/contact" className="btn-ghost">Get in Touch</Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
