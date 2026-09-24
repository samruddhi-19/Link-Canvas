/**
 * Google Gemini AI Drafting Service for Link Canvas (Ash Maurya Framework)
 * Powers 9-box Lean Canvas generation using Google Gemini 1.5 Flash (Free Tier)
 */

const GEMINI_API_KEY = (import.meta.env?.VITE_GEMINI_API_KEY || "").trim();

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

  return {
    problem: Array.isArray(parsed.problem) ? parsed.problem : [String(parsed.problem || "Unsolved workflow friction")],
    solution: Array.isArray(parsed.solution) ? parsed.solution : [String(parsed.solution || "Automated smart solution")],
    keyMetrics: Array.isArray(parsed.keyMetrics) ? parsed.keyMetrics : [String(parsed.keyMetrics || "Monthly active users & retention")],
    uvp: typeof parsed.uvp === "string" ? parsed.uvp : Array.isArray(parsed.uvp) ? parsed.uvp.join(" ") : `Transform ${fallbackPrompt.slice(0, 30)} with intelligent automation.`,
    unfairAdvantage: typeof parsed.unfairAdvantage === "string" ? parsed.unfairAdvantage : Array.isArray(parsed.unfairAdvantage) ? parsed.unfairAdvantage.join(" ") : "Proprietary domain workflows and specialized network effects.",
    channels: Array.isArray(parsed.channels) ? parsed.channels : [String(parsed.channels || "Direct digital marketing & word-of-mouth")],
    customerSegments: Array.isArray(parsed.customerSegments) ? parsed.customerSegments : [String(parsed.customerSegments || "Early adopters in target niche")],
    costStructure: Array.isArray(parsed.costStructure) ? parsed.costStructure : [String(parsed.costStructure || "Cloud infrastructure & customer acquisition")],
    revenueStreams: Array.isArray(parsed.revenueStreams) ? parsed.revenueStreams : [String(parsed.revenueStreams || "Tiered monthly subscription")]
  };
}

/**
 * Generate full 9-box Lean Canvas from user prompt using Google Gemini
 */
export async function generateLeanCanvasAI(prompt) {
  const idea = prompt.trim();
  if (!idea) {
    throw new Error("Please enter a startup or product description");
  }

  // 1. If Gemini API Key is configured in .env, call Google Gemini 1.5 Flash directly
  if (GEMINI_API_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
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
        throw new Error(`Gemini API error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return cleanAndParseJSON(rawText, idea);
      }
    } catch (err) {
      console.warn("Gemini direct API call error, trying free endpoint:", err);
    }
  }

  // 2. Free live LLM fallback
  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "system", content: LEAN_CANVAS_SYSTEM_PROMPT },
          { role: "user", content: `Generate a complete 9-box Lean Canvas for this startup idea: "${idea}"` }
        ],
        jsonMode: true,
        seed: Math.floor(Math.random() * 10000)
      })
    });

    if (response.ok) {
      const text = await response.text();
      return cleanAndParseJSON(text, idea);
    }
  } catch (err) {
    console.warn("Fallback call failed:", err);
  }

  // 3. Heuristic offline generator if totally disconnected
  return generateContextualFallback(idea);
}

/**
 * Regenerate a specific single box using Gemini AI
 */
export async function regenerateSingleBoxAI(boxKey, currentCanvas, ideaPrompt) {
  const prompt = `Based on the startup idea: "${ideaPrompt}", generate 2-3 fresh, punchy bullet points specifically for the Lean Canvas section "${boxKey}".
Current canvas context:
- Problem: ${JSON.stringify(currentCanvas.problem)}
- Solution: ${JSON.stringify(currentCanvas.solution)}
- UVP: "${currentCanvas.uvp}"

Return ONLY a JSON object: { "items": ["point 1", "point 2", "point 3"] } or for UVP/unfairAdvantage: { "text": "Single punchy statement" }`;

  if (GEMINI_API_KEY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
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
      console.warn("Gemini single box regen error:", e);
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
    }
  } catch (e) {}

  return null;
}

/**
 * Contextual fallback generator when totally offline
 */
function generateContextualFallback(idea) {
  const words = idea.split(" ").slice(0, 5).join(" ");
  return {
    problem: [
      `High manual friction and fragmented workflows in ${words}`,
      "Lack of real-time visibility, automated sync and intelligence",
      "Existing tools are costly, complex, and slow to deliver value"
    ],
    solution: [
      `AI-powered intelligent engine specifically designed for ${words}`,
      "Real-time unified collaborative workspace with 1-click sync",
      "Actionable metrics, smart insights and automated recommendations"
    ],
    keyMetrics: [
      "Weekly active users (WAU) & task completion rate",
      "Customer acquisition cost (CAC) payback period < 6 months"
    ],
    uvp: `The all-in-one AI platform to streamline ${words} with zero friction.`,
    unfairAdvantage: "Proprietary intelligent data models and domain-specific automated workflows.",
    channels: [
      "Direct targeted outreach to high-intent early adopters",
      "Product-led growth with frictionless viral onboarding",
      "Strategic community partnerships and ecosystem integrations"
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
