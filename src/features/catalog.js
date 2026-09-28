import { catalogCourses, courses, creator } from "../data/courses.js";
import { card } from "../components/course-card.js";
import { asset } from "../lib/assets.js";
import { escapeHtml } from "../lib/html.js";
import { readStorage, writeStorage } from "../lib/storage.js";
import { notify } from "../components/dialog.js";
const PAGE_SIZE = 18;
export function bindCatalog({ creatorOnly = false } = {}) {
  const params = new URLSearchParams(location.search);
  const state = {
    q: params.get("q") || "",
    category: params.get("category") || "",
    level: params.get("level") || "",
    sort: params.get("sort") || "relevance",
    price: params.get("price") || "",
    rating: params.get("rating") || "",
    type: creatorOnly ? "courses" : params.get("type") || "courses",
    page: Math.max(1, Number(params.get("page")) || 1),
  };
  const grid = document.querySelector(".catalog-grid"),
    status = document.querySelector(".catalog-status");
  const form = document.querySelector(".catalog-search");
  if (form) {
    form.elements.q.value = state.q;
    form.elements.type.value =
      state.type === "creators" ? "creators" : "courses";
  }
  function syncUrl() {
    const p = new URLSearchParams();
    Object.entries(state).forEach(([key, value]) => {
      if (
        value &&
        !(key === "sort" && value === "relevance") &&
        !(key === "type" && value === "courses") &&
        !(key === "page" && value === 1)
      )
        p.set(key, String(value));
    });
    history.replaceState(null, "", location.pathname + (p.size ? "?" + p : ""));
    return p;
  }
  function render() {
    ["level", "category", "sort", "price", "rating"].forEach((name) => {
      const select = document.querySelector(`select[name="${name}"]`);
      select.value = state[name];
    });
    document.querySelectorAll("[data-catalog-category]").forEach((button) => {
      const active =
        button.dataset.catalogCategory === (state.category || "Featured");
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (state.type === "creators" && !creatorOnly) {
      const match = `${creator.name} ${creator.role}`
        .toLowerCase()
        .includes(state.q.toLowerCase());
      grid.innerHTML = match
        ? `<a class="creator-result" href="/creators/${creator.id}"><img src="${asset(creator.avatar)}" width="96" height="96" alt="${creator.name}"/><h2>${creator.name}</h2><p>${creator.role}</p><span>View creator profile →</span></a>`
        : emptyState();
      status.textContent = match ? "1 creator found" : "No creators found";
      document.querySelector(".pagination").innerHTML = "";
      syncUrl();
      return;
    }
    let matches = (
      creatorOnly ? catalogCourses.slice(0, courses.length) : catalogCourses
    ).filter(
      (course) =>
        (!state.q ||
          `${course.title} ${course.tags.join(" ")} ${creator.name}`
            .toLowerCase()
            .includes(state.q.toLowerCase())) &&
        (!state.category || course.tags.includes(state.category)) &&
        (!state.level || course.level === state.level) &&
        (!Number(state.price) || course.price <= Number(state.price)) &&
        (!Number(state.rating) || course.rating >= Number(state.rating)),
    );
    if (state.sort === "rating") matches.sort((a, b) => b.rating - a.rating);
    if (state.sort === "price-asc") matches.sort((a, b) => a.price - b.price);
    if (state.sort === "price-desc") matches.sort((a, b) => b.price - a.price);
    if (state.sort === "title")
      matches.sort((a, b) => a.title.localeCompare(b.title));
    const pageCount = Math.ceil(matches.length / PAGE_SIZE);
    state.page = Math.max(1, Math.min(Math.floor(state.page), pageCount || 1));
    const start = (state.page - 1) * PAGE_SIZE,
      visible = matches.slice(start, start + PAGE_SIZE);
    grid.innerHTML = visible.length ? visible.map(card).join("") : emptyState();
    status.textContent = matches.length
      ? `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, matches.length)} of ${matches.length} courses${state.q ? ` for “${state.q}”` : ""}`
      : "No courses match your filters.";
    const p = syncUrl();
    const link = (page, label, content) => {
      const next = new URLSearchParams(p);
      next.set("page", page);
      return `<a href="${location.pathname}?${escapeHtml(next.toString())}" aria-label="${label}" ${page === state.page ? 'aria-current="page"' : ""}>${content}</a>`;
    };
    document.querySelector(".pagination").innerHTML =
      pageCount > 1
        ? `${state.page > 1 ? link(state.page - 1, "Previous page", "‹") : '<span aria-hidden="true">‹</span>'}${Array.from({ length: pageCount }, (_, i) => link(i + 1, `Page ${i + 1}`, i + 1)).join("")}${state.page < pageCount ? link(state.page + 1, "Next page", "›") : '<span aria-hidden="true">›</span>'}`
        : "";
  }
  function reset() {
    Object.assign(state, {
      q: "",
      category: "",
      level: "",
      sort: "relevance",
      price: "",
      rating: "",
      type: "courses",
      page: 1,
    });
    if (form) {
      form.elements.q.value = "";
      form.elements.type.value = "courses";
    }
    render();
  }
  document.querySelector(".catalog-page").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.hasAttribute("data-filter-panel")) {
      const panel = document.querySelector(".catalog-filter-panel");
      panel.hidden = !panel.hidden;
      button.setAttribute("aria-expanded", String(!panel.hidden));
    }
    if (button.dataset.catalogCategory) {
      state.category =
        button.dataset.catalogCategory === "Featured"
          ? ""
          : button.dataset.catalogCategory;
      state.page = 1;
      render();
    }
    if (button.hasAttribute("data-catalog-reset")) reset();
  });
  document.querySelectorAll(".catalog-page select").forEach((select) =>
    select.addEventListener("change", () => {
      state[select.name] = select.value;
      state.page = 1;
      render();
    }),
  );
  document
    .querySelector(".catalog-filter-panel")
    .addEventListener("submit", (event) => event.preventDefault());
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      state.q = form.elements.q.value.trim();
      state.type = form.elements.type.value;
      state.page = 1;
      render();
    });
    form.elements.type.addEventListener("change", () => {
      state.type = form.elements.type.value;
      state.page = 1;
      render();
    });
    form.elements.q.addEventListener("input", () => {
      state.q = form.elements.q.value.trim();
      state.page = 1;
      render();
    });
  }
  if (creatorOnly) {
    let following = readStorage("follow-purepearl", false) === true;
    const button = document.querySelector("[data-follow]");
    const update = () => {
      button.textContent = following ? "Following" : "Follow";
      button.setAttribute("aria-pressed", String(following));
      document.querySelector("[data-follower-count]").textContent =
        creator.followers + Number(following);
    };
    button.addEventListener("click", () => {
      following = !following;
      writeStorage("follow-purepearl", following);
      update();
      notify(
        following
          ? "You are now following PurePearl Studio on this device."
          : "You unfollowed PurePearl Studio.",
      );
    });
    update();
  }
  render();
}
function emptyState() {
  return '<div class="empty-state"><h2>No results found</h2><p>Try a different search or clear your filters.</p><button class="button" data-catalog-reset>Clear search and filters</button></div>';
}
