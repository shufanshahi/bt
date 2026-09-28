/** Stable asset names keep page data independent of public-folder layout. */
export function asset(name) {
  const folder =
    name === "brand-mark.svg"
      ? "icons"
      : /^(hero-|creator-art|creator-left|creator-right|growth-art|auth-art|partners)/.test(
            name,
          )
        ? "illustrations"
        : "images";
  return `/assets/${folder}/${name}`;
}
