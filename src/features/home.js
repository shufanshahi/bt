import { courses } from "../data/courses.js";
import { card } from "../components/course-card.js";
export function bindHome() {
  let category = "Featured";
  const update = (scroll) => {
    const matches = courses.filter(
      (course) => category === "Featured" || course.tags.includes(category),
    );
    document.querySelector(".course-grid").innerHTML = matches.length
      ? matches.map(card).join("")
      : '<div class="empty-state"><h3>No courses found</h3><p>Try another topic or explore all our featured courses.</p><button class="button" data-reset>View all courses</button></div>';
    document.querySelector(".results-summary").textContent =
      category === "Featured" ? "" : `${matches.length} courses in ${category}`;
    document.querySelectorAll("[data-filter]").forEach((button) => {
      const active = button.dataset.filter === category;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (scroll)
      document.querySelector("#courses").scrollIntoView({ behavior: "smooth" });
  };
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.filter || button.dataset.path) {
      category = button.dataset.filter || button.dataset.path;
      update(Boolean(button.dataset.path));
    }
    if (button.hasAttribute("data-reset")) {
      category = "Featured";
      update(false);
    }
    if (button.classList.contains("more-filters")) {
      const extra = document.querySelector(".extra-filters");
      extra.hidden = !extra.hidden;
      button.setAttribute("aria-expanded", String(!extra.hidden));
      button.textContent = extra.hidden ? "+ More" : "− Less";
    }
  });
  document.querySelector(".search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("search").trim();
    location.href = `/search${query ? "?q=" + encodeURIComponent(query) : ""}`;
  });
}
