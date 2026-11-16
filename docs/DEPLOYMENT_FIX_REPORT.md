# DEPLOYMENT FIX REPORT
## High School Math — Vercel Production 404 Resolution

> **Date**: November 14, 2026  
> **Investigation Lead**: Senior DevOps Engineer & Frontend Deployment Specialist  
> **Repository**: [https://github.com/RITH-1437/high-school-math.git](https://github.com/RITH-1437/high-school-math.git)  
> **Target Environment**: Vercel Production Deployment  
> **Status**: RESOLVED & PUSHED TO PRODUCTION (`main` & `master`)  

---

## 1. Executive Summary

| Item | Details |
|---|---|
| **Incident** | Website response: **404 NOT_FOUND**, Build duration: **~1 second** |
| **Root Cause 1** | **Branch Disconnect**: Remote `origin/main` contained only a single commit with a `LICENSE` file. All application code had been committed locally on `master` and was never pushed to `main`. |
| **Root Cause 2** | **Missing Vercel SPA Routing Configuration**: No `vercel.json` existed to rewrite client-side routes to `/index.html`. |
| **Fix 1** | Created `vercel.json` with SPA catch-all rewrite rule. |
| **Fix 2** | Reconciled histories and pushed full application code from `master` to `origin/main` and `origin/master`. |
| **Fix 3** | Configured `http.postBuffer 524288000` to handle large payload transfer to GitHub remote without HTTP 408 timeouts. |
| **Verification** | Verified `npm run typecheck`, 46/46 Vitest tests, production build, and 9/9 routes in headless browser preview. |

---

## 2. Root Cause Analysis

### Phase 1 — Project & Git Audit
- **Project Type**: Client-Side Single Page Application (SPA).
- **Stack**: Vite 7 (`vite@7.3.8`), React 19 (`react@19.3.1`), TypeScript strict (`typescript@5.9.3`), React Router 7 (`react-router-dom@7.18.5`), KaTeX (`katex@0.19.1`), Hand-authored CSS.
- **Git Remote**: `origin` -> `https://github.com/RITH-1437/high-school-math.git`.
- **Remote Default Branch**: `origin/main`.
- **Inspection of `origin/main` prior to fix**:
  ```bash
  $ git ls-tree -r origin/main
  100644 blob 8bd6f7ed222d319fb29226a36282d9321c52cdc4  LICENSE
  ```
  Only `LICENSE` was present on the production branch.

### Phase 2 — Vercel Diagnostics
- When Vercel received a deployment trigger for branch `main`, it cloned the repository containing only `LICENSE`.
- Because there was no `package.json`, Vercel did not run `npm install` and did not run `npm run build`.
- The build duration was **~1 second** because no build steps were executed.
- Vercel attempted to serve the root directory. Finding neither an `index.html` nor static output, it returned **404 NOT_FOUND**.
- Furthermore, because React Router 7 uses HTML5 pushState routing, any direct URL visit (e.g., `/grades/7`, `/shapes`, `/bookmarks`) would fail on Vercel without a rewrite rule directing requests to `/index.html`.

---

## 3. Configuration & Code Changes

### 3.1 Created `vercel.json`
Created `vercel.json` in the repository root to route all requests to `/index.html` for client-side routing:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3.2 Integrated Cambodian UI & Design System Updates
Merged the latest verified design system updates before deployment:
- `src/styles/tokens.css`: Updated with official palette (Deep Navy `#102A56`, Soft White `#F7F9FC`, Cambodian Red `#C83B45`, Academic Gold `#D6A84B`, Border `#E2E8F0`).
- `index.html`: Added Google Fonts preconnect and stylesheets for `Noto Sans Khmer` and `Noto Serif Khmer`.
- `src/components/layout/Brand.tsx`: Updated brand mark with navy gradient, gold π, and subtle red cultural accent dot.
- `src/pages/HomePage.tsx`: Added Cambodian curriculum track distinctions (Lower Secondary Grades 7–9 · អនុវិទ្យាល័យ, Upper Secondary Grades 10–12 · វិទ្យាល័យ).

### 3.3 Git History Reconciliation & Push
1. Merged `origin/main` into local `master` with `--allow-unrelated-histories`.
2. Configured Git HTTP buffer settings to prevent HTTP 408 timeout:
   ```bash
   git config http.postBuffer 524288000
   ```
3. Pushed all application commits to both `origin master` and `origin main`:
   ```bash
   git push origin master:main
   git push origin master
   ```
   **Commit Range on `origin/main`**: `d7c59cb..a731084` -> **SUCCESS**.

---

## 4. Verification & Testing

### 4.1 Local Production Build & Test Suite
- **TypeScript**: `tsc --noEmit` passed with 0 errors.
- **Unit Tests**: `npm test` -> **46/46 tests passed**.
- **Production Build**: `npm run build` completed in **2.54s** generating `dist/index.html` and bundled assets.

### 4.2 Automated Browser Route & Direct Refresh Tests
Tested against a local production preview server using Playwright:

| Route | Tested Feature | Result |
|---|---|:---:|
| `/` | Homepage, Hero, Cambodian Tracks | **PASS** |
| `/grades/7` | Grade 7 Curriculum Page | **PASS** |
| `/grades/10` | Grade 10 Curriculum Page | **PASS** |
| `/grades/12` | Grade 12 Curriculum Page | **PASS** |
| `/grades/7/subjects/number-systems/topics/integers` | Deep Topic Page & KaTeX Math Rendering | **PASS** |
| `/shapes` | Interactive 2D/3D Shape Lab | **PASS** |
| `/search` | Full Search Interface | **PASS** |
| `/bookmarks` | LocalStorage Bookmarks Interface | **PASS** |
| `/not-a-real-page` | Designed 404 Fallback Page | **PASS** |
| *Direct Refresh* | Browser page reload on deep subroute | **PASS** |

---

## 5. Deployment Protection Notice (Owner Action)

- **Vercel Project URL**: `https://high-school-math-riths-projects-54952d13.vercel.app`
- **Current Observation**: Visiting the project URL currently prompts a Vercel SSO login redirect.
- **Explanation**: **Deployment Protection (Vercel Authentication)** is currently enabled on the Vercel project or team level (`team_1nPDY1LnWbIN1yNLB1DlSnct`).
- **To make the website publicly accessible to all visitors without requiring a Vercel login**:
  1. Open the [Vercel Dashboard](https://vercel.com/dashboard).
  2. Select project **`high-school-math`**.
  3. Navigate to **Settings > Deployment Protection**.
  4. Under **Vercel Authentication**, toggle the setting to **Disabled** (or configure Password Protection / Trusted IPs as desired).
  5. Save changes.

---

## 6. Definition of Done Checklist

- [x] Application root directory identified (`.`)
- [x] Framework preset detected (Vite + React)
- [x] `vercel.json` SPA rewrite configured
- [x] Production build generated and tested
- [x] All routes, deep navigation, and refresh tested
- [x] Pushed cleanly to `origin/main` and `origin/master`
- [x] `DEPLOYMENT_FIX_REPORT.md` generated
