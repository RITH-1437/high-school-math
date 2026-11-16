import type { GraphArea, GraphLine, PlotColor } from '../../types/content'
import type { TopicVisuals } from './types'

/**
 * Flowcharts and exact graphs for Grade 7 topics, keyed by topic id.
 * Rendered in the topic page's "Visual guide" section.
 */

const tex = String.raw

type Pt = [number, number]

/** Closed polygon drawn as segments through the given vertices. */
function polygon(points: Pt[], color: PlotColor = 1, label?: string, dashed?: boolean): GraphLine[] {
  return points.map((from, i) => ({
    kind: 'segment' as const,
    from,
    to: points[(i + 1) % points.length],
    color,
    dashed,
    label: i === 0 ? label : undefined,
  }))
}

/** Axis-aligned square of side `s` with lower-left corner (x, y). */
function square(x: number, y: number, s: number): GraphLine[] {
  return polygon([
    [x, y],
    [x + s, y],
    [x + s, y + s],
    [x, y + s],
  ])
}

const flat = (value: number) => () => value

/* Cube net (edge 2): a column x∈[2,4], y∈[0,6] and a row y∈[2,4], x∈[0,8]. */
const cubeNetSquares: Pt[] = [
  [2, 0],
  [0, 2],
  [2, 2],
  [4, 2],
  [6, 2],
  [2, 4],
]
const cubeNetAreas: GraphArea[] = [
  { fn: flat(4), lower: flat(2), from: 0, to: 2, color: 3 },
  { fn: flat(6), lower: flat(0), from: 2, to: 4, color: 3 },
  { fn: flat(4), lower: flat(2), from: 4, to: 8, color: 3 },
]

/* Plant height (cm) at the end of weeks 0–5. */
const plantHeights: Pt[] = [
  [0, 2],
  [1, 4],
  [2, 5],
  [3, 8],
  [4, 10],
  [5, 11],
]

/* Quiz scores 3, 4, 5, 6, 7, 7, 8, 10 as a dot plot (second 7 stacked). */
const quizDots: Pt[] = [
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [7, 2],
  [8, 1],
  [10, 1],
]

export const grade7Visuals: TopicVisuals = {
  integers: {
    flowcharts: [
      {
        id: 'g7-flow-integer-add-subtract',
        topicIds: ['integers'],
        title: 'Adding and subtracting integers',
        titleKm: 'ការបូក និងដកចំនួនគត់',
        summary: 'Use this for any sum or difference of positive and negative integers.',
        summaryKm: 'ប្រើសម្រាប់ផលបូក ឬផលដកនៃចំនួនគត់វិជ្ជមាន និងអវិជ្ជមាន។',
        nodes: [
          { kind: 'start', text: 'Read the sum or difference.', textKm: 'អានផលបូក ឬផលដក។' },
          {
            kind: 'step',
            text: 'Rewrite each subtraction as adding the opposite.',
            textKm: 'សរសេរការដកនីមួយៗជាការបូកចំនួនផ្ទុយ។',
            math: 'a-b=a+(-b)',
          },
          {
            kind: 'decision',
            text: 'Do the two numbers have the same sign?',
            textKm: 'តើចំនួនទាំងពីរមានសញ្ញាដូចគ្នាឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'Add the absolute values. Keep the common sign: $(-4)+(-3)=-7$.',
                textKm: 'បូកតម្លៃដាច់ខាត។ រក្សាសញ្ញារួម៖ $(-4)+(-3)=-7$។',
              },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'Subtract the smaller absolute value from the larger. Use the sign of the larger: $(-7)+3=-4$.',
                textKm: 'ដកតម្លៃដាច់ខាតតូចចេញពីធំ។ យកសញ្ញានៃចំនួនដែលមានតម្លៃដាច់ខាតធំ៖ $(-7)+3=-4$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Repeat from left to right for the remaining terms.',
            textKm: 'ធ្វើដដែលៗពីឆ្វេងទៅស្ដាំ សម្រាប់តួដែលនៅសល់។',
          },
          {
            kind: 'end',
            text: 'Check the sign of the answer on a number line.',
            textKm: 'ផ្ទៀងផ្ទាត់សញ្ញានៃចម្លើយលើបន្ទាត់ចំនួន។',
          },
        ],
      },
      {
        id: 'g7-flow-integer-multiply-divide',
        topicIds: ['integers'],
        title: 'Signs when multiplying and dividing',
        titleKm: 'សញ្ញាពេលគុណ និងចែក',
        summary: 'Use this to find the sign of a product or quotient of integers.',
        summaryKm: 'ប្រើដើម្បីរកសញ្ញានៃផលគុណ ឬផលចែកនៃចំនួនគត់។',
        nodes: [
          { kind: 'start', text: 'Read the product or quotient.', textKm: 'អានផលគុណ ឬផលចែក។' },
          {
            kind: 'step',
            text: 'Multiply or divide the absolute values.',
            textKm: 'គុណ ឬចែកតម្លៃដាច់ខាត។',
          },
          {
            kind: 'decision',
            text: 'How many negative numbers are there?',
            textKm: 'តើមានចំនួនអវិជ្ជមានប៉ុន្មាន?',
            branches: [
              {
                label: 'Even',
                labelKm: 'ចំនួនគូ',
                text: 'The answer is positive: $(-3)\\times(-4)=12$.',
                textKm: 'ចម្លើយជាចំនួនវិជ្ជមាន៖ $(-3)\\times(-4)=12$។',
              },
              {
                label: 'Odd',
                labelKm: 'ចំនួនសេស',
                text: 'The answer is negative: $(-12)\\div3=-4$.',
                textKm: 'ចម្លើយជាចំនួនអវិជ្ជមាន៖ $(-12)\\div3=-4$។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Write the sign in front of the number.',
            textKm: 'សរសេរសញ្ញានៅខាងមុខចំនួន។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-integer-distance',
        title: 'Distance between −3 and 5',
        titleKm: 'ចម្ងាយរវាង −3 និង 5',
        caption: 'The x-axis is a number line. A is at −3 and B is at 5. The distance between them is |−3 − 5| = 8 units.',
        captionKm: 'អ័ក្ស x ជាបន្ទាត់ចំនួន។ A នៅ −3 ហើយ B នៅ 5។ ចម្ងាយរវាងពួកវាគឺ |−3 − 5| = 8 ឯកតា។',
        xRange: [-6, 6],
        yRange: [-1, 1],
        lines: [{ kind: 'segment', from: [-3, 0], to: [5, 0], color: 2, dashed: true, label: '|−3 − 5| = 8' }],
        points: [
          { x: -3, y: 0, label: 'A', color: 2, anchor: 'n' },
          { x: 5, y: 0, label: 'B', color: 2, anchor: 'n' },
        ],
      },
    ],
  },

  'rational-numbers': {
    flowcharts: [
      {
        id: 'g7-flow-fraction-operations',
        topicIds: ['rational-numbers'],
        title: 'Operations with fractions',
        titleKm: 'ប្រមាណវិធីលើប្រភាគ',
        summary: 'Use this to add, subtract, multiply or divide fractions.',
        summaryKm: 'ប្រើដើម្បីបូក ដក គុណ ឬចែកប្រភាគ។',
        nodes: [
          {
            kind: 'start',
            text: 'Write each number as a fraction $\\frac{a}{b}$. Change mixed numbers first.',
            textKm: 'សរសេរចំនួននីមួយៗជាប្រភាគ $\\frac{a}{b}$។ បំប្លែងចំនួនចម្រុះជាមុនសិន។',
          },
          {
            kind: 'decision',
            text: 'Which operation?',
            textKm: 'តើជាប្រមាណវិធីអ្វី?',
            branches: [
              {
                label: '+ or −',
                labelKm: '+ ឬ −',
                text: 'Use a common denominator, then add or subtract the numerators.',
                textKm: 'យកភាគបែងរួម រួចបូក ឬដកភាគយក។',
                math: tex`\frac{a}{b}\pm\frac{c}{d}=\frac{ad\pm bc}{bd}`,
              },
              {
                label: '×',
                labelKm: '×',
                text: 'Multiply numerator by numerator, denominator by denominator.',
                textKm: 'គុណភាគយកនឹងភាគយក និងភាគបែងនឹងភាគបែង។',
                math: tex`\frac{a}{b}\times\frac{c}{d}=\frac{ac}{bd}`,
              },
              {
                label: '÷',
                labelKm: '÷',
                text: 'Multiply by the reciprocal of the second fraction.',
                textKm: 'គុណនឹងប្រភាគច្រាសនៃប្រភាគទីពីរ។',
                math: tex`\frac{a}{b}\div\frac{c}{d}=\frac{a}{b}\times\frac{d}{c}`,
              },
            ],
          },
          {
            kind: 'step',
            text: 'Simplify: divide the numerator and denominator by their greatest common factor.',
            textKm: 'សម្រួល៖ ចែកភាគយក និងភាគបែងនឹងតួចែករួមធំបំផុត។',
          },
          {
            kind: 'end',
            text: 'Write it as a mixed number or a decimal if the question asks.',
            textKm: 'សរសេរជាចំនួនចម្រុះ ឬទសភាគ បើលំហាត់ទាមទារ។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-fractions-number-line',
        title: 'Fractions on a number line',
        titleKm: 'ប្រភាគលើបន្ទាត់ចំនួន',
        caption: 'Ticks are every quarter. A = −3/4 = −0.75, B = 1/2 = 0.5 and C = 5/4 = 1.25, so A < B < C.',
        captionKm: 'ខ្ទង់នីមួយៗស្មើមួយភាគបួន។ A = −3/4 = −0.75, B = 1/2 = 0.5 និង C = 5/4 = 1.25 ដូច្នេះ A < B < C។',
        xRange: [-2, 2],
        yRange: [-1, 1],
        xStep: 0.25,
        points: [
          { x: -0.75, y: 0, label: 'A', color: 2, anchor: 'n' },
          { x: 0.5, y: 0, label: 'B', color: 3, anchor: 'n' },
          { x: 1.25, y: 0, label: 'C', color: 4, anchor: 's' },
        ],
      },
    ],
  },

  'exponents-and-powers': {
    flowcharts: [
      {
        id: 'g7-flow-exponent-laws',
        topicIds: ['exponents-and-powers'],
        title: 'Choosing an exponent law',
        titleKm: 'ការជ្រើសច្បាប់ស្វ័យគុណ',
        summary: 'Use this to simplify powers that have the same base.',
        summaryKm: 'ប្រើដើម្បីសម្រួលស្វ័យគុណដែលមានគោលដូចគ្នា។',
        nodes: [
          {
            kind: 'start',
            text: 'Check that the powers have the same base $a$.',
            textKm: 'ពិនិត្យថាស្វ័យគុណមានគោល $a$ ដូចគ្នា។',
          },
          {
            kind: 'decision',
            text: 'What are you doing with the powers?',
            textKm: 'តើអ្នកកំពុងធ្វើអ្វីជាមួយស្វ័យគុណ?',
            branches: [
              {
                label: 'Multiply',
                labelKm: 'គុណ',
                text: 'Keep the base, add the exponents.',
                textKm: 'រក្សាគោល បូកនិទស្សន្ត។',
                math: 'a^m\\times a^n=a^{m+n}',
              },
              {
                label: 'Divide',
                labelKm: 'ចែក',
                text: 'Keep the base, subtract the exponents.',
                textKm: 'រក្សាគោល ដកនិទស្សន្ត។',
                math: 'a^m\\div a^n=a^{m-n}',
              },
              {
                label: 'Power of a power',
                labelKm: 'ស្វ័យគុណនៃស្វ័យគុណ',
                text: 'Multiply the exponents.',
                textKm: 'គុណនិទស្សន្ត។',
                math: '(a^m)^n=a^{mn}',
              },
            ],
          },
          {
            kind: 'step',
            text: 'If the exponent is 0, the power equals 1: $a^0=1$ for $a\\ne0$.',
            textKm: 'បើនិទស្សន្តស្មើ 0 នោះស្វ័យគុណស្មើ 1៖ $a^0=1$ ចំពោះ $a\\ne0$។',
          },
          {
            kind: 'step',
            text: 'Evaluate by repeated multiplication: $2^2=2\\times2=4$.',
            textKm: 'គណនាដោយគុណដដែលៗ៖ $2^2=2\\times2=4$។',
          },
          {
            kind: 'end',
            text: 'Check by writing out the factors for a small case.',
            textKm: 'ផ្ទៀងផ្ទាត់ដោយសរសេរកត្តាទាំងអស់ចំពោះករណីតូចមួយ។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-powers-of-two',
        title: 'Powers of 2',
        titleKm: 'ស្វ័យគុណនៃ 2',
        caption: 'Each point is (n, 2ⁿ): 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16. Adding 1 to the exponent doubles the value.',
        captionKm: 'ចំណុចនីមួយៗគឺ (n, 2ⁿ)៖ 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16។ ការបូកនិទស្សន្ត 1 ធ្វើឲ្យតម្លៃកើនទ្វេដង។',
        xRange: [0, 5],
        yRange: [0, 18],
        yStep: 2,
        xLabel: 'n',
        yLabel: '2ⁿ',
        equalScale: false,
        points: [
          { x: 0, y: 1, anchor: 'ne' },
          { x: 1, y: 2, anchor: 'nw' },
          { x: 2, y: 4, anchor: 'nw' },
          { x: 3, y: 8, anchor: 'nw' },
          { x: 4, y: 16, anchor: 'nw' },
        ],
      },
    ],
  },

  'ratios-and-proportions': {
    flowcharts: [
      {
        id: 'g7-flow-solve-proportion',
        topicIds: ['ratios-and-proportions'],
        title: 'Solving a proportion',
        titleKm: 'ការដោះស្រាយសមាមាត្រ',
        summary: 'Use this when two ratios are equal and one value is unknown.',
        summaryKm: 'ប្រើនៅពេលអនុបាតពីរស្មើគ្នា ហើយមានតម្លៃមួយមិនស្គាល់។',
        nodes: [
          {
            kind: 'start',
            text: 'Read the two quantities and their units.',
            textKm: 'អានបរិមាណទាំងពីរ និងឯកតារបស់វា។',
          },
          {
            kind: 'step',
            text: 'Write a proportion with the same units in the same positions.',
            textKm: 'សរសេរសមាមាត្រ ដោយដាក់ឯកតាដូចគ្នានៅទីតាំងដូចគ្នា។',
            math: tex`\frac{a}{b}=\frac{c}{d}`,
          },
          {
            kind: 'step',
            text: 'Cross-multiply: $ad=bc$.',
            textKm: 'គុណខ្វែង៖ $ad=bc$។',
          },
          {
            kind: 'step',
            text: 'Divide both sides to find the unknown.',
            textKm: 'ចែកអង្គទាំងពីរ ដើម្បីរកតម្លៃមិនស្គាល់។',
          },
          {
            kind: 'decision',
            text: 'Is the answer sensible?',
            textKm: 'តើចម្លើយសមហេតុផលឬទេ?',
            branches: [
              { label: 'Yes', labelKm: 'មែន', text: 'Go on.', textKm: 'បន្តទៅមុខ។' },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'Check that the two quantities were not swapped.',
                textKm: 'ពិនិត្យថាបរិមាណទាំងពីរមិនត្រូវបានដាក់ច្រាសគ្នា។',
              },
            ],
          },
          { kind: 'end', text: 'Write the answer with its unit.', textKm: 'សរសេរចម្លើយជាមួយឯកតា។' },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-proportional-line',
        title: 'A proportional relationship',
        titleKm: 'ទំនាក់ទំនងសមាមាត្រ',
        caption: 'Every point on y = 3x has the same ratio y : x = 3 : 1. The unit rate 3 is the value at x = 1. The line passes through the origin.',
        captionKm: 'គ្រប់ចំណុចលើ y = 3x មានអនុបាត y : x = 3 : 1 ដូចគ្នា។ អត្រាឯកតា 3 ជាតម្លៃនៅ x = 1។ បន្ទាត់កាត់តាមគល់តម្រុយ។',
        xRange: [0, 5],
        yRange: [0, 15],
        yStep: 3,
        equalScale: false,
        curves: [{ fn: (x) => 3 * x, label: 'y = 3x', color: 1 }],
        points: [
          { x: 0, y: 0, label: 'O', anchor: 'se' },
          { x: 1, y: 3, label: 'U', color: 3, anchor: 'se' },
          { x: 2, y: 6, label: 'A', color: 2, anchor: 'se' },
          { x: 4, y: 12, label: 'B', color: 2, anchor: 'se' },
        ],
      },
    ],
  },

  'algebraic-expressions': {
    flowcharts: [
      {
        id: 'g7-flow-simplify-expression',
        topicIds: ['algebraic-expressions'],
        title: 'Simplifying an expression',
        titleKm: 'ការសម្រួលកន្សោម',
        summary: 'Use this to expand brackets and collect like terms.',
        summaryKm: 'ប្រើដើម្បីពន្លាតវង់ក្រចក និងបូកបង្រួមតួដូចគ្នា។',
        nodes: [
          { kind: 'start', text: 'Read the expression from left to right.', textKm: 'អានកន្សោមពីឆ្វេងទៅស្ដាំ។' },
          {
            kind: 'decision',
            text: 'What is in front of each bracket?',
            textKm: 'តើមានអ្វីនៅខាងមុខវង់ក្រចកនីមួយៗ?',
            branches: [
              {
                label: 'A number',
                labelKm: 'ចំនួនមួយ',
                text: 'Multiply it by every term inside: $a(b+c)=ab+ac$.',
                textKm: 'គុណវានឹងគ្រប់តួខាងក្នុង៖ $a(b+c)=ab+ac$។',
              },
              {
                label: 'A minus sign',
                labelKm: 'សញ្ញាដក',
                text: 'Change the sign of every term inside: $-(a-b)=-a+b$.',
                textKm: 'ប្ដូរសញ្ញាគ្រប់តួខាងក្នុង៖ $-(a-b)=-a+b$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Group like terms: same letter, same power.',
            textKm: 'ដាក់តួដូចគ្នាជាក្រុម៖ អថេរដូចគ្នា ស្វ័យគុណដូចគ្នា។',
          },
          {
            kind: 'step',
            text: 'Add their coefficients: $ax+bx=(a+b)x$.',
            textKm: 'បូកមេគុណរបស់វា៖ $ax+bx=(a+b)x$។',
          },
          {
            kind: 'end',
            text: 'Write the simplified expression.',
            textKm: 'សរសេរកន្សោមដែលបានសម្រួល។',
            math: '4(2x+3)-2(x-5)=6x+22',
          },
        ],
      },
      {
        id: 'g7-flow-substitute-value',
        topicIds: ['algebraic-expressions'],
        title: 'Substituting a value',
        titleKm: 'ការជំនួសតម្លៃ',
        summary: 'Use this to evaluate an expression for a given value of the variable.',
        summaryKm: 'ប្រើដើម្បីគណនាតម្លៃកន្សោម ចំពោះតម្លៃអថេរដែលឲ្យ។',
        nodes: [
          {
            kind: 'start',
            text: 'Replace each letter with its value, inside brackets.',
            textKm: 'ជំនួសអថេរនីមួយៗដោយតម្លៃរបស់វា ក្នុងវង់ក្រចក។',
          },
          { kind: 'step', text: 'Work out powers first.', textKm: 'គណនាស្វ័យគុណមុន។' },
          { kind: 'step', text: 'Then multiply and divide.', textKm: 'បន្ទាប់មកគុណ និងចែក។' },
          { kind: 'step', text: 'Then add and subtract.', textKm: 'បន្ទាប់មកបូក និងដក។' },
          {
            kind: 'end',
            text: 'Write the value. Example with $x=-2$:',
            textKm: 'សរសេរតម្លៃ។ ឧទាហរណ៍ចំពោះ $x=-2$៖',
            math: '3(-2)^2-2(-2)+1=12+4+1=17',
          },
        ],
      },
    ],
  },

  'linear-equations-one-variable': {
    flowcharts: [
      {
        id: 'g7-flow-solve-linear-equation',
        topicIds: ['linear-equations-one-variable'],
        title: 'Solving a linear equation',
        titleKm: 'ការដោះស្រាយសមីការលីនេអ៊ែរ',
        summary: 'Use the balance method: whatever you do to one side, do to the other.',
        summaryKm: 'ប្រើវិធីសាស្ត្រតុល្យភាព៖ ធ្វើអ្វីលើអង្គម្ខាង ត្រូវធ្វើដូចគ្នាលើអង្គម្ខាងទៀត។',
        nodes: [
          { kind: 'start', text: 'Write the equation.', textKm: 'សរសេរសមីការ។' },
          {
            kind: 'decision',
            text: 'Are there brackets or fractions?',
            textKm: 'តើមានវង់ក្រចក ឬប្រភាគឬទេ?',
            branches: [
              { label: 'Brackets', labelKm: 'វង់ក្រចក', text: 'Expand them first.', textKm: 'ពន្លាតវាជាមុន។' },
              {
                label: 'Fractions',
                labelKm: 'ប្រភាគ',
                text: 'Multiply both sides by the denominator.',
                textKm: 'គុណអង្គទាំងពីរនឹងភាគបែង។',
              },
              { label: 'Neither', labelKm: 'គ្មាន', text: 'Go to the next step.', textKm: 'ទៅជំហានបន្ទាប់។' },
            ],
          },
          {
            kind: 'step',
            text: 'Undo adding or subtracting: do the opposite to both sides.',
            textKm: 'លុបការបូក ឬដក៖ ធ្វើប្រមាណវិធីផ្ទុយលើអង្គទាំងពីរ។',
          },
          {
            kind: 'step',
            text: 'Divide both sides by the coefficient of $x$.',
            textKm: 'ចែកអង្គទាំងពីរនឹងមេគុណនៃ $x$។',
          },
          {
            kind: 'step',
            text: 'Check: substitute $x$ into the original equation.',
            textKm: 'ផ្ទៀងផ្ទាត់៖ ជំនួស $x$ ក្នុងសមីការដើម។',
          },
          {
            kind: 'end',
            text: 'Write the solution. Example:',
            textKm: 'សរសេរចម្លើយ។ ឧទាហរណ៍៖',
            math: tex`5x-7=23\;\Rightarrow\;5x=30\;\Rightarrow\;x=6`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-equation-as-meeting-point',
        title: 'Solving 5x − 7 = 23 on a graph',
        titleKm: 'ដោះស្រាយ 5x − 7 = 23 លើក្រាហ្វ',
        caption: 'The line y = 5x − 7 meets the line y = 23 at S(6, 23). So x = 6 is the solution: 5 × 6 − 7 = 23.',
        captionKm: 'បន្ទាត់ y = 5x − 7 ជួបបន្ទាត់ y = 23 ត្រង់ S(6, 23)។ ដូច្នេះ x = 6 ជាចម្លើយ៖ 5 × 6 − 7 = 23។',
        xRange: [0, 8],
        yRange: [-10, 30],
        yStep: 5,
        equalScale: false,
        curves: [{ fn: (x) => 5 * x - 7, label: 'y = 5x − 7', color: 1 }],
        lines: [
          { kind: 'horizontal', at: 23, color: 2, dashed: true, label: 'y = 23' },
          { kind: 'segment', from: [6, 0], to: [6, 23], color: 3, dashed: true, label: 'x = 6' },
        ],
        points: [
          { x: 6, y: 23, label: 'S', color: 2, anchor: 'se' },
          { x: 6, y: 0, color: 3, anchor: 'se' },
        ],
      },
    ],
  },

  'patterns-and-sequences': {
    flowcharts: [
      {
        id: 'g7-flow-nth-term',
        topicIds: ['patterns-and-sequences'],
        title: 'Finding the nth term',
        titleKm: 'ការរកតួទី n',
        summary: 'Use this to find a rule for a number pattern.',
        summaryKm: 'ប្រើដើម្បីរកច្បាប់នៃលំនាំចំនួន។',
        nodes: [
          { kind: 'start', text: 'Write the first few terms in order.', textKm: 'សរសេរតួដំបូងៗតាមលំដាប់។' },
          {
            kind: 'step',
            text: 'Find the difference between each pair of neighbouring terms.',
            textKm: 'រកផលសងរវាងតួជាប់គ្នាម្ដងមួយគូ។',
          },
          {
            kind: 'decision',
            text: 'Is the difference always the same?',
            textKm: 'តើផលសងតែងតែដូចគ្នាឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'Arithmetic sequence with common difference $d$.',
                textKm: 'ស្វ៊ីតនព្វន្ធ ដែលមានផលសងរួម $d$។',
                math: 'a_n=a_1+(n-1)d',
              },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'Look for another rule: square numbers, triangular numbers, or multiplying.',
                textKm: 'រកច្បាប់ផ្សេង៖ ចំនួនការ៉េ ចំនួនត្រីកោណ ឬការគុណ។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Substitute the term number $n$ into the rule.',
            textKm: 'ជំនួសលេខរៀងតួ $n$ ក្នុងច្បាប់។',
          },
          {
            kind: 'end',
            text: 'Check that the rule gives the first terms.',
            textKm: 'ផ្ទៀងផ្ទាត់ថាច្បាប់ផ្ដល់តួដំបូងៗត្រឹមត្រូវ។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-arithmetic-sequence',
        title: 'The sequence 7, 11, 15, 19, 23',
        titleKm: 'ស្វ៊ីត 7, 11, 15, 19, 23',
        caption: 'Each point is (n, aₙ). The terms go up by d = 4 each time, so the points lie on a straight line: aₙ = 7 + (n − 1) × 4 = 4n + 3.',
        captionKm: 'ចំណុចនីមួយៗគឺ (n, aₙ)។ តួកើនឡើង d = 4 រាល់ពេល ដូច្នេះចំណុចស្ថិតលើបន្ទាត់ត្រង់៖ aₙ = 7 + (n − 1) × 4 = 4n + 3។',
        xRange: [0, 6],
        yRange: [0, 25],
        yStep: 5,
        xLabel: 'n',
        yLabel: 'aₙ',
        equalScale: false,
        curves: [{ fn: (n) => 4 * n + 3, label: 'aₙ = 4n + 3', color: 1, dashed: true, domain: [1, 5] }],
        points: [1, 2, 3, 4, 5].map((n) => ({ x: n, y: 4 * n + 3, color: 2 as PlotColor, anchor: 'nw' as const })),
      },
    ],
  },

  'lines-angles-and-triangles': {
    flowcharts: [
      {
        id: 'g7-flow-missing-angle',
        topicIds: ['lines-angles-and-triangles'],
        title: 'Finding a missing angle',
        titleKm: 'ការរកមុំដែលខ្វះ',
        summary: 'Use this when one angle is unknown and the others are given.',
        summaryKm: 'ប្រើនៅពេលមុំមួយមិនស្គាល់ ហើយមុំផ្សេងទៀតត្រូវបានឲ្យ។',
        nodes: [
          { kind: 'start', text: 'Mark the known angles on the diagram.', textKm: 'សម្គាល់មុំដែលស្គាល់លើរូប។' },
          {
            kind: 'decision',
            text: 'Where is the missing angle?',
            textKm: 'តើមុំដែលខ្វះនៅត្រង់ណា?',
            branches: [
              {
                label: 'On a straight line',
                labelKm: 'លើបន្ទាត់ត្រង់',
                text: 'Subtract the known angles from $180^\\circ$.',
                textKm: 'ដកមុំដែលស្គាល់ចេញពី $180^\\circ$។',
              },
              {
                label: 'Inside a triangle',
                labelKm: 'ក្នុងត្រីកោណ',
                text: 'Subtract the other two angles from $180^\\circ$.',
                textKm: 'ដកមុំពីរទៀតចេញពី $180^\\circ$។',
              },
              {
                label: 'Exterior angle',
                labelKm: 'មុំក្រៅ',
                text: 'Add the two interior angles not next to it.',
                textKm: 'បូកមុំក្នុងពីរដែលមិនជាប់នឹងវា។',
              },
              {
                label: 'Around a point',
                labelKm: 'ជុំវិញចំណុចមួយ',
                text: 'Subtract the known angles from $360^\\circ$.',
                textKm: 'ដកមុំដែលស្គាល់ចេញពី $360^\\circ$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Do the calculation. Example: $180^\\circ-52^\\circ-71^\\circ=57^\\circ$.',
            textKm: 'គណនា។ ឧទាហរណ៍៖ $180^\\circ-52^\\circ-71^\\circ=57^\\circ$។',
          },
          {
            kind: 'end',
            text: 'Check the angles add up correctly. Give the answer in degrees.',
            textKm: 'ផ្ទៀងផ្ទាត់ផលបូកមុំ។ ឲ្យចម្លើយជាអង្សា។',
          },
        ],
      },
      {
        id: 'g7-flow-triangle-inequality',
        topicIds: ['lines-angles-and-triangles'],
        title: 'Can three lengths make a triangle?',
        titleKm: 'តើប្រវែងបីអាចបង្កើតត្រីកោណបានឬទេ?',
        summary: 'Use the triangle inequality to test three side lengths.',
        summaryKm: 'ប្រើវិសមភាពត្រីកោណ ដើម្បីពិនិត្យប្រវែងជ្រុងបី។',
        nodes: [
          { kind: 'start', text: 'Write the three lengths in the same unit.', textKm: 'សរសេរប្រវែងទាំងបីក្នុងឯកតាដូចគ្នា។' },
          { kind: 'step', text: 'Add the two shortest lengths.', textKm: 'បូកប្រវែងខ្លីជាងគេទាំងពីរ។' },
          {
            kind: 'decision',
            text: 'Is the sum greater than the longest length?',
            textKm: 'តើផលបូកធំជាងប្រវែងវែងជាងគេឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'A triangle can be made. Example: $3+4>5$.',
                textKm: 'អាចបង្កើតត្រីកោណបាន។ ឧទាហរណ៍៖ $3+4>5$។',
              },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'No triangle: the two short sides cannot meet. Example: $2+3=5$.',
                textKm: 'មិនអាចបង្កើតត្រីកោណ៖ ជ្រុងខ្លីទាំងពីរមិនអាចជួបគ្នា។ ឧទាហរណ៍៖ $2+3=5$។',
              },
            ],
          },
          { kind: 'end', text: 'State your conclusion.', textKm: 'សរសេរសេចក្ដីសន្និដ្ឋាន។' },
        ],
      },
    ],
  },

  'perimeter-and-area': {
    flowcharts: [
      {
        id: 'g7-flow-perimeter-area',
        topicIds: ['perimeter-and-area'],
        title: 'Perimeter or area?',
        titleKm: 'បរិមាត្រ ឬផ្ទៃក្រឡា?',
        summary: 'Use this to choose the right formula for a flat shape.',
        summaryKm: 'ប្រើដើម្បីជ្រើសរូបមន្តត្រឹមត្រូវសម្រាប់រូបប្លង់។',
        nodes: [
          { kind: 'start', text: 'Read what the question asks for.', textKm: 'អានថាលំហាត់សួររកអ្វី។' },
          {
            kind: 'decision',
            text: 'Distance around, or space inside?',
            textKm: 'ចម្ងាយជុំវិញ ឬផ្ទៃខាងក្នុង?',
            branches: [
              {
                label: 'Perimeter',
                labelKm: 'បរិមាត្រ',
                text: 'Add all the side lengths. Rectangle: $P=2(l+w)$.',
                textKm: 'បូកប្រវែងជ្រុងទាំងអស់។ ចតុកោណកែង៖ $P=2(l+w)$។',
              },
              {
                label: 'Area',
                labelKm: 'ផ្ទៃក្រឡា',
                text: 'Choose the formula for the shape below.',
                textKm: 'ជ្រើសរូបមន្តតាមរូបខាងក្រោម។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'For area: which shape?',
            textKm: 'សម្រាប់ផ្ទៃក្រឡា៖ តើជារូបអ្វី?',
            branches: [
              { label: 'Rectangle', labelKm: 'ចតុកោណកែង', text: '$A=lw$', textKm: '$A=lw$' },
              { label: 'Parallelogram', labelKm: 'ប៉ារ៉ាឡេឡូក្រាម', text: '$A=bh$', textKm: '$A=bh$' },
              { label: 'Triangle', labelKm: 'ត្រីកោណ', text: '$A=\\frac{1}{2}bh$', textKm: '$A=\\frac{1}{2}bh$' },
              {
                label: 'Composite',
                labelKm: 'រូបផ្សំ',
                text: 'Split into simple shapes, then add the areas.',
                textKm: 'បំបែកជារូបសាមញ្ញ រួចបូកផ្ទៃក្រឡា។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Use the perpendicular height $h$, not a slanted side.',
            textKm: 'ប្រើកម្ពស់កែង $h$ មិនមែនជ្រុងទ្រេតទេ។',
          },
          {
            kind: 'end',
            text: 'Write units: cm for perimeter, cm² for area.',
            textKm: 'សរសេរឯកតា៖ cm សម្រាប់បរិមាត្រ cm² សម្រាប់ផ្ទៃក្រឡា។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-rectangle-perimeter-area',
        title: 'A 6 by 4 rectangle',
        titleKm: 'ចតុកោណកែង 6 គុណ 4',
        caption: 'AB = 7 − 1 = 6 and BC = 5 − 1 = 4 grid units. Perimeter P = 2(6 + 4) = 20 units. Area A = 6 × 4 = 24 unit², the 24 shaded squares.',
        captionKm: 'AB = 7 − 1 = 6 និង BC = 5 − 1 = 4 ឯកតា។ បរិមាត្រ P = 2(6 + 4) = 20 ឯកតា។ ផ្ទៃក្រឡា A = 6 × 4 = 24 ឯកតា² គឺការ៉េ 24 ដែលបានដាក់ពណ៌។',
        xRange: [0, 8],
        yRange: [0, 6],
        areas: [{ fn: flat(5), lower: flat(1), from: 1, to: 7, color: 1 }],
        lines: polygon([
          [1, 1],
          [7, 1],
          [7, 5],
          [1, 5],
        ]),
        points: [
          { x: 1, y: 1, label: 'A', anchor: 'sw' },
          { x: 7, y: 1, label: 'B', anchor: 'se' },
          { x: 7, y: 5, label: 'C', anchor: 'ne' },
          { x: 1, y: 5, label: 'D', anchor: 'nw' },
        ],
      },
      {
        id: 'g7-graph-triangle-height',
        title: 'Area of a triangle',
        titleKm: 'ផ្ទៃក្រឡាត្រីកោណ',
        caption: 'Base PQ = 6 and perpendicular height RH = 4. Area = ½ × 6 × 4 = 12 unit². The slanted side PR = √20 ≈ 4.47 is not the height.',
        captionKm: 'បាត PQ = 6 និងកម្ពស់កែង RH = 4។ ផ្ទៃក្រឡា = ½ × 6 × 4 = 12 ឯកតា²។ ជ្រុងទ្រេត PR = √20 ≈ 4.47 មិនមែនជាកម្ពស់ទេ។',
        xRange: [0, 8],
        yRange: [0, 6],
        areas: [{ fn: (x) => (x <= 3 ? 1 + 2 * (x - 1) : 5 - (x - 3)), lower: flat(1), from: 1, to: 7, color: 1 }],
        lines: [
          ...polygon([
            [1, 1],
            [7, 1],
            [3, 5],
          ]),
          { kind: 'segment', from: [3, 5], to: [3, 1], color: 2, dashed: true, label: 'h = 4' },
        ],
        points: [
          { x: 1, y: 1, label: 'P', anchor: 'sw' },
          { x: 7, y: 1, label: 'Q', anchor: 'se' },
          { x: 3, y: 5, label: 'R', anchor: 'ne' },
          { x: 3, y: 1, label: 'H', color: 2, anchor: 's' },
        ],
      },
    ],
  },

  'circles-intro': {
    flowcharts: [
      {
        id: 'g7-flow-circle-measures',
        topicIds: ['circles-intro'],
        title: 'Circumference and area of a circle',
        titleKm: 'បរិមាត្រ និងផ្ទៃក្រឡារង្វង់',
        summary: 'Use this whenever a radius or diameter is given.',
        summaryKm: 'ប្រើគ្រប់ពេលដែលកាំ ឬអង្កត់ផ្ចិតត្រូវបានឲ្យ។',
        nodes: [
          { kind: 'start', text: 'Read the given length.', textKm: 'អានប្រវែងដែលឲ្យ។' },
          {
            kind: 'decision',
            text: 'Is it the radius or the diameter?',
            textKm: 'តើវាជាកាំ ឬអង្កត់ផ្ចិត?',
            branches: [
              { label: 'Radius', labelKm: 'កាំ', text: 'Use $r$ as it is.', textKm: 'ប្រើ $r$ ដដែល។' },
              {
                label: 'Diameter',
                labelKm: 'អង្កត់ផ្ចិត',
                text: 'Halve it: $r=\\frac{d}{2}$.',
                textKm: 'ចែកពីរ៖ $r=\\frac{d}{2}$។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'What is asked?',
            textKm: 'តើលំហាត់សួររកអ្វី?',
            branches: [
              { label: 'Circumference', labelKm: 'បរិមាត្ររង្វង់', text: '$C=2\\pi r$', textKm: '$C=2\\pi r$' },
              { label: 'Area', labelKm: 'ផ្ទៃក្រឡា', text: '$A=\\pi r^2$', textKm: '$A=\\pi r^2$' },
            ],
          },
          {
            kind: 'step',
            text: 'Give the exact answer with $\\pi$, then round to two decimal places.',
            textKm: 'ឲ្យចម្លើយពិតប្រាកដជាមួយ $\\pi$ រួចបង្គត់ដល់ពីរខ្ទង់ក្រោយក្បៀស។',
          },
          {
            kind: 'end',
            text: 'Write units: cm for circumference, cm² for area.',
            textKm: 'សរសេរឯកតា៖ cm សម្រាប់បរិមាត្រ cm² សម្រាប់ផ្ទៃក្រឡា។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-circle-radius',
        title: 'A circle with radius 3',
        titleKm: 'រង្វង់មានកាំ 3',
        caption: 'Centre O(4, 3), radius OP = 3, diameter d = 6. C = 2π × 3 = 6π ≈ 18.85 units. A = π × 3² = 9π ≈ 28.27 unit².',
        captionKm: 'ផ្ចិត O(4, 3) កាំ OP = 3 អង្កត់ផ្ចិត d = 6។ C = 2π × 3 = 6π ≈ 18.85 ឯកតា។ A = π × 3² = 9π ≈ 28.27 ឯកតា²។',
        xRange: [0, 8],
        yRange: [-1, 7],
        parametric: [
          { x: (t) => 4 + 3 * Math.cos(t), y: (t) => 3 + 3 * Math.sin(t), t: [0, 2 * Math.PI], label: 'r = 3', color: 1 },
        ],
        lines: [
          { kind: 'segment', from: [4, 3], to: [7, 3], color: 2 },
          { kind: 'segment', from: [4, 0], to: [4, 6], color: 3, dashed: true, label: 'd = 6' },
        ],
        points: [
          { x: 4, y: 3, label: 'O', anchor: 'nw' },
          { x: 7, y: 3, label: 'P', color: 2, anchor: 'ne' },
        ],
      },
    ],
  },

  'prisms-and-cubes': {
    flowcharts: [
      {
        id: 'g7-flow-prism-measures',
        topicIds: ['prisms-and-cubes'],
        title: 'Volume and surface area of a box',
        titleKm: 'មាឌ និងផ្ទៃក្រឡាសរុបនៃប្រអប់',
        summary: 'Use this for cuboids and cubes.',
        summaryKm: 'ប្រើសម្រាប់ប្រអប់ចតុកោណកែង និងគូប។',
        nodes: [
          {
            kind: 'start',
            text: 'Write the length $l$, width $w$ and height $h$ in the same unit.',
            textKm: 'សរសេរបណ្ដោយ $l$ ទទឹង $w$ និងកម្ពស់ $h$ ក្នុងឯកតាដូចគ្នា។',
          },
          {
            kind: 'decision',
            text: 'What is asked?',
            textKm: 'តើលំហាត់សួររកអ្វី?',
            branches: [
              { label: 'Volume', labelKm: 'មាឌ', text: '$V=lwh$', textKm: '$V=lwh$' },
              {
                label: 'Surface area',
                labelKm: 'ផ្ទៃក្រឡាសរុប',
                text: 'Add the six faces: $SA=2(lw+lh+wh)$.',
                textKm: 'បូកមុខទាំងប្រាំមួយ៖ $SA=2(lw+lh+wh)$។',
              },
              {
                label: 'A missing edge',
                labelKm: 'គែមដែលខ្វះ',
                text: 'Divide the volume by the other two: $h=\\frac{V}{lw}$.',
                textKm: 'ចែកមាឌនឹងគែមពីរទៀត៖ $h=\\frac{V}{lw}$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'For a cube, every edge is $s$: $V=s^3$ and $SA=6s^2$.',
            textKm: 'ចំពោះគូប គ្រប់គែមស្មើ $s$៖ $V=s^3$ និង $SA=6s^2$។',
          },
          {
            kind: 'end',
            text: 'Write units: cm³ for volume, cm² for surface area.',
            textKm: 'សរសេរឯកតា៖ cm³ សម្រាប់មាឌ cm² សម្រាប់ផ្ទៃក្រឡា។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-cube-net',
        title: 'Net of a cube with edge 2',
        titleKm: 'សំណាញ់ពន្លាតនៃគូបមានគែម 2',
        caption: 'Six squares, each 2 × 2 = 4 unit², fold into a cube. Surface area = 6 × 2² = 24 unit². Volume = 2³ = 8 unit³.',
        captionKm: 'ការ៉េប្រាំមួយ នីមួយៗ 2 × 2 = 4 ឯកតា² បត់បានជាគូប។ ផ្ទៃក្រឡាសរុប = 6 × 2² = 24 ឯកតា²។ មាឌ = 2³ = 8 ឯកតា³។',
        xRange: [-1, 9],
        yRange: [-1, 7],
        areas: cubeNetAreas,
        lines: cubeNetSquares.flatMap(([x, y]) => square(x, y, 2)),
      },
    ],
  },

  'data-and-graphs': {
    flowcharts: [
      {
        id: 'g7-flow-choose-data-display',
        topicIds: ['data-and-graphs'],
        title: 'Choosing a data display',
        titleKm: 'ការជ្រើសរើសក្រាហ្វទិន្នន័យ',
        summary: 'Use this to pick the right graph for your data.',
        summaryKm: 'ប្រើដើម្បីជ្រើសក្រាហ្វត្រឹមត្រូវសម្រាប់ទិន្នន័យ។',
        nodes: [
          {
            kind: 'start',
            text: 'Count each category in a frequency table.',
            textKm: 'រាប់ប្រភេទនីមួយៗក្នុងតារាងប្រេកង់។',
          },
          {
            kind: 'step',
            text: 'Find the total: $n=f_1+f_2+\\cdots+f_k$.',
            textKm: 'រកចំនួនសរុប៖ $n=f_1+f_2+\\cdots+f_k$។',
          },
          {
            kind: 'decision',
            text: 'What do you want to show?',
            textKm: 'តើអ្នកចង់បង្ហាញអ្វី?',
            branches: [
              {
                label: 'Compare categories',
                labelKm: 'ប្រៀបធៀបប្រភេទ',
                text: 'Bar chart: equal gaps, bars start at zero.',
                textKm: 'ក្រាហ្វសសរ៖ គម្លាតស្មើគ្នា សសរចាប់ផ្ដើមពីសូន្យ។',
              },
              {
                label: 'Change over time',
                labelKm: 'បម្រែបម្រួលតាមពេល',
                text: 'Line graph: time goes on the horizontal axis.',
                textKm: 'ក្រាហ្វបន្ទាត់៖ ពេលវេលានៅលើអ័ក្សដេក។',
              },
              {
                label: 'Parts of a whole',
                labelKm: 'ផ្នែកនៃទាំងមូល',
                text: 'Pie chart with sector angle $\\theta=\\frac{f}{n}\\times360^\\circ$.',
                textKm: 'ក្រាហ្វរង្វង់ ដែលមុំផ្នែក $\\theta=\\frac{f}{n}\\times360^\\circ$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Add a title, axis labels and units.',
            textKm: 'ដាក់ចំណងជើង ឈ្មោះអ័ក្ស និងឯកតា។',
          },
          {
            kind: 'end',
            text: 'Read the graph: compare heights, trends or angles.',
            textKm: 'អានក្រាហ្វ៖ ប្រៀបធៀបកម្ពស់ និន្នាការ ឬមុំ។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-line-graph-plant',
        title: 'Line graph: plant height',
        titleKm: 'ក្រាហ្វបន្ទាត់៖ កម្ពស់រុក្ខជាតិ',
        caption: 'x is the week, y is the height in cm. The plant grows from 2 cm to 11 cm in 5 weeks. The steepest rise, 3 cm, is from week 2 to week 3.',
        captionKm: 'x ជាសប្ដាហ៍ y ជាកម្ពស់គិតជា cm។ រុក្ខជាតិដុះពី 2 cm ដល់ 11 cm ក្នុងរយៈពេល 5 សប្ដាហ៍។ កំណើនខ្លាំងបំផុត 3 cm គឺពីសប្ដាហ៍ទី 2 ដល់សប្ដាហ៍ទី 3។',
        xRange: [0, 6],
        yRange: [0, 12],
        yStep: 2,
        equalScale: false,
        lines: plantHeights.slice(1).map((to, i) => ({ kind: 'segment' as const, from: plantHeights[i], to, color: 1 as PlotColor })),
        points: plantHeights.map(([x, y]) => ({ x, y, color: 1 as PlotColor, anchor: 'nw' as const })),
      },
    ],
  },

  averages: {
    flowcharts: [
      {
        id: 'g7-flow-averages',
        topicIds: ['averages'],
        title: 'Mean, median, mode and range',
        titleKm: 'មធ្យម មេដ្យាន ម៉ូដ និងជួរតម្លៃ',
        summary: 'Use this to summarise a list of numbers.',
        summaryKm: 'ប្រើដើម្បីសង្ខេបបញ្ជីចំនួន។',
        nodes: [
          {
            kind: 'start',
            text: 'Write the data in order from smallest to largest.',
            textKm: 'សរសេរទិន្នន័យតាមលំដាប់ពីតូចទៅធំ។',
          },
          { kind: 'step', text: 'Count the values: $n$.', textKm: 'រាប់ចំនួនតម្លៃ៖ $n$។' },
          {
            kind: 'decision',
            text: 'Which measure do you need?',
            textKm: 'តើអ្នកត្រូវការរង្វាស់មួយណា?',
            branches: [
              {
                label: 'Mean',
                labelKm: 'មធ្យម',
                text: 'Add all the values, then divide by $n$.',
                textKm: 'បូកតម្លៃទាំងអស់ រួចចែកនឹង $n$។',
              },
              {
                label: 'Median',
                labelKm: 'មេដ្យាន',
                text: 'Middle value, at position $\\frac{n+1}{2}$. If $n$ is even, average the two middle values.',
                textKm: 'តម្លៃកណ្ដាល នៅទីតាំង $\\frac{n+1}{2}$។ បើ $n$ គូ យកមធ្យមនៃតម្លៃកណ្ដាលទាំងពីរ។',
              },
              {
                label: 'Mode',
                labelKm: 'ម៉ូដ',
                text: 'The value that appears most often.',
                textKm: 'តម្លៃដែលលេចឡើងញឹកញាប់ជាងគេ។',
              },
              {
                label: 'Range',
                labelKm: 'ជួរតម្លៃ',
                text: 'Largest value minus smallest value.',
                textKm: 'តម្លៃធំបំផុតដកតម្លៃតូចបំផុត។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Check: the mean and median lie between the smallest and largest values.',
            textKm: 'ផ្ទៀងផ្ទាត់៖ មធ្យម និងមេដ្យានស្ថិតនៅចន្លោះតម្លៃតូចបំផុត និងធំបំផុត។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g7-graph-dot-plot-quiz',
        title: 'Dot plot of eight quiz scores',
        titleKm: 'ដ្យាក្រាមចំណុចនៃពិន្ទុប្រឡងប្រាំបី',
        caption: 'Scores 3, 4, 5, 6, 7, 7, 8, 10 on the x-axis; each dot is one student. Mean = 50 ÷ 8 = 6.25. Median = (6 + 7) ÷ 2 = 6.5. Mode = 7. Range = 10 − 3 = 7.',
        captionKm: 'ពិន្ទុ 3, 4, 5, 6, 7, 7, 8, 10 នៅលើអ័ក្ស x ចំណុចនីមួយៗជាសិស្សម្នាក់។ មធ្យម = 50 ÷ 8 = 6.25។ មេដ្យាន = (6 + 7) ÷ 2 = 6.5។ ម៉ូដ = 7។ ជួរតម្លៃ = 10 − 3 = 7។',
        xRange: [0, 11],
        yRange: [0, 3],
        yLabel: 'f',
        equalScale: false,
        lines: [
          { kind: 'vertical', at: 6.25, color: 2, dashed: true, label: 'x̄ = 6.25' },
          { kind: 'vertical', at: 6.5, color: 3, dashed: true, label: 'median = 6.5' },
          { kind: 'segment', from: [3, 2.6], to: [10, 2.6], color: 4, dashed: true, label: 'range = 10 − 3 = 7' },
        ],
        points: quizDots.map(([x, y]) => ({ x, y, color: 1 as PlotColor, showCoords: false })),
      },
    ],
  },

  'probability-intro': {
    flowcharts: [
      {
        id: 'g7-flow-probability',
        topicIds: ['probability-intro'],
        title: 'Finding a probability',
        titleKm: 'ការរកប្រូបាប៊ីលីតេ',
        summary: 'Use this for a single event such as rolling a die or drawing a counter.',
        summaryKm: 'ប្រើសម្រាប់ព្រឹត្តិការណ៍មួយ ដូចជាការបោះគ្រាប់ឡុកឡាក់ ឬការចាប់យកបន្ទះពណ៌។',
        nodes: [
          {
            kind: 'start',
            text: 'List the sample space: every possible outcome.',
            textKm: 'សរសេរលំហគំរូ៖ គ្រប់លទ្ធផលដែលអាចកើតមាន។',
          },
          {
            kind: 'decision',
            text: 'Are the outcomes equally likely?',
            textKm: 'តើលទ្ធផលមានឱកាសស្មើគ្នាឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'Count the favourable outcomes and divide by the total.',
                textKm: 'រាប់លទ្ធផលអំណោយផល រួចចែកនឹងចំនួនលទ្ធផលសរុប។',
                math: tex`P(A)=\frac{\text{favourable}}{\text{total}}`,
              },
              {
                label: 'No, from an experiment',
                labelKm: 'ទេ ពីការពិសោធន៍',
                text: 'Use relative frequency: times it happened divided by the number of trials.',
                textKm: 'ប្រើប្រេកង់ធៀប៖ ចំនួនដងដែលវាកើតឡើង ចែកនឹងចំនួនការសាកល្បង។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'Does the question ask for "not $A$"?',
            textKm: 'តើលំហាត់សួររក «មិនមែន $A$» ឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: '$P(\\text{not }A)=1-P(A)$',
                textKm: '$P(\\text{not }A)=1-P(A)$',
              },
              { label: 'No', labelKm: 'ទេ', text: 'Keep $P(A)$.', textKm: 'រក្សា $P(A)$។' },
            ],
          },
          { kind: 'step', text: 'Simplify the fraction.', textKm: 'សម្រួលប្រភាគ។' },
          {
            kind: 'end',
            text: 'Check that $0\\le P\\le1$.',
            textKm: 'ផ្ទៀងផ្ទាត់ថា $0\\le P\\le1$។',
          },
        ],
      },
    ],
  },
}
