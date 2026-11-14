import type { Grade } from '../../types/content'

/**
 * Grade 7 — Foundations.
 *
 * Concrete first steps into signed numbers, proportional reasoning, algebra,
 * geometry and data. Every formula is paired with a fully worked example and
 * practice that explains the reasoning, not just the answer.
 */
export const grade7: Grade = {
  id: '7',
  number: 7,
  title: 'Grade 7',
  tagline: 'Build the confidence to reason with numbers, letters, shapes and data.',
  description:
    'Grade 7 is where arithmetic grows into algebra. You will work with negative numbers, fractions, powers and ratios, then use letters to describe patterns and solve equations. Geometry turns measurement into careful reasoning, and statistics helps you read the stories that data tells. Every idea starts with a concrete example, so you can see why the rules work before you use them.',
  focus: [
    'Signed numbers and proportional reasoning',
    'First steps in algebra: expressions, equations and patterns',
    'Angle reasoning and measurement of shapes',
    'Reading data and judging chance',
  ],
  subjects: [
    {
      id: 'number-systems',
      family: 'number',
      title: 'Number Systems',
      description:
        'Numbers with direction, parts of a whole, powers and comparisons: the tools that every later topic depends on.',
      topics: [
        {
          id: 'integers',
          title: 'Integers',
          subtitle: 'Positive and negative whole numbers, absolute value and the four operations.',
          introduction:
            'Below zero, temperatures, bank balances and football goal differences all need numbers with direction. Integers are the whole numbers together with their opposites: …, −3, −2, −1, 0, 1, 2, 3, …. Once you can place them on a number line, adding, subtracting, multiplying and dividing them follows a small set of clear rules.',
          prerequisites: [
            'Whole numbers and place value',
            'Addition and subtraction facts',
            'Reading a number line',
            'Multiplication tables to 10 × 10',
          ],
          keyIdeas: [
            'Integers include positive numbers, negative numbers and zero.',
            'On a number line, moving right adds and moving left subtracts.',
            'Absolute value is distance from zero, so it is never negative.',
            'Two negatives make a positive when you multiply or divide.',
          ],
          aliases: ['signed numbers', 'negative numbers', 'directed numbers', 'absolute value', 'number line'],
          theory: [
            {
              title: 'Integers and the number line',
              body: [
                'An integer is a whole number that can be positive, negative or zero. The number line shows their order: $-5$ is further left than $-2$, so $-5$ is smaller. The opposite of a number is the same distance from zero on the other side. The opposite of $7$ is $-7$, and the opposite of $-4$ is $4$.',
                'A number line turns arithmetic into movement. Adding a positive number moves right; adding a negative number moves left. This one picture explains rules that can otherwise look arbitrary.',
              ],
              bullets: [
                String.raw`Positive integers: $1, 2, 3, \ldots$`,
                'Zero is neither positive nor negative.',
                String.raw`Negative integers: $-1, -2, -3, \ldots$`,
                'The opposite of $a$ is $-a$; the opposite of $-a$ is $a$.',
              ],
            },
            {
              title: 'Absolute value measures distance',
              body: [
                'The absolute value of an integer is its distance from zero on the number line. Distance has no sign, so $|{-6}| = 6$ and $|6| = 6$. Absolute value answers the question “how far?”, not “in which direction?”.',
                'Use absolute value when you care about size or distance. The gap between $-3$ °C and $8$ °C is $|8 - (-3)| = 11$ degrees, even though the temperature change is an increase of 11 degrees.',
              ],
            },
            {
              title: 'Adding and subtracting integers',
              body: [
                'When two integers have the same sign, add their absolute values and keep the sign: $(-4) + (-6) = -10$. When the signs differ, subtract the smaller absolute value from the larger, then keep the sign of the number with the larger absolute value: $(-9) + 4 = -5$.',
                'Subtraction is adding the opposite: $7 - 10$ is the same as $7 + (-10)$, which is $-3$. This is why subtracting a negative increases a value: $5 - (-3) = 5 + 3 = 8$.',
              ],
              bullets: [
                '$a - b = a + (-b)$',
                '$a - (-b) = a + b$',
                'Check by moving on the number line: right for positive, left for negative.',
              ],
            },
            {
              title: 'Multiplying, dividing and order of operations',
              body: [
                String.raw`The sign of a product or quotient follows a simple pattern. Two numbers with the same sign give a positive result; two numbers with different signs give a negative result. So $(-3) \times (-4) = 12$ and $(-3) \times 4 = -12$.`,
                String.raw`Order of operations keeps everyone’s answers the same: work inside brackets first, then indices (powers), then multiplication and division from left to right, then addition and subtraction from left to right. For example, $-2 + 3 \times (-4)$ means $-2 + (-12) = -14$, not $(-2 + 3) \times (-4)$.`,
              ],
              bullets: [
                'Brackets first.',
                'Then indices, such as squares and cubes.',
                'Then multiplication and division, left to right.',
                'Then addition and subtraction, left to right.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-integers-distance',
              title: 'Distance between two integers',
              expression: String.raw`|a-b|`,
              description:
                'The distance between two integers on the number line is the absolute value of their difference.',
              spoken: 'The distance between a and b is the absolute value of a minus b.',
              variables: [
                { symbol: 'a', name: 'first integer', unit: 'units', note: 'may be negative, zero or positive' },
                { symbol: 'b', name: 'second integer', unit: 'units', note: 'may be negative, zero or positive' },
              ],
              conditions: [
                'The result is never negative.',
                'The order does not matter: $|a-b|=|b-a|$.',
              ],
              notes: 'For $-2$ and $5$, the distance is $|{-2}-5|=7$.',
              tags: ['distance', 'absolute value', 'number line', 'integers'],
            },
            {
              id: 'g7-integers-subtraction',
              title: 'Subtracting by adding the opposite',
              expression: String.raw`a-b=a+(-b)`,
              description:
                'Subtracting an integer is the same as adding its opposite, so every subtraction can be rewritten as an addition.',
              spoken: 'a minus b equals a plus negative b.',
              variables: [
                { symbol: 'a', name: 'number you start with' },
                { symbol: 'b', name: 'number being subtracted' },
              ],
              conditions: ['Works for all integers $a$ and $b$.'],
              notes: 'Subtracting a negative makes the result larger: $6-(-2)=6+2=8$.',
              tags: ['subtraction', 'opposite', 'negative numbers', 'integer operations'],
            },
            {
              id: 'g7-integers-bracket-subtraction',
              title: 'Subtracting a bracketed sum',
              expression: String.raw`a-(b+c)=a-b-c`,
              description:
                'Subtracting a sum removes both parts, so the minus sign changes the sign of every term inside the bracket.',
              spoken: 'a minus, open bracket, b plus c, close bracket, equals a minus b minus c.',
              variables: [
                { symbol: 'a', name: 'number you start with' },
                { symbol: 'b', name: 'first part of the sum' },
                { symbol: 'c', name: 'second part of the sum' },
              ],
              conditions: ['The whole bracket is being subtracted.'],
              notes: 'Check with numbers: $10-(4+3)=10-7=3$ and $10-4-3=3$.',
              tags: ['brackets', 'subtraction', 'sign change', 'order of operations'],
            },
            {
              id: 'g7-integers-negative-product',
              title: 'Product of two negative numbers',
              expression: String.raw`(-a)(-b)=ab`,
              description:
                'The product of two negative numbers is positive, because the two direction reversals cancel each other.',
              spoken: 'Negative a times negative b equals a times b.',
              variables: [
                { symbol: 'a', name: 'positive size of the first factor', note: 'the factor is $-a$' },
                { symbol: 'b', name: 'positive size of the second factor', note: 'the factor is $-b$' },
              ],
              conditions: ['$a>0$ and $b>0$, so both factors are negative.'],
              notes: String.raw`The same sign rule applies to division: $(-12)\div(-3)=4$.`,
              tags: ['multiplication', 'negative numbers', 'sign rules', 'product'],
            },
          ],
          examples: [
            {
              title: 'A day of temperature changes',
              problem:
                'At 6 a.m. the temperature was $-7$ °C. It rose 12 °C by noon, then fell 5 °C by evening. What was the evening temperature, and how far was it from the morning reading?',
              given: [
                'Morning temperature: $-7$ °C',
                'Rise by noon: $+12$ °C',
                'Fall by evening: $-5$ °C',
                'Find the evening reading and its distance from the morning reading.',
              ],
              steps: [
                {
                  text: 'Start with the morning value and add each change. A rise is positive and a fall is negative.',
                  math: String.raw`T_{\text{evening}}=-7+12+(-5)`,
                },
                {
                  text: 'Combine $-7$ and $12$ first. The signs differ, so subtract the smaller absolute value from the larger and keep the sign of the larger number.',
                  math: String.raw`-7+12=5`,
                },
                {
                  text: 'Add the final change. $5$ and $-5$ are opposites, so their sum is zero.',
                  math: String.raw`5+(-5)=0`,
                },
                {
                  text: 'The evening temperature is 0 °C. To measure how far apart the two readings are, subtract them and take the absolute value.',
                  math: String.raw`|0-(-7)|=|7|=7`,
                },
                {
                  text: 'Distance is never negative. The sign of a temperature tells direction, not size, so a gap of 7 °C is reported as 7 °C.',
                },
              ],
              answer:
                'The evening temperature was 0 °C. It was 7 °C away from the morning reading of −7 °C.',
            },
            {
              title: 'Using order of operations with negatives',
              problem: String.raw`Evaluate $-3+4\times(-2)-(-5)$.`,
              given: [
                String.raw`The expression $-3+4\times(-2)-(-5)$`,
                'There are no brackets around the whole expression, so multiplication comes before addition and subtraction.',
              ],
              steps: [
                {
                  text: 'Identify the operations and their order. Multiplication must be done before the additions and subtractions.',
                  math: String.raw`-3+4\times(-2)-(-5)`,
                },
                {
                  text: 'Multiply $4$ by $-2$. The signs differ, so the product is negative.',
                  math: String.raw`4\times(-2)=-8`,
                },
                {
                  text: 'Rewrite the expression with the product in place.',
                  math: String.raw`-3+(-8)-(-5)`,
                },
                {
                  text: 'Subtracting $-5$ is the same as adding $5$.',
                  math: String.raw`-3+(-8)+5`,
                },
                {
                  text: 'Add from left to right. First $-3+(-8)=-11$, then $-11+5=-6$.',
                  math: String.raw`-11+5=-6`,
                },
                {
                  text: 'The result is negative, so the expression is worth $-6$. No rounding is needed.',
                },
              ],
              answer: String.raw`$-3+4\times(-2)-(-5)=-6$.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Treating $-5^2$ and $(-5)^2$ as the same expression.',
              correction:
                '$(-5)^2=25$, but $-5^2=-(5^2)=-25$. The bracket decides whether the minus sign is also squared.',
            },
            {
              mistake: 'Thinking $-8$ is larger than $-3$ because $8$ is larger than $3$.',
              correction:
                'On the number line $-8$ lies to the left of $-3$, so $-8<-3$. Compare positions, not just the digits.',
            },
            {
              mistake: 'Changing two signs at once when subtracting a negative.',
              correction:
                'Do one change at a time: $4-(-6)=4+6=10$. Subtracting a negative always makes the result larger.',
            },
          ],
          exercises: [
            {
              id: 'g7-integers-ex-1',
              type: 'multiple-choice',
              prompt: 'Which temperature is colder: $-7$ °C or $-2$ °C?',
              options: ['$-7$ °C', '$-2$ °C', 'They are equally cold', 'It cannot be decided'],
              correctOption: 0,
              explanation:
                'On a vertical number line, $-7$ is below $-2$. A more negative number is colder, so $-7$ °C is the colder temperature.',
              difficulty: 'easy',
            },
            {
              id: 'g7-integers-ex-2',
              type: 'multiple-choice',
              prompt: 'What is $|-9|$?',
              options: ['$-9$', '$0$', '$9$', '$81$'],
              correctOption: 2,
              explanation:
                'Absolute value is distance from zero. The point at $-9$ is 9 units from zero, so $|-9|=9$. Distance is never negative.',
              difficulty: 'easy',
            },
            {
              id: 'g7-integers-ex-3',
              type: 'numeric',
              prompt: 'Work out $-5+12$.',
              answer: 7,
              tolerance: 0.01,
              explanation:
                'The signs differ, so subtract the smaller absolute value from the larger: $12-5=7$. The positive number has the larger absolute value, so the answer is positive.',
              difficulty: 'easy',
            },
            {
              id: 'g7-integers-ex-4',
              type: 'numeric',
              prompt: 'The temperature changes from 3 °C to $-8$ °C. What is the change in temperature?',
              answer: -11,
              tolerance: 0.01,
              answerUnit: '°C',
              hint: 'Change equals final value minus starting value.',
              explanation:
                'Change $=$ final $-$ initial $=-8-3=-11$. The negative sign means the temperature fell by 11 °C.',
              difficulty: 'medium',
            },
            {
              id: 'g7-integers-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`Evaluate $-2+3\times(-4)-(-6)$.`,
              options: ['$-8$', '$-20$', '$4$', '$16$'],
              correctOption: 0,
              hint: 'Multiply before adding or subtracting.',
              explanation:
                String.raw`Multiply first: $3\times(-4)=-12$. Then $-2+(-12)-(-6)=-14+6=-8$.`,
              difficulty: 'hard',
            },
            {
              id: 'g7-integers-ex-6',
              type: 'numeric',
              prompt: 'How far apart are $-6$ and $4$ on a number line?',
              answer: 10,
              tolerance: 0.01,
              answerUnit: 'units',
              explanation:
                'Distance is $|4-(-6)|=|10|=10$. The order does not matter: $|-6-4|=10$ as well.',
              difficulty: 'hard',
            },
          ],
          related: ['rational-numbers', 'algebraic-expressions', 'linear-equations-one-variable'],
        },
        {
          id: 'rational-numbers',
          title: 'Rational Numbers',
          subtitle: 'Fractions and decimals, ordering them, and all four operations.',
          introduction:
            'A pizza cut into eight equal slices, a measuring cup marked in quarters and a price tag of $2.50 all describe parts of a whole. Rational numbers are numbers that can be written as a fraction of two integers. Fractions and decimals are two ways of writing the same value, and choosing the right form makes a calculation easier.',
          prerequisites: [
            'Equivalent fractions',
            'Mixed numbers and improper fractions',
            'Decimal place value',
            'Multiplication and division facts',
          ],
          keyIdeas: [
            String.raw`A rational number can be written as $\frac{a}{b}$ with integers $a$ and $b$ and $b\ne0$.`,
            'Multiplying or dividing the numerator and denominator by the same nonzero number gives an equivalent fraction.',
            'To add or subtract fractions, the parts must be the same size, so use a common denominator.',
            'Dividing by a fraction is the same as multiplying by its reciprocal.',
          ],
          aliases: ['fractions', 'decimals', 'fraction operations', 'equivalent fractions', 'rational numbers'],
          theory: [
            {
              title: 'One number, many names',
              body: [
                String.raw`A rational number is any number that can be written in the form $\frac{a}{b}$, where $a$ and $b$ are integers and $b$ is not zero. The integer $7$ is rational because it equals $\frac{7}{1}$. The decimal $0.5$ is rational because it equals $\frac{1}{2}$.`,
                String.raw`Equivalent fractions name the same point on the number line. $\frac{3}{4}$ and $\frac{6}{8}$ describe the same amount because both the number of parts and the size of each part have doubled. Simplifying does the reverse: $\frac{6}{8}=\frac{3}{4}$ after dividing both parts by $2$.`,
              ],
              bullets: [
                String.raw`Terminating decimals, such as $0.25$, can be written as fractions: $0.25=\frac{1}{4}$.`,
                String.raw`Repeating decimals are rational too: $0.333\ldots=\frac{1}{3}$.`,
                'A fraction is in simplest form when the only common factor of the numerator and denominator is 1.',
              ],
            },
            {
              title: 'Ordering rational numbers',
              body: [
                String.raw`To compare fractions, give them a common denominator or convert them to decimals. $\frac{2}{3}$ and $\frac{3}{5}$ become $\frac{10}{15}$ and $\frac{9}{15}$, so $\frac{2}{3}$ is larger. As decimals, $0.666\ldots>0.6$, which confirms the result.`,
                String.raw`Negative fractions follow the same number-line order as negative integers. $-\frac{3}{4}$ lies to the left of $-\frac{1}{4}$, so $-\frac{3}{4}<-\frac{1}{4}$. A larger denominator does not automatically mean a larger fraction: $\frac{1}{8}$ is smaller than $\frac{1}{3}$ because eighths are smaller pieces than thirds.`,
              ],
            },
            {
              title: 'Adding and subtracting fractions',
              body: [
                String.raw`You can only add or subtract parts that are the same size. $\frac{1}{2}+\frac{1}{3}$ cannot become $\frac{2}{5}$, because halves and thirds are different-sized pieces. Rewrite both fractions with a common denominator: $\frac{3}{6}+\frac{2}{6}=\frac{5}{6}$.`,
                'The denominator tells you the size of the parts and the numerator tells you how many parts there are. When the denominators match, add or subtract only the numerators and keep the denominator. Mixed numbers can be changed to improper fractions before calculating, especially when subtracting.',
              ],
              bullets: [
                'Find the least common denominator to keep the numbers manageable.',
                String.raw`$\frac{a}{b}+\frac{c}{b}=\frac{a+c}{b}$ when $b\ne0$.`,
                String.raw`Estimate first: $\frac{3}{4}+\frac{5}{6}$ should be a little more than $1.5$.`,
              ],
            },
            {
              title: 'Multiplying and dividing fractions',
              body: [
                String.raw`Multiplying fractions is direct: multiply the numerators and multiply the denominators. $\frac{2}{3}\times\frac{4}{5}=\frac{8}{15}$. The answer is smaller than both fractions because you are taking a part of a part.`,
                String.raw`Dividing asks how many of one size fit into another. Dividing by $\frac{3}{4}$ is the same as multiplying by $\frac{4}{3}$, its reciprocal. This works because multiplying by the reciprocal undoes the division, just as multiplying by $4$ undoes dividing by $4$.`,
              ],
              bullets: [
                String.raw`$\frac{a}{b}\times\frac{c}{d}=\frac{ac}{bd}$`,
                String.raw`$\frac{a}{b}\div\frac{c}{d}=\frac{a}{b}\times\frac{d}{c}$ with $c\ne0$`,
                'Simplify before multiplying when you can; the final value is unchanged.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-rational-equivalent',
              title: 'Equivalent fractions',
              expression: String.raw`\frac{a}{b}=\frac{a\times k}{b\times k}`,
              description:
                'Multiplying the numerator and denominator by the same nonzero number produces a fraction with the same value.',
              spoken: 'a over b equals a times k over b times k.',
              variables: [
                { symbol: 'a', name: 'numerator' },
                { symbol: 'b', name: 'denominator', note: 'must not be zero' },
                { symbol: 'k', name: 'nonzero scale factor', note: 'must not be zero' },
              ],
              conditions: [String.raw`$b\ne0$ and $k\ne0$.`],
              notes: 'Dividing top and bottom by the same factor also gives an equivalent fraction; this is called simplifying.',
              tags: ['equivalent fractions', 'simplifying', 'fractions', 'proportion'],
            },
            {
              id: 'g7-rational-add',
              title: 'Adding or subtracting fractions',
              expression: String.raw`\frac{a}{b}\pm\frac{c}{d}=\frac{ad\pm bc}{bd}`,
              description:
                'Rewrite both fractions with the common denominator $bd$, then add or subtract the new numerators.',
              spoken: 'a over b plus or minus c over d equals a d plus or minus b c, all over b d.',
              variables: [
                { symbol: 'a', name: 'numerator of the first fraction' },
                { symbol: 'b', name: 'denominator of the first fraction', note: 'must not be zero' },
                { symbol: 'c', name: 'numerator of the second fraction' },
                { symbol: 'd', name: 'denominator of the second fraction', note: 'must not be zero' },
              ],
              conditions: [String.raw`$b\ne0$ and $d\ne0$.`],
              notes: 'The least common denominator often keeps the arithmetic smaller, but the formula works with any common denominator.',
              tags: ['adding fractions', 'subtracting fractions', 'common denominator', 'fractions'],
            },
            {
              id: 'g7-rational-multiply',
              title: 'Multiplying fractions',
              expression: String.raw`\frac{a}{b}\times\frac{c}{d}=\frac{ac}{bd}`,
              description:
                'To multiply fractions, multiply the numerators together and multiply the denominators together.',
              spoken: 'a over b times c over d equals a c over b d.',
              variables: [
                { symbol: 'a', name: 'numerator of the first fraction' },
                { symbol: 'b', name: 'denominator of the first fraction', note: 'must not be zero' },
                { symbol: 'c', name: 'numerator of the second fraction' },
                { symbol: 'd', name: 'denominator of the second fraction', note: 'must not be zero' },
              ],
              conditions: [String.raw`$b\ne0$ and $d\ne0$.`],
              notes: 'You do not need a common denominator to multiply. Simplify the result if possible.',
              tags: ['multiplying fractions', 'fractions', 'product', 'numerator'],
            },
            {
              id: 'g7-rational-divide',
              title: 'Dividing fractions',
              expression: String.raw`\frac{a}{b}\div\frac{c}{d}=\frac{a}{b}\times\frac{d}{c}=\frac{ad}{bc}`,
              description:
                'Dividing by a fraction is the same as multiplying by its reciprocal, which is the fraction turned upside down.',
              spoken: 'a over b divided by c over d equals a over b times d over c, which equals a d over b c.',
              variables: [
                { symbol: 'a', name: 'numerator of the dividend' },
                { symbol: 'b', name: 'denominator of the dividend', note: 'must not be zero' },
                { symbol: 'c', name: 'numerator of the divisor', note: 'must not be zero' },
                { symbol: 'd', name: 'denominator of the divisor', note: 'must not be zero' },
              ],
              conditions: [String.raw`$b\ne0$, $c\ne0$ and $d\ne0$; you cannot divide by zero.`],
              notes: 'Keep the first fraction, change the division to multiplication, and flip the second fraction.',
              tags: ['dividing fractions', 'reciprocal', 'fractions', 'quotient'],
            },
          ],
          examples: [
            {
              title: 'Adding fractions with different denominators',
              problem: String.raw`Work out $\frac{3}{4}+\frac{5}{6}$ and give the answer as a mixed number.`,
              given: [
                String.raw`First fraction: $\frac{3}{4}$`,
                String.raw`Second fraction: $\frac{5}{6}$`,
                'The denominators are different, so the parts are different sizes.',
              ],
              steps: [
                {
                  text: 'Find a common denominator. The smallest number divisible by both $4$ and $6$ is $12$.',
                  math: String.raw`\frac{3}{4}=\frac{3\times3}{4\times3}=\frac{9}{12},\qquad \frac{5}{6}=\frac{5\times2}{6\times2}=\frac{10}{12}`,
                },
                {
                  text: 'The parts are now twelfths, so add the numerators and keep the denominator.',
                  math: String.raw`\frac{9}{12}+\frac{10}{12}=\frac{19}{12}`,
                },
                {
                  text: 'Write the improper fraction as a mixed number. Twelves fit into nineteen once, with $7$ left over.',
                  math: String.raw`\frac{19}{12}=1\frac{7}{12}`,
                },
                {
                  text: String.raw`Check with decimals. $0.75+0.833\ldots=1.583\ldots$, which matches $1\frac{7}{12}\approx1.58$. The estimate was a little more than $1.5$, so the answer is reasonable.`,
                  math: String.raw`1\frac{7}{12}\approx1.58`,
                },
              ],
              answer:
                String.raw`The sum is $\frac{19}{12}$, or $1\frac{7}{12}$, which is approximately 1.58.`,
            },
            {
              title: 'Dividing by a fraction',
              problem: String.raw`How many $\frac{3}{4}$-cup portions are in $2\frac{1}{2}$ cups of yoghurt?`,
              given: [
                String.raw`Total amount: $2\frac{1}{2}$ cups`,
                String.raw`Size of one portion: $\frac{3}{4}$ cup`,
                'The number of portions is the total divided by the portion size.',
              ],
              steps: [
                {
                  text: 'Change the mixed number to an improper fraction so it is easier to calculate with.',
                  math: String.raw`2\frac{1}{2}=\frac{5}{2}`,
                },
                {
                  text: String.raw`Dividing by $\frac{3}{4}$ is the same as multiplying by its reciprocal, $\frac{4}{3}$.`,
                  math: String.raw`\frac{5}{2}\div\frac{3}{4}=\frac{5}{2}\times\frac{4}{3}`,
                },
                {
                  text: 'Multiply the numerators and the denominators.',
                  math: String.raw`\frac{5\times4}{2\times3}=\frac{20}{6}`,
                },
                {
                  text: 'Simplify by dividing the numerator and denominator by $2$.',
                  math: String.raw`\frac{20}{6}=\frac{10}{3}`,
                },
                {
                  text: 'Write the result as a mixed number. Three thirds fit into ten three times, with one third left over, so the answer is about $3.33$.',
                  math: String.raw`\frac{10}{3}=3\frac{1}{3}\approx3.33`,
                },
              ],
              answer:
                String.raw`There are $3\frac{1}{3}$ portions of $\frac{3}{4}$ cup in $2\frac{1}{2}$ cups. The exact answer is $\frac{10}{3}=3\frac{1}{3}$ portions.`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Adding fractions by adding the numerators and the denominators: $\frac{1}{2}+\frac{1}{3}=\frac{2}{5}$.`,
              correction:
                String.raw`The parts must be the same size first. $\frac{1}{2}+\frac{1}{3}=\frac{3}{6}+\frac{2}{6}=\frac{5}{6}$. The answer $\frac{2}{5}$ is smaller than $\frac{1}{2}$, which cannot be right.`,
            },
            {
              mistake: 'Flipping the first fraction when dividing, or flipping a fraction when multiplying.',
              correction:
                String.raw`Only division uses a reciprocal, and only the second fraction is flipped: $\frac{2}{3}\div\frac{4}{5}=\frac{2}{3}\times\frac{5}{4}$. Multiplication is done straight across.`,
            },
            {
              mistake: 'Assuming a fraction with a larger denominator is larger.',
              correction:
                String.raw`A larger denominator means smaller pieces. $\frac{1}{8}<\frac{1}{3}$ because one eighth is smaller than one third. Compare fractions with a common denominator or as decimals.`,
            },
          ],
          exercises: [
            {
              id: 'g7-rational-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`Which fraction is equivalent to $\frac{6}{8}$?`,
              options: [String.raw`$\frac{3}{4}$`, String.raw`$\frac{6}{4}$`, String.raw`$\frac{4}{6}$`, String.raw`$\frac{12}{8}$`],
              correctOption: 0,
              explanation:
                String.raw`Divide the numerator and denominator by their common factor $2$: $\frac{6\div2}{8\div2}=\frac{3}{4}$. The value is unchanged because both parts were divided by the same number.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-rational-ex-2',
              type: 'multiple-choice',
              prompt: 'Which value is the largest?',
              options: [String.raw`$\frac{3}{5}$`, '$0.55$', String.raw`$\frac{7}{12}$`, String.raw`$\frac{5}{9}$`],
              correctOption: 0,
              hint: 'Convert each value to a decimal, or use a common denominator.',
              explanation:
                String.raw`As decimals: $\frac{3}{5}=0.6$, $0.55=0.55$, $\frac{7}{12}\approx0.583$ and $\frac{5}{9}\approx0.556$. The largest is $0.6$, so $\frac{3}{5}$ is largest.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-rational-ex-3',
              type: 'numeric',
              prompt: String.raw`Work out $\frac{2}{3}+\frac{1}{4}$. Give your answer as a decimal rounded to two decimal places.`,
              answer: 0.92,
              tolerance: 0.005,
              explanation:
                String.raw`Use the common denominator $12$: $\frac{8}{12}+\frac{3}{12}=\frac{11}{12}$. Then $11\div12=0.9166\ldots$, which rounds to $0.92$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-rational-ex-4',
              type: 'numeric',
              prompt: String.raw`Work out $\frac{3}{5}\div\frac{9}{10}$. Give your answer as a decimal rounded to two decimal places.`,
              answer: 0.67,
              tolerance: 0.005,
              hint: 'Multiply by the reciprocal of the second fraction.',
              explanation:
                String.raw`$\frac{3}{5}\div\frac{9}{10}=\frac{3}{5}\times\frac{10}{9}=\frac{30}{45}=\frac{2}{3}$. Then $2\div3=0.666\ldots$, which rounds to $0.67$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-rational-ex-5',
              type: 'numeric',
              prompt:
                String.raw`A recipe uses $\frac{3}{4}$ cup of sugar for one batch. How many cups are needed for $2\frac{1}{2}$ batches? Round to two decimal places.`,
              answer: 1.88,
              tolerance: 0.01,
              answerUnit: 'cups',
              explanation:
                String.raw`Multiply: $\frac{3}{4}\times2\frac{1}{2}=\frac{3}{4}\times\frac{5}{2}=\frac{15}{8}=1.875$ cups, which rounds to 1.88 cups.`,
              difficulty: 'hard',
            },
            {
              id: 'g7-rational-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`Which fraction lies between $\frac{1}{3}$ and $\frac{1}{2}$?`,
              options: [String.raw`$\frac{2}{5}$`, String.raw`$\frac{1}{4}$`, String.raw`$\frac{3}{5}$`, String.raw`$\frac{7}{12}$`],
              correctOption: 0,
              explanation:
                String.raw`As decimals, $\frac{1}{3}\approx0.333$ and $\frac{1}{2}=0.5$. Also $\frac{2}{5}=0.4$, which is between them. $\frac{1}{4}=0.25$ is too small, while $\frac{3}{5}=0.6$ and $\frac{7}{12}\approx0.583$ are too large.`,
              difficulty: 'hard',
            },
          ],
          related: ['integers', 'ratios-and-proportions', 'linear-equations-one-variable'],
        },
        {
          id: 'exponents-and-powers',
          title: 'Exponents and Powers',
          subtitle: 'Repeated multiplication, the index laws, and powers of ten.',
          introduction:
            String.raw`A square with side 5 cm has area $5\times5=25$ cm². Writing $5^2$ is shorter and shows the structure: two factors of 5. Powers appear in area, volume, computer storage and scientific measurement. Learning the index laws lets you combine large products without writing every factor.`,
          prerequisites: [
            'Multiplication facts',
            'Area of a square',
            'Place value and powers of ten',
            'Order of operations',
          ],
          keyIdeas: [
            'In $a^n$, the base $a$ is the repeated factor and the exponent $n$ counts how many times it is used.',
            'When multiplying powers with the same base, add the exponents.',
            'When dividing powers with the same base, subtract the exponents.',
            'A power raised to a power multiplies the exponents.',
          ],
          aliases: ['powers', 'indices', 'exponent laws', 'index laws', 'squared and cubed'],
          theory: [
            {
              title: 'A power is repeated multiplication',
              body: [
                String.raw`In the expression $2^5$, the number $2$ is the base and $5$ is the exponent. It means $2\times2\times2\times2\times2$, which equals $32$. The exponent counts the factors; it does not mean that you multiply the base by the exponent.`,
                'Some powers have everyday names. $5^2$ is read as “five squared” because it gives the area of a square with side 5. $2^3$ is read as “two cubed” because it gives the volume of a cube with edge 2. Squares and cubes connect powers to geometry.',
              ],
              bullets: [
                '$a^1=a$ for every number $a$.',
                String.raw`$a^2=a\times a$ is the square of $a$.`,
                String.raw`$a^3=a\times a\times a$ is the cube of $a$.`,
                'In $a^n$, the base is $a$ and the exponent is $n$.',
              ],
            },
            {
              title: 'The index laws come from counting factors',
              body: [
                String.raw`To multiply $2^3$ by $2^4$, write out the factors: $(2\times2\times2)\times(2\times2\times2\times2)$. There are $3+4=7$ factors of 2, so the product is $2^7$. This is why the exponents add when the bases match.`,
                String.raw`Division cancels matching factors. $2^7\div2^5$ has seven factors of 2 on top and five below; five pairs cancel, leaving $2^2$. The exponents subtract. A power of a power repeats a group: $(2^3)^4$ contains four groups of three factors, so there are $3\times4=12$ factors in total.`,
              ],
              bullets: [
                String.raw`$a^m\times a^n=a^{m+n}$`,
                String.raw`$a^m\div a^n=a^{m-n}$ when $m>n$`,
                '$(a^m)^n=a^{mn}$',
                'The laws only combine powers with the same base.',
              ],
            },
            {
              title: 'Zero exponents and powers of ten',
              body: [
                String.raw`Look at the pattern $10^3=1000$, $10^2=100$, $10^1=10$. Each step divides by 10. Continuing the pattern gives $10^0=1$. The same reasoning works for any nonzero base, so $a^0=1$ when $a\ne0$. The expression $0^0$ is undefined.`,
                'Powers of ten make place value visible. $10^1=10$, $10^2=100$, $10^3=1000$, and so on. The exponent records the number of zeros in the whole-number value. This pattern is the foundation for scientific notation in Grade 8.',
              ],
            },
            {
              title: 'Negative bases and brackets',
              body: [
                String.raw`The brackets in $(-2)^4$ include the minus sign in the repeated factor: $(-2)\times(-2)\times(-2)\times(-2)=16$. An even number of negative factors gives a positive result. An odd number gives a negative result, so $(-2)^3=-8$.`,
                'Without brackets, $-2^4$ means the negative of $2^4$, which is $-16$. The bracket controls whether the minus sign is part of the base. Read carefully before you calculate.',
              ],
              bullets: [
                '$(-a)^{2}=a^2$ for any positive $a$.',
                '$(-a)^{3}=-a^3$ for any positive $a$.',
                String.raw`$-a^2=-(a^2)$, which is negative when $a\ne0$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-exponents-product',
              title: 'Product law for powers',
              expression: String.raw`a^m\times a^n=a^{m+n}`,
              description:
                'When two powers have the same base, multiply them by keeping the base and adding the exponents.',
              spoken: 'a to the m times a to the n equals a to the m plus n.',
              variables: [
                { symbol: 'a', name: 'base', note: 'the repeated factor' },
                { symbol: 'm', name: 'first exponent', note: 'a positive integer' },
                { symbol: 'n', name: 'second exponent', note: 'a positive integer' },
              ],
              conditions: ['$m$ and $n$ are positive integers.', String.raw`The bases must be the same; $2^3\times5^4$ cannot be combined this way.`],
              notes: String.raw`For example, $3^2\times3^5=3^7$.`,
              tags: ['index laws', 'product law', 'exponents', 'powers'],
            },
            {
              id: 'g7-exponents-quotient',
              title: 'Quotient law for powers',
              expression: String.raw`a^m\div a^n=a^{m-n}`,
              description:
                'When two powers with the same base are divided, keep the base and subtract the exponent of the divisor from the exponent of the dividend.',
              spoken: 'a to the m divided by a to the n equals a to the m minus n.',
              variables: [
                { symbol: 'a', name: 'base', note: 'must not be zero' },
                { symbol: 'm', name: 'exponent of the dividend', note: 'positive integer' },
                { symbol: 'n', name: 'exponent of the divisor', note: 'positive integer, with $m>n$' },
              ],
              conditions: [String.raw`$a\ne0$.`, '$m>n$ so the answer stays a positive power in this grade.'],
              notes: 'If $m=n$, the result is $a^0=1$.',
              tags: ['index laws', 'quotient law', 'exponents', 'division'],
            },
            {
              id: 'g7-exponents-power',
              title: 'Power of a power',
              expression: String.raw`(a^m)^n=a^{mn}`,
              description:
                'A power raised to another power keeps the base and multiplies the two exponents.',
              spoken: 'Open bracket, a to the m, close bracket, to the n, equals a to the m n.',
              variables: [
                { symbol: 'a', name: 'base' },
                { symbol: 'm', name: 'inner exponent', note: 'positive integer' },
                { symbol: 'n', name: 'outer exponent', note: 'positive integer' },
              ],
              conditions: ['$m$ and $n$ are positive integers.'],
              notes: '$(2^3)^4=2^{12}$, not $2^7$. Count the factors: four groups of three.',
              tags: ['power of a power', 'index laws', 'exponents', 'brackets'],
            },
            {
              id: 'g7-exponents-zero',
              title: 'Zero exponent',
              expression: String.raw`a^0=1`,
              description:
                'Any nonzero number raised to the power zero equals one, continuing the pattern of dividing by the base.',
              spoken: 'a to the zero equals one, for a not equal to zero.',
              variables: [
                { symbol: 'a', name: 'base', note: 'must not be zero' },
              ],
              conditions: [String.raw`$a\ne0$.`, '$0^0$ is undefined, not 1.'],
              notes: 'The pattern $10^3,10^2,10^1,10^0$ is $1000,100,10,1$: each value is divided by 10.',
              tags: ['zero exponent', 'index laws', 'powers', 'place value'],
            },
          ],
          examples: [
            {
              title: 'Combining the product and quotient laws',
              problem: String.raw`Simplify $(2^3\times2^4)\div2^5$, then evaluate the result.`,
              given: [
                String.raw`The expression $(2^3\times2^4)\div2^5$`,
                'All three powers have base $2$.',
              ],
              steps: [
                {
                  text: 'Use the product law to combine the factors in the numerator. The bases match, so add the exponents.',
                  math: String.raw`2^3\times2^4=2^{3+4}=2^7`,
                },
                {
                  text: 'Write the division with the single power.',
                  math: String.raw`2^7\div2^5`,
                },
                {
                  text: 'Use the quotient law. Subtract the exponents because matching factors cancel.',
                  math: String.raw`2^7\div2^5=2^{7-5}=2^2`,
                },
                {
                  text: 'Evaluate the remaining power.',
                  math: String.raw`2^2=4`,
                },
                {
                  text: String.raw`Check by expanding: $2^3=8$, $2^4=16$ and $2^5=32$. Then $(8\times16)\div32=128\div32=4$.`,
                  math: String.raw`(8\times16)\div32=128\div32=4`,
                },
              ],
              answer: 'The expression simplifies to $2^2=4$.',
            },
            {
              title: 'A power raised to a power',
              problem: 'Evaluate $(3^2)^3$ using the power law, then check by expanding.',
              given: [
                'The expression $(3^2)^3$',
                'The base is $3$; the inner exponent is $2$ and the outer exponent is $3$.',
              ],
              steps: [
                {
                  text: 'Use the power law. A power of a power multiplies the exponents because each outer step repeats the inner group.',
                  math: String.raw`(3^2)^3=3^{2\times3}=3^6`,
                },
                {
                  text: 'Evaluate $3^6$ in stages. $3^3=27$, so pair the six factors into two groups of three.',
                  math: String.raw`3^6=3^3\times3^3=27\times27`,
                },
                {
                  text: 'Multiply the two groups.',
                  math: String.raw`27\times27=729`,
                },
                {
                  text: String.raw`Check directly: $3^2=9$, and $9^3=9\times9\times9=729$. Both methods agree.`,
                  math: String.raw`9^3=729`,
                },
              ],
              answer: '$(3^2)^3=3^6=729$.',
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Multiplying the exponents when the bases are multiplied: $2^3\times2^4=2^{12}$.`,
              correction:
                String.raw`The exponents add when the bases match: $2^3\times2^4=2^{3+4}=2^7$. Multiplying the exponents is the rule for a power of a power.`,
            },
            {
              mistake: 'Adding the exponents in $(2^3)^4$ and getting $2^7$.',
              correction:
                String.raw`$(2^3)^4$ means four groups of three factors, so there are $3\times4=12$ factors: $(2^3)^4=2^{12}$.`,
            },
            {
              mistake: 'Writing $-3^2=9$ because the minus sign is “squared”.',
              correction:
                'Without brackets, the exponent applies only to $3$: $-3^2=-(3^2)=-9$. To square the negative number itself, write $(-3)^2=9$.',
            },
          ],
          exercises: [
            {
              id: 'g7-exponents-ex-1',
              type: 'multiple-choice',
              prompt: 'What is $5^3$?',
              options: ['$15$', '$125$', '$243$', '$25$'],
              correctOption: 1,
              explanation:
                String.raw`$5^3$ means $5\times5\times5$. First $5\times5=25$, then $25\times5=125$. It is not $5\times3=15$.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-exponents-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Write $2^4\times2^3$ as a single power.`,
              options: ['$2^7$', '$2^{12}$', '$4^7$', '$2^1$'],
              correctOption: 0,
              explanation:
                String.raw`The bases are both $2$, so add the exponents: $4+3=7$. Therefore $2^4\times2^3=2^7$.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-exponents-ex-3',
              type: 'numeric',
              prompt: 'Evaluate $10^4$.',
              answer: 10000,
              tolerance: 0.01,
              explanation:
                String.raw`$10^4$ means four factors of 10: $10\times10\times10\times10=10000$. The exponent $4$ matches the four zeros.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-exponents-ex-4',
              type: 'numeric',
              prompt: 'Evaluate $(4^2)^2$.',
              answer: 256,
              tolerance: 0.01,
              hint: 'Multiply the exponents first.',
              explanation:
                String.raw`$(4^2)^2=4^{2\times2}=4^4$. Then $4^4=4\times4\times4\times4=256$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-exponents-ex-5',
              type: 'multiple-choice',
              prompt: String.raw`Simplify $6^5\div6^2$.`,
              options: ['$6^3$', '$6^7$', '$1^3$', '$6^{10}$'],
              correctOption: 0,
              explanation:
                String.raw`The bases match, so subtract the exponents: $5-2=3$. Therefore $6^5\div6^2=6^3$. The base does not change.`,
              difficulty: 'hard',
            },
            {
              id: 'g7-exponents-ex-6',
              type: 'numeric',
              prompt: String.raw`Evaluate $(2^5\times2^2)\div2^4$.`,
              answer: 8,
              tolerance: 0.01,
              hint: 'Combine the numerator first, then subtract the exponent of the divisor.',
              explanation:
                String.raw`$2^5\times2^2=2^7$, then $2^7\div2^4=2^3$. Finally $2^3=8$. Expanding gives $(32\times4)\div16=128\div16=8$.`,
              difficulty: 'hard',
            },
          ],
          related: ['integers', 'algebraic-expressions', 'prisms-and-cubes'],
        },
        {
          id: 'ratios-and-proportions',
          title: 'Ratios and Proportions',
          subtitle: 'Comparing quantities, unit rates and solving proportions.',
          introduction:
            'A recipe mixes squash and water, a map shrinks a whole town onto one page, and a shop compares two pack sizes. Ratios describe how quantities compare, while rates compare quantities with different units. Proportional reasoning lets you scale a comparison up or down without changing its meaning.',
          prerequisites: [
            'Multiplication and division facts',
            'Equivalent fractions',
            'Simplifying fractions',
            'Metric units of length and mass',
          ],
          keyIdeas: [
            String.raw`A ratio compares two quantities by division and can be written $a:b$ or $\frac{a}{b}$.`,
            'Multiplying or dividing every part of a ratio by the same nonzero number gives an equivalent ratio.',
            'A unit rate tells you how much corresponds to one unit of the second quantity.',
            'In a true proportion, cross products are equal.',
          ],
          aliases: ['ratios', 'rates', 'unit rate', 'proportion', 'scale drawing', 'direct proportion'],
          theory: [
            {
              title: 'Ratios compare quantities',
              body: [
                'A ratio compares two quantities of the same kind. If a paint mix uses 3 parts blue to 4 parts yellow, the ratio is $3:4$. The order matters: $4:3$ describes a different mix. Ratios can be scaled by multiplying both parts by the same number, because the relative sizes stay the same.',
                String.raw`A part-to-part ratio compares one part with another. A part-to-whole ratio compares one part with the total. In the paint mix, blue is $\frac{3}{7}$ of the whole mixture, not $\frac{3}{4}$. Adding the parts gives the whole: $3+4=7$.`,
              ],
              bullets: [
                '$3:4$ means 3 of one quantity for every 4 of the other.',
                'Simplest form divides all parts by their common factor.',
                'The parts of a ratio can be added to find the whole.',
              ],
            },
            {
              title: 'Sharing in a given ratio',
              body: [
                String.raw`To share an amount in a ratio, first count the total number of parts. Sharing $450$ g in the ratio $2:3$ gives $2+3=5$ equal parts, so each part is $450\div5=90$ g. The shares are $2\times90=180$ g and $3\times90=270$ g.`,
                'Check that the shares add back to the original amount and that their ratio simplifies correctly. $180:270$ divides by 90 to give $2:3$, and $180+270=450$. Both checks catch most mistakes.',
              ],
            },
            {
              title: 'Rates and unit rates',
              body: [
                String.raw`A rate compares quantities with different units, such as kilometres per hour, dollars per kilogram or words per minute. A unit rate rewrites the comparison so the second quantity is 1. Travelling 180 km in 3 hours gives $180\div3=60$ km per hour.`,
                'Unit rates make comparisons fair. If 6 apples cost $4.50, each apple costs $0.75. If 10 apples cost $7.00, each costs $0.70. The larger pack is better value per apple, even though its total price is higher.',
              ],
            },
            {
              title: 'Proportions and scale drawings',
              body: [
                String.raw`A proportion states that two ratios are equal: $\frac{3}{4}=\frac{12}{16}$. Cross multiplication multiplies the numerator of one fraction by the denominator of the other: $3\times16=4\times12=48$. If the cross products match, the proportion is true.`,
                String.raw`Scale drawings use proportions. A scale of $1$ cm to $5$ km means every centimetre on the map represents 5 km in real life. A distance of $7.5$ cm represents $7.5\times5=37.5$ km.`,
              ],
              bullets: [
                'Set up the proportion with matching units in the same positions.',
                'Cross multiply to turn the proportion into an equation.',
                'Check that the answer is sensible for the context.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-ratios-fraction',
              title: 'Ratio as a fraction',
              expression: String.raw`a:b=\frac{a}{b}`,
              description:
                String.raw`A ratio of $a$ to $b$ can be written as the fraction $\frac{a}{b}$, which compares the first quantity to the second.`,
              spoken: 'The ratio a to b equals a over b.',
              variables: [
                { symbol: 'a', name: 'first quantity' },
                { symbol: 'b', name: 'second quantity', note: 'must not be zero' },
              ],
              conditions: [String.raw`$b\ne0$; a ratio cannot compare with zero parts in the denominator.`],
              notes: String.raw`This is a part-to-part comparison. The first quantity as a fraction of the whole is $\frac{a}{a+b}$.`,
              tags: ['ratio', 'fraction', 'comparison', 'part to part'],
            },
            {
              id: 'g7-ratios-equivalent',
              title: 'Equivalent ratios',
              expression: String.raw`a:b=ka:kb`,
              description:
                'Multiplying every part of a ratio by the same nonzero number produces an equivalent ratio.',
              spoken: 'The ratio a to b equals k a to k b.',
              variables: [
                { symbol: 'a', name: 'first part of the ratio' },
                { symbol: 'b', name: 'second part of the ratio' },
                { symbol: 'k', name: 'scale factor', note: 'must be positive' },
              ],
              conditions: ['$k>0$; multiplying by zero would destroy the comparison.'],
              notes: 'Dividing every part by the same number also gives an equivalent ratio, which is how you simplify.',
              tags: ['equivalent ratios', 'scale factor', 'simplifying ratios', 'proportion'],
            },
            {
              id: 'g7-ratios-unit-rate',
              title: 'Unit rate',
              expression: String.raw`\text{unit rate}=\frac{\text{amount}}{\text{quantity}}`,
              description:
                'A unit rate is the amount that corresponds to one unit of the second quantity.',
              spoken: 'The unit rate equals the amount divided by the quantity.',
              variables: [
                { symbol: 'amount', name: 'total amount or cost' },
                { symbol: 'quantity', name: 'number of units', note: 'must not be zero' },
              ],
              conditions: ['The quantity must be greater than zero.', 'The units of the answer are “amount units per quantity unit”, such as km/h or $/kg.'],
              notes: 'Unit rates make it easy to compare two offers or to predict a larger amount.',
              tags: ['unit rate', 'rate', 'speed', 'better buy'],
            },
            {
              id: 'g7-ratios-cross',
              title: 'Cross multiplication',
              expression: String.raw`\frac{a}{b}=\frac{c}{d}\;\Rightarrow\;ad=bc`,
              description:
                'If two ratios are equal, the product of the means equals the product of the extremes.',
              spoken: 'a over b equals c over d implies a d equals b c.',
              variables: [
                { symbol: 'a', name: 'numerator of the first ratio' },
                { symbol: 'b', name: 'denominator of the first ratio', note: 'must not be zero' },
                { symbol: 'c', name: 'numerator of the second ratio' },
                { symbol: 'd', name: 'denominator of the second ratio', note: 'must not be zero' },
              ],
              conditions: [String.raw`$b\ne0$ and $d\ne0$.`, 'The two ratios must use matching units in matching positions.'],
              notes: 'Divide after cross multiplying to isolate the unknown value.',
              tags: ['cross multiplication', 'proportion', 'solve proportion', 'scale'],
            },
          ],
          examples: [
            {
              title: 'Sharing an amount in a ratio',
              problem:
                'A recipe uses flour and sugar in the ratio $5:2$. If 350 g of flour is used, how much sugar is needed?',
              given: [
                'Ratio of flour to sugar: $5:2$',
                'Mass of flour: $350$ g',
                'The flour amount corresponds to 5 parts.',
              ],
              steps: [
                {
                  text: 'Set up a proportion with flour on top and sugar on the bottom in both ratios.',
                  math: String.raw`\frac{5}{2}=\frac{350}{s}`,
                },
                {
                  text: 'Cross multiply to remove the fractions.',
                  math: String.raw`5\times s=2\times350`,
                },
                {
                  text: 'Calculate the right-hand side.',
                  math: String.raw`5s=700`,
                },
                {
                  text: 'Divide both sides by 5 to find one part of sugar.',
                  math: String.raw`s=\frac{700}{5}=140`,
                },
                {
                  text: 'Check by simplifying the ratio $350:140$. Divide both parts by 70 to get $5:2$, which matches the recipe.',
                  math: String.raw`350:140=5:2`,
                },
              ],
              answer: '140 g of sugar is needed. The ratio $350:140$ simplifies to $5:2$, so the answer checks.',
            },
            {
              title: 'Using a unit rate',
              problem:
                'A train travels 180 km in 3 hours at a steady speed. How long will it take to travel 270 km at the same speed?',
              given: [
                'Distance in the first part of the journey: $180$ km',
                'Time for that distance: $3$ hours',
                'Distance in the second part: $270$ km',
              ],
              steps: [
                {
                  text: 'Find the unit rate by dividing distance by time.',
                  math: String.raw`\text{speed}=\frac{180\text{ km}}{3\text{ h}}=60\text{ km/h}`,
                },
                {
                  text: 'At a steady speed, time equals distance divided by speed.',
                  math: String.raw`t=\frac{270}{60}`,
                },
                {
                  text: 'Calculate the division.',
                  math: String.raw`t=4.5`,
                },
                {
                  text: String.raw`Check by multiplying back: $60\text{ km/h}\times4.5\text{ h}=270$ km, which matches the required distance.`,
                  math: String.raw`60\times4.5=270`,
                },
              ],
              answer: 'The journey takes 4.5 hours, or 4 hours 30 minutes.',
            },
          ],
          mistakes: [
            {
              mistake: 'Adding the same amount to both parts of a ratio, such as changing $3:4$ to $4:5$.',
              correction:
                'Adding changes the comparison. To keep the same ratio, multiply or divide both parts by the same number: $3:4=9:12$.',
            },
            {
              mistake: 'Treating a part-to-part ratio as a part-to-whole fraction.',
              correction:
                String.raw`For $3:4$, the whole has $3+4=7$ parts. The first part is $\frac{3}{7}$ of the whole, not $\frac{3}{4}$.`,
            },
            {
              mistake: 'Comparing two offers by total price only.',
              correction:
                'Compare unit prices. A $7.00 pack of 10 apples costs $0.70$ each, while a $4.50 pack of 6 costs $0.75$ each, so the 10-pack is better value.',
            },
          ],
          exercises: [
            {
              id: 'g7-ratios-ex-1',
              type: 'multiple-choice',
              prompt: 'Simplify the ratio $18:24$.',
              options: ['$3:4$', '$9:12$', '$2:3$', '$4:3$'],
              correctOption: 0,
              explanation:
                String.raw`Divide both parts by their greatest common factor, $6$: $18\div6=3$ and $24\div6=4$. The simplest form is $3:4$. The ratio $9:12$ is equivalent but not fully simplified.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-ratios-ex-2',
              type: 'multiple-choice',
              prompt: 'Which offer is better value per apple?',
              options: [
                '6 apples for $4.50',
                '10 apples for $7.00',
                'They cost the same per apple',
                'There is not enough information',
              ],
              correctOption: 1,
              explanation:
                String.raw`The first pack costs $4.50\div6=0.75$ per apple. The second costs $7.00\div10=0.70$ per apple. The 10-apple pack is cheaper per apple.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-ratios-ex-3',
              type: 'numeric',
              prompt:
                'On a map, the scale is 1 cm to 5 km. Two towns are 7.5 cm apart on the map. How far apart are they in real life?',
              answer: 37.5,
              tolerance: 0.01,
              answerUnit: 'km',
              explanation:
                String.raw`Each centimetre represents 5 km, so multiply: $7.5\times5=37.5$ km. The distance is 37.5 km.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-ratios-ex-4',
              type: 'numeric',
              prompt: 'Five pens cost $6.25. At the same rate, how much do 8 pens cost?',
              answer: 10,
              tolerance: 0.01,
              answerUnit: 'dollars',
              hint: 'Find the cost of one pen first.',
              explanation:
                String.raw`One pen costs $6.25\div5=1.25$. Eight pens cost $8\times1.25=10.00$, or $10.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-ratios-ex-5',
              type: 'numeric',
              prompt:
                'Flour and sugar are mixed in the ratio $2:3$. If the mixture has a mass of 450 g, how many grams of flour are in it?',
              answer: 180,
              tolerance: 0.01,
              answerUnit: 'g',
              hint: 'There are $2+3=5$ equal parts in total.',
              explanation:
                String.raw`The total is $2+3=5$ parts. Each part is $450\div5=90$ g. Flour is 2 parts, so $2\times90=180$ g. Check: sugar is $3\times90=270$ g, and $180+270=450$.`,
              difficulty: 'hard',
            },
            {
              id: 'g7-ratios-ex-6',
              type: 'multiple-choice',
              prompt: String.raw`Solve the proportion $\frac{4}{7}=\frac{x}{28}$.`,
              options: ['$x=16$', '$x=49$', '$x=8$', '$x=14$'],
              correctOption: 0,
              hint: 'Cross multiply.',
              explanation:
                String.raw`Cross multiply: $4\times28=7\times x$, so $112=7x$. Divide both sides by $7$: $x=16$. Check: $\frac{4}{7}=\frac{16}{28}$ after multiplying top and bottom by $4$.`,
              difficulty: 'hard',
            },
          ],
          related: ['rational-numbers', 'patterns-and-sequences', 'averages'],
        },
      ],
    },
    {
      id: 'algebra',
      family: 'algebra',
      title: 'Algebra',
      description:
        'Letters that stand for numbers, equations that stay balanced, and patterns that can be predicted.',
      topics: [
        {
          id: 'algebraic-expressions',
          title: 'Algebraic Expressions',
          subtitle: 'Variables, terms, substitution and simplifying with the distributive property.',
          introduction:
            'Algebra gives names to numbers you do not know yet. If a taxi charges $3 plus $2 per kilometre, the cost for $k$ kilometres is $3+2k$ dollars. That short expression describes every possible journey at once. In this topic you will learn what the parts of an expression mean, how to evaluate one, and how to rewrite it in a simpler form.',
          prerequisites: [
            'Order of operations',
            'Adding and subtracting integers',
            'Multiplying numbers',
            'Perimeter of a rectangle',
          ],
          keyIdeas: [
            'A variable is a letter that stands for a number that can change.',
            'A term is a single number, variable or product; terms are separated by plus and minus signs.',
            'Only like terms, with the same variable and exponent, can be combined.',
            'The distributive property lets you remove brackets by multiplying every term inside.',
          ],
          aliases: ['expressions', 'variables', 'terms', 'simplifying expressions', 'substitution'],
          theory: [
            {
              title: 'Letters stand for numbers',
              body: [
                'An algebraic expression combines numbers, variables and operations, such as $4x+7$ or $3(a-b)$. The letter $x$ is a variable: it can take different values. The number 4 in $4x$ is the coefficient, and 7 is a constant term because it does not change with $x$.',
                String.raw`$4x$ means $4\times x$, not forty-something. If $x=6$, then $4x=24$. The expression $x^2$ means $x\times x$, which is different from $2x$: if $x=5$, then $x^2=25$ while $2x=10$.`,
              ],
              bullets: [
                'A term is separated from other terms by $+$ or $-$ signs.',
                'The coefficient is the number multiplying a variable.',
                'A constant term has no variable.',
                '$x$ and $x^2$ are not like terms because their powers differ.',
              ],
            },
            {
              title: 'Combining like terms',
              body: [
                'Like terms have exactly the same variable part, including the exponent. $7x$ and $3x$ are like terms, so $7x+3x=10x$: seven lots of $x$ plus three more lots of $x$ makes ten lots. The coefficient changes, but the variable part stays $x$.',
                'Terms with different variables cannot be combined. $3x+5y$ stays as it is because $x$ and $y$ may represent different numbers. A useful check is to substitute a value: if $x=2$ and $y=1$, then $3x+5y=11$, which cannot be written as a single multiple of either letter.',
              ],
            },
            {
              title: 'The distributive property',
              body: [
                'Multiplication distributes over addition: $a(b+c)=ab+ac$. Think of a rectangle split into two pieces with widths $b$ and $c$ and the same height $a$. The total area is $a(b+c)$ and also $ab+ac$, so the two expressions must be equal.',
                'The property also works with subtraction and with a minus sign in front of a bracket. $a(b-c)=ab-ac$, and $-(b+c)=-b-c$. When you subtract a whole bracket, every sign inside changes because you are subtracting each term.',
              ],
              bullets: [
                '$3(x+4)=3x+12$',
                '$5(2x-3)=10x-15$',
                '$-(x-7)=-x+7$',
                'Multiply every term inside the bracket, not just the first one.',
              ],
            },
            {
              title: 'Evaluating an expression',
              body: [
                'To evaluate an expression, replace each variable with its value, using brackets around negative numbers, then follow the order of operations. If $x=-2$ in $3x^2-2x+1$, write $3(-2)^2-2(-2)+1$. Square first, then multiply, then add: $3(4)+4+1=17$.',
                'Always include units when the expression models a real situation. If the expression gives a cost in dollars, the final answer is in dollars. A quick estimate helps you notice a wrong sign or a missed bracket.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-expressions-distribute',
              title: 'The distributive property',
              expression: String.raw`a(b+c)=ab+ac`,
              description:
                'Multiplying a sum by a number is the same as multiplying each part by that number and adding the results.',
              spoken: 'a times, open bracket, b plus c, close bracket, equals a b plus a c.',
              variables: [
                { symbol: 'a', name: 'factor outside the bracket' },
                { symbol: 'b', name: 'first term inside the bracket' },
                { symbol: 'c', name: 'second term inside the bracket' },
              ],
              conditions: ['Works for all numbers, including negatives and fractions.'],
              notes: 'For subtraction, $a(b-c)=ab-ac$. Be careful with a minus sign in front: $-(b+c)=-b-c$.',
              tags: ['distributive property', 'expanding brackets', 'multiply out', 'algebra'],
            },
            {
              id: 'g7-expressions-like-terms',
              title: 'Combining like terms',
              expression: String.raw`ax+bx=(a+b)x`,
              description:
                'Terms with the same variable part can be added by adding their coefficients.',
              spoken: 'a x plus b x equals, a plus b, times x.',
              variables: [
                { symbol: 'a', name: 'coefficient of the first term' },
                { symbol: 'b', name: 'coefficient of the second term' },
                { symbol: 'x', name: 'common variable part' },
              ],
              conditions: ['The terms must have exactly the same variable and exponent.', '$3x+5y$ cannot be combined because $x$ and $y$ are different variables.'],
              notes: 'Subtraction works the same way: $7x-2x=5x$.',
              tags: ['like terms', 'simplifying expressions', 'coefficient', 'collecting terms'],
            },
            {
              id: 'g7-expressions-negative-bracket',
              title: 'Negative of a difference',
              expression: String.raw`-(a-b)=-a+b`,
              description:
                'A minus sign in front of a bracket changes the sign of every term inside it.',
              spoken: 'Negative, open bracket, a minus b, close bracket, equals negative a plus b.',
              variables: [
                { symbol: 'a', name: 'first term inside the bracket' },
                { symbol: 'b', name: 'second term inside the bracket' },
              ],
              conditions: ['The minus sign applies to the whole bracket, not only the first term.'],
              notes: 'Check with numbers: $-(5-2)=-3$, and $-5+2=-3$. Both sides agree.',
              tags: ['negative sign', 'brackets', 'subtracting expressions', 'sign change'],
            },
          ],
          examples: [
            {
              title: 'Simplifying an expression with brackets',
              problem: 'Simplify $4(2x+3)-2(x-5)$.',
              given: [
                'Expression: $4(2x+3)-2(x-5)$',
                'The brackets must be expanded before like terms can be combined.',
              ],
              steps: [
                {
                  text: 'Expand the first bracket by multiplying both terms by 4.',
                  math: String.raw`4(2x+3)=8x+12`,
                },
                {
                  text: 'Expand the second bracket by multiplying both terms by $-2$. The minus sign belongs to the 2, so both signs inside change.',
                  math: String.raw`-2(x-5)=-2x+10`,
                },
                {
                  text: 'Write the expression with the expanded terms.',
                  math: String.raw`8x+12-2x+10`,
                },
                {
                  text: 'Group the like terms: $8x$ and $-2x$ are like terms, and $12$ and $10$ are constants.',
                  math: String.raw`(8x-2x)+(12+10)`,
                },
                {
                  text: 'Combine the coefficients and the constants.',
                  math: String.raw`6x+22`,
                },
                {
                  text: 'Check by substituting $x=1$ into the original and simplified forms. Original: $4(5)-2(-4)=20+8=28$. Simplified: $6(1)+22=28$. They agree.',
                  math: String.raw`4(2+3)-2(1-5)=28`,
                },
              ],
              answer: '$4(2x+3)-2(x-5)=6x+22$. The check with $x=1$ gives 28 in both forms.',
            },
            {
              title: 'Evaluating an expression with a negative value',
              problem: 'Evaluate $3x^2-2x+1$ when $x=-2$.',
              given: [
                'Expression: $3x^2-2x+1$',
                'Value of the variable: $x=-2$',
              ],
              steps: [
                {
                  text: 'Substitute $-2$ for every $x$. Put brackets around the negative value so the signs stay clear.',
                  math: String.raw`3(-2)^2-2(-2)+1`,
                },
                {
                  text: 'Evaluate the power first. $(-2)^2=4$ because a negative times a negative is positive.',
                  math: String.raw`3(4)-2(-2)+1`,
                },
                {
                  text: 'Multiply from left to right. $3(4)=12$ and $-2(-2)=4$.',
                  math: String.raw`12+4+1`,
                },
                {
                  text: 'Add the results.',
                  math: String.raw`17`,
                },
                {
                  text: 'Check the sign pattern: the squared term is positive, the middle term becomes positive because the coefficient and $x$ are both negative, and the constant is positive. All three contributions add.',
                },
              ],
              answer: 'When $x=-2$, the expression $3x^2-2x+1$ equals 17.',
            },
          ],
          mistakes: [
            {
              mistake: 'Combining unlike terms, such as writing $3x+4=7x$.',
              correction:
                '$3x$ and $4$ are not like terms: one changes with $x$ and the other does not. The expression stays $3x+4$. It equals $7x$ only when $x=1$.',
            },
            {
              mistake: 'Expanding $5-(x+2)$ as $5-x+2$.',
              correction:
                'The minus sign applies to the whole bracket: $5-(x+2)=5-x-2=3-x$. Test with $x=1$: the original is $5-3=2$, and $3-1=2$.',
            },
            {
              mistake: 'Multiplying only the first term inside a bracket: $3(x+4)=3x+4$.',
              correction:
                'Every term inside must be multiplied: $3(x+4)=3x+12$. The 4 represents four whole units, so all four are tripled.',
            },
          ],
          exercises: [
            {
              id: 'g7-expressions-ex-1',
              type: 'multiple-choice',
              prompt: 'In the expression $7x+3$, what is the coefficient of $x$?',
              options: ['$7$', '$3$', '$x$', '$10$'],
              correctOption: 0,
              explanation:
                String.raw`The coefficient is the number multiplying the variable. $7x$ means $7\times x$, so the coefficient is 7. The 3 is a constant term.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-expressions-ex-2',
              type: 'multiple-choice',
              prompt: 'Simplify $7x+4-3x+1$.',
              options: ['$4x+5$', '$10x+5$', '$4x+3$', '$7x+5$'],
              correctOption: 0,
              explanation:
                'Group like terms: $7x-3x=4x$ and $4+1=5$. The simplified expression is $4x+5$. Adding all the coefficients would wrongly treat $-3x$ as $+3x$.',
              difficulty: 'easy',
            },
            {
              id: 'g7-expressions-ex-3',
              type: 'numeric',
              prompt: 'Evaluate $2x^2+3x-1$ when $x=2$.',
              answer: 13,
              tolerance: 0.01,
              explanation:
                'Substitute: $2(2)^2+3(2)-1=2(4)+6-1=8+6-1=13$. The square is calculated before the multiplication.',
              difficulty: 'medium',
            },
            {
              id: 'g7-expressions-ex-4',
              type: 'numeric',
              prompt:
                'A rectangle has length $(2x+1)$ cm and width $x$ cm. When $x=3$, what is the perimeter in centimetres?',
              answer: 20,
              tolerance: 0.01,
              answerUnit: 'cm',
              hint: 'Find the length and width first, then use $P=2(l+w)$ or add all four sides.',
              explanation:
                'When $x=3$, the length is $2(3)+1=7$ cm and the width is 3 cm. The perimeter is $2(7+3)=20$ cm. Adding the four sides also gives $7+3+7+3=20$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g7-expressions-ex-5',
              type: 'multiple-choice',
              prompt: 'Simplify $3(2x-4)-(x-5)$.',
              options: ['$5x-7$', '$5x-17$', '$5x-12$', '$7x-7$'],
              correctOption: 0,
              hint: 'Expand both brackets, then collect like terms.',
              explanation:
                '$3(2x-4)=6x-12$ and $-(x-5)=-x+5$. Adding gives $6x-12-x+5=5x-7$. The common error is to write $+5$ as $-5$ when removing the second bracket.',
              difficulty: 'hard',
            },
            {
              id: 'g7-expressions-ex-6',
              type: 'numeric',
              prompt:
                'A phone plan costs $12 per month plus $0.10 per minute of calls. Using the expression $12+0.10m$, find the cost in dollars for 250 minutes.',
              answer: 37,
              tolerance: 0.01,
              answerUnit: 'dollars',
              explanation:
                'Substitute $m=250$: $12+0.10(250)=12+25=37$. The cost is $37. The $0.10 is the cost of each extra minute, and 250 minutes cost $25.',
              difficulty: 'hard',
            },
          ],
          related: ['linear-equations-one-variable', 'patterns-and-sequences', 'integers'],
        },
        {
          id: 'linear-equations-one-variable',
          title: 'Linear Equations in One Variable',
          subtitle: 'The balance method, two-step equations and word problems.',
          introduction:
            'An equation is a statement that two expressions have the same value, like a balanced scale. Solving an equation means finding the value of the variable that keeps it balanced. The same idea handles “three times a number plus four equals twenty-five” and “a taxi ride cost $17, how far did it go?”.',
          prerequisites: [
            'Simplifying algebraic expressions',
            'Inverse operations: addition and subtraction, multiplication and division',
            'Adding and subtracting integers',
            'Working with brackets',
          ],
          keyIdeas: [
            'Whatever you do to one side of an equation, you must do to the other side.',
            'Undo operations in reverse order: undo addition or subtraction before multiplication or division.',
            'A solution is correct if substituting it makes both sides equal.',
            'Word problems become equations when you name the unknown and translate each phrase.',
          ],
          aliases: ['solving equations', 'balance method', 'two-step equations', 'unknown value', 'inverse operations'],
          theory: [
            {
              title: 'An equation is a balanced scale',
              body: [
                'The equals sign says that the expression on the left has the same value as the expression on the right. In $3x+4=25$, the left side is “three times a number plus four” and the right side is 25. The scale stays balanced only if you change both sides in the same way.',
                'Adding the same number to both sides, subtracting the same number from both sides, multiplying both sides by the same nonzero number or dividing both sides by the same nonzero number all preserve equality. These moves let you isolate the variable without changing the solution.',
              ],
              bullets: [
                'Add or subtract the same value on both sides.',
                'Multiply or divide both sides by the same nonzero value.',
                'Never divide by zero.',
                'Keep the equation balanced at every step.',
              ],
            },
            {
              title: 'Undoing operations in reverse order',
              body: [
                'In $3x+4=25$, the variable $x$ is first multiplied by 3 and then increased by 4. To isolate $x$, undo those operations in reverse: subtract 4 first, then divide by 3. This gives $3x=21$ and $x=7$.',
                'Check the solution by substitution: $3(7)+4=21+4=25$, which matches the right side. A solution that does not check usually signals a sign error or an operation applied to only one side.',
              ],
              bullets: [
                String.raw`For $ax+b=c$ with $a\ne0$: subtract $b$, then divide by $a$.`,
                String.raw`For $ax-b=c$ with $a\ne0$: add $b$, then divide by $a$.`,
              ],
            },
            {
              title: 'Brackets and fractions',
              body: [
                'When the variable is inside a bracket, expand the bracket first or divide both sides by the factor outside. Both routes are valid. $2(x-3)=14$ becomes $2x-6=14$, so $2x=20$ and $x=10$. Dividing by 2 first gives $x-3=7$, then $x=10$ — the same answer with fewer steps.',
                String.raw`When the variable is divided by a number, multiply both sides by that number. In $\frac{x}{4}+2=7$, subtract 2 to get $\frac{x}{4}=5$, then multiply by 4 to get $x=20$. Multiplying by 4 first would also work, but it creates larger numbers.`,
              ],
            },
            {
              title: 'Turning words into equations',
              body: [
                'Name the unknown with a letter, then translate each part of the sentence. “Three times a number plus four is twenty-five” becomes $3n+4=25$. “A taxi charges $3 plus $2 per kilometre and the fare is $17” becomes $3+2k=17$.',
                'After solving, return to the context. State the answer in a sentence with units and check that it is reasonable. A negative distance or a fare larger than the total would show that the equation or its solution needs another look.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-equations-two-step',
              title: 'Solving a two-step equation',
              expression: String.raw`ax+b=c\;\Rightarrow\;x=\frac{c-b}{a}`,
              description:
                'Subtract the constant from both sides, then divide by the coefficient of the variable.',
              spoken: 'a x plus b equals c implies x equals, c minus b, divided by a.',
              variables: [
                { symbol: 'a', name: 'coefficient of the variable', note: 'must not be zero' },
                { symbol: 'x', name: 'unknown value' },
                { symbol: 'b', name: 'constant added to the variable term' },
                { symbol: 'c', name: 'value of the right-hand side' },
              ],
              conditions: [String.raw`$a\ne0$; otherwise the equation is not linear in $x$.`],
              notes: String.raw`If the equation has $ax-b=c$, add $b$ before dividing, which is the same as using $x=\frac{c+b}{a}$.`,
              tags: ['linear equation', 'two-step equation', 'solve for x', 'balance method'],
            },
            {
              id: 'g7-equations-brackets',
              title: 'Solving an equation with a bracket',
              expression: String.raw`a(x+b)=c\;\Rightarrow\;x=\frac{c}{a}-b`,
              description:
                'Divide both sides by the factor outside the bracket, then subtract the constant inside.',
              spoken: 'a times, open bracket, x plus b, close bracket, equals c implies x equals c over a minus b.',
              variables: [
                { symbol: 'a', name: 'factor multiplying the bracket', note: 'must not be zero' },
                { symbol: 'x', name: 'unknown value' },
                { symbol: 'b', name: 'constant inside the bracket' },
                { symbol: 'c', name: 'value of the right-hand side' },
              ],
              conditions: [String.raw`$a\ne0$.`],
              notes: String.raw`Expanding first gives the same solution: $ax+ab=c$, then $x=\frac{c-ab}{a}$ and the two forms agree.`,
              tags: ['brackets', 'linear equation', 'solve equation', 'distributive property'],
            },
            {
              id: 'g7-equations-fraction',
              title: 'Solving an equation with a fraction',
              expression: String.raw`\frac{x}{a}+b=c\;\Rightarrow\;x=a(c-b)`,
              description:
                'Subtract the constant, then multiply both sides by the denominator to leave the variable alone.',
              spoken: 'x over a plus b equals c implies x equals a times, c minus b.',
              variables: [
                { symbol: 'x', name: 'unknown value' },
                { symbol: 'a', name: 'denominator', note: 'must not be zero' },
                { symbol: 'b', name: 'constant added to the fraction' },
                { symbol: 'c', name: 'value of the right-hand side' },
              ],
              conditions: [String.raw`$a\ne0$.`],
              notes: 'Multiplying by $a$ undoes division by $a$, just as subtracting $b$ undoes adding $b$.',
              tags: ['fraction equation', 'linear equation', 'inverse operations', 'solve for x'],
            },
          ],
          examples: [
            {
              title: 'Solving a two-step equation and checking',
              problem: 'Solve $5x-7=23$.',
              given: [
                'Equation: $5x-7=23$',
                'The variable $x$ is multiplied by 5 and then 7 is subtracted.',
              ],
              steps: [
                {
                  text: 'Undo the subtraction first by adding 7 to both sides. This keeps the equation balanced.',
                  math: String.raw`5x-7+7=23+7`,
                },
                {
                  text: 'Simplify both sides.',
                  math: String.raw`5x=30`,
                },
                {
                  text: 'Divide both sides by the coefficient 5 to isolate $x$.',
                  math: String.raw`x=\frac{30}{5}`,
                },
                {
                  text: 'Calculate the value.',
                  math: String.raw`x=6`,
                },
                {
                  text: 'Check by substituting $x=6$ into the original equation: $5(6)-7=30-7=23$, which matches the right-hand side.',
                  math: String.raw`5(6)-7=23`,
                },
              ],
              answer: '$x=6$. The check gives $30-7=23$, so the solution is correct.',
            },
            {
              title: 'A taxi fare word problem',
              problem:
                'A taxi charges a fixed $3 plus $2 for each kilometre travelled. A journey costs $17. How many kilometres did the taxi travel?',
              given: [
                'Fixed charge: $3',
                'Charge per kilometre: $2',
                'Total fare: $17',
                'Let $k$ be the number of kilometres.',
              ],
              steps: [
                {
                  text: 'Write the fare as an expression and set it equal to the total.',
                  math: String.raw`3+2k=17`,
                },
                {
                  text: 'Subtract the fixed charge from both sides to leave the distance term alone.',
                  math: String.raw`2k=17-3`,
                },
                {
                  text: 'Simplify the right-hand side.',
                  math: String.raw`2k=14`,
                },
                {
                  text: 'Divide both sides by 2.',
                  math: String.raw`k=\frac{14}{2}=7`,
                },
                {
                  text: 'Check in the original context: $3+2(7)=3+14=17$. The fare matches, and 7 km is a sensible distance.',
                  math: String.raw`3+2(7)=17`,
                },
              ],
              answer: 'The taxi travelled 7 km. The fare check gives $3 + 2(7) = $17.',
            },
          ],
          mistakes: [
            {
              mistake: 'Doing an operation to only one side of the equation.',
              correction:
                'The equals sign is a balance. Subtracting 4 from the left without subtracting it from the right changes the value. Apply every operation to both sides: $3x+4=19$ becomes $3x=15$, not $3x=19$.',
            },
            {
              mistake: String.raw`Dividing by the coefficient too early: $3x+4=19$ becomes $x+4=\frac{19}{3}$.`,
              correction:
                'Undo addition or subtraction before multiplication or division. Subtract 4 first, then divide by 3: $3x=15$, so $x=5$.',
            },
            {
              mistake: 'Forgetting to apply a negative sign to every term when moving terms.',
              correction:
                'When solving $5x-3=2x+12$, subtract $2x$ from both sides and add 3 to both sides: $3x=15$, so $x=5$. Keep track of each sign separately.',
            },
          ],
          exercises: [
            {
              id: 'g7-equations-ex-1',
              type: 'multiple-choice',
              prompt: 'Solve $x+9=4$.',
              options: ['$x=-5$', '$x=5$', '$x=13$', '$x=-13$'],
              correctOption: 0,
              explanation:
                'Subtract 9 from both sides: $x=4-9=-5$. Check: $-5+9=4$. The solution is negative because 9 is larger than 4.',
              difficulty: 'easy',
            },
            {
              id: 'g7-equations-ex-2',
              type: 'multiple-choice',
              prompt: 'What is the best first step to solve $4x-6=18$?',
              options: [
                'Add 6 to both sides.',
                'Subtract 6 from both sides.',
                'Divide both sides by 6.',
                'Multiply both sides by 4.',
              ],
              correctOption: 0,
              explanation:
                'The variable term is $4x$ with 6 subtracted. Add 6 to both sides to undo the subtraction, giving $4x=24$. Then divide by 4 to get $x=6$.',
              difficulty: 'easy',
            },
            {
              id: 'g7-equations-ex-3',
              type: 'numeric',
              prompt: 'Solve $3x+5=26$.',
              answer: 7,
              tolerance: 0.01,
              explanation:
                'Subtract 5 from both sides: $3x=21$. Divide by 3: $x=7$. Check: $3(7)+5=21+5=26$.',
              difficulty: 'medium',
            },
            {
              id: 'g7-equations-ex-4',
              type: 'numeric',
              prompt: 'Solve $2(x-3)=14$.',
              answer: 10,
              tolerance: 0.01,
              hint: 'Divide both sides by 2, or expand the bracket first.',
              explanation:
                'Divide by 2: $x-3=7$, so $x=10$. Alternatively, $2x-6=14$, so $2x=20$ and $x=10$. Check: $2(10-3)=2(7)=14$.',
              difficulty: 'medium',
            },
            {
              id: 'g7-equations-ex-5',
              type: 'numeric',
              prompt: 'Solve $5x-3=2x+12$.',
              answer: 5,
              tolerance: 0.01,
              hint: 'Collect the $x$ terms on one side and the constants on the other.',
              explanation:
                'Subtract $2x$ from both sides: $3x-3=12$. Add 3: $3x=15$. Divide by 3: $x=5$. Check: $5(5)-3=22$ and $2(5)+12=22$.',
              difficulty: 'hard',
            },
            {
              id: 'g7-equations-ex-6',
              type: 'multiple-choice',
              prompt: 'I double a number, add 7, and get 19. What is the number?',
              options: ['$6$', '$12$', '$13$', '$5.5$'],
              correctOption: 0,
              hint: 'Write an equation: $2n+7=19$.',
              explanation:
                'Let the number be $n$. The sentence becomes $2n+7=19$. Subtract 7: $2n=12$. Divide by 2: $n=6$. Check: $2(6)+7=19$.',
              difficulty: 'hard',
            },
          ],
          related: ['algebraic-expressions', 'patterns-and-sequences', 'ratios-and-proportions'],
        },
        {
          id: 'patterns-and-sequences',
          title: 'Patterns and Sequences',
          subtitle: 'Term-to-term rules, input-output tables and simple nth-term formulas.',
          introduction:
            'Tile patterns, saved pocket money and the seats in a theatre all grow in predictable ways. A sequence is an ordered list of numbers, and a rule tells you how to continue it. Finding the rule is the first step toward writing a formula for any term, which turns a long list into a single expression.',
          prerequisites: [
            'Times tables and multiplication',
            'Substitution into expressions',
            'Adding and subtracting integers',
            'Reading tables of values',
          ],
          keyIdeas: [
            'Each number in a sequence is called a term; its position is its term number.',
            'A term-to-term rule tells you how to get from one term to the next.',
            'An arithmetic sequence adds the same amount, called the common difference, each time.',
            'A position-to-term rule, or nth term, calculates any term directly from its position.',
          ],
          aliases: ['sequences', 'term rules', 'nth term', 'number patterns', 'input output tables'],
          theory: [
            {
              title: 'Patterns have positions',
              body: [
                String.raw`In the sequence $7, 11, 15, 19, \ldots$, the first term is 7, the second is 11, and so on. Writing the position above each term helps you see the structure: position 1 gives 7, position 2 gives 11, position 3 gives 15. The three dots mean the pattern continues in the same way.`,
                'There are two useful ways to describe a pattern. A term-to-term rule says how to get from one term to the next: “add 4”. A position-to-term rule connects the term directly to its position: “multiply the position by 4 and add 3”. The second rule can find the 100th term without listing all the terms before it.',
              ],
              bullets: [
                String.raw`Term numbers are usually written $n=1,2,3,\ldots$`,
                'The term in position $n$ is written $a_n$.',
                'A sequence can increase, decrease or alternate.',
              ],
            },
            {
              title: 'Arithmetic sequences',
              body: [
                'An arithmetic sequence changes by the same amount each time. The sequence $7,11,15,19$ has common difference $d=4$ because each term is 4 more than the one before. If the terms decrease, the common difference is negative; $20,17,14,11$ has $d=-3$.',
                'To reach term $n$ from the first term, you take $n-1$ steps. Each step adds $d$, so $a_n=a_1+(n-1)d$. The $n-1$ is important: the first term has taken no steps yet. For the sequence above, $a_n=7+(n-1)4=4n+3$.',
              ],
              bullets: [
                'Find $d$ by subtracting any term from the next term.',
                'The nth term is linear: $a_n=dn+(a_1-d)$.',
                'Check your rule with $n=1$ and $n=2$ before using it.',
              ],
            },
            {
              title: 'Visual patterns and special numbers',
              body: [
                String.raw`Dots arranged in triangles give the triangular numbers: $1, 3, 6, 10, 15, \ldots$. Each new triangle adds a row with one more dot than the previous row. The nth triangular number is $T_n=\frac{n(n+1)}{2}$, which pairs the first and last rows to make a rectangle.`,
                String.raw`Square numbers come from arranging dots in a square: $1, 4, 9, 16, \ldots$. Adding consecutive odd numbers builds each square: $1=1^2$, $1+3=2^2$, $1+3+5=3^2$. This visual pattern explains why the sum of the first $n$ odd numbers is $n^2$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-patterns-nth-term',
              title: 'Nth term of an arithmetic sequence',
              expression: String.raw`a_n=a_1+(n-1)d`,
              description:
                'The nth term equals the first term plus the common difference multiplied by the number of steps from the first term.',
              spoken: 'a sub n equals a sub one plus, n minus one, times d.',
              variables: [
                { symbol: 'a_n', name: 'term in position $n$' },
                { symbol: 'a_1', name: 'first term' },
                { symbol: 'n', name: 'position number', note: 'a positive integer' },
                { symbol: 'd', name: 'common difference', note: 'may be negative' },
              ],
              conditions: ['The sequence must be arithmetic: the difference between consecutive terms is constant.', '$n$ is a positive integer.'],
              notes: String.raw`For $7,11,15,19,\ldots$, $a_n=7+(n-1)4=4n+3$.`,
              tags: ['nth term', 'arithmetic sequence', 'common difference', 'position to term'],
            },
            {
              id: 'g7-patterns-triangular',
              title: 'Triangular numbers',
              expression: String.raw`T_n=\frac{n(n+1)}{2}`,
              description:
                'The nth triangular number is half of $n$ times the next integer, formed by pairing rows of a dot triangle.',
              spoken: 'T sub n equals n times, n plus one, all divided by two.',
              variables: [
                { symbol: 'T_n', name: 'nth triangular number' },
                { symbol: 'n', name: 'position number', note: 'a positive integer' },
              ],
              conditions: ['$n$ is a positive integer.'],
              notes: 'The first four triangular numbers are $1,3,6,10$.',
              tags: ['triangular numbers', 'dot pattern', 'sequence', 'nth term'],
            },
            {
              id: 'g7-patterns-odd-sum',
              title: 'Sum of the first n odd numbers',
              expression: String.raw`1+3+5+\cdots+(2n-1)=n^2`,
              description:
                'Adding the first $n$ odd numbers always produces the nth square number.',
              spoken: 'One plus three plus five plus, and so on, up to two n minus one, equals n squared.',
              variables: [
                { symbol: 'n', name: 'number of odd numbers being added', note: 'a positive integer' },
              ],
              conditions: ['$n$ is a positive integer.', 'The last odd number is $2n-1$.'],
              notes: 'For $n=4$: $1+3+5+7=16=4^2$. Each new odd number adds an L-shaped layer to a square.',
              tags: ['odd numbers', 'square numbers', 'series', 'visual pattern'],
            },
          ],
          examples: [
            {
              title: 'Finding a far-away term',
              problem: String.raw`The sequence starts $7, 11, 15, 19, \ldots$. Find the 20th term.`,
              given: [
                'First term: $a_1=7$',
                'The sequence increases by 4 each time.',
                'Position wanted: $n=20$',
              ],
              steps: [
                {
                  text: 'Find the common difference by subtracting one term from the next.',
                  math: String.raw`d=11-7=4`,
                },
                {
                  text: 'Use the nth-term formula. There are $n-1$ steps from the first term to term $n$.',
                  math: String.raw`a_n=a_1+(n-1)d`,
                },
                {
                  text: 'Substitute $a_1=7$, $d=4$ and $n=20$.',
                  math: String.raw`a_{20}=7+(20-1)\times4`,
                },
                {
                  text: 'Calculate the bracket first, then multiply.',
                  math: String.raw`a_{20}=7+19\times4=7+76`,
                },
                {
                  text: 'Add to find the term.',
                  math: String.raw`a_{20}=83`,
                },
                {
                  text: 'Check with the position-to-term rule $a_n=4n+3$: $4(20)+3=83$. The first term also checks: $4(1)+3=7$.',
                  math: String.raw`4n+3=4(20)+3=83`,
                },
              ],
              answer: 'The 20th term is 83. The rule is $a_n=4n+3$.',
            },
            {
              title: 'A matchstick pattern',
              problem:
                'Squares are made in a row with matchsticks. One square uses 4 sticks, two squares use 7 sticks, and three squares use 10 sticks. How many sticks are needed for 12 squares?',
              given: [
                '1 square: 4 sticks',
                '2 squares: 7 sticks',
                '3 squares: 10 sticks',
                'Find the number of sticks for 12 squares.',
              ],
              steps: [
                {
                  text: 'Record the pattern in a table and look for the change.',
                  math: String.raw`4,\;7,\;10,\;\ldots`,
                },
                {
                  text: 'Each new square adds 3 sticks, because it shares one side with the previous square and adds three new sides.',
                  math: String.raw`d=3`,
                },
                {
                  text: 'Use the arithmetic sequence formula with first term 4.',
                  math: String.raw`a_n=4+(n-1)\times3`,
                },
                {
                  text: 'Simplify the rule.',
                  math: String.raw`a_n=3n+1`,
                },
                {
                  text: 'Substitute $n=12$ for twelve squares.',
                  math: String.raw`a_{12}=3(12)+1=36+1=37`,
                },
                {
                  text: 'Check the first three values: $3(1)+1=4$, $3(2)+1=7$ and $3(3)+1=10$. All match the pattern.',
                  math: String.raw`3n+1`,
                },
              ],
              answer: 'Twelve squares need 37 matchsticks. The rule is $3n+1$ sticks for $n$ squares.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using $nd$ instead of $(n-1)d$ in the nth-term formula.',
              correction:
                String.raw`The first term has already been reached before any steps are taken. For $7,11,15,\ldots$, the rule is $4n+3$, not $4n+7$. Check with $n=1$: it must give 7.`,
            },
            {
              mistake: 'Assuming every sequence is arithmetic.',
              correction:
                'Check the differences. $2,6,18,54$ has differences $4,12,36$, not a constant, so it is not arithmetic. This sequence multiplies by 3 each time.',
            },
            {
              mistake: 'Miscounting the number of steps when moving from term 1 to term n.',
              correction:
                'From term 1 to term 5 there are 4 steps, not 5. Write out the first few positions if you are unsure, and test the rule with $n=1$.',
            },
          ],
          exercises: [
            {
              id: 'g7-patterns-ex-1',
              type: 'multiple-choice',
              prompt: String.raw`What is the next term in the sequence $2, 6, 18, 54, \ldots$?`,
              options: ['$162$', '$108$', '$90$', '$216$'],
              correctOption: 0,
              explanation:
                String.raw`Each term is multiplied by 3: $2\times3=6$, $6\times3=18$, $18\times3=54$. The next term is $54\times3=162$. The differences are not constant, so this is not an arithmetic sequence.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-patterns-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`Which rule gives the sequence $5, 8, 11, 14, \ldots$?`,
              options: ['$3n+2$', '$2n+3$', '$3n+5$', '$n+3$'],
              correctOption: 0,
              hint: 'Test each rule with $n=1$ and $n=2$.',
              explanation:
                'The common difference is 3 and the first term is 5. Using $a_n=a_1+(n-1)d$ gives $5+(n-1)3=3n+2$. Check: $n=1$ gives 5, $n=2$ gives 8.',
              difficulty: 'medium',
            },
            {
              id: 'g7-patterns-ex-3',
              type: 'numeric',
              prompt: String.raw`Find the 10th term of the sequence $4, 9, 14, 19, \ldots$.`,
              answer: 49,
              tolerance: 0.01,
              explanation:
                String.raw`The first term is 4 and the common difference is 5. $a_{10}=4+(10-1)\times5=4+45=49$. The rule is $5n-1$, which also gives $5(10)-1=49$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-patterns-ex-4',
              type: 'numeric',
              prompt: 'What is the 6th triangular number, $T_6$?',
              answer: 21,
              tolerance: 0.01,
              hint: String.raw`Use $T_n=\frac{n(n+1)}{2}$.`,
              explanation:
                String.raw`$T_6=\frac{6\times7}{2}=\frac{42}{2}=21$. The triangular numbers begin $1,3,6,10,15,21$, so the formula agrees with the pattern.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-patterns-ex-5',
              type: 'numeric',
              prompt:
                'A matchstick pattern uses $3n+1$ sticks for $n$ squares in a row. How many sticks are needed for 25 squares?',
              answer: 76,
              tolerance: 0.01,
              answerUnit: 'sticks',
              explanation:
                String.raw`Substitute $n=25$: $3(25)+1=75+1=76$. The 25 squares share 24 sides, so $4+24\times3=76$ also confirms the count.`,
              difficulty: 'hard',
            },
            {
              id: 'g7-patterns-ex-6',
              type: 'multiple-choice',
              prompt: 'Which sequence has nth term $4n-3$?',
              options: [String.raw`$1, 5, 9, 13, \ldots$`, String.raw`$3, 7, 11, 15, \ldots$`, String.raw`$1, 4, 9, 16, \ldots$`, String.raw`$4, 8, 12, 16, \ldots$`],
              correctOption: 0,
              explanation:
                String.raw`Substitute $n=1,2,3,4$: $4(1)-3=1$, $4(2)-3=5$, $4(3)-3=9$, $4(4)-3=13$. The sequence is $1,5,9,13,\ldots$, an arithmetic sequence with common difference 4.`,
              difficulty: 'hard',
            },
          ],
          related: ['algebraic-expressions', 'ratios-and-proportions', 'linear-equations-one-variable'],
        },
      ],
    },
    {
      id: 'geometry',
      family: 'geometry',
      title: 'Geometry',
      description:
        'Reasoning with angles and measuring the space inside and around shapes.',
      theorems: [
        {
          title: 'Triangle Angle Sum Theorem',
          statement: String.raw`The interior angles of any triangle add to $180^{\circ}$.`,
          note: 'Tear the three corners from a paper triangle and place them together: they form a straight line.',
        },
        {
          title: 'Exterior Angle Theorem',
          statement: String.raw`An exterior angle of a triangle equals the sum of the two opposite interior angles.`,
          note: String.raw`The exterior angle and its adjacent interior angle add to $180^{\circ}$ because they lie on a straight line.`,
        },
        {
          title: 'Triangle Inequality Theorem',
          statement: String.raw`The sum of the lengths of any two sides of a triangle is greater than the length of the third side.`,
          note: 'If the two shorter sides just meet the longest side, the triangle collapses into a straight line.',
        },
      ],
      topics: [
        {
          id: 'lines-angles-and-triangles',
          title: 'Lines, Angles and Triangles',
          subtitle: 'Angle types, parallel lines, the triangle angle sum and the triangle inequality.',
          introduction:
            'Angles describe turning. A door opening, a ramp and the corners of a roof all involve angles, and triangles are the simplest rigid shapes. The rules in this topic let you find unknown angles without measuring every one, and they explain why some sets of side lengths can form a triangle while others cannot.',
          prerequisites: [
            'Measuring angles with a protractor',
            'Naming and classifying angles',
            'Parallel and perpendicular lines',
            'Adding and subtracting whole numbers',
          ],
          keyIdeas: [
            'Angles are measured in degrees; a full turn is 360°.',
            'Angles on a straight line add to 180°, and angles around a point add to 360°.',
            'The three interior angles of a triangle add to 180°.',
            'The longest side of a triangle is opposite the largest angle.',
          ],
          aliases: ['angles', 'triangles', 'angle sum', 'parallel lines', 'triangle inequality', 'transversal'],
          theory: [
            {
              title: 'Measuring and classifying angles',
              body: [
                'An angle measures the turn between two rays that meet at a vertex. Degrees divide a full turn into 360 equal parts. A right angle is 90°, a straight angle is 180°, and a full turn is 360°. Angles smaller than 90° are acute, angles between 90° and 180° are obtuse, and angles larger than 180° are reflex.',
                'Angle size does not depend on how long the arms are; it depends only on the amount of turn. A tiny drawing of a right angle and a huge one both measure 90°.',
              ],
              bullets: [
                'Acute: less than 90°',
                'Right: exactly 90°',
                'Obtuse: between 90° and 180°',
                'Straight: exactly 180°',
                'Reflex: between 180° and 360°',
              ],
            },
            {
              title: 'Angles on lines and around points',
              body: [
                'Angles that sit together on a straight line add to 180° because a straight line is half a turn. Angles that meet around a point add to 360° because they make a full turn. Vertically opposite angles, formed by two crossing lines, are equal.',
                'When a transversal crosses two parallel lines, corresponding angles are equal and alternate angles are equal. Co-interior angles on the same side of the transversal add to 180°. These relationships let you transfer an angle from one position to another.',
              ],
              bullets: [
                'Straight line: the angles add to 180°.',
                'Around a point: the angles add to 360°.',
                'Vertically opposite angles are equal.',
                'Alternate angles between parallel lines are equal.',
              ],
            },
            {
              title: 'The triangle angle sum',
              body: [
                'Draw a triangle and tear off its three corners. Place them side by side along a straight line and they fit exactly, showing that the interior angles add to 180°. This is the Triangle Angle Sum Theorem.',
                String.raw`The theorem lets you find a missing angle from the other two. If a triangle has angles 52° and 71°, the third is $180^{\circ}-52^{\circ}-71^{\circ}=57^{\circ}$. A triangle with a 90° angle is called right-angled; one with two equal sides is isosceles, and its base angles are equal.`,
              ],
              bullets: [
                'Equilateral triangle: all three angles are 60°.',
                'Isosceles triangle: the two base angles are equal.',
                'Right-angled triangle: one angle is 90°, so the other two add to 90°.',
              ],
            },
            {
              title: 'Exterior angles and the triangle inequality',
              body: [
                'If you extend one side of a triangle, the angle outside the triangle is an exterior angle. The Exterior Angle Theorem says it equals the sum of the two interior angles opposite it. This follows from the angle sum: the exterior angle and its neighbouring interior angle add to 180°, and the other two interior angles also add to 180° minus that same angle.',
                'Not every three lengths make a triangle. The Triangle Inequality Theorem requires the sum of any two sides to be greater than the third. Lengths 3, 4 and 8 fail because $3+4=7<8$: the two shorter sides cannot reach across the longest side.',
              ],
              bullets: [
                'Exterior angle $=$ sum of the two opposite interior angles.',
                'Check all three inequalities $a+b>c$, $a+c>b$ and $b+c>a$.',
                'The largest angle faces the longest side.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-angles-triangle-sum',
              title: 'Triangle angle sum',
              expression: String.raw`A+B+C=180^{\circ}`,
              description:
                'The three interior angles of any triangle add to 180 degrees.',
              spoken: 'Angle A plus angle B plus angle C equals one hundred eighty degrees.',
              variables: [
                { symbol: 'A', name: 'first interior angle', unit: '°' },
                { symbol: 'B', name: 'second interior angle', unit: '°' },
                { symbol: 'C', name: 'third interior angle', unit: '°' },
              ],
              conditions: ['The shape must be a triangle in the flat plane.', 'Each angle is greater than 0° and less than 180°.'],
              notes: 'To find a missing angle, subtract the known angles from 180°.',
              tags: ['triangle angle sum', 'interior angles', 'triangles', '180 degrees'],
            },
            {
              id: 'g7-angles-straight-line',
              title: 'Angles on a straight line',
              expression: String.raw`a+b=180^{\circ}`,
              description:
                'Two angles that form a straight line are supplementary and add to 180 degrees.',
              spoken: 'a plus b equals one hundred eighty degrees.',
              variables: [
                { symbol: 'a', name: 'first angle', unit: '°' },
                { symbol: 'b', name: 'second angle', unit: '°' },
              ],
              conditions: ['The two angles must sit together on one side of a straight line.'],
              notes: 'For more than two angles on a straight line, the whole set still adds to 180°.',
              tags: ['straight line', 'supplementary angles', 'adjacent angles', '180 degrees'],
            },
            {
              id: 'g7-angles-exterior',
              title: 'Exterior angle of a triangle',
              expression: String.raw`\text{exterior angle}=A+B`,
              description:
                'An exterior angle equals the sum of the two interior angles opposite it.',
              spoken: 'The exterior angle equals angle A plus angle B.',
              variables: [
                { symbol: 'A', name: 'first opposite interior angle', unit: '°' },
                { symbol: 'B', name: 'second opposite interior angle', unit: '°' },
              ],
              conditions: ['The exterior angle is formed by extending one side of the triangle.', 'The two interior angles must be the ones not adjacent to the exterior angle.'],
              notes: 'The exterior angle and its adjacent interior angle add to 180°.',
              tags: ['exterior angle', 'triangle', 'opposite interior angles', 'angle theorem'],
            },
            {
              id: 'g7-angles-inequality',
              title: 'Triangle inequality',
              expression: String.raw`a+b>c`,
              description:
                'The sum of the lengths of any two sides of a triangle must be greater than the length of the third side.',
              spoken: 'a plus b is greater than c.',
              variables: [
                { symbol: 'a', name: 'length of the first side', unit: 'cm' },
                { symbol: 'b', name: 'length of the second side', unit: 'cm' },
                { symbol: 'c', name: 'length of the third side', unit: 'cm' },
              ],
              conditions: ['All three inequalities must hold: $a+b>c$, $a+c>b$ and $b+c>a$.', 'Side lengths must be positive.'],
              notes: 'A set of lengths that only just satisfies the inequality forms a very flat triangle.',
              tags: ['triangle inequality', 'side lengths', 'possible triangle', 'triangle theorem'],
            },
          ],
          examples: [
            {
              title: 'Finding the third angle of a triangle',
              problem: 'Two angles of a triangle measure 52° and 71°. Find the third angle.',
              given: [
                String.raw`First angle: $52^{\circ}$`,
                String.raw`Second angle: $71^{\circ}$`,
                String.raw`The interior angles of a triangle add to $180^{\circ}$.`,
              ],
              steps: [
                {
                  text: 'Choose the triangle angle sum theorem.',
                  math: String.raw`A+B+C=180^{\circ}`,
                },
                {
                  text: 'Substitute the two known angles. Let $C$ be the unknown angle.',
                  math: String.raw`52^{\circ}+71^{\circ}+C=180^{\circ}`,
                },
                {
                  text: 'Add the known angles.',
                  math: String.raw`123^{\circ}+C=180^{\circ}`,
                },
                {
                  text: 'Subtract 123° from both sides.',
                  math: String.raw`C=180^{\circ}-123^{\circ}=57^{\circ}`,
                },
                {
                  text: String.raw`Check that all three angles add to 180°: $52^{\circ}+71^{\circ}+57^{\circ}=180^{\circ}$. The result is acute, so the triangle is acute-angled.`,
                  math: String.raw`52^{\circ}+71^{\circ}+57^{\circ}=180^{\circ}`,
                },
              ],
              answer: 'The third angle is 57°. All three angles are less than 90°, so the triangle is acute-angled.',
            },
            {
              title: 'Using an exterior angle',
              problem:
                'In a triangle, two interior angles are 48° and 67°. Find the exterior angle formed at the third vertex.',
              given: [
                String.raw`Opposite interior angles: $48^{\circ}$ and $67^{\circ}$`,
                'The exterior angle is at the third vertex.',
              ],
              steps: [
                {
                  text: 'Use the Exterior Angle Theorem: the exterior angle equals the sum of the two opposite interior angles.',
                  math: String.raw`\text{exterior angle}=48^{\circ}+67^{\circ}`,
                },
                {
                  text: 'Add the two angles.',
                  math: String.raw`\text{exterior angle}=115^{\circ}`,
                },
                {
                  text: String.raw`Check by finding the third interior angle first: $180^{\circ}-48^{\circ}-67^{\circ}=65^{\circ}$.`,
                  math: String.raw`180^{\circ}-48^{\circ}-67^{\circ}=65^{\circ}`,
                },
                {
                  text: String.raw`The exterior angle and the adjacent interior angle lie on a straight line, so they add to 180°: $180^{\circ}-65^{\circ}=115^{\circ}$. Both methods agree.`,
                  math: String.raw`180^{\circ}-65^{\circ}=115^{\circ}`,
                },
              ],
              answer: String.raw`The exterior angle is 115°. It equals $48^{\circ}+67^{\circ}$ and also $180^{\circ}-65^{\circ}$.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Using 360° instead of 180° for the angles of a triangle.',
              correction:
                'A triangle is half of a parallelogram, and its angles fill a straight line. The three interior angles add to 180°, while angles around a full point add to 360°.',
            },
            {
              mistake: 'Assuming any three lengths form a triangle.',
              correction:
                'Test the triangle inequality. Lengths 3 cm, 4 cm and 8 cm fail because $3+4=7<8$. The two shorter sides cannot meet across the longest side.',
            },
            {
              mistake: 'Treating the exterior angle as equal to its adjacent interior angle.',
              correction:
                'The exterior angle and the adjacent interior angle are supplementary: they add to 180°. The exterior angle equals the sum of the two opposite interior angles.',
            },
          ],
          exercises: [
            {
              id: 'g7-angles-ex-1',
              type: 'multiple-choice',
              prompt: 'A triangle has angles of 90° and 35°. What is the third angle?',
              options: [String.raw`$55^{\circ}$`, String.raw`$65^{\circ}$`, String.raw`$125^{\circ}$`, String.raw`$145^{\circ}$`],
              correctOption: 0,
              explanation:
                String.raw`The angles add to 180°: $90^{\circ}+35^{\circ}=125^{\circ}$, so the third angle is $180^{\circ}-125^{\circ}=55^{\circ}$.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-angles-ex-2',
              type: 'multiple-choice',
              prompt: 'Two angles sit together on a straight line. One measures 125°. What is the other?',
              options: [String.raw`$55^{\circ}$`, String.raw`$65^{\circ}$`, String.raw`$75^{\circ}$`, String.raw`$235^{\circ}$`],
              correctOption: 0,
              explanation:
                String.raw`Angles on a straight line add to 180°. The other angle is $180^{\circ}-125^{\circ}=55^{\circ}$.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-angles-ex-3',
              type: 'numeric',
              prompt: 'Two angles of a triangle measure 47° and 68°. Find the third angle in degrees.',
              answer: 65,
              tolerance: 0.01,
              answerUnit: '°',
              explanation:
                String.raw`$47^{\circ}+68^{\circ}=115^{\circ}$, and $180^{\circ}-115^{\circ}=65^{\circ}$. Check: $47+68+65=180$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-angles-ex-4',
              type: 'numeric',
              prompt:
                'The two interior angles opposite an exterior angle measure 38° and 76°. Find the exterior angle in degrees.',
              answer: 114,
              tolerance: 0.01,
              answerUnit: '°',
              explanation:
                String.raw`By the Exterior Angle Theorem, the exterior angle is $38^{\circ}+76^{\circ}=114^{\circ}$. The third interior angle is $66^{\circ}$, and $180^{\circ}-66^{\circ}=114^{\circ}$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-angles-ex-5',
              type: 'multiple-choice',
              prompt: 'Can lengths 3 cm, 4 cm and 8 cm form a triangle?',
              options: [
                'Yes, because $3+4>8$.',
                'No, because $3+4<8$.',
                'Yes, because $8-4=4$.',
                'No, because $3+8>4$.',
              ],
              correctOption: 1,
              explanation:
                'The triangle inequality requires every pair of sides to add to more than the third side. Here $3+4=7$, which is less than 8, so the two shorter sides cannot reach across the longest side. No triangle is possible.',
              difficulty: 'hard',
            },
            {
              id: 'g7-angles-ex-6',
              type: 'numeric',
              prompt:
                'An isosceles triangle has a vertex angle of 40°. Find one base angle in degrees.',
              answer: 70,
              tolerance: 0.01,
              answerUnit: '°',
              hint: 'The two base angles are equal and the three angles add to 180°.',
              explanation:
                String.raw`The base angles are equal, so $2b+40^{\circ}=180^{\circ}$. Then $2b=140^{\circ}$ and $b=70^{\circ}$. Check: $70^{\circ}+70^{\circ}+40^{\circ}=180^{\circ}$.`,
              difficulty: 'hard',
            },
          ],
          related: ['perimeter-and-area', 'circles-intro', 'algebraic-expressions'],
        },
        {
          id: 'perimeter-and-area',
          title: 'Perimeter and Area',
          subtitle: 'Rectangles, triangles, parallelograms and composite figures.',
          introduction:
            'Perimeter is the distance around a shape; area is the amount of surface it covers. A gardener needs perimeter to buy fencing and area to order turf. A painter estimates area to buy paint. The formulas in this topic turn those jobs into a few measurements and one multiplication.',
          prerequisites: [
            'Measuring lengths in centimetres and metres',
            'Multiplication of whole numbers and decimals',
            'Properties of rectangles and triangles',
            'Metric units and unit conversions',
          ],
          keyIdeas: [
            'Perimeter is a length, measured in units such as cm or m.',
            'Area is measured in square units such as cm² or m².',
            'The height used in area formulas must be perpendicular to the base.',
            'Composite figures can be split into rectangles and triangles, or a cut-out can be subtracted.',
          ],
          aliases: ['area', 'perimeter', 'composite figures', 'surface measurement', 'square units'],
          theory: [
            {
              title: 'Perimeter is distance around',
              body: [
                'Perimeter is found by adding the lengths of all the sides. A rectangle has two pairs of equal sides, so $P=2(l+w)$. A shape with sides 7 cm, 5 cm, 7 cm and 5 cm has perimeter $7+5+7+5=24$ cm.',
                'Perimeter is a one-dimensional length, so it is measured in centimetres, metres or kilometres, never in square units. A common mistake is to write cm² for a perimeter; the unit should match the quantity being measured.',
              ],
            },
            {
              title: 'Area counts square units',
              body: [
                String.raw`Area measures how many unit squares fit inside a shape. A rectangle 8 cm by 5 cm can be covered by 8 columns of 5 one-centimetre squares, giving $8\times5=40$ squares, or 40 cm². This is why the area of a rectangle is length times width.`,
                String.raw`Units matter. One square metre is the area of a square with side 1 m, and it contains $100\times100=10000$ square centimetres. Converting between area units means squaring the length conversion factor.`,
              ],
              bullets: [
                'Area of a rectangle: $A=lw$.',
                '1 m² $=10000$ cm².',
                'Area answers “how much surface?”, perimeter answers “how far around?”.',
              ],
            },
            {
              title: 'Parallelograms and triangles',
              body: [
                'A parallelogram can be cut and rearranged into a rectangle with the same base and perpendicular height. Its area is therefore $A=bh$. The slanted side is longer than the height, so using the slant side in the formula overestimates the area.',
                String.raw`Two identical triangles fit together to make a parallelogram. Each triangle therefore has half the area: $A=\frac{1}{2}bh$. The height must be measured perpendicular to the chosen base, even if the perpendicular falls outside the triangle.`,
              ],
            },
            {
              title: 'Composite figures',
              body: [
                'Many real shapes are combinations of rectangles and triangles. Split the shape into parts, find each area, and add. Alternatively, imagine the shape inside a larger rectangle and subtract the pieces that are missing.',
                'Label every length on a sketch before calculating. For an L-shaped room, divide it into two rectangles. For a rectangle with a corner removed, subtract the missing rectangle. Check that the final area is smaller than the surrounding rectangle and larger than any one part.',
              ],
              bullets: [
                'Split into non-overlapping parts.',
                'Add the areas of the parts.',
                'Or subtract cut-outs from a larger shape.',
                'Keep all measurements in the same unit before calculating.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-area-rectangle-perimeter',
              title: 'Perimeter of a rectangle',
              expression: String.raw`P=2(l+w)`,
              description:
                'The perimeter of a rectangle is twice the sum of its length and width.',
              spoken: 'P equals two times, l plus w.',
              variables: [
                { symbol: 'P', name: 'perimeter', unit: 'cm' },
                { symbol: 'l', name: 'length', unit: 'cm' },
                { symbol: 'w', name: 'width', unit: 'cm' },
              ],
              conditions: ['$l>0$ and $w>0$.', 'Length and width must be in the same unit.'],
              notes: 'Equivalently, $P=2l+2w$: add the two lengths and the two widths.',
              tags: ['perimeter', 'rectangle', 'distance around', 'length units'],
            },
            {
              id: 'g7-area-rectangle',
              title: 'Area of a rectangle',
              expression: String.raw`A=lw`,
              description:
                'The area of a rectangle is its length multiplied by its width.',
              spoken: 'A equals l times w.',
              variables: [
                { symbol: 'A', name: 'area', unit: 'cm²' },
                { symbol: 'l', name: 'length', unit: 'cm' },
                { symbol: 'w', name: 'width', unit: 'cm' },
              ],
              conditions: ['$l>0$ and $w>0$.', 'Both dimensions must be in the same unit; the area unit is that unit squared.'],
              notes: 'A square is a rectangle with $l=w=s$, so $A=s^2$.',
              tags: ['area', 'rectangle', 'square units', 'length times width'],
            },
            {
              id: 'g7-area-parallelogram',
              title: 'Area of a parallelogram',
              expression: String.raw`A=bh`,
              description:
                'The area of a parallelogram is its base multiplied by its perpendicular height.',
              spoken: 'A equals b times h.',
              variables: [
                { symbol: 'A', name: 'area', unit: 'cm²' },
                { symbol: 'b', name: 'base length', unit: 'cm' },
                { symbol: 'h', name: 'perpendicular height', unit: 'cm' },
              ],
              conditions: ['$b>0$ and $h>0$.', '$h$ must be measured perpendicular to the base, not along a slanted side.'],
              notes: 'Cutting a triangle from one end and moving it to the other turns the parallelogram into a rectangle of area $bh$.',
              tags: ['area', 'parallelogram', 'base', 'perpendicular height'],
            },
            {
              id: 'g7-area-triangle',
              title: 'Area of a triangle',
              expression: String.raw`A=\frac{1}{2}bh`,
              description:
                'The area of a triangle is half the base multiplied by the perpendicular height.',
              spoken: 'A equals one half times b times h.',
              variables: [
                { symbol: 'A', name: 'area', unit: 'cm²' },
                { symbol: 'b', name: 'base length', unit: 'cm' },
                { symbol: 'h', name: 'perpendicular height', unit: 'cm' },
              ],
              conditions: ['$b>0$ and $h>0$.', 'The height must be perpendicular to the chosen base.'],
              notes: 'Two copies of the triangle form a parallelogram with area $bh$, so one triangle has half that area.',
              tags: ['area', 'triangle', 'base and height', 'half base times height'],
            },
          ],
          examples: [
            {
              title: 'Area of a composite shape',
              problem:
                'A shape is made from a rectangle 8 cm wide and 5 cm high with a triangle on top. The triangle has base 8 cm and perpendicular height 3 cm. Find the total area.',
              given: [
                'Rectangle: width $8$ cm, height $5$ cm',
                'Triangle: base $8$ cm, perpendicular height $3$ cm',
                'The triangle sits on the top side of the rectangle.',
              ],
              steps: [
                {
                  text: 'Split the shape into the rectangle and the triangle, then find each area separately.',
                  math: String.raw`A_{\text{total}}=A_{\text{rectangle}}+A_{\text{triangle}}`,
                },
                {
                  text: 'Use the rectangle area formula.',
                  math: String.raw`A_{\text{rectangle}}=8\times5=40\text{ cm}^2`,
                },
                {
                  text: 'Use the triangle area formula. The height 3 cm is perpendicular to the 8 cm base.',
                  math: String.raw`A_{\text{triangle}}=\frac{1}{2}\times8\times3=12\text{ cm}^2`,
                },
                {
                  text: 'Add the two areas. Both are in square centimetres, so the units combine directly.',
                  math: String.raw`A_{\text{total}}=40+12=52\text{ cm}^2`,
                },
                {
                  text: String.raw`Check the size: the triangle is less than half of an $8\times3$ rectangle, and $52$ cm² is larger than the rectangle alone but smaller than a $8\times8$ square. The result is reasonable.`,
                },
              ],
              answer: 'The total area is 52 cm². The rectangle contributes 40 cm² and the triangle contributes 12 cm².',
            },
            {
              title: 'Area of a parallelogram',
              problem: 'A parallelogram has a base of 9 cm and a perpendicular height of 4 cm. Find its area.',
              given: [
                'Base: $9$ cm',
                'Perpendicular height: $4$ cm',
              ],
              steps: [
                {
                  text: 'Choose the parallelogram area formula.',
                  math: String.raw`A=bh`,
                },
                {
                  text: 'Substitute the base and the perpendicular height.',
                  math: String.raw`A=9\times4`,
                },
                {
                  text: 'Multiply.',
                  math: String.raw`A=36`,
                },
                {
                  text: 'Include the square unit. Area is measured in square centimetres.',
                  math: String.raw`A=36\text{ cm}^2`,
                },
                {
                  text: String.raw`Check by comparing with a $9\times4$ rectangle: the parallelogram has the same base and height, so the same area. The slant side is longer than 4 cm, which is why it must not be used as the height.`,
                },
              ],
              answer: 'The area of the parallelogram is 36 cm².',
            },
          ],
          mistakes: [
            {
              mistake: 'Using a slanted side as the height of a parallelogram or triangle.',
              correction:
                'Area formulas need the perpendicular height, the shortest distance between the base and the opposite side or vertex. A slant side is longer, so using it gives an area that is too large.',
            },
            {
              mistake: 'Writing cm² for a perimeter or cm for an area.',
              correction:
                'Perimeter is a length, so it uses cm. Area covers a surface, so it uses cm². Check the unit against the quantity being measured.',
            },
            {
              mistake: String.raw`Forgetting the $\frac{1}{2}$ in the triangle area formula.`,
              correction:
                String.raw`A triangle is half of a parallelogram with the same base and height. For base 10 cm and height 6 cm, the triangle area is $\frac{1}{2}\times10\times6=30$ cm², not 60 cm².`,
            },
          ],
          exercises: [
            {
              id: 'g7-area-ex-1',
              type: 'multiple-choice',
              prompt: 'A rectangle is 9 cm long and 4 cm wide. What is its area?',
              options: [String.raw`$36\text{ cm}^2$`, String.raw`$13\text{ cm}^2$`, String.raw`$26\text{ cm}$`, String.raw`$36\text{ cm}$`],
              correctOption: 0,
              explanation:
                String.raw`Area of a rectangle is $lw=9\times4=36$. Area uses square units, so the answer is 36 cm². The perimeter would be $2(9+4)=26$ cm.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-area-ex-2',
              type: 'multiple-choice',
              prompt: 'A triangle has base 10 cm and perpendicular height 6 cm. What is its area?',
              options: [String.raw`$30\text{ cm}^2$`, String.raw`$60\text{ cm}^2$`, String.raw`$16\text{ cm}^2$`, String.raw`$30\text{ cm}$`],
              correctOption: 0,
              explanation:
                String.raw`$A=\frac{1}{2}bh=\frac{1}{2}\times10\times6=30$ cm². The triangle is half of a $10\times6$ rectangle, which has area 60 cm².`,
              difficulty: 'easy',
            },
            {
              id: 'g7-area-ex-3',
              type: 'numeric',
              prompt: 'A parallelogram has base 7 cm and perpendicular height 4 cm. Find its area in square centimetres.',
              answer: 28,
              tolerance: 0.01,
              answerUnit: 'cm²',
              explanation:
                String.raw`$A=bh=7\times4=28$ cm². The height must be perpendicular to the base; a slanted side would give a different, incorrect value.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-area-ex-4',
              type: 'numeric',
              prompt: 'A rectangle is 12 cm long and 5 cm wide. Find its perimeter in centimetres.',
              answer: 34,
              tolerance: 0.01,
              answerUnit: 'cm',
              explanation:
                '$P=2(l+w)=2(12+5)=2(17)=34$ cm. Adding all four sides gives $12+5+12+5=34$ cm.',
              difficulty: 'medium',
            },
            {
              id: 'g7-area-ex-5',
              type: 'numeric',
              prompt:
                'An L-shaped floor is made from a 10 m by 8 m rectangle with a 4 m by 3 m rectangle removed from one corner. Find the remaining area in square metres.',
              answer: 68,
              tolerance: 0.01,
              answerUnit: 'm²',
              hint: 'Subtract the missing rectangle from the large rectangle.',
              explanation:
                String.raw`The large rectangle has area $10\times8=80$ m². The removed corner has area $4\times3=12$ m². The remaining area is $80-12=68$ m².`,
              difficulty: 'hard',
            },
            {
              id: 'g7-area-ex-6',
              type: 'multiple-choice',
              prompt: 'A triangle has area 24 cm² and base 8 cm. What is its perpendicular height?',
              options: [String.raw`$6\text{ cm}$`, String.raw`$3\text{ cm}$`, String.raw`$12\text{ cm}$`, String.raw`$16\text{ cm}$`],
              correctOption: 0,
              explanation:
                String.raw`Use $A=\frac{1}{2}bh$: $24=\frac{1}{2}\times8\times h$, so $24=4h$ and $h=6$ cm. Check: $\frac{1}{2}\times8\times6=24$ cm².`,
              difficulty: 'hard',
            },
          ],
          related: ['lines-angles-and-triangles', 'circles-intro', 'prisms-and-cubes'],
        },
        {
          id: 'circles-intro',
          title: 'Circles: Circumference and Area',
          subtitle: 'Radius, diameter, circumference, area and what π really means.',
          introduction:
            'A circle is the set of all points at the same distance from a centre. Wheels, plates, clocks and coins are circles, and measuring them needs two formulas: one for the distance around (circumference) and one for the space inside (area). Both depend on a special constant, π, that is the same for every circle.',
          prerequisites: [
            'Multiplying decimals and whole numbers',
            'Squaring a number',
            'Area and perimeter of rectangles',
            'Rounding to two decimal places',
          ],
          keyIdeas: [
            'The diameter is twice the radius: $d=2r$.',
            'Circumference divided by diameter is the same number, π, for every circle.',
            'Circumference is a length (cm); area is a square measure (cm²).',
            'The area formula uses the radius squared, not the diameter.',
          ],
          aliases: ['circle', 'circumference', 'pi', 'radius and diameter', 'area of a circle', 'perimeter of a circle'],
          theory: [
            {
              title: 'Parts of a circle',
              body: [
                String.raw`The radius $r$ is the distance from the centre to any point on the circle. The diameter $d$ is a straight line through the centre joining two points on the circle, so $d=2r$ and $r=\frac{d}{2}$. The circumference $C$ is the distance around the circle.`,
                'A circle with radius 7 cm has diameter 14 cm. A wheel with diameter 60 cm has radius 30 cm. Always check whether a question gives you the radius or the diameter before using a formula.',
              ],
              bullets: [
                'Radius: centre to edge.',
                'Diameter: edge to edge through the centre, $d=2r$.',
                'Circumference: the distance around the edge.',
              ],
            },
            {
              title: 'What π means',
              body: [
                String.raw`If you measure the circumference of any circle and divide it by its diameter, you always get the same number, about 3.14159. This number is called π. It is irrational: its decimal never ends or repeats. That is why $\frac{C}{d}=\pi$ is true for a coin and for a Ferris wheel.`,
                String.raw`Values such as 3.14 or $\frac{22}{7}$ are only approximations of π. For exact answers, leave π in the answer, for example $14\pi$ cm. For decimal answers, use the π button on a calculator and round only at the end.`,
              ],
            },
            {
              title: 'Circumference and area',
              body: [
                String.raw`Rearranging $C=\pi d$ and using $d=2r$ gives $C=2\pi r$. The circumference grows in proportion to the radius: doubling the radius doubles the circumference.`,
                String.raw`The area of a circle is $A=\pi r^2$. Cut a circle into thin sectors and rearrange them into a near-rectangle with length about half the circumference ($\pi r$) and width $r$: its area is $\pi r\times r=\pi r^2$. Because the radius is squared, doubling the radius multiplies the area by 4.`,
              ],
              bullets: [
                String.raw`Circumference: $C=2\pi r=\pi d$.`,
                String.raw`Area: $A=\pi r^2$.`,
                'Doubling $r$ doubles $C$ but quadruples $A$.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-circles-circumference-radius',
              title: 'Circumference from the radius',
              expression: String.raw`C=2\pi r`,
              description:
                'The circumference of a circle is two times π times its radius.',
              spoken: 'C equals two pi r.',
              variables: [
                { symbol: 'C', name: 'circumference', unit: 'cm' },
                { symbol: 'r', name: 'radius', unit: 'cm', note: 'must be positive' },
                { symbol: String.raw`\pi`, name: 'pi', note: 'approximately 3.14159' },
              ],
              conditions: ['$r>0$.', 'Use the radius, not the diameter.'],
              notes: String.raw`Leave answers as a multiple of π for an exact value, e.g. $r=7$ gives $C=14\pi$ cm.`,
              tags: ['circumference', 'circle', 'perimeter of a circle', 'radius', 'pi'],
            },
            {
              id: 'g7-circles-circumference-diameter',
              title: 'Circumference from the diameter',
              expression: String.raw`C=\pi d`,
              description:
                'The circumference of a circle is π times its diameter.',
              spoken: 'C equals pi d.',
              variables: [
                { symbol: 'C', name: 'circumference', unit: 'cm' },
                { symbol: 'd', name: 'diameter', unit: 'cm', note: 'must be positive' },
                { symbol: String.raw`\pi`, name: 'pi', note: 'approximately 3.14159' },
              ],
              conditions: ['$d>0$.', 'Use the diameter, not the radius.'],
              notes: String.raw`This is the definition of π written as $\pi=\frac{C}{d}$. It agrees with $C=2\pi r$ because $d=2r$.`,
              tags: ['circumference', 'diameter', 'pi', 'wheel distance'],
            },
            {
              id: 'g7-circles-area',
              title: 'Area of a circle',
              expression: String.raw`A=\pi r^2`,
              description:
                'The area of a circle is π times the square of its radius.',
              spoken: 'A equals pi r squared.',
              variables: [
                { symbol: 'A', name: 'area', unit: 'cm²' },
                { symbol: 'r', name: 'radius', unit: 'cm', note: 'must be positive' },
                { symbol: String.raw`\pi`, name: 'pi', note: 'approximately 3.14159' },
              ],
              conditions: ['$r>0$.', 'Square the radius first, then multiply by π.'],
              notes: 'If you are given the diameter, halve it to find $r$ before squaring.',
              tags: ['area', 'circle', 'pi r squared', 'radius squared', 'disc'],
            },
          ],
          examples: [
            {
              title: 'Circumference and area from the radius',
              problem: 'A circular pond has radius 7 cm on a scale model. Find its circumference and area, to two decimal places.',
              given: [
                'Radius: $r=7$ cm',
                String.raw`Use the π button on a calculator ($\pi\approx3.14159$).`,
              ],
              steps: [
                {
                  text: 'Choose the circumference formula using the radius.',
                  math: String.raw`C=2\pi r`,
                },
                {
                  text: 'Substitute $r=7$.',
                  math: String.raw`C=2\times\pi\times7=14\pi`,
                },
                {
                  text: 'Evaluate with a calculator.',
                  math: String.raw`C\approx43.98\text{ cm}`,
                },
                {
                  text: 'Choose the area formula and substitute $r=7$. Square the radius first.',
                  math: String.raw`A=\pi r^2=\pi\times7^2=49\pi`,
                },
                {
                  text: 'Evaluate with a calculator, and attach square units.',
                  math: String.raw`A\approx153.94\text{ cm}^2`,
                },
                {
                  text: String.raw`Check: using $\pi\approx3$ gives $C\approx42$ and $A\approx147$, close to the results.`,
                },
              ],
              answer: String.raw`Circumference $=14\pi\approx43.98$ cm; area $=49\pi\approx153.94$ cm².`,
            },
            {
              title: 'Area from the diameter',
              problem: 'A round table has diameter 12 cm in a model. Find the area of its top.',
              given: ['Diameter: $d=12$ cm', 'The area formula needs the radius.'],
              steps: [
                {
                  text: 'Find the radius by halving the diameter.',
                  math: String.raw`r=\frac{d}{2}=\frac{12}{2}=6\text{ cm}`,
                },
                {
                  text: 'Choose the area formula.',
                  math: String.raw`A=\pi r^2`,
                },
                {
                  text: 'Substitute $r=6$.',
                  math: String.raw`A=\pi\times6^2=36\pi`,
                },
                {
                  text: 'Evaluate and attach square units.',
                  math: String.raw`A\approx113.10\text{ cm}^2`,
                },
                {
                  text: String.raw`Check: the circle fits inside a $12\times12=144$ cm² square and covers about $\frac{\pi}{4}\approx78.5\%$ of it, and $113.10\div144\approx0.785$.`,
                },
              ],
              answer: String.raw`The area is $36\pi\approx113.10$ cm².`,
            },
          ],
          mistakes: [
            {
              mistake: String.raw`Using the diameter in $A=\pi r^2$ without halving it.`,
              correction:
                String.raw`The formula needs the radius. For a diameter of 12 cm, use $r=6$ cm, giving $A=36\pi$ cm², not $144\pi$ cm².`,
            },
            {
              mistake: 'Confusing circumference and area, or writing cm for an area.',
              correction:
                'Circumference is a length measured in cm. Area is measured in cm². Ask whether the question wants the distance around or the space inside.',
            },
            {
              mistake: String.raw`Computing $\pi r^2$ as $(\pi r)^2$ or $2\pi r$.`,
              correction:
                String.raw`Only $r$ is squared: $\pi r^2=\pi\times r\times r$. For $r=3$ that is $9\pi\approx28.27$, not $(3\pi)^2\approx88.83$.`,
            },
          ],
          exercises: [
            {
              id: 'g7-circles-ex-1',
              type: 'multiple-choice',
              prompt: 'A circle has diameter 18 cm. What is its radius?',
              options: [String.raw`$9\text{ cm}$`, String.raw`$36\text{ cm}$`, String.raw`$18\pi\text{ cm}$`, String.raw`$6\text{ cm}$`],
              correctOption: 0,
              explanation: String.raw`The radius is half the diameter: $\frac{18}{2}=9$ cm.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-circles-ex-2',
              type: 'multiple-choice',
              prompt: 'What is the exact area of a circle with radius 5 cm?',
              options: [String.raw`$10\pi\text{ cm}^2$`, String.raw`$25\pi\text{ cm}^2$`, String.raw`$5\pi\text{ cm}^2$`, String.raw`$25\pi\text{ cm}$`],
              correctOption: 1,
              explanation: String.raw`$A=\pi r^2=\pi\times5^2=25\pi$ cm². $10\pi$ would be the circumference, which is a length in cm.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-circles-ex-3',
              type: 'numeric',
              prompt: 'Find the circumference of a circle with radius 3 cm. Give your answer to two decimal places.',
              answer: 18.85,
              tolerance: 0.01,
              answerUnit: 'cm',
              explanation: String.raw`$C=2\pi r=2\times\pi\times3=6\pi\approx18.85$ cm.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-circles-ex-4',
              type: 'numeric',
              prompt: 'Find the area of a circle with diameter 20 cm. Give your answer to two decimal places.',
              answer: 314.16,
              tolerance: 0.01,
              answerUnit: 'cm²',
              hint: 'Halve the diameter first.',
              explanation: String.raw`The radius is $\frac{20}{2}=10$ cm. Then $A=\pi\times10^2=100\pi\approx314.16$ cm².`,
              difficulty: 'medium',
            },
            {
              id: 'g7-circles-ex-5',
              type: 'numeric',
              prompt: String.raw`A circle has circumference $16\pi$ cm. Find its radius in centimetres.`,
              answer: 8,
              tolerance: 0.01,
              answerUnit: 'cm',
              hint: String.raw`Set $2\pi r=16\pi$ and divide both sides by $2\pi$.`,
              explanation: String.raw`$2\pi r=16\pi$, so $r=\frac{16\pi}{2\pi}=8$ cm. Check: $2\pi\times8=16\pi$.`,
              difficulty: 'hard',
            },
          ],
          related: ['perimeter-and-area', 'prisms-and-cubes', 'ratios-and-proportions'],
          shapeId: 'circle',
          shapeCaption: 'Change the radius and watch the circumference grow in proportion while the area grows with its square.',
        },
        {
          id: 'prisms-and-cubes',
          title: 'Prisms and Cubes',
          subtitle: 'Nets, surface area and volume of cuboids and cubes.',
          introduction:
            'A cuboid is a box: it has six rectangular faces, twelve edges and eight corners. A cube is a cuboid whose edges are all equal. Packaging designers use surface area to decide how much card is needed, and engineers use volume to decide how much a container can hold.',
          prerequisites: [
            'Area of a rectangle',
            'Multiplying whole numbers and decimals',
            'Powers: squares and cubes',
            'Metric length units',
          ],
          keyIdeas: [
            'A net is a flat pattern that folds into a solid.',
            'Surface area is the total area of all faces, measured in cm².',
            'Volume is the space inside, measured in cm³.',
            'A cuboid has three pairs of equal faces.',
          ],
          aliases: ['cuboid', 'cube', 'volume', 'surface area', 'nets', 'rectangular prism', 'box'],
          theory: [
            {
              title: 'Nets of cuboids and cubes',
              body: [
                'A net unfolds a solid into flat faces joined along edges. A cuboid net has six rectangles; a cube net has six identical squares. Several different layouts fold into the same cube, such as a cross of six squares.',
                String.raw`Counting faces on a net is the first step in finding surface area. Opposite faces of a cuboid are equal, so there are three pairs: top and bottom ($l\times w$), front and back ($l\times h$), left and right ($w\times h$).`,
              ],
            },
            {
              title: 'Surface area',
              body: [
                'Surface area is the sum of the areas of all the faces. For a cuboid, add the three pairs: $SA=2lw+2lh+2wh=2(lw+lh+wh)$. For a cube of edge $s$ all six faces are $s^2$, so $SA=6s^2$.',
                'Surface area is a two-dimensional measure, so the units are squared: cm² or m². A cuboid 8 cm by 5 cm by 3 cm has faces of area 40, 24 and 15 cm², each appearing twice.',
              ],
              bullets: [
                'Top and bottom: $2lw$.',
                'Front and back: $2lh$.',
                'Left and right: $2wh$.',
              ],
            },
            {
              title: 'Volume',
              body: [
                String.raw`Volume counts unit cubes that fill a solid. A cuboid 8 cm long, 5 cm wide and 3 cm high has a layer of $8\times5=40$ cubes, and 3 layers, so $40\times3=120$ cubes: $V=lwh$. A cube has $V=s^3$.`,
                String.raw`Volume is a three-dimensional measure, so the units are cubed: cm³ or m³. If the volume and two dimensions are known, divide to find the third: $h=\frac{V}{lw}$.`,
              ],
              bullets: [
                String.raw`$V=\text{base area}\times\text{height}$.`,
                String.raw`1 m³ $=1\,000\,000$ cm³.`,
                '1 litre $=1000$ cm³.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-prisms-cuboid-volume',
              title: 'Volume of a cuboid',
              expression: String.raw`V=lwh`,
              description:
                'The volume of a cuboid is its length times its width times its height.',
              spoken: 'V equals l times w times h.',
              variables: [
                { symbol: 'V', name: 'volume', unit: 'cm³' },
                { symbol: 'l', name: 'length', unit: 'cm' },
                { symbol: 'w', name: 'width', unit: 'cm' },
                { symbol: 'h', name: 'height', unit: 'cm' },
              ],
              conditions: ['$l>0$, $w>0$ and $h>0$.', 'All three lengths must be in the same unit.'],
              notes: String.raw`Equivalent to base area times height. Rearrange to $h=\frac{V}{lw}$ to find a missing height.`,
              tags: ['volume', 'cuboid', 'rectangular prism', 'length width height'],
            },
            {
              id: 'g7-prisms-cuboid-surface-area',
              title: 'Surface area of a cuboid',
              expression: String.raw`SA=2(lw+lh+wh)`,
              description:
                'The surface area of a cuboid is twice the sum of the areas of its three different faces.',
              spoken: 'S A equals two times, l w plus l h plus w h.',
              variables: [
                { symbol: 'SA', name: 'surface area', unit: 'cm²' },
                { symbol: 'l', name: 'length', unit: 'cm' },
                { symbol: 'w', name: 'width', unit: 'cm' },
                { symbol: 'h', name: 'height', unit: 'cm' },
              ],
              conditions: ['$l>0$, $w>0$ and $h>0$.', 'All three lengths must be in the same unit.'],
              notes: 'Each of the three face areas appears twice because opposite faces are equal.',
              tags: ['surface area', 'cuboid', 'net', 'total area of faces'],
            },
            {
              id: 'g7-prisms-cube',
              title: 'Volume and surface area of a cube',
              expression: String.raw`V=s^3,\quad SA=6s^2`,
              description:
                'A cube with edge length s has volume s cubed and six faces each of area s squared.',
              spoken: 'V equals s cubed, and S A equals six s squared.',
              variables: [
                { symbol: 'V', name: 'volume', unit: 'cm³' },
                { symbol: 'SA', name: 'surface area', unit: 'cm²' },
                { symbol: 's', name: 'edge length', unit: 'cm' },
              ],
              conditions: ['$s>0$.', 'All twelve edges of a cube have the same length.'],
              notes: 'A cube is a cuboid with $l=w=h=s$.',
              tags: ['cube', 'volume', 'surface area', 's cubed', 'six faces'],
            },
          ],
          examples: [
            {
              title: 'Volume and surface area of a cuboid',
              problem: 'A cuboid box is 8 cm long, 5 cm wide and 3 cm high. Find its volume and surface area.',
              given: ['Length: $l=8$ cm', 'Width: $w=5$ cm', 'Height: $h=3$ cm'],
              steps: [
                {
                  text: 'Use the volume formula.',
                  math: String.raw`V=lwh`,
                },
                {
                  text: 'Substitute and multiply.',
                  math: String.raw`V=8\times5\times3=120\text{ cm}^3`,
                },
                {
                  text: 'Use the surface area formula.',
                  math: String.raw`SA=2(lw+lh+wh)`,
                },
                {
                  text: 'Substitute the three face areas: $lw=40$, $lh=24$, $wh=15$.',
                  math: String.raw`SA=2(40+24+15)`,
                },
                {
                  text: 'Add inside the brackets, then double.',
                  math: String.raw`SA=2\times79=158\text{ cm}^2`,
                },
                {
                  text: 'Check by adding all six faces: $40+40+24+24+15+15=158$.',
                },
              ],
              answer: 'Volume $=120$ cm³; surface area $=158$ cm².',
            },
            {
              title: 'Finding a missing height',
              problem: 'A tank with a rectangular base 40 cm by 25 cm holds 30 000 cm³ of water when full. How tall is the tank?',
              given: ['Base: $l=40$ cm, $w=25$ cm', 'Volume: $V=30000$ cm³'],
              steps: [
                {
                  text: 'Write the volume formula.',
                  math: String.raw`V=lwh`,
                },
                {
                  text: 'Substitute the known values.',
                  math: String.raw`30000=40\times25\times h`,
                },
                {
                  text: 'Find the base area.',
                  math: String.raw`30000=1000h`,
                },
                {
                  text: 'Divide both sides by 1000.',
                  math: String.raw`h=\frac{30000}{1000}=30`,
                },
                {
                  text: String.raw`Check: $40\times25\times30=30000$ cm³, and the unit for a height is cm.`,
                },
              ],
              answer: 'The tank is 30 cm tall.',
            },
          ],
          mistakes: [
            {
              mistake: 'Using the area formula $lw$ for volume, or giving volume in cm².',
              correction:
                'Volume needs three dimensions, $V=lwh$, and is measured in cm³. Surface area is measured in cm².',
            },
            {
              mistake: 'Forgetting that a cuboid has six faces and counting only three.',
              correction:
                'The three different faces each appear twice. Use $SA=2(lw+lh+wh)$, or add six areas from the net.',
            },
            {
              mistake: String.raw`Computing $s^3$ as $3s$ or $s\times3$.`,
              correction:
                String.raw`$s^3=s\times s\times s$. For $s=4$, $s^3=64$, not 12.`,
            },
          ],
          exercises: [
            {
              id: 'g7-prisms-ex-1',
              type: 'multiple-choice',
              prompt: 'How many faces does the net of a cuboid have?',
              options: ['4', '6', '8', '12'],
              correctOption: 1,
              explanation: 'A cuboid has six rectangular faces, so its net has six rectangles. (It has 12 edges and 8 vertices.)',
              difficulty: 'easy',
            },
            {
              id: 'g7-prisms-ex-2',
              type: 'multiple-choice',
              prompt: 'What is the volume of a cuboid measuring 6 cm by 4 cm by 2 cm?',
              options: [String.raw`$12\text{ cm}^3$`, String.raw`$48\text{ cm}^3$`, String.raw`$48\text{ cm}^2$`, String.raw`$88\text{ cm}^3$`],
              correctOption: 1,
              explanation: String.raw`$V=lwh=6\times4\times2=48$ cm³. Volume is measured in cubic units.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-prisms-ex-3',
              type: 'numeric',
              prompt: 'Find the surface area of a cuboid measuring 10 cm by 4 cm by 3 cm.',
              answer: 164,
              tolerance: 0.01,
              answerUnit: 'cm²',
              explanation: String.raw`$SA=2(lw+lh+wh)=2(40+30+12)=2\times82=164$ cm².`,
              difficulty: 'medium',
            },
            {
              id: 'g7-prisms-ex-4',
              type: 'numeric',
              prompt: 'Find the surface area of a cube with edge length 5 cm.',
              answer: 150,
              tolerance: 0.01,
              answerUnit: 'cm²',
              explanation: String.raw`$SA=6s^2=6\times25=150$ cm². The volume would be $5^3=125$ cm³.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-prisms-ex-5',
              type: 'numeric',
              prompt: 'A cuboid has volume 240 cm³, length 10 cm and width 6 cm. Find its height in centimetres.',
              answer: 4,
              tolerance: 0.01,
              answerUnit: 'cm',
              hint: 'Divide the volume by the base area $lw$.',
              explanation: String.raw`$240=10\times6\times h=60h$, so $h=4$ cm. Check: $10\times6\times4=240$.`,
              difficulty: 'hard',
            },
          ],
          related: ['perimeter-and-area', 'circles-intro', 'exponents-and-powers'],
          shapeId: 'cuboid',
          shapeCaption: 'Change the length, width and height of the cuboid and watch its volume and surface area update.',
        },
      ],
    },
    {
      id: 'statistics-probability',
      family: 'statistics-probability',
      title: 'Statistics & Probability',
      description:
        'Collecting and displaying data, summarising it with averages, and measuring how likely events are.',
      topics: [
        {
          id: 'data-and-graphs',
          title: 'Data and Graphs',
          subtitle: 'Tables, bar charts, line graphs and pie charts, and how to read them critically.',
          introduction:
            'Data are facts or measurements collected to answer a question. A raw list of numbers is hard to understand, so we organise it in tables and draw graphs. The right graph makes a pattern easy to see; a poorly drawn one can mislead. This topic shows how to build and read the common displays.',
          prerequisites: [
            'Fractions, decimals and percentages',
            'Multiplying and dividing whole numbers',
            'Reading a scale on an axis',
            'Angles in a full turn (360°)',
          ],
          keyIdeas: [
            'A frequency table counts how often each value or category occurs.',
            'Bar charts compare categories; line graphs show change over time; pie charts show parts of a whole.',
            String.raw`In a pie chart, each sector angle is $\frac{f}{n}\times360^{\circ}$.`,
            'Check axes and scales before trusting a graph.',
          ],
          aliases: ['bar chart', 'pie chart', 'line graph', 'frequency table', 'tally', 'statistics graphs'],
          theory: [
            {
              title: 'Collecting and organising data',
              body: [
                String.raw`Data can be categorical (favourite sport, colour) or numerical (height, number of pets). A tally chart records each observation with a mark, and a frequency table lists each category with its frequency $f$, the number of times it occurs. The total frequency $n$ is the number of observations.`,
                String.raw`For example, if 40 students are asked their favourite sport and the frequencies are football 15, swimming 10, tennis 6 and basketball 9, then $15+10+6+9=40=n$. Always check that the frequencies add to the total.`,
              ],
            },
            {
              title: 'Choosing and reading graphs',
              body: [
                'A bar chart uses bars of equal width whose heights show frequencies; use it to compare categories. A line graph joins points in order and shows how a quantity changes over time, such as temperature across a day. A pie chart divides a circle into sectors in proportion to each category and is best for showing parts of a whole.',
                'Every graph needs a title, labelled axes with units, and an even scale. Read the scale carefully: the height of a bar only means something relative to the axis.',
              ],
              bullets: [
                'Bar chart: compare categories.',
                'Line graph: trends over time.',
                'Pie chart: share of the whole.',
              ],
            },
            {
              title: 'Pie charts and misleading displays',
              body: [
                String.raw`A full circle is $360^{\circ}$. A category with frequency $f$ out of $n$ gets a sector of angle $\frac{f}{n}\times360^{\circ}$. Fractions and percentages come from the same ratio: $\frac{f}{n}$ is the fraction and $\frac{f}{n}\times100\%$ is the percentage.`,
                'Graphs can mislead. A bar chart whose vertical axis starts at 50 instead of 0 makes small differences look huge. Uneven scales, missing labels and 3D effects also distort what the data say. Before drawing conclusions, ask what the axis starts at, whether the scale is even and how the data were collected.',
              ],
              bullets: [
                'Check that the axis starts at zero for bar charts.',
                'Check that scale steps are equal.',
                String.raw`Check that sector angles add to $360^{\circ}$.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-data-total-frequency',
              title: 'Total frequency',
              expression: String.raw`n=f_1+f_2+\cdots+f_k`,
              description: 'The total number of observations is the sum of all the frequencies.',
              spoken: 'n equals f one plus f two and so on up to f k.',
              variables: [
                { symbol: 'n', name: 'total number of observations' },
                { symbol: 'f_i', name: 'frequency of category i', note: 'a whole number, at least 0' },
                { symbol: 'k', name: 'number of categories' },
              ],
              conditions: ['Each category is counted once, with no overlaps.'],
              notes: 'Use this to check a frequency table before calculating anything else.',
              tags: ['frequency table', 'total frequency', 'tally', 'count'],
            },
            {
              id: 'g7-data-relative-frequency',
              title: 'Fraction and percentage of a category',
              expression: String.raw`\text{fraction}=\frac{f}{n},\quad \text{percentage}=\frac{f}{n}\times100\%`,
              description: 'The share of a category is its frequency divided by the total frequency.',
              spoken: 'The fraction is f over n, and the percentage is f over n times one hundred percent.',
              variables: [
                { symbol: 'f', name: 'frequency of the category' },
                { symbol: 'n', name: 'total frequency', note: 'must be greater than 0' },
              ],
              conditions: ['$n>0$.', String.raw`$0\le f\le n$.`],
              notes: 'All fractions in a frequency table add to 1, and all percentages add to 100%.',
              tags: ['relative frequency', 'percentage', 'fraction of data', 'proportion'],
            },
            {
              id: 'g7-data-pie-angle',
              title: 'Pie chart sector angle',
              expression: String.raw`\theta=\frac{f}{n}\times360^{\circ}`,
              description: 'The angle of a pie chart sector is its fraction of the data multiplied by 360 degrees.',
              spoken: 'Theta equals f over n times three hundred sixty degrees.',
              variables: [
                { symbol: String.raw`\theta`, name: 'sector angle', unit: '°' },
                { symbol: 'f', name: 'frequency of the category' },
                { symbol: 'n', name: 'total frequency', note: 'must be greater than 0' },
              ],
              conditions: ['$n>0$.', String.raw`The sector angles of all categories add to $360^{\circ}$.`],
              notes: 'Use a protractor to draw each sector from a starting radius.',
              tags: ['pie chart', 'sector angle', 'degrees', 'circle graph'],
            },
          ],
          examples: [
            {
              title: 'Drawing a pie chart',
              problem: 'In a survey of 40 students, favourite sports were: football 15, swimming 10, tennis 6, basketball 9. Find the pie chart angle for each sport.',
              given: ['Frequencies: 15, 10, 6, 9', String.raw`A full circle is $360^{\circ}$.`],
              steps: [
                { text: 'Find the total frequency.', math: String.raw`n=15+10+6+9=40` },
                { text: 'Use the sector angle formula. Football:', math: String.raw`\frac{15}{40}\times360^{\circ}=135^{\circ}` },
                { text: 'Swimming:', math: String.raw`\frac{10}{40}\times360^{\circ}=90^{\circ}` },
                { text: 'Tennis:', math: String.raw`\frac{6}{40}\times360^{\circ}=54^{\circ}` },
                { text: 'Basketball:', math: String.raw`\frac{9}{40}\times360^{\circ}=81^{\circ}` },
                { text: 'Check that the angles add to a full turn.', math: String.raw`135^{\circ}+90^{\circ}+54^{\circ}+81^{\circ}=360^{\circ}` },
              ],
              answer: String.raw`Football $135^{\circ}$, swimming $90^{\circ}$, tennis $54^{\circ}$, basketball $81^{\circ}$.`,
            },
            {
              title: 'Reading a bar chart',
              problem: 'A bar chart shows the number of books read by four classes: 12, 8, 15 and 5. What percentage of all books did the top class read?',
              given: ['Frequencies: 12, 8, 15, 5', 'The top class read 15 books.'],
              steps: [
                { text: 'Find the total number of books.', math: String.raw`n=12+8+15+5=40` },
                { text: 'Write the top class as a fraction of the total.', math: String.raw`\frac{f}{n}=\frac{15}{40}` },
                { text: 'Convert to a decimal.', math: String.raw`\frac{15}{40}=0.375` },
                { text: 'Multiply by 100 to get a percentage.', math: String.raw`0.375\times100\%=37.5\%` },
                { text: 'Check: 37.5% is a little more than one third, and 15 is a little more than a third of 40.' },
              ],
              answer: String.raw`The top class read $37.5\%$ of the books.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Starting the vertical axis of a bar chart above zero.',
              correction:
                'A truncated axis exaggerates differences. Bars should start at 0 so that bar heights are proportional to frequencies.',
            },
            {
              mistake: 'Using a line graph for unrelated categories.',
              correction:
                'A line joining points suggests a trend between them. Use a bar chart for separate categories such as sports or colours.',
            },
            {
              mistake: 'Dividing by the largest frequency instead of the total when finding a share.',
              correction:
                String.raw`The share is $\frac{f}{n}$ with $n$ the total of all frequencies. For frequencies 12, 8, 15, 5, the share of 15 is $\frac{15}{40}$, not $\frac{15}{15}$.`,
            },
          ],
          exercises: [
            {
              id: 'g7-data-ex-1',
              type: 'multiple-choice',
              prompt: 'Which graph is best for showing how a town’s temperature changes over 24 hours?',
              options: ['Pie chart', 'Line graph', 'Tally chart', 'Frequency of colours'],
              correctOption: 1,
              explanation: 'A line graph joins points in time order and shows the trend. A pie chart shows parts of a whole.',
              difficulty: 'easy',
            },
            {
              id: 'g7-data-ex-2',
              type: 'multiple-choice',
              prompt: String.raw`A sector of a pie chart has angle $90^{\circ}$. What fraction of the data does it represent?`,
              options: [String.raw`$\frac{1}{2}$`, String.raw`$\frac{1}{3}$`, String.raw`$\frac{1}{4}$`, String.raw`$\frac{1}{8}$`],
              correctOption: 2,
              explanation: String.raw`$\frac{90}{360}=\frac{1}{4}$.`,
              difficulty: 'easy',
            },
            {
              id: 'g7-data-ex-3',
              type: 'numeric',
              prompt: 'In a survey of 60 people, 18 chose tea. Find the pie chart angle for tea in degrees.',
              answer: 108,
              tolerance: 0.01,
              answerUnit: '°',
              explanation: String.raw`$\frac{18}{60}\times360^{\circ}=0.3\times360^{\circ}=108^{\circ}$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-data-ex-4',
              type: 'numeric',
              prompt: 'Of 60 students, 27 walk to school. What percentage walk?',
              answer: 45,
              tolerance: 0.01,
              answerUnit: '%',
              explanation: String.raw`$\frac{27}{60}=0.45$, and $0.45\times100\%=45\%$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-data-ex-5',
              type: 'multiple-choice',
              prompt: 'A bar chart compares two shops’ sales of 52 and 55 units, but its vertical axis starts at 50. What is the problem?',
              options: [
                'The bars look as if one shop sold about 3 times more than the other.',
                'The bars are too thin.',
                'The totals do not add to 360.',
                'A pie chart must always be used.',
              ],
              correctOption: 0,
              hint: 'Compare the bar heights above 50: 2 and 5.',
              explanation: 'With the axis starting at 50, the bars have heights 2 and 5 above the baseline, so the second looks 2.5 times as tall although the sales differ by only about 6%.',
              difficulty: 'hard',
            },
          ],
          related: ['averages', 'probability-intro', 'ratios-and-proportions'],
        },
        {
          id: 'averages',
          title: 'Averages and Range',
          subtitle: 'Mean, median, mode and range as ways of summarising a data set.',
          introduction:
            'One number can summarise a whole data set. The mean, median and mode are three different averages, each describing the centre of the data in its own way, and the range describes how spread out the data are. Choosing the right average matters when data contain an unusually large or small value.',
          prerequisites: [
            'Adding and dividing decimals',
            'Ordering numbers from smallest to largest',
            'Fractions and decimals',
            'Reading frequency tables',
          ],
          keyIdeas: [
            'Mean: total of the values divided by how many there are.',
            'Median: the middle value when the data are in order.',
            'Mode: the most frequent value; a set can have no mode or several.',
            'Range: largest value minus smallest value.',
          ],
          aliases: ['mean', 'median', 'mode', 'range', 'average', 'central tendency'],
          theory: [
            {
              title: 'The mean',
              body: [
                String.raw`The mean is the "fair share" value: add all the values and divide by how many there are, $\text{mean}=\frac{\text{sum of values}}{n}$. For 5, 8, 12, 3, 7 the sum is 35 and $n=5$, so the mean is 7.`,
                'The mean uses every value, so one extreme value can pull it up or down. It does not have to be a value in the data set, and it need not be a whole number.',
              ],
            },
            {
              title: 'The median and the mode',
              body: [
                String.raw`To find the median, write the values in order. If $n$ is odd, the median is the middle value, in position $\frac{n+1}{2}$. If $n$ is even, it is the mean of the two middle values. For 2, 5, 9, 11, 20 the median is 9. For 3, 7, 9, 12, 15, 20 it is $\frac{9+12}{2}=10.5$.`,
                'The mode is the value that occurs most often. It is the only average that works for categories such as colours. Data with two equally common values are bimodal. Data in which every value occurs once have no mode.',
              ],
              bullets: [
                'Always sort the data before finding the median.',
                'The median is not affected by extreme values.',
                'The mode can be a category, not just a number.',
              ],
            },
            {
              title: 'The range and choosing an average',
              body: [
                'The range is the largest value minus the smallest value. It measures spread: two classes can have the same mean but very different ranges. A small range means the values are close together.',
                'For the data 3, 4, 5, 6, 102 the mean is 24 but the median is 5. The outlier 102 drags the mean up, so the median describes the typical value better. When data are fairly even, the mean is a good choice.',
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-averages-mean',
              title: 'Mean',
              expression: String.raw`\bar{x}=\frac{x_1+x_2+\cdots+x_n}{n}`,
              description: 'The mean is the sum of all the values divided by the number of values.',
              spoken: 'x bar equals the sum of the values divided by n.',
              variables: [
                { symbol: String.raw`\bar{x}`, name: 'mean' },
                { symbol: 'x_i', name: 'each data value' },
                { symbol: 'n', name: 'number of values', note: 'must be at least 1' },
              ],
              conditions: [String.raw`$n\ge1$.`, 'Include every value, including repeated ones.'],
              notes: String.raw`Rearranged, the total is $n\times\bar{x}$, which helps find a missing value.`,
              tags: ['mean', 'average', 'sum divided by count', 'arithmetic mean'],
            },
            {
              id: 'g7-averages-median-position',
              title: 'Position of the median',
              expression: String.raw`\text{median position}=\frac{n+1}{2}`,
              description: 'In an ordered list of n values, the median is at this position; if it is a half, average the two middle values.',
              spoken: 'The median is at position n plus one, over two.',
              variables: [
                { symbol: 'n', name: 'number of values', note: 'must be at least 1' },
              ],
              conditions: ['The data must first be sorted in order.', 'If the position ends in .5, take the mean of the two values either side.'],
              notes: 'For $n=7$ the position is 4; for $n=8$ it is 4.5, between the 4th and 5th values.',
              tags: ['median', 'middle value', 'ordered data', 'median position'],
            },
            {
              id: 'g7-averages-range',
              title: 'Range',
              expression: String.raw`\text{range}=x_{\max}-x_{\min}`,
              description: 'The range is the difference between the largest and smallest values.',
              spoken: 'Range equals the maximum value minus the minimum value.',
              variables: [
                { symbol: String.raw`x_{\max}`, name: 'largest value' },
                { symbol: String.raw`x_{\min}`, name: 'smallest value' },
              ],
              conditions: ['The range is never negative.'],
              notes: 'A range of 0 means every value is the same.',
              tags: ['range', 'spread', 'largest minus smallest', 'dispersion'],
            },
          ],
          examples: [
            {
              title: 'Mean, median, mode and range',
              problem: 'Eight students scored 7, 3, 10, 5, 7, 8, 4 and 6 in a quiz. Find the mean, median, mode and range.',
              given: ['Scores: 7, 3, 10, 5, 7, 8, 4, 6', 'Number of values: $n=8$'],
              steps: [
                { text: 'Add the scores.', math: String.raw`7+3+10+5+7+8+4+6=50` },
                { text: 'Divide by $n=8$ to find the mean.', math: String.raw`\text{mean}=\frac{50}{8}=6.25` },
                { text: 'Sort the scores to find the median.', math: String.raw`3,\ 4,\ 5,\ 6,\ 7,\ 7,\ 8,\ 10` },
                { text: 'With $n=8$, the position is $4.5$, so average the 4th and 5th values.', math: String.raw`\text{median}=\frac{6+7}{2}=6.5` },
                { text: 'The most common score is 7 (twice). The range is the largest minus the smallest.', math: String.raw`\text{mode}=7,\quad \text{range}=10-3=7` },
              ],
              answer: 'Mean $=6.25$, median $=6.5$, mode $=7$, range $=7$ (marks).',
            },
            {
              title: 'Finding a missing value from the mean',
              problem: 'The mean of five numbers is 12. Four of them are 10, 14, 9 and 15. Find the fifth number.',
              given: ['Mean $=12$, $n=5$', 'Known values: 10, 14, 9, 15'],
              steps: [
                { text: 'The total of all five numbers is the mean times $n$.', math: String.raw`\text{total}=12\times5=60` },
                { text: 'Add the four known numbers.', math: String.raw`10+14+9+15=48` },
                { text: 'Subtract to find the missing number.', math: String.raw`60-48=12` },
                { text: String.raw`Check: $\frac{10+14+9+15+12}{5}=\frac{60}{5}=12$.` },
              ],
              answer: 'The fifth number is 12.',
            },
          ],
          mistakes: [
            {
              mistake: 'Finding the median without sorting the data first.',
              correction:
                'The median is the middle of the ordered list. For 9, 2, 5, 20, 11 the middle of the list as written is 5, but sorted (2, 5, 9, 11, 20) the median is 9.',
            },
            {
              mistake: 'Dividing by the wrong count when finding the mean.',
              correction:
                String.raw`Divide by the number of values, including repeats. For 4, 4, 10 the mean is $\frac{18}{3}=6$, not $\frac{18}{2}$.`,
            },
            {
              mistake: 'Taking the range as the middle of the data or adding the extremes.',
              correction:
                'The range is largest minus smallest. For 3 to 10 it is $10-3=7$, not $13$.',
            },
          ],
          exercises: [
            {
              id: 'g7-averages-ex-1',
              type: 'multiple-choice',
              prompt: 'What is the median of 2, 5, 9, 11, 20?',
              options: ['$5$', '$9$', '$11$', '$9.4$'],
              correctOption: 1,
              explanation: 'The data are already in order and the middle (third) value is 9. The mean is 9.4, but the median is 9.',
              difficulty: 'easy',
            },
            {
              id: 'g7-averages-ex-2',
              type: 'multiple-choice',
              prompt: 'What is the mode of 3, 5, 5, 7, 8, 5, 9?',
              options: ['$5$', '$3$', '$7$', '$6$'],
              correctOption: 0,
              explanation: '5 appears three times, more than any other value.',
              difficulty: 'easy',
            },
            {
              id: 'g7-averages-ex-3',
              type: 'numeric',
              prompt: 'Find the mean of 5, 8, 12, 3 and 7.',
              answer: 7,
              tolerance: 0.01,
              explanation: String.raw`The sum is $5+8+12+3+7=35$ and $\frac{35}{5}=7$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-averages-ex-4',
              type: 'numeric',
              prompt: 'Find the range of 23, 8, 15, 31 and 19.',
              answer: 23,
              tolerance: 0.01,
              explanation: 'Largest $=31$, smallest $=8$, so the range is $31-8=23$.',
              difficulty: 'medium',
            },
            {
              id: 'g7-averages-ex-5',
              type: 'numeric',
              prompt: 'Find the median of 12, 7, 3, 15, 9 and 20.',
              answer: 10.5,
              tolerance: 0.01,
              hint: 'Sort the data first, then average the two middle values.',
              explanation: String.raw`Sorted: 3, 7, 9, 12, 15, 20. The two middle values are 9 and 12, so the median is $\frac{9+12}{2}=10.5$.`,
              difficulty: 'hard',
            },
          ],
          related: ['data-and-graphs', 'probability-intro', 'rational-numbers'],
        },
        {
          id: 'probability-intro',
          title: 'Introduction to Probability',
          subtitle: 'Sample space, theoretical and experimental probability, and the complement.',
          introduction:
            'Probability measures how likely an event is, on a scale from 0 (impossible) to 1 (certain). It is used in weather forecasts, games and quality control. This topic covers listing outcomes, calculating the probability of simple events, and comparing what theory predicts with what experiments produce.',
          prerequisites: [
            'Fractions, decimals and percentages',
            'Simplifying fractions',
            'Counting and listing outcomes',
            'Ratios as parts of a whole',
          ],
          keyIdeas: [
            'Probability is always between 0 and 1 inclusive.',
            String.raw`Equally likely outcomes: $P=\frac{\text{favourable}}{\text{total}}$.`,
            'The probabilities of an event and its complement add to 1.',
            'Experimental results approach theoretical probability as trials increase.',
          ],
          aliases: ['chance', 'likelihood', 'sample space', 'complement', 'theoretical probability', 'experimental probability'],
          theory: [
            {
              title: 'Outcomes, events and the sample space',
              body: [
                'An experiment is an action with an uncertain result, such as rolling a die. Each possible result is an outcome, and the set of all outcomes is the sample space. For a die it is {1, 2, 3, 4, 5, 6}; for tossing two coins it is {HH, HT, TH, TT}, which has 4 outcomes.',
                'An event is a set of outcomes we are interested in, such as "an even number". Outcomes are equally likely when none is favoured over another, as for a fair die or a fair coin.',
              ],
            },
            {
              title: 'Theoretical probability and the complement',
              body: [
                String.raw`When all outcomes are equally likely, $P(A)=\frac{\text{number of favourable outcomes}}{\text{total number of outcomes}}$. Rolling a fair die, the event "prime" has favourable outcomes {2, 3, 5}, so $P=\frac{3}{6}=\frac{1}{2}$.`,
                String.raw`The complement of event $A$ is "not $A$". Since $A$ either happens or does not, $P(\text{not }A)=1-P(A)$. If the chance of rain is 0.35, the chance of no rain is $1-0.35=0.65$. Probabilities may be written as fractions, decimals or percentages, but never below 0 or above 1.`,
              ],
              bullets: [
                '$P=0$: impossible.',
                '$P=1$: certain.',
                '$P=0.5$: even chance.',
              ],
            },
            {
              title: 'Experimental probability',
              body: [
                String.raw`Experimental (relative frequency) probability is found by doing an experiment: $\frac{\text{times the event occurred}}{\text{number of trials}}$. If a coin is tossed 80 times and shows heads 46 times, the experimental probability of heads is $\frac{46}{80}=0.575$.`,
                String.raw`The theoretical probability of heads is 0.5, but an experiment rarely matches exactly. With more trials, the relative frequency usually gets closer to the theoretical value. The expected number of an event in $N$ trials is $N\times P$, for example $80\times0.5=40$ heads.`,
              ],
            },
          ],
          formulas: [
            {
              id: 'g7-probability-theoretical',
              title: 'Theoretical probability',
              expression: String.raw`P(A)=\frac{\text{favourable outcomes}}{\text{total outcomes}}`,
              description: 'For equally likely outcomes, the probability of an event is the number of favourable outcomes divided by the total number of outcomes.',
              spoken: 'P of A equals favourable outcomes over total outcomes.',
              variables: [
                { symbol: 'P(A)', name: 'probability of event A', note: 'between 0 and 1' },
                { symbol: String.raw`\text{favourable}`, name: 'number of outcomes in event A' },
                { symbol: String.raw`\text{total}`, name: 'number of outcomes in the sample space', note: 'must be greater than 0' },
              ],
              conditions: ['All outcomes must be equally likely.', String.raw`$0\le P(A)\le1$.`],
              notes: 'Simplify fractions, or give a decimal or percentage.',
              tags: ['probability', 'theoretical probability', 'favourable outcomes', 'sample space', 'chance'],
            },
            {
              id: 'g7-probability-complement',
              title: 'Complement rule',
              expression: String.raw`P(\text{not }A)=1-P(A)`,
              description: 'The probability that an event does not happen is 1 minus the probability that it does.',
              spoken: 'P of not A equals one minus P of A.',
              variables: [
                { symbol: 'P(A)', name: 'probability of event A', note: 'between 0 and 1' },
                { symbol: String.raw`P(\text{not }A)`, name: 'probability that A does not happen' },
              ],
              conditions: [String.raw`$0\le P(A)\le1$.`],
              notes: 'Often easier than counting: "at least one" problems use the complement of "none".',
              tags: ['complement', 'not event', 'probability', 'one minus p'],
            },
            {
              id: 'g7-probability-experimental',
              title: 'Experimental probability',
              expression: String.raw`\text{relative frequency}=\frac{\text{times event occurred}}{\text{number of trials}}`,
              description: 'The experimental probability of an event is how often it occurred divided by the number of trials.',
              spoken: 'Relative frequency equals the number of times the event occurred over the number of trials.',
              variables: [
                { symbol: String.raw`\text{times event occurred}`, name: 'frequency of the event' },
                { symbol: String.raw`\text{number of trials}`, name: 'total repetitions', note: 'must be greater than 0' },
              ],
              conditions: ['The number of trials is greater than 0.', 'Each trial is performed under the same conditions.'],
              notes: 'More trials give a more reliable estimate.',
              tags: ['experimental probability', 'relative frequency', 'trials', 'expected value'],
            },
          ],
          examples: [
            {
              title: 'Probability with a die',
              problem: 'A fair six-sided die is rolled. Find the probability of rolling a prime number, and the probability of not rolling a prime.',
              given: ['Sample space: {1, 2, 3, 4, 5, 6}, so 6 equally likely outcomes', 'Primes on the die: 2, 3, 5'],
              steps: [
                { text: 'Count the favourable outcomes.', math: String.raw`\text{favourable}=3\quad(2,\,3,\,5)` },
                { text: 'Count the total outcomes.', math: String.raw`\text{total}=6` },
                { text: 'Use the probability formula.', math: String.raw`P(\text{prime})=\frac{3}{6}=\frac{1}{2}` },
                { text: 'Use the complement rule.', math: String.raw`P(\text{not prime})=1-\frac{1}{2}=\frac{1}{2}` },
                { text: String.raw`Check by counting the non-primes {1, 4, 6}: $\frac{3}{6}=\frac{1}{2}$. Both agree.` },
              ],
              answer: String.raw`$P(\text{prime})=\frac{1}{2}$ and $P(\text{not prime})=\frac{1}{2}$.`,
            },
            {
              title: 'Probability with a bag of counters',
              problem: 'A bag holds 5 red, 3 blue and 2 green counters. One is drawn at random. Find the probability that it is not green.',
              given: ['Red 5, blue 3, green 2', 'Total counters: $5+3+2=10$'],
              steps: [
                { text: 'Find the probability of green.', math: String.raw`P(\text{green})=\frac{2}{10}=\frac{1}{5}` },
                { text: 'Apply the complement rule.', math: String.raw`P(\text{not green})=1-\frac{1}{5}=\frac{4}{5}` },
                { text: 'Convert to a decimal.', math: String.raw`\frac{4}{5}=0.8` },
                { text: String.raw`Check by counting the non-green counters: $5+3=8$, and $\frac{8}{10}=0.8$.` },
              ],
              answer: String.raw`The probability of not drawing green is $\frac{4}{5}=0.8$.`,
            },
          ],
          mistakes: [
            {
              mistake: 'Giving a probability greater than 1 or negative.',
              correction:
                String.raw`Probabilities lie between 0 and 1 inclusive. A result such as $\frac{7}{5}$ or $-0.2$ means a calculation error, often dividing by the wrong total.`,
            },
            {
              mistake: 'Treating outcomes as equally likely when they are not.',
              correction:
                String.raw`The formula $\frac{\text{favourable}}{\text{total}}$ only works if outcomes are equally likely. A spinner with sectors of different sizes does not give equal chances.`,
            },
            {
              mistake: 'Expecting experimental results to match theory exactly.',
              correction:
                'In 10 coin tosses, 7 heads is quite possible. Experimental probability varies, and approaches the theoretical value as the number of trials grows.',
            },
          ],
          exercises: [
            {
              id: 'g7-probability-ex-1',
              type: 'multiple-choice',
              prompt: 'Two fair coins are tossed. How many outcomes are in the sample space?',
              options: ['2', '3', '4', '6'],
              correctOption: 2,
              explanation: 'The outcomes are HH, HT, TH and TT, which is 4. (HT and TH are different outcomes.)',
              difficulty: 'easy',
            },
            {
              id: 'g7-probability-ex-2',
              type: 'multiple-choice',
              prompt: 'Which value cannot be a probability?',
              options: ['$0$', String.raw`$\frac{3}{8}$`, '$1.2$', String.raw`$100\%$`],
              correctOption: 2,
              explanation: 'Probabilities must be between 0 and 1 inclusive. 1.2 is greater than 1, so it is impossible. 0 means impossible and 100% means certain.',
              difficulty: 'easy',
            },
            {
              id: 'g7-probability-ex-3',
              type: 'numeric',
              prompt: 'The probability of rain tomorrow is 0.35. Find the probability that it does not rain.',
              answer: 0.65,
              tolerance: 0.001,
              explanation: String.raw`$P(\text{not rain})=1-0.35=0.65$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-probability-ex-4',
              type: 'numeric',
              prompt: 'A bag contains 4 red counters out of 20 counters in total. Find the probability of drawing a red counter, as a decimal.',
              answer: 0.2,
              tolerance: 0.001,
              explanation: String.raw`$P(\text{red})=\frac{4}{20}=\frac{1}{5}=0.2$.`,
              difficulty: 'medium',
            },
            {
              id: 'g7-probability-ex-5',
              type: 'numeric',
              prompt: 'A coin is tossed 80 times and lands heads 46 times. Find the experimental probability of heads, as a decimal.',
              answer: 0.575,
              tolerance: 0.001,
              hint: 'Divide the number of heads by the number of trials.',
              explanation: String.raw`$\frac{46}{80}=0.575$. This is close to, but not exactly, the theoretical value 0.5.`,
              difficulty: 'hard',
            },
          ],
          related: ['data-and-graphs', 'averages', 'ratios-and-proportions'],
        },
      ],
    },
  ],
}
