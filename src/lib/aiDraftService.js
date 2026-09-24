/**
 * AI Drafting Service for Link Canvas (Ash Maurya Lean Canvas)
 * Supports:
 *  - Google Gemini API (gemini-1.5-flash / gemini-2.0-flash) [100% Free at Google AI Studio]
 *  - Built-in Instant AI (via Pollinations structured LLM - zero key required)
 *  - OpenAI API (gpt-4o-mini / gpt-3.5-turbo)
 *  - Groq API (llama-3.1-70b / llama-3.1-8b)
 */

export const AI_PROVIDERS = [
  {
    id: "gemini",
    name: "Google Gemini 1.5 Flash",
    requiresKey: true,
    isFree: true,
    badge: "100% Free Forever",
    desc: "1,500 free requests/day from Google AI Studio",
    keyUrl: "https://aistudio.google.com/app/apikey"
  },
  {
    id: "builtin",
    name: "Link Canvas Instant AI",
    requiresKey: false,
    isFree: true,
    badge: "Instant / No Key",
    desc: "Zero-configuration live structured generation"
  },
  {
    id: "openai",
    name: "OpenAI GPT-4o Mini",
    requiresKey: true,
    isFree: false,
    desc: "Use your OpenAI API Key (sk-proj-...)",
    keyUrl: "https://platform.openai.com/api-keys"
  },
  {
    id: "groq",
    name: "Groq Llama 3.1",
    requiresKey: true,
    isFree: true,
    badge: "Ultra Fast",
    desc: "High-speed Llama 3.1 via Groq Cloud free tier",
    keyUrl: "https://console.groq.com/keys"
  }
];

export function getStoredAIConfig() {
  const envGeminiKey = import.meta.env?.VITE_GEMINI_API_KEY || "";
  const envOpenAIKey = import.meta.env?.VITE_OPENAI_API_KEY || "";
  const envGroqKey = import.meta.env?.VITE_GROQ_API_KEY || "";

  try {
    const saved = localStorage.getItem("lc_ai_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        provider: parsed.provider || (envGeminiKey ? "gemini" : "builtin"),
        geminiKey: parsed.geminiKey || envGeminiKey,
        openaiKey: parsed.openaiKey || envOpenAIKey,
        groqKey: parsed.groqKey || envGroqKey,
        modelName: parsed.modelName || "gemini-1.5-flash"
      };
    }
  } catch (e) {}
  
  return {
    provider: envGeminiKey ? "gemini" : "gemini",
    geminiKey: envGeminiKey,
    openaiKey: envOpenAIKey,
    groqKey: envGroqKey,
    modelName: "gemini-1.5-flash"
  };
}

export function saveStoredAIConfig(config) {
  try {
    localStorage.setItem("lc_ai_config", JSON.stringify(config));
  } catch (e) {}
}

const LEAN_CANVAS_SYSTEM_PROMPT = `You are a world-class startup advisor and Ash Maurya Lean Canvas expert.
Analyze the user's startup or product idea and generate an airtight, realistic, high-impact 9-box Lean Canvas.
You MUST output ONLY a valid, parseable JSON object matching this schema exactly:
{
  "problem": ["Top pain point 1", "Top pain point 2", "Top pain point 3"],
  "solution": ["Core solution feature 1", "Core solution feature 2", "Core solution feature 3"],
  "keyMetrics": ["Primary metric to track 1", "Key metric 2"],
  "uvp": "A single compelling, razor-sharp Unique Value Proposition statement explaining why this is 10x better and worth paying for.",
  "unfairAdvantage": "A single clear unfair advantage that cannot be easily copied or bought by competitors.",
  "channels": ["Direct customer acquisition channel 1", "Scalable channel 2", "Channel 3"],
  "customerSegments": ["Primary early adopter persona", "Broader target customer segment"],
  "costStructure": ["Major cost driver 1", "Major cost driver 2"],
  "revenueStreams": ["Primary monetization/pricing model", "Secondary revenue stream"]
}

Rules:
- UVP and unfairAdvantage MUST be single strings.
- All other 7 fields MUST be arrays of concise bullet strings (max 12-15 words each).
- Return ONLY the raw JSON object. No markdown backticks, no commentary.`;

/**
 * Clean & parse LLM response into structured 9-box Lean Canvas object
 */
function cleanAndParseJSON(rawText, fallbackPrompt) {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty AI response received");
  }

  let cleaned = rawText.trim();
  // Strip markdown code blocks if wrapped
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```\s*$/i, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/i, "").replace(/```\s*$/i, "");
  }

  // Find first '{' and last '}'
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  const parsed = JSON.parse(cleaned);

  // Normalize structure
  return {
    problem: Array.isArray(parsed.problem) ? parsed.problem : [String(parsed.problem || "Unsolved workflow friction")],
    solution: Array.isArray(parsed.solution) ? parsed.solution : [String(parsed.solution || "Automated smart solution")],
    keyMetrics: Array.isArray(parsed.keyMetrics) ? parsed.keyMetrics : [String(parsed.keyMetrics || "Monthly active users & retention")],
    uvp: typeof parsed.uvp === "string" ? parsed.uvp : Array.isArray(parsed.uvp) ? parsed.uvp.join(" ") : `Transform ${fallbackPrompt.slice(0, 30)} with modern automated intelligence.`,
    unfairAdvantage: typeof parsed.unfairAdvantage === "string" ? parsed.unfairAdvantage : Array.isArray(parsed.unfairAdvantage) ? parsed.unfairAdvantage.join(" ") : "Proprietary domain workflows and specialized network effects.",
    channels: Array.isArray(parsed.channels) ? parsed.channels : [String(parsed.channels || "Direct digital marketing & word-of-mouth")],
    customerSegments: Array.isArray(parsed.customerSegments) ? parsed.customerSegments : [String(parsed.customerSegments || "Early adopters in target niche")],
    costStructure: Array.isArray(parsed.costStructure) ? parsed.costStructure : [String(parsed.costStructure || "Cloud infrastructure & customer acquisition")],
    revenueStreams: Array.isArray(parsed.revenueStreams) ? parsed.revenueStreams : [String(parsed.revenueStreams || "Tiered monthly subscription")]
  };
}

/**
 * Generate full 9-box Lean Canvas from user prompt
 */
export async function generateLeanCanvasAI(prompt, options = {}) {
  const config = { ...getStoredAIConfig(), ...options };
  const idea = prompt.trim();
  if (!idea) {
    throw new Error("Please enter a startup or product description");
  }

  const provider = config.provider || "gemini";

  try {
    if (provider === "gemini") {
      if (config.geminiKey && config.geminiKey.trim()) {
        return await callGeminiAPI(idea, config.geminiKey);
      } else {
        // If user selected Gemini but hasn't entered key yet, try free builtin proxy
        return await callBuiltinAI(idea);
      }
    } else if (provider === "openai" && config.openaiKey) {
      return await callOpenAIAPI(idea, config.openaiKey);
    } else if (provider === "groq" && config.groqKey) {
      return await callGroqAPI(idea, config.groqKey);
    } else {
      return await callBuiltinAI(idea);
    }
  } catch (err) {
    console.warn("Primary AI call failed, attempting fallback:", err);
    try {
      return await callBuiltinAI(idea);
    } catch (fallbackErr) {
      console.error("Builtin fallback failed:", fallbackErr);
      return generateContextualFallback(idea);
    }
  }
}

/**
 * Google Gemini API Call (Free 1.5 Flash via Google AI Studio)
 */
async function callGeminiAPI(idea, apiKey) {
  // Use Gemini 1.5 Flash (free tier 15 RPM, 1500 req/day)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: `${LEAN_CANVAS_SYSTEM_PROMPT}\n\nStartup / Product Idea:\n"${idea}"` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("Empty candidate received from Gemini API");
  }

  return cleanAndParseJSON(rawText, idea);
}

/**
 * Built-in AI via Pollinations structured LLM (Free, instant, no key required)
 */
async function callBuiltinAI(idea) {
  const response = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: LEAN_CANVAS_SYSTEM_PROMPT },
        { role: "user", content: `Generate a complete 9-box Lean Canvas for this startup idea: "${idea}"` }
      ],
      jsonMode: true,
      seed: Math.floor(Math.random() * 10000)
    })
  });

  if (!response.ok) {
    throw new Error(`AI generation error: HTTP ${response.status}`);
  }

  const text = await response.text();
  return cleanAndParseJSON(text, idea);
}

/**
 * OpenAI API Call (gpt-4o-mini)
 */
async function callOpenAIAPI(idea, apiKey) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: LEAN_CANVAS_SYSTEM_PROMPT },
        { role: "user", content: `Generate a complete 9-box Lean Canvas for: "${idea}"` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;
  return cleanAndParseJSON(rawText, idea);
}

/**
 * Groq API Call (llama-3.1-70b-versatile)
 */
async function callGroqAPI(idea, apiKey) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: LEAN_CANVAS_SYSTEM_PROMPT },
        { role: "user", content: `Generate a complete 9-box Lean Canvas for: "${idea}"` }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.choices?.[0]?.message?.content;
  return cleanAndParseJSON(rawText, idea);
}

/**
 * Regenerate a specific single box using AI
 */
export async function regenerateSingleBoxAI(boxKey, currentCanvas, ideaPrompt, options = {}) {
  const config = { ...getStoredAIConfig(), ...options };
  const prompt = `Based on the startup idea: "${ideaPrompt}", generate 2-3 fresh, punchy bullet points specifically for the Lean Canvas section "${boxKey}".
Current canvas context:
- Problem: ${JSON.stringify(currentCanvas.problem)}
- Solution: ${JSON.stringify(currentCanvas.solution)}
- UVP: "${currentCanvas.uvp}"

Return ONLY a JSON object: { "items": ["point 1", "point 2", "point 3"] } or for UVP/unfairAdvantage: { "text": "Single punchy statement" }`;

  // Try with Gemini if key available
  if (config.geminiKey && config.geminiKey.trim()) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiKey.trim()}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${prompt}` }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      if (res.ok) {
        const data = await res.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (raw) {
          const parsed = JSON.parse(raw.replace(/```json/gi, "").replace(/```/g, "").trim());
          if (boxKey === "Value proposition" || boxKey === "Unfair advantage") {
            return parsed.text || parsed.uvp || parsed.unfairAdvantage || (Array.isArray(parsed.items) ? parsed.items.join(" ") : null);
          }
          if (Array.isArray(parsed.items)) return parsed.items;
        }
      }
    } catch (e) {
      console.warn("Gemini single box regen failed, falling back:", e);
    }
  }

  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a Lean Canvas startup expert. Return ONLY valid JSON." },
          { role: "user", content: prompt }
        ],
        jsonMode: true
      })
    });
    if (response.ok) {
      const text = await response.text();
      const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (boxKey === "Value proposition" || boxKey === "Unfair advantage") {
        return parsed.text || parsed.uvp || parsed.unfairAdvantage || (Array.isArray(parsed.items) ? parsed.items.join(" ") : null);
      }
      if (Array.isArray(parsed.items)) return parsed.items;
      if (Array.isArray(parsed[Object.keys(parsed)[0]])) return parsed[Object.keys(parsed)[0]];
    }
  } catch (e) {
    console.warn("Single box AI regenerate failed:", e);
  }
  return null;
}

/**
 * Contextual fallback generator when totally offline
 */
function generateContextualFallback(idea) {
  const words = idea.split(" ").slice(0, 5).join(" ");
  return {
    problem: [
      `High manual overhead and inefficient workflows in ${words}`,
      "Lack of unified visibility and real-time synchronization",
      "Existing tools are clunky, costly, and difficult to adopt"
    ],
    solution: [
      `Automated AI-assisted workflow engine tailored for ${words}`,
      "Real-time collaborative workspace with 1-click integrations",
      "Actionable analytics and smart automated recommendations"
    ],
    keyMetrics: [
      "Weekly active users (WAU) & workflow completion rate",
      "Customer acquisition cost (CAC) payback period < 6 months"
    ],
    uvp: `The all-in-one platform to supercharge ${words} with zero friction.`,
    unfairAdvantage: "Proprietary intelligent data models and domain-specific automated workflows.",
    channels: [
      "Targeted direct outreach to high-intent early adopters",
      "Product-led growth with frictionless viral onboarding",
      "Strategic community partnerships and developer integrations"
    ],
    customerSegments: [
      `Modern teams and professionals seeking efficiency in ${words}`,
      "Early-stage innovators looking for automated scalable tooling"
    ],
    costStructure: [
      "Cloud infrastructure, API compute & database hosting",
      "Product engineering, customer support & growth marketing"
    ],
    revenueStreams: [
      "Tiered monthly & annual SaaS subscription plans",
      "Usage-based add-ons and premium enterprise licenses"
    ]
  };
}
