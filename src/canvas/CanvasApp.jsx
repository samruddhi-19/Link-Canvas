import React, { useState } from "react";
import "./canvas.css";

const PRESET_STARTUP_DATA = {
  d2c: {
    title: "Instant Sattu Plant-Protein Drink",
    problem: {
      title: "1. Problem",
      tag: "Top 3 Frustrations",
      theme: "box-problem",
      bullets: [
        "Traditional sattu requires messy manual mixing, clumps easily, and lacks appealing modern flavors.",
        "Busy professionals skip breakfast or rely on sugary, ultra-processed morning beverages for quick energy.",
        "Available protein drinks are full of synthetic whey, artificial sweeteners, or cause digestive bloating."
      ],
      subLabel: "Existing Alternatives:",
      subText: "Loose sattu from kirana stores; Commercial whey shakes; Packaged cold brews & bottled lassis."
    },
    segments: {
      title: "2. Customer Segments",
      tag: "Target Personas",
      theme: "box-segments",
      bullets: [
        "Urban working professionals skipping breakfast due to morning commute rush.",
        "Health-conscious fitness seekers looking for affordable, clean plant protein.",
        "Hostel & university students living without kitchen access looking for cheap nutrition."
      ],
      subLabel: "Early Adopters:",
      subText: "Urban millennials (24–35) who grew up with traditional sattu but stopped due to prep friction."
    },
    uvp: {
      title: "3. Unique Value Proposition",
      tag: "Core Promise",
      theme: "box-uvp",
      bullets: [
        "Clean, gut-friendly plant energy ready in 30 seconds—just shake with cold water, zero clumps, zero prep mess.",
        "100% natural roasted gram flour packed with 12g native plant protein & prebiotic dietary fiber."
      ],
      subLabel: "High-Level Concept:",
      subText: "Nespresso convenience meets traditional superfood nutrition in single-serve pouches."
    },
    solution: {
      title: "4. Solution",
      tag: "Key Features",
      theme: "box-solution",
      bullets: [
        "Micro-milled instant dissolving formulation (no clumps, shakes smooth in cold water).",
        "Exciting natural flavor variants (Jeera Masala, Sweet Cardamom, Mango Jaggery).",
        "Single-serve pocket sachets with shaker ball included in starter kit."
      ]
    },
    channels: {
      title: "5. Channels",
      tag: "Path to Users",
      theme: "box-channels",
      bullets: [
        "Direct-to-Consumer (D2C) website with starter trial packs and subscriptions.",
        "Quick-commerce presence on Blinkit, Zepto, and Instamart in metro tech hubs.",
        "Gym & co-working space sampling kiosks."
      ]
    },
    revenue: {
      title: "6. Revenue Streams",
      tag: "Monetization",
      theme: "box-revenue",
      bullets: [
        "Single-purchase 15-pack boxes ($18 / ₹499).",
        "Monthly replenishment subscription (15% discount + free shaker bottle).",
        "B2B corporate pantry bulk orders."
      ]
    },
    cost: {
      title: "7. Cost Structure",
      tag: "Key Expenses",
      theme: "box-cost",
      bullets: [
        "Chana procurement & micronized roasting manufacturing contract.",
        "Food-grade moisture-barrier sachet packaging and foil printing.",
        "Performance marketing (Meta & Google search CAC)."
      ]
    },
    metrics: {
      title: "8. Key Metrics",
      tag: "Key Numbers",
      theme: "box-metrics",
      bullets: [
        "First-to-second box repeat purchase rate (Target > 35% in 45 days).",
        "Customer Acquisition Cost (CAC) to 6-month LTV ratio (> 3.5x).",
        "Daily Active Shakers (DAS) tracking user morning habit formation."
      ]
    },
    advantage: {
      title: "9. Unfair Advantage",
      tag: "Competitive Moat",
      theme: "box-advantage",
      bullets: [
        "Proprietary cold-milling agglomeration process that dissolves in cold water without stabilizers.",
        "Direct farm-level roasted Bengal gram sourcing with higher natural protein yield."
      ]
    }
  },
  hyperlocal: {
    title: "15-Min Artisan Bakery & Coffee",
    problem: {
      title: "1. Problem",
      tag: "Top 3 Frustrations",
      theme: "box-problem",
      bullets: [
        "Suburban residents have zero access to fresh artisan bakery products without driving 30+ mins.",
        "Traditional food delivery platforms take 45-60 mins; bakery items arrive cold or crushed.",
        "Local boutique bakeries lack dedicated fast logistics for perishable morning pastries."
      ],
      subLabel: "Existing Alternatives:",
      subText: "Supermarket packaged toast bread; Stale coffee pods; Long drive to downtown bakery."
    },
    segments: {
      title: "2. Customer Segments",
      tag: "Target Personas",
      theme: "box-segments",
      bullets: [
        "Work-from-home professionals wanting fresh morning pastry with specialty coffee.",
        "Suburban families hosting weekend brunches & morning gatherings.",
        "Boutique bakeries needing morning delivery capacity."
      ],
      subLabel: "Early Adopters:",
      subText: "Tech-savvy remote workers in gated suburban communities."
    },
    uvp: {
      title: "3. Unique Value Proposition",
      tag: "Core Promise",
      theme: "box-uvp",
      bullets: [
        "Oven-warm artisan sourdough & fresh micro-roasted coffee delivered to your door in under 15 minutes.",
        "Zero quality loss via heated insulated micro-depot lockers."
      ],
      subLabel: "High-Level Concept:",
      subText: "Blinkit speed meets blue-ribbon French bakery quality at your doorstep."
    },
    solution: {
      title: "4. Solution",
      tag: "Key Features",
      theme: "box-solution",
      bullets: [
        "Neighborhood micro-hubs with specialized warming stations for par-baked artisan goods.",
        "Curated daily morning drop menus from top city bakeries.",
        "1-tap instant morning recurring subscription ordering."
      ]
    },
    channels: {
      title: "5. Channels",
      tag: "Path to Users",
      theme: "box-channels",
      bullets: [
        "Direct iOS/Android mobile ordering app.",
        "Suburban community WhatsApp group partnerships & HOA flyers.",
        "Bakery packaging co-branding promos."
      ]
    },
    revenue: {
      title: "6. Revenue Streams",
      tag: "Monetization",
      theme: "box-revenue",
      bullets: [
        "Per-order delivery fee ($2.49) + markup on curated bakery items.",
        "VIP Morning Club subscription ($9.99/mo for free 15-min delivery).",
        "Corporate catering & weekend brunch bundles."
      ]
    },
    cost: {
      title: "7. Cost Structure",
      tag: "Key Expenses",
      theme: "box-cost",
      bullets: [
        "Micro-hub modular lease and commercial warming lockers.",
        "Dedicated e-bike courier fleet and hourly wages.",
        "App maintenance and local neighborhood CAC."
      ]
    },
    metrics: {
      title: "8. Key Metrics",
      tag: "Key Numbers",
      theme: "box-metrics",
      bullets: [
        "Average delivery time (Target under 14 mins).",
        "Weekly recurring morning customer retention (over 42%).",
        "Average Order Value ($22+ per morning basket)."
      ]
    },
    advantage: {
      title: "9. Unfair Advantage",
      tag: "Competitive Moat",
      theme: "box-advantage",
      bullets: [
        "Exclusive suburban distribution contracts with top 5 artisan bakeries in the metro region.",
        "Proprietary predictive morning batch-warming routing algorithm."
      ]
    }
  }
};

export default function CanvasApp({ t }) {
  const [viewMode, setViewMode] = useState("initial"); // "initial" | "horizontal-canvas"
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideaText, setIdeaText] = useState(
    "15-minute delivery of artisanal bakery goods & specialty coffee for suburban neighborhoods."
  );
  const [activePreset, setActivePreset] = useState("hyperlocal");
  const [canvasData, setCanvasData] = useState(PRESET_STARTUP_DATA.hyperlocal);

  const sampleIdeas = [
    { label: "⚡ Hyperlocal Delivery", key: "hyperlocal", text: "15-minute delivery of artisanal bakery goods & specialty coffee for suburban neighborhoods." },
    { label: "☕ D2C Food Brand", key: "d2c", text: "An instant flavored sattu drink for busy urban professionals looking for clean morning plant nutrition." },
    { label: "💼 AI for Lawyers", key: "hyperlocal", text: "An AI-powered workspace for boutique corporate law firms to draft and audit contracts 10x faster." },
    { label: "🚀 SaaS Platform", key: "hyperlocal", text: "An all-in-one developer platform for real-time edge API monitoring and automated latency alerting." },
  ];

  function handleSelectIdea(item) {
    setIdeaText(item.text);
    setActivePreset(item.key);
    setCanvasData(PRESET_STARTUP_DATA[item.key] || PRESET_STARTUP_DATA.hyperlocal);
  }

  function handleGenerate() {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setViewMode("horizontal-canvas");
    }, 400);
  }

  function handleInsertCards(boxName, bullets) {
    if (t && typeof t.alert === "function") {
      t.alert({
        message: `Success! Added ${boxName} cards to your Trello board list.`,
        duration: 3
      });
    } else {
      alert(`Success! Inserted ${boxName} (${bullets ? bullets.length : 'all'} items) into your Trello board list as new cards.`);
    }
  }

  // =========================================================================
  // VIEW 2: Full Horizontal 5-Column Ash Maurya Lean Canvas Board
  // =========================================================================
  if (viewMode === "horizontal-canvas") {
    return (
      <div className="canvas-wrapper horizontal-mode animate-fade-in">
        {/* Pinned Top Bar */}
        <div className="canvas-modal-header horizontal-header">
          <div className="header-left">
            <button
              type="button"
              onClick={() => setViewMode("initial")}
              className="btn-back-compact"
              title="Return to initial prompt"
            >
              ← Back to Prompt
            </button>
            <div className="canvas-title-pill-group">
              <span className="live-idea-title">{canvasData.title || "Lean Canvas Blueprint"}</span>
              <span className="status-badge-live">● 9 Blocks Live</span>
            </div>
          </div>

          <div className="header-actions-right">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-header-secondary"
            >
              <span>✨</span>
              <span>{isGenerating ? "Regenerating..." : "Regenerate"}</span>
            </button>
            <button
              type="button"
              onClick={() => handleInsertCards("All 9 Blocks")}
              className="btn-header-primary"
            >
              <span>📋</span>
              <span>Sync All to Trello</span>
            </button>
          </div>
        </div>

        {/* 5-Column Ash Maurya Horizontal Lean Canvas Grid */}
        <div className="canvas-modal-body horizontal-body">
          <div className="lean-canvas-horizontal-grid">
            {/* ---------------------------------------------------- */}
            {/* COLUMN 1: Problem + Existing Alternatives            */}
            {/* ---------------------------------------------------- */}
            <div className="lean-col col-1">
              <div className="lean-box-card box-problem">
                <div className="box-top-row">
                  <span className="box-heading-title">{canvasData.problem.title}</span>
                  <span className="box-badge-tag">{canvasData.problem.tag}</span>
                </div>
                <ul className="box-bullets-list">
                  {canvasData.problem.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                {canvasData.problem.subLabel && (
                  <div className="sub-framework-callout">
                    <span className="sub-framework-label">{canvasData.problem.subLabel}</span>
                    <span className="sub-framework-text">{canvasData.problem.subText}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="btn-card-push"
                  onClick={() => handleInsertCards(canvasData.problem.title, canvasData.problem.bullets)}
                >
                  <span>📋 To Cards</span>
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* COLUMN 2: Solution + Key Metrics                    */}
            {/* ---------------------------------------------------- */}
            <div className="lean-col col-2">
              {/* Solution (Top) */}
              <div className="lean-box-card box-solution flex-1">
                <div className="box-top-row">
                  <span className="box-heading-title">{canvasData.solution.title}</span>
                  <span className="box-badge-tag">{canvasData.solution.tag}</span>
                </div>
                <ul className="box-bullets-list">
                  {canvasData.solution.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn-card-push"
                  onClick={() => handleInsertCards(canvasData.solution.title, canvasData.solution.bullets)}
                >
                  <span>📋 To Cards</span>
                </button>
              </div>

              {/* Key Metrics (Bottom) */}
              <div className="lean-box-card box-metrics flex-1">
                <div className="box-top-row">
                  <span className="box-heading-title">{canvasData.metrics.title}</span>
                  <span className="box-badge-tag">{canvasData.metrics.tag}</span>
                </div>
                <ul className="box-bullets-list">
                  {canvasData.metrics.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn-card-push"
                  onClick={() => handleInsertCards(canvasData.metrics.title, canvasData.metrics.bullets)}
                >
                  <span>📋 To Cards</span>
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* COLUMN 3: Unique Value Proposition (Hero Center)     */}
            {/* ---------------------------------------------------- */}
            <div className="lean-col col-3">
              <div className="lean-box-card box-uvp center-hero-box">
                <div className="box-top-row">
                  <span className="box-heading-title">{canvasData.uvp.title}</span>
                  <span className="box-badge-tag">{canvasData.uvp.tag}</span>
                </div>
                <ul className="box-bullets-list">
                  {canvasData.uvp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                {canvasData.uvp.subLabel && (
                  <div className="sub-framework-callout uvp-highlight">
                    <span className="sub-framework-label">{canvasData.uvp.subLabel}</span>
                    <span className="sub-framework-text">{canvasData.uvp.subText}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="btn-card-push"
                  onClick={() => handleInsertCards(canvasData.uvp.title, canvasData.uvp.bullets)}
                >
                  <span>📋 To Cards</span>
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* COLUMN 4: Unfair Advantage + Channels               */}
            {/* ---------------------------------------------------- */}
            <div className="lean-col col-4">
              {/* Unfair Advantage (Top) */}
              <div className="lean-box-card box-advantage flex-1">
                <div className="box-top-row">
                  <span className="box-heading-title">{canvasData.advantage.title}</span>
                  <span className="box-badge-tag">{canvasData.advantage.tag}</span>
                </div>
                <ul className="box-bullets-list">
                  {canvasData.advantage.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn-card-push"
                  onClick={() => handleInsertCards(canvasData.advantage.title, canvasData.advantage.bullets)}
                >
                  <span>📋 To Cards</span>
                </button>
              </div>

              {/* Channels (Bottom) */}
              <div className="lean-box-card box-channels flex-1">
                <div className="box-top-row">
                  <span className="box-heading-title">{canvasData.channels.title}</span>
                  <span className="box-badge-tag">{canvasData.channels.tag}</span>
                </div>
                <ul className="box-bullets-list">
                  {canvasData.channels.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="btn-card-push"
                  onClick={() => handleInsertCards(canvasData.channels.title, canvasData.channels.bullets)}
                >
                  <span>📋 To Cards</span>
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* COLUMN 5: Customer Segments + Early Adopters         */}
            {/* ---------------------------------------------------- */}
            <div className="lean-col col-5">
              <div className="lean-box-card box-segments">
                <div className="box-top-row">
                  <span className="box-heading-title">{canvasData.segments.title}</span>
                  <span className="box-badge-tag">{canvasData.segments.tag}</span>
                </div>
                <ul className="box-bullets-list">
                  {canvasData.segments.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                {canvasData.segments.subLabel && (
                  <div className="sub-framework-callout">
                    <span className="sub-framework-label">{canvasData.segments.subLabel}</span>
                    <span className="sub-framework-text">{canvasData.segments.subText}</span>
                  </div>
                )}
                <button
                  type="button"
                  className="btn-card-push"
                  onClick={() => handleInsertCards(canvasData.segments.title, canvasData.segments.bullets)}
                >
                  <span>📋 To Cards</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Horizontal Span: Cost Structure + Revenue Streams */}
          <div className="lean-canvas-horizontal-bottom">
            {/* 7. Cost Structure */}
            <div className="lean-box-card box-cost">
              <div className="box-top-row">
                <span className="box-heading-title">{canvasData.cost.title}</span>
                <span className="box-badge-tag">{canvasData.cost.tag}</span>
              </div>
              <ul className="box-bullets-list">
                {canvasData.cost.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <button
                type="button"
                className="btn-card-push"
                onClick={() => handleInsertCards(canvasData.cost.title, canvasData.cost.bullets)}
              >
                <span>📋 To Cards</span>
              </button>
            </div>

            {/* 6. Revenue Streams */}
            <div className="lean-box-card box-revenue">
              <div className="box-top-row">
                <span className="box-heading-title">{canvasData.revenue.title}</span>
                <span className="box-badge-tag">{canvasData.revenue.tag}</span>
              </div>
              <ul className="box-bullets-list">
                {canvasData.revenue.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <button
                type="button"
                className="btn-card-push"
                onClick={() => handleInsertCards(canvasData.revenue.title, canvasData.revenue.bullets)}
              >
                <span>📋 To Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pinned Footer */}
        <div className="canvas-modal-footer">
          <div className="footer-status-pill">
            <span className="status-dot"></span>
            <span>Link Canvas 2.0 • Ash Maurya Framework</span>
          </div>
          <div className="footer-meta">
            <span>5-Column Widescreen Lean Canvas • Ready to Push to Board</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: Initial Prompt Screen (Centered Modal with Quick Starters)
  // =========================================================================
  return (
    <div className="canvas-wrapper initial-mode animate-fade-in">
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
      <div className="canvas-modal-body initial-body">
        {/* Main AI Hero Card */}
        <div className="ai-hero-card">
          <div className="card-top-eyebrow">
            <span className="sparkle-icon">✦</span>
            <span>AI Prompt</span>
          </div>

          <h3 className="hero-main-title">Generate Your 9-Box Lean Canvas</h3>
          <p className="hero-subtext">
            Describe your startup or product idea. Link Canvas will draft all 9 Ash Maurya building blocks for you.
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
                  onClick={() => handleSelectIdea(item)}
                  className={`chip-pill ${ideaText === item.text ? "active" : ""}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-generate-primary"
            >
              <span className="btn-sparkle">✨</span>
              <span>{isGenerating ? "Drafting Canvas..." : "Generate 9-Box Lean Canvas"}</span>
            </button>
          </div>

          {/* Embedded 9-Box Blueprint Schematic Diagram */}
          <div
            className="schematic-blueprint-card"
            onClick={handleGenerate}
            title="Click to generate and expand into full horizontal canvas"
          >
            <div className="schematic-grid">
              <div className="blueprint-col">
                <div className="blueprint-box box-problem">
                  <span className="box-title">Problem</span>
                  <span className="box-hint">Top 3 pain points</span>
                </div>
                <div className="blueprint-box box-metrics">
                  <span className="box-title">Key Metrics</span>
                  <span className="box-hint">Key tracking numbers</span>
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
                  <span className="box-hint">Cannot be copied</span>
                </div>
                <div className="blueprint-box box-channels">
                  <span className="box-title">Channels</span>
                  <span className="box-hint">Path to customers</span>
                </div>
              </div>

              <div className="blueprint-col">
                <div className="blueprint-box box-segments highlight-side">
                  <span className="box-title">Customer Segments</span>
                  <span className="box-hint">Target personas & adopters</span>
                </div>
              </div>
            </div>

            <div className="schematic-bottom-row">
              <div className="blueprint-box box-cost">
                <span className="box-title">Cost Structure</span>
                <span className="box-hint">Acquisition, infrastructure, hosting</span>
              </div>
              <div className="blueprint-box box-revenue">
                <span className="box-title">Revenue Streams</span>
                <span className="box-hint">Pricing, subscriptions, monetization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Row: Blank Grid & Templates */}
        <div className="bottom-trays-container">
          <div className="tray-card" onClick={handleGenerate}>
            <div className="tray-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
            </div>
            <div className="tray-text-group">
              <h4 className="tray-title">Blank Grid</h4>
              <p className="tray-desc">open clean 9-box horizontal canvas</p>
            </div>
          </div>

          <div className="tray-card" onClick={() => { handleSelectIdea(sampleIdeas[1]); handleGenerate(); }}>
            <div className="tray-badges-row">
              <span className="company-badge uber">Uber</span>
              <span className="company-badge stripe">S</span>
              <span className="company-badge airbnb">airbnb</span>
            </div>
            <div className="tray-text-group">
              <h4 className="tray-title">Load Templates</h4>
              <p className="tray-desc">explore real-world examples in 5-column view</p>
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
