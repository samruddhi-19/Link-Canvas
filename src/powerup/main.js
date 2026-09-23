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
      title: "Authorize Link Canvas",
      url: "./auth.html",
      height: 480,
    });
  },

  // Called when member opens Power-Up settings from the board menu
  "show-settings": function (t) {
    return t.popup({
      title: "Link Canvas Settings",
      url: "./settings.html",
      height: 320,
    });
  },

  // Adds a Link Canvas button in the top board header
  "board-buttons": function () {
    return [
      {
        icon: {
          dark: ICON_URL,
          light: ICON_URL,
        },
        text: "Link Canvas",
        callback: async function (t) {
          const authorized = await isAuthorized(t);
          if (!authorized) {
            return t.popup({
              title: "Authorize Link Canvas",
              url: "./auth.html",
              height: 480,
            });
          }

          // Open the canvas modal or notice
          return t.popup({
            title: "Link Canvas",
            url: "./settings.html",
            height: 340,
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
        text: "Link Canvas",
        callback: async function (t) {
          const authorized = await isAuthorized(t);
          if (!authorized) {
            return t.popup({
              title: "Authorize Link Canvas",
              url: "./auth.html",
              height: 480,
            });
          }
          return t.popup({
            title: "Card Connections",
            url: "./settings.html",
            height: 320,
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
