# Content Gap Report — Generic to Cambodian MoEYS Curriculum

> **Document Type**: Curricular Gap Analysis (Phase 1 Baseline & Placeholder)  
> **Repository**: `D:\Personal\my-project\math`  
> **Author**: Application Auditor (`audit`)  
> **Date**: November 14, 2026  
> **Status**: Initial Architecture Audit Assessment (To be finalized following Phase 2 Official Source Discovery by `@sources`)

---

## 1. Overview and Objectives

This report identifies the curricular discrepancies, structural misalignments, topic omissions, and sequencing differences between the current generic international mathematics content library and the official **Ministry of Education, Youth and Sport (MoEYS) National Mathematics Curriculum of Cambodia** (Grades 7–12).

In Cambodia, secondary mathematics education is divided into two distinct cycles:
1. **Lower Secondary Education (មធ្យមសិក្សាបឋមភូមិ — Grades 7 to 9)**: Concludes with the National Lower Secondary Examination (Diploma / ឌីប្លូម).
2. **Upper Secondary Education (មធ្យមសិក្សាទុតិយភូមិ — Grades 10 to 12)**: Concludes with the high-stakes National Baccalaureate Examination (Bac II / បាក់ឌុប).

---

## 2. High-Level Curricular Structure Comparison

| Educational Cycle | Generic Library (Current) | Cambodian MoEYS National Framework | Migration Impact |
|---|---|---|---|
| **Grade 7** | 4 subjects (14 topics, 48 formulas) | Arithmetic/Number, Algebra, Geometry, Statistics/Probability | High alignment in arithmetic/geometry basics; verify sequencing with MoEYS Grade 7 textbook. |
| **Grade 8** | 4 subjects (12 topics, 42 formulas) | Rational numbers, Polynomials, Linear functions, Geometry (Pythagoras, quadrilaterals) | High alignment; ensure algebraic factorization identities match MoEYS standard notation. |
| **Grade 9** | 4 subjects (13 topics, 45 formulas) | Algebra (Radicals, systems, quadratics), Plane geometry, Circle geometry, Coordinates | **High-stakes Diploma exam year**: Must align with MoEYS Grade 9 exam standards (reduced discriminant $\Delta'$, inscribed angles, triangle similarity criteria). |
| **Grade 10** | 5 subjects (12 topics, 44 formulas) | Foundations of Upper Secondary: Functions, Quadratics, Trigonometry, Geometry, Statistics | Missing Space Geometry (lines/planes in 3D); verify trigonometry progression. |
| **Grade 11** | 5 subjects (12 topics, 46 formulas) | Advanced Algebra, Trigonometry, 2D Vectors, Matrices, Conics | MoEYS Grade 11 features distinct Science vs Social Science tracks; conics and sequences must follow MoEYS sequencing. |
| **Grade 12** | 5 subjects (11 topics, 39 formulas) | Calculus (Limits, Derivatives, Integrals), Complex Numbers, 3D Vectors, Conics, Probability | **CRITICAL GAPS**: Completely lacks **Differential Equations** and **3D Analytic Plane/Line Equations**, which are compulsory on the Cambodian Bac II exam! |

---

## 3. Preliminary Topic-Level Gap Analysis

### 3.1 Grade 12 (Critical Bac II National Exam Gaps)
The current Grade 12 content has strong calculus and algebra foundations, but omits core staples of the Cambodian National Baccalaureate (Bac II) exam:

1. **Differential Equations (សមីការឌីផេរ៉ង់ស្យែល) — [CRITICAL GAP: MISSING]**:
   - *Current State*: Not present anywhere in the library.
   - *MoEYS Requirement*: First-order linear differential equations with constant coefficients ($y' + ay = 0$, $y' + ay = p(x)$) and second-order linear homogeneous/non-homogeneous differential equations with constant coefficients ($y'' + ay' + by = 0$). This is a guaranteed problem on every Bac II Science Track exam.
2. **Analytic Geometry of Space (ធរណីមាត្រក្នុងលំហ / សមីការប្លង់ និង បន្ទាត់) — [MAJOR GAP: PARTIAL]**:
   - *Current State*: Current topic `vectors-in-three-dimensions` has only 3 basic vector formulas (magnitude, dot product, angle).
   - *MoEYS Requirement*: 
     - Vector cross product in 3D ($\vec{u} \times \vec{v}$) and application to area/volume.
     - General equation of a plane in space: $Ax + By + Cz + D = 0$.
     - Parametric and symmetric equations of a straight line in space.
     - Distance from a point to a plane in 3D: $d(M, (P)) = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}$.
     - Equation of a sphere in 3D: $(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2$.
3. **Complex Numbers Trigonometric & Exponential Forms (ចំនួនកុំផ្លិច) — [PARTIAL GAP]**:
   - *Current State*: `complex-numbers` covers only rectangular form ($a+bi$), modulus, and complex conjugates.
   - *MoEYS Requirement*: Polar/trigonometric form ($z = r(\cos \theta + i\sin \theta)$), exponential form ($z = r e^{i\theta}$), De Moivre's Theorem ($(\cos \theta + i\sin \theta)^n = \cos n\theta + i\sin n\theta$), and $n$-th roots of unity/complex numbers.
4. **Rational Functions Curve Sketching (ការសិក្សាអនុគមន៍សនិទាន) — [PEDAGOGICAL GAP]**:
   - *Current State*: Calculus topics cover mechanical derivative rules and basic extreme values.
   - *MoEYS Requirement*: Comprehensive function investigation tables (តារាងអថេរភាព), vertical, horizontal, and oblique asymptotes ($y = ax + b$), inflection points, and coordinate symmetry points.

### 3.2 Grade 11 Gaps
1. **Conic Sections Placement**:
   - Current library splits conics: `parabolas-as-conics` in Grade 11, and `conic-sections` (ellipse and hyperbola) in Grade 12.
   - MoEYS Upper Secondary typically treats all three conics (Parabola, Ellipse, Hyperbola) in a unified chapter with focal properties, directrices, and standard equations.
2. **Trigonometric Equations & Formulas**:
   - MoEYS Grade 11 requires extensive sum-to-product and product-to-sum formulas ($\cos a \cos b$, $\sin a \cos b$, etc.) and rigorous general solution forms ($x = \alpha + 2k\pi$, $x = \pi - \alpha + 2k\pi$).
3. **Sequences & Series**:
   - High alignment on arithmetic and geometric progressions, but MoEYS places special emphasis on recurrence relations of the form $u_{n+1} = a u_n + b$.

### 3.3 Grade 10 Gaps
1. **Space Geometry Foundations (ធរណីមាត្រក្នុងលំហ)**:
   - MoEYS Grade 10 introduces three-dimensional geometry: postulates of incidence in space, intersection of planes, conditions for parallelism of lines and planes, and perpendicularity criteria ($d \perp (P)$).
   - Currently, Grade 10 has plane geometry proofs (`geometric-proofs`), transformations, and circle theorems, but lacks 3D axiomatic spatial geometry.
2. **Polynomial Division & Factor Theorem**:
   - MoEYS Grade 10 heavily emphasizes Horner's method / synthetic division and the remainder theorem for cubic and higher-degree polynomials.

### 3.4 Grades 7–9 (Lower Secondary / Diploma Exam) Gaps
1. **Reduced Discriminant ($\Delta'$) for Quadratics (Grade 9)**:
   - In Cambodian textbooks and examinations, quadratic equations $ax^2 + 2b'x + c = 0$ are routinely solved using the reduced discriminant:
     $$\Delta' = b'^2 - ac, \quad x = \frac{-b' \pm \sqrt{\Delta'}}{a}$$
   - This must be added as a standard formula alongside $\Delta = b^2 - 4ac$.
2. **Inscribed Angles and Cyclic Quadrilaterals (Grade 9)**:
   - Theorems on inscribed angles (មុំចារឹកក្នុងរង្វង់), central angles (មុំផ្ចិត), angles formed by tangent and chord, and cyclic quadrilateral conditions (ចតុកោណចារឹកក្នុងរង្វង់) are standard Diploma examination problems.
3. **Proportions and Property Ratios (Grade 7 & 8)**:
   - Cambodian textbooks teach properties of equal ratios ($\frac{a}{b} = \frac{c}{d} = \frac{a+c}{b+d}$) with direct applications to practical word problems and geometry.

---

## 4. Next Steps for Curriculum Migration

1. **Incorporate Phase 2 Source Discovery**:
   - Synchronize with `@sources` once official textbooks and syllabus documents are cataloged in `research/OFFICIAL_SOURCE_REGISTRY.md`.
2. **Chapter-by-Chapter Crosswalk Table**:
   - Map each chapter from the official MoEYS textbooks (Grades 7–12) to existing topics and highlight net-new topics required.
3. **Update Formula Nomenclature & Synonyms**:
   - Add Khmer transliterations and standard MoEYS terminology to `src/data/search-synonyms.ts` and topic tags.
4. **Authoring Execution**:
   - Content authors will update grade files (`grade7.ts` through `grade12.ts`) while strictly maintaining the 7-step example format, $\ge 4$ exercises per topic, and KaTeX compilation checks.
