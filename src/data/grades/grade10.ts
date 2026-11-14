import type { Grade } from '../../types/content'

export const grade10: Grade = {
  id: '10',
  number: 10,
  title: 'Grade 10',
  tagline: 'Functions, proof, and the first steps into trigonometric modeling.',
  description:
    'Grade 10 turns algebra into a study of functions, adds formal geometric proof and circle theorems, and introduces right-triangle and general triangle trigonometry. Statistics shifts from describing data to measuring spread and reasoning with probability rules.',
  focus: [
    'Quadratic equations, the discriminant, and completing the square',
    'Function families, transformations, and exponential models',
    'Deductive proof, isometries, and circle theorems',
    'Right-triangle and general triangle trigonometry',
    'Center, spread, counting, and probability rules',
  ],
  subjects: [
    {
      id: 'algebra',
      family: 'algebra',
      title: 'Algebra',
      description:
        'Quadratics, function families, exponential models, and systems of inequalities. The emphasis is on connecting an equation to its graph and choosing a method deliberately.',
      theorems: [
        {
          title: 'Quadratic formula theorem',
          statement:
            'If $a \\ne 0$, the equation $ax^2+bx+c=0$ has real solutions $x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$ whenever $b^2-4ac \\ge 0$.',
          note: 'The denominator $2a$ divides the entire numerator, including both $-b$ and the square root.',
        },
        {
          title: 'Discriminant test',
          statement:
            'For $ax^2+bx+c=0$ with $a \\ne 0$, the equation has two distinct real solutions when $b^2-4ac>0$, one real solution when $b^2-4ac=0$, and no real solutions when $b^2-4ac<0$.',
          note: 'The discriminant also reports how many times the corresponding parabola crosses the $x$-axis.',
        },
      ],
      topics: [
        {
          id: 'quadratic-equations',
          title: 'Quadratic Equations',
          subtitle: 'Solve by factoring, completing the square, or the formula, and read the discriminant.',
          introduction:
            'A quadratic equation describes a parabola meeting a horizontal line. Its solutions can be read from a graph, uncovered by factoring, or computed directly with the quadratic formula. The formula always works, but the discriminant tells you in advance how many real solutions to expect.',
          prerequisites: [
            'Factoring quadratic expressions',
            'Simplifying radical expressions',
            'Graphing linear and quadratic functions',
          ],
          keyIdeas: [
            'Standard form is $ax^2+bx+c=0$ with $a \\ne 0$.',
            'The zero-product principle turns factors into solutions.',
            'Completing the square produces both the vertex form and the quadratic formula.',
            'The discriminant $b^2-4ac$ decides the number of real roots.',
            'Context can rule out a mathematically valid root.',
          ],
          theory: [
            {
              title: 'Standard form and the zero-product principle',
              body: [
                'Every quadratic equation can be rearranged into the standard form $ax^2+bx+c=0$, where $a$, $b$, and $c$ are constants and $a \\ne 0$. A solution is a value of $x$ that makes the left-hand side equal to zero.',
                'Factoring is the quickest method when the factors are visible. If a product equals zero, at least one factor must be zero. So $(x-r)(x-s)=0$ gives $x=r$ or $x=s$. This principle is valid because the real numbers have no zero divisors.',
                'Factoring becomes unreliable when the roots are irrational or the coefficients are awkward. The quadratic formula handles every case without guesswork.',
              ],
              bullets: [
                'Move every term to one side before identifying $a$, $b$, and $c$.',
                'Keep the sign of each coefficient: in $2x^2-7x+3=0$, $b=-7$.',
                'A quadratic can have two, one, or no real solutions.',
              ],
            },
            {
              title: 'Completing the square and the formula',
              body: [
                'Completing the square rewrites $x^2+bx+c$ as a perfect square plus a constant. Take half of $b$, square it, and balance the expression: $x^2+bx+c = \\left(x+\\frac{b}{2}\\right)^2 + c - \\frac{b^2}{4}$.',
                'Applying the same move to $ax^2+bx+c=0$ gives the quadratic formula. First divide by $a$, then complete the square on $x^2+\\frac{b}{a}x$, and finally take square roots. The result is $x=\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$.',
                'When $a \\ne 1$, divide every term by $a$ before completing the square. Do not divide only the first two terms.',
              ],
              bullets: [
                'Add and subtract $(b/2)^2$ inside the same expression.',
                'The vertex form $y=a(x-h)^2+k$ comes from the same rearrangement.',
                'The formula is a shortcut for the completed-square calculation.',
              ],
            },
            {
              title: 'The discriminant and the graph',
              body: [
                'The discriminant is $\\Delta=b^2-4ac$, the expression under the square root. Its sign determines the nature of the roots and the number of $x$-intercepts of the parabola $y=ax^2+bx+c$.',
                'The vertex of the parabola is at $x=-\\frac{b}{2a}$. When the discriminant is zero, that vertex lies exactly on the $x$-axis, so the equation has one repeated real root.',
              ],
              bullets: [
                '$\\Delta>0$: two distinct real roots; the parabola crosses the $x$-axis twice.',
                '$\\Delta=0$: one repeated real root; the parabola touches the $x$-axis at its vertex.',
                '$\\Delta<0$: no real roots; the parabola never meets the $x$-axis.',
              ],
            },
            {
              title: 'Modeling and rejecting solutions',
              body: [
                'In an applied problem, an equation may produce a negative root that cannot describe the situation. A length, a time after launch, or a number of objects must usually be non-negative, so reject roots that violate the context even when the algebra is correct.',
                'Always state units in the answer and check the result in the original model. For a projectile, the positive root is normally the landing time; the negative root would describe a time before the motion began.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-quadratic-formula-standard',
              title: 'Quadratic formula',
              expression: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`,
              description:
                'Gives the real solutions of any quadratic equation written in standard form $ax^2+bx+c=0$.',
              spoken:
                'x equals negative b, plus or minus the square root of b squared minus four a c, all divided by two a.',
              variables: [
                { symbol: 'a', name: 'coefficient of $x^2$', note: 'must be nonzero' },
                { symbol: 'b', name: 'coefficient of $x$' },
                { symbol: 'c', name: 'constant term' },
                { symbol: 'x', name: 'unknown value' },
              ],
              conditions: [
                '$a \\ne 0$',
                '$b^2-4ac \\ge 0$ for real solutions',
              ],
              notes:
                'The fraction bar covers the whole numerator. Both $-b$ and the square root are divided by $2a$.',
              tags: ['quadratic formula', 'roots', 'solve quadratic', 'standard form'],
            },
            {
              id: 'g10-quadratic-discriminant',
              title: 'Discriminant',
              expression: String.raw`\Delta = b^2 - 4ac`,
              description:
                'Classifies the roots of $ax^2+bx+c=0$ without solving the equation.',
              spoken: 'Delta equals b squared minus four a c.',
              variables: [
                { symbol: '\\Delta', name: 'discriminant' },
                { symbol: 'a', name: 'coefficient of $x^2$', note: 'must be nonzero' },
                { symbol: 'b', name: 'coefficient of $x$' },
                { symbol: 'c', name: 'constant term' },
              ],
              conditions: ['$a \\ne 0$'],
              notes:
                'Positive gives two real roots, zero gives one repeated real root, and negative gives no real roots.',
              tags: ['discriminant', 'nature of roots', 'number of solutions', 'parabola'],
            },
            {
              id: 'g10-quadratic-completing-square',
              title: 'Completing the square identity',
              expression: String.raw`x^2 + bx + c = \left(x+\frac{b}{2}\right)^2 + c - \frac{b^2}{4}`,
              description:
                'Rewrites a monic quadratic as a perfect square plus a constant, exposing the vertex.',
              spoken:
                'x squared plus b x plus c equals x plus b over two, squared, plus c minus b squared over four.',
              variables: [
                { symbol: 'x', name: 'variable' },
                { symbol: 'b', name: 'coefficient of $x$' },
                { symbol: 'c', name: 'constant term' },
              ],
              conditions: ['The $x^2$ coefficient must be 1; divide first otherwise'],
              notes:
                'The constant outside is $c-b^2/4$. The vertex of $y=x^2+bx+c$ is at $\\left(-\\frac{b}{2}, c-\\frac{b^2}{4}\\right)$.',
              tags: ['completing the square', 'vertex form', 'rewrite quadratic'],
            },
            {
              id: 'g10-quadratic-vertex-form',
              title: 'Vertex form of a parabola',
              expression: String.raw`y = a(x-h)^2 + k, \quad h = -\frac{b}{2a}, \quad k = c - \frac{b^2}{4a}`,
              description:
                'Converts $y=ax^2+bx+c$ into a form that displays the vertex and the direction of opening.',
              spoken:
                'y equals a times x minus h, squared, plus k, where h equals negative b over two a and k equals c minus b squared over four a.',
              variables: [
                { symbol: 'a', name: 'vertical scale factor', note: 'must be nonzero' },
                { symbol: 'h', name: 'x-coordinate of the vertex' },
                { symbol: 'k', name: 'y-coordinate of the vertex' },
                { symbol: 'x, y', name: 'coordinates of a point on the parabola' },
              ],
              conditions: ['$a \\ne 0$'],
              notes:
                'The vertex is $(h,k)$ and the axis of symmetry is $x=h$. If $a>0$ the parabola opens upward.',
              tags: ['vertex form', 'parabola', 'axis of symmetry', 'maximum minimum'],
            },
          ],
          examples: [
            {
              title: 'Using the quadratic formula',
              problem: 'Solve $2x^2 - 7x + 3 = 0$.',
              given: [
                'The equation is already in standard form.',
                '$a = 2$, $b = -7$, $c = 3$.',
              ],
              steps: [
                {
                  text: 'Identify the coefficients, keeping the negative sign on $b$.',
                  math: String.raw`a = 2, \quad b = -7, \quad c = 3`,
                },
                {
                  text: 'Compute the discriminant first.',
                  math: String.raw`\Delta = (-7)^2 - 4(2)(3) = 49 - 24 = 25`,
                },
                {
                  text: 'Substitute into the quadratic formula. Since $-b=7$, the numerator begins with $7$.',
                  math: String.raw`x = \frac{7 \pm \sqrt{25}}{2(2)} = \frac{7 \pm 5}{4}`,
                },
                {
                  text: 'Split the plus and minus cases.',
                  math: String.raw`x = \frac{7+5}{4} = 3 \quad \text{or} \quad x = \frac{7-5}{4} = \frac{1}{2}`,
                },
                {
                  text: 'Check both roots in the original equation. For $x=3$: $18-21+3=0$. For $x=\\frac{1}{2}$: $\\frac{1}{2}-\\frac{7}{2}+3=0$.',
                  math: String.raw`2(3)^2 - 7(3) + 3 = 0, \quad 2\left(\frac{1}{2}\right)^2 - 7\left(\frac{1}{2}\right) + 3 = 0`,
                },
              ],
              answer: '$x = 3$ or $x = \\frac{1}{2}$. Both roots are exact, so no rounding is needed.',
            },
            {
              title: 'When does the ball land?',
              problem:
                'A ball is kicked from a platform. Its height after $t$ seconds is $h(t) = -5t^2 + 20t + 10$ meters. How long is the ball in the air?',
              given: [
                '$h(t) = -5t^2 + 20t + 10$ with $h$ in meters and $t$ in seconds.',
                'The ball lands when $h(t)=0$ and $t \\ge 0$.',
              ],
              steps: [
                {
                  text: 'Set the height equal to zero.',
                  math: String.raw`-5t^2 + 20t + 10 = 0`,
                },
                {
                  text: 'Divide every term by $-5$ to make the leading coefficient 1.',
                  math: String.raw`t^2 - 4t - 2 = 0`,
                },
                {
                  text: 'Identify the coefficients and compute the discriminant.',
                  math: String.raw`a = 1, \quad b = -4, \quad c = -2, \quad \Delta = 16 + 8 = 24`,
                },
                {
                  text: 'Apply the quadratic formula.',
                  math: String.raw`t = \frac{4 \pm \sqrt{24}}{2}`,
                },
                {
                  text: 'Simplify the radical: $\\sqrt{24} = \\sqrt{4 \\cdot 6} = 2\\sqrt{6}$. Then divide both terms by 2.',
                  math: String.raw`t = \frac{4 \pm 2\sqrt{6}}{2} = 2 \pm \sqrt{6}`,
                },
                {
                  text: 'Approximate and reject the negative time. Since $\\sqrt{6} \\approx 2.449$, the roots are about $4.449$ and $-0.449$.',
                  math: String.raw`t = 2 + \sqrt{6} \approx 4.45 \quad (t \ge 0)`,
                },
              ],
              answer:
                'The ball is in the air for $t = 2+\\sqrt{6} \\approx 4.45$ seconds. The negative root is discarded because time cannot be negative.',
            },
          ],
          mistakes: [
            {
              mistake: 'Dividing only $-b$ by $2a$ and leaving the square root separate.',
              correction:
                'The fraction bar divides the whole numerator by $2a$: $x=\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$, not $-\\frac{b}{2a} \\pm \\sqrt{b^2-4ac}$.',
            },
            {
              mistake: 'Forgetting the $\\pm$ and reporting only one root.',
              correction:
                'A positive discriminant produces two roots, one from adding the square root and one from subtracting it.',
            },
            {
              mistake: 'Taking the square root of a negative discriminant and expecting a real answer.',
              correction:
                'If $b^2-4ac<0$, the equation has no real roots. The parabola does not cross the $x$-axis.',
            },
            {
              mistake: 'Accepting a negative length or negative time because it solves the equation.',
              correction:
                'Check the context. Quantities such as lengths and elapsed times must satisfy their own restrictions.',
            },
          ],
          exercises: [
            {
              id: 'g10-quadratic-ex-1',
              type: 'multiple-choice',
              prompt: 'How many distinct real solutions does $x^2 - 6x + 9 = 0$ have?',
              options: [
                'Two distinct real solutions',
                'Exactly one real solution',
                'No real solutions',
                'Infinitely many solutions',
              ],
              correctOption: 1,
              hint: 'Compute $b^2-4ac$.',
              explanation:
                'Here $a=1$, $b=-6$, and $c=9$, so $\\Delta=36-36=0$. A zero discriminant gives one repeated real solution, namely $x=3$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-quadratic-ex-2',
              type: 'multiple-choice',
              prompt: 'Which equation is equivalent to $x^2 - 8x + 3 = 0$ after completing the square?',
              options: [
                '$(x-4)^2 = 13$',
                '$(x-4)^2 = 19$',
                '$(x+4)^2 = 13$',
                '$(x-4)^2 = -13$',
              ],
              correctOption: 0,
              hint: 'Write $x^2-8x$ as $(x-4)^2-16$.',
              explanation:
                'Since $x^2-8x=(x-4)^2-16$, the equation becomes $(x-4)^2-16+3=0$, so $(x-4)^2=13$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-quadratic-ex-3',
              type: 'numeric',
              prompt: 'Find the positive solution of $x^2 + 2x - 15 = 0$.',
              answer: 3,
              tolerance: 0.01,
              hint: 'Factor the quadratic as $(x+5)(x-3)$.',
              explanation:
                'The factorization is $(x+5)(x-3)=0$, giving $x=-5$ or $x=3$. The positive solution is $3$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-quadratic-ex-4',
              type: 'numeric',
              prompt: 'Compute the discriminant of $2x^2 - 3x + 5 = 0$.',
              answer: -31,
              tolerance: 0,
              hint: 'Use $b^2-4ac$ with $b=-3$.',
              explanation:
                '$\\Delta=(-3)^2-4(2)(5)=9-40=-31$. The negative value means the equation has no real roots.',
              difficulty: 'medium',
            },
            {
              id: 'g10-quadratic-ex-5',
              type: 'numeric',
              prompt:
                'A rectangular garden is 2 meters longer than it is wide and has an area of 48 square meters. Find its width.',
              answer: 6,
              tolerance: 0.01,
              answerUnit: 'm',
              hint: 'Let the width be $w$; then $w(w+2)=48$.',
              explanation:
                'The equation is $w^2+2w-48=0$, which factors as $(w+8)(w-6)=0$. Width must be positive, so $w=6$ m and the length is 8 m.',
              difficulty: 'medium',
            },
            {
              id: 'g10-quadratic-ex-6',
              type: 'multiple-choice',
              prompt:
                'For which values of $k$ does $x^2 + kx + 9 = 0$ have exactly one real solution?',
              options: ['$k=6$ only', '$k=-6$ only', '$k=\\pm 6$', '$k=0$'],
              correctOption: 2,
              hint: 'Set the discriminant equal to zero.',
              explanation:
                'Exactly one real solution requires $\\Delta=k^2-36=0$, so $k^2=36$ and $k=\\pm 6$. Both values give a perfect-square quadratic.',
              difficulty: 'hard',
            },
          ],
          related: [
            'quadratic-equations-intro',
            'polynomial-factorization',
            'functions-and-transformations',
          ],
          aliases: ['quadratics', 'second-degree equations', 'roots of a parabola', 'discriminant'],
        },
        {
          id: 'functions-and-transformations',
          title: 'Functions and Transformations',
          subtitle: 'Move, stretch, and reflect the parent graphs without losing domain or range.',
          introduction:
            'A small set of parent functions supplies the vocabulary for a much larger family. Changing a parameter shifts, stretches, or reflects the graph, and each change has a predictable effect on the equation, the table, and the domain and range.',
          prerequisites: [
            'Function notation and domain and range',
            'Graphing linear functions',
            'Quadratic equations and vertex form',
          ],
          keyIdeas: [
            'Parent functions include $y=x$, $y=x^2$, $y=|x|$, and $y=\\frac{1}{x}$.',
            'Inside a function, changes act horizontally and reverse their apparent sign.',
            'Outside a function, changes act vertically in the expected direction.',
            'A negative multiplier reflects the graph across an axis.',
            'Even and odd symmetry describe a graph under $x \\mapsto -x$.',
          ],
          theory: [
            {
              title: 'Four parent functions',
              body: [
                'A parent function is the simplest member of a family. Its graph and key features act as a reference when parameters are introduced.',
                'The linear parent $f(x)=x$ has domain and range all real numbers. The quadratic parent $f(x)=x^2$ has domain all real numbers and range $y \\ge 0$. The absolute value parent $f(x)=|x|$ also has range $y \\ge 0$. The reciprocal parent $f(x)=\\frac{1}{x}$ has domain $x \\ne 0$ and range $y \\ne 0$.',
              ],
              bullets: [
                '$y=x$: straight line through the origin with slope 1.',
                '$y=x^2$: parabola with vertex $(0,0)$ opening upward.',
                '$y=|x|$: V-shape with vertex $(0,0)$.',
                '$y=\\frac{1}{x}$: two branches with asymptotes $x=0$ and $y=0$.',
              ],
            },
            {
              title: 'Translations and reflections',
              body: [
                'The graph of $y=f(x-h)+k$ is the graph of $y=f(x)$ shifted $h$ units right and $k$ units up. The sign inside the bracket feels reversed because the input must be adjusted before the function acts.',
                'Replacing $f(x)$ by $-f(x)$ reflects the graph across the $x$-axis. Replacing $x$ by $-x$ reflects it across the $y$-axis. These two reflections are different operations and generally produce different graphs.',
              ],
              bullets: [
                '$f(x-3)$ shifts right 3; $f(x+3)$ shifts left 3.',
                '$f(x)+4$ shifts up 4; $f(x)-4$ shifts down 4.',
                '$-f(x)$ flips vertically; $f(-x)$ flips horizontally.',
              ],
            },
            {
              title: 'Stretches and order of operations',
              body: [
                'The graph of $y=a f\\left(\\frac{x}{b}\\right)$ is stretched vertically by a factor of $|a|$ and horizontally by a factor of $|b|$. A negative $a$ adds a reflection across the $x$-axis; a negative $b$ adds a reflection across the $y$-axis.',
                'A horizontal stretch by factor 2 is written $f\\left(\\frac{x}{2}\\right)$, not $f(2x)$. The latter compresses the graph horizontally by a factor of 2. When several transformations are combined, follow the order implied by the equation and test one point to confirm the result.',
              ],
              bullets: [
                'Vertical stretch by 3: multiply the output by 3.',
                'Horizontal stretch by 2: divide the input by 2 before applying $f$.',
                'The order of transformations can change the final graph.',
              ],
            },
            {
              title: 'Domain, range, and symmetry',
              body: [
                'Translations and stretches can change the domain and range, but they do not change the overall shape. Read the new domain from the input restriction and the new range from the transformed outputs.',
                'A function is even when $f(-x)=f(x)$ for every $x$ in its domain; its graph is symmetric about the $y$-axis. It is odd when $f(-x)=-f(x)$; its graph has rotational symmetry about the origin. A function need not be either.',
              ],
              bullets: [
                'Even examples: $x^2$, $|x|$, $\\cos x$ (later).',
                'Odd examples: $x$, $x^3$, $\\frac{1}{x}$.',
                'The graph of an odd function is unchanged by a $180^{\\circ}$ rotation about the origin.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-functions-translation',
              title: 'Translations of a graph',
              expression: String.raw`y = f(x-h) + k`,
              description:
                'Shifts the graph of $y=f(x)$ horizontally by $h$ and vertically by $k$.',
              spoken: 'y equals f of x minus h, plus k.',
              variables: [
                { symbol: 'h', name: 'horizontal shift', note: 'positive shifts right' },
                { symbol: 'k', name: 'vertical shift', note: 'positive shifts up' },
                { symbol: 'f', name: 'parent function' },
              ],
              conditions: ['$h$ and $k$ are real constants'],
              notes:
                'The horizontal shift has the opposite sign to the one inside the bracket: $f(x-3)$ moves right.',
              tags: ['translation', 'shift', 'graph transformation', 'parent function'],
            },
            {
              id: 'g10-functions-stretch-reflection',
              title: 'Stretch and reflection factors',
              expression: String.raw`y = a\,f\left(\frac{x}{b}\right)`,
              description:
                'Stretches a graph vertically by $|a|$ and horizontally by $|b|$, with reflections when a factor is negative.',
              spoken:
                'y equals a times f of x over b, where the absolute value of a gives the vertical stretch and the absolute value of b gives the horizontal stretch.',
              variables: [
                { symbol: 'a', name: 'vertical stretch factor', note: 'nonzero; negative reflects across the $x$-axis' },
                { symbol: 'b', name: 'horizontal stretch factor', note: 'nonzero; negative reflects across the $y$-axis' },
              ],
              conditions: ['$a \\ne 0$', '$b \\ne 0$'],
              notes:
                'A horizontal stretch by factor 2 uses $f(x/2)$. Writing $f(2x)$ compresses by factor 2 instead.',
              tags: ['stretch', 'compression', 'reflection', 'scale factor'],
            },
            {
              id: 'g10-functions-absolute-value',
              title: 'Transformed absolute value function',
              expression: String.raw`y = a|x-h| + k`,
              description:
                'Places the vertex of an absolute value graph at $(h,k)$ and opens it upward or downward.',
              spoken: 'y equals a times the absolute value of x minus h, plus k.',
              variables: [
                { symbol: 'a', name: 'steepness factor', note: 'negative opens downward' },
                { symbol: 'h', name: 'x-coordinate of the vertex' },
                { symbol: 'k', name: 'y-coordinate of the vertex' },
              ],
              conditions: ['$a \\ne 0$'],
              notes:
                'The vertex is $(h,k)$. The range is $y \\ge k$ when $a>0$ and $y \\le k$ when $a<0$.',
              tags: ['absolute value', 'vertex', 'V-shape', 'piecewise'],
            },
            {
              id: 'g10-functions-even-odd',
              title: 'Even and odd symmetry',
              expression: String.raw`f(-x)=f(x) \ \text{(even)}, \qquad f(-x)=-f(x) \ \text{(odd)}`,
              description:
                'Defines the two main symmetries of a graph: mirror symmetry about the $y$-axis and rotational symmetry about the origin.',
              spoken:
                'A function is even when f of negative x equals f of x, and odd when f of negative x equals negative f of x.',
              variables: [
                { symbol: 'f', name: 'function with a domain symmetric about 0' },
                { symbol: 'x', name: 'input value' },
              ],
              conditions: ['The domain must be symmetric about 0 for the test to make sense'],
              notes:
                'Even: mirror across the $y$-axis. Odd: $180^{\\circ}$ rotation about the origin. Many functions are neither.',
              tags: ['even function', 'odd function', 'symmetry', 'y-axis symmetry'],
            },
          ],
          examples: [
            {
              title: 'Transforming a parabola',
              problem:
                'Describe the transformations that turn $y=x^2$ into $y=-2(x-3)^2+8$. State the vertex, domain, range, and $x$-intercepts.',
              given: ['Parent graph: $y=x^2$.', 'Transformed graph: $y=-2(x-3)^2+8$.'],
              steps: [
                {
                  text: 'The factor $-2$ reflects the parabola across the $x$-axis and stretches it vertically by 2, so it opens downward.',
                  math: String.raw`a=-2<0`,
                },
                {
                  text: 'The expression $x-3$ shifts the graph 3 units right, and the $+8$ shifts it 8 units up.',
                  math: String.raw`(x,y) \mapsto (x+3,\,-2y+8)`,
                },
                {
                  text: 'Read the vertex from the completed-square form.',
                  math: String.raw`(h,k) = (3,8)`,
                },
                {
                  text: 'The domain is unchanged. The range is capped by the vertex because the parabola opens downward.',
                  math: String.raw`\text{domain } \mathbb{R}, \quad \text{range } (-\infty, 8]`,
                },
                {
                  text: 'Find the $x$-intercepts by setting $y=0$.',
                  math: String.raw`-2(x-3)^2+8=0 \Rightarrow (x-3)^2=4 \Rightarrow x=1 \text{ or } x=5`,
                },
              ],
              answer:
                'Reflect across the $x$-axis, stretch vertically by 2, shift right 3 and up 8. Vertex $(3,8)$; domain $\\mathbb{R}$; range $(-\\infty,8]$; $x$-intercepts at $x=1$ and $x=5$.',
            },
            {
              title: 'Reading an absolute value graph',
              problem:
                'For $f(x)=|x+1|-4$, state the vertex, domain, range, and intercepts.',
              given: ['$f(x)=|x+1|-4$ can be written as $|x-(-1)|-4$.'],
              steps: [
                {
                  text: 'Compare with $a|x-h|+k$ to identify the parameters.',
                  math: String.raw`a=1, \quad h=-1, \quad k=-4`,
                },
                {
                  text: 'The vertex is therefore $(-1,-4)$ and the V opens upward.',
                  math: String.raw`\text{vertex } (-1,-4)`,
                },
                {
                  text: 'The domain is all real numbers; the range starts at the vertex height.',
                  math: String.raw`\text{domain } \mathbb{R}, \quad \text{range } [-4,\infty)`,
                },
                {
                  text: 'Set $f(x)=0$ to find the $x$-intercepts.',
                  math: String.raw`|x+1|=4 \Rightarrow x+1=4 \text{ or } x+1=-4 \Rightarrow x=3 \text{ or } x=-5`,
                },
                {
                  text: 'Evaluate at $x=0$ for the $y$-intercept.',
                  math: String.raw`f(0)=|1|-4=-3`,
                },
              ],
              answer:
                'Vertex $(-1,-4)$; domain $\\mathbb{R}$; range $[-4,\\infty)$; $x$-intercepts at $x=3$ and $x=-5$; $y$-intercept at $(0,-3)$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Reading $f(x-3)$ as a shift 3 units left.',
              correction:
                'The graph shifts right 3, because the input must be 3 larger to produce the same output.',
            },
            {
              mistake: 'Writing a horizontal stretch by factor 2 as $f(2x)$.',
              correction:
                'A horizontal stretch by factor 2 is $f\\left(\\frac{x}{2}\\right)$. The form $f(2x)$ compresses horizontally by factor 2.',
            },
            {
              mistake: 'Treating every graph with a line of symmetry as even.',
              correction:
                'Even means symmetry specifically about the $y$-axis: $f(-x)=f(x)$. A parabola can be symmetric about a vertical line $x=h$ without being even.',
            },
          ],
          exercises: [
            {
              id: 'g10-functions-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the vertex of $y=(x+4)^2-1$?',
              options: ['$(-4,-1)$', '$(4,-1)$', '$(-4,1)$', '$(4,1)$'],
              correctOption: 0,
              hint: 'Write $x+4$ as $x-(-4)$.',
              explanation:
                'The form is $a(x-h)^2+k$ with $h=-4$ and $k=-1$, so the vertex is $(-4,-1)$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-functions-ex-2',
              type: 'multiple-choice',
              prompt: 'Which transformations map $y=x^2$ to $y=(x-2)^2+5$?',
              options: [
                'Right 2 and up 5',
                'Left 2 and up 5',
                'Right 2 and down 5',
                'Left 2 and down 5',
              ],
              correctOption: 0,
              hint: 'The inside change controls horizontal motion and reverses sign.',
              explanation:
                'The $-2$ inside shifts the graph right 2, and the $+5$ outside shifts it up 5.',
              difficulty: 'easy',
            },
            {
              id: 'g10-functions-ex-3',
              type: 'numeric',
              prompt: 'For $f(x)=3|x-2|+1$, compute $f(-1)$.',
              answer: 10,
              tolerance: 0,
              hint: 'Substitute $x=-1$ before applying the absolute value.',
              explanation:
                '$f(-1)=3|-1-2|+1=3|-3|+1=3(3)+1=10$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-functions-ex-4',
              type: 'numeric',
              prompt: 'Find the positive $x$-intercept of $y=-2(x+1)^2+18$.',
              answer: 2,
              tolerance: 0.01,
              hint: 'Set $y=0$ and solve $(x+1)^2=9$.',
              explanation:
                'Setting $y=0$ gives $(x+1)^2=9$, so $x+1=3$ or $x+1=-3$. The roots are $x=2$ and $x=-4$; the positive one is 2.',
              difficulty: 'medium',
            },
            {
              id: 'g10-functions-ex-5',
              type: 'multiple-choice',
              prompt: 'Which function is odd?',
              options: ['$f(x)=x^2$', '$f(x)=|x|$', '$f(x)=\\frac{1}{x}$', '$f(x)=x^2+1$'],
              correctOption: 2,
              hint: 'Test $f(-x)$ and compare with $-f(x)$.',
              explanation:
                'For $f(x)=\\frac{1}{x}$, $f(-x)=-\\frac{1}{x}=-f(x)$, so the function is odd. The other three are even or neither.',
              difficulty: 'medium',
            },
            {
              id: 'g10-functions-ex-6',
              type: 'multiple-choice',
              prompt: 'Which sequence describes $y=-f(x)+2$?',
              options: [
                'Reflect across the $x$-axis, then shift up 2',
                'Reflect across the $y$-axis, then shift up 2',
                'Shift left 2, then reflect across the $x$-axis',
                'Reflect across the $x$-axis, then shift right 2',
              ],
              correctOption: 0,
              hint: 'The negative sign is outside the function; the $+2$ is also outside.',
              explanation:
                'The multiplier $-1$ outside $f$ reflects the graph across the $x$-axis. Adding 2 outside shifts the result up 2.',
              difficulty: 'medium',
            },
          ],
          related: [
            'functions-intro',
            'quadratic-equations',
            'exponential-functions-intro',
            'transformations-in-the-plane',
          ],
          aliases: ['graph transformations', 'parent graphs', 'shifts and stretches', 'symmetry'],
        },
        {
          id: 'exponential-functions-intro',
          title: 'Exponential Functions: An Introduction',
          subtitle: 'Model repeated percent change with $y=ab^x$, growth factors, and compound interest.',
          introduction:
            'Linear growth adds the same amount each step; exponential growth multiplies by the same factor each step. That single change of operation produces rapid growth, steady decay, and the compound-interest formula used in finance.',
          prerequisites: [
            'Laws of exponents',
            'Evaluating functions',
            'Percent increase and decrease',
          ],
          keyIdeas: [
            'An exponential function has the form $y=ab^x$ with $b>0$ and $b \\ne 1$.',
            '$b>1$ models growth; $0<b<1$ models decay.',
            'The $y$-intercept is $(0,a)$ and the horizontal asymptote is $y=0$.',
            'Compound interest applies the same growth factor repeatedly.',
            'Half-life problems use a decay factor of $\\frac{1}{2}$ per half-life.',
          ],
          theory: [
            {
              title: 'Repeated multiplication, not repeated addition',
              body: [
                'A linear function changes by a constant difference. An exponential function changes by a constant ratio. In the table for $y=2^x$, the outputs double each time $x$ increases by 1, while the differences themselves keep growing.',
                'The general form is $y=ab^x$. The value $a$ is the output when $x=0$, so it is the initial amount. The base $b$ is the growth or decay factor. Exponential functions require $b>0$ so that every real power is defined, and $b \\ne 1$ so the function is not constant.',
              ],
              bullets: [
                'Growth: $b=1+r$ for a percent increase $r$.',
                'Decay: $b=1-r$ for a percent decrease $r$.',
                'The graph has a horizontal asymptote at $y=0$.',
              ],
            },
            {
              title: 'Growth and decay factors',
              body: [
                'A quantity growing by 4% per year has growth factor $1+0.04=1.04$. After $t$ years its value is $a(1.04)^t$. A quantity decaying by 15% per year has decay factor $1-0.15=0.85$, so its value is $a(0.85)^t$.',
                'The graph of $y=ab^x$ passes through $(0,a)$. When $b>1$ the graph rises to the right; when $0<b<1$ it falls toward zero. The horizontal axis is an asymptote, never a value the graph reaches.',
              ],
              bullets: [
                'Do not confuse 4% with the factor 4. Use 0.04 for the rate and 1.04 for the factor.',
                'A decay factor of 0.85 means 85% remains each year, not 15%.',
                'Doubling corresponds to a growth factor of 2.',
              ],
            },
            {
              title: 'Compound interest',
              body: [
                'Compound interest applies a growth factor once per compounding period. If the annual nominal rate is $r$ and interest is compounded $n$ times per year, each period uses the factor $1+\\frac{r}{n}$, and there are $nt$ periods in $t$ years.',
                'More frequent compounding produces a slightly larger total because interest begins earning interest sooner. The nominal rate itself does not change; the number of compounding periods does.',
              ],
              bullets: [
                'Use the decimal form of the rate: 6% becomes 0.06.',
                'Quarterly means $n=4$; monthly means $n=12$.',
                'The exponent counts periods, not years, when $n>1$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-exponential-model',
              title: 'Exponential growth and decay',
              expression: String.raw`y = a b^x`,
              description:
                'Models a quantity that is multiplied by the same factor $b$ during each unit of time or each step.',
              spoken: 'y equals a times b to the power x.',
              variables: [
                { symbol: 'a', name: 'initial value', note: 'the value when $x=0$; nonzero' },
                { symbol: 'b', name: 'growth or decay factor', note: 'positive and not equal to 1' },
                { symbol: 'x', name: 'number of time steps or periods' },
                { symbol: 'y', name: 'value after $x$ steps' },
              ],
              conditions: ['$a \\ne 0$', '$b>0$', '$b \\ne 1$'],
              notes:
                'Growth when $b>1$, decay when $0<b<1$. The horizontal asymptote is $y=0$ and the $y$-intercept is $(0,a)$.',
              tags: ['exponential function', 'growth factor', 'decay factor', 'asymptote'],
            },
            {
              id: 'g10-exponential-compound-interest',
              title: 'Compound interest formula',
              expression: String.raw`A = P\left(1+\frac{r}{n}\right)^{nt}`,
              description:
                'Computes the balance when interest is compounded $n$ times per year for $t$ years.',
              spoken:
                'A equals P times the quantity 1 plus r over n, raised to the power n t.',
              variables: [
                { symbol: 'A', name: 'final amount', unit: 'currency' },
                { symbol: 'P', name: 'principal, the initial amount', unit: 'currency' },
                { symbol: 'r', name: 'annual nominal interest rate', note: 'as a decimal' },
                { symbol: 'n', name: 'number of compounding periods per year', note: 'positive integer' },
                { symbol: 't', name: 'time in years' },
              ],
              conditions: ['$P>0$', '$r \\ge 0$', '$n$ is a positive integer', '$t \\ge 0$'],
              notes:
                'For annual compounding $n=1$, and the formula reduces to $A=P(1+r)^t$.',
              tags: ['compound interest', 'principal', 'annual rate', 'finance'],
            },
            {
              id: 'g10-exponential-half-life',
              title: 'Half-life decay',
              expression: String.raw`A = A_0\left(\frac{1}{2}\right)^{t/h}`,
              description:
                'Gives the remaining amount of a substance after $t$ time units when its half-life is $h$.',
              spoken:
                'A equals A zero times one half, raised to the power t over h.',
              variables: [
                { symbol: 'A', name: 'remaining amount' },
                { symbol: 'A_0', name: 'initial amount', note: 'positive' },
                { symbol: 't', name: 'elapsed time' },
                { symbol: 'h', name: 'half-life', note: 'positive, in the same units as $t$' },
              ],
              conditions: ['$A_0>0$', '$h>0$', '$t \\ge 0$'],
              notes:
                'Each interval of length $h$ multiplies the amount by $\\frac{1}{2}$.',
              tags: ['half-life', 'radioactive decay', 'exponential decay', 'decay model'],
            },
          ],
          examples: [
            {
              title: 'Population growth',
              problem:
                'A town has 12,000 residents and grows by 4% each year. Estimate the population after 5 years.',
              given: [
                'Initial population $a = 12{,}000$.',
                'Annual growth factor $b = 1+0.04 = 1.04$.',
                'Time $t = 5$ years.',
              ],
              steps: [
                {
                  text: 'Write the exponential model with the initial value and growth factor.',
                  math: String.raw`P(t) = 12000(1.04)^t`,
                },
                {
                  text: 'Substitute $t=5$.',
                  math: String.raw`P(5) = 12000(1.04)^5`,
                },
                {
                  text: 'Evaluate the power. $1.04^5 \\approx 1.216653$.',
                  math: String.raw`P(5) \approx 12000(1.216653)`,
                },
                {
                  text: 'Multiply and round to the nearest whole person.',
                  math: String.raw`P(5) \approx 14599.84`,
                },
              ],
              answer:
                'The population is about 14,600 people after 5 years. The exact model value is approximately 14,599.83.',
            },
            {
              title: 'Compound interest',
              problem:
                'How much is in an account after 3 years if $2,500 is invested at 6% per year compounded quarterly?',
              given: [
                '$P = 2500$ dollars.',
                '$r = 0.06$.',
                '$n = 4$ quarters per year.',
                '$t = 3$ years.',
              ],
              steps: [
                {
                  text: 'Substitute into the compound interest formula.',
                  math: String.raw`A = 2500\left(1+\frac{0.06}{4}\right)^{4 \cdot 3}`,
                },
                {
                  text: 'Simplify the rate per quarter and the number of periods.',
                  math: String.raw`A = 2500(1.015)^{12}`,
                },
                {
                  text: 'Evaluate the power.',
                  math: String.raw`(1.015)^{12} \approx 1.195618`,
                },
                {
                  text: 'Multiply by the principal.',
                  math: String.raw`A \approx 2500(1.195618) = 2989.045`,
                },
                {
                  text: 'Subtract the principal to find the interest earned.',
                  math: String.raw`2989.05 - 2500 = 489.05`,
                },
              ],
              answer:
                'The balance is about $2,989.05, so the account earns about $489.05 in interest.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using 4 instead of 0.04 as the growth rate in $y=ab^x$.',
              correction:
                'A 4% increase uses the factor $1+0.04=1.04$. The number 4 would mean multiplying by 4 each year, which is a 300% increase.',
            },
            {
              mistake: 'Computing simple interest with $P(1+rt)$ when the problem says compounded.',
              correction:
                'Compounding multiplies the balance repeatedly, so the exponent is $nt$, not a single multiplication by $t$.',
            },
            {
              mistake: 'Treating a decay factor of 0.85 as if only 15% of the quantity remains.',
              correction:
                'The factor 0.85 means 85% remains after each year. The amount lost is 15% of the current amount.',
            },
            {
              mistake: 'Using years for the exponent when interest compounds quarterly.',
              correction:
                'The exponent counts compounding periods: $nt$. For 3 years compounded quarterly, there are 12 periods.',
            },
          ],
          exercises: [
            {
              id: 'g10-exponential-ex-1',
              type: 'multiple-choice',
              prompt: 'A quantity increases by 7% each year. What is its annual growth factor?',
              options: ['$0.07$', '$0.93$', '$1.07$', '$7$'],
              correctOption: 2,
              hint: 'Growth factor is $1+r$ when $r$ is written as a decimal.',
              explanation:
                'The rate as a decimal is $0.07$, so the growth factor is $1+0.07=1.07$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-exponential-ex-2',
              type: 'numeric',
              prompt:
                'Find the value of $5,000 invested at 3% per year compounded annually for 2 years.',
              answer: 5304.5,
              tolerance: 0.01,
              answerUnit: '$',
              hint: 'Use $A=P(1+r)^t$ with $r=0.03$.',
              explanation:
                '$A=5000(1.03)^2=5000(1.0609)=5304.50$ dollars.',
              difficulty: 'easy',
            },
            {
              id: 'g10-exponential-ex-3',
              type: 'multiple-choice',
              prompt: 'Which function models a quantity that loses 20% of its value each year?',
              options: [
                '$y=100(0.2)^t$',
                '$y=100(0.8)^t$',
                '$y=100(1.2)^t$',
                '$y=100(1.8)^t$',
              ],
              correctOption: 1,
              hint: 'The decay factor is $1-0.20$.',
              explanation:
                'Losing 20% leaves 80%, so the decay factor is $0.8$ and the model is $y=100(0.8)^t$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-exponential-ex-4',
              type: 'numeric',
              prompt:
                'A sample of 80 mg of a substance has a half-life of 6 hours. How many milligrams remain after 18 hours?',
              answer: 10,
              tolerance: 0.01,
              answerUnit: 'mg',
              hint: '18 hours is three half-lives.',
              explanation:
                'After 18 hours, the number of half-lives is $18/6=3$, so the remaining mass is $80\\left(\\frac{1}{2}\\right)^3=80 \\cdot \\frac{1}{8}=10$ mg.',
              difficulty: 'medium',
            },
            {
              id: 'g10-exponential-ex-5',
              type: 'numeric',
              prompt:
                'A population of 2,000 grows by 5% per year. Find its size after 4 years, to the nearest whole number.',
              answer: 2431,
              tolerance: 1,
              answerUnit: 'people',
              hint: 'Use $2000(1.05)^4$.',
              explanation:
                '$2000(1.05)^4 = 2000(1.21550625) = 2431.0125$, which rounds to 2,431 people.',
              difficulty: 'medium',
            },
            {
              id: 'g10-exponential-ex-6',
              type: 'multiple-choice',
              prompt: 'What is the horizontal asymptote of $y=3(2)^x-4$?',
              options: ['$y=0$', '$y=-4$', '$y=3$', '$y=2$'],
              correctOption: 1,
              hint: 'The $-4$ shifts the whole graph, including its asymptote, down 4.',
              explanation:
                'The parent graph $y=3(2)^x$ has asymptote $y=0$. Shifting down 4 moves the asymptote to $y=-4$.',
              difficulty: 'medium',
            },
          ],
          related: [
            'functions-and-transformations',
            'exponential-and-logarithmic-functions',
            'sequences-and-series',
          ],
          aliases: ['exponential growth', 'exponential decay', 'compound interest', 'growth factor'],
        },
        {
          id: 'systems-of-inequalities',
          title: 'Systems of Inequalities',
          subtitle: 'Shade half-planes, identify feasible regions, and optimize at the vertices.',
          introduction:
            'A linear inequality in two variables describes a half-plane rather than a line. Several inequalities together carve out a feasible region, and a linear objective reaches its best value at a corner of that region. This is the geometric side of linear programming.',
          prerequisites: [
            'Graphing linear equations',
            'Solving systems of linear equations',
            'Inequality symbols and interval notation',
          ],
          keyIdeas: [
            'A linear inequality divides the plane into two half-planes.',
            'A solid boundary includes the line; a dashed boundary excludes it.',
            'Test one point to decide which side to shade.',
            'The feasible region is the overlap of all half-planes.',
            'A linear objective is optimized at a vertex of a bounded feasible region.',
          ],
          theory: [
            {
              title: 'Half-planes and boundary lines',
              body: [
                'The inequality $Ax+By \\le C$ is graphed by first drawing the boundary line $Ax+By=C$. If the inequality is strict, the line is dashed because points on it are not solutions. If equality is allowed, the line is solid.',
                'Choose a test point not on the line, often $(0,0)$, and substitute it into the inequality. If the test point satisfies the inequality, shade its side; otherwise shade the other side.',
              ],
              bullets: [
                '$y \\ge mx+b$ shades above a solid line.',
                '$y<mx+b$ shades below a dashed line.',
                'If the test point lies on the boundary, choose a different point.',
              ],
            },
            {
              title: 'Feasible regions',
              body: [
                'A system of inequalities is solved by graphing every boundary and shading the common overlap. The result is the feasible region: the set of points satisfying all constraints at once.',
                'A feasible region can be bounded, like a polygon, or unbounded, like a wedge that continues forever. Vertices occur where two boundary lines meet. Include axis intercepts and intersections with the coordinate axes when non-negativity constraints are present.',
              ],
              bullets: [
                'Non-negativity constraints $x \\ge 0$ and $y \\ge 0$ restrict the region to the first quadrant.',
                'A vertex is a corner of the feasible region, not every intersection of boundary lines.',
                'An unbounded region may have no maximum for some objectives.',
              ],
            },
            {
              title: 'Optimizing a linear objective',
              body: [
                'A linear objective such as $P=px+qy$ represents a family of parallel lines. As $P$ changes, the line slides across the plane without rotating. On a bounded polygon, the largest and smallest values occur at vertices.',
                'Evaluate the objective at every vertex, then compare. The winning vertex gives both the optimal value and the production plan or allocation that achieves it.',
              ],
              bullets: [
                'List every vertex of the feasible region.',
                'Substitute each vertex into the objective.',
                'Interpret the answer in the context and include units.',
              ],
            },
            {
              title: 'Constraints from a context',
              body: [
                'Real problems add restrictions that are easy to forget: time cannot be negative, the number of items must be a whole number, and storage or budget limits create further inequalities.',
                'Translate each phrase carefully. At most means $\\le$, at least means $\\ge$, and no more than twice means $\\le 2$ times the other quantity. State what the variables represent before writing the system.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-inequalities-boundary',
              title: 'Boundary line of a half-plane',
              expression: String.raw`Ax + By = C`,
              description:
                'The line that separates the solutions of $Ax+By \\le C$ from the points that do not satisfy the inequality.',
              spoken: 'A x plus B y equals C.',
              variables: [
                { symbol: 'A, B', name: 'coefficients of the boundary line', note: 'not both zero' },
                { symbol: 'C', name: 'constant' },
                { symbol: 'x, y', name: 'coordinates in the plane' },
              ],
              conditions: ['$A$ and $B$ are not both zero'],
              notes:
                'Use a solid line for $\\le$ or $\\ge$ and a dashed line for $<$ or $>$.',
              tags: ['half-plane', 'boundary line', 'linear inequality', 'graphing'],
            },
            {
              id: 'g10-inequalities-system',
              title: 'System of two half-planes',
              expression: String.raw`\begin{cases} y \ge m_1x+b_1 \\ y \le m_2x+b_2 \end{cases}`,
              description:
                'The overlap of an above-line half-plane and a below-line half-plane.',
              spoken:
                'The system y is greater than or equal to m one x plus b one, and y is less than or equal to m two x plus b two.',
              variables: [
                { symbol: 'm_1, b_1', name: 'slope and intercept of the lower boundary' },
                { symbol: 'm_2, b_2', name: 'slope and intercept of the upper boundary' },
                { symbol: 'x, y', name: 'coordinates of a feasible point' },
              ],
              conditions: ['The two boundary lines are not parallel, or the overlap is empty or a strip'],
              notes:
                'The feasible region is the intersection of the shaded sets, not the union.',
              tags: ['system of inequalities', 'feasible region', 'intersection', 'shading'],
            },
            {
              id: 'g10-inequalities-objective',
              title: 'Linear objective function',
              expression: String.raw`P = px + qy`,
              description:
                'A quantity to be maximized or minimized, built from a weighted sum of the two decision variables.',
              spoken: 'P equals p x plus q y.',
              variables: [
                { symbol: 'P', name: 'objective value to optimize' },
                { symbol: 'p, q', name: 'weights or unit contributions' },
                { symbol: 'x, y', name: 'decision variables' },
              ],
              conditions: ['The feasible region is defined by the system of constraints'],
              notes:
                'On a bounded polygonal feasible region, evaluate $P$ at each vertex. The largest and smallest values occur at vertices.',
              tags: ['linear programming', 'objective function', 'optimization', 'vertices'],
            },
          ],
          examples: [
            {
              title: 'Finding a feasible region',
              problem:
                'Graph the system $x \\ge 0$, $y \\ge 0$, $x+y \\le 8$, and $2x+y \\le 12$. Find all vertices of the feasible region.',
              given: [
                'The first two inequalities restrict the region to the first quadrant.',
                'Boundary lines: $x+y=8$ and $2x+y=12$.',
              ],
              steps: [
                {
                  text: 'The axes form two boundaries. The origin is a vertex.',
                  math: String.raw`(0,0)`,
                },
                {
                  text: 'Find the intercepts of $2x+y=12$ with the axes. The $x$-intercept is 6 and the $y$-intercept is 12, but $x+y \\le 8$ cuts off the $y$-intercept.',
                  math: String.raw`2x=12 \Rightarrow x=6`,
                },
                {
                  text: 'Find the intercepts of $x+y=8$. The $y$-intercept is 8; the $x$-intercept 8 is outside $2x+y \\le 12$.',
                  math: String.raw`y=8 \text{ when } x=0`,
                },
                {
                  text: 'Solve the two boundary equations together for their intersection.',
                  math: String.raw`\begin{cases} x+y=8 \\ 2x+y=12 \end{cases} \Rightarrow x=4, \ y=4`,
                },
                {
                  text: 'Test the corner $(4,4)$ in both inequalities: $4+4=8$ and $2(4)+4=12$. It lies on both boundaries and is feasible.',
                  math: String.raw`(4,4)`,
                },
              ],
              answer:
                'The feasible region is the quadrilateral with vertices $(0,0)$, $(6,0)$, $(4,4)$, and $(0,8)$.',
            },
            {
              title: 'Maximizing profit at a vertex',
              problem:
                'A workshop makes $x$ chairs and $y$ tables. Assembly time gives $x+y \\le 8$; wood gives $2x+y \\le 12$. Profit is $P=30x+20y$ dollars. Find the production plan that maximizes profit.',
              given: [
                'Constraints: $x \\ge 0$, $y \\ge 0$, $x+y \\le 8$, $2x+y \\le 12$.',
                'Vertices from the previous example: $(0,0)$, $(6,0)$, $(4,4)$, $(0,8)$.',
                'Objective: $P=30x+20y$.',
              ],
              steps: [
                {
                  text: 'Evaluate the objective at each vertex, starting with the origin.',
                  math: String.raw`P(0,0)=0`,
                },
                {
                  text: 'Evaluate at $(6,0)$.',
                  math: String.raw`P(6,0)=30(6)+20(0)=180`,
                },
                {
                  text: 'Evaluate at the intersection $(4,4)$.',
                  math: String.raw`P(4,4)=30(4)+20(4)=120+80=200`,
                },
                {
                  text: 'Evaluate at $(0,8)$.',
                  math: String.raw`P(0,8)=30(0)+20(8)=160`,
                },
                {
                  text: 'Compare the four values: $0$, $180$, $200$, $160$. The maximum is 200.',
                  math: String.raw`\max P = 200 \text{ at } (4,4)`,
                },
              ],
              answer:
                'Make 4 chairs and 4 tables for a maximum profit of $200. The constraints are satisfied with equality at this vertex.',
            },
          ],
          mistakes: [
            {
              mistake: 'Shading above every line because the inequality contains a greater-than symbol.',
              correction:
                'The direction depends on the inequality after solving for $y$, or on a test point. Always test one point to confirm the shaded side.',
            },
            {
              mistake: 'Using a dashed boundary for $\\le$ or $\\ge$.',
              correction:
                'A solid line means the boundary is included, which is exactly what $\\le$ and $\\ge$ allow. Dashed lines belong to strict inequalities.',
            },
            {
              mistake: 'Evaluating the objective at a boundary intersection that is not a vertex of the feasible region.',
              correction:
                'Only corners of the feasible region are candidates. Check that the point satisfies every constraint before evaluating.',
            },
            {
              mistake: 'Ignoring the non-negativity constraints.',
              correction:
                'Negative numbers of chairs or hours are meaningless. Add $x \\ge 0$ and $y \\ge 0$ before finding the feasible region.',
            },
          ],
          exercises: [
            {
              id: 'g10-inequalities-ex-1',
              type: 'multiple-choice',
              prompt:
                'Which point satisfies both $y \\ge 2x-1$ and $y<4$?',
              options: ['$(0,0)$', '$(3,5)$', '$(1,4)$', '$(-2,-6)$'],
              correctOption: 0,
              hint: 'Substitute each point into both inequalities.',
              explanation:
                'For $(0,0)$: $0 \\ge -1$ is true and $0<4$ is true. The other points fail at least one inequality.',
              difficulty: 'easy',
            },
            {
              id: 'g10-inequalities-ex-2',
              type: 'multiple-choice',
              prompt: 'How should the boundary of $y>3x+1$ be drawn, and which side is shaded?',
              options: [
                'Solid line, shade above',
                'Dashed line, shade above',
                'Solid line, shade below',
                'Dashed line, shade below',
              ],
              correctOption: 1,
              hint: 'The inequality is strict, and $y$ is greater than the line.',
              explanation:
                'Because the inequality is strict, the boundary is dashed. Points with larger $y$ values lie above the line, so shade above.',
              difficulty: 'easy',
            },
            {
              id: 'g10-inequalities-ex-3',
              type: 'numeric',
              prompt:
                'Maximize $P=4x+3y$ subject to $x \\ge 0$, $y \\ge 0$, $x+y \\le 5$, and $2x+y \\le 8$. Give the maximum value.',
              answer: 18,
              tolerance: 0.01,
              hint: 'The vertices are $(0,0)$, $(4,0)$, $(3,2)$, and $(0,5)$.',
              explanation:
                'Evaluating gives $0$, $16$, $4(3)+3(2)=18$, and $15$. The maximum is 18 at $(3,2)$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-inequalities-ex-4',
              type: 'numeric',
              prompt:
                'Find the $y$-coordinate of the intersection of $x+y=7$ and $3x-y=5$.',
              answer: 4,
              tolerance: 0.01,
              hint: 'Substitute $y=7-x$ into the second equation.',
              explanation:
                'Substituting gives $3x-(7-x)=5$, so $4x=12$ and $x=3$. Then $y=7-3=4$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-inequalities-ex-5',
              type: 'multiple-choice',
              prompt:
                'A factory makes $x$ small units and $y$ large units. It can make at most 10 units total and at least twice as many small units as large units. Which system models this?',
              options: [
                '$x+y \\le 10, \\ x \\ge 2y$',
                '$x+y \\le 10, \\ x \\le 2y$',
                '$x+y \\ge 10, \\ x \\ge 2y$',
                '$x+y \\le 10, \\ 2x \\ge y$',
              ],
              correctOption: 0,
              hint: 'At most 10 gives an upper bound on the sum; at least twice gives a lower bound on $x$.',
              explanation:
                'The total is at most 10, so $x+y \\le 10$. Small units are at least twice large units, so $x \\ge 2y$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-inequalities-ex-6',
              type: 'multiple-choice',
              prompt:
                'A feasible region has vertices $(0,0)$, $(6,0)$, $(4,4)$, and $(0,8)$. Which vertex maximizes $P=2x+5y$?',
              options: ['$(0,0)$', '$(6,0)$', '$(4,4)$', '$(0,8)$'],
              correctOption: 3,
              hint: 'Evaluate $P$ at all four vertices.',
              explanation:
                'The values are $0$, $12$, $28$, and $40$. The largest is 40 at $(0,8)$.',
              difficulty: 'hard',
            },
          ],
          related: [
            'linear-equations-and-inequalities',
            'systems-of-linear-equations',
            'coordinate-geometry-of-lines',
          ],
          aliases: ['linear programming', 'feasible region', 'half-plane', 'optimization'],
        },
      ],
    },
    {
      id: 'geometry',
      family: 'geometry',
      title: 'Geometry',
      description:
        'Formal reasoning, rigid motion, and the circle theorems that connect angles, arcs, and tangents. Proof is treated as a craft: every claim needs a reason.',
      theorems: [
        {
          title: 'Triangle angle sum theorem',
          statement: 'The interior angles of a triangle add to $180^{\\circ}$.',
          note: 'A consequence of the parallel postulate: draw a line through one vertex parallel to the opposite side.',
        },
        {
          title: 'Exterior angle theorem',
          statement:
            'An exterior angle of a triangle equals the sum of the two remote interior angles.',
          note: 'The exterior angle and its adjacent interior angle form a linear pair, so the two statements are equivalent.',
        },
        {
          title: 'Triangle congruence criteria',
          statement:
            'Two triangles are congruent if SSS, SAS, ASA, AAS, or RHS (hypotenuse and one leg of a right triangle) holds.',
          note: 'SSA and AAA do not guarantee congruence. SSA can produce zero, one, or two triangles.',
        },
        {
          title: 'Isosceles triangle theorem',
          statement:
            'If two sides of a triangle are equal, then the angles opposite those sides are equal. The converse is also true.',
          note: 'The angle bisector from the apex is also the perpendicular bisector of the base.',
        },
        {
          title: 'Inscribed angle theorem',
          statement:
            'An angle at the circumference is half the central angle that subtends the same arc.',
          note: 'When the arc is a semicircle, the central angle is $180^{\\circ}$, so the inscribed angle is $90^{\\circ}$.',
        },
        {
          title: 'Cyclic quadrilateral theorem',
          statement:
            'Opposite angles of a cyclic quadrilateral are supplementary. The converse identifies a cyclic quadrilateral.',
          note: 'Each exterior angle equals the interior angle at the opposite vertex.',
        },
        {
          title: 'Tangent-radius theorem',
          statement:
            'A tangent to a circle is perpendicular to the radius at the point of contact.',
          note: 'This creates a right triangle whenever a tangent, a radius, and a line from an external point are drawn.',
        },
        {
          title: 'Equal tangent lengths theorem',
          statement:
            'Two tangents drawn from the same external point to a circle have equal lengths.',
          note: 'The line from the external point to the center bisects the angle between the tangents.',
        },
        {
          title: 'Alternate segment theorem',
          statement:
            'The angle between a tangent and a chord equals the angle in the alternate segment subtended by that chord.',
          note: 'Identify the chord first, then the angle on the opposite arc. The tangent-chord angle uses the tangent ray on the correct side.',
        },
      ],
      topics: [
        {
          id: 'geometric-proofs',
          title: 'Geometric Proofs',
          subtitle: 'Build deductive arguments from definitions, angle facts, and congruence criteria.',
          introduction:
            'A proof is a sequence of statements in which every claim follows from a definition, a given fact, or a theorem already established. Geometry trains this habit because a diagram can suggest a relationship without proving it.',
          prerequisites: [
            'Angle relationships and parallel lines',
            'Triangle congruence criteria',
            'Properties of quadrilaterals',
          ],
          keyIdeas: [
            'A proof starts with the given information and ends with the statement to prove.',
            'Every step needs a reason; a diagram is not a reason by itself.',
            'Alternate interior angles, vertical angles, and linear pairs are common building blocks.',
            'SSS, SAS, ASA, AAS, and RHS establish congruence; SSA and AAA do not.',
            'Auxiliary lines can expose congruent triangles or parallel lines.',
          ],
          theory: [
            {
              title: 'Deductive reasoning',
              body: [
                'Deductive reasoning moves from general statements to a specific conclusion. Definitions fix the meaning of terms, postulates are accepted without proof, and theorems are statements proved from them.',
                'A counterexample is enough to disprove a general claim. One triangle with two equal sides but unequal base angles would refute the isosceles triangle theorem, so a proof must explain why the conclusion holds for every case.',
              ],
              bullets: [
                'Given: the information assumed at the start.',
                'To prove: the conclusion you must reach.',
                'Reason: the definition, postulate, or theorem that justifies each statement.',
              ],
            },
            {
              title: 'Angle and segment facts',
              body: [
                'Several relationships recur in proofs. Angles on a straight line are supplementary. Vertical angles are equal. When two parallel lines are cut by a transversal, alternate interior angles are equal and corresponding angles are equal.',
                'For segments, if $B$ lies between $A$ and $C$, then $AB+BC=AC$. A midpoint divides a segment into two equal parts. These facts let you translate a diagram into equations.',
              ],
              bullets: [
                'Linear pair: adjacent angles on a straight line sum to $180^{\\circ}$.',
                'Vertical angles: opposite angles formed by two intersecting lines are equal.',
                'Parallel lines: alternate interior angles are equal.',
                'Midpoint: $AM=MB$ when $M$ is the midpoint of $AB$.',
              ],
            },
            {
              title: 'Congruence criteria',
              body: [
                'Two triangles are congruent when all corresponding sides and angles are equal. In practice, only part of that information is needed. SSS, SAS, ASA, AAS, and RHS each guarantee congruence.',
                'SSA is not a valid criterion: two sides and a non-included angle can produce two different triangles. AAA is also insufficient because it fixes shape but not size.',
              ],
              bullets: [
                'SAS requires the angle between the two named sides.',
                'AAS uses two angles and a side opposite one of them.',
                'RHS is the right-triangle case with hypotenuse and one leg.',
                'Corresponding parts of congruent triangles are equal (CPCTC).',
              ],
            },
            {
              title: 'Writing the proof',
              body: [
                'A two-column proof lists statements on the left and reasons on the right. A paragraph proof tells the same story in complete sentences. Both must follow a logical order and cite a reason for every claim.',
                'Start by marking the given information on the diagram, but do not assume anything that is not stated or provable. If the proof needs a line that is not present, add an auxiliary line and say why it is legitimate.',
              ],
              bullets: [
                'State the given and the goal in your own words.',
                'Look for congruent triangles, parallel lines, or a straight angle.',
                'Never use the statement to be proved as a reason.',
                'End by restating the conclusion explicitly.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-proofs-triangle-angle-sum',
              title: 'Triangle angle sum',
              expression: String.raw`\angle A + \angle B + \angle C = 180^{\circ}`,
              description:
                'The three interior angles of any triangle add to a straight angle.',
              spoken: 'Angle A plus angle B plus angle C equals one hundred eighty degrees.',
              variables: [
                { symbol: 'A, B, C', name: 'the three interior angles of a triangle' },
              ],
              conditions: ['$A$, $B$, and $C$ are the interior angles of one triangle'],
              notes:
                'An exterior angle equals the sum of the two remote interior angles, because the exterior angle and its adjacent interior angle also form a linear pair.',
              tags: ['triangle angle sum', 'interior angles', 'proof', '180 degrees'],
            },
            {
              id: 'g10-proofs-exterior-angle',
              title: 'Exterior angle theorem',
              expression: String.raw`\angle ACD = \angle A + \angle B`,
              description:
                'An exterior angle of a triangle equals the sum of the two interior angles not adjacent to it.',
              spoken: 'Angle A C D equals angle A plus angle B.',
              variables: [
                { symbol: 'A, B', name: 'remote interior angles' },
                { symbol: 'ACD', name: 'exterior angle at vertex $C$' },
              ],
              conditions: ['$D$ lies on the extension of $BC$ beyond $C$'],
              notes:
                'The exterior angle and $\\angle ACB$ are supplementary, while $\\angle A+\\angle B+\\angle ACB=180^{\\circ}$. Subtracting gives the result.',
              tags: ['exterior angle', 'remote interior angles', 'triangle', 'proof'],
            },
            {
              id: 'g10-proofs-isosceles-base-angles',
              title: 'Isosceles triangle theorem',
              expression: String.raw`AB = AC \ \Rightarrow \ \angle B = \angle C`,
              description:
                'In a triangle, equal sides are opposite equal angles.',
              spoken: 'If A B equals A C, then angle B equals angle C.',
              variables: [
                { symbol: 'AB, AC', name: 'the equal sides meeting at $A$' },
                { symbol: 'B, C', name: 'the base angles opposite those sides' },
              ],
              conditions: ['$A$, $B$, and $C$ are vertices of a triangle'],
              notes:
                'The converse is also true: equal base angles imply equal opposite sides. A common proof draws the median to the base and uses SSS.',
              tags: ['isosceles triangle', 'base angles', 'equal sides', 'proof'],
            },
          ],
          examples: [
            {
              title: 'One pair of equal, parallel sides',
              problem:
                'In quadrilateral $ABCD$, side $AB$ is parallel to side $CD$ and $AB=CD$. Prove that $ABCD$ is a parallelogram.',
              given: [
                '$AB \\parallel CD$.',
                '$AB = CD$.',
                'Diagonal $AC$ is drawn as an auxiliary line.',
              ],
              steps: [
                {
                  text: 'Draw diagonal $AC$. It acts as a transversal across the parallel sides $AB$ and $CD$.',
                  math: String.raw`\text{Auxiliary segment } AC`,
                },
                {
                  text: 'Alternate interior angles are equal because $AB \\parallel CD$.',
                  math: String.raw`\angle BAC = \angle DCA`,
                },
                {
                  text: 'The diagonal is shared by the two triangles, and the given sides are equal.',
                  math: String.raw`AC = CA, \quad AB = CD`,
                },
                {
                  text: 'Two sides and the included angle match, so the triangles are congruent by SAS.',
                  math: String.raw`\triangle ABC \cong \triangle CDA`,
                },
                {
                  text: 'Corresponding parts of congruent triangles are equal, so the remaining sides match.',
                  math: String.raw`BC = DA`,
                },
                {
                  text: 'The same congruence also gives equal alternate interior angles for the other pair of sides.',
                  math: String.raw`\angle BCA = \angle DAC`,
                },
                {
                  text: 'Equal alternate interior angles imply the lines are parallel.',
                  math: String.raw`BC \parallel AD`,
                },
                {
                  text: 'Both pairs of opposite sides are parallel, which is the definition of a parallelogram.',
                  math: String.raw`ABCD \text{ is a parallelogram}`,
                },
              ],
              answer:
                'The diagonal creates congruent triangles $ABC$ and $CDA$ by SAS. Hence $BC=DA$ and $BC \\parallel AD$, so both pairs of opposite sides are parallel and $ABCD$ is a parallelogram.',
            },
            {
              title: 'Base angles of an isosceles triangle',
              problem:
                'In triangle $ABC$, $AB=AC$. Let $M$ be the midpoint of $BC$. Prove that $\\angle B=\\angle C$.',
              given: ['$AB=AC$.', '$M$ is the midpoint of $BC$, so $BM=MC$.', '$M$ lies on $BC$.'],
              steps: [
                {
                  text: 'Draw the segment $AM$ from the apex to the midpoint of the base.',
                  math: String.raw`\text{Auxiliary segment } AM`,
                },
                {
                  text: 'List the three pairs of equal sides.',
                  math: String.raw`AB=AC, \quad BM=MC, \quad AM=AM`,
                },
                {
                  text: 'The three pairs of corresponding sides are equal, so SSS applies.',
                  math: String.raw`\triangle ABM \cong \triangle ACM`,
                },
                {
                  text: 'Corresponding angles of congruent triangles are equal. Angle $B$ corresponds to angle $C$.',
                  math: String.raw`\angle ABM = \angle ACM`,
                },
                {
                  text: 'Since $M$ lies on $BC$, $\\angle ABM=\\angle B$ and $\\angle ACM=\\angle C$.',
                  math: String.raw`\angle B = \angle C`,
                },
              ],
              answer:
                'Triangles $ABM$ and $ACM$ are congruent by SSS, so the corresponding base angles $\\angle B$ and $\\angle C$ are equal.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using a feature that looks true in the diagram as a reason.',
              correction:
                'Only given information and previously proved statements may be used. Markings on a diagram must correspond to stated facts.',
            },
            {
              mistake: 'Treating SSA as a congruence criterion.',
              correction:
                'Two sides and a non-included angle can produce two different triangles. Use SAS when the angle is included, or another valid criterion.',
            },
            {
              mistake: 'Assuming the conclusion and then proving a consequence of it.',
              correction:
                'Work forward from the given information. Circular reasoning does not establish the statement.',
            },
            {
              mistake: 'Writing CPCTC without first proving two triangles congruent.',
              correction:
                'Corresponding parts are equal only after congruence has been established by SSS, SAS, ASA, AAS, or RHS.',
            },
          ],
          exercises: [
            {
              id: 'g10-proofs-ex-1',
              type: 'multiple-choice',
              prompt: 'Which set of information does not guarantee that two triangles are congruent?',
              options: [
                'Three pairs of corresponding sides',
                'Two sides and the included angle',
                'Two sides and a non-included angle',
                'Two angles and a non-included side',
              ],
              correctOption: 2,
              hint: 'SSA is the ambiguous case.',
              explanation:
                'Two sides and a non-included angle (SSA) can determine zero, one, or two triangles, so it does not guarantee congruence. The other three are SSS, SAS, and AAS.',
              difficulty: 'easy',
            },
            {
              id: 'g10-proofs-ex-2',
              type: 'multiple-choice',
              prompt:
                'In a proof that vertical angles are equal, the statements $\\angle 1+\\angle 2=180^{\\circ}$ and $\\angle 2+\\angle 3=180^{\\circ}$ are best justified by which reason?',
              options: [
                'Angles on a straight line form a linear pair',
                'Alternate interior angles are equal',
                'Corresponding angles are equal',
                'The triangle angle sum theorem',
              ],
              correctOption: 0,
              hint: 'Each pair of angles sits on one straight line.',
              explanation:
                'Each pair is a linear pair on a straight line, so the angles are supplementary. Subtracting the common angle gives $\\angle 1=\\angle 3$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-proofs-ex-3',
              type: 'numeric',
              prompt:
                'The angles of a triangle are $x$, $2x$, and $3x$ degrees. Find the largest angle.',
              answer: 90,
              tolerance: 0.01,
              answerUnit: '°',
              hint: 'Use the triangle angle sum.',
              explanation:
                '$x+2x+3x=180$, so $6x=180$ and $x=30$. The largest angle is $3x=90^{\\circ}$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-proofs-ex-4',
              type: 'numeric',
              prompt:
                'An exterior angle of a triangle measures $125^{\\circ}$. One remote interior angle measures $48^{\\circ}$. Find the other remote interior angle in degrees.',
              answer: 77,
              tolerance: 0.01,
              answerUnit: '°',
              hint: 'The exterior angle equals the sum of the two remote interior angles.',
              explanation:
                'Let the unknown angle be $x$. Then $48+x=125$, so $x=77^{\\circ}$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-proofs-ex-5',
              type: 'multiple-choice',
              prompt:
                'Two parallel lines are cut by a transversal. Which statement is always true?',
              options: [
                'Alternate interior angles are equal',
                'Same-side interior angles are equal',
                'Alternate interior angles are supplementary',
                'Corresponding angles are supplementary',
              ],
              correctOption: 0,
              hint: 'Recall the parallel line angle theorems.',
              explanation:
                'Alternate interior angles are equal when the lines are parallel. Same-side interior angles are supplementary, not equal, and corresponding angles are equal, not supplementary.',
              difficulty: 'medium',
            },
            {
              id: 'g10-proofs-ex-6',
              type: 'multiple-choice',
              prompt:
                'Two angles and a non-included side of one triangle equal the corresponding parts of another. Which criterion applies?',
              options: ['SSS', 'SAS', 'AAS', 'SSA'],
              correctOption: 2,
              hint: 'Two angles and a side opposite one of them.',
              explanation:
                'Two angles and a non-included side match the AAS criterion. SSA involves two sides and a non-included angle, which is not a valid congruence test.',
              difficulty: 'hard',
            },
          ],
          related: [
            'lines-angles-and-triangles',
            'congruence-and-transformations',
            'quadrilaterals',
            'circle-theorems',
          ],
          aliases: ['deductive proof', 'two-column proof', 'congruence proof', 'geometry reasoning'],
        },
        {
          id: 'transformations-in-the-plane',
          title: 'Transformations in the Plane',
          subtitle: 'Describe translations, reflections, and rotations precisely with coordinates.',
          introduction:
            'A transformation moves every point of a figure according to a rule. Rigid motions preserve distance and angle, so the image is congruent to the original. Coordinates turn each motion into an arithmetic rule that can be composed and reversed.',
          prerequisites: [
            'Plotting points on the Cartesian plane',
            'Congruence and similarity',
            'Coordinate rules for lines',
          ],
          keyIdeas: [
            'A translation slides every point by the same vector.',
            'A reflection flips a figure across a line.',
            'A rotation turns a figure about a fixed center through a given angle.',
            'Isometries preserve distance, angle measure, and area.',
            'Compositions are performed in order and generally do not commute.',
          ],
          theory: [
            {
              title: 'Rigid motions',
              body: [
                'Translations, reflections, and rotations are rigid motions, also called isometries. They preserve lengths, angles, and areas, so the image of a figure is congruent to the figure.',
                'A translation has no fixed point unless the vector is zero. A reflection fixes every point on its mirror line. A rotation fixes its center. The type of fixed points helps identify which motion produced an image.',
              ],
              bullets: [
                'Translation: same direction and distance for every point.',
                'Reflection: mirror image across a line; orientation reverses.',
                'Rotation: turn about a center; orientation is preserved.',
                'Dilation is not rigid because it changes lengths.',
              ],
            },
            {
              title: 'Coordinate rules',
              body: [
                'Coordinates make transformations concrete. A translation by vector $(a,b)$ sends $(x,y)$ to $(x+a,y+b)$. A reflection across the $x$-axis sends $(x,y)$ to $(x,-y)$; across the $y$-axis it sends $(x,y)$ to $(-x,y)$.',
                'A $90^{\\circ}$ counterclockwise rotation about the origin sends $(x,y)$ to $(-y,x)$. A $180^{\\circ}$ rotation sends $(x,y)$ to $(-x,-y)$, which is the same as reflecting across both axes in either order.',
              ],
              bullets: [
                'Translation: $(x,y) \\mapsto (x+a,y+b)$.',
                'Reflection in $y=x$: $(x,y) \\mapsto (y,x)$.',
                'Reflection in $y=-x$: $(x,y) \\mapsto (-y,-x)$.',
                'Rotation $90^{\\circ}$ clockwise: $(x,y) \\mapsto (y,-x)$.',
              ],
            },
            {
              title: 'Compositions and symmetry',
              body: [
                'A composition applies one transformation and then another. The order matters: reflecting across the $x$-axis and then rotating $90^{\\circ}$ usually gives a different image from rotating first and reflecting second.',
                'A figure has line symmetry when a reflection maps it onto itself, and rotational symmetry when a rotation of less than $360^{\\circ}$ does so. A regular polygon with $n$ sides has rotational symmetry by multiples of $\\frac{360^{\\circ}}{n}$.',
              ],
              bullets: [
                'Write compositions right to left when using function notation.',
                'Two reflections in parallel lines give a translation by twice the distance between the lines.',
                'Two reflections in intersecting lines give a rotation about their intersection point.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-transformations-translation',
              title: 'Translation rule',
              expression: String.raw`(x,y) \mapsto (x+a, y+b)`,
              description:
                'Slides every point by $a$ units horizontally and $b$ units vertically.',
              spoken: 'The point x y maps to x plus a, y plus b.',
              variables: [
                { symbol: 'a', name: 'horizontal displacement', note: 'positive moves right' },
                { symbol: 'b', name: 'vertical displacement', note: 'positive moves up' },
              ],
              conditions: ['$a$ and $b$ are real numbers'],
              notes:
                'The vector $(a,b)$ is the same for every point. A translation preserves orientation.',
              tags: ['translation', 'vector', 'isometry', 'coordinate rule'],
            },
            {
              id: 'g10-transformations-reflection-x',
              title: 'Reflection in the x-axis',
              expression: String.raw`(x,y) \mapsto (x,-y)`,
              description:
                'Flips a point across the horizontal axis, keeping its horizontal position.',
              spoken: 'The point x y maps to x, negative y.',
              variables: [
                { symbol: 'x, y', name: 'coordinates of the original point' },
              ],
              conditions: ['Reflection is across the $x$-axis'],
              notes:
                'For the $y$-axis, $(x,y) \\mapsto (-x,y)$. For the line $y=x$, $(x,y) \\mapsto (y,x)$.',
              tags: ['reflection', 'x-axis', 'flip', 'coordinate rule'],
            },
            {
              id: 'g10-transformations-reflection-y',
              title: 'Reflection in the y-axis',
              expression: String.raw`(x,y) \mapsto (-x,y)`,
              description:
                'Flips a point across the vertical axis, keeping its vertical position.',
              spoken: 'The point x y maps to negative x, y.',
              variables: [
                { symbol: 'x, y', name: 'coordinates of the original point' },
              ],
              conditions: ['Reflection is across the $y$-axis'],
              notes:
                'A reflection reverses orientation. Applying the same reflection twice returns every point to its original position.',
              tags: ['reflection', 'y-axis', 'flip', 'coordinate rule'],
            },
            {
              id: 'g10-transformations-rotation-90',
              title: 'Rotation of 90 degrees about the origin',
              expression: String.raw`(x,y) \mapsto (-y,x)`,
              description:
                'Rotates a point $90^{\\circ}$ counterclockwise about the origin.',
              spoken: 'The point x y maps to negative y, x.',
              variables: [
                { symbol: 'x, y', name: 'coordinates of the original point' },
              ],
              conditions: ['The center of rotation is the origin', 'The angle is $90^{\\circ}$ counterclockwise'],
              notes:
                'A $180^{\\circ}$ rotation is $(x,y) \\mapsto (-x,-y)$. A $90^{\\circ}$ clockwise rotation is $(x,y) \\mapsto (y,-x)$.',
              tags: ['rotation', '90 degrees', 'counterclockwise', 'origin'],
            },
          ],
          examples: [
            {
              title: 'Translate, then reflect',
              problem:
                'Triangle $ABC$ has vertices $A(1,2)$, $B(4,2)$, and $C(1,5)$. Apply the translation $(x,y) \\mapsto (x-3,y+1)$, then reflect the image across the $x$-axis. Give the final coordinates.',
              given: [
                'Original vertices: $A(1,2)$, $B(4,2)$, $C(1,5)$.',
                'Translation vector: $(-3,1)$.',
                'Final transformation: reflection across the $x$-axis.',
              ],
              steps: [
                {
                  text: 'Apply the translation to each vertex by subtracting 3 from $x$ and adding 1 to $y$.',
                  math: String.raw`A'(-2,3), \quad B'(1,3), \quad C'(-2,6)`,
                },
                {
                  text: 'Reflect each translated point across the $x$-axis by changing the sign of $y$.',
                  math: String.raw`A''(-2,-3), \quad B''(1,-3), \quad C''(-2,-6)`,
                },
                {
                  text: 'Check that the side lengths are unchanged. The original triangle has legs of length 3.',
                  math: String.raw`AB=3, \quad AC=3, \quad BC=3\sqrt{2}`,
                },
                {
                  text: 'The image has the same side lengths, confirming that both transformations are isometries.',
                  math: String.raw`A''B''=3, \quad A''C''=3, \quad B''C''=3\sqrt{2}`,
                },
              ],
              answer:
                'The final image has vertices $A\'\'(-2,-3)$, $B\'\'(1,-3)$, and $C\'\'(-2,-6)$. The triangle is congruent to the original.',
            },
            {
              title: 'Order matters',
              problem:
                'For $P(2,3)$, compare reflecting across the $x$-axis then rotating $90^{\\circ}$ counterclockwise with performing the same two transformations in the opposite order.',
              given: ['Starting point $P(2,3)$.', 'Rotation is $90^{\\circ}$ counterclockwise about the origin.'],
              steps: [
                {
                  text: 'First reflect across the $x$-axis.',
                  math: String.raw`(2,3) \mapsto (2,-3)`,
                },
                {
                  text: 'Then rotate the result $90^{\\circ}$ counterclockwise using $(x,y) \\mapsto (-y,x)$.',
                  math: String.raw`(2,-3) \mapsto (3,2)`,
                },
                {
                  text: 'Now reverse the order. Rotate first.',
                  math: String.raw`(2,3) \mapsto (-3,2)`,
                },
                {
                  text: 'Then reflect across the $x$-axis.',
                  math: String.raw`(-3,2) \mapsto (-3,-2)`,
                },
                {
                  text: 'The two final points are different, so the composition is not commutative.',
                  math: String.raw`(3,2) \ne (-3,-2)`,
                },
              ],
              answer:
                'Reflect-then-rotate gives $(3,2)$; rotate-then-reflect gives $(-3,-2)$. The order of transformations matters.',
            },
          ],
          mistakes: [
            {
              mistake: 'Applying a $90^{\\circ}$ rotation rule as $(x,y) \\mapsto (y,-x)$ when the rotation is counterclockwise.',
              correction:
                'Counterclockwise $90^{\\circ}$ is $(x,y) \\mapsto (-y,x)$. The rule $(x,y) \\mapsto (y,-x)$ is clockwise.',
            },
            {
              mistake: 'Reflecting across the $x$-axis by changing the sign of $x$.',
              correction:
                'Reflection across the $x$-axis changes the sign of $y$: $(x,y) \\mapsto (x,-y)$. Changing $x$ reflects across the $y$-axis.',
            },
            {
              mistake: 'Assuming compositions can be performed in any order.',
              correction:
                'Transformations generally do not commute. Track the intermediate image and apply the second rule to it.',
            },
            {
              mistake: 'Calling a dilation a rigid motion.',
              correction:
                'A dilation changes lengths, so it is not an isometry. It preserves shape and angles but not distance.',
            },
          ],
          exercises: [
            {
              id: 'g10-transformations-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the image of $(3,-4)$ under reflection across the $y$-axis?',
              options: ['$(3,4)$', '$(-3,-4)$', '$(-3,4)$', '$(4,3)$'],
              correctOption: 1,
              hint: 'Reflection across the $y$-axis changes the sign of $x$.',
              explanation:
                'The rule is $(x,y) \\mapsto (-x,y)$, so $(3,-4) \\mapsto (-3,-4)$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-transformations-ex-2',
              type: 'numeric',
              prompt:
                'A point $(5,2)$ is rotated $90^{\\circ}$ counterclockwise about the origin. Give the $x$-coordinate of the image.',
              answer: -2,
              tolerance: 0,
              hint: 'Use $(x,y) \\mapsto (-y,x)$.',
              explanation:
                'The image is $(-2,5)$, so its $x$-coordinate is $-2$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-transformations-ex-3',
              type: 'multiple-choice',
              prompt: 'Which transformation is not an isometry?',
              options: [
                'A translation by 4 units left',
                'A reflection across the line $y=x$',
                'A dilation with scale factor 2',
                'A $180^{\\circ}$ rotation about the origin',
              ],
              correctOption: 2,
              hint: 'An isometry preserves distance.',
              explanation:
                'A dilation with scale factor 2 doubles every length, so it does not preserve distance. The other three are rigid motions.',
              difficulty: 'easy',
            },
            {
              id: 'g10-transformations-ex-4',
              type: 'numeric',
              prompt:
                'The point $(4,-1)$ is rotated $180^{\\circ}$ about the origin. Give the $y$-coordinate of the image.',
              answer: 1,
              tolerance: 0,
              hint: 'A $180^{\\circ}$ rotation sends $(x,y)$ to $(-x,-y)$.',
              explanation:
                'The image is $(-4,1)$, so its $y$-coordinate is $1$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-transformations-ex-5',
              type: 'multiple-choice',
              prompt:
                'Reflecting across the $x$-axis and then across the $y$-axis has the same effect as which single transformation?',
              options: [
                'A reflection across $y=x$',
                'A $90^{\\circ}$ counterclockwise rotation',
                'A $180^{\\circ}$ rotation about the origin',
                'A translation by $(-1,-1)$',
              ],
              correctOption: 2,
              hint: 'Apply both reflections to $(x,y)$.',
              explanation:
                '$(x,y) \\mapsto (x,-y) \\mapsto (-x,-y)$, which is exactly a $180^{\\circ}$ rotation about the origin.',
              difficulty: 'medium',
            },
            {
              id: 'g10-transformations-ex-6',
              type: 'multiple-choice',
              prompt:
                'What is the smallest positive angle of rotation that maps a regular hexagon onto itself?',
              options: ['$30^{\\circ}$', '$45^{\\circ}$', '$60^{\\circ}$', '$120^{\\circ}$'],
              correctOption: 2,
              hint: 'Divide $360^{\\circ}$ by the number of sides.',
              explanation:
                'A regular hexagon has 6-fold rotational symmetry, so the smallest rotation is $360^{\\circ}/6=60^{\\circ}$.',
              difficulty: 'hard',
            },
          ],
          related: [
            'congruence-and-transformations',
            'similarity-and-dilations',
            'geometric-proofs',
            'functions-and-transformations',
          ],
          aliases: ['rigid motions', 'isometries', 'rotations', 'reflections', 'translations'],
        },
        {
          id: 'circle-theorems',
          title: 'Circle Theorems',
          subtitle: 'Connect angles, arcs, cyclic quadrilaterals, and tangents with justified reasons.',
          introduction:
            'Circles hide remarkably rigid angle relationships. An angle at the circumference is tied to the central angle on the same arc, opposite angles of a cyclic quadrilateral are supplementary, and a tangent creates both a right angle with the radius and an angle equal to one in the alternate segment.',
          prerequisites: [
            'Parts of a circle: radius, chord, arc, tangent',
            'Inscribed and central angles',
            'Triangle angle sum and isosceles triangles',
          ],
          keyIdeas: [
            'An inscribed angle is half the central angle on the same arc.',
            'An angle in a semicircle is a right angle.',
            'Opposite angles of a cyclic quadrilateral sum to $180^{\\circ}$.',
            'A tangent is perpendicular to the radius at the point of contact.',
            'Tangents from the same external point are equal in length.',
            'The tangent-chord angle equals the angle in the alternate segment.',
          ],
          theory: [
            {
              title: 'Angles standing on arcs',
              body: [
                'Imagine a circle with center $O$ and two points $A$ and $C$ on the circle. The central angle $\\angle AOC$ and an inscribed angle $\\angle ABC$, where $B$ lies on the opposite arc, both stand on the same arc $AC$. The inscribed angle is exactly half the central angle.',
                'If $AC$ is a diameter, the central angle is a straight angle of $180^{\\circ}$. Half of that is $90^{\\circ}$, so any angle in a semicircle is a right angle. This special case is worth recognizing immediately.',
              ],
              bullets: [
                'Central angle: vertex at the center.',
                'Inscribed angle: vertex on the circle.',
                'Same arc, half the measure.',
                'Semicircle case: the inscribed angle is $90^{\\circ}$.',
              ],
            },
            {
              title: 'Cyclic quadrilaterals',
              body: [
                'A cyclic quadrilateral has all four vertices on one circle. In the diagram, $ABCD$ is cyclic with $A$ and $C$ opposite, and $B$ and $D$ opposite. Each pair of opposite angles adds to $180^{\\circ}$.',
                'The converse is a useful test: if one pair of opposite angles of a quadrilateral is supplementary, the quadrilateral is cyclic. An exterior angle of a cyclic quadrilateral equals the interior angle at the opposite vertex.',
              ],
              bullets: [
                '$\\angle A+\\angle C=180^{\\circ}$.',
                '$\\angle B+\\angle D=180^{\\circ}$.',
                'A rectangle is cyclic; a general parallelogram is not.',
              ],
            },
            {
              title: 'Tangents and the alternate segment',
              body: [
                'A tangent touches the circle at exactly one point. The radius drawn to that point is perpendicular to the tangent, so tangent problems often become right-triangle problems.',
                'Two tangents drawn from the same external point have equal lengths. If $PA$ and $PB$ are tangents from $P$, then $PA=PB$, and the line $PO$ bisects the angle between them.',
                'The alternate segment theorem compares an angle between a tangent and a chord with an angle in the opposite arc. If $AT$ is tangent at $A$ and $AB$ is a chord, then the angle between $AT$ and $AB$ equals the angle subtended by $AB$ at any point $C$ on the alternate arc.',
              ],
              bullets: [
                'Tangent-radius: the angle at the point of contact is $90^{\\circ}$.',
                'Equal tangents: $PA=PB$ from the same external point.',
                'Alternate segment: tangent-chord angle equals the opposite inscribed angle.',
              ],
            },
            {
              title: 'Choosing the right theorem',
              body: [
                'Start by marking the center, all radii, and any tangents. Radii are equal, so isosceles triangles appear often. A diameter suggests a right angle; a tangent suggests a right angle with the radius.',
                'If four points lie on a circle, look for opposite angles or angles standing on the same chord. If the problem gives a tangent and a chord, check whether the alternate segment theorem applies before introducing extra lines.',
              ],
              bullets: [
                'Two radii plus a chord form an isosceles triangle.',
                'A diameter with a third point on the circle forms a right triangle.',
                'Do not assume a quadrilateral is cyclic unless all four vertices are on the circle.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-circles-inscribed-angle',
              title: 'Inscribed angle theorem',
              expression: String.raw`\angle ABC = \frac{1}{2}\angle AOC`,
              description:
                'An angle at the circumference is half the central angle that subtends the same arc.',
              spoken:
                'Angle A B C equals one half of angle A O C, where O is the center of the circle.',
              variables: [
                { symbol: 'O', name: 'center of the circle' },
                { symbol: 'A, B, C', name: 'points on the circle' },
                { symbol: '\\angle AOC', name: 'central angle on arc $AC$' },
                { symbol: '\\angle ABC', name: 'inscribed angle on the same arc' },
              ],
              conditions: [
                '$O$ is the center',
                '$B$ lies on the arc opposite the arc $AC$ used for the central angle',
              ],
              notes:
                'If $AC$ is a diameter, then $\\angle AOC=180^{\\circ}$ and $\\angle ABC=90^{\\circ}$.',
              tags: ['inscribed angle', 'central angle', 'arc', 'semicircle'],
            },
            {
              id: 'g10-circles-cyclic-quadrilateral',
              title: 'Cyclic quadrilateral opposite angles',
              expression: String.raw`\angle A+\angle C=180^{\circ}, \quad \angle B+\angle D=180^{\circ}`,
              description:
                'Opposite angles of a quadrilateral whose vertices all lie on one circle are supplementary.',
              spoken:
                'Angle A plus angle C equals one hundred eighty degrees, and angle B plus angle D equals one hundred eighty degrees.',
              variables: [
                { symbol: 'A, B, C, D', name: 'vertices of the cyclic quadrilateral in order' },
              ],
              conditions: ['All four vertices lie on the same circle'],
              notes:
                'The converse is also true: if a pair of opposite angles is supplementary, the quadrilateral is cyclic.',
              tags: ['cyclic quadrilateral', 'opposite angles', 'supplementary', 'circle theorem'],
            },
            {
              id: 'g10-circles-alternate-segment',
              title: 'Alternate segment theorem',
              expression: String.raw`\angle BAT = \angle ACB`,
              description:
                'The angle between a tangent and a chord equals the angle in the alternate segment subtended by that chord.',
              spoken:
                'Angle B A T equals angle A C B, where A T is tangent at A and A B is a chord.',
              variables: [
                { symbol: 'AT', name: 'tangent at $A$' },
                { symbol: 'AB', name: 'chord from the point of contact' },
                { symbol: 'C', name: 'point on the alternate arc' },
              ],
              conditions: [
                '$AT$ is tangent to the circle at $A$',
                '$B$ and $C$ lie on the circle on opposite sides of chord $AB$ relative to the tangent',
              ],
              notes:
                'Identify the chord first. The angle uses the tangent ray on the side opposite the chosen arc. Reversing the tangent ray gives the supplementary angle.',
              tags: ['alternate segment', 'tangent chord', 'tangent', 'circle theorem'],
            },
            {
              id: 'g10-circles-tangent-lengths',
              title: 'Equal tangent lengths',
              expression: String.raw`PA = PB`,
              description:
                'Two tangents drawn from the same external point to a circle have equal lengths.',
              spoken: 'P A equals P B, where P is an external point and A and B are points of tangency.',
              variables: [
                { symbol: 'P', name: 'external point' },
                { symbol: 'A, B', name: 'points of tangency on the circle' },
              ],
              conditions: ['$P$ lies outside the circle', '$PA$ and $PB$ are tangent segments'],
              notes:
                'The tangent-radius theorem gives right angles at $A$ and $B$, so $\\triangle PAO$ and $\\triangle PBO$ are congruent right triangles.',
              tags: ['tangent lengths', 'external point', 'tangent segments', 'circle theorem'],
            },
          ],
          examples: [
            {
              title: 'Opposite angles in a cyclic quadrilateral',
              problem:
                'Quadrilateral $ABCD$ is cyclic. Angle $A=(2x+10)^{\\circ}$ and angle $C=(3x+20)^{\\circ}$. Find both angles.',
              given: [
                '$ABCD$ is cyclic, with $A$ and $C$ opposite vertices.',
                '$\\angle A=(2x+10)^{\\circ}$.',
                '$\\angle C=(3x+20)^{\\circ}$.',
              ],
              steps: [
                {
                  text: 'Opposite angles of a cyclic quadrilateral are supplementary.',
                  math: String.raw`\angle A+\angle C=180^{\circ}`,
                },
                {
                  text: 'Substitute the expressions.',
                  math: String.raw`(2x+10)+(3x+20)=180`,
                },
                {
                  text: 'Combine like terms.',
                  math: String.raw`5x+30=180`,
                },
                {
                  text: 'Solve for $x$.',
                  math: String.raw`5x=150 \Rightarrow x=30`,
                },
                {
                  text: 'Substitute back into each angle expression.',
                  math: String.raw`\angle A=2(30)+10=70^{\circ}, \quad \angle C=3(30)+20=110^{\circ}`,
                },
                {
                  text: 'Check the sum.',
                  math: String.raw`70^{\circ}+110^{\circ}=180^{\circ}`,
                },
              ],
              answer: '$\\angle A=70^{\\circ}$ and $\\angle C=110^{\\circ}$. Their sum is $180^{\\circ}$, as required.',
            },
            {
              title: 'A tangent and a radius',
              problem:
                'From an external point $P$, a tangent $PA$ touches a circle at $A$. If $PA=12$ cm and the distance from $P$ to the center $O$ is 13 cm, find the radius.',
              given: [
                '$PA=12$ cm.',
                '$OP=13$ cm.',
                '$OA$ is a radius to the point of tangency.',
              ],
              steps: [
                {
                  text: 'A tangent is perpendicular to the radius at the point of contact, so triangle $OAP$ is right-angled at $A$.',
                  math: String.raw`\angle OAP=90^{\circ}`,
                },
                {
                  text: 'Apply the Pythagorean theorem with hypotenuse $OP$.',
                  math: String.raw`OA^2+PA^2=OP^2`,
                },
                {
                  text: 'Substitute the known lengths.',
                  math: String.raw`r^2+12^2=13^2`,
                },
                {
                  text: 'Simplify and solve for $r$.',
                  math: String.raw`r^2+144=169 \Rightarrow r^2=25`,
                },
                {
                  text: 'Choose the positive radius.',
                  math: String.raw`r=5\text{ cm}`,
                },
              ],
              answer:
                'The radius is 5 cm. The tangent length is 12 cm, and $5^2+12^2=13^2$ confirms the right triangle.',
            },
          ],
          mistakes: [
            {
              mistake: 'Doubling the inscribed angle instead of halving the central angle.',
              correction:
                'The inscribed angle is half the central angle on the same arc: $\\angle ABC=\\frac{1}{2}\\angle AOC$.',
            },
            {
              mistake: 'Treating any quadrilateral as cyclic because it looks round in the diagram.',
              correction:
                'A quadrilateral is cyclic only when all four vertices lie on one circle. Use given information or prove the condition.',
            },
            {
              mistake: 'Using the wrong angle in the alternate segment theorem.',
              correction:
                'The angle between the tangent and chord $AB$ equals the angle subtended by $AB$ at a point on the opposite arc, not an angle subtended by a different chord.',
            },
            {
              mistake: 'Assuming tangent lengths from different external points are equal.',
              correction:
                'The equal-length theorem applies only to two tangents drawn from the same external point.',
            },
          ],
          exercises: [
            {
              id: 'g10-circles-ex-1',
              type: 'multiple-choice',
              prompt:
                'A triangle is inscribed in a circle and one side is a diameter. What is the angle opposite that diameter?',
              options: ['$45^{\\circ}$', '$60^{\\circ}$', '$90^{\\circ}$', '$180^{\\circ}$'],
              correctOption: 2,
              hint: 'Use the inscribed angle theorem with a central angle of $180^{\\circ}$.',
              explanation:
                'An angle in a semicircle is half of $180^{\\circ}$, so it measures $90^{\\circ}$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-circles-ex-2',
              type: 'numeric',
              prompt:
                'A central angle measures $130^{\\circ}$. Find the inscribed angle that subtends the same arc.',
              answer: 65,
              tolerance: 0.01,
              answerUnit: '°',
              hint: 'The inscribed angle is half the central angle.',
              explanation:
                '$\\frac{1}{2}(130^{\\circ})=65^{\\circ}$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-circles-ex-3',
              type: 'numeric',
              prompt:
                'In cyclic quadrilateral $ABCD$, $\\angle A=(x+40)^{\\circ}$ and $\\angle C=(2x+20)^{\\circ}$. Find $x$.',
              answer: 40,
              tolerance: 0.01,
              hint: 'Opposite angles sum to $180^{\\circ}$.',
              explanation:
                '$(x+40)+(2x+20)=180$, so $3x+60=180$ and $x=40$. The angles are $80^{\\circ}$ and $100^{\\circ}$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-circles-ex-4',
              type: 'multiple-choice',
              prompt:
                'A tangent and a chord meet at $72^{\\circ}$ at the point of contact. What is the angle in the alternate segment?',
              options: ['$18^{\\circ}$', '$36^{\\circ}$', '$72^{\\circ}$', '$144^{\\circ}$'],
              correctOption: 2,
              hint: 'The alternate segment theorem makes the two angles equal.',
              explanation:
                'The angle between the tangent and the chord equals the angle in the alternate segment, so it is $72^{\\circ}$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-circles-ex-5',
              type: 'numeric',
              prompt:
                'A tangent from $P$ touches a circle of radius 7 cm at $A$. If $OP=25$ cm, find $PA$ in centimeters.',
              answer: 24,
              tolerance: 0.01,
              answerUnit: 'cm',
              hint: 'The radius is perpendicular to the tangent, so use Pythagoras.',
              explanation:
                '$PA^2+7^2=25^2$, so $PA^2=625-49=576$ and $PA=24$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g10-circles-ex-6',
              type: 'multiple-choice',
              prompt: 'Which statement is not always true?',
              options: [
                'Every rectangle is cyclic',
                'Every isosceles trapezoid is cyclic',
                'Every parallelogram is cyclic',
                'A cyclic quadrilateral has supplementary opposite angles',
              ],
              correctOption: 2,
              hint: 'A general parallelogram does not have supplementary opposite angles.',
              explanation:
                'In a parallelogram, opposite angles are equal. They would need to be $90^{\\circ}$ each to be supplementary, which forces a rectangle. So a general parallelogram is not cyclic.',
              difficulty: 'hard',
            },
          ],
          related: [
            'circle-geometry',
            'geometric-proofs',
            'right-triangle-trigonometry',
          ],
          aliases: ['circle geometry', 'cyclic quadrilateral', 'tangent chord', 'inscribed angle'],
        },
      ],
    },
    {
      id: 'coordinate-geometry',
      family: 'coordinate-geometry',
      title: 'Coordinate Geometry',
      description:
        'Describe lines algebraically, convert between forms, and use slope to decide whether lines are parallel, perpendicular, or intersecting.',
      theorems: [
        {
          title: 'Parallel and perpendicular slope criteria',
          statement:
            'Two non-vertical lines are parallel exactly when their slopes are equal. Two lines are perpendicular exactly when the product of their slopes is $-1$, provided neither is vertical.',
          note: 'A horizontal line has slope 0 and is perpendicular to a vertical line, whose slope is undefined.',
        },
      ],
      topics: [
        {
          id: 'coordinate-geometry-of-lines',
          title: 'Coordinate Geometry of Lines',
          subtitle: 'Move between slope forms, perpendicular gradients, and intersection points.',
          introduction:
            'A line is determined by a point and a direction. Slope measures that direction, and each algebraic form highlights a different feature: slope and intercept, a point and slope, or a general linear relation. The same line can wear all three forms.',
          prerequisites: [
            'Plotting coordinates and calculating slope',
            'Solving linear equations',
            'Rearranging formulas',
          ],
          keyIdeas: [
            'Slope is the change in $y$ divided by the change in $x$.',
            'Slope-intercept form displays the $y$-intercept directly.',
            'Point-slope form is built from one point and the slope.',
            'Parallel lines have equal slopes; perpendicular slopes multiply to $-1$.',
            'An intersection is a point satisfying both equations.',
          ],
          theory: [
            {
              title: 'Slope as a rate of change',
              body: [
                'The slope of a line through $(x_1,y_1)$ and $(x_2,y_2)$ is $m=\\frac{y_2-y_1}{x_2-x_1}$. It measures how much $y$ changes for each unit increase in $x$. A horizontal line has slope 0; a vertical line has undefined slope because $x_2-x_1=0$.',
                'Keep the points in the same order in the numerator and denominator. Reversing both gives the same slope, but reversing only one changes the sign.',
              ],
              bullets: [
                'Rising line: positive slope.',
                'Falling line: negative slope.',
                'Horizontal line: slope 0.',
                'Vertical line: undefined slope.',
              ],
            },
            {
              title: 'Three forms of a line',
              body: [
                'Slope-intercept form $y=mx+c$ shows the slope $m$ and the $y$-intercept $(0,c)$. Point-slope form $y-y_1=m(x-x_1)$ is convenient when a point and the slope are known. Standard form $Ax+By=C$ is useful for systems and for avoiding fractions.',
                'Convert by rearranging, not by changing the line. For example, $y-3=2(x-1)$ expands to $y=2x+1$, and then to $2x-y=-1$. All three describe the same set of points.',
              ],
              bullets: [
                'Slope-intercept: solve for $y$.',
                'Point-slope: keep the signs of the coordinates.',
                'Standard form: $A$ and $B$ are not both zero.',
              ],
            },
            {
              title: 'Parallel and perpendicular lines',
              body: [
                'Parallel lines have the same slope but different intercepts. If they share an intercept as well, they are the same line, not two parallel lines.',
                'Perpendicular lines have slopes that are negative reciprocals: $m_1m_2=-1$. If one line has slope $\\frac{2}{3}$, a perpendicular line has slope $-\\frac{3}{2}$. A horizontal line is perpendicular to a vertical line, which is the one case the product rule cannot express because the vertical slope is undefined.',
              ],
              bullets: [
                'Parallel: $m_1=m_2$.',
                'Perpendicular: $m_1m_2=-1$.',
                'Negative reciprocal means flip the fraction and change the sign.',
              ],
            },
            {
              title: 'Intersections and special cases',
              body: [
                'Two non-parallel lines meet at exactly one point. Solve the system by substitution or elimination, then check the point in both equations. The intersection is the point shared by both graphs.',
                'Parallel lines have no intersection. Coincident lines have infinitely many. In slope-intercept form, coincident lines have the same slope and the same intercept; parallel lines have the same slope and different intercepts.',
              ],
              bullets: [
                'Substitute one equation into the other when a variable is isolated.',
                'Eliminate a variable when both equations are in standard form.',
                'Always verify the intersection in both original equations.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-lines-slope',
              title: 'Slope between two points',
              expression: String.raw`m = \frac{y_2-y_1}{x_2-x_1}`,
              description:
                'Measures the steepness and direction of the line through two distinct points.',
              spoken: 'm equals y two minus y one, divided by x two minus x one.',
              variables: [
                { symbol: 'm', name: 'slope' },
                { symbol: '(x_1,y_1)', name: 'first point' },
                { symbol: '(x_2,y_2)', name: 'second point' },
              ],
              conditions: ['$x_1 \\ne x_2$; a vertical line has undefined slope'],
              notes:
                'The order of subtraction must match in the numerator and denominator.',
              tags: ['slope', 'gradient', 'rate of change', 'two points'],
            },
            {
              id: 'g10-lines-slope-intercept',
              title: 'Slope-intercept form',
              expression: String.raw`y = mx + c`,
              description:
                'Displays a non-vertical line through its slope $m$ and $y$-intercept $c$.',
              spoken: 'y equals m x plus c, where m is the slope and c is the y-intercept.',
              variables: [
                { symbol: 'm', name: 'slope' },
                { symbol: 'c', name: 'y-intercept' },
                { symbol: 'x, y', name: 'coordinates of a point on the line' },
              ],
              conditions: ['The line is not vertical'],
              notes:
                'The $y$-intercept is the point $(0,c)$. A vertical line has an equation $x=k$ and cannot be written in this form.',
              tags: ['slope-intercept', 'y-intercept', 'linear equation', 'graphing'],
            },
            {
              id: 'g10-lines-point-slope',
              title: 'Point-slope form',
              expression: String.raw`y-y_1 = m(x-x_1)`,
              description:
                'Builds the equation of a line from one known point and its slope.',
              spoken: 'y minus y one equals m times the quantity x minus x one.',
              variables: [
                { symbol: 'm', name: 'slope' },
                { symbol: '(x_1,y_1)', name: 'known point on the line' },
                { symbol: 'x, y', name: 'coordinates of any other point on the line' },
              ],
              conditions: ['The line is not vertical'],
              notes:
                'Expand and solve for $y$ to reach slope-intercept form. Keep the subtraction signs; substituting a negative coordinate creates a plus sign.',
              tags: ['point-slope', 'linear equation', 'point and slope', 'line equation'],
            },
            {
              id: 'g10-lines-perpendicular',
              title: 'Perpendicular slope condition',
              expression: String.raw`m_1 m_2 = -1`,
              description:
                'Two non-vertical lines are perpendicular exactly when their slopes are negative reciprocals.',
              spoken: 'm one times m two equals negative one.',
              variables: [
                { symbol: 'm_1', name: 'slope of the first line', note: 'nonzero' },
                { symbol: 'm_2', name: 'slope of the second line', note: 'nonzero' },
              ],
              conditions: [
                'Both lines are non-vertical',
                'Neither line is horizontal',
              ],
              notes:
                'A horizontal line and a vertical line are perpendicular even though the product rule does not apply. Parallel lines satisfy $m_1=m_2$.',
              tags: ['perpendicular', 'negative reciprocal', 'gradient', 'parallel'],
            },
          ],
          examples: [
            {
              title: 'From two points to two lines',
              problem:
                'Find the equation of the line through $A(2,-3)$ and $B(6,5)$. Then find the equation of the line through $A$ perpendicular to $AB$.',
              given: ['$A(2,-3)$ and $B(6,5)$.', 'The second line passes through $A$ and is perpendicular to $AB$.'],
              steps: [
                {
                  text: 'Compute the slope of $AB$.',
                  math: String.raw`m = \frac{5-(-3)}{6-2} = \frac{8}{4} = 2`,
                },
                {
                  text: 'Use point-slope form with point $A$ and slope 2.',
                  math: String.raw`y-(-3)=2(x-2)`,
                },
                {
                  text: 'Simplify to slope-intercept form.',
                  math: String.raw`y+3=2x-4 \Rightarrow y=2x-7`,
                },
                {
                  text: 'The perpendicular slope is the negative reciprocal of 2.',
                  math: String.raw`m_{\perp}=-\frac{1}{2}`,
                },
                {
                  text: 'Use point-slope form again with the same point $A$.',
                  math: String.raw`y+3=-\frac{1}{2}(x-2)`,
                },
                {
                  text: 'Simplify the perpendicular line.',
                  math: String.raw`y+3=-\frac{1}{2}x+1 \Rightarrow y=-\frac{1}{2}x-2`,
                },
                {
                  text: 'Check that the slopes multiply to $-1$.',
                  math: String.raw`2\left(-\frac{1}{2}\right)=-1`,
                },
              ],
              answer:
                'The line $AB$ is $y=2x-7$. The perpendicular line through $A$ is $y=-\\frac{1}{2}x-2$.',
            },
            {
              title: 'Where two lines meet',
              problem: 'Find the intersection of $2x+3y=12$ and $y=x-1$.',
              given: [
                '$2x+3y=12$.',
                '$y=x-1$.',
              ],
              steps: [
                {
                  text: 'Substitute $y=x-1$ into the first equation.',
                  math: String.raw`2x+3(x-1)=12`,
                },
                {
                  text: 'Expand and combine like terms.',
                  math: String.raw`2x+3x-3=12 \Rightarrow 5x=15`,
                },
                {
                  text: 'Solve for $x$.',
                  math: String.raw`x=3`,
                },
                {
                  text: 'Substitute back into $y=x-1$.',
                  math: String.raw`y=3-1=2`,
                },
                {
                  text: 'Check the point in the first equation.',
                  math: String.raw`2(3)+3(2)=6+6=12`,
                },
              ],
              answer:
                'The lines intersect at $(3,2)$. Substitution in both equations confirms the point.',
            },
          ],
          mistakes: [
            {
              mistake: 'Subtracting the coordinates in different orders in the numerator and denominator.',
              correction:
                'Use the same point first in both differences: $\\frac{y_2-y_1}{x_2-x_1}$. Reversing both is also correct; reversing only one changes the sign.',
            },
            {
              mistake: 'Using the reciprocal instead of the negative reciprocal for a perpendicular slope.',
              correction:
                'Perpendicular slopes satisfy $m_1m_2=-1$. Flip the fraction and change the sign.',
            },
            {
              mistake: 'Writing point-slope form as $y+y_1=m(x+x_1)$.',
              correction:
                'The form is $y-y_1=m(x-x_1)$. If the point is $(2,-3)$, substitute $x_1=2$ and $y_1=-3$ carefully.',
            },
            {
              mistake: 'Assuming two lines with different slopes are perpendicular.',
              correction:
                'Different slopes only guarantee an intersection. Perpendicularity requires the product of the slopes to be $-1$.',
            },
          ],
          exercises: [
            {
              id: 'g10-lines-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the slope of the line through $(1,2)$ and $(5,10)$?',
              options: ['$\\frac{1}{2}$', '$2$', '$4$', '$8$'],
              correctOption: 1,
              hint: 'Compute the change in $y$ divided by the change in $x$.',
              explanation:
                '$m=\\frac{10-2}{5-1}=\\frac{8}{4}=2$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-lines-ex-2',
              type: 'numeric',
              prompt: 'What is the slope of a line perpendicular to a line with slope $\\frac{2}{3}$?',
              answer: -1.5,
              tolerance: 0.01,
              hint: 'Take the negative reciprocal.',
              explanation:
                'The negative reciprocal of $\\frac{2}{3}$ is $-\\frac{3}{2}=-1.5$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-lines-ex-3',
              type: 'multiple-choice',
              prompt: 'Which equation describes the line through $(3,4)$ with slope $-2$?',
              options: [
                '$y-4=-2(x-3)$',
                '$y+4=-2(x-3)$',
                '$y-4=2(x-3)$',
                '$y-3=-2(x-4)$',
              ],
              correctOption: 0,
              hint: 'Use $y-y_1=m(x-x_1)$.',
              explanation:
                'Substituting $m=-2$ and $(x_1,y_1)=(3,4)$ gives $y-4=-2(x-3)$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-lines-ex-4',
              type: 'numeric',
              prompt: 'Find the $x$-coordinate of the intersection of $y=2x+1$ and $y=-x+7$.',
              answer: 2,
              tolerance: 0.01,
              hint: 'Set the two expressions for $y$ equal.',
              explanation:
                '$2x+1=-x+7$ gives $3x=6$, so $x=2$. Then $y=5$, and both equations agree.',
              difficulty: 'medium',
            },
            {
              id: 'g10-lines-ex-5',
              type: 'numeric',
              prompt:
                'Find the $y$-intercept of the line through $(2,5)$ and $(6,13)$.',
              answer: 1,
              tolerance: 0.01,
              hint: 'First compute the slope, then use point-slope form.',
              explanation:
                '$m=\\frac{13-5}{6-2}=2$. Using $(2,5)$: $y-5=2(x-2)$, so $y=2x+1$. The $y$-intercept is 1.',
              difficulty: 'medium',
            },
            {
              id: 'g10-lines-ex-6',
              type: 'multiple-choice',
              prompt: 'Which line is parallel to $3x+2y=6$?',
              options: [
                '$y=\\frac{3}{2}x+4$',
                '$y=-\\frac{3}{2}x+4$',
                '$y=\\frac{2}{3}x+4$',
                '$y=-\\frac{2}{3}x+4$',
              ],
              correctOption: 1,
              hint: 'Solve the given equation for $y$.',
              explanation:
                '$3x+2y=6$ becomes $y=-\\frac{3}{2}x+3$, so the slope is $-\\frac{3}{2}$. The parallel line has the same slope, $-\\frac{3}{2}$.',
              difficulty: 'medium',
            },
          ],
          related: [
            'distance-midpoint-slope',
            'linear-functions',
            'systems-of-inequalities',
            'circles-in-coordinate-geometry',
          ],
          aliases: ['line equations', 'gradient', 'slope-intercept', 'point-slope'],
        },
      ],
    },
    {
      id: 'trigonometry',
      family: 'trigonometry',
      title: 'Trigonometry',
      description:
        'Ratios in right triangles, exact values for special angles, and the sine and cosine rules for triangles that are not right-angled.',
      theorems: [
        {
          title: 'Sine rule',
          statement:
            'In any triangle $ABC$, $\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}$, where each side is opposite the angle with the same letter.',
          note: 'Use it when you know a matching angle-side pair plus one more angle or side.',
        },
        {
          title: 'Cosine rule',
          statement:
            'In any triangle $ABC$, $c^2=a^2+b^2-2ab\\cos C$, where $C$ is the angle between sides $a$ and $b$.',
          note: 'When $C=90^{\\circ}$, $\\cos C=0$ and the rule reduces to the Pythagorean theorem.',
        },
        {
          title: 'Sine area formula',
          statement:
            'The area of a triangle is $\\frac{1}{2}ab\\sin C$, where $C$ is the included angle between sides $a$ and $b$.',
          note: 'The formula needs two sides and the angle between them, not the angle opposite either side.',
        },
        {
          title: 'Pythagorean identity',
          statement:
            'For every angle $\\theta$, $\\sin^2\\theta+\\cos^2\\theta=1$.',
          note: 'For acute angles this follows directly from the Pythagorean theorem in a right triangle with hypotenuse 1.',
        },
      ],
      topics: [
        {
          id: 'right-triangle-trigonometry',
          title: 'Right-Triangle Trigonometry',
          subtitle: 'Use sine, cosine, and tangent ratios to solve right triangles and model heights.',
          introduction:
            'In a right triangle, the ratio of two sides depends only on the acute angle, not on the size of the triangle. That remarkable fact turns angles into side lengths and side lengths into angles, which is why trigonometry can measure a tower without climbing it.',
          prerequisites: [
            'Pythagorean theorem',
            'Similar triangles',
            'Solving equations and using a calculator',
          ],
          keyIdeas: [
            'SOH-CAH-TOA names the three basic ratios.',
            'The ratios depend on the angle, not on the triangle size.',
            'Special angles $30^{\\circ}$, $45^{\\circ}$, and $60^{\\circ}$ have exact values.',
            'Inverse trigonometric functions recover an angle from a ratio.',
            'Angles of elevation and depression are measured from the horizontal.',
          ],
          theory: [
            {
              title: 'Ratios in right triangles',
              body: [
                'Label the sides relative to a chosen acute angle $\\theta$. The hypotenuse is opposite the right angle. The opposite side is across from $\\theta$, and the adjacent side is the leg that forms $\\theta$ with the hypotenuse.',
                'For a fixed acute angle, all right triangles with that angle are similar, so the ratios of corresponding sides are constant. Those constants are named sine, cosine, and tangent.',
              ],
              bullets: [
                '$\\sin\\theta=\\frac{\\text{opposite}}{\\text{hypotenuse}}$ (SOH).',
                '$\\cos\\theta=\\frac{\\text{adjacent}}{\\text{hypotenuse}}$ (CAH).',
                '$\\tan\\theta=\\frac{\\text{opposite}}{\\text{adjacent}}$ (TOA).',
                'The labels opposite and adjacent swap when you choose the other acute angle.',
              ],
            },
            {
              title: 'Special angles',
              body: [
                'A $45^{\\circ}$-$45^{\\circ}$-$90^{\\circ}$ triangle is half a square. If the legs are 1, the hypotenuse is $\\sqrt{2}$, which gives exact ratios for $45^{\\circ}$.',
                'A $30^{\\circ}$-$60^{\\circ}$-$90^{\\circ}$ triangle is half an equilateral triangle. Taking the short side as 1 gives sides $1$, $\\sqrt{3}$, and $2$, which produces the exact values for $30^{\\circ}$ and $60^{\\circ}$.',
              ],
              bullets: [
                '$\\sin 30^{\\circ}=\\frac{1}{2}$, $\\cos 30^{\\circ}=\\frac{\\sqrt{3}}{2}$, $\\tan 30^{\\circ}=\\frac{1}{\\sqrt{3}}=\\frac{\\sqrt{3}}{3}$.',
                '$\\sin 45^{\\circ}=\\frac{\\sqrt{2}}{2}$, $\\cos 45^{\\circ}=\\frac{\\sqrt{2}}{2}$, $\\tan 45^{\\circ}=1$.',
                '$\\sin 60^{\\circ}=\\frac{\\sqrt{3}}{2}$, $\\cos 60^{\\circ}=\\frac{1}{2}$, $\\tan 60^{\\circ}=\\sqrt{3}$.',
              ],
            },
            {
              title: 'Solving a right triangle',
              body: [
                'To find a side, choose the ratio that contains the known side and the unknown side. To find an angle, use the inverse function: if $\\tan\\theta=0.75$, then $\\theta=\\tan^{-1}(0.75)$.',
                'A complete solution gives all three sides and both acute angles. The acute angles are complementary, so once one is known the other is $90^{\\circ}-\\theta$.',
              ],
              bullets: [
                'Known angle and hypotenuse, need opposite: use sine.',
                'Known angle and adjacent, need opposite: use tangent.',
                'Known two sides, need angle: use the inverse of the matching ratio.',
                'Check that the hypotenuse is the longest side.',
              ],
            },
            {
              title: 'Elevation and depression',
              body: [
                'An angle of elevation is measured upward from the horizontal. An angle of depression is measured downward from the horizontal. In a diagram, these angles often appear as alternate interior angles between two horizontal lines.',
                'Set the calculator to degree mode. Mixing radians and degrees is one of the most common sources of wrong answers in trigonometry.',
              ],
              bullets: [
                'Elevation: look up from the horizontal.',
                'Depression: look down from the horizontal.',
                'The angle of depression from $A$ to $B$ equals the angle of elevation from $B$ to $A$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-trig-sine-ratio',
              title: 'Sine ratio',
              expression: String.raw`\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}`,
              description:
                'Compares the side opposite an acute angle with the hypotenuse of a right triangle.',
              spoken: 'Sine theta equals opposite over hypotenuse.',
              variables: [
                { symbol: '\\theta', name: 'acute angle in a right triangle' },
                { symbol: '\\text{opposite}', name: 'side across from $\\theta$' },
                { symbol: '\\text{hypotenuse}', name: 'side opposite the right angle' },
              ],
              conditions: ['The triangle is right-angled', '$0^{\\circ}<\\theta<90^{\\circ}$'],
              notes:
                'The sine of an acute angle is always between 0 and 1 because the hypotenuse is the longest side.',
              tags: ['sine', 'SOH', 'right triangle', 'opposite hypotenuse'],
            },
            {
              id: 'g10-trig-cosine-ratio',
              title: 'Cosine ratio',
              expression: String.raw`\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}`,
              description:
                'Compares the leg adjacent to an acute angle with the hypotenuse.',
              spoken: 'Cosine theta equals adjacent over hypotenuse.',
              variables: [
                { symbol: '\\theta', name: 'acute angle in a right triangle' },
                { symbol: '\\text{adjacent}', name: 'leg that forms $\\theta$ with the hypotenuse' },
                { symbol: '\\text{hypotenuse}', name: 'side opposite the right angle' },
              ],
              conditions: ['The triangle is right-angled', '$0^{\\circ}<\\theta<90^{\\circ}$'],
              notes:
                'The adjacent side and opposite side swap when the other acute angle is chosen.',
              tags: ['cosine', 'CAH', 'right triangle', 'adjacent hypotenuse'],
            },
            {
              id: 'g10-trig-tangent-ratio',
              title: 'Tangent ratio',
              expression: String.raw`\tan\theta = \frac{\text{opposite}}{\text{adjacent}}`,
              description:
                'Compares the two legs of a right triangle relative to an acute angle.',
              spoken: 'Tangent theta equals opposite over adjacent.',
              variables: [
                { symbol: '\\theta', name: 'acute angle in a right triangle' },
                { symbol: '\\text{opposite}', name: 'side across from $\\theta$' },
                { symbol: '\\text{adjacent}', name: 'leg next to $\\theta$' },
              ],
              conditions: ['The triangle is right-angled', '$0^{\\circ}<\\theta<90^{\\circ}$'],
              notes:
                'Tangent can be written as $\\frac{\\sin\\theta}{\\cos\\theta}$. It is also the slope of a line making angle $\\theta$ with the horizontal.',
              tags: ['tangent', 'TOA', 'right triangle', 'slope angle'],
            },
            {
              id: 'g10-trig-pythagorean-identity',
              title: 'Pythagorean identity',
              expression: String.raw`\sin^2\theta + \cos^2\theta = 1`,
              description:
                'Relates the sine and cosine of the same angle through the Pythagorean theorem.',
              spoken: 'Sine squared theta plus cosine squared theta equals one.',
              variables: [
                { symbol: '\\theta', name: 'angle' },
              ],
              conditions: ['$\\theta$ is any angle for which sine and cosine are defined'],
              notes:
                'For an acute angle, divide each side of $a^2+b^2=c^2$ by $c^2$.',
              tags: ['identity', 'Pythagorean identity', 'sine cosine', 'trigonometry'],
            },
          ],
          examples: [
            {
              title: 'Measuring a tower from the ground',
              problem:
                'From a point 18 m from the base of a vertical tower, the angle of elevation to the top is $35^{\\circ}$. Find the height of the tower.',
              given: [
                'Horizontal distance to the base: 18 m.',
                'Angle of elevation: $35^{\\circ}$.',
                'The tower is vertical, so the triangle is right-angled.',
              ],
              steps: [
                {
                  text: 'Draw the right triangle. The tower is opposite the $35^{\\circ}$ angle and the 18 m distance is adjacent to it.',
                  math: String.raw`\tan 35^{\circ}=\frac{h}{18}`,
                },
                {
                  text: 'Multiply both sides by 18.',
                  math: String.raw`h=18\tan 35^{\circ}`,
                },
                {
                  text: 'Evaluate in degree mode.',
                  math: String.raw`\tan 35^{\circ}\approx 0.700208`,
                },
                {
                  text: 'Multiply and round to two decimal places.',
                  math: String.raw`h\approx 18(0.700208)=12.6037`,
                },
              ],
              answer:
                'The tower is about 12.60 m tall. The exact expression is $18\\tan 35^{\\circ}$ m.',
            },
            {
              title: 'A ladder at a special angle',
              problem:
                'A 6 m ladder leans against a wall and makes a $60^{\\circ}$ angle with the ground. Find the height it reaches on the wall and the distance from the wall to its foot.',
              given: [
                'Ladder length (hypotenuse): 6 m.',
                'Angle with the ground: $60^{\\circ}$.',
              ],
              steps: [
                {
                  text: 'The height is opposite the $60^{\\circ}$ angle. Use sine.',
                  math: String.raw`\sin 60^{\circ}=\frac{h}{6}`,
                },
                {
                  text: 'Substitute the exact value $\\sin 60^{\\circ}=\\frac{\\sqrt{3}}{2}$.',
                  math: String.raw`h=6\cdot\frac{\sqrt{3}}{2}=3\sqrt{3}`,
                },
                {
                  text: 'Approximate the height.',
                  math: String.raw`h\approx 5.20\text{ m}`,
                },
                {
                  text: 'The distance from the wall is adjacent to the $60^{\\circ}$ angle. Use cosine.',
                  math: String.raw`d=6\cos 60^{\circ}=6\cdot\frac{1}{2}=3`,
                },
                {
                  text: 'Check with the Pythagorean theorem.',
                  math: String.raw`3^2+(3\sqrt{3})^2=9+27=36=6^2`,
                },
              ],
              answer:
                'The ladder reaches $3\\sqrt{3}\\approx 5.20$ m up the wall, and its foot is 3 m from the wall.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using the adjacent side in the sine ratio.',
              correction:
                'Sine compares the side opposite the angle with the hypotenuse. Use cosine when the adjacent side is involved.',
            },
            {
              mistake: 'Leaving the calculator in radian mode.',
              correction:
                'Grade 10 problems use degrees unless stated otherwise. Check the mode indicator before evaluating a trigonometric function.',
            },
            {
              mistake: 'Measuring an angle of depression from the vertical.',
              correction:
                'Angles of elevation and depression are measured from the horizontal. Draw a horizontal line at the observer and mark the angle below it.',
            },
            {
              mistake: 'Rounding a side length too early and then using it to find an angle.',
              correction:
                'Carry exact values or several decimal places through intermediate steps. Round only the final answer.',
            },
          ],
          exercises: [
            {
              id: 'g10-right-trig-ex-1',
              type: 'multiple-choice',
              prompt: 'In a right triangle, which ratio equals $\\sin\\theta$?',
              options: [
                'Adjacent divided by hypotenuse',
                'Opposite divided by hypotenuse',
                'Opposite divided by adjacent',
                'Hypotenuse divided by opposite',
              ],
              correctOption: 1,
              hint: 'Use SOH-CAH-TOA.',
              explanation:
                'SOH means sine equals opposite over hypotenuse. The other ratios are cosine, tangent, and the reciprocal of sine.',
              difficulty: 'easy',
            },
            {
              id: 'g10-right-trig-ex-2',
              type: 'numeric',
              prompt:
                'In a right triangle, an acute angle is $30^{\\circ}$ and the hypotenuse is 10 cm. Find the side opposite the $30^{\\circ}$ angle.',
              answer: 5,
              tolerance: 0.01,
              answerUnit: 'cm',
              hint: 'Use $\\sin 30^{\\circ}=\\frac{1}{2}$.',
              explanation:
                'The opposite side is $10\\sin 30^{\\circ}=10\\cdot\\frac{1}{2}=5$ cm.',
              difficulty: 'easy',
            },
            {
              id: 'g10-right-trig-ex-3',
              type: 'multiple-choice',
              prompt: 'What is the exact value of $\\cos 60^{\\circ}$?',
              options: ['$\\frac{1}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{\\sqrt{3}}{2}$', '$1$'],
              correctOption: 0,
              hint: 'In a $30^{\\circ}$-$60^{\\circ}$-$90^{\\circ}$ triangle, the side adjacent to $60^{\\circ}$ is half the hypotenuse.',
              explanation:
                'The exact value is $\\cos 60^{\\circ}=\\frac{1}{2}$. The value $\\frac{\\sqrt{3}}{2}$ is $\\sin 60^{\\circ}$.',
              difficulty: 'easy',
            },
            {
              id: 'g10-right-trig-ex-4',
              type: 'numeric',
              prompt:
                'An acute angle $\\theta$ has $\\tan\\theta=0.75$. Find $\\theta$ in degrees, rounded to two decimal places.',
              answer: 36.87,
              tolerance: 0.05,
              answerUnit: '°',
              hint: 'Use the inverse tangent.',
              explanation:
                '$\\theta=\\tan^{-1}(0.75)\\approx 36.8699^{\\circ}$, which rounds to $36.87^{\\circ}$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-right-trig-ex-5',
              type: 'numeric',
              prompt:
                'From the top of a 40 m vertical cliff, the angle of depression to a boat is $30^{\\circ}$. Find the horizontal distance from the base of the cliff to the boat.',
              answer: 69.28,
              tolerance: 0.05,
              answerUnit: 'm',
              hint: 'The angle of depression equals the angle of elevation from the boat.',
              explanation:
                'The horizontal distance is $d=\\frac{40}{\\tan 30^{\\circ}}=40\\sqrt{3}\\approx 69.28$ m.',
              difficulty: 'medium',
            },
            {
              id: 'g10-right-trig-ex-6',
              type: 'multiple-choice',
              prompt: 'Which identity is true for every angle $\\theta$?',
              options: [
                '$\\sin^2\\theta+\\cos^2\\theta=1$',
                '$\\sin\\theta+\\cos\\theta=1$',
                '$\\tan\\theta=\\frac{\\cos\\theta}{\\sin\\theta}$',
                '$\\sin^2\\theta-\\cos^2\\theta=1$',
              ],
              correctOption: 0,
              hint: 'Divide $a^2+b^2=c^2$ by $c^2$.',
              explanation:
                'The Pythagorean identity is $\\sin^2\\theta+\\cos^2\\theta=1$. The sum $\\sin\\theta+\\cos\\theta$ is not generally 1.',
              difficulty: 'medium',
            },
          ],
          related: [
            'pythagorean-theorem',
            'sine-and-cosine-rules',
            'unit-circle-trigonometry',
            'similarity-and-dilations',
          ],
          aliases: ['SOH CAH TOA', 'trig ratios', 'sine cosine tangent', 'angle of elevation'],
        },
        {
          id: 'sine-and-cosine-rules',
          title: 'The Sine and Cosine Rules',
          subtitle: 'Solve triangles that have no right angle, including the ambiguous SSA case.',
          introduction:
            'Right-triangle trigonometry runs out of right angles quickly. The sine rule relates sides to opposite angles, the cosine rule extends Pythagoras to any included angle, and a compact area formula completes the toolkit for general triangles.',
          prerequisites: [
            'Right-triangle trigonometry',
            'Pythagorean theorem',
            'Triangle angle sum',
          ],
          keyIdeas: [
            'The sine rule pairs each side with its opposite angle.',
            'The cosine rule handles two sides and the included angle.',
            'The area formula uses two sides and the included angle.',
            'SSA can produce zero, one, or two triangles.',
            'Check that the angles sum to $180^{\\circ}$ and the longest side faces the largest angle.',
          ],
          theory: [
            {
              title: 'Why the sine rule works',
              body: [
                'In triangle $ABC$, let $a$ be the side opposite angle $A$, $b$ opposite $B$, and $c$ opposite $C$. Drop a perpendicular from $B$ to side $AC$ and call its height $h$.',
                'From the two right triangles formed, $h=c\\sin A$ and $h=a\\sin C$. Equating the two expressions gives $a\\sin C=c\\sin A$, which rearranges to $\\frac{a}{\\sin A}=\\frac{c}{\\sin C}$. Repeating the argument with another altitude gives the full sine rule.',
              ],
              bullets: [
                'A side and its opposite angle form a matching pair.',
                'The ratio is the same for all three pairs.',
                'Use two pairs when one pair is complete.',
              ],
            },
            {
              title: 'The cosine rule as a generalization of Pythagoras',
              body: [
                'Place $C$ at the origin. Let $B=(a,0)$ and $A=(b\\cos C, b\\sin C)$. Then the distance $AB=c$ satisfies $c^2=(b\\cos C-a)^2+(b\\sin C)^2$.',
                'Expanding and using $\\sin^2 C+\\cos^2 C=1$ gives $c^2=a^2+b^2-2ab\\cos C$. When $C=90^{\\circ}$, the cosine term vanishes and the result is the Pythagorean theorem.',
              ],
              bullets: [
                'The angle must be between the two known sides.',
                'The side on the left is opposite the angle on the right.',
                'Rearrange to find an angle when all three sides are known.',
              ],
            },
            {
              title: 'Area and the ambiguous case',
              body: [
                'The area of a triangle is $\\frac{1}{2}ab\\sin C$, where $C$ is the included angle. The factor $b\\sin C$ is the height to side $a$, so the formula is the familiar half-base-times-height rule in disguise.',
                'SSA is the ambiguous case. Given two sides and a non-included acute angle, the sine rule can produce two possible angles for the second side. Both may be valid, only one may fit the angle sum, or none may fit. Always check both candidates against $A+B+C=180^{\\circ}$.',
              ],
              bullets: [
                'SSA: check for 0, 1, or 2 triangles.',
                'If the side opposite the given angle is the longest, there is at most one triangle.',
                'If the sine value exceeds 1, no triangle exists.',
              ],
            },
            {
              title: 'Choosing a rule',
              body: [
                'Use the sine rule when you know a matching side-angle pair and one additional side or angle. Use the cosine rule when you know two sides and the included angle, or all three sides.',
                'Do not use the sine rule with the included angle between the two known sides; that angle is not opposite either known side. The cosine rule is built for that situation.',
              ],
              bullets: [
                'Two angles and any side: sine rule.',
                'Two sides and an included angle: cosine rule.',
                'Three sides: cosine rule for an angle.',
                'Two sides and a non-included angle: sine rule, then check the ambiguous case.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-trig-sine-rule',
              title: 'Sine rule',
              expression: String.raw`\frac{a}{\sin A}=\frac{b}{\sin B}=\frac{c}{\sin C}`,
              description:
                'Relates each side of a triangle to the sine of the angle opposite it.',
              spoken:
                'a over sine A equals b over sine B equals c over sine C.',
              variables: [
                { symbol: 'a', name: 'side opposite angle $A$' },
                { symbol: 'b', name: 'side opposite angle $B$' },
                { symbol: 'c', name: 'side opposite angle $C$' },
                { symbol: 'A, B, C', name: 'interior angles of the triangle' },
              ],
              conditions: ['The triangle is non-degenerate', 'Angles are measured in degrees'],
              notes:
                'The reciprocal form $\\frac{\\sin A}{a}=\\frac{\\sin B}{b}$ is convenient when solving for an angle.',
              tags: ['sine rule', 'law of sines', 'non-right triangle', 'opposite angle'],
            },
            {
              id: 'g10-trig-cosine-rule',
              title: 'Cosine rule for a side',
              expression: String.raw`c^2 = a^2+b^2-2ab\cos C`,
              description:
                'Finds the third side of a triangle from two sides and the angle between them.',
              spoken:
                'c squared equals a squared plus b squared minus two a b cosine C.',
              variables: [
                { symbol: 'a, b', name: 'known sides' },
                { symbol: 'c', name: 'side opposite angle $C$' },
                { symbol: 'C', name: 'included angle between sides $a$ and $b$' },
              ],
              conditions: ['$C$ is the angle between sides $a$ and $b$', 'The triangle is non-degenerate'],
              notes:
                'If $C=90^{\\circ}$, then $\\cos C=0$ and $c^2=a^2+b^2$.',
              tags: ['cosine rule', 'law of cosines', 'included angle', 'non-right triangle'],
            },
            {
              id: 'g10-trig-cosine-angle',
              title: 'Cosine rule for an angle',
              expression: String.raw`\cos C = \frac{a^2+b^2-c^2}{2ab}`,
              description:
                'Finds an angle when all three sides of a triangle are known.',
              spoken:
                'cosine C equals a squared plus b squared minus c squared, divided by two a b.',
              variables: [
                { symbol: 'a, b, c', name: 'side lengths' },
                { symbol: 'C', name: 'angle opposite side $c$' },
              ],
              conditions: ['$a>0$, $b>0$', 'The side lengths satisfy the triangle inequality'],
              notes:
                'The numerator compares $c^2$ with $a^2+b^2$. A negative cosine means the angle is obtuse.',
              tags: ['cosine rule', 'find angle', 'three sides', 'law of cosines'],
            },
            {
              id: 'g10-trig-area-formula',
              title: 'Area of a triangle using sine',
              expression: String.raw`K = \frac{1}{2}ab\sin C`,
              description:
                'Computes the area from two sides and the included angle.',
              spoken: 'K equals one half a b sine C.',
              variables: [
                { symbol: 'K', name: 'area', unit: 'square units' },
                { symbol: 'a, b', name: 'two sides' },
                { symbol: 'C', name: 'included angle between $a$ and $b$' },
              ],
              conditions: ['$C$ is the angle between sides $a$ and $b$'],
              notes:
                'With $C=90^{\\circ}$, the formula reduces to $K=\\frac{1}{2}ab$, the area of a right triangle.',
              tags: ['triangle area', 'sine area', 'included angle', 'area formula'],
            },
          ],
          examples: [
            {
              title: 'Two angles and one side',
              problem:
                'In triangle $ABC$, $A=40^{\\circ}$, $B=75^{\\circ}$, and $a=8$ cm. Find the remaining angle and the sides $b$ and $c$.',
              given: [
                '$A=40^{\\circ}$, $B=75^{\\circ}$, $a=8$ cm.',
                'The angles of a triangle sum to $180^{\\circ}$.',
              ],
              steps: [
                {
                  text: 'Find the third angle.',
                  math: String.raw`C=180^{\circ}-40^{\circ}-75^{\circ}=65^{\circ}`,
                },
                {
                  text: 'Use the sine rule to find $b$, pairing $b$ with $B$ and $a$ with $A$.',
                  math: String.raw`\frac{b}{\sin 75^{\circ}}=\frac{8}{\sin 40^{\circ}}`,
                },
                {
                  text: 'Solve for $b$.',
                  math: String.raw`b=\frac{8\sin 75^{\circ}}{\sin 40^{\circ}}`,
                },
                {
                  text: 'Evaluate in degree mode.',
                  math: String.raw`b\approx \frac{8(0.965926)}{0.642788}\approx 12.02\text{ cm}`,
                },
                {
                  text: 'Use the sine rule again to find $c$, pairing $c$ with $C$.',
                  math: String.raw`c=\frac{8\sin 65^{\circ}}{\sin 40^{\circ}}\approx \frac{8(0.906308)}{0.642788}\approx 11.28\text{ cm}`,
                },
                {
                  text: 'Check the ratio $\\frac{a}{\\sin A}$ against the other two sides.',
                  math: String.raw`\frac{8}{\sin 40^{\circ}}\approx 12.45, \quad \frac{12.02}{\sin 75^{\circ}}\approx 12.45, \quad \frac{11.28}{\sin 65^{\circ}}\approx 12.45`,
                },
              ],
              answer:
                '$C=65^{\\circ}$, $b\\approx 12.02$ cm, and $c\\approx 11.28$ cm. All three side-to-sine ratios agree.',
            },
            {
              title: 'Two sides and the included angle',
              problem:
                'A triangle has sides $b=7$ cm and $c=9$ cm with included angle $A=60^{\\circ}$. Find the third side $a$ and the area.',
              given: [
                '$b=7$ cm, $c=9$ cm.',
                'Included angle $A=60^{\\circ}$.',
                'Side $a$ is opposite angle $A$.',
              ],
              steps: [
                {
                  text: 'Apply the cosine rule with the included angle $A$.',
                  math: String.raw`a^2=b^2+c^2-2bc\cos A`,
                },
                {
                  text: 'Substitute the values and use $\\cos 60^{\\circ}=\\frac{1}{2}$.',
                  math: String.raw`a^2=7^2+9^2-2(7)(9)\left(\frac{1}{2}\right)`,
                },
                {
                  text: 'Simplify.',
                  math: String.raw`a^2=49+81-63=67`,
                },
                {
                  text: 'Take the positive square root.',
                  math: String.raw`a=\sqrt{67}\approx 8.19\text{ cm}`,
                },
                {
                  text: 'Use the sine area formula with the same included angle.',
                  math: String.raw`K=\frac{1}{2}(7)(9)\sin 60^{\circ}`,
                },
                {
                  text: 'Evaluate the area.',
                  math: String.raw`K=31.5\left(\frac{\sqrt{3}}{2}\right)\approx 27.28\text{ cm}^2`,
                },
              ],
              answer:
                '$a=\\sqrt{67}\\approx 8.19$ cm, and the area is $K=\\frac{63\\sqrt{3}}{4}\\approx 27.28$ cm$^2$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using the sine rule with the angle between two known sides.',
              correction:
                'The sine rule needs a side and its opposite angle. When the known angle is included between the known sides, use the cosine rule.',
            },
            {
              mistake: 'Ignoring the second possible angle in an SSA problem.',
              correction:
                'The inverse sine of a value between 0 and 1 has two candidates between $0^{\\circ}$ and $180^{\\circ}$. Check whether both satisfy the angle sum.',
            },
            {
              mistake: 'Forgetting the factor $\\frac{1}{2}$ in the sine area formula.',
              correction:
                'The area is $K=\\frac{1}{2}ab\\sin C$. Without the half, the result is twice the correct area.',
            },
            {
              mistake: 'Pairing a side with the wrong angle in the sine rule.',
              correction:
                'Side $a$ is always opposite angle $A$, side $b$ opposite $B$, and side $c$ opposite $C$. Label the triangle before substituting.',
            },
          ],
          exercises: [
            {
              id: 'g10-sine-cosine-ex-1',
              type: 'multiple-choice',
              prompt:
                'Which rule is most direct for a triangle with two known angles and one known side?',
              options: ['Pythagorean theorem', 'Sine rule', 'Cosine rule', 'Slope formula'],
              correctOption: 1,
              hint: 'You know a side and its opposite angle, plus another angle.',
              explanation:
                'Two angles determine the third, and the known side is paired with its opposite angle, so the sine rule gives the other sides directly.',
              difficulty: 'easy',
            },
            {
              id: 'g10-sine-cosine-ex-2',
              type: 'numeric',
              prompt:
                'In triangle $ABC$, $A=30^{\\circ}$, $B=45^{\\circ}$, and $a=10$ cm. Find $b$ in centimeters, rounded to two decimal places.',
              answer: 14.14,
              tolerance: 0.02,
              answerUnit: 'cm',
              hint: 'Use $\\frac{b}{\\sin B}=\\frac{a}{\\sin A}$.',
              explanation:
                '$b=\\frac{10\\sin 45^{\\circ}}{\\sin 30^{\\circ}}=\\frac{10(\\sqrt{2}/2)}{1/2}=10\\sqrt{2}\\approx 14.14$ cm.',
              difficulty: 'easy',
            },
            {
              id: 'g10-sine-cosine-ex-3',
              type: 'multiple-choice',
              prompt:
                'A triangle has $a=7$, $b=10$, and $A=30^{\\circ}$. How many triangles satisfy these conditions?',
              options: ['None', 'Exactly one', 'Exactly two', 'Infinitely many'],
              correctOption: 2,
              hint: 'Compute $\\sin B$ and consider both angles with that sine value.',
              explanation:
                'The sine rule gives $\\sin B=\\frac{10\\sin 30^{\\circ}}{7}=\\frac{5}{7}\\approx 0.7143$. The two candidates are $B\\approx 45.58^{\\circ}$ and $B\\approx 134.42^{\\circ}$. Both leave a positive angle for $C$, so two triangles exist.',
              difficulty: 'hard',
            },
            {
              id: 'g10-sine-cosine-ex-4',
              type: 'numeric',
              prompt:
                'A triangle has sides 5 cm and 8 cm with an included angle of $120^{\\circ}$. Find the third side, rounded to two decimal places.',
              answer: 11.36,
              tolerance: 0.05,
              answerUnit: 'cm',
              hint: 'Use the cosine rule with $\\cos 120^{\\circ}=-\\frac{1}{2}$.',
              explanation:
                '$c^2=5^2+8^2-2(5)(8)\\cos 120^{\\circ}=25+64+40=129$, so $c=\\sqrt{129}\\approx 11.36$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g10-sine-cosine-ex-5',
              type: 'numeric',
              prompt:
                'Find the area of a triangle with sides 6 cm and 10 cm and an included angle of $30^{\\circ}$.',
              answer: 15,
              tolerance: 0.01,
              answerUnit: 'cm²',
              hint: 'Use $K=\\frac{1}{2}ab\\sin C$.',
              explanation:
                '$K=\\frac{1}{2}(6)(10)\\sin 30^{\\circ}=30\\cdot\\frac{1}{2}=15$ cm$^2$.',
              difficulty: 'medium',
            },
            {
              id: 'g10-sine-cosine-ex-6',
              type: 'multiple-choice',
              prompt:
                'A triangle has sides 3, 5, and 7. What is the angle opposite the side of length 7?',
              options: ['$60^{\\circ}$', '$90^{\\circ}$', '$120^{\\circ}$', '$150^{\\circ}$'],
              correctOption: 2,
              hint: 'Use the cosine rule for an angle.',
              explanation:
                '$\\cos C=\\frac{3^2+5^2-7^2}{2(3)(5)}=\\frac{9+25-49}{30}=-\\frac{1}{2}$, so $C=120^{\\circ}$.',
              difficulty: 'medium',
            },
          ],
          related: [
            'right-triangle-trigonometry',
            'circle-theorems',
            'trigonometric-identities-and-equations',
            'unit-circle-trigonometry',
          ],
          aliases: ['law of sines', 'law of cosines', 'ambiguous case', 'triangle area sine'],
        },
      ],
    },
    {
      id: 'statistics-probability',
      family: 'statistics-probability',
      title: 'Statistics & Probability',
      description: String.raw`Standard deviation and the choice between mean and median describe a data set precisely, while probability rules, counting methods, and expected value let you model chance and compare outcomes.`,
      topics: [
        {
          id: 'statistics-center-and-spread',
          title: String.raw`Centre and Spread: Mean, Median, and Standard Deviation`,
          subtitle: String.raw`Choose a measure of centre, quantify variability, and see how outliers change both.`,
          introduction: String.raw`A single number for the centre of a data set is incomplete without a number for its spread. The mean and the median locate the centre in different ways; the range, the interquartile range, and the standard deviation measure how far values lie from it. Outliers affect these measures unequally, which is why the choice of summary matters.`,
          prerequisites: ['averages', 'measures-of-spread', 'scatter-plots'],
          keyIdeas: [
            String.raw`The mean uses every value and is pulled towards outliers; the median is resistant.`,
            String.raw`The standard deviation measures typical distance from the mean, in the units of the data.`,
            String.raw`Population: divide by $N$. Sample: divide by $n-1$.`,
            String.raw`The range and standard deviation are sensitive to outliers; the IQR is resistant.`,
            String.raw`Skewed data are usually better summarized by the median and IQR.`,
          ],
          theory: [
            {
              title: String.raw`Mean versus median`,
              body: [
                String.raw`The mean $\bar{x}=\dfrac{\sum x}{n}$ is the balance point of the data. The median is the middle value of the ordered data. For a symmetric distribution the two are close. For a skewed distribution or one with outliers the mean is dragged towards the long tail, so the median is a more typical value.`,
                String.raw`Incomes and house prices are classic examples: a few very large values raise the mean well above what most people earn or pay.`,
              ],
              bullets: [
                String.raw`Symmetric, no outliers: the mean and standard deviation work well.`,
                String.raw`Skewed or with outliers: prefer the median and IQR.`,
              ],
            },
            {
              title: String.raw`Standard deviation`,
              body: [
                String.raw`Each deviation $x-\mu$ measures how far a value is from the mean. Deviations sum to zero, so we square them, average the squares, and take the square root to return to the original units. For a whole population of $N$ values, $\sigma=\sqrt{\dfrac{\sum(x-\mu)^2}{N}}$.`,
                String.raw`When the data are only a sample, the sample mean sits closer to the sample values than the true mean does, so the squared deviations are slightly too small. Dividing by $n-1$ instead of $n$ corrects this: $s=\sqrt{\dfrac{\sum(x-\bar{x})^2}{n-1}}$. For large $n$ the two results are nearly equal.`,
              ],
              bullets: [
                String.raw`$\sigma=0$ only when every value is identical.`,
                String.raw`Adding a constant to every value leaves the standard deviation unchanged; multiplying every value by $k$ multiplies it by $|k|$.`,
              ],
            },
            {
              title: String.raw`Effect of outliers`,
              body: [
                String.raw`A single extreme value can change the mean, range, and standard deviation dramatically. The median barely moves, and the IQR changes only if the outlier shifts the quartile positions. Always report the context of an outlier before deciding whether to keep it.`,
                String.raw`To compare two distributions, compare a centre and a spread together: the one with the smaller standard deviation is more consistent.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-stats-mean',
              title: String.raw`Mean`,
              expression: String.raw`\bar{x}=\frac{\sum x}{n}`,
              description: String.raw`The mean is the sum of all values divided by how many there are.`,
              spoken: String.raw`x bar equals the sum of x divided by n.`,
              variables: [
                { symbol: String.raw`\bar{x}`, name: 'mean', note: String.raw`written $\mu$ for a population` },
                { symbol: String.raw`\sum x`, name: 'sum of all values' },
                { symbol: 'n', name: 'number of values', note: 'positive integer' },
              ],
              conditions: [String.raw`$n\ge1$.`],
              notes: String.raw`Because it uses every value, the mean is sensitive to outliers.`,
              tags: ['mean', 'average', 'arithmetic mean', 'centre'],
            },
            {
              id: 'g10-stats-population-sd',
              title: String.raw`Population standard deviation`,
              expression: String.raw`\sigma=\sqrt{\frac{\sum (x-\mu)^2}{N}}`,
              description: String.raw`The typical distance of the values of an entire population from its mean $\mu$.`,
              spoken: String.raw`Sigma equals the square root of the sum of x minus mu, squared, divided by N.`,
              variables: [
                { symbol: String.raw`\sigma`, name: 'population standard deviation', unit: 'same units as the data' },
                { symbol: String.raw`\mu`, name: 'population mean' },
                { symbol: 'N', name: 'number of values in the population' },
              ],
              conditions: [String.raw`Use only when the data are the whole population.`, String.raw`$\sigma\ge0$.`],
              notes: String.raw`The square of $\sigma$ is the variance.`,
              tags: ['standard deviation', 'population standard deviation', 'sigma', 'spread'],
            },
            {
              id: 'g10-stats-sample-sd',
              title: String.raw`Sample standard deviation`,
              expression: String.raw`s=\sqrt{\frac{\sum (x-\bar{x})^2}{n-1}}`,
              description: String.raw`The estimate of spread from a sample, using $n-1$ in the denominator.`,
              spoken: String.raw`s equals the square root of the sum of x minus x bar, squared, divided by n minus 1.`,
              variables: [
                { symbol: 's', name: 'sample standard deviation', unit: 'same units as the data' },
                { symbol: String.raw`\bar{x}`, name: 'sample mean' },
                { symbol: 'n', name: 'sample size' },
              ],
              conditions: [String.raw`$n\ge2$, so that $n-1>0$.`],
              notes: String.raw`The $n-1$ denominator is called Bessel's correction.`,
              tags: ['sample standard deviation', 'n minus 1', 'bessel correction', 'spread'],
            },
          ],
          examples: [
            {
              title: String.raw`Population and sample standard deviation`,
              problem: String.raw`Find the mean and the standard deviation of $4,6,8,10,12$ (a) as a whole population and (b) as a sample.`,
              given: [String.raw`Data: $4,6,8,10,12$; $n=N=5$.`],
              steps: [
                {
                  text: String.raw`Find the mean.`,
                  math: String.raw`\bar{x}=\frac{4+6+8+10+12}{5}=\frac{40}{5}=8`,
                },
                {
                  text: String.raw`Find the deviations and square them.`,
                  math: String.raw`(-4)^2,(-2)^2,0^2,2^2,4^2=16,4,0,4,16`,
                },
                {
                  text: String.raw`Sum the squares.`,
                  math: String.raw`\sum(x-\bar{x})^2=16+4+0+4+16=40`,
                },
                {
                  text: String.raw`Population: divide by $N=5$ and take the square root.`,
                  math: String.raw`\sigma=\sqrt{\frac{40}{5}}=\sqrt{8}\approx2.83`,
                },
                {
                  text: String.raw`Sample: divide by $n-1=4$ and take the square root.`,
                  math: String.raw`s=\sqrt{\frac{40}{4}}=\sqrt{10}\approx3.16`,
                },
              ],
              answer: String.raw`Mean $=8$; population $\sigma=\sqrt{8}\approx2.83$; sample $s=\sqrt{10}\approx3.16$.`,
            },
            {
              title: String.raw`How an outlier changes the summary`,
              problem: String.raw`The data set $5,6,7,8,9$ becomes $5,6,7,8,39$ when the last value is entered wrongly. Compare the mean, median, range, and population standard deviation before and after.`,
              given: [String.raw`Original: $5,6,7,8,9$. Changed: $5,6,7,8,39$.`],
              steps: [
                {
                  text: String.raw`Original data: the mean and median are both $7$; the range is $9-5=4$.`,
                  math: String.raw`\sigma=\sqrt{\frac{4+1+0+1+4}{5}}=\sqrt{2}\approx1.41`,
                },
                {
                  text: String.raw`Changed data: the sum is $65$, so the mean is $13$. The median is still the middle value, $7$. The range is $39-5=34$.`,
                  math: String.raw`\bar{x}=\frac{5+6+7+8+39}{5}=\frac{65}{5}=13`,
                },
                {
                  text: String.raw`Changed deviations from $13$: $-8,-7,-6,-5,26$.`,
                  math: String.raw`\sum(x-\mu)^2=64+49+36+25+676=850`,
                },
                {
                  text: String.raw`Divide by $N=5$ and take the square root.`,
                  math: String.raw`\sigma=\sqrt{\frac{850}{5}}=\sqrt{170}\approx13.04`,
                },
              ],
              answer: String.raw`The mean rises from $7$ to $13$, the range from $4$ to $34$, and $\sigma$ from about $1.41$ to $13.04$, while the median stays at $7$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Forgetting to take the square root, and reporting the variance as the standard deviation.`,
              correction: String.raw`The standard deviation is the square root of the average squared deviation. The variance is in squared units.`,
            },
            {
              mistake: String.raw`Using $n$ instead of $n-1$ for sample data (or the reverse for a full population).`,
              correction: String.raw`Check whether the data are the whole population or a sample, and choose $N$ or $n-1$ accordingly.`,
            },
            {
              mistake: String.raw`Always using the mean to describe skewed data.`,
              correction: String.raw`Skewed distributions and outliers distort the mean. Report the median with the IQR instead.`,
            },
          ],
          exercises: [
            {
              id: 'g10-stats-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`A data set of house prices has a few extremely expensive houses. Which centre best represents a typical price?`,
              options: ['Mean', 'Median', 'Range', 'Maximum'],
              correctOption: 1,
              hint: String.raw`Which measure is resistant to extreme values?`,
              explanation: String.raw`The extreme values pull the mean upward. The median is unaffected by how large the largest values are.`,
              difficulty: 'easy',
            },
            {
              id: 'g10-stats-ex-2',
              type: 'numeric',
              prompt: String.raw`Find the mean of $12,15,18,20,35$.`,
              answer: 20,
              tolerance: 0.001,
              hint: String.raw`Add the values and divide by 5.`,
              explanation: String.raw`$\bar{x}=\frac{12+15+18+20+35}{5}=\frac{100}{5}=20$.`,
              difficulty: 'easy',
            },
            {
              id: 'g10-stats-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the population standard deviation of $2,4,4,4,5,5,7,9$.`,
              answer: 2,
              tolerance: 0.001,
              hint: String.raw`The mean is $5$. Square the deviations and divide by $N=8$.`,
              explanation: String.raw`Squared deviations: $9,1,1,1,0,0,4,16$, which sum to $32$. Then $\sigma=\sqrt{32/8}=\sqrt{4}=2$.`,
              difficulty: 'medium',
            },
            {
              id: 'g10-stats-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`Why does the sample standard deviation divide by $n-1$ rather than $n$?`,
              options: [
                String.raw`Deviations from the sample mean are slightly too small, and $n-1$ corrects this`,
                String.raw`It makes the answer an integer`,
                String.raw`One value is always discarded`,
                String.raw`It makes the standard deviation equal to the variance`,
              ],
              correctOption: 0,
              hint: String.raw`Think about how close the sample mean is to the sample values.`,
              explanation: String.raw`Values lie closer to their own sample mean than to the true mean, so dividing by $n$ would tend to underestimate the spread. Dividing by $n-1$ compensates.`,
              difficulty: 'hard',
            },
            {
              id: 'g10-stats-ex-5',
              type: 'numeric',
              prompt: String.raw`The value $1000$ is added to the data set $10,12,14,16,18$. What is the median of the new six-value data set?`,
              answer: 15,
              tolerance: 0.001,
              hint: String.raw`With six values the median is the average of the 3rd and 4th.`,
              explanation: String.raw`The ordered data are $10,12,14,16,18,1000$. The median is $\frac{14+16}{2}=15$. (The original median was $14$, while the mean jumps from $14$ to about $178.3$.)`,
              difficulty: 'medium',
            },
          ],
          related: ['measures-of-spread', 'averages', 'scatter-plots', 'statistics-variance-and-distributions'],
          aliases: ['standard deviation', 'mean vs median', 'effect of outliers', 'variance', 'sigma'],
        },
        {
          id: 'probability-rules-and-counting',
          title: String.raw`Probability Rules, Counting, and Expected Value`,
          subtitle: String.raw`Combine events, count outcomes with permutations and combinations, and weigh outcomes by their chance.`,
          introduction: String.raw`Probability problems often involve events that combine, or outcomes too numerous to list. The addition and multiplication rules handle "or" and "and"; the fundamental counting principle, permutations, and combinations count outcomes without listing them; and the expected value gives the long-run average of a random outcome.`,
          prerequisites: ['probability-compound-events', 'probability-compound-and-two-way', 'exponents-and-powers'],
          keyIdeas: [
            String.raw`"Or" uses addition and subtracts the overlap; "and" uses multiplication.`,
            String.raw`For dependent events, the second probability is adjusted for what has already happened.`,
            String.raw`The fundamental counting principle multiplies the options at each stage.`,
            String.raw`Use permutations when order matters and combinations when it does not.`,
            String.raw`Expected value $=\sum x\,P(x)$ is a long-run average, not a guaranteed result.`,
          ],
          theory: [
            {
              title: String.raw`Addition and multiplication rules`,
              body: [
                String.raw`For "or": $P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)$. For mutually exclusive events the last term is $0$. For "and": $P(A\text{ and }B)=P(A)\times P(B\text{ after }A\text{ has occurred})$. If the events are independent, the second factor is simply $P(B)$.`,
                String.raw`Drawing cards without replacement is the standard dependent case: after one heart is removed from a deck of $52$, only $12$ hearts remain among $51$ cards.`,
              ],
            },
            {
              title: String.raw`Counting outcomes`,
              body: [
                String.raw`Fundamental counting principle: if one choice can be made in $n_1$ ways and a second in $n_2$ ways, and so on, the whole sequence of choices can be made in $n_1\times n_2\times\cdots\times n_k$ ways.`,
                String.raw`A permutation is an ordered arrangement of $r$ items chosen from $n$ distinct items: $\,{}^nP_r=\dfrac{n!}{(n-r)!}$. A combination is an unordered selection: $\,{}^nC_r=\dfrac{n!}{r!\,(n-r)!}$. Because each selection of $r$ items can be ordered in $r!$ ways, $\,{}^nP_r=r!\,{}^nC_r$.`,
              ],
              bullets: [
                String.raw`Podium positions, passwords, and seat orders: order matters, so use permutations.`,
                String.raw`Committees, hands of cards, and team picks: order does not matter, so use combinations.`,
                String.raw`$n!=n(n-1)\cdots2\cdot1$ and $0!=1$.`,
              ],
            },
            {
              title: String.raw`Expected value`,
              body: [
                String.raw`If a random outcome takes values $x_1,\dots,x_k$ with probabilities $p_1,\dots,p_k$, then $E(X)=\sum x_ip_i$, where the probabilities add to $1$. It is the long-run average per trial.`,
                String.raw`A game is fair when its expected net gain is $0$. A negative expected net gain means the player loses on average.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g10-prob-rules',
              title: String.raw`Addition and multiplication rules`,
              expression: String.raw`P(A\cup B)=P(A)+P(B)-P(A\cap B),\qquad P(A\cap B)=P(A)\,P(B\mid A)`,
              description: String.raw`The probability of "$A$ or $B$" subtracts the overlap; the probability of "$A$ and $B$" multiplies by the chance of $B$ once $A$ has occurred.`,
              spoken: String.raw`P of A or B equals P of A plus P of B minus P of A and B. P of A and B equals P of A times P of B given A.`,
              variables: [
                { symbol: String.raw`P(A\cup B)`, name: String.raw`probability of $A$ or $B$ (or both)` },
                { symbol: String.raw`P(A\cap B)`, name: String.raw`probability of both $A$ and $B$` },
                { symbol: String.raw`P(B\mid A)`, name: String.raw`probability of $B$ given $A$ has occurred`, note: 'equals P(B) if independent' },
              ],
              conditions: [String.raw`All probabilities lie in $[0,1]$.`, String.raw`If $A$ and $B$ are mutually exclusive, $P(A\cap B)=0$.`],
              notes: String.raw`Independent events: $P(A\cap B)=P(A)\,P(B)$.`,
              tags: ['addition rule', 'multiplication rule', 'dependent events', 'without replacement'],
            },
            {
              id: 'g10-counting-principle',
              title: String.raw`Fundamental counting principle`,
              expression: String.raw`N=n_1\times n_2\times\cdots\times n_k`,
              description: String.raw`The number of ways to make a sequence of $k$ independent choices is the product of the number of options at each stage.`,
              spoken: String.raw`N equals n one times n two and so on up to n k.`,
              variables: [
                { symbol: 'N', name: 'total number of outcomes' },
                { symbol: String.raw`n_i`, name: String.raw`number of options for choice $i$` },
              ],
              conditions: [String.raw`Each $n_i$ is a non-negative integer, and the number of options at one stage does not depend on the others (or the dependence is built into $n_i$).`],
              notes: String.raw`Multiplication is used because every option at one stage pairs with every option at the next.`,
              tags: ['counting principle', 'multiplication principle', 'tree diagram', 'outcomes'],
            },
            {
              id: 'g10-permutations-combinations',
              title: String.raw`Permutations and combinations`,
              expression: String.raw`{}^nP_r=\frac{n!}{(n-r)!},\qquad {}^nC_r=\frac{n!}{r!\,(n-r)!}`,
              description: String.raw`$\,{}^nP_r$ counts ordered arrangements of $r$ items from $n$; $\,{}^nC_r$ counts unordered selections.`,
              spoken: String.raw`n P r equals n factorial over n minus r factorial. n C r equals n factorial over r factorial times n minus r factorial.`,
              variables: [
                { symbol: 'n', name: 'number of distinct items available' },
                { symbol: 'r', name: 'number of items chosen' },
                { symbol: 'n!', name: 'n factorial', note: String.raw`$n(n-1)\cdots1$, with $0!=1$` },
              ],
              conditions: [String.raw`$0\le r\le n$, with $n$ and $r$ integers.`, String.raw`Items are distinct and used at most once.`],
              notes: String.raw`$\,{}^nC_r={}^nC_{n-r}$ and $\,{}^nP_r=r!\,{}^nC_r$.`,
              tags: ['permutation', 'combination', 'nPr', 'nCr', 'factorial', 'choose'],
            },
            {
              id: 'g10-expected-value',
              title: String.raw`Expected value`,
              expression: String.raw`E(X)=\sum x_i\,p_i`,
              description: String.raw`The expected value is the sum of each possible value multiplied by its probability.`,
              spoken: String.raw`E of X equals the sum of x i times p i.`,
              variables: [
                { symbol: 'x_i', name: 'possible values of the outcome', note: 'a net gain can be negative' },
                { symbol: 'p_i', name: String.raw`probability of $x_i$`, note: 'each between 0 and 1' },
              ],
              conditions: [String.raw`The probabilities $p_i$ are in $[0,1]$ and sum to $1$.`],
              notes: String.raw`For net gain, subtract the cost to play from each prize.`,
              tags: ['expected value', 'expectation', 'fair game', 'long-run average'],
            },
          ],
          examples: [
            {
              title: String.raw`"Or" and "and" with a deck of cards`,
              problem: String.raw`One card is drawn from a standard 52-card deck. (a) Find $P(\text{heart or king})$. (b) Two cards are drawn without replacement; find the probability that both are hearts.`,
              given: [String.raw`$13$ hearts, $4$ kings, and one king of hearts in the deck of $52$.`],
              steps: [
                {
                  text: String.raw`Part (a): the king of hearts is in both events, so it must be subtracted once.`,
                  math: String.raw`P(\text{heart or king})=\frac{13}{52}+\frac{4}{52}-\frac{1}{52}`,
                },
                {
                  text: String.raw`Simplify: $13+4-1=16$ favourable cards.`,
                  math: String.raw`\frac{16}{52}=\frac{4}{13}\approx0.31`,
                },
                {
                  text: String.raw`Part (b): the first card is a heart with probability $\frac{13}{52}$. After one heart is removed, $12$ hearts remain among $51$ cards.`,
                  math: String.raw`P(\text{both hearts})=\frac{13}{52}\times\frac{12}{51}`,
                },
                {
                  text: String.raw`Multiply and simplify: $\frac{156}{2652}=\frac{1}{17}$.`,
                  math: String.raw`\frac{1}{17}\approx0.06`,
                },
              ],
              answer: String.raw`(a) $\frac{4}{13}\approx0.31$; (b) $\frac{1}{17}\approx0.06$.`,
            },
            {
              title: String.raw`Permutations versus combinations`,
              problem: String.raw`Eight runners enter a race. (a) In how many ways can gold, silver, and bronze medals be awarded? (b) In how many ways can a team of 3 be chosen from the eight?`,
              given: [String.raw`$n=8$ distinct runners and $r=3$ chosen.`, String.raw`Medals are distinct, so order matters in (a); a team is unordered, so order does not matter in (b).`],
              steps: [
                {
                  text: String.raw`Part (a): ordered, so use $\,{}^8P_3$.`,
                  math: String.raw`{}^8P_3=\frac{8!}{5!}=8\times7\times6=336`,
                },
                {
                  text: String.raw`Part (b): unordered, so use $\,{}^8C_3$.`,
                  math: String.raw`{}^8C_3=\frac{8!}{3!\,5!}=\frac{8\times7\times6}{3\times2\times1}=\frac{336}{6}=56`,
                },
                {
                  text: String.raw`Check: each team of 3 can be ordered in $3!=6$ ways, and $56\times6=336$.`,
                },
              ],
              answer: String.raw`(a) $336$ ways to award the medals; (b) $56$ different teams.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Using the same probability for the second draw when cards are not replaced.`,
              correction: String.raw`Without replacement, both the favourable count and the total decrease. After one heart is drawn, the next is $\frac{12}{51}$.`,
            },
            {
              mistake: String.raw`Using a permutation when order does not matter (or a combination when it does).`,
              correction: String.raw`Ask whether swapping two chosen items gives a different outcome. If yes, use $\,{}^nP_r$; if no, use $\,{}^nC_r$.`,
            },
            {
              mistake: String.raw`Adding the probabilities for "and" or multiplying for "or".`,
              correction: String.raw`"Or" suggests adding (minus overlap); "and" suggests multiplying (for the second event, given the first).`,
            },
          ],
          exercises: [
            {
              id: 'g10-counting-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`An outfit consists of 1 of 4 shirts, 1 of 3 pairs of trousers, and 1 of 2 pairs of shoes. How many outfits are possible?`,
              options: ['$9$', '$24$', '$12$', '$18$'],
              correctOption: 1,
              hint: String.raw`Multiply the number of options at each stage.`,
              explanation: String.raw`$4\times3\times2=24$.`,
              difficulty: 'easy',
            },
            {
              id: 'g10-counting-ex-2',
              type: 'numeric',
              prompt: String.raw`How many ways can a president and a secretary be chosen from 6 people (one person per role)? Find $\,{}^6P_2$.`,
              answer: 30,
              tolerance: 0.001,
              hint: String.raw`$\,{}^6P_2=6\times5$.`,
              explanation: String.raw`$\,{}^6P_2=\frac{6!}{4!}=6\times5=30$.`,
              difficulty: 'easy',
            },
            {
              id: 'g10-counting-ex-3',
              type: 'numeric',
              prompt: String.raw`How many different committees of 3 can be chosen from 7 people? Find $\,{}^7C_3$.`,
              answer: 35,
              tolerance: 0.001,
              hint: String.raw`$\,{}^7C_3=\frac{7\times6\times5}{3!}$.`,
              explanation: String.raw`$\,{}^7C_3=\frac{7\times6\times5}{3\times2\times1}=\frac{210}{6}=35$.`,
              difficulty: 'medium',
            },
            {
              id: 'g10-counting-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`A fair six-sided die is rolled. What is the probability of an even number or a number greater than 4?`,
              options: [String.raw`$\frac{2}{3}$`, String.raw`$\frac{5}{6}$`, String.raw`$\frac{1}{2}$`, String.raw`$\frac{1}{3}$`],
              correctOption: 0,
              hint: String.raw`The outcome $6$ belongs to both events.`,
              explanation: String.raw`Even: $\{2,4,6\}$; greater than 4: $\{5,6\}$. The union is $\{2,4,5,6\}$, so the probability is $\frac{4}{6}=\frac{2}{3}$. Equivalently, $\frac{3}{6}+\frac{2}{6}-\frac{1}{6}=\frac{4}{6}$.`,
              difficulty: 'medium',
            },
            {
              id: 'g10-counting-ex-5',
              type: 'numeric',
              prompt: String.raw`A game costs $\$2$ to play. You win $\$20$ with probability $0.05$, win $\$5$ with probability $0.15$, and win $\$0$ otherwise. What is the expected net gain per play, in dollars?`,
              answer: -0.25,
              tolerance: 0.001,
              answerUnit: 'dollars',
              hint: String.raw`Find the expected prize first, then subtract the cost of $\$2$.`,
              explanation: String.raw`Expected prize: $20(0.05)+5(0.15)+0(0.80)=1+0.75=1.75$. Net: $1.75-2=-0.25$, so you lose $\$0.25$ per play on average.`,
              difficulty: 'hard',
            },
          ],
          related: ['probability-compound-events', 'probability-compound-and-two-way', 'conditional-probability', 'permutations-and-combinations'],
          aliases: ['addition rule', 'multiplication rule', 'counting principle', 'permutations and combinations', 'expected value', 'nPr nCr'],
        },
      ],
    },
  ],
}
