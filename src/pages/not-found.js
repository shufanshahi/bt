import { header } from "../components/header.js";
import { footer } from "../components/footer.js";
export function notFound() {
  document.title = "Page Not Found — ByteSpace";
  return `<main id="main"><section class="not-found blue-grid">${header()}<div class="container not-found-content"><div class="error-number" aria-hidden="true">404</div><h1>The page you are looking<br/>for doesn’t exist</h1><p>Try to use a correct URL or go back to homepage to start again</p><a class="button" href="/">Back to Home</a></div></section></main>${footer()}`;
}
