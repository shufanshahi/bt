import { brand } from "./brand.js";
import { icon } from "./icons.js";

export function header(active = "") {
  const link = (name, href, key) =>
    `<a href="${href}" ${active === key ? 'class="active" aria-current="page"' : ""}>${name}</a>`;
  return `<header class="site-header container">
    ${brand(true)}
    <nav class="desktop-nav" aria-label="Main navigation">${link("Home", "/", "home")}${link("Courses", "/search", "courses")}${link("Creators", "/creators/purepearl-studio", "creators")}</nav>
    <div class="header-actions"><a href="/login">Sign In</a><a href="/signup">Join Us</a><button class="icon-button bag-button" aria-label="View saved courses">${icon("bag")}</button><button class="icon-button menu-button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">${icon("menu")}</button></div>
    <nav class="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" hidden>${link("Home", "/", "home")}${link("Courses", "/search", "courses")}${link("Creators", "/creators/purepearl-studio", "creators")}<a href="/login">Sign In</a><a href="/signup">Join Us</a></nav>
  </header>`;
}
