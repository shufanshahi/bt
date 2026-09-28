import { asset } from "../lib/assets.js";
export function reviewCard(review) {
  return `<article class="review-card"><div class="review-author"><img src="${asset(review.image)}" width="48" height="48" alt="${review.name}" loading="lazy"/><div><h3>${review.name}</h3><p>UI/UX Designer</p></div><span>a year ago</span></div><p class="review-stars" aria-label="${review.rating} out of 5 stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p><blockquote>“${review.text}”</blockquote></article>`;
}
