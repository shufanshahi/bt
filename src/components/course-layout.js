import { header } from "./header.js";
import { footer } from "./footer.js";
import { icon } from "./icons.js";
import { asset } from "../lib/assets.js";
import { escapeHtml } from "../lib/html.js";
export function courseTitle(course) {
  return course.id === "digital"
    ? "Build Digital Asset: A Comprehensive Guide"
    : course.title;
}
export function courseLayout(course, active, content) {
  const title = courseTitle(course),
    base = `/courses/${course.id}`;
  document.title = `${title}${active === "about" ? "" : " — " + active[0].toUpperCase() + active.slice(1)} — ByteSpace`;
  return `<main id="main"><section class="course-hero blue-grid">${header("courses")}<div class="container course-lead"><div class="course-heading"><div><h1>${escapeHtml(title)}</h1><p class="course-subtitle">${course.baseId === "digital" ? "Unlock the Power of Digital Creation with Expert Guidance" : "Discover new possibilities with practical, creative learning"}</p></div><button class="button share-button" data-share>${icon("share")} Share</button></div><p class="course-author">by <a href="/creators/purepearl-studio">purepearl studio</a></p><div class="course-badges"><span>${icon("bars")} ${course.id === "digital" ? "Intermediate" : course.level}</span><a href="${base}/reviews">★ <span>4.8 (172 reviews)</span></a><span>${icon("users")} 199 Students</span></div><div class="course-hero-row"><button class="course-cover" data-preview aria-label="Play course preview"><img src="${asset("course-instructor.webp")}" width="1440" height="960" alt="Course instructor introducing digital asset creation"/><span class="play-button">${icon("play")}</span></button>${courseSidebar(course)}</div></div></section><section class="container course-body"><div class="course-main"><nav class="course-tabs" aria-label="Course sections">${[
    ["about", "About", base],
    ["lessons", "Lessons", base + "/lessons"],
    ["reviews", "Reviews", base + "/reviews"],
  ]
    .map(
      ([key, label, href]) =>
        `<a href="${href}" ${active === key ? 'aria-current="page" class="is-active"' : ""}>${label}</a>`,
    )
    .join("")}</nav>${content}</div></section></main>${footer()}`;
}
function courseSidebar(course) {
  const digital = course.baseId === "digital";
  return `<aside class="course-sidebar" aria-label="Course enrollment"><h2>${digital ? "112 Lessons (24 hours)" : "17 Lessons (2 hours 16 mins)"}</h2><ol class="sidebar-lessons">${[
    ["Introduction to Digital Assets", "12"],
    ["Design Principles for Impact", "21"],
    ["Advanced Techniques in Digital Creation", "16"],
  ]
    .map(
      ([name, duration], i) =>
        `<li><a href="/courses/${course.id}/lessons#lesson-${["introduction", "principles", "user-centered"][i]}"><span>${String(i + 1).padStart(2, "0")}</span><span>${name}</span><small>${duration} mins</small></a></li>`,
    )
    .join(
      "",
    )}</ol><a class="more-lessons" href="/courses/${course.id}/lessons">${digital ? "99" : "14"} more videos</a><p>Ready to Dive In? Enroll Now and Start Building Your Digital Future!</p><div class="price">$${course.price}<span>/lifetime</span></div><button class="button enroll-button" data-enroll>Enroll Now</button><button class="save-course text-button" data-save-course aria-pressed="false">Save course</button><h2>This course include</h2><ul class="course-includes">${[
    ["folder", "Learning Resources"],
    ["video", "Quality Lesson Videos"],
    ["certificate", "Certificate of Completion"],
    ["marketing", "Private Consultation"],
  ]
    .map(([i, label]) => `<li>${icon(i)} ${label}</li>`)
    .join(
      "",
    )}</ul><div class="sidebar-creator"><img src="${asset("instructor-avatar.webp")}" width="52" height="52" alt="PurePearl Studio instructor"/><div><strong>PurePearl Studio</strong><span>Professional Creator</span></div></div><p>Ready to Dive In? Enroll Now and Start Building Your Digital Future!</p><a class="outline-control profile-link" href="/creators/purepearl-studio">See Full Profile</a></aside>`;
}
