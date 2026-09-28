import { reviews } from "../data/curriculum.js";
import { reviewCard } from "../components/review-card.js";
export function bindReviews() {
  const params = new URLSearchParams(location.search);
  let rating = params.get("rating") || "all";
  if (!["all", "1", "2", "3", "4", "5"].includes(rating)) rating = "all";
  function render() {
    const filtered = reviews.filter(
      (review) => rating === "all" || review.rating === Number(rating),
    );
    document.querySelector(".review-list").innerHTML = filtered.length
      ? filtered.map(reviewCard).join("")
      : '<div class="empty-state"><h3>No reviews with this rating</h3><p>Try another rating to see what learners are saying.</p><button class="button" data-review-rating="all">Show all reviews</button></div>';
    document.querySelector(".review-results-status").textContent =
      `${filtered.length} sample reviews${rating === "all" ? "" : ` with ${rating} stars`}`;
    document
      .querySelectorAll(".review-filters [data-review-rating]")
      .forEach((button) => {
        const active = button.dataset.reviewRating === rating;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    const p = new URLSearchParams(location.search);
    if (rating === "all") p.delete("rating");
    else p.set("rating", rating);
    history.replaceState(null, "", location.pathname + (p.size ? "?" + p : ""));
  }
  document
    .querySelector(".course-reviews-content")
    .addEventListener("click", (event) => {
      const button = event.target.closest("[data-review-rating]");
      if (button) {
        rating = button.dataset.reviewRating;
        render();
      }
    });
  render();
}
