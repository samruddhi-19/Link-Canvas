import React, { useState } from "react";
import "./canvas.css";

const DEFAULT_SAMPLE_CANVAS = {
  problem: {
    bullets: [
      "Traditional sattu requires messy manual mixing, clumps easily, and lacks appealing modern flavors.",
      "Busy professionals skip breakfast or rely on sugary, ultra-processed morning beverages for quick energy.",
      "Available protein drinks are full of synthetic whey, artificial sweeteners, or cause digestive bloating."
    ],
    subTitle: "Existing Alternatives:",
    subText: "Loose unflavored sattu powder from kirana stores; Commercial whey protein shakes; Packaged cold-brew iced teas & sweet bottled lassis."
  },
  segments: {
    bullets: [
      "Urban working professionals skipping breakfast due to morning commute pressure.",
      "Health-conscious fitness seekers looking for affordable, clean plant protein.",
      "Hostel & university students living without kitchen access looking for cheap nutrition."
    ],
    subTitle: "Early Adopters:",
    subText: "Urban millennials (24–35) who grew up with traditional sattu but stopped due to prep friction."
  },
  uvp: {
    bullets: [
      "Clean, gut-friendly plant energy ready in 30 seconds—just shake with water, zero clumps, zero prep mess.",
      "100% natural roasted gram flour packed with 12g native plant protein & prebiotic dietary fiber."
    ],
    subTitle: "High-Level Concept:",
    subText: "Nespresso convenience meets traditional superfood nutrition in single-serve pouches."
  },
  solution: {
    bullets: [
      "Micro-milled instant dissolving formulation (no clumps, shakes smooth in cold water).",
      "Exciting natural flavor variants (Jeera Masala, Sweet Cardamom, Mango Jaggery).",
      "Single-serve pocket sachets with shaker ball included in starter kit."
    ]
  },
  channels: {
    bullets: [
      "Direct-to-Consumer (D2C) website with starter trial packs and recurring subscriptions.",
      "Quick-commerce presence on Blinkit, Zepto, and Instamart in metro tech hubs.",
      "Gym & co-working space sampling kiosks."
    ]
  },
  revenue: {
    bullets: [
      "Single-purchase 15-pack boxes ($18 / ₹499).",
      "Monthly replenishment subscription (15% discount + free shaker bottle).",
      "B2B corporate pantry bulk orders."
    ]
  },
  cost: {
    bullets: [
      "Chana procurement & micronized roasting manufacturing contract.",
      "Food-grade moisture-barrier sachet packaging and foil printing.",
      "Performance marketing (Meta & Google search CAC)."
    ]
  },
  metrics: {
    bullets: [
      "First-to-second box repeat purchase rate (> 35% in 45 days).",
      "Customer Acquisition Cost (CAC) to 6-month LTV ratio (> 3.5x).",
      "Daily Active Shakers (DAS) tracking user morning habit formation."
    ]
  },
  advantage: {
    bullets: [
      "Proprietary cold-milling agglomeration process that dissolves in cold water without stabilizers.",
      "Direct farm-level roasted Bengal gram sourcing with higher natural protein yield."
    ]
  }
};

export default function CanvasApp({ t }) {
  const [activeView, setActiveView] = useState("prompt"); // "prompt" | "draft"
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideaText, setIdeaText] = useState(
    "An instant flavored sattu drink for busy urban professionals who need quick morning plant nutrition."
  );
  const [canvasData, setCanvasData] = useState(DEFAULT_SAMPLE_CANVAS);

  const sampleIdeas = [
    { label: "☕ D2C Food Brand", text: "An instant flavored sattu drink for busy urban professionals looking for clean morning plant nutrition." },
    { label: "💼 AI for Lawyers", text: "An AI-powered workspace for boutique corporate law firms to draft and audit contracts 10x faster." },
    { label: "⚡ Hyperlocal Delivery", text: "15-minute delivery of artisanal bakery goods and specialty coffee beans for suburban neighborhoods." },
    { label: "🚀 SaaS Platform", text: "An all-in-one developer platform for real-time edge API monitoring and automated latency alerting." },
  ];

  function handleClose() {
    if (t && typeof t.closeModal === "function") {
      t.closeModal();
    }
  }

  function handleGenerateDraft() {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveView("draft");
    }, 450);
  }

  function handleStartBlank() {
    setActiveView("draft");
  }

  function handleLoadTemplate(name) {
    setActiveView("draft");
  }

  function handleInsertCards(boxName) {
    alert(`Success! Inserted ${boxName || "Canvas"} items into your Trello board list as new cards.`);
  }

  // ==========================================
  // VIEW 2: Generated 9-Box Populated Canvas
  // ==========================================
  if (activeView === "draft") {
    return (
      <div className="canvas-wrapper">
        {/* Top Header */}
        <div className="canvas-modal-header">
          <div className="header-left">
            <button
              type="button"
              onClick={() => setActiveView("prompt")}
              className="btn-back-prompt"
              title="Return to Idea Prompt"
            >
              ← Back to Prompt
            </button>
            <div className="brand-title-group">
              <h2 className="brand-name" style={{ fontSize: "15px" }}>First Draft: All 9 Lean Canvas Boxes</h2>
              <span className="status-badge-green">● All 9 Boxes Populated</span>
            </div>
          </div>
          <div className="header-actions-right">
            <button
              type="button"
              onClick={handleGenerateDraft}
              className="btn-header-secondary"
            >
              <span>✨</span>
              <span>Regenerate</span>
            </button>
            <button
              type="button"
              onClick={() => handleInsertCards("All 9 Boxes")}
              className="btn-header-primary"
            >
              <span>📋</span>
              <span>Convert to Trello Cards</span>
            </button>
          </div>
        </div>

        {/* 9-Box Populated Grid */}
        <div className="canvas-modal-body draft-grid-body">
          <div className="populated-9box-grid">
            {/* 1. PROBLEM */}
            <div className="populated-box-card box-theme-problem">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">1. Problem</span>
                  <span className="pop-box-tag">Top 3 Frustrations</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.problem.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
              <div className="pop-sub-callout">
                <span className="pop-sub-label">{canvasData.problem.subTitle}</span>
                <span className="pop-sub-text">{canvasData.problem.subText}</span>
              </div>
            </div>

            {/* 2. CUSTOMER SEGMENTS */}
            <div className="populated-box-card box-theme-segments">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">2. Customer Segments</span>
                  <span className="pop-box-tag">Target Personas</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.segments.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
              <div className="pop-sub-callout">
                <span className="pop-sub-label">{canvasData.segments.subTitle}</span>
                <span className="pop-sub-text">{canvasData.segments.subText}</span>
              </div>
            </div>

            {/* 3. VALUE PROPOSITION */}
            <div className="populated-box-card box-theme-uvp">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">3. Value Proposition</span>
                  <span className="pop-box-tag">Core Differentiator</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.uvp.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
              <div className="pop-sub-callout">
                <span className="pop-sub-label">{canvasData.uvp.subTitle}</span>
                <span className="pop-sub-text">{canvasData.uvp.subText}</span>
              </div>
            </div>

            {/* 4. SOLUTION */}
            <div className="populated-box-card box-theme-solution">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">4. Solution</span>
                  <span className="pop-box-tag">Key Features</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.solution.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleInsertCards("Solution")}
                className="btn-card-insert-action"
              >
                <span>📋</span>
                <span>To Cards: Insert into List</span>
              </button>
            </div>

            {/* 5. CHANNELS */}
            <div className="populated-box-card box-theme-channels">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">5. Channels</span>
                  <span className="pop-box-tag">Path to Customers</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.channels.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 6. REVENUE STREAMS */}
            <div className="populated-box-card box-theme-revenue">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">6. Revenue Streams</span>
                  <span className="pop-box-tag">Pricing & Model</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.revenue.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7. COST STRUCTURE */}
            <div className="populated-box-card box-theme-cost">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">7. Cost Structure</span>
                  <span className="pop-box-tag">Fixed & Variable</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.cost.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 8. KEY METRICS */}
            <div className="populated-box-card box-theme-metrics">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">8. Key Metrics</span>
                  <span className="pop-box-tag">Key Numbers</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.metrics.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 9. UNFAIR ADVANTAGE */}
            <div className="populated-box-card box-theme-advantage">
              <div>
                <div className="pop-box-header">
                  <span className="pop-box-title">9. Unfair Advantage</span>
                  <span className="pop-box-tag">Competitive Moat</span>
                </div>
                <ul className="pop-bullet-list">
                  {canvasData.advantage.bullets.map((b, i) => (
                    <li key={i} className="pop-bullet-item">{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="canvas-modal-footer">
          <div className="footer-status-pill">
            <span className="status-dot"></span>
            <span>Link Canvas 2.0 • Ash Maurya Framework</span>
          </div>
          <div className="footer-meta">
            <span>AI-Generated First Draft • Ready to Sync to Trello</span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 1: Initial Prompt Screen (Concept 1)
  // ==========================================
  return (
    <div className="canvas-wrapper">
      {/* Top Header */}
      <div className="canvas-modal-header">
        <div className="header-left">
          <div className="brand-logo-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <div className="brand-title-group">
            <h2 className="brand-name">Link Canvas</h2>
            <span className="brand-pill">9-Box AI Generator</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="canvas-modal-body">
        {/* Main AI Hero Card */}
        <div className="ai-hero-card">
          <div className="card-top-eyebrow">
            <span className="sparkle-icon">✦</span>
            <span>AI Prompt</span>
          </div>

          <h3 className="hero-main-title">Generate Your 9-Box Lean Canvas</h3>
          <p className="hero-subtext">
            Describe your startup or product idea. AI will draft all 9 Lean Canvas building blocks for you.
          </p>

          <div className="prompt-input-wrapper">
            <textarea
              className="prompt-textarea"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="Describe your startup or product idea (e.g., 'A platform for sustainable fashion marketplaces')..."
              rows={2}
            />
          </div>

          {/* Idea Starters Row + CTA Button */}
          <div className="prompt-controls-row">
            <div className="chips-container">
              {sampleIdeas.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setIdeaText(item.text)}
                  className={`chip-pill ${ideaText === item.text ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleGenerateDraft}
              disabled={isGenerating}
              className="btn-generate-primary"
            >
              <span className="btn-sparkle">✨</span>
              <span>{isGenerating ? "Drafting Canvas..." : "Generate 9-Box Lean Canvas"}</span>
            </button>
          </div>

          {/* Embedded 9-Box Blueprint Schematic Diagram (Clickable to view/generate 9 boxes) */}
          <div className="schematic-blueprint-card" onClick={handleGenerateDraft} title="Click to view & generate all 9 boxes" style={{ cursor: "pointer" }}>
            <div className="schematic-grid">
              <div className="blueprint-col">
                <div className="blueprint-box box-problem">
                  <span className="box-title">Problem</span>
                  <span className="box-hint">Top 3 user pain points</span>
                </div>
                <div className="blueprint-box box-metrics">
                  <span className="box-title">Key Metrics</span>
                  <span className="box-hint">Key numbers to measure</span>
                </div>
              </div>

              <div className="blueprint-col">
                <div className="blueprint-box box-solution">
                  <span className="box-title">Solution</span>
                  <span className="box-hint">Top 3 key features</span>
                </div>
              </div>

              <div className="blueprint-col">
                <div className="blueprint-box box-uvp highlight-center">
                  <span className="box-title">Unique Value Proposition</span>
                  <span className="box-hint">Clear, compelling message</span>
                </div>
              </div>

              <div className="blueprint-col">
                <div className="blueprint-box box-advantage">
                  <span className="box-title">Unfair Advantage</span>
                  <span className="box-hint">Cannot be easily copied</span>
                </div>
                <div className="blueprint-box box-channels">
                  <span className="box-title">Channels</span>
                  <span className="box-hint">Path to customers</span>
                </div>
              </div>

              <div className="blueprint-col">
                <div className="blueprint-box box-segments highlight-side">
                  <span className="box-title">Customer Segments</span>
                  <span className="box-hint">Target customers & early adopters</span>
                </div>
              </div>
            </div>

            <div className="schematic-bottom-row">
              <div className="blueprint-box box-cost">
                <span className="box-title">Cost Structure</span>
                <span className="box-hint">Customer acquisition, infrastructure, hosting</span>
              </div>
              <div className="blueprint-box box-revenue">
                <span className="box-title">Revenue Streams</span>
                <span className="box-hint">Subscription pricing, recurring monetization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Row: Blank Grid & Templates */}
        <div className="bottom-trays-container">
          <div className="tray-card" onClick={handleStartBlank}>
            <div className="tray-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <div className="tray-text-group">
              <h4 className="tray-title">Blank Grid</h4>
              <p className="tray-desc">create from scratch with clean 9 boxes</p>
            </div>
          </div>

          <div className="tray-card" onClick={() => handleLoadTemplate("Uber / Stripe")}>
            <div className="tray-badges-row">
              <span className="company-badge uber">Uber</span>
              <span className="company-badge stripe">S</span>
              <span className="company-badge airbnb">airbnb</span>
            </div>
            <div className="tray-text-group">
              <h4 className="tray-title">Load Templates</h4>
              <p className="tray-desc">explore existing examples like Uber, Stripe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="canvas-modal-footer">
        <div className="footer-status-pill">
          <span className="status-dot"></span>
          <span>Link Canvas 2.0 • Ash Maurya Framework</span>
        </div>
        <div className="footer-meta">
          <span>AI-Powered Startup Blueprint</span>
        </div>
      </div>
    </div>
  );
}
