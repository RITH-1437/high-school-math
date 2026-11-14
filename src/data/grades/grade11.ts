import type { Grade } from '../../types/content'

export const grade11: Grade = {
  id: '11',
  number: 11,
  title: 'Grade 11',
  tagline: 'Functions with structure, curves with equations, and probability with conditions.',
  description:
    'Grade 11 turns calculation into analysis. Polynomial, exponential, logarithmic and trigonometric functions are studied through their graphs, roots and identities; circles and parabolas are rebuilt as loci; vectors and matrices expose the linear structure behind geometry; and probability becomes conditional. Every result is derived and checked, not memorised as a list.',
  focus: [
    'Polynomial, exponential and logarithmic functions',
    'Sequences, series and convergence',
    'Analytic geometry of circles and parabolas',
    'Vectors, matrices and linear systems',
    'Conditional probability and distributions',
  ],
  subjects: [
    {
      id: 'algebra',
      family: 'algebra',
      title: 'Advanced Algebra',
      description:
        'Four strands of function theory: polynomials and their roots, exponential and logarithmic models, sequences and series, and the algebra of composition and inversion.',
      theorems: [
        {
          title: 'Remainder Theorem',
          statement:
            'When a polynomial $P(x)$ is divided by $x-a$, the remainder is $P(a)$.',
          note: 'The theorem converts a division problem into a single substitution, which is why it is the fastest route to remainders.',
        },
        {
          title: 'Factor Theorem',
          statement:
            '$x-a$ is a factor of $P(x)$ exactly when $P(a)=0$.',
          note: 'This is the Remainder Theorem with remainder zero; it links algebra to the $x$-intercepts of the graph.',
        },
        {
          title: 'Fundamental Theorem of Algebra',
          statement:
            'Every non-constant polynomial with complex coefficients has at least one complex root. Counted with multiplicity, a polynomial of degree $n$ has exactly $n$ complex roots.',
          note: 'Grade 11 works mainly with real roots. The theorem guarantees that the search for roots is never endless.',
        },
        {
          title: 'Logarithm Laws',
          statement:
            'For $a>0$, $a\\ne 1$ and $x,y>0$: $\\log_a(xy)=\\log_a x+\\log_a y$, $\\log_a\\frac{x}{y}=\\log_a x-\\log_a y$, and $\\log_a(x^p)=p\\log_a x$.',
          note: 'The laws hold only while every logarithm is defined, so domain checks belong to every logarithmic equation.',
        },
      ],
      topics: [
        {
          id: 'polynomial-functions',
          title: 'Polynomial Functions',
          subtitle: 'Degree, division, roots and the shape of a polynomial graph.',
          introduction: String.raw`A polynomial is a sum of whole-number powers of $x$. Its degree and leading coefficient control the far ends of the graph, while its factors control the intercepts. In this topic you divide polynomials, use the remainder and factor theorems to test candidate roots, and read multiplicity directly from a factorised form. No calculus is needed: every feature of the graph follows from algebra.`,
          prerequisites: [
            'Polynomial arithmetic and factoring (Grade 9)',
            'Quadratic equations and the discriminant (Grade 10)',
            'Function notation and graph transformations (Grade 10)',
          ],
          keyIdeas: [
            'The degree and leading coefficient determine end behaviour.',
            'Long division produces $P(x)=D(x)Q(x)+R(x)$ with $\\deg R<\\deg D$.',
            'The remainder on division by $x-a$ is exactly $P(a)$; a zero remainder means $x-a$ is a factor.',
            'An even multiplicity makes the graph touch the axis; an odd multiplicity makes it cross.',
          ],
          aliases: [
            'polynomials',
            'factor theorem',
            'remainder theorem',
            'synthetic division',
            'roots and multiplicity',
            'end behaviour',
          ],
          theory: [
            {
              title: 'Degree, leading term and end behaviour',
              body: [
                String.raw`Write a polynomial in descending powers: $P(x)=a_nx^n+\cdots+a_0$ with $a_n\ne 0$. The number $n$ is the degree and $a_n$ is the leading coefficient. For large positive or negative $x$, the leading term $a_nx^n$ dominates every other term, so it alone decides where the two ends of the graph go.`,
                String.raw`A polynomial of degree $n$ has at most $n$ real zeros, and its graph is a smooth unbroken curve with no sharp corners. These two facts let you sketch confidently: locate the zeros, decide how the graph behaves between them, then attach the correct end behaviour.`,
              ],
              bullets: [
                'Odd degree, positive leading coefficient: falls on the left, rises on the right.',
                'Odd degree, negative leading coefficient: rises on the left, falls on the right.',
                'Even degree, positive leading coefficient: rises at both ends.',
                'Even degree, negative leading coefficient: falls at both ends.',
                'The constant term $a_0$ gives the $y$-intercept $(0,a_0)$.',
              ],
            },
            {
              title: 'The division algorithm',
              body: [
                String.raw`Dividing polynomials mirrors long division of integers. If $P$ and $D$ are polynomials with $D$ not the zero polynomial, there are unique polynomials $Q$ and $R$ such that $P(x)=D(x)Q(x)+R(x)$ and either $R(x)=0$ or $\deg R<\deg D$. The quotient $Q$ collects the terms you build during the division; the remainder $R$ is what cannot be divided further.`,
                String.raw`When the divisor is linear, $D(x)=x-a$, synthetic division records only the coefficients and is much quicker. Write the coefficients in descending order, including zeros for missing powers, bring down the first coefficient, then repeatedly multiply by $a$ and add. The final number is the remainder and the preceding numbers are the quotient coefficients.`,
              ],
            },
            {
              title: 'Remainder and factor theorems',
              body: [
                String.raw`Substituting $x=a$ into $P(x)=(x-a)Q(x)+R$ makes the first term vanish, leaving $P(a)=R$. This is the Remainder Theorem: the remainder on division by $x-a$ is the value of the polynomial at $a$. In particular, $P(a)=0$ exactly when the remainder is zero, which is the Factor Theorem.`,
                String.raw`If $x=a$ is a root, the factor $x-a$ may occur more than once. Write $P(x)=(x-a)^mQ(x)$ with $Q(a)\ne 0$; then $m$ is the multiplicity of the root. Near $x=a$, the graph resembles a multiple of $(x-a)^m$. An odd power changes sign and crosses the axis; an even power keeps the same sign and touches it.`,
              ],
            },
            {
              title: 'Sketching a factorised polynomial',
              body: [
                String.raw`Factor first, then read the graph. Each distinct linear factor gives an $x$-intercept, its exponent gives the multiplicity, and the leading term gives the end behaviour. The sign of $P$ between consecutive roots is constant, so testing one value in each interval produces a reliable sign chart.`,
                String.raw`A graph can touch the axis without crossing it, so a repeated root is still a root. Do not count distinct intercepts when a question asks for the number of roots counted with multiplicity; those are different questions with different answers.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-poly-general',
              title: 'General polynomial form',
              expression: String.raw`P(x)=a_nx^n+a_{n-1}x^{n-1}+\cdots+a_1x+a_0`,
              description:
                'Arranges a polynomial in descending powers so that its degree, leading coefficient and constant term are visible.',
              spoken:
                'P of x equals a sub n times x to the n, plus a sub n minus one times x to the n minus one, continuing down to the constant term a sub zero.',
              variables: [
                {
                  symbol: 'a_n',
                  name: 'leading coefficient',
                  note: 'the coefficient of the highest power; it is never zero',
                },
                {
                  symbol: 'n',
                  name: 'degree',
                  note: 'a non-negative integer',
                },
                {
                  symbol: 'a_0',
                  name: 'constant term',
                  note: 'equals the y-intercept P(0)',
                },
              ],
              conditions: [String.raw`$n$ is a non-negative integer and $a_n\ne 0$.`],
              notes:
                'Missing powers must be written with coefficient zero when using synthetic division; for example x^3 - 4x is x^3 + 0x^2 - 4x + 0.',
              tags: ['polynomial', 'degree', 'leading coefficient', 'standard form'],
            },
            {
              id: 'g11-poly-division',
              title: 'Polynomial division algorithm',
              expression: String.raw`P(x)=D(x)Q(x)+R(x)`,
              description:
                'Splits a polynomial into a divisor times a quotient plus a remainder whose degree is smaller than the divisor degree.',
              spoken:
                'P of x equals D of x times Q of x plus R of x, where the remainder is zero or has degree less than the degree of D.',
              variables: [
                { symbol: 'P(x)', name: 'dividend polynomial' },
                { symbol: 'D(x)', name: 'divisor polynomial', note: 'not the zero polynomial' },
                { symbol: 'Q(x)', name: 'quotient' },
                { symbol: 'R(x)', name: 'remainder' },
              ],
              conditions: [
                String.raw`$D(x)$ is not the zero polynomial.`,
                String.raw`$R(x)=0$ or $\deg R(x)<\deg D(x)$.`,
              ],
              notes:
                'If the remainder is zero, then D divides P exactly and both D and Q are factors of P.',
              tags: ['polynomial division', 'long division', 'quotient', 'remainder', 'division algorithm'],
            },
            {
              id: 'g11-poly-remainder',
              title: 'Remainder Theorem',
              expression: String.raw`P(a)=R`,
              description:
                'The remainder when P(x) is divided by x - a equals the value P(a).',
              spoken:
                'The remainder R on dividing P of x by x minus a equals P evaluated at a.',
              variables: [
                { symbol: 'a', name: 'the number substituted into the divisor x - a' },
                { symbol: 'R', name: 'remainder of the division' },
              ],
              conditions: ['P is a polynomial and a is a real number.'],
              notes:
                'For a divisor x + a, substitute x = -a; the divisor is x - (-a).',
              tags: ['remainder theorem', 'synthetic division', 'substitution', 'polynomial remainder'],
            },
            {
              id: 'g11-poly-factor',
              title: 'Factor Theorem',
              expression: String.raw`P(a)=0 \iff (x-a)\mid P(x)`,
              description:
                'A linear expression x - a is a factor of P exactly when a is a zero of P.',
              spoken:
                'P of a equals zero if and only if x minus a divides P of x.',
              variables: [
                { symbol: 'a', name: 'candidate zero' },
                { symbol: 'P(x)', name: 'polynomial being tested' },
              ],
              conditions: ['P is a polynomial and a is a real number.'],
              notes:
                'To test a factor such as 2x - 1, first rewrite it as 2(x - 1/2) and test x = 1/2.',
              tags: ['factor theorem', 'zeros', 'linear factor', 'roots'],
            },
          ],
          examples: [
            {
              title: 'Factor a cubic completely using the Factor Theorem',
              problem: String.raw`Factor $P(x)=2x^3-5x^2-4x+3$ completely and state all zeros.`,
              given: [
                String.raw`The polynomial is $P(x)=2x^3-5x^2-4x+3$.`,
                String.raw`The possible integer zeros divide the constant term $3$; test $x=3$ first because the coefficients suggest it.`,
              ],
              steps: [
                {
                  text: String.raw`Evaluate $P(3)$ to test the factor $x-3$.`,
                  math: String.raw`P(3)=2(27)-5(9)-4(3)+3=54-45-12+3=0`,
                },
                {
                  text: String.raw`Since $P(3)=0$, $x-3$ is a factor. Divide the cubic by $x-3$ using synthetic division with coefficients $2,-5,-4,3$.`,
                  math: String.raw`\begin{array}{r|rrrr} 3 & 2 & -5 & -4 & 3 \\ & & 6 & 3 & -3 \\ \hline & 2 & 1 & -1 & 0 \end{array}`,
                },
                {
                  text: String.raw`The quotient coefficients $2,1,-1$ give $2x^2+x-1$, and the remainder $0$ confirms the factor.`,
                  math: String.raw`P(x)=(x-3)(2x^2+x-1)`,
                },
                {
                  text: String.raw`Factor the quadratic by grouping or inspection: $2x^2+x-1=(2x-1)(x+1)$.`,
                  math: String.raw`P(x)=(x-3)(2x-1)(x+1)`,
                },
                {
                  text: String.raw`Set each factor to zero. The zeros are the values that make a factor vanish.`,
                  math: String.raw`x=3,\qquad x=\tfrac{1}{2},\qquad x=-1`,
                },
              ],
              answer: String.raw`$P(x)=(x-3)(2x-1)(x+1)$, with zeros $x=3$, $x=\tfrac{1}{2}$ and $x=-1$. Check by expanding: $(x-3)(2x^2+x-1)=2x^3-5x^2-4x+3$.`,
            },
            {
              title: 'Analyse a factorised cubic without expanding',
              problem: String.raw`Describe the end behaviour, intercepts and multiplicity behaviour of $P(x)=-2(x+1)^2(x-3)$, then sketch its shape.`,
              given: [
                String.raw`The factorised form is $P(x)=-2(x+1)^2(x-3)$.`,
                String.raw`The degree is $3$ and the leading coefficient is $-2$.`,
                String.raw`The zeros are $x=-1$ with multiplicity $2$ and $x=3$ with multiplicity $1$.`,
              ],
              steps: [
                {
                  text: String.raw`Odd degree with negative leading coefficient: the left end rises and the right end falls.`,
                  math: String.raw`x\to-\infty,\ P(x)\to+\infty;\qquad x\to+\infty,\ P(x)\to-\infty`,
                },
                {
                  text: String.raw`At $x=-1$ the factor is squared, so the graph touches the axis and turns without crossing. At $x=3$ the factor is to the first power, so the graph crosses the axis.`,
                },
                {
                  text: String.raw`Find the $y$-intercept by substituting $x=0$.`,
                  math: String.raw`P(0)=-2(1)^2(-3)=6`,
                },
                {
                  text: String.raw`Test the sign on each interval. For $x<-1$ and for $-1<x<3$ the product is positive; for $x>3$ it is negative.`,
                  math: String.raw`P(x)>0 \text{ on } (-\infty,-1)\cup(-1,3),\qquad P(x)<0 \text{ on } (3,\infty)`,
                },
                {
                  text: String.raw`Combine the information: rise from the left, touch at $(-1,0)$, pass through $(0,6)$ while staying above the axis, then cross at $(3,0)$ and fall away.`,
                },
              ],
              answer: String.raw`End behaviour: up on the left, down on the right. The graph touches at $(-1,0)$, crosses at $(3,0)$, and has $y$-intercept $(0,6)$. It is positive on $(-\infty,-1)$ and $(-1,3)$, negative on $(3,\infty)$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Testing $x=3$ and concluding that $x+3$ is a factor.`,
              correction: String.raw`The factor is $x-a$ when $P(a)=0$. Since $P(3)=0$, the factor is $x-3$, not $x+3$.`,
            },
            {
              mistake: 'Stopping polynomial long division before the remainder has degree lower than the divisor.',
              correction: String.raw`Continue until the remaining term has degree less than $\deg D$. Otherwise the quotient is incomplete and the division identity fails.`,
            },
            {
              mistake: String.raw`Saying that a repeated root is "not a root" because the graph only touches the axis.`,
              correction: String.raw`A repeated root is still a zero of the polynomial. Even multiplicity means the graph touches and turns; it does not mean the root disappears.`,
            },
          ],
          exercises: [
            {
              id: 'g11-poly-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Use the Remainder Theorem to find the remainder when $P(x)=x^3-4x^2+2x-7$ is divided by $x-2$.`,
              options: ['$-11$', '$11$', '$-3$', '$5$'],
              correctOption: 0,
              hint: String.raw`The remainder is $P(2)$; substitute carefully, keeping track of signs.`,
              explanation: String.raw`$P(2)=8-16+4-7=-11$. The remainder is $-11$, so $x-2$ is not a factor.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-poly-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Which expression is a factor of $x^3-2x^2-5x+6$?`,
              options: [String.raw`$x-1$`, String.raw`$x+1$`, String.raw`$x-2$`, String.raw`$x+4$`],
              correctOption: 0,
              hint: String.raw`Test each candidate by evaluating the polynomial at the corresponding zero.`,
              explanation: String.raw`At $x=1$: $1-2-5+6=0$, so $x-1$ is a factor. The others give $8$, $-4$ and $-70$ respectively, none zero. Completing the factorisation gives $(x-1)(x-3)(x+2)$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-poly-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the value of $k$ for which $x-2$ is a factor of $x^3+kx^2-4x+4$.`,
              answer: -1,
              tolerance: 0.001,
              hint: String.raw`A factor $x-2$ means the polynomial equals zero at $x=2$.`,
              explanation: String.raw`Set $P(2)=0$: $8+4k-8+4=4k+4=0$, so $k=-1$. With $k=-1$, $P(2)=8-4-8+4=0$, confirming the factor.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-poly-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`Describe the end behaviour of $P(x)=-3x^4+2x^3-x+7$.`,
              options: [
                'Both ends rise.',
                'Both ends fall.',
                'The left end rises and the right end falls.',
                'The left end falls and the right end rises.',
              ],
              correctOption: 1,
              hint: String.raw`Look at the degree parity and the sign of the leading coefficient.`,
              explanation: String.raw`The degree is even, so both ends behave alike. The leading coefficient $-3$ is negative, so both ends fall: $P(x)\to-\infty$ as $x\to\pm\infty$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-poly-ex-5',
              type: 'numeric',
              prompt: String.raw`Find the remainder when $2x^3+3x^2-5x+4$ is divided by $x+1$.`,
              answer: 10,
              tolerance: 0.001,
              hint: String.raw`A divisor $x+1$ is $x-(-1)$, so evaluate at $x=-1$.`,
              explanation: String.raw`$P(-1)=2(-1)^3+3(-1)^2-5(-1)+4=-2+3+5+4=10$. The remainder is $10$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-poly-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`Given that $x=3$ is a zero of $x^3-3x^2-4x+12$, what are all the zeros?`,
              options: [
                String.raw`$2,\,-2,\,3$`,
                String.raw`$2,\,3$`,
                String.raw`$-2,\,3$`,
                String.raw`$2,\,-2,\,-3$`,
              ],
              correctOption: 0,
              hint: String.raw`Divide by $x-3$, then solve the resulting quadratic.`,
              explanation: String.raw`Synthetic division by $3$ gives quotient $x^2-4$, so the polynomial is $(x-3)(x-2)(x+2)$. The zeros are $3$, $2$ and $-2$.`,
              difficulty: 'hard',
            },
          ],
          related: ['quadratic-equations', 'polynomials-intro', 'functions-and-transformations'],
        },
        {
          id: 'exponential-and-logarithmic-functions',
          title: 'Exponential and Logarithmic Functions',
          subtitle: 'Inverses that turn multiplication into addition.',
          introduction: String.raw`An exponential function multiplies by the same factor at every step; its inverse, the logarithm, records how many factors were used. Together they model compound interest, population growth, radioactive decay and any quantity whose relative rate of change is constant. The central skill is switching between the forms $a^y=x$ and $y=\log_a x$, then applying the log laws without losing a domain restriction.`,
          prerequisites: [
            'Exponent laws and rational exponents (Grade 10)',
            'Exponential growth and decay (Grade 10)',
            'Function notation, domain and range (Grade 10)',
          ],
          keyIdeas: [
            String.raw`$\log_a x$ is the exponent to which $a$ must be raised to obtain $x$.`,
            'The domain of a logarithm is $x>0$; its range is all real numbers.',
            'Log laws convert products, quotients and powers into sums, differences and multiples.',
            'Exponentiating both sides can create extraneous solutions, so every answer must be checked in the original domain.',
            'Compound growth follows $A=P(1+r)^t$ when interest is added once per period.',
          ],
          aliases: [
            'logarithms',
            'logs',
            'exponentials',
            'natural log',
            'common log',
            'log laws',
            'compound growth',
          ],
          theory: [
            {
              title: 'Exponential functions and their graphs',
              body: [
                String.raw`For a base $a>0$ with $a\ne 1$, the exponential function is $f(x)=a^x$. If $a>1$ the function grows; if $0<a<1$ it decays. In both cases the $y$-intercept is $(0,1)$ because $a^0=1$, the range is $(0,\infty)$, and the line $y=0$ is a horizontal asymptote.`,
                String.raw`An exponential function is one-to-one: different inputs always give different outputs. That property is what makes an inverse possible. The graph of $y=a^x$ and the graph of its inverse are reflections of each other in the line $y=x$.`,
              ],
              bullets: [
                String.raw`$a>1$: increasing, grows without bound to the right, approaches $0$ to the left.`,
                String.raw`$0<a<1$: decreasing, approaches $0$ to the right, grows without bound to the left.`,
                String.raw`The graph never touches the $x$-axis, so $a^x$ is never zero.`,
                String.raw`Transformations such as $y=ka^x+c$ move the asymptote to $y=c$ and can change the range.`,
              ],
            },
            {
              title: 'Logarithms as inverses',
              body: [
                String.raw`The logarithm base $a$ is defined by $\log_a x=y \iff a^y=x$. It answers the question "to what power must $a$ be raised to produce $x$?" For example, $\log_2 8=3$ because $2^3=8$. The base must be positive and not equal to $1$, and the argument must be positive.`,
                String.raw`Two bases are used so often that they have their own notation. $\log x$ usually means $\log_{10}x$, the common logarithm, and $\ln x$ means $\log_e x$, the natural logarithm, where $e\approx 2.71828$. The graph of $y=\log_a x$ has a vertical asymptote $x=0$, passes through $(1,0)$ and $(a,1)$, and increases when $a>1$.`,
              ],
            },
            {
              title: 'Log laws and solving equations',
              body: [
                String.raw`Because logarithms are exponents, exponent laws become log laws: a product becomes a sum, a quotient becomes a difference, and a power becomes a multiplier. These laws let you combine several logarithms into one, or split a complicated logarithm into manageable pieces. They apply only when every argument is positive.`,
                String.raw`To solve $a^x=b$ with $b>0$, take a logarithm of both sides and use the power law: $x\log a=\log b$, so $x=\frac{\log b}{\log a}$. To solve an equation containing logarithms, first state the domain, combine logarithms where possible, then rewrite in exponential form. Any candidate outside the domain must be rejected.`,
              ],
              bullets: [
                String.raw`$\log_a(xy)=\log_a x+\log_a y$ for $x,y>0$.`,
                String.raw`$\log_a\frac{x}{y}=\log_a x-\log_a y$ for $x,y>0$.`,
                String.raw`$\log_a(x^p)=p\log_a x$ for $x>0$.`,
                String.raw`$\log_a 1=0$ and $\log_a a=1$.`,
                String.raw`Change of base: $\log_a x=\frac{\log_b x}{\log_b a}$.`,
              ],
            },
            {
              title: 'Exponential models and compound growth',
              body: [
                String.raw`If a quantity $P$ grows by a fixed percentage $r$ each period, the amount after $t$ periods is $A=P(1+r)^t$. For decay, $r$ is negative or the factor is written as $(1-r)^t$. The base $1+r$ is the growth factor; it is greater than $1$ for growth and between $0$ and $1$ for decay.`,
                String.raw`When growth is continuous, the model becomes $A=Pe^{kt}$, where $k$ is the continuous growth rate. Both models produce the same qualitative graph: a horizontal asymptote at $A=0$ and unrestricted growth or decay away from it. In applications, state the time unit clearly and round money only at the end.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-explog-definition',
              title: 'Definition of a logarithm',
              expression: String.raw`\log_a x=y \iff a^y=x`,
              description:
                'A logarithm is an exponent: log base a of x is the power to which a must be raised to give x.',
              spoken:
                'Log base a of x equals y if and only if a to the power y equals x.',
              variables: [
                { symbol: 'a', name: 'base', note: 'a > 0 and a ≠ 1' },
                { symbol: 'x', name: 'argument', note: 'must be positive' },
                { symbol: 'y', name: 'logarithm value (an exponent)' },
              ],
              conditions: [
                String.raw`$a>0$ and $a\ne 1$.`,
                String.raw`$x>0$.`,
              ],
              notes:
                'The base of ln is e, and the base of log written without a subscript is usually 10.',
              tags: ['logarithm', 'definition', 'inverse of exponential', 'log base a'],
            },
            {
              id: 'g11-explog-laws',
              title: 'Laws of logarithms',
              expression: String.raw`\log_a(xy)=\log_a x+\log_a y,\quad \log_a\frac{x}{y}=\log_a x-\log_a y,\quad \log_a(x^p)=p\log_a x`,
              description:
                'Turns logarithms of products, quotients and powers into sums, differences and constant multiples.',
              spoken:
                'The log of a product is the sum of the logs; the log of a quotient is the difference of the logs; the log of a power is the exponent times the log.',
              variables: [
                { symbol: 'a', name: 'base', note: 'a > 0, a ≠ 1' },
                { symbol: 'x, y', name: 'positive arguments' },
                { symbol: 'p', name: 'any real exponent' },
              ],
              conditions: [
                String.raw`$x>0$ and $y>0$.`,
                String.raw`$a>0$ and $a\ne 1$.`,
              ],
              notes:
                'There is no law for log(x + y); a sum inside a logarithm cannot be split. Check that each original argument is positive before applying a law.',
              tags: ['log laws', 'product rule', 'quotient rule', 'power rule', 'logarithm properties'],
            },
            {
              id: 'g11-explog-change-base',
              title: 'Change of base',
              expression: String.raw`\log_a x=\frac{\log_b x}{\log_b a}`,
              description:
                'Rewrites a logarithm in any convenient base, usually base 10 or base e for a calculator.',
              spoken:
                'Log base a of x equals log base b of x divided by log base b of a.',
              variables: [
                { symbol: 'a', name: 'original base', note: 'a > 0, a ≠ 1' },
                { symbol: 'b', name: 'new base', note: 'b > 0, b ≠ 1' },
                { symbol: 'x', name: 'positive argument' },
              ],
              conditions: [String.raw`$x>0$, $a>0$, $b>0$, $a\ne 1$, $b\ne 1$.`],
              notes:
                'For calculator work, ln is often the most accurate choice: log_a x = ln x / ln a.',
              tags: ['change of base', 'logarithm', 'calculator', 'base conversion'],
            },
            {
              id: 'g11-explog-compound',
              title: 'Compound growth model',
              expression: String.raw`A=P(1+r)^t`,
              description:
                'Gives the amount after t periods when a quantity P grows by a fixed rate r per period.',
              spoken:
                'A equals P times one plus r, all raised to the power t.',
              variables: [
                { symbol: 'A', name: 'amount after t periods', unit: 'same unit as P' },
                { symbol: 'P', name: 'initial amount (principal)', unit: 'same unit as A' },
                { symbol: 'r', name: 'growth rate per period', note: 'written as a decimal; negative for decay' },
                { symbol: 't', name: 'number of periods', note: 'must match the time unit of r' },
              ],
              conditions: [
                String.raw`$r>-1$ so that the growth factor $1+r$ is positive.`,
                String.raw`$t\ge 0$; the number of compounding periods is usually a whole number.`,
              ],
              notes:
                'For decay use A = P(1 - r)^t with r > 0, or keep the formula and let r be negative. Continuous growth uses A = Pe^{kt}.',
              tags: ['compound interest', 'growth', 'decay', 'exponential model', 'interest'],
            },
          ],
          examples: [
            {
              title: 'Solve a logarithmic equation with a domain restriction',
              problem: String.raw`Solve $\log_2 x+\log_2(x-3)=2$.`,
              given: [
                String.raw`The equation is $\log_2 x+\log_2(x-3)=2$.`,
                String.raw`Both arguments must be positive: $x>0$ and $x-3>0$, so $x>3$.`,
              ],
              steps: [
                {
                  text: String.raw`State the domain before solving. Any candidate with $x\le 3$ will be invalid.`,
                  math: String.raw`x>3`,
                },
                {
                  text: String.raw`Combine the logarithms using the product law.`,
                  math: String.raw`\log_2\bigl(x(x-3)\bigr)=2`,
                },
                {
                  text: String.raw`Rewrite in exponential form: the base is $2$, the exponent is $2$.`,
                  math: String.raw`x(x-3)=2^2=4`,
                },
                {
                  text: String.raw`Expand and rearrange into a quadratic equation.`,
                  math: String.raw`x^2-3x-4=0`,
                },
                {
                  text: String.raw`Factor and solve.`,
                  math: String.raw`(x-4)(x+1)=0 \Rightarrow x=4 \text{ or } x=-1`,
                },
                {
                  text: String.raw`Reject $x=-1$ because it is outside the domain $x>3$. Check $x=4$ in the original equation.`,
                  math: String.raw`\log_2 4+\log_2 1=2+0=2`,
                },
              ],
              answer: String.raw`$x=4$ only. The candidate $x=-1$ is extraneous because it makes both logarithms undefined.`,
            },
            {
              title: 'Model compound growth',
              problem: String.raw`A sum of $\$5000$ is invested at $6.5\%$ per year, compounded annually. Find its value after $8$ years.`,
              given: [
                String.raw`Principal $P=5000$ dollars.`,
                String.raw`Annual rate $r=6.5\%=0.065$.`,
                String.raw`Time $t=8$ years, with one compounding period per year.`,
              ],
              steps: [
                {
                  text: String.raw`Substitute into the compound growth formula.`,
                  math: String.raw`A=5000(1+0.065)^8=5000(1.065)^8`,
                },
                {
                  text: String.raw`Evaluate the growth factor. Using logs as a check: $8\ln(1.065)\approx 0.50380$, and $e^{0.50380}\approx 1.65500$.`,
                  math: String.raw`(1.065)^8\approx 1.654996`,
                },
                {
                  text: String.raw`Multiply by the principal and round to the nearest cent.`,
                  math: String.raw`A\approx 5000\times 1.654996=8274.98`,
                },
              ],
              answer: String.raw`The investment is worth approximately $\$8274.98$ after $8$ years. The exact value is $5000(1.065)^8$ dollars.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Writing $\log(x+y)=\log x+\log y$.`,
              correction: String.raw`The product law applies to $\log(xy)$, not to a sum. There is no general law for $\log(x+y)$.`,
            },
            {
              mistake: 'Solving a log equation and accepting every algebraic root without checking the domain.',
              correction: String.raw`Every logarithm must have a positive argument. Substitute each candidate into the original equation and discard any that makes an argument zero or negative.`,
            },
            {
              mistake: String.raw`Confusing $\ln x$ with $\log x$ or assuming $\log_a x$ can be negative.`,
              correction: String.raw`$\ln x$ means $\log_e x$, while $\log x$ usually means $\log_{10}x$. A logarithm itself may be negative; only its argument must be positive.`,
            },
          ],
          exercises: [
            {
              id: 'g11-explog-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Evaluate $\log_3 81$.`,
              options: ['$4$', '$3$', '$27$', '$81$'],
              correctOption: 0,
              hint: String.raw`Ask: to what power must $3$ be raised to give $81$?`,
              explanation: String.raw`$3^4=81$, so $\log_3 81=4$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-explog-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Simplify $\log 8+\log 125$, where log means base $10$.`,
              options: ['$3$', '$1000$', '$133$', '$2$'],
              correctOption: 0,
              hint: String.raw`Use the product law, then evaluate $\log 1000$.`,
              explanation: String.raw`$\log 8+\log 125=\log(8\times 125)=\log 1000=3$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-explog-ex-3',
              type: 'numeric',
              prompt: String.raw`Solve $2^x=40$. Give the answer correct to two decimal places.`,
              answer: 5.32,
              tolerance: 0.01,
              hint: String.raw`Take $\ln$ of both sides and use $x\ln 2=\ln 40$.`,
              explanation: String.raw`$x=\frac{\ln 40}{\ln 2}=\frac{3.68888}{0.69315}\approx 5.32193$, so $x\approx 5.32$. Check: $2^{5.32}\approx 40.0$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-explog-ex-4',
              type: 'numeric',
              prompt: String.raw`Solve $\log_5(x-1)=2$.`,
              answer: 26,
              tolerance: 0.001,
              hint: String.raw`Rewrite the equation as $5^2=x-1$.`,
              explanation: String.raw`$\log_5(x-1)=2$ means $x-1=5^2=25$, so $x=26$. The argument $26-1=25$ is positive, so the solution is valid.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-explog-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`What is the domain of $f(x)=\log(3-x)$?`,
              options: [String.raw`$x<3$`, String.raw`$x>3$`, String.raw`$x\le 3$`, 'All real numbers'],
              correctOption: 0,
              hint: String.raw`The argument of a logarithm must be strictly positive.`,
              explanation: String.raw`Require $3-x>0$, which gives $x<3$. At $x=3$ the logarithm would be $\log 0$, which is undefined.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-explog-ex-6',
              type: 'numeric',
              prompt: String.raw`Solve $\log_2 x+\log_2(x-6)=4$.`,
              answer: 8,
              tolerance: 0.001,
              hint: String.raw`State the domain first, then combine the logs and exponentiate.`,
              explanation: String.raw`Domain: $x>6$. Combining gives $\log_2[x(x-6)]=4$, so $x^2-6x=16$ and $(x-8)(x+2)=0$. Only $x=8$ lies in the domain. Check: $\log_2 8+\log_2 2=3+1=4$.`,
              difficulty: 'hard',
            },
          ],
          related: [
            'exponential-functions-intro',
            'inverse-and-composite-functions',
            'sequences-and-series',
          ],
        },
        {
          id: 'sequences-and-series',
          title: 'Sequences and Series',
          subtitle: 'Arithmetic steps, geometric ratios, and the sums they generate.',
          introduction: String.raw`A sequence is an ordered list of numbers; a series is the sum of such a list. Two patterns carry most of the theory. Arithmetic sequences add the same amount each step, while geometric sequences multiply by the same factor. Once the pattern is named, the $n$th term and the sum of the first $n$ terms follow from formulas rather than repeated addition.`,
          prerequisites: [
            'Number patterns and term-to-term rules (Grade 7)',
            'Linear functions and slope as a constant rate (Grade 8)',
            'Exponential growth and powers (Grade 10)',
          ],
          keyIdeas: [
            String.raw`An arithmetic sequence has a constant difference $d$; a geometric sequence has a constant ratio $r$.`,
            String.raw`The $n$th term uses $n-1$ steps from the first term, never $n$ steps.`,
            'Sigma notation is a compact instruction to add terms generated by a formula.',
            String.raw`An infinite geometric series has a finite sum only when $|r|<1$.`,
          ],
          aliases: [
            'arithmetic sequence',
            'geometric sequence',
            'series',
            'sigma notation',
            'nth term',
            'sum of a series',
            'convergence',
          ],
          theory: [
            {
              title: 'Arithmetic sequences and series',
              body: [
                String.raw`An arithmetic sequence has a common difference $d=a_{n+1}-a_n$ between consecutive terms. Starting from $a_1$, reaching the $n$th term requires $n-1$ additions of $d$, so $a_n=a_1+(n-1)d$. A sequence is increasing when $d>0$, decreasing when $d<0$, and constant when $d=0$.`,
                String.raw`To add the first $n$ terms, pair the first and last, the second and second-last, and so on. Every pair has the same sum $a_1+a_n$, and there are $n/2$ pairs. This gives $S_n=\frac{n}{2}(a_1+a_n)$, which can also be written entirely in terms of $a_1$ and $d$.`,
              ],
            },
            {
              title: 'Geometric sequences and series',
              body: [
                String.raw`A geometric sequence has a common ratio $r=\frac{a_{n+1}}{a_n}$, so each term is $r$ times the previous one. The $n$th term is $a_n=a_1r^{n-1}$. If $|r|>1$ the terms grow in size; if $|r|<1$ they shrink towards zero; if $r<0$ they alternate in sign.`,
                String.raw`The finite sum is $S_n=\frac{a_1(1-r^n)}{1-r}$ for $r\ne 1$. When $|r|<1$, the powers $r^n$ tend to zero as $n$ grows, so the infinite series converges to $S_\infty=\frac{a_1}{1-r}$. When $|r|\ge 1$ the terms do not shrink fast enough and the infinite sum does not exist.`,
              ],
            },
            {
              title: 'Sigma notation and modelling',
              body: [
                String.raw`Sigma notation writes a sum without listing every term: $\sum_{k=1}^{n} f(k)$ means evaluate $f$ at $k=1,2,\ldots,n$ and add the results. The variable $k$ is a dummy index; it disappears after the sum is evaluated. Recognising whether $f(k)$ is linear or exponential tells you immediately whether to use an arithmetic or a geometric formula.`,
                String.raw`Sequences model any process with a regular step: simple interest (arithmetic), compound interest (geometric), depreciation, population change and repeating patterns. Always identify $a_1$, then decide whether the rule is "add $d$" or "multiply by $r$"; the rest is substitution.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-seq-arith-nth',
              title: 'nth term of an arithmetic sequence',
              expression: String.raw`a_n=a_1+(n-1)d`,
              description:
                'Gives the term in position n when the sequence starts at a1 and increases by d each step.',
              spoken:
                'a sub n equals a sub one plus n minus one times d.',
              variables: [
                { symbol: 'a_n', name: 'nth term' },
                { symbol: 'a_1', name: 'first term' },
                { symbol: 'd', name: 'common difference', note: 'd = a_{n+1} - a_n' },
                { symbol: 'n', name: 'position of the term', note: 'a positive integer' },
              ],
              conditions: ['The sequence is arithmetic: consecutive terms differ by the same constant d.'],
              notes:
                'A common error is to use nd instead of (n - 1)d. The first term already counts as step zero.',
              tags: ['arithmetic sequence', 'nth term', 'common difference', 'linear sequence'],
            },
            {
              id: 'g11-seq-arith-sum',
              title: 'Sum of an arithmetic series',
              expression: String.raw`S_n=\frac{n}{2}(a_1+a_n)=\frac{n}{2}\bigl[2a_1+(n-1)d\bigr]`,
              description:
                'Adds the first n terms of an arithmetic sequence by pairing terms with equal sums.',
              spoken:
                'S sub n equals n over two times the sum of the first and nth terms, which also equals n over two times the quantity two a sub one plus n minus one times d.',
              variables: [
                { symbol: 'S_n', name: 'sum of the first n terms' },
                { symbol: 'a_1', name: 'first term' },
                { symbol: 'a_n', name: 'nth term' },
                { symbol: 'd', name: 'common difference' },
                { symbol: 'n', name: 'number of terms' },
              ],
              conditions: ['The sequence is arithmetic with common difference d.'],
              notes:
                'The two forms are equivalent because a_n = a_1 + (n - 1)d. Use the first when a_n is known, the second when only a_1 and d are known.',
              tags: ['arithmetic series', 'sum', 'series formula', 'pairing terms'],
            },
            {
              id: 'g11-seq-geom-nth',
              title: 'nth term of a geometric sequence',
              expression: String.raw`a_n=a_1r^{n-1}`,
              description:
                'Gives the term in position n when each term is r times the previous term.',
              spoken:
                'a sub n equals a sub one times r to the power n minus one.',
              variables: [
                { symbol: 'a_n', name: 'nth term' },
                { symbol: 'a_1', name: 'first term' },
                { symbol: 'r', name: 'common ratio', note: 'r = a_{n+1} / a_n; r ≠ 0' },
                { symbol: 'n', name: 'position of the term', note: 'a positive integer' },
              ],
              conditions: ['The sequence is geometric with common ratio r.'],
              notes:
                'If r is negative, the signs alternate. If r = 1 every term equals a_1.',
              tags: ['geometric sequence', 'nth term', 'common ratio', 'exponential sequence'],
            },
            {
              id: 'g11-seq-geom-sum',
              title: 'Geometric series sums',
              expression: String.raw`S_n=\frac{a_1(1-r^n)}{1-r}\quad (r\ne 1),\qquad S_\infty=\frac{a_1}{1-r}\quad (|r|<1)`,
              description:
                'Adds finitely many geometric terms, and gives the limiting sum when the ratio has absolute value below one.',
              spoken:
                'S sub n equals a sub one times one minus r to the n, divided by one minus r, for r not equal to one. The infinite sum is a sub one divided by one minus r, valid when the absolute value of r is less than one.',
              variables: [
                { symbol: 'S_n', name: 'sum of the first n terms' },
                { symbol: String.raw`S_\infty`, name: 'limiting sum of the infinite series' },
                { symbol: 'a_1', name: 'first term' },
                { symbol: 'r', name: 'common ratio' },
                { symbol: 'n', name: 'number of terms' },
              ],
              conditions: [
                String.raw`$r\ne 1$ for the finite sum formula.`,
                String.raw`$|r|<1$ for the infinite sum; otherwise the series diverges.`,
              ],
              notes:
                'An equivalent finite form is S_n = a_1(r^n - 1)/(r - 1). The infinite sum exists only because r^n tends to 0 when |r| < 1.',
              tags: ['geometric series', 'sum', 'infinite series', 'convergence', 'limiting sum'],
            },
          ],
          examples: [
            {
              title: 'Find a term and a partial sum of an arithmetic sequence',
              problem: String.raw`For the sequence $7,12,17,22,\ldots$, find the $25$th term and the sum of the first $25$ terms.`,
              given: [
                String.raw`First term $a_1=7$.`,
                String.raw`Common difference $d=12-7=5$.`,
                String.raw`Number of terms $n=25$.`,
              ],
              steps: [
                {
                  text: String.raw`Substitute into the arithmetic $n$th-term formula.`,
                  math: String.raw`a_{25}=7+(25-1)(5)=7+24(5)`,
                },
                {
                  text: String.raw`Calculate the term.`,
                  math: String.raw`a_{25}=7+120=127`,
                },
                {
                  text: String.raw`Use the sum formula with the first and last terms.`,
                  math: String.raw`S_{25}=\frac{25}{2}(7+127)=\frac{25}{2}(134)`,
                },
                {
                  text: String.raw`Simplify.`,
                  math: String.raw`S_{25}=25\times 67=1675`,
                },
                {
                  text: String.raw`Check with the alternative form: $\frac{25}{2}[2(7)+24(5)]=\frac{25}{2}(14+120)=1675$.`,
                },
              ],
              answer: String.raw`$a_{25}=127$ and $S_{25}=1675$.`,
            },
            {
              title: 'Work with a geometric sequence whose ratio is negative',
              problem: String.raw`A geometric sequence has first term $18$ and common ratio $-\frac{2}{3}$. Find its $6$th term and its infinite sum.`,
              given: [
                String.raw`$a_1=18$.`,
                String.raw`$r=-\frac{2}{3}$.`,
                String.raw`The infinite sum is available because $|r|=\frac{2}{3}<1$.`,
              ],
              steps: [
                {
                  text: String.raw`Substitute into the geometric $n$th-term formula with $n=6$.`,
                  math: String.raw`a_6=18\left(-\frac{2}{3}\right)^{5}`,
                },
                {
                  text: String.raw`Evaluate the power and multiply.`,
                  math: String.raw`a_6=18\left(-\frac{32}{243}\right)=-\frac{576}{243}=-\frac{64}{27}`,
                },
                {
                  text: String.raw`For the infinite sum, substitute into $S_\infty=\frac{a_1}{1-r}$.`,
                  math: String.raw`S_\infty=\frac{18}{1-\left(-\frac{2}{3}\right)}=\frac{18}{1+\frac{2}{3}}`,
                },
                {
                  text: String.raw`Simplify the denominator and divide.`,
                  math: String.raw`S_\infty=\frac{18}{\frac{5}{3}}=18\times\frac{3}{5}=\frac{54}{5}=10.8`,
                },
              ],
              answer: String.raw`$a_6=-\frac{64}{27}\approx -2.37$ and $S_\infty=\frac{54}{5}=10.8$. The terms alternate in sign but shrink, so the sum settles at $10.8$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Using $a_n=a_1+nd$ instead of $a_1+(n-1)d$.`,
              correction: String.raw`The first term is already at position $1$, so only $n-1$ steps of size $d$ are needed.`,
            },
            {
              mistake: String.raw`Applying $S_\infty=\frac{a_1}{1-r}$ when $|r|\ge 1$.`,
              correction: String.raw`The limiting sum exists only when $|r|<1$. If $|r|\ge 1$, the terms do not approach zero and the infinite series diverges.`,
            },
            {
              mistake: String.raw`Treating a geometric sequence as arithmetic because the first two terms happen to fit both patterns.`,
              correction: 'Check a third term. Arithmetic sequences have a constant difference; geometric sequences have a constant ratio. One pair of terms cannot distinguish the patterns.',
            },
          ],
          exercises: [
            {
              id: 'g11-seq-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Find the $20$th term of the arithmetic sequence $5,9,13,17,\ldots$.`,
              options: ['$81$', '$77$', '$85$', '$79$'],
              correctOption: 0,
              hint: String.raw`Identify $a_1$ and $d$, then use $a_n=a_1+(n-1)d$.`,
              explanation: String.raw`$a_1=5$ and $d=4$, so $a_{20}=5+19(4)=5+76=81$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-seq-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find the sum of the first $6$ terms of $2,6,18,54,\ldots$.`,
              options: ['$728$', '$486$', '$729$', '$242$'],
              correctOption: 0,
              hint: String.raw`This is geometric with $a_1=2$ and $r=3$.`,
              explanation: String.raw`$S_6=\frac{2(3^6-1)}{3-1}=\frac{2(729-1)}{2}=728$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-seq-ex-3',
              type: 'numeric',
              prompt: String.raw`Evaluate the arithmetic series $3+7+11+\cdots+99$.`,
              answer: 1275,
              tolerance: 0.001,
              hint: String.raw`First find how many terms there are by solving $99=3+(n-1)4$.`,
              explanation: String.raw`$99=3+4(n-1)$ gives $n=25$. Then $S_{25}=\frac{25}{2}(3+99)=\frac{25}{2}(102)=1275$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-seq-ex-4',
              type: 'multiple-choice',
              prompt: 'Which infinite geometric series has a finite sum?',
              options: [
                String.raw`$a_1=8,\ r=\frac{1}{2}$`,
                String.raw`$a_1=8,\ r=1$`,
                String.raw`$a_1=8,\ r=-\frac{3}{2}$`,
                String.raw`$a_1=8,\ r=2$`,
              ],
              correctOption: 0,
              hint: String.raw`The convergence condition is $|r|<1$.`,
              explanation: String.raw`Only $r=\frac{1}{2}$ satisfies $|r|<1$. Its sum is $\frac{8}{1-\frac{1}{2}}=16$. The other ratios have absolute value at least $1$, so their series diverge.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-seq-ex-5',
              type: 'numeric',
              prompt: String.raw`Evaluate $\sum_{k=1}^{10}(3k-2)$.`,
              answer: 145,
              tolerance: 0.001,
              hint: String.raw`List the first and last terms, recognise an arithmetic series, then use the sum formula.`,
              explanation: String.raw`The terms run from $1$ to $28$ in steps of $3$, with $10$ terms. $S_{10}=\frac{10}{2}(1+28)=5(29)=145$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-seq-ex-6',
              type: 'numeric',
              prompt: String.raw`A geometric sequence has second term $6$ and fifth term $48$. Find the sum of its first $7$ terms.`,
              answer: 381,
              tolerance: 0.001,
              hint: String.raw`Divide the fifth term by the second term to find $r^3$.`,
              explanation: String.raw`$\frac{a_5}{a_2}=r^3=\frac{48}{6}=8$, so $r=2$. Then $a_1=\frac{6}{2}=3$ and $S_7=\frac{3(2^7-1)}{2-1}=3(127)=381$.`,
              difficulty: 'hard',
            },
          ],
          related: ['patterns-and-sequences', 'exponential-functions-intro', 'binomial-theorem'],
        },
        {
          id: 'inverse-and-composite-functions',
          title: 'Inverse and Composite Functions',
          subtitle: 'Building new functions by chaining and undoing.',
          introduction: String.raw`Functions can be combined by feeding the output of one into another, and some functions can be undone completely. Composition builds a new rule from two existing rules, while an inverse reverses a rule. The two ideas are linked: an inverse exists only when no output is repeated, and composing a function with its inverse returns the original input. Domain restrictions decide when the reversal is legitimate.`,
          prerequisites: [
            'Function notation, domain and range (Grade 9)',
            'Graph transformations and reflections (Grade 10)',
            'Solving equations for a named variable',
          ],
          keyIdeas: [
            String.raw`$(f\circ g)(x)=f(g(x))$: apply $g$ first, then $f$.`,
            'The domain of a composite excludes inputs that $g$ cannot accept or whose output $f$ cannot accept.',
            'A function has an inverse only if it is one-to-one on its domain.',
            'The graph of an inverse is the reflection of the original graph in the line $y=x$.',
            'Restricting the domain can turn a many-to-one function into a one-to-one function with an inverse.',
          ],
          aliases: [
            'composite functions',
            'function composition',
            'inverse functions',
            'one-to-one',
            'domain restriction',
            'f of g',
          ],
          theory: [
            {
              title: 'Composite functions',
              body: [
                String.raw`The composite $f\circ g$ is defined by $(f\circ g)(x)=f(g(x))$. The inner function $g$ acts first and its output becomes the input of $f$. Order matters: $f\circ g$ and $g\circ f$ usually produce different rules, and one may be defined while the other is not.`,
                String.raw`To find the domain of $f\circ g$, keep only those $x$ in the domain of $g$ for which $g(x)$ lies in the domain of $f$. For example, if $f(x)=\sqrt{x}$, then $g(x)$ must be non-negative. This condition is easy to forget when the simplified formula looks harmless.`,
              ],
              bullets: [
                String.raw`$(f\circ g)(x)$ means $f(g(x))$, not $f(x)\times g(x)$.`,
                String.raw`The domain of $f\circ g$ is $\{x: x\in\operatorname{dom} g \text{ and } g(x)\in\operatorname{dom} f\}$.`,
                String.raw`Composition is associative: $f\circ(g\circ h)=(f\circ g)\circ h$.`,
                'Composition is not commutative in general.',
              ],
            },
            {
              title: 'One-to-one functions and inverses',
              body: [
                String.raw`A function is one-to-one if different inputs always produce different outputs: $f(a)=f(b)$ implies $a=b$. Only one-to-one functions can be reversed unambiguously, because an inverse must return exactly one input for each output. On a graph, the horizontal line test detects one-to-one behaviour: no horizontal line may meet the graph more than once.`,
                String.raw`If $f$ is one-to-one, its inverse $f^{-1}$ satisfies $f^{-1}(y)=x$ exactly when $f(x)=y$. The domain of $f^{-1}$ is the range of $f$, and the range of $f^{-1}$ is the domain of $f$. Reflecting the graph of $f$ in the line $y=x$ produces the graph of $f^{-1}$.`,
              ],
            },
            {
              title: 'Finding inverses and restricting domains',
              body: [
                String.raw`To find an inverse algebraically, write $y=f(x)$, swap $x$ and $y$, then solve for $y$. The result is $f^{-1}(x)$. Always state the domain of the inverse, which is the range of the original function. A quick check is to compose both ways: $f^{-1}(f(x))=x$ on the domain of $f$, and $f(f^{-1}(x))=x$ on the domain of $f^{-1}$.`,
                String.raw`Many familiar functions are not one-to-one on their natural domains. The parabola $y=x^2$ fails the horizontal line test, but restricting to $x\ge 0$ makes it one-to-one, and its inverse is $y=\sqrt{x}$. A restriction must be stated before the inverse is calculated; it determines which branch of the inverse is correct.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-invcomp-composite',
              title: 'Composite function',
              expression: String.raw`(f\circ g)(x)=f(g(x))`,
              description:
                'Defines a new function by applying g first and then feeding its output into f.',
              spoken:
                'f composed with g of x equals f of g of x.',
              variables: [
                { symbol: 'f', name: 'outer function' },
                { symbol: 'g', name: 'inner function' },
                { symbol: 'x', name: 'input to the composite' },
              ],
              conditions: [
                String.raw`$x$ must lie in the domain of $g$.`,
                String.raw`$g(x)$ must lie in the domain of $f$.`,
              ],
              notes:
                'The order is read from the inside out: g acts first even though f is written first.',
              tags: ['composite function', 'composition', 'function of a function', 'f of g'],
            },
            {
              id: 'g11-invcomp-inverse',
              title: 'Inverse function',
              expression: String.raw`f^{-1}(y)=x \iff f(x)=y`,
              description:
                'The inverse returns the input that produced a given output, reversing the action of the function.',
              spoken:
                'f inverse of y equals x if and only if f of x equals y.',
              variables: [
                { symbol: 'f^{-1}', name: 'inverse function' },
                { symbol: 'x', name: 'input of the original function' },
                { symbol: 'y', name: 'output of the original function' },
              ],
              conditions: [
                'The function f must be one-to-one on its domain.',
                String.raw`The domain of $f^{-1}$ is the range of $f$.`,
              ],
              notes:
                'The notation f^{-1} means the inverse function, not the reciprocal 1/f(x).',
              tags: ['inverse function', 'one-to-one', 'reverse function', 'domain and range'],
            },
            {
              id: 'g11-invcomp-identity',
              title: 'Inverse composition identities',
              expression: String.raw`f^{-1}(f(x))=x,\qquad f(f^{-1}(x))=x`,
              description:
                'Composing a function with its inverse returns the original input, provided each composition stays inside the relevant domain.',
              spoken:
                'f inverse of f of x equals x, and f of f inverse of x equals x.',
              variables: [
                { symbol: 'f', name: 'one-to-one function' },
                { symbol: 'f^{-1}', name: 'its inverse' },
                { symbol: 'x', name: 'a value in the appropriate domain' },
              ],
              conditions: [
                String.raw`$x$ is in the domain of $f$ for the first identity.`,
                String.raw`$x$ is in the domain of $f^{-1}$ for the second identity.`,
              ],
              notes:
                'These identities are the fastest way to check an inverse algebraically.',
              tags: ['inverse identity', 'composition', 'verification', 'undo function'],
            },
          ],
          examples: [
            {
              title: 'Compose two functions and compare the order',
              problem: String.raw`Let $f(x)=\sqrt{x+4}$ and $g(x)=x^2$. Find $(f\circ g)(x)$ and $(g\circ f)(x)$, including their domains.`,
              given: [
                String.raw`$f(x)=\sqrt{x+4}$, so $f$ requires an input of at least $-4$.`,
                String.raw`$g(x)=x^2$, which accepts every real number and never outputs a negative value.`,
              ],
              steps: [
                {
                  text: String.raw`Apply $g$ first, then $f$.`,
                  math: String.raw`(f\circ g)(x)=f(g(x))=f(x^2)=\sqrt{x^2+4}`,
                },
                {
                  text: String.raw`Since $x^2+4\ge 4>0$ for every real $x$, the inner output always lies in the domain of $f$.`,
                  math: String.raw`\operatorname{dom}(f\circ g)=\mathbb{R}`,
                },
                {
                  text: String.raw`Now apply $f$ first, then $g$.`,
                  math: String.raw`(g\circ f)(x)=g(f(x))=\bigl(\sqrt{x+4}\bigr)^2=x+4`,
                },
                {
                  text: String.raw`The simplification hides the restriction: $f$ only accepts $x\ge -4$, so the composite cannot accept smaller inputs.`,
                  math: String.raw`\operatorname{dom}(g\circ f)=[-4,\infty)`,
                },
                {
                  text: String.raw`Compare the results: the rules differ and so do the domains, confirming that composition order matters.`,
                },
              ],
              answer: String.raw`$(f\circ g)(x)=\sqrt{x^2+4}$ with domain $\mathbb{R}$; $(g\circ f)(x)=x+4$ with domain $[-4,\infty)$.`,
            },
            {
              title: 'Find an inverse after restricting the domain',
              problem: String.raw`The function $f(x)=x^2-4x+7$ is defined for $x\ge 2$. Find $f^{-1}(x)$ and state its domain.`,
              given: [
                String.raw`$f(x)=x^2-4x+7$ with $x\ge 2$.`,
                String.raw`The restriction $x\ge 2$ selects the right-hand branch of the parabola.`,
              ],
              steps: [
                {
                  text: String.raw`Complete the square to expose the vertex.`,
                  math: String.raw`f(x)=x^2-4x+4+3=(x-2)^2+3`,
                },
                {
                  text: String.raw`The squared term is non-negative, so the range is $y\ge 3$. This becomes the domain of the inverse.`,
                  math: String.raw`\operatorname{range}(f)=[3,\infty)`,
                },
                {
                  text: String.raw`Write $y=(x-2)^2+3$ and solve for $x$ in terms of $y$.`,
                  math: String.raw`y-3=(x-2)^2`,
                },
                {
                  text: String.raw`Because $x\ge 2$, the quantity $x-2$ is non-negative, so take the positive square root.`,
                  math: String.raw`x-2=\sqrt{y-3}\ \Rightarrow\ x=2+\sqrt{y-3}`,
                },
                {
                  text: String.raw`Swap the variable names to write the inverse as a function of $x$.`,
                  math: String.raw`f^{-1}(x)=2+\sqrt{x-3},\qquad x\ge 3`,
                },
                {
                  text: String.raw`Check with a point: $f(5)=25-20+7=12$ and $f^{-1}(12)=2+\sqrt{9}=5$.`,
                },
              ],
              answer: String.raw`$f^{-1}(x)=2+\sqrt{x-3}$ for $x\ge 3$. The domain $[3,\infty)$ is the range of the original restricted function.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Assuming $(f\circ g)(x)=(g\circ f)(x)$.`,
              correction: String.raw`Composition is not commutative. Substitute into each order separately and compare the resulting rules and domains.`,
            },
            {
              mistake: String.raw`Writing $f^{-1}(x)=\frac{1}{f(x)}$.`,
              correction: String.raw`The inverse function reverses the input-output pairing; it is not the reciprocal. For example, the inverse of $f(x)=4x-7$ is $\frac{x+7}{4}$, not $\frac{1}{4x-7}$.`,
            },
            {
              mistake: String.raw`Simplifying $(g\circ f)(x)$ to $x+4$ and declaring the domain to be all real numbers.`,
              correction: String.raw`The domain of a composite is determined before simplification. If $f$ requires $x\ge -4$, then the composite cannot accept any smaller input, even though the simplified expression is defined everywhere.`,
            },
          ],
          exercises: [
            {
              id: 'g11-invcomp-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Let $f(x)=3x-2$ and $g(x)=x+5$. Find $(f\circ g)(2)$.`,
              options: ['$19$', '$21$', '$13$', '$17$'],
              correctOption: 0,
              hint: String.raw`Evaluate $g(2)$ first, then feed the result into $f$.`,
              explanation: String.raw`$g(2)=2+5=7$, then $f(7)=3(7)-2=19$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-invcomp-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find the inverse of $f(x)=4x-7$.`,
              options: [
                String.raw`$f^{-1}(x)=\frac{x+7}{4}$`,
                String.raw`$f^{-1}(x)=\frac{x-7}{4}$`,
                String.raw`$f^{-1}(x)=4x+7$`,
                String.raw`$f^{-1}(x)=\frac{1}{4x-7}$`,
              ],
              correctOption: 0,
              hint: String.raw`Write $y=4x-7$, swap $x$ and $y$, then solve for $y$.`,
              explanation: String.raw`From $x=4y-7$ we get $4y=x+7$, so $y=\frac{x+7}{4}$. Check: $f\left(\frac{x+7}{4}\right)=4\cdot\frac{x+7}{4}-7=x$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-invcomp-ex-3',
              type: 'numeric',
              prompt: String.raw`Let $f(x)=x^2+1$ for $x\ge 0$. Find $f^{-1}(10)$.`,
              answer: 3,
              tolerance: 0.001,
              hint: String.raw`Solve $x^2+1=10$ and keep the solution allowed by the restriction $x\ge 0$.`,
              explanation: String.raw`$x^2+1=10$ gives $x^2=9$, so $x=3$ or $x=-3$. The restriction $x\ge 0$ rejects $-3$, leaving $f^{-1}(10)=3$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-invcomp-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`Let $f(x)=\sqrt{x}$ and $g(x)=x-3$. What is the domain of $f\circ g$?`,
              options: [String.raw`$x\ge 3$`, String.raw`$x\ge 0$`, String.raw`$x\ge -3$`, 'All real numbers'],
              correctOption: 0,
              hint: String.raw`The output $g(x)$ becomes the input of the square root.`,
              explanation: String.raw`$(f\circ g)(x)=\sqrt{x-3}$. The radicand must be non-negative: $x-3\ge 0$, so $x\ge 3$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-invcomp-ex-5',
              type: 'numeric',
              prompt: String.raw`Let $f(x)=2x+1$ and $g(x)=x^2$. Find the sum of all real $x$ satisfying $(g\circ f)(x)=(f\circ g)(x)$.`,
              answer: -2,
              tolerance: 0.001,
              hint: String.raw`Expand both composites, move everything to one side, and factor.`,
              explanation: String.raw`$(g\circ f)(x)=(2x+1)^2=4x^2+4x+1$ and $(f\circ g)(x)=2x^2+1$. Equating gives $2x^2+4x=0$, so $2x(x+2)=0$ and $x=0$ or $x=-2$. Their sum is $-2$.`,
              difficulty: 'hard',
            },
            {
              id: 'g11-invcomp-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`Let $f(x)=x^2-6x+5$ with $x\ge 3$. Which formula gives $f^{-1}(x)$?`,
              options: [
                String.raw`$3+\sqrt{x+4}$`,
                String.raw`$3-\sqrt{x+4}$`,
                String.raw`$\sqrt{x+4}-3$`,
                String.raw`$x+3$`,
              ],
              correctOption: 0,
              hint: String.raw`Complete the square: $x^2-6x+5=(x-3)^2-4$.`,
              explanation: String.raw`$y=(x-3)^2-4$ gives $(x-3)^2=y+4$. Since $x\ge 3$, take the positive root: $x=3+\sqrt{y+4}$. Thus $f^{-1}(x)=3+\sqrt{x+4}$ for $x\ge -4$. Check $f(7)=49-42+5=12$ and $f^{-1}(12)=3+4=7$.`,
              difficulty: 'hard',
            },
          ],
          related: [
            'functions-intro',
            'functions-and-transformations',
            'exponential-and-logarithmic-functions',
          ],
        },
      ],
    },
    {
      id: 'coordinate-geometry',
      family: 'coordinate-geometry',
      title: 'Coordinate Geometry',
      description:
        'Curves described by equations: circles built from a centre and radius, and parabolas built from a focus and directrix. Algebra and locus reasoning meet in every derivation.',
      theorems: [
        {
          title: 'Tangent–Radius Theorem',
          statement:
            'A tangent to a circle is perpendicular to the radius drawn to the point of contact.',
          note: 'This is why the tangent slope is the negative reciprocal of the radius slope, and why the distance from the centre to a tangent line equals the radius.',
        },
        {
          title: 'Reflection Property of a Parabola',
          statement:
            'The tangent at any point of a parabola makes equal angles with the focal segment and the line parallel to the axis of symmetry.',
          note: 'This property explains why parabolic dishes focus incoming parallel rays at the focus and why headlights use a bulb at the focus.',
        },
      ],
      topics: [
        {
          id: 'circles-in-coordinate-geometry',
          title: 'Circles in Coordinate Geometry',
          subtitle: 'Centre, radius and tangents read from an equation.',
          introduction: String.raw`A circle is the set of points at a fixed distance from a fixed centre. Translating that sentence into the distance formula gives the standard equation $(x-h)^2+(y-k)^2=r^2$. Expanding it produces the general form, and completing the square reverses the expansion. Tangency is then a distance condition: a line touches a circle exactly when its distance from the centre equals the radius.`,
          prerequisites: [
            'Distance and midpoint formulas (Grade 9)',
            'Completing the square (Grade 10)',
            'Slope, parallel and perpendicular lines (Grade 10)',
          ],
          keyIdeas: [
            String.raw`Standard form $(x-h)^2+(y-k)^2=r^2$ displays the centre $(h,k)$ and radius $r$ directly.`,
            'General form hides the centre and radius until the square is completed.',
            'A line is tangent exactly when its perpendicular distance from the centre equals the radius.',
            'The tangent at a point is perpendicular to the radius at that point.',
          ],
          aliases: [
            'circle equation',
            'centre and radius',
            'completing the square circle',
            'tangent to a circle',
            'general form of a circle',
          ],
          theory: [
            {
              title: 'The standard equation',
              body: [
                String.raw`Let the centre be $C(h,k)$ and the radius be $r>0$. A point $P(x,y)$ lies on the circle exactly when $CP=r$. Applying the distance formula and squaring both sides gives $(x-h)^2+(y-k)^2=r^2$. Squaring is safe here because both sides are non-negative.`,
                String.raw`The equation records horizontal and vertical displacement from the centre. If $h=0$ and $k=0$ the circle is centred at the origin and the equation simplifies to $x^2+y^2=r^2$. A circle is not the graph of a single function, because a vertical line through the interior meets it twice.`,
              ],
            },
            {
              title: 'General form and completing the square',
              body: [
                String.raw`Expanding the standard equation produces $x^2+y^2+Dx+Ey+F=0$, where $D=-2h$, $E=-2k$ and $F=h^2+k^2-r^2$. The coefficients of $x^2$ and $y^2$ are equal and there is no $xy$ term; those features identify a circle rather than another conic.`,
                String.raw`To recover the centre and radius, group the $x$-terms and $y$-terms, then complete each square. The equation becomes $(x+\frac{D}{2})^2+(y+\frac{E}{2})^2=\frac{D^2+E^2-4F}{4}$. The right-hand side must be positive for a real circle; zero gives a single point, and a negative value gives no real graph.`,
              ],
            },
            {
              title: 'Tangents and the distance condition',
              body: [
                String.raw`A line can miss a circle, cut it in two points, or touch it at exactly one point. In the tangent case, the radius to the contact point is perpendicular to the line. Equivalently, the perpendicular distance from the centre to the line equals the radius.`,
                String.raw`For a line $Ax+By+C=0$ and centre $(h,k)$, the distance is $d=\frac{|Ah+Bk+C|}{\sqrt{A^2+B^2}}$. Setting $d=r$ gives the tangency condition. To find the tangent at a known point, use the fact that the tangent slope is the negative reciprocal of the radius slope, then substitute the point.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-circle-standard',
              title: 'Standard equation of a circle',
              expression: String.raw`(x-h)^2+(y-k)^2=r^2`,
              description:
                'Describes all points at distance r from the centre (h, k).',
              spoken:
                'x minus h, squared, plus y minus k, squared, equals r squared.',
              variables: [
                { symbol: '(h,k)', name: 'centre of the circle' },
                { symbol: 'r', name: 'radius', note: 'must be positive' },
                { symbol: '(x,y)', name: 'any point on the circle' },
              ],
              conditions: [String.raw`$r>0$. If $r=0$ the graph is a single point, not a circle.`],
              notes:
                'The signs inside the brackets are opposite to the signs of the centre coordinates: (x - 3)^2 means h = 3.',
              tags: ['circle equation', 'centre', 'radius', 'standard form'],
            },
            {
              id: 'g11-circle-general',
              title: 'General equation of a circle',
              expression: String.raw`x^2+y^2+Dx+Ey+F=0`,
              description:
                'The expanded form of a circle equation, with equal coefficients on x squared and y squared and no xy term.',
              spoken:
                'x squared plus y squared plus D x plus E y plus F equals zero.',
              variables: [
                { symbol: 'D', name: 'coefficient of x', note: 'D = -2h' },
                { symbol: 'E', name: 'coefficient of y', note: 'E = -2k' },
                { symbol: 'F', name: 'constant term', note: 'F = h² + k² - r²' },
              ],
              conditions: [
                String.raw`The coefficients of $x^2$ and $y^2$ must be equal; divide through if they are not $1$.`,
                String.raw`There is no $xy$ term.`,
              ],
              notes:
                'If the coefficients of x² and y² are equal but not 1, divide the whole equation by that common coefficient first.',
              tags: ['general form', 'circle equation', 'expanded form', 'conic'],
            },
            {
              id: 'g11-circle-centre-radius',
              title: 'Centre and radius from general form',
              expression: String.raw`C\left(-\frac{D}{2},-\frac{E}{2}\right),\qquad r=\frac{1}{2}\sqrt{D^2+E^2-4F}`,
              description:
                'Recovers the centre and radius of a circle written in general form.',
              spoken:
                'The centre is at negative D over two, negative E over two, and the radius is one half times the square root of D squared plus E squared minus four F.',
              variables: [
                { symbol: 'D, E, F', name: 'coefficients of the general form' },
                { symbol: 'C', name: 'centre of the circle' },
                { symbol: 'r', name: 'radius' },
              ],
              conditions: [
                String.raw`$D^2+E^2-4F>0$ for a real circle.`,
                String.raw`Equal coefficients on $x^2$ and $y^2$, and no $xy$ term.`,
              ],
              notes:
                'If D² + E² - 4F = 0 the graph is one point; if it is negative there is no real graph. Completing the square is usually safer than memorising the formula.',
              tags: ['centre and radius', 'general form', 'circle', 'completing the square'],
            },
            {
              id: 'g11-circle-tangent',
              title: 'Tangency condition',
              expression: String.raw`\frac{|Ah+Bk+C|}{\sqrt{A^2+B^2}}=r`,
              description:
                'A line Ax + By + C = 0 is tangent to a circle when its perpendicular distance from the centre equals the radius.',
              spoken:
                'The absolute value of A h plus B k plus C, divided by the square root of A squared plus B squared, equals r.',
              variables: [
                { symbol: '(h,k)', name: 'centre of the circle' },
                { symbol: 'r', name: 'radius' },
                { symbol: 'A, B, C', name: 'coefficients of the line Ax + By + C = 0' },
              ],
              conditions: [
                String.raw`$A$ and $B$ are not both zero.`,
                String.raw`The line must be written with all terms on one side before applying the formula.`,
              ],
              notes:
                'If the distance is less than r the line is a secant; if it is greater than r the line misses the circle.',
              tags: ['tangent', 'distance from a point to a line', 'circle', 'tangency'],
            },
          ],
          examples: [
            {
              title: 'Find the centre and radius by completing the square',
              problem: String.raw`Find the centre and radius of the circle $x^2+y^2-6x+10y-2=0$.`,
              given: [
                String.raw`The equation is in general form with $D=-6$, $E=10$ and $F=-2$.`,
              ],
              steps: [
                {
                  text: String.raw`Group the $x$-terms and the $y$-terms.`,
                  math: String.raw`(x^2-6x)+(y^2+10y)=2`,
                },
                {
                  text: String.raw`Complete the square in $x$: half of $-6$ is $-3$, and $(-3)^2=9$.`,
                  math: String.raw`x^2-6x=(x-3)^2-9`,
                },
                {
                  text: String.raw`Complete the square in $y$: half of $10$ is $5$, and $5^2=25$.`,
                  math: String.raw`y^2+10y=(y+5)^2-25`,
                },
                {
                  text: String.raw`Substitute back and move the constants to the right.`,
                  math: String.raw`(x-3)^2-9+(y+5)^2-25=2`,
                },
                {
                  text: String.raw`Simplify the right-hand side.`,
                  math: String.raw`(x-3)^2+(y+5)^2=36`,
                },
                {
                  text: String.raw`Read off the centre and radius, and check with the general-form formula: $r=\frac{1}{2}\sqrt{36+100+8}=\frac{1}{2}\sqrt{144}=6$.`,
                },
              ],
              answer: String.raw`Centre $(3,-5)$ and radius $6$.`,
            },
            {
              title: 'Find the tangent at a point on a circle',
              problem: String.raw`Find the equation of the tangent to the circle $(x-2)^2+(y+1)^2=25$ at the point $(5,3)$.`,
              given: [
                String.raw`The centre is $(2,-1)$ and the radius is $5$.`,
                String.raw`The point $(5,3)$ is on the circle because $(5-2)^2+(3+1)^2=9+16=25$.`,
              ],
              steps: [
                {
                  text: String.raw`Find the slope of the radius from the centre to the point of contact.`,
                  math: String.raw`m_{\text{radius}}=\frac{3-(-1)}{5-2}=\frac{4}{3}`,
                },
                {
                  text: String.raw`The tangent is perpendicular to the radius, so its slope is the negative reciprocal.`,
                  math: String.raw`m_{\text{tangent}}=-\frac{3}{4}`,
                },
                {
                  text: String.raw`Use point-slope form with the point $(5,3)$.`,
                  math: String.raw`y-3=-\frac{3}{4}(x-5)`,
                },
                {
                  text: String.raw`Multiply by $4$ and rearrange into general form.`,
                  math: String.raw`4y-12=-3x+15 \ \Rightarrow\ 3x+4y=27`,
                },
                {
                  text: String.raw`Check tangency with the distance formula: the distance from $(2,-1)$ to $3x+4y-27=0$ is $\frac{|6-4-27|}{5}=\frac{25}{5}=5$, which equals the radius.`,
                },
              ],
              answer: String.raw`The tangent is $3x+4y=27$. Its distance from the centre is $5$, confirming tangency.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Reading the centre of $(x-3)^2+(y+5)^2=36$ as $(-3,5)$.`,
              correction: String.raw`The standard form is $(x-h)^2+(y-k)^2=r^2$, so the centre is $(3,-5)$. The signs inside the brackets are reversed.`,
            },
            {
              mistake: String.raw`Using $r=\sqrt{D^2+E^2-4F}$ without dividing by $2$.`,
              correction: String.raw`Completing the square produces a right-hand side of $\frac{D^2+E^2-4F}{4}$, so the radius is half the square root.`,
            },
            {
              mistake: String.raw`Using the radius slope as the tangent slope.`,
              correction: String.raw`The tangent is perpendicular to the radius, so its slope is the negative reciprocal, not the same slope.`,
            },
          ],
          exercises: [
            {
              id: 'g11-circle-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`State the centre and radius of $(x+1)^2+(y-4)^2=9$.`,
              options: [
                String.raw`Centre $(-1,4)$, radius $3$`,
                String.raw`Centre $(1,-4)$, radius $3$`,
                String.raw`Centre $(-1,4)$, radius $9$`,
                String.raw`Centre $(1,-4)$, radius $9$`,
              ],
              correctOption: 0,
              hint: String.raw`Compare with $(x-h)^2+(y-k)^2=r^2$.`,
              explanation: String.raw`$x+1=x-(-1)$ gives $h=-1$, and $y-4$ gives $k=4$. The right-hand side is $r^2=9$, so $r=3$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-circle-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find the radius of the circle $x^2+y^2-4x+6y-12=0$.`,
              options: ['$5$', '$10$', String.raw`$\sqrt{52}$`, '$25$'],
              correctOption: 0,
              hint: String.raw`Complete the square, or use $r=\frac{1}{2}\sqrt{D^2+E^2-4F}$.`,
              explanation: String.raw`$D=-4$, $E=6$, $F=-12$, so $D^2+E^2-4F=16+36+48=100$. Then $r=\frac{1}{2}\sqrt{100}=5$. Completing the square gives $(x-2)^2+(y+3)^2=25$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-circle-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the radius of the circle $x^2+y^2+8x-2y-8=0$.`,
              answer: 5,
              tolerance: 0.001,
              hint: String.raw`Group the terms and complete both squares.`,
              explanation: String.raw`$(x^2+8x)+(y^2-2y)=8$ becomes $(x+4)^2-16+(y-1)^2-1=8$, so $(x+4)^2+(y-1)^2=25$ and $r=5$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-circle-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`Which point lies on the circle $(x-1)^2+(y-2)^2=25$?`,
              options: ['$(4,6)$', '$(1,8)$', '$(5,2)$', '$(4,5)$'],
              correctOption: 0,
              hint: String.raw`Substitute each point and check whether the left-hand side equals $25$.`,
              explanation: String.raw`For $(4,6)$: $(4-1)^2+(6-2)^2=9+16=25$. The other points give $36$, $16$ and $18$, so they do not lie on the circle.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-circle-ex-5',
              type: 'numeric',
              prompt: String.raw`Find the perpendicular distance from the centre $(1,-2)$ to the line $3x-4y+5=0$.`,
              answer: 3.2,
              tolerance: 0.01,
              hint: String.raw`Use $d=\frac{|Ax_0+By_0+C|}{\sqrt{A^2+B^2}}$.`,
              explanation: String.raw`$d=\frac{|3(1)-4(-2)+5|}{\sqrt{9+16}}=\frac{|3+8+5|}{5}=\frac{16}{5}=3.2$. A circle centred at $(1,-2)$ with radius $3.2$ would be tangent to this line.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-circle-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`Find the tangent to the circle $x^2+y^2=25$ at the point $(3,4)$.`,
              options: [
                String.raw`$3x+4y=25$`,
                String.raw`$3x+4y=7$`,
                String.raw`$4x+3y=25$`,
                String.raw`$3x-4y=7$`,
              ],
              correctOption: 0,
              hint: String.raw`The radius to $(3,4)$ has slope $\frac{4}{3}$, so the tangent slope is $-\frac{3}{4}$.`,
              explanation: String.raw`The tangent has slope $-\frac{3}{4}$ and passes through $(3,4)$: $y-4=-\frac{3}{4}(x-3)$. Rearranging gives $3x+4y=25$. Check: the distance from the origin to this line is $\frac{25}{5}=5$, the radius.`,
              difficulty: 'medium',
            },
          ],
          related: ['circle-geometry', 'coordinate-geometry-of-lines', 'distance-midpoint-slope'],
        },
        {
          id: 'parabolas-as-conics',
          title: 'Parabolas as Conics',
          subtitle: 'The curve of points equidistant from a focus and a directrix.',
          introduction: String.raw`A parabola can be defined without any equation: it is the set of points whose distance to a fixed point (the focus) equals their distance to a fixed line (the directrix). Choosing coordinates so that the focus and directrix sit symmetrically about the origin turns this geometric sentence into $y^2=4px$ or $x^2=4py$. The same curve appears in quadratic graphs, satellite dishes and headlights, but here its defining property is distance, not a coefficient.`,
          prerequisites: [
            'Quadratic equations and completing the square (Grade 10)',
            'Distance formula and coordinate geometry (Grade 9)',
            'Graph transformations (Grade 10)',
          ],
          keyIdeas: [
            'A parabola is the locus of points equidistant from the focus and the directrix.',
            String.raw`The parameter $p$ is the directed distance from the vertex to the focus.`,
            String.raw`$y^2=4px$ opens sideways; $x^2=4py$ opens vertically.`,
            'The latus rectum passes through the focus perpendicular to the axis and has length $4|p|$.',
          ],
          aliases: [
            'parabola',
            'focus and directrix',
            'conic section',
            'latus rectum',
            'parabolic locus',
            'vertex form parabola',
          ],
          theory: [
            {
              title: 'The focus–directrix definition',
              body: [
                String.raw`Fix a point $F$ (the focus) and a line $\ell$ (the directrix) not passing through $F$. The parabola with focus $F$ and directrix $\ell$ is the set of points $P$ such that the distance $PF$ equals the perpendicular distance from $P$ to $\ell$. The vertex is the midpoint of the perpendicular segment from the focus to the directrix.`,
                String.raw`Place the vertex at the origin and the focus at $(p,0)$, so the directrix is $x=-p$. For a point $P(x,y)$, the distance to the focus is $\sqrt{(x-p)^2+y^2}$ and the distance to the directrix is $|x+p|$. Equating and squaring gives $y^2=4px$. The sign of $p$ decides the opening direction.`,
              ],
            },
            {
              title: 'Standard forms and their features',
              body: [
                String.raw`There are two basic orientations. A parabola opening left or right has equation $y^2=4px$: horizontal axis, vertex $(0,0)$, focus $(p,0)$ and directrix $x=-p$. A parabola opening up or down has equation $x^2=4py$: vertical axis, vertex $(0,0)$, focus $(0,p)$ and directrix $y=-p$.`,
                String.raw`A horizontal shift by $h$ and a vertical shift by $k$ moves the vertex to $(h,k)$. The sideways form becomes $(y-k)^2=4p(x-h)$ and the vertical form becomes $(x-h)^2=4p(y-k)$. In both cases the focus is $|p|$ units from the vertex along the axis, and the directrix is the same distance on the opposite side.`,
              ],
              bullets: [
                String.raw`$y^2=4px$: opens right if $p>0$, left if $p<0$.`,
                String.raw`$x^2=4py$: opens up if $p>0$, down if $p<0$.`,
                String.raw`Vertex form $(x-h)^2=4p(y-k)$: axis $x=h$, focus $(h,k+p)$, directrix $y=k-p$.`,
                String.raw`Latus rectum: the chord through the focus perpendicular to the axis, of length $4|p|$.`,
              ],
            },
            {
              title: 'Why the reflection property matters',
              body: [
                String.raw`At any point on a parabola, the tangent makes equal angles with the segment to the focus and the line parallel to the axis. A ray travelling parallel to the axis therefore reflects through the focus. This is the design principle of satellite dishes, reflecting telescopes and car headlights.`,
                String.raw`The same equation models projectile motion: a ball thrown near the Earth's surface follows a parabolic path when air resistance is ignored. In that model the vertex is the highest point and the axis is vertical, so the vertical standard form is the natural choice.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-parabola-locus',
              title: 'Focus–directrix equation',
              expression: String.raw`\sqrt{(x-p)^2+y^2}=|x+p|`,
              description:
                'States that the distance from a point on the parabola to the focus equals its distance to the directrix.',
              spoken:
                'The square root of x minus p squared plus y squared equals the absolute value of x plus p.',
              variables: [
                { symbol: '(p,0)', name: 'focus' },
                { symbol: 'x=-p', name: 'directrix' },
                { symbol: '(x,y)', name: 'a point on the parabola' },
              ],
              conditions: [String.raw`$p\ne 0$; the focus does not lie on the directrix.`],
              notes:
                'Squaring both sides gives y² = 4px. Squaring is valid because both distances are non-negative.',
              tags: ['focus', 'directrix', 'locus', 'parabola definition'],
            },
            {
              id: 'g11-parabola-standard',
              title: 'Sideways standard form',
              expression: String.raw`y^2=4px`,
              description:
                'A parabola with vertex at the origin, opening right for p > 0 and left for p < 0.',
              spoken:
                'y squared equals four p x.',
              variables: [
                { symbol: 'p', name: 'directed distance from vertex to focus' },
                { symbol: '(x,y)', name: 'a point on the parabola' },
              ],
              conditions: [String.raw`$p\ne 0$.`],
              notes:
                'Focus (p, 0), directrix x = -p, axis y = 0. The latus rectum has length 4|p|.',
              tags: ['parabola', 'standard form', 'horizontal axis', 'conic'],
            },
            {
              id: 'g11-parabola-vertical',
              title: 'Vertical parabola with vertex (h, k)',
              expression: String.raw`(x-h)^2=4p(y-k)`,
              description:
                'A parabola opening up or down, with vertex (h, k) and vertical axis x = h.',
              spoken:
                'x minus h, squared, equals four p times y minus k.',
              variables: [
                { symbol: '(h,k)', name: 'vertex' },
                { symbol: 'p', name: 'directed distance from vertex to focus' },
                { symbol: '(x,y)', name: 'a point on the parabola' },
              ],
              conditions: [String.raw`$p\ne 0$.`],
              notes:
                'Focus (h, k + p), directrix y = k - p. If p > 0 the parabola opens upward; if p < 0 it opens downward.',
              tags: ['parabola', 'vertex form', 'vertical axis', 'focus', 'directrix'],
            },
            {
              id: 'g11-parabola-latus',
              title: 'Length of the latus rectum',
              expression: String.raw`\ell=4|p|`,
              description:
                'Gives the length of the focal chord perpendicular to the axis of a parabola.',
              spoken:
                'The length of the latus rectum equals four times the absolute value of p.',
              variables: [
                { symbol: String.raw`\ell`, name: 'length of the latus rectum' },
                { symbol: 'p', name: 'directed distance from vertex to focus' },
              ],
              conditions: [String.raw`$p\ne 0$.`],
              notes:
                'The latus rectum is useful for sketching: it gives two more points, one on each side of the focus.',
              tags: ['latus rectum', 'focal chord', 'parabola', 'sketching'],
            },
          ],
          examples: [
            {
              title: 'Read the focus and directrix from a standard equation',
              problem: String.raw`For the parabola $y^2=12x$, find the focus, the directrix and the length of the latus rectum.`,
              given: [String.raw`The equation is $y^2=12x$, which has the sideways form $y^2=4px$.`],
              steps: [
                {
                  text: String.raw`Match coefficients: $4p=12$.`,
                  math: String.raw`p=3`,
                },
                {
                  text: String.raw`The positive value of $p$ means the parabola opens to the right. The focus lies $3$ units right of the vertex.`,
                  math: String.raw`F=(3,0)`,
                },
                {
                  text: String.raw`The directrix is the vertical line $3$ units left of the vertex.`,
                  math: String.raw`x=-3`,
                },
                {
                  text: String.raw`The latus rectum has length $4|p|$.`,
                  math: String.raw`\ell=4(3)=12`,
                },
                {
                  text: String.raw`Check with a point: $(3,6)$ lies on the parabola because $36=12(3)$, and its distance to the focus $(3,0)$ is $6$, equal to its distance to $x=-3$.`,
                },
              ],
              answer: String.raw`Focus $(3,0)$, directrix $x=-3$, latus rectum length $12$.`,
            },
            {
              title: 'Build a vertical parabola from its vertex and focus',
              problem: String.raw`A parabola has vertex $(2,-1)$ and focus $(2,3)$. Find its equation and directrix.`,
              given: [
                String.raw`Vertex $(h,k)=(2,-1)$.`,
                String.raw`Focus $(2,3)$ lies on the vertical line $x=2$, so the axis is vertical and the parabola opens upward.`,
              ],
              steps: [
                {
                  text: String.raw`Find $p$, the directed distance from the vertex to the focus.`,
                  math: String.raw`p=3-(-1)=4`,
                },
                {
                  text: String.raw`Use the vertical form with vertex $(h,k)$.`,
                  math: String.raw`(x-h)^2=4p(y-k)`,
                },
                {
                  text: String.raw`Substitute $h=2$, $k=-1$ and $p=4$.`,
                  math: String.raw`(x-2)^2=16(y+1)`,
                },
                {
                  text: String.raw`The directrix is $p$ units below the vertex.`,
                  math: String.raw`y=k-p=-1-4=-5`,
                },
                {
                  text: String.raw`Check the focus: $(h,k+p)=(2,-1+4)=(2,3)$, as required.`,
                },
              ],
              answer: String.raw`$(x-2)^2=16(y+1)$, with directrix $y=-5$ and focus $(2,3)$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Reading $y^2=12x$ as $4p=12x$ and concluding $p=3x$.`,
              correction: String.raw`Match the constant coefficient only: $4p=12$, so $p=3$. The variable $x$ is not part of $p$.`,
            },
            {
              mistake: String.raw`Placing the directrix on the same side of the vertex as the focus.`,
              correction: String.raw`The vertex is midway between the focus and the directrix. If the focus is $p$ units in one direction, the directrix is $|p|$ units in the opposite direction.`,
            },
            {
              mistake: String.raw`Using $(x-h)^2=4p(y-k)$ for a parabola that opens sideways.`,
              correction: String.raw`A squared $x$ term with a linear $y$ term gives a vertical axis. A squared $y$ term with a linear $x$ term gives a horizontal axis.`,
            },
          ],
          exercises: [
            {
              id: 'g11-parabola-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Find the focus of the parabola $x^2=8y$.`,
              options: ['$(0,2)$', '$(2,0)$', '$(0,8)$', '$(0,4)$'],
              correctOption: 0,
              hint: String.raw`The form $x^2=4py$ has a vertical axis and focus $(0,p)$.`,
              explanation: String.raw`$4p=8$, so $p=2$. The parabola opens upward with focus $(0,2)$ and directrix $y=-2$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-parabola-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find the directrix of the parabola $(y-2)^2=-8(x+1)$.`,
              options: ['$x=1$', '$x=-3$', '$y=1$', '$x=-1$'],
              correctOption: 0,
              hint: String.raw`This is a sideways parabola with vertex $(-1,2)$ and $4p=-8$.`,
              explanation: String.raw`$4p=-8$ gives $p=-2$. The vertex is $(-1,2)$, so the directrix is $x=h-p=-1-(-2)=1$. The parabola opens to the left because $p<0$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-parabola-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the value of $p$ for the parabola $y^2=-20x$.`,
              answer: -5,
              tolerance: 0.001,
              hint: String.raw`Compare with $y^2=4px$.`,
              explanation: String.raw`$4p=-20$, so $p=-5$. The negative value means the parabola opens to the left, with focus $(-5,0)$ and directrix $x=5$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-parabola-ex-4',
              type: 'numeric',
              prompt: String.raw`Find the length of the latus rectum of $y^2=16x$.`,
              answer: 16,
              tolerance: 0.001,
              hint: String.raw`The latus rectum length is $4|p|$, and $4p=16$.`,
              explanation: String.raw`$4p=16$, so $p=4$ and the latus rectum length is $4|4|=16$. It is the chord through the focus $(4,0)$ from $(4,8)$ to $(4,-8)$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-parabola-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`A parabola has focus $(0,3)$ and directrix $y=-3$. What is its equation?`,
              options: [
                String.raw`$x^2=12y$`,
                String.raw`$y^2=12x$`,
                String.raw`$x^2=3y$`,
                String.raw`$x^2=-12y$`,
              ],
              correctOption: 0,
              hint: String.raw`The vertex is midway between the focus and directrix, and the axis is vertical.`,
              explanation: String.raw`The vertex is $(0,0)$ and $p=3$, so $4p=12$. A vertical axis with the focus above the vertex gives $x^2=12y$. Check: the focus is $(0,3)$ and the directrix is $y=-3$.`,
              difficulty: 'hard',
            },
            {
              id: 'g11-parabola-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`State the vertex of $(x-2)^2=8(y+1)$.`,
              options: [
                String.raw`$(2,-1)$`,
                String.raw`$(-2,1)$`,
                String.raw`$(2,1)$`,
                String.raw`$(-2,-1)$`,
              ],
              correctOption: 0,
              hint: String.raw`Compare with $(x-h)^2=4p(y-k)$ and read the signs carefully.`,
              explanation: String.raw`$x-2=x-h$ gives $h=2$, and $y+1=y-k$ gives $k=-1$. The vertex is $(2,-1)$, the axis is $x=2$, and $4p=8$ so $p=2$.`,
              difficulty: 'easy',
            },
          ],
          related: [
            'quadratic-equations',
            'circles-in-coordinate-geometry',
            'conic-sections',
            'functions-and-transformations',
          ],
        },
      ],
    },
    {
      id: 'trigonometry',
      family: 'trigonometry',
      title: 'Trigonometry',
      description:
        'Angles measured in radians, coordinates on the unit circle, periodic graphs, identities and general solutions. The right-triangle ratios become functions defined for every angle.',
      theorems: [
        {
          title: 'Pythagorean Identity',
          statement: String.raw`For every angle $\theta$, $\sin^2\theta+\cos^2\theta=1$.`,
          note: 'The identity is the equation of the unit circle: the point (cos θ, sin θ) lies on x² + y² = 1.',
        },
        {
          title: 'Double-Angle Formulae',
          statement: String.raw`$\sin 2\theta=2\sin\theta\cos\theta$ and $\cos 2\theta=\cos^2\theta-\sin^2\theta=2\cos^2\theta-1=1-2\sin^2\theta$.`,
          note: 'The three forms of cos 2θ are equivalent by the Pythagorean identity; choose the one that matches the information given.',
        },
      ],
      topics: [
        {
          id: 'unit-circle-trigonometry',
          title: 'Unit Circle Trigonometry',
          subtitle: 'Radians, coordinates and the periodic graphs of sine, cosine and tangent.',
          introduction: String.raw`The unit circle turns trigonometry from a set of right-triangle ratios into a pair of functions defined for every angle. A point on the circle has coordinates $(\cos\theta,\sin\theta)$, so the signs of sine and cosine are simply the signs of $y$ and $x$ in each quadrant. Measuring angles in radians connects arc length to the circle and makes the graphs of sine and cosine periodic with period $2\pi$.`,
          prerequisites: [
            'Right-triangle trigonometry and special angles (Grade 10)',
            'Sine and cosine rules (Grade 10)',
            'Graph transformations (Grade 10)',
          ],
          keyIdeas: [
            String.raw`$\pi$ radians equals $180^{\circ}$; radians are dimensionless arc-length ratios.`,
            String.raw`On the unit circle, $\cos\theta$ is the $x$-coordinate and $\sin\theta$ is the $y$-coordinate.`,
            'ASTC records which functions are positive in each quadrant: All, Sine, Tangent, Cosine.',
            String.raw`$\sin$ and $\cos$ have period $2\pi$; $\tan$ has period $\pi$.`,
            String.raw`For $y=a\sin(b(x-c))+d$, amplitude is $|a|$, period is $\frac{2\pi}{|b|}$, phase shift is $c$ and midline is $y=d$.`,
          ],
          aliases: [
            'unit circle',
            'radians',
            'ASTC',
            'reference angle',
            'sine graph',
            'cosine graph',
            'tangent graph',
            'amplitude and period',
          ],
          theory: [
            {
              title: 'Radians and arc length',
              body: [
                String.raw`A radian is the angle subtended at the centre of a circle by an arc equal in length to the radius. A full turn is $2\pi$ radians, so $\pi$ radians $=180^{\circ}$. To convert degrees to radians, multiply by $\frac{\pi}{180}$; to convert radians to degrees, multiply by $\frac{180}{\pi}$.`,
                String.raw`Because the radian measure is defined as arc length divided by radius, the arc length formula is simply $s=r\theta$ when $\theta$ is in radians. This clean relationship is one reason radians are the natural unit in calculus and in the graphs of trigonometric functions.`,
              ],
              bullets: [
                String.raw`$30^{\circ}=\frac{\pi}{6}$, $45^{\circ}=\frac{\pi}{4}$, $60^{\circ}=\frac{\pi}{3}$, $90^{\circ}=\frac{\pi}{2}$.`,
                String.raw`$180^{\circ}=\pi$, $270^{\circ}=\frac{3\pi}{2}$, $360^{\circ}=2\pi$.`,
                String.raw`Arc length: $s=r\theta$ with $\theta$ in radians.`,
                'Always check whether a calculator is in degree or radian mode before evaluating.',
              ],
            },
            {
              title: 'Coordinates on the unit circle and ASTC',
              body: [
                String.raw`Let $\theta$ be measured anticlockwise from the positive $x$-axis. The terminal side meets the unit circle at $P(x,y)$, and we define $\cos\theta=x$ and $\sin\theta=y$. Then $\tan\theta=\frac{y}{x}$ wherever $x\ne 0$. This definition agrees with the right-triangle ratios in the first quadrant and extends them to all angles, including negative and reflex angles.`,
                String.raw`The reference angle is the acute angle between the terminal side and the $x$-axis. Evaluate the function at the reference angle, then attach the sign from the quadrant. ASTC is a mnemonic: in Quadrant I all functions are positive; in Quadrant II sine is positive; in Quadrant III tangent is positive; in Quadrant IV cosine is positive.`,
              ],
            },
            {
              title: 'Periodic graphs and transformations',
              body: [
                String.raw`As an angle increases, the point on the unit circle repeats every full turn, so $\sin(\theta+2\pi)=\sin\theta$ and $\cos(\theta+2\pi)=\cos\theta$. The tangent function repeats every half-turn because both $y$ and $x$ change sign together, so $\tan(\theta+\pi)=\tan\theta$. Tangent also has vertical asymptotes where $\cos\theta=0$.`,
                String.raw`The graph of $y=a\sin(b(x-c))+d$ is a sine wave with amplitude $|a|$, period $\frac{2\pi}{|b|}$, phase shift $c$ and vertical shift $d$. A negative $a$ reflects the wave in the horizontal axis. The maximum value is $d+|a|$ and the minimum is $d-|a|$, so the range is $[d-|a|,d+|a|]$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-unitrig-radian',
              title: 'Degree–radian conversion',
              expression: String.raw`\theta_{\text{rad}}=\theta^{\circ}\times\frac{\pi}{180^{\circ}}`,
              description:
                'Converts an angle measured in degrees to radians, using a full turn of 360 degrees equals 2 pi radians.',
              spoken:
                'Theta in radians equals theta in degrees times pi divided by one hundred eighty degrees.',
              variables: [
                { symbol: String.raw`\theta_{\text{rad}}`, name: 'angle in radians' },
                { symbol: String.raw`\theta^{\circ}`, name: 'angle in degrees' },
              ],
              conditions: ['Use the same angle unit throughout a calculation.'],
              notes:
                'To go the other way, multiply radians by 180/π. Radians are dimensionless, so the degree symbol cancels in the conversion factor.',
              tags: ['radians', 'degrees', 'angle conversion', 'unit circle'],
            },
            {
              id: 'g11-unitrig-definition',
              title: 'Unit circle definitions',
              expression: String.raw`\cos\theta=x,\qquad \sin\theta=y,\qquad \tan\theta=\frac{y}{x}`,
              description:
                'Defines cosine and sine as the coordinates of the point where the terminal side of the angle meets the unit circle.',
              spoken:
                'Cosine theta equals x, sine theta equals y, and tangent theta equals y divided by x.',
              variables: [
                { symbol: String.raw`\theta`, name: 'angle measured from the positive x-axis' },
                { symbol: '(x,y)', name: 'point on the unit circle' },
              ],
              conditions: [String.raw`$\tan\theta$ is undefined when $x=0$, that is, at $\theta=\frac{\pi}{2}+k\pi$.`],
              notes:
                'The point satisfies x² + y² = 1, which immediately gives sin²θ + cos²θ = 1.',
              tags: ['unit circle', 'cosine', 'sine', 'tangent', 'coordinates'],
            },
            {
              id: 'g11-unitrig-arc',
              title: 'Arc length',
              expression: String.raw`s=r\theta`,
              description:
                'Gives the length of an arc on a circle when the central angle is measured in radians.',
              spoken:
                'Arc length s equals radius r times angle theta in radians.',
              variables: [
                { symbol: 's', name: 'arc length', unit: 'same length unit as r' },
                { symbol: 'r', name: 'radius', note: 'must be positive' },
                { symbol: String.raw`\theta`, name: 'central angle in radians' },
              ],
              conditions: [
                String.raw`$\theta$ must be in radians; using degrees gives an incorrect result.`,
                String.raw`$r>0$ and $0\le\theta\le 2\pi$ for a simple arc.`,
              ],
              notes: 'The formula is the definition of radian measure rearranged: θ = s/r.',
              tags: ['arc length', 'radians', 'circle', 'sector'],
            },
            {
              id: 'g11-unitrig-sinusoid',
              title: 'Sinusoid parameters',
              expression: String.raw`y=a\sin\bigl(b(x-c)\bigr)+d`,
              description:
                'Describes a sine wave with amplitude, period, phase shift and vertical displacement.',
              spoken:
                'y equals a times sine of b times x minus c, plus d.',
              variables: [
                { symbol: 'a', name: 'amplitude factor', note: 'amplitude is |a|' },
                { symbol: 'b', name: 'frequency factor', note: 'period is 2π/|b|' },
                { symbol: 'c', name: 'phase shift', note: 'horizontal shift' },
                { symbol: 'd', name: 'midline', note: 'vertical shift' },
              ],
              conditions: [String.raw`$b\ne 0$.`],
              notes:
                'For cosine, replace sine with cosine. A negative a reflects the graph across its midline; the amplitude is still positive.',
              tags: ['amplitude', 'period', 'phase shift', 'sinusoid', 'sine graph'],
            },
          ],
          examples: [
            {
              title: 'Convert an angle and find exact trigonometric values',
              problem: String.raw`Convert $150^{\circ}$ to radians and find the exact values of $\sin 150^{\circ}$, $\cos 150^{\circ}$ and $\tan 150^{\circ}$.`,
              given: [
                String.raw`The angle is $150^{\circ}$, in Quadrant II.`,
                String.raw`The reference angle is $180^{\circ}-150^{\circ}=30^{\circ}$.`,
              ],
              steps: [
                {
                  text: String.raw`Multiply by $\frac{\pi}{180}$ and simplify.`,
                  math: String.raw`150^{\circ}\times\frac{\pi}{180^{\circ}}=\frac{150\pi}{180}=\frac{5\pi}{6}`,
                },
                {
                  text: String.raw`In Quadrant II, sine is positive and cosine is negative. Use the reference angle $30^{\circ}$.`,
                  math: String.raw`\sin 150^{\circ}=+\sin 30^{\circ}=\frac{1}{2}`,
                },
                {
                  text: String.raw`Cosine is negative in Quadrant II.`,
                  math: String.raw`\cos 150^{\circ}=-\cos 30^{\circ}=-\frac{\sqrt{3}}{2}`,
                },
                {
                  text: String.raw`Tangent is sine divided by cosine; it is negative in Quadrant II.`,
                  math: String.raw`\tan 150^{\circ}=\frac{\frac{1}{2}}{-\frac{\sqrt{3}}{2}}=-\frac{1}{\sqrt{3}}=-\frac{\sqrt{3}}{3}`,
                },
                {
                  text: String.raw`Check the signs with ASTC: Quadrant II has sine positive, cosine and tangent negative.`,
                },
              ],
              answer: String.raw`$150^{\circ}=\frac{5\pi}{6}$ radians, with $\sin 150^{\circ}=\frac{1}{2}$, $\cos 150^{\circ}=-\frac{\sqrt{3}}{2}$ and $\tan 150^{\circ}=-\frac{\sqrt{3}}{3}$.`,
            },
            {
              title: 'Read amplitude, period and phase shift from a sine function',
              problem: String.raw`For $y=3\sin\left(2x-\frac{\pi}{2}\right)+1$, state the amplitude, period, phase shift, midline and range.`,
              given: [String.raw`The function is $y=3\sin\left(2x-\frac{\pi}{2}\right)+1$.`],
              steps: [
                {
                  text: String.raw`Factor the coefficient of $x$ out of the bracket to reveal the phase shift.`,
                  math: String.raw`y=3\sin\left[2\left(x-\frac{\pi}{4}\right)\right]+1`,
                },
                {
                  text: String.raw`Compare with $y=a\sin(b(x-c))+d$: $a=3$, $b=2$, $c=\frac{\pi}{4}$ and $d=1$.`,
                },
                {
                  text: String.raw`Amplitude is $|a|$.`,
                  math: String.raw`\text{amplitude}=|3|=3`,
                },
                {
                  text: String.raw`Period is $\frac{2\pi}{|b|}$.`,
                  math: String.raw`\text{period}=\frac{2\pi}{2}=\pi`,
                },
                {
                  text: String.raw`The phase shift is $c=\frac{\pi}{4}$ to the right, and the midline is $y=1$.`,
                },
                {
                  text: String.raw`The range is the midline plus or minus the amplitude.`,
                  math: String.raw`[1-3,\,1+3]=[-2,4]`,
                },
              ],
              answer: String.raw`Amplitude $3$, period $\pi$, phase shift $\frac{\pi}{4}$ to the right, midline $y=1$, range $[-2,4]$.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Evaluating a trigonometric expression while the calculator is in the wrong angle mode.',
              correction: String.raw`Check the mode before calculating. $\sin 30^{\circ}=\frac{1}{2}$, but $\sin 30$ radians is approximately $-0.988$.`,
            },
            {
              mistake: String.raw`Giving $\cos 150^{\circ}$ a positive sign because the reference angle is $30^{\circ}$.`,
              correction: String.raw`The reference angle supplies the size, but the quadrant supplies the sign. In Quadrant II cosine is negative.`,
            },
            {
              mistake: String.raw`Using period $2\pi$ for the tangent function.`,
              correction: String.raw`Tangent repeats every $\pi$ radians, not $2\pi$. Its graph has vertical asymptotes at odd multiples of $\frac{\pi}{2}$.`,
            },
          ],
          exercises: [
            {
              id: 'g11-unitrig-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Convert $210^{\circ}$ to radians.`,
              options: [
                String.raw`$\frac{7\pi}{6}$`,
                String.raw`$\frac{5\pi}{6}$`,
                String.raw`$\frac{7\pi}{4}$`,
                String.raw`$\frac{11\pi}{6}$`,
              ],
              correctOption: 0,
              hint: String.raw`Multiply by $\frac{\pi}{180}$ and simplify the fraction.`,
              explanation: String.raw`$210\times\frac{\pi}{180}=\frac{210\pi}{180}=\frac{7\pi}{6}$. This is $30^{\circ}$ more than $\pi$, so it lies in Quadrant III.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-unitrig-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find the exact value of $\cos\frac{4\pi}{3}$.`,
              options: [
                String.raw`$-\frac{1}{2}$`,
                String.raw`$\frac{1}{2}$`,
                String.raw`$-\frac{\sqrt{3}}{2}$`,
                String.raw`$\frac{\sqrt{3}}{2}$`,
              ],
              correctOption: 0,
              hint: String.raw`$\frac{4\pi}{3}$ is $240^{\circ}$, in Quadrant III with reference angle $60^{\circ}$.`,
              explanation: String.raw`In Quadrant III cosine is negative, and the reference angle is $\frac{\pi}{3}$, so $\cos\frac{4\pi}{3}=-\cos\frac{\pi}{3}=-\frac{1}{2}$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-unitrig-ex-3',
              type: 'numeric',
              prompt: String.raw`A circle has radius $6\text{ cm}$. Find the length of the arc subtended by a central angle of $\frac{2\pi}{3}$ radians, correct to two decimal places.`,
              answer: 12.57,
              tolerance: 0.01,
              answerUnit: 'cm',
              hint: String.raw`Use $s=r\theta$ with $\theta$ already in radians.`,
              explanation: String.raw`$s=6\times\frac{2\pi}{3}=4\pi\approx 12.566$, so the arc length is approximately $12.57\text{ cm}$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-unitrig-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`If $\sin\theta>0$ and $\cos\theta<0$, in which quadrant does $\theta$ lie?`,
              options: ['Quadrant II', 'Quadrant I', 'Quadrant III', 'Quadrant IV'],
              correctOption: 0,
              hint: String.raw`Sine is the $y$-coordinate and cosine is the $x$-coordinate on the unit circle.`,
              explanation: String.raw`Sine positive means $y>0$ (upper half); cosine negative means $x<0$ (left half). Together they give Quadrant II.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-unitrig-ex-5',
              type: 'numeric',
              prompt: String.raw`Find the period of $y=4\sin\left(\frac{\pi x}{3}\right)$.`,
              answer: 6,
              tolerance: 0.001,
              hint: String.raw`Write the coefficient of $x$ as $b=\frac{\pi}{3}$, then use $\frac{2\pi}{|b|}$.`,
              explanation: String.raw`$b=\frac{\pi}{3}$, so the period is $\frac{2\pi}{\pi/3}=2\pi\times\frac{3}{\pi}=6$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-unitrig-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`Evaluate $\tan\frac{5\pi}{4}$.`,
              options: ['$1$', '$-1$', String.raw`$\frac{\sqrt{2}}{2}$`, String.raw`$-\frac{\sqrt{2}}{2}$`],
              correctOption: 0,
              hint: String.raw`$\frac{5\pi}{4}$ is $225^{\circ}$, in Quadrant III, with reference angle $\frac{\pi}{4}$.`,
              explanation: String.raw`In Quadrant III both sine and cosine are negative, so their ratio is positive. The reference angle is $\frac{\pi}{4}$, hence $\tan\frac{5\pi}{4}=\tan\frac{\pi}{4}=1$.`,
              difficulty: 'medium',
            },
          ],
          related: [
            'right-triangle-trigonometry',
            'sine-and-cosine-rules',
            'trigonometric-identities-and-equations',
          ],
        },
        {
          id: 'trigonometric-identities-and-equations',
          title: 'Trigonometric Identities and Equations',
          subtitle: 'Proving equivalence and capturing every solution.',
          introduction: String.raw`A trigonometric identity is an equation that holds for every angle in its domain; a trigonometric equation holds only for particular angles. Identities let you rewrite an expression into a form you can evaluate or solve. The Pythagorean, quotient, reciprocal and double-angle identities cover most Grade 11 problems. Solving equations then requires two extra habits: find all solutions in the requested interval, and express the general solution when no interval is given.`,
          prerequisites: [
            'Unit circle definitions and special angles',
            'Radian and degree measure',
            'Factoring quadratic expressions',
          ],
          keyIdeas: [
            String.raw`$\sin^2\theta+\cos^2\theta=1$ is the unit circle equation in disguise.`,
            'Quotient and reciprocal identities convert between the six trigonometric functions.',
            String.raw`Double-angle identities express a function of $2\theta$ in terms of functions of $\theta$.`,
            'An equation may have infinitely many solutions; the period determines how to write them all.',
            'Dividing by a trigonometric factor can lose solutions, so factor instead.',
          ],
          aliases: [
            'trig identities',
            'trigonometric equations',
            'general solution',
            'double angle',
            'Pythagorean identity',
            'solving trig equations',
          ],
          theory: [
            {
              title: 'The fundamental identities',
              body: [
                String.raw`On the unit circle, a point at angle $\theta$ has coordinates $(\cos\theta,\sin\theta)$ and lies on $x^2+y^2=1$. Substituting the coordinates gives $\sin^2\theta+\cos^2\theta=1$, the Pythagorean identity. Dividing this identity by $\cos^2\theta$ produces $1+\tan^2\theta=\sec^2\theta$, and dividing by $\sin^2\theta$ produces $1+\cot^2\theta=\csc^2\theta$.`,
                String.raw`The quotient identities follow directly from the definitions: $\tan\theta=\frac{\sin\theta}{\cos\theta}$ and $\cot\theta=\frac{\cos\theta}{\sin\theta}$. The reciprocal identities define cosecant, secant and cotangent. An identity is valid only where every expression in it is defined, so state restrictions such as $\cos\theta\ne 0$ when tangent or secant appears.`,
              ],
            },
            {
              title: 'Double-angle identities',
              body: [
                String.raw`The double-angle identities express trigonometric functions of $2\theta$ through functions of $\theta$. The sine form is $\sin 2\theta=2\sin\theta\cos\theta$. The cosine form has three equivalent versions: $\cos 2\theta=\cos^2\theta-\sin^2\theta=2\cos^2\theta-1=1-2\sin^2\theta$.`,
                String.raw`Choose the cosine version that matches the information you have. If $\cos\theta$ is known, use $2\cos^2\theta-1$; if $\sin\theta$ is known, use $1-2\sin^2\theta$; if both are known, any version works. Quick check at $\theta=30^{\circ}$: $\cos 60^{\circ}=\frac{1}{2}$ and $2\cos^2 30^{\circ}-1=2\cdot\frac{3}{4}-1=\frac{1}{2}$.`,
              ],
            },
            {
              title: 'Solving equations and writing general solutions',
              body: [
                String.raw`To solve a trigonometric equation, first reduce it to a single trigonometric function where possible. Factor rather than divide: dividing by $\sin\theta$ or $\cos\theta$ can discard the solutions where that factor is zero. A quadratic in $\sin\theta$ can be solved by factoring, just like a quadratic in $x$.`,
                String.raw`Within one period, sine and cosine usually produce two solutions per cycle unless the value is $0$, $1$ or $-1$. Use the reference angle and the quadrant to find them. For a general solution, add the period: $360^{\circ}k$ or $2\pi k$ for sine and cosine, and $180^{\circ}k$ or $\pi k$ for tangent, where $k$ is an integer. In radians, the principal values come from the same reference angles.`,
              ],
              bullets: [
                String.raw`$\sin\theta=\sin\alpha$ gives $\theta=\alpha+360^{\circ}k$ or $\theta=180^{\circ}-\alpha+360^{\circ}k$.`,
                String.raw`$\cos\theta=\cos\alpha$ gives $\theta=\pm\alpha+360^{\circ}k$.`,
                String.raw`$\tan\theta=\tan\alpha$ gives $\theta=\alpha+180^{\circ}k$.`,
                String.raw`In radians, replace $360^{\circ}$ by $2\pi$ and $180^{\circ}$ by $\pi$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-trigid-pythagorean',
              title: 'Pythagorean identity',
              expression: String.raw`\sin^2\theta+\cos^2\theta=1`,
              description:
                'Relates sine and cosine of the same angle and follows from the unit circle equation.',
              spoken:
                'Sine squared theta plus cosine squared theta equals one.',
              variables: [{ symbol: String.raw`\theta`, name: 'any angle' }],
              conditions: ['Valid for every real angle θ.'],
              notes:
                'Rearrangements: sin²θ = 1 - cos²θ and cos²θ = 1 - sin²θ. These are the most common substitutions in identity proofs.',
              tags: ['Pythagorean identity', 'sine squared', 'cosine squared', 'unit circle'],
            },
            {
              id: 'g11-trigid-quotient-reciprocal',
              title: 'Quotient and reciprocal identities',
              expression: String.raw`\tan\theta=\frac{\sin\theta}{\cos\theta},\qquad \csc\theta=\frac{1}{\sin\theta},\qquad \sec\theta=\frac{1}{\cos\theta},\qquad \cot\theta=\frac{\cos\theta}{\sin\theta}`,
              description:
                'Defines tangent and cotangent as ratios, and cosecant and secant as reciprocals.',
              spoken:
                'Tangent is sine over cosine; cosecant is one over sine; secant is one over cosine; cotangent is cosine over sine.',
              variables: [{ symbol: String.raw`\theta`, name: 'angle where the expressions are defined' }],
              conditions: [
                String.raw`$\cos\theta\ne 0$ for $\tan\theta$ and $\sec\theta$.`,
                String.raw`$\sin\theta\ne 0$ for $\cot\theta$ and $\csc\theta$.`,
              ],
              notes:
                'Cotangent is also the reciprocal of tangent, but the ratio form is usually more useful in proofs.',
              tags: ['quotient identity', 'reciprocal identity', 'secant', 'cosecant', 'cotangent'],
            },
            {
              id: 'g11-trigid-double',
              title: 'Double-angle identities',
              expression: String.raw`\sin 2\theta=2\sin\theta\cos\theta,\qquad \cos 2\theta=\cos^2\theta-\sin^2\theta`,
              description:
                'Expresses sine and cosine of twice an angle in terms of sine and cosine of the original angle.',
              spoken:
                'Sine of two theta equals two sine theta cosine theta. Cosine of two theta equals cosine squared theta minus sine squared theta.',
              variables: [{ symbol: String.raw`\theta`, name: 'any angle' }],
              conditions: ['Valid for every real angle θ.'],
              notes:
                'Cosine has two other forms: 2cos²θ - 1 and 1 - 2sin²θ. Use the form that matches the known value.',
              tags: ['double angle', 'sin 2 theta', 'cos 2 theta', 'trigonometric identity'],
            },
            {
              id: 'g11-trigid-general',
              title: 'General solution form',
              expression: String.raw`\theta=\theta_0+360^{\circ}k\qquad\text{or}\qquad \theta=\theta_0+2\pi k`,
              description:
                'Records every angle coterminal with a known solution by adding whole periods.',
              spoken:
                'Theta equals theta zero plus three hundred sixty degrees times k, or theta zero plus two pi times k, where k is an integer.',
              variables: [
                { symbol: String.raw`\theta_0`, name: 'a known solution in the principal period' },
                { symbol: 'k', name: 'any integer' },
              ],
              conditions: [
                String.raw`Use $360^{\circ}k$ or $2\pi k$ for sine and cosine.`,
                String.raw`Use $180^{\circ}k$ or $\pi k$ for tangent.`,
              ],
              notes:
                'A general solution must include every family of solutions, not just the one produced by a calculator inverse function.',
              tags: ['general solution', 'periodic solutions', 'coterminal angles', 'trig equation'],
            },
          ],
          examples: [
            {
              title: 'Simplify a trigonometric expression',
              problem: String.raw`Simplify $\frac{1-\cos^2\theta}{\sin\theta\cos\theta}$, stating any restrictions.`,
              given: [String.raw`The expression is $\frac{1-\cos^2\theta}{\sin\theta\cos\theta}$.`],
              steps: [
                {
                  text: String.raw`Use the Pythagorean identity rearranged as $1-\cos^2\theta=\sin^2\theta$.`,
                  math: String.raw`\frac{1-\cos^2\theta}{\sin\theta\cos\theta}=\frac{\sin^2\theta}{\sin\theta\cos\theta}`,
                },
                {
                  text: String.raw`Cancel one factor of $\sin\theta$, which requires $\sin\theta\ne 0$.`,
                  math: String.raw`=\frac{\sin\theta}{\cos\theta}`,
                },
                {
                  text: String.raw`Apply the quotient identity.`,
                  math: String.raw`=\tan\theta`,
                },
                {
                  text: String.raw`State the restrictions: the original denominator requires $\sin\theta\ne 0$ and $\cos\theta\ne 0$.`,
                  math: String.raw`\theta\ne 90^{\circ}k \text{ and } \theta\ne 180^{\circ}k`,
                },
              ],
              answer: String.raw`$\tan\theta$, provided $\sin\theta\ne 0$ and $\cos\theta\ne 0$.`,
            },
            {
              title: 'Solve a trigonometric quadratic and give the general solution',
              problem: String.raw`Solve $2\sin^2x-\sin x-1=0$ for $0^{\circ}\le x<360^{\circ}$, then state the general solution.`,
              given: [String.raw`The equation is $2\sin^2x-\sin x-1=0$.`],
              steps: [
                {
                  text: String.raw`Treat the equation as a quadratic in $\sin x$ and factor.`,
                  math: String.raw`(2\sin x+1)(\sin x-1)=0`,
                },
                {
                  text: String.raw`Set each factor to zero.`,
                  math: String.raw`\sin x=-\frac{1}{2}\qquad\text{or}\qquad \sin x=1`,
                },
                {
                  text: String.raw`For $\sin x=1$ in the required interval, the only solution is $90^{\circ}$.`,
                  math: String.raw`x=90^{\circ}`,
                },
                {
                  text: String.raw`For $\sin x=-\frac{1}{2}$, the reference angle is $30^{\circ}$ and sine is negative in Quadrants III and IV.`,
                  math: String.raw`x=180^{\circ}+30^{\circ}=210^{\circ},\qquad x=360^{\circ}-30^{\circ}=330^{\circ}`,
                },
                {
                  text: String.raw`Check each value in the original equation: $x=90^{\circ}$ gives $2-1-1=0$; $x=210^{\circ}$ and $x=330^{\circ}$ both give $2\left(\frac{1}{4}\right)+\frac{1}{2}-1=0$.`,
                },
                {
                  text: String.raw`Add $360^{\circ}k$ to each solution family for the general solution.`,
                  math: String.raw`x=90^{\circ}+360^{\circ}k,\quad x=210^{\circ}+360^{\circ}k,\quad x=330^{\circ}+360^{\circ}k`,
                },
              ],
              answer: String.raw`In $[0^{\circ},360^{\circ})$: $x=90^{\circ},210^{\circ},330^{\circ}$. General solution: $x=90^{\circ}+360^{\circ}k$, $x=210^{\circ}+360^{\circ}k$ or $x=330^{\circ}+360^{\circ}k$, $k\in\mathbb{Z}$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Dividing both sides of $\sin x\cos x=\sin x$ by $\sin x$ and losing the solutions where $\sin x=0$.`,
              correction: String.raw`Move everything to one side and factor: $\sin x(\cos x-1)=0$. Then solve each factor separately, including $\sin x=0$.`,
            },
            {
              mistake: String.raw`Giving only the calculator's principal value as the complete solution.`,
              correction: String.raw`Sine and cosine usually have two solutions per full turn, and all solutions repeat with the period. Use the reference angle, the quadrant and the general-solution form.`,
            },
            {
              mistake: String.raw`Mixing degrees and radians in one general solution, such as $x=30^{\circ}+2\pi k$.`,
              correction: String.raw`Choose one unit. In degrees use $360^{\circ}k$; in radians use $2\pi k$. Never combine a degree value with a radian period.`,
            },
          ],
          exercises: [
            {
              id: 'g11-trigid-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Simplify $\frac{\sin\theta}{\cos\theta}+\frac{\cos\theta}{\sin\theta}$.`,
              options: [
                String.raw`$\frac{1}{\sin\theta\cos\theta}$`,
                String.raw`$\sin\theta+\cos\theta$`,
                String.raw`$\tan\theta$`,
                '$1$',
              ],
              correctOption: 0,
              hint: String.raw`Write both fractions over the common denominator $\sin\theta\cos\theta$.`,
              explanation: String.raw`$\frac{\sin^2\theta+\cos^2\theta}{\sin\theta\cos\theta}=\frac{1}{\sin\theta\cos\theta}$ by the Pythagorean identity. The expression is defined when $\sin\theta\cos\theta\ne 0$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-trigid-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`If $\sin\theta=\frac{3}{5}$ and $\theta$ is acute, find $\sin 2\theta$.`,
              options: [
                String.raw`$\frac{24}{25}$`,
                String.raw`$\frac{7}{25}$`,
                String.raw`$\frac{12}{25}$`,
                String.raw`$\frac{6}{5}$`,
              ],
              correctOption: 0,
              hint: String.raw`Find $\cos\theta$ from a 3-4-5 triangle, then use $\sin 2\theta=2\sin\theta\cos\theta$.`,
              explanation: String.raw`Acute $\theta$ with $\sin\theta=\frac{3}{5}$ gives $\cos\theta=\frac{4}{5}$. Then $\sin 2\theta=2\cdot\frac{3}{5}\cdot\frac{4}{5}=\frac{24}{25}$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-trigid-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the smallest positive solution in degrees of $2\cos x=1$.`,
              answer: 60,
              tolerance: 0.01,
              answerUnit: '°',
              hint: String.raw`Solve $\cos x=\frac{1}{2}$ and use the first-quadrant solution.`,
              explanation: String.raw`$\cos x=\frac{1}{2}$ gives $x=60^{\circ}$ or $x=300^{\circ}$ in $[0^{\circ},360^{\circ})$. The smallest positive solution is $60^{\circ}$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-trigid-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`Which is the general solution of $\sin x=\frac{1}{2}$ in radians?`,
              options: [
                String.raw`$x=\frac{\pi}{6}+2\pi k$ or $x=\frac{5\pi}{6}+2\pi k$`,
                String.raw`$x=\frac{\pi}{6}+\pi k$`,
                String.raw`$x=\frac{\pi}{3}+2\pi k$`,
                String.raw`$x=\frac{\pi}{6}+2\pi k$ only`,
              ],
              correctOption: 0,
              hint: String.raw`Sine is positive in Quadrants I and II, and repeats every $2\pi$.`,
              explanation: String.raw`The principal solution is $\frac{\pi}{6}$; the second solution in the same period is $\pi-\frac{\pi}{6}=\frac{5\pi}{6}$. Adding $2\pi k$ to each gives the full solution set.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-trigid-ex-5',
              type: 'numeric',
              prompt: String.raw`How many solutions does $\sin 2x=0$ have in the interval $[0,2\pi)$?`,
              answer: 4,
              tolerance: 0.001,
              hint: String.raw`Solve $2x=0,\pi,2\pi,3\pi$ and check which $x$ values lie in the interval.`,
              explanation: String.raw`$2x=k\pi$ gives $x=\frac{k\pi}{2}$. In $[0,2\pi)$ the values are $0,\frac{\pi}{2},\pi,\frac{3\pi}{2}$, four solutions. The next value $2\pi$ is excluded.`,
              difficulty: 'hard',
            },
            {
              id: 'g11-trigid-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`If $\cos\theta=\frac{1}{3}$, find $\cos 2\theta$.`,
              options: [
                String.raw`$-\frac{7}{9}$`,
                String.raw`$\frac{2}{3}$`,
                String.raw`$-\frac{2}{3}$`,
                String.raw`$\frac{7}{9}$`,
              ],
              correctOption: 0,
              hint: String.raw`Use $\cos 2\theta=2\cos^2\theta-1$.`,
              explanation: String.raw`$\cos 2\theta=2\left(\frac{1}{3}\right)^2-1=\frac{2}{9}-1=-\frac{7}{9}$.`,
              difficulty: 'medium',
            },
          ],
          related: [
            'unit-circle-trigonometry',
            'right-triangle-trigonometry',
            'sine-and-cosine-rules',
          ],
        },
      ],
    },
    {
      id: 'vectors-matrices',
      family: 'vectors-matrices',
      title: 'Vectors & Matrices',
      description:
        'Two languages for linear structure: vectors encode magnitude and direction in the plane, while matrices act on vectors and solve systems of equations.',
      theorems: [
        {
          title: 'Perpendicular Dot Product Criterion',
          statement: String.raw`Two non-zero vectors $\mathbf{a}$ and $\mathbf{b}$ are perpendicular exactly when $\mathbf{a}\cdot\mathbf{b}=0$.`,
          note: 'The dot product is zero when cos θ = 0, that is, when θ = 90°.',
        },
        {
          title: 'Determinant Product Rule',
          statement: String.raw`For square matrices $A$ and $B$ of the same size, $\det(AB)=\det A\det B$.`,
          note: 'In particular, the determinant of a 2×2 matrix is zero exactly when the matrix has no inverse.',
        },
        {
          title: 'Invertibility Criterion',
          statement: String.raw`A 2×2 matrix $A$ is invertible if and only if $\det A\ne 0$.`,
          note: 'A zero determinant collapses area to zero; the transformation cannot be reversed.',
        },
      ],
      topics: [
        {
          id: 'vectors-in-two-dimensions',
          title: 'Vectors in Two Dimensions',
          subtitle: 'Components, magnitude, direction and the dot product.',
          introduction: String.raw`A vector records a displacement: how far and in which direction. In the plane it is written as an ordered pair $\mathbf{v}=(x,y)$ or as a column. Component form makes addition and scalar multiplication straightforward, while the dot product measures how much two vectors point the same way. Together these operations connect algebra to geometry: lengths, angles and perpendicularity all become calculations.`,
          prerequisites: [
            'Pythagorean theorem and distance (Grade 8)',
            'Right-triangle trigonometry (Grade 10)',
            'Coordinate geometry and transformations (Grade 10)',
          ],
          keyIdeas: [
            'A vector has magnitude and direction; its components are its horizontal and vertical changes.',
            'Adding vectors places them tip to tail; scalar multiplication changes length and possibly direction.',
            String.raw`The magnitude of $(x,y)$ is $\sqrt{x^2+y^2}$.`,
            'The dot product is a scalar and encodes the angle between the vectors.',
            'The direction angle needs the quadrant, not just the calculator inverse tangent.',
          ],
          aliases: [
            'vectors',
            '2D vectors',
            'dot product',
            'scalar product',
            'magnitude and direction',
            'unit vector',
            'components',
          ],
          theory: [
            {
              title: 'Components, magnitude and direction',
              body: [
                String.raw`A two-dimensional vector $\mathbf{v}=(x,y)$ represents a displacement of $x$ units horizontally and $y$ units vertically. Two vectors are equal when their components are equal, regardless of where they are drawn. The zero vector $(0,0)$ has no direction.`,
                String.raw`The magnitude is the length of the arrow, found from the Pythagorean theorem: $|\mathbf{v}|=\sqrt{x^2+y^2}$. The direction angle $\theta$ is measured anticlockwise from the positive $x$-axis. Its reference angle is $\tan^{-1}\left|\frac{y}{x}\right|$; adjust by quadrant when $x<0$. If $x=0$, the vector points straight up or down.`,
              ],
            },
            {
              title: 'Vector operations and unit vectors',
              body: [
                String.raw`Multiplying by a scalar $k$ multiplies both components: $k(x,y)=(kx,ky)$. If $k>0$ the direction is unchanged and the length is multiplied by $k$; if $k<0$ the direction reverses. Addition is componentwise: $(a_1,a_2)+(b_1,b_2)=(a_1+b_1,a_2+b_2)$. Geometrically, place the tail of the second arrow at the tip of the first.`,
                String.raw`A unit vector has length $1$ and records direction alone. Every non-zero vector has a unit vector in its direction, $\hat{\mathbf{v}}=\frac{\mathbf{v}}{|\mathbf{v}|}$. In two dimensions, the standard basis vectors are $\mathbf{i}=(1,0)$ and $\mathbf{j}=(0,1)$, so $(x,y)=x\mathbf{i}+y\mathbf{j}$.`,
              ],
            },
            {
              title: 'The dot product and angles',
              body: [
                String.raw`The dot product of $\mathbf{a}=(a_1,a_2)$ and $\mathbf{b}=(b_1,b_2)$ is the scalar $a_1b_1+a_2b_2$. It is not a vector and cannot be added to a vector. The geometric form is $\mathbf{a}\cdot\mathbf{b}=|\mathbf{a}||\mathbf{b}|\cos\theta$, where $\theta$ is the angle between the vectors.`,
                String.raw`The dot product is positive when the angle is acute, zero when the vectors are perpendicular, and negative when the angle is obtuse. This gives a fast perpendicularity test. It also gives the angle formula $\cos\theta=\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$, valid for non-zero vectors. The scalar projection of $\mathbf{a}$ onto $\mathbf{b}$ is $\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|}$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-vec2-magnitude',
              title: 'Magnitude of a vector',
              expression: String.raw`|\mathbf{v}|=\sqrt{x^2+y^2}`,
              description:
                'Gives the length of the vector with components x and y.',
              spoken:
                'The magnitude of vector v equals the square root of x squared plus y squared.',
              variables: [
                { symbol: String.raw`\mathbf{v}`, name: 'vector' },
                { symbol: 'x, y', name: 'horizontal and vertical components' },
                { symbol: String.raw`|\mathbf{v}|`, name: 'magnitude (length)' },
              ],
              conditions: ['The magnitude is always non-negative; it is zero only for the zero vector.'],
              notes:
                'This is the distance formula applied to the point (x, y) and the origin.',
              tags: ['magnitude', 'vector length', 'components', 'distance'],
            },
            {
              id: 'g11-vec2-unit',
              title: 'Unit vector',
              expression: String.raw`\hat{\mathbf{v}}=\frac{\mathbf{v}}{|\mathbf{v}|}`,
              description:
                'Scales a non-zero vector to length one while preserving its direction.',
              spoken:
                'The unit vector v hat equals vector v divided by its magnitude.',
              variables: [
                { symbol: String.raw`\mathbf{v}`, name: 'non-zero vector' },
                { symbol: String.raw`\hat{\mathbf{v}}`, name: 'unit vector in the direction of v' },
              ],
              conditions: [String.raw`$\mathbf{v}\ne\mathbf{0}$; division by zero is undefined.`],
              notes:
                'The unit vector has magnitude 1, so it carries direction only. A vector can be written as its magnitude times its unit vector.',
              tags: ['unit vector', 'direction', 'normalisation', 'vector'],
            },
            {
              id: 'g11-vec2-dot',
              title: 'Dot product',
              expression: String.raw`\mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2=|\mathbf{a}||\mathbf{b}|\cos\theta`,
              description:
                'Multiplies matching components and adds, giving a scalar that measures alignment.',
              spoken:
                'a dot b equals a one b one plus a two b two, which also equals the magnitude of a times the magnitude of b times cosine theta.',
              variables: [
                { symbol: String.raw`\mathbf{a}, \mathbf{b}`, name: 'vectors' },
                { symbol: 'a_1, a_2', name: 'components of a' },
                { symbol: 'b_1, b_2', name: 'components of b' },
                { symbol: String.raw`\theta`, name: 'angle between the vectors' },
              ],
              conditions: ['Both vectors must have the same dimension.'],
              notes:
                'The dot product is commutative and distributes over addition. A zero dot product means perpendicular non-zero vectors.',
              tags: ['dot product', 'scalar product', 'angle between vectors', 'components'],
            },
            {
              id: 'g11-vec2-angle',
              title: 'Angle between two vectors',
              expression: String.raw`\cos\theta=\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{a}||\mathbf{b}|}`,
              description:
                'Finds the cosine of the angle between two non-zero vectors from their dot product and magnitudes.',
              spoken:
                'Cosine theta equals a dot b divided by the product of their magnitudes.',
              variables: [
                { symbol: String.raw`\theta`, name: 'angle between the vectors', note: 'between 0° and 180°' },
                { symbol: String.raw`\mathbf{a}, \mathbf{b}`, name: 'non-zero vectors' },
              ],
              conditions: [
                String.raw`$\mathbf{a}\ne\mathbf{0}$ and $\mathbf{b}\ne\mathbf{0}$.`,
                String.raw`The angle returned by $\cos^{-1}$ lies in $[0^{\circ},180^{\circ}]$.`,
              ],
              notes:
                'If the dot product is zero, cos θ = 0 and θ = 90°, so the vectors are perpendicular.',
              tags: ['angle between vectors', 'dot product', 'cosine', 'perpendicular'],
            },
          ],
          examples: [
            {
              title: 'Combine vectors and find a unit vector',
              problem: String.raw`Let $\mathbf{a}=(3,-4)$ and $\mathbf{b}=(2,5)$. Find $\mathbf{a}+\mathbf{b}$, $2\mathbf{a}-\mathbf{b}$, $|\mathbf{a}|$ and the unit vector in the direction of $\mathbf{a}$.`,
              given: [
                String.raw`$\mathbf{a}=(3,-4)$.`,
                String.raw`$\mathbf{b}=(2,5)$.`,
              ],
              steps: [
                {
                  text: String.raw`Add corresponding components.`,
                  math: String.raw`\mathbf{a}+\mathbf{b}=(3+2,\,-4+5)=(5,1)`,
                },
                {
                  text: String.raw`Double $\mathbf{a}$, then subtract $\mathbf{b}$ componentwise.`,
                  math: String.raw`2\mathbf{a}-\mathbf{b}=(6,-8)-(2,5)=(4,-13)`,
                },
                {
                  text: String.raw`Use the magnitude formula.`,
                  math: String.raw`|\mathbf{a}|=\sqrt{3^2+(-4)^2}=\sqrt{9+16}=5`,
                },
                {
                  text: String.raw`Divide $\mathbf{a}$ by its magnitude.`,
                  math: String.raw`\hat{\mathbf{a}}=\frac{1}{5}(3,-4)=\left(\frac{3}{5},-\frac{4}{5}\right)`,
                },
                {
                  text: String.raw`Check the unit vector's length: $\sqrt{\frac{9}{25}+\frac{16}{25}}=1$.`,
                },
              ],
              answer: String.raw`$\mathbf{a}+\mathbf{b}=(5,1)$, $2\mathbf{a}-\mathbf{b}=(4,-13)$, $|\mathbf{a}|=5$, and $\hat{\mathbf{a}}=\left(\frac{3}{5},-\frac{4}{5}\right)$.`,
            },
            {
              title: 'Use the dot product to find an angle',
              problem: String.raw`Find the angle between $\mathbf{a}=(1,2)$ and $\mathbf{b}=(3,-1)$.`,
              given: [
                String.raw`$\mathbf{a}=(1,2)$ and $\mathbf{b}=(3,-1)$.`,
              ],
              steps: [
                {
                  text: String.raw`Compute the dot product.`,
                  math: String.raw`\mathbf{a}\cdot\mathbf{b}=1(3)+2(-1)=3-2=1`,
                },
                {
                  text: String.raw`Find both magnitudes.`,
                  math: String.raw`|\mathbf{a}|=\sqrt{1+4}=\sqrt{5},\qquad |\mathbf{b}|=\sqrt{9+1}=\sqrt{10}`,
                },
                {
                  text: String.raw`Substitute into the angle formula.`,
                  math: String.raw`\cos\theta=\frac{1}{\sqrt{5}\sqrt{10}}=\frac{1}{\sqrt{50}}`,
                },
                {
                  text: String.raw`Simplify and evaluate the inverse cosine.`,
                  math: String.raw`\cos\theta=\frac{1}{5\sqrt{2}}=\frac{\sqrt{2}}{10}\approx 0.1414`,
                },
                {
                  text: String.raw`$\theta=\cos^{-1}(0.1414)\approx 81.87^{\circ}$. The positive dot product confirms an acute angle.`,
                },
              ],
              answer: String.raw`$\theta\approx 81.87^{\circ}$. The exact cosine is $\frac{\sqrt{2}}{10}$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Reporting the direction angle as $\tan^{-1}\left(\frac{y}{x}\right)$ without checking the quadrant.`,
              correction: String.raw`The inverse tangent only returns angles between $-90^{\circ}$ and $90^{\circ}$. Add $180^{\circ}$ when the vector points into Quadrant II or III, and handle $x=0$ separately.`,
            },
            {
              mistake: String.raw`Treating the dot product as a vector, for example writing $\mathbf{a}\cdot\mathbf{b}=(3,7)$.`,
              correction: String.raw`The dot product of two vectors is a single number, not a vector. Only the sum or scalar multiple of vectors is a vector.`,
            },
            {
              mistake: String.raw`Using $|\mathbf{a}+\mathbf{b}|=|\mathbf{a}|+|\mathbf{b}|$ as if magnitudes added linearly.`,
              correction: String.raw`Magnitudes do not generally add. Add the vectors first, then compute the magnitude of the resultant; the triangle inequality gives only $|\mathbf{a}+\mathbf{b}|\le|\mathbf{a}|+|\mathbf{b}|$.`,
            },
          ],
          exercises: [
            {
              id: 'g11-vec2-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Find the magnitude of $\mathbf{v}=(-6,8)$.`,
              options: ['$10$', '$14$', '$2$', '$100$'],
              correctOption: 0,
              hint: String.raw`Use $|\mathbf{v}|=\sqrt{x^2+y^2}$.`,
              explanation: String.raw`$|\mathbf{v}|=\sqrt{(-6)^2+8^2}=\sqrt{36+64}=\sqrt{100}=10$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-vec2-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Compute $\mathbf{a}\cdot\mathbf{b}$ for $\mathbf{a}=(2,-3)$ and $\mathbf{b}=(4,1)$.`,
              options: ['$5$', '$11$', '$-5$', '$8$'],
              correctOption: 0,
              hint: String.raw`Multiply matching components and add: $2(4)+(-3)(1)$.`,
              explanation: String.raw`$\mathbf{a}\cdot\mathbf{b}=2(4)+(-3)(1)=8-3=5$. The positive value means the angle between the vectors is acute.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-vec2-ex-3',
              type: 'numeric',
              prompt: String.raw`For $\mathbf{a}=(1,2)$ and $\mathbf{b}=(3,-1)$, find $|\mathbf{a}+\mathbf{b}|$ correct to two decimal places.`,
              answer: 4.12,
              tolerance: 0.01,
              hint: String.raw`Add the components first, then take the square root of the sum of squares.`,
              explanation: String.raw`$\mathbf{a}+\mathbf{b}=(4,1)$, so $|\mathbf{a}+\mathbf{b}|=\sqrt{16+1}=\sqrt{17}\approx 4.1231$, which rounds to $4.12$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-vec2-ex-4',
              type: 'multiple-choice',
              prompt: 'Which pair of vectors is perpendicular?',
              options: [
                String.raw`$(3,4)$ and $(4,-3)$`,
                String.raw`$(2,1)$ and $(1,2)$`,
                String.raw`$(1,3)$ and $(3,1)$`,
                String.raw`$(2,-1)$ and $(1,3)$`,
              ],
              correctOption: 0,
              hint: String.raw`Perpendicular vectors have dot product zero.`,
              explanation: String.raw`$(3,4)\cdot(4,-3)=12-12=0$, so this pair is perpendicular. The other dot products are $4$, $6$ and $-1$, none zero.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-vec2-ex-5',
              type: 'numeric',
              prompt: String.raw`Find the angle in degrees between $\mathbf{a}=(1,0)$ and $\mathbf{b}=(1,\sqrt{3})$.`,
              answer: 60,
              tolerance: 0.01,
              answerUnit: '°',
              hint: String.raw`Compute the dot product and both magnitudes, then use the angle formula.`,
              explanation: String.raw`$\mathbf{a}\cdot\mathbf{b}=1$, $|\mathbf{a}|=1$ and $|\mathbf{b}|=2$, so $\cos\theta=\frac{1}{2}$ and $\theta=60^{\circ}$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-vec2-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`Find the scalar projection of $\mathbf{a}=(3,4)$ onto $\mathbf{b}=(1,0)$.`,
              options: ['$3$', '$5$', '$4$', String.raw`$\frac{3}{5}$`],
              correctOption: 0,
              hint: String.raw`Use $\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|}$.`,
              explanation: String.raw`$\mathbf{a}\cdot\mathbf{b}=3(1)+4(0)=3$ and $|\mathbf{b}|=1$, so the scalar projection is $3$. Geometrically, the shadow of $(3,4)$ on the $x$-axis has length $3$.`,
              difficulty: 'hard',
            },
          ],
          related: [
            'transformations-in-the-plane',
            'coordinate-geometry-of-lines',
            'vectors-in-three-dimensions',
            'matrices-and-determinants',
          ],
        },
        {
          id: 'matrices-and-determinants',
          title: 'Matrices and Determinants',
          subtitle: 'Arrays that act on vectors and solve linear systems.',
          introduction: String.raw`A matrix is a rectangular array of numbers, but it is also a rule. Multiplying a matrix by a vector produces a new vector, so matrices encode stretching, rotating, reflecting and projecting. The determinant summarises how a 2 by 2 matrix changes area and decides whether the transformation can be reversed. Inverses then solve systems of linear equations in a single matrix calculation.`,
          prerequisites: [
            'Solving systems of linear equations (Grade 9)',
            'Transformations in the plane (Grade 10)',
            'Vectors and components',
          ],
          keyIdeas: [
            'Matrices are added entrywise but multiplied row by column.',
            'Matrix multiplication requires the inner dimensions to match and is not commutative.',
            'The determinant of a 2 by 2 matrix measures signed area scaling.',
            'A 2 by 2 matrix has an inverse exactly when its determinant is non-zero.',
            String.raw`The system $A\mathbf{x}=\mathbf{b}$ has the unique solution $\mathbf{x}=A^{-1}\mathbf{b}$ when $A$ is invertible.`,
          ],
          aliases: [
            'matrices',
            'determinants',
            'matrix inverse',
            'matrix multiplication',
            'linear systems',
            'transformation matrix',
          ],
          theory: [
            {
              title: 'Matrices, dimensions and basic operations',
              body: [
                String.raw`An $m\times n$ matrix has $m$ rows and $n$ columns. The entry in row $i$ and column $j$ is written $a_{ij}$. Two matrices are equal when they have the same dimensions and every corresponding entry is equal. Addition and subtraction are defined only for matrices of the same dimensions and are performed entrywise.`,
                String.raw`Multiplying by a scalar multiplies every entry. The $n\times n$ identity matrix $I$ has ones on the main diagonal and zeros elsewhere; it satisfies $AI=IA=A$ for every compatible matrix $A$. The zero matrix plays the role of $0$ in addition, but it has no multiplicative inverse.`,
              ],
            },
            {
              title: 'Matrix multiplication',
              body: [
                String.raw`The product $AB$ is defined when the number of columns of $A$ equals the number of rows of $B$. If $A$ is $m\times n$ and $B$ is $n\times p$, then $AB$ is $m\times p$. The entry in row $i$ and column $j$ of $AB$ is the dot product of row $i$ of $A$ with column $j$ of $B$.`,
                String.raw`Matrix multiplication is associative and distributes over addition, but it is not commutative: $AB$ and $BA$ may differ, or one may be defined while the other is not. A non-zero matrix can even multiply another non-zero matrix to give the zero matrix, so cancellation is not valid.`,
              ],
              bullets: [
                String.raw`Dimensions: $(m\times n)(n\times p)=(m\times p)$.`,
                String.raw`Row-by-column rule: $(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}$.`,
                String.raw`$AB\ne BA$ in general.`,
                String.raw`$AI=IA=A$ for square matrices of the same size.`,
              ],
            },
            {
              title: 'Determinants, inverses and linear systems',
              body: [
                String.raw`For a $2\times 2$ matrix $A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$, the determinant is $\det A=ad-bc$. Its absolute value is the factor by which areas are scaled by the transformation, and its sign records whether orientation is preserved or reversed. A zero determinant means the transformation collapses the plane onto a line or point, so information is lost.`,
                String.raw`When $\det A\ne 0$, the inverse is $A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$. It satisfies $AA^{-1}=A^{-1}A=I$. A system $A\mathbf{x}=\mathbf{b}$ can then be solved by multiplying both sides on the left by $A^{-1}$, giving $\mathbf{x}=A^{-1}\mathbf{b}$.`,
                String.raw`Matrices also describe geometric transformations. $\begin{pmatrix}1&0\\0&-1\end{pmatrix}$ reflects in the $x$-axis, $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ rotates $90^{\circ}$ anticlockwise, and $\begin{pmatrix}k&0\\0&k\end{pmatrix}$ scales both coordinates by $k$. The determinant of a rotation is $1$, while a reflection has determinant $-1$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-mat-multiply',
              title: 'Matrix multiplication entry',
              expression: String.raw`(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}`,
              description:
                'Defines each entry of a product as the dot product of a row of the first matrix with a column of the second.',
              spoken:
                'The entry in row i and column j of A B is the sum over k of a sub i k times b sub k j.',
              variables: [
                { symbol: 'A', name: 'first matrix', note: 'dimensions m × n' },
                { symbol: 'B', name: 'second matrix', note: 'dimensions n × p' },
                { symbol: 'i, j', name: 'row and column indices of the product' },
              ],
              conditions: [
                String.raw`The number of columns of $A$ must equal the number of rows of $B$.`,
                String.raw`The product $AB$ has dimensions $m\times p$.`,
              ],
              notes:
                'In practice, multiply each row of A by each column of B and add the products.',
              tags: ['matrix multiplication', 'row by column', 'product', 'dimensions'],
            },
            {
              id: 'g11-mat-det',
              title: 'Determinant of a 2×2 matrix',
              expression: String.raw`\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc`,
              description:
                'Computes the signed area scaling factor of the linear transformation represented by the matrix.',
              spoken:
                'The determinant of the matrix with entries a, b, c, d is a d minus b c.',
              variables: [
                { symbol: 'a, b, c, d', name: 'entries of the 2×2 matrix' },
                { symbol: String.raw`\det A`, name: 'determinant, a scalar' },
              ],
              conditions: ['Defined for every 2×2 matrix.'],
              notes:
                'If det A = 0 the matrix is singular: it has no inverse and the transformation collapses area.',
              tags: ['determinant', '2x2', 'area scale factor', 'singular matrix'],
            },
            {
              id: 'g11-mat-inverse',
              title: 'Inverse of a 2×2 matrix',
              expression: String.raw`A^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}`,
              description:
                'Reverses the transformation of a 2 by 2 matrix by swapping the diagonal entries, negating the off-diagonal entries and dividing by the determinant.',
              spoken:
                'A inverse equals one over a d minus b c, times the matrix with d and a on the diagonal and negative b and negative c off the diagonal.',
              variables: [
                { symbol: 'A', name: '2×2 matrix with entries a, b, c, d' },
                { symbol: 'A^{-1}', name: 'inverse matrix' },
              ],
              conditions: [
                String.raw`$\det A=ad-bc\ne 0$; otherwise the inverse does not exist.`,
              ],
              notes:
                'Check the result by multiplying: $AA^{-1}=A^{-1}A=I$.',
              tags: ['matrix inverse', 'invertible matrix', 'determinant', '2x2 inverse'],
            },
            {
              id: 'g11-mat-system',
              title: 'Solving a 2×2 system with an inverse',
              expression: String.raw`A\mathbf{x}=\mathbf{b}\ \Rightarrow\ \mathbf{x}=A^{-1}\mathbf{b}`,
              description:
                'Solves a system of two linear equations by multiplying the constant vector by the inverse of the coefficient matrix.',
              spoken:
                'If A x equals b and A is invertible, then x equals A inverse times b.',
              variables: [
                { symbol: 'A', name: 'coefficient matrix' },
                { symbol: String.raw`\mathbf{x}`, name: 'vector of unknowns' },
                { symbol: String.raw`\mathbf{b}`, name: 'vector of constants' },
              ],
              conditions: [
                String.raw`$A$ is a 2×2 matrix with $\det A\ne 0$.`,
                'The equations are written in the same order as the columns of A.',
              ],
              notes:
                'If det A = 0 the system has either no solution or infinitely many solutions; the inverse method does not apply.',
              tags: ['linear system', 'matrix inverse', 'simultaneous equations', 'matrix equation'],
            },
          ],
          examples: [
            {
              title: 'Multiply two matrices and check the determinant',
              problem: String.raw`Let $A=\begin{pmatrix}2&1\\3&-1\end{pmatrix}$ and $B=\begin{pmatrix}1&4\\0&2\end{pmatrix}$. Find $AB$ and verify that $\det(AB)=\det A\det B$.`,
              given: [
                String.raw`$A=\begin{pmatrix}2&1\\3&-1\end{pmatrix}$ and $B=\begin{pmatrix}1&4\\0&2\end{pmatrix}$.`,
                String.raw`Both matrices are $2\times 2$, so the product is $2\times 2$.`,
              ],
              steps: [
                {
                  text: String.raw`Row 1 of $A$ times column 1 of $B$: $2(1)+1(0)=2$. Row 1 times column 2: $2(4)+1(2)=10$.`,
                  math: String.raw`AB=\begin{pmatrix}2&10\\ \cdot&\cdot\end{pmatrix}`,
                },
                {
                  text: String.raw`Row 2 of $A$ times column 1 of $B$: $3(1)+(-1)(0)=3$. Row 2 times column 2: $3(4)+(-1)(2)=10$.`,
                  math: String.raw`AB=\begin{pmatrix}2&10\\3&10\end{pmatrix}`,
                },
                {
                  text: String.raw`Compute the determinants separately.`,
                  math: String.raw`\det A=2(-1)-1(3)=-5,\qquad \det B=1(2)-4(0)=2`,
                },
                {
                  text: String.raw`Compute the determinant of the product and compare.`,
                  math: String.raw`\det(AB)=2(10)-10(3)=20-30=-10`,
                },
                {
                  text: String.raw`The product rule holds: $(-5)(2)=-10$.`,
                },
              ],
              answer: String.raw`$AB=\begin{pmatrix}2&10\\3&10\end{pmatrix}$ and $\det(AB)=-10=(-5)(2)=\det A\det B$.`,
            },
            {
              title: 'Solve a linear system with a matrix inverse',
              problem: String.raw`Solve $2x+y=7$ and $3x-y=8$ using the inverse of the coefficient matrix.`,
              given: [
                String.raw`The system is $2x+y=7$, $3x-y=8$.`,
                String.raw`The coefficient matrix is $A=\begin{pmatrix}2&1\\3&-1\end{pmatrix}$ and $\mathbf{b}=\begin{pmatrix}7\\8\end{pmatrix}$.`,
              ],
              steps: [
                {
                  text: String.raw`Compute the determinant.`,
                  math: String.raw`\det A=2(-1)-1(3)=-5`,
                },
                {
                  text: String.raw`Apply the inverse formula.`,
                  math: String.raw`A^{-1}=\frac{1}{-5}\begin{pmatrix}-1&-1\\-3&2\end{pmatrix}=\begin{pmatrix}\frac{1}{5}&\frac{1}{5}\\[2pt]\frac{3}{5}&-\frac{2}{5}\end{pmatrix}`,
                },
                {
                  text: String.raw`Multiply $A^{-1}$ by $\mathbf{b}$.`,
                  math: String.raw`\mathbf{x}=A^{-1}\mathbf{b}=\begin{pmatrix}\frac{1}{5}&\frac{1}{5}\\[2pt]\frac{3}{5}&-\frac{2}{5}\end{pmatrix}\begin{pmatrix}7\\8\end{pmatrix}`,
                },
                {
                  text: String.raw`Compute each component.`,
                  math: String.raw`x=\frac{7+8}{5}=3,\qquad y=\frac{21-16}{5}=1`,
                },
                {
                  text: String.raw`Check in both original equations: $2(3)+1=7$ and $3(3)-1=8$.`,
                },
              ],
              answer: String.raw`$x=3$, $y=1$. The solution is $\mathbf{x}=\begin{pmatrix}3\\1\end{pmatrix}$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Assuming $AB=BA$ for matrices.`,
              correction: String.raw`Matrix multiplication is not commutative. Compute each product separately, and check dimensions before multiplying.`,
            },
            {
              mistake: String.raw`Using the inverse formula when $\det A=0$.`,
              correction: String.raw`The inverse exists only when the determinant is non-zero. If $\det A=0$, the matrix is singular and the system has no unique solution.`,
            },
            {
              mistake: String.raw`Multiplying a $2\times 3$ matrix by another $2\times 3$ matrix.`,
              correction: String.raw`The product is defined only when the number of columns of the first equals the number of rows of the second. Here $3\ne 2$, so the product does not exist.`,
            },
          ],
          exercises: [
            {
              id: 'g11-mat-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`What are the dimensions of the product of a $2\times 3$ matrix and a $3\times 4$ matrix?`,
              options: [String.raw`$2\times 4$`, String.raw`$3\times 3$`, String.raw`$4\times 2$`, String.raw`$2\times 3$`],
              correctOption: 0,
              hint: String.raw`The inner dimensions must match; the outer dimensions give the product size.`,
              explanation: String.raw`The inner dimensions $3$ and $3$ match, and the outer dimensions are $2$ and $4$, so the product is $2\times 4$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-mat-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Find the determinant of $\begin{pmatrix}5&2\\3&4\end{pmatrix}$.`,
              options: ['$14$', '$26$', '$20$', '$-14$'],
              correctOption: 0,
              hint: String.raw`Use $ad-bc$ with $a=5$, $b=2$, $c=3$, $d=4$.`,
              explanation: String.raw`$\det=5(4)-2(3)=20-6=14$. The non-zero determinant means the matrix is invertible.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-mat-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the determinant of $\begin{pmatrix}2&-1\\4&3\end{pmatrix}$.`,
              answer: 10,
              tolerance: 0.001,
              hint: String.raw`Subtract the product of the off-diagonal entries from the product of the diagonal entries.`,
              explanation: String.raw`$\det=2(3)-(-1)(4)=6+4=10$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-mat-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`Find the inverse of $\begin{pmatrix}2&1\\1&1\end{pmatrix}$.`,
              options: [
                String.raw`$\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$`,
                String.raw`$\begin{pmatrix}2&-1\\-1&1\end{pmatrix}$`,
                String.raw`$\begin{pmatrix}1&1\\1&2\end{pmatrix}$`,
                String.raw`$\begin{pmatrix}-1&1\\1&-2\end{pmatrix}$`,
              ],
              correctOption: 0,
              hint: String.raw`The determinant is $2(1)-1(1)=1$, so the inverse is just the swapped-and-negated matrix.`,
              explanation: String.raw`$\det=1$, and the inverse template gives $\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$. Check: multiplying by the original matrix gives the identity.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-mat-ex-5',
              type: 'numeric',
              prompt: String.raw`Solve the system $x+2y=5$ and $3x-y=1$. Give the value of $x$.`,
              answer: 1,
              tolerance: 0.001,
              hint: String.raw`Write the system as $A\mathbf{x}=\mathbf{b}$, then compute $A^{-1}\mathbf{b}$.`,
              explanation: String.raw`$A=\begin{pmatrix}1&2\\3&-1\end{pmatrix}$ has determinant $-1-6=-7$. Using the inverse gives $x=\frac{5+2}{7}=1$ and $y=\frac{15-1}{7}=2$. Check: $1+4=5$ and $3-2=1$.`,
              difficulty: 'hard',
            },
            {
              id: 'g11-mat-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`What transformation does the matrix $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ represent?`,
              options: [
                String.raw`A $90^{\circ}$ anticlockwise rotation about the origin`,
                String.raw`A $90^{\circ}$ clockwise rotation about the origin`,
                'A reflection in the line $y=x$',
                String.raw`A $180^{\circ}$ rotation about the origin`,
              ],
              correctOption: 0,
              hint: String.raw`Track where the standard basis vectors $(1,0)$ and $(0,1)$ are sent.`,
              explanation: String.raw`$(1,0)$ is sent to $(0,1)$ and $(0,1)$ is sent to $(-1,0)$. Both moves are $90^{\circ}$ anticlockwise, so the matrix is a $90^{\circ}$ anticlockwise rotation. Its determinant is $1$.`,
              difficulty: 'medium',
            },
          ],
          related: [
            'systems-of-linear-equations',
            'transformations-in-the-plane',
            'vectors-in-two-dimensions',
            'matrices-and-linear-systems',
          ],
        },
      ],
    },
    {
      id: 'statistics-probability',
      family: 'statistics-probability',
      title: 'Statistics & Probability',
      description:
        'Probability updated by information, and variability measured and modelled. Conditional probability handles dependence; variance and distributions describe the spread of data and random variables.',
      theorems: [
        {
          title: 'Multiplication Rule',
          statement: String.raw`For events $A$ and $B$ with $P(B)>0$, $P(A\cap B)=P(A\mid B)P(B)$.`,
          note: String.raw`Symmetrically, $P(A\cap B)=P(B\mid A)P(A)$ when $P(A)>0$.`,
        },
        {
          title: 'Law of Total Probability',
          statement: String.raw`If $B$ and $B'$ partition the sample space, then $P(A)=P(A\mid B)P(B)+P(A\mid B')P(B')$.`,
          note: 'This is the calculation performed by adding the relevant leaf probabilities of a two-branch tree.',
        },
      ],
      topics: [
        {
          id: 'conditional-probability',
          title: 'Conditional Probability',
          subtitle: 'Updating chance when information arrives.',
          introduction: String.raw`Conditional probability answers a narrower question: among the outcomes where $B$ happened, how often did $A$ also happen? The definition $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$ restricts the sample space to $B$. This single idea explains tree diagrams, two-way tables, sampling without replacement, and the distinction between independent and dependent events.`,
          prerequisites: [
            'Two-way tables and informal conditional probability (Grade 9)',
            'Addition and multiplication rules for probability (Grade 10)',
            'Tree diagrams for compound events (Grade 8)',
          ],
          keyIdeas: [
            String.raw`$P(A\mid B)$ is the probability of $A$ given that $B$ has occurred.`,
            'The condition restricts the sample space, so the denominator is $P(B)$, not $1$.',
            'Events are independent when knowing one does not change the probability of the other.',
            'On a tree diagram, multiply along branches and add across branches.',
            'Sampling without replacement changes the denominator from draw to draw.',
          ],
          aliases: [
            'conditional probability',
            'given that',
            'independence',
            'tree diagram',
            'two-way table',
            'without replacement',
          ],
          theory: [
            {
              title: 'Restricting the sample space',
              body: [
                String.raw`For events $A$ and $B$ with $P(B)>0$, the conditional probability of $A$ given $B$ is $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$. The numerator counts outcomes that satisfy both conditions; the denominator rescales by the probability of the condition. The result is always between $0$ and $1$.`,
                String.raw`A two-way table makes the calculation transparent: focus on the row or column that represents the condition, then read the proportion of that row or column belonging to $A$. This is why the denominator is the total of the conditioning group, not the grand total.`,
              ],
            },
            {
              title: 'Independence',
              body: [
                String.raw`Events $A$ and $B$ are independent when $P(A\mid B)=P(A)$, that is, when knowing $B$ does not change the probability of $A$. Equivalently, $P(A\cap B)=P(A)P(B)$. Independence is a mathematical property to be checked, not an assumption to be made because events look unrelated.`,
                String.raw`Do not confuse independence with mutual exclusivity. Mutually exclusive events cannot occur together, so $P(A\cap B)=0$; if both have positive probability, they are actually dependent, because knowing one occurred rules out the other.`,
              ],
            },
            {
              title: 'Tree diagrams and sampling without replacement',
              body: [
                String.raw`A tree diagram represents a sequence of events. Each branch is labelled with a conditional probability, the probability of a complete path is the product of its branch probabilities, and the probability of an event is the sum over all paths that produce it. This is the multiplication rule used repeatedly.`,
                String.raw`When objects are drawn without replacement, the composition of the remaining set changes after each draw. If a bag starts with $5$ red and $3$ blue counters, the probability of red on the first draw is $\frac{5}{8}$; after a red is removed, the probability of red on the second draw is $\frac{4}{7}$. With replacement, the probabilities reset and the draws are independent.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-condprob-def',
              title: 'Conditional probability',
              expression: String.raw`P(A\mid B)=\frac{P(A\cap B)}{P(B)}`,
              description:
                'Gives the probability of A when the sample space is restricted to outcomes where B occurred.',
              spoken:
                'The probability of A given B equals the probability of A and B divided by the probability of B.',
              variables: [
                { symbol: 'A, B', name: 'events' },
                { symbol: String.raw`P(A\mid B)`, name: 'conditional probability of A given B' },
                { symbol: String.raw`P(A\cap B)`, name: 'probability that both occur' },
              ],
              conditions: [String.raw`$P(B)>0$; conditioning on an impossible event is undefined.`],
              notes:
                'The order matters: P(A|B) and P(B|A) are generally different.',
              tags: ['conditional probability', 'given that', 'restricted sample space', 'probability'],
            },
            {
              id: 'g11-condprob-multiplication',
              title: 'Multiplication rule',
              expression: String.raw`P(A\cap B)=P(A\mid B)P(B)=P(B\mid A)P(A)`,
              description:
                'Finds the probability that two events both occur by multiplying a conditional probability by the probability of its condition.',
              spoken:
                'The probability of A and B equals the probability of A given B times the probability of B, which also equals the probability of B given A times the probability of A.',
              variables: [
                { symbol: 'A, B', name: 'events' },
                { symbol: String.raw`P(A\cap B)`, name: 'joint probability' },
              ],
              conditions: [
                String.raw`$P(B)>0$ for the first form and $P(A)>0$ for the second.`,
              ],
              notes:
                'On a tree diagram, this rule is "multiply along the branch".',
              tags: ['multiplication rule', 'joint probability', 'and', 'tree diagram'],
            },
            {
              id: 'g11-condprob-independence',
              title: 'Independence criterion',
              expression: String.raw`P(A\cap B)=P(A)P(B)\quad\iff\quad P(A\mid B)=P(A)`,
              description:
                'Two events are independent when the probability of both equals the product of their individual probabilities.',
              spoken:
                'A and B are independent exactly when the probability of both equals the product of their probabilities, which is the same as the conditional probability of A given B equalling the probability of A.',
              variables: [
                { symbol: 'A, B', name: 'events with positive probability' },
              ],
              conditions: [
                String.raw`$P(B)>0$ for the conditional form.`,
                'Independence must be checked, not assumed from the description of the events.',
              ],
              notes:
                'Mutually exclusive events with positive probability are not independent: if one occurs, the other cannot.',
              tags: ['independence', 'independent events', 'product rule', 'conditional probability'],
            },
            {
              id: 'g11-condprob-total',
              title: 'Law of total probability',
              expression: String.raw`P(A)=P(A\mid B)P(B)+P(A\mid B')P(B')`,
              description:
                'Splits the probability of A across two complementary cases B and not B.',
              spoken:
                'The probability of A equals the probability of A given B times the probability of B, plus the probability of A given not B times the probability of not B.',
              variables: [
                { symbol: 'A', name: 'event of interest' },
                { symbol: 'B', name: 'conditioning event' },
                { symbol: "B'", name: 'complement of B' },
              ],
              conditions: [
                String.raw`$B$ and $B'$ partition the sample space.`,
                String.raw`$P(B)>0$ and $P(B')>0$.`,
              ],
              notes:
                'With more than two cases, add one term for each case. This is the "add across branches" step in a tree diagram.',
              tags: ['total probability', 'partition', 'tree diagram', 'complement'],
            },
          ],
          examples: [
            {
              title: 'Read a conditional probability from a two-way situation',
              problem: String.raw`In a group of $200$ students, $120$ own a bicycle, $80$ own a scooter, and $50$ own both. Find the probability that a student owns a bicycle given that they own a scooter. Are the two ownership events independent?`,
              given: [
                String.raw`$P(\text{bicycle})=\frac{120}{200}=0.6$.`,
                String.raw`$P(\text{scooter})=\frac{80}{200}=0.4$.`,
                String.raw`$P(\text{both})=\frac{50}{200}=0.25$.`,
              ],
              steps: [
                {
                  text: String.raw`Apply the conditional probability formula with the scooter as the condition.`,
                  math: String.raw`P(\text{bicycle}\mid\text{scooter})=\frac{P(\text{both})}{P(\text{scooter})}`,
                },
                {
                  text: String.raw`Substitute the probabilities.`,
                  math: String.raw`=\frac{0.25}{0.4}=\frac{50}{80}=\frac{5}{8}`,
                },
                {
                  text: String.raw`For independence, compare $P(\text{both})$ with the product of the individual probabilities.`,
                  math: String.raw`P(\text{bicycle})P(\text{scooter})=0.6\times 0.4=0.24`,
                },
                {
                  text: String.raw`Since $0.25\ne 0.24$, the events are not independent. Owning a scooter makes bicycle ownership slightly more likely.`,
                },
              ],
              answer: String.raw`$P(\text{bicycle}\mid\text{scooter})=\frac{5}{8}=0.625$. The events are not independent because $0.25\ne 0.6\times 0.4$.`,
            },
            {
              title: 'Draw without replacement',
              problem: String.raw`A bag contains $5$ red and $3$ blue counters. Two counters are drawn without replacement. Find the probability that both are red, and the probability that at least one is red.`,
              given: [
                String.raw`First draw: $5$ red out of $8$ counters.`,
                String.raw`If the first counter is red, $4$ red and $3$ blue remain out of $7$.`,
                String.raw`If the first counter is blue, $5$ red and $2$ blue remain out of $7$.`,
              ],
              steps: [
                {
                  text: String.raw`For both red, multiply the probability of red on the first draw by the conditional probability of red on the second.`,
                  math: String.raw`P(RR)=\frac{5}{8}\times\frac{4}{7}=\frac{20}{56}=\frac{5}{14}`,
                },
                {
                  text: String.raw`For at least one red, use the complement: the only way to fail is to draw blue twice.`,
                  math: String.raw`P(\text{no red})=\frac{3}{8}\times\frac{2}{7}=\frac{6}{56}=\frac{3}{28}`,
                },
                {
                  text: String.raw`Subtract from $1$.`,
                  math: String.raw`P(\text{at least one red})=1-\frac{3}{28}=\frac{25}{28}`,
                },
                {
                  text: String.raw`Check the decimal values: $\frac{5}{14}\approx 0.357$ and $\frac{25}{28}\approx 0.893$, both between $0$ and $1$.`,
                },
              ],
              answer: String.raw`$P(\text{both red})=\frac{5}{14}\approx 0.357$ and $P(\text{at least one red})=\frac{25}{28}\approx 0.893$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Assuming $P(A\mid B)=P(B\mid A)$.`,
              correction: String.raw`Conditioning is directional. $P(A\mid B)$ divides by $P(B)$, while $P(B\mid A)$ divides by $P(A)$; the two are equal only in special cases.`,
            },
            {
              mistake: 'Assuming two events are independent because they seem unrelated.',
              correction: String.raw`Independence must be verified by checking $P(A\cap B)=P(A)P(B)$. Descriptions alone do not prove it.`,
            },
            {
              mistake: String.raw`Using the grand total as the denominator in a conditional probability.`,
              correction: String.raw`Restrict the sample space to the condition. If the condition is $B$, divide by $P(B)$ or by the total count in the $B$ group.`,
            },
          ],
          exercises: [
            {
              id: 'g11-condprob-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`If $P(A)=0.5$, $P(B)=0.4$ and $P(A\cap B)=0.2$, find $P(A\mid B)$.`,
              options: ['$0.5$', '$0.4$', '$0.2$', '$0.8$'],
              correctOption: 0,
              hint: String.raw`Divide the joint probability by the probability of the condition.`,
              explanation: String.raw`$P(A\mid B)=\frac{P(A\cap B)}{P(B)}=\frac{0.2}{0.4}=0.5$. In fact $P(A\mid B)=P(A)$, so these events are independent.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-condprob-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Events $A$ and $B$ are independent with $P(A)=0.3$ and $P(B)=0.5$. Find $P(A\cap B)$.`,
              options: ['$0.15$', '$0.8$', '$0.2$', '$0.35$'],
              correctOption: 0,
              hint: String.raw`For independent events, multiply the probabilities.`,
              explanation: String.raw`$P(A\cap B)=P(A)P(B)=0.3\times 0.5=0.15$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-condprob-ex-3',
              type: 'numeric',
              prompt: String.raw`A fair six-sided die is rolled. Find the probability that the result is odd, given that it is greater than $2$.`,
              answer: 0.5,
              tolerance: 0.001,
              hint: String.raw`The condition restricts the sample space to $\{3,4,5,6\}$.`,
              explanation: String.raw`Greater than $2$ gives four outcomes: $3,4,5,6$. Of these, $3$ and $5$ are odd, so the probability is $\frac{2}{4}=0.5$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-condprob-ex-4',
              type: 'multiple-choice',
              prompt: String.raw`A bag contains $4$ red and $6$ green balls. One ball is drawn and not replaced; a second ball is then drawn. Find the probability that the first is red and the second is green.`,
              options: [
                String.raw`$\frac{4}{15}$`,
                String.raw`$\frac{2}{5}$`,
                String.raw`$\frac{6}{25}$`,
                String.raw`$\frac{4}{9}$`,
              ],
              correctOption: 0,
              hint: String.raw`After a red ball is removed, $9$ balls remain, $6$ of them green.`,
              explanation: String.raw`$P(R\text{ then }G)=\frac{4}{10}\times\frac{6}{9}=\frac{24}{90}=\frac{4}{15}\approx 0.267$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-condprob-ex-5',
              type: 'numeric',
              prompt: String.raw`In a group of $50$ people, $30$ drink coffee, $20$ drink tea, and $10$ drink both. Find the probability that a person drinks coffee, given that they drink tea.`,
              answer: 0.5,
              tolerance: 0.001,
              hint: String.raw`Restrict to the $20$ tea drinkers and count how many also drink coffee.`,
              explanation: String.raw`$P(\text{coffee}\mid\text{tea})=\frac{10}{20}=0.5$. Note that $P(\text{coffee})=0.6$, so the events are not independent.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-condprob-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`For events $A$ and $B$, $P(A)=0.4$, $P(B)=0.5$ and $P(A\cup B)=0.7$. What can be concluded?`,
              options: [
                String.raw`Independent, because $P(A\cap B)=0.2=P(A)P(B)$`,
                'Not independent, because the union is not $0.9$',
                'Independent, because the union is $0.7$',
                String.raw`Not independent, because $P(A)+P(B)\ne 1$`,
              ],
              correctOption: 0,
              hint: String.raw`First use the addition rule to find $P(A\cap B)$, then compare with $P(A)P(B)$.`,
              explanation: String.raw`$P(A\cap B)=P(A)+P(B)-P(A\cup B)=0.4+0.5-0.7=0.2$. Since $P(A)P(B)=0.4\times 0.5=0.2$, the events are independent.`,
              difficulty: 'hard',
            },
          ],
          related: [
            'probability-compound-and-two-way',
            'probability-rules-and-counting',
            'random-variables-and-distributions',
          ],
        },
        {
          id: 'statistics-variance-and-distributions',
          title: 'Variance, Distributions & the Normal Curve',
          subtitle: 'Measuring spread, modelling chance, and meeting the bell curve',
          introduction: String.raw`The mean says where data are centred; variance and standard deviation say how far they spread around that centre. The same ideas apply to a discrete probability distribution, where each value $x$ has a probability $p$, giving an expected value $E(X)$ and a variance $\operatorname{Var}(X)$. Many natural measurements pile up symmetrically around a mean in the bell-shaped normal curve, which obeys the 68–95–99.7 rule.`,
          prerequisites: [
            'Mean, median, and range',
            'Sigma notation for sums',
            'Basic probability and probability tables',
          ],
          keyIdeas: [
            'Variance is the average squared distance from the mean; standard deviation is its square root.',
            'A population divides by $N$; a sample divides by $n-1$.',
            'For a discrete distribution, $E(X)=\\sum xp$ and $\\operatorname{Var}(X)=E(X^2)-[E(X)]^2$.',
            'The probabilities in a distribution must be non-negative and sum to $1$.',
            'In a normal distribution, about $68\\%$, $95\\%$ and $99.7\\%$ of values lie within $1$, $2$ and $3$ standard deviations of the mean.',
          ],
          theory: [
            {
              title: 'Variance and standard deviation',
              body: [
                String.raw`Deviations $x-\mu$ from the mean add to zero, so they are squared before averaging. The variance is the mean squared deviation, and the standard deviation $\sigma=\sqrt{\sigma^2}$ returns the spread to the original units.`,
                String.raw`When the data are the whole population of $N$ values, divide by $N$ and write $\sigma^2$. When the data are a sample of $n$ values used to estimate a larger population, divide by $n-1$ and write $s^2$; dividing by $n$ would tend to underestimate the true spread.`,
              ],
              bullets: [
                'Variance is never negative, and is zero only when every value is identical.',
                'Adding a constant to every value leaves the spread unchanged; multiplying every value by $k$ multiplies the standard deviation by $|k|$.',
              ],
            },
            {
              title: 'Discrete probability distributions',
              body: [
                String.raw`A discrete random variable $X$ takes separate values $x_1,x_2,\dots$ with probabilities $p_i=P(X=x_i)$. Every $p_i\ge 0$ and $\sum p_i=1$.`,
                String.raw`The expected value $E(X)=\sum x_ip_i$ is the long-run average, a probability-weighted mean. The variance is $\operatorname{Var}(X)=E[(X-\mu)^2]$, which simplifies to $E(X^2)-[E(X)]^2$, where $E(X^2)=\sum x_i^2p_i$.`,
              ],
            },
            {
              title: 'The normal curve and the 68–95–99.7 rule',
              body: [
                String.raw`A normal distribution has a symmetric bell-shaped curve centred at its mean $\mu$, with spread set by the standard deviation $\sigma$. The total area under the curve is $1$, and it represents probability.`,
                String.raw`The empirical rule says that approximately $68\%$ of values lie within $\sigma$ of the mean, $95\%$ within $2\sigma$, and $99.7\%$ within $3\sigma$. These are rounded values for exactly normal data, and only approximate guides for real data that are roughly bell-shaped.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g11-statvar-variance-sd',
              title: 'Variance and standard deviation',
              expression: String.raw`\sigma^2=\frac{\sum (x-\mu)^2}{N},\qquad s^2=\frac{\sum (x-\bar{x})^2}{n-1}`,
              description:
                'The population variance averages squared deviations over all $N$ values; the sample variance uses $n-1$. The standard deviation is the square root of the variance.',
              spoken:
                'Population variance is the sum of squared deviations from the mean divided by N. Sample variance is the sum of squared deviations from the sample mean divided by n minus one.',
              variables: [
                { symbol: 'x', name: 'data value' },
                { symbol: String.raw`\mu`, name: 'population mean' },
                { symbol: String.raw`\bar{x}`, name: 'sample mean' },
                { symbol: 'N', name: 'population size' },
                { symbol: 'n', name: 'sample size', note: 'must be at least 2 for $s^2$' },
              ],
              conditions: [
                String.raw`Use $\sigma^2$ only when the data are the entire population.`,
                String.raw`Use $s^2$ with $n\ge 2$ when the data are a sample.`,
              ],
              notes:
                String.raw`Standard deviations are $\sigma=\sqrt{\sigma^2}$ and $s=\sqrt{s^2}$. Variance has squared units; standard deviation has the original units.`,
              tags: ['variance', 'standard deviation', 'population', 'sample', 'spread'],
            },
            {
              id: 'g11-statvar-expectation-variance',
              title: 'Expected value and variance of a discrete variable',
              expression: String.raw`E(X)=\sum x\,p,\qquad \operatorname{Var}(X)=E(X^2)-[E(X)]^2`,
              description:
                'The expected value is the probability-weighted mean of the values; the variance is the mean of the squares minus the square of the mean.',
              spoken:
                'The expected value of X is the sum of each value times its probability. The variance of X is the expected value of X squared minus the square of the expected value of X.',
              variables: [
                { symbol: 'x', name: 'value of the random variable' },
                { symbol: 'p', name: 'probability P(X = x)', note: 'between $0$ and $1$' },
                { symbol: 'E(X^2)', name: 'expected value of X squared', note: String.raw`equal to $\sum x^2p$` },
              ],
              conditions: [
                String.raw`Every $p\ge 0$ and $\sum p=1$.`,
                String.raw`$\operatorname{Var}(X)\ge 0$; a negative result signals an arithmetic error.`,
              ],
              notes:
                String.raw`Square the values first and then weight by probability: $E(X^2)\ne[E(X)]^2$ in general. The standard deviation is $\sqrt{\operatorname{Var}(X)}$.`,
              tags: ['expected value', 'expectation', 'mean of distribution', 'discrete random variable', 'variance'],
            },
            {
              id: 'g11-statvar-empirical-rule',
              title: 'Empirical rule (68–95–99.7)',
              expression: String.raw`P(\mu-k\sigma<X<\mu+k\sigma)\approx 0.68,\ 0.95,\ 0.997\quad (k=1,2,3)`,
              description:
                'For a normal distribution, roughly $68\%$ of values lie within one standard deviation of the mean, $95\%$ within two, and $99.7\%$ within three.',
              spoken:
                'The probability of lying within one, two, or three standard deviations of the mean is approximately sixty-eight, ninety-five, and ninety-nine point seven percent.',
              variables: [
                { symbol: String.raw`\mu`, name: 'mean' },
                { symbol: String.raw`\sigma`, name: 'standard deviation', note: 'positive' },
                { symbol: 'k', name: 'number of standard deviations', note: 'k = 1, 2 or 3' },
              ],
              conditions: [
                'The distribution is normal, or close to a symmetric bell shape.',
                String.raw`$\sigma>0$.`,
              ],
              notes:
                'The remaining probability is split equally between the two tails: for example, about $16\\%$ of values lie more than one standard deviation above the mean.',
              tags: ['normal distribution', 'empirical rule', '68-95-99.7', 'bell curve'],
            },
          ],
          examples: [
            {
              title: 'Population and sample variance',
              problem: String.raw`Find the population variance and standard deviation of the data $2,4,4,4,5,5,7,9$. Then find the sample variance, treating the same values as a sample.`,
              given: [String.raw`$n=N=8$ values: $2,4,4,4,5,5,7,9$.`],
              steps: [
                {
                  text: 'Find the mean.',
                  math: String.raw`\mu=\frac{2+4+4+4+5+5+7+9}{8}=\frac{40}{8}=5`,
                },
                {
                  text: 'Compute each squared deviation $(x-5)^2$: $9,1,1,1,0,0,4,16$.',
                },
                {
                  text: 'Add the squared deviations.',
                  math: String.raw`\sum(x-\mu)^2=9+1+1+1+0+0+4+16=32`,
                },
                {
                  text: 'Population variance divides by $N=8$, and the standard deviation is its square root.',
                  math: String.raw`\sigma^2=\frac{32}{8}=4,\qquad \sigma=\sqrt{4}=2`,
                },
                {
                  text: 'Sample variance divides by $n-1=7$ instead.',
                  math: String.raw`s^2=\frac{32}{7}\approx 4.57,\qquad s\approx 2.14`,
                },
                {
                  text: 'The sample value is slightly larger, as expected, because $7<8$.',
                },
              ],
              answer: String.raw`Population: $\sigma^2=4$, $\sigma=2$. Sample: $s^2=\frac{32}{7}\approx 4.57$, $s\approx 2.14$ (same units as the data).`,
            },
            {
              title: 'Expectation and variance of a distribution',
              problem: String.raw`A discrete variable $X$ has $P(X=0)=0.1$, $P(X=1)=0.3$, $P(X=2)=0.4$, $P(X=3)=0.2$. Find $E(X)$, $\operatorname{Var}(X)$ and the standard deviation.`,
              given: [String.raw`Check: $0.1+0.3+0.4+0.2=1$, so the distribution is valid.`],
              steps: [
                {
                  text: 'Compute the expected value.',
                  math: String.raw`E(X)=0(0.1)+1(0.3)+2(0.4)+3(0.2)=0+0.3+0.8+0.6=1.7`,
                },
                {
                  text: 'Compute $E(X^2)$ by squaring the values first.',
                  math: String.raw`E(X^2)=0(0.1)+1(0.3)+4(0.4)+9(0.2)=0.3+1.6+1.8=3.7`,
                },
                {
                  text: 'Apply $\\operatorname{Var}(X)=E(X^2)-[E(X)]^2$.',
                  math: String.raw`\operatorname{Var}(X)=3.7-1.7^2=3.7-2.89=0.81`,
                },
                {
                  text: 'Take the square root.',
                  math: String.raw`\sigma=\sqrt{0.81}=0.9`,
                },
                {
                  text: 'Check with the definition: $0.1(1.7)^2+0.3(0.7)^2+0.4(0.3)^2+0.2(1.3)^2=0.289+0.147+0.036+0.338=0.81$.',
                },
              ],
              answer: String.raw`$E(X)=1.7$, $\operatorname{Var}(X)=0.81$, $\sigma=0.9$.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Using $E(X^2)=[E(X)]^2$.`,
              correction: String.raw`These differ by exactly $\operatorname{Var}(X)$. Square each value before weighting by its probability to get $E(X^2)$.`,
            },
            {
              mistake: 'Dividing by $n$ for a sample variance, or by $n-1$ for a full population.',
              correction: String.raw`Check what the data represent. A sample uses $n-1$; a complete population uses $N$.`,
            },
            {
              mistake: 'Applying the 68–95–99.7 rule to any data set.',
              correction: 'The rule is for normal (bell-shaped, symmetric) distributions. Skewed data can have very different percentages.',
            },
          ],
          exercises: [
            {
              id: 'g11-statvar-ex-1',
              type: 'multiple-choice',
              prompt: 'Which denominator is used for the variance of a sample of $n$ values?',
              options: ['$n-1$', '$n$', '$n+1$', '$n^2$'],
              correctOption: 0,
              hint: 'Sample variance estimates the variance of a larger population.',
              explanation: String.raw`The sample variance is $s^2=\frac{\sum(x-\bar{x})^2}{n-1}$. The denominator $n$ is used only for a complete population.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-statvar-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`In a normal distribution, approximately what percentage of values lie within $2$ standard deviations of the mean?`,
              options: ['$95\\%$', '$68\\%$', '$99.7\\%$', '$50\\%$'],
              correctOption: 0,
              hint: 'Recall the three numbers 68, 95, 99.7.',
              explanation: String.raw`The empirical rule gives about $68\%$ within $1\sigma$, $95\%$ within $2\sigma$ and $99.7\%$ within $3\sigma$.`,
              difficulty: 'easy',
            },
            {
              id: 'g11-statvar-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the sample variance of the data $1,3,5,7,9$.`,
              answer: 10,
              tolerance: 0.01,
              hint: 'The mean is 5. Add the squared deviations, then divide by $n-1$.',
              explanation: String.raw`Mean $=5$. $\sum(x-5)^2=16+4+0+4+16=40$. Then $s^2=\frac{40}{4}=10$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-statvar-ex-4',
              type: 'numeric',
              prompt: String.raw`$P(X=1)=0.2$, $P(X=2)=0.5$, $P(X=3)=0.3$. Find $E(X)$.`,
              answer: 2.1,
              tolerance: 0.01,
              hint: 'Multiply each value by its probability and add.',
              explanation: String.raw`$E(X)=1(0.2)+2(0.5)+3(0.3)=0.2+1.0+0.9=2.1$.`,
              difficulty: 'medium',
            },
            {
              id: 'g11-statvar-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`Test scores are approximately normal with mean $100$ and standard deviation $10$. About what percentage of scores exceed $110$?`,
              options: ['$16\\%$', '$32\\%$', '$5\\%$', '$34\\%$'],
              correctOption: 0,
              hint: String.raw`$110$ is one standard deviation above the mean. About $68\%$ lie within one standard deviation; split the rest between two tails.`,
              explanation: String.raw`About $68\%$ lie between $90$ and $110$, leaving $32\%$ outside, split equally: $16\%$ above $110$.`,
              difficulty: 'hard',
            },
            {
              id: 'g11-statvar-ex-6',
              type: 'numeric',
              prompt: String.raw`A variable has $E(X)=3$ and $E(X^2)=10.5$. Find $\operatorname{Var}(X)$.`,
              answer: 1.5,
              tolerance: 0.01,
              hint: String.raw`Use $\operatorname{Var}(X)=E(X^2)-[E(X)]^2$.`,
              explanation: String.raw`$\operatorname{Var}(X)=10.5-3^2=10.5-9=1.5$.`,
              difficulty: 'hard',
            },
          ],
          related: [
            'statistics-center-and-spread',
            'measures-of-spread',
            'probability-rules-and-counting',
            'conditional-probability',
          ],
          aliases: [
            'variance',
            'standard deviation',
            'discrete distribution',
            'expected value',
            'normal curve',
            'bell curve',
            'empirical rule',
          ],
        },
      ],
    },
  ],
}
