import type { GraphArea, GraphLine, GraphPoint, PlotColor } from '../../types/content'
import type { TopicVisuals } from './types'

/**
 * Flowcharts and exact graphs for Grade 8 topics, keyed by topic id.
 * Rendered in the topic page's "Visual guide" section.
 */

const tex = String.raw

type Pt = [number, number]

/** Closed polygon drawn as segments; `label` (legend) goes on the first side only. */
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

/** Labelled vertices; prime marks are added for images. */
function vertices(points: Pt[], names: string[], color: PlotColor, anchors: GraphPoint['anchor'][]): GraphPoint[] {
  return points.map(([x, y], i) => ({ x, y, label: names[i], color, anchor: anchors[i] }))
}

/* Transformations of triangle ABC. */
const triangle: Pt[] = [
  [1, 1],
  [4, 1],
  [1, 3],
]
const translate = ([x, y]: Pt): Pt => [x - 5, y + 2]
const reflectY = ([x, y]: Pt): Pt => [-x, y]
const rotTriangle: Pt[] = [
  [2, 1],
  [5, 1],
  [2, 3],
]
const rotate90 = ([x, y]: Pt): Pt => [-y, x]

/* Histogram: classes 0–10, …, 40–50 with frequencies 3, 7, 9, 5, 2 (n = 26). */
const histogram: { from: number; to: number; f: number }[] = [
  { from: 0, to: 10, f: 3 },
  { from: 10, to: 20, f: 7 },
  { from: 20, to: 30, f: 9 },
  { from: 30, to: 40, f: 5 },
  { from: 40, to: 50, f: 2 },
]
const histogramAreas: GraphArea[] = histogram.map((bar) => ({ fn: () => bar.f, from: bar.from, to: bar.to, color: 1 }))
const histogramOutlines: GraphLine[] = histogram.flatMap((bar) =>
  polygon([
    [bar.from, 0],
    [bar.to, 0],
    [bar.to, bar.f],
    [bar.from, bar.f],
  ]),
)

/* Two-dice sample space: 36 equally likely outcomes; sum 7 highlighted. */
const diceOutcomes: GraphPoint[] = []
for (let a = 1; a <= 6; a++) {
  for (let b = 1; b <= 6; b++) {
    diceOutcomes.push({ x: a, y: b, showCoords: false, color: a + b === 7 ? 2 : 1 })
  }
}

export const grade8Visuals: TopicVisuals = {
  'real-numbers': {
    flowcharts: [
      {
        id: 'g8-flow-classify-real-number',
        topicIds: ['real-numbers'],
        title: 'Rational or irrational?',
        titleKm: 'សនិទាន ឬអសនិទាន?',
        summary: 'Use this to classify any real number.',
        summaryKm: 'ប្រើដើម្បីចាត់ថ្នាក់ចំនួនពិតណាមួយ។',
        nodes: [
          {
            kind: 'start',
            text: 'Simplify the number if you can, e.g. $\\sqrt{16}=4$.',
            textKm: 'សម្រួលចំនួនបើអាច ឧទាហរណ៍ $\\sqrt{16}=4$។',
          },
          {
            kind: 'decision',
            text: 'Can it be written as $\\frac{p}{q}$ with integers $p$, $q$ and $q\\ne0$?',
            textKm: 'តើវាអាចសរសេរជា $\\frac{p}{q}$ ដែល $p$, $q$ ជាចំនួនគត់ និង $q\\ne0$ បានឬទេ?',
            branches: [
              { label: 'Yes', labelKm: 'មែន', text: 'It is rational.', textKm: 'វាជាចំនួនសនិទាន។' },
              {
                label: 'Not sure',
                labelKm: 'មិនច្បាស់',
                text: 'Look at its decimal form.',
                textKm: 'មើលទម្រង់ទសភាគរបស់វា។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'What does the decimal do?',
            textKm: 'តើទសភាគរបស់វាមានលក្ខណៈដូចម្ដេច?',
            branches: [
              { label: 'Ends', labelKm: 'បញ្ចប់', text: 'Rational: $0.25=\\frac{1}{4}$.', textKm: 'សនិទាន៖ $0.25=\\frac{1}{4}$។' },
              {
                label: 'Repeats',
                labelKm: 'ខួប',
                text: 'Rational: $0.\\overline{3}=\\frac{1}{3}$.',
                textKm: 'សនិទាន៖ $0.\\overline{3}=\\frac{1}{3}$។',
              },
              {
                label: 'Never ends or repeats',
                labelKm: 'មិនបញ្ចប់ មិនខួប',
                text: 'Irrational: $\\sqrt{2}$, $\\pi$.',
                textKm: 'អសនិទាន៖ $\\sqrt{2}$, $\\pi$។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Place it on the number line with a decimal estimate.',
            textKm: 'ដាក់វាលើបន្ទាត់ចំនួន ដោយប្រើតម្លៃប្រហែលជាទសភាគ។',
          },
        ],
      },
      {
        id: 'g8-flow-recurring-to-fraction',
        topicIds: ['real-numbers'],
        title: 'Recurring decimal to fraction',
        titleKm: 'បំប្លែងទសភាគខួបជាប្រភាគ',
        summary: 'Use this to write a repeating decimal as a fraction.',
        summaryKm: 'ប្រើដើម្បីសរសេរទសភាគខួបជាប្រភាគ។',
        nodes: [
          {
            kind: 'start',
            text: 'Let $x$ equal the decimal: $x=0.1666\\ldots$',
            textKm: 'តាង $x$ ស្មើនឹងទសភាគ៖ $x=0.1666\\ldots$',
          },
          {
            kind: 'step',
            text: 'Multiply by powers of 10 to get two numbers with the same repeating tail.',
            textKm: 'គុណនឹងស្វ័យគុណនៃ 10 ដើម្បីបានចំនួនពីរដែលមានកន្ទុយខួបដូចគ្នា។',
            math: tex`100x=16.666\ldots,\quad 10x=1.666\ldots`,
          },
          {
            kind: 'step',
            text: 'Subtract so the tail cancels: $90x=15$.',
            textKm: 'ដកគ្នាដើម្បីលុបកន្ទុយ៖ $90x=15$។',
          },
          {
            kind: 'step',
            text: 'Divide and simplify to lowest terms.',
            textKm: 'ចែក រួចសម្រួលជាប្រភាគមិនអាចសម្រួលបាន។',
          },
          {
            kind: 'end',
            text: 'Write the fraction.',
            textKm: 'សរសេរប្រភាគ។',
            math: tex`0.1\overline{6}=\frac{15}{90}=\frac{1}{6}`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-root-two-on-number-line',
        title: 'Placing √2 on the number line',
        titleKm: 'ដាក់ √2 លើបន្ទាត់ចំនួន',
        caption: 'The diagonal OP of the unit square has length √(1² + 1²) = √2. Swinging it down to the x-axis lands at Q, exactly √2 ≈ 1.41.',
        captionKm: 'អង្កត់ទ្រូង OP នៃការ៉េឯកតាមានប្រវែង √(1² + 1²) = √2។ បង្វិលវាចុះមកអ័ក្ស x បានចំណុច Q ត្រង់ √2 ≈ 1.41 ពិតប្រាកដ។',
        xRange: [-1, 3],
        yRange: [-1, 2],
        parametric: [
          {
            x: (t) => Math.SQRT2 * Math.cos(t),
            y: (t) => Math.SQRT2 * Math.sin(t),
            t: [0, Math.PI / 4],
            label: 'radius √2',
            color: 3,
            dashed: true,
          },
        ],
        lines: [
          ...polygon([
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
          ]),
          { kind: 'segment', from: [0, 0], to: [1, 1], color: 2 },
        ],
        points: [
          { x: 0, y: 0, label: 'O', anchor: 'sw' },
          { x: 1, y: 1, label: 'P', color: 2, anchor: 'ne' },
          { x: Math.SQRT2, y: 0, label: 'Q', color: 3, anchor: 'se' },
        ],
      },
    ],
  },

  'square-and-cube-roots': {
    flowcharts: [
      {
        id: 'g8-flow-simplify-square-root',
        topicIds: ['square-and-cube-roots'],
        title: 'Simplifying a square root',
        titleKm: 'ការសម្រួលឫសការ៉េ',
        summary: 'Use this to write a square root in simplest form.',
        summaryKm: 'ប្រើដើម្បីសរសេរឫសការ៉េជាទម្រង់សាមញ្ញបំផុត។',
        nodes: [
          {
            kind: 'start',
            text: 'Write the number under the root, e.g. $\\sqrt{72}$.',
            textKm: 'សរសេរចំនួនក្រោមឫស ឧទាហរណ៍ $\\sqrt{72}$។',
          },
          {
            kind: 'step',
            text: 'Find its largest perfect square factor: 4, 9, 16, 25, 36, …',
            textKm: 'រកកត្តាការ៉េពេញលេញធំបំផុតរបស់វា៖ 4, 9, 16, 25, 36, …',
          },
          {
            kind: 'decision',
            text: 'Is there a perfect square factor bigger than 1?',
            textKm: 'តើមានកត្តាការ៉េពេញលេញធំជាង 1 ឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'Split the root: $\\sqrt{72}=\\sqrt{36}\\,\\sqrt{2}=6\\sqrt{2}$.',
                textKm: 'បំបែកឫស៖ $\\sqrt{72}=\\sqrt{36}\\,\\sqrt{2}=6\\sqrt{2}$។',
                math: tex`\sqrt{ab}=\sqrt{a}\,\sqrt{b}`,
              },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'The root is already in simplest form.',
                textKm: 'ឫសនេះមានទម្រង់សាមញ្ញបំផុតហើយ។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Check with decimals: $6\\sqrt{2}\\approx8.49$ and $\\sqrt{72}\\approx8.49$.',
            textKm: 'ផ្ទៀងផ្ទាត់ជាទសភាគ៖ $6\\sqrt{2}\\approx8.49$ និង $\\sqrt{72}\\approx8.49$។',
          },
        ],
      },
      {
        id: 'g8-flow-estimate-square-root',
        topicIds: ['square-and-cube-roots'],
        title: 'Estimating a square root',
        titleKm: 'ការប៉ាន់ស្មានឫសការ៉េ',
        summary: 'Use this when the number is not a perfect square.',
        summaryKm: 'ប្រើនៅពេលចំនួនមិនមែនជាការ៉េពេញលេញ។',
        nodes: [
          {
            kind: 'start',
            text: 'Find the perfect squares on either side: $4<7<9$.',
            textKm: 'រកការ៉េពេញលេញនៅសងខាង៖ $4<7<9$។',
          },
          {
            kind: 'step',
            text: 'Take square roots: $2<\\sqrt{7}<3$.',
            textKm: 'យកឫសការ៉េ៖ $2<\\sqrt{7}<3$។',
          },
          {
            kind: 'step',
            text: 'Test one-decimal values: $2.6^2=6.76$ and $2.7^2=7.29$.',
            textKm: 'សាកតម្លៃមួយខ្ទង់ទសភាគ៖ $2.6^2=6.76$ និង $2.7^2=7.29$។',
          },
          {
            kind: 'end',
            text: 'So $2.6<\\sqrt{7}<2.7$; in fact $\\sqrt{7}\\approx2.65$.',
            textKm: 'ដូច្នេះ $2.6<\\sqrt{7}<2.7$ តាមពិត $\\sqrt{7}\\approx2.65$។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-estimate-root-seven',
        title: 'Reading √7 from y = x²',
        titleKm: 'អាន √7 ពីក្រាហ្វ y = x²',
        caption: 'The line y = 7 meets y = x² at P, between A(2, 4) and B(3, 9). So √7 lies between 2 and 3: √7 ≈ 2.65.',
        captionKm: 'បន្ទាត់ y = 7 ជួបក្រាហ្វ y = x² ត្រង់ P នៅចន្លោះ A(2, 4) និង B(3, 9)។ ដូច្នេះ √7 នៅចន្លោះ 2 និង 3៖ √7 ≈ 2.65។',
        xRange: [0, 4],
        yRange: [0, 16],
        yStep: 2,
        equalScale: false,
        curves: [{ fn: (x) => x * x, label: 'y = x²', color: 1, domain: [0, 4] }],
        lines: [
          { kind: 'horizontal', at: 7, color: 2, dashed: true, label: 'y = 7' },
          { kind: 'segment', from: [Math.sqrt(7), 0], to: [Math.sqrt(7), 7], color: 3, dashed: true, label: 'x = √7' },
        ],
        points: [
          { x: 2, y: 4, label: 'A', anchor: 'se' },
          { x: 3, y: 9, label: 'B', anchor: 'se' },
          { x: Math.sqrt(7), y: 7, label: 'P', color: 2, anchor: 'nw' },
        ],
      },
    ],
  },

  'scientific-notation': {
    flowcharts: [
      {
        id: 'g8-flow-write-scientific-notation',
        topicIds: ['scientific-notation'],
        title: 'Writing a number in scientific notation',
        titleKm: 'ការសរសេរចំនួនជាសញ្ញាណវិទ្យាសាស្ត្រ',
        summary: 'Use this to write a very large or very small number as $a\\times10^n$.',
        summaryKm: 'ប្រើដើម្បីសរសេរចំនួនធំខ្លាំង ឬតូចខ្លាំងជា $a\\times10^n$។',
        nodes: [
          { kind: 'start', text: 'Read the ordinary number.', textKm: 'អានចំនួនធម្មតា។' },
          {
            kind: 'step',
            text: 'Move the decimal point until one non-zero digit is in front: $1\\le a<10$.',
            textKm: 'រំកិលក្បៀសរហូតមានខ្ទង់មិនសូន្យមួយនៅខាងមុខ៖ $1\\le a<10$។',
          },
          {
            kind: 'step',
            text: 'Count how many places the point moved.',
            textKm: 'រាប់ចំនួនខ្ទង់ដែលក្បៀសបានរំកិល។',
          },
          {
            kind: 'decision',
            text: 'How big was the original number?',
            textKm: 'តើចំនួនដើមធំប៉ុណ្ណា?',
            branches: [
              {
                label: '10 or more',
                labelKm: '10 ឬធំជាង',
                text: '$n$ is positive: $45\\,000=4.5\\times10^4$.',
                textKm: '$n$ វិជ្ជមាន៖ $45\\,000=4.5\\times10^4$។',
              },
              {
                label: 'Between 0 and 1',
                labelKm: 'ចន្លោះ 0 និង 1',
                text: '$n$ is negative: $0.003=3\\times10^{-3}$.',
                textKm: '$n$ អវិជ្ជមាន៖ $0.003=3\\times10^{-3}$។',
              },
              {
                label: 'From 1 to 10',
                labelKm: 'ពី 1 ដល់ 10',
                text: '$n=0$: $7.2=7.2\\times10^0$.',
                textKm: '$n=0$៖ $7.2=7.2\\times10^0$។',
              },
            ],
          },
          { kind: 'end', text: 'Write the answer.', textKm: 'សរសេរចម្លើយ។', math: tex`N=a\times10^n,\quad 1\le a<10` },
        ],
      },
      {
        id: 'g8-flow-scientific-multiply-divide',
        topicIds: ['scientific-notation'],
        title: 'Multiplying and dividing in scientific notation',
        titleKm: 'ការគុណ និងចែកក្នុងសញ្ញាណវិទ្យាសាស្ត្រ',
        summary: 'Use this to calculate with numbers written as $a\\times10^n$.',
        summaryKm: 'ប្រើដើម្បីគណនាជាមួយចំនួនដែលសរសេរជា $a\\times10^n$។',
        nodes: [
          {
            kind: 'start',
            text: 'Group the front numbers together and the powers of 10 together.',
            textKm: 'ដាក់មេគុណជាមួយគ្នា ហើយស្វ័យគុណនៃ 10 ជាមួយគ្នា។',
          },
          {
            kind: 'decision',
            text: 'Multiply or divide?',
            textKm: 'គុណ ឬចែក?',
            branches: [
              {
                label: 'Multiply',
                labelKm: 'គុណ',
                text: 'Multiply the front numbers; add the exponents.',
                textKm: 'គុណមេគុណ បូកនិទស្សន្ត។',
                math: tex`(3.2\times10^4)(4.5\times10^3)=14.4\times10^7`,
              },
              {
                label: 'Divide',
                labelKm: 'ចែក',
                text: 'Divide the front numbers; subtract the exponents.',
                textKm: 'ចែកមេគុណ ដកនិទស្សន្ត។',
                math: tex`\frac{6.3\times10^5}{9\times10^{-2}}=0.7\times10^7`,
              },
            ],
          },
          {
            kind: 'decision',
            text: 'Is the front number from 1 up to (not including) 10?',
            textKm: 'តើមេគុណនៅចន្លោះ 1 (រាប់បញ្ចូល) ដល់ 10 (មិនរាប់បញ្ចូល) ឬទេ?',
            branches: [
              { label: 'Yes', labelKm: 'មែន', text: 'Done.', textKm: 'រួចរាល់។' },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'Adjust: $14.4\\times10^7=1.44\\times10^8$ and $0.7\\times10^7=7\\times10^6$.',
                textKm: 'កែតម្រូវ៖ $14.4\\times10^7=1.44\\times10^8$ និង $0.7\\times10^7=7\\times10^6$។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Write the answer as $a\\times10^n$.',
            textKm: 'សរសេរចម្លើយជា $a\\times10^n$។',
          },
        ],
      },
    ],
  },

  'linear-equations-and-inequalities': {
    flowcharts: [
      {
        id: 'g8-flow-variables-both-sides',
        topicIds: ['linear-equations-and-inequalities'],
        title: 'Variables on both sides',
        titleKm: 'អថេរនៅអង្គទាំងពីរ',
        summary: 'Use this when $x$ appears on both sides of the equation.',
        summaryKm: 'ប្រើនៅពេល $x$ មាននៅអង្គទាំងពីរនៃសមីការ។',
        nodes: [
          { kind: 'start', text: 'Expand any brackets on both sides.', textKm: 'ពន្លាតវង់ក្រចកនៅអង្គទាំងពីរ។' },
          {
            kind: 'step',
            text: 'Collect the $x$-terms on one side: $5x-2x-7=11$.',
            textKm: 'ប្រមូលតួមាន $x$ នៅអង្គម្ខាង៖ $5x-2x-7=11$។',
          },
          {
            kind: 'step',
            text: 'Move the numbers to the other side: $3x=18$.',
            textKm: 'ផ្លាស់ចំនួនថេរទៅអង្គម្ខាងទៀត៖ $3x=18$។',
          },
          {
            kind: 'step',
            text: 'Divide by the coefficient of $x$: $x=6$.',
            textKm: 'ចែកនឹងមេគុណនៃ $x$៖ $x=6$។',
          },
          {
            kind: 'end',
            text: 'Check both sides in the original equation.',
            textKm: 'ផ្ទៀងផ្ទាត់អង្គទាំងពីរក្នុងសមីការដើម។',
            math: '5(6)-7=23=2(6)+11',
          },
        ],
      },
      {
        id: 'g8-flow-solve-inequality',
        topicIds: ['linear-equations-and-inequalities'],
        title: 'Solving a linear inequality',
        titleKm: 'ការដោះស្រាយវិសមីការលីនេអ៊ែរ',
        summary: 'Solve like an equation, but watch the direction of the sign.',
        summaryKm: 'ដោះស្រាយដូចសមីការ ប៉ុន្តែត្រូវប្រយ័ត្នទិសនៃសញ្ញា។',
        nodes: [
          {
            kind: 'start',
            text: 'Solve step by step, keeping the inequality sign.',
            textKm: 'ដោះស្រាយម្ដងមួយជំហាន ដោយរក្សាសញ្ញាវិសមភាព។',
          },
          {
            kind: 'decision',
            text: 'Are you multiplying or dividing by a negative number?',
            textKm: 'តើអ្នកកំពុងគុណ ឬចែកនឹងចំនួនអវិជ្ជមានឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'Reverse the sign: $<$ becomes $>$, $\\le$ becomes $\\ge$.',
                textKm: 'ប្ដូរទិសសញ្ញា៖ $<$ ទៅជា $>$ ហើយ $\\le$ ទៅជា $\\ge$។',
              },
              { label: 'No', labelKm: 'ទេ', text: 'Keep the sign.', textKm: 'រក្សាសញ្ញាដដែល។' },
            ],
          },
          {
            kind: 'step',
            text: 'Example: $-3(x-2)\\ge15$ gives $x-2\\le-5$, so $x\\le-3$.',
            textKm: 'ឧទាហរណ៍៖ $-3(x-2)\\ge15$ ឲ្យ $x-2\\le-5$ ដូច្នេះ $x\\le-3$។',
          },
          {
            kind: 'decision',
            text: 'Is the endpoint included?',
            textKm: 'តើចុងចន្លោះត្រូវរាប់បញ្ចូលឬទេ?',
            branches: [
              {
                label: '$\\le$ or $\\ge$',
                labelKm: '$\\le$ ឬ $\\ge$',
                text: 'Closed dot; square bracket.',
                textKm: 'ចំណុចពេញ តង្កៀបជ្រុង។',
              },
              {
                label: '$<$ or $>$',
                labelKm: '$<$ ឬ $>$',
                text: 'Open dot; round bracket.',
                textKm: 'ចំណុចប្រហោង វង់ក្រចក។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Write the interval: $x\\le-3$ is $(-\\infty,-3]$.',
            textKm: 'សរសេរចន្លោះ៖ $x\\le-3$ គឺ $(-\\infty,-3]$។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-both-sides-intersection',
        title: 'Solving 5x − 7 = 2x + 11 on a graph',
        titleKm: 'ដោះស្រាយ 5x − 7 = 2x + 11 លើក្រាហ្វ',
        caption: 'Each side is a line. They cross at S(6, 23), so x = 6: both sides equal 23 there.',
        captionKm: 'អង្គនីមួយៗជាបន្ទាត់មួយ។ ពួកវាប្រសព្វគ្នាត្រង់ S(6, 23) ដូច្នេះ x = 6៖ អង្គទាំងពីរស្មើ 23 នៅទីនោះ។',
        xRange: [0, 8],
        yRange: [-10, 35],
        yStep: 5,
        equalScale: false,
        curves: [
          { fn: (x) => 5 * x - 7, label: 'y = 5x − 7', color: 1 },
          { fn: (x) => 2 * x + 11, label: 'y = 2x + 11', color: 2 },
        ],
        lines: [{ kind: 'segment', from: [6, 0], to: [6, 23], color: 3, dashed: true, label: 'x = 6' }],
        points: [
          { x: 6, y: 23, label: 'S', color: 3, anchor: 'se' },
          { x: 6, y: 0, color: 3, anchor: 'se' },
        ],
      },
      {
        id: 'g8-graph-inequality-number-line',
        title: 'The solution x ≤ −3',
        titleKm: 'ចម្លើយ x ≤ −3',
        caption: 'The closed dot at −3 means −3 is included. The arrow covers every number less than −3: the interval (−∞, −3].',
        captionKm: 'ចំណុចពេញត្រង់ −3 មានន័យថា −3 ត្រូវបានរាប់បញ្ចូល។ ព្រួញគ្របគ្រប់ចំនួនតូចជាង −3៖ ចន្លោះ (−∞, −3]។',
        xRange: [-8, 2],
        yRange: [-1, 1],
        lines: [{ kind: 'segment', from: [-3, 0], to: [-8, 0], color: 2, arrow: true }],
        points: [{ x: -3, y: 0, color: 2, anchor: 'n' }],
      },
    ],
  },

  'polynomials-intro': {
    flowcharts: [
      {
        id: 'g8-flow-expand-polynomial',
        topicIds: ['polynomials-intro'],
        title: 'Expanding a product',
        titleKm: 'ការពន្លាតផលគុណ',
        summary: 'Use this to multiply out brackets and simplify.',
        summaryKm: 'ប្រើដើម្បីពន្លាតវង់ក្រចក និងសម្រួល។',
        nodes: [
          { kind: 'start', text: 'Look at the product to expand.', textKm: 'មើលផលគុណដែលត្រូវពន្លាត។' },
          {
            kind: 'decision',
            text: 'What kind of product is it?',
            textKm: 'តើវាជាផលគុណប្រភេទណា?',
            branches: [
              {
                label: 'Monomial × polynomial',
                labelKm: 'ឯកធា × ពហុធា',
                text: 'Multiply the monomial by every term.',
                textKm: 'គុណឯកធានឹងគ្រប់តួ។',
              },
              {
                label: 'Two binomials',
                labelKm: 'ទ្វេធាពីរ',
                text: 'Multiply each term by each term: four products.',
                textKm: 'គុណតួនីមួយៗនឹងតួនីមួយៗ៖ ផលគុណបួន។',
              },
              {
                label: '$(a\\pm b)^2$',
                labelKm: '$(a\\pm b)^2$',
                text: 'Use $a^2\\pm2ab+b^2$.',
                textKm: 'ប្រើ $a^2\\pm2ab+b^2$។',
              },
              {
                label: '$(a+b)(a-b)$',
                labelKm: '$(a+b)(a-b)$',
                text: 'Use $a^2-b^2$.',
                textKm: 'ប្រើ $a^2-b^2$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Multiply coefficients and add the exponents of the same variable.',
            textKm: 'គុណមេគុណ ហើយបូកនិទស្សន្តនៃអថេរដូចគ្នា។',
          },
          { kind: 'step', text: 'Collect like terms.', textKm: 'បូកបង្រួមតួដូចគ្នា។' },
          {
            kind: 'end',
            text: 'Write the terms from highest to lowest degree.',
            textKm: 'សរសេរតួពីដឺក្រេខ្ពស់ទៅទាប។',
            math: '(3x-2)(x+5)=3x^2+13x-10',
          },
        ],
      },
    ],
  },

  'factorization-common-factors': {
    flowcharts: [
      {
        id: 'g8-flow-factorize',
        topicIds: ['factorization-common-factors'],
        title: 'Factorising a polynomial',
        titleKm: 'ការដាក់ពហុធាជាកត្តា',
        summary: 'Use this order every time you factorise.',
        summaryKm: 'ប្រើលំដាប់នេះរាល់ពេលដាក់ជាកត្តា។',
        nodes: [
          {
            kind: 'start',
            text: 'Write the polynomial in descending powers.',
            textKm: 'សរសេរពហុធាតាមលំដាប់ស្វ័យគុណចុះ។',
          },
          {
            kind: 'step',
            text: 'Take out the greatest common factor first: $3x^2-27=3(x^2-9)$.',
            textKm: 'ទាញកត្តារួមធំបំផុតចេញមុន៖ $3x^2-27=3(x^2-9)$។',
          },
          {
            kind: 'decision',
            text: 'How many terms are left in the bracket?',
            textKm: 'តើក្នុងវង់ក្រចកនៅសល់ប៉ុន្មានតួ?',
            branches: [
              {
                label: 'Two',
                labelKm: 'ពីរ',
                text: 'A difference of squares?',
                textKm: 'ជាផលដកការ៉េឬទេ?',
                math: 'a^2-b^2=(a-b)(a+b)',
              },
              {
                label: 'Three',
                labelKm: 'បី',
                text: 'For $x^2+bx+c$, find $p$, $q$ with $p+q=b$ and $pq=c$.',
                textKm: 'ចំពោះ $x^2+bx+c$ រក $p$, $q$ ដែល $p+q=b$ និង $pq=c$។',
                math: 'x^2+bx+c=(x+p)(x+q)',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'Can any factor be factorised again?',
            textKm: 'តើមានកត្តាណាអាចដាក់ជាកត្តាបន្តទៀតឬទេ?',
            branches: [
              { label: 'Yes', labelKm: 'មែន', text: 'Repeat the steps on it.', textKm: 'ធ្វើជំហានដដែលលើវា។' },
              { label: 'No', labelKm: 'ទេ', text: 'It is fully factorised.', textKm: 'វាត្រូវបានដាក់ជាកត្តាពេញលេញ។' },
            ],
          },
          {
            kind: 'end',
            text: 'Check by expanding the answer.',
            textKm: 'ផ្ទៀងផ្ទាត់ដោយពន្លាតចម្លើយ។',
            math: '3x^2-27=3(x-3)(x+3)',
          },
        ],
      },
    ],
  },

  'linear-functions': {
    flowcharts: [
      {
        id: 'g8-flow-line-from-two-points',
        topicIds: ['linear-functions'],
        title: 'Rule of a line through two points',
        titleKm: 'សមីការបន្ទាត់កាត់តាមពីរចំណុច',
        summary: 'Use this to find $y=mx+b$ from two points on the line.',
        summaryKm: 'ប្រើដើម្បីរក $y=mx+b$ ពីចំណុចពីរលើបន្ទាត់។',
        nodes: [
          {
            kind: 'start',
            text: 'Label the points $(x_1,y_1)$ and $(x_2,y_2)$. Check $x_1\\ne x_2$.',
            textKm: 'ដាក់ឈ្មោះចំណុច $(x_1,y_1)$ និង $(x_2,y_2)$។ ពិនិត្យ $x_1\\ne x_2$។',
          },
          {
            kind: 'step',
            text: 'Find the slope.',
            textKm: 'រកមេគុណប្រាប់ទិស។',
            math: tex`m=\frac{y_2-y_1}{x_2-x_1}=\frac{13-5}{6-2}=2`,
          },
          {
            kind: 'step',
            text: 'Substitute one point into $y=mx+b$ to find $b$: $5=2(2)+b$, so $b=1$.',
            textKm: 'ជំនួសចំណុចមួយក្នុង $y=mx+b$ ដើម្បីរក $b$៖ $5=2(2)+b$ ដូច្នេះ $b=1$។',
          },
          {
            kind: 'step',
            text: 'Write the rule: $y=2x+1$.',
            textKm: 'សរសេរសមីការ៖ $y=2x+1$។',
          },
          {
            kind: 'end',
            text: 'Check the other point: $2(6)+1=13$.',
            textKm: 'ផ្ទៀងផ្ទាត់ចំណុចមួយទៀត៖ $2(6)+1=13$។',
          },
        ],
      },
      {
        id: 'g8-flow-read-slope',
        topicIds: ['linear-functions'],
        title: 'What the slope tells you',
        titleKm: 'អ្វីដែលមេគុណប្រាប់ទិសប្រាប់យើង',
        summary: 'Use this to describe a line from its slope $m$.',
        summaryKm: 'ប្រើដើម្បីពិពណ៌នាបន្ទាត់តាមមេគុណប្រាប់ទិស $m$។',
        nodes: [
          {
            kind: 'start',
            text: 'Write the rule as $y=mx+b$.',
            textKm: 'សរសេរសមីការជា $y=mx+b$។',
          },
          {
            kind: 'decision',
            text: 'What is the sign of $m$?',
            textKm: 'តើ $m$ មានសញ្ញាអ្វី?',
            branches: [
              {
                label: '$m>0$',
                labelKm: '$m>0$',
                text: 'The line rises from left to right.',
                textKm: 'បន្ទាត់ឡើងពីឆ្វេងទៅស្ដាំ។',
              },
              {
                label: '$m<0$',
                labelKm: '$m<0$',
                text: 'The line falls from left to right.',
                textKm: 'បន្ទាត់ចុះពីឆ្វេងទៅស្ដាំ។',
              },
              {
                label: '$m=0$',
                labelKm: '$m=0$',
                text: 'The line is horizontal: $y=b$.',
                textKm: 'បន្ទាត់ដេក៖ $y=b$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'The $y$-intercept is $(0,b)$.',
            textKm: 'ចំណុចប្រសព្វជាមួយអ័ក្សអរដោនេគឺ $(0,b)$។',
          },
          {
            kind: 'end',
            text: 'If $m\\ne0$, the $x$-intercept is $x_0=-\\frac{b}{m}$.',
            textKm: 'បើ $m\\ne0$ ចំណុចប្រសព្វជាមួយអ័ក្សអាប់ស៊ីសគឺ $x_0=-\\frac{b}{m}$។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-line-rise-run',
        title: 'The line y = 2x + 1',
        titleKm: 'បន្ទាត់ y = 2x + 1',
        caption: 'From A(2, 5) to B(6, 13): x₂ − x₁ = 4 and y₂ − y₁ = 8, so m = 8 ÷ 4 = 2. The line meets the y-axis at P(0, 1) and the x-axis at Q(−0.5, 0).',
        captionKm: 'ពី A(2, 5) ទៅ B(6, 13)៖ x₂ − x₁ = 4 និង y₂ − y₁ = 8 ដូច្នេះ m = 8 ÷ 4 = 2។ បន្ទាត់កាត់អ័ក្ស y ត្រង់ P(0, 1) និងអ័ក្ស x ត្រង់ Q(−0.5, 0)។',
        xRange: [-2, 8],
        yRange: [-2, 14],
        yStep: 2,
        equalScale: false,
        curves: [{ fn: (x) => 2 * x + 1, label: 'y = 2x + 1', color: 1 }],
        lines: [
          { kind: 'segment', from: [2, 5], to: [6, 5], color: 3, dashed: true, label: 'x₂ − x₁ = 4' },
          { kind: 'segment', from: [6, 5], to: [6, 13], color: 4, dashed: true, label: 'y₂ − y₁ = 8' },
        ],
        points: [
          { x: 2, y: 5, label: 'A', color: 2, anchor: 'nw' },
          { x: 6, y: 13, label: 'B', color: 2, anchor: 'nw' },
          { x: 0, y: 1, label: 'P', anchor: 'nw' },
          { x: -0.5, y: 0, label: 'Q', anchor: 'se' },
        ],
      },
    ],
  },

  'pythagorean-theorem': {
    flowcharts: [
      {
        id: 'g8-flow-pythagoras-missing-side',
        topicIds: ['pythagorean-theorem'],
        title: 'Finding a missing side',
        titleKm: 'ការរកជ្រុងដែលខ្វះ',
        summary: 'Use this in a right triangle when two sides are known.',
        summaryKm: 'ប្រើក្នុងត្រីកោណកែង នៅពេលស្គាល់ជ្រុងពីរ។',
        nodes: [
          { kind: 'start', text: 'Check that the triangle has a right angle.', textKm: 'ពិនិត្យថាត្រីកោណមានមុំកែង។' },
          {
            kind: 'step',
            text: 'Mark the hypotenuse $c$: the side opposite the right angle.',
            textKm: 'សម្គាល់អ៊ីប៉ូតេនុស $c$៖ ជ្រុងឈមនឹងមុំកែង។',
          },
          {
            kind: 'decision',
            text: 'Which side is missing?',
            textKm: 'តើជ្រុងណាដែលខ្វះ?',
            branches: [
              {
                label: 'The hypotenuse',
                labelKm: 'អ៊ីប៉ូតេនុស',
                text: 'Add the squares of the legs.',
                textKm: 'បូកការ៉េនៃជ្រុងជាប់មុំកែង។',
                math: tex`c=\sqrt{a^2+b^2}`,
              },
              {
                label: 'A leg',
                labelKm: 'ជ្រុងជាប់មុំកែង',
                text: 'Subtract the known leg squared from $c^2$.',
                textKm: 'ដកការ៉េនៃជ្រុងដែលស្គាល់ចេញពី $c^2$។',
                math: tex`a=\sqrt{c^2-b^2}`,
              },
            ],
          },
          {
            kind: 'step',
            text: 'Example: $c=\\sqrt{9^2+12^2}=\\sqrt{225}=15$.',
            textKm: 'ឧទាហរណ៍៖ $c=\\sqrt{9^2+12^2}=\\sqrt{225}=15$។',
          },
          {
            kind: 'end',
            text: 'Check that the hypotenuse is the longest side. Add units.',
            textKm: 'ផ្ទៀងផ្ទាត់ថាអ៊ីប៉ូតេនុសវែងជាងគេ។ ដាក់ឯកតា។',
          },
        ],
      },
      {
        id: 'g8-flow-pythagoras-converse',
        topicIds: ['pythagorean-theorem'],
        title: 'Is it a right triangle?',
        titleKm: 'តើវាជាត្រីកោណកែងឬទេ?',
        summary: 'Use the converse of the theorem to test three side lengths.',
        summaryKm: 'ប្រើទ្រឹស្តីបទច្រាស ដើម្បីពិនិត្យប្រវែងជ្រុងបី។',
        nodes: [
          { kind: 'start', text: 'Write the three side lengths.', textKm: 'សរសេរប្រវែងជ្រុងទាំងបី។' },
          { kind: 'step', text: 'Let $c$ be the longest side.', textKm: 'តាង $c$ ជាជ្រុងវែងជាងគេ។' },
          {
            kind: 'step',
            text: 'Work out $a^2+b^2$ and $c^2$.',
            textKm: 'គណនា $a^2+b^2$ និង $c^2$។',
          },
          {
            kind: 'decision',
            text: 'Is $a^2+b^2=c^2$?',
            textKm: 'តើ $a^2+b^2=c^2$ ឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'Right triangle; the right angle is opposite $c$. Example: $9+16=25$.',
                textKm: 'ត្រីកោណកែង មុំកែងឈមនឹង $c$។ ឧទាហរណ៍៖ $9+16=25$។',
              },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'Not a right triangle. Example: $4+9\\ne16$.',
                textKm: 'មិនមែនត្រីកោណកែងទេ។ ឧទាហរណ៍៖ $4+9\\ne16$។',
              },
            ],
          },
          { kind: 'end', text: 'State your conclusion.', textKm: 'សរសេរសេចក្ដីសន្និដ្ឋាន។' },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-right-triangle-3-4-5',
        title: 'A 3-4-5 right triangle',
        titleKm: 'ត្រីកោណកែង 3-4-5',
        caption: 'Count the grid: AB = 4 and BC = 3, with the right angle at B. AC² = 4² + 3² = 25, so the hypotenuse AC = 5.',
        captionKm: 'រាប់ក្រឡា៖ AB = 4 និង BC = 3 ដោយមុំកែងនៅ B។ AC² = 4² + 3² = 25 ដូច្នេះអ៊ីប៉ូតេនុស AC = 5។',
        xRange: [-1, 6],
        yRange: [-1, 5],
        lines: [
          { kind: 'segment', from: [0, 0], to: [4, 0], color: 1 },
          { kind: 'segment', from: [4, 0], to: [4, 3], color: 1 },
          { kind: 'segment', from: [0, 0], to: [4, 3], color: 2 },
          { kind: 'segment', from: [3.6, 0], to: [3.6, 0.4], color: 1 },
          { kind: 'segment', from: [3.6, 0.4], to: [4, 0.4], color: 1 },
        ],
        points: [
          { x: 0, y: 0, label: 'A', anchor: 'nw' },
          { x: 4, y: 0, label: 'B', anchor: 'se' },
          { x: 4, y: 3, label: 'C', color: 2, anchor: 'ne' },
        ],
      },
    ],
  },

  'congruence-and-transformations': {
    flowcharts: [
      {
        id: 'g8-flow-transform-point',
        topicIds: ['congruence-and-transformations'],
        title: 'Transforming a shape on the grid',
        titleKm: 'ការបំប្លែងរូបលើប្លង់កូអរដោនេ',
        summary: 'Use this to find the image of each vertex.',
        summaryKm: 'ប្រើដើម្បីរករូបភាពនៃកំពូលនីមួយៗ។',
        nodes: [
          {
            kind: 'start',
            text: 'Write the coordinates $(x,y)$ of each vertex.',
            textKm: 'សរសេរកូអរដោនេ $(x,y)$ នៃកំពូលនីមួយៗ។',
          },
          {
            kind: 'decision',
            text: 'Which transformation?',
            textKm: 'តើជាបំប្លែងអ្វី?',
            branches: [
              {
                label: 'Translation by $(a,b)$',
                labelKm: 'បំប្លែងបណ្ដែតតាម $(a,b)$',
                text: 'Add $a$ to $x$ and $b$ to $y$.',
                textKm: 'បូក $a$ ទៅ $x$ និង $b$ ទៅ $y$។',
                math: tex`(x,y)\mapsto(x+a,\ y+b)`,
              },
              {
                label: 'Reflection in the y-axis',
                labelKm: 'ចំណាំងឆ្លុះធៀបនឹងអ័ក្ស y',
                text: 'Change the sign of $x$.',
                textKm: 'ប្ដូរសញ្ញានៃ $x$។',
                math: tex`(x,y)\mapsto(-x,\ y)`,
              },
              {
                label: 'Rotation 90° anticlockwise about O',
                labelKm: 'រង្វិល 90° ច្រាសទ្រនិចនាឡិកាជុំវិញ O',
                text: 'Swap the coordinates, then change the sign of the new $x$.',
                textKm: 'ប្ដូរកូអរដោនេ រួចប្ដូរសញ្ញានៃ $x$ ថ្មី។',
                math: tex`(x,y)\mapsto(-y,\ x)`,
              },
            ],
          },
          {
            kind: 'step',
            text: "Apply the rule to every vertex: $A\\to A'$, $B\\to B'$, $C\\to C'$.",
            textKm: "អនុវត្តច្បាប់លើគ្រប់កំពូល៖ $A\\to A'$, $B\\to B'$, $C\\to C'$។",
          },
          { kind: 'step', text: 'Plot the image and join its vertices.', textKm: 'ដៅរូបភាព ហើយភ្ជាប់កំពូលរបស់វា។' },
          {
            kind: 'end',
            text: 'Check: side lengths are unchanged, so the image is congruent.',
            textKm: 'ផ្ទៀងផ្ទាត់៖ ប្រវែងជ្រុងមិនប្រែប្រួល ដូច្នេះរូបភាពប៉ុននឹងរូបដើម។',
          },
        ],
      },
      {
        id: 'g8-flow-congruence-test',
        topicIds: ['congruence-and-transformations'],
        title: 'Are two triangles congruent?',
        titleKm: 'តើត្រីកោណពីរប៉ុនគ្នាឬទេ?',
        summary: 'Use this to choose a congruence criterion.',
        summaryKm: 'ប្រើដើម្បីជ្រើសលក្ខខណ្ឌប៉ុនគ្នា។',
        nodes: [
          {
            kind: 'start',
            text: 'Match the corresponding vertices of the two triangles.',
            textKm: 'ផ្គូផ្គងកំពូលត្រូវគ្នានៃត្រីកោណទាំងពីរ។',
          },
          {
            kind: 'decision',
            text: 'Which parts do you know are equal?',
            textKm: 'តើផ្នែកណាខ្លះដែលអ្នកដឹងថាស្មើគ្នា?',
            branches: [
              {
                label: 'SSS',
                labelKm: 'SSS',
                text: 'Three pairs of sides.',
                textKm: 'ជ្រុងបីគូ។',
              },
              {
                label: 'SAS',
                labelKm: 'SAS',
                text: 'Two sides and the angle between them.',
                textKm: 'ជ្រុងពីរ និងមុំនៅចន្លោះពួកវា។',
              },
              {
                label: 'ASA',
                labelKm: 'ASA',
                text: 'Two angles and the side between them.',
                textKm: 'មុំពីរ និងជ្រុងនៅចន្លោះពួកវា។',
              },
              {
                label: 'Only angles',
                labelKm: 'មានតែមុំ',
                text: 'Not enough: equal angles alone do not prove congruence.',
                textKm: 'មិនគ្រប់គ្រាន់៖ មុំស្មើគ្នាតែប៉ុណ្ណោះមិនបញ្ជាក់ភាពប៉ុនគ្នាទេ។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Write $\\triangle ABC\\cong\\triangle DEF$ with the vertices in matching order.',
            textKm: 'សរសេរ $\\triangle ABC\\cong\\triangle DEF$ ដោយរៀបកំពូលតាមលំដាប់ត្រូវគ្នា។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-translation',
        title: 'Translation by (−5, 2)',
        titleKm: 'បំប្លែងបណ្ដែតតាម (−5, 2)',
        caption: 'Every vertex moves 5 left and 2 up: (x, y) ↦ (x − 5, y + 2). A(1, 1) ↦ A′(−4, 3), B(4, 1) ↦ B′(−1, 3), C(1, 3) ↦ C′(−4, 5).',
        captionKm: 'គ្រប់កំពូលរំកិល 5 ទៅឆ្វេង និង 2 ឡើងលើ៖ (x, y) ↦ (x − 5, y + 2)។ A(1, 1) ↦ A′(−4, 3), B(4, 1) ↦ B′(−1, 3), C(1, 3) ↦ C′(−4, 5)។',
        xRange: [-5, 5],
        yRange: [-1, 6],
        lines: [
          ...polygon(triangle, 1),
          ...polygon(triangle.map(translate), 2, 'A′B′C′', true),
          { kind: 'segment', from: triangle[0], to: translate(triangle[0]), color: 4, dashed: true, arrow: true, label: '(−5, 2)' },
        ],
        points: [
          ...vertices(triangle, ['A', 'B', 'C'], 1, ['se', 'se', 'ne']),
          ...vertices(triangle.map(translate), ['A′', 'B′', 'C′'], 2, ['sw', 'se', 'nw']),
        ],
      },
      {
        id: 'g8-graph-reflection-y-axis',
        title: 'Reflection in the y-axis',
        titleKm: 'ចំណាំងឆ្លុះធៀបនឹងអ័ក្ស y',
        caption: '(x, y) ↦ (−x, y): A(1, 1) ↦ A′(−1, 1), B(4, 1) ↦ B′(−4, 1), C(1, 3) ↦ C′(−1, 3). Each image point is the same distance from the y-axis.',
        captionKm: '(x, y) ↦ (−x, y)៖ A(1, 1) ↦ A′(−1, 1), B(4, 1) ↦ B′(−4, 1), C(1, 3) ↦ C′(−1, 3)។ ចំណុចរូបភាពនីមួយៗនៅចម្ងាយស្មើពីអ័ក្ស y។',
        xRange: [-5, 5],
        yRange: [-1, 4],
        lines: [...polygon(triangle, 1), ...polygon(triangle.map(reflectY), 2, 'A′B′C′', true)],
        points: [
          ...vertices(triangle, ['A', 'B', 'C'], 1, ['se', 'se', 'ne']),
          ...vertices(triangle.map(reflectY), ['A′', 'B′', 'C′'], 2, ['sw', 'sw', 'nw']),
        ],
      },
      {
        id: 'g8-graph-rotation-90',
        title: 'Rotation of 90° anticlockwise about O',
        titleKm: 'រង្វិល 90° ច្រាសទ្រនិចនាឡិកាជុំវិញ O',
        caption: '(x, y) ↦ (−y, x): A(2, 1) ↦ A′(−1, 2), B(5, 1) ↦ B′(−1, 5), C(2, 3) ↦ C′(−3, 2). OA and OA′ are equal and perpendicular.',
        captionKm: '(x, y) ↦ (−y, x)៖ A(2, 1) ↦ A′(−1, 2), B(5, 1) ↦ B′(−1, 5), C(2, 3) ↦ C′(−3, 2)។ OA និង OA′ ស្មើគ្នា និងកែងគ្នា។',
        xRange: [-4, 6],
        yRange: [-1, 6],
        lines: [
          ...polygon(rotTriangle, 1),
          ...polygon(rotTriangle.map(rotate90), 2, 'A′B′C′', true),
          { kind: 'segment', from: [0, 0], to: rotTriangle[0], color: 4, dashed: true, label: 'OA = OA′' },
          { kind: 'segment', from: [0, 0], to: rotate90(rotTriangle[0]), color: 4, dashed: true },
        ],
        points: [
          { x: 0, y: 0, label: 'O', showCoords: false, anchor: 'sw' },
          ...vertices(rotTriangle, ['A', 'B', 'C'], 1, ['se', 'se', 'ne']),
          ...vertices(rotTriangle.map(rotate90), ['A′', 'B′', 'C′'], 2, ['e', 'ne', 'nw']),
        ],
      },
    ],
  },

  quadrilaterals: {
    flowcharts: [
      {
        id: 'g8-flow-classify-quadrilateral',
        topicIds: ['quadrilaterals'],
        title: 'Naming a quadrilateral',
        titleKm: 'ការកំណត់ឈ្មោះចតុកោណ',
        summary: 'Use this to find the most specific name for a four-sided shape.',
        summaryKm: 'ប្រើដើម្បីរកឈ្មោះជាក់លាក់បំផុតនៃរូបមានជ្រុងបួន។',
        nodes: [
          { kind: 'start', text: 'Look at the sides and angles.', textKm: 'មើលជ្រុង និងមុំ។' },
          {
            kind: 'decision',
            text: 'How many pairs of parallel sides?',
            textKm: 'តើមានជ្រុងស្របគ្នាប៉ុន្មានគូ?',
            branches: [
              {
                label: 'None',
                labelKm: 'គ្មាន',
                text: 'Two pairs of equal neighbouring sides? Then it is a kite.',
                textKm: 'មានជ្រុងជាប់គ្នាស្មើគ្នាពីរគូឬ? បើដូច្នេះវាជាខ្លែង។',
              },
              {
                label: 'One',
                labelKm: 'មួយ',
                text: 'Trapezoid.',
                textKm: 'ចតុកោណព្នាយ (ត្រាពេស)។',
              },
              {
                label: 'Two',
                labelKm: 'ពីរ',
                text: 'Parallelogram. Go to the next question.',
                textKm: 'ប៉ារ៉ាឡេឡូក្រាម។ ទៅសំណួរបន្ទាប់។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'For a parallelogram: right angles? All sides equal?',
            textKm: 'ចំពោះប៉ារ៉ាឡេឡូក្រាម៖ មានមុំកែងឬ? ជ្រុងទាំងអស់ស្មើគ្នាឬ?',
            branches: [
              { label: 'Neither', labelKm: 'គ្មានទាំងពីរ', text: 'Parallelogram.', textKm: 'ប៉ារ៉ាឡេឡូក្រាម។' },
              { label: 'Right angles only', labelKm: 'មុំកែងតែប៉ុណ្ណោះ', text: 'Rectangle.', textKm: 'ចតុកោណកែង។' },
              { label: 'Equal sides only', labelKm: 'ជ្រុងស្មើតែប៉ុណ្ណោះ', text: 'Rhombus.', textKm: 'ចតុកោណស្មើ (រ៉ូម)។' },
              { label: 'Both', labelKm: 'ទាំងពីរ', text: 'Square.', textKm: 'ការ៉េ។' },
            ],
          },
          { kind: 'end', text: 'Give the most specific name.', textKm: 'ឲ្យឈ្មោះជាក់លាក់បំផុត។' },
        ],
      },
      {
        id: 'g8-flow-quadrilateral-angles',
        topicIds: ['quadrilaterals'],
        title: 'Finding angles in a quadrilateral',
        titleKm: 'ការរកមុំក្នុងចតុកោណ',
        summary: 'Use this when some angles of a quadrilateral are unknown.',
        summaryKm: 'ប្រើនៅពេលមុំខ្លះនៃចតុកោណមិនស្គាល់។',
        nodes: [
          { kind: 'start', text: 'Write the known angles.', textKm: 'សរសេរមុំដែលស្គាល់។' },
          {
            kind: 'decision',
            text: 'What kind of quadrilateral?',
            textKm: 'តើជាចតុកោណប្រភេទណា?',
            branches: [
              {
                label: 'Any quadrilateral',
                labelKm: 'ចតុកោណណាមួយ',
                text: 'The four angles add to $360^\\circ$.',
                textKm: 'មុំទាំងបួនមានផលបូក $360^\\circ$។',
              },
              {
                label: 'Parallelogram',
                labelKm: 'ប៉ារ៉ាឡេឡូក្រាម',
                text: 'Opposite angles are equal; neighbouring angles add to $180^\\circ$.',
                textKm: 'មុំឈមស្មើគ្នា មុំជាប់គ្នាមានផលបូក $180^\\circ$។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Write an equation and solve it. Example: $\\angle A=65^\\circ$ gives $\\angle B=180^\\circ-65^\\circ=115^\\circ$.',
            textKm: 'សរសេរសមីការ ហើយដោះស្រាយ។ ឧទាហរណ៍៖ $\\angle A=65^\\circ$ ឲ្យ $\\angle B=180^\\circ-65^\\circ=115^\\circ$។',
          },
          {
            kind: 'end',
            text: 'Check that the four angles add to $360^\\circ$.',
            textKm: 'ផ្ទៀងផ្ទាត់ថាមុំទាំងបួនមានផលបូក $360^\\circ$។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-parallelogram-diagonals',
        title: 'Parallelogram ABCD',
        titleKm: 'ប៉ារ៉ាឡេឡូក្រាម ABCD',
        caption: 'AB and DC both go 5 right; AD and BC both go 2 right and 3 up, so opposite sides are parallel and equal. The diagonals meet at their shared midpoint M(3.5, 2.5).',
        captionKm: 'AB និង DC សុទ្ធតែទៅស្ដាំ 5 ហើយ AD និង BC សុទ្ធតែទៅស្ដាំ 2 ឡើងលើ 3 ដូច្នេះជ្រុងឈមស្របគ្នា និងស្មើគ្នា។ អង្កត់ទ្រូងជួបគ្នាត្រង់ចំណុចកណ្ដាលរួម M(3.5, 2.5)។',
        xRange: [-1, 8],
        yRange: [0, 5],
        lines: [
          ...polygon([
            [0, 1],
            [5, 1],
            [7, 4],
            [2, 4],
          ]),
          { kind: 'segment', from: [0, 1], to: [7, 4], color: 3, dashed: true, label: 'AC' },
          { kind: 'segment', from: [5, 1], to: [2, 4], color: 4, dashed: true, label: 'BD' },
        ],
        points: [
          { x: 0, y: 1, label: 'A', anchor: 'sw' },
          { x: 5, y: 1, label: 'B', anchor: 'se' },
          { x: 7, y: 4, label: 'C', anchor: 'ne' },
          { x: 2, y: 4, label: 'D', anchor: 'nw' },
          { x: 3.5, y: 2.5, label: 'M', color: 2, anchor: 's' },
        ],
      },
    ],
  },

  'data-displays': {
    flowcharts: [
      {
        id: 'g8-flow-histogram',
        topicIds: ['data-displays'],
        title: 'Grouping data into a histogram',
        titleKm: 'ការដាក់ទិន្នន័យជាថ្នាក់ និងគូសហ៊ីស្តូក្រាម',
        summary: 'Use this for a large set of numerical data.',
        summaryKm: 'ប្រើសម្រាប់សំណុំទិន្នន័យជាលេខដែលមានច្រើន។',
        nodes: [
          { kind: 'start', text: 'Find the smallest and largest values.', textKm: 'រកតម្លៃតូចបំផុត និងធំបំផុត។' },
          {
            kind: 'step',
            text: 'Choose $k$ classes. Width $w=\\frac{\\max-\\min}{k}$, rounded up.',
            textKm: 'ជ្រើសចំនួនថ្នាក់ $k$។ ទំហំថ្នាក់ $w=\\frac{\\max-\\min}{k}$ បង្គត់ឡើង។',
          },
          { kind: 'step', text: 'Tally the data into a frequency table.', textKm: 'រាប់ទិន្នន័យចូលក្នុងតារាងប្រេកង់។' },
          {
            kind: 'step',
            text: 'Draw touching bars: classes across, frequency up.',
            textKm: 'គូសសសរជាប់គ្នា៖ ថ្នាក់តាមអ័ក្សដេក ប្រេកង់តាមអ័ក្សឈរ។',
          },
          {
            kind: 'step',
            text: 'Estimate the mean with class midpoints $x$.',
            textKm: 'ប៉ាន់ស្មានមធ្យមដោយប្រើតម្លៃកណ្ដាលថ្នាក់ $x$។',
            math: tex`\bar{x}=\frac{\sum fx}{\sum f}`,
          },
          {
            kind: 'end',
            text: 'Describe the shape: peak, spread and gaps.',
            textKm: 'ពិពណ៌នារាង៖ កំពូល ការរាយប៉ាយ និងចន្លោះទទេ។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-histogram',
        title: 'Histogram of 26 test marks',
        titleKm: 'ហ៊ីស្តូក្រាមនៃពិន្ទុប្រឡង 26',
        caption: 'Classes 0–10, 10–20, 20–30, 30–40, 40–50 have frequencies 3, 7, 9, 5, 2 (total 26). The 20–30 class is the modal class. Estimated mean = 610 ÷ 26 ≈ 23.46.',
        captionKm: 'ថ្នាក់ 0–10, 10–20, 20–30, 30–40, 40–50 មានប្រេកង់ 3, 7, 9, 5, 2 (សរុប 26)។ ថ្នាក់ 20–30 ជាថ្នាក់ម៉ូដ។ មធ្យមប៉ាន់ស្មាន = 610 ÷ 26 ≈ 23.46។',
        xRange: [0, 50],
        yRange: [0, 10],
        xStep: 10,
        yLabel: 'f',
        equalScale: false,
        areas: histogramAreas,
        lines: histogramOutlines,
      },
    ],
  },

  'probability-compound-events': {
    flowcharts: [
      {
        id: 'g8-flow-compound-probability',
        topicIds: ['probability-compound-events'],
        title: 'Combining two events',
        titleKm: 'ការផ្សំព្រឹត្តិការណ៍ពីរ',
        summary: 'Use this to choose the right rule for "and", "or" and "not".',
        summaryKm: 'ប្រើដើម្បីជ្រើសច្បាប់ត្រឹមត្រូវសម្រាប់ «និង» «ឬ» និង «មិន»។',
        nodes: [
          {
            kind: 'start',
            text: 'List the sample space with a table or tree diagram.',
            textKm: 'សរសេរលំហគំរូដោយប្រើតារាង ឬដ្យាក្រាមដើមឈើ។',
          },
          {
            kind: 'decision',
            text: 'How are the events joined?',
            textKm: 'តើព្រឹត្តិការណ៍ភ្ជាប់គ្នាដោយរបៀបណា?',
            branches: [
              {
                label: 'A and B, independent',
                labelKm: 'A និង B ឯករាជ្យ',
                text: 'Multiply the probabilities.',
                textKm: 'គុណប្រូបាប៊ីលីតេ។',
                math: tex`P(A\cap B)=P(A)\,P(B)`,
              },
              {
                label: 'A or B, cannot both happen',
                labelKm: 'A ឬ B មិនកើតព្រមគ្នា',
                text: 'Add the probabilities.',
                textKm: 'បូកប្រូបាប៊ីលីតេ។',
                math: tex`P(A\cup B)=P(A)+P(B)`,
              },
              {
                label: 'Not A',
                labelKm: 'មិនមែន A',
                text: 'Subtract from 1.',
                textKm: 'ដកចេញពី 1។',
                math: tex`P(\text{not }A)=1-P(A)`,
              },
            ],
          },
          {
            kind: 'step',
            text: 'Example: head and six is $\\frac{1}{2}\\times\\frac{1}{6}=\\frac{1}{12}$.',
            textKm: 'ឧទាហរណ៍៖ ក្បាល និងលេខ 6 គឺ $\\frac{1}{2}\\times\\frac{1}{6}=\\frac{1}{12}$។',
          },
          {
            kind: 'end',
            text: 'Check that $0\\le P\\le1$ and simplify.',
            textKm: 'ផ្ទៀងផ្ទាត់ថា $0\\le P\\le1$ ហើយសម្រួល។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g8-graph-two-dice-sample-space',
        title: 'Sample space for two dice',
        titleKm: 'លំហគំរូនៃគ្រាប់ឡុកឡាក់ពីរ',
        caption: 'Each point (x, y) is one outcome: x on the first die, y on the second. There are 6 × 6 = 36. The 6 red points on x + y = 7 give P(sum 7) = 6/36 = 1/6.',
        captionKm: 'ចំណុច (x, y) នីមួយៗជាលទ្ធផលមួយ៖ x លើគ្រាប់ទីមួយ y លើគ្រាប់ទីពីរ។ មានទាំងអស់ 6 × 6 = 36។ ចំណុចក្រហម 6 លើ x + y = 7 ឲ្យ P(ផលបូក 7) = 6/36 = 1/6។',
        xRange: [0, 7],
        yRange: [0, 7],
        curves: [{ fn: (x) => 7 - x, label: 'x + y = 7', color: 2, dashed: true }],
        points: diceOutcomes,
      },
    ],
  },
}
