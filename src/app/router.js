import { courseDetails } from "../pages/course-details.js";
import { findCourse } from "../data/courses.js";
import { landing } from "../pages/home.js";
import { auth } from "../pages/auth.js";
import { searchPage } from "../pages/search.js";
import { creatorPage } from "../pages/creator.js";
import { notFound } from "../pages/not-found.js";

/** Native links keep browser history and direct/deep links predictable. */
export function renderRoute() {
  const path = location.pathname.replace(/\/+$/, "") || "/";
  let route = { page: "not-found" },
    html;
  if (path === "/") {
    route = { page: "home" };
    html = landing();
  } else if (["/login", "/signup", "/register"].includes(path)) {
    route = { page: "auth", isSignup: path !== "/login" };
    html = auth(route.isSignup);
  } else if (["/search", "/courses"].includes(path)) {
    route = { page: "search" };
    html = searchPage();
  } else if (["/creators", "/creators/purepearl-studio"].includes(path)) {
    route = { page: "creator" };
    html = creatorPage();
  } else if (/^\/courses\/[^/]+$/.test(path)) {
    const course = findCourse(path.split("/")[2]);
    if (course) {
      route = { page: "course", course, tab: "about" };
      html = courseDetails(course);
    } else html = notFound();
  } else html = notFound();
  document.querySelector("#app").innerHTML = html;
  return route;
}
