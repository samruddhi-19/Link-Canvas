import React, { useState, useEffect, useRef } from "react";
import "./canvas.css";
import {
  generateLeanCanvasAI,
  regenerateSingleBoxAI,
  getStoredAIConfig,
  saveStoredAIConfig,
  AI_PROVIDERS
} from "../lib/aiDraftService.js";

// =========================================================================
// PHASE 2 ICONS (Lucide 14px in 20px chips with 6px radius)
// =========================================================================
const Palette = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

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

const SettingsSliders = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" />
    <line x1="9" x2="15" y1="8" y2="8" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);

const RefreshCw = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
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

// Quick starter prompt inspirations
const INSPIRATION_IDEAS = [
  {
    key: "hyperlocal",
    label: "Hyperlocal delivery",
    icon: Rocket,
    text: "15-minute delivery of artisan bakery goods and specialty coffee for suburban neighborhoods."
  },
  {
    key: "d2c",
    label: "D2C health brand",
    icon: ShoppingBag,
    text: "Instant flavored clean plant nutrition sattu drink for busy urban professionals."
  },
  {
    key: "lawyers",
    label: "AI legal assistant",
    icon: Scale,
    text: "AI workspace for boutique corporate law firms to audit, redline, and draft commercial contracts 10x faster."
  },
  {
    key: "saas",
    label: "Edge API monitor",
    icon: Zap,
    text: "Zero-instrumentation edge API observability platform that detects microservice outages and automatically fixes latency."
  }
];

const EMPTY_CANVAS = {
  problem: [],
  solution: [],
  keyMetrics: [],
  uvp: "",
  unfairAdvantage: "",
  channels: [],
  customerSegments: [],
  costStructure: [],
  revenueStreams: []
};

const HUES = [
  { c: "#FF7D75", bg: "color-mix(in srgb, #FF7D75 13%, #1D2125)", bd: "color-mix(in srgb, #FF7D75 30%, #2C333A)", ti: "color-mix(in srgb, #FF7D75 55%, #fff)" },
  { c: "#57E5A8", bg: "color-mix(in srgb, #57E5A8 13%, #1D2125)", bd: "color-mix(in srgb, #57E5A8 30%, #2C333A)", ti: "color-mix(in srgb, #57E5A8 55%, #fff)" },
  { c: "#66ABFF", bg: "color-mix(in srgb, #66ABFF 13%, #1D2125)", bd: "color-mix(in srgb, #66ABFF 30%, #2C333A)", ti: "color-mix(in srgb, #66ABFF 55%, #fff)" },
  { c: "#B2A3FF", bg: "color-mix(in srgb, #B2A3FF 13%, #1D2125)", bd: "color-mix(in srgb, #B2A3FF 30%, #2C333A)", ti: "color-mix(in srgb, #B2A3FF 55%, #fff)" },
  { c: "#F587C8", bg: "color-mix(in srgb, #F587C8 13%, #1D2125)", bd: "color-mix(in srgb, #F587C8 30%, #2C333A)", ti: "color-mix(in srgb, #F587C8 55%, #fff)" },
  { c: "#FFB37C", bg: "color-mix(in srgb, #FFB37C 13%, #1D2125)", bd: "color-mix(in srgb, #FFB37C 30%, #2C333A)", ti: "color-mix(in srgb, #FFB37C 55%, #fff)" },
  { c: "#7CD3ED", bg: "color-mix(in srgb, #7CD3ED 13%, #1D2125)", bd: "color-mix(in srgb, #7CD3ED 30%, #2C333A)", ti: "color-mix(in srgb, #7CD3ED 55%, #fff)" },
  { c: "#FFD75E", bg: "color-mix(in srgb, #FFD75E 13%, #1D2125)", bd: "color-mix(in srgb, #FFD75E 30%, #2C333A)", ti: "color-mix(in srgb, #FFD75E 55%, #fff)" },
  { c: "#A5D957", bg: "color-mix(in srgb, #A5D957 13%, #1D2125)", bd: "color-mix(in srgb, #A5D957 30%, #2C333A)", ti: "color-mix(in srgb, #A5D957 55%, #fff)" }
];

const LOOK_OPTIONS = [
  { key: "rich", title: "Rich tones", desc: "Deep colour per box" },
  { key: "icon", title: "Icon accent", desc: "Neutral boxes, bright icons" },
  { key: "gradient", title: "Soft gradient", desc: "Rich tones with a fade" }
];

const INITIAL_BOARD_CARDS = [
  { id: "c1", title: "Database schema update", box: "Problem" },
  { id: "c2", title: "Fix login bug", box: null },
  { id: "c3", title: "Implement export feature", box: null },
  { id: "c4", title: "Design dashboard UI", box: null },
];

export default function CanvasApp({ t }) {
  const [currentLook, setCurrentLook] = useState("rich");
  const [isLookPickerOpen, setIsLookPickerOpen] = useState(false);
  const lookPickerRef = useRef(null);

  const [activeTab, setActiveTab] = useState("ai");
  const [activeChipKey, setActiveChipKey] = useState("");
  const [ideaPrompt, setIdeaPrompt] = useState(INSPIRATION_IDEAS[0].text);
  const [promptError, setPromptError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStageText, setLoadingStageText] = useState("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState(EMPTY_CANVAS);
  const [boardCards, setBoardCards] = useState(INITIAL_BOARD_CARDS);
  const [searchCardsText, setSearchCardsText] = useState("");
  const [selectedBoxKey, setSelectedBoxKey] = useState("Problem");
  const [toastMessage, setToastMessage] = useState(null);
  const [regeneratingBox, setRegeneratingBox] = useState(null);

  // AI Configuration Modal
  const [isAIConfigOpen, setIsAIConfigOpen] = useState(false);
  const [aiConfig, setAIConfig] = useState(getStoredAIConfig());

  useEffect(() => {
    if (t && typeof t.get === "function") {
      t.get("member", "private", "lcLook")
        .then((savedLook) => {
          if (savedLook && ["rich", "icon", "gradient"].includes(savedLook)) {
            setCurrentLook(savedLook);
          }
        })
        .catch(() => {});
    }
  }, [t]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (lookPickerRef.current && !lookPickerRef.current.contains(e.target)) {
        setIsLookPickerOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsLookPickerOpen(false);
        setIsAIConfigOpen(false);
      }
    }
    if (isLookPickerOpen || isAIConfigOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLookPickerOpen, isAIConfigOpen]);

  function handleSelectLook(lookKey) {
    setCurrentLook(lookKey);
    if (t && typeof t.set === "function") {
      t.set("member", "private", "lcLook", lookKey).catch(() => {});
    }
  }

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  }

  function handleSelectChip(item) {
    setActiveChipKey(item.key);
    setIdeaPrompt(item.text);
    if (promptError) setPromptError("");
  }

  async function handleGenerateCanvas() {
    const trimmedPrompt = ideaPrompt.trim();
    if (!trimmedPrompt) {
      setPromptError("Describe your startup or product idea first");
      return;
    }
    setPromptError("");
    setIsLoading(true);
    setIsGenerated(false);
    setRevealedCount(0);
    setLoadingStageText("🧠 Thinking & structuring Ash Maurya Lean Canvas...");

    // Staged feedback messages
    const stageTimer1 = setTimeout(() => {
      setLoadingStageText("⚡ Analyzing problems, UVP & target customers...");
    }, 900);
    const stageTimer2 = setTimeout(() => {
      setLoadingStageText("📊 Generating channels, metrics & revenue streams...");
    }, 2200);

    try {
      // Call actual AI service
      const aiResult = await generateLeanCanvasAI(trimmedPrompt, aiConfig);

      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setLoadingStageText("✨ Assembling 9 Lean Canvas boxes...");

      // Update state with the newly AI-generated data
      setActiveCanvas(aiResult);

      // Smooth sequential reveal animation (1 to 9 boxes)
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setRevealedCount(count);
        if (count >= 9) {
          clearInterval(interval);
          setIsLoading(false);
          setIsGenerated(true);
          setLoadingStageText("");
          showToast("✨ AI generated 9-box Lean Canvas successfully!");
        }
      }, 110);
    } catch (err) {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setIsLoading(false);
      setPromptError(err.message || "Failed to generate canvas with AI");
      showToast("⚠️ Generation error. Please try again.");
    }
  }

  async function handleRegenerateSingleBox(e, boxKey) {
    e.stopPropagation();
    if (!isGenerated || isLoading) return;
    setRegeneratingBox(boxKey);
    showToast(`✨ Regenerating ${boxKey} with AI...`);

    try {
      const newItems = await regenerateSingleBoxAI(boxKey, activeCanvas, ideaPrompt, aiConfig);
      if (newItems) {
        const keyMap = {
          "Problem": "problem",
          "Solution": "solution",
          "Key metrics": "keyMetrics",
          "Value proposition": "uvp",
          "Unfair advantage": "unfairAdvantage",
          "Channels": "channels",
          "Customers": "customerSegments",
          "Cost structure": "costStructure",
          "Revenue streams": "revenueStreams"
        };
        const propName = keyMap[boxKey];
        if (propName) {
          setActiveCanvas(prev => ({
            ...prev,
            [propName]: newItems
          }));
          showToast(`✨ Refreshed ${boxKey}!`);
        }
      }
    } catch (e) {
      showToast(`⚠️ Could not regenerate ${boxKey}`);
    } finally {
      setRegeneratingBox(null);
    }
  }

  function handleReset() {
    setIsGenerated(false);
    setIsLoading(false);
    setRevealedCount(0);
    setPromptError("");
    setActiveCanvas(EMPTY_CANVAS);
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

  function handleSaveAIConfig(newConfig) {
    setAIConfig(newConfig);
    saveStoredAIConfig(newConfig);
    setIsAIConfigOpen(false);
    showToast("AI configuration saved!");
  }

  const filteredCards = boardCards.filter(c =>
    c.title.toLowerCase().includes(searchCardsText.toLowerCase())
  );

  function renderBox(boxKey, orderIndex, boxNum, colClass, iconBadgeClass, IconComponent, title, content, subtextHint) {
    const isFilled = isGenerated || (isLoading && revealedCount >= orderIndex);
    const isBoxLoading = isLoading && revealedCount < orderIndex;
    const isJustRevealed = isLoading && revealedCount === orderIndex;
    const isRegenerating = regeneratingBox === boxKey;
    const hasData = isFilled && ((Array.isArray(content) && content.length > 0) || (typeof content === "string" && content.trim().length > 0));

    return (
      <div
        className={`lc-box-item ${colClass} ${hasData ? "is-filled" : ""} ${selectedBoxKey === boxKey ? "active-target" : ""}`}
        onClick={() => handleBoxClick(boxKey)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, boxKey)}
      >
        <div className="box-item-header">
          <div className="box-header-title-wrap">
            <div className={`box-icon-badge ${iconBadgeClass}`}>
              <IconComponent size={14} />
            </div>
            <span>{title}</span>
          </div>

          <div className="box-header-actions">
            {isGenerated && (
              <button
                type="button"
                className={`btn-box-ai-regen ${isRegenerating ? "spinning" : ""}`}
                title={`Regenerate ${title} with AI`}
                onClick={(e) => handleRegenerateSingleBox(e, title)}
              >
                <RefreshCw size={11} />
              </button>
            )}
            <span className="box-num">{boxNum}</span>
          </div>
        </div>

        {isBoxLoading || isRegenerating ? (
          <div className="box-skeleton-bars">
            <div className="skeleton-bar" style={{ width: "85%" }}></div>
            <div className="skeleton-bar" style={{ width: "65%" }}></div>
            <div className="skeleton-bar" style={{ width: "75%" }}></div>
          </div>
        ) : hasData ? (
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
    <div className={`lc-exact-app look-${currentLook}`}>
      {toastMessage && <div className="lc-toast-bubble">{toastMessage}</div>}

      {/* Top Header */}
      <div className="lc-exact-header">
        <div className="header-left-title">
          <span className={`header-status-pill ${isLoading ? "drafting" : isGenerated ? "ready" : ""}`}>
            {isLoading ? <Sparkles size={13} /> : <Grid size={13} />}
            <span>
              {isLoading ? `AI drafting ${revealedCount} of 9…` : isGenerated ? "AI Drafted · 9 of 9 ready" : "Lean canvas · empty"}
            </span>
          </span>
          {isGenerated && (
            <span className="ai-model-tag-pill">
              ✨ {AI_PROVIDERS.find(p => p.id === aiConfig.provider)?.name || "Link Canvas AI"}
            </span>
          )}
        </div>

        <div className="header-right-tools" ref={lookPickerRef} style={{ position: "relative" }}>
          <button
            className="btn-header-ai-config"
            title="AI Model & API Key Settings"
            onClick={() => setIsAIConfigOpen(true)}
          >
            <SettingsSliders size={13} />
            <span>AI Settings</span>
          </button>

          <button className="btn-header-reset" onClick={handleReset}>
            {isGenerated ? "Clear Canvas" : "Reset"}
          </button>

          <button
            className={`btn-header-look ${isLookPickerOpen ? "active" : ""}`}
            onClick={() => setIsLookPickerOpen(!isLookPickerOpen)}
          >
            <Palette size={14} />
            <span>Look</span>
          </button>

          <button
            className={`btn-header-attach ${isGenerated ? "is-primary" : "is-outline"}`}
            onClick={handleAttach}
          >
            <i className="ti ti-paperclip" aria-hidden="true"></i>Attach
          </button>

          {isLookPickerOpen && (
            <div className="lc-look-picker-popover">
              <div className="look-picker-label">Choose a look</div>
              <div className="look-picker-rows" role="radiogroup">
                {LOOK_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    role="radio"
                    aria-checked={currentLook === opt.key}
                    className={`look-row-btn ${currentLook === opt.key ? "selected" : ""}`}
                    onClick={() => handleSelectLook(opt.key)}
                  >
                    <div className={`mini-preview-grid preview-${opt.key}`}>
                      {HUES.map((hue, i) => (
                        <div
                          key={i}
                          className="mini-cell"
                          style={{
                            "--c": hue.c,
                            "--bg": hue.bg,
                            "--bd": hue.bd,
                            "--ti": hue.ti
                          }}
                        />
                      ))}
                    </div>
                    <div className="look-row-text">
                      <div className="look-row-title">{opt.title}</div>
                      <div className="look-row-desc">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
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
              <Sparkles size={12} style={{ marginRight: 4 }} />
              Draft with AI
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
                <div className="textarea-header-label">
                  <span>Describe your startup or product idea</span>
                  <span className="ai-badge-sub">Live AI Engine</span>
                </div>
                <textarea
                  value={ideaPrompt}
                  onChange={(e) => {
                    setIdeaPrompt(e.target.value);
                    if (promptError) setPromptError("");
                  }}
                  placeholder="e.g. AI-powered micro-accounting for freelance developers that auto-generates tax-ready deductions..."
                  rows={4}
                />
                {promptError && (
                  <div className="ai-prompt-error-msg">{promptError}</div>
                )}
              </div>

              <div className="ai-section-subhead">Quick inspiration</div>
              <div className="ai-draft-chips-col">
                {INSPIRATION_IDEAS.map((item) => {
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

              {isLoading && loadingStageText && (
                <div className="ai-generation-stage-bar">
                  <div className="stage-spinner"></div>
                  <span>{loadingStageText}</span>
                </div>
              )}

              <button
                className={`btn-generate-canvas-exact ${!isGenerated ? "is-primary" : "is-outline"} ${isLoading ? "is-loading" : ""}`}
                onClick={handleGenerateCanvas}
                disabled={isLoading}
              >
                <Sparkles size={14} className={isLoading ? "spin-pulse" : ""} />
                {isLoading ? `Drafting with AI (${revealedCount}/9)…` : isGenerated ? "Re-draft with AI" : "Draft with AI"}
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
                Drag a card onto a box or click to link
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
            <div className="callout-title">Draft with AI in Seconds</div>
            <div className="callout-desc">
              Type your startup idea on the left and click <strong>Draft with AI</strong>. All 9 Lean Canvas boxes will be dynamically synthesized!
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

      {/* AI Settings Modal */}
      {isAIConfigOpen && (
        <div className="lc-modal-backdrop" onClick={() => setIsAIConfigOpen(false)}>
          <div className="lc-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-dialog-header">
              <div className="modal-header-icon-title">
                <Sparkles size={16} color="#8546ff" />
                <h3>AI Drafting Settings</h3>
              </div>
              <button
                type="button"
                className="modal-dialog-close"
                onClick={() => setIsAIConfigOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-dialog-body">
              <p className="modal-body-subtext">
                Choose your AI engine for generating Lean Canvas boxes.
              </p>

              <div className="ai-provider-list">
                {AI_PROVIDERS.map((provider) => (
                  <label
                    key={provider.id}
                    className={`ai-provider-card ${aiConfig.provider === provider.id ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="ai-provider"
                      value={provider.id}
                      checked={aiConfig.provider === provider.id}
                      onChange={() => setAIConfig({ ...aiConfig, provider: provider.id })}
                    />
                    <div className="provider-info">
                      <div className="provider-title-row">
                        <span className="provider-name">{provider.name}</span>
                        {provider.badge && <span className="provider-badge-free">{provider.badge}</span>}
                      </div>
                      <span className="provider-desc">{provider.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {aiConfig.provider === "gemini" && (
                <div className="api-key-input-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <label>Google Gemini API Key (100% Free)</label>
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "11px", color: "#579DFF", textDecoration: "none", fontWeight: 600 }}
                    >
                      Get Free Key (Google AI Studio) ↗
                    </a>
                  </div>
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={aiConfig.geminiKey || ""}
                    onChange={(e) => setAIConfig({ ...aiConfig, geminiKey: e.target.value })}
                  />
                  <small style={{ color: "var(--lc-text-muted)", fontSize: "11px", lineHeight: "1.4" }}>
                    {aiConfig.geminiKey?.trim()
                      ? "✅ Connected! Using your free Google Gemini 1.5 Flash quota (1,500 requests/day)."
                      : "💡 Free forever with Google AI Studio. If left blank, Link Canvas uses instant AI automatically."}
                  </small>
                </div>
              )}

              {aiConfig.provider === "openai" && (
                <div className="api-key-input-group">
                  <label>OpenAI API Key</label>
                  <input
                    type="password"
                    placeholder="sk-proj-..."
                    value={aiConfig.openaiKey || ""}
                    onChange={(e) => setAIConfig({ ...aiConfig, openaiKey: e.target.value })}
                  />
                </div>
              )}

              {aiConfig.provider === "groq" && (
                <div className="api-key-input-group">
                  <label>Groq API Key</label>
                  <input
                    type="password"
                    placeholder="gsk_..."
                    value={aiConfig.groqKey || ""}
                    onChange={(e) => setAIConfig({ ...aiConfig, groqKey: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div className="modal-dialog-footer">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setIsAIConfigOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-modal-save"
                onClick={() => handleSaveAIConfig(aiConfig)}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
