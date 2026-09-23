import React, { useState } from "react";
import "./canvas.css";

export default function CanvasApp({ t }) {
  const [ideaText, setIdeaText] = useState(
    "An instant flavored sattu drink for busy urban professionals who need quick morning plant nutrition."
  );

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
    alert(`Drafting 9-Box Lean Canvas for:\n\n"${ideaText}"\n\n(AI generation module ready to hook to Gemini API / prompt)`);
  }

  function handleStartBlank() {
    alert("Opening clean blank 9-box Lean Canvas grid.");
  }

  function handleLoadTemplate(name) {
    alert(`Loading ${name || "Uber / Stripe"} Lean Canvas template.`);
  }

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

            <button type="button" onClick={handleGenerateDraft} className="btn-generate-primary">
              <span className="btn-sparkle">✨</span>
              <span>Generate 9-Box Lean Canvas</span>
            </button>
          </div>

          {/* Embedded 9-Box Blueprint Schematic Diagram */}
          <div className="schematic-blueprint-card">
            <div className="schematic-grid">
              {/* Column 1: Problem & Key Metrics */}
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

              {/* Column 2: Solution */}
              <div className="blueprint-col">
                <div className="blueprint-box box-solution">
                  <span className="box-title">Solution</span>
                  <span className="box-hint">Top 3 key features</span>
                </div>
              </div>

              {/* Column 3: Unique Value Proposition (Center Tall) */}
              <div className="blueprint-col">
                <div className="blueprint-box box-uvp highlight-center">
                  <span className="box-title">Unique Value Proposition</span>
                  <span className="box-hint">Clear, compelling message</span>
                </div>
              </div>

              {/* Column 4: Unfair Advantage & Channels */}
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

              {/* Column 5: Customer Segments (Right Tall) */}
              <div className="blueprint-col">
                <div className="blueprint-box box-segments highlight-side">
                  <span className="box-title">Customer Segments</span>
                  <span className="box-hint">Target customers & early adopters</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Cost Structure & Revenue Streams */}
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
