import { courseLayout } from "../components/course-layout.js";
import { icon } from "../components/icons.js";
import { modules } from "../data/curriculum.js";
export function courseLessons(course) {
  return courseLayout(
    course,
    "lessons",
    `<div class="course-lessons-content"><h2>Explore the Modules</h2><p>Immerse yourself in the course content as we break down each module into comprehensive lessons, providing practical insights and hands-on experiences.</p><h2>Lesson List</h2><div class="lesson-list">${modules.map((lesson, index) => `<article class="lesson-row" id="lesson-${lesson.id}"><button class="lesson-icon" data-lesson="${lesson.id}" aria-label="Open lesson ${index + 1}: ${lesson.title}">${icon("video")}</button><div><button class="lesson-title" data-lesson="${lesson.id}">Module ${index + 1}: ${lesson.title}</button><p>${lesson.description}</p><span class="lesson-completion" data-lesson-status="${lesson.id}"></span></div></article>`).join("")}</div><h2>Lesson Content</h2><p>Engage with each lesson through captivating video content, detailed textual explanations, and interactive elements. Download resources, complete assignments, and test your understanding with quizzes.</p><h2>Lesson Progress Tracking</h2><p>Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through your learning journey.</p><div class="learning-progress"><span>Learning Progress</span><strong data-progress-number>55%</strong><progress aria-label="Learning progress" value="55" max="100"></progress></div><div class="progress-detail"><p data-progress-caption></p><button class="text-button" data-reset-progress>Reset demo progress</button></div><p class="demo-note">Sample progress and lesson notes are saved on this device. Video lessons and downloads require the full course service.</p></div>`,
  );
}
