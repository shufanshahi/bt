import { bindLessons } from "./features/lessons.js";
import { bindCourse } from "./features/course.js";
import "./styles/index.css";
import { renderRoute } from "./app/router.js";
import { bindSite } from "./features/site.js";
import { bindHome } from "./features/home.js";
import { bindAuth } from "./features/auth.js";
import { bindCatalog } from "./features/catalog.js";

const route = renderRoute();
bindSite();
if (route.page === "home") bindHome();
if (route.page === "auth") bindAuth(route.isSignup);
if (route.page === "search") bindCatalog();
if (route.page === "creator") bindCatalog({ creatorOnly: true });

if (route.page === "course") bindCourse(route.course);

if (route.tab === "lessons") bindLessons(route.course);
