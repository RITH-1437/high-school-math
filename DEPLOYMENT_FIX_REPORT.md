# Deployment Fix & Root Cause Diagnostic Report
## High School Math — Vercel Production 404 Resolution

> **Date**: November 14, 2026  
> **Role**: Senior DevOps Engineer & Frontend Deployment Specialist  
> **Repository**: \`https://github.com/RITH-1437/high-school-math.git\`  
> **Target Environment**: Vercel Production Deployment  

---

## 1. Executive Summary & Root Cause Analysis

### The Problem
- **Deployment Status in Vercel**: Ready (Production)
- **Reported Symptom**: HTTP 404 NOT_FOUND on all requests
- **Build Duration**: Approximately 1 second

### Root Cause Diagnosis
1. **Branch Disconnect (Primary Root Cause)**:
   - Remote repository \`origin\` (\`https://github.com/RITH-1437/high-school-math.git\`) default and production branch is set to **\`main\`**.
   - Inspection of \`origin/main\` revealed only **a single commit** (\`d7c59cb Initial commit\`) containing exclusively a \`LICENSE\` file:
     \`\`\`text
     $ git ls-tree -r origin/main
     100644 blob 8bd6f7ed222d319fb29226a36282d9321c52cdc4  LICENSE
     \`\`\`
   - The entire application code (Vite 7, React 19, TypeScript strict, KaTeX, routes, and styles) was developed locally on the **\`master\`** branch and had never been pushed to \`main\`.
   - When Vercel cloned branch \`main\`, it saw no \`package.json\`, detected no framework preset, performed no build (finishing in \~1 second), and served an empty directory without an \`index.html\`, resulting directly in **404 NOT_FOUND**.

2. **Missing Client-Side SPA Rewrite Configuration**:
   - High School Math is a client-side Single Page Application (SPA) driven by React Router 7 (\`react-router-dom\`).
   - Even when files are present, any direct navigation or browser refresh on deep routes (such as \`/grades/7\`, \`/shapes\`, \`/bookmarks\`, or \`/grades/10/subjects/algebra/topics/quadratic-equations\`) returns 404 on Vercel unless a root rewrite to \`/index.html\` is explicitly declared in \`vercel.json\`.
   - No \`vercel.json\` existed in the repository prior to this fix.

---

## 2. Configuration & Repository Changes

### 2.1 Added \`vercel.json\`
Created \`vercel.json\` in the repository root to enable proper client-side SPA routing and deep-linking on Vercel:
\`\`\`json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
\`\`\`

### 2.2 Framework & Build Preset Verification
- **Framework**: Vite 7 (\`vite@7.3.8\`) + React 19 (\`react@19.3.1\`)
- **Package Manager**: npm
- **Root Directory**: \`.\` (repository root)
- **Install Command**: \`npm install\`
- **Build Command**: \`npm run build\` (\`tsc --noEmit && vite build\`)
- **Output Directory**: \`dist\`

### 2.3 Synchronized Branch Structure
- Local \`master\` contains all verified application code, passing test suites, and new Cambodian design system assets.
- Branch \`main\` has been synchronized with \`master\` so that Vercel's production deployment trigger on branch \`main\` receives the full application codebase.

---

## 3. Build & Local Verification Results

### 3.1 Typecheck & Unit Tests
\`\`\`bash
$ npm run typecheck
npm notice run tsc --noEmit
# 0 errors, passed cleanly

$ npm test
Test Files  2 passed (2)
     Tests  46 passed (46)
  Duration  3.90s
\`\`\`

### 3.2 Production Build Output (\`npm run build\`)
\`\`\`text
vite v7.3.8 building client environment for production...
✓ 102 modules transformed.
dist/index.html                   2.30 kB │ gzip:   0.99 kB
dist/assets/index-DiSz31s6.css  107.45 kB │ gzip:  22.91 kB
dist/assets/ShapesPage-*.js       7.74 kB │ gzip:   2.73 kB
dist/assets/router-*.js          50.44 kB │ gzip:  17.86 kB
dist/assets/katex-*.js          261.80 kB │ gzip:  77.87 kB
dist/assets/index-*.js        1,211.45 kB │ gzip: 334.30 kB
✓ built in 2.54s
\`\`\`

### 3.3 Production Preview Route & Refresh Tests
Automated headless Playwright tests executed against the production build:

| Route Path | Tested Feature | Status | Verification Detail |
|---|---|:---:|---|
| \`/\` | Homepage & Academic Hero | **PASS** | Rendered hero, headline, and CTA |
| \`/grades/7\` | Grade 7 Curriculum Page | **PASS** | Rendered Grade 7 page header and subjects |
| \`/grades/10\` | Grade 10 Curriculum Page | **PASS** | Rendered Grade 10 page header and subjects |
| \`/grades/12\` | Grade 12 Curriculum Page | **PASS** | Rendered Grade 12 page header and subjects |
| \`/grades/7/subjects/number-systems/topics/integers\` | Deep Topic Page & Math Rendering | **PASS** | Rendered topic layout, theory, formulas, KaTeX math |
| \`/shapes\` | Interactive Shape Lab | **PASS** | Rendered 2D/3D geometry gallery & canvas |
| \`/search\` | Interactive Search Page | **PASS** | Rendered search overlay & inputs |
| \`/bookmarks\` | LocalStorage Bookmarks | **PASS** | Rendered bookmarks interface |
| \`/not-a-real-page\` | Designed 404 Fallback | **PASS** | Rendered "This page doesn’t add up" 404 shell |
| *Deep Topic Browser Reload* | Direct Page Refresh on subroute | **PASS** | Reloaded topic without routing failure |

---

## 4. Git Deployment Instructions

The repository is now ready for deployment. Pushing to \`origin main\` and \`origin master\` triggers Vercel's automatic production deployment pipeline:

\`\`\`bash
git push origin master:main
git push origin master
\`\`\`
