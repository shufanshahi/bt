# ByteSpace

Responsive implementation of the supplied ByteSpace landing-page design, with bonus login and signup screens. Built with semantic HTML, vanilla JavaScript, CSS, and Vite.

## Run locally

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Routes: `/`, `/login`, `/signup` (also `/register`).

```sh
npm run build       # production output in dist/
npm run preview     # serve the production build
npm test            # build and run browser tests
npm run format      # format source files
```

Browser tests use Google Chrome at `/usr/bin/google-chrome` if present. Set `CHROME_PATH` for another installation, or run `npx playwright install chromium` to install Playwright's browser.

## Included

- Complete landing page: hero, partner logos, six course cards, category filters, learning paths, learner and creator features, creator invitation, testimonials, and footer.
- Search across course titles, topics, and the displayed creator, including an empty state and reset.
- Course-preview dialogs, keyboard dismissal, mobile navigation, and category navigation.
- Login and signup forms with native validation and password visibility controls.
- Newsletter feedback, informational dialogs, and local cookie preferences.
- Responsive layouts, accessible form labels, keyboard focus indicators, reduced-motion support, and local fonts/assets.

## Design sources and boundaries

The connected Figma account could not access the linked design. The supplied `../website_demo/Home.png`, `Login.svg`, `Register.svg`, and related SVG exports served as the available references. Course images and avatars were extracted from the provided SVGs; decorative illustration regions were isolated from the supplied landing-page image. The page is real HTML/CSS with interactive controls, not a full-page screenshot. Source assets are in `public/assets/` and are included in the production build. Fonts are Plus Jakarta Sans, distributed under the SIL Open Font License; see `public/assets/OFL.txt`.

This is a frontend implementation. Authentication, OAuth, payments, course delivery, newsletter subscription, and affiliate applications need backend integration. Forms do not send or store passwords or email addresses and explicitly disclose demo behavior. Course descriptions are illustrative. Cookie preferences are stored locally; no analytics or tracking scripts are installed.

Production hosting should serve `index.html` for `/login`, `/signup`, and `/register` (SPA fallback).
