import { courseLayout } from "../components/course-layout.js";
import { reviewCard } from "../components/review-card.js";
import { reviews } from "../data/curriculum.js";
export function courseReviews(course) {
  return courseLayout(
    course,
    "reviews",
    `<div class="course-reviews-content"><h2>What Learners Are Saying</h2><p>Discover what our learners have to say about their experience with “Build Digital Assets: A Comprehensive Guide.” Read reviews and ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.</p><div class="rating-overview" aria-label="Sample rating summary: 4.7 out of 5"><div class="rating-score"><span>Ratings</span><strong>4.7</strong></div><div class="rating-bars">${[
      [5, 720],
      [4, 120],
      [3, 21],
      [2, 12],
      [1, 16],
    ]
      .map(
        ([stars, count]) =>
          `<div class="rating-bar-row"><meter min="0" max="889" value="${count}" aria-label="${stars} stars: ${count} ratings"></meter><span class="bar-stars" aria-hidden="true">★★★★★</span><span>${count}</span></div>`,
      )
      .join(
        "",
      )}</div></div><h2>Individual Reviews:</h2><div class="review-filters" aria-label="Filter reviews by rating"><button class="filter is-active" data-review-rating="all" aria-pressed="true">All rating</button>${[5, 4, 3, 2, 1].map((n) => `<button class="filter" data-review-rating="${n}" aria-label="${n} star reviews" aria-pressed="false"><span aria-hidden="true">★</span> ${n}</button>`).join("")}</div><p class="review-results-status sr-only" role="status" aria-live="polite"></p><div class="review-list">${reviews.map(reviewCard).join("")}</div></div>`,
  );
}
