import ParticleNetwork from "@/components/ParticleNetwork";
import { AmbientOrbs, ScanLine } from "@/components/SectionBg";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#050505", paddingTop: "12rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 55, speed: 0.18, threshold: 135, opacity: 0.9, mouseEffect: true, upwardBias: 0.42 }} />
        <AmbientOrbs variant="a" />
        <ScanLine duration="14s" />

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
      <section className="section" style={{ backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 35, speed: 0.14, threshold: 118, opacity: 0.55, upwardBias: 0.38 }} />
        <AmbientOrbs variant="b" />

        <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
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
                  minHeight: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.5rem",
                }}
              >
                <p className="label" style={{ color: "#638479" }}>Scheduling</p>
                <p className="body-sm" style={{ maxWidth: "320px" }}>
                  Add your scheduling link or Calendly embed here.
                </p>
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
                  { label: "General Inquiries", value: "info@sovereignlife.com" },
                  { label: "Carson Herlean", value: "carson@sovereignlife.com" },
                  { label: "Bradley Gibb", value: "bradley@sovereignlife.com" },
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
                    <p className="body-sm" style={{ color: "#D3CFC3", margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>

              <p className="body-sm" style={{ marginTop: "2rem", color: "#6a6760" }}>
                Sovereign Life is licensed in [states]. All inquiries are handled directly by a licensed professional.
              </p>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </>
  );
}
