import { asset } from "../lib/assets.js";
import { card } from "../components/course-card.js";
import { courses } from "../data/courses.js";
export function bindInteractions({ isSignup = false } = {}) {
  let selectedCategory = "Featured";
  let query = "";
  const dialog = document.querySelector("#detail-dialog");
  function openDialog(html) {
    document.querySelector("#dialog-content").innerHTML = html;
    dialog.showModal();
  }
  document.querySelector(".dialog-close").onclick = () => dialog.close();
  dialog.addEventListener("click", (e) => {
    if (
      e.target === dialog &&
      (e.clientX < dialog.getBoundingClientRect().left ||
        e.clientX > dialog.getBoundingClientRect().right ||
        e.clientY < dialog.getBoundingClientRect().top ||
        e.clientY > dialog.getBoundingClientRect().bottom)
    )
      dialog.close();
  });
  function updateCourses(scroll = false) {
    const filtered = courses.filter(
      (c) =>
        (selectedCategory === "Featured" ||
          c.tags.includes(selectedCategory)) &&
        (!query ||
          `${c.title} ${c.tags.join(" ")} purepearl studio`
            .toLowerCase()
            .includes(query.toLowerCase())),
    );
    document.querySelector(".course-grid").innerHTML = filtered.length
      ? filtered.map(card).join("")
      : `<div class="empty-state"><h3>No courses found</h3><p>Try another topic or explore all our featured courses.</p><button class="button" data-reset>View all courses</button></div>`;
    document.querySelector(".results-summary").textContent =
      selectedCategory === "Featured" && !query
        ? ""
        : `${filtered.length} ${filtered.length === 1 ? "course" : "courses"}${query ? ` matching “${query}”` : ""}${selectedCategory !== "Featured" ? ` in ${selectedCategory}` : ""}`;
    document.querySelectorAll("[data-filter]").forEach((b) => {
      const active = b.dataset.filter === selectedCategory;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    if (scroll)
      document.querySelector("#courses").scrollIntoView({ behavior: "smooth" });
  }
  function notify(message) {
    const el = document.querySelector(".toast");
    el.textContent = message;
    el.classList.add("visible");
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => el.classList.remove("visible"), 4500);
  }
  document.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button) return;
    if (
      button.dataset.filter ||
      button.dataset.path ||
      button.dataset.footerFilter
    ) {
      selectedCategory =
        button.dataset.filter ||
        button.dataset.path ||
        button.dataset.footerFilter;
      query = "";
      document.querySelector("[name=search]").value = "";
      updateCourses(!button.dataset.filter);
    }
    if (button.hasAttribute("data-reset")) {
      selectedCategory = "Featured";
      query = "";
      document.querySelector("[name=search]").value = "";
      updateCourses();
    }
    if (button.dataset.course) {
      const c = courses.find((c) => c.id === button.dataset.course);
      openDialog(
        `<img class="detail-image" src="${asset(c.image)}" alt="${c.title}"/><p class="eyebrow">${c.tags[0]} · Beginner</p><h2 id="dialog-title">${c.title}</h2><p>${c.description}</p><div class="detail-facts"><span>17 lessons</span><span>2 hours 16 mins</span><span>★ 4.5</span></div><p class="price">$25 <span>/ lifetime access</span></p><a class="button" href="/signup">Start learning</a>`,
      );
    }
    if (button.classList.contains("more-filters")) {
      const extra = document.querySelector(".extra-filters");
      extra.hidden = !extra.hidden;
      button.setAttribute("aria-expanded", String(!extra.hidden));
      button.textContent = extra.hidden ? "+ More" : "− Less";
    }
    if (button.classList.contains("menu-button")) {
      const nav = document.querySelector(".mobile-nav");
      nav.hidden = !nav.hidden;
      button.setAttribute("aria-expanded", String(!nav.hidden));
      button.setAttribute(
        "aria-label",
        nav.hidden ? "Open menu" : "Close menu",
      );
    }
    if (button.classList.contains("bag-button"))
      openDialog(
        '<h2 id="dialog-title">Your learning starts here</h2><p>You haven’t saved any courses yet. Explore a course and create an account to start your learning journey.</p><button class="button" data-browse>Browse courses</button>',
      );
    if (button.hasAttribute("data-browse")) {
      dialog.close();
      document.querySelector("#courses").scrollIntoView({ behavior: "smooth" });
    }
    if (button.classList.contains("password-toggle")) {
      const input = button.previousElementSibling;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.setAttribute(
        "aria-label",
        show ? "Hide password" : "Show password",
      );
      button.setAttribute("aria-pressed", String(show));
    }
    if (button.dataset.provider)
      notify(
        `${button.dataset.provider} sign-in is not connected in this frontend demo.`,
      );
    if (button.dataset.info) showInfo(button.dataset.info);
    if (button.hasAttribute("data-cookie-save")) {
      localStorage.setItem(
        "bytespace-cookie-preference",
        document.querySelector("#optional-cookies").checked
          ? "accepted"
          : "essential",
      );
      dialog.close();
      notify("Cookie preferences saved.");
    }
  });
  document.querySelector(".search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    query = new FormData(e.currentTarget).get("search").trim();
    selectedCategory = "Featured";
    updateCourses(true);
  });
  document.querySelector(".mobile-nav")?.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      document.querySelector(".mobile-nav").hidden = true;
      document
        .querySelector(".menu-button")
        .setAttribute("aria-label", "Open menu");
      document
        .querySelector(".menu-button")
        .setAttribute("aria-expanded", "false");
    }
  });
  document
    .querySelector(".newsletter-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      notify(
        "Thanks for your interest! Newsletter subscriptions are not connected in this demo.",
      );
    });
  document.querySelector(".auth-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".auth-feedback").textContent =
      `Your ${isSignup ? "signup" : "sign-in"} details are valid. This is a frontend demo; ${isSignup ? "no account has been created" : "authentication is not connected"}.`;
  });
  function showInfo(title) {
    const text = {
      "Privacy Policy":
        "This demonstration website does not send your form entries to a server. No account, password, or newsletter email is stored. Cookie preferences are saved only in your browser.",
      "Terms of Service":
        "ByteSpace is presented here as a frontend demonstration. Course previews and prices are sample content. Account creation, payments, and course delivery are not connected.",
      "Affiliate Program":
        "Interested in sharing ByteSpace? Affiliate applications are not available in this demo. You can explore our creator signup page to see the onboarding experience.",
      Contact:
        "Thanks for your interest in ByteSpace. A support service is not connected to this demonstration website.",
      Help: "Search for a course from the home page, filter by a topic, or choose a learning path. Select a course card to see its details. Use Join Us to explore the signup screen.",
    };
    if (title === "Cookies Settings") {
      openDialog(
        `<h2 id="dialog-title">Cookie settings</h2><p>Essential preferences keep this demo working. Optional analytics are disabled and no tracking services are installed.</p><label class="terms"><input type="checkbox" id="optional-cookies" ${localStorage.getItem("bytespace-cookie-preference") === "accepted" ? "checked" : ""}/> Allow optional cookies if available</label><button class="button" data-cookie-save>Save preferences</button>`,
      );
      return;
    }
    openDialog(`<h2 id="dialog-title">${title}</h2><p>${text[title]}</p>`);
  }
}
