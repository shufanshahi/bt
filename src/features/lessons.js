import { modules } from "../data/curriculum.js";
import { openDialog, closeDialog, notify } from "../components/dialog.js";
import { readStorage, writeStorage } from "../lib/storage.js";
export function bindLessons(course) {
  const total = course.baseId === "digital" ? 112 : 17;
  const seed = course.baseId === "digital" ? 62 : 9;
  const key = `progress-${course.id}`;
  const saved = readStorage(key, null);
  let baseline =
    saved && Number.isInteger(saved.baseline)
      ? Math.max(0, Math.min(saved.baseline, total - modules.length))
      : seed;
  let completed = new Set(
    Array.isArray(saved?.completed)
      ? saved.completed.filter((id) => modules.some((m) => m.id === id))
      : [],
  );
  function update() {
    const count = baseline + completed.size,
      percent = Math.round((count / total) * 100);
    document.querySelector("[data-progress-number]").textContent =
      percent + "%";
    document.querySelector("progress").value = percent;
    document.querySelector("[data-progress-caption]").textContent =
      `${count} of ${total} lessons complete · ${completed.size} of ${modules.length} sample modules completed`;
    document.querySelectorAll("[data-lesson-status]").forEach((element) => {
      const done = completed.has(element.dataset.lessonStatus);
      element.textContent = done ? "✓ Completed" : "";
      element.closest(".lesson-row").classList.toggle("is-complete", done);
    });
  }
  function save() {
    return writeStorage(key, { baseline, completed: [...completed] });
  }
  document.querySelector(".lesson-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-lesson]");
    if (!button) return;
    const lesson = modules.find((item) => item.id === button.dataset.lesson);
    openDialog(
      `<p class="eyebrow">Sample lesson · ${lesson.duration} minutes</p><h2 id="dialog-title">${lesson.title}</h2><div class="lesson-notes"><p>${lesson.note}</p><h3>Try it yourself</h3><p>${lesson.exercise}</p><p class="demo-note">This is a text preview. No video file was supplied with the design.</p></div><button class="button" data-complete-lesson="${lesson.id}" ${completed.has(lesson.id) ? "disabled" : ""}>${completed.has(lesson.id) ? "Already completed" : "Mark lesson complete"}</button>`,
    );
  });
  document
    .querySelector("#detail-dialog")
    .addEventListener("click", (event) => {
      const button = event.target.closest("[data-complete-lesson]");
      if (!button) return;
      if (modules.some((lesson) => lesson.id === button.dataset.completeLesson))
        completed.add(button.dataset.completeLesson);
      const persisted = save();
      update();
      closeDialog();
      notify(
        persisted
          ? "Lesson completed. Progress saved on this device."
          : "Lesson completed. Browser storage is unavailable, so progress applies to this visit.",
      );
    });
  document
    .querySelector("[data-reset-progress]")
    .addEventListener("click", () => {
      baseline = 0;
      completed = new Set();
      save();
      update();
      notify("Demo progress reset. You can start again from the first lesson.");
    });
  update();
}
