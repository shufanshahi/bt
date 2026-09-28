import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
import { icon } from "../components/icons.js";
import {
  catalogToolbar,
  categoryChips,
} from "../components/catalog-toolbar.js";
export function searchPage() {
  document.title = "Find Your Next Course — ByteSpace";
  return `<main id="main"><section class="search-hero blue-grid">${header("courses")}<div class="container"><h1>Find Your Next Course</h1><form class="search-form catalog-search" role="search"><label class="search-input">${icon("search")}<input type="search" name="q" aria-label="Search courses, topics, or creators" placeholder="Search"/></label><label class="button search-type"><span class="sr-only">Search type</span><select name="type" aria-label="Search type"><option value="courses">Courses</option><option value="creators">Creators</option></select></label><button class="sr-only search-submit" type="submit">Search</button></form></div></section><section class="container catalog-page" aria-label="Search results">${catalogToolbar()}${categoryChips()}<p class="catalog-status" role="status" aria-live="polite"></p><div class="course-grid catalog-grid"></div><nav class="pagination" aria-label="Search result pages"></nav></section></main>${footer()}`;
}
