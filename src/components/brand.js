import { asset } from "../lib/assets.js";
export const brand = (light = false, markOnly = false) =>
  `<a class="brand ${light ? "brand-light" : ""}" href="/" aria-label="ByteSpace home"><img src="${asset("brand-mark.svg")}" width="32" height="33" alt=""/>${markOnly ? "" : "<span>ByteSpace</span>"}</a>`;
