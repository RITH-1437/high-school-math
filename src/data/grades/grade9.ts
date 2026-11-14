import type { Grade } from '../../types/content'

export const grade9: Grade = {
  id: '9',
  number: 9,
  title: 'Grade 9',
  tagline: 'Formal foundations: structure, similarity, and coordinate reasoning.',
  description:
    'Grade 9 turns earlier arithmetic and informal geometry into formal methods. Students simplify radical expressions, factor polynomials, solve factorable quadratic equations and linear systems, and read functions. Geometry moves to similarity, circle relationships, and the measurement of curved solids, while coordinate and statistical methods begin to connect algebra to data.',
  focus: [
    'Algebraic structure: radicals, factoring, and systems',
    'Similarity, circle relationships, and solid measurement',
    'Coordinate methods for distance, midpoint, and slope',
    'Bivariate data and probability from two-way tables',
  ],
  subjects: [
    {
      id: 'algebra',
      family: 'algebra',
      title: 'Algebra',
      description:
        'Radicals, factoring, quadratic equations, linear systems, and the language of functions form the algebraic core of Grade 9.',
      topics: [
        {
          id: 'radical-expressions',
          title: 'Radical Expressions',
          subtitle: 'Simplify, combine, and rationalize square roots.',
          introduction:
            'A radical expression contains a square root, such as $\\sqrt{72}$ or $\\sqrt{x^2y}$. Grade 8 introduced perfect squares and the basic root laws. In Grade 9 we use those laws in reverse: pull perfect-square factors out of a radicand, combine radicals that share the same radicand, and rewrite fractions so that no square root remains in the denominator. Throughout this topic, variable radicands are assumed to be non-negative unless stated otherwise.',
          prerequisites: ['square-and-cube-roots', 'real-numbers', 'exponents-and-powers'],
          keyIdeas: [
            'The product property lets us split a root: $\\sqrt{ab}=\\sqrt a\\sqrt b$ when $a,b\\ge 0$.',
            'A square root is simplified when the radicand has no perfect-square factor other than 1 and no denominator remains.',
            'Only like radicals — same index and same radicand — can be added or subtracted.',
            'Rationalize a denominator by multiplying by a form of 1, often a conjugate.',
          ],
          theory: [
            {
              title: 'The product and quotient properties',
              body: [
                'Square roots behave well under multiplication and division because squaring undoes the root. For non-negative $a$ and $b$, $\\sqrt{ab}$ is the non-negative number whose square is $ab$. Since $(\\sqrt a\\sqrt b)^2=ab$, the two expressions are equal whenever both roots are real.',
                'The quotient property follows the same idea. A denominator inside a square root can be split into a denominator outside the root, provided it is not zero.',
              ],
              bullets: [
                'Product property: $\\sqrt{ab}=\\sqrt a\\,\\sqrt b$ for $a\\ge 0$ and $b\\ge 0$.',
                'Quotient property: $\\sqrt{\\frac ab}=\\frac{\\sqrt a}{\\sqrt b}$ for $a\\ge 0$ and $b>0$.',
                'These properties do not distribute over addition: $\\sqrt{a+b}\\ne\\sqrt a+\\sqrt b$ in general.',
              ],
            },
            {
              title: 'Simplifying a square root',
              body: [
                'To simplify $\\sqrt n$, find the largest perfect square that divides $n$. Write $n=s^2\\cdot b$, then $\\sqrt n=\\sqrt{s^2}\\sqrt b=s\\sqrt b$. For example, $\\sqrt{72}=\\sqrt{36\\cdot2}=6\\sqrt2$.',
                'The remaining radicand must have no perfect-square factor other than 1. Using a smaller square is not wrong, but it leaves more work: $\\sqrt{180}=\\sqrt{4\\cdot45}=2\\sqrt{45}$, and since $45=9\\cdot5$, the fully simplified form is $6\\sqrt5$.',
                'With variables, assume non-negative values: $\\sqrt{x^6}=x^3$ because $(x^3)^2=x^6$. In general, $\\sqrt{x^{2k}}=x^k$ for $x\\ge 0$.',
              ],
            },
            {
              title: 'Adding, multiplying, and rationalizing',
              body: [
                'Radicals combine like algebraic terms. $3\\sqrt2+5\\sqrt2=8\\sqrt2$, but $3\\sqrt2+5\\sqrt3$ cannot be combined because the radicands differ. Simplify each radical first; sometimes apparently different radicals become alike.',
                'Multiply radicals using distribution. For instance, $\\sqrt3(\\sqrt6+2)=\\sqrt{18}+2\\sqrt3=3\\sqrt2+2\\sqrt3$.',
                'To rationalize a single-term denominator $\\frac{1}{\\sqrt a}$, multiply numerator and denominator by $\\frac{\\sqrt a}{\\sqrt a}$. For a binomial denominator such as $3-\\sqrt3$, multiply by the conjugate $3+\\sqrt3$; the cross terms cancel and the denominator becomes rational.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-radicals-product',
              title: 'Product property of square roots',
              expression: '\\sqrt{ab}=\\sqrt{a}\\,\\sqrt{b}',
              description:
                'The square root of a product equals the product of the square roots, provided both radicands are non-negative.',
              spoken: 'The square root of a times b equals the square root of a times the square root of b.',
              variables: [
                { symbol: 'a', name: 'first non-negative radicand', note: 'must be at least zero' },
                { symbol: 'b', name: 'second non-negative radicand', note: 'must be at least zero' },
              ],
              conditions: ['$a\\ge 0$ and $b\\ge 0$ so that both square roots are real.'],
              notes:
                'Use the property in reverse to extract perfect-square factors: $\\sqrt{50}=\\sqrt{25\\cdot2}=5\\sqrt2$.',
              tags: ['product property', 'multiplying radicals', 'square root of a product'],
            },
            {
              id: 'g9-radicals-quotient',
              title: 'Quotient property of square roots',
              expression: '\\sqrt{\\frac{a}{b}}=\\frac{\\sqrt{a}}{\\sqrt{b}}',
              description:
                'The square root of a quotient equals the quotient of the square roots when the denominator is positive.',
              spoken: 'The square root of a over b equals the square root of a divided by the square root of b.',
              variables: [
                { symbol: 'a', name: 'numerator radicand', note: 'must be at least zero' },
                { symbol: 'b', name: 'denominator radicand', note: 'must be greater than zero' },
              ],
              conditions: ['$a\\ge 0$ and $b>0$; division by zero is undefined.'],
              notes: 'This property is the reason a fraction under a root can be rewritten with the root in the denominator.',
              tags: ['quotient property', 'radical fraction', 'dividing radicals'],
            },
            {
              id: 'g9-radicals-simplify',
              title: 'Extracting a perfect-square factor',
              expression: '\\sqrt{a^2b}=a\\sqrt{b}',
              description:
                'A perfect-square factor can be removed from a square root and written in front as its square root.',
              spoken: 'The square root of a squared times b equals a times the square root of b.',
              variables: [
                { symbol: 'a', name: 'non-negative square-root factor', note: 'a squared is the extracted perfect square' },
                { symbol: 'b', name: 'remaining radicand', note: 'must be non-negative' },
              ],
              conditions: ['$a\\ge 0$ and $b\\ge 0$.'],
              notes:
                'For variables, extract even powers: $\\sqrt{x^4y^3}=x^2y\\sqrt y$ when $x\\ge 0$ and $y\\ge 0$.',
              tags: ['simplifying radicals', 'perfect square factor', 'extract square factor'],
            },
            {
              id: 'g9-radicals-rationalize',
              title: 'Rationalizing a single-term denominator',
              expression: '\\frac{1}{\\sqrt{a}}=\\frac{\\sqrt{a}}{a}',
              description:
                'Multiplying numerator and denominator by the square root removes the radical from the denominator.',
              spoken: 'One over the square root of a equals the square root of a divided by a.',
              variables: [{ symbol: 'a', name: 'positive radicand', note: 'must be greater than zero' }],
              conditions: ['$a>0$ so that the denominator is defined and nonzero.'],
              notes:
                'For a binomial denominator, multiply by its conjugate. For example, multiply $3-\\sqrt3$ by $3+\\sqrt3$.',
              tags: ['rationalize denominator', 'conjugate', 'radical denominator'],
            },
          ],
          examples: [
            {
              title: 'Simplify a sum of radicals',
              problem: 'Simplify $\\sqrt{72}+\\sqrt{50}-\\sqrt{18}$.',
              given: ['The radicands are $72$, $50$, and $18$.', 'All radicands are positive, so every square root is real.'],
              steps: [
                {
                  text: 'Formula. Use the product property in reverse, $\\sqrt{a^2b}=a\\sqrt b$, after finding the largest square factor in each radicand.',
                  math: '72=36\\cdot 2,\\qquad 50=25\\cdot 2,\\qquad 18=9\\cdot 2',
                },
                {
                  text: 'Substitute each factorization under its root.',
                  math: '\\sqrt{72}+\\sqrt{50}-\\sqrt{18}=\\sqrt{36\\cdot 2}+\\sqrt{25\\cdot 2}-\\sqrt{9\\cdot 2}',
                },
                {
                  text: 'Apply $\\sqrt{a^2b}=a\\sqrt b$ to each term.',
                  math: '=6\\sqrt2+5\\sqrt2-3\\sqrt2',
                },
                {
                  text: 'Calculate. The radicals are alike, so add and subtract the coefficients.',
                  math: '=(6+5-3)\\sqrt2=8\\sqrt2',
                },
                {
                  text: 'Check numerically. $8\\sqrt2\\approx 11.31$, while $\\sqrt{72}+\\sqrt{50}-\\sqrt{18}\\approx 8.49+7.07-4.24=11.32$, which agrees after rounding.',
                },
              ],
              answer: '$8\\sqrt2\\approx 11.31$. The expression is a number, so it has no units.',
            },
            {
              title: 'Rationalize a binomial denominator',
              problem: 'Simplify $\\frac{6}{3-\\sqrt3}$ and give a decimal approximation.',
              given: ['The numerator is $6$ and the denominator is $3-\\sqrt3$.', 'The denominator is positive because $\\sqrt3\\approx 1.732$, so the fraction is defined.'],
              steps: [
                {
                  text: 'Formula. Multiply numerator and denominator by the conjugate $3+\\sqrt3$, which is a form of 1.',
                  math: '\\frac{6}{3-\\sqrt3}\\cdot\\frac{3+\\sqrt3}{3+\\sqrt3}',
                },
                {
                  text: 'Substitute and expand the denominator using $(a-b)(a+b)=a^2-b^2$.',
                  math: '=\\frac{6(3+\\sqrt3)}{3^2-(\\sqrt3)^2}',
                },
                {
                  text: 'Calculate the denominator and distribute in the numerator.',
                  math: '=\\frac{18+6\\sqrt3}{9-3}=\\frac{18+6\\sqrt3}{6}',
                },
                {
                  text: 'Divide each term by 6.',
                  math: '=3+\\sqrt3',
                },
                {
                  text: 'Approximate using $\\sqrt3\\approx 1.73205$.',
                  math: '3+\\sqrt3\\approx 4.73',
                },
              ],
              answer: '$3+\\sqrt3\\approx 4.73$. The expression has no units.',
            },
          ],
          mistakes: [
            {
              mistake: 'Writing $\\sqrt{a+b}=\\sqrt a+\\sqrt b$.',
              correction:
                'Test with $a=9$ and $b=16$: $\\sqrt{25}=5$, but $\\sqrt9+\\sqrt{16}=7$. The product property does not apply to sums.',
            },
            {
              mistake: 'Adding $\\sqrt2+\\sqrt3$ and writing $\\sqrt5$.',
              correction:
                'Radicals must have the same radicand to combine. $\\sqrt2+\\sqrt3$ is already simplified; only like radicals such as $4\\sqrt2+\\sqrt2$ add to $5\\sqrt2$.',
            },
            {
              mistake: 'Rationalizing a denominator by multiplying only the numerator, or by multiplying by the denominator instead of its conjugate.',
              correction:
                'Multiply both numerator and denominator by the same nonzero factor so the value is unchanged. For a binomial, that factor is the conjugate.',
            },
          ],
          exercises: [
            {
              id: 'g9-radicals-ex-1',
              type: 'multiple-choice',
              prompt: 'Simplify $\\sqrt{98}$.',
              options: ['$7\\sqrt2$', '$2\\sqrt7$', '$14$', '$49\\sqrt2$'],
              correctOption: 0,
              hint: 'Find the largest perfect square that divides 98.',
              explanation: '$98=49\\cdot2$, so $\\sqrt{98}=\\sqrt{49}\\,\\sqrt2=7\\sqrt2$. The other options either use a non-square factor or forget the square root.',
              difficulty: 'easy',
            },
            {
              id: 'g9-radicals-ex-2',
              type: 'multiple-choice',
              prompt: 'Simplify $\\sqrt{50}+\\sqrt{18}$.',
              options: ['$8\\sqrt2$', '$68$', '$2\\sqrt{17}$', '$8\\sqrt4$'],
              correctOption: 0,
              hint: 'Simplify each radical separately before adding.',
              explanation:
                '$\\sqrt{50}=5\\sqrt2$ and $\\sqrt{18}=3\\sqrt2$. Since the radicals are alike, $5\\sqrt2+3\\sqrt2=8\\sqrt2$. Adding the radicands would give $\\sqrt{68}$, which is not equivalent.',
              difficulty: 'medium',
            },
            {
              id: 'g9-radicals-ex-3',
              type: 'numeric',
              prompt: 'When $\\sqrt{180}$ is written in the form $a\\sqrt5$, what is the value of $a$?',
              answer: 6,
              tolerance: 0.001,
              hint: 'Look for the largest perfect square factor of 180.',
              explanation: '$180=36\\cdot5$, so $\\sqrt{180}=\\sqrt{36}\\,\\sqrt5=6\\sqrt5$. Therefore $a=6$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-radicals-ex-4',
              type: 'multiple-choice',
              prompt: 'Rationalize the denominator: $\\frac{5}{\\sqrt5}$.',
              options: ['$\\sqrt5$', '$5$', '$5\\sqrt5$', '$\\sqrt{10}$'],
              correctOption: 0,
              hint: 'Multiply numerator and denominator by $\\sqrt5$.',
              explanation:
                '$\\frac{5}{\\sqrt5}\\cdot\\frac{\\sqrt5}{\\sqrt5}=\\frac{5\\sqrt5}{5}=\\sqrt5$. The factor $\\frac{\\sqrt5}{\\sqrt5}$ equals 1, so the value is unchanged.',
              difficulty: 'easy',
            },
            {
              id: 'g9-radicals-ex-5',
              type: 'numeric',
              prompt: 'Evaluate $(\\sqrt3+2)(\\sqrt3-2)$.',
              answer: -1,
              tolerance: 0.001,
              hint: 'Use the difference-of-squares pattern $(a+b)(a-b)=a^2-b^2$.',
              explanation: 'With $a=\\sqrt3$ and $b=2$, the product is $(\\sqrt3)^2-2^2=3-4=-1$.',
              difficulty: 'hard',
            },
            {
              id: 'g9-radicals-ex-6',
              type: 'multiple-choice',
              prompt: 'For $x\\ge 0$, simplify $\\sqrt{x^8}$.',
              options: ['$x^4$', '$x^2$', '$x^8$', '$x^6$'],
              correctOption: 0,
              hint: 'A square root halves an even exponent.',
              explanation:
                '$\\sqrt{x^8}=\\sqrt{(x^4)^2}=x^4$ because $x\\ge0$. In general, $\\sqrt{x^{2k}}=x^k$ for non-negative $x$.',
              difficulty: 'easy',
            },
          ],
          related: ['quadratic-equations-intro', 'square-and-cube-roots', 'pythagorean-theorem'],
          aliases: ['surds', 'simplifying radicals', 'radical simplification', 'square roots'],
        },
        {
          id: 'polynomial-factorization',
          title: 'Polynomial Factorization',
          subtitle: 'Turn sums into products using common factors and special patterns.',
          introduction:
            'Factoring rewrites a sum or difference as a product. It is the reverse of expanding, and it is the tool that turns a quadratic equation into two simpler linear equations. Grade 9 extends common-factor work to trinomials, grouping, and the special patterns $(a-b)(a+b)$ and $(a\\pm b)^2$. A factorization is not finished until every factor is prime over the integers and expanding returns the original polynomial.',
          prerequisites: ['polynomials-intro', 'factorization-common-factors', 'exponents-and-powers'],
          keyIdeas: [
            'Remove the greatest common factor first; it makes every later step easier.',
            'Difference of squares: $a^2-b^2=(a-b)(a+b)$.',
            'Perfect-square trinomials: $a^2\\pm2ab+b^2=(a\\pm b)^2$.',
            'For $x^2+bx+c$, find $p$ and $q$ with $p+q=b$ and $pq=c$.',
            'Always check a factorization by expanding it.',
          ],
          theory: [
            {
              title: 'Common factors and grouping',
              body: [
                'When every term shares a factor, pull it out using the distributive property in reverse: $ab+ac=a(b+c)$. The greatest common factor includes the largest numerical factor and the smallest power of each shared variable. For example, $6x^3+9x^2=3x^2(2x+3)$.',
                'Four-term polynomials can sometimes be factored by grouping. Group the terms in pairs, factor each pair, and look for a common binomial factor: $ax+ay+bx+by=a(x+y)+b(x+y)=(a+b)(x+y)$.',
              ],
              bullets: [
                'Factor out the GCF before trying any other pattern.',
                'When grouping, the two remaining binomial factors must match exactly, including signs.',
              ],
            },
            {
              title: 'Special products in reverse',
              body: [
                'Expanding $(a-b)(a+b)$ gives $a^2-b^2$ because the middle terms cancel. Recognizing a difference of two squares therefore saves time: $9x^2-25=(3x-5)(3x+5)$.',
                'Expanding $(a\\pm b)^2$ gives $a^2\\pm2ab+b^2$. A trinomial is a perfect square when the first and last terms are squares and the middle term is twice the product of their square roots.',
                'A sum of squares, $a^2+b^2$, does not factor over the integers. Do not confuse it with the difference of squares.',
              ],
              bullets: [
                '$a^2-b^2=(a-b)(a+b)$.',
                '$a^2+2ab+b^2=(a+b)^2$.',
                '$a^2-2ab+b^2=(a-b)^2$.',
                '$a^2+b^2$ has no integer factorization.',
              ],
            },
            {
              title: 'Factoring trinomials',
              body: [
                'For a monic trinomial $x^2+bx+c$, find two integers $p$ and $q$ with sum $b$ and product $c$. Then $x^2+bx+c=(x+p)(x+q)$. For example, $x^2+7x+12=(x+3)(x+4)$ because $3+4=7$ and $3\\cdot4=12$.',
                'When the leading coefficient is not 1, use the ac method. For $ax^2+bx+c$, find two numbers with product $ac$ and sum $b$, split the middle term, and factor by grouping. For $2x^2+7x+3$, $ac=6$; the numbers $6$ and $1$ work, giving $2x^2+6x+x+3=2x(x+3)+1(x+3)=(2x+1)(x+3)$.',
                'Signs carry information. If $c>0$, the two constants have the same sign; if $c<0$, they have opposite signs. Use this to narrow the possibilities before guessing.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-factor-gcf',
              title: 'Factoring out a common factor',
              expression: 'ab+ac=a(b+c)',
              description: 'The distributive property in reverse removes a factor shared by every term.',
              spoken: 'a times b plus a times c equals a times the quantity b plus c.',
              variables: [
                { symbol: 'a', name: 'common factor' },
                { symbol: 'b', name: 'first remaining term' },
                { symbol: 'c', name: 'second remaining term' },
              ],
              conditions: ['The factor $a$ must divide every term exactly.'],
              notes: 'The greatest common factor should include the largest numerical factor and the lowest power of each shared variable.',
              tags: ['greatest common factor', 'GCF', 'distributive property', 'common factor'],
            },
            {
              id: 'g9-factor-difference-squares',
              title: 'Difference of squares',
              expression: 'a^2-b^2=(a-b)(a+b)',
              description: 'A difference of two perfect squares factors into a pair of conjugate binomials.',
              spoken: 'a squared minus b squared equals the quantity a minus b times the quantity a plus b.',
              variables: [
                { symbol: 'a', name: 'square root of the first square' },
                { symbol: 'b', name: 'square root of the second square' },
              ],
              conditions: ['Both terms must be perfect squares and the operation between them must be subtraction.'],
              notes: 'The sum of squares $a^2+b^2$ does not factor over the integers.',
              tags: ['difference of squares', 'conjugate pair', 'special product'],
            },
            {
              id: 'g9-factor-perfect-square',
              title: 'Perfect-square trinomial',
              expression: 'a^2\\pm 2ab+b^2=(a\\pm b)^2',
              description: 'A trinomial whose middle term is twice the product of the square roots of the end terms collapses to a binomial squared.',
              spoken: 'a squared plus or minus two a b plus b squared equals the quantity a plus or minus b squared.',
              variables: [
                { symbol: 'a', name: 'square root of the leading square' },
                { symbol: 'b', name: 'square root of the final square' },
              ],
              conditions: ['The first and last terms must be non-negative perfect squares, and the middle term must equal $\\pm2ab$.'],
              notes: 'Check the sign of the middle term: it matches the sign inside the squared binomial.',
              tags: ['perfect square trinomial', 'binomial squared', 'special product'],
            },
            {
              id: 'g9-factor-trinomial',
              title: 'Factoring a monic trinomial',
              expression: 'x^2+bx+c=(x+p)(x+q)',
              description: 'A quadratic with leading coefficient 1 factors when two numbers have sum b and product c.',
              spoken: 'x squared plus b x plus c equals x plus p times x plus q, where p plus q is b and p times q is c.',
              variables: [
                { symbol: 'b', name: 'sum of the constants', note: 'equals p plus q' },
                { symbol: 'c', name: 'product of the constants', note: 'equals p times q' },
                { symbol: 'p', name: 'first constant' },
                { symbol: 'q', name: 'second constant' },
              ],
              conditions: ['$b$ and $c$ must be integers for an integer factorization; not every trinomial factors over the integers.'],
              notes: 'For a leading coefficient other than 1, use the ac method described in the theory section.',
              tags: ['factoring trinomials', 'quadratic factorization', 'ac method', 'sum and product'],
            },
          ],
          examples: [
            {
              title: 'Factor a non-monic trinomial',
              problem: 'Factor $2x^2+7x+3$ completely.',
              given: ['The polynomial is $2x^2+7x+3$.', 'There is no common factor greater than 1, since the coefficients 2, 7, and 3 share no common factor.'],
              steps: [
                {
                  text: 'Formula. For $ax^2+bx+c$, compute $ac$ and find two numbers with that product and with sum $b$.',
                  math: 'ac=2\\cdot3=6,\\qquad b=7',
                },
                {
                  text: 'Find the pair. The numbers $6$ and $1$ have product $6$ and sum $7$.',
                },
                {
                  text: 'Substitute by splitting the middle term into $6x+x$.',
                  math: '2x^2+6x+x+3',
                },
                {
                  text: 'Calculate by grouping the first two and last two terms.',
                  math: '=2x(x+3)+1(x+3)=(2x+1)(x+3)',
                },
                {
                  text: 'Check by expanding. The middle terms $6x$ and $x$ combine to $7x$.',
                  math: '(2x+1)(x+3)=2x^2+6x+x+3=2x^2+7x+3',
                },
              ],
              answer: '$2x^2+7x+3=(2x+1)(x+3)$. There are no units.',
            },
            {
              title: 'Factor completely with two patterns',
              problem: 'Factor $3x^3-12x$ completely.',
              given: ['The polynomial is $3x^3-12x$.', 'Both terms contain a factor of $3x$, and the remaining binomial is a difference of squares.'],
              steps: [
                {
                  text: 'Formula. First apply the common-factor pattern $ab+ac=a(b+c)$.',
                  math: '3x^3-12x=3x(x^2-4)',
                },
                {
                  text: 'Recognize that $x^2-4$ is a difference of squares with $a=x$ and $b=2$.',
                  math: 'x^2-4=(x-2)(x+2)',
                },
                {
                  text: 'Substitute the factorization into the expression.',
                  math: '3x(x-2)(x+2)',
                },
                {
                  text: 'Check by expanding the binomial pair first.',
                  math: '(x-2)(x+2)=x^2-4',
                },
                {
                  text: 'Multiply by $3x$ to recover the original polynomial.',
                  math: '3x(x^2-4)=3x^3-12x',
                },
              ],
              answer: '$3x^3-12x=3x(x-2)(x+2)$. There are no units.',
            },
          ],
          mistakes: [
            {
              mistake: 'Stopping at $2x^2-8=2(x^2-4)$.',
              correction:
                'The factor $x^2-4$ is still a difference of squares. Continue: $2(x-2)(x+2)$. A factorization is complete only when no factor can be factored further over the integers.',
            },
            {
              mistake: 'Factoring $x^2-2x-8$ as $(x+4)(x-2)$.',
              correction:
                'Expanding $(x+4)(x-2)$ gives $x^2+2x-8$, not $x^2-2x-8$. The correct pair is $(x-4)(x+2)$: $-4+2=-2$ and $(-4)(2)=-8$.',
            },
            {
              mistake: 'Factoring $x^2+9$ as $(x+3)^2$.',
              correction:
                '$(x+3)^2=x^2+6x+9$, which has a middle term. A sum of squares does not factor over the integers.',
            },
          ],
          exercises: [
            {
              id: 'g9-factor-ex-1',
              type: 'multiple-choice',
              prompt: 'Factor $x^2-49$.',
              options: ['$(x-7)(x+7)$', '$(x-7)^2$', '$(x+7)^2$', '$(x-49)(x+1)$'],
              correctOption: 0,
              hint: 'Recognize a difference of two squares.',
              explanation:
                '$x^2-49=x^2-7^2$, so the difference-of-squares pattern gives $(x-7)(x+7)$. The square options would produce a middle term.',
              difficulty: 'easy',
            },
            {
              id: 'g9-factor-ex-2',
              type: 'multiple-choice',
              prompt: 'Factor $3x^2-12x$.',
              options: ['$3x(x-4)$', '$3(x^2-12x)$', '$x(3x-12)$', '$3x(x-12)$'],
              correctOption: 0,
              hint: 'Take out the greatest common factor of both terms.',
              explanation:
                'The GCF is $3x$. Dividing each term by $3x$ leaves $x-4$, so $3x^2-12x=3x(x-4)$. The other options either do not remove the full GCF or change the value.',
              difficulty: 'easy',
            },
            {
              id: 'g9-factor-ex-3',
              type: 'numeric',
              prompt: 'The trinomial $x^2+bx+20$ factors as $(x+4)(x+5)$. What is $b$?',
              answer: 9,
              tolerance: 0.001,
              hint: 'Expand the product and compare the coefficient of $x$.',
              explanation: '$(x+4)(x+5)=x^2+9x+20$, so $b=9$. Equivalently, $b$ is the sum $4+5$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-factor-ex-4',
              type: 'multiple-choice',
              prompt: 'Factor $2x^2+5x-3$.',
              options: ['$(2x-1)(x+3)$', '$(2x+1)(x-3)$', '$(2x-3)(x+1)$', '$(2x+3)(x-1)$'],
              correctOption: 0,
              hint: 'Use the ac method with $ac=-6$ and $b=5$.',
              explanation:
                'The numbers $6$ and $-1$ multiply to $-6$ and add to $5$. Splitting the middle term gives $2x^2+6x-x-3=2x(x+3)-1(x+3)=(2x-1)(x+3)$. Expanding confirms the middle term is $5x$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-factor-ex-5',
              type: 'numeric',
              prompt: 'Find the positive value of $k$ for which $x^2-kx+36$ is a perfect-square trinomial.',
              answer: 12,
              tolerance: 0.001,
              hint: 'Write the trinomial as $(x-6)^2$ and compare the middle term.',
              explanation:
                '$(x-6)^2=x^2-12x+36$, so the middle coefficient is $-12$. Matching $x^2-kx+36$ gives $k=12$. The positive square root of 36 is 6, and twice 6 is 12.',
              difficulty: 'hard',
            },
            {
              id: 'g9-factor-ex-6',
              type: 'multiple-choice',
              prompt: 'Factor by grouping: $6x^2+9x+4x+6$.',
              options: ['$(3x+2)(2x+3)$', '$(3x+3)(2x+2)$', '$(6x+2)(x+3)$', '$(2x+3)^2$'],
              correctOption: 0,
              hint: 'Group the first two terms and the last two terms separately.',
              explanation:
                '$6x^2+9x+4x+6=3x(2x+3)+2(2x+3)=(3x+2)(2x+3)$. Expanding gives $6x^2+9x+4x+6$, as required.',
              difficulty: 'medium',
            },
          ],
          related: ['factorization-common-factors', 'quadratic-equations-intro', 'polynomials-intro'],
          aliases: ['factorising', 'factoring polynomials', 'trinomial factoring', 'difference of squares'],
        },
        {
          id: 'quadratic-equations-intro',
          title: 'Quadratic Equations: An Introduction',
          subtitle: 'Solve by factoring and by square roots using the zero-product property.',
          introduction:
            'A quadratic equation has the form $ax^2+bx+c=0$ with $a\\ne0$. Grade 9 solves quadratics that factor neatly or that can be reduced to $x^2=k$. The quadratic formula, which handles every quadratic, is developed in Grade 10. Here the emphasis is on structure: put the equation in standard form, factor or take square roots, and check each solution in the original equation.',
          prerequisites: ['polynomial-factorization', 'linear-equations-one-variable', 'square-and-cube-roots'],
          keyIdeas: [
            'Write the equation in standard form $ax^2+bx+c=0$ before factoring.',
            'The zero-product property works only when a product equals zero.',
            'If $x^2=k$ and $k\\ge0$, then $x=\\pm\\sqrt{k}$.',
            'Reject solutions that make no sense in an applied context, such as a negative length.',
            'Check every solution by substitution.',
          ],
          theory: [
            {
              title: 'Standard form and the zero-product property',
              body: [
                'Standard form collects every term on one side of the equation, leaving zero on the other. For example, $x^2=5x-6$ becomes $x^2-5x+6=0$. Factoring is useful only after this step.',
                'The zero-product property states that if a product is zero, at least one factor must be zero. If $AB=0$ and $A\\ne0$, dividing both sides by $A$ gives $B=0$. This is why setting each factor equal to zero is valid.',
                'The property depends on the product being zero. From $(x-2)(x+3)=6$ you cannot conclude that $x-2=6$ or $x+3=6$.',
              ],
              bullets: [
                'If $AB=0$, then $A=0$ or $B=0$ (or both).',
                'If a product equals a nonzero number, no conclusion follows about the individual factors.',
              ],
            },
            {
              title: 'Solving by factoring',
              body: [
                'The factoring method follows a fixed sequence: write standard form, factor completely, apply the zero-product property, solve each linear equation, and check.',
                'For $x^2-5x-24=0$, the factors $-8$ and $3$ have sum $-5$ and product $-24$, so $(x-8)(x+3)=0$. Therefore $x-8=0$ or $x+3=0$, giving $x=8$ or $x=-3$.',
                'A quadratic can have two, one, or no real solutions. A repeated factor such as $(x-5)^2=0$ produces the single solution $x=5$, counted twice.',
              ],
            },
            {
              title: 'The square-root method and applications',
              body: [
                'If $x^2=k$ with $k\\ge0$, then $x=\\pm\\sqrt{k}$. The $\\pm$ is essential because both a positive and a negative number square to a positive number. If $k<0$, there is no real solution because every real square is non-negative.',
                'The same idea applies to a squared binomial: $(x-3)^2=16$ gives $x-3=\\pm4$, so $x=7$ or $x=-1$.',
                'In applied problems, define the variable, write an equation, solve it, and reject any solution that violates the context. A length cannot be negative, for instance, even if the algebra produces a negative root.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-quadratic-intro-standard',
              title: 'Standard form of a quadratic equation',
              expression: 'ax^2+bx+c=0,\\quad a\\ne0',
              description: 'Every quadratic equation can be rearranged into this form before solving.',
              spoken: 'a x squared plus b x plus c equals zero, where a is not zero.',
              variables: [
                { symbol: 'a', name: 'leading coefficient', note: 'must not be zero' },
                { symbol: 'b', name: 'linear coefficient' },
                { symbol: 'c', name: 'constant term' },
              ],
              conditions: ['$a\\ne0$; otherwise the equation is linear, not quadratic.'],
              notes: 'Move all terms to one side so the other side is exactly zero before factoring.',
              tags: ['standard form', 'quadratic equation', 'ax squared plus bx plus c'],
            },
            {
              id: 'g9-quadratic-intro-zero-product',
              title: 'Zero-product property',
              expression: 'AB=0 \\iff A=0 \\text{ or } B=0',
              description: 'A product is zero exactly when at least one of its factors is zero.',
              spoken: 'A times B equals zero if and only if A equals zero or B equals zero.',
              variables: [
                { symbol: 'A', name: 'first factor' },
                { symbol: 'B', name: 'second factor' },
              ],
              conditions: ['The equation must have zero on one side; the property does not apply to a product equal to a nonzero number.'],
              notes: 'With more than two factors, at least one factor must be zero.',
              tags: ['zero product property', 'zero factor property', 'solving by factoring'],
            },
            {
              id: 'g9-quadratic-intro-square-root',
              title: 'Square-root method',
              expression: 'x^2=k \\iff x=\\pm\\sqrt{k}',
              description: 'A squared variable equal to a non-negative number has two solutions, one positive and one negative.',
              spoken: 'x squared equals k if and only if x equals plus or minus the square root of k.',
              variables: [
                { symbol: 'x', name: 'unknown value' },
                { symbol: 'k', name: 'non-negative constant', note: 'must be at least zero for real solutions' },
              ],
              conditions: ['$k\\ge0$. If $k<0$, there is no real solution.'],
              notes: 'The same method applies to a squared expression: $(x-h)^2=k$ gives $x-h=\\pm\\sqrt{k}$.',
              tags: ['square root method', 'taking square roots', 'plus or minus'],
            },
            {
              id: 'g9-quadratic-intro-factored',
              title: 'Solutions from factored form',
              expression: '(x-r)(x-s)=0 \\iff x=r \\text{ or } x=s',
              description: 'Once a quadratic is factored with zero on one side, each factor gives one solution.',
              spoken: 'x minus r times x minus s equals zero if and only if x equals r or x equals s.',
              variables: [
                { symbol: 'r', name: 'first solution' },
                { symbol: 's', name: 'second solution' },
              ],
              conditions: ['The product must equal zero.', 'The factors must be linear for the solutions to be read directly.'],
              notes: 'The signs inside the factors are opposite to the solutions: $(x-8)(x+3)=0$ gives $x=8$ and $x=-3$.',
              tags: ['factored form', 'roots', 'zeroes', 'quadratic solutions'],
            },
          ],
          examples: [
            {
              title: 'Solve by factoring',
              problem: 'Solve $x^2-5x-24=0$.',
              given: ['The equation is already in standard form.', 'The coefficients are $a=1$, $b=-5$, and $c=-24$.'],
              steps: [
                {
                  text: 'Formula. Look for two integers with sum $b=-5$ and product $c=-24$.',
                  math: 'p+q=-5,\\qquad pq=-24',
                },
                {
                  text: 'The pair $-8$ and $3$ works because $-8+3=-5$ and $(-8)(3)=-24$. Substitute into the factored form.',
                  math: '(x-8)(x+3)=0',
                },
                {
                  text: 'Apply the zero-product property.',
                  math: 'x-8=0 \\quad\\text{or}\\quad x+3=0',
                },
                {
                  text: 'Solve each linear equation.',
                  math: 'x=8 \\quad\\text{or}\\quad x=-3',
                },
                {
                  text: 'Check both values in the original equation.',
                  math: '8^2-5(8)-24=64-40-24=0',
                },
                {
                  text: 'Check the second value.',
                  math: '(-3)^2-5(-3)-24=9+15-24=0',
                },
              ],
              answer: '$x=8$ or $x=-3$. The solution set is $\\{-3,8\\}$. There are no units.',
            },
            {
              title: 'An applied area problem',
              problem: 'A rectangular garden is 3 m longer than it is wide. Its area is 40 m². Find its dimensions.',
              given: ['Let $w$ be the width in metres.', 'The length is $w+3$ metres.', 'The area is $40$ m², and area equals length times width.'],
              steps: [
                {
                  text: 'Formula. Write the area equation.',
                  math: 'w(w+3)=40',
                },
                {
                  text: 'Substitute by expanding the left side and moving 40 to the left.',
                  math: 'w^2+3w-40=0',
                },
                {
                  text: 'Factor. The numbers $8$ and $-5$ have sum $3$ and product $-40$.',
                  math: '(w+8)(w-5)=0',
                },
                {
                  text: 'Apply the zero-product property.',
                  math: 'w=-8 \\quad\\text{or}\\quad w=5',
                },
                {
                  text: 'Calculate and interpret. A width cannot be negative, so reject $w=-8$. The width is 5 m and the length is $5+3=8$ m.',
                },
                {
                  text: 'Check the area.',
                  math: '5\\cdot8=40\\ \\text{m}^2',
                },
              ],
              answer: 'The garden is 5 m wide and 8 m long. Its area is 40 m².',
            },
          ],
          mistakes: [
            {
              mistake: 'Solving $x^2=5x$ by dividing both sides by $x$, obtaining only $x=5$.',
              correction:
                'Division by $x$ assumes $x\\ne0$. Instead, write $x^2-5x=0$, factor $x(x-5)=0$, and conclude $x=0$ or $x=5$. Dividing loses the solution $x=0$.',
            },
            {
              mistake: 'Writing $x=\\sqrt{49}$ and giving only $x=7$ when solving $x^2=49$.',
              correction:
                'Both $7$ and $-7$ square to 49. The complete solution is $x=\\pm7$. Use the $\\pm$ symbol or state both solutions.',
            },
            {
              mistake: 'Accepting a negative root as the width of a rectangle.',
              correction:
                'The algebra may produce a negative value, but a physical length must be positive. State the rejection explicitly and keep the positive root.',
            },
          ],
          exercises: [
            {
              id: 'g9-quadratic-intro-ex-1',
              type: 'multiple-choice',
              prompt: 'Solve $(x-4)(x+7)=0$.',
              options: ['$x=4$ or $x=-7$', '$x=-4$ or $x=7$', '$x=4$ or $x=7$', '$x=-4$ or $x=-7$'],
              correctOption: 0,
              hint: 'Set each factor equal to zero.',
              explanation:
                'The zero-product property gives $x-4=0$ or $x+7=0$, so $x=4$ or $x=-7$. The signs reverse when each equation is solved.',
              difficulty: 'easy',
            },
            {
              id: 'g9-quadratic-intro-ex-2',
              type: 'multiple-choice',
              prompt: 'Solve $x^2=49$.',
              options: ['$x=\\pm7$', '$x=7$', '$x=-7$', '$x=24.5$'],
              correctOption: 0,
              hint: 'Both a positive and a negative number square to 49.',
              explanation: '$7^2=49$ and $(-7)^2=49$, so both values satisfy the equation. The complete solution is $x=\\pm7$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-quadratic-intro-ex-3',
              type: 'numeric',
              prompt: 'Solve $x^2+2x-15=0$. Give the positive solution.',
              answer: 3,
              tolerance: 0.001,
              hint: 'Find two numbers with sum 2 and product −15.',
              explanation:
                '$(x+5)(x-3)=0$, so $x=-5$ or $x=3$. The positive solution is $3$. Check: $9+6-15=0$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-quadratic-intro-ex-4',
              type: 'multiple-choice',
              prompt: 'Solve $(x-5)^2=9$.',
              options: ['$x=2$ or $x=8$', '$x=8$ only', '$x=2$ only', '$x=5$ or $x=9$'],
              correctOption: 0,
              hint: 'Take the square root of both sides and remember the $\\pm$.',
              explanation:
                '$x-5=\\pm3$, so $x=5+3=8$ or $x=5-3=2$. Both values satisfy the original equation.',
              difficulty: 'medium',
            },
            {
              id: 'g9-quadratic-intro-ex-5',
              type: 'numeric',
              prompt: 'A rectangle is 4 m longer than it is wide and has area 96 m². Find its width in metres.',
              answer: 8,
              tolerance: 0.001,
              answerUnit: 'm',
              hint: 'Let the width be $w$ and write $w(w+4)=96$.',
              explanation:
                '$w^2+4w-96=0$, which factors as $(w+12)(w-8)=0$. The width must be positive, so $w=8$ m. The length is 12 m, and $8\\cdot12=96$.',
              difficulty: 'hard',
            },
          ],
          related: ['polynomial-factorization', 'quadratic-equations', 'systems-of-linear-equations'],
          aliases: ['solving quadratics', 'zero product property', 'factoring quadratic equations'],
        },
        {
          id: 'systems-of-linear-equations',
          title: 'Systems of Linear Equations',
          subtitle: 'Two equations, two unknowns: graph, substitute, or eliminate.',
          introduction:
            'A system of linear equations is a pair of equations that must be true at the same time. Its solution is the ordered pair $(x,y)$ that satisfies both equations. Graphically, the solution is the point where the two lines meet; algebraically, substitution and elimination find that point without drawing. Real problems with two unknown quantities often produce a system.',
          prerequisites: ['linear-equations-one-variable', 'linear-functions', 'cartesian-plane'],
          keyIdeas: [
            'A solution must satisfy both equations simultaneously.',
            'Two lines can intersect once, be parallel, or coincide, giving one, no, or infinitely many solutions.',
            'Substitution isolates one variable and replaces it in the other equation.',
            'Elimination adds or subtracts multiples of the equations to remove a variable.',
            'Always check the ordered pair in both original equations.',
          ],
          theory: [
            {
              title: 'What a solution means',
              body: [
                'Each linear equation in two variables represents a line. A system asks where two lines share points. If the lines have different slopes, they cross exactly once and the system has one solution. If the slopes are equal but the intercepts differ, the lines are parallel and there is no solution. If the equations describe the same line, every point on the line is a solution.',
                'A system with at least one solution is consistent. A system with no solution is inconsistent. A system with infinitely many solutions is dependent, because one equation adds no new information.',
              ],
              bullets: [
                'Different slopes: exactly one solution, and the lines intersect.',
                'Same slope, different intercepts: no solution, and the lines are parallel.',
                'Same slope and same intercept: infinitely many solutions, and the lines coincide.',
              ],
            },
            {
              title: 'The substitution method',
              body: [
                'Substitution is convenient when one variable is already isolated or has coefficient 1. Solve one equation for that variable, substitute the expression into the other equation, and solve the resulting one-variable equation. Then substitute back to find the other variable.',
                'For the system $y=2x-1$ and $3x+2y=12$, replace $y$ in the second equation with $2x-1$: $3x+2(2x-1)=12$. This gives $7x=14$, so $x=2$ and then $y=3$.',
              ],
            },
            {
              title: 'The elimination method',
              body: [
                'Elimination aligns like terms and adds or subtracts the equations so that one variable cancels. If the coefficients are not already opposites, multiply one or both equations by constants first. Multiplying an equation by a nonzero number does not change its solution set.',
                'After eliminating one variable, solve for the remaining one and back-substitute. If both variables vanish, examine the resulting statement: a true statement such as $0=0$ means infinitely many solutions, while a false statement such as $0=5$ means no solution.',
              ],
              bullets: [
                'Align $x$-terms, $y$-terms, and constants before adding.',
                'To cancel a variable, its coefficients must be opposites.',
                'A true constant statement after elimination indicates dependent equations.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-systems-standard',
              title: 'Standard form of a linear system',
              expression: '\\begin{cases} a_1x+b_1y=c_1 \\\\ a_2x+b_2y=c_2 \\end{cases}',
              description: 'Two linear equations in two variables written with like terms aligned.',
              spoken: 'a one x plus b one y equals c one, and a two x plus b two y equals c two.',
              variables: [
                { symbol: 'x', name: 'first unknown' },
                { symbol: 'y', name: 'second unknown' },
                { symbol: 'a_1,\\ b_1,\\ c_1', name: 'coefficients and constant of the first equation' },
                { symbol: 'a_2,\\ b_2,\\ c_2', name: 'coefficients and constant of the second equation' },
              ],
              conditions: ['At least one coefficient of $x$ or $y$ must be nonzero in each equation.'],
              notes: 'Aligning the equations in this form makes elimination less error-prone.',
              tags: ['system of equations', 'simultaneous equations', 'standard form', 'two variables'],
            },
            {
              id: 'g9-systems-substitution',
              title: 'Solving for a variable by substitution',
              expression: 'x=\\frac{c-by}{a}',
              description: 'Rearrange $ax+by=c$ to isolate $x$, provided $a$ is not zero, and substitute into the other equation.',
              spoken: 'x equals c minus b y, all divided by a.',
              variables: [
                { symbol: 'a', name: 'coefficient of x', note: 'must not be zero' },
                { symbol: 'b', name: 'coefficient of y' },
                { symbol: 'c', name: 'constant term' },
              ],
              conditions: ['$a\\ne0$. If $a=0$, isolate $y$ instead.'],
              notes: 'Choose the variable with the simplest coefficient to keep the arithmetic manageable.',
              tags: ['substitution method', 'isolate a variable', 'simultaneous equations'],
            },
            {
              id: 'g9-systems-slope-test',
              title: 'Number of solutions from slopes',
              expression: 'm_1\\ne m_2 \\iff \\text{exactly one solution}',
              description: 'For two non-vertical lines, different slopes guarantee exactly one intersection point.',
              spoken: 'Two lines have exactly one solution if and only if their slopes are different.',
              variables: [
                { symbol: 'm_1', name: 'slope of the first line' },
                { symbol: 'm_2', name: 'slope of the second line' },
              ],
              conditions: ['Both equations must describe non-vertical lines, so each can be written as $y=mx+b$.'],
              notes: 'If $m_1=m_2$ and the intercepts differ, there is no solution. If the lines coincide, there are infinitely many solutions.',
              tags: ['slope test', 'consistent system', 'parallel lines', 'number of solutions'],
            },
          ],
          examples: [
            {
              title: 'Solve a system by elimination',
              problem: 'Solve the system $2x+3y=12$ and $4x-3y=6$.',
              given: ['The first equation is $2x+3y=12$.', 'The second equation is $4x-3y=6$.', 'The $y$-terms have opposite coefficients, $3$ and $-3$.'],
              steps: [
                {
                  text: 'Formula. Add the two equations so that the $y$-terms cancel.',
                  math: '(2x+3y)+(4x-3y)=12+6',
                },
                {
                  text: 'Substitute and simplify the left side.',
                  math: '6x=18',
                },
                {
                  text: 'Calculate $x$.',
                  math: 'x=3',
                },
                {
                  text: 'Back-substitute $x=3$ into the first equation.',
                  math: '2(3)+3y=12',
                },
                {
                  text: 'Solve for $y$.',
                  math: '6+3y=12 \\Rightarrow 3y=6 \\Rightarrow y=2',
                },
                {
                  text: 'Check the ordered pair $(3,2)$ in the second equation.',
                  math: '4(3)-3(2)=12-6=6',
                },
              ],
              answer: 'The solution is $(3,2)$. Both equations are satisfied, so the system is consistent.',
            },
            {
              title: 'Solve a system by substitution',
              problem: 'Solve the system $y=2x-1$ and $3x+2y=12$.',
              given: ['The first equation already isolates $y$.', 'The second equation is $3x+2y=12$.'],
              steps: [
                {
                  text: 'Formula. Substitute the expression for $y$ into the second equation.',
                  math: '3x+2(2x-1)=12',
                },
                {
                  text: 'Substitute and distribute.',
                  math: '3x+4x-2=12',
                },
                {
                  text: 'Calculate $x$.',
                  math: '7x=14 \\Rightarrow x=2',
                },
                {
                  text: 'Back-substitute $x=2$ into $y=2x-1$.',
                  math: 'y=2(2)-1=3',
                },
                {
                  text: 'Check $(2,3)$ in the second equation.',
                  math: '3(2)+2(3)=6+6=12',
                },
              ],
              answer: 'The solution is $(2,3)$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Finding $x=3$ and stopping, without finding the corresponding $y$-value.',
              correction:
                'A solution of a two-variable system is an ordered pair. Substitute the known value into either original equation to find the other coordinate, then check both equations.',
            },
            {
              mistake: 'Adding equations that are not aligned, so that neither variable cancels.',
              correction:
                'Rewrite both equations in standard form with like terms in the same order. Then add or subtract, or multiply one equation first so a pair of coefficients becomes opposite.',
            },
            {
              mistake: 'Concluding that $2x+y=5$ and $4x+2y=10$ have no solution because the coefficients differ.',
              correction:
                'The second equation is exactly twice the first, so the two equations describe the same line. The system is dependent and has infinitely many solutions, not none.',
            },
          ],
          exercises: [
            {
              id: 'g9-systems-ex-1',
              type: 'multiple-choice',
              prompt: 'Solve the system $y=x+2$ and $y=3x-4$.',
              options: ['$(3,5)$', '$(5,3)$', '$(2,4)$', '$(4,6)$'],
              correctOption: 0,
              hint: 'Set the two expressions for $y$ equal to each other.',
              explanation:
                '$x+2=3x-4$ gives $6=2x$, so $x=3$. Then $y=3+2=5$. Check: $3(3)-4=5$. The solution is $(3,5)$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-systems-ex-2',
              type: 'multiple-choice',
              prompt: 'How many solutions does the system $y=2x+1$ and $y=2x-3$ have?',
              options: ['No solution', 'Exactly one solution', 'Infinitely many solutions', 'Exactly two solutions'],
              correctOption: 0,
              hint: 'Compare the slopes and intercepts.',
              explanation:
                'Both lines have slope $2$ but different $y$-intercepts, $1$ and $-3$. They are parallel and never meet, so the system has no solution.',
              difficulty: 'easy',
            },
            {
              id: 'g9-systems-ex-3',
              type: 'numeric',
              prompt: 'Solve the system $x+y=10$ and $x-y=4$. Give the value of $x$.',
              answer: 7,
              tolerance: 0.001,
              hint: 'Add the two equations to eliminate $y$.',
              explanation: 'Adding gives $2x=14$, so $x=7$. Then $y=3$, and both equations hold: $7+3=10$ and $7-3=4$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-systems-ex-4',
              type: 'numeric',
              prompt: 'Solve the system $2x+3y=12$ and $x-y=1$. Give the value of $y$.',
              answer: 2,
              tolerance: 0.001,
              hint: 'Use substitution: from $x-y=1$, write $x=y+1$.',
              explanation:
                'Substituting $x=y+1$ into $2x+3y=12$ gives $2y+2+3y=12$, so $5y=10$ and $y=2$. Then $x=3$. Check: $6+6=12$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-systems-ex-5',
              type: 'multiple-choice',
              prompt: 'How many solutions does the system $2x+y=5$ and $4x+2y=10$ have?',
              options: ['Infinitely many', 'No solution', 'Exactly one', 'Exactly two'],
              correctOption: 0,
              hint: 'Compare the second equation with twice the first.',
              explanation:
                'Multiplying the first equation by 2 gives $4x+2y=10$, which is exactly the second equation. The equations describe the same line, so every point on that line is a solution.',
              difficulty: 'medium',
            },
            {
              id: 'g9-systems-ex-6',
              type: 'numeric',
              prompt: 'Solve the system $3x+2y=13$ and $2x+5y=16$. Give the value of $x+y$.',
              answer: 5,
              tolerance: 0.001,
              hint: 'Multiply the first equation by 5 and the second by 2, then subtract.',
              explanation:
                'Multiplying gives $15x+10y=65$ and $4x+10y=32$. Subtracting yields $11x=33$, so $x=3$. Then $9+2y=13$, so $y=2$. Therefore $x+y=5$.',
              difficulty: 'hard',
            },
          ],
          related: ['linear-equations-one-variable', 'linear-functions', 'quadratic-equations-intro'],
          aliases: ['simultaneous equations', 'linear systems', 'elimination method', 'substitution method'],
        },
        {
          id: 'functions-intro',
          title: 'Functions: An Introduction',
          subtitle: 'One input, one output: notation, domain, and range.',
          introduction:
            'A function is a rule that assigns exactly one output to each allowed input. Function notation $f(x)$ names the output rather than a product. Grade 9 connects formulas, tables, and graphs, and uses domain and range to describe what a function can accept and what it can produce. Linear and nonlinear functions are compared through their rates of change.',
          prerequisites: ['linear-functions', 'patterns-and-sequences', 'cartesian-plane'],
          keyIdeas: [
            '$f(x)$ means the output of the function $f$ at input $x$; it is not $f$ times $x$.',
            'Each allowed input has exactly one output; the vertical line test detects functions.',
            'The domain is the set of inputs, and the range is the set of outputs.',
            'A linear function has a constant rate of change; a nonlinear function does not.',
            'Substitute carefully, especially when the input is negative.',
          ],
          theory: [
            {
              title: 'Notation is a substitution instruction',
              body: [
                'Writing $y=f(x)$ names the output $y$ produced by the rule $f$ from the input $x$. If $f(x)=2x^2-1$, then $f(3)$ means replace every $x$ in the rule with $3$: $f(3)=2(3)^2-1=17$.',
                'The parentheses in $f(3)$ do not mean multiplication. They mark the input. A different input produces a different output: $f(-2)=2(-2)^2-1=7$.',
              ],
            },
            {
              title: 'Domain and range',
              body: [
                'The domain is the set of inputs for which the function is defined. The range is the set of outputs it actually produces. For a finite relation given as ordered pairs, the domain is the set of first coordinates and the range is the set of second coordinates.',
                'On a graph, the domain is the horizontal extent of the curve and the range is the vertical extent. Some rules restrict the domain automatically: $\\sqrt{x}$ requires $x\\ge0$, and $\\frac{1}{x}$ requires $x\\ne0$.',
                'A relation is a function only if no input is paired with two different outputs. The vertical line test says the same thing graphically: a graph represents a function if every vertical line meets it at most once.',
              ],
              bullets: [
                'Domain: all allowed inputs.',
                'Range: all outputs that occur.',
                'A circle fails the vertical line test, so it is not a function of $x$.',
              ],
            },
            {
              title: 'Linear versus nonlinear functions',
              body: [
                'A linear function can be written as $f(x)=mx+b$. Equal changes in the input produce equal changes in the output, so the rate of change is constant. In a table, the first differences of the outputs are constant.',
                'A nonlinear function does not have a constant rate of change. For $f(x)=x^2$, the outputs for inputs $0,1,2,3$ are $0,1,4,9$; the differences are $1,3,5$, which change. Its graph is a curve, not a straight line.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-functions-notation',
              title: 'Function notation',
              expression: 'y=f(x)',
              description: 'The output y is determined by applying the function f to the input x.',
              spoken: 'y equals f of x.',
              variables: [
                { symbol: 'x', name: 'input value', note: 'must belong to the domain' },
                { symbol: 'y', name: 'output value' },
                { symbol: 'f', name: 'name of the function or rule' },
              ],
              conditions: ['$x$ must be in the domain of $f$.'],
              notes: '$f(3)$ is an output, not a product. Replace the input variable with 3 throughout the rule.',
              tags: ['function notation', 'f of x', 'input output', 'functions'],
            },
            {
              id: 'g9-functions-linear',
              title: 'Linear function',
              expression: 'f(x)=mx+b',
              description: 'A linear function has a constant slope m and a y-intercept b.',
              spoken: 'f of x equals m x plus b.',
              variables: [
                { symbol: 'm', name: 'slope or constant rate of change' },
                { symbol: 'b', name: 'y-intercept' },
              ],
              conditions: ['The graph is a non-vertical line; a vertical line is not a function of $x$.'],
              notes: 'Equal changes in $x$ produce equal changes in $f(x)$.',
              tags: ['linear function', 'slope intercept form', 'constant rate of change'],
            },
            {
              id: 'g9-functions-rate',
              title: 'Average rate of change',
              expression: 'm=\\frac{f(x_2)-f(x_1)}{x_2-x_1}',
              description: 'The average rate of change of a function over an interval is the change in output divided by the change in input.',
              spoken: 'm equals f of x two minus f of x one, divided by x two minus x one.',
              variables: [
                { symbol: 'x_1,\\ x_2', name: 'two distinct input values', note: 'must satisfy $x_1\\ne x_2$' },
                { symbol: 'f(x_1),\\ f(x_2)', name: 'corresponding outputs' },
              ],
              conditions: ['$x_1\\ne x_2$; division by zero is undefined.'],
              notes: 'For a linear function this value is the same for every pair of inputs; for a nonlinear function it depends on the interval.',
              tags: ['average rate of change', 'difference quotient', 'slope of a function'],
            },
          ],
          examples: [
            {
              title: 'Evaluate a quadratic function',
              problem: 'For $f(x)=x^2-4x+1$, find $f(3)$, $f(0)$, and $f(-1)$.',
              given: ['The function rule is $f(x)=x^2-4x+1$.', 'The inputs are $3$, $0$, and $-1$.'],
              steps: [
                {
                  text: 'Formula. Substitute the input for every occurrence of $x$.',
                  math: 'f(3)=3^2-4(3)+1',
                },
                {
                  text: 'Calculate $f(3)$.',
                  math: '=9-12+1=-2',
                },
                {
                  text: 'Substitute $x=0$.',
                  math: 'f(0)=0^2-4(0)+1=1',
                },
                {
                  text: 'Substitute $x=-1$, keeping the negative sign inside the square.',
                  math: 'f(-1)=(-1)^2-4(-1)+1',
                },
                {
                  text: 'Calculate $f(-1)$.',
                  math: '=1+4+1=6',
                },
              ],
              answer: '$f(3)=-2$, $f(0)=1$, and $f(-1)=6$. There are no units.',
            },
            {
              title: 'Find domain and range from ordered pairs',
              problem: 'For the relation $\\{(-2,1),(0,3),(1,3),(4,-2)\\}$, state the domain and range and decide whether it is a function.',
              given: ['The relation is a set of four ordered pairs.', 'The first coordinate of each pair is an input; the second is an output.'],
              steps: [
                {
                  text: 'Formula. The domain is the set of first coordinates.',
                  math: '\\text{Domain}=\\{-2,0,1,4\\}',
                },
                {
                  text: 'The range is the set of second coordinates, listed once each.',
                  math: '\\text{Range}=\\{-2,1,3\\}',
                },
                {
                  text: 'Check the inputs for repetition. Each input appears exactly once, so each input has one output.',
                },
                {
                  text: 'Confirm that the repeated output $3$ is allowed. Two different inputs may share an output in a function.',
                },
              ],
              answer: 'Domain $\\{-2,0,1,4\\}$; range $\\{-2,1,3\\}$. The relation is a function because no input is paired with two different outputs.',
            },
          ],
          mistakes: [
            {
              mistake: 'Interpreting $f(3)$ as $3f$ or as $f\\cdot3$.',
              correction:
                '$f(3)$ is function notation for the output when the input is 3. If $f(x)=x^2$, then $f(3)=9$, not $3f$.',
            },
            {
              mistake: 'Evaluating $f(-2)$ for $f(x)=x^2$ as $-2^2=-4$.',
              correction:
                'The input $-2$ must be squared as a whole: $(-2)^2=4$. Use parentheses around a negative input before applying an exponent.',
            },
            {
              mistake: 'Swapping domain and range.',
              correction:
                'The domain lists inputs (first coordinates or horizontal values); the range lists outputs (second coordinates or vertical values).',
            },
          ],
          exercises: [
            {
              id: 'g9-functions-ex-1',
              type: 'multiple-choice',
              prompt: 'For $f(x)=3x-5$, find $f(4)$.',
              options: ['$7$', '$12$', '$17$', '$2$'],
              correctOption: 0,
              hint: 'Replace $x$ with 4 in the rule.',
              explanation: '$f(4)=3(4)-5=12-5=7$. The value 12 is only the product before subtracting 5.',
              difficulty: 'easy',
            },
            {
              id: 'g9-functions-ex-2',
              type: 'multiple-choice',
              prompt: 'What is the domain of the relation $\\{(-1,2),(0,4),(3,4)\\}$?',
              options: ['$\\{-1,0,3\\}$', '$\\{2,4\\}$', '$\\{-1,0,2,3,4\\}$', '$\\{0,3\\}$'],
              correctOption: 0,
              hint: 'The domain collects the first coordinates.',
              explanation:
                'The inputs are $-1$, $0$, and $3$, so the domain is $\\{-1,0,3\\}$. The range is $\\{2,4\\}$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-functions-ex-3',
              type: 'numeric',
              prompt: 'For $f(x)=x^2+2x$, find $f(-3)$.',
              answer: 3,
              tolerance: 0.001,
              hint: 'Square the entire input $-3$, then add $2(-3)$.',
              explanation: '$f(-3)=(-3)^2+2(-3)=9-6=3$. Keeping the negative sign inside the square is essential.',
              difficulty: 'medium',
            },
            {
              id: 'g9-functions-ex-4',
              type: 'multiple-choice',
              prompt: 'Which equation represents a nonlinear function?',
              options: ['$y=x^2-3$', '$y=2x+1$', '$y=-x$', '$y=4$'],
              correctOption: 0,
              hint: 'A linear function can be written in the form $y=mx+b$.',
              explanation:
                '$y=x^2-3$ contains $x^2$, so its graph is a parabola, not a line. The other three are linear (including the constant function $y=4$).',
              difficulty: 'medium',
            },
            {
              id: 'g9-functions-ex-5',
              type: 'numeric',
              prompt: 'For $f(x)=2x+1$, solve $f(x)=11$.',
              answer: 5,
              tolerance: 0.001,
              hint: 'Set the rule equal to 11 and solve for $x$.',
              explanation: '$2x+1=11$ gives $2x=10$, so $x=5$. Check: $f(5)=2(5)+1=11$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-functions-ex-6',
              type: 'multiple-choice',
              prompt: 'What does the vertical line test determine?',
              options: [
                'Whether a graph represents a function',
                'Whether a graph is linear',
                'Whether a function is increasing',
                'Whether a graph has a y-intercept',
              ],
              correctOption: 0,
              hint: 'A function allows only one output for each input.',
              explanation:
                'If any vertical line meets a graph more than once, one input has two outputs, so the graph is not a function. The test does not decide linearity or increasing behaviour.',
              difficulty: 'medium',
            },
          ],
          related: ['linear-functions', 'distance-midpoint-slope', 'quadratic-equations-intro'],
          aliases: ['function notation', 'domain and range', 'input output', 'linear and nonlinear functions'],
        },
      ],
    },
    {
      id: 'geometry',
      family: 'geometry',
      title: 'Geometry',
      description:
        'Similarity, circle relationships, and the measurement of curved solids extend geometric reasoning from shapes in the plane to proportional and three-dimensional contexts.',
      topics: [
        {
          id: 'similarity-and-dilations',
          title: 'Similarity and Dilations',
          subtitle: 'Same shape, different size: scale factors and proportional sides.',
          introduction:
            'Similar figures have the same shape but not necessarily the same size. Corresponding angles are equal, and corresponding side lengths are in the same ratio. Dilations are the transformations that create similar figures, with a scale factor that controls enlargement or reduction. Lengths and areas respond to the scale factor in different ways.',
          prerequisites: ['ratios-and-proportions', 'congruence-and-transformations', 'pythagorean-theorem'],
          keyIdeas: [
            'Similar polygons have equal corresponding angles and proportional corresponding sides.',
            'Two pairs of equal angles are enough to prove triangles similar (AA similarity).',
            'A scale factor $k$ multiplies lengths, while areas are multiplied by $k^2$.',
            'A dilation centered at the origin maps $(x,y)$ to $(kx,ky)$.',
            'Congruent figures are similar with scale factor 1.',
          ],
          theory: [
            {
              title: 'Definition and scale factor',
              body: [
                'Two polygons are similar when every pair of corresponding angles is equal and every pair of corresponding sides is in the same ratio. That common ratio is the scale factor $k$. Writing $\\triangle ABC\\sim\\triangle DEF$ states the correspondence explicitly: $A$ matches $D$, $B$ matches $E$, and $C$ matches $F$.',
                'The scale factor compares image length to original length: $k=\\frac{\\text{image}}{\\text{original}}$. If $k>1$, the image is an enlargement; if $0<k<1$, it is a reduction; if $k=1$, the figures are congruent.',
              ],
              bullets: [
                'Corresponding angles are equal.',
                'Corresponding sides are proportional.',
                'The order of vertices in a similarity statement identifies corresponding parts.',
              ],
            },
            {
              title: 'AA similarity and proportional sides',
              body: [
                'If two angles of one triangle are equal to two angles of another, the third pair must also be equal because the angles of a triangle sum to $180^{\\circ}$. Therefore the triangles are similar. This is the AA similarity criterion.',
                'Once similarity is established, write ratios with matching sides in corresponding positions. For $\\triangle ABC\\sim\\triangle DEF$, $\\frac{AB}{DE}=\\frac{BC}{EF}=\\frac{AC}{DF}$. Solve the resulting proportion for the unknown length.',
                'Two proportional sides alone are not enough without the included angle or a third proportional side; matching the wrong vertices is a common source of incorrect ratios.',
              ],
            },
            {
              title: 'Dilations and area',
              body: [
                'A dilation with center at the origin and scale factor $k$ maps each point $(x,y)$ to $(kx,ky)$. The image is similar to the original, and every length is multiplied by $k$.',
                'Area behaves differently because both dimensions scale. A rectangle with sides multiplied by $k$ has area multiplied by $k\\cdot k=k^2$. The same rule holds for every plane figure: the ratio of areas of similar figures is the square of the scale factor. Perimeter, being a length, scales by $k$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-similarity-scale-factor',
              title: 'Scale factor',
              expression: 'k=\\frac{\\text{image length}}{\\text{original length}}',
              description: 'The scale factor is the ratio of a length in the image to the corresponding length in the original figure.',
              spoken: 'k equals the image length divided by the original length.',
              variables: [
                { symbol: 'k', name: 'scale factor', note: 'positive; greater than 1 enlarges, between 0 and 1 reduces' },
              ],
              conditions: ['The two lengths must correspond to the same side or segment.', '$k>0$ for a dilation without reflection.'],
              notes: 'Congruent figures have $k=1$.',
              tags: ['scale factor', 'similar figures', 'enlargement', 'reduction'],
            },
            {
              id: 'g9-similarity-side-ratio',
              title: 'Proportional sides of similar triangles',
              expression: '\\frac{AB}{DE}=\\frac{BC}{EF}=\\frac{AC}{DF}',
              description: 'Corresponding sides of similar triangles form equal ratios.',
              spoken: 'A B over D E equals B C over E F equals A C over D F.',
              variables: [
                { symbol: 'AB,\\ BC,\\ AC', name: 'side lengths of the first triangle' },
                { symbol: 'DE,\\ EF,\\ DF', name: 'corresponding side lengths of the second triangle' },
              ],
              conditions: ['$\\triangle ABC\\sim\\triangle DEF$; the vertices must be matched in the stated order.'],
              notes: 'Set up the proportion with corresponding sides in the same positions, then cross-multiply.',
              tags: ['similar triangles', 'proportional sides', 'side ratios', 'AA similarity'],
            },
            {
              id: 'g9-similarity-area-ratio',
              title: 'Area ratio of similar figures',
              expression: '\\frac{A_{\\text{image}}}{A_{\\text{original}}}=k^2',
              description: 'The ratio of the areas of similar figures is the square of their scale factor.',
              spoken: 'The image area divided by the original area equals k squared.',
              variables: [
                { symbol: 'A_{\\text{image}}', name: 'area of the image' },
                { symbol: 'A_{\\text{original}}', name: 'area of the original figure' },
                { symbol: 'k', name: 'scale factor' },
              ],
              conditions: ['The figures must be similar and $k$ must compare corresponding lengths.'],
              notes: 'Perimeter scales by $k$, not $k^2$. Area scales by $k^2$.',
              tags: ['area ratio', 'similar figures area', 'scale factor squared'],
            },
            {
              id: 'g9-similarity-dilation',
              title: 'Coordinate dilation about the origin',
              expression: '(x,y)\\mapsto(kx,ky)',
              description: 'A dilation centered at the origin multiplies both coordinates by the scale factor.',
              spoken: 'The point x comma y maps to k x comma k y.',
              variables: [
                { symbol: 'x,\\ y', name: 'coordinates of the original point' },
                { symbol: 'k', name: 'scale factor', note: 'positive for a direct dilation' },
              ],
              conditions: ['The center of dilation is the origin $(0,0)$.', '$k>0$ unless a reflection is also intended.'],
              notes: 'Distances from the origin are multiplied by $k$, and areas by $k^2$.',
              tags: ['dilation', 'coordinate transformation', 'scale factor', 'origin'],
            },
          ],
          examples: [
            {
              title: 'Find a missing side using similarity',
              problem: 'Triangles $ABC$ and $DEF$ are similar, with $AB=6$ cm, $BC=9$ cm, and $DE=8$ cm. Find $EF$.',
              given: ['$\\triangle ABC\\sim\\triangle DEF$.', '$AB=6$ cm, $BC=9$ cm, and $DE=8$ cm.'],
              steps: [
                {
                  text: 'Formula. Corresponding sides form equal ratios.',
                  math: '\\frac{AB}{DE}=\\frac{BC}{EF}',
                },
                {
                  text: 'Substitute the known lengths.',
                  math: '\\frac{6}{8}=\\frac{9}{EF}',
                },
                {
                  text: 'Calculate the scale factor from the first pair.',
                  math: 'k=\\frac{DE}{AB}=\\frac{8}{6}=\\frac43',
                },
                {
                  text: 'Multiply the corresponding side by the scale factor.',
                  math: 'EF=9\\cdot\\frac43=12',
                },
                {
                  text: 'Check the ratio.',
                  math: '\\frac{6}{8}=\\frac{9}{12}=\\frac34',
                },
              ],
              answer: '$EF=12$ cm.',
            },
            {
              title: 'Use a scale factor to compare areas',
              problem: 'A photograph is 10 cm by 15 cm. It is enlarged so that its shorter side becomes 25 cm. Find the longer side and the ratio of the new area to the original area.',
              given: ['Original dimensions: $10$ cm by $15$ cm.', 'New shorter side: $25$ cm.'],
              steps: [
                {
                  text: 'Formula. The scale factor compares corresponding lengths.',
                  math: 'k=\\frac{25}{10}=2.5',
                },
                {
                  text: 'Apply the scale factor to the longer side.',
                  math: '15\\cdot2.5=37.5',
                },
                {
                  text: 'Calculate the area ratio using $k^2$.',
                  math: 'k^2=(2.5)^2=6.25',
                },
                {
                  text: 'Check with the actual areas. The original area is $10\\cdot15=150$ cm², and the new area is $25\\cdot37.5=937.5$ cm².',
                  math: '\\frac{937.5}{150}=6.25',
                },
              ],
              answer: 'The longer side is 37.5 cm. The new area is 6.25 times the original area.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using the scale factor $k$ instead of $k^2$ to compare areas.',
              correction:
                'Lengths scale by $k$, but area is two-dimensional. A figure enlarged by factor 3 has area multiplied by $3^2=9$, not by 3.',
            },
            {
              mistake: 'Declaring two triangles similar because two pairs of sides are proportional.',
              correction:
                'Side ratios alone do not guarantee similarity without the included angle or a third proportional side. Use AA, SAS similarity, or SSS similarity with all three pairs.',
            },
            {
              mistake: 'Matching the largest side of one triangle with the smallest side of the other.',
              correction:
                'Corresponding sides are identified by the order of vertices in the similarity statement. Match the sides opposite equal angles.',
            },
          ],
          exercises: [
            {
              id: 'g9-similarity-ex-1',
              type: 'multiple-choice',
              prompt: 'A figure is enlarged by a scale factor of 2. By what factor does its area increase?',
              options: ['$4$', '$2$', '$8$', '$16$'],
              correctOption: 0,
              hint: 'Area depends on two dimensions.',
              explanation: 'Area scales by $k^2$, so the factor is $2^2=4$. The perimeter would scale by 2.',
              difficulty: 'easy',
            },
            {
              id: 'g9-similarity-ex-2',
              type: 'numeric',
              prompt: 'A triangle has side lengths 5 cm, 7 cm, and 8 cm. It is enlarged by a scale factor of 3. What is the perimeter of the image in centimetres?',
              answer: 60,
              tolerance: 0.001,
              answerUnit: 'cm',
              hint: 'The original perimeter is $5+7+8$.',
              explanation:
                'The original perimeter is $20$ cm. Perimeter scales by $k$, so the image perimeter is $20\\cdot3=60$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g9-similarity-ex-3',
              type: 'multiple-choice',
              prompt: 'Which condition is sufficient to prove that two triangles are similar?',
              options: [
                'Two pairs of corresponding angles are equal',
                'One pair of corresponding sides is equal',
                'The triangles have the same perimeter',
                'Two pairs of corresponding sides are equal',
              ],
              correctOption: 0,
              hint: 'The third angle pair is forced by the angle sum.',
              explanation:
                'If two angle pairs are equal, the third pair must also be equal because each triangle sums to $180^{\\circ}$. This is AA similarity. Equal sides alone do not guarantee the same shape.',
              difficulty: 'easy',
            },
            {
              id: 'g9-similarity-ex-4',
              type: 'numeric',
              prompt: 'The point $(4,-6)$ is dilated about the origin by scale factor $\\frac12$. What is the $x$-coordinate of the image?',
              answer: 2,
              tolerance: 0.001,
              hint: 'Multiply each coordinate by the scale factor.',
              explanation:
                '$(4,-6)\\mapsto\\left(\\frac12\\cdot4,\\frac12\\cdot(-6)\\right)=(2,-3)$. The $x$-coordinate is 2.',
              difficulty: 'easy',
            },
            {
              id: 'g9-similarity-ex-5',
              type: 'multiple-choice',
              prompt: 'Two similar rectangles have areas 36 cm² and 81 cm². What is the ratio of a side of the smaller rectangle to the corresponding side of the larger rectangle?',
              options: ['$2:3$', '$4:9$', '$36:81$', '$3:2$'],
              correctOption: 0,
              hint: 'Take the square root of the area ratio.',
              explanation:
                'The area ratio is $\\frac{36}{81}=\\frac49$. The side ratio is $\\sqrt{\\frac49}=\\frac23$, or $2:3$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-similarity-ex-6',
              type: 'numeric',
              prompt: 'A map has scale $1:25000$. A path measures 4 cm on the map. What is its real length in kilometres?',
              answer: 1,
              tolerance: 0.001,
              answerUnit: 'km',
              hint: 'Multiply by 25000, then convert centimetres to kilometres.',
              explanation:
                'The real length is $4\\cdot25000=100000$ cm. Since $100000$ cm $=1000$ m $=1$ km, the path is 1 km long.',
              difficulty: 'medium',
            },
          ],
          related: ['congruence-and-transformations', 'pythagorean-theorem', 'distance-midpoint-slope'],
          aliases: ['similar figures', 'scale factor', 'AA similarity', 'enlargement and reduction'],
        },
        {
          id: 'circle-geometry',
          title: 'Circle Geometry',
          subtitle: 'Chords, arcs, and the angles they create.',
          introduction:
            'Circle geometry studies the angles, chords, arcs, and tangents inside and around a circle. Two relationships do most of the work: a central angle measures its intercepted arc, and an inscribed angle is half the central angle standing on the same arc. A tangent meets a radius at a right angle, and a perpendicular from the centre bisects a chord.',
          prerequisites: ['circles-intro', 'lines-angles-and-triangles', 'congruence-and-transformations'],
          keyIdeas: [
            'A central angle has the same measure as its intercepted arc.',
            'An inscribed angle is half the central angle subtending the same arc.',
            'An angle inscribed in a semicircle is $90^{\\circ}$.',
            'A tangent is perpendicular to the radius at the point of contact.',
            'A perpendicular from the centre to a chord bisects the chord.',
          ],
          theory: [
            {
              title: 'Parts of a circle',
              body: [
                'A circle is the set of points a fixed distance from a center. The radius joins the center to a point on the circle, and the diameter is twice the radius. A chord joins two points on the circle; a secant is a line through two points on the circle; a tangent touches the circle at exactly one point.',
                'An arc is a part of the circle. A minor arc is less than a semicircle, and a major arc is greater. Arc measure is given in degrees and describes the central angle that intercepts the arc; arc length is a distance and is measured in linear units. The two are related but not the same.',
              ],
              bullets: [
                'Central angle: vertex at the center, sides are radii.',
                'Inscribed angle: vertex on the circle, sides are chords.',
                'Tangent: a line meeting the circle at exactly one point.',
              ],
            },
            {
              title: 'Central and inscribed angles',
              body: [
                'A central angle such as $\\angle AOB$ has the same measure as its intercepted arc $\\widehat{AB}$. If the central angle is $120^{\\circ}$, the minor arc $AB$ measures $120^{\\circ}$.',
                'An inscribed angle with vertex on the circle and endpoints $A$ and $B$ measures half of the intercepted arc. Equivalently, it is half the central angle subtending the same arc. Two inscribed angles subtending the same arc are therefore equal.',
                'If $AB$ is a diameter, the inscribed angle $\\angle ACB$ is $90^{\\circ}$. This is the angle-in-a-semicircle case of the inscribed angle theorem. A reasoning outline: join $C$ to the centre $O$. The radii create two isosceles triangles, and adding their base angles shows that the angle at $C$ is half the straight angle at the centre.',
              ],
            },
            {
              title: 'Chords and tangents',
              body: [
                'A perpendicular drawn from the centre to a chord bisects the chord. This creates a right triangle whose hypotenuse is the radius, one leg is half the chord, and the other leg is the distance from the centre to the chord. The Pythagorean theorem then gives $r^2=d^2+\\left(\\frac{c}{2}\\right)^2$.',
                'A tangent is perpendicular to the radius at the point of contact. Tangent segments drawn from the same external point to the same circle are equal in length. These facts turn many tangent problems into right-triangle problems.',
              ],
              bullets: [
                'Radius to the point of contact is perpendicular to the tangent.',
                'A perpendicular from the centre bisects a chord.',
                'Do not confuse arc measure (degrees) with arc length (linear units).',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-circles-central-angle',
              title: 'Central angle and intercepted arc',
              expression: '\\theta_{\\text{central}}=m\\widehat{AB}',
              description: 'The measure of a central angle equals the measure of its intercepted arc.',
              spoken: 'The central angle theta equals the measure of arc A B.',
              variables: [
                { symbol: '\\theta_{\\text{central}}', name: 'central angle measure', unit: '°' },
                { symbol: 'm\\widehat{AB}', name: 'measure of the intercepted arc', unit: '°' },
              ],
              conditions: ['The angle vertex must be the circle centre, and the angle must intercept arc $AB$.'],
              notes: 'Arc measure is an angle measure in degrees, not the curved length of the arc.',
              tags: ['central angle', 'intercepted arc', 'arc measure', 'circle'],
            },
            {
              id: 'g9-circles-inscribed-angle',
              title: 'Inscribed angle theorem',
              expression: '\\theta_{\\text{inscribed}}=\\frac{1}{2}\\theta_{\\text{central}}',
              description: 'An inscribed angle is half the central angle that subtends the same arc.',
              spoken: 'The inscribed angle theta equals one half of the central angle.',
              variables: [
                { symbol: '\\theta_{\\text{inscribed}}', name: 'inscribed angle measure', unit: '°' },
                { symbol: '\\theta_{\\text{central}}', name: 'central angle measure on the same arc', unit: '°' },
              ],
              conditions: ['Both angles must intercept the same arc, with the inscribed vertex on the circle.'],
              notes: 'A diameter creates an inscribed angle of $90^{\\circ}$ because the central angle is a straight angle.',
              tags: ['inscribed angle', 'circle theorem', 'half central angle', 'semicircle angle'],
            },
            {
              id: 'g9-circles-tangent-radius',
              title: 'Tangent–radius perpendicularity',
              expression: 't\\perp OA',
              description: 'A tangent line is perpendicular to the radius at the point of contact.',
              spoken: 'The tangent line t is perpendicular to radius O A.',
              variables: [
                { symbol: 't', name: 'tangent line' },
                { symbol: 'O', name: 'centre of the circle' },
                { symbol: 'A', name: 'point of contact' },
              ],
              conditions: ['$A$ must be the single point where the tangent touches the circle.'],
              notes: 'Tangent segments from one external point to the same circle are equal in length.',
              tags: ['tangent', 'radius perpendicular', 'point of contact', 'circle tangent'],
            },
            {
              id: 'g9-circles-chord-distance',
              title: 'Radius, chord, and distance from the centre',
              expression: 'r^2=d^2+\\left(\\frac{c}{2}\\right)^2',
              description: 'A perpendicular from the centre bisects a chord, forming a right triangle with the radius.',
              spoken: 'r squared equals d squared plus c over two, squared.',
              variables: [
                { symbol: 'r', name: 'radius', unit: 'length units' },
                { symbol: 'd', name: 'distance from the centre to the chord', unit: 'length units' },
                { symbol: 'c', name: 'length of the chord', unit: 'length units' },
              ],
              conditions: ['The chord is not a diameter; if it is, $d=0$ and $c=2r$.', '$r>0$ and $0\\le d<r$.'],
              notes: 'Half the chord is one leg of the right triangle because the perpendicular bisects the chord.',
              tags: ['chord length', 'distance from centre', 'chord bisector', 'circle right triangle'],
            },
          ],
          examples: [
            {
              title: 'Relate an inscribed angle to a central angle',
              problem: 'In a circle, an inscribed angle $\\angle ACB$ measures $35^{\\circ}$ and intercepts arc $AB$. Find the central angle $\\angle AOB$ and the measure of arc $AB$.',
              given: ['$\\angle ACB=35^{\\circ}$.', 'Both angles intercept arc $AB$, and $O$ is the centre.'],
              steps: [
                {
                  text: 'Formula. The inscribed angle is half the central angle on the same arc.',
                  math: '\\theta_{\\text{central}}=2\\theta_{\\text{inscribed}}',
                },
                {
                  text: 'Substitute the inscribed angle.',
                  math: '\\theta_{\\text{central}}=2(35^{\\circ})',
                },
                {
                  text: 'Calculate the central angle.',
                  math: '\\theta_{\\text{central}}=70^{\\circ}',
                },
                {
                  text: 'Use the central-angle relationship for the arc.',
                  math: 'm\\widehat{AB}=70^{\\circ}',
                },
              ],
              answer: 'The central angle $\\angle AOB=70^{\\circ}$, and arc $AB$ measures $70^{\\circ}$.',
            },
            {
              title: 'Find the distance from the centre to a chord',
              problem: 'A circle has radius 10 cm. A chord is 16 cm long. Find the distance from the centre to the chord.',
              given: ['Radius $r=10$ cm.', 'Chord length $c=16$ cm.'],
              steps: [
                {
                  text: 'Formula. A perpendicular from the centre bisects the chord, so half the chord is one leg of a right triangle.',
                  math: 'r^2=d^2+\\left(\\frac{c}{2}\\right)^2',
                },
                {
                  text: 'Substitute $r=10$ and $c=16$.',
                  math: '10^2=d^2+\\left(\\frac{16}{2}\\right)^2',
                },
                {
                  text: 'Calculate the squares.',
                  math: '100=d^2+64',
                },
                {
                  text: 'Solve for $d^2$.',
                  math: 'd^2=36',
                },
                {
                  text: 'Take the positive square root because a distance is non-negative.',
                  math: 'd=6',
                },
              ],
              answer: 'The distance from the centre to the chord is 6 cm.',
            },
          ],
          mistakes: [
            {
              mistake: 'Doubling an inscribed angle instead of halving the central angle.',
              correction:
                'The inscribed angle is the smaller one: $\\theta_{\\text{inscribed}}=\\frac12\\theta_{\\text{central}}$. A $70^{\\circ}$ central angle gives a $35^{\\circ}$ inscribed angle, not $140^{\\circ}$.',
            },
            {
              mistake: 'Treating arc measure and arc length as the same quantity.',
              correction:
                'Arc measure is an angle in degrees; arc length is a distance along the circle. A $60^{\\circ}$ arc on a larger circle has a larger length but the same measure.',
            },
            {
              mistake: 'Assuming a tangent passes through the centre or meets the circle at two points.',
              correction:
                'A tangent touches the circle at exactly one point and is perpendicular to the radius at that point. A line through the centre that meets the circle twice is a secant.',
            },
          ],
          exercises: [
            {
              id: 'g9-circles-ex-1',
              type: 'multiple-choice',
              prompt: 'An inscribed angle measures $40^{\\circ}$. What is the measure of the central angle that subtends the same arc?',
              options: ['$80^{\\circ}$', '$20^{\\circ}$', '$40^{\\circ}$', '$160^{\\circ}$'],
              correctOption: 0,
              hint: 'The central angle is twice the inscribed angle.',
              explanation:
                'The inscribed angle is half the central angle, so the central angle is $2\\cdot40^{\\circ}=80^{\\circ}$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-circles-ex-2',
              type: 'multiple-choice',
              prompt: 'An angle is inscribed in a semicircle. What is its measure?',
              options: ['$90^{\\circ}$', '$45^{\\circ}$', '$60^{\\circ}$', '$180^{\\circ}$'],
              correctOption: 0,
              hint: 'The central angle on a diameter is $180^{\\circ}$.',
              explanation:
                'The arc is a semicircle, so the central angle is $180^{\\circ}$. The inscribed angle is half of that, or $90^{\\circ}$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-circles-ex-3',
              type: 'numeric',
              prompt: 'A central angle measures $130^{\\circ}$. What is the measure in degrees of an inscribed angle that intercepts the same arc?',
              answer: 65,
              tolerance: 0.001,
              answerUnit: '°',
              hint: 'Halve the central angle.',
              explanation: 'The inscribed angle is $\\frac12\\cdot130^{\\circ}=65^{\\circ}$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-circles-ex-4',
              type: 'numeric',
              prompt: 'A circle has radius 13 cm and a chord of length 24 cm. Find the distance from the centre to the chord in centimetres.',
              answer: 5,
              tolerance: 0.001,
              answerUnit: 'cm',
              hint: 'Half the chord is 12 cm; use the Pythagorean theorem.',
              explanation:
                '$r^2=d^2+\\left(\\frac{c}{2}\\right)^2$ gives $169=d^2+144$, so $d^2=25$ and $d=5$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g9-circles-ex-5',
              type: 'multiple-choice',
              prompt: 'What is the angle between a tangent and the radius drawn to the point of contact?',
              options: ['$90^{\\circ}$', '$45^{\\circ}$', '$180^{\\circ}$', '$0^{\\circ}$'],
              correctOption: 0,
              hint: 'Apply the tangent–radius theorem.',
              explanation:
                'A tangent is perpendicular to the radius at the point of contact, so the angle is $90^{\\circ}$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-circles-ex-6',
              type: 'multiple-choice',
              prompt: 'Two inscribed angles intercept the same arc. How are their measures related?',
              options: ['They are equal', 'They are supplementary', 'They are complementary', 'One is twice the other'],
              correctOption: 0,
              hint: 'Both are half of the same central angle.',
              explanation:
                'Each inscribed angle is half the central angle that subtends the arc. Since the central angle is fixed, the two inscribed angles are equal.',
              difficulty: 'medium',
            },
          ],
          related: ['circles-intro', 'circle-theorems', 'pythagorean-theorem'],
          aliases: ['circle theorems', 'inscribed angles', 'chords and arcs', 'tangent lines'],
        },
        {
          id: 'surface-area-and-volume',
          title: 'Surface Area and Volume of Solids',
          subtitle: 'Cylinders, cones, and spheres in exact and approximate form.',
          introduction:
            'Three-dimensional measurement extends area and perimeter into space. A solid’s surface area is the total area of its outside surfaces, measured in square units. Its volume is the space it encloses, measured in cubic units. This topic covers cylinders, cones, and spheres, where exact answers are usually written as multiples of $\\pi$ and then approximated to two decimal places.',
          prerequisites: ['prisms-and-cubes', 'circles-intro', 'pythagorean-theorem'],
          keyIdeas: [
            'Cylinder volume: $V=\\pi r^2h$.',
            'Cone volume: $V=\\frac13\\pi r^2h$; its slant height satisfies $\\ell^2=r^2+h^2$.',
            'Sphere volume: $V=\\frac43\\pi r^3$; surface area: $S=4\\pi r^2$.',
            'Exact answers keep $\\pi$; approximations use $\\approx$ and at most two decimal places.',
            'Surface area uses square units; volume uses cubic units.',
          ],
          theory: [
            {
              title: 'Cylinders',
              body: [
                'A cylinder is a stack of congruent circular bases. The base area is $\\pi r^2$, and stacking it through a height $h$ gives volume $V=\\pi r^2h$.',
                'Its surface area has three parts: the top circle, the bottom circle, and the curved side. Cutting the side open produces a rectangle of width $2\\pi r$ (the circumference) and height $h$, so the lateral area is $2\\pi rh$. The total surface area is $S=2\\pi r^2+2\\pi rh$.',
              ],
            },
            {
              title: 'Cones and slant height',
              body: [
                'A cone has one circular base and a vertex. Its volume is one-third of the cylinder with the same base and height: $V=\\frac13\\pi r^2h$.',
                'The slant height $\\ell$ is the distance from the vertex to a point on the base edge. It is the hypotenuse of a right triangle with legs $r$ and $h$, so $\\ell^2=r^2+h^2$. The surface area is the base plus the curved lateral surface: $S=\\pi r^2+\\pi r\\ell$. Using the vertical height $h$ in place of $\\ell$ is incorrect.',
              ],
            },
            {
              title: 'Spheres and composite solids',
              body: [
                'A sphere of radius $r$ has volume $V=\\frac43\\pi r^3$ and surface area $S=4\\pi r^2$. A hemisphere has half the volume, $\\frac23\\pi r^3$. If the flat circular face is included, the total surface area of a closed hemisphere is $2\\pi r^2+\\pi r^2=3\\pi r^2$.',
                'Composite solids are handled by splitting them into non-overlapping pieces. Add the volumes of the pieces. For surface area, add the exposed areas and subtract any surfaces hidden where the pieces meet. State the units with every answer.',
              ],
              bullets: [
                'Keep $\\pi$ exact until the final approximation.',
                'Use $\\text{cm}^2$ for area and $\\text{cm}^3$ for volume.',
                'A diameter must be halved before it is used as $r$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-solids-cylinder',
              title: 'Volume of a cylinder',
              expression: 'V=\\pi r^2h',
              description: 'The volume of a cylinder is the base area times the height.',
              spoken: 'V equals pi r squared h.',
              variables: [
                { symbol: 'V', name: 'volume', unit: 'unit³' },
                { symbol: 'r', name: 'base radius', unit: 'length units', note: 'must be positive' },
                { symbol: 'h', name: 'height', unit: 'length units', note: 'must be positive' },
              ],
              conditions: ['$r>0$ and $h>0$.'],
              notes: 'Total surface area: $S=2\\pi r^2+2\\pi rh$.',
              tags: ['cylinder volume', 'pi r squared h', 'solid volume', 'cylinder'],
            },
            {
              id: 'g9-solids-cone',
              title: 'Volume of a cone',
              expression: 'V=\\frac{1}{3}\\pi r^2h',
              description: 'The volume of a cone is one-third of the cylinder with the same base radius and height.',
              spoken: 'V equals one third pi r squared h.',
              variables: [
                { symbol: 'V', name: 'volume', unit: 'unit³' },
                { symbol: 'r', name: 'base radius', unit: 'length units', note: 'must be positive' },
                { symbol: 'h', name: 'vertical height', unit: 'length units', note: 'must be positive' },
                { symbol: '\\ell', name: 'slant height', unit: 'length units', note: 'used in surface area' },
              ],
              conditions: ['$r>0$ and $h>0$.', 'The slant height satisfies $\\ell^2=r^2+h^2$.'],
              notes: 'Surface area: $S=\\pi r^2+\\pi r\\ell$. The lateral term uses slant height, not vertical height.',
              tags: ['cone volume', 'one third cylinder', 'slant height', 'cone surface area'],
            },
            {
              id: 'g9-solids-sphere-volume',
              title: 'Volume of a sphere',
              expression: 'V=\\frac{4}{3}\\pi r^3',
              description: 'The volume of a sphere depends on the cube of its radius.',
              spoken: 'V equals four thirds pi r cubed.',
              variables: [
                { symbol: 'V', name: 'volume', unit: 'unit³' },
                { symbol: 'r', name: 'radius', unit: 'length units', note: 'must be positive' },
              ],
              conditions: ['$r>0$.'],
              notes: 'Doubling the radius multiplies the volume by $2^3=8$.',
              tags: ['sphere volume', 'four thirds pi r cubed', 'solid sphere'],
            },
            {
              id: 'g9-solids-sphere-surface',
              title: 'Surface area of a sphere',
              expression: 'S=4\\pi r^2',
              description: 'The surface area of a sphere is four times the area of its great circle.',
              spoken: 'S equals four pi r squared.',
              variables: [
                { symbol: 'S', name: 'surface area', unit: 'unit²' },
                { symbol: 'r', name: 'radius', unit: 'length units', note: 'must be positive' },
              ],
              conditions: ['$r>0$.'],
              notes: 'Doubling the radius multiplies the surface area by $2^2=4$.',
              tags: ['sphere surface area', 'four pi r squared', 'surface area'],
            },
          ],
          examples: [
            {
              title: 'Cylinder volume and surface area',
              problem: 'A cylinder has radius 3 cm and height 10 cm. Find its exact volume and total surface area, then approximate both.',
              given: ['Radius $r=3$ cm.', 'Height $h=10$ cm.'],
              steps: [
                {
                  text: 'Formula for volume. Use $V=\\pi r^2h$.',
                  math: 'V=\\pi(3)^2(10)',
                },
                {
                  text: 'Calculate the exact volume.',
                  math: 'V=90\\pi\\ \\text{cm}^3',
                },
                {
                  text: 'Formula for surface area. Use $S=2\\pi r^2+2\\pi rh$.',
                  math: 'S=2\\pi(3)^2+2\\pi(3)(10)',
                },
                {
                  text: 'Calculate the exact surface area.',
                  math: 'S=18\\pi+60\\pi=78\\pi\\ \\text{cm}^2',
                },
                {
                  text: 'Approximate using $\\pi\\approx3.14159$.',
                  math: 'V\\approx282.74\\ \\text{cm}^3,\\qquad S\\approx245.04\\ \\text{cm}^2',
                },
              ],
              answer: '$V=90\\pi\\approx282.74$ cm³ and $S=78\\pi\\approx245.04$ cm².',
            },
            {
              title: 'Cone volume and surface area',
              problem: 'A cone has radius 5 cm and vertical height 12 cm. Find its slant height, exact volume, and exact total surface area.',
              given: ['Radius $r=5$ cm.', 'Vertical height $h=12$ cm.'],
              steps: [
                {
                  text: 'Formula for slant height. Use the right triangle with legs $r$ and $h$.',
                  math: '\\ell=\\sqrt{r^2+h^2}',
                },
                {
                  text: 'Substitute and calculate.',
                  math: '\\ell=\\sqrt{5^2+12^2}=\\sqrt{25+144}=\\sqrt{169}=13\\ \\text{cm}',
                },
                {
                  text: 'Formula for volume. Use $V=\\frac13\\pi r^2h$.',
                  math: 'V=\\frac13\\pi(5)^2(12)=100\\pi\\ \\text{cm}^3',
                },
                {
                  text: 'Formula for surface area. Use $S=\\pi r^2+\\pi r\\ell$.',
                  math: 'S=\\pi(5)^2+\\pi(5)(13)',
                },
                {
                  text: 'Calculate the exact surface area.',
                  math: 'S=25\\pi+65\\pi=90\\pi\\ \\text{cm}^2',
                },
                {
                  text: 'Approximate both answers.',
                  math: 'V\\approx314.16\\ \\text{cm}^3,\\qquad S\\approx282.74\\ \\text{cm}^2',
                },
              ],
              answer: '$\\ell=13$ cm, $V=100\\pi\\approx314.16$ cm³, and $S=90\\pi\\approx282.74$ cm².',
            },
          ],
          mistakes: [
            {
              mistake: 'Using the diameter as the radius in a volume formula.',
              correction:
                'The formulas use the radius. If the diameter is given, halve it first: $r=\\frac d2$. Using the full diameter makes the volume too large by a factor of 4 for a cylinder or cone, and by 8 for a sphere.',
            },
            {
              mistake: 'Using the vertical height $h$ instead of the slant height $\\ell$ in the cone’s lateral area.',
              correction:
                'The curved surface unrolls to a sector whose boundary is the slant height. Use $S=\\pi r^2+\\pi r\\ell$, with $\\ell=\\sqrt{r^2+h^2}$.',
            },
            {
              mistake: 'Writing cm² for a volume or cm³ for a surface area.',
              correction:
                'Surface area counts square units because it covers two-dimensional surfaces; volume counts cubic units because it fills three-dimensional space.',
            },
          ],
          exercises: [
            {
              id: 'g9-solids-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the exact volume of a sphere with radius 3 cm?',
              options: ['$36\\pi\\ \\text{cm}^3$', '$12\\pi\\ \\text{cm}^3$', '$9\\pi\\ \\text{cm}^3$', '$108\\pi\\ \\text{cm}^3$'],
              correctOption: 0,
              hint: 'Use $V=\\frac43\\pi r^3$.',
              explanation:
                '$V=\\frac43\\pi(3)^3=\\frac43\\pi(27)=36\\pi$ cm³. The option $108\\pi$ comes from forgetting the factor $\\frac13$ in $\\frac43$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-solids-ex-2',
              type: 'numeric',
              prompt: 'A cylinder has radius 2 cm and height 5 cm. Find its volume in cubic centimetres, rounded to two decimal places.',
              answer: 62.83,
              tolerance: 0.05,
              answerUnit: 'cm³',
              hint: 'Compute $V=20\\pi$ and then multiply by $\\pi$.',
              explanation:
                '$V=\\pi(2)^2(5)=20\\pi\\approx62.83$ cm³. Keep $\\pi$ exact until the final multiplication.',
              difficulty: 'medium',
            },
            {
              id: 'g9-solids-ex-3',
              type: 'numeric',
              prompt: 'A cone has radius 3 cm and height 4 cm. Find its volume in cubic centimetres, rounded to two decimal places.',
              answer: 37.7,
              tolerance: 0.05,
              answerUnit: 'cm³',
              hint: 'The volume is $\\frac13\\pi(3)^2(4)=12\\pi$.',
              explanation: '$V=\\frac13\\pi(9)(4)=12\\pi\\approx37.70$ cm³.',
              difficulty: 'medium',
            },
            {
              id: 'g9-solids-ex-4',
              type: 'multiple-choice',
              prompt: 'If the radius of a sphere is doubled, by what factor does its volume increase?',
              options: ['$8$', '$2$', '$4$', '$16$'],
              correctOption: 0,
              hint: 'Volume depends on the cube of the radius.',
              explanation:
                'Replacing $r$ by $2r$ gives $V=\\frac43\\pi(2r)^3=\\frac43\\pi\\cdot8r^3=8\\left(\\frac43\\pi r^3\\right)$. The volume is 8 times as large.',
              difficulty: 'easy',
            },
            {
              id: 'g9-solids-ex-5',
              type: 'numeric',
              prompt: 'A solid consists of a cylinder of radius 3 cm and height 10 cm with a cone of radius 3 cm and height 4 cm placed on top. Find the total volume in cubic centimetres, rounded to two decimal places.',
              answer: 320.44,
              tolerance: 0.1,
              answerUnit: 'cm³',
              hint: 'Add the cylinder volume and the cone volume; both have radius 3.',
              explanation:
                'Cylinder: $\\pi(3)^2(10)=90\\pi$. Cone: $\\frac13\\pi(3)^2(4)=12\\pi$. Total $=102\\pi\\approx320.44$ cm³.',
              difficulty: 'hard',
            },
            {
              id: 'g9-solids-ex-6',
              type: 'multiple-choice',
              prompt: 'A sphere has surface area $100\\pi$ cm². What is its radius?',
              options: ['$5$ cm', '$10$ cm', '$25$ cm', '$50$ cm'],
              correctOption: 0,
              hint: 'Set $4\\pi r^2=100\\pi$ and solve for $r$.',
              explanation:
                'Dividing by $4\\pi$ gives $r^2=25$, so $r=5$ cm. The radius must be positive.',
              difficulty: 'medium',
            },
          ],
          related: ['prisms-and-cubes', 'circles-intro', 'pythagorean-theorem'],
          aliases: ['volume of solids', 'surface area', 'cylinder cone sphere', 'solid measurement'],
        },
      ],
      theorems: [
        {
          title: 'AA Similarity Theorem',
          statement:
            'If two angles of one triangle are congruent to two angles of another triangle, then the triangles are similar.',
          note: 'The third pair is forced by the $180^{\\circ}$ angle sum, so two pairs are enough.',
        },
        {
          title: 'Inscribed Angle Theorem',
          statement:
            'An angle inscribed in a circle is half the measure of the central angle that subtends the same arc.',
        },
        {
          title: 'Tangent–Radius Theorem',
          statement:
            'A tangent to a circle is perpendicular to the radius drawn to the point of contact.',
        },
        {
          title: 'Perpendicular Chord Bisector Theorem',
          statement:
            'A radius or line through the centre that is perpendicular to a chord bisects the chord.',
        },
      ],
    },
    {
      id: 'coordinate-geometry',
      family: 'coordinate-geometry',
      title: 'Coordinate Geometry',
      description:
        'The Cartesian plane gives points numerical addresses. Distance, midpoint, and slope turn geometric questions about segments into algebra.',
      topics: [
        {
          id: 'cartesian-plane',
          title: 'The Cartesian Plane',
          subtitle: 'Plot points, read quadrants, and draw horizontal and vertical lines.',
          introduction:
            'The Cartesian plane turns pairs of numbers into points. Two perpendicular number lines — the x-axis and the y-axis — meet at the origin, and every point has an address $(x,y)$. This coordinate system is the bridge between algebra and geometry: equations become graphs, and geometric figures can be described by coordinates.',
          prerequisites: ['integers', 'linear-functions', 'rational-numbers'],
          keyIdeas: [
            'The ordered pair $(x,y)$ lists the horizontal coordinate first.',
            'The origin is $(0,0)$; the axes divide the plane into four quadrants.',
            'Quadrant signs, in order I to IV, are $(+,+)$, $(-,+)$, $(-,-)$, and $(+,-)$.',
            'The line $x=a$ is vertical, and the line $y=b$ is horizontal.',
            'Points on an axis belong to no quadrant.',
          ],
          theory: [
            {
              title: 'Axes and ordered pairs',
              body: [
                'The horizontal number line is the x-axis, and the vertical number line is the y-axis. Their intersection is the origin $(0,0)$. An ordered pair $(x,y)$ records a horizontal displacement $x$ and a vertical displacement $y$. Positive $x$ is to the right, negative $x$ is to the left, positive $y$ is up, and negative $y$ is down.',
                'The order matters. The point $(3,-2)$ is 3 units right and 2 units down, while $(-2,3)$ is 2 units left and 3 units up. These are different points.',
              ],
            },
            {
              title: 'The four quadrants',
              body: [
                'The axes divide the plane into four regions called quadrants, numbered counterclockwise beginning at the upper right. Knowing the signs of the coordinates locates a point without plotting it.',
                'A point with a zero coordinate lies on an axis and is not assigned to any quadrant. For example, $(0,-3)$ lies on the negative y-axis.',
              ],
              bullets: [
                'Quadrant I: $x>0$, $y>0$.',
                'Quadrant II: $x<0$, $y>0$.',
                'Quadrant III: $x<0$, $y<0$.',
                'Quadrant IV: $x>0$, $y<0$.',
              ],
            },
            {
              title: 'Horizontal and vertical lines',
              body: [
                'Every point with the same x-coordinate lies on a vertical line. The equation $x=a$ describes the vertical line through $(a,0)$. Every point with the same y-coordinate lies on a horizontal line; the equation $y=b$ describes the horizontal line through $(0,b)$.',
                'The distance between two points on a horizontal line is the absolute difference of their x-coordinates. On a vertical line, it is the absolute difference of their y-coordinates. These simple distances are special cases of the distance formula.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-cartesian-quadrants',
              title: 'Sign patterns by quadrant',
              expression: '\\text{I }(+,+),\\quad \\text{II }(-,+),\\quad \\text{III }(-,-),\\quad \\text{IV }(+,-)',
              description: 'The signs of the coordinates identify the quadrant containing a point.',
              spoken: 'Quadrant one is plus plus, quadrant two is minus plus, quadrant three is minus minus, and quadrant four is plus minus.',
              variables: [
                { symbol: 'x', name: 'horizontal coordinate' },
                { symbol: 'y', name: 'vertical coordinate' },
              ],
              conditions: ['Both coordinates must be nonzero; points on an axis are not in a quadrant.'],
              notes: 'Quadrants are numbered counterclockwise starting from the upper right.',
              tags: ['quadrants', 'coordinate signs', 'cartesian plane', 'ordered pairs'],
            },
            {
              id: 'g9-cartesian-vertical-line',
              title: 'Equation of a vertical line',
              expression: 'x=a',
              description: 'All points on a vertical line share the same x-coordinate.',
              spoken: 'x equals a.',
              variables: [{ symbol: 'a', name: 'constant x-coordinate' }],
              conditions: ['The line is vertical and is not a function of $x$ unless written as a relation.'],
              notes: 'The line $x=0$ is the y-axis.',
              tags: ['vertical line', 'x equals a', 'coordinate geometry', 'graphing lines'],
            },
            {
              id: 'g9-cartesian-horizontal-line',
              title: 'Equation of a horizontal line',
              expression: 'y=b',
              description: 'All points on a horizontal line share the same y-coordinate.',
              spoken: 'y equals b.',
              variables: [{ symbol: 'b', name: 'constant y-coordinate' }],
              conditions: ['The line is horizontal and has slope 0.'],
              notes: 'The line $y=0$ is the x-axis.',
              tags: ['horizontal line', 'y equals b', 'coordinate geometry', 'graphing lines'],
            },
          ],
          examples: [
            {
              title: 'Identify quadrants from coordinates',
              problem: 'State the quadrant of each point: $(3,4)$, $(-2,5)$, $(-1,-6)$, $(4,-2)$, and $(0,-3)$.',
              given: ['The five points are $(3,4)$, $(-2,5)$, $(-1,-6)$, $(4,-2)$, and $(0,-3)$.', 'A point with a zero coordinate lies on an axis.'],
              steps: [
                {
                  text: 'Formula. Read the signs of the coordinates and match them to the quadrant pattern.',
                },
                {
                  text: 'For $(3,4)$, both coordinates are positive.',
                  math: '(+,+)\\Rightarrow \\text{Quadrant I}',
                },
                {
                  text: 'For $(-2,5)$, the x-coordinate is negative and the y-coordinate is positive.',
                  math: '(-,+)\\Rightarrow \\text{Quadrant II}',
                },
                {
                  text: 'For $(-1,-6)$, both coordinates are negative.',
                  math: '(-,-)\\Rightarrow \\text{Quadrant III}',
                },
                {
                  text: 'For $(4,-2)$, the x-coordinate is positive and the y-coordinate is negative.',
                  math: '(+,-)\\Rightarrow \\text{Quadrant IV}',
                },
                {
                  text: 'For $(0,-3)$, the x-coordinate is zero, so the point is on the y-axis and in no quadrant.',
                },
              ],
              answer: '$(3,4)$ is in Quadrant I; $(-2,5)$ is in Quadrant II; $(-1,-6)$ is in Quadrant III; $(4,-2)$ is in Quadrant IV; $(0,-3)$ lies on the negative y-axis and is in no quadrant.',
            },
            {
              title: 'Describe a vertical segment',
              problem: 'The segment from $A(2,-1)$ to $B(2,4)$ lies on a vertical line. Find its length and the equation of the line.',
              given: ['$A(2,-1)$ and $B(2,4)$.', 'Both points have the same x-coordinate, 2.'],
              steps: [
                {
                  text: 'Formula. Points with the same x-coordinate lie on the vertical line $x=a$.',
                  math: 'x=2',
                },
                {
                  text: 'The length of a vertical segment is the absolute difference of the y-coordinates.',
                  math: 'AB=|4-(-1)|',
                },
                {
                  text: 'Calculate the difference.',
                  math: 'AB=|4+1|=5',
                },
                {
                  text: 'Check that the order does not change the distance.',
                  math: '|-1-4|=|-5|=5',
                },
              ],
              answer: 'The segment is 5 units long, and its line has equation $x=2$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Plotting $(3,5)$ by moving 3 units up and 5 units right.',
              correction:
                'The first coordinate is always horizontal and the second is vertical. Move 3 units right and 5 units up.',
            },
            {
              mistake: 'Numbering the quadrants clockwise, so that the upper left is called Quadrant IV.',
              correction:
                'Quadrants are numbered counterclockwise from the upper right: I, II, III, IV. The upper left is Quadrant II.',
            },
            {
              mistake: 'Drawing $x=3$ as a horizontal line.',
              correction:
                'The equation $x=3$ fixes the horizontal coordinate, so the line is vertical. The equation $y=3$ is horizontal.',
            },
          ],
          exercises: [
            {
              id: 'g9-cartesian-ex-1',
              type: 'multiple-choice',
              prompt: 'In which quadrant does the point $(-4,2)$ lie?',
              options: ['Quadrant II', 'Quadrant I', 'Quadrant III', 'Quadrant IV'],
              correctOption: 0,
              hint: 'The x-coordinate is negative and the y-coordinate is positive.',
              explanation: 'The sign pattern $(-,+)$ is Quadrant II, the upper-left region.',
              difficulty: 'easy',
            },
            {
              id: 'g9-cartesian-ex-2',
              type: 'multiple-choice',
              prompt: 'What is the equation of the vertical line through $(5,-1)$?',
              options: ['$x=5$', '$y=-1$', '$x=-1$', '$y=5$'],
              correctOption: 0,
              hint: 'A vertical line fixes the x-coordinate.',
              explanation:
                'Every point on the vertical line has x-coordinate 5, so the equation is $x=5$. The equation $y=-1$ would be horizontal.',
              difficulty: 'easy',
            },
            {
              id: 'g9-cartesian-ex-3',
              type: 'numeric',
              prompt: 'Find the distance between $(2,3)$ and $(2,-4)$ along their vertical line.',
              answer: 7,
              tolerance: 0.001,
              hint: 'Subtract the y-coordinates and take the absolute value.',
              explanation: 'Both points have $x=2$, so the distance is $|3-(-4)|=|7|=7$ units.',
              difficulty: 'easy',
            },
            {
              id: 'g9-cartesian-ex-4',
              type: 'multiple-choice',
              prompt: 'Which point lies on the line $y=-3$?',
              options: ['$(0,-3)$', '$(-3,0)$', '$(3,3)$', '$(3,0)$'],
              correctOption: 0,
              hint: 'A point on $y=-3$ must have y-coordinate $-3$.',
              explanation:
                'Only $(0,-3)$ has y-coordinate $-3$. The point $(-3,0)$ lies on the x-axis, and $(3,0)$ also lies on the x-axis.',
              difficulty: 'medium',
            },
            {
              id: 'g9-cartesian-ex-5',
              type: 'numeric',
              prompt: 'The point $P(2a,a-1)$ lies on the x-axis. Find $a$.',
              answer: 1,
              tolerance: 0.001,
              hint: 'A point on the x-axis has y-coordinate 0.',
              explanation: 'Set $a-1=0$, so $a=1$. The point is then $(2,0)$, which lies on the x-axis.',
              difficulty: 'hard',
            },
            {
              id: 'g9-cartesian-ex-6',
              type: 'multiple-choice',
              prompt: 'Where does the point $(0,5)$ lie?',
              options: ['On the y-axis, in no quadrant', 'Quadrant I', 'Quadrant II', 'Quadrant IV'],
              correctOption: 0,
              hint: 'One coordinate is zero.',
              explanation:
                'The x-coordinate is 0, so the point lies on the y-axis. Points on an axis are not assigned to a quadrant.',
              difficulty: 'medium',
            },
          ],
          related: ['linear-functions', 'distance-midpoint-slope', 'integers'],
          aliases: ['coordinate plane', 'plotting points', 'quadrants', 'x and y axes'],
        },
        {
          id: 'distance-midpoint-slope',
          title: 'Distance, Midpoint, and Slope',
          subtitle: 'Measure and describe segments on the coordinate plane.',
          introduction:
            'Three formulas describe a segment on the coordinate plane: the distance formula gives its length, the midpoint formula gives its centre, and the slope formula gives its steepness. The distance formula is the Pythagorean theorem in disguise. Together these tools let us compare segments and classify figures without drawing them to scale.',
          prerequisites: ['pythagorean-theorem', 'cartesian-plane', 'radical-expressions'],
          keyIdeas: [
            'Distance: $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.',
            'Midpoint: average the x-coordinates and the y-coordinates separately.',
            'Slope: $m=\\frac{y_2-y_1}{x_2-x_1}$, with $x_1\\ne x_2$.',
            'A horizontal line has slope 0; a vertical line has undefined slope.',
            'Simplify radicals and include units when the context gives them.',
          ],
          theory: [
            {
              title: 'Distance is Pythagoras',
              body: [
                'For points $A(x_1,y_1)$ and $B(x_2,y_2)$, draw a horizontal segment and a vertical segment to form a right triangle with hypotenuse $AB$. The legs have lengths $|x_2-x_1|$ and $|y_2-y_1|$. The Pythagorean theorem then gives $AB^2=(x_2-x_1)^2+(y_2-y_1)^2$.',
                'Taking the non-negative square root gives the distance formula. The order of subtraction does not matter because each difference is squared, but the x-differences and y-differences must come from the same pair of points.',
              ],
            },
            {
              title: 'Midpoint',
              body: [
                'The midpoint of a segment is the point halfway between its endpoints. Its coordinates are the averages of the endpoints’ coordinates: $M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$.',
                'The formula also works backwards. If one endpoint and the midpoint are known, double the midpoint coordinates and subtract the known endpoint to find the other endpoint.',
              ],
            },
            {
              title: 'Slope',
              body: [
                'Slope measures the change in $y$ per unit change in $x$: $m=\\frac{y_2-y_1}{x_2-x_1}$. It is often called rise over run. A positive slope rises from left to right, a negative slope falls, and a horizontal line has slope 0.',
                'A vertical line has no defined slope because $x_2-x_1=0$, and division by zero is undefined. Slope also carries units: if $y$ is cost in dollars and $x$ is time in hours, the slope is dollars per hour.',
                'Equal slopes indicate parallel lines. In Grade 10, perpendicular slopes are developed further: their product is $-1$ when neither line is vertical.',
              ],
              bullets: [
                'Positive slope: rises left to right.',
                'Negative slope: falls left to right.',
                'Zero slope: horizontal line.',
                'Undefined slope: vertical line.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-distance-formula',
              title: 'Distance formula',
              expression: 'd=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}',
              description: 'The distance between two points is the length of the hypotenuse of the right triangle formed by their coordinate differences.',
              spoken: 'd equals the square root of x two minus x one squared plus y two minus y one squared.',
              variables: [
                { symbol: '(x_1,y_1)', name: 'first point' },
                { symbol: '(x_2,y_2)', name: 'second point' },
                { symbol: 'd', name: 'distance between the points', unit: 'length units' },
              ],
              conditions: ['The formula applies in the coordinate plane; $d\\ge0$.'],
              notes: 'The differences are squared, so either point may be used first.',
              tags: ['distance formula', 'distance between points', 'coordinate distance', 'pythagorean distance'],
            },
            {
              id: 'g9-distance-midpoint',
              title: 'Midpoint formula',
              expression: 'M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)',
              description: 'The midpoint coordinates are the averages of the endpoint coordinates.',
              spoken: 'The midpoint M is x one plus x two over two, comma y one plus y two over two.',
              variables: [
                { symbol: '(x_1,y_1)', name: 'first endpoint' },
                { symbol: '(x_2,y_2)', name: 'second endpoint' },
                { symbol: 'M', name: 'midpoint of the segment' },
              ],
              conditions: ['The endpoints must be distinct for a non-degenerate segment.'],
              notes: 'The midpoint is equidistant from both endpoints.',
              tags: ['midpoint formula', 'midpoint of a segment', 'average coordinates'],
            },
            {
              id: 'g9-distance-slope',
              title: 'Slope of a segment',
              expression: 'm=\\frac{y_2-y_1}{x_2-x_1}',
              description: 'Slope is the vertical change divided by the horizontal change between two points.',
              spoken: 'm equals y two minus y one, divided by x two minus x one.',
              variables: [
                { symbol: '(x_1,y_1)', name: 'first point' },
                { symbol: '(x_2,y_2)', name: 'second point' },
                { symbol: 'm', name: 'slope', note: 'undefined when the segment is vertical' },
              ],
              conditions: ['$x_1\\ne x_2$; if $x_1=x_2$, the slope is undefined.'],
              notes: 'Keep the subtraction order consistent in the numerator and denominator.',
              tags: ['slope formula', 'rise over run', 'gradient', 'undefined slope'],
            },
          ],
          examples: [
            {
              title: 'Distance, midpoint, and slope of one segment',
              problem: 'For $A(-2,1)$ and $B(4,9)$, find the length of $AB$, the midpoint of $AB$, and the slope of $AB$.',
              given: ['$A(-2,1)$ and $B(4,9)$.', 'The segment is not vertical because the x-coordinates differ.'],
              steps: [
                {
                  text: 'Formula for distance. Substitute the coordinates into $d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.',
                  math: 'd=\\sqrt{(4-(-2))^2+(9-1)^2}',
                },
                {
                  text: 'Calculate the differences and their squares.',
                  math: 'd=\\sqrt{6^2+8^2}=\\sqrt{36+64}=\\sqrt{100}=10',
                },
                {
                  text: 'Formula for midpoint. Average the coordinates.',
                  math: 'M=\\left(\\frac{-2+4}{2},\\frac{1+9}{2}\\right)',
                },
                {
                  text: 'Calculate the midpoint.',
                  math: 'M=(1,5)',
                },
                {
                  text: 'Formula for slope and substitute.',
                  math: 'm=\\frac{9-1}{4-(-2)}=\\frac{8}{6}=\\frac43',
                },
                {
                  text: 'Check that the midpoint divides the segment into equal halves using the distance formula.',
                  math: 'AM=\\sqrt{3^2+4^2}=5,\\qquad MB=\\sqrt{3^2+4^2}=5',
                },
              ],
              answer: '$AB=10$ units, the midpoint is $M(1,5)$, and the slope is $\\frac43$.',
            },
            {
              title: 'A vertical segment',
              problem: 'For $C(3,-2)$ and $D(3,5)$, find the distance, midpoint, and slope of $CD$.',
              given: ['$C(3,-2)$ and $D(3,5)$.', 'Both x-coordinates are 3, so the segment is vertical.'],
              steps: [
                {
                  text: 'Formula for distance. Substitute the coordinates.',
                  math: 'd=\\sqrt{(3-3)^2+(5-(-2))^2}',
                },
                {
                  text: 'Calculate the distance.',
                  math: 'd=\\sqrt{0+7^2}=7',
                },
                {
                  text: 'Formula for midpoint and substitute.',
                  math: 'M=\\left(\\frac{3+3}{2},\\frac{-2+5}{2}\\right)=(3,1.5)',
                },
                {
                  text: 'Formula for slope. The denominator is zero.',
                  math: 'm=\\frac{5-(-2)}{3-3}=\\frac{7}{0}',
                },
                {
                  text: 'Interpret the result. Division by zero is undefined, so the slope does not exist.',
                },
              ],
              answer: '$CD=7$ units, the midpoint is $(3,1.5)$, and the slope is undefined.',
            },
          ],
          mistakes: [
            {
              mistake: 'Mixing the subtraction order, using $x_2-x_1$ in the numerator but $y_1-y_2$ in the denominator.',
              correction:
                'Choose one point as point 1 and the other as point 2. Subtract in the same order for both coordinates before dividing.',
            },
            {
              mistake: 'Forgetting to square both coordinate differences in the distance formula.',
              correction:
                'The distance formula uses $(x_2-x_1)^2+(y_2-y_1)^2$ under the root. Adding the differences without squaring gives the wrong length.',
            },
            {
              mistake: 'Saying a vertical line has slope 0.',
              correction:
                'A horizontal line has slope 0 because the vertical change is zero. A vertical line has undefined slope because the horizontal change is zero.',
            },
          ],
          exercises: [
            {
              id: 'g9-distance-ex-1',
              type: 'multiple-choice',
              prompt: 'Find the distance from $(0,0)$ to $(3,4)$.',
              options: ['$5$', '$7$', '$25$', '$\\sqrt7$'],
              correctOption: 0,
              hint: 'Use the distance formula with one point at the origin.',
              explanation: '$d=\\sqrt{3^2+4^2}=\\sqrt{9+16}=\\sqrt{25}=5$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-distance-ex-2',
              type: 'multiple-choice',
              prompt: 'Find the midpoint of the segment joining $(2,3)$ and $(6,7)$.',
              options: ['$(4,5)$', '$(8,10)$', '$(2,2)$', '$(5,4)$'],
              correctOption: 0,
              hint: 'Average the x-coordinates and the y-coordinates separately.',
              explanation:
                '$M=\\left(\\frac{2+6}{2},\\frac{3+7}{2}\\right)=(4,5)$. The midpoint lies halfway between the endpoints.',
              difficulty: 'easy',
            },
            {
              id: 'g9-distance-ex-3',
              type: 'numeric',
              prompt: 'Find the slope of the line through $(1,2)$ and $(5,10)$.',
              answer: 2,
              tolerance: 0.001,
              hint: 'Divide the change in y by the change in x.',
              explanation: '$m=\\frac{10-2}{5-1}=\\frac84=2$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-distance-ex-4',
              type: 'numeric',
              prompt: 'Find the distance between $(-1,-2)$ and $(5,6)$.',
              answer: 10,
              tolerance: 0.001,
              hint: 'The coordinate differences are 6 and 8.',
              explanation:
                '$d=\\sqrt{(5-(-1))^2+(6-(-2))^2}=\\sqrt{6^2+8^2}=\\sqrt{100}=10$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-distance-ex-5',
              type: 'multiple-choice',
              prompt: 'What is the slope of the vertical line through $(4,1)$ and $(4,7)$?',
              options: ['Undefined', '$0$', '$6$', '$\\frac16$'],
              correctOption: 0,
              hint: 'The x-coordinates are equal.',
              explanation:
                'The denominator $x_2-x_1=4-4=0$, so the slope involves division by zero and is undefined. A horizontal line would have slope 0.',
              difficulty: 'easy',
            },
            {
              id: 'g9-distance-ex-6',
              type: 'numeric',
              prompt: 'The midpoint of $AB$ is $M(4,6)$, and $A$ is $(1,2)$. Find the y-coordinate of $B$.',
              answer: 10,
              tolerance: 0.001,
              hint: 'Double the midpoint coordinates and subtract the known endpoint.',
              explanation:
                'The midpoint formula gives $4=\\frac{1+x_B}{2}$ and $6=\\frac{2+y_B}{2}$. Thus $x_B=7$ and $y_B=10$. The point $B$ is $(7,10)$.',
              difficulty: 'hard',
            },
          ],
          related: ['cartesian-plane', 'pythagorean-theorem', 'coordinate-geometry-of-lines'],
          aliases: ['distance formula', 'midpoint formula', 'slope of a line', 'gradient'],
        },
      ],
    },
    {
      id: 'statistics-probability',
      family: 'statistics-probability',
      title: 'Statistics & Probability',
      description:
        'Bivariate data, measures of spread, and two-way probability tables develop the statistical reasoning needed to describe variability and association.',
      topics: [
        {
          id: 'scatter-plots',
          title: 'Scatter Plots and Association',
          subtitle: 'Read bivariate data: direction, strength, outliers, and causation.',
          introduction:
            'A scatter plot displays two quantitative variables measured on the same individuals. Each point is one individual’s pair $(x,y)$. The pattern of points reveals association — direction, form, and strength — and a line of best fit can summarize a linear trend. A strong association is not by itself evidence that one variable causes the other.',
          prerequisites: ['data-and-graphs', 'data-displays', 'averages'],
          keyIdeas: [
            'Each point represents one individual and two paired measurements.',
            'Association can be positive, negative, or none; linear or nonlinear; strong or weak.',
            'An outlier lies away from the overall pattern.',
            'A line of best fit follows the trend and supports predictions.',
            'Correlation does not imply causation.',
          ],
          theory: [
            {
              title: 'From table to scatter plot',
              body: [
                'A scatter plot places one variable on the horizontal axis and the other on the vertical axis. Label both axes with the variable name and its unit. The explanatory variable is conventionally placed on the horizontal axis, and the response variable on the vertical axis.',
                'Look at the overall pattern rather than individual points. A pattern rising from left to right indicates a positive association; a pattern falling from left to right indicates a negative association; a cloud with no clear trend indicates little or no association.',
              ],
            },
            {
              title: 'Describing association',
              body: [
                'Describe an association with three features: direction, form, and strength. Direction is positive or negative. Form is linear if the points cluster around a straight line and nonlinear if they follow a curve. Strength is strong when points lie close to the pattern and weak when they are scattered widely.',
                'Clusters are groups of points separated from the main pattern. An outlier is a point that lies far from the overall trend. Outliers deserve investigation but should not be deleted automatically.',
                'A line of best fit passes through the middle of a linear trend, with roughly as many points above it as below it. It can be drawn by eye in Grade 9. Predictions inside the observed range are more reliable than extrapolations far beyond the data.',
              ],
              bullets: [
                'Direction: positive, negative, or none.',
                'Form: linear or nonlinear.',
                'Strength: strong, moderate, or weak.',
                'Note clusters and outliers separately.',
              ],
            },
            {
              title: 'Correlation and causation',
              body: [
                'A strong association means the variables move together in the observed data. It does not prove that a change in one variable causes a change in the other. A lurking variable may influence both, or the relationship may be coincidental.',
                'Ice cream sales and drowning incidents both rise in summer, but eating ice cream does not cause drowning; warm weather increases both swimming and ice cream purchases. A randomized experiment is stronger evidence of causation than an observational scatter plot.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-scatter-best-fit',
              title: 'Line of best fit',
              expression: '\\hat{y}=mx+b',
              description: 'A line fitted to a linear scatter plot predicts a typical response value for a given explanatory value.',
              spoken: 'y hat equals m x plus b.',
              variables: [
                { symbol: '\\hat{y}', name: 'predicted response value' },
                { symbol: 'x', name: 'explanatory value' },
                { symbol: 'm', name: 'slope of the fitted line' },
                { symbol: 'b', name: 'intercept of the fitted line' },
              ],
              conditions: ['The scatter plot should show a roughly linear trend.', 'Predictions are more reliable within the observed range of $x$.'],
              notes: 'The hat on $\\hat{y}$ indicates a prediction, not an observed value.',
              tags: ['line of best fit', 'trend line', 'prediction', 'scatter plot'],
            },
            {
              id: 'g9-scatter-slope',
              title: 'Interpreting the slope of a fit line',
              expression: 'm=\\frac{\\text{change in predicted }y}{\\text{change in }x}',
              description: 'The slope states how much the predicted response changes for each one-unit increase in the explanatory variable.',
              spoken: 'm equals the change in predicted y divided by the change in x.',
              variables: [
                { symbol: 'm', name: 'slope', unit: 'response units per explanatory unit' },
              ],
              conditions: ['The units of the slope are the units of $y$ divided by the units of $x$.'],
              notes: 'A negative slope means the predicted response decreases as the explanatory variable increases.',
              tags: ['slope interpretation', 'rate of change', 'scatter plot slope'],
            },
            {
              id: 'g9-scatter-residual',
              title: 'Residual',
              expression: '\\text{residual}=y-\\hat{y}',
              description: 'A residual measures how far an observed point lies above or below the fitted line.',
              spoken: 'The residual equals the observed y minus the predicted y hat.',
              variables: [
                { symbol: 'y', name: 'observed response value' },
                { symbol: '\\hat{y}', name: 'predicted response value from the line' },
              ],
              conditions: ['Use the same units for the observed and predicted values.'],
              notes: 'A positive residual means the point is above the line; a negative residual means it is below.',
              tags: ['residual', 'prediction error', 'line of best fit'],
            },
          ],
          examples: [
            {
              title: 'Use a line of best fit',
              problem: 'A line of best fit for monthly heating cost $y$ in dollars and average outdoor temperature $x$ in degrees Celsius is $\\hat{y}=-1.8x+120$. Predict the cost at $10^{\\circ}$C and interpret the slope.',
              given: ['The fitted line is $\\hat{y}=-1.8x+120$.', 'The explanatory variable $x$ is temperature in $^{\\circ}$C; the response $y$ is cost in dollars.'],
              steps: [
                {
                  text: 'Formula. Substitute the given temperature into the fitted line.',
                  math: '\\hat{y}=-1.8(10)+120',
                },
                {
                  text: 'Calculate the predicted cost.',
                  math: '\\hat{y}=-18+120=102',
                },
                {
                  text: 'Interpret the slope. The coefficient of $x$ is $-1.8$, so each additional degree Celsius changes the predicted cost by $-1.8$ dollars.',
                  math: 'm=-1.8\\ \\text{dollars per }^{\\circ}\\text{C}',
                },
                {
                  text: 'Check the direction. The negative slope agrees with the idea that heating costs tend to fall as outdoor temperature rises.',
                },
              ],
              answer: 'The predicted monthly cost at $10^{\\circ}$C is $\\$102$. Each $1^{\\circ}$C increase in average temperature is associated with a predicted decrease of $\\$1.80$ in monthly heating cost.',
            },
            {
              title: 'Estimate a line of best fit by eye',
              problem: 'A student records temperatures at five times: $(1,8)$, $(2,11)$, $(3,15)$, $(4,18)$, and $(5,22)$, where $x$ is hours after 6 a.m. and $y$ is temperature in $^{\\circ}$C. Draw a line through $(1,8)$ and $(5,22)$ and use it to predict the temperature at $x=6$.',
              given: ['The five data points are $(1,8)$, $(2,11)$, $(3,15)$, $(4,18)$, and $(5,22)$.', 'The chosen line passes through $(1,8)$ and $(5,22)$.'],
              steps: [
                {
                  text: 'Formula for slope. Use the two chosen points.',
                  math: 'm=\\frac{22-8}{5-1}=\\frac{14}{4}=3.5',
                },
                {
                  text: 'Find the intercept using $y=mx+b$ and the point $(1,8)$.',
                  math: '8=3.5(1)+b \\Rightarrow b=4.5',
                },
                {
                  text: 'Write the fitted line.',
                  math: '\\hat{y}=3.5x+4.5',
                },
                {
                  text: 'Substitute $x=6$ for the prediction.',
                  math: '\\hat{y}=3.5(6)+4.5=21+4.5=25.5',
                },
                {
                  text: 'Check that the line is reasonable for the data. At $x=3$ it predicts $15$, which matches the observed value; the other points lie close to the line.',
                },
              ],
              answer: 'The fitted line is $\\hat{y}=3.5x+4.5$. The predicted temperature at $x=6$ is $25.5^{\\circ}$C. This prediction is just beyond the observed range, so it is less certain than an interior prediction.',
            },
          ],
          mistakes: [
            {
              mistake: 'Claiming that a strong negative correlation proves that the explanatory variable causes the response to decrease.',
              correction:
                'Correlation describes association, not causation. A lurking variable or coincidence may explain the pattern; only a well-designed experiment can support a causal claim.',
            },
            {
              mistake: 'Swapping the explanatory and response variables when plotting.',
              correction:
                'Place the explanatory variable on the horizontal axis and the response on the vertical axis. Swapping them changes the interpretation of the slope and the predictions.',
            },
            {
              mistake: 'Extrapolating far beyond the observed data and treating the prediction as certain.',
              correction:
                'A line of best fit summarizes the observed range. Predictions far outside that range assume the same trend continues, which may not be true.',
            },
          ],
          exercises: [
            {
              id: 'g9-scatter-ex-1',
              type: 'multiple-choice',
              prompt: 'A scatter plot shows points generally rising from left to right. What type of association is this?',
              options: ['Positive', 'Negative', 'None', 'Cannot be determined'],
              correctOption: 0,
              hint: 'Both variables tend to increase together.',
              explanation:
                'As the explanatory variable increases, the response also tends to increase. This is a positive association.',
              difficulty: 'easy',
            },
            {
              id: 'g9-scatter-ex-2',
              type: 'multiple-choice',
              prompt: 'A study finds a strong correlation between hours of practice and points scored. Which conclusion is justified?',
              options: [
                'The variables are associated, but causation is not proven',
                'Practice definitely causes a higher score',
                'Higher scores cause more practice',
                'There is no relationship between the variables',
              ],
              correctOption: 0,
              hint: 'Correlation describes association, not proof of cause.',
              explanation:
                'The data show an association. Without a controlled experiment, other variables or reverse causation could explain it, so causation is not established.',
              difficulty: 'medium',
            },
            {
              id: 'g9-scatter-ex-3',
              type: 'numeric',
              prompt: 'A line of best fit is $\\hat{y}=3x+12$. What is the predicted value when $x=5$?',
              answer: 27,
              tolerance: 0.001,
              hint: 'Substitute $x=5$ into the equation.',
              explanation: '$\\hat{y}=3(5)+12=15+12=27$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-scatter-ex-4',
              type: 'multiple-choice',
              prompt: 'Which point would be called an outlier in a scatter plot?',
              options: [
                'A point far from the overall pattern',
                'The point closest to the origin',
                'The point with the largest x-value',
                'The point with the smallest y-value',
              ],
              correctOption: 0,
              hint: 'An outlier does not follow the main trend.',
              explanation:
                'An outlier lies far from the overall pattern. A point can have the largest x-value or smallest y-value and still fit the trend, so those descriptions alone do not make it an outlier.',
              difficulty: 'easy',
            },
            {
              id: 'g9-scatter-ex-5',
              type: 'numeric',
              prompt: 'A line of best fit is $\\hat{y}=4.5x+20$, where $x$ is hours worked and $y$ is earnings in dollars. What is the predicted increase in earnings for each additional hour?',
              answer: 4.5,
              tolerance: 0.01,
              answerUnit: 'dollars per hour',
              hint: 'The slope gives the change in $y$ per one-unit change in $x$.',
              explanation:
                'The coefficient of $x$ is $4.5$, so each additional hour is associated with $\\$4.50$ more in predicted earnings.',
              difficulty: 'medium',
            },
            {
              id: 'g9-scatter-ex-6',
              type: 'multiple-choice',
              prompt: 'A line of best fit is used to predict a value far beyond the largest observed x-value. What is the main concern?',
              options: [
                'The trend may not continue outside the observed range',
                'The slope must be negative',
                'The line cannot have an intercept',
                'The prediction is automatically exact',
              ],
              correctOption: 0,
              hint: 'Think about extrapolation.',
              explanation:
                'A fitted line summarizes the observed range. Extending it far beyond the data assumes the same pattern continues, which may not hold.',
              difficulty: 'medium',
            },
          ],
          related: ['data-displays', 'measures-of-spread', 'statistics-center-and-spread'],
          aliases: ['bivariate data', 'scatterplot', 'line of best fit', 'correlation and causation'],
        },
        {
          id: 'measures-of-spread',
          title: 'Measures of Spread',
          subtitle: 'Range, quartiles, IQR, box plots, and the 1.5 × IQR outlier rule.',
          introduction:
            'The centre of a data set does not describe how spread out the values are. Two classes can have the same mean but very different consistency. Range, quartiles, the interquartile range, and box plots summarize spread, while the $1.5\\times\\text{IQR}$ rule flags values that lie unusually far from the middle.',
          prerequisites: ['averages', 'data-displays', 'data-and-graphs'],
          keyIdeas: [
            'Range $=$ maximum $-$ minimum; it is sensitive to outliers.',
            'The median splits the ordered data into two halves.',
            '$Q_1$ and $Q_3$ are the medians of the lower and upper halves; $\\text{IQR}=Q_3-Q_1$.',
            'A value is an outlier if it lies below $Q_1-1.5\\,\\text{IQR}$ or above $Q_3+1.5\\,\\text{IQR}$.',
            'A box plot displays the five-number summary: minimum, $Q_1$, median, $Q_3$, maximum.',
          ],
          theory: [
            {
              title: 'Range and quartiles',
              body: [
                'The range is the difference between the largest and smallest values. It is easy to compute but uses only two observations, so a single extreme value can make it misleading. Quartiles describe spread using the middle of the data instead.',
                'Sort the data first. The median divides the ordered list into two halves. If the number of values is odd, the median is the middle value and is not included in either half when locating the quartiles. $Q_1$ is the median of the lower half, and $Q_3$ is the median of the upper half. If a half has an even number of values, its median is the average of its two middle values.',
                'The interquartile range is $\\text{IQR}=Q_3-Q_1$. It measures the spread of the middle 50% of the data and is resistant to extreme values.',
              ],
              bullets: [
                'Always sort the data before finding quartiles.',
                'The median is also called $Q_2$.',
                'The IQR spans the middle half of the observations, not the full range.',
              ],
            },
            {
              title: 'Five-number summaries and box plots',
              body: [
                'A five-number summary consists of the minimum, $Q_1$, the median, $Q_3$, and the maximum. A box plot draws a box from $Q_1$ to $Q_3$ with a line at the median, and whiskers extending to the minimum and maximum (or to the most extreme non-outliers).',
                'The width of the box is the IQR. A longer box indicates more spread in the middle half of the data. If the median is closer to one end of the box, the distribution is skewed in that direction.',
              ],
            },
            {
              title: 'Outliers and the 1.5 × IQR rule',
              body: [
                'The $1.5\\times\\text{IQR}$ rule gives fences outside which a value is considered a potential outlier. The lower fence is $Q_1-1.5\\,\\text{IQR}$, and the upper fence is $Q_3+1.5\\,\\text{IQR}$. A value beyond either fence is flagged for attention.',
                'An outlier is not automatically an error. It may be a genuine extreme observation, a recording mistake, or a different population. Investigate before deciding what to do.',
              ],
              bullets: [
                'Lower fence: $Q_1-1.5\\,\\text{IQR}$.',
                'Upper fence: $Q_3+1.5\\,\\text{IQR}$.',
                'Flag values outside the fences; do not silently delete them.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-spread-range',
              title: 'Range',
              expression: 'R=\\text{maximum}-\\text{minimum}',
              description: 'The range is the difference between the largest and smallest values in a data set.',
              spoken: 'R equals the maximum minus the minimum.',
              variables: [{ symbol: 'R', name: 'range', unit: 'same units as the data' }],
              conditions: ['The data set must be non-empty.'],
              notes: 'The range is sensitive to a single extreme value.',
              tags: ['range', 'spread', 'maximum minus minimum'],
            },
            {
              id: 'g9-spread-iqr',
              title: 'Interquartile range',
              expression: '\\text{IQR}=Q_3-Q_1',
              description: 'The IQR is the spread of the middle half of the data, from the first quartile to the third quartile.',
              spoken: 'The interquartile range equals Q three minus Q one.',
              variables: [
                { symbol: 'Q_1', name: 'first quartile', unit: 'same units as the data' },
                { symbol: 'Q_3', name: 'third quartile', unit: 'same units as the data' },
              ],
              conditions: ['$Q_1\\le Q_3$; the data must be sorted before the quartiles are found.'],
              notes: 'The IQR is resistant to outliers because it ignores the most extreme quarter at each end.',
              tags: ['interquartile range', 'IQR', 'quartiles', 'middle fifty percent'],
            },
            {
              id: 'g9-spread-outlier-fences',
              title: 'Outlier fences',
              expression: 'x<Q_1-1.5\\,\\text{IQR}\\quad\\text{or}\\quad x>Q_3+1.5\\,\\text{IQR}',
              description: 'A value beyond either fence is a potential outlier under the 1.5 × IQR rule.',
              spoken: 'x is an outlier candidate if it is less than Q one minus one point five I Q R, or greater than Q three plus one point five I Q R.',
              variables: [
                { symbol: 'x', name: 'data value being tested' },
                { symbol: 'Q_1,\\ Q_3', name: 'first and third quartiles' },
                { symbol: '\\text{IQR}', name: 'interquartile range' },
              ],
              conditions: ['Use $1.5\\times\\text{IQR}$, not $1.5\\times$ the range.'],
              notes: 'The fences are guidelines for flagging unusual values, not proof that a value is an error.',
              tags: ['outlier rule', '1.5 IQR rule', 'fences', 'box plot outliers'],
            },
          ],
          examples: [
            {
              title: 'Five-number summary and IQR',
              problem: 'Find the range, five-number summary, and IQR of $12,15,18,20,22,25,28,31$.',
              given: ['The data are already sorted.', 'There are 8 values, so the median is the average of the 4th and 5th values.'],
              steps: [
                {
                  text: 'Formula for range.',
                  math: 'R=31-12=19',
                },
                {
                  text: 'Find the median. The middle values are 20 and 22.',
                  math: 'Q_2=\\frac{20+22}{2}=21',
                },
                {
                  text: 'Find $Q_1$ from the lower half $12,15,18,20$.',
                  math: 'Q_1=\\frac{15+18}{2}=16.5',
                },
                {
                  text: 'Find $Q_3$ from the upper half $22,25,28,31$.',
                  math: 'Q_3=\\frac{25+28}{2}=26.5',
                },
                {
                  text: 'Calculate the IQR.',
                  math: '\\text{IQR}=26.5-16.5=10',
                },
                {
                  text: 'Check the outlier fences.',
                  math: '16.5-1.5(10)=1.5,\\qquad 26.5+1.5(10)=41.5',
                },
              ],
              answer: 'Range $=19$; five-number summary $12,\\ 16.5,\\ 21,\\ 26.5,\\ 31$; $\\text{IQR}=10$. All values lie between the fences $1.5$ and $41.5$, so there are no outliers.',
            },
            {
              title: 'Detect an outlier',
              problem: 'Use the $1.5\\times\\text{IQR}$ rule to determine whether $20$ is an outlier in $3,4,5,6,7,8,20$.',
              given: ['The data are sorted and contain 7 values.', 'The middle value is the median.'],
              steps: [
                {
                  text: 'Find the median. The 4th value is 6.',
                  math: 'Q_2=6',
                },
                {
                  text: 'Find $Q_1$ from the lower half $3,4,5$.',
                  math: 'Q_1=4',
                },
                {
                  text: 'Find $Q_3$ from the upper half $7,8,20$.',
                  math: 'Q_3=8',
                },
                {
                  text: 'Calculate the IQR.',
                  math: '\\text{IQR}=8-4=4',
                },
                {
                  text: 'Calculate the upper fence.',
                  math: '8+1.5(4)=14',
                },
                {
                  text: 'Compare 20 with the fence. Since $20>14$, it is beyond the upper fence.',
                },
              ],
              answer: '$Q_1=4$, $Q_3=8$, and $\\text{IQR}=4$. The upper fence is 14, so 20 is a potential outlier.',
            },
          ],
          mistakes: [
            {
              mistake: 'Finding $Q_1$ and $Q_3$ as the smallest and largest values.',
              correction:
                'The minimum and maximum are the extremes, not the quartiles. $Q_1$ and $Q_3$ are the medians of the lower and upper halves of the sorted data.',
            },
            {
              mistake: 'Using $1.5\\times$ the range instead of $1.5\\times$ the IQR for the outlier fences.',
              correction:
                'The rule is based on the middle half of the data: use $1.5\\,\\text{IQR}$, where $\\text{IQR}=Q_3-Q_1$. Using the range makes the fences far too wide.',
            },
            {
              mistake: 'Computing quartiles before sorting the data.',
              correction:
                'Quartiles are positional. Sort the values from least to greatest first, then locate the median and the medians of the two halves.',
            },
          ],
          exercises: [
            {
              id: 'g9-spread-ex-1',
              type: 'multiple-choice',
              prompt: 'Find the range of $4,9,2,7,11$.',
              options: ['$9$', '$7$', '$11$', '$2$'],
              correctOption: 0,
              hint: 'Subtract the smallest value from the largest.',
              explanation: 'The maximum is 11 and the minimum is 2, so the range is $11-2=9$.',
              difficulty: 'easy',
            },
            {
              id: 'g9-spread-ex-2',
              type: 'multiple-choice',
              prompt: 'Find the IQR of $1,3,5,7,9$.',
              options: ['$4$', '$2$', '$8$', '$6$'],
              correctOption: 3,
              hint: 'The median is 5; find the median of each half.',
              explanation:
                'The median 5 is excluded from both halves. The lower half is $1,3$, so $Q_1=2$; the upper half is $7,9$, so $Q_3=8$. The IQR is $8-2=6$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-spread-ex-3',
              type: 'numeric',
              prompt: 'Find the IQR of $2,5,6,8,11,14$.',
              answer: 6,
              tolerance: 0.001,
              hint: 'The median is between 6 and 8; find the median of each half.',
              explanation:
                'The median is $\\frac{6+8}{2}=7$. The lower half is $2,5,6$, so $Q_1=5$; the upper half is $8,11,14$, so $Q_3=11$. The IQR is $11-5=6$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-spread-ex-4',
              type: 'numeric',
              prompt: 'A data set has $Q_3=20$ and $\\text{IQR}=8$. Find the upper outlier fence.',
              answer: 32,
              tolerance: 0.001,
              hint: 'Add $1.5\\times\\text{IQR}$ to $Q_3$.',
              explanation: 'The upper fence is $20+1.5(8)=20+12=32$.',
              difficulty: 'medium',
            },
            {
              id: 'g9-spread-ex-5',
              type: 'multiple-choice',
              prompt: 'Which measure of spread is most affected by a single extreme outlier?',
              options: ['Range', 'IQR', 'Median', '$Q_1$'],
              correctOption: 0,
              hint: 'Which measure uses only the largest and smallest values?',
              explanation:
                'The range uses the maximum and minimum, so one extreme value can change it dramatically. The IQR and quartiles are resistant to outliers.',
              difficulty: 'medium',
            },
            {
              id: 'g9-spread-ex-6',
              type: 'multiple-choice',
              prompt: 'Which value is the outlier in $10,12,11,13,14,52$?',
              options: ['$52$', '$10$', '$14$', '$13$'],
              correctOption: 0,
              hint: 'Compare each value with the overall pattern.',
              explanation:
                'The values $10$ through $14$ form a tight cluster. The value 52 lies far above them and is the outlier.',
              difficulty: 'easy',
            },
          ],
          related: ['averages', 'data-displays', 'statistics-center-and-spread'],
          aliases: ['interquartile range', 'box and whisker plot', 'quartiles', 'outlier rule'],
        },
        {
          id: 'probability-compound-and-two-way',
          title: String.raw`Two-Way Tables and Compound Probability`,
          subtitle: String.raw`Joint and marginal probabilities, "given that", and a first test for independence.`,
          introduction: String.raw`A two-way table sorts one group of people or objects by two categorical variables at once. Dividing its counts by the grand total gives joint and marginal probabilities, restricting attention to one row or column gives an informal conditional probability, and comparing products of probabilities gives a simple check for independence. The addition rule $P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)$ combines these ideas.`,
          prerequisites: ['probability-compound-events', 'probability-intro', 'data-displays'],
          keyIdeas: [
            String.raw`Cell counts are joint frequencies; row and column totals are marginal frequencies.`,
            String.raw`Joint probability $P(A\text{ and }B)$ is a cell count divided by the grand total.`,
            String.raw`"Given that" shrinks the sample space to one row or column.`,
            String.raw`$A$ and $B$ are independent when $P(A\text{ and }B)=P(A)\,P(B)$.`,
            String.raw`Subtract the overlap when finding $P(A\text{ or }B)$ so it is not counted twice.`,
          ],
          theory: [
            {
              title: 'Reading a two-way table',
              body: [
                String.raw`Each cell of a two-way table counts the individuals with one particular combination of categories. The row totals and column totals, printed in the margins, count each category on its own. The bottom-right entry is the grand total.`,
                String.raw`A joint probability such as $P(A\text{ and }B)$ uses a cell count divided by the grand total. A marginal probability such as $P(A)$ uses a row or column total divided by the grand total. Every such probability lies in $[0,1]$.`,
              ],
              bullets: [
                String.raw`Joint: the cell where both conditions hold.`,
                String.raw`Marginal: the total for one condition alone.`,
                String.raw`Check that the cells add up to the grand total before calculating.`,
              ],
            },
            {
              title: 'The addition rule and "given that"',
              body: [
                String.raw`When adding $P(A)$ and $P(B)$, the individuals in both categories are counted twice. Subtracting $P(A\text{ and }B)$ corrects this: $P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)$. If $A$ and $B$ cannot happen together, the overlap is $0$ and the rule becomes $P(A)+P(B)$.`,
                String.raw`To find the probability of $B$ given that $A$ has occurred, look only at the row or column for $A$. The new sample space is that row or column total, so $P(B\mid A)=\dfrac{\text{count in both}}{\text{count in }A}$. The denominator is no longer the grand total.`,
              ],
            },
            {
              title: 'Testing for independence',
              body: [
                String.raw`Two events are independent when knowing one occurred does not change the probability of the other. In a table this means $P(A\text{ and }B)=P(A)\,P(B)$, or equivalently $P(B\mid A)=P(B)$. If the two sides differ, the events are not independent.`,
                String.raw`Independent is not the same as mutually exclusive. Mutually exclusive events with positive probabilities cannot be independent, because if one occurs the other certainly does not.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g9-twoway-addition-rule',
              title: String.raw`Addition rule for two events`,
              expression: String.raw`P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)`,
              description: String.raw`The probability that at least one of two events occurs equals the sum of their probabilities minus the probability that both occur.`,
              spoken: String.raw`P of A or B equals P of A plus P of B minus P of A and B.`,
              variables: [
                { symbol: String.raw`P(A)`, name: String.raw`probability of event A` },
                { symbol: String.raw`P(B)`, name: String.raw`probability of event B` },
                { symbol: String.raw`P(A\text{ and }B)`, name: String.raw`probability both occur (joint probability)` },
              ],
              conditions: [
                String.raw`All probabilities lie in $[0,1]$.`,
                String.raw`If $A$ and $B$ are mutually exclusive, $P(A\text{ and }B)=0$.`,
              ],
              notes: String.raw`"Or" is inclusive: it includes the outcomes in both events.`,
              tags: ['addition rule', 'or probability', 'union', 'overlap'],
            },
            {
              id: 'g9-twoway-conditional-count',
              title: String.raw`Conditional probability from a table`,
              expression: String.raw`P(B\mid A)=\frac{\text{count in both }A\text{ and }B}{\text{count in }A}`,
              description: String.raw`Given that $A$ has occurred, the probability of $B$ is the share of the $A$ row or column that is also in $B$.`,
              spoken: String.raw`P of B given A equals the count in both A and B divided by the count in A.`,
              variables: [
                { symbol: String.raw`P(B\mid A)`, name: String.raw`probability of B given A` },
                { symbol: String.raw`\text{count in }A`, name: String.raw`row or column total for A`, note: 'must be greater than 0' },
              ],
              conditions: [String.raw`The count in $A$ must be positive.`],
              notes: String.raw`Do not divide by the grand total: the condition changes the sample space.`,
              tags: ['conditional probability', 'given that', 'two-way table', 'row percentage'],
            },
            {
              id: 'g9-twoway-independence',
              title: String.raw`Independence check`,
              expression: String.raw`P(A\text{ and }B)=P(A)\,P(B)`,
              description: String.raw`Events $A$ and $B$ are independent exactly when the joint probability equals the product of the marginal probabilities.`,
              spoken: String.raw`P of A and B equals P of A times P of B.`,
              variables: [
                { symbol: String.raw`P(A),\ P(B)`, name: String.raw`marginal probabilities` },
                { symbol: String.raw`P(A\text{ and }B)`, name: String.raw`joint probability` },
              ],
              conditions: [String.raw`Compare exact values (fractions), or decimals to the same accuracy.`],
              notes: String.raw`Equivalent test: $P(B\mid A)=P(B)$.`,
              tags: ['independence', 'independent events', 'multiplication rule', 'two-way table'],
            },
          ],
          examples: [
            {
              title: String.raw`Probabilities from a two-way table`,
              problem: String.raw`Of 80 students, 12 play a sport and an instrument, 28 play a sport only, 18 play an instrument only, and 22 do neither. Let $S$ be "plays a sport" and $M$ be "plays an instrument". Find $P(S\text{ or }M)$, $P(M\mid S)$, and decide whether $S$ and $M$ are independent.`,
              given: [
                String.raw`Both: $12$; sport only: $28$; instrument only: $18$; neither: $22$.`,
                String.raw`Total: $12+28+18+22=80$.`,
              ],
              steps: [
                {
                  text: String.raw`Marginal totals: $S$ has $12+28=40$ students and $M$ has $12+18=30$ students.`,
                  math: String.raw`P(S)=\frac{40}{80}=0.5,\qquad P(M)=\frac{30}{80}=0.375,\qquad P(S\text{ and }M)=\frac{12}{80}=0.15`,
                },
                {
                  text: String.raw`Use the addition rule.`,
                  math: String.raw`P(S\text{ or }M)=0.5+0.375-0.15=0.725`,
                },
                {
                  text: String.raw`Check by counting: $12+28+18=58$ students play at least one, and $58/80=0.725$.`,
                },
                {
                  text: String.raw`Conditional probability: restrict to the 40 sport players, of whom 12 play an instrument.`,
                  math: String.raw`P(M\mid S)=\frac{12}{40}=0.3`,
                },
                {
                  text: String.raw`Independence: compare the joint probability with the product of the marginals.`,
                  math: String.raw`P(S)\,P(M)=0.5\times0.375=0.1875\neq0.15`,
                },
              ],
              answer: String.raw`$P(S\text{ or }M)=0.725$ and $P(M\mid S)=0.3$. Since $0.1875\neq0.15$ (and $0.3\neq0.375$), $S$ and $M$ are not independent.`,
            },
            {
              title: String.raw`An independent pair`,
              problem: String.raw`In a survey of 100 students, 50 are in Grade 9 and 50 in Grade 10. Of the Grade 9 students, 20 walk to school and 30 take the bus; of the Grade 10 students, 20 walk and 30 take the bus. Is walking independent of grade?`,
              given: [
                String.raw`Grade 9: walk $20$, bus $30$. Grade 10: walk $20$, bus $30$.`,
                String.raw`Walkers in total: $20+20=40$.`,
              ],
              steps: [
                {
                  text: String.raw`Check that the table adds up: $20+30+20+30=100$. Then find the marginal and joint probabilities, with $G$ = Grade 9 and $W$ = walks.`,
                  math: String.raw`P(G)=\frac{50}{100}=0.5,\qquad P(W)=\frac{40}{100}=0.4,\qquad P(G\text{ and }W)=\frac{20}{100}=0.2`,
                },
                {
                  text: String.raw`Compare with the product.`,
                  math: String.raw`P(G)\,P(W)=0.5\times0.4=0.2=P(G\text{ and }W)`,
                },
                {
                  text: String.raw`Confirm with a conditional probability: among the 50 Grade 9 students, 20 walk.`,
                  math: String.raw`P(W\mid G)=\frac{20}{50}=0.4=P(W)`,
                },
                {
                  text: String.raw`Both tests agree, so knowing a student's grade does not change the chance that they walk.`,
                },
              ],
              answer: String.raw`Walking is independent of grade: $P(G\text{ and }W)=0.2=P(G)\,P(W)$, and $P(W\mid G)=P(W)=0.4$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Using $P(A)+P(B)$ for "or" without subtracting the overlap.`,
              correction: String.raw`Individuals in both categories are counted twice. Subtract $P(A\text{ and }B)$, unless the events are mutually exclusive.`,
            },
            {
              mistake: String.raw`Dividing by the grand total when finding a "given that" probability.`,
              correction: String.raw`The condition restricts the sample space. Divide by the row or column total for the given event.`,
            },
            {
              mistake: String.raw`Treating mutually exclusive events as independent.`,
              correction: String.raw`If two events with positive probability cannot both occur, then $P(A\text{ and }B)=0\neq P(A)P(B)$, so they are dependent.`,
            },
          ],
          exercises: [
            {
              id: 'g9-twoway-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`If $P(A)=0.5$, $P(B)=0.3$, and $P(A\text{ and }B)=0.1$, what is $P(A\text{ or }B)$?`,
              options: ['$0.8$', '$0.7$', '$0.9$', '$0.65$'],
              correctOption: 1,
              hint: String.raw`Subtract the overlap from the sum.`,
              explanation: String.raw`$P(A\text{ or }B)=0.5+0.3-0.1=0.7$.`,
              difficulty: 'easy',
            },
            {
              id: 'g9-twoway-ex-2',
              type: 'numeric',
              prompt: String.raw`In a survey of 200 people, 80 own a bike, and 30 of those bike owners also own a scooter. Given that a person owns a bike, what is the probability that they own a scooter? Give a decimal.`,
              answer: 0.375,
              tolerance: 0.001,
              hint: String.raw`Divide by the number of bike owners, not by 200.`,
              explanation: String.raw`$P(\text{scooter}\mid\text{bike})=\frac{30}{80}=0.375$.`,
              difficulty: 'easy',
            },
            {
              id: 'g9-twoway-ex-3',
              type: 'multiple-choice',
              prompt: String.raw`Events $A$ and $B$ satisfy $P(A)=0.4$, $P(B)=0.5$, and $P(A\text{ and }B)=0.2$. Which statement is correct?`,
              options: [
                String.raw`Independent, because $0.4\times0.5=0.2$`,
                String.raw`Not independent, because $0.4+0.5\neq0.2$`,
                String.raw`Mutually exclusive, because $P(A\text{ and }B)$ is small`,
                String.raw`It cannot be determined`,
              ],
              correctOption: 0,
              hint: String.raw`Compare $P(A)P(B)$ with the joint probability.`,
              explanation: String.raw`$P(A)P(B)=0.2=P(A\text{ and }B)$, so the events are independent. They are not mutually exclusive because the joint probability is not $0$.`,
              difficulty: 'medium',
            },
            {
              id: 'g9-twoway-ex-4',
              type: 'numeric',
              prompt: String.raw`$P(A)=0.6$, $P(B)=0.5$, and $P(A\text{ or }B)=0.8$. Find $P(A\text{ and }B)$.`,
              answer: 0.3,
              tolerance: 0.001,
              hint: String.raw`Rearrange the addition rule.`,
              explanation: String.raw`$0.8=0.6+0.5-P(A\text{ and }B)$, so $P(A\text{ and }B)=1.1-0.8=0.3$.`,
              difficulty: 'medium',
            },
            {
              id: 'g9-twoway-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`Of 100 households, 15 have both a cat and a dog, 25 have only a cat, 35 have only a dog, and 25 have neither. Are owning a cat and owning a dog independent?`,
              options: [
                String.raw`Yes, because $P(\text{cat})+P(\text{dog})=0.9$`,
                String.raw`No, because $0.4\times0.5=0.2\neq0.15$`,
                String.raw`Yes, because $0.4\times0.5=0.2$`,
                String.raw`No, because the events are mutually exclusive`,
              ],
              correctOption: 1,
              hint: String.raw`Find $P(\text{cat})$ and $P(\text{dog})$ from the marginal totals first.`,
              explanation: String.raw`$P(\text{cat})=\frac{15+25}{100}=0.4$, $P(\text{dog})=\frac{15+35}{100}=0.5$, and $P(\text{both})=0.15$. Since $0.4\times0.5=0.2\neq0.15$, the events are not independent. They are not mutually exclusive either, since 15 households own both.`,
              difficulty: 'hard',
            },
          ],
          related: ['probability-compound-events', 'conditional-probability', 'measures-of-spread'],
          aliases: ['two-way table', 'contingency table', 'joint and marginal probability', 'independent events', 'addition rule'],
        },
      ],
    },
  ],
}
