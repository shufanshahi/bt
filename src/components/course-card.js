import { asset } from "../lib/assets.js";
import { icon } from "./icons.js";
const avatars = () =>
  `<span class="avatar-stack">${["avatar-1", "avatar-2", "avatar-sarah", "avatar-alex"].map((n) => `<img src="${asset(n + ".webp")}" width="32" height="32" alt="" loading="lazy"/>`).join("")}<span>26+</span></span>`;
export const card = (course) =>
  `<article class="course-card"><a class="course-open" href="/courses/${course.id}" aria-label="View ${course.title}"><div class="course-photo"><img src="${asset(course.image)}" width="341" height="195" alt="${course.title}" loading="lazy"/><div class="course-meta"><span>17 Lessons</span><span>2 hours 16 mins</span><span>59 Comments</span></div></div><div class="course-title"><h3>${course.title}</h3><span class="rating">${course.rating ?? 4.5} <span aria-label="stars">★</span></span></div></a><p class="byline">by <a href="/creators/purepearl-studio">purepearl studio</a></p><div class="course-students"><span class="level">${icon("bars")} ${course.level ?? "Beginner"}</span>${avatars()}</div><p class="price">$${course.price ?? 25}<span>/lifetime</span></p></article>`;
