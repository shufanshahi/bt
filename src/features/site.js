import {
  bindDialog,
  openDialog,
  closeDialog,
  notify,
} from "../components/dialog.js";
import { readStorage, writeStorage } from "../lib/storage.js";
import { escapeHtml } from "../lib/html.js";
import { findCourse } from "../data/courses.js";
export function bindSite() {
  bindDialog();
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.classList.contains("menu-button")) {
      const nav = document.querySelector(".mobile-nav");
      nav.hidden = !nav.hidden;
      button.setAttribute("aria-expanded", String(!nav.hidden));
      button.setAttribute(
        "aria-label",
        nav.hidden ? "Open menu" : "Close menu",
      );
    }
    if (button.dataset.footerFilter)
      location.href = `/search?category=${encodeURIComponent(button.dataset.footerFilter)}`;
    if (button.classList.contains("bag-button")) {
      const stored = readStorage("saved-courses", []);
      const saved = (Array.isArray(stored) ? stored : [])
        .map(findCourse)
        .filter(Boolean);
      openDialog(
        `<h2 id="dialog-title">Your saved courses</h2>${saved.length ? `<ul class="saved-list">${saved.map((c) => `<li><a href="/courses/${c.id}">${escapeHtml(c.title)} <span>→</span></a></li>`).join("")}</ul>` : "<p>You haven’t saved any courses yet. Open a course and choose Save course to add it here.</p>"}<a class="button" href="/search">Browse courses</a>`,
      );
    }
    if (button.dataset.info) showInfo(button.dataset.info);
    if (button.hasAttribute("data-cookie-save")) {
      const saved = writeStorage(
        "cookie-preference",
        document.querySelector("#optional-cookies").checked
          ? "accepted"
          : "essential",
      );
      closeDialog();
      notify(
        saved
          ? "Cookie preferences saved."
          : "Preferences apply for this visit. Browser storage is unavailable.",
      );
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const nav = document.querySelector(".mobile-nav");
      if (nav && !nav.hidden) {
        nav.hidden = true;
        const button = document.querySelector(".menu-button");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open menu");
        button.focus();
      }
    }
  });
  document
    .querySelector(".newsletter-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      notify(
        "Thanks for your interest! Newsletter subscriptions are not connected in this demo.",
      );
    });
}
function showInfo(title) {
  const content = {
    "Privacy Policy":
      "This demonstration website does not send your form entries to a server. No account, password, or newsletter email is stored. Saved courses, lesson progress, follows, and cookie preferences are stored only in your browser.",
    "Terms of Service":
      "ByteSpace is a frontend demonstration. Course listings, ratings, lesson notes, and progress are sample content. Account creation, payments, and video delivery are not connected.",
    "Affiliate Program":
      "Affiliate applications are not available in this demo. You can explore the creator signup page to see the onboarding experience.",
    Contact:
      "Thanks for your interest in ByteSpace. A support service is not connected to this demonstration website.",
    Help: "Search courses, filter by topic or level, and sort the results. Open a course to explore About, Lessons, and Reviews. Lesson notes and progress tracking work locally. Visit the instructor profile to follow the creator.",
  };
  if (title === "Cookies Settings") {
    openDialog(
      `<h2 id="dialog-title">Cookie settings</h2><p>Essential preferences keep this demo working. No analytics or tracking services are installed.</p><label class="terms"><input type="checkbox" id="optional-cookies" ${readStorage("cookie-preference", "essential") === "accepted" ? "checked" : ""}/> Allow optional cookies if available</label><button class="button" data-cookie-save>Save preferences</button>`,
    );
    return;
  }
  if (content[title])
    openDialog(
      `<h2 id="dialog-title">${escapeHtml(title)}</h2><p>${content[title]}</p>`,
    );
}
