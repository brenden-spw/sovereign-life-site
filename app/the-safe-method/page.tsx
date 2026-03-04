import Link from "next/link";
import ParticleNetwork from "@/components/ParticleNetwork";
import { AmbientOrbs, ScanLine } from "@/components/SectionBg";

export default function TheSafeMethodPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#050505", paddingTop: "12rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 55, speed: 0.18, threshold: 135, opacity: 0.9, mouseEffect: true, upwardBias: 0.42 }} />
        <AmbientOrbs variant="a" />
        <ScanLine duration="14s" />

        <div className="container-site" style={{ maxWidth: "800px", position: "relative", zIndex: 2 }}>
          <p className="label" style={{ marginBottom: "1rem" }}>The SAFE Method</p>
          <h1 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, letterSpacing: "0.03em", lineHeight: 1.1, color: "#f5f2ed", marginBottom: "2rem" }}>
            Why most retirement plans are built on a broken assumption — and how to fix yours.
          </h1>
          <p className="body-lg">
            The SAFE Method is a retirement income strategy designed around one insight: market volatility doesn't just reduce your returns — it systematically destroys the income you can safely take from your retirement assets. The solution is a volatility buffer. Here's exactly how it works.
          </p>
        </div>
      </section>

      {/* ── THE RETIREMENT CRISIS ────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 38, speed: 0.15, threshold: 120, opacity: 0.6, upwardBias: 0.38 }} />
        <AmbientOrbs variant="b" />

        <div className="container-site" style={{ maxWidth: "860px", position: "relative", zIndex: 2 }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>The Retirement Crisis</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "2rem" }}>The rules changed. Most people don't know.</h2>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            Through the 1980s and 90s, the strategy was simple: earn 14%+ on your investments, live off the interest, never touch the principal. It worked.
          </p>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            Then something unprecedented happened. The 4% rule — the standard for how much you can safely withdraw from retirement assets — quietly dropped to 2.8%. Most financial advisors still plan around 4%. Most Americans don't know the gap exists.
          </p>
          <p className="body-lg" style={{ marginBottom: "3rem" }}>
            The result: if you want $200,000 per year in retirement income, you don't need $5,000,000 saved — you now need $7,100,000. That's a $2,100,000 gap. And most people have no idea it's there.
          </p>

          <div className="glass" style={{ padding: "3rem" }}>
            <p className="label" style={{ marginBottom: "2rem", color: "#638479" }}>The retirement gap — $200k/year income goal</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {[
                { label: "Without a SAFE Account", rate: "2.8% distribution rate", amount: "$7,100,000 needed" },
                { label: "With a SAFE Account",    rate: "8% distribution rate",   amount: "$2,500,000 needed" },
              ].map((item) => (
                <div key={item.label} style={{ padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="label" style={{ marginBottom: "1rem" }}>{item.label}</p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 200, color: "#f5f2ed", marginBottom: "0.5rem" }}>{item.amount}</p>
                  <p className="body-sm">{item.rate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 REASONS ────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 28, speed: 0.13, threshold: 110, opacity: 0.5, upwardBias: 0.35 }} />

        <div className="container-site" style={{ maxWidth: "860px", position: "relative", zIndex: 2 }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>Why Volatility Is So Destructive</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "3.5rem" }}>Three reasons volatility destroys retirement income.</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {[
              {
                num: "01",
                title: "Down-Market Distributions",
                body: "When you take income from your retirement account while the market is down, you lock in losses permanently. Consider: your account drops 10% to $90,000. Then you take $4,000 for living expenses. Now you have $86,000 — and you need a 16.3% return just to get back to $100,000. Normal market recoveries aren't enough to overcome this compounding damage.",
              },
              {
                num: "02",
                title: "Sequence of Returns Risk",
                body: "Two investors can have the exact same portfolio, the same average return, and the same contribution amount — and one runs out of money while the other thrives. The only difference: the order in which their returns arrived. Early losses during the withdrawal phase are catastrophic. Late losses are manageable. Most retirement projections ignore this entirely.",
              },
              {
                num: "03",
                title: "Average vs. Actual Returns",
                body: "You cannot distribute average returns. A portfolio that gains 50% one year and loses 50% the next has an average return of 0% — but you've actually lost 25% of your money. Retirement income projections built on average returns are misleading. The actual return, compounded with real distributions, is always worse.",
              },
            ].map((item) => (
              <div key={item.num} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "2rem", alignItems: "start" }}>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: "3rem", fontWeight: 200, color: "rgba(255,255,255,0.08)", lineHeight: 1 }}>{item.num}</p>
                <div>
                  <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1.25rem", fontWeight: 300, color: "#f5f2ed", marginBottom: "0.875rem", letterSpacing: "0.02em" }}>{item.title}</h3>
                  <p className="body-lg">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE VOLATILITY BUFFER ────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#050505", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 32, speed: 0.14, threshold: 115, opacity: 0.52, upwardBias: 0.38 }} />
        <AmbientOrbs variant="c" />

        <div className="container-site" style={{ maxWidth: "860px", position: "relative", zIndex: 2 }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>The Solution</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "2rem" }}>A volatility buffer changes everything.</h2>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            A volatility buffer is a separate, non-correlated pool of money. When the market is up, you take income from your retirement assets normally. When the market is down, you draw from the buffer instead — and leave your growth accounts untouched until they recover.
          </p>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            The research is clear. Retirement income PhD Wade Pfau found that with a 6-year volatility buffer, safe distribution rates from retirement assets effectively double — from under 3% to 8% or more.
          </p>
          <p className="body-lg" style={{ marginBottom: "3.5rem" }}>
            The buffer doesn't need to earn a high return. It needs to be stable, liquid, and non-correlated. That's what makes it powerful — and that's exactly what the right life insurance policy provides.
          </p>

          <div style={{ borderLeft: "2px solid #638479", paddingLeft: "2rem", marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 300, color: "#f5f2ed", lineHeight: 1.6, fontStyle: "italic" }}>
              "Perhaps the greatest risk that retirees face is the possibility that stock prices will fall early in retirement. If this happens, the value of a buffer asset will provide the greatest protection against outliving assets."
            </p>
            <p className="body-sm" style={{ marginTop: "1rem" }}>— Wade Pfau, PhD, Retirement Income Research</p>
          </div>
        </div>
      </section>

      {/* ── WHY WHOLE LIFE ───────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 28, speed: 0.13, threshold: 110, opacity: 0.48, upwardBias: 0.35 }} />

        <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <div>
              <p className="label" style={{ marginBottom: "0.875rem" }}>The SAFE Account</p>
              <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.75rem" }}>Why only one account type qualifies.</h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>We evaluated every major asset class as a potential volatility buffer. Cash and savings accounts don't grow enough. Brokerage accounts are market-correlated. Real estate isn't liquid. Retirement accounts create tax drag on every withdrawal.</p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>A specially-designed whole life insurance policy — built specifically for cash value accumulation, not death benefit — is the only account that meets every requirement.</p>
              <p className="body-lg">This is not a traditional whole life policy you buy off the shelf. It's a policy engineered to maximize accessible, tax-free cash value with guaranteed, non-correlated growth.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Non-correlated to the market", "Guaranteed — no downside risk", "Tax-free access to cash value", "Liquid — accessible when needed", "Predictable, measurable growth", "Secured — no market loss exposure"].map((item, i) => (
                <div key={i} className="glass-subtle" style={{ padding: "1.25rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                  <p className="body-sm" style={{ margin: 0, color: "#D3CFC3" }}>{item}</p>
                  <span style={{ color: "#638479", flexShrink: 0, fontSize: "0.65rem", letterSpacing: "0.1em" }}>——</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FUNDING ──────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 25, speed: 0.12, threshold: 105, opacity: 0.44, upwardBias: 0.32 }} />
        <AmbientOrbs variant="b" />

        <div className="container-site" style={{ maxWidth: "860px", position: "relative", zIndex: 2 }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>Funding the SAFE Account</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.5rem" }}>The right approach depends on where you are.</h2>
          <p className="body-lg" style={{ marginBottom: "3.5rem" }}>The goal is 6 years of your target retirement income sitting in your SAFE Account. How you get there depends on your timeline.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { stage: "Pre-Retiree", sub: "10+ years to retirement", steps: ["Calculate minimum contributions required to reach 6 years of income by retirement", "Reduce growth account savings proportionally", "Divert savings to SAFE Account and adjust annually", "Optionally re-balance non-retirement accounts to jump-start funding"] },
              { stage: "Near-Retiree", sub: "Less than 10 years out", steps: ["Minimize growth account contributions to the company match only", "Maximize all available savings into the SAFE Account", "Re-balance portions of non-qualified and IRA assets to complete funding", "Spread re-balance over multiple years for tax efficiency"] },
              { stage: "Post-Retiree", sub: "Already retired", steps: ["Re-balance existing growth assets to establish the SAFE Account", "Start with non-qualified assets (brokerage accounts)", "Then address traditional IRA or 401(k) assets as needed", "Spread across multiple years to manage tax impact"] },
            ].map((item) => (
              <div key={item.stage} className="glass" style={{ padding: "3rem" }}>
                <p className="label" style={{ marginBottom: "0.5rem", color: "#638479" }}>{item.stage}</p>
                <p style={{ fontSize: "0.7rem", color: "#6a6760", letterSpacing: "0.1em", marginBottom: "1.75rem" }}>{item.sub}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {item.steps.map((step, i) => (
                    <li key={i} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start", marginBottom: i < item.steps.length - 1 ? "0.875rem" : 0 }}>
                      <span style={{ color: "#638479", flexShrink: 0, fontSize: "0.65rem", letterSpacing: "0.1em", marginTop: "0.3rem" }}>——</span>
                      <p className="body-sm" style={{ margin: 0, color: "#D3CFC3" }}>{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#050505", position: "relative", overflow: "hidden" }}>
        <ParticleNetwork config={{ count: 20, speed: 0.11, threshold: 100, opacity: 0.38, upwardBias: 0.3 }} />

        <div className="container-site" style={{ maxWidth: "680px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div className="glass" style={{ padding: "4rem", textAlign: "center" }}>
            <p className="label" style={{ marginBottom: "1.25rem" }}>Next Step</p>
            <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.5rem" }}>Run your numbers with us.</h2>
            <p className="body-lg" style={{ marginBottom: "2.5rem" }}>Book a free SAFE Method strategy call. We'll build a custom retirement income simulation using your actual numbers. No obligation.</p>
            <Link href="/contact" className="btn-primary">Book a Free Call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
