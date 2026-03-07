import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
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

        <div className="container-site" style={{ maxWidth: "700px", position: "relative", zIndex: 2 }}>
          <p className="label animate-in" style={{ marginBottom: "1rem" }}>Contact</p>
          <h1 className="animate-in animate-in-delay-1" style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, letterSpacing: "0.03em", lineHeight: 1.1, color: "#f5f2ed", marginBottom: "2rem" }}>
            Get in touch.
          </h1>
          <p className="body-lg animate-in animate-in-delay-2">
            Whether you have a specific coverage question or want to understand how life insurance fits within your financial picture, we're available to talk through it.
          </p>
        </div>
      </section>

      {/* ── CONTACT OPTIONS ──────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container-site">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

            <ScrollReveal>
              <p className="label" style={{ marginBottom: "0.875rem" }}>Schedule a Call</p>
              <h2 className="headline-sm" style={{ color: "#f5f2ed", marginBottom: "1.5rem" }}>
                Book time directly.
              </h2>
              <p className="body-lg" style={{ marginBottom: "3rem" }}>
                Use the link below to find a time that works. Initial conversations are typically 30–45 minutes and are focused on understanding your situation before making any recommendations.
              </p>

              <div
                className="glass"
                style={{
                  padding: "3rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                <p className="label" style={{ color: "#638479" }}>Free Strategy Call</p>
                <p className="body-sm" style={{ maxWidth: "320px" }}>
                  We'll map your current situation, answer your questions, and show you what's possible — before making any recommendations.
                </p>
                <a
                  href="https://calendar.app.google/qWDAQ1Af6VZSWcV56"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Book a Time
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="label" style={{ marginBottom: "0.875rem" }}>Direct Contact</p>
              <h2 className="headline-sm" style={{ color: "#f5f2ed", marginBottom: "1.5rem" }}>
                Reach us directly.
              </h2>
              <p className="body-lg" style={{ marginBottom: "3rem" }}>
                Prefer to reach out directly? Use the contact details below.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "General Inquiries", value: "team@svrn.life", href: "mailto:team@svrn.life" },
                  { label: "Carson Herlean",    value: "carson@svrn.life", href: "mailto:carson@svrn.life" },
                  { label: "Bradley Gibb",      value: "brad@svrn.life", href: "mailto:brad@svrn.life" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    style={{
                      padding: "1.5rem 0",
                      borderTop: i === 0 ? "1px solid #1e1e1e" : "none",
                      borderBottom: "1px solid #1e1e1e",
                    }}
                  >
                    <p className="label" style={{ marginBottom: "0.5rem" }}>{item.label}</p>
                    <a href={item.href} style={{ color: "#D3CFC3", fontSize: "0.875rem", textDecoration: "none" }}>
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>

              <p className="body-sm" style={{ marginTop: "2rem", color: "#6a6760" }}>
                All inquiries are handled directly by a licensed insurance professional.
              </p>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  );
}
