import Link from "next/link";
import DampenedWave from "@/components/DampenedWave";
import Accordion from "@/components/Accordion";
import Tooltip from "@/components/Tooltip";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import { WithoutBufferDiagram, WithBufferDiagram } from "@/components/BufferDiagram";

const faqItems = [
  {
    question: "Does a SAFE Account replace my 401(k) or IRA?",
    answer: "No — it works alongside them. Your 401(k) and IRA remain your primary growth vehicles. The SAFE Account is the buffer you draw from during market downturns, leaving your retirement accounts untouched until they recover.",
  },
  {
    question: "How much do I need to fund it?",
    answer: "The target is 6 years of your desired retirement income. For a $100,000/year income goal, that means building a $600,000 buffer. How you get there — and how long it takes — depends entirely on your timeline. We build a custom funding path in your strategy call.",
  },
  {
    question: "Is this the same as 'infinite banking'?",
    answer: "Related concept, different application. Infinite banking focuses on using policy loans as an alternative to conventional financing. The SAFE Method uses the same whole life policy structure specifically as a retirement income buffer — to eliminate sequence-of-returns risk and increase your safe distribution rate.",
  },
  {
    question: "What if I need the money before retirement?",
    answer: "The cash value in a whole life policy is accessible at any time via policy loans — no penalty, no tax consequence, no minimum age requirement. It's liquid capital you can access when needed.",
  },
  {
    question: "Is this only for people close to retirement?",
    answer: "No. Starting earlier is significantly more advantageous. Pre-retirees with 10+ years can fund the buffer gradually with smaller annual contributions and benefit from years of compounding. The closer you are to retirement, the more aggressive the funding path needs to be — but it's achievable at any stage.",
  },
  {
    question: "What kind of returns does the SAFE Account generate?",
    answer: "Whole life policies typically generate 4–5% guaranteed returns. That's not the point — the buffer doesn't need to match market returns. It needs to be stable, non-correlated, and accessible during downturns. That stability is what allows your market accounts to recover instead of being drawn down at the worst possible moment.",
  },
];

export default function TheSafeMethodPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#050505", paddingTop: "12rem", paddingBottom: "6rem", position: "relative", overflow: "hidden" }}>
        <DampenedWave />

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
          <p className="label animate-in" style={{ marginBottom: "1rem" }}>The SAFE Method</p>
          <h1 className="animate-in animate-in-delay-1" style={{ fontFamily: "'Raleway', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, letterSpacing: "0.03em", lineHeight: 1.1, color: "#f5f2ed", marginBottom: "2rem" }}>
            Why most retirement plans are built on a broken assumption — and how to fix yours.
          </h1>
          <p className="body-lg animate-in animate-in-delay-2">
            The SAFE Method is a retirement income strategy designed around one insight: market volatility doesn't just reduce your returns — it systematically destroys the income you can safely take from your retirement assets. The solution is a <Tooltip term="volatility buffer" definition="A separate, non-correlated pool of money you draw income from during market downturns — leaving your growth accounts untouched until they recover." />. Here's exactly how it works.
          </p>
        </div>
      </section>

      {/* ── THE RETIREMENT CRISIS ────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "860px" }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>The Retirement Crisis</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "2rem" }}>The rules changed. Most people don't know.</h2>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            Through the 1980s and 90s, the strategy was simple: earn 14%+ on your investments, live off the interest, never touch the principal. It worked.
          </p>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            Then something unprecedented happened. The <Tooltip term="4% rule" definition="A long-standing retirement planning guideline stating you can safely withdraw 4% of your portfolio per year without running out of money. Recent research has significantly revised this figure downward." /> — the standard for how much you can safely withdraw from retirement assets — quietly dropped to 2.8%. Most financial advisors still plan around 4%. Most Americans don't know the gap exists.
          </p>
          <p className="body-lg" style={{ marginBottom: "3rem" }}>
            The result: if you want $200,000 per year in retirement income, you don't need $5,000,000 saved — you now need $7,100,000. That's a $2,100,000 gap. And most people have no idea it's there.
          </p>

          <div className="glass" style={{ padding: "3rem" }}>
            <p className="label" style={{ marginBottom: "2rem", color: "#638479" }}>The retirement gap — $200k/year income goal</p>
            <div className="grid-split-narrow">
              {[
                { label: "Without a SAFE Account", rate: "2.8% distribution rate", value: 7100000 },
                { label: "With a SAFE Account",    rate: "8% distribution rate",   value: 2500000 },
              ].map((item) => (
                <div key={item.label} style={{ padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="label" style={{ marginBottom: "1rem" }}>{item.label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 3vw, 2.6rem)", fontWeight: 300, color: "#f5f2ed", marginBottom: "0.5rem", lineHeight: 1 }}>
                    $<CountUp value={item.value} /> <span style={{ fontSize: "0.55em", opacity: 0.7, fontWeight: 300 }}>needed</span>
                  </p>
                  <p className="body-sm">{item.rate}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 3 REASONS ────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "860px" }}>
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
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", fontWeight: 300, color: "rgba(255,255,255,0.07)", lineHeight: 1 }}>{item.num}</p>
                <div>
                  <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1.25rem", fontWeight: 300, color: "#f5f2ed", marginBottom: "0.875rem", letterSpacing: "0.02em" }}>{item.title}</h3>
                  <p className="body-lg">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ── THE VOLATILITY BUFFER ────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#050505" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "860px" }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>The Solution</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "2rem" }}>A volatility buffer changes everything.</h2>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            A volatility buffer is a separate, <Tooltip term="non-correlated" definition="An asset whose value moves independently of stock market performance — so when markets fall, it doesn't fall with them." /> pool of money. When the market is up, you take income from your retirement assets normally. When the market is down, you draw from the buffer instead — and leave your growth accounts untouched until they recover.
          </p>
          <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
            The research is clear. Retirement income PhD Wade Pfau found that with a 6-year volatility buffer, safe <Tooltip term="distribution rates" definition="The percentage of your retirement portfolio you withdraw each year for income. A 4% distribution rate on a $1M portfolio = $40,000/year." /> from retirement assets effectively double — from under 3% to 8% or more.
          </p>
          <p className="body-lg" style={{ marginBottom: "3.5rem" }}>
            The buffer doesn't need to earn a high return. It needs to be stable, liquid, and non-correlated. That's what makes it powerful — and that's exactly what the right life insurance policy provides.
          </p>

          <div style={{ borderLeft: "2px solid #638479", paddingLeft: "2rem", marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 300, color: "#f5f2ed", lineHeight: 1.65, fontStyle: "italic" }}>
              "Perhaps the greatest risk that retirees face is the possibility that stock prices will fall early in retirement. If this happens, the value of a buffer asset will provide the greatest protection against outliving assets."
            </p>
            <p className="body-sm" style={{ marginTop: "1rem" }}>— Wade Pfau, PhD, Retirement Income Research</p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── BEFORE / AFTER DIAGRAMS ──────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707" }}>
        <ScrollReveal className="container-site">
          <p className="label" style={{ marginBottom: "0.875rem", textAlign: "center" }}>Side-by-Side Comparison</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1rem", textAlign: "center" }}>
            The same market. Two completely different outcomes.
          </h2>
          <p className="body-lg" style={{ maxWidth: "640px", margin: "0 auto 4rem", textAlign: "center" }}>
            Both portfolios start at $1M, need $60k/year, and face the same market sequence. The only variable: whether a $360k volatility buffer exists.
          </p>

          <div className="grid-split-narrow">

            {/* ── WITHOUT BUFFER ─────────────────── */}
            <div>
              {/* Title */}
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "1rem", fontWeight: 300,
                color: "#f5f2ed", letterSpacing: "0.03em",
                marginBottom: "1rem",
              }}>
                Without a Buffer
              </p>

              {/* Legend — fixed height matches the with-buffer legend */}
              <div style={{ minHeight: "52px", display: "flex", flexWrap: "wrap", gap: "0.5rem 1.25rem", marginBottom: "1.25rem", alignContent: "flex-start" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "24px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.65)", flexShrink: 0 }} />
                  <span className="label" style={{ color: "#9a9690" }}>Portfolio balance</span>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "rgba(255,80,80,0.7)", flexShrink: 0 }} />
                  <span className="label" style={{ color: "#9a9690" }}>Forced withdrawal (down year)</span>
                </span>
              </div>

              {/* Chart */}
              <div className="glass" style={{ padding: "1.5rem 0.5rem 0.75rem 0" }}>
                <WithoutBufferDiagram />
              </div>

              {/* Caption */}
              <p className="body-sm" style={{ marginTop: "1.25rem", color: "#b8b4ae" }}>
                Income is taken from the portfolio every year — including during the 6 down years when markets are off 25%. Each withdrawal at depressed prices locks in losses permanently. By year 13, the portfolio is at <strong style={{ color: "#f5f2ed", fontWeight: 400 }}>$0</strong>.
              </p>
            </div>

            {/* ── WITH BUFFER ────────────────────── */}
            <div>
              {/* Title */}
              <p style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "1rem", fontWeight: 300,
                color: "#f5f2ed", letterSpacing: "0.03em",
                marginBottom: "1rem",
              }}>
                With a Buffer
              </p>

              {/* Legend — fixed height matches the without-buffer legend */}
              <div style={{ minHeight: "52px", display: "flex", flexWrap: "wrap", gap: "0.5rem 1.25rem", marginBottom: "1.25rem", alignContent: "flex-start" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "24px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.65)", flexShrink: 0 }} />
                  <span className="label" style={{ color: "#9a9690" }}>Portfolio balance</span>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg width="24" height="6" viewBox="0 0 24 6" aria-hidden="true">
                    <line x1="0" y1="3" x2="24" y2="3" stroke="#638479" strokeWidth="1.5" strokeDasharray="4 3" />
                  </svg>
                  <span className="label" style={{ color: "#638479" }}>Buffer account ($360k)</span>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#638479", flexShrink: 0 }} />
                  <span className="label" style={{ color: "#9a9690" }}>Income drawn from buffer</span>
                </span>
              </div>

              {/* Chart */}
              <div className="glass" style={{ padding: "1.5rem 0.5rem 0.75rem 0" }}>
                <WithBufferDiagram />
              </div>

              {/* Caption */}
              <p className="body-sm" style={{ marginTop: "1.25rem", color: "#b8b4ae" }}>
                The 6 down years draw $60k each from the buffer — which is why the buffer reaches $0 at year 13 (6 years × $60k = $360k total). But the portfolio is untouched during those years, so it still holds <strong style={{ color: "#f5f2ed", fontWeight: 400 }}>$191k at year 13</strong> — versus $0 in the scenario without a buffer. The portfolio continues to year 15 and beyond.
              </p>
            </div>
          </div>

          <p style={{ marginTop: "2.5rem", color: "#6a6760", textAlign: "center", fontSize: "0.68rem", fontFamily: "'Inter', sans-serif", letterSpacing: "0.06em" }}>
            Illustrative only. Assumes $1M start, $60k/year income, +12% up years, −25% down years. Not a projection or guarantee of future results.
          </p>
        </ScrollReveal>
      </section>

      {/* ── WHY WHOLE LIFE ───────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="container-site">
          <div className="grid-split" style={{ alignItems: "start" }}>
            <ScrollReveal>
              <p className="label" style={{ marginBottom: "0.875rem" }}>The SAFE Account</p>
              <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.75rem" }}>Why only one account type qualifies.</h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>We evaluated every major asset class as a potential volatility buffer. Cash and savings accounts don't grow enough. Brokerage accounts are market-correlated. Real estate isn't liquid. Retirement accounts create tax drag on every withdrawal.</p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>A specially-designed whole life insurance policy — built specifically for <Tooltip term="cash value" definition="The savings component inside a permanent life insurance policy. It grows over time, is accessible via policy loans, and is guaranteed not to decrease." /> accumulation, not death benefit — is the only account that meets every requirement.</p>
              <p className="body-lg">This is not a traditional whole life policy you buy off the shelf. It's a policy engineered to maximize accessible, tax-free <Tooltip term="policy loans" definition="Borrowing against the cash value in your life insurance policy. No credit check, no repayment schedule, no tax event — the cash value continues to grow as if the loan was never taken." /> with guaranteed, non-correlated growth.</p>
            </ScrollReveal>

            <ScrollReveal delay={150} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Non-correlated to the market", "Guaranteed — no downside risk", "Tax-free access to cash value", "Liquid — accessible when needed", "Predictable, measurable growth", "Secured — no market loss exposure"].map((item, i) => (
                <div key={i} className="glass-subtle" style={{ padding: "1.25rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                  <p className="body-sm" style={{ margin: 0, color: "#D3CFC3" }}>{item}</p>
                  <span style={{ color: "#638479", flexShrink: 0, fontSize: "0.65rem", letterSpacing: "0.1em" }}>——</span>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FUNDING ──────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#070707" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "860px" }}>
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
        </ScrollReveal>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#0a0a0a" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "860px" }}>
          <p className="label" style={{ marginBottom: "0.875rem" }}>Common Questions</p>
          <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "3.5rem" }}>What people typically want to know.</h2>
          <Accordion items={faqItems} />
        </ScrollReveal>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section" style={{ backgroundColor: "#050505" }}>
        <ScrollReveal className="container-site" style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div className="glass" style={{ padding: "4rem", textAlign: "center" }}>
            <p className="label" style={{ marginBottom: "1.25rem" }}>Next Step</p>
            <h2 className="headline-md" style={{ color: "#f5f2ed", marginBottom: "1.5rem" }}>Run your numbers with us.</h2>
            <p className="body-lg" style={{ marginBottom: "2.5rem" }}>Book a free SAFE Method strategy call. We'll build a custom retirement income simulation using your actual numbers. No obligation.</p>
            <a href="https://calendar.app.google/qWDAQ1Af6VZSWcV56" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Free Call
            </a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
