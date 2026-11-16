# Responsive Test Report — High School Math

**Project:** High School Math (Cambodian National Curriculum)  
**Test Suite:** Multi-viewport Layout & Interactive Verification  
**Test Date:** November 14, 2026  
**Auditor:** Frontend Architect & Responsive Optimization Specialist  

---

## 1. Viewport Matrix Tested

The application was systematically tested across 11 key viewport widths representing all modern device classes:

| Viewport Width | Device Target Class | Layout Classification | Pass / Fail | Primary Notes |
|---|---|---|---|---|
| **320px** | iPhone SE (1st gen), small Androids | Ultra-compact Mobile | **PASS** | No horizontal overflow; stat grid wraps to 2 columns; cards fit cleanly |
| **333px** | Compact Android devices | Compact Mobile | **PASS** | Single column cards, clean badge wrapping |
| **360px** | Galaxy S8/S9, standard budget Androids | Standard Mobile | **PASS** | Optimal touch targets (52px), crisp typography |
| **375px** | iPhone X / 11 / 12 / 13 mini | Mainstream Mobile | **PASS** | Hero headline breaks cleanly; search input fully visible |
| **390px** | iPhone 12 / 13 / 14 / 15 | Modern Standard Mobile | **PASS** | Excellent readability; 2-column stats layout |
| **414px** | iPhone XR / 11 Plus / Max | Large Mobile | **PASS** | Balanced spacing; chip suggestions fit without multi-line clutter |
| **768px** | iPad Mini / Air (Portrait), Android tablets | Tablet Portrait | **PASS** | 2-column grade cards; sticky header active; TOC chips wrap cleanly |
| **1024px** | iPad Pro, small laptops | Small Laptop / Tablet Landscape | **PASS** | 2-column grade grid, full navigation visible, TOC sidebar enabled |
| **1280px** | Standard MacBook Air / Desktop | Desktop Baseline | **PASS** | 3-column grade cards; 5-item stats row; optimal reading column (50rem) |
| **1440px** | Large Desktop / iMac | Widescreen Desktop | **PASS** | Centered content container (max 1280px); generous margins; no stretching |
| **1920px** | Full HD External Monitor | Ultrawide / Large Display | **PASS** | Controlled content width; crisp SVG rendering; elegant whitespace |

---

## 2. Critical Responsive Elements Verified

### 2.1 Hero Section
- **Heading Line Breaks:** Evaluated `clamp(2.3rem, 9vw, 3.4rem)` on mobile and `clamp(3.2rem, 6.5vw, 5.5rem)` on desktop. Text breaks intentionally into two balanced lines:
  - *Line 1:* `Explore Mathematics.`
  - *Line 2:* `Understand Every Formula.`
- **Floating Mathematical Glyphs:**
  - On screens `>= 769px`: Restricted to outer margins (`left: 3-4%`, `right: 3-4%`).
  - On screens `<= 768px`: Explicitly hidden (`display: none;`) to prevent any possible collision with text or interactive controls.
- **Hero Statistics Grid:**
  - Desktop (>680px): 5 columns (`Grades`, `Topics`, `Formulas`, `Practice questions`, `Shapes`).
  - Tablet (481px–680px): 3 columns with balanced gap.
  - Mobile (<=480px): 2 columns (`repeat(2, 1fr)`) with `1.25rem` vertical spacing, completely eliminating horizontal scrolling.

### 2.2 Grade Cards Grid (`.grade-grid`)
- Configured with `grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr))`.
- On narrow screens (320px–375px), each card expands to fill 100% of the available container width minus gutters, preventing horizontal clipping.
- On tablet (768px–1024px), cards arrange in clean 2-column or 3-column layouts.

### 2.3 Math Typesetting (KaTeX)
- Formula blocks wrapped in `.math-display` are styled with:
  ```css
  .math-display {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-block: 0.35rem;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }
  ```
- Long expressions (such as the quadratic formula derivation or cylinder surface area equations) scroll horizontally within their card boundary and never force the entire page to expand horizontally.

### 2.4 Mobile Navigation & Safe-Area Insets
- Bottom navigation bar is pinned with `position: fixed; bottom: 0; left: 0; right: 0;`.
- Touch target height: `min-height: 3.25rem` (52px), exceeding the 44px minimum standard.
- Bottom padding accommodates the home indicator on notched devices:
  `padding: 0.4rem 0.5rem calc(0.45rem + env(safe-area-inset-bottom))`.
- The main page shell applies `padding-bottom: calc(5.2rem + env(safe-area-inset-bottom))` so that no footer content, buttons, or dialog controls are hidden behind the bottom bar.

### 2.5 Tables and Diagrams
- Data tables are enclosed in `.data-table-wrap` with native touch momentum scrolling (`-webkit-overflow-scrolling: touch`).
- Shape Lab 2D and 3D canvas renderers automatically listen to resize events and adjust viewBox and canvas dimensions without layout shift.

---

## 3. Test Evidence & Summary

- **Horizontal Scroll Check:** Verified `document.documentElement.scrollWidth <= window.innerWidth` across all 11 breakpoints. Result: **0 horizontal leaks**.
- **Touch Target Check:** Verified that all interactive links, buttons, and chips maintain a minimum tap dimension of 44×44px or padding allowance. Result: **100% compliant**.
- **Font Legibility Check:** No text rendered below 11px on any screen. Body text maintains 15.5px–17px; supporting text maintains 14px. Result: **Optimal readability**.
