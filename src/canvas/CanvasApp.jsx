import React, { useState } from "react";
import "./canvas.css";

export default function CanvasApp({ t }) {
  const [ideaText, setIdeaText] = useState(
    "An instant flavored sattu drink for busy urban professionals who need quick morning plant nutrition."
  );

  const sampleIdeas = [
    { label: "☕ D2C Food Brand", text: "An instant flavored sattu drink for busy urban professionals looking for clean morning plant nutrition." },
    { label: "💻 AI Notion for Lawyers", text: "An AI-powered workspace for boutique corporate law firms to draft and audit contracts 10x faster." },
    { label: "🛍️ Hyperlocal Dark Store", text: "15-minute delivery of artisanal bakery goods and specialty coffee beans for suburban neighborhoods." },
    { label: "🚗 Mobile Pet Grooming", text: "On-demand self-contained mobile van grooming service for busy apartment pet parents." },
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
    alert("Opening blank 9-box Lean Canvas grid.");
  }

  function handleLoadTemplate() {
    alert("Loading reference Lean Canvas template (Uber / Airbnb model).");
  }

  return (
    <div className="canvas-wrapper">
      {/* Header */}
      <div className="canvas-modal-header">
        <div className="header-left">
          <div className="icon-box">✨</div>
          <div className="header-titles">
            <h2>
              Smart Canvas Creation
              <span className="header-badge">9-Box First Draft</span>
            </h2>
            <p className="header-subtitle">Instead of staring at 9 empty boxes, get an actionable first draft.</p>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="canvas-modal-body">
        {/* AI Hero Prompt Card */}
        <div className="ai-hero-card">
          <div className="card-eyebrow">⚡ Quick-Start With AI</div>

          <h3 className="input-label">What are you building?</h3>
          <p className="input-desc">
            Describe your product idea or service in a sentence or two. AI will draft all 9 Lean Canvas boxes for you.
          </p>

          <textarea
            className="prompt-textarea"
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
            placeholder="e.g. An instant flavored sattu drink for busy people..."
            rows={2}
          />

          <div className="chips-row">
            <span className="chips-label">Try ideas:</span>
            {sampleIdeas.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setIdeaText(item.text)}
                className="chip-btn"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="card-actions">
            <span className="btn-preview-link">
              💡 Drafts Problem, Customer Segments, Value Prop & 6 more boxes
            </span>

            <button type="button" onClick={handleGenerateDraft} className="btn-generate">
              <span>✨</span>
              <span>Generate 9-Box First Draft</span>
            </button>
          </div>
        </div>

        {/* Alternative Ways to Start */}
        <div className="alternatives-container">
          <div className="alt-card" onClick={handleStartBlank}>
            <div className="alt-icon blank">📋</div>
            <div className="alt-text">
              <h4>Start with Blank 9-Box Canvas</h4>
              <p>Prefer writing yourself? Open clean empty grid.</p>
            </div>
          </div>

          <div className="alt-card" onClick={handleLoadTemplate}>
            <div className="alt-icon template">📁</div>
            <div className="alt-text">
              <h4>Explore Pre-built Examples</h4>
              <p>Load Uber, Airbnb, or Stripe business model.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="canvas-modal-footer">
        <div className="footer-badge">
          <span className="dot"></span>
          <span>Link Canvas 2.0 • Ash Maurya Framework</span>
        </div>
        <div>
          <span>AI-Powered Lean Canvas</span>
        </div>
      </div>
    </div>
  );
}
