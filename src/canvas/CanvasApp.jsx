import React, { useState } from "react";
import "./canvas.css";

// =========================================================================
// PRESET CANVASES FOLLOWING THE ASH MAURYA LEAN CANVAS JSON SCHEMA
// =========================================================================
const PRESET_CANVASES = {
  hyperlocal: {
    title: "15-Minute Artisan Bakery & Specialty Coffee",
    previewText: {
      problem: "Good bakeries are far from suburbs. Delivery arrives cold and late. No fresh coffee on demand.",
      solution: "Micro-hubs, insulated couriers, live batch tracking.",
      valueProposition: "Oven-fresh bread and barista coffee at your door in 15 minutes.",
      unfairAdvantage: "Exclusive baker partnerships.",
      customerSegments: "Suburban families and remote workers.",
      keyMetrics: "Delivery time, repeat rate.",
      channels: "App, local Facebook groups.",
      costStructure: "Hub rent, couriers, ingredients, app hosting.",
      revenueStreams: "Order margin, delivery fee, subscriptions."
    },
    problem: {
      bullets: [
        "Good bakeries are far from suburbs.",
        "Delivery arrives cold and late.",
        "No fresh coffee on demand."
      ],
      note: {
        label: "Existing alternatives",
        text: "Loose bakery goods from grocery stores; stale coffee pods; 30-minute drives downtown."
      }
    },
    customerSegments: {
      bullets: [
        "Suburban families and remote workers.",
        "WFH tech employees wanting quick morning artisan breakfast.",
        "Local boutique bakeries looking for dedicated fast delivery."
      ],
      note: {
        label: "Early adopters",
        text: "Suburban households and remote workers in gated communities."
      }
    },
    valueProposition: {
      bullets: [
        "Oven-fresh bread and barista coffee at your door in 15 minutes."
      ],
      note: {
        label: "High-level concept",
        text: "Blinkit speed meets French artisan bakery quality at your doorstep."
      }
    },
    solution: {
      bullets: [
        "Micro-hubs, insulated couriers, live batch tracking.",
        "Curated daily morning drop menus from top city bakeries.",
        "1-tap recurring breakfast scheduling app."
      ],
      note: null
    },
    channels: {
      bullets: [
        "App, local Facebook groups.",
        "Neighborhood WhatsApp community partnerships.",
        "Co-branded packaging in partner bakeries."
      ],
      note: null
    },
    revenueStreams: {
      bullets: [
        "Order margin, delivery fee, subscriptions.",
        "Monthly Morning Pass subscription for unlimited free delivery.",
        "Weekend family brunch catering bundles."
      ],
      note: null
    },
    costStructure: {
      bullets: [
        "Hub rent, couriers, ingredients, app hosting.",
        "Insulated delivery gear & warming lockers."
      ],
      note: null
    },
    keyMetrics: {
      bullets: [
        "Delivery time, repeat rate.",
        "Average basket value above ₹450 ($15)."
      ],
      note: null
    },
    unfairAdvantage: {
      bullets: [
        "Exclusive baker partnerships."
      ],
      note: null
    }
  },

  d2c: {
    title: "Instant Sattu Plant-Protein Drink",
    previewText: {
      problem: "Traditional sattu means messy mixing and clumps. Busy professionals skip breakfast or reach for sugary drinks.",
      solution: "Micro-milled instant formula that shakes in cold water.",
      valueProposition: "Clean, gut-friendly plant energy ready in 30 seconds. Zero clumps, zero prep mess.",
      unfairAdvantage: "Proprietary cold-milling process that dissolves in cold water without stabilizers.",
      customerSegments: "Urban working professionals skipping breakfast. Health-conscious fitness seekers.",
      keyMetrics: "Second-box repeat rate above 35% in 45 days. CAC to 6-month LTV ratio.",
      channels: "D2C website with starter packs. Quick commerce on Blinkit, Zepto, Instamart.",
      costStructure: "Chana procurement and micronized roasting. Sachet packaging.",
      revenueStreams: "15-pack boxes at ₹499. Monthly subscription with 15% discount."
    },
    problem: {
      bullets: [
        "Traditional sattu means messy mixing and clumps.",
        "Busy professionals skip breakfast or reach for sugary drinks.",
        "Protein drinks are full of synthetic whey and sweeteners."
      ],
      note: {
        label: "Existing alternatives",
        text: "Loose sattu from kirana stores; whey shakes; packaged cold-brew teas."
      }
    },
    customerSegments: {
      bullets: [
        "Urban working professionals skipping breakfast.",
        "Health-conscious fitness seekers wanting clean protein.",
        "Hostel and university students without kitchens."
      ],
      note: {
        label: "Early adopters",
        text: "Millennials (24 to 35) who grew up with sattu but stopped due to prep friction."
      }
    },
    valueProposition: {
      bullets: [
        "Clean, gut-friendly plant energy ready in 30 seconds. Zero clumps, zero prep mess."
      ],
      note: {
        label: "High-level concept",
        text: "Nespresso convenience meets traditional superfood in single-serve pouches."
      }
    },
    solution: {
      bullets: [
        "Micro-milled instant formula that shakes in cold water.",
        "Natural flavors: Jeera Masala, Sweet Cardamom, Mango Jaggery.",
        "Single-serve sachets with a shaker ball in the starter kit."
      ],
      note: null
    },
    channels: {
      bullets: [
        "D2C website with starter trial packs.",
        "Quick commerce on Blinkit, Zepto, Instamart.",
        "Gym and co-working sampling kiosks."
      ],
      note: null
    },
    revenueStreams: {
      bullets: [
        "15-pack boxes at ₹499.",
        "Monthly subscription with 15% discount.",
        "B2B corporate pantry bulk orders."
      ],
      note: null
    },
    costStructure: {
      bullets: [
        "Chana procurement and micronized roasting.",
        "Moisture-barrier sachet packaging."
      ],
      note: null
    },
    keyMetrics: {
      bullets: [
        "Second-box repeat rate above 35% in 45 days.",
        "CAC to 6-month LTV ratio."
      ],
      note: null
    },
    unfairAdvantage: {
      bullets: [
        "Proprietary cold-milling process that dissolves in cold water without stabilizers."
      ],
      note: null
    }
  },

  lawyers: {
    title: "AI Legal Workflow & Contract Audit Studio",
    previewText: {
      problem: "Boutique law firms spend 15+ hours weekly on manual redlining and routine NDA reviews.",
      solution: "1-click automated clause risk scoring and redline suggestion engine.",
      valueProposition: "Audit and draft airtight commercial contracts 10x faster with private fine-tuned legal AI.",
      unfairAdvantage: "Proprietary indexed database of 200,000+ negotiated Indian and US commercial contract redlines.",
      customerSegments: "Boutique corporate law firms with 5 to 25 practicing attorneys.",
      keyMetrics: "Weekly Active Lawyers auditing at least 5 contracts on the platform.",
      channels: "Direct outbound demos to managing partners via LinkedIn and Bar Association directories.",
      costStructure: "SOC-2 Type II compliant cloud GPU hosting and private LLM inference clusters.",
      revenueStreams: "Per-seat SaaS subscription at ₹12,500 ($149) per attorney per month."
    },
    problem: {
      bullets: [
        "Boutique law firms spend 15+ hours weekly on manual redlining and routine NDA reviews.",
        "Junior associate turnover is high due to tedious repetitive contract verification work.",
        "Enterprise legal teams face high risk of missed indemnification loopholes in vendor MSAs."
      ],
      note: {
        label: "Existing alternatives",
        text: "Manual redlining in Microsoft Word, expensive legacy enterprise software like Relativity or Ironclad."
      }
    },
    customerSegments: {
      bullets: [
        "Boutique corporate law firms with 5 to 25 practicing attorneys.",
        "In-house legal counsels at fast-growing Series A and B startups.",
        "Independent commercial contract review specialists."
      ],
      note: {
        label: "Early adopters",
        text: "Tech-forward boutique IP and corporate law firms overwhelmed by inbound venture deal volume."
      }
    },
    valueProposition: {
      bullets: [
        "Audit and draft airtight commercial contracts 10x faster with private fine-tuned legal AI."
      ],
      note: {
        label: "High-level concept",
        text: "GitHub Copilot for commercial contract attorneys with built-in clause precedent auditing."
      }
    },
    solution: {
      bullets: [
        "1-click automated clause risk scoring and redline suggestion engine.",
        "Private firm precedent repository that auto-suggests proven standard fallback terms.",
        "Live Word and Google Docs plugin with real-time compliance validation."
      ],
      note: null
    },
    channels: {
      bullets: [
        "Direct outbound demos to managing partners via LinkedIn and Bar Association directories.",
        "Product-led free tier auditing up to 3 contracts per month for independent lawyers.",
        "Sponsorships at legal tech conferences and webinars on AI compliance ethics."
      ],
      note: null
    },
    revenueStreams: {
      bullets: [
        "Per-seat SaaS subscription at ₹12,500 ($149) per attorney per month billed annually.",
        "Enterprise private VPC deployment setup fee starting at ₹2,50,000.",
        "Usage-based API tokens for high-volume contract ingestion."
      ],
      note: null
    },
    costStructure: {
      bullets: [
        "SOC-2 Type II compliant cloud GPU hosting and private LLM inference clusters.",
        "Legal expert data labeling and continuous benchmark verification."
      ],
      note: null
    },
    keyMetrics: {
      bullets: [
        "Weekly Active Lawyers auditing at least 5 contracts on the platform.",
        "Net Revenue Retention rate exceeding 125% through annual seat expansion."
      ],
      note: null
    },
    unfairAdvantage: {
      bullets: [
        "Proprietary indexed database of 200,000+ negotiated Indian and US commercial contract redlines."
      ],
      note: null
    }
  },

  saas: {
    title: "Edge API Observability & Auto-Healing",
    previewText: {
      problem: "Distributed microservices cause hard-to-detect latency spikes and silent 5xx API outages.",
      solution: "eBPF-powered zero-code telemetry tracking every HTTP and gRPC request automatically.",
      valueProposition: "Zero-instrumentation edge API observability that detects and auto-mitigates outages in seconds.",
      unfairAdvantage: "Patented lightweight eBPF kernel tracing engine running with under 0.2% CPU overhead.",
      customerSegments: "DevOps and Site Reliability Engineers (SREs) at high-scale tech companies.",
      keyMetrics: "Mean Time to Detection (MTTD) kept under 5 seconds across all monitored endpoints.",
      channels: "Open-source eBPF collector on GitHub with developer community advocacy.",
      costStructure: "High-throughput timeseries telemetry ingestion clusters and cold storage.",
      revenueStreams: "Tiered monthly usage pricing starting at ₹7,999 ($99) per 10 million tracked API calls."
    },
    problem: {
      bullets: [
        "Distributed microservices cause hard-to-detect latency spikes and silent 5xx API outages.",
        "Engineering teams spend hours digging through noisy Datadog or CloudWatch log dumps.",
        "SLA breaches cost cloud-native businesses thousands in customer churn and penalties."
      ],
      note: {
        label: "Existing alternatives",
        text: "Datadog, Dynatrace, AWS CloudWatch alerts, manual PagerDuty incident triaging."
      }
    },
    customerSegments: {
      bullets: [
        "DevOps and Site Reliability Engineers (SREs) at high-scale tech companies.",
        "Backend engineering leads managing distributed microservices architectures.",
        "CTOs needing unified real-time uptime dashboards and SLA reporting."
      ],
      note: {
        label: "Early adopters",
        text: "Growth-stage SaaS engineering teams with 20+ microservices experiencing alert fatigue."
      }
    },
    valueProposition: {
      bullets: [
        "Zero-instrumentation edge API observability that detects and auto-mitigates outages in seconds."
      ],
      note: {
        label: "High-level concept",
        text: "Instant self-healing nervous system for distributed cloud microservices."
      }
    },
    solution: {
      bullets: [
        "eBPF-powered zero-code telemetry tracking every HTTP and gRPC request automatically.",
        "AI root cause analyzer identifying failing database queries or third-party API dependencies.",
        "Automated circuit breaking and traffic rerouting before end users experience downtime."
      ],
      note: null
    },
    channels: {
      bullets: [
        "Open-source eBPF collector on GitHub with developer community advocacy.",
        "AWS, GCP, and Kubernetes cloud marketplace direct 1-click deployments.",
        "Technical teardowns on Hacker News and DevOps engineering podcasts."
      ],
      note: null
    },
    revenueStreams: {
      bullets: [
        "Tiered monthly usage pricing starting at ₹7,999 ($99) per 10 million tracked API calls.",
        "Enterprise SRE tier at ₹49,999 ($599)/month with custom retention and dedicated support.",
        "Annual enterprise support agreements."
      ],
      note: null
    },
    costStructure: {
      bullets: [
        "High-throughput timeseries telemetry ingestion clusters and cold storage.",
        "Developer relations engineering and community support staff."
      ],
      note: null
    },
    keyMetrics: {
      bullets: [
        "Mean Time to Detection (MTTD) kept under 5 seconds across all monitored endpoints.",
        "Monthly recurring revenue (MRR) expansion from organic API traffic growth."
      ],
      note: null
    },
    unfairAdvantage: {
      bullets: [
        "Patented lightweight eBPF kernel tracing engine running with under 0.2% CPU overhead."
      ],
      note: null
    }
  }
};

export default function CanvasApp({ t }) {
  // Default to the exact initial UI requested
  const [viewState, setViewState] = useState("initial"); // "initial" or "result"
  const [isCanvasView, setIsCanvasView] = useState(false); // false = Cards view, true = Canvas view (.cv)
  const [selectedPresetKey, setSelectedPresetKey] = useState("hyperlocal");
  const [ideaText, setIdeaText] = useState(
    "15-minute delivery of artisan bakery goods and specialty coffee for suburban neighborhoods."
  );
  const [canvasData, setCanvasData] = useState(PRESET_CANVASES.hyperlocal);
  const [toastMessage, setToastMessage] = useState(null);

  const sampleChips = [
    { label: "Hyperlocal delivery", key: "hyperlocal", text: "15-minute delivery of artisan bakery goods and specialty coffee for suburban neighborhoods." },
    { label: "D2C food brand", key: "d2c", text: "An instant flavored sattu drink for busy urban professionals looking for clean morning plant nutrition." },
    { label: "AI for lawyers", key: "lawyers", text: "AI-powered workspace for boutique corporate law firms to draft and audit contracts 10x faster." },
    { label: "SaaS platform", key: "saas", text: "All-in-one developer platform for real-time edge API monitoring and automated latency alerting." }
  ];

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  function handleSelectChip(chip) {
    setIdeaText(chip.text);
    setSelectedPresetKey(chip.key);
    if (PRESET_CANVASES[chip.key]) {
      setCanvasData(PRESET_CANVASES[chip.key]);
    }
  }

  function handleGenerateCanvas() {
    if (PRESET_CANVASES[selectedPresetKey]) {
      setCanvasData(PRESET_CANVASES[selectedPresetKey]);
    }
    setViewState("result");
    showToast("✨ 9-Box Lean Canvas generated successfully!");
  }

  function handleAttachToCard() {
    if (t && typeof t.set === "function") {
      t.set("card", "shared", "leanCanvas", canvasData)
        .then(() => {
          showToast("📋 Attached Lean Canvas to current Trello card!");
        })
        .catch(() => {
          showToast("📋 Attached Lean Canvas to current card.");
        });
    } else {
      showToast("📋 Attached Lean Canvas to card!");
    }
  }

  function handleAddToList(boxTitle, bullets) {
    showToast(`✓ Added ${boxTitle} (${bullets.length} items) as cards to your board list!`);
  }

  function handleAddAllToList() {
    showToast("✓ Added all 9 building blocks as organized cards on your board!");
  }

  function handleCopyJSON() {
    const jsonStr = JSON.stringify(canvasData, null, 2);
    navigator.clipboard.writeText(jsonStr)
      .then(() => showToast("✓ Copied full Lean Canvas JSON schema to clipboard!"))
      .catch(() => showToast("✓ Copied canvas data to clipboard!"));
  }

  function handleExport() {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(canvasData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", "lean-canvas.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("⬇ Exported lean-canvas.json");
  }

  function handleBlankGrid() {
    const blank = {
      title: "Blank Lean Canvas",
      previewText: {
        problem: "Add key problems...",
        solution: "Add solution features...",
        valueProposition: "Clear single value proposition...",
        unfairAdvantage: "Unfair competitive advantage...",
        customerSegments: "Target customer segments...",
        keyMetrics: "Key measurable metrics...",
        channels: "Distribution channels...",
        costStructure: "Cost breakdown...",
        revenueStreams: "Revenue and monetization streams..."
      },
      problem: { bullets: ["Add first key problem...", "Add second key problem...", "Add third key problem..."], note: { label: "Existing alternatives", text: "List current alternative solutions" } },
      customerSegments: { bullets: ["Target persona 1", "Target persona 2", "Target persona 3"], note: { label: "Early adopters", text: "Characteristics of ideal early adopters" } },
      valueProposition: { bullets: ["Single, clear, compelling message that turns an unaware visitor into an interested prospect."], note: { label: "High-level concept", text: "Your X for Y analogy" } },
      solution: { bullets: ["Top feature 1", "Top feature 2", "Top feature 3"], note: null },
      channels: { bullets: ["Direct inbound channel", "Outbound or partnership channel", "Referral loop"], note: null },
      revenueStreams: { bullets: ["Subscription / Recurring fee", "Per-transaction margin", "Add-on services"], note: null },
      costStructure: { bullets: ["Customer acquisition cost", "Infrastructure & hosting"], note: null },
      keyMetrics: { bullets: ["Key conversion metric", "Retention rate / LTV"], note: null },
      unfairAdvantage: { bullets: ["Cannot be easily copied or bought by competitors."], note: null }
    };
    setCanvasData(blank);
    showToast("Created Blank Lean Canvas Grid");
  }

  function handleCycleTemplates() {
    const keys = Object.keys(PRESET_CANVASES);
    const currentIndex = keys.indexOf(selectedPresetKey);
    const nextKey = keys[(currentIndex + 1) % keys.length];
    setSelectedPresetKey(nextKey);
    setCanvasData(PRESET_CANVASES[nextKey]);
    setIdeaText(sampleChips.find(c => c.key === nextKey)?.text || PRESET_CANVASES[nextKey].title);
    showToast(`Loaded Template: ${PRESET_CANVASES[nextKey].title}`);
  }

  function handleClose() {
    if (t && typeof t.closeModal === "function") {
      t.closeModal();
    } else {
      setViewState("initial");
    }
  }

  // Get preview snippet strings for the 9-box initial grid
  const pt = canvasData.previewText || {
    problem: canvasData.problem.bullets.join(" "),
    solution: canvasData.solution.bullets.join(", "),
    valueProposition: canvasData.valueProposition.bullets.join(" "),
    unfairAdvantage: canvasData.unfairAdvantage.bullets.join(" "),
    customerSegments: canvasData.customerSegments.bullets.join(" "),
    keyMetrics: canvasData.keyMetrics.bullets.join(", "),
    channels: canvasData.channels.bullets.join(", "),
    costStructure: canvasData.costStructure.bullets.join(", "),
    revenueStreams: canvasData.revenueStreams.bullets.join(", ")
  };

  // =========================================================================
  // VIEW 1: INITIAL PROMPT & COMPACT NINE-BOX PREVIEW SCREEN (MATCHING CLAUDE UI)
  // =========================================================================
  if (viewState === "initial") {
    return (
      <div className="lc">
        {toastMessage && <div className="lc-toast">{toastMessage}</div>}

        {/* Top Header */}
        <div className="lc-top">
          <div className="lc-logo"><i className="ti ti-layout-grid" aria-hidden="true"></i></div>
          <span style={{ fontWeight: 600, fontSize: "15px" }}>Link Canvas</span>
          <span className="lc-pill">Lean canvas</span>
          <span style={{ marginLeft: "auto", display: "flex", gap: "6px", alignItems: "center" }}>
            <button className="lc-ghost" onClick={handleBlankGrid}><i className="ti ti-layout" aria-hidden="true"></i>Blank grid</button>
            <button className="lc-ghost" onClick={handleCycleTemplates}><i className="ti ti-template" aria-hidden="true"></i>Templates</button>
            <button className="lc-ghost" aria-label="More" onClick={handleClose} style={{ width: "30px", padding: 0, justifyContent: "center" }}>
              <i className="ti ti-dots" aria-hidden="true"></i>
            </button>
          </span>
        </div>

        {/* Prompt Section */}
        <div className="lc-prompt">
          <textarea
            rows={2}
            aria-label="Describe your startup"
            value={ideaText}
            onChange={(e) => setIdeaText(e.target.value)}
            placeholder="Describe your startup or product idea..."
          />
          <div className="lc-row">
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Try an example</span>
            {sampleChips.map((chip) => (
              <span
                key={chip.key}
                className={`lc-chip ${selectedPresetKey === chip.key ? "active" : ""}`}
                onClick={() => handleSelectChip(chip)}
              >
                {chip.label}
              </span>
            ))}
            <button
              className="lc-btn-generate"
              onClick={handleGenerateCanvas}
            >
              <i className="ti ti-sparkles" aria-hidden="true"></i>Generate canvas
            </button>
          </div>
        </div>

        {/* 10-Column 9-Box Grid */}
        <div className="lc-grid">
          {/* 1. Problem */}
          <div className="lc-cell" style={{ gridColumn: "span 2", gridRow: "span 2" }}>
            <div className="lc-h">
              <span className="lc-n">1</span>
              <span className="lc-dot" style={{ background: "#E24B4A" }}></span>
              Problem
              <span className="lc-ic"><i className="ti ti-refresh" aria-hidden="true"></i><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.problem}</p>
          </div>

          {/* 4. Solution */}
          <div className="lc-cell" style={{ gridColumn: "span 2" }}>
            <div className="lc-h">
              <span className="lc-n">4</span>
              <span className="lc-dot" style={{ background: "#1D9E75" }}></span>
              Solution
              <span className="lc-ic"><i className="ti ti-refresh" aria-hidden="true"></i><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.solution}</p>
          </div>

          {/* 3. Value proposition */}
          <div className="lc-cell" style={{ gridColumn: "span 2", gridRow: "span 2" }}>
            <div className="lc-h">
              <span className="lc-n">3</span>
              <span className="lc-dot" style={{ background: "#7F77DD" }}></span>
              Value proposition
              <span className="lc-ic"><i className="ti ti-refresh" aria-hidden="true"></i><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.valueProposition}</p>
          </div>

          {/* 9. Unfair advantage */}
          <div className="lc-cell" style={{ gridColumn: "span 2" }}>
            <div className="lc-h">
              <span className="lc-n">9</span>
              <span className="lc-dot" style={{ background: "#7F77DD" }}></span>
              Unfair advantage
              <span className="lc-ic"><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.unfairAdvantage}</p>
          </div>

          {/* 2. Customers */}
          <div className="lc-cell" style={{ gridColumn: "span 2", gridRow: "span 2" }}>
            <div className="lc-h">
              <span className="lc-n">2</span>
              <span className="lc-dot" style={{ background: "#378ADD" }}></span>
              Customers
              <span className="lc-ic"><i className="ti ti-refresh" aria-hidden="true"></i><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.customerSegments}</p>
          </div>

          {/* 8. Key metrics */}
          <div className="lc-cell" style={{ gridColumn: "span 2" }}>
            <div className="lc-h">
              <span className="lc-n">8</span>
              <span className="lc-dot" style={{ background: "#1D9E75" }}></span>
              Key metrics
              <span className="lc-ic"><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.keyMetrics}</p>
          </div>

          {/* 5. Channels */}
          <div className="lc-cell" style={{ gridColumn: "span 2" }}>
            <div className="lc-h">
              <span className="lc-n">5</span>
              <span className="lc-dot" style={{ background: "#378ADD" }}></span>
              Channels
              <span className="lc-ic"><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.channels}</p>
          </div>

          {/* 7. Cost structure */}
          <div className="lc-cell" style={{ gridColumn: "span 5" }}>
            <div className="lc-h">
              <span className="lc-n">7</span>
              <span className="lc-dot" style={{ background: "#BA7517" }}></span>
              Cost structure
              <span className="lc-ic"><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.costStructure}</p>
          </div>

          {/* 6. Revenue streams */}
          <div className="lc-cell" style={{ gridColumn: "span 5" }}>
            <div className="lc-h">
              <span className="lc-n">6</span>
              <span className="lc-dot" style={{ background: "#639922" }}></span>
              Revenue streams
              <span className="lc-ic"><i className="ti ti-pencil" aria-hidden="true"></i></span>
            </div>
            <p className="lc-t">{pt.revenueStreams}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="lc-foot">
          <button className="lc-btn-attach" onClick={handleAttachToCard}>
            <i className="ti ti-paperclip" aria-hidden="true"></i>Attach to card
          </button>
          <button className="lc-ghost" onClick={handleCopyJSON} style={{ height: "32px" }}>
            <i className="ti ti-copy" aria-hidden="true"></i>Copy
          </button>
          <button className="lc-ghost" onClick={handleExport} style={{ height: "32px" }}>
            <i className="ti ti-download" aria-hidden="true"></i>Export
          </button>
          <button className="lc-btn-icon-round" onClick={handleGenerateCanvas} title="Expand result view">
            <i className="ti ti-arrow-down" aria-hidden="true"></i>
          </button>
          <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--text-muted)" }}>
            Link Canvas 2.0 · Ash Maurya framework
          </span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: GENERATED RESULT SCREEN WITH CARDS / CANVAS TOGGLE
  // =========================================================================
  return (
    <div className={`lc ${isCanvasView ? "cv" : ""}`} id="root">
      {toastMessage && <div className="lc-toast">{toastMessage}</div>}

      <div className="lc-bar">
        <i className="ti ti-layout-grid" style={{ fontSize: "18px", color: "var(--text-accent)" }} aria-hidden="true"></i>
        <span style={{ fontWeight: 600, fontSize: "15px" }}>Link Canvas</span>
        <span className="lc-ok">9 of 9 boxes ready</span>
        <div className="seg" role="group" aria-label="View">
          <button
            className={!isCanvasView ? "on" : ""}
            id="vc"
            onClick={() => setIsCanvasView(false)}
          >
            Cards
          </button>
          <button
            className={isCanvasView ? "on" : ""}
            id="vl"
            onClick={() => setIsCanvasView(true)}
          >
            Canvas
          </button>
        </div>
      </div>

      <div className="g">
        {/* Box 1: Problem */}
        <div className="c b1" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">1</span>
            <span className="d" style={{ background: "#E24B4A" }}></span>
            Problem
            <span className="hint">Top 3</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.problem.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          {canvasData.problem.note && (
            <div className="sub">
              <b>{canvasData.problem.note.label}</b>
              {canvasData.problem.note.text}
            </div>
          )}
        </div>

        {/* Box 2: Customer Segments */}
        <div className="c b2" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">2</span>
            <span className="d" style={{ background: "#7F77DD" }}></span>
            Customer segments
            <span className="hint">Personas</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.customerSegments.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          {canvasData.customerSegments.note && (
            <div className="sub">
              <b>{canvasData.customerSegments.note.label}</b>
              {canvasData.customerSegments.note.text}
            </div>
          )}
        </div>

        {/* Box 3: Value Proposition */}
        <div className="c b3" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">3</span>
            <span className="d" style={{ background: "#378ADD" }}></span>
            Value proposition
            <span className="hint">Differentiator</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.valueProposition.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          {canvasData.valueProposition.note && (
            <div className="sub">
              <b>{canvasData.valueProposition.note.label}</b>
              {canvasData.valueProposition.note.text}
            </div>
          )}
        </div>

        {/* Box 4: Solution */}
        <div className="c b4" style={{ border: "2px solid var(--border-accent)" }} onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">4</span>
            <span className="d" style={{ background: "#1D9E75" }}></span>
            Solution
            <span className="hint">Top 3</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.solution.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          <button className="act" onClick={(e) => { e.stopPropagation(); handleAddToList("Solution", canvasData.solution.bullets); }}>
            <i className="ti ti-square-plus" aria-hidden="true"></i>Add to list
          </button>
        </div>

        {/* Box 5: Channels */}
        <div className="c b5" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">5</span>
            <span className="d" style={{ background: "#378ADD" }}></span>
            Channels
            <span className="hint">Path</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.channels.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          <button className="act" onClick={(e) => { e.stopPropagation(); handleAddToList("Channels", canvasData.channels.bullets); }}>
            <i className="ti ti-square-plus" aria-hidden="true"></i>Add to list
          </button>
        </div>

        {/* Box 6: Revenue Streams */}
        <div className="c b6" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">6</span>
            <span className="d" style={{ background: "#639922" }}></span>
            Revenue streams
            <span className="hint">Pricing</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.revenueStreams.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          <button className="act" onClick={(e) => { e.stopPropagation(); handleAddToList("Revenue Streams", canvasData.revenueStreams.bullets); }}>
            <i className="ti ti-square-plus" aria-hidden="true"></i>Add to list
          </button>
        </div>

        {/* Box 7: Cost Structure */}
        <div className="c b7" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">7</span>
            <span className="d" style={{ background: "#BA7517" }}></span>
            Cost structure
            <span className="hint">Fixed and variable</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.costStructure.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          <button className="act" onClick={(e) => { e.stopPropagation(); handleAddToList("Cost Structure", canvasData.costStructure.bullets); }}>
            <i className="ti ti-square-plus" aria-hidden="true"></i>Add to list
          </button>
        </div>

        {/* Box 8: Key Metrics */}
        <div className="c b8" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">8</span>
            <span className="d" style={{ background: "#1D9E75" }}></span>
            Key metrics
            <span className="hint">Numbers</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.keyMetrics.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          <button className="act" onClick={(e) => { e.stopPropagation(); handleAddToList("Key Metrics", canvasData.keyMetrics.bullets); }}>
            <i className="ti ti-square-plus" aria-hidden="true"></i>Add to list
          </button>
        </div>

        {/* Box 9: Unfair Advantage */}
        <div className="c b9" onClick={() => isCanvasView && setIsCanvasView(false)}>
          <div className="h">
            <span className="n">9</span>
            <span className="d" style={{ background: "#7F77DD" }}></span>
            Unfair advantage
            <span className="hint">Moat</span>
          </div>
          <div className="body">
            <ul>
              {canvasData.unfairAdvantage.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
          <button className="act" onClick={(e) => { e.stopPropagation(); handleAddToList("Unfair Advantage", canvasData.unfairAdvantage.bullets); }}>
            <i className="ti ti-square-plus" aria-hidden="true"></i>Add to list
          </button>
        </div>
      </div>

      <div className="ft">
        <button
          className="lc-btn-attach"
          onClick={handleAttachToCard}
        >
          <i className="ti ti-paperclip" aria-hidden="true"></i>Attach to card
        </button>
        <button
          className="lc-ghost"
          onClick={handleAddAllToList}
          style={{ height: "32px" }}
        >
          <i className="ti ti-layout-list" aria-hidden="true"></i>Add all to list
        </button>
        <button
          className="lc-ghost"
          onClick={() => setViewState("initial")}
          style={{ height: "32px" }}
        >
          <i className="ti ti-refresh" aria-hidden="true"></i>Regenerate
        </button>
        <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--text-secondary)" }} id="tip">
          {isCanvasView ? "Canvas view: overview, click a box to expand" : "Cards view: full detail"}
        </span>
      </div>
    </div>
  );
}
