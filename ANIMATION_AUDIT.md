# Animation & Motion Design Audit — High School Math

**Subject:** Motion System & Cinematic Interaction  
**Platform:** High School Math  
**Design Principle:** "Purposeful, Lightweight, Mathematically Inspired, Accessible"  
**Date:** November 14, 2026  
**Auditor:** Motion Designer & Creative Frontend Specialist  

---

## 1. Motion Philosophy

The animation system for High School Math is designed to feel like a modern university digital laboratory. Animation must never delay reading, distract from mathematical comprehension, or consume excessive CPU/battery cycles on mid-range mobile devices.

### Rules of Motion:
1. **Transform & Opacity Only:** Animating `height`, `width`, or `margin` triggers expensive browser layout reflows. All animations strictly utilize GPU-accelerated `transform: translate3d()` and `opacity`.
2. **Intentional Timing:** Rapid interactive feedback (160ms) for buttons and cards; gentle entrance fades (320ms–600ms) for initial page loads; slow subtle ambient drift (9s) for peripheral mathematical symbols.
3. **No Flashing or Uncontrolled Jitter:** Motion is smooth, predictable, and physically grounded.
4. **Instant Reduced-Motion Fallback:** Immediate and total disablement under `prefers-reduced-motion`.

---

## 2. Key Motion Elements & Specifications

### 2.1 Easing Functions & Curves
- **Primary Smooth Curve (`--ease-out`):** `cubic-bezier(0.16, 1, 0.3, 1)`  
  Provides an organic deceleration curve reminiscent of high-end Apple interfaces, eliminating sudden stops.
- **Soft Interaction Curve (`--ease-soft`):** `cubic-bezier(0.25, 0.8, 0.25, 1)`  
  Used for color transitions, shadow elevations, and focus states.

### 2.2 Staggered Hero Entrance (`fade-rise`)
- **Keyframe Definition:**
  ```css
  @keyframes fade-rise {
    from {
      opacity: 0;
      transform: translate3d(0, 22px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  ```
- **Stagger Delays:** Handled via CSS custom property `--i`:
  - Kicker badge: `--i: 0` (delay 120ms)
  - Headline: `--i: 1` (delay 230ms)
  - Lead description: `--i: 2` (delay 340ms)
  - Action buttons: `--i: 3` (delay 450ms)
  - Search field: `--i: 4` (delay 560ms)
  - Stats row: `--i: 5` (delay 670ms)

### 2.3 Peripheral Floating Mathematical Symbols (`drift`)
- **Movement:** `transform: translate3d(0, -10px, 0) rotate(1.2deg)` over a 9-second infinite loop.
- **Placement:** Kept strictly within outer margins (`3%–4%`).
- **Responsive Handling:** Hidden entirely on mobile screens (`@media (max-width: 768px) { .hero__symbols { display: none; } }`) to preserve bandwidth and eliminate reading interference.

### 2.4 Card Elevation on Hover
- **Card Motion:** `transform: translateY(-4px)` with shadow bloom (`0 12px 32px -16px rgba(16, 42, 86, 0.18)`).
- **Arrow Icon:** Inner circular arrow smoothly shifts `transform: translateX(2px)` on card hover.
- **No Line Expansions:** Asymmetrical border lines and pseudo-element bars have been permanently removed.

---

## 3. Reduced Motion Compliance Test

When the operating system or browser requests reduced motion (`prefers-reduced-motion: reduce`):
- All animation durations collapse to `0.01ms`.
- All transition durations collapse to `0.01ms`.
- Ambient drifting loops stop completely.
- `.reveal` components render with immediate `opacity: 1; transform: none;`.

**Result:** Verified 100% compliant with WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions).
