/* global TrelloPowerUp */
import { isAuthorized } from "../lib/auth.js";

const ICON_URL =
  typeof window !== "undefined" && window.location.origin
    ? `${window.location.origin}/icons/icon.svg`
    : "./icons/icon.svg";

TrelloPowerUp.initialize({
  // Trello queries this capability to decide whether to prompt the member to authorize
  "authorization-status": async function (t) {
    const authorized = await isAuthorized(t);
    return { authorized };
  },

  // Called when Trello prompts authorization
  "show-authorization": function (t) {
    return t.popup({
      title: "Authorize Lean Canvas",
      url: "./auth.html",
      height: 320,
    });
  },

  // Called when member opens Power-Up settings from the board menu
  "show-settings": function (t) {
    return t.popup({
      title: "Lean Canvas Settings",
      url: "./settings.html",
      height: 280,
    });
  },

  // Adds a Lean Canvas button in the top board header
  "board-buttons": function () {
    return [
      {
        icon: {
          dark: ICON_URL,
          light: ICON_URL,
        },
        text: "Lean Canvas",
        callback: async function (t) {
          const authorized = await isAuthorized(t);
          if (!authorized) {
            return t.popup({
              title: "Authorize Lean Canvas",
              url: "./auth.html",
              height: 320,
            });
          }

          // User is already authorized -> directly open the power-up canvas widescreen modal
          return t.modal({
            url: "./canvas.html",
            accentColor: "#181d22",
            fullscreen: true,
            title: "Lean Canvas",
          });
        },
      },
    ];
  },

  // Card button: quick action on back of card
  "card-buttons": async function () {
    return [
      {
        icon: ICON_URL,
        text: "Lean Canvas",
        callback: async function (t) {
          const authorized = await isAuthorized(t);
          if (!authorized) {
            return t.popup({
              title: "Authorize Lean Canvas",
              url: "./auth.html",
              height: 320,
            });
          }

          // User is authorized -> directly open the power-up canvas widescreen modal
          return t.modal({
            url: "./canvas.html",
            accentColor: "#181d22",
            fullscreen: true,
            title: "Lean Canvas",
          });
        },
      },
    ];
  },

  // Card Badges: Shows linked status on front of card
  "card-badges": async function (t) {
    try {
      const links = await t.get("card", "shared", "links");
      if (!Array.isArray(links) || links.length === 0) return [];
      return [
        {
          text: `${links.length} ${links.length === 1 ? "link" : "links"}`,
          icon: ICON_URL,
          color: "sky",
        },
      ];
    } catch (e) {
      return [];
    }
  },
});
