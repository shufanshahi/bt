import { openDialog, notify } from "../components/dialog.js";
import { courseTitle } from "../components/course-layout.js";
import { asset } from "../lib/assets.js";
import { escapeHtml } from "../lib/html.js";
import { readStorage, writeStorage } from "../lib/storage.js";
export function bindCourse(course) {
  const stored = readStorage("saved-courses", []);
  let saved = Array.isArray(stored)
    ? stored.filter((id) => typeof id === "string")
    : [];
  const saveButton = document.querySelector("[data-save-course]");
  const updateSaved = () => {
    const active = saved.includes(course.id);
    saveButton.textContent = active ? "Saved to your courses" : "Save course";
    saveButton.setAttribute("aria-pressed", String(active));
  };
  updateSaved();
  saveButton.addEventListener("click", () => {
    saved = saved.includes(course.id)
      ? saved.filter((id) => id !== course.id)
      : [...saved, course.id];
    const persisted = writeStorage("saved-courses", saved);
    updateSaved();
    notify(
      persisted
        ? "Saved courses updated on this device."
        : "Saved courses updated for this visit; browser storage is unavailable.",
    );
  });
  document
    .querySelector("[data-preview]")
    .addEventListener("click", () =>
      openDialog(
        `<img class="detail-image" src="${asset("course-instructor.webp")}" alt="Course instructor"/><h2 id="dialog-title">${escapeHtml(courseTitle(course))}</h2><p>The supplied design includes this preview image, but no video file. Explore the sample lesson notes and exercises to try the learning experience.</p><a class="button" href="/courses/${course.id}/lessons">Explore lessons</a>`,
      ),
    );
  document
    .querySelector("[data-enroll]")
    .addEventListener("click", () =>
      openDialog(
        `<h2 id="dialog-title">Start your learning journey</h2><p>You’re exploring ${escapeHtml(course.title)}. Enrollment and payments are not connected in this frontend demo, so no payment will be taken.</p><div class="dialog-actions"><a class="button" href="/signup?course=${course.id}">Create an account</a><a class="outline-control" href="/courses/${course.id}/lessons">Try sample lessons</a></div>`,
      ),
    );
  document.querySelector("[data-share]").addEventListener("click", async () => {
    const url = `${location.origin}/courses/${course.id}`;
    try {
      await navigator.clipboard.writeText(url);
      notify("Course link copied to clipboard.");
    } catch {
      openDialog(
        `<h2 id="dialog-title">Share this course</h2><label class="share-link">Course link<input readonly value="${escapeHtml(url)}"/></label><p>Select and copy the link to share it.</p>`,
      );
      document.querySelector(".share-link input").select();
    }
  });
  document
    .querySelectorAll("[data-gallery]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        openDialog(
          `<h2 id="dialog-title">Project preview</h2><img class="gallery-preview" src="${asset("preview-" + button.dataset.gallery + ".webp")}" alt="Course project preview"/>`,
        ),
      ),
    );
}
