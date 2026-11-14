import type { Grade } from '../../types/content'

/**
 * Grade 12 — Calculus and Discrete Mathematics.
 *
 * Every formula, example, and exercise in this file has been recomputed by hand.
 * LaTeX expressions are stored without delimiters; prose uses inline `$...$` math.
 */
export const grade12: Grade = {
  id: '12',
  number: 12,
  title: 'Grade 12',
  tagline: 'Calculus, structure, and the mathematics of uncertainty',
  description:
    'Grade 12 brings the library to its most abstract and powerful ideas: limits, derivatives, and integrals describe change; complex numbers and combinatorics extend algebra and counting; vectors and matrices organise three-dimensional geometry and linear systems; probability distributions model randomness with precision.',
  focus: [
    'Limits, continuity, and the foundations of calculus',
    'Differentiation and integration with applications',
    'Complex numbers, binomial expansions, and counting',
    'Three-dimensional vectors and linear systems',
    'Random variables, the binomial model, and the normal curve',
  ],
  subjects: [
    {
      id: 'advanced',
      family: 'advanced',
      title: 'Advanced Mathematics',
      description:
        'The calculus strand. Limits make the idea of approach precise, derivatives measure instantaneous change, and integrals accumulate change into totals and areas.',
      theorems: [
        {
          title: 'Limit laws',
          statement:
            'If $\\lim_{x \\to a} f(x)=L$ and $\\lim_{x \\to a} g(x)=M$ both exist, then $\\lim_{x \\to a}[f(x) \\pm g(x)]=L \\pm M$, $\\lim_{x \\to a}[f(x)g(x)]=LM$, and $\\lim_{x \\to a}\\frac{f(x)}{g(x)}=\\frac{L}{M}$ provided $M \\ne 0$. Constant multiples, powers, and roots follow within their domains.',
          note: 'These laws justify direct substitution and algebraic simplification in routine limit problems.',
        },
        {
          title: 'Differentiability implies continuity',
          statement:
            'If $f$ is differentiable at $x=a$, then $f$ is continuous at $x=a$. The converse fails: $f(x)=|x|$ is continuous at $0$ but not differentiable there.',
          note: 'A function can be continuous at a point yet have a corner or vertical tangent.',
        },
        {
          title: 'Fundamental Theorem of Calculus',
          statement:
            'If $f$ is continuous on $[a,b]$ and $F(x)=\\int_a^x f(t)\\,dt$, then $F\'(x)=f(x)$. Moreover, if $G$ is any antiderivative of $f$, then $\\int_a^b f(x)\\,dx=G(b)-G(a)$.',
          note: 'The theorem connects the two central ideas of calculus: accumulation and instantaneous change.',
        },
      ],
      topics: [
        {
          id: 'limits-and-continuity',
          title: 'Limits & Continuity',
          subtitle: 'What a function approaches — and what happens when it arrives',
          introduction:
            'A limit answers a question about approach: as $x$ gets arbitrarily close to $a$, what value does $f(x)$ get close to? The answer can exist even when $f(a)$ does not. Continuity is the extra condition that the approach value and the actual value agree, so the graph has no hole, jump, or vertical break at $a$.',
          prerequisites: [
            'Function notation and graphs',
            'Factoring and rationalising surds',
            'Polynomial and rational functions',
          ],
          keyIdeas: [
            'A limit describes behaviour near a point, not necessarily at it',
            'One-sided limits must agree for the two-sided limit to exist',
            'Substitute first; if you get $0/0$, simplify algebraically',
            'Continuity means $\\lim_{x \\to a} f(x)=f(a)$',
          ],
          theory: [
            {
              title: 'The limit idea',
              body: [
                'The notation $\\lim_{x \\to a} f(x)=L$ means that $f(x)$ can be made as close to $L$ as we like by taking $x$ sufficiently close to $a$, but not equal to $a$. The point $x=a$ itself is excluded from the approach.',
                'For $f(x)=\\frac{x^2-1}{x-1}$, substitution at $x=1$ gives $\\frac{0}{0}$, so the function is undefined there. But for every $x \\ne 1$, the numerator factors as $(x-1)(x+1)$, and cancelling the common factor gives $f(x)=x+1$. The graph is therefore the line $y=x+1$ with a single hole at $(1,2)$, and $\\lim_{x \\to 1} f(x)=2$.',
                'A limit can also fail to exist. If the two sides of the graph approach different heights, or if the values grow without bound, no single real number $L$ is approached from both sides.',
              ],
              bullets: [
                'Limits are about nearby values, not the value at the point.',
                'A table of values can suggest a limit, but algebra is needed to prove one.',
                'The notation $x \\to a$ allows $x$ to approach from either side.',
              ],
            },
            {
              title: 'One-sided limits',
              body: [
                'The left-hand limit $\\lim_{x \\to a^-} f(x)$ uses only values with $x<a$. The right-hand limit $\\lim_{x \\to a^+} f(x)$ uses only values with $x>a$. The two-sided limit exists exactly when both one-sided limits exist and are equal.',
                'For the piecewise function $f(x)=x+1$ when $x<1$ and $f(x)=x^2$ when $x \\ge 1$, the left-hand limit at $1$ is $2$ while the right-hand limit is $1$. The graph jumps at $x=1$, so $\\lim_{x \\to 1} f(x)$ does not exist.',
              ],
              bullets: [
                'Left limit: approach along values smaller than $a$.',
                'Right limit: approach along values larger than $a$.',
                'A jump discontinuity occurs when the one-sided limits differ.',
              ],
            },
            {
              title: 'Limit laws and algebraic evaluation',
              body: [
                'When both limits exist, limits respect addition, subtraction, multiplication, and division. If $\\lim_{x \\to a} f(x)=L$ and $\\lim_{x \\to a} g(x)=M$, then the limit of $f \\pm g$ is $L \\pm M$, the limit of $fg$ is $LM$, and the limit of $f/g$ is $L/M$ provided $M \\ne 0$. Powers and roots follow within their domains.',
                'For polynomials and for rational functions at points where the denominator is nonzero, these laws justify direct substitution. When substitution gives $0/0$, the form is indeterminate: it does not determine the answer. Factor and cancel, rationalise a surd, or simplify the expression, then substitute again.',
                'At infinity, divide numerator and denominator by the highest power of $x$ present. Since $\\frac{1}{x^n} \\to 0$ for $n>0$, the limit of a rational function is controlled by the highest-degree terms: equal degrees give the ratio of leading coefficients, a larger numerator degree gives no finite limit, and a larger denominator degree gives $0$.',
              ],
              bullets: [
                'Quotient law requires the denominator limit to be nonzero.',
                'For $0/0$, simplify before substituting; the original expression is undefined at the point.',
                'For limits at infinity, compare the degrees of numerator and denominator first.',
              ],
            },
            {
              title: 'Continuity and its failures',
              body: [
                'A function $f$ is continuous at $x=a$ when three things hold: $f(a)$ is defined, $\\lim_{x \\to a} f(x)$ exists, and the two are equal. Informally, the graph can be drawn through $a$ without lifting the pen.',
                'A removable discontinuity is a hole that could be filled by redefining $f(a)$. A jump discontinuity has different one-sided limits. An infinite discontinuity occurs where the function grows without bound, producing a vertical asymptote.',
                'A function is continuous on an interval when it is continuous at every interior point, with the appropriate one-sided continuity at endpoints. The Intermediate Value Theorem then guarantees that a continuous function on $[a,b]$ takes every value between $f(a)$ and $f(b)$.',
              ],
              bullets: [
                'Continuity at a point is a local property.',
                'Polynomials are continuous everywhere; rational functions are continuous wherever defined.',
                'The Intermediate Value Theorem requires continuity on a closed interval.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-limits-notation',
              title: 'Limit at a point',
              expression: String.raw`\lim_{x \to a} f(x) = L`,
              description:
                'The value $L$ that $f(x)$ approaches as $x$ approaches $a$ from both sides. The function need not be defined at $a$.',
              spoken: 'The limit of f of x as x approaches a equals L.',
              variables: [
                { symbol: 'a', name: 'approach point', note: 'a real number' },
                { symbol: 'L', name: 'limit value', note: 'a real number, when the limit exists' },
                { symbol: 'f', name: 'function being examined' },
              ],
              conditions: [
                'The limit exists only when the left-hand and right-hand limits both exist and are equal.',
                'The value $f(a)$ may be undefined or may differ from $L$; neither changes the limit.',
              ],
              notes:
                'A limit describes nearby behaviour. Writing $f(a)=L$ is a separate claim that requires continuity.',
              tags: ['limit', 'limit notation', 'approaching a point', 'two-sided limit'],
            },
            {
              id: 'g12-limits-one-sided',
              title: 'One-sided limits and existence',
              expression: String.raw`\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L \iff \lim_{x \to a} f(x) = L`,
              description:
                'A two-sided limit exists exactly when the left-hand and right-hand limits exist and agree.',
              spoken:
                'The left limit and the right limit both equal L if and only if the two-sided limit equals L.',
              variables: [
                { symbol: 'a', name: 'approach point' },
                { symbol: 'L', name: 'common one-sided limit value' },
                { symbol: 'f', name: 'function being examined' },
              ],
              conditions: [
                'Both one-sided limits must exist as finite real numbers.',
                'If the one-sided limits differ, the two-sided limit does not exist.',
              ],
              notes:
                'This equivalence is the standard test for limits of piecewise functions and for functions with jumps.',
              tags: ['one-sided limit', 'left-hand limit', 'right-hand limit', 'jump discontinuity'],
            },
            {
              id: 'g12-limits-infinity',
              title: 'Reciprocal powers at infinity',
              expression: String.raw`\lim_{x \to \infty} \frac{1}{x^n} = 0, \quad n > 0`,
              description:
                'Positive powers of $x$ in a denominator drive the fraction to zero as $x$ grows without bound.',
              spoken: 'The limit of one over x to the n, as x approaches infinity, is zero for positive n.',
              variables: [
                { symbol: 'x', name: 'variable tending to infinity' },
                { symbol: 'n', name: 'positive exponent', note: 'n > 0' },
              ],
              conditions: ['$n$ is a positive constant.', 'The limit is taken as $x \\to +\\infty$.'],
              notes:
                'Divide numerator and denominator by the highest power of $x$ to rewrite rational functions as sums of such reciprocal powers.',
              tags: ['limits at infinity', 'reciprocal powers', 'end behaviour', 'asymptote'],
            },
            {
              id: 'g12-limits-continuity',
              title: 'Continuity at a point',
              expression: String.raw`\lim_{x \to a} f(x) = f(a)`,
              description:
                'A function is continuous at $a$ when the limit as $x$ approaches $a$ equals the actual function value at $a$.',
              spoken: 'The limit of f of x as x approaches a equals f of a.',
              variables: [
                { symbol: 'a', name: 'point of continuity' },
                { symbol: 'f', name: 'function being tested' },
              ],
              conditions: [
                '$f(a)$ must be defined.',
                'The two-sided limit $\\lim_{x \\to a} f(x)$ must exist.',
                'The limit and the function value must be equal.',
              ],
              notes:
                'If the limit exists but differs from $f(a)$, the discontinuity is removable by redefining $f(a)$.',
              tags: ['continuity', 'continuous function', 'removable discontinuity', 'limit equals value'],
            },
          ],
          examples: [
            {
              title: 'Evaluating a limit by factoring',
              problem: 'Evaluate $\\lim_{x \\to 3} \\frac{x^2-9}{x-3}$.',
              given: [
                'Function: $f(x)=\\frac{x^2-9}{x-3}$',
                'Approach point: $a=3$',
                'The function is undefined at $x=3$, so substitution gives $0/0$.',
              ],
              steps: [
                {
                  text: 'Try direct substitution to see whether the limit can be found immediately.',
                  math: String.raw`\frac{3^2-9}{3-3}=\frac{0}{0}`,
                },
                {
                  text: 'The result is an indeterminate form, so simplify. Factor the difference of squares.',
                  math: String.raw`x^2-9=(x-3)(x+3)`,
                },
                {
                  text: 'Cancel the common factor. This is valid because the limit uses values with $x \\ne 3$, even though $x$ approaches $3$.',
                  math: String.raw`\frac{(x-3)(x+3)}{x-3}=x+3 \quad (x \ne 3)`,
                },
                {
                  text: 'Now evaluate the limit of the simplified expression by substitution.',
                  math: String.raw`\lim_{x \to 3}(x+3)=3+3`,
                },
                {
                  text: 'Compute the final value.',
                  math: String.raw`=6`,
                },
                {
                  text: 'Check with nearby values: $f(2.9)=5.9$ and $f(3.1)=6.1$, both close to $6$. The limit is a pure number, so there are no units.',
                },
              ],
              answer: '$\\lim_{x \\to 3} \\frac{x^2-9}{x-3}=6$.',
            },
            {
              title: 'Making a function continuous',
              problem:
                'Let $f(x)=\\frac{x^2-4}{x-2}$ for $x \\ne 2$, and let $f(2)=k$. Find the value of $k$ that makes $f$ continuous at $x=2$.',
              given: [
                'The rule for $x \\ne 2$: $f(x)=\\frac{x^2-4}{x-2}$',
                'The proposed value at the point: $f(2)=k$',
                'Continuity at $2$ requires $\\lim_{x \\to 2} f(x)=f(2)$.',
              ],
              steps: [
                {
                  text: 'State the continuity condition that must be satisfied.',
                  math: String.raw`\lim_{x \to 2} f(x)=f(2)=k`,
                },
                {
                  text: 'Substitution gives $0/0$, so factor the numerator.',
                  math: String.raw`x^2-4=(x-2)(x+2)`,
                },
                {
                  text: 'Cancel the common factor for $x \\ne 2$.',
                  math: String.raw`\frac{(x-2)(x+2)}{x-2}=x+2`,
                },
                {
                  text: 'Evaluate the limit of the simplified expression.',
                  math: String.raw`\lim_{x \to 2}(x+2)=4`,
                },
                {
                  text: 'Set the function value equal to the limit.',
                  math: String.raw`k=4`,
                },
                {
                  text: 'With $k=4$, the limit and the function value agree, so the hole is filled and $f$ is continuous at $x=2$. There are no units because $k$ is a function value of a dimensionless expression.',
                },
              ],
              answer: '$k=4$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Treating $0/0$ as a definite value such as $0$ or $1$.',
              correction:
                '$0/0$ is indeterminate. It means the expression needs algebraic simplification before the limit can be evaluated.',
            },
            {
              mistake: 'Cancelling $x-a$ and then substituting $x=a$ without noting that the original expression was undefined there.',
              correction:
                'The cancellation is valid only for $x \\ne a$. The limit is allowed to ignore the point itself, which is exactly why the simplified expression may be used.',
            },
            {
              mistake: 'Assuming that a function is continuous at $a$ merely because $\\lim_{x \\to a} f(x)$ exists.',
              correction:
                'Continuity also requires $f(a)$ to be defined and equal to the limit. A hole has a limit but is not continuous.',
            },
          ],
          exercises: [
            {
              id: 'g12-limits-ex-1',
              type: 'multiple-choice',
              prompt: 'Evaluate $\\lim_{x \\to 2}(3x^2-x)$.',
              options: ['4', '9', '10', '12'],
              correctOption: 2,
              hint: 'The function is a polynomial, so try direct substitution.',
              explanation:
                'Substitute $x=2$: $3(2)^2-2=3(4)-2=12-2=10$. Polynomials are continuous everywhere, so the limit equals the function value.',
              difficulty: 'easy',
            },
            {
              id: 'g12-limits-ex-2',
              type: 'multiple-choice',
              prompt:
                'Let $f(x)=x+1$ for $x<1$ and $f(x)=x^2$ for $x \\ge 1$. What is $\\lim_{x \\to 1} f(x)$?',
              options: ['1', '2', '3', 'The limit does not exist'],
              correctOption: 3,
              hint: 'Compute the left-hand and right-hand limits separately.',
              explanation:
                'From the left, $\\lim_{x \\to 1^-}(x+1)=2$. From the right, $\\lim_{x \\to 1^+}x^2=1$. The one-sided limits differ, so the two-sided limit does not exist.',
              difficulty: 'medium',
            },
            {
              id: 'g12-limits-ex-3',
              type: 'numeric',
              prompt: 'Evaluate $\\lim_{x \\to 4}\\frac{x^2-16}{x-4}$.',
              answer: 8,
              tolerance: 0.001,
              hint: 'Factor $x^2-16$ as a difference of squares.',
              explanation:
                '$x^2-16=(x-4)(x+4)$, so for $x \\ne 4$ the expression equals $x+4$. Hence the limit is $4+4=8$.',
              difficulty: 'easy',
            },
            {
              id: 'g12-limits-ex-4',
              type: 'numeric',
              prompt: 'Evaluate $\\lim_{x \\to \\infty}\\frac{5x^3-2x}{2x^3+x^2+1}$.',
              answer: 2.5,
              tolerance: 0.01,
              hint: 'Divide every term by $x^3$, the highest power in the denominator.',
              explanation:
                'Dividing numerator and denominator by $x^3$ gives $\\frac{5-2/x^2}{2+1/x+1/x^3}$. As $x \\to \\infty$, the reciprocal terms vanish, leaving $\\frac{5}{2}=2.5$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-limits-ex-5',
              type: 'multiple-choice',
              prompt:
                'Let $f(x)=\\frac{x^2-9}{x-3}$ for $x \\ne 3$ and $f(3)=k$. Which value of $k$ makes $f$ continuous at $x=3$?',
              options: ['0', '3', '6', '9'],
              correctOption: 2,
              hint: 'Continuity requires $k$ to equal the limit at $x=3$.',
              explanation:
                'For $x \\ne 3$, $\\frac{x^2-9}{x-3}=x+3$, so the limit at $3$ is $6$. Setting $k=6$ makes the limit equal the function value.',
              difficulty: 'medium',
            },
            {
              id: 'g12-limits-ex-6',
              type: 'numeric',
              prompt: 'Evaluate $\\lim_{x \\to 0}\\frac{\\sqrt{x+9}-3}{x}$. Give the answer as a decimal.',
              answer: 0.1667,
              tolerance: 0.001,
              hint: 'Multiply numerator and denominator by the conjugate $\\sqrt{x+9}+3$.',
              explanation:
                'Multiplying by the conjugate gives $\\frac{(x+9)-9}{x(\\sqrt{x+9}+3)}=\\frac{x}{x(\\sqrt{x+9}+3)}=\\frac{1}{\\sqrt{x+9}+3}$ for $x \\ne 0$. At $x=0$ this is $\\frac{1}{3+3}=\\frac{1}{6}\\approx 0.1667$.',
              difficulty: 'hard',
            },
          ],
          related: ['differentiation', 'integration', 'functions-and-transformations', 'polynomial-functions'],
          aliases: [
            'limits',
            'continuity',
            'one-sided limits',
            'indeterminate form',
            'limits at infinity',
            'removable discontinuity',
          ],
        },
        {
          id: 'differentiation',
          title: 'Differentiation',
          subtitle: 'Instantaneous change, tangents, and optimisation',
          introduction:
            'The derivative measures how fast a quantity changes at a single instant. Geometrically it is the slope of the tangent to a curve; physically it is velocity when position is given, or acceleration when velocity is given. The definition is a limit of average rates, and the differentiation rules turn that limit into fast algebra.',
          prerequisites: ['Limits and continuity', 'Polynomial and rational functions', 'Coordinate geometry of lines'],
          keyIdeas: [
            'The derivative is the limit of a difference quotient',
            'Power, product, quotient, and chain rules cover most combinations',
            '$f\'(x)=0$ locates stationary points',
            'The second derivative helps classify maxima and minima',
          ],
          theory: [
            {
              title: 'The derivative as a limit',
              body: [
                'For a function $f$, the average rate of change between $x$ and $x+h$ is $\\frac{f(x+h)-f(x)}{h}$. Taking the limit as $h \\to 0$ gives the instantaneous rate of change, called the derivative $f\'(x)$.',
                'The derivative is also the slope of the tangent line at the point $(x,f(x))$. If the limit exists, $f$ is differentiable at $x$. Differentiability is stronger than continuity: a differentiable function must be continuous, but a continuous function can have a corner, as $f(x)=|x|$ does at $x=0$.',
                'Notation matters. $\\frac{dy}{dx}$ emphasises that the derivative is a rate of change of $y$ with respect to $x$; $f\'(x)$ emphasises the function. Both denote the same quantity when $y=f(x)$.',
              ],
              bullets: [
                'Average rate: $\\frac{\\Delta y}{\\Delta x}=\\frac{f(x+h)-f(x)}{h}$.',
                'Instantaneous rate: $f\'(x)=\\lim_{h \\to 0}\\frac{f(x+h)-f(x)}{h}$.',
                'A derivative fails to exist at corners, cusps, and vertical tangents.',
              ],
            },
            {
              title: 'Rules for differentiation',
              body: [
                'The constant rule says the derivative of a constant is $0$. The power rule says $\\frac{d}{dx}(x^n)=nx^{n-1}$ for any constant $n$ for which the power is defined. Constant multiples and sums can be differentiated term by term.',
                'The product rule handles a product of two functions: $(fg)\'=f\'g+fg\'$. The quotient rule handles a ratio: $\\left(\\frac{f}{g}\\right)\'=\\frac{f\'g-fg\'}{g^2}$, provided $g \\ne 0$. The chain rule handles a composition: $\\frac{d}{dx}f(g(x))=f\'(g(x))g\'(x)$.',
                'A useful special case of the chain rule is a linear inner function: $\\frac{d}{dx}[f(ax+b)]=a f\'(ax+b)$. This is why differentiating $(2x+1)^3$ produces an extra factor of $2$.',
              ],
              bullets: [
                'Constant: $\\frac{d}{dx}(c)=0$.',
                'Power: $\\frac{d}{dx}(x^n)=nx^{n-1}$.',
                'Product: $(fg)\'=f\'g+fg\'$.',
                'Quotient: $\\left(\\frac{f}{g}\\right)\'=\\frac{f\'g-fg\'}{g^2}$, $g \\ne 0$.',
                'Chain: $\\frac{d}{dx}f(g(x))=f\'(g(x))g\'(x)$ — differentiate the outside, then multiply by the inside derivative.',
              ],
            },
            {
              title: 'Tangents, normals, and rates of change',
              body: [
                'The tangent to $y=f(x)$ at $x=a$ has slope $m=f\'(a)$ and equation $y-f(a)=m(x-a)$. The normal is perpendicular to the tangent, so its slope is $-\\frac{1}{m}$ when $m \\ne 0$; a horizontal tangent therefore has a vertical normal.',
                'In kinematics, if $s(t)$ is position, then velocity is $v(t)=s\'(t)$ and acceleration is $a(t)=v\'(t)=s\'\'(t)$. The units of the derivative are the units of the output divided by the units of the input, for example metres per second when position is in metres and time in seconds.',
                'More generally, if $y$ changes with $x$, then $\\frac{dy}{dx}$ is the instantaneous rate of change of $y$ per unit increase in $x$. Average rates use two points; instantaneous rates use one point and a limit.',
              ],
              bullets: [
                'Tangent slope at $a$: $m=f\'(a)$.',
                'Normal slope: $-1/f\'(a)$, provided $f\'(a) \\ne 0$.',
                'Velocity is the derivative of position; acceleration is the derivative of velocity.',
              ],
            },
            {
              title: 'Stationary points and optimisation',
              body: [
                'A stationary point occurs where $f\'(x)=0$ or where the derivative is undefined. At a local maximum or minimum of a differentiable function, the tangent is horizontal, so $f\'(x)=0$ is the first condition to solve.',
                'The second derivative test uses concavity: if $f\'(a)=0$ and $f\'\'(a)<0$, the graph is concave down and $a$ is a local maximum; if $f\'\'(a)>0$, it is a local minimum. If $f\'\'(a)=0$, the test is inconclusive and a sign chart is needed.',
                'For an applied optimisation problem, write the quantity to be optimised as a function of one variable, state its physical domain, solve $f\'=0$, and check the endpoints when the domain is closed. The result must also be checked against the problem context.',
              ],
              bullets: [
                'Solve $f\'(x)=0$ to find candidates.',
                'Use $f\'\'$ or a sign change of $f\'$ to classify them.',
                'On a closed interval, compare endpoint values as well.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-diff-first-principles',
              title: 'Derivative from first principles',
              expression: String.raw`f'(x) = \lim_{h \to 0}\frac{f(x+h)-f(x)}{h}`,
              description:
                'The derivative is the limit of the average rate of change over a shrinking interval. It gives the slope of the tangent at $x$.',
              spoken: 'f prime of x equals the limit as h approaches zero of f of x plus h minus f of x, all divided by h.',
              variables: [
                { symbol: 'f', name: 'function being differentiated' },
                { symbol: 'x', name: 'point where the derivative is evaluated' },
                { symbol: 'h', name: 'change in x', note: 'h approaches 0 but is not 0' },
              ],
              conditions: [
                'The limit must exist as a finite real number.',
                'The function must be defined on an open interval containing $x$.',
              ],
              notes:
                'The quotient is the slope of a secant line. Letting $h \\to 0$ turns the secant into the tangent.',
              tags: ['first principles', 'difference quotient', 'derivative definition', 'secant line'],
            },
            {
              id: 'g12-diff-power-rule',
              title: 'Power rule',
              expression: String.raw`\frac{d}{dx}\left(x^n\right) = n x^{n-1}`,
              description:
                'To differentiate a power of $x$, multiply by the exponent and decrease the exponent by one.',
              spoken: 'The derivative of x to the n is n times x to the n minus one.',
              variables: [
                { symbol: 'x', name: 'variable base', note: 'x in the domain of x^n' },
                { symbol: 'n', name: 'constant exponent' },
              ],
              conditions: [
                '$n$ is a constant, not a function of $x$.',
                '$x^n$ and $x^{n-1}$ must both be defined at the point being considered.',
              ],
              notes:
                'The rule also works for negative and fractional exponents where the powers are defined. It does not apply to $x^x$, whose base and exponent both vary.',
              tags: ['power rule', 'derivative', 'polynomial derivative', 'exponent'],
            },
            {
              id: 'g12-diff-product-quotient',
              title: 'Product and quotient rules',
              expression: String.raw`\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x), \qquad \frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}`,
              description:
                'The product rule differentiates a product; the quotient rule differentiates a ratio. Both require the derivatives of the component functions.',
              spoken:
                'The derivative of f times g is f prime g plus f g prime. The derivative of f over g is f prime g minus f g prime, all over g squared.',
              variables: [
                { symbol: 'f', name: 'first differentiable function' },
                { symbol: 'g', name: 'second differentiable function' },
              ],
              conditions: [
                '$f$ and $g$ must be differentiable at the point.',
                'For the quotient rule, $g(x) \\ne 0$ at the point.',
              ],
              notes:
                'In the quotient rule the numerator is $f\'g-fg\'$; reversing the order changes the sign. The product rule does not simplify to $f\'g\'$.',
              tags: ['product rule', 'quotient rule', 'derivative rules', 'rational function'],
            },
            {
              id: 'g12-diff-chain-rule',
              title: 'Chain rule',
              expression: String.raw`\frac{d}{dx}\left[f(g(x))\right] = f'(g(x))\,g'(x)`,
              description:
                'Differentiate a composition by differentiating the outer function at the inner value and multiplying by the derivative of the inner function.',
              spoken: 'The derivative of f of g of x is f prime of g of x times g prime of x.',
              variables: [
                { symbol: 'f', name: 'outer function' },
                { symbol: 'g', name: 'inner function' },
                { symbol: 'x', name: 'input variable' },
              ],
              conditions: [
                '$g$ must be differentiable at $x$.',
                '$f$ must be differentiable at $g(x)$.',
              ],
              notes:
                'For $f(u)=u^n$ and $u=g(x)$, the rule reads $\\frac{d}{dx}[g(x)]^n=n[g(x)]^{n-1}g\'(x)$ — a very common special case.',
              tags: ['chain rule', 'composite function', 'inner derivative', 'differentiation'],
            },
          ],
          examples: [
            {
              title: 'Differentiating from first principles',
              problem:
                'Use the limit definition to differentiate $f(x)=x^2$. Hence find the equation of the tangent at $x=3$.',
              given: ['Function: $f(x)=x^2$', 'Definition: $f\'(x)=\\lim_{h \\to 0}\\frac{f(x+h)-f(x)}{h}$', 'Point of tangency: $x=3$'],
              steps: [
                {
                  text: 'Substitute the function into the definition.',
                  math: String.raw`f'(x)=\lim_{h \to 0}\frac{(x+h)^2-x^2}{h}`,
                },
                {
                  text: 'Expand the square in the numerator.',
                  math: String.raw`(x+h)^2-x^2=(x^2+2xh+h^2)-x^2=2xh+h^2`,
                },
                {
                  text: 'Factor out $h$ and cancel it. This is legal because $h \\ne 0$ before the limit is taken.',
                  math: String.raw`\frac{2xh+h^2}{h}=2x+h \quad (h \ne 0)`,
                },
                {
                  text: 'Take the limit as $h \\to 0$.',
                  math: String.raw`f'(x)=\lim_{h \to 0}(2x+h)=2x`,
                },
                {
                  text: 'At $x=3$, the slope is $f\'(3)=6$ and the point is $(3,9)$.',
                  math: String.raw`y-9=6(x-3)`,
                },
                {
                  text: 'Simplify the tangent equation.',
                  math: String.raw`y=6x-9`,
                },
                {
                  text: 'The slope is measured in vertical units per horizontal unit. If $x$ and $y$ are pure numbers, the slope is unitless; the tangent line is a geometric object.',
                },
              ],
              answer: '$f\'(x)=2x$, and the tangent at $x=3$ is $y=6x-9$.',
            },
            {
              title: 'Optimising a fenced enclosure',
              problem:
                'A rectangular pen is built against a straight wall, using the wall as one side. Exactly $40$ m of fencing is available for the other three sides. What dimensions give the largest area, and what is that area?',
              given: [
                'Total fencing for three sides: $40$ m',
                'One side is the existing wall and needs no fencing',
                'Let $x$ be the length of each side perpendicular to the wall',
              ],
              steps: [
                {
                  text: 'The fencing covers two sides of length $x$ and one side parallel to the wall. Write the parallel length.',
                  math: String.raw`40-2x`,
                },
                {
                  text: 'Write the area as a function of $x$. The physical domain is $0<x<20$ so both dimensions stay positive.',
                  math: String.raw`A(x)=x(40-2x)=40x-2x^2, \quad 0<x<20`,
                },
                {
                  text: 'Differentiate to find stationary points.',
                  math: String.raw`A'(x)=40-4x`,
                },
                {
                  text: 'Set the derivative equal to zero and solve.',
                  math: String.raw`40-4x=0 \Rightarrow x=10`,
                },
                {
                  text: 'The parallel side is $40-2(10)=20$ m. Check the second derivative to confirm a maximum.',
                  math: String.raw`A''(x)=-4<0`,
                },
                {
                  text: 'Since $A\'\'$ is negative everywhere, the stationary point is a maximum. Compute the largest area.',
                  math: String.raw`A(10)=10(20)=200`,
                },
                {
                  text: 'The area is measured in square metres because both dimensions are in metres.',
                },
              ],
              answer:
                'The pen should be $10$ m deep and $20$ m long, giving a maximum area of $200\\ \\text{m}^2$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Differentiating a composite such as $(2x+1)^3$ as $3(2x+1)^2$ and forgetting the inner derivative.',
              correction:
                'The chain rule requires multiplying by the derivative of the inside: $3(2x+1)^2 \\cdot 2=6(2x+1)^2$.',
            },
            {
              mistake: 'Writing the derivative of a product as $f\'g\'$.',
              correction:
                'The product rule is $(fg)\'=f\'g+fg\'$. The derivative of a product is not the product of the derivatives.',
            },
            {
              mistake: 'Assuming every point where $f\'(x)=0$ is a maximum.',
              correction:
                'A zero derivative identifies a stationary point, which may be a maximum, a minimum, or a horizontal point of inflection. Use the second derivative or a sign chart to classify it.',
            },
            {
              mistake: 'Using the normal slope as the same value as the tangent slope.',
              correction:
                'The normal is perpendicular to the tangent, so its slope is $-1/m$ when the tangent slope $m$ is nonzero.',
            },
          ],
          exercises: [
            {
              id: 'g12-diff-ex-1',
              type: 'multiple-choice',
              prompt: 'Differentiate $f(x)=x^5$.',
              options: ['x^4', '5x^4', '5x^5', '4x^5'],
              correctOption: 1,
              hint: 'Apply the power rule: multiply by the exponent, then reduce it by one.',
              explanation:
                'By the power rule, $\\frac{d}{dx}(x^5)=5x^{5-1}=5x^4$. The coefficient is the original exponent, not the new one.',
              difficulty: 'easy',
            },
            {
              id: 'g12-diff-ex-2',
              type: 'multiple-choice',
              prompt: 'Differentiate $f(x)=(2x+1)^3$.',
              options: ['3(2x+1)^2', '6(2x+1)^2', '6(2x+1)^3', '2(2x+1)^2'],
              correctOption: 1,
              hint: 'Use the chain rule with inner function $2x+1$.',
              explanation:
                'The chain rule gives $3(2x+1)^2 \\cdot \\frac{d}{dx}(2x+1)=3(2x+1)^2 \\cdot 2=6(2x+1)^2$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-diff-ex-3',
              type: 'numeric',
              prompt: 'The function $f(x)=x^3-3x$ has two stationary points. Find the positive one.',
              answer: 1,
              tolerance: 0.001,
              hint: 'Solve $f\'(x)=0$ and choose the positive solution.',
              explanation:
                '$f\'(x)=3x^2-3=3(x-1)(x+1)$. The stationary points are $x=1$ and $x=-1$, so the positive one is $x=1$.',
              difficulty: 'easy',
            },
            {
              id: 'g12-diff-ex-4',
              type: 'numeric',
              prompt: 'Find the slope of the normal to the curve $y=x^2$ at the point where $x=-2$.',
              answer: 0.25,
              tolerance: 0.001,
              hint: 'First find the tangent slope, then take its negative reciprocal.',
              explanation:
                'The tangent slope is $\\frac{dy}{dx}=2x$, which equals $-4$ at $x=-2$. The normal slope is $-\\frac{1}{-4}=\\frac{1}{4}=0.25$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-diff-ex-5',
              type: 'multiple-choice',
              prompt: 'Differentiate $f(x)=\\frac{x^2}{x+1}$.',
              options: [
                'x(x + 2)/(x + 1)^2',
                '(x^2 + 2x)/(x + 1)',
                '2x/(x + 1)^2',
                '2x/(x + 1)',
              ],
              correctOption: 0,
              hint: 'Apply the quotient rule with numerator $x^2$ and denominator $x+1$.',
              explanation:
                'The quotient rule gives $\\frac{2x(x+1)-x^2(1)}{(x+1)^2}=\\frac{2x^2+2x-x^2}{(x+1)^2}=\\frac{x^2+2x}{(x+1)^2}=\\frac{x(x+2)}{(x+1)^2}$.',
              difficulty: 'hard',
            },
            {
              id: 'g12-diff-ex-6',
              type: 'numeric',
              prompt:
                'A particle moves along a line with position $s(t)=t^3-6t^2+9t$ metres after $t$ seconds. Find its acceleration at $t=1$ second.',
              answer: -6,
              tolerance: 0.01,
              answerUnit: 'm/s^2',
              hint: 'Differentiate position to get velocity, then differentiate again for acceleration.',
              explanation:
                '$v(t)=s\'(t)=3t^2-12t+9$ and $a(t)=v\'(t)=6t-12$. At $t=1$, $a(1)=6-12=-6$ m/s$^2$. The negative sign means the acceleration points opposite the chosen positive direction.',
              difficulty: 'hard',
            },
          ],
          related: [
            'limits-and-continuity',
            'integration',
            'polynomial-functions',
            'exponential-and-logarithmic-functions',
          ],
          aliases: [
            'derivative',
            'rate of change',
            'tangent line',
            'stationary points',
            'optimization',
            'chain rule',
            'first principles',
          ],
        },
        {
          id: 'integration',
          title: 'Integration',
          subtitle: 'Accumulating change into totals and areas',
          introduction:
            'Integration reverses differentiation and also measures accumulation. An indefinite integral describes a whole family of antiderivatives, while a definite integral produces a number: the signed area between a curve and the $x$-axis over an interval. The Fundamental Theorem of Calculus is the bridge between the two.',
          prerequisites: ['Differentiation', 'Limits and continuity', 'Area of triangles and trapeziums'],
          keyIdeas: [
            'An antiderivative differentiates back to the original function',
            'Indefinite integrals include an arbitrary constant $+C$',
            'A definite integral is a signed area, not always a geometric area',
            'The Fundamental Theorem evaluates definite integrals using antiderivatives',
          ],
          theory: [
            {
              title: 'Antiderivatives and the constant of integration',
              body: [
                'A function $F$ is an antiderivative of $f$ on an interval when $F\'(x)=f(x)$ there. Antiderivatives are not unique: adding any constant produces another function with the same derivative. The indefinite integral $\\int f(x)\\,dx$ denotes the entire family $F(x)+C$.',
                'The power rule for integration reverses the power rule for differentiation: for $n \\ne -1$, $\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$. The exception $n=-1$ produces a logarithm, because the derivative of $\\ln x$ is $1/x$.',
                'Every integration result should be checked by differentiating it. This catches sign errors, coefficient errors, and missing constants before they propagate into an area calculation.',
              ],
              bullets: [
                '$\\int x^n\\,dx=\\frac{x^{n+1}}{n+1}+C$ for $n \\ne -1$.',
                '$\\int \\frac{1}{x}\\,dx=\\ln|x|+C$ for $x \\ne 0$.',
                '$\\int e^x\\,dx=e^x+C$.',
                'Differentiate your answer to verify it.',
              ],
            },
            {
              title: 'Definite integrals and the Fundamental Theorem',
              body: [
                'The definite integral $\\int_a^b f(x)\\,dx$ is defined as a limit of sums of rectangle areas. When $f(x) \\ge 0$ on $[a,b]$, it equals the area under the graph and above the $x$-axis. When $f(x)<0$, the integral is negative, because the heights of the rectangles are negative.',
                'The Fundamental Theorem of Calculus states that if $f$ is continuous on $[a,b]$ and $F$ is any antiderivative, then $\\int_a^b f(x)\\,dx=F(b)-F(a)$. The theorem converts an infinite limiting process into two evaluations.',
                'Definite integrals are additive over adjacent intervals: $\\int_a^b f+\\int_b^c f=\\int_a^c f$. Reversing the limits changes the sign: $\\int_b^a f=-\\int_a^b f$.',
              ],
              bullets: [
                'Evaluate as $\\left[F(x)\\right]_a^b=F(b)-F(a)$; do not include $+C$ in a definite integral.',
                'Signed area below the axis is negative.',
                'Split the interval wherever the function crosses the axis when a geometric area is required.',
              ],
            },
            {
              title: 'Areas and standard integrals',
              body: [
                'To find the total geometric area between a curve and the $x$-axis, locate the zeros, integrate on each subinterval, and add the absolute values of the results. Integrating across a zero without splitting can cancel positive and negative regions.',
                'Standard integrals needed in this course include $\\int \\sin x\\,dx=-\\cos x+C$ and $\\int \\cos x\\,dx=\\sin x+C$, with angles in radians. For a linear inner function, $\\int f(ax+b)\\,dx=\\frac{1}{a}F(ax+b)+C$; this is the reverse of the chain rule.',
                'Integration also accumulates rates. If $v(t)$ is a velocity, then $\\int_a^b v(t)\\,dt$ is the displacement over $[a,b]$, while the total distance travelled is $\\int_a^b |v(t)|\\,dt$.',
              ],
              bullets: [
                'Angles in trigonometric integrals are in radians.',
                'For $\\int (ax+b)^n\\,dx$, divide by $a(n+1)$ after increasing the power.',
                'Displacement is a signed integral; distance is the integral of speed.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-int-power',
              title: 'Power rule for integration',
              expression: String.raw`\int x^n\,dx = \frac{x^{n+1}}{n+1} + C, \quad n \ne -1`,
              description:
                'Raise the power by one, divide by the new power, and add the constant of integration.',
              spoken: 'The integral of x to the n is x to the n plus one over n plus one, plus C, for n not equal to negative one.',
              variables: [
                { symbol: 'n', name: 'constant exponent', note: 'n ≠ −1' },
                { symbol: 'C', name: 'constant of integration', note: 'any real constant' },
                { symbol: 'x', name: 'variable of integration' },
              ],
              conditions: [
                '$n \\ne -1$; the case $n=-1$ gives a logarithm instead.',
                'The interval of integration must lie within a domain where $x^n$ is defined.',
              ],
              notes:
                'The rule works for fractional and negative exponents other than $-1$, provided the powers are defined on the interval.',
              tags: ['integration power rule', 'antiderivative', 'indefinite integral', 'constant of integration'],
            },
            {
              id: 'g12-int-standard',
              title: 'Reciprocal and exponential integrals',
              expression: String.raw`\int \frac{1}{x}\,dx = \ln|x| + C, \qquad \int e^x\,dx = e^x + C`,
              description:
                'The reciprocal function integrates to a natural logarithm, and the exponential function is its own antiderivative.',
              spoken: 'The integral of one over x is the natural log of the absolute value of x plus C. The integral of e to the x is e to the x plus C.',
              variables: [
                { symbol: 'x', name: 'variable of integration' },
                { symbol: 'C', name: 'constant of integration' },
              ],
              conditions: [
                'For $\\frac{1}{x}$, the interval must not contain $0$.',
                'The absolute value is required because $\\ln x$ is defined only for $x>0$.',
              ],
              notes:
                'On an interval where $x>0$, $\\ln|x|$ may be written $\\ln x$. The absolute value keeps the antiderivative valid on negative intervals too.',
              tags: ['integral of 1/x', 'natural logarithm', 'exponential integral', 'antiderivative'],
            },
            {
              id: 'g12-int-trig',
              title: 'Sine and cosine integrals',
              expression: String.raw`\int \sin x\,dx = -\cos x + C, \qquad \int \cos x\,dx = \sin x + C`,
              description:
                'The antiderivative of sine is negative cosine, and the antiderivative of cosine is sine, with angles measured in radians.',
              spoken: 'The integral of sine x is negative cosine x plus C. The integral of cosine x is sine x plus C.',
              variables: [
                { symbol: 'x', name: 'angle in radians' },
                { symbol: 'C', name: 'constant of integration' },
              ],
              conditions: ['$x$ is measured in radians.', 'The interval of integration is a real interval.'],
              notes:
                'The negative sign in the sine integral is easy to lose. Differentiate $-\\cos x$ to confirm it returns $\\sin x$.',
              tags: ['integral of sine', 'integral of cosine', 'trigonometric integral', 'radians'],
            },
            {
              id: 'g12-int-ftc',
              title: 'Fundamental Theorem of Calculus',
              expression: String.raw`\int_a^b f(x)\,dx = F(b)-F(a), \quad \text{where } F'(x)=f(x)`,
              description:
                'A definite integral is evaluated by finding any antiderivative and subtracting its values at the endpoints.',
              spoken: 'The integral from a to b of f of x dx equals F of b minus F of a, where F prime of x equals f of x.',
              variables: [
                { symbol: 'a', name: 'lower limit' },
                { symbol: 'b', name: 'upper limit', note: 'b > a is typical, but the formula works for any order' },
                { symbol: 'F', name: 'any antiderivative of f' },
              ],
              conditions: [
                '$f$ must be continuous on $[a,b]$ (or integrable with an antiderivative valid on the interval).',
                'The constant $C$ cancels in the subtraction, so it is omitted in definite integrals.',
              ],
              notes:
                'The theorem has two parts: the integral accumulates area, and differentiation recovers the integrand. Both directions express the same inverse relationship.',
              tags: ['fundamental theorem of calculus', 'definite integral', 'evaluation', 'antiderivative'],
            },
          ],
          examples: [
            {
              title: 'Evaluating a definite integral',
              problem: 'Evaluate $\\int_1^3 (2x+1)\\,dx$ and check the result geometrically.',
              given: [
                'Integrand: $f(x)=2x+1$',
                'Lower limit: $a=1$',
                'Upper limit: $b=3$',
                'The integrand is positive on $[1,3]$.',
              ],
              steps: [
                {
                  text: 'Find an antiderivative term by term.',
                  math: String.raw`F(x)=x^2+x`,
                },
                {
                  text: 'Differentiate to check the antiderivative.',
                  math: String.raw`F'(x)=2x+1=f(x)`,
                },
                {
                  text: 'Apply the Fundamental Theorem of Calculus.',
                  math: String.raw`\int_1^3(2x+1)\,dx=\left[x^2+x\right]_1^3`,
                },
                {
                  text: 'Substitute the upper and lower limits.',
                  math: String.raw`=(3^2+3)-(1^2+1)=12-2`,
                },
                {
                  text: 'Compute the value.',
                  math: String.raw`=10`,
                },
                {
                  text: 'Check geometrically: the region is a trapezium with parallel heights $f(1)=3$ and $f(3)=7$ and width $2$. Its area is $\\frac{3+7}{2}\\cdot 2=10$, which agrees.',
                },
                {
                  text: 'The value is an area measured in square units when the axes carry length units; with pure numbers, it is a dimensionless area of $10$.',
                },
              ],
              answer: '$\\int_1^3(2x+1)\\,dx=10$.',
            },
            {
              title: 'Finding area across the x-axis',
              problem:
                'Find the total geometric area between the curve $y=x^2-4$ and the $x$-axis from $x=0$ to $x=3$.',
              given: [
                'Curve: $y=x^2-4$',
                'Interval: $[0,3]$',
                'The curve crosses the $x$-axis where $x^2-4=0$.',
              ],
              steps: [
                {
                  text: 'Find the zero in the interval.',
                  math: String.raw`x^2-4=0 \Rightarrow x=2 \quad (x \ge 0)`,
                },
                {
                  text: 'Determine the sign on each subinterval. Testing $x=1$ gives $1-4=-3$, so the curve is below the axis on $[0,2]$ and above it on $[2,3]$.',
                },
                {
                  text: 'Integrate from $0$ to $2$ using the antiderivative $\\frac{x^3}{3}-4x$.',
                  math: String.raw`\int_0^2(x^2-4)\,dx=\left[\frac{x^3}{3}-4x\right]_0^2=\frac{8}{3}-8=-\frac{16}{3}`,
                },
                {
                  text: 'The negative value confirms signed area below the axis. Its geometric area is $\\frac{16}{3}$.',
                },
                {
                  text: 'Integrate from $2$ to $3$.',
                  math: String.raw`\int_2^3(x^2-4)\,dx=\left[\frac{x^3}{3}-4x\right]_2^3=-3-\left(-\frac{16}{3}\right)=\frac{7}{3}`,
                },
                {
                  text: 'Add the two positive areas, because the question asks for total geometric area.',
                  math: String.raw`A=\frac{16}{3}+\frac{7}{3}=\frac{23}{3}\approx 7.67`,
                },
                {
                  text: 'The area is measured in square units. The definite integral from $0$ to $3$ alone would be $-3$, which is a signed area, not the total geometric area.',
                },
              ],
              answer: 'The total area is $\\frac{23}{3}\\approx 7.67$ square units.',
            },
          ],
          mistakes: [
            {
              mistake: 'Omitting the constant $+C$ from an indefinite integral.',
              correction:
                'Every indefinite integral represents a family of antiderivatives, so the arbitrary constant is part of the answer: $\\int 3x^2\\,dx=x^3+C$.',
            },
            {
              mistake: 'Applying the power rule to $\\int \\frac{1}{x}\\,dx$ and obtaining $\\frac{x^0}{0}$.',
              correction:
                'The power rule excludes $n=-1$ because division by zero occurs. The correct antiderivative is $\\ln|x|+C$.',
            },
            {
              mistake: 'Integrating across a zero of the function and reporting the signed result as the geometric area.',
              correction:
                'A definite integral counts area below the axis as negative. For total geometric area, split at every zero and add the absolute values of the pieces.',
            },
            {
              mistake: 'Evaluating a definite integral as $F(b)$ only, without subtracting $F(a)$.',
              correction:
                'The Fundamental Theorem requires $F(b)-F(a)$. Forgetting the lower limit changes the value completely.',
            },
          ],
          exercises: [
            {
              id: 'g12-int-ex-1',
              type: 'multiple-choice',
              prompt: 'Find $\\int 3x^2\\,dx$.',
              options: ['x^3', 'x^3 + C', '3x^3 + C', '6x + C'],
              correctOption: 1,
              hint: 'Raise the power by one and divide by the new power, then add the constant.',
              explanation:
                'The power rule gives $\\int 3x^2\\,dx=3\\cdot\\frac{x^3}{3}+C=x^3+C$. Including $+C$ is required for an indefinite integral.',
              difficulty: 'easy',
            },
            {
              id: 'g12-int-ex-2',
              type: 'multiple-choice',
              prompt: 'Evaluate $\\int_0^2(3x^2+1)\\,dx$.',
              options: ['6', '8', '10', '12'],
              correctOption: 2,
              hint: 'The antiderivative is $x^3+x$.',
              explanation:
                '$\\int_0^2(3x^2+1)\\,dx=\\left[x^3+x\\right]_0^2=(8+2)-(0+0)=10$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-int-ex-3',
              type: 'numeric',
              prompt: 'Evaluate $\\int_1^2\\frac{1}{x}\\,dx$. Give a decimal approximation.',
              answer: 0.6931,
              tolerance: 0.001,
              hint: 'The antiderivative is $\\ln|x|$.',
              explanation:
                '$\\int_1^2\\frac{1}{x}\\,dx=\\left[\\ln|x|\\right]_1^2=\\ln 2-\\ln 1=\\ln 2\\approx 0.6931$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-int-ex-4',
              type: 'numeric',
              prompt: 'Evaluate $\\int_0^{\\pi}\\sin x\\,dx$.',
              answer: 2,
              tolerance: 0.001,
              hint: 'The antiderivative of $\\sin x$ is $-\\cos x$.',
              explanation:
                '$\\int_0^{\\pi}\\sin x\\,dx=\\left[-\\cos x\\right]_0^{\\pi}=-\\cos\\pi+\\cos 0=-(-1)+1=2$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-int-ex-5',
              type: 'multiple-choice',
              prompt: 'Find the area between $y=x^2$ and the $x$-axis from $x=-1$ to $x=2$.',
              options: ['3', '8/3', '3/2', '9/2'],
              correctOption: 0,
              hint: 'The curve is non-negative on the whole interval, so the area equals the definite integral.',
              explanation:
                '$\\int_{-1}^2 x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_{-1}^2=\\frac{8}{3}-\\left(-\\frac{1}{3}\\right)=\\frac{9}{3}=3$.',
              difficulty: 'hard',
            },
            {
              id: 'g12-int-ex-6',
              type: 'numeric',
              prompt: 'Evaluate $\\int_0^1(2x+1)^3\\,dx$.',
              answer: 10,
              tolerance: 0.01,
              hint: 'The antiderivative of $(2x+1)^3$ is $\\frac{(2x+1)^4}{8}$.',
              explanation:
                'Since $\\frac{d}{dx}\\frac{(2x+1)^4}{8}=\\frac{4(2x+1)^3\\cdot 2}{8}=(2x+1)^3$, the integral is $\\left[\\frac{(2x+1)^4}{8}\\right]_0^1=\\frac{81-1}{8}=10$.',
              difficulty: 'hard',
            },
          ],
          related: [
            'differentiation',
            'limits-and-continuity',
            'exponential-and-logarithmic-functions',
            'polynomial-functions',
          ],
          aliases: [
            'integral',
            'antiderivative',
            'area under a curve',
            'definite integral',
            'fundamental theorem of calculus',
            'indefinite integral',
          ],
        },
      ],
    },
    {
      id: 'algebra',
      family: 'algebra',
      title: 'Algebra & Discrete Mathematics',
      description:
        'Complex numbers extend the real line into a plane, the binomial theorem expands powers without repeated multiplication, and counting techniques organise arrangements and selections.',
      theorems: [
        {
          title: 'Binomial theorem',
          statement:
            'For every positive integer $n$ and real or complex numbers $a$ and $b$, $(a+b)^n=\\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^r$, where $\\binom{n}{r}=\\frac{n!}{r!(n-r)!}$.',
          note: 'The expansion has $n+1$ terms, and the coefficients are symmetric: $\\binom{n}{r}=\\binom{n}{n-r}$.',
        },
        {
          title: "De Moivre's theorem",
          statement:
            'For every integer $n$ and every real angle $\\theta$, $(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$.',
          note: 'The theorem is most often used with polar form $z=r(\\cos\\theta+i\\sin\\theta)$, giving $z^n=r^n(\\cos n\\theta+i\\sin n\\theta)$.',
        },
        {
          title: 'Fundamental counting principle',
          statement:
            'If one choice can be made in $m$ ways and a second independent choice in $n$ ways, then the pair of choices can be made in $mn$ ways. The principle extends to any finite number of stages.',
          note: 'This principle underlies the formulas for permutations and combinations.',
        },
      ],
      topics: [
        {
          id: 'complex-numbers',
          title: 'Complex Numbers',
          subtitle: 'Extending the number line into a plane',
          introduction:
            'The equation $x^2=-1$ has no real solution, so mathematicians introduce the imaginary unit $i$ with $i^2=-1$. Numbers of the form $a+bi$ combine a real part and an imaginary part. They can be added like vectors, multiplied algebraically, and represented as points in the Argand plane, where angle and distance reveal a powerful polar structure.',
          prerequisites: ['Real numbers and surds', 'Quadratic equations and the discriminant', 'Right-triangle trigonometry'],
          keyIdeas: [
            '$i^2=-1$, and powers of $i$ repeat with period four',
            'The conjugate flips the sign of the imaginary part and enables division',
            'Modulus is distance from the origin; argument is angle from the positive real axis',
            'De Moivre converts powers into angle multiples',
          ],
          theory: [
            {
              title: 'The imaginary unit and arithmetic',
              body: [
                'A complex number has the form $z=a+bi$, where $a$ and $b$ are real numbers and $i^2=-1$. The real part is $a$, written $\\operatorname{Re}(z)$, and the imaginary part is $b$, written $\\operatorname{Im}(z)$. Two complex numbers are equal exactly when their real parts and imaginary parts are equal separately.',
                'Addition and subtraction act component by component: $(a+bi)\\pm(c+di)=(a\\pm c)+(b\\pm d)i$. Multiplication uses the distributive law and then replaces $i^2$ by $-1$: $(a+bi)(c+di)=ac+adi+bci+bdi^2=(ac-bd)+(ad+bc)i$.',
                'The conjugate of $z=a+bi$ is $\\overline{z}=a-bi$. Multiplying a complex number by its conjugate produces the real number $z\\overline{z}=a^2+b^2$. Division is performed by multiplying numerator and denominator by the conjugate of the denominator, which makes the denominator real.',
                'Powers of $i$ cycle: $i^1=i$, $i^2=-1$, $i^3=-i$, $i^4=1$, and then the pattern repeats. For a large exponent, divide by $4$ and use the remainder.',
              ],
              bullets: [
                '$i^2=-1$ and $i^4=1$.',
                'Conjugate: $\\overline{a+bi}=a-bi$.',
                'Product with conjugate: $(a+bi)(a-bi)=a^2+b^2$.',
                'Division: multiply by the conjugate of the denominator.',
              ],
            },
            {
              title: 'The Argand plane, modulus, and argument',
              body: [
                'A complex number $z=a+bi$ is represented by the point $(a,b)$ in the Argand plane, with the real part on the horizontal axis and the imaginary part on the vertical axis. This representation turns complex addition into vector addition.',
                'The modulus is the distance from the origin: $|z|=\\sqrt{a^2+b^2}$. It is never negative and is zero only for $z=0$. The argument $\\arg z$ is the angle $\\theta$ from the positive real axis to the vector $(a,b)$, measured anticlockwise. The argument is not unique: adding any integer multiple of $360^{\\circ}$ gives the same direction, so a principal value is usually chosen in $(-180^{\\circ},180^{\\circ}]$ or $[0^{\\circ},360^{\\circ})$.',
                'In polar form, $z=r(\\cos\\theta+i\\sin\\theta)$ where $r=|z|$ and $\\theta=\\arg z$. Multiplying two complex numbers multiplies their moduli and adds their arguments; dividing divides the moduli and subtracts the arguments. This geometric reading explains why complex multiplication rotates and scales.',
              ],
              bullets: [
                'Plot $a+bi$ at $(a,b)$.',
                'Modulus: $r=\\sqrt{a^2+b^2}$.',
                'Argument: $\\tan\\theta=b/a$, adjusted for the quadrant.',
                'Polar form: $z=r(\\cos\\theta+i\\sin\\theta)$.',
              ],
            },
            {
              title: 'De Moivre, powers, and quadratic roots',
              body: [
                "De Moivre's theorem states that $(\\cos\\theta+i\\sin\\theta)^n=\\cos(n\\theta)+i\\sin(n\\theta)$ for every integer $n$. For a general complex number in polar form, this becomes $[r(\\cos\\theta+i\\sin\\theta)]^n=r^n(\\cos n\\theta+i\\sin n\\theta)$. Powers are therefore easiest in polar form, while addition is easiest in rectangular form.",
                'For a quadratic equation with real coefficients, a negative discriminant produces a conjugate pair of complex roots. If $ax^2+bx+c=0$ has $b^2-4ac<0$, then the roots are $\\frac{-b\\pm i\\sqrt{4ac-b^2}}{2a}$. The two roots are conjugates, and their sum is $-b/a$ while their product is $c/a$, just as in the real case.',
                'Roots of complex numbers can also be found with De Moivre by adding multiples of $360^{\\circ}$ to the argument before dividing. This course focuses on powers, but the same polar reasoning extends to roots.',
              ],
              bullets: [
                'De Moivre: $(\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta$.',
                'General power: $z^n=r^n(\\cos n\\theta+i\\sin n\\theta)$.',
                'A real quadratic with negative discriminant has a conjugate pair of complex roots.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-complex-imaginary-unit',
              title: 'The imaginary unit',
              expression: String.raw`i^2 = -1`,
              description:
                'The imaginary unit $i$ is defined so that its square is negative one. This single relation generates the complex number system.',
              spoken: 'i squared equals negative one.',
              variables: [{ symbol: 'i', name: 'imaginary unit' }],
              conditions: ['$i$ is not a real number.', 'Powers of $i$ reduce using $i^2=-1$.'],
              notes:
                'The powers repeat in a cycle of four: $i, -1, -i, 1$. Divide the exponent by $4$ and use the remainder.',
              tags: ['imaginary unit', 'i squared', 'complex numbers', 'imaginary number'],
            },
            {
              id: 'g12-complex-modulus',
              title: 'Modulus of a complex number',
              expression: String.raw`|z| = \sqrt{a^2+b^2}, \quad z=a+bi`,
              description:
                'The modulus is the distance from the origin to the point $(a,b)$ in the Argand plane.',
              spoken: 'The modulus of z equals the square root of a squared plus b squared.',
              variables: [
                { symbol: 'z', name: 'complex number', note: 'z = a + bi' },
                { symbol: 'a', name: 'real part' },
                { symbol: 'b', name: 'imaginary part' },
              ],
              conditions: ['$a$ and $b$ are real numbers.', '$|z| \\ge 0$, with equality only when $z=0$.'],
              notes:
                'The modulus generalises absolute value. It satisfies $|z_1z_2|=|z_1||z_2|$ and $|z_1/z_2|=|z_1|/|z_2|$ when $z_2 \\ne 0$.',
              tags: ['modulus', 'absolute value', 'Argand plane', 'distance from origin'],
            },
            {
              id: 'g12-complex-polar',
              title: 'Polar form',
              expression: String.raw`z = r(\cos\theta + i\sin\theta), \quad r=|z|, \quad \theta=\arg z`,
              description:
                'Polar form records a complex number by its distance from the origin and its angle from the positive real axis.',
              spoken: 'z equals r times the quantity cosine theta plus i sine theta, where r is the modulus and theta is the argument.',
              variables: [
                { symbol: 'r', name: 'modulus', note: 'r ≥ 0' },
                { symbol: 'θ', name: 'argument', note: 'angle in degrees or radians' },
                { symbol: 'z', name: 'complex number' },
              ],
              conditions: [
                '$r=|z|$ and $\\theta$ is an angle whose cosine and sine match the direction of $(a,b)$.',
                'The argument is defined up to addition of multiples of $360^{\\circ}$ (or $2\\pi$ radians).',
              ],
              notes:
                'To convert, $a=r\\cos\\theta$ and $b=r\\sin\\theta$. Multiplying in polar form multiplies moduli and adds arguments.',
              tags: ['polar form', 'modulus-argument form', 'argument', 'trigonometric form'],
            },
            {
              id: 'g12-complex-demoivre',
              title: "De Moivre's theorem",
              expression: String.raw`\left[r(\cos\theta + i\sin\theta)\right]^n = r^n\left(\cos n\theta + i\sin n\theta\right)`,
              description:
                'A complex number in polar form is raised to an integer power by raising the modulus to that power and multiplying the angle by that power.',
              spoken:
                'r times cosine theta plus i sine theta, all to the n, equals r to the n times cosine n theta plus i sine n theta.',
              variables: [
                { symbol: 'r', name: 'modulus', note: 'r ≥ 0' },
                { symbol: 'θ', name: 'argument' },
                { symbol: 'n', name: 'integer exponent' },
              ],
              conditions: ['$n$ is an integer.', '$\\theta$ is measured in the same angular unit throughout.'],
              notes:
                'For negative powers, the theorem still applies and produces the reciprocal power. The modulus becomes $r^n$, which is positive because $r \\ge 0$.',
              tags: ['De Moivre theorem', 'powers of complex numbers', 'polar form', 'angle multiple'],
            },
          ],
          examples: [
            {
              title: 'Polar form and a power by De Moivre',
              problem: 'Write $z=1+i\\sqrt{3}$ in polar form and use De Moivre\'s theorem to compute $z^3$.',
              given: ['Complex number: $z=1+i\\sqrt{3}$', 'Real part: $a=1$', 'Imaginary part: $b=\\sqrt{3}$'],
              steps: [
                {
                  text: 'Compute the modulus.',
                  math: String.raw`r=\sqrt{1^2+(\sqrt{3})^2}=\sqrt{1+3}=2`,
                },
                {
                  text: 'Compute the argument. The point $(1,\\sqrt{3})$ lies in the first quadrant.',
                  math: String.raw`\tan\theta=\frac{\sqrt{3}}{1}=\sqrt{3} \Rightarrow \theta=60^{\circ}`,
                },
                {
                  text: 'Write the polar form.',
                  math: String.raw`z=2(\cos 60^{\circ}+i\sin 60^{\circ})`,
                },
                {
                  text: 'Apply De Moivre with $n=3$: raise the modulus to the third power and triple the angle.',
                  math: String.raw`z^3=2^3(\cos 180^{\circ}+i\sin 180^{\circ})`,
                },
                {
                  text: 'Evaluate the trigonometric values.',
                  math: String.raw`z^3=8(-1+0i)=-8`,
                },
                {
                  text: 'Check directly: $(1+i\\sqrt{3})^2=-2+2i\\sqrt{3}$, and multiplying by $1+i\\sqrt{3}$ gives $-2-6=-8$. The results agree.',
                },
                {
                  text: 'The modulus is a distance and has no units. The argument is an angle, measured here in degrees.',
                },
              ],
              answer: '$z=2(\\cos 60^{\\circ}+i\\sin 60^{\\circ})$ and $z^3=-8$.',
            },
            {
              title: 'A quadratic with complex roots',
              problem: 'Solve $x^2+4x+13=0$ over the complex numbers.',
              given: ['Quadratic: $x^2+4x+13=0$', 'Coefficients: $a=1$, $b=4$, $c=13$'],
              steps: [
                {
                  text: 'Compute the discriminant.',
                  math: String.raw`b^2-4ac=4^2-4(1)(13)=16-52=-36`,
                },
                {
                  text: 'A negative discriminant gives a conjugate pair of complex roots. Write the square root of $-36$ using $i$.',
                  math: String.raw`\sqrt{-36}=6i`,
                },
                {
                  text: 'Apply the quadratic formula.',
                  math: String.raw`x=\frac{-4\pm 6i}{2}`,
                },
                {
                  text: 'Simplify by dividing both terms by $2$.',
                  math: String.raw`x=-2\pm 3i`,
                },
                {
                  text: 'Check the sum and product: $(-2+3i)+(-2-3i)=-4=-b/a$, and $(-2+3i)(-2-3i)=4+9=13=c/a$.',
                },
                {
                  text: 'The roots are complex numbers, so there are no real solutions. There are no units.',
                },
              ],
              answer: '$x=-2+3i$ or $x=-2-3i$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using $i^2=1$ instead of $i^2=-1$.',
              correction:
                'The defining relation is $i^2=-1$. Every simplification of a power of $i$ depends on this negative sign.',
            },
            {
              mistake: 'Taking $\\theta=\\arctan(b/a)$ without checking the quadrant.',
              correction:
                'The arctangent function returns only part of the angle range. Plot $(a,b)$ and adjust the angle so that both $\\cos\\theta$ and $\\sin\\theta$ have the correct signs.',
            },
            {
              mistake: 'Applying De Moivre as $(r\\cos\\theta+i\\sin\\theta)^n=r(\\cos n\\theta+i\\sin n\\theta)$ and leaving the modulus unchanged.',
              correction:
                'The modulus is also raised to the power: the correct result is $r^n(\\cos n\\theta+i\\sin n\\theta)$.',
            },
            {
              mistake: 'Writing $\\sqrt{-36}=-6$ and losing the imaginary unit.',
              correction:
                '$\\sqrt{-36}=6i$, because $36i^2=-36$. The quadratic formula already supplies the $\\pm$ symbol, so the two roots come from $\\pm 6i$.',
            },
          ],
          exercises: [
            {
              id: 'g12-complex-ex-1',
              type: 'multiple-choice',
              prompt: 'Simplify $i^3$.',
              options: ['i', '-i', '1', '-1'],
              correctOption: 1,
              hint: 'Use $i^3=i^2\\cdot i$ and replace $i^2$ by $-1$.',
              explanation:
                '$i^3=i^2\\cdot i=(-1)i=-i$. The powers of $i$ cycle $i,-1,-i,1$.',
              difficulty: 'easy',
            },
            {
              id: 'g12-complex-ex-2',
              type: 'multiple-choice',
              prompt: 'Compute $(2+3i)+(4-i)$.',
              options: ['6 + 2i', '6 + 4i', '8 + 2i', '6 - 2i'],
              correctOption: 0,
              hint: 'Add real parts together and imaginary parts together.',
              explanation:
                'Real parts: $2+4=6$. Imaginary parts: $3i-i=2i$. The sum is $6+2i$.',
              difficulty: 'easy',
            },
            {
              id: 'g12-complex-ex-3',
              type: 'numeric',
              prompt: 'Find $|3-4i|$.',
              answer: 5,
              tolerance: 0.001,
              hint: 'Use the modulus formula with $a=3$ and $b=-4$.',
              explanation:
                '$|3-4i|=\\sqrt{3^2+(-4)^2}=\\sqrt{9+16}=\\sqrt{25}=5$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-complex-ex-4',
              type: 'multiple-choice',
              prompt: 'Compute $(1+i)^2$.',
              options: ['2i', '2', '1 + 2i', '0'],
              correctOption: 0,
              hint: 'Expand and use $i^2=-1$.',
              explanation:
                '$(1+i)^2=1+2i+i^2=1+2i-1=2i$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-complex-ex-5',
              type: 'numeric',
              prompt:
                'Let $z=2(\\cos 30^{\\circ}+i\\sin 30^{\\circ})$. Find the imaginary part of $z^3$.',
              answer: 8,
              tolerance: 0.01,
              hint: 'Use De Moivre before expanding anything.',
              explanation:
                '$z^3=2^3(\\cos 90^{\\circ}+i\\sin 90^{\\circ})=8(0+i)=8i$. The imaginary part is $8$.',
              difficulty: 'hard',
            },
            {
              id: 'g12-complex-ex-6',
              type: 'multiple-choice',
              prompt: 'Solve $x^2-2x+5=0$ over the complex numbers.',
              options: ['x = 1 ± 2i', 'x = -1 ± 2i', 'x = 2 ± i', 'x = 1 ± 4i'],
              correctOption: 0,
              hint: 'The discriminant is $4-20=-16$.',
              explanation:
                'The discriminant is $(-2)^2-4(1)(5)=4-20=-16$, so $\\sqrt{-16}=4i$. The quadratic formula gives $x=\\frac{2\\pm 4i}{2}=1\\pm 2i$.',
              difficulty: 'hard',
            },
          ],
          related: [
            'quadratic-equations',
            'unit-circle-trigonometry',
            'vectors-in-two-dimensions',
            'polynomial-functions',
          ],
          aliases: [
            'imaginary numbers',
            'Argand diagram',
            'Argand plane',
            'modulus argument form',
            'De Moivre',
            'complex plane',
          ],
        },
        {
          id: 'binomial-theorem',
          title: 'The Binomial Theorem',
          subtitle: 'Expanding powers without multiplying repeatedly',
          introduction:
            'Expanding $(a+b)^{10}$ by repeated multiplication is slow and error-prone. The binomial theorem gives each term directly: the powers of $a$ fall, the powers of $b$ rise, and the coefficients are the binomial coefficients. The same coefficients appear in Pascal\'s triangle and in counting problems.',
          prerequisites: ["Polynomial multiplication", 'Factorial notation and combinations', "Pascal's triangle patterns"],
          keyIdeas: [
            'The expansion of $(a+b)^n$ has $n+1$ terms',
            'The coefficient of $a^{n-r}b^r$ is $\\binom{n}{r}$',
            'The term with $b^r$ is term number $r+1$',
            'Signs follow the power of the second term',
          ],
          theory: [
            {
              title: 'Patterns in binomial expansions',
              body: [
                'Small expansions reveal the pattern. $(a+b)^2=a^2+2ab+b^2$, $(a+b)^3=a^3+3a^2b+3ab^2+b^3$, and $(a+b)^4=a^4+4a^3b+6a^2b^2+4ab^3+b^4$. In each case the powers of $a$ decrease from $n$ to $0$, the powers of $b$ increase from $0$ to $n$, and every term has total degree $n$.',
                'The coefficients form rows of Pascal\'s triangle: row $n$ begins and ends with $1$, and each interior entry is the sum of the two entries above it. Row $4$ is $1,4,6,4,1$. The symmetry reflects the fact that choosing $r$ factors of $b$ is the same as choosing $n-r$ factors of $a$.',
                'The expansion is valid for a positive integer exponent $n$. This course does not use the infinite series that arises when the exponent is not a positive integer.',
              ],
              bullets: [
                'Powers of $a$ decrease; powers of $b$ increase.',
                'Every term has degree $n$.',
                'Pascal rows give the coefficients for small $n$.',
              ],
            },
            {
              title: 'The theorem and the general term',
              body: [
                'The binomial theorem states that $(a+b)^n=\\sum_{r=0}^{n}\\binom{n}{r}a^{n-r}b^r$, where $\\binom{n}{r}=\\frac{n!}{r!(n-r)!}$ and $n$ is a positive integer. The index $r$ counts how many factors of $b$ are chosen.',
                'The general term is $T_{r+1}=\\binom{n}{r}a^{n-r}b^r$. The subscript is $r+1$ because $r=0$ gives the first term, $r=1$ gives the second, and so on. Confusing $T_r$ with $T_{r+1}$ shifts every coefficient by one position.',
                'The binomial coefficients can also be built recursively with Pascal\'s rule, $\\binom{n}{r}=\\binom{n-1}{r-1}+\\binom{n-1}{r}$, with boundary values $\\binom{n}{0}=\\binom{n}{n}=1$.',
              ],
              bullets: [
                'General term: $T_{r+1}=\\binom{n}{r}a^{n-r}b^r$.',
                'The exponent of $b$ is $r$; the exponent of $a$ is $n-r$.',
                '$\\binom{n}{0}=\\binom{n}{n}=1$.',
              ],
            },
            {
              title: 'Finding a particular term or coefficient',
              body: [
                'To find the term containing a specific power of $x$, write the general term, simplify the powers of $x$, and solve the resulting exponent equation for $r$. The solution must be an integer between $0$ and $n$; otherwise no such term exists.',
                'When $a$ or $b$ has a coefficient, include that coefficient with its exponent. For example, in $(2x+3)^4$, the term with $r=1$ contains $(2x)^3$ and $3^1$, so the coefficient is $\\binom{4}{1}2^3\\cdot 3$, not merely $\\binom{4}{1}$.',
                'When the second term is negative, its sign contributes $(-1)^r$. For a constant term, set the total exponent of $x$ to $0$ and solve. Check the result by substituting a simple value of $x$ into the original expression when a full expansion is available.',
              ],
              bullets: [
                'Simplify the general term before solving for $r$.',
                'Include coefficients inside powers such as $(2x)^k$.',
                'A negative second term contributes a factor $(-1)^r$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-binomial-theorem',
              title: 'Binomial theorem',
              expression: String.raw`(a+b)^n = \sum_{r=0}^{n}\binom{n}{r}a^{n-r}b^r`,
              description:
                'A binomial raised to a positive integer power expands into $n+1$ terms whose coefficients are binomial coefficients.',
              spoken:
                'a plus b, all to the n, equals the sum from r equals zero to n of n choose r times a to the n minus r times b to the r.',
              variables: [
                { symbol: 'a', name: 'first term of the binomial' },
                { symbol: 'b', name: 'second term of the binomial' },
                { symbol: 'n', name: 'positive integer exponent' },
                { symbol: 'r', name: 'term index', note: '0 ≤ r ≤ n' },
              ],
              conditions: [
                '$n$ is a positive integer.',
                '$a$ and $b$ may be real or complex expressions.',
                'The expansion terminates after $n+1$ terms.',
              ],
              notes:
                'The coefficient $\\binom{n}{r}$ counts the number of ways to choose $r$ factors of $b$ from $n$ factors. This is why the binomial theorem and combinations are the same idea.',
              tags: ['binomial theorem', 'binomial expansion', 'binomial coefficients', 'powers of a binomial'],
            },
            {
              id: 'g12-binomial-coefficient',
              title: 'Binomial coefficient',
              expression: String.raw`\binom{n}{r} = \frac{n!}{r!(n-r)!}, \quad 0 \le r \le n`,
              description:
                'The binomial coefficient counts the number of ways to choose $r$ objects from $n$ distinct objects when order does not matter.',
              spoken: 'n choose r equals n factorial divided by r factorial times n minus r factorial.',
              variables: [
                { symbol: 'n', name: 'total number of factors', note: 'non-negative integer' },
                { symbol: 'r', name: 'number chosen', note: '0 ≤ r ≤ n' },
              ],
              conditions: [
                '$n$ and $r$ are integers with $0 \\le r \\le n$.',
                '$0!=1$ by convention.',
              ],
              notes:
                'Symmetry: $\\binom{n}{r}=\\binom{n}{n-r}$. Also $\\binom{n}{0}=\\binom{n}{n}=1$ and $\\binom{n}{1}=n$.',
              tags: ['binomial coefficient', 'n choose r', 'combinations', 'factorial'],
            },
            {
              id: 'g12-binomial-general-term',
              title: 'General term',
              expression: String.raw`T_{r+1} = \binom{n}{r}a^{n-r}b^r`,
              description:
                'The term containing $b^r$ is term number $r+1$ in the expansion, with coefficient $\\binom{n}{r}$ and power $a^{n-r}$.',
              spoken: 'T sub r plus one equals n choose r times a to the n minus r times b to the r.',
              variables: [
                { symbol: 'T_{r+1}', name: 'term number r + 1' },
                { symbol: 'r', name: 'power of b', note: '0 ≤ r ≤ n' },
                { symbol: 'n', name: 'positive integer exponent' },
              ],
              conditions: ['$n$ is a positive integer and $0 \\le r \\le n$.'],
              notes:
                'The subscript is one more than the exponent of $b$. Verify the first term by setting $r=0$: $T_1=a^n$.',
              tags: ['general term', 'binomial term', 'specific term', 'coefficient'],
            },
            {
              id: 'g12-binomial-pascal',
              title: "Pascal's rule",
              expression: String.raw`\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}`,
              description:
                'Each interior binomial coefficient is the sum of the two coefficients directly above it in Pascal\'s triangle.',
              spoken: 'n choose r equals n minus one choose r minus one plus n minus one choose r.',
              variables: [
                { symbol: 'n', name: 'row number', note: 'positive integer' },
                { symbol: 'r', name: 'position in the row', note: '1 ≤ r ≤ n − 1' },
              ],
              conditions: ['$1 \\le r \\le n-1$; the boundary coefficients are $1$.'],
              notes:
                'The rule follows by splitting the choices into those that include a particular object and those that do not.',
              tags: ['Pascal rule', 'Pascal triangle', 'recurrence', 'binomial identity'],
            },
          ],
          examples: [
            {
              title: 'Expanding a binomial with a leading coefficient',
              problem: 'Expand $(2x+3)^4$ using the binomial theorem.',
              given: ['Binomial: $(2x+3)^4$', 'Exponent: $n=4$', 'Terms: $a=2x$, $b=3$'],
              steps: [
                {
                  text: 'Write the general term with $a=2x$ and $b=3$.',
                  math: String.raw`T_{r+1}=\binom{4}{r}(2x)^{4-r}3^r`,
                },
                {
                  text: 'Generate the five terms, starting with $r=0$.',
                  math: String.raw`r=0:\ \binom{4}{0}(2x)^4 3^0=16x^4`,
                },
                {
                  text: 'For $r=1$, include the coefficient inside the power.',
                  math: String.raw`r=1:\ \binom{4}{1}(2x)^3 3^1=4\cdot 8x^3\cdot 3=96x^3`,
                },
                {
                  text: 'Continue with $r=2$ and $r=3$.',
                  math: String.raw`r=2:\ 6(2x)^2 3^2=6\cdot 4x^2\cdot 9=216x^2,\quad r=3:\ 4(2x)3^3=216x`,
                },
                {
                  text: 'The final term is the constant term.',
                  math: String.raw`r=4:\ 3^4=81`,
                },
                {
                  text: 'Add the terms in descending powers.',
                  math: String.raw`(2x+3)^4=16x^4+96x^3+216x^2+216x+81`,
                },
                {
                  text: 'Check by substituting $x=1$: the original is $5^4=625$, and the expansion gives $16+96+216+216+81=625$. The coefficients are pure numbers, so there are no units.',
                },
              ],
              answer: '$(2x+3)^4=16x^4+96x^3+216x^2+216x+81$.',
            },
            {
              title: 'Finding a constant term',
              problem: 'Find the constant term in the expansion of $\\left(x+\\frac{2}{x^2}\\right)^9$.',
              given: ['Binomial: $\\left(x+\\frac{2}{x^2}\\right)^9$', 'Exponent: $n=9$', 'Constant term means the power of $x$ is $0$.'],
              steps: [
                {
                  text: 'Write the general term. The second term is $2x^{-2}$, so its power contributes $x^{-2r}$.',
                  math: String.raw`T_{r+1}=\binom{9}{r}x^{9-r}\left(2x^{-2}\right)^r`,
                },
                {
                  text: 'Simplify the powers of $x$ and the numerical factor.',
                  math: String.raw`T_{r+1}=\binom{9}{r}2^r x^{9-r-2r}=\binom{9}{r}2^r x^{9-3r}`,
                },
                {
                  text: 'Set the exponent of $x$ equal to zero for the constant term.',
                  math: String.raw`9-3r=0 \Rightarrow r=3`,
                },
                {
                  text: 'The value $r=3$ is an integer between $0$ and $9$, so the term exists. Compute the coefficient.',
                  math: String.raw`\binom{9}{3}=\frac{9!}{3!6!}=84`,
                },
                {
                  text: 'Include the power of $2$.',
                  math: String.raw`84\cdot 2^3=84\cdot 8=672`,
                },
                {
                  text: 'The constant term is a pure number and has no units.',
                },
              ],
              answer: 'The constant term is $672$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Calling the term containing $b^r$ the $r$-th term instead of the $(r+1)$-th term.',
              correction:
                'The index starts at $r=0$, so $T_{r+1}=\\binom{n}{r}a^{n-r}b^r$. The first term is $T_1$, obtained from $r=0$.',
            },
            {
              mistake: 'Writing the coefficient of $(2x)^3$ as $2$ or as $8^3$ rather than $2^3=8$.',
              correction:
                'The whole factor is cubed: $(2x)^3=2^3x^3=8x^3$. Apply the exponent to both the coefficient and the variable.',
            },
            {
              mistake: 'Dropping the sign when the second term is negative.',
              correction:
                'The term with $b^r$ carries a factor $(-1)^r$ when $b$ is negative. Odd powers contribute a negative sign and even powers a positive sign.',
            },
            {
              mistake: 'Setting the exponent of $x$ equal to the requested power but forgetting to check that the resulting $r$ is an integer in range.',
              correction:
                'After solving for $r$, verify that $r$ is a whole number with $0 \\le r \\le n$. If not, the requested term does not exist.',
            },
          ],
          exercises: [
            {
              id: 'g12-binomial-ex-1',
              type: 'multiple-choice',
              prompt: 'Evaluate $\\binom{7}{3}$.',
              options: ['21', '35', '42', '120'],
              correctOption: 1,
              hint: 'Use $\\binom{7}{3}=\\frac{7!}{3!4!}$.',
              explanation:
                '$\\binom{7}{3}=\\frac{7\\cdot 6\\cdot 5}{3\\cdot 2\\cdot 1}=35$.',
              difficulty: 'easy',
            },
            {
              id: 'g12-binomial-ex-2',
              type: 'multiple-choice',
              prompt: 'Find the coefficient of $x^2$ in the expansion of $(x+3)^4$.',
              options: ['6', '36', '54', '81'],
              correctOption: 2,
              hint: 'The $x^2$ term comes from $r=2$: $\\binom{4}{2}x^2 3^2$.',
              explanation:
                'For $r=2$, the term is $\\binom{4}{2}x^2(3)^2=6\\cdot 9x^2=54x^2$. The coefficient is $54$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-binomial-ex-3',
              type: 'numeric',
              prompt: 'Find the coefficient of $x^5$ in the expansion of $(1+2x)^6$.',
              answer: 192,
              tolerance: 0.01,
              hint: 'The $x^5$ term has $(2x)^5$, so $r=5$.',
              explanation:
                '$\\binom{6}{5}(2x)^5=6\\cdot 32x^5=192x^5$. The coefficient is $192$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-binomial-ex-4',
              type: 'numeric',
              prompt: 'Find the constant term in the expansion of $\\left(x+\\frac{1}{x}\\right)^6$.',
              answer: 20,
              tolerance: 0.01,
              hint: 'Write the general term as $\\binom{6}{r}x^{6-r}x^{-r}$.',
              explanation:
                'The general term is $\\binom{6}{r}x^{6-2r}$. The constant term has $6-2r=0$, so $r=3$, and $\\binom{6}{3}=20$.',
              difficulty: 'medium',
            },
            {
              id: 'g12-binomial-ex-5',
              type: 'multiple-choice',
              prompt: 'Find the coefficient of $x^2$ in the expansion of $(2x-1)^5$.',
              options: ['-80', '-40', '40', '80'],
              correctOption: 1,
              hint: 'The $x^2$ term has $(2x)^2$ and $(-1)^3$.',
              explanation:
                'For the $x^2$ term, $5-r=2$ so $r=3$. The term is $\\binom{5}{3}(2x)^2(-1)^3=10\\cdot 4x^2\\cdot(-1)=-40x^2$. The coefficient is $-40$.',
              difficulty: 'hard',
            },
            {
              id: 'g12-binomial-ex-6',
              type: 'numeric',
              prompt: 'Find the constant term in the expansion of $\\left(2x-\\frac{1}{x^2}\\right)^6$.',
              answer: 240,
              tolerance: 0.01,
              hint: 'Simplify the general term to isolate the power of $x$.',
              explanation:
                'The general term is $\\binom{6}{r}(2x)^{6-r}(-x^{-2})^r=\\binom{6}{r}2^{6-r}(-1)^r x^{6-3r}$. For a constant, $6-3r=0$, so $r=2$. The coefficient is $\\binom{6}{2}2^4(-1)^2=15\\cdot 16=240$.',
              difficulty: 'hard',
            },
          ],
          related: [
            'permutations-and-combinations',
            'polynomial-functions',
            'sequences-and-series',
            'probability-rules-and-counting',
          ],
          aliases: [
            'binomial expansion',
            'Pascal triangle',
            "Pascal's triangle",
            'binomial coefficients',
            'general term',
            'coefficient of a term',
          ],
        },
        {
          id: 'permutations-and-combinations',
          title: 'Permutations & Combinations',
          subtitle: 'Counting arrangements and selections without listing them',
          introduction:
            'Counting problems ask how many outcomes are possible. The multiplication principle counts stages, factorials count arrangements of distinct objects, permutations count ordered selections, and combinations count unordered selections. The central question is always whether order matters.',
          prerequisites: ['Factorial notation', 'The multiplication principle', 'Basic probability'],
          keyIdeas: [
            'Multiply the number of choices at each stage',
            'Order matters for permutations, not for combinations',
            '$\\binom{n}{r}=\\frac{{}_nP_r}{r!}$',
            'Restrictions can be handled by cases or by complements',
          ],
          theory: [
            {
              title: 'The multiplication principle and factorials',
              body: [
                'If one choice can be made in $m$ ways and a second independent choice in $n$ ways, the two choices together can be made in $mn$ ways. For three stages with $m,n,p$ choices, the count is $mnp$. This principle is the foundation of all the formulas that follow.',
                'The number of ways to arrange $n$ distinct objects in a row is $n!=n(n-1)(n-2)\\cdots 2\\cdot 1$. The first position has $n$ choices, the second has $n-1$, and so on. By convention $0!=1$, which makes the counting formulas consistent for empty selections.',
                'When some objects are identical, dividing by the factorials of the repeat counts removes the overcount. For example, the letters of LEVEL include two Ls and two Es, so the distinct arrangements number $\\frac{5!}{2!2!}=30$.',
              ],
              bullets: [
                'Multiply choices across independent stages.',
                'Arrangements of $n$ distinct objects: $n!$.',
                'Identical objects: divide by the factorial of each repeat count.',
              ],
            },
            {
              title: 'Permutations: order matters',
              body: [
                'A permutation is an ordered selection. The number of ways to choose and arrange $r$ objects from $n$ distinct objects is ${}_nP_r=\\frac{n!}{(n-r)!}$. The first position has $n$ choices, the second $n-1$, down to $n-r+1$ choices for the last position.',
                'If repetition is allowed, each of the $r$ positions has $n$ choices, giving $n^r$ ordered arrangements. If repetition is not allowed, the falling product $n(n-1)\\cdots(n-r+1)$ applies, which is ${}_nP_r$.',
                'A useful check: ${}_nP_n=n!$, because arranging all $n$ objects is the same as permuting the whole set. Also ${}_nP_1=n$ and ${}_nP_0=1$.',
              ],
              bullets: [
                '${}_nP_r=\\frac{n!}{(n-r)!}$.',
                'With repetition allowed: $n^r$ arrangements.',
                'Order matters: AB and BA are different permutations.',
              ],
            },
            {
              title: 'Combinations: order does not matter',
              body: [
                'A combination is an unordered selection. Choosing a committee of $4$ from $9$ people produces the same committee regardless of the order in which the names are listed, so the count is $\\binom{9}{4}=\\frac{9!}{4!5!}=126$.',
                'Each combination of $r$ objects can be arranged in $r!$ orders, so ${}_nC_r=\\frac{{}_nP_r}{r!}=\\frac{n!}{r!(n-r)!}$. The symmetry $\\binom{n}{r}=\\binom{n}{n-r}$ follows because choosing which $r$ objects to include is the same as choosing which $n-r$ to exclude.',
                'Use combinations for committees, teams, hands of cards, and subsets. Use permutations for line-ups, passwords, rankings, and arrangements where position matters.',
              ],
              bullets: [
                '$\\binom{n}{r}=\\frac{n!}{r!(n-r)!}$.',
                '${}_nC_r={}_nC_{n-r}$.',
                'Order does not matter: AB and BA are the same selection.',
              ],
            },
            {
              title: 'Restrictions and probability',
              body: [
                'For "at least one" questions, the complement is often simpler: count all outcomes and subtract the outcomes with none of the required type. For "exactly $k$" questions, choose the required objects and then choose the remaining objects from the rest.',
                'For adjacent-object restrictions, treat the block as a single object, arrange the block with the others, then arrange the objects inside the block. For "not together" restrictions, subtract the together count from the total.',
                'When outcomes are equally likely, the probability of an event is the number of favourable outcomes divided by the total number of outcomes. Counting must match the sample space: if order is used in the denominator, order must also be used in the numerator.',
              ],
              bullets: [
                'At least one = total − none.',
                'Exactly $k$ = choose the $k$, then choose the rest.',
                'Adjacent objects: glue them into one block, then arrange inside.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-perms-factorial',
              title: 'Factorial',
              expression: String.raw`n! = n(n-1)(n-2)\cdots 2\cdot 1, \quad 0!=1`,
              description:
                'The factorial of a non-negative integer counts the number of ways to arrange $n$ distinct objects in a row.',
              spoken: 'n factorial equals n times n minus one, down to one. Zero factorial equals one.',
              variables: [
                { symbol: 'n', name: 'number of distinct objects', note: 'non-negative integer' },
              ],
              conditions: ['$n$ is a non-negative integer.', '$0!=1$ by convention.'],
              notes:
                'Factorials grow quickly: $5!=120$, $10!=3{,}628{,}800$. Use the ratio definition $\\frac{n!}{(n-r)!}$ rather than expanding huge factorials.',
              tags: ['factorial', 'arrangements', 'counting', 'n factorial'],
            },
            {
              id: 'g12-perms-npr',
              title: 'Permutations',
              expression: String.raw`{}_nP_r = \frac{n!}{(n-r)!}, \quad 0 \le r \le n`,
              description:
                'The number of ordered arrangements of $r$ objects chosen from $n$ distinct objects, without repetition.',
              spoken: 'The number of permutations of r objects chosen from n is n factorial divided by n minus r factorial.',
              variables: [
                { symbol: 'n', name: 'total number of distinct objects' },
                { symbol: 'r', name: 'number selected and arranged', note: '0 ≤ r ≤ n' },
              ],
              conditions: [
                'Objects are distinct and repetition is not allowed.',
                'Order matters: different orders count as different arrangements.',
              ],
              notes:
                'If repetition is allowed, the count is $n^r$ instead. ${}_nP_n=n!$ and ${}_nP_0=1$.',
              tags: ['permutation', 'ordered selection', 'nPr', 'arrangement'],
            },
            {
              id: 'g12-perms-ncr',
              title: 'Combinations',
              expression: String.raw`\binom{n}{r} = \frac{n!}{r!(n-r)!}, \quad 0 \le r \le n`,
              description:
                'The number of unordered selections of $r$ objects chosen from $n$ distinct objects, without repetition.',
              spoken: 'n choose r equals n factorial divided by r factorial times n minus r factorial.',
              variables: [
                { symbol: 'n', name: 'total number of distinct objects' },
                { symbol: 'r', name: 'number selected', note: '0 ≤ r ≤ n' },
              ],
              conditions: [
                'Objects are distinct and repetition is not allowed.',
                'Order does not matter: different orders of the same objects count once.',
              ],
              notes:
                'Symmetry: $\\binom{n}{r}=\\binom{n}{n-r}$. Every combination corresponds to $r!$ permutations, so $\\binom{n}{r}=\\frac{{}_nP_r}{r!}$.',
              tags: ['combination', 'unordered selection', 'nCr', 'committees', 'subsets'],
            },
            {
              id: 'g12-perms-identical',
              title: 'Arrangements with identical objects',
              expression: String.raw`\frac{n!}{n_1!\,n_2!\cdots n_k!}`,
              description:
                'The number of distinct arrangements of $n$ objects when groups of identical objects occur, dividing out the arrangements that look the same.',
              spoken: 'n factorial divided by the product of the factorials of the repeat counts.',
              variables: [
                { symbol: 'n', name: 'total number of objects' },
                { symbol: 'n_i', name: 'count of objects in identical group i' },
              ],
              conditions: [
                '$n_1+n_2+\\cdots+n_k=n$.',
                'Objects within each group are indistinguishable from one another.',
              ],
              notes:
                'For the letters of LEVEL, $n=5$ with two Ls and two Es, giving $\\frac{5!}{2!2!}=30$ distinct arrangements.',
              tags: ['identical objects', 'repeated letters', 'distinct arrangements', 'multinomial'],
            },
          ],
          examples: [
            {
              title: 'Choosing a committee',
              problem:
                'A class has $9$ students. A committee of $4$ is chosen at random. How many committees are possible, and what is the probability that a particular student is on the committee?',
              given: ['Total students: $9$', 'Committee size: $4$', 'A particular student is fixed in advance'],
              steps: [
                {
                  text: 'Order does not matter for a committee, so use combinations.',
                  math: String.raw`\binom{9}{4}=\frac{9!}{4!5!}=126`,
                },
                {
                  text: 'Count the committees that include the particular student. That student occupies one place, so choose the other $3$ from the remaining $8$.',
                  math: String.raw`\binom{8}{3}=\frac{8!}{3!5!}=56`,
                },
                {
                  text: 'Form the probability as favourable outcomes divided by total outcomes.',
                  math: String.raw`P=\frac{56}{126}`,
                },
                {
                  text: 'Simplify the fraction by dividing numerator and denominator by $14$.',
                  math: String.raw`P=\frac{4}{9}\approx 0.444`,
                },
                {
                  text: 'Check: each of the $9$ students is equally likely to occupy any of the $4$ committee places, so the probability is $4/9$. The counts agree.',
                },
                {
                  text: 'Probability is dimensionless and lies between $0$ and $1$; here it is approximately $0.444$, or $44.4\\%$.',
                },
              ],
              answer: 'There are $126$ committees. The probability is $\\frac{4}{9}\\approx 0.444$.',
            },
            {
              title: 'Counting distinct arrangements of a word',
              problem: 'How many distinct arrangements of the letters of LEVEL are possible?',
              given: ['Word: LEVEL', 'Letters: L, E, V, E, L', 'Repeated letters: two Ls and two Es'],
              steps: [
                {
                  text: 'Count the total number of letters.',
                  math: String.raw`n=5`,
                },
                {
                  text: 'If all five letters were distinct, the number of arrangements would be $5!$.',
                  math: String.raw`5!=120`,
                },
                {
                  text: 'The two Ls are identical, so swapping them does not create a new arrangement. Divide by $2!$.',
                  math: String.raw`\frac{120}{2!}=60`,
                },
                {
                  text: 'The two Es are also identical, so divide by another $2!$.',
                  math: String.raw`\frac{60}{2!}=30`,
                },
                {
                  text: 'Equivalently, use the identical-objects formula with repeat counts $2,2,1$.',
                  math: String.raw`\frac{5!}{2!2!1!}=\frac{120}{4}=30`,
                },
                {
                  text: 'The answer is a count, so it has no units.',
                },
              ],
              answer: 'There are $30$ distinct arrangements of the letters of LEVEL.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using permutations when the problem asks for a committee, team, or hand of cards.',
              correction:
                'Committees and hands are unordered selections, so use combinations. Listing the same members in a different order does not create a new committee.',
            },
            {
              mistake: 'Forgetting to divide by the factorials of repeated objects when counting arrangements of a word.',
              correction:
                'Identical letters produce duplicate arrangements. Divide the total factorial by the factorial of each repeat count.',
            },
            {
              mistake: 'Counting "at least one" directly and missing cases.',
              correction:
                'Use the complement: count all outcomes, then subtract the outcomes with none of the required type.',
            },
            {
              mistake: 'Mixing ordered outcomes in the numerator with unordered outcomes in the denominator of a probability.',
              correction:
                'The numerator and denominator must describe the same sample space. Choose one convention — ordered or unordered — and use it consistently.',
            },
          ],
          exercises: [
            {
              id: 'g12-perms-ex-1',
              type: 'numeric',
              prompt: String.raw`How many ways can a president, secretary, and treasurer be chosen from $8$ people (no person holds two roles)?`,
              answer: 336,
              tolerance: 0.01,
              hint: 'Order matters because the roles differ.',
              explanation: String.raw`$P(8,3)=8\times7\times6=336$.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-perms-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`How many different committees of $3$ can be chosen from $10$ people?`,
              options: ['$120$', '$720$', '$30$', '$1000$'],
              correctOption: 0,
              hint: 'A committee is unordered.',
              explanation: String.raw`$\binom{10}{3}=\frac{10\cdot9\cdot8}{3!}=120$. The value $720$ counts ordered selections.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-perms-ex-3',
              type: 'numeric',
              prompt: String.raw`How many distinct arrangements are there of the letters of BANANA?`,
              answer: 60,
              tolerance: 0.01,
              hint: 'There are three As and two Ns.',
              explanation: String.raw`$\frac{6!}{3!\,2!\,1!}=\frac{720}{12}=60$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-perms-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`A committee of $3$ is chosen from $5$ boys and $4$ girls. How many committees contain at least one girl?`,
              options: ['$74$', '$84$', '$10$', '$64$'],
              correctOption: 0,
              hint: 'Use the complement: subtract all-boy committees from all committees.',
              explanation: String.raw`$\binom{9}{3}-\binom{5}{3}=84-10=74$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-perms-ex-5',
              type: 'numeric',
              prompt: String.raw`In how many ways can $5$ people stand in a row if two particular people must stand next to each other?`,
              answer: 48,
              tolerance: 0.01,
              hint: 'Treat the pair as one block, then arrange the pair internally.',
              explanation: String.raw`Four units (the block plus three people) can be arranged in $4!=24$ ways, and the pair can be ordered in $2$ ways: $24\times2=48$.`,
              difficulty: 'hard',
            },
          ],
          related: [
            'probability-rules-and-counting',
            'binomial-theorem',
            'probability-compound-events',
            'conditional-probability',
          ],
          aliases: [
            'counting',
            'permutations',
            'combinations',
            'nCr',
            'nPr',
            'factorial',
            'committees',
            'arrangements',
          ],
        },
      ],
    },
    {
      id: 'coordinate-geometry',
      family: 'coordinate-geometry',
      title: 'Coordinate Geometry',
      description:
        'Conic sections extend the circle and parabola to ellipses and hyperbolas, curves defined by distances to fixed points and described by simple equations.',
      topics: [
        {
          id: 'conic-sections',
          title: 'Conic Sections: Ellipse & Hyperbola',
          subtitle: 'Standard forms, foci, eccentricity, and asymptotes',
          introduction: String.raw`An ellipse is the set of points whose distances to two fixed foci add to a constant; a hyperbola is the set whose distances differ by a constant. Centred at the origin with axes along the coordinate axes, they have the equations $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ and $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$. The foci, eccentricity and asymptotes follow from $a$ and $b$.`,
          prerequisites: ['Circles in coordinate geometry', 'Parabolas as conics', 'Distance formula and surds'],
          keyIdeas: [
            String.raw`Ellipse: $c^2=a^2-b^2$ with $a>b>0$; foci at $(\pm c,0)$ and $0<e<1$.`,
            String.raw`Hyperbola: $c^2=a^2+b^2$; foci at $(\pm c,0)$ and $e>1$.`,
            String.raw`Eccentricity is $e=\frac{c}{a}$ for both curves.`,
            String.raw`The hyperbola approaches the asymptotes $y=\pm\frac{b}{a}x$.`,
          ],
          theory: [
            {
              title: 'The ellipse',
              body: [
                String.raw`The ellipse $\frac{x^2}{a^2}+\frac{y^2}{b^2}=1$ with $a>b>0$ has vertices $(\pm a,0)$ and co-vertices $(0,\pm b)$. The major axis (length $2a$) lies along the $x$-axis.`,
                String.raw`The foci are $(\pm c,0)$ with $c^2=a^2-b^2$. For every point on the ellipse, the sum of the distances to the foci is $2a$. If $b>a$, the major axis is vertical and the foci lie on the $y$-axis.`,
              ],
            },
            {
              title: 'The hyperbola',
              body: [
                String.raw`The hyperbola $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ has two branches with vertices $(\pm a,0)$. Its foci are $(\pm c,0)$ with $c^2=a^2+b^2$, so $c>a$. For every point on it, the absolute difference of the distances to the foci is $2a$.`,
                String.raw`As $|x|$ grows, the curve approaches the lines $y=\pm\frac{b}{a}x$, called asymptotes. A quick way to sketch them is to draw the rectangle with corners $(\pm a,\pm b)$ and extend its diagonals.`,
              ],
            },
            {
              title: 'Eccentricity',
              body: [
                String.raw`Eccentricity $e=\frac{c}{a}$ measures how far a conic departs from a circle. An ellipse has $0\le e<1$, with $e=0$ giving a circle; a hyperbola has $e>1$. A larger ellipse eccentricity gives a flatter, more elongated shape.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-conic-ellipse',
              title: 'Ellipse (centre at origin)',
              expression: String.raw`\frac{x^2}{a^2}+\frac{y^2}{b^2}=1,\qquad c^2=a^2-b^2`,
              description:
                'The standard equation of an ellipse centred at the origin, with foci found from $c^2=a^2-b^2$.',
              spoken:
                'x squared over a squared plus y squared over b squared equals one, where c squared equals a squared minus b squared.',
              variables: [
                { symbol: 'a', name: 'semi-major axis', unit: 'units', note: 'positive, larger than b here' },
                { symbol: 'b', name: 'semi-minor axis', unit: 'units', note: 'positive' },
                { symbol: 'c', name: 'distance from centre to each focus', unit: 'units' },
              ],
              conditions: [String.raw`$a>b>0$ for foci on the $x$-axis.`, 'If $b>a$, swap the roles: $c^2=b^2-a^2$ and foci on the $y$-axis.'],
              notes: String.raw`Equation $9x^2+25y^2=225$ becomes standard form after dividing by $225$.`,
              tags: ['ellipse', 'foci', 'semi-major axis', 'semi-minor axis', 'conic'],
            },
            {
              id: 'g12-conic-hyperbola',
              title: 'Hyperbola and asymptotes (centre at origin)',
              expression: String.raw`\frac{x^2}{a^2}-\frac{y^2}{b^2}=1,\quad c^2=a^2+b^2,\quad y=\pm\frac{b}{a}x`,
              description:
                'The standard equation of a hyperbola opening left and right, with foci from $c^2=a^2+b^2$ and asymptotes $y=\\pm\\frac{b}{a}x$.',
              spoken:
                'x squared over a squared minus y squared over b squared equals one; c squared equals a squared plus b squared; the asymptotes are y equals plus or minus b over a times x.',
              variables: [
                { symbol: 'a', name: 'distance from centre to vertex', unit: 'units' },
                { symbol: 'b', name: 'conjugate semi-axis', unit: 'units' },
                { symbol: 'c', name: 'distance from centre to each focus', unit: 'units' },
              ],
              conditions: ['$a>0$ and $b>0$.', String.raw`For $\frac{y^2}{a^2}-\frac{x^2}{b^2}=1$ the branches open up and down, foci on the $y$-axis, asymptotes $y=\pm\frac{a}{b}x$.`],
              notes: String.raw`Unlike the ellipse, no relationship between $a$ and $b$ is required.`,
              tags: ['hyperbola', 'asymptotes', 'foci', 'vertices', 'conic'],
            },
            {
              id: 'g12-conic-eccentricity',
              title: 'Eccentricity',
              expression: String.raw`e=\frac{c}{a}`,
              description:
                'The ratio of the focal distance to the semi-axis $a$, describing how stretched a conic is.',
              spoken: 'e equals c divided by a.',
              variables: [
                { symbol: 'e', name: 'eccentricity', note: 'no units' },
                { symbol: 'c', name: 'centre-to-focus distance', unit: 'units' },
                { symbol: 'a', name: 'semi-major axis or vertex distance', unit: 'units' },
              ],
              conditions: [String.raw`Ellipse: $0\le e<1$.`, String.raw`Hyperbola: $e>1$.`],
              notes: String.raw`For a circle $c=0$, so $e=0$; a parabola has $e=1$.`,
              tags: ['eccentricity', 'e = c/a', 'ellipse', 'hyperbola'],
            },
          ],
          examples: [
            {
              title: 'Analyse an ellipse',
              problem: String.raw`For the ellipse $9x^2+25y^2=225$, find the vertices, co-vertices, foci and eccentricity.`,
              given: [String.raw`Equation: $9x^2+25y^2=225$.`],
              steps: [
                {
                  text: 'Divide both sides by $225$ to reach standard form.',
                  math: String.raw`\frac{x^2}{25}+\frac{y^2}{9}=1`,
                },
                {
                  text: String.raw`Read $a^2=25$ and $b^2=9$, so $a=5$ and $b=3$. Since $a>b$, the major axis is horizontal.`,
                },
                {
                  text: 'Vertices are $(\\pm5,0)$ and co-vertices are $(0,\\pm3)$.',
                },
                {
                  text: 'Find $c$.',
                  math: String.raw`c^2=a^2-b^2=25-9=16,\quad c=4`,
                },
                {
                  text: 'Foci are $(\\pm4,0)$. Compute the eccentricity.',
                  math: String.raw`e=\frac{c}{a}=\frac{4}{5}=0.8`,
                },
                {
                  text: String.raw`Check at $(0,3)$: distances to $(\pm4,0)$ are each $\sqrt{16+9}=5$, and $5+5=10=2a$.`,
                },
              ],
              answer: String.raw`Vertices $(\pm5,0)$, co-vertices $(0,\pm3)$, foci $(\pm4,0)$, $e=0.8$ (lengths in coordinate units).`,
            },
            {
              title: 'Analyse a hyperbola',
              problem: String.raw`For $\frac{x^2}{16}-\frac{y^2}{9}=1$, find the vertices, foci, eccentricity and asymptotes.`,
              given: [String.raw`$a^2=16$, $b^2=9$, so $a=4$ and $b=3$.`],
              steps: [
                {
                  text: 'Vertices are at $(\\pm a,0)=(\\pm4,0)$.',
                },
                {
                  text: 'Find $c$ using the hyperbola relation.',
                  math: String.raw`c^2=a^2+b^2=16+9=25,\quad c=5`,
                },
                {
                  text: 'Foci are $(\\pm5,0)$.',
                },
                {
                  text: 'Eccentricity.',
                  math: String.raw`e=\frac{c}{a}=\frac{5}{4}=1.25`,
                },
                {
                  text: 'Asymptotes.',
                  math: String.raw`y=\pm\frac{b}{a}x=\pm\frac{3}{4}x`,
                },
                {
                  text: String.raw`Check the point $\left(5,\frac{9}{4}\right)$: $\frac{25}{16}-\frac{81/16}{9}=\frac{25}{16}-\frac{9}{16}=1$. It lies on the curve.`,
                },
              ],
              answer: String.raw`Vertices $(\pm4,0)$, foci $(\pm5,0)$, $e=1.25$, asymptotes $y=\pm\frac{3}{4}x$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Using $c^2=a^2-b^2$ for a hyperbola.`,
              correction: String.raw`The hyperbola uses $c^2=a^2+b^2$. Only the ellipse subtracts.`,
            },
            {
              mistake: String.raw`Reading $a$ as the larger denominator for a hyperbola.`,
              correction: String.raw`For a hyperbola, $a^2$ is the denominator under the positive term, whichever is larger. The sign, not the size, decides the direction it opens.`,
            },
            {
              mistake: String.raw`Writing the asymptotes as $y=\pm\frac{a}{b}x$ for the left-right hyperbola.`,
              correction: String.raw`For $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ the slopes are $\pm\frac{b}{a}$.`,
            },
          ],
          exercises: [
            {
              id: 'g12-conic-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Find the foci of $\frac{x^2}{25}+\frac{y^2}{9}=1$.`,
              options: [String.raw`$(\pm4,0)$`, String.raw`$(\pm\sqrt{34},0)$`, String.raw`$(0,\pm4)$`, String.raw`$(\pm5,0)$`],
              correctOption: 0,
              hint: String.raw`For an ellipse use $c^2=a^2-b^2$.`,
              explanation: String.raw`$c^2=25-9=16$, so $c=4$. The major axis is horizontal, so the foci are $(\pm4,0)$.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-conic-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find the asymptotes of $\frac{x^2}{16}-\frac{y^2}{9}=1$.`,
              options: [String.raw`$y=\pm\frac{3}{4}x$`, String.raw`$y=\pm\frac{4}{3}x$`, String.raw`$y=\pm\frac{9}{16}x$`, String.raw`$y=\pm\frac{3}{5}x$`],
              correctOption: 0,
              hint: String.raw`Use $y=\pm\frac{b}{a}x$ with $a=4$ and $b=3$.`,
              explanation: String.raw`$a=4$, $b=3$, so the slopes are $\pm\frac{3}{4}$.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-conic-ex-3',
              type: 'numeric',
              prompt: String.raw`For the ellipse $\frac{x^2}{169}+\frac{y^2}{144}=1$, find $c$, the distance from the centre to each focus.`,
              answer: 5,
              tolerance: 0.01,
              answerUnit: 'units',
              hint: String.raw`$c^2=a^2-b^2$.`,
              explanation: String.raw`$c^2=169-144=25$, so $c=5$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-conic-ex-4',
              type: 'numeric',
              prompt: String.raw`Find the eccentricity of $\frac{x^2}{9}-\frac{y^2}{16}=1$ (give a decimal to two places).`,
              answer: 1.67,
              tolerance: 0.01,
              hint: String.raw`First compute $c=\sqrt{a^2+b^2}$.`,
              explanation: String.raw`$a=3$, $b=4$, $c=\sqrt{9+16}=5$, so $e=\frac{5}{3}\approx1.67$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-conic-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`An ellipse centred at the origin has foci $(\pm3,0)$ and vertices $(\pm5,0)$. Which is its equation?`,
              options: [
                String.raw`$\frac{x^2}{25}+\frac{y^2}{16}=1$`,
                String.raw`$\frac{x^2}{25}+\frac{y^2}{9}=1$`,
                String.raw`$\frac{x^2}{34}+\frac{y^2}{25}=1$`,
                String.raw`$\frac{x^2}{25}-\frac{y^2}{16}=1$`,
              ],
              correctOption: 0,
              hint: String.raw`Here $a=5$ and $c=3$. Find $b^2=a^2-c^2$.`,
              explanation: String.raw`$b^2=a^2-c^2=25-9=16$, so the equation is $\frac{x^2}{25}+\frac{y^2}{16}=1$.`,
              difficulty: 'hard',
            },
          ],
          related: ['parabolas-as-conics', 'circles-in-coordinate-geometry', 'distance-midpoint-slope'],
          aliases: ['ellipse', 'hyperbola', 'eccentricity', 'foci', 'asymptotes', 'conics'],
        },
      ],
    },
    {
      id: 'vectors-matrices',
      family: 'vectors-matrices',
      title: 'Vectors & Matrices',
      description:
        'Vectors in three dimensions describe direction and magnitude in space, while matrices organise and solve systems of linear equations.',
      topics: [
        {
          id: 'vectors-in-three-dimensions',
          title: 'Vectors in Three Dimensions',
          subtitle: 'Magnitude, dot and cross products, lines and planes',
          introduction: String.raw`A vector in space has three components, $\mathbf{a}=(a_1,a_2,a_3)$. Its magnitude gives length, the dot product measures alignment and gives angles, and the cross product produces a new vector perpendicular to both inputs. Together these tools describe lines and planes in space.`,
          prerequisites: ['Vectors in two dimensions', 'Dot product in the plane', 'Right-triangle trigonometry'],
          keyIdeas: [
            String.raw`$|\mathbf{a}|=\sqrt{a_1^2+a_2^2+a_3^2}$.`,
            String.raw`$\mathbf{a}\cdot\mathbf{b}=0$ exactly when the non-zero vectors are perpendicular.`,
            String.raw`$\mathbf{a}\times\mathbf{b}$ is perpendicular to both, and $|\mathbf{a}\times\mathbf{b}|$ is the parallelogram area.`,
            'A plane is fixed by a point and a normal vector.',
          ],
          theory: [
            {
              title: 'Magnitude and the dot product',
              body: [
                String.raw`The magnitude is $|\mathbf{a}|=\sqrt{a_1^2+a_2^2+a_3^2}$. The dot product is a scalar: $\mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2+a_3b_3=|\mathbf{a}||\mathbf{b}|\cos\theta$, where $\theta\in[0^\circ,180^\circ]$ is the angle between them.`,
                String.raw`Rearranging gives $\cos\theta=\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$. A zero dot product means the vectors are perpendicular (orthogonal).`,
              ],
            },
            {
              title: 'The cross product',
              body: [
                String.raw`The cross product is defined only in three dimensions: $\mathbf{a}\times\mathbf{b}=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)$. Its direction follows the right-hand rule and it is perpendicular to both $\mathbf{a}$ and $\mathbf{b}$.`,
                String.raw`Its magnitude is $|\mathbf{a}||\mathbf{b}|\sin\theta$, the area of the parallelogram spanned by the vectors. Order matters: $\mathbf{b}\times\mathbf{a}=-(\mathbf{a}\times\mathbf{b})$. Parallel vectors give $\mathbf{0}$.`,
              ],
            },
            {
              title: 'Lines and planes',
              body: [
                String.raw`A line through point $A$ with direction $\mathbf{d}$ is $\mathbf{r}=\mathbf{a}+t\mathbf{d}$, with $t\in\mathbb{R}$. A plane through $\mathbf{r}_0$ with normal $\mathbf{n}=(A,B,C)$ satisfies $\mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0)=0$, which expands to $Ax+By+Cz=D$ with $D=\mathbf{n}\cdot\mathbf{r}_0$.`,
                'To find a plane through three points, form two edge vectors, take their cross product as the normal, then substitute any one of the points.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-vec3-magnitude-dot',
              title: 'Magnitude and dot product',
              expression: String.raw`|\mathbf{a}|=\sqrt{a_1^2+a_2^2+a_3^2},\quad \mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2+a_3b_3=|\mathbf{a}||\mathbf{b}|\cos\theta`,
              description:
                'The magnitude gives the length of a vector; the dot product gives a scalar linked to the angle between two vectors.',
              spoken:
                'The magnitude of a is the square root of the sum of the squared components. The dot product is the sum of products of matching components, which equals the product of magnitudes times cosine theta.',
              variables: [
                { symbol: String.raw`\mathbf{a},\mathbf{b}`, name: 'vectors in three dimensions' },
                { symbol: String.raw`\theta`, name: 'angle between the vectors', unit: '°', note: 'from 0° to 180°' },
              ],
              conditions: [String.raw`$\theta$ is defined only when $\mathbf{a}\ne\mathbf{0}$ and $\mathbf{b}\ne\mathbf{0}$.`],
              notes: String.raw`$\mathbf{a}\cdot\mathbf{a}=|\mathbf{a}|^2$.`,
              tags: ['vector magnitude', 'dot product', 'scalar product', 'angle between vectors', '3D vectors'],
            },
            {
              id: 'g12-vec3-cross',
              title: 'Cross product',
              expression: String.raw`\mathbf{a}\times\mathbf{b}=(a_2b_3-a_3b_2,\ a_3b_1-a_1b_3,\ a_1b_2-a_2b_1)`,
              description:
                'A vector perpendicular to both $\\mathbf{a}$ and $\\mathbf{b}$, with magnitude $|\\mathbf{a}||\\mathbf{b}|\\sin\\theta$.',
              spoken:
                'The cross product has components a two b three minus a three b two, a three b one minus a one b three, and a one b two minus a two b one.',
              variables: [
                { symbol: String.raw`\mathbf{a},\mathbf{b}`, name: 'vectors in three dimensions' },
              ],
              conditions: ['Defined in three dimensions only.', String.raw`Not commutative: $\mathbf{b}\times\mathbf{a}=-\mathbf{a}\times\mathbf{b}$.`],
              notes: String.raw`Area of parallelogram $=|\mathbf{a}\times\mathbf{b}|$; area of triangle $=\frac12|\mathbf{a}\times\mathbf{b}|$. Check by dotting the result with $\mathbf{a}$ and $\mathbf{b}$: both give $0$.`,
              tags: ['cross product', 'vector product', 'normal vector', 'parallelogram area'],
            },
            {
              id: 'g12-vec3-line-plane',
              title: 'Vector equations of a line and a plane',
              expression: String.raw`\mathbf{r}=\mathbf{a}+t\mathbf{d},\qquad \mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0)=0`,
              description:
                'A line is a point plus a multiple of a direction vector. A plane is the set of points whose displacement from a known point is perpendicular to a normal vector.',
              spoken:
                'A line is r equals a plus t times d. A plane is n dot r minus r zero equals zero.',
              variables: [
                { symbol: String.raw`\mathbf{a}`, name: 'position vector of a point on the line' },
                { symbol: String.raw`\mathbf{d}`, name: 'direction vector', note: 'non-zero' },
                { symbol: 't', name: 'real parameter' },
                { symbol: String.raw`\mathbf{n}`, name: 'normal vector of the plane', note: 'non-zero' },
                { symbol: String.raw`\mathbf{r}_0`, name: 'position vector of a point on the plane' },
              ],
              conditions: [String.raw`$\mathbf{d}\ne\mathbf{0}$ and $\mathbf{n}\ne\mathbf{0}$.`],
              notes: String.raw`In Cartesian form, $\mathbf{n}=(A,B,C)$ gives $Ax+By+Cz=D$ with $D=\mathbf{n}\cdot\mathbf{r}_0$.`,
              tags: ['line equation', 'plane equation', 'normal vector', 'parametric', 'direction vector'],
            },
          ],
          examples: [
            {
              title: 'Dot product, angle and cross product',
              problem: String.raw`Let $\mathbf{a}=(2,-1,2)$ and $\mathbf{b}=(1,2,-2)$. Find $|\mathbf{a}|$, $\mathbf{a}\cdot\mathbf{b}$, the angle between them, and $\mathbf{a}\times\mathbf{b}$.`,
              given: [String.raw`$\mathbf{a}=(2,-1,2)$, $\mathbf{b}=(1,2,-2)$.`],
              steps: [
                {
                  text: 'Magnitudes.',
                  math: String.raw`|\mathbf{a}|=\sqrt{4+1+4}=3,\qquad |\mathbf{b}|=\sqrt{1+4+4}=3`,
                },
                {
                  text: 'Dot product.',
                  math: String.raw`\mathbf{a}\cdot\mathbf{b}=2(1)+(-1)(2)+2(-2)=2-2-4=-4`,
                },
                {
                  text: 'Angle.',
                  math: String.raw`\cos\theta=\frac{-4}{3\cdot3}=-\frac{4}{9},\quad \theta\approx116.39^\circ`,
                },
                {
                  text: 'Cross product, component by component.',
                  math: String.raw`\mathbf{a}\times\mathbf{b}=\big((-1)(-2)-2(2),\ 2(1)-2(-2),\ 2(2)-(-1)(1)\big)=(-2,\ 6,\ 5)`,
                },
                {
                  text: 'Check perpendicularity: with $\\mathbf{a}$, $(-2)(2)+6(-1)+5(2)=-4-6+10=0$; with $\\mathbf{b}$, $-2+12-10=0$.',
                },
                {
                  text: 'Check the magnitude: $|\\mathbf{a}\\times\\mathbf{b}|^2=4+36+25=65$, and $|\\mathbf{a}|^2|\\mathbf{b}|^2-(\\mathbf{a}\\cdot\\mathbf{b})^2=81-16=65$.',
                },
              ],
              answer: String.raw`$|\mathbf{a}|=3$, $\mathbf{a}\cdot\mathbf{b}=-4$, $\theta\approx116.39^\circ$, and $\mathbf{a}\times\mathbf{b}=(-2,6,5)$.`,
            },
            {
              title: 'Plane through three points',
              problem: String.raw`Find the equation of the plane through $P(1,0,0)$, $Q(0,2,0)$ and $R(0,0,3)$.`,
              given: [String.raw`Points $P(1,0,0)$, $Q(0,2,0)$, $R(0,0,3)$.`],
              steps: [
                {
                  text: 'Form two edge vectors from $P$.',
                  math: String.raw`\overrightarrow{PQ}=(-1,2,0),\qquad \overrightarrow{PR}=(-1,0,3)`,
                },
                {
                  text: 'The cross product gives a normal vector.',
                  math: String.raw`\mathbf{n}=\overrightarrow{PQ}\times\overrightarrow{PR}=(2\cdot3-0\cdot0,\ 0\cdot(-1)-(-1)\cdot3,\ (-1)\cdot0-2\cdot(-1))=(6,3,2)`,
                },
                {
                  text: 'Write $6x+3y+2z=D$ and find $D$ by substituting $P$.',
                  math: String.raw`D=6(1)+3(0)+2(0)=6`,
                },
                {
                  text: 'Check $Q$: $6(0)+3(2)+0=6$. Check $R$: $0+0+2(3)=6$. Both hold.',
                },
                {
                  text: 'Dividing by $6$ gives intercept form.',
                  math: String.raw`x+\frac{y}{2}+\frac{z}{3}=1`,
                },
              ],
              answer: String.raw`$6x+3y+2z=6$, equivalent to $x+\frac{y}{2}+\frac{z}{3}=1$.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Treating the dot product as a vector.',
              correction: 'The dot product is a scalar; the cross product is a vector.',
            },
            {
              mistake: String.raw`Assuming $\mathbf{a}\times\mathbf{b}=\mathbf{b}\times\mathbf{a}$.`,
              correction: String.raw`Reversing the order reverses the direction: $\mathbf{b}\times\mathbf{a}=-\mathbf{a}\times\mathbf{b}$.`,
            },
            {
              mistake: 'Using the direction vector in place of the normal vector for a plane.',
              correction: 'A plane is defined by a normal vector perpendicular to it, usually found by a cross product of two vectors lying in the plane.',
            },
          ],
          exercises: [
            {
              id: 'g12-vec3-ex-1',
              type: 'numeric',
              prompt: String.raw`Find $|\mathbf{v}|$ for $\mathbf{v}=(2,3,6)$.`,
              answer: 7,
              tolerance: 0.01,
              hint: 'Square the components, add, and take the square root.',
              explanation: String.raw`$|\mathbf{v}|=\sqrt{4+9+36}=\sqrt{49}=7$.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-vec3-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find $(1,2,3)\cdot(4,-5,2)$ and interpret it.`,
              options: [
                '$0$, so the vectors are perpendicular',
                '$0$, so the vectors are parallel',
                '$20$, so the vectors are perpendicular',
                '$-12$, so the vectors are parallel',
              ],
              correctOption: 0,
              hint: 'Multiply matching components and add.',
              explanation: String.raw`$4-10+6=0$. A zero dot product between non-zero vectors means they are perpendicular.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-vec3-ex-3',
              type: 'multiple-choice',
              prompt: String.raw`With $\mathbf{i}=(1,0,0)$ and $\mathbf{j}=(0,1,0)$, what is $\mathbf{i}\times\mathbf{j}$?`,
              options: ['$(0,0,1)$', '$(0,0,-1)$', '$0$', '$(1,1,0)$'],
              correctOption: 0,
              hint: 'Use the component formula.',
              explanation: String.raw`$(0\cdot0-0\cdot1,\ 0\cdot0-1\cdot0,\ 1\cdot1-0\cdot0)=(0,0,1)$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-vec3-ex-4',
              type: 'numeric',
              prompt: String.raw`Find the area of the parallelogram spanned by $\mathbf{a}=(1,2,0)$ and $\mathbf{b}=(3,1,0)$.`,
              answer: 5,
              tolerance: 0.01,
              answerUnit: 'square units',
              hint: String.raw`Area is $|\mathbf{a}\times\mathbf{b}|$.`,
              explanation: String.raw`$\mathbf{a}\times\mathbf{b}=(0,0,1\cdot1-2\cdot3)=(0,0,-5)$, with magnitude $5$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-vec3-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`Find the plane through $(1,2,3)$ with normal $(2,-1,4)$.`,
              options: ['$2x-y+4z=12$', '$2x-y+4z=6$', '$x+2y+3z=12$', '$2x-y+4z=0$'],
              correctOption: 0,
              hint: String.raw`$D=\mathbf{n}\cdot\mathbf{r}_0$.`,
              explanation: String.raw`$D=2(1)-1(2)+4(3)=2-2+12=12$, so $2x-y+4z=12$.`,
              difficulty: 'hard',
            },
          ],
          related: ['vectors-in-two-dimensions', 'matrices-and-determinants', 'matrices-and-linear-systems'],
          aliases: ['3D vectors', 'dot product', 'cross product', 'plane equation', 'line equation', 'normal vector'],
        },
        {
          id: 'matrices-and-linear-systems',
          title: 'Matrices & Linear Systems',
          subtitle: 'Gaussian elimination, 3×3 determinants, and inverses',
          introduction: String.raw`A system of three linear equations in three unknowns can be written as $A\mathbf{x}=\mathbf{b}$. Gaussian elimination reduces the augmented matrix to triangular form, a $3\times3$ determinant tells whether a unique solution exists, and the inverse matrix gives the solution as $\mathbf{x}=A^{-1}\mathbf{b}$.`,
          prerequisites: ['Matrices and determinants (2×2)', 'Systems of linear equations', 'Substitution and elimination'],
          keyIdeas: [
            'Row operations (swap, scale, add a multiple of another row) do not change the solution set.',
            String.raw`$A$ has an inverse exactly when $\det A\ne0$.`,
            'A system has a unique solution, no solution, or infinitely many solutions.',
          ],
          theory: [
            {
              title: 'Gaussian elimination',
              body: [
                'Write the coefficients and constants as an augmented matrix. Use row operations to create zeros below each leading entry, giving a staircase form, then back-substitute from the last row upward.',
                String.raw`A row of the form $[0\ 0\ 0\mid k]$ with $k\ne0$ means $0=k$, so there is no solution. A row of all zeros means a free variable, giving infinitely many solutions.`,
              ],
            },
            {
              title: 'Determinants and inverses',
              body: [
                String.raw`The $3\times3$ determinant expands along the first row: $\det A=a(ei-fh)-b(di-fg)+c(dh-eg)$ for rows $(a,b,c),(d,e,f),(g,h,i)$.`,
                String.raw`If $\det A\ne0$, then $A^{-1}=\frac{1}{\det A}\operatorname{adj}A$ exists and the system $A\mathbf{x}=\mathbf{b}$ has the unique solution $\mathbf{x}=A^{-1}\mathbf{b}$. If $\det A=0$, the matrix is singular: the system has either no solution or infinitely many.`,
              ],
            },
            {
              title: 'Geometric meaning',
              body: [
                'Each equation in three unknowns is a plane. A unique solution is a single point where the three planes meet; no solution means the planes have no common point (for example, parallel planes); infinitely many solutions means they share a line or coincide.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-matsys-det3',
              title: 'Determinant of a 3×3 matrix',
              expression: String.raw`\det\begin{pmatrix}a&b&c\\d&e&f\\g&h&i\end{pmatrix}=a(ei-fh)-b(di-fg)+c(dh-eg)`,
              description:
                'Expansion along the first row, using the three $2\\times2$ minors with alternating signs.',
              spoken:
                'a times e i minus f h, minus b times d i minus f g, plus c times d h minus e g.',
              variables: [
                { symbol: 'a,\\dots,i', name: 'matrix entries, read row by row' },
              ],
              conditions: ['The matrix is square, $3\\times3$.'],
              notes: String.raw`Swapping two rows changes the sign; multiplying a $3\times3$ matrix by $k$ multiplies the determinant by $k^3$.`,
              tags: ['determinant', '3x3 determinant', 'cofactor expansion', 'minors'],
            },
            {
              id: 'g12-matsys-inverse',
              title: 'Inverse matrix',
              expression: String.raw`A^{-1}=\frac{1}{\det A}\operatorname{adj}A,\qquad AA^{-1}=A^{-1}A=I`,
              description:
                'The inverse undoes the matrix. It exists only when the determinant is non-zero.',
              spoken:
                'The inverse of A is one over the determinant of A times the adjugate of A.',
              variables: [
                { symbol: 'A', name: 'square matrix' },
                { symbol: String.raw`\operatorname{adj}A`, name: 'adjugate (transpose of the cofactor matrix)' },
                { symbol: 'I', name: 'identity matrix' },
              ],
              conditions: [String.raw`$\det A\ne0$.`],
              notes: String.raw`For $A=\begin{pmatrix}1&2&3\\0&1&4\\5&6&0\end{pmatrix}$, $\det A=1$ and $A^{-1}=\begin{pmatrix}-24&18&5\\20&-15&-4\\-5&4&1\end{pmatrix}$.`,
              tags: ['inverse matrix', 'adjugate', 'singular matrix', 'identity'],
            },
            {
              id: 'g12-matsys-solve',
              title: 'Solving a system with the inverse',
              expression: String.raw`A\mathbf{x}=\mathbf{b}\ \Rightarrow\ \mathbf{x}=A^{-1}\mathbf{b}`,
              description:
                'When $A$ is invertible, multiply both sides on the left by $A^{-1}$ to get the unique solution.',
              spoken: 'If A x equals b, then x equals the inverse of A times b.',
              variables: [
                { symbol: 'A', name: 'coefficient matrix' },
                { symbol: String.raw`\mathbf{x}`, name: 'column of unknowns' },
                { symbol: String.raw`\mathbf{b}`, name: 'column of constants' },
              ],
              conditions: [String.raw`$\det A\ne0$.`],
              notes: String.raw`Multiply on the left: $A^{-1}\mathbf{b}$, not $\mathbf{b}A^{-1}$.`,
              tags: ['matrix equation', 'linear system', 'unique solution', 'inverse method'],
            },
          ],
          examples: [
            {
              title: 'Solve by Gaussian elimination',
              problem: String.raw`Solve $x+y+z=6$, $2x-y+z=3$, $x+2y-z=2$.`,
              given: [String.raw`Augmented matrix rows: $[1,1,1\mid6]$, $[2,-1,1\mid3]$, $[1,2,-1\mid2]$.`],
              steps: [
                {
                  text: 'Eliminate $x$ below the first row: $R_2\\to R_2-2R_1$ and $R_3\\to R_3-R_1$.',
                  math: String.raw`\begin{pmatrix}1&1&1&6\\0&-3&-1&-9\\0&1&-2&-4\end{pmatrix}`,
                },
                {
                  text: 'Swap $R_2$ and $R_3$ to get a leading $1$ in row 2.',
                  math: String.raw`\begin{pmatrix}1&1&1&6\\0&1&-2&-4\\0&-3&-1&-9\end{pmatrix}`,
                },
                {
                  text: 'Eliminate $y$ from row 3: $R_3\\to R_3+3R_2$.',
                  math: String.raw`\begin{pmatrix}1&1&1&6\\0&1&-2&-4\\0&0&-7&-21\end{pmatrix}`,
                },
                {
                  text: 'Back-substitute: row 3 gives $-7z=-21$, so $z=3$.',
                },
                {
                  text: 'Row 2: $y-2(3)=-4$, so $y=2$. Row 1: $x+2+3=6$, so $x=1$.',
                },
                {
                  text: 'Check in the original equations: $2(1)-2+3=3$ ✓ and $1+2(2)-3=2$ ✓.',
                },
              ],
              answer: String.raw`$(x,y,z)=(1,2,3)$, a unique solution.`,
            },
            {
              title: 'A 3×3 determinant',
              problem: String.raw`Find $\det A$ for $A=\begin{pmatrix}2&1&3\\0&-1&4\\1&2&5\end{pmatrix}$ and decide whether $A$ is invertible.`,
              given: [String.raw`First-row entries $2,1,3$.`],
              steps: [
                {
                  text: 'Expand along the first row.',
                  math: String.raw`\det A=2\big((-1)(5)-4\cdot2\big)-1\big(0\cdot5-4\cdot1\big)+3\big(0\cdot2-(-1)\cdot1\big)`,
                },
                {
                  text: 'Evaluate each minor.',
                  math: String.raw`=2(-13)-1(-4)+3(1)`,
                },
                {
                  text: 'Combine.',
                  math: String.raw`=-26+4+3=-19`,
                },
                {
                  text: String.raw`Since $\det A=-19\ne0$, $A$ is invertible and $A\mathbf{x}=\mathbf{b}$ has a unique solution for every $\mathbf{b}$.`,
                },
              ],
              answer: String.raw`$\det A=-19$, so $A$ is invertible.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Forgetting the alternating signs in the determinant expansion.',
              correction: String.raw`The middle term is subtracted: $+a(\dots)-b(\dots)+c(\dots)$.`,
            },
            {
              mistake: 'Applying a row operation to only the coefficient part of an augmented row.',
              correction: 'Every operation must be applied to the whole row, including the constant.',
            },
            {
              mistake: String.raw`Concluding that $\det A=0$ means no solution.`,
              correction: 'A zero determinant means no unique solution: there may be none or infinitely many. Row reduction decides which.',
            },
          ],
          exercises: [
            {
              id: 'g12-matsys-ex-1',
              type: 'numeric',
              prompt: String.raw`Find $\det\begin{pmatrix}1&2&3\\0&1&4\\5&6&0\end{pmatrix}$.`,
              answer: 1,
              tolerance: 0.01,
              hint: 'Expand along the first row.',
              explanation: String.raw`$1(0-24)-2(0-20)+3(0-5)=-24+40-15=1$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-matsys-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`How many solutions does $x+y=2$, $2x+2y=4$ have?`,
              options: ['Infinitely many', 'Exactly one', 'None', 'Exactly two'],
              correctOption: 0,
              hint: 'Compare the second equation with twice the first.',
              explanation: String.raw`The second equation is $2\times$ the first, so they describe the same line and every point on it is a solution.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-matsys-ex-3',
              type: 'multiple-choice',
              prompt: String.raw`What does the system $x+y=1$, $x+y=3$ have?`,
              options: ['No solution', 'Exactly one solution', 'Infinitely many solutions', 'Exactly two solutions'],
              correctOption: 0,
              hint: 'Subtract the first equation from the second.',
              explanation: String.raw`Subtracting gives $0=2$, a contradiction. The lines are parallel and distinct.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-matsys-ex-4',
              type: 'numeric',
              prompt: String.raw`Solve $x+y+z=9$, $x-y+z=3$, $x+y-z=5$. Find $x$.`,
              answer: 4,
              tolerance: 0.01,
              hint: 'Subtract equations in pairs to find $y$ and $z$ first.',
              explanation: String.raw`Eq1 − Eq2 gives $2y=6$, $y=3$. Eq1 − Eq3 gives $2z=4$, $z=2$. Then $x=9-3-2=4$. Check: $4-3+2=3$ ✓ and $4+3-2=5$ ✓.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-matsys-ex-5',
              type: 'numeric',
              prompt: String.raw`A $3\times3$ matrix $A$ has $\det A=5$. Find $\det(2A)$.`,
              answer: 40,
              tolerance: 0.01,
              hint: 'Each of the three rows is multiplied by 2.',
              explanation: String.raw`Multiplying all three rows by $2$ multiplies the determinant by $2^3=8$, so $\det(2A)=8\times5=40$.`,
              difficulty: 'hard',
            },
          ],
          related: ['matrices-and-determinants', 'systems-of-linear-equations', 'vectors-in-three-dimensions'],
          aliases: ['gaussian elimination', 'row reduction', 'inverse matrix', '3x3 determinant', 'linear system', 'augmented matrix'],
        },
      ],
    },
    {
      id: 'statistics-probability',
      family: 'statistics-probability',
      title: 'Statistics & Probability',
      description:
        'Random variables assign numbers to chance outcomes. The binomial model counts successes in repeated trials, and the normal distribution models continuous data with a bell-shaped curve.',
      theorems: [
        {
          title: 'Mean and variance of a binomial variable',
          statement: String.raw`If $X\sim B(n,p)$, then $E(X)=np$ and $\operatorname{Var}(X)=np(1-p)$.`,
          note: 'This follows because X is a sum of n independent trials, each with mean p and variance p(1−p).',
        },
      ],
      topics: [
        {
          id: 'random-variables-and-distributions',
          title: 'Random Variables & the Binomial Distribution',
          subtitle: 'Expectation, variance, and counting successes',
          introduction: String.raw`A random variable $X$ assigns a number to each outcome of a chance experiment. Its distribution lists the probabilities, its expectation $E(X)$ gives the long-run average, and its variance measures the spread. The binomial distribution models the number of successes in $n$ independent trials with constant success probability $p$.`,
          prerequisites: ['Probability rules and counting', 'Variance and distributions (Grade 11)', 'Combinations and the binomial theorem'],
          keyIdeas: [
            String.raw`$E(X)=\sum xp$ and $\operatorname{Var}(X)=E(X^2)-[E(X)]^2$.`,
            String.raw`Linear change: $E(aX+b)=aE(X)+b$ and $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.`,
            String.raw`Binomial: $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$.`,
            String.raw`Binomial mean $np$, variance $np(1-p)$.`,
          ],
          theory: [
            {
              title: 'Expectation and variance',
              body: [
                String.raw`For a discrete variable, $E(X)=\sum xP(X=x)$ and $\operatorname{Var}(X)=E(X^2)-[E(X)]^2$, with $E(X^2)=\sum x^2P(X=x)$. The standard deviation is $\sqrt{\operatorname{Var}(X)}$.`,
                String.raw`Adding a constant shifts the mean but not the variance. Scaling by $a$ scales the mean by $a$ and the variance by $a^2$.`,
              ],
            },
            {
              title: 'The binomial model',
              body: [
                String.raw`Suppose there are $n$ fixed, independent trials, each with two outcomes (success or failure) and the same success probability $p$. Let $X$ be the number of successes; write $X\sim B(n,p)$.`,
                String.raw`A particular arrangement with $k$ successes has probability $p^k(1-p)^{n-k}$, and there are $\binom{n}{k}$ such arrangements, giving $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$ for $k=0,1,\dots,n$.`,
              ],
            },
            {
              title: 'Mean and variance of B(n, p)',
              body: [
                String.raw`$E(X)=np$ and $\operatorname{Var}(X)=np(1-p)$. For $n=5$, $p=0.3$ the mean is $1.5$ and the variance is $1.05$.`,
                String.raw`For "at least one" questions, use the complement: $P(X\ge1)=1-(1-p)^n$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-randvar-expectation-variance',
              title: 'Expectation and variance',
              expression: String.raw`E(X)=\sum x\,p,\qquad \operatorname{Var}(X)=E(X^2)-[E(X)]^2`,
              description:
                'The probability-weighted mean and the spread of a discrete random variable.',
              spoken:
                'The expectation of X is the sum of x times p. The variance is the expectation of X squared minus the square of the expectation of X.',
              variables: [
                { symbol: 'x', name: 'value of X' },
                { symbol: 'p', name: 'P(X = x)', note: 'between 0 and 1' },
              ],
              conditions: [String.raw`$\sum p=1$ and every $p\ge0$.`],
              notes: String.raw`$E(aX+b)=aE(X)+b$ and $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.`,
              tags: ['expectation', 'expected value', 'variance', 'random variable'],
            },
            {
              id: 'g12-randvar-binomial-pmf',
              title: 'Binomial probability',
              expression: String.raw`P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}`,
              description:
                'The probability of exactly $k$ successes in $n$ independent trials with success probability $p$.',
              spoken:
                'The probability of k successes is n choose k times p to the k times one minus p to the n minus k.',
              variables: [
                { symbol: 'n', name: 'number of trials', note: 'positive integer' },
                { symbol: 'k', name: 'number of successes', note: 'integer from 0 to n' },
                { symbol: 'p', name: 'probability of success on each trial', note: 'between 0 and 1' },
              ],
              conditions: ['Trials are independent.', String.raw`$p$ is the same on every trial.`, 'Each trial has exactly two outcomes.'],
              notes: String.raw`For $B(5,0.3)$: $P(X=2)=10(0.09)(0.343)=0.3087$.`,
              tags: ['binomial distribution', 'binomial probability', 'n choose k', 'bernoulli trials'],
            },
            {
              id: 'g12-randvar-binomial-moments',
              title: 'Binomial mean and variance',
              expression: String.raw`E(X)=np,\qquad \operatorname{Var}(X)=np(1-p)`,
              description:
                'The expected number of successes and the variance for $X\\sim B(n,p)$.',
              spoken: 'The mean is n times p, and the variance is n times p times one minus p.',
              variables: [
                { symbol: 'n', name: 'number of trials' },
                { symbol: 'p', name: 'success probability' },
              ],
              conditions: ['$X\\sim B(n,p)$.'],
              notes: String.raw`The standard deviation is $\sqrt{np(1-p)}$.`,
              tags: ['binomial mean', 'binomial variance', 'np', 'npq'],
            },
          ],
          examples: [
            {
              title: 'Binomial probabilities',
              problem: String.raw`A trial succeeds with probability $0.3$, and $5$ independent trials are made. Find $P(X=2)$, $P(X\ge1)$, the mean and the variance.`,
              given: [String.raw`$X\sim B(5,0.3)$, so $n=5$, $p=0.3$, $1-p=0.7$.`],
              steps: [
                {
                  text: 'Apply the binomial formula with $k=2$.',
                  math: String.raw`P(X=2)=\binom{5}{2}(0.3)^2(0.7)^3`,
                },
                {
                  text: 'Evaluate: $\\binom{5}{2}=10$, $0.3^2=0.09$, $0.7^3=0.343$.',
                  math: String.raw`P(X=2)=10\times0.09\times0.343=0.3087`,
                },
                {
                  text: 'Use the complement for $P(X\\ge1)$.',
                  math: String.raw`P(X\ge1)=1-0.7^5=1-0.16807=0.83193`,
                },
                {
                  text: 'Mean and variance.',
                  math: String.raw`E(X)=5(0.3)=1.5,\qquad \operatorname{Var}(X)=5(0.3)(0.7)=1.05`,
                },
              ],
              answer: String.raw`$P(X=2)=0.3087$, $P(X\ge1)\approx0.8319$, $E(X)=1.5$, $\operatorname{Var}(X)=1.05$.`,
            },
            {
              title: 'A distribution defined by a rule',
              problem: String.raw`$P(X=x)=kx$ for $x=1,2,3,4$. Find $k$, $E(X)$ and $\operatorname{Var}(X)$.`,
              given: [String.raw`$P(X=x)=kx$ for $x=1,2,3,4$ and zero otherwise.`],
              steps: [
                {
                  text: 'Probabilities sum to $1$.',
                  math: String.raw`k(1+2+3+4)=10k=1\ \Rightarrow\ k=0.1`,
                },
                {
                  text: 'Expectation.',
                  math: String.raw`E(X)=\frac{1(1)+2(2)+3(3)+4(4)}{10}=\frac{30}{10}=3`,
                },
                {
                  text: 'Mean of squares.',
                  math: String.raw`E(X^2)=\frac{1+8+27+64}{10}=\frac{100}{10}=10`,
                },
                {
                  text: 'Variance.',
                  math: String.raw`\operatorname{Var}(X)=10-3^2=1`,
                },
              ],
              answer: String.raw`$k=0.1$, $E(X)=3$, $\operatorname{Var}(X)=1$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Leaving out the $\binom{n}{k}$ factor in the binomial formula.`,
              correction: String.raw`$p^k(1-p)^{n-k}$ is the probability of one arrangement; multiply by the number of arrangements $\binom{n}{k}$.`,
            },
            {
              mistake: String.raw`Using $\operatorname{Var}(aX+b)=a\operatorname{Var}(X)+b$.`,
              correction: String.raw`Variance squares the scale and ignores the shift: $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$.`,
            },
            {
              mistake: 'Using the binomial model when trials are not independent or the probability changes.',
              correction: 'Drawing without replacement from a small population changes the probability each time, so the binomial model does not apply exactly.',
            },
          ],
          exercises: [
            {
              id: 'g12-randvar-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`If $X\sim B(10,0.2)$, find $E(X)$.`,
              options: ['$2$', '$1.6$', '$8$', '$0.2$'],
              correctOption: 0,
              hint: String.raw`Use $np$.`,
              explanation: String.raw`$E(X)=10(0.2)=2$. The value $1.6$ is the variance, $10(0.2)(0.8)$.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-randvar-ex-2',
              type: 'numeric',
              prompt: String.raw`$X\sim B(4,0.5)$. Find $P(X=2)$.`,
              answer: 0.375,
              tolerance: 0.001,
              hint: String.raw`$\binom{4}{2}=6$.`,
              explanation: String.raw`$6(0.5)^2(0.5)^2=6/16=0.375$.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-randvar-ex-3',
              type: 'numeric',
              prompt: String.raw`$P(X=0)=0.2$, $P(X=1)=0.5$, $P(X=2)=0.3$. Find $E(X)$.`,
              answer: 1.1,
              tolerance: 0.01,
              hint: 'Weight each value by its probability.',
              explanation: String.raw`$E(X)=0+0.5+0.6=1.1$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-randvar-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`If $\operatorname{Var}(X)=4$, find $\operatorname{Var}(3X+2)$.`,
              options: ['$36$', '$14$', '$12$', '$38$'],
              correctOption: 0,
              hint: 'The constant added does not affect the variance; the multiplier is squared.',
              explanation: String.raw`$\operatorname{Var}(3X+2)=3^2\times4=36$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-randvar-ex-5',
              type: 'numeric',
              prompt: String.raw`$X\sim B(5,0.2)$. Find $P(X\le1)$.`,
              answer: 0.73728,
              tolerance: 0.001,
              hint: String.raw`$P(X\le1)=P(X=0)+P(X=1)$.`,
              explanation: String.raw`$P(X=0)=0.8^5=0.32768$ and $P(X=1)=5(0.2)(0.8)^4=0.4096$. The sum is $0.73728$.`,
              difficulty: 'hard',
            },
          ],
          related: ['statistics-variance-and-distributions', 'probability-rules-and-counting', 'binomial-theorem', 'permutations-and-combinations'],
          aliases: ['random variable', 'expected value', 'binomial distribution', 'bernoulli trials', 'probability distribution'],
        },
        {
          id: 'normal-distribution',
          title: 'The Normal Distribution',
          subtitle: 'Bell curves, z-scores, and the empirical rule',
          introduction: String.raw`The normal distribution $N(\mu,\sigma^2)$ is the symmetric bell-shaped model for many continuous measurements. Any normal value can be converted to a $z$-score, the number of standard deviations from the mean, so a single standard normal table or calculator handles every normal distribution.`,
          prerequisites: ['Mean and standard deviation', 'Random variables', 'Area as probability'],
          keyIdeas: [
            String.raw`$z=\frac{x-\mu}{\sigma}$.`,
            String.raw`For a continuous variable, probability is area under the curve and $P(X=x)=0$.`,
            'About 68%, 95% and 99.7% of values lie within 1, 2 and 3 standard deviations.',
            String.raw`Symmetry: $\Phi(-z)=1-\Phi(z)$.`,
          ],
          theory: [
            {
              title: 'Shape and parameters',
              body: [
                String.raw`$X\sim N(\mu,\sigma^2)$ has its peak at $\mu$, is symmetric about it, and has inflection points at $\mu\pm\sigma$. The standard normal $Z\sim N(0,1)$ has $\mu=0$ and $\sigma=1$.`,
                'The total area is $1$. Because the variable is continuous, the probability of any single exact value is $0$, so $P(X<a)=P(X\\le a)$.',
              ],
            },
            {
              title: 'Standardising with z-scores',
              body: [
                String.raw`The $z$-score $z=\frac{x-\mu}{\sigma}$ converts a value to standard units. Write $\Phi(z)=P(Z<z)$. Then $P(X<x)=\Phi(z)$ and $P(a<X<b)=\Phi(z_b)-\Phi(z_a)$.`,
                String.raw`Selected values: $\Phi(0)=0.5$, $\Phi(1)=0.8413$, $\Phi(1.5)=0.9332$, $\Phi(1.96)=0.9750$, $\Phi(2)=0.9772$, $\Phi(3)=0.9987$. For negative $z$ use $\Phi(-z)=1-\Phi(z)$.`,
              ],
              bullets: [
                'These values come from standard tables and are rounded to four decimal places, so answers are approximate. Calculators may differ in the last digit.',
              ],
            },
            {
              title: 'The empirical rule',
              body: [
                String.raw`$P(|Z|<1)\approx0.6827$, $P(|Z|<2)\approx0.9545$ and $P(|Z|<3)\approx0.9973$, commonly rounded to $68\%$, $95\%$ and $99.7\%$. Also, $P(|Z|<1.96)\approx0.95$, the origin of the familiar $95\%$ interval.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g12-normal-zscore',
              title: 'z-score',
              expression: String.raw`z=\frac{x-\mu}{\sigma}`,
              description:
                'The number of standard deviations a value lies above (positive) or below (negative) the mean.',
              spoken: 'z equals x minus mu, all divided by sigma.',
              variables: [
                { symbol: 'x', name: 'observed value' },
                { symbol: String.raw`\mu`, name: 'mean' },
                { symbol: String.raw`\sigma`, name: 'standard deviation', note: 'positive' },
              ],
              conditions: [String.raw`$\sigma>0$.`],
              notes: String.raw`To reverse the process, $x=\mu+z\sigma$.`,
              tags: ['z-score', 'standardise', 'standard score', 'normal distribution'],
            },
            {
              id: 'g12-normal-empirical',
              title: 'Empirical rule',
              expression: String.raw`P(\mu-k\sigma<X<\mu+k\sigma)\approx0.683,\ 0.954,\ 0.997\quad(k=1,2,3)`,
              description:
                'For a normal variable, the probability of lying within $k$ standard deviations of the mean.',
              spoken:
                'Within one, two, and three standard deviations of the mean lie about sixty-eight, ninety-five, and ninety-nine point seven percent.',
              variables: [
                { symbol: 'k', name: 'number of standard deviations' },
                { symbol: String.raw`\mu,\sigma`, name: 'mean and standard deviation' },
              ],
              conditions: ['The variable is normally distributed.'],
              notes: 'Exact values are $0.6827$, $0.9545$ and $0.9973$ to four decimal places.',
              tags: ['empirical rule', '68-95-99.7', 'three sigma rule', 'bell curve'],
            },
            {
              id: 'g12-normal-probability',
              title: 'Probability between two values',
              expression: String.raw`P(a<X<b)=\Phi\!\left(\frac{b-\mu}{\sigma}\right)-\Phi\!\left(\frac{a-\mu}{\sigma}\right)`,
              description:
                'Standardise both endpoints and subtract the standard normal cumulative probabilities.',
              spoken:
                'The probability that X lies between a and b is Phi of z for b minus Phi of z for a.',
              variables: [
                { symbol: String.raw`\Phi(z)`, name: 'standard normal cumulative probability P(Z < z)', note: 'read from a table or calculator' },
                { symbol: 'a,b', name: 'interval endpoints', note: 'a < b' },
              ],
              conditions: ['$X\\sim N(\\mu,\\sigma^2)$ and $a<b$.'],
              notes: String.raw`Table values are approximate. For upper tails, $P(X>b)=1-\Phi(z_b)$.`,
              tags: ['standard normal', 'cumulative probability', 'normal probability', 'Phi'],
            },
          ],
          examples: [
            {
              title: 'Probabilities with standard units',
              problem: String.raw`Test scores are $N(100,15^2)$. Find $P(X<130)$ and $P(85<X<115)$.`,
              given: [String.raw`$\mu=100$, $\sigma=15$; $\Phi(2)=0.9772$ and $\Phi(1)=0.8413$ (table values).`],
              steps: [
                {
                  text: 'Standardise $130$.',
                  math: String.raw`z=\frac{130-100}{15}=2`,
                },
                {
                  text: 'Read the table.',
                  math: String.raw`P(X<130)=\Phi(2)\approx0.9772`,
                },
                {
                  text: 'Standardise $85$ and $115$: $z=-1$ and $z=1$.',
                },
                {
                  text: 'Subtract, using symmetry $\\Phi(-1)=1-0.8413=0.1587$.',
                  math: String.raw`P(85<X<115)=0.8413-0.1587=0.6826`,
                },
                {
                  text: 'This matches the $68\\%$ empirical rule.',
                },
              ],
              answer: String.raw`$P(X<130)\approx0.9772$ and $P(85<X<115)\approx0.6826$ (about $0.683$ with a more precise table).`,
            },
            {
              title: 'Tail probability and a percentile',
              problem: String.raw`A packet mass is $N(250,4^2)$ grams. Find $P(X>256)$ and the mass that is exceeded by only $2.5\%$ of packets.`,
              given: [String.raw`$\mu=250$, $\sigma=4$; $\Phi(1.5)=0.9332$; $\Phi(1.96)=0.9750$.`],
              steps: [
                {
                  text: 'Standardise $256$.',
                  math: String.raw`z=\frac{256-250}{4}=1.5`,
                },
                {
                  text: 'Upper tail.',
                  math: String.raw`P(X>256)=1-\Phi(1.5)=1-0.9332=0.0668`,
                },
                {
                  text: 'Top $2.5\\%$ means $\\Phi(z)=0.975$, so $z=1.96$.',
                },
                {
                  text: 'Convert back.',
                  math: String.raw`x=\mu+z\sigma=250+1.96(4)=257.84`,
                },
              ],
              answer: String.raw`$P(X>256)\approx0.0668$; the $97.5$th percentile is about $257.84$ g.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Dividing by the variance instead of the standard deviation when computing $z$.',
              correction: String.raw`Use $\sigma$, not $\sigma^2$. If $X\sim N(250,4^2)$, then $\sigma=4$.`,
            },
            {
              mistake: String.raw`Reading $\Phi(z)$ as the upper-tail probability.`,
              correction: String.raw`$\Phi(z)=P(Z<z)$ is the lower tail. For $P(Z>z)$ compute $1-\Phi(z)$.`,
            },
            {
              mistake: 'Treating table values as exact.',
              correction: 'Standard tables are rounded to four decimals, so quote results as approximations.',
            },
          ],
          exercises: [
            {
              id: 'g12-normal-ex-1',
              type: 'numeric',
              prompt: String.raw`$X\sim N(70,6^2)$. Find the $z$-score of $x=82$.`,
              answer: 2,
              tolerance: 0.01,
              hint: String.raw`$z=\frac{x-\mu}{\sigma}$.`,
              explanation: String.raw`$z=\frac{82-70}{6}=2$.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-normal-ex-2',
              type: 'multiple-choice',
              prompt: 'About what proportion of a normal distribution lies within 3 standard deviations of the mean?',
              options: ['$99.7\\%$', '$95\\%$', '$68\\%$', '$100\\%$'],
              correctOption: 0,
              hint: 'Recall the three standard percentages.',
              explanation: String.raw`The empirical rule gives about $99.7\%$ (exactly $0.9973$). It is not $100\%$ because the tails extend indefinitely.`,
              difficulty: 'easy',
            },
            {
              id: 'g12-normal-ex-3',
              type: 'numeric',
              prompt: String.raw`For the standard normal $Z$, find $P(Z<1)$ using a table value (give four decimals).`,
              answer: 0.8413,
              tolerance: 0.001,
              hint: String.raw`This is $\Phi(1)$.`,
              explanation: String.raw`From the standard normal table, $\Phi(1)=0.8413$ (approximate).`,
              difficulty: 'medium',
            },
            {
              id: 'g12-normal-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`Scores are $N(50,10^2)$. What is the $z$-score of $35$?`,
              options: ['$-1.5$', '$1.5$', '$-15$', '$-0.15$'],
              correctOption: 0,
              hint: 'The score is below the mean, so $z$ is negative.',
              explanation: String.raw`$z=\frac{35-50}{10}=-1.5$.`,
              difficulty: 'medium',
            },
            {
              id: 'g12-normal-ex-5',
              type: 'numeric',
              prompt: String.raw`$X\sim N(70,8^2)$. Find $P(X>86)$, using $\Phi(2)=0.9772$.`,
              answer: 0.0228,
              tolerance: 0.001,
              hint: 'Standardise first, then use the upper tail.',
              explanation: String.raw`$z=\frac{86-70}{8}=2$, so $P(X>86)=1-\Phi(2)=1-0.9772=0.0228$.`,
              difficulty: 'hard',
            },
          ],
          related: ['statistics-variance-and-distributions', 'random-variables-and-distributions', 'statistics-center-and-spread'],
          aliases: ['normal curve', 'bell curve', 'gaussian', 'z-score', 'standard normal', 'empirical rule'],
        },
      ],
    },
  ],
}
