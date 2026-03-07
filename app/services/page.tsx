import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#050505", paddingTop: "12rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>

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

        <div className="container-site" style={{ maxWidth: "800px", position: "relative", zIndex: 2 }}>
          <p className="label animate-in" style={{ marginBottom: "1rem" }}>Services</p>
          <h1 className="animate-in animate-in-delay-1" style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, letterSpacing: "0.03em", lineHeight: 1.1, color: "#f5f2ed", marginBottom: "2rem" }}>
            What we do, and why it matters.
          </h1>
          <p className="body-lg animate-in animate-in-delay-2">
            Life insurance is the product. The application is what varies. We work with clients to identify the financial objective first — then determine whether and how a life insurance policy serves it.
          </p>
        </div>
      </section>

      {/* ── SERVICES LIST ────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container-site" style={{ maxWidth: "860px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                title: "Income Protection",
                description: "Term and permanent life insurance designed to replace income and cover financial obligations in the event of an untimely death. We assess coverage needs based on income, debt, dependents, and time horizon — and recommend the structure that fits.",
                notes: ["Term life insurance", "Permanent life insurance", "Individual and family coverage"],
              },
              {
                title: "Tax-Advantaged Accumulation",
                description: "Certain permanent life insurance policies allow cash value to grow on a tax-deferred basis and be accessed tax-free. For clients with a high tax burden and a long time horizon, this can be a meaningful component of a broader tax strategy.",
                notes: ["Whole life cash value accumulation", "Tax-free policy loans and withdrawals", "Coordination with existing tax planning"],
              },
              {
                title: "Capital & Cash Management",
                description: "A properly structured whole life policy can function as a stable, liquid capital reserve. The cash value is non-correlated to financial markets, grows at a guaranteed rate, and remains accessible without penalty. This is used by clients who want a pool of capital that is both secure and available.",
                notes: ["Non-market-correlated growth", "Guaranteed minimum returns", "Accessible via policy loans without triggering taxable events"],
              },
              {
                title: "Key Person Insurance",
                description: "Businesses often carry significant exposure to the loss of a key individual — a founder, executive, or revenue-generating partner. Key person policies provide a financial backstop against that risk, and can be structured to serve additional purposes such as executive compensation or deferred benefit plans.",
                notes: ["Key person life and disability coverage", "Buy-sell agreement funding", "Executive benefit and deferred compensation structures"],
              },
              {
                title: "Retirement Income Strategy",
                description: "Market volatility reduces the income individuals can safely take from retirement accounts. Permanent life insurance, when integrated into a retirement plan as a non-correlated buffer, can significantly improve the sustainability of retirement distributions. We work with clients to understand where this fits — and where it doesn't.",
                notes: ["Volatility buffer strategy", "Coordination with 401(k), IRA, and brokerage accounts", "Distribution rate optimization"],
              },
              {
                title: "Business Succession",
                description: "Life insurance is a common and efficient tool for funding business continuity events — partnership buyouts, estate equalization, and ownership transitions. We work alongside attorneys and advisors to make sure coverage is structured correctly for the intended use.",
                notes: ["Buy-sell agreement funding", "Estate and succession planning support", "Coordination with legal and financial advisors"],
              },
            ].map((service, i) => (
              <ScrollReveal
                key={service.title}
                delay={i * 60}
                className="grid-split"
                style={{
                  alignItems: "start",
                  padding: "3.5rem 0",
                  borderTop: "1px solid #1e1e1e",
                }}
              >
                <div>
                  <h2 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 300, color: "#f5f2ed", marginBottom: "1.25rem", letterSpacing: "0.02em" }}>
                    {service.title}
                  </h2>
                  <p className="body-lg">{service.description}</p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, paddingTop: "0.25rem" }}>
                  {service.notes.map((note, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: j < service.notes.length - 1 ? "0.875rem" : 0 }}>
                      <span style={{ color: "#638479", flexShrink: 0, fontSize: "0.65rem", letterSpacing: "0.1em", marginTop: "0.3rem" }}>——</span>
                      <p className="body-sm" style={{ margin: 0, color: "#D3CFC3" }}>{note}</p>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p className="label" style={{ marginBottom: "1.25rem" }}>Next Step</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.5rem" }}>Start with a conversation.</h2>
          <p className="body-lg" style={{ marginBottom: "2.5rem" }}>If you have a specific need or just want to understand what's possible, we're happy to talk through it — no pressure, no pitch.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://calendar.app.google/qWDAQ1Af6VZSWcV56" target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Free Call</a>
            <Link href="/contact" className="btn-ghost">Get in Touch</Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
