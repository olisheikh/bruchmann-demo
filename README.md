# Klaus Bruchmann GmbH — Corporate Website

> **Strom sicher schalten** — Modern website relaunch for Klaus Bruchmann GmbH, electrical components manufacturer since 1985.

---

## Kurzbeschreibung / Short Project Description

This is the official corporate website for **Klaus Bruchmann GmbH**, a German manufacturer of electrical protection and switching components headquartered in Scheßlitz, Bavaria. The product range covers fuse-combination units (TYTAN®, GORON®, IN-ON), busbar systems, main protection devices, relays, and meter terminal blocks.

The site is a fully responsive, bilingual **(German / English)** single-page application. It encompasses the complete digital presence of the company: an interactive 3D product hero, a full product catalogue with individual product pages, a company history page with an animated timeline, a career portal with an integrated application form, a contact page with an embedded location map, and a dark/light theme toggle — all without a UI framework, using plain CSS custom properties throughout.

---

## Setup-Anleitung / Setup Instructions

### Prerequisites

- **Node.js** ≥ 18 (e.g. via [nvm](https://github.com/nvm-sh/nvm) or [nodejs.org](https://nodejs.org))
- **npm** ≥ 9

### Install & Run


# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app runs at **http://localhost:5173**.

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

### Tech Stack

| Package | Version | Role |
|---|---|---|
| `react` | ^19 | UI component framework |
| `react-router-dom` | ^7 | Client-side routing |
| `@react-three/fiber` | ^9 | React renderer for Three.js |
| `@react-three/drei` | ^10 | Three.js helper hooks/components |
| `three` | ^0.184 | WebGL / 3D rendering engine |
| `vite` | ^8 | Build tool & dev server |

### Page Routes

| Route | Page |
|---|---|
| `/` | Home — 3D hero, product overview, location map |
| `/ueber-uns` | About Us — mission, stats, accordion timeline |
| `/sicherungsschaltgeraete` | Product: Fuse-Combination Units |
| `/hauptschutz` | Product: Main Protection Devices |
| `/sammelschienensystem` | Product: Busbar System |
| `/relais` | Product: Relays |
| `/zaehlersteckklemmen` | Product: Meter Terminal Blocks |
| `/karriere` | Careers — job listings + application modal |
| `/kontakt` | Contact — info card + pre-filled contact form |
| `/bewerbung/:id` | Direct application form for a specific position |

---

## Design Explanation

### Visual Identity
The design is anchored by Bruchmann's brand colours: **deep navy `#00274E`** as the primary surface and **signal green `#13A538`** as the accent. Navy communicates reliability, precision, and industrial authority — the core values of an electrical protection brand. Green signals energy, safety, and the company's environmental awareness. All colour tokens are defined as CSS custom properties (`--navy`, `--green`, `--surface`, `--text`, etc.) so both light and dark themes remap cleanly without duplicating any rules.

### Typography
- **Syne** (display) — geometric, uppercase, wide letter-spacing; used for section labels, headings, and navigation. Gives a technical/engineering character.
- **DM Sans** (body) — humanist sans-serif; comfortable for longer product descriptions and form labels.

### Light / Dark Mode
A `ThemeContext` toggles `data-theme="light"` on `<html>`. Every colour, shadow, and surface in the CSS references a custom property, so the full theme switch is a single attribute change — no JS style injection and no separate stylesheet.

### Bilingual i18n
A `LanguageContext` loads either `src/translations/de.js` or `src/translations/en.js` and exposes a `t()` accessor. Every visible string passes through `t()`. Language switching is instant (no reload) and adding a third language requires only a new translation file.

### 3D & Motion
- **Hero canvas** — a React Three Fiber scene with a Three.js model of a fuse-combination unit; responds to mouse movement.
- **Mouse-tilt cards** — product and info cards use a `perspective()` + `rotateX/Y` transform driven by a vanilla JS `MutationObserver` listener in `main.jsx`; disabled on touch devices via `window.matchMedia('(hover: none)')`.
- **Scroll reveals** — `IntersectionObserver` in `useScrollReveal.js` adds `.visible` to elements tagged `reveal`, `reveal-blur`, `reveal-left`, `reveal-right` for staggered entrance animations with no library dependency.
- **Counter animation** — stat numbers count up from zero using `performance.now()` with cubic ease-out easing.
- **Scroll progress bar** — a fixed 3 px green gradient bar at the top of the viewport tracks reading progress.
- **Electric border** — a `@property --angle` CSS animation spins a conic gradient around the "Contact Us" CTA button on desktop.

### Responsive Strategy
Five breakpoints per page: **1200 → 1024 → 900 → 640 → 480 / 400 px**. Layouts shift from multi-column CSS Grid to single-column stacks. The mobile navigation is a **right-side drawer** (75 % viewport width, max 320 px) with a dimmed `backdrop` overlay that closes the menu on tap — replacing the earlier full-screen overlay that broke on iOS Safari due to `backdrop-filter` creating a new fixed-element containing block.

---

## Vorgehensweise / Approach

The project started by building a solid design-system foundation — all CSS custom properties, base typography, utility classes, and animation keyframes were defined globally in `index.css` before any page component was written, ensuring consistency and preventing specificity conflicts throughout. Pages were then built one by one in order of business priority (Home → About → Products → Careers → Contact → Application), each with a co-located CSS file so styles remained scoped and readable. Once the core pages were functional, a second pass layered in the interactive dimension: the Three.js hero scene, the mouse-tilt effect via a `MutationObserver`-backed vanilla JS listener, scroll-reveal entrance animations through `IntersectionObserver`, and animated stat counters. Bilingual support was added through a context-based translation system, enabling zero-reload language switching across every string on every page. The final phase was a thorough responsive pass at all five breakpoints for every page, culminating in a complete refactor of the mobile navigation from a full-screen overlay to a polished right-side drawer with a tap-outside-to-close backdrop.

---

## Persönliche Reflexion / Personal Reflection

Working on this project reinforced how much a well-structured CSS custom-property system pays dividends throughout development — the light/dark theme, the green accent swaps on product pages, and the consistent spacing all stem from tokens defined once at the root, and every later change propagated automatically. The most instructive challenge was the iOS Safari mobile menu bug: the parent `<header>` had `backdrop-filter` applied, which per the CSS specification creates a new containing block for `position: fixed` descendants, causing the full-screen menu overlay to anchor to the navbar's height rather than the viewport — a stacking-context edge case that took real debugging to isolate and fix. Integrating React Three Fiber alongside a standard React component tree required careful attention to cleanup in `useEffect` to avoid WebGL memory leaks, which deepened my practical understanding of how React's render lifecycle interacts with imperative WebGL state. If I were to extend the project I would replace the mock form submissions with a serverless backend (e.g. a Vercel Edge Function forwarding to an SMTP relay), add Playwright end-to-end tests for the bilingual contact and application flows, and introduce route-based code splitting to reduce the initial bundle size given the Three.js payload.


# Netlify link
# https://bruchmann-demo.netlify.app/