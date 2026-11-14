import type { Grade } from '../../types/content'

export const grade8: Grade = {
  id: '8',
  number: 8,
  title: 'Grade 8',
  tagline: 'Structure, reasoning, and the first taste of proof.',
  description:
    'Grade 8 turns arithmetic fluency into algebraic structure. Students widen the number system to include irrational numbers, work confidently with roots and standard form, solve multi-step equations and inequalities, expand and factorize polynomials, and read linear functions as models. Geometry moves from measurement to reasoning through the Pythagorean theorem, congruence and the quadrilateral family, while statistics and probability focus on honest data displays and compound events.',
  focus: [
    'Rational and irrational numbers, roots, and scientific notation',
    'Linear equations, inequalities, polynomials, and factorization',
    'Function notation, gradient, and straight-line graphs',
    'Right triangles, congruence, and quadrilateral reasoning',
    'Data displays and compound probability',
  ],
  subjects: [
    {
      id: 'number-systems',
      family: 'number',
      title: 'Number Systems',
      description:
        'Build a precise picture of the real number line: rational and irrational numbers, square and cube roots, and scientific notation for very large and very small quantities.',
      topics: [
        {
          id: 'real-numbers',
          title: 'Real Numbers',
          subtitle: 'Rational and irrational numbers, recurring decimals, and ordering on the number line.',
          introduction:
            'The real numbers fill the number line without gaps. Some can be written as exact fractions; others, such as $\\sqrt{2}$ and $\\pi$, cannot. Grade 8 makes that distinction precise and shows how to move between fractions, decimals and surds without losing accuracy.',
          prerequisites: [
            'integers',
            'rational-numbers',
            'exponents-and-powers',
            'Square numbers and decimal place value',
          ],
          keyIdeas: [
            'A rational number is a fraction of two integers with a non-zero denominator.',
            'Rational decimals terminate or eventually repeat a block of digits.',
            'Irrational decimals neither terminate nor repeat, so they cannot be written as exact fractions.',
            'Positive surds can be ordered by comparing their squares or by using decimal approximations.',
          ],
          aliases: [
            'irrational numbers',
            'surds',
            'recurring decimals',
            'real number line',
            'terminating decimals',
          ],
          theory: [
            {
              title: 'Rational numbers have terminating or recurring decimals',
              body: [
                'A rational number is any number that can be written as $\\frac{p}{q}$, where $p$ and $q$ are integers and $q \\ne 0$. The same number has many fraction forms: $\\frac{3}{4} = \\frac{6}{8} = \\frac{75}{100}$.',
                'When you divide $p$ by $q$, the decimal either terminates or eventually repeats a block of digits forever. For example, $\\frac{3}{8} = 0.375$ terminates, while $\\frac{2}{11} = 0.181818\\ldots = 0.\\overline{18}$ recurs. A recurring decimal can be converted back into an exact fraction, so it is still rational.',
              ],
              bullets: [
                'Terminating examples: $\\frac{1}{4} = 0.25$ and $\\frac{7}{20} = 0.35$.',
                'Recurring examples: $\\frac{1}{3} = 0.\\overline{3}$ and $\\frac{5}{6} = 0.8\\overline{3}$.',
                'Every integer is rational because $7 = \\frac{7}{1}$.',
              ],
            },
            {
              title: 'Irrational numbers are not fractions',
              body: [
                'An irrational number cannot be written as a fraction of two integers. Its decimal never terminates and never settles into a repeating block. The classic examples are $\\sqrt{2} = 1.41421356\\ldots$, $\\sqrt{3} = 1.73205080\\ldots$ and $\\pi = 3.14159265\\ldots$.',
                'A square root of a positive integer is rational exactly when the integer is a perfect square. So $\\sqrt{49} = 7$ is rational, but $\\sqrt{50}$ is irrational. Approximations such as $1.414$ are useful for measuring, yet they are not equal to $\\sqrt{2}$.',
              ],
              bullets: [
                'Surds are irrational roots left in exact form, such as $\\sqrt{5}$, $2\\sqrt{3}$ or $\\frac{\\sqrt{7}}{2}$.',
                'Do not write $\\pi = \\frac{22}{7}$; the fraction is only an approximation.',
              ],
            },
            {
              title: 'Ordering real numbers',
              body: [
                'Every real number has one position on the number line. To compare a surd with a decimal, approximate the surd, or compare squares when both numbers are positive. If $0 \\le a < b$, then $\\sqrt{a} < \\sqrt{b}$.',
                'For example, $\\sqrt{7}$ lies between $2$ and $3$ because $2^2 = 4 < 7 < 9 = 3^2$. To compare $\\sqrt{7}$ with $2.6$, square $2.6$: $2.6^2 = 6.76 < 7$, so $\\sqrt{7} > 2.6$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-real-numbers-rational-form',
              title: 'Rational number as a fraction',
              expression: String.raw`r = \frac{p}{q}`,
              description:
                'Every rational number can be written as one integer divided by another non-zero integer.',
              spoken: 'r equals p over q, where p and q are integers and q is not zero.',
              variables: [
                { symbol: 'r', name: 'a rational number', note: 'the value being represented' },
                { symbol: 'p', name: 'numerator', note: 'an integer' },
                { symbol: 'q', name: 'denominator', note: 'a non-zero integer' },
              ],
              conditions: [
                '$q \\ne 0$; division by zero is undefined.',
                '$p$ and $q$ are integers, so the fraction is a ratio of whole numbers.',
              ],
              notes:
                'The decimal form of a rational number either terminates or recurs. Reducing to lowest terms does not change the value.',
              tags: ['rational number', 'fraction form', 'p over q', 'integer ratio'],
            },
            {
              id: 'g8-real-numbers-recurring-fraction',
              title: 'Recurring decimal to fraction',
              expression: String.raw`0.\overline{N} = \frac{N}{10^n - 1}`,
              description:
                'A purely recurring decimal equals its repeating block divided by the same number of 9s.',
              spoken: 'Zero point N recurring equals N divided by ten to the n minus one.',
              variables: [
                {
                  symbol: 'N',
                  name: 'repeating block',
                  note: 'the integer formed by the digits that repeat, for example 36',
                },
                { symbol: 'n', name: 'number of digits in the block', note: 'a positive integer' },
              ],
              conditions: [
                'The decimal is purely recurring: the repeating block starts immediately after the point.',
                'Mixed decimals need the non-repeating part removed first, for example by subtracting a multiple of $x$.',
              ],
              notes:
                'For $0.\\overline{36}$, $N = 36$ and $n = 2$, so the fraction is $\\frac{36}{99} = \\frac{4}{11}$. The formula works because $100x - x = 99x$ cancels the infinite tail.',
              tags: ['recurring decimal', 'repeating decimal', 'convert to fraction', 'nines'],
            },
            {
              id: 'g8-real-numbers-order-roots',
              title: 'Ordering positive square roots',
              expression: String.raw`0 \le a < b \implies \sqrt{a} < \sqrt{b}`,
              description:
                'For non-negative numbers, taking the principal square root preserves order.',
              spoken: 'If a is at least zero and a is less than b, then the square root of a is less than the square root of b.',
              variables: [
                { symbol: 'a', name: 'smaller non-negative number', note: 'must satisfy $a \\ge 0$' },
                { symbol: 'b', name: 'larger non-negative number', note: 'must satisfy $b > a$' },
              ],
              conditions: ['Both numbers must be non-negative, because real square roots of negatives do not exist.'],
              notes:
                'To compare positive numbers, squaring both sides preserves the order. This is often faster than using decimal approximations.',
              tags: ['ordering surds', 'compare square roots', 'number line', 'inequality'],
            },
          ],
          examples: [
            {
              title: 'From a recurring decimal to a fraction',
              problem: 'Write $0.1\\overline{6} = 0.1666\\ldots$ as a fraction in lowest terms.',
              given: [
                'The digit $1$ does not repeat; the digit $6$ repeats forever.',
                'Let $x = 0.1666\\ldots$.',
              ],
              steps: [
                {
                  text: 'Name the decimal $x$ so that ordinary algebra can be applied to it.',
                  math: String.raw`x = 0.1666\ldots`,
                },
                {
                  text: 'Multiply by $10$ to move the decimal point past the non-repeating digit.',
                  math: String.raw`10x = 1.666\ldots`,
                },
                {
                  text: 'Multiply by $10$ again so that the repeating parts line up.',
                  math: String.raw`100x = 16.666\ldots`,
                },
                {
                  text: 'Subtract the two equations. The infinite tails cancel exactly.',
                  math: String.raw`100x - 10x = 16.666\ldots - 1.666\ldots`,
                },
                {
                  text: 'Simplify both sides.',
                  math: String.raw`90x = 15`,
                },
                {
                  text: 'Divide by $90$ and reduce.',
                  math: String.raw`x = \frac{15}{90} = \frac{1}{6}`,
                },
                {
                  text: 'Check by division: $1 \\div 6 = 0.1666\\ldots$, which matches the original decimal.',
                },
              ],
              answer: '$0.1\\overline{6} = \\frac{1}{6}$ exactly.',
            },
            {
              title: 'Ordering a surd, a decimal and a fraction',
              problem: 'Order $\\sqrt{7}$, $2.6$ and $\\frac{8}{3}$ from least to greatest.',
              given: [
                '$\\sqrt{7}$ is positive and lies between $2$ and $3$.',
                '$2.6$ is a terminating decimal.',
                '$\\frac{8}{3} = 2.666\\ldots$',
              ],
              steps: [
                {
                  text: 'Locate $\\sqrt{7}$ between consecutive whole numbers by squaring.',
                  math: String.raw`2^2 = 4 < 7 < 9 = 3^2 \implies 2 < \sqrt{7} < 3`,
                },
                {
                  text: 'Compare $\\sqrt{7}$ with $2.6$ by squaring $2.6$.',
                  math: String.raw`2.6^2 = 6.76 < 7 \implies \sqrt{7} > 2.6`,
                },
                {
                  text: 'Convert the fraction to a decimal.',
                  math: String.raw`\frac{8}{3} = 2.666\ldots`,
                },
                {
                  text: 'Compare $\\sqrt{7}$ with $\\frac{8}{3}$ by squaring both positive numbers.',
                  math: String.raw`\left(\frac{8}{3}\right)^2 = \frac{64}{9} \approx 7.111 > 7 \implies \sqrt{7} < \frac{8}{3}`,
                },
                {
                  text: 'Combine the two comparisons into one chain.',
                  math: String.raw`2.6 < \sqrt{7} < \frac{8}{3}`,
                },
              ],
              answer: '$2.6 < \\sqrt{7} < \\frac{8}{3}$, with $\\sqrt{7} \\approx 2.65$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Assuming every square root is irrational.',
              correction:
                '$\\sqrt{36} = 6$ is rational because $36$ is a perfect square. A square root of an integer is irrational only when the integer is not a perfect square.',
            },
            {
              mistake: 'Treating $0.333\\ldots$ as slightly less than $\\frac{1}{3}$ because the decimal never ends.',
              correction:
                'The repeating decimal equals $\\frac{1}{3}$ exactly. The ellipsis means the 3s continue forever; it does not mean the value stops short of $\\frac{1}{3}$.',
            },
            {
              mistake: 'Writing $\\pi = \\frac{22}{7}$ or $\\sqrt{2} = 1.414$ as exact equalities.',
              correction:
                'These are approximations. Use $\\approx$ and keep the exact symbol when precision matters.',
            },
          ],
          exercises: [
            {
              id: 'g8-real-numbers-ex-1',
              type: 'multiple-choice',
              prompt: 'Which of these numbers is irrational?',
              options: [
                String.raw`\sqrt{36}`,
                String.raw`0.\overline{27}`,
                String.raw`\sqrt{30}`,
                String.raw`\frac{22}{7}`,
              ],
              correctOption: 2,
              hint: 'A square root of a positive integer is rational only when the integer is a perfect square.',
              explanation:
                '$\\sqrt{36} = 6$ is an integer, $0.\\overline{27} = \\frac{3}{11}$ is a fraction, and $\\frac{22}{7}$ is a fraction, so all three are rational. Since $30$ is not a perfect square, $\\sqrt{30}$ is irrational.',
              difficulty: 'easy',
            },
            {
              id: 'g8-real-numbers-ex-2',
              type: 'multiple-choice',
              prompt: 'Write $0.\\overline{45}$ as a fraction in lowest terms.',
              options: [
                String.raw`\frac{45}{100}`,
                String.raw`\frac{5}{11}`,
                String.raw`\frac{9}{20}`,
                String.raw`\frac{45}{90}`,
              ],
              correctOption: 1,
              hint: 'A two-digit repeating block is divided by 99.',
              explanation:
                'Let $x = 0.4545\\ldots$, so $100x = 45.4545\\ldots$. Subtracting gives $99x = 45$, hence $x = \\frac{45}{99} = \\frac{5}{11}$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-real-numbers-ex-3',
              type: 'numeric',
              prompt: 'The decimal $0.\\overline{27}$ equals a fraction in lowest terms. What is the numerator of that fraction?',
              answer: 3,
              tolerance: 0,
              hint: 'Divide the two-digit block by 99, then reduce.',
              explanation:
                '$0.\\overline{27} = \\frac{27}{99} = \\frac{3}{11}$, so the numerator is $3$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-real-numbers-ex-4',
              type: 'numeric',
              prompt: 'What is the greatest integer that is less than $\\sqrt{50}$?',
              answer: 7,
              tolerance: 0,
              hint: 'Find the perfect squares on either side of 50.',
              explanation:
                'Since $49 < 50 < 64$, we have $7 < \\sqrt{50} < 8$. Numerically $\\sqrt{50} \\approx 7.07$, so the greatest integer below it is $7$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-real-numbers-ex-5',
              type: 'multiple-choice',
              prompt: 'Between which two consecutive tenths does $\\sqrt{11}$ lie?',
              options: ['3.1 and 3.2', '3.2 and 3.3', '3.3 and 3.4', '3.4 and 3.5'],
              correctOption: 2,
              hint: 'Square both endpoints of each interval and compare with 11.',
              explanation:
                '$3.3^2 = 10.89$ and $3.4^2 = 11.56$. Because $10.89 < 11 < 11.56$, $\\sqrt{11}$ lies between $3.3$ and $3.4$; indeed $\\sqrt{11} \\approx 3.317$.',
              difficulty: 'hard',
            },
          ],
          related: ['square-and-cube-roots', 'scientific-notation', 'rational-numbers', 'exponents-and-powers'],
        },
        {
          id: 'square-and-cube-roots',
          title: 'Square and Cube Roots',
          subtitle: 'Perfect squares and cubes, root laws, estimation, and simplification.',
          introduction:
            'A square root reverses squaring; a cube root reverses cubing. Roots connect geometry, where a side length comes from an area, with algebra, where they solve equations such as $x^2 = 49$. Their laws let you simplify expressions without decimal approximations.',
          prerequisites: [
            'exponents-and-powers',
            'real-numbers',
            'Multiplication facts and prime factorization',
          ],
          keyIdeas: [
            'The principal square root $\\sqrt{a}$ is the non-negative number whose square is $a$.',
            'Perfect squares up to $15^2$ and perfect cubes up to $10^3$ should be recognised instantly.',
            'Root laws apply to products and quotients, but never to sums.',
            'Pulling out the largest perfect-square factor simplifies a surd.',
          ],
          aliases: ['radicals', 'perfect squares', 'perfect cubes', 'cube root', 'simplifying surds'],
          theory: [
            {
              title: 'Square roots and perfect squares',
              body: [
                'The principal square root $\\sqrt{a}$ is the non-negative number whose square is $a$. For example, $\\sqrt{81} = 9$ because $9^2 = 81$ and $9 \\ge 0$. The equation $x^2 = 81$ has two solutions, $x = 9$ and $x = -9$, but the symbol $\\sqrt{81}$ means only the principal, non-negative root.',
                'The perfect squares up to $15^2$ are $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196$ and $225$. Recognising them lets you evaluate roots instantly and factor surds by hand.',
              ],
            },
            {
              title: 'Cube roots',
              body: [
                'The cube root $\\sqrt[3]{a}$ is the number whose cube is $a$. Unlike a square root, a cube root of a negative number is real: $\\sqrt[3]{-8} = -2$ because $(-2)^3 = -8$.',
                'The perfect cubes up to $10^3$ are $1, 8, 27, 64, 125, 216, 343, 512, 729$ and $1000$. A cube root can be negative, zero or positive, and it always has the same sign as the number inside.',
              ],
            },
            {
              title: 'Root laws, simplification and estimation',
              body: [
                'For $a \\ge 0$ and $b \\ge 0$, $\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$ and, when $b > 0$, $\\sqrt{\\frac{a}{b}} = \\frac{\\sqrt{a}}{\\sqrt{b}}$. These laws let you pull out perfect-square factors: $\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.',
                'Roots do not split across addition: $\\sqrt{9+16} = \\sqrt{25} = 5$, while $\\sqrt{9} + \\sqrt{16} = 3+4 = 7$. Also $\\sqrt{a^2} = |a|$, not always $a$; for instance $\\sqrt{(-5)^2} = 5$.',
                'To estimate a root, bracket it between consecutive perfect squares. Since $49 < 50 < 64$, $\\sqrt{50}$ lies between $7$ and $8$, close to $7.07$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-roots-square-definition',
              title: 'Definition of a square root',
              expression: String.raw`b = \sqrt{a} \iff b^2 = a \text{ and } b \ge 0`,
              description:
                'The principal square root of a non-negative number is its non-negative square root.',
              spoken: 'b equals the square root of a exactly when b squared equals a and b is at least zero.',
              variables: [
                { symbol: 'a', name: 'radicand', note: 'must satisfy $a \\ge 0$' },
                { symbol: 'b', name: 'principal square root', note: 'must satisfy $b \\ge 0$' },
              ],
              conditions: ['$a \\ge 0$. A real number has a real square root only when the radicand is non-negative.'],
              notes:
                'The equation $x^2 = a$ has two solutions, $\\pm\\sqrt{a}$, when $a>0$. The radical symbol alone gives the non-negative one.',
              tags: ['square root', 'principal root', 'radicand', 'definition'],
            },
            {
              id: 'g8-roots-product-rule',
              title: 'Product rule for square roots',
              expression: String.raw`\sqrt{ab} = \sqrt{a}\,\sqrt{b}`,
              description: 'The square root of a product equals the product of the square roots.',
              spoken: 'The square root of a times b equals the square root of a times the square root of b.',
              variables: [
                { symbol: 'a', name: 'first factor', note: 'must be non-negative' },
                { symbol: 'b', name: 'second factor', note: 'must be non-negative' },
              ],
              conditions: ['$a \\ge 0$ and $b \\ge 0$. The rule can fail for negative factors.'],
              notes:
                'Use the rule in reverse to simplify surds: $\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$.',
              tags: ['product rule', 'radical law', 'simplify surds', 'square root law'],
            },
            {
              id: 'g8-roots-quotient-rule',
              title: 'Quotient rule for square roots',
              expression: String.raw`\sqrt{\frac{a}{b}} = \frac{\sqrt{a}}{\sqrt{b}}`,
              description: 'The square root of a quotient equals the quotient of the square roots.',
              spoken: 'The square root of a over b equals the square root of a divided by the square root of b.',
              variables: [
                { symbol: 'a', name: 'numerator', note: 'must be non-negative' },
                { symbol: 'b', name: 'denominator', note: 'must be positive' },
              ],
              conditions: ['$a \\ge 0$ and $b > 0$, so the denominator is not zero.'],
              notes:
                'Example: $\\sqrt{\\frac{49}{16}} = \\frac{7}{4}$. The denominator must stay positive.',
              tags: ['quotient rule', 'radical law', 'fraction square root', 'divide roots'],
            },
            {
              id: 'g8-roots-cube-definition',
              title: 'Definition of a cube root',
              expression: String.raw`b = \sqrt[3]{a} \iff b^3 = a`,
              description: 'The cube root of a number is the number whose cube equals it.',
              spoken: 'b equals the cube root of a exactly when b cubed equals a.',
              variables: [
                { symbol: 'a', name: 'number under the cube root', note: 'may be positive, negative or zero' },
                { symbol: 'b', name: 'cube root', note: 'has the same sign as $a$' },
              ],
              conditions: ['No restriction on $a$: every real number has exactly one real cube root.'],
              notes:
                'The product law also holds for cube roots: $\\sqrt[3]{ab} = \\sqrt[3]{a}\\,\\sqrt[3]{b}$. For example, $\\sqrt[3]{54} = \\sqrt[3]{27 \\cdot 2} = 3\\sqrt[3]{2}$.',
              tags: ['cube root', 'perfect cube', 'radical', 'negative radicand'],
            },
          ],
          examples: [
            {
              title: 'Simplifying a square-root surd',
              problem: 'Simplify $\\sqrt{72}$ and give a decimal check.',
              given: ['$72 = 36 \\times 2$.', '$36$ is a perfect square.'],
              steps: [
                {
                  text: 'Look for the largest perfect-square factor of $72$.',
                  math: String.raw`72 = 36 \cdot 2`,
                },
                {
                  text: 'Apply the product rule for roots.',
                  math: String.raw`\sqrt{72} = \sqrt{36 \cdot 2} = \sqrt{36}\,\sqrt{2}`,
                },
                {
                  text: 'Evaluate the perfect-square root.',
                  math: String.raw`\sqrt{36} = 6`,
                },
                {
                  text: 'Write the simplified surd.',
                  math: String.raw`\sqrt{72} = 6\sqrt{2}`,
                },
                {
                  text: 'Check numerically with $\\sqrt{2} \\approx 1.4142$.',
                  math: String.raw`6\sqrt{2} \approx 6(1.4142) = 8.4852 \approx \sqrt{72}`,
                },
              ],
              answer: '$\\sqrt{72} = 6\\sqrt{2} \\approx 8.49$.',
            },
            {
              title: 'Evaluating a mixed root expression',
              problem: 'Evaluate $\\sqrt{\\frac{49}{16}} + \\sqrt[3]{-8}$.',
              given: [
                '$49$ and $16$ are perfect squares.',
                '$-8$ is a perfect cube because $(-2)^3 = -8$.',
              ],
              steps: [
                {
                  text: 'Apply the quotient rule to the square root.',
                  math: String.raw`\sqrt{\frac{49}{16}} = \frac{\sqrt{49}}{\sqrt{16}} = \frac{7}{4}`,
                },
                {
                  text: 'Evaluate the cube root, keeping the negative sign.',
                  math: String.raw`\sqrt[3]{-8} = -2 \quad \text{because } (-2)^3 = -8`,
                },
                {
                  text: 'Add the two values.',
                  math: String.raw`\frac{7}{4} + (-2) = \frac{7}{4} - \frac{8}{4}`,
                },
                {
                  text: 'Subtract the numerators.',
                  math: String.raw`= -\frac{1}{4}`,
                },
                {
                  text: 'Check the size: $\\frac{7}{4} = 1.75$ and $1.75 - 2 = -0.25$, as expected.',
                },
              ],
              answer: '$\\sqrt{\\frac{49}{16}} + \\sqrt[3]{-8} = -\\frac{1}{4}$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Splitting a root across a sum: $\\sqrt{a+b} = \\sqrt{a} + \\sqrt{b}$.',
              correction:
                'The rule applies only to products and quotients. For example, $\\sqrt{9+16} = 5$, but $\\sqrt{9} + \\sqrt{16} = 7$.',
            },
            {
              mistake: 'Writing $\\sqrt{a^2} = a$ for every value of $a$.',
              correction:
                '$\\sqrt{a^2} = |a|$. If $a = -5$, then $\\sqrt{(-5)^2} = \\sqrt{25} = 5$, not $-5$.',
            },
            {
              mistake: 'Claiming that $\\sqrt[3]{-8}$ is undefined.',
              correction:
                'Cube roots of negative numbers are real: $\\sqrt[3]{-8} = -2$ because $(-2)^3 = -8$.',
            },
          ],
          exercises: [
            {
              id: 'g8-roots-ex-1',
              type: 'multiple-choice',
              prompt: 'Evaluate $\\sqrt{196}$.',
              options: ['12', '13', '14', '16'],
              correctOption: 2,
              hint: 'Which whole number squares to 196?',
              explanation: '$14^2 = 196$, so $\\sqrt{196} = 14$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-roots-ex-2',
              type: 'multiple-choice',
              prompt: 'Simplify $\\sqrt{50}$.',
              options: [
                String.raw`2\sqrt{5}`,
                String.raw`5\sqrt{2}`,
                String.raw`10\sqrt{5}`,
                String.raw`25\sqrt{2}`,
              ],
              correctOption: 1,
              hint: 'Find the largest perfect-square factor of 50.',
              explanation:
                '$50 = 25 \\times 2$, so $\\sqrt{50} = \\sqrt{25}\\,\\sqrt{2} = 5\\sqrt{2}$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-roots-ex-3',
              type: 'multiple-choice',
              prompt: 'Which expression has the greatest value?',
              options: [
                String.raw`\sqrt{80}`,
                String.raw`3\sqrt{10}`,
                String.raw`\sqrt[3]{700}`,
                String.raw`9`,
              ],
              correctOption: 1,
              hint: 'Approximate each value between two whole numbers.',
              explanation:
                '$\\sqrt{80} \\approx 8.94$, $3\\sqrt{10} \\approx 9.49$, $\\sqrt[3]{700} \\approx 8.88$ because $8^3 = 512$ and $9^3 = 729$, and $9$ is exactly $9$. The greatest is $3\\sqrt{10}$.',
              difficulty: 'hard',
            },
            {
              id: 'g8-roots-ex-4',
              type: 'numeric',
              prompt: 'Evaluate $\\sqrt[3]{729}$.',
              answer: 9,
              tolerance: 0,
              hint: 'Which number cubed gives 729?',
              explanation: '$9^3 = 729$, so $\\sqrt[3]{729} = 9$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-roots-ex-5',
              type: 'numeric',
              prompt: 'Evaluate $\\sqrt{40}$ correct to two decimal places.',
              answer: 6.32,
              tolerance: 0.02,
              hint: '$6.3^2 = 39.69$ and $6.4^2 = 40.96$.',
              explanation:
                '$\\sqrt{40} \\approx 6.3246$, which rounds to $6.32$. Squaring the answer gives $6.32^2 = 39.9424$, close to $40$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-roots-ex-6',
              type: 'numeric',
              prompt: 'Write $\\sqrt[3]{250}$ in the form $k\\sqrt[3]{2}$. What is the value of $k$?',
              answer: 5,
              tolerance: 0,
              hint: 'Find the largest perfect-cube factor of 250.',
              explanation:
                '$250 = 125 \\times 2$, so $\\sqrt[3]{250} = \\sqrt[3]{125}\\,\\sqrt[3]{2} = 5\\sqrt[3]{2}$. Hence $k = 5$.',
              difficulty: 'hard',
            },
          ],
          related: ['real-numbers', 'exponents-and-powers', 'pythagorean-theorem', 'radical-expressions'],
        },
        {
          id: 'scientific-notation',
          title: 'Scientific Notation',
          subtitle: 'Writing very large and very small numbers as a coefficient times a power of ten.',
          introduction:
            'Scientific notation writes a number as a coefficient between $1$ and $10$ multiplied by a power of ten. It keeps very large and very small measurements readable and makes orders of magnitude easy to compare.',
          prerequisites: [
            'exponents-and-powers',
            'rational-numbers',
            'Multiplying and dividing decimals',
          ],
          keyIdeas: [
            'Standard form is $a \\times 10^n$ with $1 \\le a < 10$ and $n$ an integer.',
            'A positive exponent marks a large number; a negative exponent marks a number between 0 and 1.',
            'To multiply, multiply the coefficients and add the exponents.',
            'To divide, divide the coefficients and subtract the exponents.',
            'One order of magnitude is a factor of ten.',
          ],
          aliases: ['standard form', 'orders of magnitude', 'powers of ten', 'scientific notation', 'a times ten to the n'],
          theory: [
            {
              title: 'Standard form',
              body: [
                'A number is in scientific notation, also called standard form, when it is written as $a \\times 10^n$ with $1 \\le a < 10$ and $n$ an integer. The coefficient $a$ carries the significant digits; the exponent $n$ records the size.',
                'For numbers at least $10$, the exponent is positive: $4,700,000 = 4.7 \\times 10^6$. For numbers between $0$ and $1$, the exponent is negative: $0.00032 = 3.2 \\times 10^{-4}$. Moving the decimal point one place changes the exponent by $1$.',
              ],
            },
            {
              title: 'Calculating with scientific notation',
              body: [
                'To multiply, multiply the coefficients and add the exponents: $(2 \\times 10^3)(3 \\times 10^5) = 6 \\times 10^8$. To divide, divide the coefficients and subtract the exponents: $\\frac{8 \\times 10^9}{2 \\times 10^4} = 4 \\times 10^5$.',
                'If the coefficient is not between $1$ and $10$, adjust it and change the exponent. For example, $12 \\times 10^5 = 1.2 \\times 10^6$, because $12 = 1.2 \\times 10^1$ and $10^1 \\times 10^5 = 10^6$.',
              ],
            },
            {
              title: 'Orders of magnitude and precision',
              body: [
                'One order of magnitude is a factor of $10$. A number with exponent $n$ is about $10^n$ in size. Comparing $6 \\times 10^7$ with $2 \\times 10^5$, the exponents differ by $2$, so the first is about $10^2 = 100$ times larger. Division confirms: $\\frac{6 \\times 10^7}{2 \\times 10^5} = 3 \\times 10^2 = 300$.',
                'Scientific notation is not the same as a rounded decimal. The digits written in the coefficient indicate precision, so $4.70 \\times 10^3$ and $4.7 \\times 10^3$ suggest different levels of measurement detail.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-sci-notation-standard-form',
              title: 'Scientific notation',
              expression: String.raw`N = a \times 10^n, \quad 1 \le a < 10`,
              description: 'A number in scientific notation has one non-zero digit before the decimal point.',
              spoken: 'N equals a times ten to the n, where a is at least one and less than ten.',
              variables: [
                { symbol: 'N', name: 'number being written', note: 'any non-zero real number' },
                { symbol: 'a', name: 'coefficient', note: 'must satisfy $1 \\le a < 10$' },
                { symbol: 'n', name: 'exponent', note: 'an integer; positive for large numbers, negative for small ones' },
              ],
              conditions: [
                '$1 \\le a < 10$, so exactly one non-zero digit appears before the decimal point.',
                '$n$ is an integer; $N \\ne 0$.',
              ],
              notes:
                'Moving the decimal point left increases the exponent; moving it right decreases the exponent. For example, $0.00045 = 4.5 \\times 10^{-4}$.',
              tags: ['scientific notation', 'standard form', 'power of ten', 'coefficient'],
            },
            {
              id: 'g8-sci-notation-multiply',
              title: 'Multiplying in scientific notation',
              expression: String.raw`(a \times 10^m)(b \times 10^n) = (ab) \times 10^{m+n}`,
              description: 'Multiply the coefficients and add the exponents.',
              spoken: 'a times ten to the m, times b times ten to the n, equals a b times ten to the m plus n.',
              variables: [
                { symbol: 'a', name: 'first coefficient' },
                { symbol: 'b', name: 'second coefficient' },
                { symbol: 'm', name: 'first exponent', note: 'an integer' },
                { symbol: 'n', name: 'second exponent', note: 'an integer' },
              ],
              conditions: ['The coefficient $ab$ may need adjusting to lie between $1$ and $10$.'],
              notes:
                'If $ab \\ge 10$, rewrite it as a number between $1$ and $10$ and increase the exponent. Example: $14.4 \\times 10^7 = 1.44 \\times 10^8$.',
              tags: ['multiply scientific notation', 'add exponents', 'product', 'powers of ten'],
            },
            {
              id: 'g8-sci-notation-divide',
              title: 'Dividing in scientific notation',
              expression: String.raw`\frac{a \times 10^m}{b \times 10^n} = \left(\frac{a}{b}\right) \times 10^{m-n}`,
              description: 'Divide the coefficients and subtract the exponents.',
              spoken: 'a times ten to the m, divided by b times ten to the n, equals a over b times ten to the m minus n.',
              variables: [
                { symbol: 'a', name: 'numerator coefficient' },
                { symbol: 'b', name: 'denominator coefficient', note: 'must be non-zero' },
                { symbol: 'm', name: 'numerator exponent', note: 'an integer' },
                { symbol: 'n', name: 'denominator exponent', note: 'an integer' },
              ],
              conditions: ['$b \\ne 0$.', 'The quotient $\\frac{a}{b}$ may need adjusting to lie between $1$ and $10$.'],
              notes:
                'Subtracting a negative exponent is the same as adding: $5 - (-2) = 7$. Normalise the coefficient after dividing.',
              tags: ['divide scientific notation', 'subtract exponents', 'quotient', 'powers of ten'],
            },
          ],
          examples: [
            {
              title: 'Multiplying two measurements',
              problem: 'Calculate $(3.2 \\times 10^4)(4.5 \\times 10^3)$ and give the answer in scientific notation.',
              given: ['First factor: $3.2 \\times 10^4$.', 'Second factor: $4.5 \\times 10^3$.'],
              steps: [
                {
                  text: 'Multiply the coefficients.',
                  math: String.raw`3.2 \times 4.5 = 14.4`,
                },
                {
                  text: 'Add the exponents.',
                  math: String.raw`10^4 \times 10^3 = 10^{4+3} = 10^7`,
                },
                {
                  text: 'Combine the two parts.',
                  math: String.raw`14.4 \times 10^7`,
                },
                {
                  text: 'Rewrite $14.4$ as $1.44 \\times 10^1$ so the coefficient is less than $10$.',
                  math: String.raw`14.4 \times 10^7 = 1.44 \times 10^1 \times 10^7`,
                },
                {
                  text: 'Add the exponents once more.',
                  math: String.raw`= 1.44 \times 10^8`,
                },
                {
                  text: 'Check with ordinary numbers: $32{,}000 \\times 4{,}500 = 144{,}000{,}000 = 1.44 \\times 10^8$.',
                },
              ],
              answer: '$(3.2 \\times 10^4)(4.5 \\times 10^3) = 1.44 \\times 10^8$.',
            },
            {
              title: 'Dividing with a negative exponent',
              problem: 'Calculate $\\frac{6.3 \\times 10^5}{9 \\times 10^{-2}}$ and give the answer in scientific notation.',
              given: ['Numerator: $6.3 \\times 10^5$.', 'Denominator: $9 \\times 10^{-2}$.'],
              steps: [
                {
                  text: 'Divide the coefficients.',
                  math: String.raw`\frac{6.3}{9} = 0.7`,
                },
                {
                  text: 'Subtract the exponents, remembering that subtracting a negative adds.',
                  math: String.raw`10^{5-(-2)} = 10^7`,
                },
                {
                  text: 'Combine the parts.',
                  math: String.raw`0.7 \times 10^7`,
                },
                {
                  text: 'Rewrite $0.7$ as $7 \\times 10^{-1}$ to normalise the coefficient.',
                  math: String.raw`0.7 \times 10^7 = 7 \times 10^{-1} \times 10^7 = 7 \times 10^6`,
                },
                {
                  text: 'Check with ordinary numbers: $630{,}000 \\div 0.09 = 7{,}000{,}000 = 7 \\times 10^6$.',
                },
              ],
              answer: '$\\frac{6.3 \\times 10^5}{9 \\times 10^{-2}} = 7 \\times 10^6$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Writing $12.5 \\times 10^3$ as a final answer in scientific notation.',
              correction:
                'Standard form requires $1 \\le a < 10$. Rewrite $12.5 \\times 10^3$ as $1.25 \\times 10^4$.',
            },
            {
              mistake: 'Subtracting exponents incorrectly when the denominator has a negative exponent.',
              correction:
                '$\\frac{10^5}{10^{-2}} = 10^{5-(-2)} = 10^7$, not $10^3$. Subtracting a negative number adds.',
            },
            {
              mistake: 'Thinking $10^0 = 0$.',
              correction:
                '$10^0 = 1$. Any non-zero number raised to the power $0$ equals $1$.',
            },
          ],
          exercises: [
            {
              id: 'g8-sci-notation-ex-1',
              type: 'multiple-choice',
              prompt: 'Write $0.00045$ in scientific notation.',
              options: [
                String.raw`4.5 \times 10^{-3}`,
                String.raw`4.5 \times 10^{-4}`,
                String.raw`4.5 \times 10^{-5}`,
                String.raw`45 \times 10^{-4}`,
              ],
              correctOption: 1,
              hint: 'Move the decimal point until the coefficient is between 1 and 10, then count the places.',
              explanation:
                'Moving the decimal point four places right gives $4.5$, so the exponent is $-4$: $0.00045 = 4.5 \\times 10^{-4}$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-sci-notation-ex-2',
              type: 'multiple-choice',
              prompt: 'Calculate $(2 \\times 10^3)(3 \\times 10^5)$.',
              options: [
                String.raw`6 \times 10^8`,
                String.raw`6 \times 10^{15}`,
                String.raw`5 \times 10^8`,
                String.raw`6 \times 10^2`,
              ],
              correctOption: 0,
              hint: 'Multiply the coefficients and add the exponents.',
              explanation:
                '$2 \\times 3 = 6$ and $10^3 \\times 10^5 = 10^{3+5} = 10^8$, so the product is $6 \\times 10^8$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-sci-notation-ex-3',
              type: 'numeric',
              prompt: 'Write $81{,}000$ in scientific notation. What is the exponent of $10$?',
              answer: 4,
              tolerance: 0,
              hint: 'Place the decimal point after the first non-zero digit.',
              explanation:
                '$81{,}000 = 8.1 \\times 10^4$, because the decimal point moves four places left. The exponent is $4$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-sci-notation-ex-4',
              type: 'numeric',
              prompt: 'Calculate $\\frac{8.4 \\times 10^6}{2.1 \\times 10^3}$ and give the ordinary number.',
              answer: 4000,
              tolerance: 0,
              hint: 'The coefficient $8.4 \\div 2.1$ is exactly 4.',
              explanation:
                '$\\frac{8.4}{2.1} = 4$ and $10^{6-3} = 10^3$, so the quotient is $4 \\times 10^3 = 4000$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-sci-notation-ex-5',
              type: 'multiple-choice',
              prompt: 'Which number is the largest?',
              options: [
                String.raw`3.4 \times 10^{-3}`,
                String.raw`4.1 \times 10^{-4}`,
                String.raw`3.4 \times 10^{-2}`,
                String.raw`4.1 \times 10^{-5}`,
              ],
              correctOption: 2,
              hint: 'For small numbers, the exponent closest to zero is the largest.',
              explanation:
                'The values are $0.0034$, $0.00041$, $0.034$ and $0.000041$. The largest is $3.4 \\times 10^{-2}$.',
              difficulty: 'hard',
            },
          ],
          related: ['exponents-and-powers', 'real-numbers', 'square-and-cube-roots'],
        },
      ],
    },
    {
      id: 'algebra',
      family: 'algebra',
      title: 'Algebra',
      description:
        'Move fluently between expressions, equations, inequalities, and functions. Polynomials and factorization provide the structural tools; linear functions show how algebra describes change.',
      topics: [
        {
          id: 'linear-equations-and-inequalities',
          title: 'Linear Equations and Inequalities',
          subtitle: 'Multi-step solving, variables on both sides, and the inequality reversal rule.',
          introduction:
            'An equation states that two expressions are equal; an inequality states that one is larger or smaller. Both are solved by reversing operations, but inequalities carry one extra rule: multiplying or dividing by a negative number reverses the direction.',
          prerequisites: [
            'linear-equations-one-variable',
            'algebraic-expressions',
            'integers',
          ],
          keyIdeas: [
            'Keep an equation balanced by doing the same operation to both sides.',
            'Collect variable terms on one side and number terms on the other.',
            'Multiplying or dividing an inequality by a negative number flips its sign.',
            'Solutions can be described with inequalities, number lines, or interval notation.',
          ],
          aliases: ['solving equations', 'inequalities', 'interval notation', 'variables both sides', 'flip the inequality'],
          theory: [
            {
              title: 'Solving multi-step equations',
              body: [
                'First remove brackets by distributing, then combine like terms on each side. After that, undo addition and subtraction before multiplication and division. For $3(x-2)+4=19$, distribute to get $3x-6+4=19$, combine to get $3x-2=19$, add $2$, then divide by $3$: $x=7$.',
                'Always substitute the answer back into the original equation. A solution that makes both sides equal is correct, and a careless sign error usually shows up immediately.',
              ],
            },
            {
              title: 'Variables on both sides',
              body: [
                'When variables appear on both sides, subtract the smaller variable term from both sides. For $5x+2=3x+10$, subtract $3x$: $2x+2=10$, so $x=4$.',
                'If the variable terms cancel completely, the equation is either an identity, true for every $x$ such as $2(x+1)=2x+2$, or a contradiction, true for no $x$ such as $x+3=x+5$.',
              ],
            },
            {
              title: 'Inequalities and interval notation',
              body: [
                'Adding or subtracting the same number preserves an inequality; multiplying or dividing by a positive number also preserves it. Multiplying or dividing by a negative number reverses it: if $a<b$ and $c<0$, then $ac>bc$.',
                'On a number line, an open circle marks $<$ or $>$ and a closed circle marks $\\le$ or $\\ge$. Interval notation records the same information: $(-3, 5]$ means $-3<x\\le 5$, while $[2,\\infty)$ means $x\\ge 2$.',
              ],
              bullets: [
                'A parenthesis excludes the endpoint: $(-3,5)$.',
                'A square bracket includes the endpoint: $[-3,5]$.',
                'Always use a parenthesis next to $\\pm\\infty$, never a square bracket.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-linear-ineq-solve',
              title: 'Solving a one-variable linear equation',
              expression: String.raw`ax + b = c \implies x = \frac{c-b}{a}`,
              description: 'Isolate $x$ by subtracting the constant and dividing by the coefficient.',
              spoken: 'If a x plus b equals c, then x equals c minus b, all divided by a.',
              variables: [
                { symbol: 'a', name: 'coefficient of x', note: 'must be non-zero' },
                { symbol: 'b', name: 'constant added to the term' },
                { symbol: 'c', name: 'constant on the other side' },
              ],
              conditions: ['$a \\ne 0$; otherwise the equation is not linear in $x$.'],
              notes: 'The same inverse operations solve $ax+b<c$; only multiplication or division by a negative $a$ reverses the inequality.',
              tags: ['linear equation', 'solve for x', 'inverse operations', 'balance method'],
            },
            {
              id: 'g8-linear-ineq-both-sides',
              title: 'Equation with variables on both sides',
              expression: String.raw`ax + b = cx + d \implies x = \frac{d-b}{a-c}`,
              description: 'Collect the variable terms on one side and the constants on the other.',
              spoken: 'If a x plus b equals c x plus d, then x equals d minus b, all divided by a minus c.',
              variables: [
                { symbol: 'a', name: 'coefficient of x on the left' },
                { symbol: 'c', name: 'coefficient of x on the right' },
                { symbol: 'b', name: 'constant on the left' },
                { symbol: 'd', name: 'constant on the right' },
              ],
              conditions: ['$a \\ne c$, so the variable terms do not cancel completely.'],
              notes: 'If $a=c$, either every $x$ works (identity) or no $x$ works (contradiction).',
              tags: ['variables on both sides', 'linear equation', 'collect like terms', 'solve'],
            },
            {
              id: 'g8-linear-ineq-reversal',
              title: 'Inequality reversal rule',
              expression: String.raw`a < b \text{ and } c < 0 \implies ac > bc`,
              description: 'Multiplying or dividing an inequality by a negative number reverses its direction.',
              spoken: 'If a is less than b and c is negative, then a times c is greater than b times c.',
              variables: [
                { symbol: 'a', name: 'left-hand value' },
                { symbol: 'b', name: 'right-hand value' },
                { symbol: 'c', name: 'negative multiplier', note: 'must satisfy $c<0$' },
              ],
              conditions: ['$c < 0$. The rule does not apply when $c$ is positive or zero.'],
              notes: 'Dividing by a negative is multiplication by its reciprocal, which is also negative, so the same reversal applies. Example: $-2x > 6$ gives $x < -3$.',
              tags: ['inequality reversal', 'flip sign', 'negative multiplier', 'inequality rule'],
            },
            {
              id: 'g8-linear-ineq-interval',
              title: 'Inequality and interval notation',
              expression: String.raw`a < x \le b \iff x \in (a,b]`,
              description: 'An inequality chain can be written as an interval with brackets showing included endpoints.',
              spoken: 'a is less than x and x is at most b, exactly when x belongs to the interval from a to b, open at a and closed at b.',
              variables: [
                { symbol: 'a', name: 'left endpoint' },
                { symbol: 'b', name: 'right endpoint', note: 'must satisfy $a<b$' },
                { symbol: 'x', name: 'variable in the interval' },
              ],
              conditions: ['$a < b$. Use $\\pm\\infty$ only with parentheses.'],
              notes: 'For $x \\ge 2$, write $[2,\\infty)$. For $x<5$, write $(-\\infty,5)$.',
              tags: ['interval notation', 'number line', 'inequality', 'endpoints'],
            },
          ],
          examples: [
            {
              title: 'Solving an equation with variables on both sides',
              problem: 'Solve $5x - 7 = 2x + 11$.',
              given: ['Variable terms appear on both sides.', 'Constant terms appear on both sides.'],
              steps: [
                {
                  text: 'Subtract $2x$ from both sides to collect the variable terms on the left.',
                  math: String.raw`5x - 7 - 2x = 2x + 11 - 2x`,
                },
                {
                  text: 'Simplify both sides.',
                  math: String.raw`3x - 7 = 11`,
                },
                {
                  text: 'Add $7$ to both sides.',
                  math: String.raw`3x = 18`,
                },
                {
                  text: 'Divide both sides by $3$.',
                  math: String.raw`x = 6`,
                },
                {
                  text: 'Check in the original equation: the left side is $5(6)-7 = 23$ and the right side is $2(6)+11 = 23$.',
                },
                {
                  text: 'Both sides agree, so the solution is confirmed.',
                },
              ],
              answer: '$x = 6$.',
            },
            {
              title: 'Solving an inequality and reversing the sign',
              problem: 'Solve $-3(x-2) \\ge 15$ and write the solution in interval notation.',
              given: ['The bracket must be expanded first.', 'The coefficient of $x$ will be negative.'],
              steps: [
                {
                  text: 'Distribute $-3$ across the bracket.',
                  math: String.raw`-3x + 6 \ge 15`,
                },
                {
                  text: 'Subtract $6$ from both sides.',
                  math: String.raw`-3x \ge 9`,
                },
                {
                  text: 'Divide both sides by $-3$. Because the divisor is negative, reverse the inequality.',
                  math: String.raw`x \le -3`,
                },
                {
                  text: 'Write the solution as an interval. The endpoint $-3$ is included, and the interval continues to negative infinity.',
                  math: String.raw`x \in (-\infty, -3]`,
                },
                {
                  text: 'Check a value inside the solution set: $x=-4$ gives $-3(-6) = 18$, and $18 \\ge 15$ is true.',
                },
                {
                  text: 'Check a value outside: $x=0$ gives $-3(-2) = 6$, and $6 \\ge 15$ is false.',
                },
              ],
              answer: '$x \\le -3$, or $x \\in (-\\infty,-3]$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Forgetting to reverse the inequality after dividing by a negative number.',
              correction:
                'Dividing $-3x \\ge 9$ by $-3$ gives $x \\le -3$, not $x \\ge -3$. Test a value such as $x=-4$ to confirm the direction.',
            },
            {
              mistake: 'Distributing a negative over only the first term: writing $-3(x-2) = -3x-6$.',
              correction:
                'Multiply both terms: $-3(x-2) = -3x+6$. The product of two negatives is positive.',
            },
            {
              mistake: 'Using a square bracket next to infinity, as in $[2,\\infty]$.',
              correction:
                'Infinity is not a number, so it is never included. Write $[2,\\infty)$.',
            },
          ],
          exercises: [
            {
              id: 'g8-linear-ineq-ex-1',
              type: 'multiple-choice',
              prompt: 'Solve $4x+9=33$.',
              options: ['5', '6', '7', '10'],
              correctOption: 1,
              hint: 'Subtract 9, then divide by 4.',
              explanation:
                '$4x = 33-9 = 24$, so $x = 24 \\div 4 = 6$. Check: $4(6)+9 = 33$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-linear-ineq-ex-2',
              type: 'multiple-choice',
              prompt: 'Solve $6(x-2)=3x+3$.',
              options: ['3', '5', '7', '9'],
              correctOption: 1,
              hint: 'Expand the bracket first, then collect the variable terms.',
              explanation:
                '$6x-12 = 3x+3$, so $3x = 15$ and $x = 5$. Check: $6(3) = 18$ and $3(5)+3 = 18$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-ineq-ex-3',
              type: 'numeric',
              prompt: 'Solve $2(3x-1)=5x+8$.',
              answer: 10,
              tolerance: 0,
              hint: 'Distribute the 2, then subtract $5x$ from both sides.',
              explanation:
                '$6x-2 = 5x+8$, so $x = 10$. Check: $2(29) = 58$ and $5(10)+8 = 58$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-ineq-ex-4',
              type: 'numeric',
              prompt: 'Solve $-4x+7>19$. What is the greatest integer value of $x$?',
              answer: -4,
              tolerance: 0,
              hint: 'Divide by a negative number and reverse the inequality.',
              explanation:
                '$-4x > 12$, so $x < -3$ after reversing the sign. The greatest integer strictly less than $-3$ is $-4$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-ineq-ex-5',
              type: 'multiple-choice',
              prompt: 'Which interval represents $x \\ge -2$?',
              options: [
                String.raw`(-2,\infty)`,
                String.raw`[-2,\infty)`,
                String.raw`(-\infty,-2]`,
                String.raw`[-2,\infty]`,
              ],
              correctOption: 1,
              hint: 'The endpoint is included, and the values continue upward.',
              explanation:
                'The square bracket includes $-2$, and the interval continues to positive infinity, so it is $[-2,\\infty)$. Infinity always takes a parenthesis.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-ineq-ex-6',
              type: 'multiple-choice',
              prompt: 'Which equation has no solution?',
              options: [
                String.raw`2x=4`,
                String.raw`x+3=x+5`,
                String.raw`2(x+1)=2x+2`,
                String.raw`3x=0`,
              ],
              correctOption: 1,
              hint: 'Subtract $x$ from both sides and compare the constants.',
              explanation:
                '$x+3=x+5$ simplifies to $3=5$, which is false for every $x$, so there is no solution. The equation $2(x+1)=2x+2$ is an identity and is true for every $x$.',
              difficulty: 'hard',
            },
          ],
          related: ['linear-equations-one-variable', 'algebraic-expressions', 'linear-functions', 'polynomials-intro'],
        },
        {
          id: 'polynomials-intro',
          title: 'Introduction to Polynomials',
          subtitle: 'Degree, like terms, expansion, and the special product identities.',
          introduction:
            'A polynomial is a sum of terms of the form $ax^n$ with whole-number exponents. Grade 8 introduces their structure — degree, coefficients and like terms — and the expansion rules that make them predictable.',
          prerequisites: [
            'algebraic-expressions',
            'exponents-and-powers',
            'linear-equations-and-inequalities',
          ],
          keyIdeas: [
            'The degree is the largest exponent of the variable.',
            'Only like terms, with the same variable and exponent, can be combined.',
            'Multiplying polynomials uses the distributive law term by term.',
            'The identities $(a\\pm b)^2$ and $(a+b)(a-b)$ shorten common expansions.',
          ],
          aliases: ['expanding brackets', 'degree of a polynomial', 'special products', 'binomial expansion', 'like terms'],
          theory: [
            {
              title: 'Terms, coefficients and degree',
              body: [
                'Each part of a polynomial separated by $+$ or $-$ is a term. In $4x^3-2x^2+7x-5$, the terms are $4x^3$, $-2x^2$, $7x$ and $-5$; the coefficients are $4$, $-2$, $7$ and $-5$. The degree is the largest exponent, here $3$, and the leading coefficient is $4$.',
                'A non-zero constant has degree $0$. The zero polynomial is usually treated separately because it has no non-zero term and therefore no defined degree.',
              ],
            },
            {
              title: 'Adding, subtracting and multiplying',
              body: [
                'Add or subtract polynomials by combining like terms: terms with the same variable and the same exponent. $3x^2+2x$ cannot be combined because $x^2$ and $x$ are not like terms.',
                'To multiply, distribute every term of the first polynomial to every term of the second. For two binomials, $(a+b)(c+d)=ac+ad+bc+bd$. A table or grid keeps the four products organised.',
                'The degree of a product is the sum of the degrees: a degree-$2$ polynomial multiplied by a degree-$3$ polynomial gives a degree-$5$ polynomial.',
              ],
            },
            {
              title: 'Special products',
              body: [
                'The identities $(a+b)^2=a^2+2ab+b^2$, $(a-b)^2=a^2-2ab+b^2$ and $(a+b)(a-b)=a^2-b^2$ save time, but only when the expression really matches the pattern.',
                'The middle term in a binomial square comes from multiplying the two different terms in both orders: $ab+ba=2ab$. Omitting it is the most common expansion error.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-polynomials-like-terms',
              title: 'Combining like terms',
              expression: String.raw`ax^n + bx^n = (a+b)x^n`,
              description: 'Like terms have the same variable and exponent, so their coefficients add.',
              spoken: 'a x to the n plus b x to the n equals a plus b, times x to the n.',
              variables: [
                { symbol: 'a', name: 'first coefficient' },
                { symbol: 'b', name: 'second coefficient' },
                { symbol: 'x', name: 'variable' },
                { symbol: 'n', name: 'whole-number exponent', note: 'must be a non-negative integer' },
              ],
              conditions: ['The terms must have exactly the same variable part, including the same exponent.'],
              notes: 'For example, $5x^2-2x^2=3x^2$, but $5x^2-2x$ cannot be simplified.',
              tags: ['like terms', 'combine terms', 'polynomial', 'coefficients'],
            },
            {
              id: 'g8-polynomials-monomial-product',
              title: 'Product of monomials',
              expression: String.raw`(a x^m)(b x^n) = ab\,x^{m+n}`,
              description: 'Multiply the coefficients and add the exponents of the same base.',
              spoken: 'a x to the m times b x to the n equals a b x to the m plus n.',
              variables: [
                { symbol: 'a', name: 'first coefficient' },
                { symbol: 'b', name: 'second coefficient' },
                { symbol: 'x', name: 'base variable', note: 'non-zero when an exponent is negative' },
                { symbol: 'm', name: 'first exponent' },
                { symbol: 'n', name: 'second exponent' },
              ],
              conditions: ['Exponents in a polynomial are non-negative integers.', 'The base must be non-zero if negative or zero exponents are used.'],
              notes: 'Example: $(3x^2)(4x^5)=12x^7$. Exponents add; they do not multiply.',
              tags: ['monomial product', 'add exponents', 'multiply terms', 'polynomial multiplication'],
            },
            {
              id: 'g8-polynomials-binomial-square',
              title: 'Square of a binomial',
              expression: String.raw`(a \pm b)^2 = a^2 \pm 2ab + b^2`,
              description: 'The square of a sum or difference includes twice the product of the two terms.',
              spoken: 'a plus or minus b, all squared, equals a squared plus or minus two a b plus b squared.',
              variables: [
                { symbol: 'a', name: 'first term' },
                { symbol: 'b', name: 'second term' },
              ],
              conditions: ['The same sign applies to the middle term and the bracket.'],
              notes: 'The result is a perfect-square trinomial. For example, $(2x+3)^2=4x^2+12x+9$.',
              tags: ['perfect square', 'binomial square', 'special product', 'expansion identity'],
            },
            {
              id: 'g8-polynomials-difference-squares',
              title: 'Difference of squares',
              expression: String.raw`(a+b)(a-b) = a^2 - b^2`,
              description: 'The product of a sum and a difference collapses to the difference of two squares.',
              spoken: 'a plus b times a minus b equals a squared minus b squared.',
              variables: [
                { symbol: 'a', name: 'first term' },
                { symbol: 'b', name: 'second term' },
              ],
              conditions: ['The two brackets must differ only in the sign of the second term.'],
              notes: 'The middle terms cancel. For example, $(3x+4)(3x-4)=9x^2-16$.',
              tags: ['difference of squares', 'special product', 'conjugate', 'expansion identity'],
            },
          ],
          examples: [
            {
              title: 'Expanding a product of two binomials',
              problem: 'Expand and simplify $(3x-2)(x+5)$.',
              given: ['First binomial: $3x-2$.', 'Second binomial: $x+5$.'],
              steps: [
                {
                  text: 'Distribute $3x$ across the second bracket.',
                  math: String.raw`3x(x+5) = 3x^2 + 15x`,
                },
                {
                  text: 'Distribute $-2$ across the same bracket.',
                  math: String.raw`-2(x+5) = -2x - 10`,
                },
                {
                  text: 'Add the two partial products.',
                  math: String.raw`(3x^2 + 15x) + (-2x - 10)`,
                },
                {
                  text: 'Combine the like $x$ terms: $15x-2x=13x$.',
                  math: String.raw`3x^2 + 13x - 10`,
                },
                {
                  text: 'Check by substituting $x=1$ into the original expression.',
                  math: String.raw`(3-2)(1+5) = 1 \times 6 = 6`,
                },
                {
                  text: 'Substitute $x=1$ into the expanded answer.',
                  math: String.raw`3(1)^2 + 13(1) - 10 = 3 + 13 - 10 = 6`,
                },
              ],
              answer: '$(3x-2)(x+5) = 3x^2+13x-10$.',
            },
            {
              title: 'Using the square of a binomial',
              problem: 'Expand $(2x+5)^2$.',
              given: ['The expression is a binomial square with $a=2x$ and $b=5$.', 'Use $(a+b)^2=a^2+2ab+b^2$.'],
              steps: [
                {
                  text: 'Match the expression to the identity.',
                  math: String.raw`(2x+5)^2 = (a+b)^2 \quad \text{with } a=2x,\ b=5`,
                },
                {
                  text: 'Apply the identity term by term.',
                  math: String.raw`= (2x)^2 + 2(2x)(5) + 5^2`,
                },
                {
                  text: 'Square each part and simplify the middle term.',
                  math: String.raw`= 4x^2 + 20x + 25`,
                },
                {
                  text: 'Check with $x=2$ in the original expression.',
                  math: String.raw`(4+5)^2 = 9^2 = 81`,
                },
                {
                  text: 'Check with $x=2$ in the expanded answer.',
                  math: String.raw`4(2)^2 + 20(2) + 25 = 16 + 40 + 25 = 81`,
                },
              ],
              answer: '$(2x+5)^2 = 4x^2+20x+25$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Writing $(a+b)^2=a^2+b^2$.',
              correction:
                'The middle term $2ab$ is missing. For example, $(x+3)^2=x^2+6x+9$, not $x^2+9$.',
            },
            {
              mistake: 'Multiplying powers by multiplying the exponents: $x^2 \\cdot x^3 = x^6$.',
              correction:
                'When multiplying powers with the same base, add the exponents: $x^2 \\cdot x^3 = x^5$.',
            },
            {
              mistake: 'Subtracting polynomials without changing every sign in the second bracket.',
              correction:
                '$(3x^2+2x)-(x^2+5x) = 3x^2+2x-x^2-5x = 2x^2-3x$. The minus sign applies to both terms.',
            },
          ],
          exercises: [
            {
              id: 'g8-polynomials-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the degree of $5x^4-3x^2+8$?',
              options: ['2', '3', '4', '8'],
              correctOption: 2,
              hint: 'The degree is the largest exponent, not the largest coefficient.',
              explanation:
                'The term with the largest exponent is $5x^4$, so the degree is $4$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-polynomials-ex-2',
              type: 'multiple-choice',
              prompt: 'Expand $(x+7)(x-7)$.',
              options: [
                String.raw`x^2+49`,
                String.raw`x^2-49`,
                String.raw`x^2-14x+49`,
                String.raw`x^2+14x-49`,
              ],
              correctOption: 1,
              hint: 'This is a difference of squares.',
              explanation:
                '$(x+7)(x-7)=x^2-7x+7x-49=x^2-49$. The middle terms cancel.',
              difficulty: 'medium',
            },
            {
              id: 'g8-polynomials-ex-3',
              type: 'multiple-choice',
              prompt: 'Simplify $(2x^2+3x-1)+(x^2-5x+4)$.',
              options: [
                String.raw`3x^2-2x+3`,
                String.raw`3x^2+8x+3`,
                String.raw`3x^2-2x-5`,
                String.raw`3x^2-8x+3`,
              ],
              correctOption: 0,
              hint: 'Combine only terms with the same exponent.',
              explanation:
                'The $x^2$ terms give $3x^2$, the $x$ terms give $3x-5x=-2x$, and the constants give $-1+4=3$. The result is $3x^2-2x+3$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-polynomials-ex-4',
              type: 'numeric',
              prompt: 'In the expansion of $(2x+3)(x+4)$, what is the coefficient of $x$?',
              answer: 11,
              tolerance: 0,
              hint: 'The $x$ terms come from $2x \\cdot 4$ and $3 \\cdot x$.',
              explanation:
                '$(2x+3)(x+4)=2x^2+8x+3x+12=2x^2+11x+12$, so the coefficient of $x$ is $11$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-polynomials-ex-5',
              type: 'numeric',
              prompt: 'Evaluate $3x^2-2x+1$ when $x=-2$.',
              answer: 17,
              tolerance: 0,
              hint: 'Square $-2$ before multiplying by 3.',
              explanation:
                '$3(-2)^2-2(-2)+1 = 3(4)+4+1 = 12+4+1 = 17$.',
              difficulty: 'hard',
            },
            {
              id: 'g8-polynomials-ex-6',
              type: 'multiple-choice',
              prompt: 'Expand $(3x-4)^2$.',
              options: [
                String.raw`9x^2-16`,
                String.raw`9x^2+24x+16`,
                String.raw`9x^2-24x+16`,
                String.raw`9x^2-12x+16`,
              ],
              correctOption: 2,
              hint: 'The middle term is $2 \\cdot 3x \\cdot (-4)$.',
              explanation:
                '$(3x-4)^2=(3x)^2-2(3x)(4)+4^2=9x^2-24x+16$.',
              difficulty: 'hard',
            },
          ],
          related: ['algebraic-expressions', 'exponents-and-powers', 'factorization-common-factors', 'quadratic-equations-intro'],
        },
        {
          id: 'factorization-common-factors',
          title: 'Factorization: Common Factors and Patterns',
          subtitle: 'Greatest common factors, difference of squares, and monic trinomials.',
          introduction:
            'Factorization rewrites a sum as a product. It undoes expansion and turns complicated expressions into pieces that reveal structure — especially common factors, differences of squares and simple trinomials.',
          prerequisites: [
            'polynomials-intro',
            'exponents-and-powers',
            'Multiplication facts and prime factorization',
          ],
          keyIdeas: [
            'Factorizing is the reverse of expanding, so every result can be checked by multiplying out.',
            'Always remove the greatest common factor first.',
            'A difference of squares factors as $(a-b)(a+b)$; a sum of squares does not factor over the integers.',
            'For $x^2+bx+c$, find two integers whose sum is $b$ and whose product is $c$.',
          ],
          aliases: ['factorising', 'greatest common factor', 'GCF', 'difference of squares', 'trinomial factorization'],
          theory: [
            {
              title: 'Take out the greatest common factor',
              body: [
                'The greatest common factor (GCF) of a polynomial is the largest factor shared by every term. For the coefficients, take the greatest common divisor; for each variable, take the lowest power present. Then divide each term by the GCF and write the result in brackets.',
                'For $12x^3+18x^2$, the GCF is $6x^2$, so $12x^3+18x^2=6x^2(2x+3)$. Always expand mentally to check that the product returns the original expression.',
              ],
            },
            {
              title: 'Difference of squares',
              body: [
                'A difference of two squares has the form $a^2-b^2$ and factors as $(a-b)(a+b)$. The pattern requires subtraction; $a^2+b^2$ does not factor over the integers.',
                'Recognise the square parts: $4x^2-9=(2x)^2-3^2=(2x-3)(2x+3)$. If a common factor appears first, remove it before applying the pattern, as in $3x^2-27=3(x^2-9)=3(x-3)(x+3)$.',
              ],
            },
            {
              title: 'Monic trinomials',
              body: [
                'For $x^2+bx+c$, look for two integers $p$ and $q$ with $p+q=b$ and $pq=c$. Then $x^2+bx+c=(x+p)(x+q)$.',
                'Signs guide the search. If $c>0$, $p$ and $q$ have the same sign (both negative when $b<0$). If $c<0$, they have opposite signs, and the factor with the larger absolute value takes the sign of $b$.',
                'For example, $x^2-7x+12$ needs a sum of $-7$ and a product of $12$: the numbers are $-3$ and $-4$. Hence $x^2-7x+12=(x-3)(x-4)$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-factorization-gcf',
              title: 'Common-factor factorization',
              expression: String.raw`ab + ac = a(b+c)`,
              description: 'If every term shares a factor, take it out and divide each term by it.',
              spoken: 'a b plus a c equals a times b plus c.',
              variables: [
                { symbol: 'a', name: 'common factor', note: 'non-zero' },
                { symbol: 'b', name: 'first quotient term' },
                { symbol: 'c', name: 'second quotient term' },
              ],
              conditions: ['The factor $a$ must divide every term exactly.', 'Take the greatest common factor, including the lowest power of each variable.'],
              notes: 'Example: $12x^3+18x^2=6x^2(2x+3)$. Check by expanding.',
              tags: ['greatest common factor', 'GCF', 'factor out', 'distributive law'],
            },
            {
              id: 'g8-factorization-difference-squares',
              title: 'Difference of squares',
              expression: String.raw`a^2 - b^2 = (a-b)(a+b)`,
              description: 'A difference of two perfect squares factors into a difference and a sum.',
              spoken: 'a squared minus b squared equals a minus b, times a plus b.',
              variables: [
                { symbol: 'a', name: 'square root of the first square' },
                { symbol: 'b', name: 'square root of the second square' },
              ],
              conditions: ['The expression must be a difference, not a sum.', 'Both terms must be perfect squares in the given number system.'],
              notes: 'Example: $4x^2-9=(2x-3)(2x+3)$. A sum $a^2+b^2$ does not factor over the integers.',
              tags: ['difference of squares', 'factorize', 'conjugate pair', 'perfect squares'],
            },
            {
              id: 'g8-factorization-monic-trinomial',
              title: 'Factorizing a monic trinomial',
              expression: String.raw`x^2 + (p+q)x + pq = (x+p)(x+q)`,
              description: 'Find two numbers whose sum is the coefficient of $x$ and whose product is the constant.',
              spoken: 'x squared plus p plus q times x plus p q equals x plus p, times x plus q.',
              variables: [
                { symbol: 'x', name: 'variable' },
                { symbol: 'p', name: 'first constant', note: 'an integer' },
                { symbol: 'q', name: 'second constant', note: 'an integer' },
              ],
              conditions: ['The coefficient of $x^2$ is $1$. For other leading coefficients, a different method is needed.'],
              notes: 'For $x^2-7x+12$, $p=-3$ and $q=-4$. Check by expanding the brackets.',
              tags: ['monic trinomial', 'factorize trinomial', 'sum and product', 'quadratic factorization'],
            },
          ],
          examples: [
            {
              title: 'Factoring a difference of squares after a GCF',
              problem: 'Factor $3x^2-27$ completely.',
              given: ['Both terms share the factor $3$.', '$x^2-9$ is a difference of squares.'],
              steps: [
                {
                  text: 'Take out the common factor $3$.',
                  math: String.raw`3x^2-27 = 3(x^2-9)`,
                },
                {
                  text: 'Recognise $x^2-9$ as a difference of squares.',
                  math: String.raw`x^2-9 = x^2-3^2`,
                },
                {
                  text: 'Apply $a^2-b^2=(a-b)(a+b)$.',
                  math: String.raw`x^2-3^2 = (x-3)(x+3)`,
                },
                {
                  text: 'Combine the factors.',
                  math: String.raw`3x^2-27 = 3(x-3)(x+3)`,
                },
                {
                  text: 'Check by expanding the brackets.',
                  math: String.raw`3(x-3)(x+3) = 3(x^2-9) = 3x^2-27`,
                },
              ],
              answer: '$3x^2-27 = 3(x-3)(x+3)$.',
            },
            {
              title: 'Factorizing a monic trinomial',
              problem: 'Factor $x^2-7x+12$.',
              given: ['The coefficient of $x^2$ is $1$.', 'We need two integers with sum $-7$ and product $12$.'],
              steps: [
                {
                  text: 'Identify the target sum and product.',
                  math: String.raw`p+q=-7, \qquad pq=12`,
                },
                {
                  text: 'List factor pairs of $12$ with the correct sign pattern. Both factors must be negative because the product is positive and the sum is negative.',
                  math: String.raw`(-1)(-12),\ (-2)(-6),\ (-3)(-4)`,
                },
                {
                  text: 'Choose the pair whose sum is $-7$.',
                  math: String.raw`-3 + (-4) = -7`,
                },
                {
                  text: 'Write the factorization.',
                  math: String.raw`x^2-7x+12 = (x-3)(x-4)`,
                },
                {
                  text: 'Check by expanding.',
                  math: String.raw`(x-3)(x-4) = x^2-4x-3x+12 = x^2-7x+12`,
                },
                {
                  text: 'Check numerically with $x=5$: the original is $25-35+12=2$, and the factors give $(2)(1)=2$.',
                },
              ],
              answer: '$x^2-7x+12 = (x-3)(x-4)$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Stopping at $3(x^2-9)$ and calling the factorization complete.',
              correction:
                'A difference of squares remains inside the bracket. Continue to $3(x-3)(x+3)$ unless the instructions ask only for a common factor.',
            },
            {
              mistake: 'Factorizing $x^2+9$ as $(x+3)(x+3)$ or $(x+3)^2$.',
              correction:
                '$(x+3)^2=x^2+6x+9$, not $x^2+9$. A sum of squares does not factor over the integers.',
            },
            {
              mistake: 'Choosing factors with the wrong signs for $x^2+2x-15$.',
              correction:
                'The product is negative, so the factors have opposite signs. The pair $+5$ and $-3$ gives sum $2$: $(x+5)(x-3)$.',
            },
          ],
          exercises: [
            {
              id: 'g8-factorization-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the greatest common factor of $8x^4+12x^2$?',
              options: [
                String.raw`2x^2`,
                String.raw`4x^2`,
                String.raw`4x^4`,
                String.raw`8x^2`,
              ],
              correctOption: 1,
              hint: 'Take the GCF of 8 and 12, then the lower power of $x$.',
              explanation:
                'The GCF of $8$ and $12$ is $4$, and the lower power of $x$ is $x^2$. Hence the GCF is $4x^2$, and $8x^4+12x^2=4x^2(2x^2+3)$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-factorization-ex-2',
              type: 'multiple-choice',
              prompt: 'Factor $4x^2-25$.',
              options: [
                String.raw`(2x-5)^2`,
                String.raw`(2x-5)(2x+5)`,
                String.raw`(4x-5)(x+5)`,
                String.raw`(2x-25)(2x+1)`,
              ],
              correctOption: 1,
              hint: 'Write both terms as squares.',
              explanation:
                '$4x^2-25=(2x)^2-5^2=(2x-5)(2x+5)$. Expanding returns $4x^2-25$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-factorization-ex-3',
              type: 'multiple-choice',
              prompt: 'Factor $x^2+2x-15$.',
              options: [
                String.raw`(x-5)(x+3)`,
                String.raw`(x+5)(x-3)`,
                String.raw`(x+15)(x-1)`,
                String.raw`(x-15)(x+1)`,
              ],
              correctOption: 1,
              hint: 'The product is negative, so the constants have opposite signs.',
              explanation:
                'The numbers $5$ and $-3$ have sum $2$ and product $-15$, so $x^2+2x-15=(x+5)(x-3)$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-factorization-ex-4',
              type: 'numeric',
              prompt: 'In the factorization $x^2+9x+20=(x+p)(x+q)$ with $p<q$, what is $q$?',
              answer: 5,
              tolerance: 0,
              hint: 'Find two positive integers with sum 9 and product 20.',
              explanation:
                'The integers $4$ and $5$ have sum $9$ and product $20$, so $p=4$ and $q=5$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-factorization-ex-5',
              type: 'numeric',
              prompt: 'Find $k$ such that $x^2+kx+24=(x+3)(x+8)$.',
              answer: 11,
              tolerance: 0,
              hint: 'Expand the right-hand side and compare coefficients.',
              explanation:
                '$(x+3)(x+8)=x^2+11x+24$, so $k=11$.',
              difficulty: 'hard',
            },
            {
              id: 'g8-factorization-ex-6',
              type: 'multiple-choice',
              prompt: 'Factor $5x^2-20$ completely.',
              options: [
                String.raw`5(x^2-4)`,
                String.raw`(5x-10)(x+2)`,
                String.raw`5(x-2)(x+2)`,
                String.raw`(5x-4)(x+5)`,
              ],
              correctOption: 2,
              hint: 'Remove the common factor first, then factor the difference of squares.',
              explanation:
                '$5x^2-20=5(x^2-4)=5(x-2)(x+2)$. The option $5(x^2-4)$ is not complete because $x^2-4$ still factors.',
              difficulty: 'hard',
            },
          ],
          related: ['polynomials-intro', 'algebraic-expressions', 'quadratic-equations-intro', 'polynomial-factorization'],
        },
        {
          id: 'linear-functions',
          title: 'Linear Functions',
          subtitle: 'Function notation, gradient, intercepts, and straight-line graphs.',
          introduction:
            'A linear function pairs every input with exactly one output and graphs as a straight line. Its constant rate of change — the gradient or slope — is the key to reading, writing and applying linear models.',
          prerequisites: [
            'patterns-and-sequences',
            'linear-equations-and-inequalities',
            'algebraic-expressions',
          ],
          keyIdeas: [
            'Function notation $f(x)$ names the output for input $x$; it does not mean multiplication.',
            'The gradient is the change in $y$ divided by the change in $x$.',
            'The form $y=mx+b$ displays the gradient $m$ and the $y$-intercept $b$.',
            'A gradient has units and must be interpreted in context.',
          ],
          aliases: ['slope', 'gradient', 'function notation', 'y-intercept', 'straight-line graph'],
          theory: [
            {
              title: 'Function notation',
              body: [
                'A function is a rule that assigns one output to each allowed input. The notation $f(x)$ means “the output of function $f$ at input $x$”; it does not mean $f$ times $x$. If $f(x)=2x-3$, then $f(4)=2(4)-3=5$.',
                'The set of allowed inputs is the domain; the set of outputs is the range. For a linear function with non-zero gradient, both are usually all real numbers unless the context restricts them.',
              ],
            },
            {
              title: 'Gradient',
              body: [
                'The gradient measures vertical change per unit of horizontal change: $m=\\frac{y_2-y_1}{x_2-x_1}$. It is the same between any two points on a straight line. A positive gradient rises from left to right, a negative gradient falls, a zero gradient is horizontal, and a vertical line has an undefined gradient.',
                'Units matter in applications. If $C(d)=2.5d+4$ gives cost in dollars for $d$ kilometres, the gradient $2.5$ means dollars per kilometre, not just the number $2.5$.',
              ],
            },
            {
              title: 'Graphing and intercepts',
              body: [
                'The form $y=mx+b$ shows the gradient $m$ and the $y$-intercept $b$. Plot $(0,b)$, then use the gradient as rise over run to find a second point.',
                'The $x$-intercept occurs where $y=0$: solve $0=mx+b$ to get $x=-\\frac{b}{m}$ when $m\\ne0$. Intercepts are useful for checking graphs and for interpreting when a quantity reaches zero.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-linear-functions-slope',
              title: 'Gradient from two points',
              expression: String.raw`m = \frac{y_2-y_1}{x_2-x_1}`,
              description: 'The gradient is the change in $y$ divided by the change in $x$ between two points.',
              spoken: 'm equals y two minus y one, divided by x two minus x one.',
              variables: [
                { symbol: 'm', name: 'gradient or slope' },
                { symbol: 'x_1,\ y_1', name: 'coordinates of the first point' },
                { symbol: 'x_2,\ y_2', name: 'coordinates of the second point' },
              ],
              conditions: ['$x_1 \\ne x_2$; a vertical line has an undefined gradient.'],
              notes: 'Rise over run. The gradient is constant along a straight line, so any two distinct points give the same value.',
              tags: ['gradient', 'slope', 'rise over run', 'rate of change'],
            },
            {
              id: 'g8-linear-functions-slope-intercept',
              title: 'Gradient-intercept form',
              expression: String.raw`y = mx + b`,
              description: 'A straight line with gradient $m$ and $y$-intercept $b$.',
              spoken: 'y equals m x plus b, where m is the gradient and b is the y-intercept.',
              variables: [
                { symbol: 'y', name: 'dependent variable', note: 'output value' },
                { symbol: 'x', name: 'independent variable', note: 'input value' },
                { symbol: 'm', name: 'gradient', note: 'constant rate of change' },
                { symbol: 'b', name: 'y-intercept', note: 'the value of $y$ when $x=0$' },
              ],
              conditions: ['The relation is a function and its graph is a non-vertical straight line.'],
              notes: 'To graph, plot $(0,b)$ and move according to $m=\\frac{\\text{rise}}{\\text{run}}$.',
              tags: ['slope-intercept form', 'linear function', 'y-intercept', 'gradient'],
            },
            {
              id: 'g8-linear-functions-x-intercept',
              title: 'x-intercept of a line',
              expression: String.raw`x_0 = -\frac{b}{m}`,
              description: 'The $x$-intercept is found by setting $y=0$ in $y=mx+b$.',
              spoken: 'x zero equals negative b over m.',
              variables: [
                { symbol: 'x_0', name: 'x-intercept', note: 'the input where the output is zero' },
                { symbol: 'm', name: 'gradient', note: 'must be non-zero' },
                { symbol: 'b', name: 'y-intercept' },
              ],
              conditions: ['$m \\ne 0$; a horizontal line $y=b$ has no $x$-intercept unless $b=0$.'],
              notes: 'Example: $y=2x-6$ has $x$-intercept $x_0=-\\frac{-6}{2}=3$.',
              tags: ['x-intercept', 'zero of a function', 'linear equation', 'graph intercept'],
            },
          ],
          examples: [
            {
              title: 'Finding a linear rule from two points',
              problem: 'Find the rule of the linear function passing through $(2,5)$ and $(6,13)$.',
              given: ['First point: $(x_1,y_1)=(2,5)$.', 'Second point: $(x_2,y_2)=(6,13)$.'],
              steps: [
                {
                  text: 'Identify the coordinates of the two points.',
                  math: String.raw`(x_1,y_1)=(2,5), \qquad (x_2,y_2)=(6,13)`,
                },
                {
                  text: 'Compute the gradient.',
                  math: String.raw`m = \frac{13-5}{6-2} = \frac{8}{4} = 2`,
                },
                {
                  text: 'Substitute the gradient and one point into $y=mx+b$.',
                  math: String.raw`5 = 2(2) + b`,
                },
                {
                  text: 'Solve for the $y$-intercept.',
                  math: String.raw`5 = 4 + b \implies b = 1`,
                },
                {
                  text: 'Write the function.',
                  math: String.raw`f(x) = 2x + 1`,
                },
                {
                  text: 'Check the second point: $f(6)=2(6)+1=13$, which matches.',
                },
              ],
              answer: '$f(x)=2x+1$. The gradient is $2$ and the $y$-intercept is $1$.',
            },
            {
              title: 'Interpreting gradient and intercept in context',
              problem:
                'A taxi fare is $C(d)=2.5d+4$, where $d$ is the distance in kilometres and $C$ is the cost in dollars. Find the fare for $10$ km and interpret the gradient and intercept.',
              given: ['Cost function: $C(d)=2.5d+4$.', 'Distance: $d=10$ km.'],
              steps: [
                {
                  text: 'Substitute $d=10$ into the function.',
                  math: String.raw`C(10) = 2.5(10) + 4`,
                },
                {
                  text: 'Multiply.',
                  math: String.raw`= 25 + 4`,
                },
                {
                  text: 'Add.',
                  math: String.raw`= 29`,
                },
                {
                  text: 'Interpret the gradient: each additional kilometre adds $\\$2.50$ to the fare.',
                },
                {
                  text: 'Interpret the intercept: the base charge is $\\$4$, even before any distance is travelled.',
                },
              ],
              answer: 'The fare for $10$ km is $\\$29$. The gradient is $\\$2.50$ per km, and the intercept is a $\\$4$ base charge.',
            },
          ],
          mistakes: [
            {
              mistake: 'Computing gradient as $\\frac{x_2-x_1}{y_2-y_1}$.',
              correction:
                'Gradient is vertical change divided by horizontal change: $\\frac{y_2-y_1}{x_2-x_1}$. Reversing it gives the reciprocal, not the gradient.',
            },
            {
              mistake: 'Reading $f(x)$ as $f$ multiplied by $x$.',
              correction:
                '$f(x)$ is function notation for the output at input $x$. If $f(x)=3x+1$, then $f(2)=7$, not $3\\cdot2\\cdot1$.',
            },
            {
              mistake: 'Confusing the $y$-intercept with the $x$-intercept.',
              correction:
                'The $y$-intercept is the value when $x=0$; the $x$-intercept is the value when $y=0$. In $y=3x-6$, the $y$-intercept is $-6$ and the $x$-intercept is $2$.',
            },
          ],
          exercises: [
            {
              id: 'g8-linear-functions-ex-1',
              type: 'multiple-choice',
              prompt: 'If $f(x)=3x-5$, what is $f(4)$?',
              options: ['2', '7', '12', '17'],
              correctOption: 1,
              hint: 'Substitute 4 for every $x$.',
              explanation: '$f(4)=3(4)-5=12-5=7$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-linear-functions-ex-2',
              type: 'multiple-choice',
              prompt: 'What is the gradient of the line through $(1,2)$ and $(4,11)$?',
              options: [String.raw`\frac{1}{3}`, '3', '9', String.raw`-3`],
              correctOption: 1,
              hint: 'Divide the change in $y$ by the change in $x$.',
              explanation:
                '$m=\\frac{11-2}{4-1}=\\frac{9}{3}=3$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-functions-ex-3',
              type: 'numeric',
              prompt: 'What is the $y$-intercept of the line $2x+3y=12$?',
              answer: 4,
              tolerance: 0,
              hint: 'Set $x=0$ and solve for $y$.',
              explanation:
                'Setting $x=0$ gives $3y=12$, so $y=4$. The $y$-intercept is $4$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-functions-ex-4',
              type: 'numeric',
              prompt: 'For $f(x)=-2x+9$, find $x$ when $f(x)=1$.',
              answer: 4,
              tolerance: 0,
              hint: 'Set $-2x+9$ equal to 1.',
              explanation:
                '$-2x+9=1$, so $-2x=-8$ and $x=4$. Check: $f(4)=-8+9=1$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-functions-ex-5',
              type: 'multiple-choice',
              prompt: 'Which equation describes the line with gradient $3$ and $y$-intercept $-2$?',
              options: [
                String.raw`y=3x+2`,
                String.raw`y=-3x-2`,
                String.raw`y=3x-2`,
                String.raw`y=2x-3`,
              ],
              correctOption: 2,
              hint: 'Substitute $m=3$ and $b=-2$ into $y=mx+b$.',
              explanation:
                '$y=mx+b$ becomes $y=3x-2$ when $m=3$ and $b=-2$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-linear-functions-ex-6',
              type: 'numeric',
              prompt: 'Find the gradient of the line through $(-2,7)$ and $(4,-5)$.',
              answer: -2,
              tolerance: 0,
              hint: 'Subtract carefully: $-5-7$ and $4-(-2)$.',
              explanation:
                '$m=\\frac{-5-7}{4-(-2)}=\\frac{-12}{6}=-2$. The line falls from left to right.',
              difficulty: 'hard',
            },
          ],
          related: ['patterns-and-sequences', 'linear-equations-and-inequalities', 'distance-midpoint-slope', 'functions-intro'],
        },
      ],
      theorems: [
        {
          title: 'Distributive law',
          statement: 'For all real numbers $a$, $b$ and $c$, $a(b+c)=ab+ac$.',
          note: 'This single identity underpins expanding brackets and collecting like terms.',
        },
        {
          title: 'Square of a binomial',
          statement: 'For all real numbers $a$ and $b$, $(a\\pm b)^2=a^2\\pm 2ab+b^2$.',
          note: 'The middle term is twice the product of the two terms; it is the most frequently omitted part.',
        },
        {
          title: 'Difference of squares',
          statement: 'For all real numbers $a$ and $b$, $(a+b)(a-b)=a^2-b^2$.',
          note: 'This identity is the basis for factorizing expressions such as $9x^2-16$.',
        },
      ],
    },
    {
      id: 'geometry',
      family: 'geometry',
      title: 'Geometry',
      description:
        'Reason about shape and space: the Pythagorean theorem, congruence through rigid motions, and the hierarchy of quadrilaterals. Measurement becomes argument, with every claim checked against a definition or a theorem.',
      topics: [
        {
          id: 'pythagorean-theorem',
          title: 'The Pythagorean Theorem',
          subtitle: 'Right triangles, missing sides, the converse, and applications.',
          introduction:
            'The Pythagorean theorem links the three sides of a right triangle. It converts two known sides into the third, and its converse lets you test whether an angle is right.',
          prerequisites: [
            'perimeter-and-area',
            'lines-angles-and-triangles',
            'square-and-cube-roots',
          ],
          keyIdeas: [
            'In a right triangle, the hypotenuse is the side opposite the right angle and is the longest side.',
            'The theorem states $a^2+b^2=c^2$, where $c$ is the hypotenuse.',
            'The converse detects a right angle from the side lengths alone.',
            'Whole-number triples such as $3,4,5$ and $5,12,13$ make exact checks easy.',
          ],
          aliases: ['Pythagoras', 'right triangle theorem', 'hypotenuse', 'converse of Pythagoras', 'Pythagorean triples'],
          theory: [
            {
              title: 'The theorem and its parts',
              body: [
                'In a right triangle, the side opposite the right angle is the hypotenuse, the longest side. The other two sides are the legs. The theorem states that the square on the hypotenuse equals the sum of the squares on the legs: $a^2+b^2=c^2$.',
                'The result is about areas: a square built on the hypotenuse has the same area as the two squares on the legs combined. The $3$–$4$–$5$ triangle is the smallest whole-number example: $9+16=25$.',
              ],
            },
            {
              title: 'Finding a missing side',
              body: [
                'If the hypotenuse is unknown, add the squares of the legs and take the square root: $c=\\sqrt{a^2+b^2}$. If a leg is unknown, subtract the other leg’s square from the hypotenuse’s square: $a=\\sqrt{c^2-b^2}$. The hypotenuse must be the longest side, so the radicand stays non-negative.',
                'Keep exact surds when possible and give a decimal approximation only at the end. For measurements, round sensibly and state the unit.',
              ],
            },
            {
              title: 'The converse and applications',
              body: [
                'The converse is also true: if the three sides of a triangle satisfy $a^2+b^2=c^2$, with $c$ the longest side, then the angle opposite $c$ is a right angle. This is how builders check a square corner using the $3$–$4$–$5$ rule.',
                'If $c^2<a^2+b^2$ the angle opposite $c$ is acute; if $c^2>a^2+b^2$ it is obtuse. For a rectangular box, the space diagonal is $d=\\sqrt{l^2+w^2+h^2}$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-pythagoras-main',
              title: 'Pythagorean theorem',
              expression: String.raw`a^2 + b^2 = c^2`,
              description: 'In a right triangle, the sum of the squares of the legs equals the square of the hypotenuse.',
              spoken: 'a squared plus b squared equals c squared, where c is the hypotenuse.',
              variables: [
                { symbol: 'a', name: 'first leg', note: 'a side forming the right angle' },
                { symbol: 'b', name: 'second leg', note: 'the other side forming the right angle' },
                { symbol: 'c', name: 'hypotenuse', note: 'the side opposite the right angle; always the longest side' },
              ],
              conditions: ['The triangle must be right-angled.', 'Use the same length unit for all three sides.'],
              notes: 'If the right angle is at $C$, then $c$ is the side $AB$ opposite $C$.',
              tags: ['Pythagoras', 'right triangle', 'hypotenuse', 'legs', 'a squared plus b squared'],
            },
            {
              id: 'g8-pythagoras-hypotenuse',
              title: 'Hypotenuse from two legs',
              expression: String.raw`c = \sqrt{a^2 + b^2}`,
              description: 'Add the squares of the legs, then take the principal square root.',
              spoken: 'c equals the square root of a squared plus b squared.',
              variables: [
                { symbol: 'a', name: 'first leg' },
                { symbol: 'b', name: 'second leg' },
                { symbol: 'c', name: 'hypotenuse' },
              ],
              conditions: ['The triangle is right-angled and $a,b>0$.', 'The result is positive, so use the principal square root.'],
              notes: 'Example: legs $9$ and $12$ give $c=\\sqrt{81+144}=\\sqrt{225}=15$.',
              tags: ['find hypotenuse', 'Pythagoras', 'square root', 'right triangle side'],
            },
            {
              id: 'g8-pythagoras-leg',
              title: 'Missing leg',
              expression: String.raw`a = \sqrt{c^2 - b^2}`,
              description: 'Subtract the known leg’s square from the hypotenuse’s square, then take the square root.',
              spoken: 'a equals the square root of c squared minus b squared.',
              variables: [
                { symbol: 'a', name: 'unknown leg' },
                { symbol: 'b', name: 'known leg' },
                { symbol: 'c', name: 'hypotenuse', note: 'must satisfy $c>b$' },
              ],
              conditions: ['$c>b>0$; the hypotenuse must be longer than either leg.', 'The triangle is right-angled.'],
              notes: 'A common error is adding instead of subtracting. The hypotenuse is already the longest side.',
              tags: ['missing leg', 'Pythagoras', 'hypotenuse', 'subtract squares'],
            },
            {
              id: 'g8-pythagoras-converse',
              title: 'Converse of the Pythagorean theorem',
              expression: String.raw`a^2 + b^2 = c^2 \implies \angle C = 90^{\circ}`,
              description: 'If the side lengths satisfy the Pythagorean relation, the angle opposite the longest side is right.',
              spoken: 'If a squared plus b squared equals c squared, then angle C is ninety degrees.',
              variables: [
                { symbol: 'a,\ b', name: 'shorter sides of the triangle' },
                { symbol: 'c', name: 'longest side', note: 'opposite angle $C$' },
                { symbol: 'C', name: 'angle opposite side c' },
              ],
              conditions: ['The three lengths must form a valid triangle.', '$c$ must be the longest side.'],
              notes: 'The converse is used to classify triangles: equal gives right, $c^2$ smaller gives acute, $c^2$ larger gives obtuse.',
              tags: ['converse Pythagoras', 'right angle test', 'classify triangle', '3-4-5 rule'],
            },
          ],
          examples: [
            {
              title: 'Finding the hypotenuse',
              problem: 'A right triangle has legs $9$ cm and $12$ cm. Find the hypotenuse.',
              given: ['Leg $a=9$ cm.', 'Leg $b=12$ cm.', 'The hypotenuse $c$ is unknown.'],
              steps: [
                {
                  text: 'Identify the known sides and the unknown.',
                  math: String.raw`a=9,\quad b=12,\quad c=?`,
                },
                {
                  text: 'Choose the hypotenuse form of the theorem.',
                  math: String.raw`c^2 = a^2 + b^2`,
                },
                {
                  text: 'Substitute the leg lengths.',
                  math: String.raw`c^2 = 9^2 + 12^2`,
                },
                {
                  text: 'Square each leg and add.',
                  math: String.raw`c^2 = 81 + 144 = 225`,
                },
                {
                  text: 'Take the positive square root.',
                  math: String.raw`c = \sqrt{225} = 15`,
                },
                {
                  text: 'Check: $9$–$12$–$15$ is $3$ times the $3$–$4$–$5$ triple, and $9^2+12^2=15^2$.',
                },
              ],
              answer: 'The hypotenuse is $15$ cm.',
            },
            {
              title: 'Finding a height with a ladder',
              problem:
                'A $12$ m ladder leans against a vertical wall with its foot $5$ m from the base of the wall. How high up the wall does the ladder reach?',
              given: ['Ladder length (hypotenuse) $c=12$ m.', 'Distance from the wall (one leg) $b=5$ m.', 'The height is the other leg $a$.'],
              steps: [
                {
                  text: 'Identify the hypotenuse: the ladder is opposite the right angle where the wall meets the ground.',
                  math: String.raw`c=12,\quad b=5,\quad a=?`,
                },
                {
                  text: 'Choose the missing-leg form of the theorem.',
                  math: String.raw`a = \sqrt{c^2 - b^2}`,
                },
                {
                  text: 'Substitute the known lengths.',
                  math: String.raw`a = \sqrt{12^2 - 5^2}`,
                },
                {
                  text: 'Square and subtract.',
                  math: String.raw`a = \sqrt{144 - 25} = \sqrt{119}`,
                },
                {
                  text: 'Evaluate and round to two decimal places.',
                  math: String.raw`a \approx 10.9087 \approx 10.91`,
                },
                {
                  text: 'Check: $5^2 + 10.91^2 \\approx 25 + 119.03 = 144.03 \\approx 12^2$.',
                },
              ],
              answer: 'The ladder reaches approximately $10.91$ m up the wall.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using $a^2+b^2=c^2$ on a triangle that is not right-angled.',
              correction:
                'The theorem requires a right angle. Use the converse to test a triangle first, or choose another method if no angle is $90^\\circ$.',
            },
            {
              mistake: 'Adding the squares when finding a leg.',
              correction:
                'If the hypotenuse is known, subtract: $a=\\sqrt{c^2-b^2}$. Adding would make the leg longer than the hypotenuse.',
            },
            {
              mistake: 'Forgetting to take the square root after adding or subtracting.',
              correction:
                'The theorem gives $c^2$, not $c$. Finish with a square root: $c^2=225$ means $c=15$.',
            },
          ],
          exercises: [
            {
              id: 'g8-pythagoras-ex-1',
              type: 'multiple-choice',
              prompt: 'A right triangle has legs $6$ cm and $8$ cm. What is the hypotenuse?',
              options: ['7 cm', '10 cm', '12 cm', '14 cm'],
              correctOption: 1,
              hint: 'This is a scaled $3$–$4$–$5$ triangle.',
              explanation:
                '$c=\\sqrt{6^2+8^2}=\\sqrt{36+64}=\\sqrt{100}=10$ cm.',
              difficulty: 'easy',
            },
            {
              id: 'g8-pythagoras-ex-2',
              type: 'multiple-choice',
              prompt: 'A right triangle has hypotenuse $13$ cm and one leg $5$ cm. What is the other leg?',
              options: ['8 cm', '12 cm', String.raw`\sqrt{194}` + ' cm', '18 cm'],
              correctOption: 1,
              hint: 'Subtract the known leg’s square from the hypotenuse’s square.',
              explanation:
                '$a=\\sqrt{13^2-5^2}=\\sqrt{169-25}=\\sqrt{144}=12$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g8-pythagoras-ex-3',
              type: 'numeric',
              prompt: 'A rectangle measures $9$ m by $12$ m. What is the length of its diagonal in metres?',
              answer: 15,
              tolerance: 0,
              answerUnit: 'm',
              hint: 'The diagonal is the hypotenuse of a right triangle with legs 9 and 12.',
              explanation:
                '$d=\\sqrt{9^2+12^2}=\\sqrt{81+144}=\\sqrt{225}=15$ m.',
              difficulty: 'medium',
            },
            {
              id: 'g8-pythagoras-ex-4',
              type: 'numeric',
              prompt:
                'A $17$ m ladder leans against a wall with its foot $8$ m from the wall. How far up the wall does it reach, in metres?',
              answer: 15,
              tolerance: 0,
              answerUnit: 'm',
              hint: 'The ladder is the hypotenuse; subtract the base square.',
              explanation:
                '$h=\\sqrt{17^2-8^2}=\\sqrt{289-64}=\\sqrt{225}=15$ m.',
              difficulty: 'medium',
            },
            {
              id: 'g8-pythagoras-ex-5',
              type: 'multiple-choice',
              prompt: 'Which set of side lengths forms a right triangle?',
              options: ['5, 6, 8', '7, 9, 11', '8, 15, 17', '4, 5, 7'],
              correctOption: 2,
              hint: 'Square the two shorter sides and compare with the square of the longest.',
              explanation:
                'For $8,15,17$: $8^2+15^2=64+225=289=17^2$, so the converse guarantees a right angle. The other sets fail the test.',
              difficulty: 'hard',
            },
            {
              id: 'g8-pythagoras-ex-6',
              type: 'numeric',
              prompt: 'A rectangular box measures $3$ cm by $4$ cm by $12$ cm. What is the length of its space diagonal in centimetres?',
              answer: 13,
              tolerance: 0,
              answerUnit: 'cm',
              hint: 'Apply Pythagoras twice, or use $d=\\sqrt{l^2+w^2+h^2}$.',
              explanation:
                '$d=\\sqrt{3^2+4^2+12^2}=\\sqrt{9+16+144}=\\sqrt{169}=13$ cm.',
              difficulty: 'hard',
            },
          ],
          related: ['square-and-cube-roots', 'lines-angles-and-triangles', 'quadrilaterals', 'congruence-and-transformations'],
        },
        {
          id: 'congruence-and-transformations',
          title: 'Congruence and Transformations',
          subtitle: 'SSS, SAS and ASA, plus translations, reflections and rotations.',
          introduction:
            'Two figures are congruent when one can be moved onto the other without stretching or shrinking. Rigid transformations — translations, reflections and rotations — produce congruent images, and three side or angle conditions are often enough to guarantee congruence.',
          prerequisites: [
            'lines-angles-and-triangles',
            'perimeter-and-area',
            'integers',
          ],
          keyIdeas: [
            'Congruent figures have equal corresponding sides and angles.',
            'SSS, SAS and ASA are sufficient criteria for triangle congruence.',
            'Translations, rotations and reflections preserve lengths and angles.',
            'Reflections reverse orientation; translations and rotations preserve it.',
          ],
          aliases: ['congruent triangles', 'rigid motions', 'SSS SAS ASA', 'translation reflection rotation', 'orientation'],
          theory: [
            {
              title: 'Congruence and correspondence',
              body: [
                'Congruent triangles have the same three side lengths and the same three angles. The notation $\\triangle ABC \\cong \\triangle DEF$ means that $A$ corresponds to $D$, $B$ to $E$, and $C$ to $F$, in that order. Matching the letters correctly is part of the answer.',
                'You do not need to check all six measurements. SSS, SAS and ASA are sufficient: three pairs of corresponding sides, two pairs of sides with the included angle, or two pairs of angles with the included side.',
              ],
            },
            {
              title: 'Rigid transformations',
              body: [
                'A translation slides every point the same distance in the same direction. A rotation turns every point about a fixed centre through a fixed angle. A reflection flips every point across a line. All three preserve lengths and angles, so the image is congruent to the original.',
                'Translations and rotations preserve orientation, meaning the clockwise order of vertices stays the same. A reflection reverses orientation, so the image is a mirror version.',
              ],
            },
            {
              title: 'Coordinate rules',
              body: [
                'On a coordinate grid, a translation by vector $(a,b)$ maps $(x,y)$ to $(x+a,y+b)$. A reflection in the $x$-axis maps $(x,y)$ to $(x,-y)$; a reflection in the $y$-axis maps $(x,y)$ to $(-x,y)$.',
                'A $90^\\circ$ counterclockwise rotation about the origin maps $(x,y)$ to $(-y,x)$, and a $180^\\circ$ rotation maps $(x,y)$ to $(-x,-y)$. Applying two transformations in sequence means applying the rules one after the other.',
              ],
              bullets: [
                'Translation: slide; orientation preserved.',
                'Rotation: turn about a centre; orientation preserved.',
                'Reflection: flip across a line; orientation reversed.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-congruence-sss',
              title: 'SSS congruence criterion',
              expression: String.raw`AB=DE,\ BC=EF,\ CA=FD \implies \triangle ABC \cong \triangle DEF`,
              description: 'If three pairs of corresponding sides are equal, the triangles are congruent.',
              spoken: 'If A B equals D E, B C equals E F, and C A equals F D, then triangle A B C is congruent to triangle D E F.',
              variables: [
                { symbol: 'AB,\ BC,\ CA', name: 'side lengths of the first triangle' },
                { symbol: 'DE,\ EF,\ FD', name: 'corresponding side lengths of the second triangle' },
              ],
              conditions: ['The sides must correspond in the order written.', 'The three lengths must form a valid triangle.'],
              notes: 'SSS is one of the three sufficient criteria at this level, together with SAS and ASA.',
              tags: ['SSS', 'congruent triangles', 'side side side', 'congruence criterion'],
            },
            {
              id: 'g8-congruence-translation',
              title: 'Translation in the coordinate plane',
              expression: String.raw`(x,y) \mapsto (x+a,\ y+b)`,
              description: 'A translation slides every point by the same horizontal and vertical amounts.',
              spoken: 'The point x y maps to x plus a, y plus b.',
              variables: [
                { symbol: 'x,\ y', name: 'coordinates of the original point' },
                { symbol: 'a', name: 'horizontal shift', note: 'positive means right' },
                { symbol: 'b', name: 'vertical shift', note: 'positive means up' },
              ],
              conditions: ['The same vector $(a,b)$ is applied to every point.'],
              notes: 'Translation preserves lengths, angles and orientation. Example: $(2,3)\\mapsto(2-5,3+4)=(-3,7)$ for $(a,b)=(-5,4)$.',
              tags: ['translation', 'coordinate rule', 'slide', 'rigid motion'],
            },
            {
              id: 'g8-congruence-reflection-y',
              title: 'Reflection in the y-axis',
              expression: String.raw`(x,y) \mapsto (-x,\ y)`,
              description: 'A reflection in the y-axis changes the sign of the x-coordinate and keeps the y-coordinate.',
              spoken: 'The point x y maps to negative x, y.',
              variables: [
                { symbol: 'x', name: 'horizontal coordinate', note: 'changes sign' },
                { symbol: 'y', name: 'vertical coordinate', note: 'stays the same' },
              ],
              conditions: ['The mirror line is the $y$-axis, where $x=0$.'],
              notes: 'Reflection in the $x$-axis is $(x,y)\\mapsto(x,-y)$. Both reflections reverse orientation.',
              tags: ['reflection', 'y-axis', 'coordinate rule', 'mirror image'],
            },
            {
              id: 'g8-congruence-rotation-90',
              title: '90° counterclockwise rotation about the origin',
              expression: String.raw`(x,y) \mapsto (-y,\ x)`,
              description: 'A quarter-turn counterclockwise swaps the coordinates and changes the sign of the new x-coordinate.',
              spoken: 'The point x y maps to negative y, x.',
              variables: [
                { symbol: 'x,\ y', name: 'coordinates before rotation' },
                { symbol: '(-y,\ x)', name: 'coordinates after a 90-degree counterclockwise turn' },
              ],
              conditions: ['The centre of rotation is the origin $(0,0)$.', 'The angle is $90^\\circ$ counterclockwise.'],
              notes: 'A $90^\\circ$ clockwise rotation is $(x,y)\\mapsto(y,-x)$. A $180^\\circ$ rotation is $(x,y)\\mapsto(-x,-y)$.',
              tags: ['rotation', '90 degrees', 'coordinate rule', 'counterclockwise'],
            },
          ],
          examples: [
            {
              title: 'Using SAS to establish congruence',
              problem:
                'In triangles $ABC$ and $DEF$, $AB=DE=7$ cm, $BC=EF=10$ cm and $\\angle B=\\angle E=48^{\\circ}$. The side $AC=8$ cm. Find $DF$ and state the congruence criterion.',
              given: [
                '$AB=DE=7$ cm and $BC=EF=10$ cm.',
                'The included angles are equal: $\\angle B=\\angle E=48^\\circ$.',
                '$AC=8$ cm.',
              ],
              steps: [
                {
                  text: 'Identify the angle between the two given sides in each triangle.',
                  math: String.raw`\angle B \text{ lies between } AB \text{ and } BC; \quad \angle E \text{ lies between } DE \text{ and } EF`,
                },
                {
                  text: 'Check that the two side pairs and the included angle pair match.',
                  math: String.raw`AB=DE, \quad BC=EF, \quad \angle B=\angle E`,
                },
                {
                  text: 'Apply the SAS criterion.',
                  math: String.raw`\triangle ABC \cong \triangle DEF \quad \text{(SAS)}`,
                },
                {
                  text: 'Corresponding parts of congruent triangles are equal, so $AC$ corresponds to $DF$.',
                  math: String.raw`DF = AC = 8 \text{ cm}`,
                },
                {
                  text: 'Check that the correspondence is consistent: $A\\leftrightarrow D$, $B\\leftrightarrow E$, $C\\leftrightarrow F$.',
                },
              ],
              answer: '$DF=8$ cm, by SAS congruence.',
            },
            {
              title: 'Composing transformations',
              problem:
                'Start with $A(2,3)$. Translate it by $(-5,4)$, reflect the image in the $x$-axis, then rotate the result $90^{\\circ}$ counterclockwise about the origin. Find the final coordinates.',
              given: [
                'Starting point: $A(2,3)$.',
                'Translation vector: $(-5,4)$.',
                'Reflection line: the $x$-axis.',
                'Rotation: $90^\\circ$ counterclockwise about $(0,0)$.',
              ],
              steps: [
                {
                  text: 'Apply the translation rule $(x,y)\\mapsto(x-5,y+4)$.',
                  math: String.raw`(2,3) \mapsto (2-5,\ 3+4) = (-3,7)`,
                },
                {
                  text: 'Reflect the image in the $x$-axis using $(x,y)\\mapsto(x,-y)$.',
                  math: String.raw`(-3,7) \mapsto (-3,-7)`,
                },
                {
                  text: 'Rotate $90^\\circ$ counterclockwise using $(x,y)\\mapsto(-y,x)$.',
                  math: String.raw`(-3,-7) \mapsto (7,-3)`,
                },
                {
                  text: 'Check the first step: the point moved $5$ units left and $4$ units up.',
                },
                {
                  text: 'Check the reflection: the $x$-coordinate stayed $-3$ while the $y$-coordinate changed sign.',
                },
                {
                  text: 'Check the rotation: a quarter-turn of $(-3,-7)$ lands in the fourth quadrant at $(7,-3)$.',
                },
              ],
              answer: 'The final image is $(7,-3)$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Treating AAA as a congruence criterion.',
              correction:
                'Three equal angles guarantee the same shape, not the same size. AAA gives similar triangles; a side length is needed for congruence.',
            },
            {
              mistake: 'Matching vertices in the wrong order when writing a congruence statement.',
              correction:
                'In $\\triangle ABC \\cong \\triangle DEF$, $A$ must correspond to $D$, $B$ to $E$, and $C$ to $F$. The order identifies which angles and sides are equal.',
            },
            {
              mistake: 'Reflecting $(3,-5)$ in the $y$-axis and writing $(3,5)$.',
              correction:
                'A reflection in the $y$-axis changes the sign of $x$, not $y$: $(3,-5)\\mapsto(-3,-5)$. The rule $(x,y)\\mapsto(x,-y)$ is the reflection in the $x$-axis.',
            },
          ],
          exercises: [
            {
              id: 'g8-congruence-ex-1',
              type: 'multiple-choice',
              prompt: 'Which set of conditions does not guarantee that two triangles are congruent?',
              options: ['SSS', 'SAS', 'ASA', 'AAA'],
              correctOption: 3,
              hint: 'Equal angles determine shape but not size.',
              explanation:
                'AAA only guarantees that the triangles are similar. Two triangles with the same angles can have different side lengths, so they need not be congruent.',
              difficulty: 'easy',
            },
            {
              id: 'g8-congruence-ex-2',
              type: 'multiple-choice',
              prompt: 'A translation maps $(x,y)$ to $(x-3,y+5)$. What is the image of $(4,-2)$?',
              options: [
                String.raw`(1,3)`,
                String.raw`(7,-7)`,
                String.raw`(1,-7)`,
                String.raw`(-1,3)`,
              ],
              correctOption: 0,
              hint: 'Subtract 3 from the x-coordinate and add 5 to the y-coordinate.',
              explanation:
                '$(4-3,\\ -2+5)=(1,3)$. The point moves $3$ units left and $5$ units up.',
              difficulty: 'easy',
            },
            {
              id: 'g8-congruence-ex-3',
              type: 'multiple-choice',
              prompt: 'What is the image of $(3,-5)$ after reflection in the $x$-axis?',
              options: [
                String.raw`(-3,-5)`,
                String.raw`(3,5)`,
                String.raw`(-3,5)`,
                String.raw`(5,3)`,
              ],
              correctOption: 1,
              hint: 'Reflection in the x-axis changes the sign of the y-coordinate.',
              explanation:
                'The rule is $(x,y)\\mapsto(x,-y)$, so $(3,-5)\\mapsto(3,5)$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-congruence-ex-4',
              type: 'numeric',
              prompt:
                'A $90^{\\circ}$ counterclockwise rotation about the origin maps $(5,-2)$ to $(a,b)$. What is the value of $a$?',
              answer: 2,
              tolerance: 0,
              hint: 'Use $(x,y)\\mapsto(-y,x)$.',
              explanation:
                '$(5,-2)\\mapsto(-(-2),5)=(2,5)$, so $a=2$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-congruence-ex-5',
              type: 'numeric',
              prompt:
                'A triangle has sides $6$ cm, $8$ cm and $10$ cm. A congruent triangle has sides $6$ cm, $8$ cm and $k$ cm. What is $k$?',
              answer: 10,
              tolerance: 0,
              answerUnit: 'cm',
              hint: 'Congruent triangles have equal corresponding side lengths.',
              explanation:
                'A congruent triangle must have the same three side lengths, so the missing side is $10$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g8-congruence-ex-6',
              type: 'multiple-choice',
              prompt: 'Which transformation does not preserve orientation?',
              options: ['Translation', 'Rotation', 'Reflection', 'None of these'],
              correctOption: 2,
              hint: 'Think about the clockwise order of the vertices after the transformation.',
              explanation:
                'A reflection reverses the clockwise order of the vertices. Translations and rotations preserve orientation, so the image is not a mirror version.',
              difficulty: 'hard',
            },
          ],
          related: ['lines-angles-and-triangles', 'quadrilaterals', 'transformations-in-the-plane', 'similarity-and-dilations'],
        },
        {
          id: 'quadrilaterals',
          title: 'Quadrilaterals',
          subtitle: 'Properties and hierarchy of parallelograms, rectangles, rhombuses, squares, trapezia and kites.',
          introduction:
            'A quadrilateral is a four-sided polygon. Its angle sum is always $360^\\circ$, but special quadrilaterals satisfy stronger conditions. Understanding the hierarchy means knowing which properties are guaranteed and which are not.',
          prerequisites: [
            'lines-angles-and-triangles',
            'perimeter-and-area',
            'congruence-and-transformations',
          ],
          keyIdeas: [
            'The interior angles of any quadrilateral sum to $360^\\circ$.',
            'A parallelogram has both pairs of opposite sides parallel, with opposite sides and angles equal.',
            'A rectangle, rhombus and square are special parallelograms.',
            'A kite has two pairs of adjacent equal sides; a trapezium has at least one pair of parallel sides.',
            'Diagonals reveal additional properties, such as bisecting each other or meeting at right angles.',
          ],
          aliases: ['parallelogram', 'rhombus', 'trapezium', 'kite', 'quadrilateral hierarchy'],
          theory: [
            {
              title: 'The quadrilateral family',
              body: [
                'A quadrilateral has four straight sides and four interior angles. A trapezium has at least one pair of parallel sides. A kite has two pairs of adjacent sides equal. A parallelogram has both pairs of opposite sides parallel.',
                'These definitions overlap. A square is a rectangle, a rhombus and a parallelogram at the same time. The hierarchy runs from the most general quadrilateral to the most special square.',
              ],
            },
            {
              title: 'Parallelogram properties',
              body: [
                'In a parallelogram, opposite sides are equal and opposite angles are equal. Consecutive angles are supplementary because they are co-interior angles between parallel lines: they add to $180^\\circ$.',
                'The diagonals of a parallelogram bisect each other. A diagonal divides the parallelogram into two congruent triangles, which is why opposite sides and angles match.',
              ],
              bullets: [
                'Opposite sides parallel and equal.',
                'Opposite angles equal.',
                'Consecutive angles supplementary.',
                'Diagonals bisect each other.',
              ],
            },
            {
              title: 'Special cases and hierarchy',
              body: [
                'A rectangle is a parallelogram with a right angle, which forces all four angles to be right angles; its diagonals are equal. A rhombus is a parallelogram with four equal sides; its diagonals are perpendicular and bisect the angles. A square has both properties.',
                'An isosceles trapezium has equal non-parallel sides and equal base angles. A kite has perpendicular diagonals, one line of symmetry, and one pair of equal opposite angles. Not every parallelogram is a rectangle, and not every rhombus is a square.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-quadrilaterals-angle-sum',
              title: 'Angle sum of a quadrilateral',
              expression: String.raw`\angle A + \angle B + \angle C + \angle D = 360^{\circ}`,
              description: 'The four interior angles of any quadrilateral add to 360 degrees.',
              spoken: 'Angle A plus angle B plus angle C plus angle D equals three hundred sixty degrees.',
              variables: [
                { symbol: 'A,\ B,\ C,\ D', name: 'interior angles of the quadrilateral', unit: '°' },
              ],
              conditions: ['The figure is a simple quadrilateral with four interior angles.'],
              notes: 'A diagonal splits the quadrilateral into two triangles, each with angle sum $180^\\circ$, so the total is $2\\times180^\\circ=360^\\circ$.',
              tags: ['angle sum', 'quadrilateral', '360 degrees', 'interior angles'],
            },
            {
              id: 'g8-quadrilaterals-opposite-angles',
              title: 'Opposite angles of a parallelogram',
              expression: String.raw`\angle A = \angle C, \quad \angle B = \angle D`,
              description: 'Opposite angles in a parallelogram are equal.',
              spoken: 'Angle A equals angle C, and angle B equals angle D.',
              variables: [
                { symbol: 'A,\ C', name: 'one pair of opposite angles', unit: '°' },
                { symbol: 'B,\ D', name: 'the other pair of opposite angles', unit: '°' },
              ],
              conditions: ['The quadrilateral is a parallelogram, so both pairs of opposite sides are parallel.'],
              notes: 'Combine with the angle sum: if $\\angle A=65^\\circ$, then $\\angle C=65^\\circ$ and the other two angles are $115^\\circ$ each.',
              tags: ['parallelogram angles', 'opposite angles', 'equal angles', 'quadrilateral properties'],
            },
            {
              id: 'g8-quadrilaterals-consecutive-angles',
              title: 'Consecutive angles of a parallelogram',
              expression: String.raw`\angle A + \angle B = 180^{\circ}`,
              description: 'Consecutive angles in a parallelogram are supplementary.',
              spoken: 'Angle A plus angle B equals one hundred eighty degrees.',
              variables: [
                { symbol: 'A,\ B', name: 'consecutive angles of a parallelogram', unit: '°' },
              ],
              conditions: ['The sides containing the angles are parallel, which holds in a parallelogram.'],
              notes: 'Consecutive angles are co-interior angles between parallel lines. This gives the quickest way to find the angle adjacent to a known one.',
              tags: ['consecutive angles', 'co-interior angles', 'parallelogram', 'supplementary'],
            },
          ],
          examples: [
            {
              title: 'Angles in a parallelogram',
              problem: 'In parallelogram $ABCD$, $\\angle A=65^{\\circ}$. Find $\\angle B$, $\\angle C$ and $\\angle D$.',
              given: ['$ABCD$ is a parallelogram.', '$\\angle A=65^\\circ$.'],
              steps: [
                {
                  text: 'Use the fact that opposite angles are equal.',
                  math: String.raw`\angle C = \angle A = 65^{\circ}`,
                },
                {
                  text: 'Use the fact that consecutive angles are supplementary.',
                  math: String.raw`\angle B = 180^{\circ} - 65^{\circ}`,
                },
                {
                  text: 'Subtract.',
                  math: String.raw`\angle B = 115^{\circ}`,
                },
                {
                  text: 'The remaining angle is opposite $\\angle B$.',
                  math: String.raw`\angle D = \angle B = 115^{\circ}`,
                },
                {
                  text: 'Check the angle sum.',
                  math: String.raw`65^{\circ} + 115^{\circ} + 65^{\circ} + 115^{\circ} = 360^{\circ}`,
                },
              ],
              answer: '$\\angle B=115^\\circ$, $\\angle C=65^\\circ$ and $\\angle D=115^\\circ$.',
            },
            {
              title: 'Using the angle sum with a ratio',
              problem: 'The interior angles of a quadrilateral are in the ratio $2:3:4:6$. Find the largest angle.',
              given: ['The ratio of the four angles is $2:3:4:6$.', 'The angle sum of a quadrilateral is $360^\\circ$.'],
              steps: [
                {
                  text: 'Add the ratio parts.',
                  math: String.raw`2+3+4+6 = 15`,
                },
                {
                  text: 'Divide the angle sum by the total number of parts.',
                  math: String.raw`\frac{360^{\circ}}{15} = 24^{\circ}`,
                },
                {
                  text: 'Multiply each ratio part by $24^\\circ$.',
                  math: String.raw`2(24^{\circ})=48^{\circ},\quad 3(24^{\circ})=72^{\circ},\quad 4(24^{\circ})=96^{\circ},\quad 6(24^{\circ})=144^{\circ}`,
                },
                {
                  text: 'Check that the angles add to $360^\\circ$.',
                  math: String.raw`48^{\circ}+72^{\circ}+96^{\circ}+144^{\circ}=360^{\circ}`,
                },
                {
                  text: 'Identify the largest angle.',
                  math: String.raw`144^{\circ}`,
                },
              ],
              answer: 'The largest angle is $144^\\circ$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Assuming every parallelogram is a rectangle.',
              correction:
                'A parallelogram only needs both pairs of opposite sides parallel. A rectangle additionally needs a right angle. A slanted parallelogram is not a rectangle.',
            },
            {
              mistake: 'Saying a square is not a rectangle because it looks different.',
              correction:
                'A square has four right angles and both pairs of opposite sides parallel, so it satisfies the definition of a rectangle. It is a special rectangle with equal sides.',
            },
            {
              mistake: 'Using $180^\\circ$ as the angle sum of a quadrilateral.',
              correction:
                'The sum is $360^\\circ$, because a diagonal divides the quadrilateral into two triangles of $180^\\circ$ each.',
            },
          ],
          exercises: [
            {
              id: 'g8-quadrilaterals-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the sum of the interior angles of a quadrilateral?',
              options: [
                String.raw`180^{\circ}`,
                String.raw`270^{\circ}`,
                String.raw`360^{\circ}`,
                String.raw`540^{\circ}`,
              ],
              correctOption: 2,
              hint: 'Split the quadrilateral into two triangles with a diagonal.',
              explanation:
                'Two triangles each contribute $180^\\circ$, so the quadrilateral’s interior angles sum to $2\\times180^\\circ=360^\\circ$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-quadrilaterals-ex-2',
              type: 'multiple-choice',
              prompt: 'Which quadrilateral always has diagonals of equal length?',
              options: ['Parallelogram', 'Rhombus', 'Rectangle', 'Kite'],
              correctOption: 2,
              hint: 'Think about which shape has four right angles.',
              explanation:
                'A rectangle’s diagonals are always equal because each is the hypotenuse of a congruent right triangle. A general parallelogram and a rhombus do not have equal diagonals.',
              difficulty: 'medium',
            },
            {
              id: 'g8-quadrilaterals-ex-3',
              type: 'multiple-choice',
              prompt: 'A square is always a…',
              options: ['trapezium', 'kite', 'rectangle', 'rhombus but not a rectangle'],
              correctOption: 2,
              hint: 'A square has four right angles.',
              explanation:
                'A square has four right angles and opposite sides parallel, so it is a rectangle. It is also a rhombus and a parallelogram, but the statement “rectangle” is always true.',
              difficulty: 'medium',
            },
            {
              id: 'g8-quadrilaterals-ex-4',
              type: 'numeric',
              prompt: 'A parallelogram has one angle of $118^{\\circ}$. What is the size of the adjacent angle in degrees?',
              answer: 62,
              tolerance: 0,
              answerUnit: '°',
              hint: 'Consecutive angles are supplementary.',
              explanation:
                'Adjacent angles in a parallelogram add to $180^\\circ$, so the adjacent angle is $180^\\circ-118^\\circ=62^\\circ$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-quadrilaterals-ex-5',
              type: 'numeric',
              prompt:
                'A quadrilateral has interior angles $85^{\\circ}$, $95^{\\circ}$, $110^{\\circ}$ and $x^{\\circ}$. Find $x$.',
              answer: 70,
              tolerance: 0,
              answerUnit: '°',
              hint: 'The four angles add to $360^\\circ$.',
              explanation:
                '$85+95+110=290$, so $x=360-290=70$. The angles sum to $360^\\circ$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-quadrilaterals-ex-6',
              type: 'numeric',
              prompt:
                'A kite has interior angles $100^{\\circ}$, $80^{\\circ}$, $100^{\\circ}$ and $x^{\\circ}$. Find $x$.',
              answer: 80,
              tolerance: 0,
              answerUnit: '°',
              hint: 'Use the quadrilateral angle sum; the repeated angles are already given.',
              explanation:
                '$100+80+100=280$, so $x=360-280=80$. The angle sum confirms $x=80^\\circ$.',
              difficulty: 'hard',
            },
          ],
          related: ['lines-angles-and-triangles', 'perimeter-and-area', 'congruence-and-transformations', 'transformations-in-the-plane'],
        },
      ],
      theorems: [
        {
          title: 'Pythagorean theorem',
          statement:
            'In a right triangle with legs $a$ and $b$ and hypotenuse $c$, $a^2+b^2=c^2$.',
          note: 'The hypotenuse is opposite the right angle and is the longest side.',
        },
        {
          title: 'Converse of the Pythagorean theorem',
          statement:
            'If a triangle has sides $a$, $b$ and $c$ with $a^2+b^2=c^2$, where $c$ is the longest side, then the angle opposite $c$ is a right angle.',
          note: 'This is the basis of the $3$–$4$–$5$ builder’s check.',
        },
        {
          title: 'Triangle congruence criteria',
          statement:
            'Two triangles are congruent if SSS (three pairs of corresponding sides equal), SAS (two pairs of sides and the included angle equal), or ASA (two pairs of angles and the included side equal) holds.',
          note: 'AAA gives the same shape but not necessarily the same size; SSA does not guarantee congruence in general.',
        },
      ],
    },
    {
      id: 'statistics-probability',
      family: 'statistics-probability',
      title: 'Statistics & Probability',
      description:
        'Read data displays critically and calculate probabilities for compound events. Frequency tables, histograms and stem-and-leaf plots organise data; sample spaces, tree diagrams and the rules for AND and OR quantify chance.',
      topics: [
        {
          id: 'data-displays',
          title: 'Data Displays',
          subtitle: 'Frequency tables, histograms, stem-and-leaf plots, and honest graphs.',
          introduction:
            'A good data display makes pattern and variation visible without distorting the numbers. Grade 8 compares frequency tables, histograms and stem-and-leaf plots, and learns to spot graphs whose axes or scaling exaggerate a story.',
          prerequisites: [
            'data-and-graphs',
            'averages',
            'rational-numbers',
          ],
          keyIdeas: [
            'Choose the display to match the data type and the question.',
            'A frequency table records how often each value or class occurs.',
            'Histogram bars touch because the classes are continuous intervals.',
            'A stem-and-leaf plot preserves every individual value.',
            'Truncated axes and uneven scales can make differences look larger than they are.',
          ],
          aliases: ['histogram', 'stem-and-leaf', 'frequency table', 'misleading graphs', 'data representation'],
          theory: [
            {
              title: 'Frequency tables',
              body: [
                'A frequency table lists values or classes together with the number of observations in each. A tally column helps while counting, and a total row checks that no observation was lost. Relative frequency is the fraction of the total in a class: $\\frac{f}{n}$.',
                'For continuous data, values are grouped into classes of equal width. The class width should be large enough to keep the table readable but small enough to reveal the shape of the distribution.',
              ],
            },
            {
              title: 'Histograms and stem-and-leaf plots',
              body: [
                'A bar chart is used for categorical data, and its bars have gaps. A histogram is used for numerical data grouped into continuous classes, so its bars touch. The height of each bar is the frequency of the class.',
                'A stem-and-leaf plot splits each value into a leading stem and a final leaf. For example, $23$ appears as stem $2$ and leaf $3$. Ordering the leaves within each row makes the median and shape easy to read, and no individual value is lost.',
              ],
            },
            {
              title: 'Reading graphs critically',
              body: [
                'A graph is misleading when its visual effect does not match the numerical change. Common tricks include starting the vertical axis at a value other than zero, using uneven intervals, scaling only one axis, or drawing three-dimensional bars whose volume exaggerates the difference.',
                'Check the axes, the units, the sample size and the source before drawing a conclusion. A large percentage change from a tiny base can still represent very few cases, and a graph without labels cannot be interpreted reliably.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-data-displays-relative-frequency',
              title: 'Relative frequency',
              expression: String.raw`\text{relative frequency} = \frac{f}{n}`,
              description: 'The relative frequency of a class is its frequency divided by the total number of observations.',
              spoken: 'Relative frequency equals f divided by n, where f is the class frequency and n is the total number of observations.',
              variables: [
                { symbol: 'f', name: 'frequency of the class', note: 'a non-negative integer' },
                { symbol: 'n', name: 'total number of observations', note: 'must be positive' },
              ],
              conditions: ['$n>0$.', 'The classes must not overlap, so every observation is counted exactly once.'],
              notes: 'Relative frequencies may be written as fractions, decimals or percentages. They should sum to $1$ or $100\\%$ up to rounding.',
              tags: ['relative frequency', 'proportion', 'frequency table', 'data display'],
            },
            {
              id: 'g8-data-displays-class-width',
              title: 'Choosing a histogram class width',
              expression: String.raw`w = \frac{\text{max} - \text{min}}{k}`,
              description: 'Divide the range by the desired number of classes, then round up to a convenient width.',
              spoken: 'The class width equals the maximum minus the minimum, divided by the number of classes.',
              variables: [
                { symbol: 'w', name: 'class width', note: 'same unit as the data' },
                { symbol: '\\text{max}', name: 'largest data value' },
                { symbol: '\\text{min}', name: 'smallest data value' },
                { symbol: 'k', name: 'desired number of classes', note: 'a positive integer' },
              ],
              conditions: ['$k>0$ and max $>$ min.', 'Round the result up; every observation must fit in a class.'],
              notes: 'A convenient width such as $5$, $10$ or $20$ is usually preferred over an awkward exact value.',
              tags: ['class width', 'histogram', 'grouped data', 'range'],
            },
            {
              id: 'g8-data-displays-frequency-mean',
              title: 'Mean from a frequency table',
              expression: String.raw`\bar{x} = \frac{\sum f x}{\sum f}`,
              description: 'Multiply each value by its frequency, add, then divide by the total frequency.',
              spoken: 'x bar equals the sum of f x divided by the sum of f.',
              variables: [
                { symbol: '\\bar{x}', name: 'mean of the data' },
                { symbol: 'x', name: 'data value or class midpoint' },
                { symbol: 'f', name: 'frequency of that value' },
                { symbol: '\\sum f', name: 'total frequency' },
              ],
              conditions: ['Use class midpoints when the data are grouped.', 'The total frequency must be positive.'],
              notes: 'The mean from grouped data is an estimate because individual values inside a class are unknown.',
              tags: ['weighted mean', 'frequency table', 'average', 'grouped data'],
            },
          ],
          examples: [
            {
              title: 'Mean from a frequency table',
              problem:
                'The table shows the number of books read by 27 students. Calculate the mean number of books read, correct to two decimal places.',
              given: [
                'Values $x$: $0,1,2,3,4$.',
                'Frequencies $f$: $3,8,9,5,2$.',
                'Total frequency: $3+8+9+5+2=27$.',
              ],
              steps: [
                {
                  text: 'Multiply each value by its frequency.',
                  math: String.raw`0(3)=0,\quad 1(8)=8,\quad 2(9)=18,\quad 3(5)=15,\quad 4(2)=8`,
                },
                {
                  text: 'Add the products.',
                  math: String.raw`\sum f x = 0+8+18+15+8 = 49`,
                },
                {
                  text: 'Confirm the total frequency.',
                  math: String.raw`\sum f = 27`,
                },
                {
                  text: 'Apply the frequency-table mean formula.',
                  math: String.raw`\bar{x} = \frac{49}{27}`,
                },
                {
                  text: 'Divide and round to two decimal places.',
                  math: String.raw`\bar{x} = 1.8148\ldots \approx 1.81`,
                },
                {
                  text: 'Check the size: the mean lies between the smallest value $0$ and the largest value $4$, and near the middle of the distribution.',
                },
              ],
              answer: 'The mean is approximately $1.81$ books per student.',
            },
            {
              title: 'Choosing classes for a histogram',
              problem:
                'Times taken to complete a task range from $14$ minutes to $84$ minutes. Choose five classes of equal width that cover all the data.',
              given: ['Minimum time: $14$ minutes.', 'Maximum time: $84$ minutes.', 'Desired number of classes: $5$.'],
              steps: [
                {
                  text: 'Find the range.',
                  math: String.raw`84 - 14 = 70 \text{ minutes}`,
                },
                {
                  text: 'Divide the range by the desired number of classes.',
                  math: String.raw`\frac{70}{5} = 14 \text{ minutes}`,
                },
                {
                  text: 'Round up to a convenient class width, here $15$ minutes.',
                  math: String.raw`w = 15 \text{ minutes}`,
                },
                {
                  text: 'Start at a convenient value at or below the minimum, here $10$ minutes, so the first class covers $14$.',
                  math: String.raw`10\text{–}25,\ 25\text{–}40,\ 40\text{–}55,\ 55\text{–}70,\ 70\text{–}85`,
                },
                {
                  text: 'Check that the largest value $84$ fits in the final class and that there are exactly five classes.',
                },
              ],
              answer: 'Use five classes of width $15$ minutes: $10$–$25$, $25$–$40$, $40$–$55$, $55$–$70$ and $70$–$85$ minutes.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using a bar chart with gaps for continuous numerical data.',
              correction:
                'Continuous classes are represented by a histogram, whose bars touch. Gaps signal categorical data, where the categories are separate.',
            },
            {
              mistake: 'Reading a histogram as if each bar showed one exact value.',
              correction:
                'A histogram bar represents a class interval. The height gives the number of observations in that interval, not at a single point.',
            },
            {
              mistake: 'Comparing two bars without checking where the vertical axis starts.',
              correction:
                'A truncated vertical axis exaggerates differences. Check the scale and the starting value before judging the size of a change.',
            },
          ],
          exercises: [
            {
              id: 'g8-data-displays-ex-1',
              type: 'multiple-choice',
              prompt: 'Which display is most appropriate for continuous numerical data grouped into classes?',
              options: ['Bar chart', 'Histogram', 'Pie chart', 'Pictogram'],
              correctOption: 1,
              hint: 'The classes are intervals on a number line, not separate categories.',
              explanation:
                'A histogram is designed for continuous numerical classes; its bars touch to show that the intervals are adjacent. Bar charts, pie charts and pictograms are used for categorical data.',
              difficulty: 'easy',
            },
            {
              id: 'g8-data-displays-ex-2',
              type: 'multiple-choice',
              prompt: 'Why do the bars in a histogram touch?',
              options: [
                'The data are categorical.',
                'The classes are continuous intervals.',
                'All frequencies are equal.',
                'The graph is three-dimensional.',
              ],
              correctOption: 1,
              hint: 'Think about what sits between one class and the next.',
              explanation:
                'Histogram classes are adjacent intervals on a number line, with no gap between them, so the bars touch. Categorical bar charts leave gaps between separate categories.',
              difficulty: 'medium',
            },
            {
              id: 'g8-data-displays-ex-3',
              type: 'multiple-choice',
              prompt: 'Which feature is most likely to make a graph misleading?',
              options: [
                'A labelled horizontal axis',
                'A vertical axis starting at a non-zero value',
                'Data ordered by size',
                'A clear graph title',
              ],
              correctOption: 1,
              hint: 'Consider how a small difference looks when the axis is truncated.',
              explanation:
                'Starting the vertical axis above zero magnifies small differences and can make a modest change look dramatic. Labels, ordering and titles generally improve honesty rather than undermine it.',
              difficulty: 'medium',
            },
            {
              id: 'g8-data-displays-ex-4',
              type: 'numeric',
              prompt:
                'In a survey of 50 people, 12 chose option A. What is the relative frequency of option A as a decimal?',
              answer: 0.24,
              tolerance: 0.001,
              hint: 'Divide the frequency by the total.',
              explanation:
                'The relative frequency is $\\frac{12}{50}=0.24$, or $24\\%$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-data-displays-ex-5',
              type: 'numeric',
              prompt:
                'A frequency table gives values $1,2,3$ with frequencies $4,5,1$. What is the mean?',
              answer: 1.7,
              tolerance: 0.01,
              hint: 'Compute $\\sum fx$ and divide by $\\sum f$.',
              explanation:
                '$\\sum fx = 1(4)+2(5)+3(1)=4+10+3=17$ and $\\sum f=10$, so the mean is $\\frac{17}{10}=1.7$.',
              difficulty: 'hard',
            },
            {
              id: 'g8-data-displays-ex-6',
              type: 'multiple-choice',
              prompt: 'Which display preserves every individual data value while grouping values by leading digit?',
              options: ['Histogram', 'Frequency table with classes', 'Stem-and-leaf plot', 'Pie chart'],
              correctOption: 2,
              hint: 'Each value is split into a stem and a leaf.',
              explanation:
                'A stem-and-leaf plot keeps every value visible as a leaf while grouping values with the same stem. A histogram and a grouped frequency table lose the individual values inside each class.',
              difficulty: 'hard',
            },
          ],
          related: ['data-and-graphs', 'averages', 'scatter-plots', 'measures-of-spread'],
        },
        {
          id: 'probability-compound-events',
          title: 'Compound Events and Probability',
          subtitle: 'Sample spaces, AND/OR, independent events, and tree diagrams.',
          introduction:
            'A compound event combines two or more outcomes, such as rolling a six and flipping a head. Sample spaces and tree diagrams list the possibilities systematically, while the rules for AND and OR turn counting into calculation.',
          prerequisites: [
            'probability-intro',
            'rational-numbers',
            'data-displays',
          ],
          keyIdeas: [
            'Every probability lies between $0$ and $1$, inclusive.',
            'For independent events, $P(A\\text{ and }B)=P(A)\\times P(B)$; do not add.',
            'For mutually exclusive events, $P(A\\text{ or }B)=P(A)+P(B)$; do not double-count overlap.',
            'The complement rule is $P(\\text{not }A)=1-P(A)$.',
            'Tree diagrams multiply along branches and add across branches.',
          ],
          aliases: ['compound probability', 'independent events', 'tree diagram', 'sample space', 'AND OR probability'],
          theory: [
            {
              title: 'Sample spaces and equally likely outcomes',
              body: [
                'The sample space is the set of all possible outcomes. For two coin tosses it is $\\{HH, HT, TH, TT\\}$, four equally likely outcomes. For a coin and a die, there are $2\\times6=12$ outcomes.',
                'When outcomes are equally likely, the probability of an event is the number of favourable outcomes divided by the total number of outcomes: $P(E)=\\frac{n(E)}{n(S)}$. Listing the sample space carefully prevents missed or double-counted outcomes.',
              ],
            },
            {
              title: 'AND, OR and independence',
              body: [
                'Two events are independent when the occurrence of one does not change the probability of the other. For independent events, multiply: $P(A\\text{ and }B)=P(A)P(B)$. For example, the probability of a head and a six is $\\frac{1}{2}\\times\\frac{1}{6}=\\frac{1}{12}$.',
                'For events that cannot occur together, add: $P(A\\text{ or }B)=P(A)+P(B)$. If they can overlap, use the general addition rule $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ so the overlap is not counted twice.',
                'The phrase “at least one” is usually easiest through the complement: $P(\\text{at least one})=1-P(\\text{none})$.',
              ],
            },
            {
              title: 'Tree diagrams',
              body: [
                'A tree diagram shows each stage as branches labelled with probabilities. Multiply along a path to get the probability of that sequence of events, then add the probabilities of all paths that satisfy the event.',
                'When drawing without replacement, the denominator changes after the first draw, so the events are not independent. With replacement, the probabilities reset and the draws are independent. Always check that the probabilities leaving each node sum to $1$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g8-compound-prob-basic',
              title: 'Probability from equally likely outcomes',
              expression: String.raw`P(E) = \frac{n(E)}{n(S)}`,
              description: 'The probability of an event is the number of favourable outcomes divided by the total number of equally likely outcomes.',
              spoken: 'The probability of E equals the number of outcomes in E divided by the number of outcomes in the sample space S.',
              variables: [
                { symbol: 'P(E)', name: 'probability of event E', note: 'between $0$ and $1$' },
                { symbol: 'n(E)', name: 'number of favourable outcomes' },
                { symbol: 'n(S)', name: 'total number of outcomes in the sample space', note: 'must be positive' },
              ],
              conditions: ['All outcomes in the sample space must be equally likely.', '$n(S)>0$.'],
              notes: 'The result can be written as a fraction, decimal or percentage. Check that it lies in $[0,1]$.',
              tags: ['probability', 'sample space', 'favourable outcomes', 'equally likely'],
            },
            {
              id: 'g8-compound-prob-and-independent',
              title: 'AND rule for independent events',
              expression: String.raw`P(A \cap B) = P(A)\,P(B)`,
              description: 'For independent events, multiply the probabilities to find the probability that both occur.',
              spoken: 'The probability of A and B equals the probability of A times the probability of B.',
              variables: [
                { symbol: 'A,\ B', name: 'independent events' },
                { symbol: String.raw`P(A \cap B)`, name: 'probability that both A and B occur' },
              ],
              conditions: ['The events must be independent.', 'The rule does not apply to draws without replacement, where probabilities change.'],
              notes: 'Example: two fair coins give $P(\\text{two heads})=\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{4}$.',
              tags: ['AND rule', 'independent events', 'multiply probabilities', 'intersection'],
            },
            {
              id: 'g8-compound-prob-or-exclusive',
              title: 'OR rule for mutually exclusive events',
              expression: String.raw`P(A \cup B) = P(A) + P(B)`,
              description: 'If two events cannot happen together, add their probabilities.',
              spoken: 'The probability of A or B equals the probability of A plus the probability of B.',
              variables: [
                { symbol: 'A,\ B', name: 'mutually exclusive events' },
                { symbol: String.raw`P(A \cup B)`, name: 'probability that A or B occurs' },
              ],
              conditions: ['$A$ and $B$ cannot occur at the same time.', 'If they can overlap, subtract $P(A\\cap B)$ once.'],
              notes: 'Example: rolling a $2$ or a $5$ on a fair die gives $\\frac{1}{6}+\\frac{1}{6}=\\frac{1}{3}$.',
              tags: ['OR rule', 'mutually exclusive', 'add probabilities', 'union'],
            },
            {
              id: 'g8-compound-prob-complement',
              title: 'Complement rule',
              expression: String.raw`P(\text{not } A) = 1 - P(A)`,
              description: 'The probability that an event does not occur is one minus the probability that it does.',
              spoken: 'The probability of not A equals one minus the probability of A.',
              variables: [
                { symbol: 'A', name: 'an event' },
                { symbol: String.raw`P(\text{not } A)`, name: 'probability of the complement of A' },
              ],
              conditions: ['$0 \\le P(A) \\le 1$.'],
              notes: 'Useful for “at least one” questions: find the probability of none, then subtract from $1$.',
              tags: ['complement', 'not A', 'one minus probability', 'at least one'],
            },
          ],
          examples: [
            {
              title: 'AND with two independent events',
              problem: 'A fair coin is tossed and a fair six-sided die is rolled. What is the probability of a head and a six?',
              given: ['The coin and die are fair.', 'The two events are independent.'],
              steps: [
                {
                  text: 'State the probability of a head.',
                  math: String.raw`P(H) = \frac{1}{2}`,
                },
                {
                  text: 'State the probability of rolling a six.',
                  math: String.raw`P(6) = \frac{1}{6}`,
                },
                {
                  text: 'Because the events are independent, multiply.',
                  math: String.raw`P(H \cap 6) = \frac{1}{2} \times \frac{1}{6}`,
                },
                {
                  text: 'Multiply the fractions.',
                  math: String.raw`= \frac{1}{12}`,
                },
                {
                  text: 'Check against the sample space: there are $12$ equally likely pairs, and only $H6$ is favourable.',
                },
                {
                  text: 'Write the decimal approximation.',
                  math: String.raw`\frac{1}{12} \approx 0.083`,
                },
              ],
              answer: 'The probability is $\\frac{1}{12} \\approx 0.083$, or about $8.3\\%$.',
            },
            {
              title: 'Tree diagram without replacement',
              problem:
                'A bag contains $5$ red and $3$ blue counters. Two counters are drawn without replacement. Find the probability that both are red.',
              given: [
                'First draw: $5$ red out of $8$ counters.',
                'After a red is removed: $4$ red out of $7$ counters remain.',
                'The draws are without replacement, so the events are not independent.',
              ],
              steps: [
                {
                  text: 'Find the probability that the first counter is red.',
                  math: String.raw`P(R_1) = \frac{5}{8}`,
                },
                {
                  text: 'After removing a red counter, update the counts.',
                  math: String.raw`4 \text{ red and } 3 \text{ blue remain, so } P(R_2 \mid R_1) = \frac{4}{7}`,
                },
                {
                  text: 'Multiply along the branch for red then red.',
                  math: String.raw`P(R_1 \cap R_2) = \frac{5}{8} \times \frac{4}{7}`,
                },
                {
                  text: 'Multiply numerators and denominators.',
                  math: String.raw`= \frac{20}{56}`,
                },
                {
                  text: 'Reduce the fraction.',
                  math: String.raw`= \frac{5}{14}`,
                },
                {
                  text: 'Approximate and check that the result is between $0$ and $1$.',
                  math: String.raw`\frac{5}{14} \approx 0.357`,
                },
              ],
              answer: 'The probability that both counters are red is $\\frac{5}{14} \\approx 0.36$.',
            },
          ],
          mistakes: [
            {
              mistake: 'Adding probabilities for an AND event: $P(A\\text{ and }B)=P(A)+P(B)$.',
              correction:
                'For independent events, multiply: $P(A\\text{ and }B)=P(A)P(B)$. Adding gives a probability that is usually too large.',
            },
            {
              mistake: 'Using $P(A)P(B)$ for two draws without replacement.',
              correction:
                'Without replacement, the first draw changes the composition of the bag. Update the denominator and numerator before multiplying, as in $\\frac{5}{8}\\times\\frac{4}{7}$.',
            },
            {
              mistake: 'Adding probabilities of overlapping events without subtracting the overlap.',
              correction:
                'Use $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ when the events can occur together. Only mutually exclusive events can simply be added.',
            },
          ],
          exercises: [
            {
              id: 'g8-compound-prob-ex-1',
              type: 'multiple-choice',
              prompt: 'A fair coin is tossed twice. What is the probability of two heads?',
              options: [
                String.raw`\frac{1}{2}`,
                String.raw`\frac{1}{3}`,
                String.raw`\frac{1}{4}`,
                String.raw`\frac{3}{4}`,
              ],
              correctOption: 2,
              hint: 'The tosses are independent; multiply the probabilities.',
              explanation:
                '$P(HH)=\\frac{1}{2}\\times\\frac{1}{2}=\\frac{1}{4}$. The sample space is $\\{HH,HT,TH,TT\\}$, and only one outcome is favourable.',
              difficulty: 'easy',
            },
            {
              id: 'g8-compound-prob-ex-2',
              type: 'multiple-choice',
              prompt:
                'A bag contains $5$ red, $3$ blue and $2$ green counters. One counter is drawn. What is the probability that it is red or blue?',
              options: [
                String.raw`\frac{1}{2}`,
                String.raw`\frac{3}{10}`,
                String.raw`\frac{4}{5}`,
                String.raw`\frac{9}{10}`,
              ],
              correctOption: 2,
              hint: 'Red and blue are mutually exclusive; add their probabilities.',
              explanation:
                '$P(\\text{red or blue})=\\frac{5}{10}+\\frac{3}{10}=\\frac{8}{10}=\\frac{4}{5}$. There are $8$ favourable counters out of $10$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-compound-prob-ex-3',
              type: 'multiple-choice',
              prompt:
                'Events $A$ and $B$ are independent with $P(A)=0.3$ and $P(B)=0.5$. What is $P(A\\text{ and }B)$?',
              options: ['0.8', '0.15', '0.2', '0.65'],
              correctOption: 1,
              hint: 'Multiply the probabilities of independent events.',
              explanation:
                '$P(A\\cap B)=P(A)P(B)=0.3\\times0.5=0.15$. Adding would incorrectly give $0.8$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-compound-prob-ex-4',
              type: 'numeric',
              prompt: 'A fair die is rolled twice. What is the probability of rolling a six both times? Give a decimal to three decimal places.',
              answer: 0.028,
              tolerance: 0.001,
              hint: 'The rolls are independent; multiply $\\frac{1}{6}$ by $\\frac{1}{6}$.',
              explanation:
                '$P(6\\text{ and }6)=\\frac{1}{6}\\times\\frac{1}{6}=\\frac{1}{36}\\approx0.028$.',
              difficulty: 'medium',
            },
            {
              id: 'g8-compound-prob-ex-5',
              type: 'numeric',
              prompt:
                'The probability of rain tomorrow is $0.35$. What is the probability that it does not rain? Give a decimal.',
              answer: 0.65,
              tolerance: 0.001,
              hint: 'Use the complement rule.',
              explanation:
                '$P(\\text{no rain})=1-P(\\text{rain})=1-0.35=0.65$.',
              difficulty: 'easy',
            },
            {
              id: 'g8-compound-prob-ex-6',
              type: 'numeric',
              prompt:
                'A bag contains $4$ red and $6$ blue counters. Two counters are drawn without replacement. What is the probability that both are red? Give a decimal to three decimal places.',
              answer: 0.133,
              tolerance: 0.002,
              hint: 'After one red is removed, there are 3 red out of 9 remaining.',
              explanation:
                '$P(RR)=\\frac{4}{10}\\times\\frac{3}{9}=\\frac{12}{90}=\\frac{2}{15}\\approx0.133$.',
              difficulty: 'hard',
            },
          ],
          related: ['probability-intro', 'data-displays', 'probability-compound-and-two-way', 'probability-rules-and-counting'],
        },
      ],
    },
  ],
}
