import React, { useState, useEffect, useRef } from "react";
import "./canvas.css";
import {
  generateLeanCanvasAI,
  regenerateSingleBoxAI
} from "../lib/aiDraftService.js";
import { createCardOnList } from "../lib/trelloApi.js";

// =========================================================================
// ICONS (14px Lucide-style)
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

const Sparkles = ({ size = 14, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const RefreshCw = ({ size = 12, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </svg>
);

const Pencil = ({ size = 11, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
    <path d="m15 5 4 4"/>
  </svg>
);

const Check = ({ size = 11, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const XIcon = ({ size = 11, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
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

const BOX_KEYS_MAP = {
  "Problem": { prop: "problem", isArray: true },
  "Solution": { prop: "solution", isArray: true },
  "Key metrics": { prop: "keyMetrics", isArray: true },
  "Value proposition": { prop: "uvp", isArray: false },
  "Unfair advantage": { prop: "unfairAdvantage", isArray: false },
  "Channels": { prop: "channels", isArray: true },
  "Customers": { prop: "customerSegments", isArray: true },
  "Cost structure": { prop: "costStructure", isArray: true },
  "Revenue streams": { prop: "revenueStreams", isArray: true }
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

const INITIAL_BOARD_CARDS = [];

const DEFAULT_TRELLO_LISTS = [
  { id: "backlog", name: "Backlog / Hypotheses", icon: "📋", subtitle: "Trello List" },
  { id: "todo", name: "To Do (Next Sprint)", icon: "🎯", subtitle: "Trello List" },
  { id: "in_progress", name: "In Progress", icon: "⚡", subtitle: "Trello List" },
  { id: "done", name: "Done / Validated", icon: "✅", subtitle: "Trello List" }
];

export default function CanvasApp({ t }) {
  const [currentLook, setCurrentLook] = useState("rich");
  const [isLookPickerOpen, setIsLookPickerOpen] = useState(false);
  const lookPickerRef = useRef(null);

  const [activeChipKey, setActiveChipKey] = useState("");
  const [ideaPrompt, setIdeaPrompt] = useState(INSPIRATION_IDEAS[0].text);
  const [promptError, setPromptError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStageText, setLoadingStageText] = useState("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState(EMPTY_CANVAS);
  const [boardCards, setBoardCards] = useState(INITIAL_BOARD_CARDS);
  const [selectedBoxKey, setSelectedBoxKey] = useState("Problem");
  const [toastMessage, setToastMessage] = useState(null);
  const [regeneratingBox, setRegeneratingBox] = useState(null);

  // Box inline edit state
  const [editingBoxKey, setEditingBoxKey] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  // "To Cards" Popup Modal State
  const [isToCardsModalOpen, setIsToCardsModalOpen] = useState(false);
  const [toCardsSourceBox, setToCardsSourceBox] = useState("Solution");
  const [selectedCardIndexes, setSelectedCardIndexes] = useState([]);
  const [selectedTargetListId, setSelectedTargetListId] = useState("todo");
  const [trelloLists, setTrelloLists] = useState(DEFAULT_TRELLO_LISTS);

  // Re-draft & AI state tracking
  const [draftCount, setDraftCount] = useState(0);
  const [boxRegenCounts, setBoxRegenCounts] = useState({});

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

    // Dynamically fetch actual Trello lists from current board
    if (t && typeof t.lists === "function") {
      t.lists("all")
        .then((realLists) => {
          if (Array.isArray(realLists) && realLists.length > 0) {
            const listIcons = ["📋", "🎯", "⚡", "✅", "📌", "🚀", "💡"];
            const formatted = realLists.map((l, index) => ({
              id: l.id,
              name: l.name,
              icon: listIcons[index % listIcons.length] || "📋",
              subtitle: "Trello Board List"
            }));
            setTrelloLists(formatted);
            setSelectedTargetListId(formatted[0].id);
          }
        })
        .catch(() => {
          // Keep default fallback lists if offline or standalone preview
        });
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
        setEditingBoxKey(null);
        setIsToCardsModalOpen(false);
      }
    }
    if (isLookPickerOpen || isToCardsModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLookPickerOpen, isToCardsModalOpen]);

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

  function getSourceItems(boxName) {
    const prop = BOX_KEYS_MAP[boxName]?.prop;
    const raw = prop ? activeCanvas[prop] : [];
    if (Array.isArray(raw)) return raw;
    if (raw && typeof raw === "string" && raw.trim()) return [raw];
    return [];
  }

  function handleOpenToCards(e, boxKey = "Solution") {
    if (e) e.stopPropagation();
    setToCardsSourceBox(boxKey);
    const items = getSourceItems(boxKey);
    setSelectedCardIndexes(items.map((_, i) => i));
    setIsToCardsModalOpen(true);
  }

  function handleChangeSourceBox(newBoxKey) {
    setToCardsSourceBox(newBoxKey);
    const items = getSourceItems(newBoxKey);
    setSelectedCardIndexes(items.map((_, i) => i));
  }

  function handleSelectAllCards(totalCount) {
    setSelectedCardIndexes(Array.from({ length: totalCount }, (_, i) => i));
  }

  function handleClearCards() {
    setSelectedCardIndexes([]);
  }

  function handleToggleCardIndex(index) {
    setSelectedCardIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  }

  async function handleInsertCardsSubmit() {
    const items = getSourceItems(toCardsSourceBox);
    const itemsToInsert = selectedCardIndexes.map(i => items[i]).filter(Boolean);

    if (itemsToInsert.length === 0) {
      showToast("⚠️ Please select at least one item to insert");
      return;
    }

    const selectedList = trelloLists.find(l => l.id === selectedTargetListId) || trelloLists[0];

    // Attempt real card creation via Trello REST API if authenticated
    if (t) {
      for (const title of itemsToInsert) {
        try {
          await createCardOnList(t, selectedList.id, title, `Generated from Lean Canvas (${toCardsSourceBox})`);
        } catch (apiErr) {
          // Handled gracefully (e.g. if user is browsing without write authorization)
        }
      }
    }

    const newCards = itemsToInsert.map((title, idx) => ({
      id: "card_" + Date.now() + "_" + idx,
      title: title,
      box: toCardsSourceBox,
      listId: selectedList.id,
      listName: selectedList.name
    }));

    setBoardCards(prev => [...prev, ...newCards]);
    setIsToCardsModalOpen(false);
    showToast(`📋 Inserted ${itemsToInsert.length} ${toCardsSourceBox.toLowerCase()} cards into "${selectedList.name}"!`);
  }

  function handleStartEdit(e, boxKey, content) {
    e.stopPropagation();
    setEditingBoxKey(boxKey);
    if (Array.isArray(content)) {
      setEditingContent(content.join("\n"));
    } else if (typeof content === "string") {
      setEditingContent(content);
    } else {
      setEditingContent("");
    }
  }

  function handleSaveEdit(e, boxKey) {
    if (e) e.stopPropagation();
    const mapping = BOX_KEYS_MAP[boxKey];
    if (mapping) {
      let newVal;
      if (mapping.isArray) {
        newVal = editingContent
          .split("\n")
          .map(line => line.trim())
          .filter(line => line.length > 0);
      } else {
        newVal = editingContent.trim();
      }
      setActiveCanvas(prev => ({
        ...prev,
        [mapping.prop]: newVal
      }));
      setIsGenerated(true);
      showToast(`✓ Updated ${boxKey}`);
    }
    setEditingBoxKey(null);
    setEditingContent("");
  }

  function handleCancelEdit(e) {
    if (e) e.stopPropagation();
    setEditingBoxKey(null);
    setEditingContent("");
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

    const nextIteration = isGenerated || draftCount > 0 ? draftCount + 1 : 0;
    setDraftCount(nextIteration);

    setLoadingStageText(nextIteration > 0
      ? `🔄 Synthesizing Draft #${nextIteration + 1} with alternative strategic angle...`
      : "🧠 Analyzing startup idea & market context..."
    );

    const stageTimer1 = setTimeout(() => {
      setLoadingStageText("⚡ Synthesizing problems, UVP & solutions...");
    }, 900);
    const stageTimer2 = setTimeout(() => {
      setLoadingStageText("📊 Structuring metrics, channels & financials...");
    }, 2000);

    try {
      const aiResult = await generateLeanCanvasAI(trimmedPrompt, nextIteration);

      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setLoadingStageText("✨ Assembling 9 Lean Canvas boxes...");

      setActiveCanvas(aiResult);

      let count = 0;
      const interval = setInterval(() => {
        count++;
        setRevealedCount(count);
        if (count >= 9) {
          clearInterval(interval);
          setIsLoading(false);
          setIsGenerated(true);
          setLoadingStageText("");
          showToast(nextIteration > 0 ? `✨ Generated Draft #${nextIteration + 1}!` : "✨ Generated 9-box Lean Canvas!");
        }
      }, 100);
    } catch (err) {
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setIsLoading(false);
      setPromptError(err.message || "Failed to generate canvas");
      showToast("⚠️ Generation error. Please try again.");
    }
  }

  async function handleRegenerateSingleBox(e, boxKey) {
    e.stopPropagation();
    if (!isGenerated || isLoading) return;
    setRegeneratingBox(boxKey);
    showToast(`✨ Regenerating ${boxKey}...`);

    try {
      const nextBoxIter = (boxRegenCounts[boxKey] || 0) + 1;
      setBoxRegenCounts(prev => ({ ...prev, [boxKey]: nextBoxIter }));

      const newItems = await regenerateSingleBoxAI(boxKey, activeCanvas, ideaPrompt, nextBoxIter);
      if (newItems) {
        const mapping = BOX_KEYS_MAP[boxKey];
        if (mapping && mapping.prop) {
          setActiveCanvas(prev => ({
            ...prev,
            [mapping.prop]: newItems
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
    setDraftCount(0);
    setBoxRegenCounts({});
    setPromptError("");
    setActiveCanvas(EMPTY_CANVAS);
    setBoardCards([]);
    setEditingBoxKey(null);
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

  function handleBoxClick(boxKey) {
    setSelectedBoxKey(boxKey);
  }

  function renderBox(boxKey, orderIndex, boxNum, colClass, iconBadgeClass, IconComponent, title, content, subtextHint) {
    const isFilled = isGenerated || (isLoading && revealedCount >= orderIndex);
    const isBoxLoading = isLoading && revealedCount < orderIndex;
    const isJustRevealed = isLoading && revealedCount === orderIndex;
    const isRegenerating = regeneratingBox === boxKey;
    const isEditing = editingBoxKey === boxKey;
    const hasData = isFilled && ((Array.isArray(content) && content.length > 0) || (typeof content === "string" && content.trim().length > 0));

    return (
      <div
        className={`lc-box-item ${colClass} ${hasData ? "is-filled" : ""} ${selectedBoxKey === boxKey ? "active-target" : ""} ${isEditing ? "is-editing" : ""}`}
        onClick={() => handleBoxClick(boxKey)}
      >
        <div className="box-item-header">
          <div className="box-header-title-wrap">
            <div className={`box-icon-badge ${iconBadgeClass}`}>
              <IconComponent size={14} />
            </div>
            <span>{title}</span>
          </div>

          <div className="box-header-actions">
            {boxKey === "Solution" && hasData && !isEditing && (
              <button
                type="button"
                className="btn-box-to-cards-header"
                title="Convert solutions to Trello cards"
                onClick={(e) => handleOpenToCards(e, "Solution")}
              >
                <span>To Cards →</span>
              </button>
            )}
            {!isEditing && (
              <button
                type="button"
                className="btn-box-action btn-box-edit"
                title={`Edit ${title}`}
                onClick={(e) => handleStartEdit(e, title, content)}
              >
                <Pencil size={11} />
              </button>
            )}
            {isGenerated && !isEditing && (
              <button
                type="button"
                className={`btn-box-action btn-box-ai-regen ${isRegenerating ? "spinning" : ""}`}
                title={`Regenerate ${title} with AI`}
                onClick={(e) => handleRegenerateSingleBox(e, title)}
              >
                <RefreshCw size={11} className={isRegenerating ? "spin-pulse" : ""} />
              </button>
            )}
            <span className="box-num">{boxNum}</span>
          </div>
        </div>

        {isEditing ? (
          <div className="box-inline-editor" onClick={(e) => e.stopPropagation()}>
            <textarea
              className="box-edit-textarea"
              value={editingContent}
              onChange={(e) => setEditingContent(e.target.value)}
              placeholder={`Enter ${title} (one item per line)...`}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  handleSaveEdit(e, title);
                } else if (e.key === "Escape") {
                  handleCancelEdit(e);
                }
              }}
            />
            <div className="box-edit-actions">
              <button
                type="button"
                className="btn-box-save"
                onClick={(e) => handleSaveEdit(e, title)}
                title="Save changes (Ctrl+Enter)"
              >
                <Check size={11} /> Save
              </button>
              <button
                type="button"
                className="btn-box-cancel"
                onClick={handleCancelEdit}
                title="Cancel (Esc)"
              >
                <XIcon size={11} /> Cancel
              </button>
            </div>
          </div>
        ) : isBoxLoading || isRegenerating ? (
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
            {boxKey === "Solution" && (
              <button
                type="button"
                className="btn-solution-to-cards-bottom"
                onClick={(e) => handleOpenToCards(e, "Solution")}
                title="Insert Solutions into Trello List"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                </svg>
                <span>To Cards: Select & Insert into List</span>
              </button>
            )}
          </div>
        ) : (
          <p className="box-item-subtext">{subtextHint}</p>
        )}

        {/* Dropped / Linked Cards Pill (if any) */}
        {boardCards && boardCards.filter(c => c.box === boxKey).length > 0 && (
          <div className="box-dropped-cards">
            {boardCards.filter(c => c.box === boxKey).map(c => (
              <span key={c.id} className="dropped-card-blue-pill" title={c.title}>
                {c.title}
              </span>
            ))}
          </div>
        )}
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
            {isLoading ? <Sparkles size={13} className="spin-pulse" /> : <Grid size={13} />}
            <span>
              {isLoading
                ? `Drafting ${revealedCount} of 9…`
                : isGenerated
                ? `Lean Canvas · Draft #${draftCount + 1} ready`
                : "Lean Canvas · empty"}
            </span>
          </span>
        </div>

        <div className="header-right-tools" ref={lookPickerRef} style={{ position: "relative" }}>
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
        {/* Left Sidebar (Dedicated Gemini AI Drafting) */}
        <div className="lc-exact-sidebar">
          <div className="tab-ai-draft-content">
            <div className={`ai-draft-textarea-box ${promptError ? "has-error" : ""}`}>
              <div className="textarea-header-label">
                <span>Describe your startup or product idea</span>
                <span className="ai-badge-sub">
                  {draftCount > 0 ? `Draft #${draftCount + 1}` : "AI Assist"}
                </span>
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
              {isLoading
                ? `Drafting Canvas (${revealedCount}/9)…`
                : isGenerated
                ? `Re-draft Canvas (Angle #${((draftCount + 1) % 4) + 1})`
                : "Draft Lean Canvas"}
            </button>
          </div>
        </div>

        {/* Right 10-Column 9-Box Matrix */}
        <div className="lc-exact-canvas-board">
          {/* Empty state callout centered over the canvas */}
          <div className={`canvas-empty-callout ${isGenerated || isLoading ? "fade-out" : ""}`}>
            <div className="callout-sparkle-chip">
              <Sparkles size={14} />
            </div>
            <div className="callout-title">Draft Lean Canvas</div>
            <div className="callout-desc">
              Type your startup idea on the left and click <strong>Draft Lean Canvas</strong>, or click the edit icon on any box to write directly!
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

      {/* "To Cards" Modal Popup */}
      {isToCardsModalOpen && (
        <div className="lc-modal-overlay" onClick={() => setIsToCardsModalOpen(false)}>
          <div className="lc-to-cards-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="to-cards-modal-header">
              <div className="to-cards-title-wrap">
                <div className="to-cards-title-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
                    <rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <div className="to-cards-title-row">
                    <h3>{`Insert ${toCardsSourceBox}s into Trello List`}</h3>
                    <span className="to-cards-feature-badge">FEATURE #3</span>
                  </div>
                  <p className="to-cards-subtext">
                    Select your solutions and choose the destination list to convert them into cards.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setIsToCardsModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="to-cards-modal-body">
              {/* Source Box Select Row */}
              <div className="to-cards-source-bar">
                <div className="source-label-group">
                  <label htmlFor="source-box-select">SOURCE BOX:</label>
                  <select
                    id="source-box-select"
                    value={toCardsSourceBox}
                    onChange={(e) => handleChangeSourceBox(e.target.value)}
                    className="to-cards-select-dropdown"
                  >
                    {Object.keys(BOX_KEYS_MAP).map((boxName, i) => {
                      const count = getSourceItems(boxName).length;
                      return (
                        <option key={boxName} value={boxName}>
                          {`${i + 1}. ${boxName} (${count} items)`}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <span className="source-counter-label">
                  {`${selectedCardIndexes.length} of ${getSourceItems(toCardsSourceBox).length} selected`}
                </span>
              </div>

              {/* Select Items Header */}
              <div className="to-cards-section-header">
                <div className="section-title-left">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="m9 11 3 3L22 4"/>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  <span>{`SELECT ${toCardsSourceBox.toUpperCase()} TO INSERT (${selectedCardIndexes.length}/${getSourceItems(toCardsSourceBox).length}):`}</span>
                </div>
                <div className="section-actions-right">
                  <button
                    type="button"
                    className="btn-text-action"
                    onClick={() => handleSelectAllCards(getSourceItems(toCardsSourceBox).length)}
                  >
                    Select All
                  </button>
                  <span className="action-sep">•</span>
                  <button
                    type="button"
                    className="btn-text-action"
                    onClick={handleClearCards}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="to-cards-items-scroll">
                {getSourceItems(toCardsSourceBox).length === 0 ? (
                  <div className="to-cards-empty-box">No items in {toCardsSourceBox}. Click edit or draft with AI first.</div>
                ) : (
                  getSourceItems(toCardsSourceBox).map((itemText, idx) => {
                    const isChecked = selectedCardIndexes.includes(idx);
                    return (
                      <div
                        key={idx}
                        className={`to-cards-item-card ${isChecked ? "is-selected" : ""}`}
                        onClick={() => handleToggleCardIndex(idx)}
                      >
                        <input
                          type="checkbox"
                          className="to-cards-item-checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by container click
                        />
                        <div className="to-cards-item-content">
                          <div className="to-cards-item-badges">
                            <span className="badge-solution-num">{`${toCardsSourceBox.toUpperCase()} #${idx + 1}`}</span>
                            {idx === 0 && <span className="badge-active-testing">Active Testing</span>}
                          </div>
                          <div className="to-cards-item-text">{itemText}</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Select List to Insert */}
              <div className="to-cards-section-header" style={{ marginTop: 14 }}>
                <span className="section-title-clean">SELECT LIST TO INSERT:</span>
                <span className="section-subtitle-muted">Destination on Trello Board</span>
              </div>

              <div className="to-cards-lists-grid">
                {trelloLists.map((list) => {
                  const isSelected = selectedTargetListId === list.id;
                  return (
                    <div
                      key={list.id}
                      className={`to-cards-list-card ${isSelected ? "is-active" : ""}`}
                      onClick={() => setSelectedTargetListId(list.id)}
                    >
                      <div className="list-radio-indicator">
                        <div className={`radio-dot ${isSelected ? "checked" : ""}`} />
                      </div>
                      <div className="list-info-wrap">
                        <div className="list-name-row">
                          <span className="list-emoji">{list.icon}</span>
                          <span className="list-name">{list.name}</span>
                        </div>
                        <span className="list-subtext">{list.subtitle || "Trello List"}</span>
                      </div>
                      <span className="list-target-pill">Target</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="to-cards-modal-footer">
              <button
                type="button"
                className="btn-to-cards-cancel"
                onClick={() => setIsToCardsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-to-cards-submit"
                onClick={handleInsertCardsSubmit}
                disabled={selectedCardIndexes.length === 0}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                </svg>
                {`Insert ${selectedCardIndexes.length} ${toCardsSourceBox}s into List`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
