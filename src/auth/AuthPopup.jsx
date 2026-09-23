import React, { useEffect, useRef, useState } from "react";
import {
  APP_NAME,
  AUTH_MESSAGE_SOURCE,
  buildAuthorizeUrl,
  saveToken,
} from "../lib/auth.js";
import {
  CheckIcon,
  SpinnerIcon,
  ShieldCheckIcon,
  LinkCanvasIcon,
  AlertCircleIcon,
  ExternalLinkIcon,
  KeyRoundIcon,
  SparklesIcon,
} from "../lib/icons.jsx";
import "./auth.css";

export default function AuthPopup({ t }) {
  const [status, setStatus] = useState("idle"); // idle | waiting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const popupRef = useRef(null);

  // Listen for the postMessage dispatched by /authorized.html once the user approves
  useEffect(() => {
    async function handleMessage(event) {
      if (event.origin !== window.location.origin) return;
      if (!event.data || event.data.source !== AUTH_MESSAGE_SOURCE) return;

      if (!event.data.token) {
        setStatus("error");
        setErrorMessage("No authorization token received from Trello.");
        return;
      }

      try {
        await saveToken(t, event.data.token);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage("Failed to store authorization credentials: " + (err.message || "Unknown error"));
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [t]);

  // Adjust Trello popup size snugly to content
  useEffect(() => {
    if (t && typeof t.sizeTo === "function") {
      t.sizeTo("#root").catch(() => {});
    }
  }, [t, status]);

  function handleAuthorize() {
    setStatus("waiting");
    setErrorMessage("");

    const returnUrl = `${window.location.origin}/authorized.html`;
    const authUrl = buildAuthorizeUrl(returnUrl);

    const width = 580;
    const height = 750;

    const screenWidth = window.screen?.availWidth || window.screen?.width || 1280;
    const screenHeight = window.screen?.availHeight || window.screen?.height || 800;

    const left = Math.max(0, Math.round((screenWidth - width) / 2));
    const top = Math.max(0, Math.round((screenHeight - height) / 2));

    popupRef.current = window.open(
      authUrl,
      "trelloAuthPopup",
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
    );

    // Check if browser popup blocker prevented window from opening
    if (!popupRef.current || popupRef.current.closed || typeof popupRef.current.closed === "undefined") {
      setStatus("error");
      setErrorMessage("Popup was blocked by your browser. Please allow popups for this site and click Try Again.");
    }
  }

  // Helper for sandbox and local dev testing
  async function handleSimulateDevAuth() {
    try {
      const mockDevToken = "mock_link_canvas_token_" + Math.random().toString(36).substring(2, 10);
      await saveToken(t, mockDevToken);
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMessage(e.message);
    }
  }

  if (status === "success") {
    return (
      <div className="auth-popup-container auth-state-box">
        <div className="auth-success-circle">
          <CheckIcon width={28} height={28} />
        </div>
        <h3 className="auth-title" style={{ fontSize: "18px" }}>Link Canvas Connected!</h3>
        <p className="auth-body-text" style={{ textAlign: "center", marginBottom: "20px", marginTop: "6px" }}>
          Your Trello account is now authorized. You can now build visual relationship graphs, link cards, and organize your canvas.
        </p>
        <button
          type="button"
          onClick={() => {
            if (t && typeof t.closePopup === "function") {
              t.closePopup();
            }
          }}
          className="auth-btn-primary"
        >
          <SparklesIcon width={16} height={16} />
          Open Link Canvas
        </button>
      </div>
    );
  }

  return (
    <div className="auth-popup-container">
      {/* Brand Header */}
      <div className="auth-header">
        <div className="auth-icon-badge">
          <LinkCanvasIcon width={24} height={24} />
        </div>
        <div>
          <h3 className="auth-title">Authorize {APP_NAME}</h3>
          <p className="auth-subtitle">Visual Board Mapping & Links</p>
        </div>
      </div>

      <p className="auth-body-text">
        Connect your Trello account so <strong>{APP_NAME}</strong> can visualize card connections, map board flows, and keep your visual canvas in sync.
      </p>

      {/* Feature Value Showcase */}
      <div className="auth-features-list">
        <div className="auth-feature-item">
          <div className="auth-feature-icon">
            <LinkCanvasIcon width={13} height={13} />
          </div>
          <div>
            <strong>Interactive Canvas Graph</strong>
            <span>Create visual node connections between cards and external links</span>
          </div>
        </div>

        <div className="auth-feature-item">
          <div className="auth-feature-icon">
            <SparklesIcon width={13} height={13} />
          </div>
          <div>
            <strong>Bidirectional Card Sync</strong>
            <span>Keep canvas positions and relationship badges up to date</span>
          </div>
        </div>

        <div className="auth-feature-item">
          <div className="auth-feature-icon">
            <ShieldCheckIcon width={13} height={13} />
          </div>
          <div>
            <strong>Member-Private Security</strong>
            <span>Tokens are stored in Trello's member-private storage, never sent externally</span>
          </div>
        </div>
      </div>

      <div className="auth-security-pill">
        <ShieldCheckIcon width={14} height={14} />
        <span>Official Trello OAuth 2.0 • Zero-credential storage</span>
      </div>

      {status === "error" && (
        <div className="auth-error-box">
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", fontWeight: 600 }}>
            <AlertCircleIcon width={15} height={15} />
            <span>Connection issue</span>
          </div>
          {errorMessage || "Couldn't complete authorization. Please verify popups are enabled and try again."}
        </div>
      )}

      {/* Action Button */}
      <button
        type="button"
        onClick={handleAuthorize}
        disabled={status === "waiting"}
        className="auth-btn-primary"
      >
        {status === "waiting" ? (
          <>
            <SpinnerIcon width={16} height={16} />
            Waiting for Trello Approval…
          </>
        ) : (
          <>
            <KeyRoundIcon width={16} height={16} />
            Connect Trello Account
          </>
        )}
      </button>

      {status === "waiting" && (
        <div className="auth-waiting-notice">
          <ExternalLinkIcon width={13} height={13} />
          <span>Please complete authorization in the popup window</span>
        </div>
      )}

      {status === "error" && (
        <button type="button" onClick={handleAuthorize} className="auth-link-btn">
          Try again
        </button>
      )}

      {/* Local Dev Simulator (helpful when running outside Trello) */}
      <button
        type="button"
        onClick={handleSimulateDevAuth}
        className="auth-btn-mock"
        title="Simulates successful authorization for local testing without Trello OAuth redirect"
      >
        ⚡ Dev Quick Connect (Local Testing)
      </button>
    </div>
  );
}
