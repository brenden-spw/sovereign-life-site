import ParticleNetwork from "@/components/ParticleNetwork";
import { AmbientOrbs, ScanLine } from "@/components/SectionBg";

export default function GetStartedPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#050505", paddingTop: "12rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 55, speed: 0.18, threshold: 135, opacity: 0.9, mouseEffect: true, upwardBias: 0.42 }} />
        <AmbientOrbs variant="a" />
        <ScanLine duration="14s" />

        <div className="container-site" style={{ maxWidth: "700px", position: "relative", zIndex: 2 }}>
          <p className="label" style={{ marginBottom: "1rem" }}>Get Started</p>
          <h1
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              color: "#f5f2ed",
              marginBottom: "2rem",
            }}
          >
            Book a free SAFE Method strategy call.
          </h1>
          <p className="body-lg">
            In one conversation, we'll map your current retirement trajectory, run a custom income simulation using your actual numbers, and show you exactly what a volatility buffer changes — before and after. No obligation.
          </p>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ───────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 35, speed: 0.14, threshold: 118, opacity: 0.55, upwardBias: 0.38 }} />
        <AmbientOrbs variant="b" />

        <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <div>
              <p className="label" style={{ marginBottom: "0.875rem" }}>What to Expect</p>
              <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.75rem" }}>
                A real conversation, not a sales call.
              </h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                We'll spend time understanding your current setup — what you have saved, what you're targeting in retirement, and how far the gap is between where you are and where you need to be.
              </p>
              <p className="body-lg">
                From there, we'll build a custom simulation that shows your retirement income trajectory with and without a SAFE Account. You'll leave with clarity regardless of whether we work together.
              </p>
            </div>

            <div className="glass" style={{ padding: "2.5rem" }}>
              <p className="label" style={{ marginBottom: "1.75rem", color: "#638479" }}>
                What's included in your free call
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Custom retirement income simulation (your actual numbers)",
                  "Before-and-after comparison with the SAFE Method",
                  "SAFE Account funding path based on your timeline",
                  "Clear explanation of what qualifies — and what doesn't",
                  "SAFE Method Report and Resource Library",
                ].map((point, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-start",
                      paddingTop: i > 0 ? "1.25rem" : 0,
                      paddingBottom: "1.25rem",
                      borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <span style={{ color: "#638479", flexShrink: 0, marginTop: "0.15rem", fontSize: "0.65rem", letterSpacing: "0.1em" }}>——</span>
                    <p className="body-sm" style={{ margin: 0, color: "#D3CFC3" }}>{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING ──────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 28, speed: 0.13, threshold: 110, opacity: 0.48, upwardBias: 0.35 }} />
        <AmbientOrbs variant="c" />

        <div className="container-site" style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p className="label" style={{ marginBottom: "0.875rem", textAlign: "center" }}>Schedule Your Call</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "3.5rem", textAlign: "center" }}>
            Choose a time that works for you.
          </h2>

          {/* Calendly embed placeholder */}
          <div
            className="glass"
            style={{
              padding: "4rem",
              textAlign: "center",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            <p className="label" style={{ color: "#638479" }}>Scheduling</p>
            <p className="body-lg" style={{ maxWidth: "440px" }}>
              Add your Calendly or scheduling link here. This section will display your live booking calendar.
            </p>
            <p className="body-sm" style={{ color: "#6a6760" }}>
              yoursafemethod.com/start
            </p>
          </div>
        </div>
      </section>

      {/* ── REASSURANCE ──────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#050505", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 20, speed: 0.11, threshold: 100, opacity: 0.38, upwardBias: 0.3 }} />

        <div className="container-site" style={{ maxWidth: "860px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              {
                title: "No pressure",
                body: "This is an educational session. We'll share what we know, answer your questions, and give you a clear picture — whether or not you move forward with us.",
              },
              {
                title: "No obligation",
                body: "The strategy call is completely free. You'll leave with a custom simulation and a clear funding path regardless of what you decide.",
              },
              {
                title: "Real numbers",
                body: "We don't use hypothetical scenarios. We run the simulation with your actual income goal, savings, and timeline so you see a real before-and-after.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-subtle" style={{ padding: "2.5rem 2rem" }}>
                <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1.1rem", fontWeight: 300, color: "#f5f2ed", marginBottom: "0.875rem", letterSpacing: "0.02em" }}>
                  {item.title}
                </h3>
                <p className="body-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
