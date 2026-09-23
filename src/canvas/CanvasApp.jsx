import React, { useState } from "react";
import "./canvas.css";

// =========================================================================
// PRESET STARTUP DATA (ASH MAURYA LEAN CANVAS)
// =========================================================================
const PRESET_IDEAS = {
  hyperlocal: {
    key: "hyperlocal",
    label: "Hyperlocal delivery",
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
    setActiveCanvas(PRESET_IDEAS[item.key]);
  }

  function handleGenerateCanvas() {
    setIsGenerated(true);
    if (PRESET_IDEAS[activeChipKey]) {
      setActiveCanvas(PRESET_IDEAS[activeChipKey]);
    }
    showToast("✨ Generated 9-box Lean Canvas!");
  }

  function handleReset() {
    setIsGenerated(false);
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

  return (
    <div className="lc-exact-app">
      {toastMessage && <div className="lc-toast-bubble">{toastMessage}</div>}

      {/* Top Header */}
      <div className="lc-exact-header">
        <div className="header-left-title">
          <div className="header-brand-logo"><i className="ti ti-layout-grid" aria-hidden="true"></i></div>
          <span className="header-main-title">Link Canvas</span>
          <span className={`header-status-pill ${isGenerated ? "ready" : ""}`}>
            {isGenerated ? "9 of 9 ready" : "Empty canvas"}
          </span>
        </div>

        <div className="header-right-tools">
          <button className="btn-header-reset" onClick={handleReset}>
            Reset
          </button>
          <button className="btn-header-attach" onClick={handleAttach}>
            <i className="ti ti-paperclip" aria-hidden="true"></i>Attach
          </button>
          <button className="btn-header-more" title="Options" onClick={() => showToast("Link Canvas 2.0")}>
            <i className="ti ti-dots" aria-hidden="true"></i>
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
              <div className="ai-draft-textarea-box">
                <textarea
                  value={ideaPrompt}
                  onChange={(e) => setIdeaPrompt(e.target.value)}
                  placeholder="Describe your startup or product idea"
                  rows={4}
                />
              </div>

              <div className="ai-draft-chips-col">
                {Object.values(PRESET_IDEAS).map((item) => (
                  <div
                    key={item.key}
                    className={`ai-draft-chip ${activeChipKey === item.key ? "active" : ""}`}
                    onClick={() => handleSelectChip(item)}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              <button className="btn-generate-canvas-exact" onClick={handleGenerateCanvas}>
                <i className="ti ti-sparkles" aria-hidden="true"></i>Generate canvas
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

        {/* Right 5-Column 9-Box Matrix */}
        <div className="lc-exact-canvas-board">
          {/* 1. Problem (Col 1, Row 1-2) */}
          <div
            className={`lc-box-item col1-problem ${selectedBoxKey === "Problem" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Problem")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Problem")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-red">
                <i className="ti ti-alert-triangle" aria-hidden="true"></i>
              </div>
              <span>Problem</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <ul>
                  {activeCanvas.problem.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="box-item-subtext">Top 3 pain points</p>
            )}

            {/* Dropped / Linked Cards Pill */}
            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Problem").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 4. Solution (Col 2, Row 1) */}
          <div
            className={`lc-box-item col2-solution ${selectedBoxKey === "Solution" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Solution")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Solution")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-green">
                <i className="ti ti-bulb" aria-hidden="true"></i>
              </div>
              <span>Solution</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <ul>
                  {activeCanvas.solution.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="box-item-subtext">Top 3 features</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Solution").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 8. Key metrics (Col 2, Row 2) */}
          <div
            className={`lc-box-item col2-metrics ${selectedBoxKey === "Key metrics" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Key metrics")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Key metrics")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-blue">
                <i className="ti ti-chart-bar" aria-hidden="true"></i>
              </div>
              <span>Key metrics</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <ul>
                  {activeCanvas.keyMetrics.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="box-item-subtext">Numbers to track</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Key metrics").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Value proposition (Col 3, Row 1-2 Centerpiece) */}
          <div
            className={`lc-box-item col3-uvp ${selectedBoxKey === "Value proposition" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Value proposition")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Value proposition")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-purple">
                <i className="ti ti-gift" aria-hidden="true"></i>
              </div>
              <span>Value proposition</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <p style={{ fontWeight: 600, color: "#ffffff" }}>{activeCanvas.uvp}</p>
              </div>
            ) : (
              <p className="box-item-subtext">Clear, compelling message</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Value proposition").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 9. Unfair advantage (Col 4, Row 1) */}
          <div
            className={`lc-box-item col4-advantage ${selectedBoxKey === "Unfair advantage" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Unfair advantage")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Unfair advantage")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-rose">
                <i className="ti ti-shield" aria-hidden="true"></i>
              </div>
              <span>Unfair advantage</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <p>{activeCanvas.unfairAdvantage}</p>
              </div>
            ) : (
              <p className="box-item-subtext">Cannot be copied</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Unfair advantage").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Channels (Col 4, Row 2) */}
          <div
            className={`lc-box-item col4-channels ${selectedBoxKey === "Channels" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Channels")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Channels")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-orange">
                <i className="ti ti-git-fork" aria-hidden="true"></i>
              </div>
              <span>Channels</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <ul>
                  {activeCanvas.channels.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="box-item-subtext">Path to customers</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Channels").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 2. Customers (Col 5, Row 1-2) */}
          <div
            className={`lc-box-item col5-customers ${selectedBoxKey === "Customers" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Customers")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Customers")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-teal">
                <i className="ti ti-users" aria-hidden="true"></i>
              </div>
              <span>Customers</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <ul>
                  {activeCanvas.customerSegments.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="box-item-subtext">Target personas</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Customers").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 7. Cost structure (Bottom Left Wide) */}
          <div
            className={`lc-box-item span-cost ${selectedBoxKey === "Cost structure" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Cost structure")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Cost structure")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-amber">
                <i className="ti ti-tag" aria-hidden="true"></i>
              </div>
              <span>Cost structure</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <ul>
                  {activeCanvas.costStructure.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="box-item-subtext">Acquisition, infrastructure, hosting</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Cost structure").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>

          {/* 6. Revenue streams (Bottom Right Wide) */}
          <div
            className={`lc-box-item span-revenue ${selectedBoxKey === "Revenue streams" ? "active-target" : ""}`}
            onClick={() => handleBoxClick("Revenue streams")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "Revenue streams")}
          >
            <div className="box-item-header">
              <div className="box-icon-badge icon-badge-green">
                <i className="ti ti-cash" aria-hidden="true"></i>
              </div>
              <span>Revenue streams</span>
            </div>

            {isGenerated ? (
              <div className="box-item-bullets">
                <ul>
                  {activeCanvas.revenueStreams.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="box-item-subtext">Pricing and monetization</p>
            )}

            <div className="box-dropped-cards">
              {boardCards.filter(c => c.box === "Revenue streams").map(c => (
                <span key={c.id} className="dropped-card-blue-pill">
                  {c.title.length > 12 ? c.title.slice(0, 10) + "..." : c.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
