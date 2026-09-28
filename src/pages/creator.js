import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
import { asset } from "../lib/assets.js";
import { creator } from "../data/courses.js";
import { catalogToolbar } from "../components/catalog-toolbar.js";
export function creatorPage() {
  document.title = `${creator.name} — ByteSpace`;
  return `<main id="main"><section class="creator-profile-hero blue-grid">${header("creators")}<div class="container creator-profile-intro"><div class="creator-identity"><img src="${asset(creator.avatar)}" alt="PurePearl Studio" width="96" height="96"/><div><div class="creator-name"><h1>${creator.name}</h1><span class="button creator-badge">Creator</span></div><p>${creator.role}</p></div></div><p class="creator-bio">${creator.bio}<br/>${creator.portfolio}</p><div class="creator-profile-actions"><div class="creator-counts"><span><strong>6</strong> Products</span><span><strong data-follower-count>12</strong> Followers</span></div><button class="button" data-follow aria-pressed="false">Follow</button></div></div></section><section class="container catalog-page creator-catalog" aria-label="Courses by PurePearl Studio">${catalogToolbar()}<p class="catalog-status" role="status" aria-live="polite"></p><div class="course-grid catalog-grid"></div><nav class="pagination" aria-label="Creator course pages"></nav></section></main>${footer()}`;
}
