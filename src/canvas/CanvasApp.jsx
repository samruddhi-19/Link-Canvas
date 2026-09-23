import React, { useState } from "react";
import "./canvas.css";

// =========================================================================
// PHASE 2 ICONS (Lucide 14px in 20px chips with 6px radius)
// =========================================================================
const AlertTriangle = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const Lightbulb = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
);

const BarChart3 = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18"/>
    <path d="M18 17V9"/>
    <path d="M13 17V5"/>
    <path d="M8 17v-3"/>
  </svg>
);

const Gift = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect width="20" height="5" x="2" y="7" rx="1"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
  </svg>
);

const Shield = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
  </svg>
);

const Route = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="6" cy="19" r="3"/>
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>
    <circle cx="18" cy="5" r="3"/>
  </svg>
);

const Users = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Tag = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
    <path d="M7 7h.01"/>
  </svg>
);

const Banknote = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="12" x="2" y="6" rx="2"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M6 12h.01M18 12h.01"/>
  </svg>
);

const Grid = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const Sparkles = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const Scale = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/>
    <path d="M12 3v18"/>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </svg>
);

const ShoppingBag = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
    <path d="M3 6h18"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const Zap = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const Rocket = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

// =========================================================================
// PRESET STARTUP DATA (ASH MAURYA LEAN CANVAS)
// =========================================================================
const PRESET_IDEAS = {
  hyperlocal: {
    key: "hyperlocal",
    label: "Hyperlocal delivery",
    icon: Rocket,
    text: "15-minute delivery of artisan bakery goods and specialty coffee for suburban neighborhoods.",
    problem: [
      "Good bakeries are far from suburbs.",
      "Delivery arrives cold and late.",
      "No fresh coffee on demand."
    ],
    solution: [
      "Micro-hubs with warming stations.",
      "Curated morning drop menus.",
      "1-tap recurring breakfast app."
    ],
    keyMetrics: [
      "Delivery time under 14 mins.",
      "30-day repeat order rate > 42%."
    ],
    uvp: "Oven-fresh bread and barista coffee at your door in under 15 minutes.",
    unfairAdvantage: "Exclusive suburban distribution contracts with top 5 artisan bakeries.",
    channels: [
      "Direct mobile ordering app.",
      "Neighborhood WhatsApp groups.",
      "Co-branded bakery packaging."
    ],
    customerSegments: [
      "Suburban remote workers wanting fresh morning pastries.",
      "Suburban families hosting weekend brunches."
    ],
    costStructure: [
      "Hub rent, warming lockers.",
      "App hosting & courier compensation."
    ],
    revenueStreams: [
      "Delivery fee + markup on bakery items.",
      "Monthly Morning Pass subscription."
    ]
  },

  d2c: {
    key: "d2c",
    label: "D2C food brand",
    icon: ShoppingBag,
    text: "An instant flavored sattu drink for busy urban professionals looking for clean morning plant nutrition.",
    problem: [
      "Traditional sattu means messy mixing and clumps.",
      "Busy professionals skip breakfast or grab sugary drinks.",
      "Protein shakes cause digestive bloating."
    ],
    solution: [
      "Micro-milled instant formula shakes in cold water.",
      "Natural flavors: Jeera Masala, Sweet Cardamom.",
      "Single-serve pocket sachets + shaker ball."
    ],
    keyMetrics: [
      "Second-box repeat rate > 35% in 45 days.",
      "CAC to 6-month LTV ratio (> 3.5x)."
    ],
    uvp: "Clean, gut-friendly plant energy ready in 30 seconds. Zero clumps, zero prep mess.",
    unfairAdvantage: "Proprietary cold-milling process that dissolves in cold water without stabilizers.",
    channels: [
      "D2C website with starter trial packs.",
      "Quick commerce on Blinkit, Zepto, Instamart."
    ],
    customerSegments: [
      "Urban working professionals skipping breakfast.",
      "Health-conscious fitness seekers wanting clean protein."
    ],
    costStructure: [
      "Chana procurement & micronized roasting.",
      "Moisture-barrier sachet packaging."
    ],
    revenueStreams: [
      "15-pack boxes at ₹499.",
      "Monthly subscription with 15% discount."
    ]
  },

  lawyers: {
    key: "lawyers",
    label: "AI for lawyers",
    icon: Scale,
    text: "An AI-powered workspace for boutique corporate law firms to draft and audit contracts 10x faster.",
    problem: [
      "Boutique law firms spend 15+ hrs/week on routine contract redlines.",
      "Junior associate turnover is high from tedious NDA reviews.",
      "Missed indemnification loopholes in vendor MSAs."
    ],
    solution: [
      "1-click automated clause risk scoring & redlining engine.",
      "Private firm precedent repository.",
      "Live Word & Google Docs compliance audit plugin."
    ],
    keyMetrics: [
      "Weekly Active Lawyers auditing 5+ contracts.",
      "Net Revenue Retention rate > 125%."
    ],
    uvp: "Audit and draft airtight commercial contracts 10x faster with fine-tuned legal AI.",
    unfairAdvantage: "Proprietary indexed database of 200,000+ negotiated commercial contract redlines.",
    channels: [
      "Outbound demos to managing partners via LinkedIn.",
      "Product-led free tier auditing 3 contracts/month."
    ],
    customerSegments: [
      "Boutique corporate law firms (5–25 attorneys).",
      "In-house legal counsels at fast-growing startups."
    ],
    costStructure: [
      "SOC-2 Type II compliant GPU hosting.",
      "Legal expert continuous benchmarking."
    ],
    revenueStreams: [
      "Per-seat SaaS subscription at ₹12,500/attorney/mo.",
      "Enterprise private VPC deployment fee."
    ]
  },

  saas: {
    key: "saas",
    label: "SaaS platform",
    icon: Zap,
    text: "An all-in-one developer platform for real-time edge API monitoring and automated latency alerting.",
    problem: [
      "Distributed microservices cause silent 5xx API outages.",
      "Teams spend hours digging through noisy Datadog logs.",
      "SLA breaches cost cloud businesses thousands in churn."
    ],
    solution: [
      "eBPF zero-code telemetry tracking every request.",
      "AI root cause analyzer identifying failing database queries.",
      "Automated circuit breaking before user downtime."
    ],
    keyMetrics: [
      "Mean Time to Detection (MTTD) under 5 seconds.",
      "MRR expansion from organic API traffic growth."
    ],
    uvp: "Zero-instrumentation edge API observability that detects and auto-mitigates outages in seconds.",
    unfairAdvantage: "Patented lightweight eBPF kernel tracing engine running with under 0.2% CPU overhead.",
    channels: [
      "Open-source eBPF collector on GitHub.",
      "AWS, GCP, Kubernetes marketplace 1-click deploys."
    ],
    customerSegments: [
      "DevOps and SREs at high-scale tech companies.",
      "Backend leads managing distributed microservices."
    ],
    costStructure: [
      "Timeseries telemetry ingestion clusters & storage.",
      "Developer relations & community support staff."
    ],
    revenueStreams: [
      "Monthly usage pricing starting at ₹7,999 ($99)/10M calls.",
      "Enterprise SRE tier with dedicated support."
    ]
  }
};

const INITIAL_BOARD_CARDS = [
  { id: "c1", title: "Database schema update", box: "Problem" },
  { id: "c2", title: "Fix login bug", box: null },
  { id: "c3", title: "Implement export feature", box: null },
  { id: "c4", title: "Design dashboard UI", box: null },
];

export default function CanvasApp({ t }) {
  const [activeTab, setActiveTab] = useState("ai"); // "ai" or "cards"
  const [activeChipKey, setActiveChipKey] = useState("hyperlocal");
  const [ideaPrompt, setIdeaPrompt] = useState(PRESET_IDEAS.hyperlocal.text);
  const [promptError, setPromptError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState(PRESET_IDEAS.hyperlocal);
  const [boardCards, setBoardCards] = useState(INITIAL_BOARD_CARDS);
  const [searchCardsText, setSearchCardsText] = useState("");
  const [selectedBoxKey, setSelectedBoxKey] = useState("Problem");
  const [toastMessage, setToastMessage] = useState(null);

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  function handleSelectChip(item) {
    setActiveChipKey(item.key);
    setIdeaPrompt(item.text);
    if (promptError) setPromptError("");
    setActiveCanvas(PRESET_IDEAS[item.key]);
  }

  function handleGenerateCanvas() {
    if (!ideaPrompt.trim()) {
      setPromptError("Describe your idea first");
      return;
    }
    setPromptError("");
    setIsLoading(true);
    setIsGenerated(false);
    setRevealedCount(0);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedCount(count);
      if (count >= 9) {
        clearInterval(interval);
        setIsLoading(false);
        setIsGenerated(true);
        if (PRESET_IDEAS[activeChipKey]) {
          setActiveCanvas(PRESET_IDEAS[activeChipKey]);
        }
        showToast("✨ Generated 9-box Lean Canvas!");
      }
    }, 220);
  }

  function handleReset() {
    setIsGenerated(false);
    setIsLoading(false);
    setRevealedCount(0);
    setPromptError("");
    setBoardCards([
      { id: "c1", title: "Database schema update", box: "Problem" },
      { id: "c2", title: "Fix login bug", box: null },
      { id: "c3", title: "Implement export feature", box: null },
      { id: "c4", title: "Design dashboard UI", box: null },
    ]);
    showToast("Canvas reset to empty state");
  }

  function handleAttach() {
    if (t && typeof t.set === "function") {
      t.set("card", "shared", "leanCanvas", isGenerated ? activeCanvas : null)
        .then(() => showToast("📎 Attached Lean Canvas to current Trello card!"))
        .catch(() => showToast("📎 Attached to card!"));
    } else {
      showToast("📎 Attached to card!");
    }
  }

  function handleCardClick(cardId) {
    setBoardCards(boardCards.map(c => {
      if (c.id === cardId) {
        const isAlreadyLinked = c.box === selectedBoxKey;
        return { ...c, box: isAlreadyLinked ? null : selectedBoxKey };
      }
      return c;
    }));
    showToast(`Linked card to ${selectedBoxKey}`);
  }

  function handleBoxClick(boxKey) {
    setSelectedBoxKey(boxKey);
  }

  // Drag & drop handlers
  function handleDragStart(e, card) {
    e.dataTransfer.setData("text/plain", card.id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, boxKey) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    if (cardId) {
      setBoardCards(boardCards.map(c => c.id === cardId ? { ...c, box: boxKey } : c));
      showToast(`Dropped card onto ${boxKey}`);
    }
  }

  const filteredCards = boardCards.filter(c =>
    c.title.toLowerCase().includes(searchCardsText.toLowerCase())
  );

  function renderBox(boxKey, orderIndex, boxNum, colClass, iconBadgeClass, IconComponent, title, content, subtextHint) {
    const isFilled = isGenerated || (isLoading && revealedCount >= orderIndex);
    const isBoxLoading = isLoading && revealedCount < orderIndex;
    const isJustRevealed = isLoading && revealedCount === orderIndex;

    return (
      <div
        className={`lc-box-item ${colClass} ${isFilled ? "is-filled" : ""} ${selectedBoxKey === boxKey ? "active-target" : ""}`}
        onClick={() => handleBoxClick(boxKey)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, boxKey)}
      >
        <div className="box-item-header">
          <div className={`box-icon-badge ${iconBadgeClass}`}>
            <IconComponent size={14} />
          </div>
          <span>{title}</span>
          <span className="box-num">{boxNum}</span>
        </div>

        {isBoxLoading ? (
          <div className="box-skeleton-bars">
            <div className="skeleton-bar" style={{ width: "85%" }}></div>
            <div className="skeleton-bar" style={{ width: "65%" }}></div>
            <div className="skeleton-bar" style={{ width: "75%" }}></div>
          </div>
        ) : isFilled ? (
          <div className={`box-item-bullets ${isJustRevealed ? "box-fade-up" : ""}`}>
            <ul>
              {Array.isArray(content) ? (
                content.map((b, i) => <li key={i}>{b}</li>)
              ) : (
                <li>{content}</li>
              )}
            </ul>
          </div>
        ) : (
          <p className="box-item-subtext">{subtextHint}</p>
        )}

        {/* Dropped / Linked Cards Pill */}
        <div className="box-dropped-cards">
          {boardCards.filter(c => c.box === boxKey).map(c => (
            <span key={c.id} className="dropped-card-blue-pill" title={c.title}>
              {c.title}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lc-exact-app">
      {toastMessage && <div className="lc-toast-bubble">{toastMessage}</div>}

      {/* Top Header */}
      <div className="lc-exact-header">
        <div className="header-left-title">
          <span className={`header-status-pill ${isLoading ? "drafting" : isGenerated ? "ready" : ""}`}>
            <Grid size={13} />
            <span>
              {isLoading ? `Drafting ${revealedCount} of 9…` : isGenerated ? "9 of 9 ready" : "Lean canvas · empty"}
            </span>
          </span>
        </div>

        <div className="header-right-tools">
          <button className="btn-header-reset" onClick={handleReset}>
            {isGenerated ? "Draft again" : "Reset"}
          </button>
          <button
            className={`btn-header-attach ${isGenerated ? "is-primary" : "is-outline"}`}
            onClick={handleAttach}
          >
            <i className="ti ti-paperclip" aria-hidden="true"></i>Attach
          </button>
        </div>
      </div>

      {/* Main Grid: Left Sidebar + 9-Box Matrix */}
      <div className="lc-exact-main-grid">
        {/* Left Sidebar */}
        <div className="lc-exact-sidebar">
          {/* Tab Segmented Control: AI draft vs Cards */}
          <div className="sidebar-tab-seg" role="tablist">
            <button
              className={activeTab === "ai" ? "active" : ""}
              onClick={() => setActiveTab("ai")}
            >
              AI draft
            </button>
            <button
              className={activeTab === "cards" ? "active" : ""}
              onClick={() => setActiveTab("cards")}
            >
              Cards
            </button>
          </div>

          {/* AI Draft Tab Content */}
          {activeTab === "ai" ? (
            <div className="tab-ai-draft-content">
              <div className={`ai-draft-textarea-box ${promptError ? "has-error" : ""}`}>
                <textarea
                  value={ideaPrompt}
                  onChange={(e) => {
                    setIdeaPrompt(e.target.value);
                    if (promptError) setPromptError("");
                  }}
                  placeholder="Describe your startup or product idea"
                  rows={4}
                />
                {promptError && (
                  <div className="ai-prompt-error-msg">{promptError}</div>
                )}
              </div>

              <div className="ai-draft-chips-col">
                {Object.values(PRESET_IDEAS).map((item) => {
                  const ChipIcon = item.icon || Rocket;
                  return (
                    <div
                      key={item.key}
                      className={`ai-draft-chip ${activeChipKey === item.key ? "active" : ""}`}
                      onClick={() => handleSelectChip(item)}
                    >
                      <span className="chip-icon"><ChipIcon size={14} /></span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <button
                className={`btn-generate-canvas-exact ${!isGenerated ? "is-primary" : "is-outline"}`}
                onClick={handleGenerateCanvas}
              >
                <i className="ti ti-sparkles" aria-hidden="true"></i>
                {isLoading ? `Drafting ${revealedCount} of 9…` : isGenerated ? "Draft again" : "Generate canvas"}
              </button>
            </div>
          ) : (
            /* Cards Tab Content */
            <div className="tab-cards-content">
              <div className="cards-search-box">
                <input
                  type="text"
                  placeholder="Search cards"
                  value={searchCardsText}
                  onChange={(e) => setSearchCardsText(e.target.value)}
                />
              </div>

              <div className="cards-list-scroll">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    className={`card-item-pill ${card.box ? "assigned" : ""}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card)}
                    onClick={() => handleCardClick(card.id)}
                    title={card.box ? `Linked to ${card.box}` : `Click or drag onto a box`}
                  >
                    {card.title}
                  </div>
                ))}
              </div>

              <div className="cards-helper-text">
                Drag a card onto a box
              </div>
            </div>
          )}
        </div>

        {/* Right 10-Column 9-Box Matrix */}
        <div className="lc-exact-canvas-board">
          {/* Empty state callout centered over the canvas */}
          <div className={`canvas-empty-callout ${isGenerated || isLoading ? "fade-out" : ""}`}>
            <div className="callout-sparkle-chip">
              <Sparkles size={14} />
            </div>
            <div className="callout-title">Start with your idea</div>
            <div className="callout-desc">
              Describe it on the left, then press Generate to draft all 9 boxes.
            </div>
          </div>

          {/* 1. Problem (Order 1, Num 1) */}
          {renderBox("Problem", 1, 1, "col1-problem", "icon-badge-problem", AlertTriangle, "Problem", activeCanvas.problem, "Top 3 pain points")}

          {/* 4. Solution (Order 4, Num 4) */}
          {renderBox("Solution", 4, 4, "col2-solution", "icon-badge-solution", Lightbulb, "Solution", activeCanvas.solution, "Top 3 features")}

          {/* 8. Key metrics (Order 8, Num 8) */}
          {renderBox("Key metrics", 8, 8, "col2-metrics", "icon-badge-metrics", BarChart3, "Key metrics", activeCanvas.keyMetrics, "Numbers to track")}

          {/* 3. Value proposition (Order 3, Num 3) */}
          {renderBox("Value proposition", 3, 3, "col3-uvp", "icon-badge-uvp", Gift, "Value proposition", activeCanvas.uvp, "Clear, compelling message")}

          {/* 9. Unfair advantage (Order 9, Num 9) */}
          {renderBox("Unfair advantage", 9, 9, "col4-advantage", "icon-badge-advantage", Shield, "Unfair advantage", activeCanvas.unfairAdvantage, "Cannot be copied")}

          {/* 5. Channels (Order 5, Num 5) */}
          {renderBox("Channels", 5, 5, "col4-channels", "icon-badge-channels", Route, "Channels", activeCanvas.channels, "Path to customers")}

          {/* 2. Customers (Order 2, Num 2) */}
          {renderBox("Customers", 2, 2, "col5-customers", "icon-badge-customers", Users, "Customers", activeCanvas.customerSegments, "Target personas")}

          {/* 7. Cost structure (Order 7, Num 7) */}
          {renderBox("Cost structure", 7, 7, "span-cost", "icon-badge-cost", Tag, "Cost structure", activeCanvas.costStructure, "Acquisition, infrastructure, hosting")}

          {/* 6. Revenue streams (Order 6, Num 6) */}
          {renderBox("Revenue streams", 6, 6, "span-revenue", "icon-badge-revenue", Banknote, "Revenue streams", activeCanvas.revenueStreams, "Pricing and monetization")}
        </div>
      </div>
    </div>
  );
}
