# High School Math — Complete Content Inventory (Pre-Migration)

> **Document Type**: Architecture & Content Audit  
> **Repository**: `D:\Personal\my-project\math`  
> **Status**: Verified against runtime data and unit test suite  
> **Timestamp**: 2026-11-14T05:35:16.041Z  

---

## 1. Executive Summary & Aggregate Metrics

| Metric | Total Count | Notes |
|---|---|---|
| **Grades** | **6** | Grades 7, 8, 9, 10, 11, 12 |
| **Subjects** | **27** | Spanning 8 distinct subject families |
| **Topics** | **74** | Globally unique kebab-case IDs |
| **Formulas** | **264** | Fully verified KaTeX expressions, variable definitions & tags |
| **Worked Examples** | **148** | 7-step pedagogical structure (problem, given, steps, answer) |
| **Practice Exercises** | **427** | Mix of multiple-choice and numeric questions with tolerance |
| **Common Mistakes** | **150+** | Misconceptions with explicit corrections |
| **Interactive Shapes** | **20** | 12 2D SVG shapes + 8 3D canvas projected solids |

---

## 2. Grade-by-Grade Summary Matrix

| Grade | Grade Title | Subjects | Topics | Formulas | Exercises | Examples | Primary Curricular Focus |
|---|---|---|---|---|---|---|---|
| **Grade 7** | Grade 7 | 4 | 14 | 48 | 79 | 28 | Integers, rationals, basic algebra, angles, 2D perimeter/area, basic probability |
| **Grade 8** | Grade 8 | 4 | 12 | 42 | 70 | 24 | Real numbers, Pythagorean theorem, linear functions, polynomials, quadrilaterals |
| **Grade 9** | Grade 9 | 4 | 13 | 45 | 76 | 26 | Radicals, quadratic intro, similarity, circle geometry, Cartesian coordinates |
| **Grade 10** | Grade 10 | 5 | 12 | 44 | 70 | 24 | Quadratic equations, trigonometry (sine/cosine rules), circle theorems, coordinate lines |
| **Grade 11** | Grade 11 | 5 | 12 | 46 | 72 | 24 | Polynomials, logarithms, unit circle, 2D vectors, matrices, conic intro |
| **Grade 12** | Grade 12 | 5 | 11 | 39 | 60 | 22 | Limits, differentiation, integration, complex numbers, 3D vectors, normal distribution |
| **TOTAL** | — | **27** | **74** | **264** | **427** | **148** | — |

---

## 3. Detailed Grade Inventory Tables

### Grade 7 (Grade 7)

- **ID**: `7`
- **Tagline**: *Build the confidence to reason with numbers, letters, shapes and data.*
- **Description**: Grade 7 is where arithmetic grows into algebra. You will work with negative numbers, fractions, powers and ratios, then use letters to describe patterns and solve equations. Geometry turns measurement into careful reasoning, and statistics helps you read the stories that data tells. Every idea starts with a concrete example, so you can see why the rules work before you use them.
- **Focus Themes**: Signed numbers and proportional reasoning · First steps in algebra: expressions, equations and patterns · Angle reasoning and measurement of shapes · Reading data and judging chance
- **Totals**: 4 subjects · 14 topics · 48 formulas · 79 exercises · 28 worked examples

#### Subject: Number Systems

- **Subject ID**: `number-systems`
- **Family**: `number`
- **Description**: Numbers with direction, parts of a whole, powers and comparisons: the tools that every later topic depends on.
- **Topics Count**: 4 | **Formulas Count**: 16 | **Exercises Count**: 24

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `integers` | **Integers** | Positive and negative whole numbers, absolute value and the four operations. | 4 | 6 | 2 | — |
| `rational-numbers` | **Rational Numbers** | Fractions and decimals, ordering them, and all four operations. | 4 | 6 | 2 | — |
| `exponents-and-powers` | **Exponents and Powers** | Repeated multiplication, the index laws, and powers of ten. | 4 | 6 | 2 | — |
| `ratios-and-proportions` | **Ratios and Proportions** | Comparing quantities, unit rates and solving proportions. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Number Systems (4 topics)</summary>

**Topic: `integers` (Integers)**
- `g7-integers-distance`: **Distance between two integers** — `|a-b|`
- `g7-integers-subtraction`: **Subtracting by adding the opposite** — `a-b=a+(-b)`
- `g7-integers-bracket-subtraction`: **Subtracting a bracketed sum** — `a-(b+c)=a-b-c`
- `g7-integers-negative-product`: **Product of two negative numbers** — `(-a)(-b)=ab`

**Topic: `rational-numbers` (Rational Numbers)**
- `g7-rational-equivalent`: **Equivalent fractions** — `\frac{a}{b}=\frac{a\times k}{b\times k}`
- `g7-rational-add`: **Adding or subtracting fractions** — `\frac{a}{b}\pm\frac{c}{d}=\frac{ad\pm bc}{bd}`
- `g7-rational-multiply`: **Multiplying fractions** — `\frac{a}{b}\times\frac{c}{d}=\frac{ac}{bd}`
- `g7-rational-divide`: **Dividing fractions** — `\frac{a}{b}\div\frac{c}{d}=\frac{a}{b}\times\frac{d}{c}=\frac{ad}{bc}`

**Topic: `exponents-and-powers` (Exponents and Powers)**
- `g7-exponents-product`: **Product law for powers** — `a^m\times a^n=a^{m+n}`
- `g7-exponents-quotient`: **Quotient law for powers** — `a^m\div a^n=a^{m-n}`
- `g7-exponents-power`: **Power of a power** — `(a^m)^n=a^{mn}`
- `g7-exponents-zero`: **Zero exponent** — `a^0=1`

**Topic: `ratios-and-proportions` (Ratios and Proportions)**
- `g7-ratios-fraction`: **Ratio as a fraction** — `a:b=\frac{a}{b}`
- `g7-ratios-equivalent`: **Equivalent ratios** — `a:b=ka:kb`
- `g7-ratios-unit-rate`: **Unit rate** — `\text{unit rate}=\frac{\text{amount}}{\text{quantity}}`
- `g7-ratios-cross`: **Cross multiplication** — `\frac{a}{b}=\frac{c}{d}\;\Rightarrow\;ad=bc`

</details>

#### Subject: Algebra

- **Subject ID**: `algebra`
- **Family**: `algebra`
- **Description**: Letters that stand for numbers, equations that stay balanced, and patterns that can be predicted.
- **Topics Count**: 3 | **Formulas Count**: 9 | **Exercises Count**: 18

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `algebraic-expressions` | **Algebraic Expressions** | Variables, terms, substitution and simplifying with the distributive property. | 3 | 6 | 2 | — |
| `linear-equations-one-variable` | **Linear Equations in One Variable** | The balance method, two-step equations and word problems. | 3 | 6 | 2 | — |
| `patterns-and-sequences` | **Patterns and Sequences** | Term-to-term rules, input-output tables and simple nth-term formulas. | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Algebra (3 topics)</summary>

**Topic: `algebraic-expressions` (Algebraic Expressions)**
- `g7-expressions-distribute`: **The distributive property** — `a(b+c)=ab+ac`
- `g7-expressions-like-terms`: **Combining like terms** — `ax+bx=(a+b)x`
- `g7-expressions-negative-bracket`: **Negative of a difference** — `-(a-b)=-a+b`

**Topic: `linear-equations-one-variable` (Linear Equations in One Variable)**
- `g7-equations-two-step`: **Solving a two-step equation** — `ax+b=c\;\Rightarrow\;x=\frac{c-b}{a}`
- `g7-equations-brackets`: **Solving an equation with a bracket** — `a(x+b)=c\;\Rightarrow\;x=\frac{c}{a}-b`
- `g7-equations-fraction`: **Solving an equation with a fraction** — `\frac{x}{a}+b=c\;\Rightarrow\;x=a(c-b)`

**Topic: `patterns-and-sequences` (Patterns and Sequences)**
- `g7-patterns-nth-term`: **Nth term of an arithmetic sequence** — `a_n=a_1+(n-1)d`
- `g7-patterns-triangular`: **Triangular numbers** — `T_n=\frac{n(n+1)}{2}`
- `g7-patterns-odd-sum`: **Sum of the first n odd numbers** — `1+3+5+\cdots+(2n-1)=n^2`

</details>

#### Subject: Geometry

- **Subject ID**: `geometry`
- **Family**: `geometry`
- **Description**: Reasoning with angles and measuring the space inside and around shapes.
- **Topics Count**: 4 | **Formulas Count**: 14 | **Exercises Count**: 22

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `lines-angles-and-triangles` | **Lines, Angles and Triangles** | Angle types, parallel lines, the triangle angle sum and the triangle inequality. | 4 | 6 | 2 | — |
| `perimeter-and-area` | **Perimeter and Area** | Rectangles, triangles, parallelograms and composite figures. | 4 | 6 | 2 | — |
| `circles-intro` | **Circles: Circumference and Area** | Radius, diameter, circumference, area and what π really means. | 3 | 5 | 2 | [`circle`](/shapes/circle) |
| `prisms-and-cubes` | **Prisms and Cubes** | Nets, surface area and volume of cuboids and cubes. | 3 | 5 | 2 | [`cuboid`](/shapes/cuboid) |

<details>
<summary>View formulas in Geometry (4 topics)</summary>

**Topic: `lines-angles-and-triangles` (Lines, Angles and Triangles)**
- `g7-angles-triangle-sum`: **Triangle angle sum** — `A+B+C=180^{\circ}`
- `g7-angles-straight-line`: **Angles on a straight line** — `a+b=180^{\circ}`
- `g7-angles-exterior`: **Exterior angle of a triangle** — `\text{exterior angle}=A+B`
- `g7-angles-inequality`: **Triangle inequality** — `a+b>c`

**Topic: `perimeter-and-area` (Perimeter and Area)**
- `g7-area-rectangle-perimeter`: **Perimeter of a rectangle** — `P=2(l+w)`
- `g7-area-rectangle`: **Area of a rectangle** — `A=lw`
- `g7-area-parallelogram`: **Area of a parallelogram** — `A=bh`
- `g7-area-triangle`: **Area of a triangle** — `A=\frac{1}{2}bh`

**Topic: `circles-intro` (Circles: Circumference and Area)**
- `g7-circles-circumference-radius`: **Circumference from the radius** — `C=2\pi r`
- `g7-circles-circumference-diameter`: **Circumference from the diameter** — `C=\pi d`
- `g7-circles-area`: **Area of a circle** — `A=\pi r^2`

**Topic: `prisms-and-cubes` (Prisms and Cubes)**
- `g7-prisms-cuboid-volume`: **Volume of a cuboid** — `V=lwh`
- `g7-prisms-cuboid-surface-area`: **Surface area of a cuboid** — `SA=2(lw+lh+wh)`
- `g7-prisms-cube`: **Volume and surface area of a cube** — `V=s^3,\quad SA=6s^2`

</details>

#### Subject: Statistics & Probability

- **Subject ID**: `statistics-probability`
- **Family**: `statistics-probability`
- **Description**: Collecting and displaying data, summarising it with averages, and measuring how likely events are.
- **Topics Count**: 3 | **Formulas Count**: 9 | **Exercises Count**: 15

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `data-and-graphs` | **Data and Graphs** | Tables, bar charts, line graphs and pie charts, and how to read them critically. | 3 | 5 | 2 | — |
| `averages` | **Averages and Range** | Mean, median, mode and range as ways of summarising a data set. | 3 | 5 | 2 | — |
| `probability-intro` | **Introduction to Probability** | Sample space, theoretical and experimental probability, and the complement. | 3 | 5 | 2 | — |

<details>
<summary>View formulas in Statistics & Probability (3 topics)</summary>

**Topic: `data-and-graphs` (Data and Graphs)**
- `g7-data-total-frequency`: **Total frequency** — `n=f_1+f_2+\cdots+f_k`
- `g7-data-relative-frequency`: **Fraction and percentage of a category** — `\text{fraction}=\frac{f}{n},\quad \text{percentage}=\frac{f}{n}\times100\%`
- `g7-data-pie-angle`: **Pie chart sector angle** — `\theta=\frac{f}{n}\times360^{\circ}`

**Topic: `averages` (Averages and Range)**
- `g7-averages-mean`: **Mean** — `\bar{x}=\frac{x_1+x_2+\cdots+x_n}{n}`
- `g7-averages-median-position`: **Position of the median** — `\text{median position}=\frac{n+1}{2}`
- `g7-averages-range`: **Range** — `\text{range}=x_{\max}-x_{\min}`

**Topic: `probability-intro` (Introduction to Probability)**
- `g7-probability-theoretical`: **Theoretical probability** — `P(A)=\frac{\text{favourable outcomes}}{\text{total outcomes}}`
- `g7-probability-complement`: **Complement rule** — `P(\text{not }A)=1-P(A)`
- `g7-probability-experimental`: **Experimental probability** — `\text{relative frequency}=\frac{\text{times event occurred}}{\text{number of trials}}`

</details>

---

### Grade 8 (Grade 8)

- **ID**: `8`
- **Tagline**: *Structure, reasoning, and the first taste of proof.*
- **Description**: Grade 8 turns arithmetic fluency into algebraic structure. Students widen the number system to include irrational numbers, work confidently with roots and standard form, solve multi-step equations and inequalities, expand and factorize polynomials, and read linear functions as models. Geometry moves from measurement to reasoning through the Pythagorean theorem, congruence and the quadrilateral family, while statistics and probability focus on honest data displays and compound events.
- **Focus Themes**: Rational and irrational numbers, roots, and scientific notation · Linear equations, inequalities, polynomials, and factorization · Function notation, gradient, and straight-line graphs · Right triangles, congruence, and quadrilateral reasoning · Data displays and compound probability
- **Totals**: 4 subjects · 12 topics · 42 formulas · 70 exercises · 24 worked examples

#### Subject: Number Systems

- **Subject ID**: `number-systems`
- **Family**: `number`
- **Description**: Build a precise picture of the real number line: rational and irrational numbers, square and cube roots, and scientific notation for very large and very small quantities.
- **Topics Count**: 3 | **Formulas Count**: 10 | **Exercises Count**: 16

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `real-numbers` | **Real Numbers** | Rational and irrational numbers, recurring decimals, and ordering on the number line. | 3 | 5 | 2 | — |
| `square-and-cube-roots` | **Square and Cube Roots** | Perfect squares and cubes, root laws, estimation, and simplification. | 4 | 6 | 2 | — |
| `scientific-notation` | **Scientific Notation** | Writing very large and very small numbers as a coefficient times a power of ten. | 3 | 5 | 2 | — |

<details>
<summary>View formulas in Number Systems (3 topics)</summary>

**Topic: `real-numbers` (Real Numbers)**
- `g8-real-numbers-rational-form`: **Rational number as a fraction** — `r = \frac{p}{q}`
- `g8-real-numbers-recurring-fraction`: **Recurring decimal to fraction** — `0.\overline{N} = \frac{N}{10^n - 1}`
- `g8-real-numbers-order-roots`: **Ordering positive square roots** — `0 \le a < b \implies \sqrt{a} < \sqrt{b}`

**Topic: `square-and-cube-roots` (Square and Cube Roots)**
- `g8-roots-square-definition`: **Definition of a square root** — `b = \sqrt{a} \iff b^2 = a \text{ and } b \ge 0`
- `g8-roots-product-rule`: **Product rule for square roots** — `\sqrt{ab} = \sqrt{a}\,\sqrt{b}`
- `g8-roots-quotient-rule`: **Quotient rule for square roots** — `\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}`
- `g8-roots-cube-definition`: **Definition of a cube root** — `b = \sqrt[3]{a} \iff b^3 = a`

**Topic: `scientific-notation` (Scientific Notation)**
- `g8-sci-notation-standard-form`: **Scientific notation** — `N = a \times 10^n, \quad 1 \le a < 10`
- `g8-sci-notation-multiply`: **Multiplying in scientific notation** — `(a \times 10^m)(b \times 10^n) = (ab) \times 10^{m+n}`
- `g8-sci-notation-divide`: **Dividing in scientific notation** — `\frac{a \times 10^m}{b \times 10^n} = \left(\frac{a}{b}\right) \times 10^{m-n}`

</details>

#### Subject: Algebra

- **Subject ID**: `algebra`
- **Family**: `algebra`
- **Description**: Move fluently between expressions, equations, inequalities, and functions. Polynomials and factorization provide the structural tools; linear functions show how algebra describes change.
- **Topics Count**: 4 | **Formulas Count**: 14 | **Exercises Count**: 24

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `linear-equations-and-inequalities` | **Linear Equations and Inequalities** | Multi-step solving, variables on both sides, and the inequality reversal rule. | 4 | 6 | 2 | — |
| `polynomials-intro` | **Introduction to Polynomials** | Degree, like terms, expansion, and the special product identities. | 4 | 6 | 2 | — |
| `factorization-common-factors` | **Factorization: Common Factors and Patterns** | Greatest common factors, difference of squares, and monic trinomials. | 3 | 6 | 2 | — |
| `linear-functions` | **Linear Functions** | Function notation, gradient, intercepts, and straight-line graphs. | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Algebra (4 topics)</summary>

**Topic: `linear-equations-and-inequalities` (Linear Equations and Inequalities)**
- `g8-linear-ineq-solve`: **Solving a one-variable linear equation** — `ax + b = c \implies x = \frac{c-b}{a}`
- `g8-linear-ineq-both-sides`: **Equation with variables on both sides** — `ax + b = cx + d \implies x = \frac{d-b}{a-c}`
- `g8-linear-ineq-reversal`: **Inequality reversal rule** — `a < b \text{ and } c < 0 \implies ac > bc`
- `g8-linear-ineq-interval`: **Inequality and interval notation** — `a < x \le b \iff x \in (a,b]`

**Topic: `polynomials-intro` (Introduction to Polynomials)**
- `g8-polynomials-like-terms`: **Combining like terms** — `ax^n + bx^n = (a+b)x^n`
- `g8-polynomials-monomial-product`: **Product of monomials** — `(a x^m)(b x^n) = ab\,x^{m+n}`
- `g8-polynomials-binomial-square`: **Square of a binomial** — `(a \pm b)^2 = a^2 \pm 2ab + b^2`
- `g8-polynomials-difference-squares`: **Difference of squares** — `(a+b)(a-b) = a^2 - b^2`

**Topic: `factorization-common-factors` (Factorization: Common Factors and Patterns)**
- `g8-factorization-gcf`: **Common-factor factorization** — `ab + ac = a(b+c)`
- `g8-factorization-difference-squares`: **Difference of squares** — `a^2 - b^2 = (a-b)(a+b)`
- `g8-factorization-monic-trinomial`: **Factorizing a monic trinomial** — `x^2 + (p+q)x + pq = (x+p)(x+q)`

**Topic: `linear-functions` (Linear Functions)**
- `g8-linear-functions-slope`: **Gradient from two points** — `m = \frac{y_2-y_1}{x_2-x_1}`
- `g8-linear-functions-slope-intercept`: **Gradient-intercept form** — `y = mx + b`
- `g8-linear-functions-x-intercept`: **x-intercept of a line** — `x_0 = -\frac{b}{m}`

</details>

#### Subject: Geometry

- **Subject ID**: `geometry`
- **Family**: `geometry`
- **Description**: Reason about shape and space: the Pythagorean theorem, congruence through rigid motions, and the hierarchy of quadrilaterals. Measurement becomes argument, with every claim checked against a definition or a theorem.
- **Topics Count**: 3 | **Formulas Count**: 11 | **Exercises Count**: 18

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `pythagorean-theorem` | **The Pythagorean Theorem** | Right triangles, missing sides, the converse, and applications. | 4 | 6 | 2 | — |
| `congruence-and-transformations` | **Congruence and Transformations** | SSS, SAS and ASA, plus translations, reflections and rotations. | 4 | 6 | 2 | — |
| `quadrilaterals` | **Quadrilaterals** | Properties and hierarchy of parallelograms, rectangles, rhombuses, squares, trapezia and kites. | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Geometry (3 topics)</summary>

**Topic: `pythagorean-theorem` (The Pythagorean Theorem)**
- `g8-pythagoras-main`: **Pythagorean theorem** — `a^2 + b^2 = c^2`
- `g8-pythagoras-hypotenuse`: **Hypotenuse from two legs** — `c = \sqrt{a^2 + b^2}`
- `g8-pythagoras-leg`: **Missing leg** — `a = \sqrt{c^2 - b^2}`
- `g8-pythagoras-converse`: **Converse of the Pythagorean theorem** — `a^2 + b^2 = c^2 \implies \angle C = 90^{\circ}`

**Topic: `congruence-and-transformations` (Congruence and Transformations)**
- `g8-congruence-sss`: **SSS congruence criterion** — `AB=DE,\ BC=EF,\ CA=FD \implies \triangle ABC \cong \triangle DEF`
- `g8-congruence-translation`: **Translation in the coordinate plane** — `(x,y) \mapsto (x+a,\ y+b)`
- `g8-congruence-reflection-y`: **Reflection in the y-axis** — `(x,y) \mapsto (-x,\ y)`
- `g8-congruence-rotation-90`: **90° counterclockwise rotation about the origin** — `(x,y) \mapsto (-y,\ x)`

**Topic: `quadrilaterals` (Quadrilaterals)**
- `g8-quadrilaterals-angle-sum`: **Angle sum of a quadrilateral** — `\angle A + \angle B + \angle C + \angle D = 360^{\circ}`
- `g8-quadrilaterals-opposite-angles`: **Opposite angles of a parallelogram** — `\angle A = \angle C, \quad \angle B = \angle D`
- `g8-quadrilaterals-consecutive-angles`: **Consecutive angles of a parallelogram** — `\angle A + \angle B = 180^{\circ}`

</details>

#### Subject: Statistics & Probability

- **Subject ID**: `statistics-probability`
- **Family**: `statistics-probability`
- **Description**: Read data displays critically and calculate probabilities for compound events. Frequency tables, histograms and stem-and-leaf plots organise data; sample spaces, tree diagrams and the rules for AND and OR quantify chance.
- **Topics Count**: 2 | **Formulas Count**: 7 | **Exercises Count**: 12

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `data-displays` | **Data Displays** | Frequency tables, histograms, stem-and-leaf plots, and honest graphs. | 3 | 6 | 2 | — |
| `probability-compound-events` | **Compound Events and Probability** | Sample spaces, AND/OR, independent events, and tree diagrams. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Statistics & Probability (2 topics)</summary>

**Topic: `data-displays` (Data Displays)**
- `g8-data-displays-relative-frequency`: **Relative frequency** — `\text{relative frequency} = \frac{f}{n}`
- `g8-data-displays-class-width`: **Choosing a histogram class width** — `w = \frac{\text{max} - \text{min}}{k}`
- `g8-data-displays-frequency-mean`: **Mean from a frequency table** — `\bar{x} = \frac{\sum f x}{\sum f}`

**Topic: `probability-compound-events` (Compound Events and Probability)**
- `g8-compound-prob-basic`: **Probability from equally likely outcomes** — `P(E) = \frac{n(E)}{n(S)}`
- `g8-compound-prob-and-independent`: **AND rule for independent events** — `P(A \cap B) = P(A)\,P(B)`
- `g8-compound-prob-or-exclusive`: **OR rule for mutually exclusive events** — `P(A \cup B) = P(A) + P(B)`
- `g8-compound-prob-complement`: **Complement rule** — `P(\text{not } A) = 1 - P(A)`

</details>

---

### Grade 9 (Grade 9)

- **ID**: `9`
- **Tagline**: *Formal foundations: structure, similarity, and coordinate reasoning.*
- **Description**: Grade 9 turns earlier arithmetic and informal geometry into formal methods. Students simplify radical expressions, factor polynomials, solve factorable quadratic equations and linear systems, and read functions. Geometry moves to similarity, circle relationships, and the measurement of curved solids, while coordinate and statistical methods begin to connect algebra to data.
- **Focus Themes**: Algebraic structure: radicals, factoring, and systems · Similarity, circle relationships, and solid measurement · Coordinate methods for distance, midpoint, and slope · Bivariate data and probability from two-way tables
- **Totals**: 4 subjects · 13 topics · 45 formulas · 76 exercises · 26 worked examples

#### Subject: Algebra

- **Subject ID**: `algebra`
- **Family**: `algebra`
- **Description**: Radicals, factoring, quadratic equations, linear systems, and the language of functions form the algebraic core of Grade 9.
- **Topics Count**: 5 | **Formulas Count**: 18 | **Exercises Count**: 29

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `radical-expressions` | **Radical Expressions** | Simplify, combine, and rationalize square roots. | 4 | 6 | 2 | — |
| `polynomial-factorization` | **Polynomial Factorization** | Turn sums into products using common factors and special patterns. | 4 | 6 | 2 | — |
| `quadratic-equations-intro` | **Quadratic Equations: An Introduction** | Solve by factoring and by square roots using the zero-product property. | 4 | 5 | 2 | — |
| `systems-of-linear-equations` | **Systems of Linear Equations** | Two equations, two unknowns: graph, substitute, or eliminate. | 3 | 6 | 2 | — |
| `functions-intro` | **Functions: An Introduction** | One input, one output: notation, domain, and range. | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Algebra (5 topics)</summary>

**Topic: `radical-expressions` (Radical Expressions)**
- `g9-radicals-product`: **Product property of square roots** — `\sqrt{ab}=\sqrt{a}\,\sqrt{b}`
- `g9-radicals-quotient`: **Quotient property of square roots** — `\sqrt{\frac{a}{b}}=\frac{\sqrt{a}}{\sqrt{b}}`
- `g9-radicals-simplify`: **Extracting a perfect-square factor** — `\sqrt{a^2b}=a\sqrt{b}`
- `g9-radicals-rationalize`: **Rationalizing a single-term denominator** — `\frac{1}{\sqrt{a}}=\frac{\sqrt{a}}{a}`

**Topic: `polynomial-factorization` (Polynomial Factorization)**
- `g9-factor-gcf`: **Factoring out a common factor** — `ab+ac=a(b+c)`
- `g9-factor-difference-squares`: **Difference of squares** — `a^2-b^2=(a-b)(a+b)`
- `g9-factor-perfect-square`: **Perfect-square trinomial** — `a^2\pm 2ab+b^2=(a\pm b)^2`
- `g9-factor-trinomial`: **Factoring a monic trinomial** — `x^2+bx+c=(x+p)(x+q)`

**Topic: `quadratic-equations-intro` (Quadratic Equations: An Introduction)**
- `g9-quadratic-intro-standard`: **Standard form of a quadratic equation** — `ax^2+bx+c=0,\quad a\ne0`
- `g9-quadratic-intro-zero-product`: **Zero-product property** — `AB=0 \iff A=0 \text{ or } B=0`
- `g9-quadratic-intro-square-root`: **Square-root method** — `x^2=k \iff x=\pm\sqrt{k}`
- `g9-quadratic-intro-factored`: **Solutions from factored form** — `(x-r)(x-s)=0 \iff x=r \text{ or } x=s`

**Topic: `systems-of-linear-equations` (Systems of Linear Equations)**
- `g9-systems-standard`: **Standard form of a linear system** — `\begin{cases} a_1x+b_1y=c_1 \\ a_2x+b_2y=c_2 \end{cases}`
- `g9-systems-substitution`: **Solving for a variable by substitution** — `x=\frac{c-by}{a}`
- `g9-systems-slope-test`: **Number of solutions from slopes** — `m_1\ne m_2 \iff \text{exactly one solution}`

**Topic: `functions-intro` (Functions: An Introduction)**
- `g9-functions-notation`: **Function notation** — `y=f(x)`
- `g9-functions-linear`: **Linear function** — `f(x)=mx+b`
- `g9-functions-rate`: **Average rate of change** — `m=\frac{f(x_2)-f(x_1)}{x_2-x_1}`

</details>

#### Subject: Geometry

- **Subject ID**: `geometry`
- **Family**: `geometry`
- **Description**: Similarity, circle relationships, and the measurement of curved solids extend geometric reasoning from shapes in the plane to proportional and three-dimensional contexts.
- **Topics Count**: 3 | **Formulas Count**: 12 | **Exercises Count**: 18

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `similarity-and-dilations` | **Similarity and Dilations** | Same shape, different size: scale factors and proportional sides. | 4 | 6 | 2 | — |
| `circle-geometry` | **Circle Geometry** | Chords, arcs, and the angles they create. | 4 | 6 | 2 | — |
| `surface-area-and-volume` | **Surface Area and Volume of Solids** | Cylinders, cones, and spheres in exact and approximate form. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Geometry (3 topics)</summary>

**Topic: `similarity-and-dilations` (Similarity and Dilations)**
- `g9-similarity-scale-factor`: **Scale factor** — `k=\frac{\text{image length}}{\text{original length}}`
- `g9-similarity-side-ratio`: **Proportional sides of similar triangles** — `\frac{AB}{DE}=\frac{BC}{EF}=\frac{AC}{DF}`
- `g9-similarity-area-ratio`: **Area ratio of similar figures** — `\frac{A_{\text{image}}}{A_{\text{original}}}=k^2`
- `g9-similarity-dilation`: **Coordinate dilation about the origin** — `(x,y)\mapsto(kx,ky)`

**Topic: `circle-geometry` (Circle Geometry)**
- `g9-circles-central-angle`: **Central angle and intercepted arc** — `\theta_{\text{central}}=m\widehat{AB}`
- `g9-circles-inscribed-angle`: **Inscribed angle theorem** — `\theta_{\text{inscribed}}=\frac{1}{2}\theta_{\text{central}}`
- `g9-circles-tangent-radius`: **Tangent–radius perpendicularity** — `t\perp OA`
- `g9-circles-chord-distance`: **Radius, chord, and distance from the centre** — `r^2=d^2+\left(\frac{c}{2}\right)^2`

**Topic: `surface-area-and-volume` (Surface Area and Volume of Solids)**
- `g9-solids-cylinder`: **Volume of a cylinder** — `V=\pi r^2h`
- `g9-solids-cone`: **Volume of a cone** — `V=\frac{1}{3}\pi r^2h`
- `g9-solids-sphere-volume`: **Volume of a sphere** — `V=\frac{4}{3}\pi r^3`
- `g9-solids-sphere-surface`: **Surface area of a sphere** — `S=4\pi r^2`

</details>

#### Subject: Coordinate Geometry

- **Subject ID**: `coordinate-geometry`
- **Family**: `coordinate-geometry`
- **Description**: The Cartesian plane gives points numerical addresses. Distance, midpoint, and slope turn geometric questions about segments into algebra.
- **Topics Count**: 2 | **Formulas Count**: 6 | **Exercises Count**: 12

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `cartesian-plane` | **The Cartesian Plane** | Plot points, read quadrants, and draw horizontal and vertical lines. | 3 | 6 | 2 | — |
| `distance-midpoint-slope` | **Distance, Midpoint, and Slope** | Measure and describe segments on the coordinate plane. | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Coordinate Geometry (2 topics)</summary>

**Topic: `cartesian-plane` (The Cartesian Plane)**
- `g9-cartesian-quadrants`: **Sign patterns by quadrant** — `\text{I }(+,+),\quad \text{II }(-,+),\quad \text{III }(-,-),\quad \text{IV }(+,-)`
- `g9-cartesian-vertical-line`: **Equation of a vertical line** — `x=a`
- `g9-cartesian-horizontal-line`: **Equation of a horizontal line** — `y=b`

**Topic: `distance-midpoint-slope` (Distance, Midpoint, and Slope)**
- `g9-distance-formula`: **Distance formula** — `d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}`
- `g9-distance-midpoint`: **Midpoint formula** — `M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)`
- `g9-distance-slope`: **Slope of a segment** — `m=\frac{y_2-y_1}{x_2-x_1}`

</details>

#### Subject: Statistics & Probability

- **Subject ID**: `statistics-probability`
- **Family**: `statistics-probability`
- **Description**: Bivariate data, measures of spread, and two-way probability tables develop the statistical reasoning needed to describe variability and association.
- **Topics Count**: 3 | **Formulas Count**: 9 | **Exercises Count**: 17

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `scatter-plots` | **Scatter Plots and Association** | Read bivariate data: direction, strength, outliers, and causation. | 3 | 6 | 2 | — |
| `measures-of-spread` | **Measures of Spread** | Range, quartiles, IQR, box plots, and the 1.5 × IQR outlier rule. | 3 | 6 | 2 | — |
| `probability-compound-and-two-way` | **Two-Way Tables and Compound Probability** | Joint and marginal probabilities, "given that", and a first test for independence. | 3 | 5 | 2 | — |

<details>
<summary>View formulas in Statistics & Probability (3 topics)</summary>

**Topic: `scatter-plots` (Scatter Plots and Association)**
- `g9-scatter-best-fit`: **Line of best fit** — `\hat{y}=mx+b`
- `g9-scatter-slope`: **Interpreting the slope of a fit line** — `m=\frac{\text{change in predicted }y}{\text{change in }x}`
- `g9-scatter-residual`: **Residual** — `\text{residual}=y-\hat{y}`

**Topic: `measures-of-spread` (Measures of Spread)**
- `g9-spread-range`: **Range** — `R=\text{maximum}-\text{minimum}`
- `g9-spread-iqr`: **Interquartile range** — `\text{IQR}=Q_3-Q_1`
- `g9-spread-outlier-fences`: **Outlier fences** — `x<Q_1-1.5\,\text{IQR}\quad\text{or}\quad x>Q_3+1.5\,\text{IQR}`

**Topic: `probability-compound-and-two-way` (Two-Way Tables and Compound Probability)**
- `g9-twoway-addition-rule`: **Addition rule for two events** — `P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)`
- `g9-twoway-conditional-count`: **Conditional probability from a table** — `P(B\mid A)=\frac{\text{count in both }A\text{ and }B}{\text{count in }A}`
- `g9-twoway-independence`: **Independence check** — `P(A\text{ and }B)=P(A)\,P(B)`

</details>

---

### Grade 10 (Grade 10)

- **ID**: `10`
- **Tagline**: *Functions, proof, and the first steps into trigonometric modeling.*
- **Description**: Grade 10 turns algebra into a study of functions, adds formal geometric proof and circle theorems, and introduces right-triangle and general triangle trigonometry. Statistics shifts from describing data to measuring spread and reasoning with probability rules.
- **Focus Themes**: Quadratic equations, the discriminant, and completing the square · Function families, transformations, and exponential models · Deductive proof, isometries, and circle theorems · Right-triangle and general triangle trigonometry · Center, spread, counting, and probability rules
- **Totals**: 5 subjects · 12 topics · 44 formulas · 70 exercises · 24 worked examples

#### Subject: Algebra

- **Subject ID**: `algebra`
- **Family**: `algebra`
- **Description**: Quadratics, function families, exponential models, and systems of inequalities. The emphasis is on connecting an equation to its graph and choosing a method deliberately.
- **Topics Count**: 4 | **Formulas Count**: 14 | **Exercises Count**: 24

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `quadratic-equations` | **Quadratic Equations** | Solve by factoring, completing the square, or the formula, and read the discriminant. | 4 | 6 | 2 | — |
| `functions-and-transformations` | **Functions and Transformations** | Move, stretch, and reflect the parent graphs without losing domain or range. | 4 | 6 | 2 | — |
| `exponential-functions-intro` | **Exponential Functions: An Introduction** | Model repeated percent change with $y=ab^x$, growth factors, and compound interest. | 3 | 6 | 2 | — |
| `systems-of-inequalities` | **Systems of Inequalities** | Shade half-planes, identify feasible regions, and optimize at the vertices. | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Algebra (4 topics)</summary>

**Topic: `quadratic-equations` (Quadratic Equations)**
- `g10-quadratic-formula-standard`: **Quadratic formula** — `x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`
- `g10-quadratic-discriminant`: **Discriminant** — `\Delta = b^2 - 4ac`
- `g10-quadratic-completing-square`: **Completing the square identity** — `x^2 + bx + c = \left(x+\frac{b}{2}\right)^2 + c - \frac{b^2}{4}`
- `g10-quadratic-vertex-form`: **Vertex form of a parabola** — `y = a(x-h)^2 + k, \quad h = -\frac{b}{2a}, \quad k = c - \frac{b^2}{4a}`

**Topic: `functions-and-transformations` (Functions and Transformations)**
- `g10-functions-translation`: **Translations of a graph** — `y = f(x-h) + k`
- `g10-functions-stretch-reflection`: **Stretch and reflection factors** — `y = a\,f\left(\frac{x}{b}\right)`
- `g10-functions-absolute-value`: **Transformed absolute value function** — `y = a|x-h| + k`
- `g10-functions-even-odd`: **Even and odd symmetry** — `f(-x)=f(x) \ \text{(even)}, \qquad f(-x)=-f(x) \ \text{(odd)}`

**Topic: `exponential-functions-intro` (Exponential Functions: An Introduction)**
- `g10-exponential-model`: **Exponential growth and decay** — `y = a b^x`
- `g10-exponential-compound-interest`: **Compound interest formula** — `A = P\left(1+\frac{r}{n}\right)^{nt}`
- `g10-exponential-half-life`: **Half-life decay** — `A = A_0\left(\frac{1}{2}\right)^{t/h}`

**Topic: `systems-of-inequalities` (Systems of Inequalities)**
- `g10-inequalities-boundary`: **Boundary line of a half-plane** — `Ax + By = C`
- `g10-inequalities-system`: **System of two half-planes** — `\begin{cases} y \ge m_1x+b_1 \\ y \le m_2x+b_2 \end{cases}`
- `g10-inequalities-objective`: **Linear objective function** — `P = px + qy`

</details>

#### Subject: Geometry

- **Subject ID**: `geometry`
- **Family**: `geometry`
- **Description**: Formal reasoning, rigid motion, and the circle theorems that connect angles, arcs, and tangents. Proof is treated as a craft: every claim needs a reason.
- **Topics Count**: 3 | **Formulas Count**: 11 | **Exercises Count**: 18

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `geometric-proofs` | **Geometric Proofs** | Build deductive arguments from definitions, angle facts, and congruence criteria. | 3 | 6 | 2 | — |
| `transformations-in-the-plane` | **Transformations in the Plane** | Describe translations, reflections, and rotations precisely with coordinates. | 4 | 6 | 2 | — |
| `circle-theorems` | **Circle Theorems** | Connect angles, arcs, cyclic quadrilaterals, and tangents with justified reasons. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Geometry (3 topics)</summary>

**Topic: `geometric-proofs` (Geometric Proofs)**
- `g10-proofs-triangle-angle-sum`: **Triangle angle sum** — `\angle A + \angle B + \angle C = 180^{\circ}`
- `g10-proofs-exterior-angle`: **Exterior angle theorem** — `\angle ACD = \angle A + \angle B`
- `g10-proofs-isosceles-base-angles`: **Isosceles triangle theorem** — `AB = AC \ \Rightarrow \ \angle B = \angle C`

**Topic: `transformations-in-the-plane` (Transformations in the Plane)**
- `g10-transformations-translation`: **Translation rule** — `(x,y) \mapsto (x+a, y+b)`
- `g10-transformations-reflection-x`: **Reflection in the x-axis** — `(x,y) \mapsto (x,-y)`
- `g10-transformations-reflection-y`: **Reflection in the y-axis** — `(x,y) \mapsto (-x,y)`
- `g10-transformations-rotation-90`: **Rotation of 90 degrees about the origin** — `(x,y) \mapsto (-y,x)`

**Topic: `circle-theorems` (Circle Theorems)**
- `g10-circles-inscribed-angle`: **Inscribed angle theorem** — `\angle ABC = \frac{1}{2}\angle AOC`
- `g10-circles-cyclic-quadrilateral`: **Cyclic quadrilateral opposite angles** — `\angle A+\angle C=180^{\circ}, \quad \angle B+\angle D=180^{\circ}`
- `g10-circles-alternate-segment`: **Alternate segment theorem** — `\angle BAT = \angle ACB`
- `g10-circles-tangent-lengths`: **Equal tangent lengths** — `PA = PB`

</details>

#### Subject: Coordinate Geometry

- **Subject ID**: `coordinate-geometry`
- **Family**: `coordinate-geometry`
- **Description**: Describe lines algebraically, convert between forms, and use slope to decide whether lines are parallel, perpendicular, or intersecting.
- **Topics Count**: 1 | **Formulas Count**: 4 | **Exercises Count**: 6

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `coordinate-geometry-of-lines` | **Coordinate Geometry of Lines** | Move between slope forms, perpendicular gradients, and intersection points. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Coordinate Geometry (1 topics)</summary>

**Topic: `coordinate-geometry-of-lines` (Coordinate Geometry of Lines)**
- `g10-lines-slope`: **Slope between two points** — `m = \frac{y_2-y_1}{x_2-x_1}`
- `g10-lines-slope-intercept`: **Slope-intercept form** — `y = mx + c`
- `g10-lines-point-slope`: **Point-slope form** — `y-y_1 = m(x-x_1)`
- `g10-lines-perpendicular`: **Perpendicular slope condition** — `m_1 m_2 = -1`

</details>

#### Subject: Trigonometry

- **Subject ID**: `trigonometry`
- **Family**: `trigonometry`
- **Description**: Ratios in right triangles, exact values for special angles, and the sine and cosine rules for triangles that are not right-angled.
- **Topics Count**: 2 | **Formulas Count**: 8 | **Exercises Count**: 12

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `right-triangle-trigonometry` | **Right-Triangle Trigonometry** | Use sine, cosine, and tangent ratios to solve right triangles and model heights. | 4 | 6 | 2 | — |
| `sine-and-cosine-rules` | **The Sine and Cosine Rules** | Solve triangles that have no right angle, including the ambiguous SSA case. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Trigonometry (2 topics)</summary>

**Topic: `right-triangle-trigonometry` (Right-Triangle Trigonometry)**
- `g10-trig-sine-ratio`: **Sine ratio** — `\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}`
- `g10-trig-cosine-ratio`: **Cosine ratio** — `\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}`
- `g10-trig-tangent-ratio`: **Tangent ratio** — `\tan\theta = \frac{\text{opposite}}{\text{adjacent}}`
- `g10-trig-pythagorean-identity`: **Pythagorean identity** — `\sin^2\theta + \cos^2\theta = 1`

**Topic: `sine-and-cosine-rules` (The Sine and Cosine Rules)**
- `g10-trig-sine-rule`: **Sine rule** — `\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}`
- `g10-trig-cosine-rule`: **Cosine rule for a side** — `c^2 = a^2+b^2-2ab\cos C`
- `g10-trig-cosine-angle`: **Cosine rule for an angle** — `\cos C = \frac{a^2+b^2-c^2}{2ab}`
- `g10-trig-area-formula`: **Area of a triangle using sine** — `K = \frac{1}{2}ab\sin C`

</details>

#### Subject: Statistics & Probability

- **Subject ID**: `statistics-probability`
- **Family**: `statistics-probability`
- **Description**: Standard deviation and the choice between mean and median describe a data set precisely, while probability rules, counting methods, and expected value let you model chance and compare outcomes.
- **Topics Count**: 2 | **Formulas Count**: 7 | **Exercises Count**: 10

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `statistics-center-and-spread` | **Centre and Spread: Mean, Median, and Standard Deviation** | Choose a measure of centre, quantify variability, and see how outliers change both. | 3 | 5 | 2 | — |
| `probability-rules-and-counting` | **Probability Rules, Counting, and Expected Value** | Combine events, count outcomes with permutations and combinations, and weigh outcomes by their chance. | 4 | 5 | 2 | — |

<details>
<summary>View formulas in Statistics & Probability (2 topics)</summary>

**Topic: `statistics-center-and-spread` (Centre and Spread: Mean, Median, and Standard Deviation)**
- `g10-stats-mean`: **Mean** — `\bar{x}=\frac{\sum x}{n}`
- `g10-stats-population-sd`: **Population standard deviation** — `\sigma=\sqrt{\frac{\sum (x-\mu)^2}{N}}`
- `g10-stats-sample-sd`: **Sample standard deviation** — `s=\sqrt{\frac{\sum (x-\bar{x})^2}{n-1}}`

**Topic: `probability-rules-and-counting` (Probability Rules, Counting, and Expected Value)**
- `g10-prob-rules`: **Addition and multiplication rules** — `P(A\cup B)=P(A)+P(B)-P(A\cap B),\qquad P(A\cap B)=P(A)\,P(B\mid A)`
- `g10-counting-principle`: **Fundamental counting principle** — `N=n_1\times n_2\times\cdots\times n_k`
- `g10-permutations-combinations`: **Permutations and combinations** — `{}^nP_r=\frac{n!}{(n-r)!},\qquad {}^nC_r=\frac{n!}{r!\,(n-r)!}`
- `g10-expected-value`: **Expected value** — `E(X)=\sum x_i\,p_i`

</details>

---

### Grade 11 (Grade 11)

- **ID**: `11`
- **Tagline**: *Functions with structure, curves with equations, and probability with conditions.*
- **Description**: Grade 11 turns calculation into analysis. Polynomial, exponential, logarithmic and trigonometric functions are studied through their graphs, roots and identities; circles and parabolas are rebuilt as loci; vectors and matrices expose the linear structure behind geometry; and probability becomes conditional. Every result is derived and checked, not memorised as a list.
- **Focus Themes**: Polynomial, exponential and logarithmic functions · Sequences, series and convergence · Analytic geometry of circles and parabolas · Vectors, matrices and linear systems · Conditional probability and distributions
- **Totals**: 5 subjects · 12 topics · 46 formulas · 72 exercises · 24 worked examples

#### Subject: Advanced Algebra

- **Subject ID**: `algebra`
- **Family**: `algebra`
- **Description**: Four strands of function theory: polynomials and their roots, exponential and logarithmic models, sequences and series, and the algebra of composition and inversion.
- **Topics Count**: 4 | **Formulas Count**: 15 | **Exercises Count**: 24

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `polynomial-functions` | **Polynomial Functions** | Degree, division, roots and the shape of a polynomial graph. | 4 | 6 | 2 | — |
| `exponential-and-logarithmic-functions` | **Exponential and Logarithmic Functions** | Inverses that turn multiplication into addition. | 4 | 6 | 2 | — |
| `sequences-and-series` | **Sequences and Series** | Arithmetic steps, geometric ratios, and the sums they generate. | 4 | 6 | 2 | — |
| `inverse-and-composite-functions` | **Inverse and Composite Functions** | Building new functions by chaining and undoing. | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Advanced Algebra (4 topics)</summary>

**Topic: `polynomial-functions` (Polynomial Functions)**
- `g11-poly-general`: **General polynomial form** — `P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0`
- `g11-poly-division`: **Polynomial division algorithm** — `P(x)=D(x)Q(x)+R(x)`
- `g11-poly-remainder`: **Remainder Theorem** — `P(a)=R`
- `g11-poly-factor`: **Factor Theorem** — `P(a)=0 \iff (x-a)\mid P(x)`

**Topic: `exponential-and-logarithmic-functions` (Exponential and Logarithmic Functions)**
- `g11-explog-definition`: **Definition of a logarithm** — `\log_a x=y \iff a^y=x`
- `g11-explog-laws`: **Laws of logarithms** — `\log_a(xy)=\log_a x+\log_a y,\quad \log_a\frac{x}{y}=\log_a x-\log_a y,\quad \log_a(x^p)=p\log_a x`
- `g11-explog-change-base`: **Change of base** — `\log_a x=\frac{\log_b x}{\log_b a}`
- `g11-explog-compound`: **Compound growth model** — `A=P(1+r)^t`

**Topic: `sequences-and-series` (Sequences and Series)**
- `g11-seq-arith-nth`: **nth term of an arithmetic sequence** — `a_n=a_1+(n-1)d`
- `g11-seq-arith-sum`: **Sum of an arithmetic series** — `S_n=\frac{n}{2}(a_1+a_n)=\frac{n}{2}\bigl[2a_1+(n-1)d\bigr]`
- `g11-seq-geom-nth`: **nth term of a geometric sequence** — `a_n=a_1r^{n-1}`
- `g11-seq-geom-sum`: **Geometric series sums** — `S_n=\frac{a_1(1-r^n)}{1-r}\quad (r\ne 1),\qquad S_\infty=\frac{a_1}{1-r}\quad (|r|<1)`

**Topic: `inverse-and-composite-functions` (Inverse and Composite Functions)**
- `g11-invcomp-composite`: **Composite function** — `(f\circ g)(x)=f(g(x))`
- `g11-invcomp-inverse`: **Inverse function** — `f^{-1}(y)=x \iff f(x)=y`
- `g11-invcomp-identity`: **Inverse composition identities** — `f^{-1}(f(x))=x,\qquad f(f^{-1}(x))=x`

</details>

#### Subject: Coordinate Geometry

- **Subject ID**: `coordinate-geometry`
- **Family**: `coordinate-geometry`
- **Description**: Curves described by equations: circles built from a centre and radius, and parabolas built from a focus and directrix. Algebra and locus reasoning meet in every derivation.
- **Topics Count**: 2 | **Formulas Count**: 8 | **Exercises Count**: 12

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `circles-in-coordinate-geometry` | **Circles in Coordinate Geometry** | Centre, radius and tangents read from an equation. | 4 | 6 | 2 | — |
| `parabolas-as-conics` | **Parabolas as Conics** | The curve of points equidistant from a focus and a directrix. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Coordinate Geometry (2 topics)</summary>

**Topic: `circles-in-coordinate-geometry` (Circles in Coordinate Geometry)**
- `g11-circle-standard`: **Standard equation of a circle** — `(x-h)^2+(y-k)^2=r^2`
- `g11-circle-general`: **General equation of a circle** — `x^2+y^2+Dx+Ey+F=0`
- `g11-circle-centre-radius`: **Centre and radius from general form** — `C\left(-\frac{D}{2},-\frac{E}{2}\right),\qquad r=\frac{1}{2}\sqrt{D^2+E^2-4F}`
- `g11-circle-tangent`: **Tangency condition** — `\frac{|Ah+Bk+C|}{\sqrt{A^2+B^2}}=r`

**Topic: `parabolas-as-conics` (Parabolas as Conics)**
- `g11-parabola-locus`: **Focus–directrix equation** — `\sqrt{(x-p)^2+y^2}=|x+p|`
- `g11-parabola-standard`: **Sideways standard form** — `y^2=4px`
- `g11-parabola-vertical`: **Vertical parabola with vertex (h, k)** — `(x-h)^2=4p(y-k)`
- `g11-parabola-latus`: **Length of the latus rectum** — `\ell=4|p|`

</details>

#### Subject: Trigonometry

- **Subject ID**: `trigonometry`
- **Family**: `trigonometry`
- **Description**: Angles measured in radians, coordinates on the unit circle, periodic graphs, identities and general solutions. The right-triangle ratios become functions defined for every angle.
- **Topics Count**: 2 | **Formulas Count**: 8 | **Exercises Count**: 12

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `unit-circle-trigonometry` | **Unit Circle Trigonometry** | Radians, coordinates and the periodic graphs of sine, cosine and tangent. | 4 | 6 | 2 | — |
| `trigonometric-identities-and-equations` | **Trigonometric Identities and Equations** | Proving equivalence and capturing every solution. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Trigonometry (2 topics)</summary>

**Topic: `unit-circle-trigonometry` (Unit Circle Trigonometry)**
- `g11-unitrig-radian`: **Degree–radian conversion** — `\theta_{\text{rad}}=\theta^{\circ}\times\frac{\pi}{180^{\circ}}`
- `g11-unitrig-definition`: **Unit circle definitions** — `\cos\theta=x,\qquad \sin\theta=y,\qquad \tan\theta=\frac{y}{x}`
- `g11-unitrig-arc`: **Arc length** — `s=r\theta`
- `g11-unitrig-sinusoid`: **Sinusoid parameters** — `y=a\sin\bigl(b(x-c)\bigr)+d`

**Topic: `trigonometric-identities-and-equations` (Trigonometric Identities and Equations)**
- `g11-trigid-pythagorean`: **Pythagorean identity** — `\sin^2\theta+\cos^2\theta=1`
- `g11-trigid-quotient-reciprocal`: **Quotient and reciprocal identities** — `\tan\theta=\frac{\sin\theta}{\cos\theta},\qquad \csc\theta=\frac{1}{\sin\theta},\qquad \sec\theta=\frac{1}{\cos\theta},\qquad \cot\theta=\frac{\cos\theta}{\sin\theta}`
- `g11-trigid-double`: **Double-angle identities** — `\sin 2\theta=2\sin\theta\cos\theta,\qquad \cos 2\theta=\cos^2\theta-\sin^2\theta`
- `g11-trigid-general`: **General solution form** — `\theta=\theta_0+360^{\circ}k\qquad\text{or}\qquad \theta=\theta_0+2\pi k`

</details>

#### Subject: Vectors & Matrices

- **Subject ID**: `vectors-matrices`
- **Family**: `vectors-matrices`
- **Description**: Two languages for linear structure: vectors encode magnitude and direction in the plane, while matrices act on vectors and solve systems of equations.
- **Topics Count**: 2 | **Formulas Count**: 8 | **Exercises Count**: 12

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `vectors-in-two-dimensions` | **Vectors in Two Dimensions** | Components, magnitude, direction and the dot product. | 4 | 6 | 2 | — |
| `matrices-and-determinants` | **Matrices and Determinants** | Arrays that act on vectors and solve linear systems. | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Vectors & Matrices (2 topics)</summary>

**Topic: `vectors-in-two-dimensions` (Vectors in Two Dimensions)**
- `g11-vec2-magnitude`: **Magnitude of a vector** — `|\mathbf{v}|=\sqrt{x^2+y^2}`
- `g11-vec2-unit`: **Unit vector** — `\hat{\mathbf{v}}=\frac{\mathbf{v}}{|\mathbf{v}|}`
- `g11-vec2-dot`: **Dot product** — `\mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2=|\mathbf{a}||\mathbf{b}|\cos\theta`
- `g11-vec2-angle`: **Angle between two vectors** — `\cos\theta=\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{a}||\mathbf{b}|}`

**Topic: `matrices-and-determinants` (Matrices and Determinants)**
- `g11-mat-multiply`: **Matrix multiplication entry** — `(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}`
- `g11-mat-det`: **Determinant of a 2×2 matrix** — `\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc`
- `g11-mat-inverse`: **Inverse of a 2×2 matrix** — `A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}`
- `g11-mat-system`: **Solving a 2×2 system with an inverse** — `A\mathbf{x}=\mathbf{b}\ \Rightarrow\ \mathbf{x}=A^{-1}\mathbf{b}`

</details>

#### Subject: Statistics & Probability

- **Subject ID**: `statistics-probability`
- **Family**: `statistics-probability`
- **Description**: Probability updated by information, and variability measured and modelled. Conditional probability handles dependence; variance and distributions describe the spread of data and random variables.
- **Topics Count**: 2 | **Formulas Count**: 7 | **Exercises Count**: 12

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `conditional-probability` | **Conditional Probability** | Updating chance when information arrives. | 4 | 6 | 2 | — |
| `statistics-variance-and-distributions` | **Variance, Distributions & the Normal Curve** | Measuring spread, modelling chance, and meeting the bell curve | 3 | 6 | 2 | — |

<details>
<summary>View formulas in Statistics & Probability (2 topics)</summary>

**Topic: `conditional-probability` (Conditional Probability)**
- `g11-condprob-def`: **Conditional probability** — `P(A\mid B)=\frac{P(A\cap B)}{P(B)}`
- `g11-condprob-multiplication`: **Multiplication rule** — `P(A\cap B)=P(A\mid B)P(B)=P(B\mid A)P(A)`
- `g11-condprob-independence`: **Independence criterion** — `P(A\cap B)=P(A)P(B)\quad\iff\quad P(A\mid B)=P(A)`
- `g11-condprob-total`: **Law of total probability** — `P(A)=P(A\mid B)P(B)+P(A\mid B')P(B')`

**Topic: `statistics-variance-and-distributions` (Variance, Distributions & the Normal Curve)**
- `g11-statvar-variance-sd`: **Variance and standard deviation** — `\sigma^2=\frac{\sum (x-\mu)^2}{N},\qquad s^2=\frac{\sum (x-\bar{x})^2}{n-1}`
- `g11-statvar-expectation-variance`: **Expected value and variance of a discrete variable** — `E(X)=\sum x\,p,\qquad \operatorname{Var}(X)=E(X^2)-[E(X)]^2`
- `g11-statvar-empirical-rule`: **Empirical rule (68–95–99.7)** — `P(\mu-k\sigma<X<\mu+k\sigma)\approx 0.68,\ 0.95,\ 0.997\quad (k=1,2,3)`

</details>

---

### Grade 12 (Grade 12)

- **ID**: `12`
- **Tagline**: *Calculus, structure, and the mathematics of uncertainty*
- **Description**: Grade 12 brings the library to its most abstract and powerful ideas: limits, derivatives, and integrals describe change; complex numbers and combinatorics extend algebra and counting; vectors and matrices organise three-dimensional geometry and linear systems; probability distributions model randomness with precision.
- **Focus Themes**: Limits, continuity, and the foundations of calculus · Differentiation and integration with applications · Complex numbers, binomial expansions, and counting · Three-dimensional vectors and linear systems · Random variables, the binomial model, and the normal curve
- **Totals**: 5 subjects · 11 topics · 39 formulas · 60 exercises · 22 worked examples

#### Subject: Advanced Mathematics

- **Subject ID**: `advanced`
- **Family**: `advanced`
- **Description**: The calculus strand. Limits make the idea of approach precise, derivatives measure instantaneous change, and integrals accumulate change into totals and areas.
- **Topics Count**: 3 | **Formulas Count**: 12 | **Exercises Count**: 18

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `limits-and-continuity` | **Limits & Continuity** | What a function approaches — and what happens when it arrives | 4 | 6 | 2 | — |
| `differentiation` | **Differentiation** | Instantaneous change, tangents, and optimisation | 4 | 6 | 2 | — |
| `integration` | **Integration** | Accumulating change into totals and areas | 4 | 6 | 2 | — |

<details>
<summary>View formulas in Advanced Mathematics (3 topics)</summary>

**Topic: `limits-and-continuity` (Limits & Continuity)**
- `g12-limits-notation`: **Limit at a point** — `\lim_{x \to a} f(x) = L`
- `g12-limits-one-sided`: **One-sided limits and existence** — `\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L \iff \lim_{x \to a} f(x) = L`
- `g12-limits-infinity`: **Reciprocal powers at infinity** — `\lim_{x \to \infty} \frac{1}{x^n} = 0, \quad n > 0`
- `g12-limits-continuity`: **Continuity at a point** — `\lim_{x \to a} f(x) = f(a)`

**Topic: `differentiation` (Differentiation)**
- `g12-diff-first-principles`: **Derivative from first principles** — `f'(x) = \lim_{h \to 0}\frac{f(x+h)-f(x)}{h}`
- `g12-diff-power-rule`: **Power rule** — `\frac{d}{dx}\left(x^n\right) = n x^{n-1}`
- `g12-diff-product-quotient`: **Product and quotient rules** — `\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x), \qquad \frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}`
- `g12-diff-chain-rule`: **Chain rule** — `\frac{d}{dx}\left[f(g(x))\right] = f'(g(x))\,g'(x)`

**Topic: `integration` (Integration)**
- `g12-int-power`: **Power rule for integration** — `\int x^n\,dx = \frac{x^{n+1}}{n+1} + C, \quad n \ne -1`
- `g12-int-standard`: **Reciprocal and exponential integrals** — `\int \frac{1}{x}\,dx = \ln|x| + C, \qquad \int e^x\,dx = e^x + C`
- `g12-int-trig`: **Sine and cosine integrals** — `\int \sin x\,dx = -\cos x + C, \qquad \int \cos x\,dx = \sin x + C`
- `g12-int-ftc`: **Fundamental Theorem of Calculus** — `\int_a^b f(x)\,dx = F(b)-F(a), \quad \text{where } F'(x)=f(x)`

</details>

#### Subject: Algebra & Discrete Mathematics

- **Subject ID**: `algebra`
- **Family**: `algebra`
- **Description**: Complex numbers extend the real line into a plane, the binomial theorem expands powers without repeated multiplication, and counting techniques organise arrangements and selections.
- **Topics Count**: 3 | **Formulas Count**: 12 | **Exercises Count**: 17

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `complex-numbers` | **Complex Numbers** | Extending the number line into a plane | 4 | 6 | 2 | — |
| `binomial-theorem` | **The Binomial Theorem** | Expanding powers without multiplying repeatedly | 4 | 6 | 2 | — |
| `permutations-and-combinations` | **Permutations & Combinations** | Counting arrangements and selections without listing them | 4 | 5 | 2 | — |

<details>
<summary>View formulas in Algebra & Discrete Mathematics (3 topics)</summary>

**Topic: `complex-numbers` (Complex Numbers)**
- `g12-complex-imaginary-unit`: **The imaginary unit** — `i^2 = -1`
- `g12-complex-modulus`: **Modulus of a complex number** — `|z| = \sqrt{a^2+b^2}, \quad z=a+bi`
- `g12-complex-polar`: **Polar form** — `z = r(\cos\theta + i\sin\theta), \quad r=|z|, \quad \theta=\arg z`
- `g12-complex-demoivre`: **De Moivre's theorem** — `\left[r(\cos\theta + i\sin\theta)\right]^n = r^n\left(\cos n\theta + i\sin n\theta\right)`

**Topic: `binomial-theorem` (The Binomial Theorem)**
- `g12-binomial-theorem`: **Binomial theorem** — `(a+b)^n = \sum_{r=0}^{n}\binom{n}{r}a^{n-r}b^r`
- `g12-binomial-coefficient`: **Binomial coefficient** — `\binom{n}{r} = \frac{n!}{r!(n-r)!}, \quad 0 \le r \le n`
- `g12-binomial-general-term`: **General term** — `T_{r+1} = \binom{n}{r}a^{n-r}b^r`
- `g12-binomial-pascal`: **Pascal's rule** — `\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}`

**Topic: `permutations-and-combinations` (Permutations & Combinations)**
- `g12-perms-factorial`: **Factorial** — `n! = n(n-1)(n-2)\cdots 2\cdot 1, \quad 0!=1`
- `g12-perms-npr`: **Permutations** — `{}_nP_r = \frac{n!}{(n-r)!}, \quad 0 \le r \le n`
- `g12-perms-ncr`: **Combinations** — `\binom{n}{r} = \frac{n!}{r!(n-r)!}, \quad 0 \le r \le n`
- `g12-perms-identical`: **Arrangements with identical objects** — `\frac{n!}{n_1!\,n_2!\cdots n_k!}`

</details>

#### Subject: Coordinate Geometry

- **Subject ID**: `coordinate-geometry`
- **Family**: `coordinate-geometry`
- **Description**: Conic sections extend the circle and parabola to ellipses and hyperbolas, curves defined by distances to fixed points and described by simple equations.
- **Topics Count**: 1 | **Formulas Count**: 3 | **Exercises Count**: 5

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `conic-sections` | **Conic Sections: Ellipse & Hyperbola** | Standard forms, foci, eccentricity, and asymptotes | 3 | 5 | 2 | — |

<details>
<summary>View formulas in Coordinate Geometry (1 topics)</summary>

**Topic: `conic-sections` (Conic Sections: Ellipse & Hyperbola)**
- `g12-conic-ellipse`: **Ellipse (centre at origin)** — `\frac{x^2}{a^2}+\frac{y^2}{b^2}=1,\qquad c^2=a^2-b^2`
- `g12-conic-hyperbola`: **Hyperbola and asymptotes (centre at origin)** — `\frac{x^2}{a^2}-\frac{y^2}{b^2}=1,\quad c^2=a^2+b^2,\quad y=\pm\frac{b}{a}x`
- `g12-conic-eccentricity`: **Eccentricity** — `e=\frac{c}{a}`

</details>

#### Subject: Vectors & Matrices

- **Subject ID**: `vectors-matrices`
- **Family**: `vectors-matrices`
- **Description**: Vectors in three dimensions describe direction and magnitude in space, while matrices organise and solve systems of linear equations.
- **Topics Count**: 2 | **Formulas Count**: 6 | **Exercises Count**: 10

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `vectors-in-three-dimensions` | **Vectors in Three Dimensions** | Magnitude, dot and cross products, lines and planes | 3 | 5 | 2 | — |
| `matrices-and-linear-systems` | **Matrices & Linear Systems** | Gaussian elimination, 3×3 determinants, and inverses | 3 | 5 | 2 | — |

<details>
<summary>View formulas in Vectors & Matrices (2 topics)</summary>

**Topic: `vectors-in-three-dimensions` (Vectors in Three Dimensions)**
- `g12-vec3-magnitude-dot`: **Magnitude and dot product** — `|\mathbf{a}|=\sqrt{a_1^2+a_2^2+a_3^2},\quad \mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2+a_3b_3=|\mathbf{a}||\mathbf{b}|\cos\theta`
- `g12-vec3-cross`: **Cross product** — `\mathbf{a}\times\mathbf{b}=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)`
- `g12-vec3-line-plane`: **Vector equations of a line and a plane** — `\mathbf{r}=\mathbf{a}+t\mathbf{d},\qquad \mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0)=0`

**Topic: `matrices-and-linear-systems` (Matrices & Linear Systems)**
- `g12-matsys-det3`: **Determinant of a 3×3 matrix** — `\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix}=a(ei-fh)-b(di-fg)+c(dh-eg)`
- `g12-matsys-inverse`: **Inverse matrix** — `A^{-1}=\frac{1}{\det A}\operatorname{adj}A,\qquad AA^{-1}=A^{-1}A=I`
- `g12-matsys-solve`: **Solving a system with the inverse** — `A\mathbf{x}=\mathbf{b}\ \Rightarrow\ \mathbf{x}=A^{-1}\mathbf{b}`

</details>

#### Subject: Statistics & Probability

- **Subject ID**: `statistics-probability`
- **Family**: `statistics-probability`
- **Description**: Random variables assign numbers to chance outcomes. The binomial model counts successes in repeated trials, and the normal distribution models continuous data with a bell-shaped curve.
- **Topics Count**: 2 | **Formulas Count**: 6 | **Exercises Count**: 10

| Topic ID | Topic Title | Subtitle | Formulas | Exercises | Examples | Shape Link |
|---|---|---|---|---|---|---|
| `random-variables-and-distributions` | **Random Variables & the Binomial Distribution** | Expectation, variance, and counting successes | 3 | 5 | 2 | — |
| `normal-distribution` | **The Normal Distribution** | Bell curves, z-scores, and the empirical rule | 3 | 5 | 2 | — |

<details>
<summary>View formulas in Statistics & Probability (2 topics)</summary>

**Topic: `random-variables-and-distributions` (Random Variables & the Binomial Distribution)**
- `g12-randvar-expectation-variance`: **Expectation and variance** — `E(X)=\sum x\,p,\qquad \operatorname{Var}(X)=E(X^2)-[E(X)]^2`
- `g12-randvar-binomial-pmf`: **Binomial probability** — `P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}`
- `g12-randvar-binomial-moments`: **Binomial mean and variance** — `E(X)=np,\qquad \operatorname{Var}(X)=np(1-p)`

**Topic: `normal-distribution` (The Normal Distribution)**
- `g12-normal-zscore`: **z-score** — `z=\frac{x-\mu}{\sigma}`
- `g12-normal-empirical`: **Empirical rule** — `P(\mu-k\sigma<X<\mu+k\sigma)\approx0.683,\ 0.954,\ 0.997\quad(k=1,2,3)`
- `g12-normal-probability`: **Probability between two values** — `P(a<X<b)=\Phi\!\left(\frac{b-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-\mu}{\sigma}\right)`

</details>

---

