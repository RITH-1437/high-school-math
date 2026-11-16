import type { TopicVisuals } from './types'

/**
 * Flowcharts and exact graphs for Grade 9 topics, keyed by topic id.
 * Rendered in the topic page's "Visual guide" section.
 *
 * Every labelled coordinate below was computed exactly and rechecked numerically.
 */
export const grade9Visuals: TopicVisuals = {
  /* ------------------------------------------------------------------ */
  /* Algebra                                                            */
  /* ------------------------------------------------------------------ */
  'radical-expressions': {
    flowcharts: [
      {
        id: 'g9-flow-simplify-radicals',
        topicIds: ['radical-expressions'],
        title: 'Simplify a radical expression',
        titleKm: 'សម្រួលកន្សោមរ៉ាឌីកាល់',
        summary: 'Use for any sum, product, or quotient of square roots.',
        summaryKm: 'ប្រើសម្រាប់ផលបូក ផលគុណ ឬផលចែកនៃឫសការ៉េ។',
        nodes: [
          {
            kind: 'start',
            text: 'Write each radicand as a product containing its largest perfect-square factor.',
            textKm: 'សរសេរកន្សោមក្រោមរ៉ាឌីកាល់នីមួយៗជាផលគុណ ដែលមានកត្តាការ៉េប្រាកដធំបំផុត។',
            math: String.raw`\sqrt{72}=\sqrt{36\cdot 2}=6\sqrt{2}`,
          },
          {
            kind: 'step',
            text: String.raw`Move the root of the perfect square outside: $\sqrt{a^2b}=a\sqrt{b}$ for $a,b\ge 0$.`,
            textKm: String.raw`ទាញឫសនៃការ៉េប្រាកដចេញមកក្រៅ៖ $\sqrt{a^2b}=a\sqrt{b}$ ចំពោះ $a,b\ge 0$។`,
          },
          {
            kind: 'decision',
            text: 'Which operation remains?',
            textKm: 'តើនៅសល់ប្រមាណវិធីអ្វី?',
            branches: [
              {
                label: 'Add or subtract',
                labelKm: 'បូក ឬដក',
                text: 'Combine like radicals only, by adding their coefficients.',
                textKm: 'បូកបញ្ចូលតែរ៉ាឌីកាល់ដូចគ្នា ដោយបូកមេគុណរបស់វា។',
                math: String.raw`6\sqrt{2}+5\sqrt{2}-3\sqrt{2}=8\sqrt{2}`,
              },
              {
                label: 'Multiply',
                labelKm: 'គុណ',
                text: String.raw`Use $\sqrt{a}\,\sqrt{b}=\sqrt{ab}$, then simplify the new radicand.`,
                textKm: String.raw`ប្រើ $\sqrt{a}\,\sqrt{b}=\sqrt{ab}$ រួចសម្រួលកន្សោមក្រោមរ៉ាឌីកាល់ថ្មី។`,
              },
              {
                label: 'Root in a denominator',
                labelKm: 'ឫសនៅភាគបែង',
                text: String.raw`One term: multiply by $\frac{\sqrt{b}}{\sqrt{b}}$. A binomial: multiply top and bottom by its conjugate.`,
                textKm: String.raw`មួយតួ៖ គុណនឹង $\frac{\sqrt{b}}{\sqrt{b}}$។ ទ្វេធា៖ គុណភាគយក និងភាគបែងនឹងកន្សោមឆ្លាស់។`,
                math: String.raw`\frac{6}{3-\sqrt{3}}\cdot\frac{3+\sqrt{3}}{3+\sqrt{3}}=\frac{6(3+\sqrt{3})}{6}=3+\sqrt{3}`,
              },
            ],
          },
          {
            kind: 'step',
            text: 'Check: no perfect-square factor under any root, and no root left in a denominator.',
            textKm: 'ផ្ទៀងផ្ទាត់៖ គ្មានកត្តាការ៉េប្រាកដនៅក្រោមឫស ហើយគ្មានឫសនៅសល់ក្នុងភាគបែង។',
          },
          {
            kind: 'end',
            text: 'Compare decimal approximations of the original expression and your answer.',
            textKm: 'ប្រៀបធៀបតម្លៃប្រហាក់ប្រហែលជាទសភាគ នៃកន្សោមដើម និងចម្លើយរបស់អ្នក។',
          },
        ],
      },
    ],
  },

  'polynomial-factorization': {
    flowcharts: [
      {
        id: 'g9-flow-factor-completely',
        topicIds: ['polynomial-factorization'],
        title: 'Factor a polynomial completely',
        titleKm: 'ដាក់ពហុធាជាកត្តាឲ្យអស់',
        summary: 'Work through the checks in this order until no factor can be split further.',
        summaryKm: 'ធ្វើតាមលំដាប់នេះ រហូតដល់គ្មានកត្តាណាអាចដាក់ជាកត្តាបន្តទៀតបាន។',
        nodes: [
          {
            kind: 'start',
            text: 'Write the terms in descending powers of the variable.',
            textKm: 'សរសេរតួតាមលំដាប់ស្វ័យគុណចុះនៃអថេរ។',
          },
          {
            kind: 'step',
            text: String.raw`Take out the greatest common factor first: $3x^3-12x=3x(x^2-4)$.`,
            textKm: String.raw`ដកកត្តារួមធំបំផុតចេញជាមុន៖ $3x^3-12x=3x(x^2-4)$។`,
          },
          {
            kind: 'decision',
            text: 'How many terms are left inside the bracket?',
            textKm: 'តើនៅសល់ប៉ុន្មានតួក្នុងវង់ក្រចក?',
            branches: [
              {
                label: 'Two terms',
                labelKm: 'ពីរតួ',
                text: String.raw`Difference of squares: $a^2-b^2=(a-b)(a+b)$. A sum $a^2+b^2$ does not factor over the reals.`,
                textKm: String.raw`ផលដងការ៉េ៖ $a^2-b^2=(a-b)(a+b)$។ ផលបូក $a^2+b^2$ មិនអាចដាក់ជាកត្តាក្នុងសំណុំចំនួនពិតទេ។`,
              },
              {
                label: 'Three terms',
                labelKm: 'បីតួ',
                text: String.raw`Perfect square? Use $(a\pm b)^2$. Otherwise find $p,q$ with $pq=ac$ and $p+q=b$, split $bx$, and group.`,
                textKm: String.raw`ជាការ៉េប្រាកដ? ប្រើ $(a\pm b)^2$។ បើមិនមែន រក $p,q$ ដែល $pq=ac$ និង $p+q=b$ បំបែក $bx$ រួចដាក់ជាក្រុម។`,
              },
              {
                label: 'Four terms',
                labelKm: 'បួនតួ',
                text: 'Group in pairs and take a common binomial factor.',
                textKm: 'ដាក់ជាក្រុមពីរៗ ហើយដកទ្វេធារួមចេញ។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'Can any factor be factored again?',
            textKm: 'តើមានកត្តាណាអាចដាក់ជាកត្តាម្តងទៀតបានទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'បាន',
                text: 'Repeat the checks on that factor.',
                textKm: 'ធ្វើការត្រួតពិនិត្យដដែលលើកត្តានោះម្តងទៀត។',
                math: String.raw`3x(x^2-4)=3x(x-2)(x+2)`,
              },
              {
                label: 'No',
                labelKm: 'មិនបាន',
                text: 'The factorization is complete.',
                textKm: 'ការដាក់ជាកត្តាបានពេញលេញ។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Expand your answer and confirm it matches the original polynomial.',
            textKm: 'ពន្លាតចម្លើយ ហើយផ្ទៀងផ្ទាត់ថាវាស្មើនឹងពហុធាដើម។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-factors-and-zeros',
        title: 'Factors give the x-intercepts',
        titleKm: 'កត្តាផ្តល់ចំណុចប្រសព្វជាមួយអ័ក្សអាប់ស៊ីស',
        caption:
          'The graph of y = 2x² + 7x + 3 = (2x + 1)(x + 3) crosses the x-axis where a factor is zero: x = −1/2 and x = −3. It meets the y-axis at (0, 3). The vertex is (−7/4, −25/8).',
        captionKm:
          'ក្រាប y = 2x² + 7x + 3 = (2x + 1)(x + 3) កាត់អ័ក្សអាប់ស៊ីស ត្រង់កន្លែងដែលកត្តាមួយស្មើសូន្យ៖ x = −1/2 និង x = −3។ វាកាត់អ័ក្សអរដោនេត្រង់ (0, 3)។ កំពូលគឺ (−7/4, −25/8)។',
        xRange: [-5, 2],
        yRange: [-4, 8],
        yStep: 2,
        equalScale: false,
        curves: [{ fn: (x) => 2 * x * x + 7 * x + 3, label: 'y = (2x + 1)(x + 3)', color: 1 }],
        points: [
          { x: -3, y: 0, anchor: 'nw' },
          { x: -0.5, y: 0, anchor: 'ne' },
          { x: 0, y: 3, anchor: 'e' },
          { x: -1.75, y: -3.125, label: 'V(−7/4, −25/8)', showCoords: false, anchor: 'e', color: 3 },
        ],
      },
    ],
  },

  'quadratic-equations-intro': {
    flowcharts: [
      {
        id: 'g9-flow-solve-quadratic-intro',
        topicIds: ['quadratic-equations-intro'],
        title: 'Solve a quadratic equation',
        titleKm: 'ដោះស្រាយសមីការដឺក្រេទីពីរ',
        summary: 'Choose between the square-root method and factoring.',
        summaryKm: 'ជ្រើសរើសរវាងវិធីឫសការ៉េ និងការដាក់ជាកត្តា។',
        nodes: [
          {
            kind: 'start',
            text: 'Expand brackets and move every term to one side.',
            textKm: 'ពន្លាតវង់ក្រចក ហើយផ្ទេរគ្រប់តួទៅអង្គម្ខាង។',
            math: String.raw`ax^2+bx+c=0,\quad a\ne 0`,
          },
          {
            kind: 'decision',
            text: 'What does the equation look like?',
            textKm: 'តើសមីការមានរាងដូចម្តេច?',
            branches: [
              {
                label: 'Only a square',
                labelKm: 'មានតែការ៉េ',
                text: String.raw`Isolate the square: $x^2=k$ or $(x-h)^2=k$. If $k\ge 0$, take $\pm\sqrt{k}$; if $k<0$, no real solution.`,
                textKm: String.raw`ញែកការ៉េ៖ $x^2=k$ ឬ $(x-h)^2=k$។ បើ $k\ge 0$ យក $\pm\sqrt{k}$។ បើ $k<0$ គ្មានចម្លើយពិត។`,
              },
              {
                label: 'Trinomial',
                labelKm: 'ត្រីធា',
                text: String.raw`Factor, then use the zero-product property.`,
                textKm: 'ដាក់ជាកត្តា រួចប្រើលក្ខណៈផលគុណសូន្យ។',
                math: String.raw`x^2-5x-24=(x-8)(x+3)=0`,
              },
            ],
          },
          {
            kind: 'step',
            text: 'Set each factor equal to zero and solve each linear equation.',
            textKm: 'យកកត្តានីមួយៗស្មើសូន្យ ហើយដោះស្រាយសមីការលីនេអ៊ែរនីមួយៗ។',
          },
          {
            kind: 'step',
            text: 'Substitute every solution into the original equation.',
            textKm: 'ជំនួសចម្លើយនីមួយៗក្នុងសមីការដើម ដើម្បីផ្ទៀងផ្ទាត់។',
          },
          {
            kind: 'decision',
            text: 'Is it an applied problem?',
            textKm: 'តើជាចំណោទអនុវត្តឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: 'Reject values that make no sense, such as a negative length.',
                textKm: 'បដិសេធតម្លៃដែលគ្មានន័យ ដូចជាប្រវែងអវិជ្ជមាន។',
              },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'Keep every real solution.',
                textKm: 'រក្សាទុកគ្រប់ចម្លើយពិត។',
              },
            ],
          },
          {
            kind: 'end',
            text: String.raw`State the solutions, e.g. $x=-3$ or $x=8$.`,
            textKm: String.raw`សរសេរចម្លើយ ឧទាហរណ៍ $x=-3$ ឬ $x=8$។`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-quadratic-roots',
        title: 'Solutions are x-intercepts',
        titleKm: 'ចម្លើយគឺជាចំណុចប្រសព្វជាមួយអ័ក្សអាប់ស៊ីស',
        caption:
          'The parabola y = x² − 5x − 24 = (x − 8)(x + 3) crosses the x-axis at (−3, 0) and (8, 0), the solutions of x² − 5x − 24 = 0. It crosses the y-axis at (0, −24) and has its vertex at (2.5, −30.25).',
        captionKm:
          'ប៉ារ៉ាបូល y = x² − 5x − 24 = (x − 8)(x + 3) កាត់អ័ក្សអាប់ស៊ីសត្រង់ (−3, 0) និង (8, 0) ដែលជាចម្លើយនៃ x² − 5x − 24 = 0។ វាកាត់អ័ក្សអរដោនេត្រង់ (0, −24) ហើយមានកំពូលនៅ (2.5, −30.25)។',
        xRange: [-6, 11],
        yRange: [-34, 14],
        yStep: 4,
        equalScale: false,
        curves: [{ fn: (x) => x * x - 5 * x - 24, label: 'y = x² − 5x − 24', color: 1 }],
        points: [
          { x: -3, y: 0, anchor: 'nw' },
          { x: 8, y: 0, anchor: 'ne' },
          { x: 0, y: -24, anchor: 'w' },
          { x: 2.5, y: -30.25, label: 'V', anchor: 'e', color: 3 },
        ],
      },
    ],
  },

  'systems-of-linear-equations': {
    flowcharts: [
      {
        id: 'g9-flow-solve-linear-system',
        topicIds: ['systems-of-linear-equations'],
        title: 'Solve a system of two linear equations',
        titleKm: 'ដោះស្រាយប្រព័ន្ធសមីការលីនេអ៊ែរពីរ',
        summary: 'Pick the faster method, then read what the final equation tells you.',
        summaryKm: 'ជ្រើសវិធីដែលលឿនជាង រួចអានអត្ថន័យនៃសមីការចុងក្រោយ។',
        nodes: [
          {
            kind: 'start',
            text: 'Write both equations with like terms lined up.',
            textKm: 'សរសេរសមីការទាំងពីរ ដោយតម្រៀបតួដូចគ្នាឲ្យត្រង់គ្នា។',
          },
          {
            kind: 'decision',
            text: 'Which method is quicker?',
            textKm: 'តើវិធីណាលឿនជាង?',
            branches: [
              {
                label: 'A variable is isolated',
                labelKm: 'មានអថេរញែករួច',
                text: String.raw`Substitution: replace that variable in the other equation, e.g. $y=2x-1$.`,
                textKm: String.raw`វិធីជំនួស៖ ជំនួសអថេរនោះក្នុងសមីការមួយទៀត ឧទាហរណ៍ $y=2x-1$។`,
              },
              {
                label: 'Matching coefficients',
                labelKm: 'មេគុណស្មើ ឬផ្ទុយគ្នា',
                text: String.raw`Elimination: add or subtract the equations, e.g. $3y$ and $-3y$ cancel.`,
                textKm: String.raw`វិធីបំបាត់៖ បូក ឬដកសមីការ ឧទាហរណ៍ $3y$ និង $-3y$ លុបគ្នា។`,
              },
              {
                label: 'Neither',
                labelKm: 'គ្មានទាំងពីរ',
                text: 'Multiply one or both equations so a pair of coefficients match, then eliminate.',
                textKm: 'គុណសមីការមួយ ឬទាំងពីរ ឲ្យមេគុណមួយគូស្មើគ្នា រួចបំបាត់។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'What is left after removing a variable?',
            textKm: 'តើនៅសល់អ្វី ក្រោយពេលបំបាត់អថេរមួយ?',
            branches: [
              {
                label: 'x = number',
                labelKm: 'x = ចំនួន',
                text: 'One solution: substitute back to find the other variable.',
                textKm: 'មានចម្លើយមួយ៖ ជំនួសត្រឡប់ ដើម្បីរកអថេរមួយទៀត។',
              },
              {
                label: '0 = 0',
                labelKm: '0 = 0',
                text: 'Same line: infinitely many solutions.',
                textKm: 'បន្ទាត់តែមួយ៖ មានចម្លើយរាប់មិនអស់។',
              },
              {
                label: '0 = nonzero',
                labelKm: '0 = ចំនួនមិនសូន្យ',
                text: 'Parallel lines: no solution.',
                textKm: 'បន្ទាត់ស្របគ្នា៖ គ្មានចម្លើយ។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Check the ordered pair in both original equations.',
            textKm: 'ផ្ទៀងផ្ទាត់គូលំដាប់ក្នុងសមីការដើមទាំងពីរ។',
          },
          {
            kind: 'end',
            text: String.raw`Write the answer as an ordered pair, e.g. $(3,2)$.`,
            textKm: String.raw`សរសេរចម្លើយជាគូលំដាប់ ឧទាហរណ៍ $(3,2)$។`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-system-intersection',
        title: 'One solution: the lines cross',
        titleKm: 'ចម្លើយមួយ៖ បន្ទាត់កាត់គ្នា',
        caption:
          'The lines 2x + 3y = 12 and 4x − 3y = 6 meet at exactly one point, (3, 2). This ordered pair satisfies both equations.',
        captionKm:
          'បន្ទាត់ 2x + 3y = 12 និង 4x − 3y = 6 ជួបគ្នាត្រង់ចំណុចតែមួយគត់ (3, 2)។ គូលំដាប់នេះផ្ទៀងផ្ទាត់សមីការទាំងពីរ។',
        xRange: [-2, 7],
        yRange: [-3, 6],
        curves: [
          { fn: (x) => (12 - 2 * x) / 3, label: '2x + 3y = 12', color: 1 },
          { fn: (x) => (4 * x - 6) / 3, label: '4x − 3y = 6', color: 2 },
        ],
        points: [{ x: 3, y: 2, label: 'P', anchor: 'e', color: 3 }],
      },
      {
        id: 'g9-graph-system-parallel',
        title: 'No solution: parallel lines',
        titleKm: 'គ្មានចម្លើយ៖ បន្ទាត់ស្របគ្នា',
        caption:
          'The lines y = 2x + 1 and y = 2x − 3 have the same slope, 2, and different y-intercepts, (0, 1) and (0, −3). They never meet, so the system has no solution.',
        captionKm:
          'បន្ទាត់ y = 2x + 1 និង y = 2x − 3 មានមេគុណប្រាប់ទិសដូចគ្នា គឺ 2 ប៉ុន្តែចំណុចប្រសព្វជាមួយអ័ក្សអរដោនេខុសគ្នា (0, 1) និង (0, −3)។ វាមិនជួបគ្នាទេ ដូច្នេះប្រព័ន្ធគ្មានចម្លើយ។',
        xRange: [-4, 4],
        yRange: [-6, 6],
        curves: [
          { fn: (x) => 2 * x + 1, label: 'y = 2x + 1', color: 1 },
          { fn: (x) => 2 * x - 3, label: 'y = 2x − 3', color: 2 },
        ],
        points: [
          { x: 0, y: 1, anchor: 'w' },
          { x: 0, y: -3, anchor: 'e' },
        ],
      },
    ],
  },

  'functions-intro': {
    flowcharts: [
      {
        id: 'g9-flow-function-check-evaluate',
        topicIds: ['functions-intro'],
        title: 'Test a relation, then evaluate it',
        titleKm: 'ពិនិត្យទំនាក់ទំនង រួចគណនាតម្លៃ',
        summary: 'Decide whether a relation is a function, state its domain and range, and find outputs.',
        summaryKm: 'កំណត់ថាទំនាក់ទំនងជាអនុគមន៍ឬទេ សរសេរដែនកំណត់ និងសំណុំតម្លៃ ហើយរកតម្លៃបញ្ចេញ។',
        nodes: [
          {
            kind: 'start',
            text: 'Identify how the relation is given: ordered pairs, a table, a graph, or a rule.',
            textKm: 'កំណត់ថាទំនាក់ទំនងត្រូវបានផ្តល់ជា គូលំដាប់ តារាង ក្រាប ឬរូបមន្ត។',
          },
          {
            kind: 'decision',
            text: 'Does each input have exactly one output?',
            textKm: 'តើតម្លៃបញ្ចូលនីមួយៗមានតម្លៃបញ្ចេញតែមួយគត់ឬទេ?',
            branches: [
              {
                label: 'Pairs or table',
                labelKm: 'គូលំដាប់ ឬតារាង',
                text: 'Look for a repeated input with two different outputs. If one exists, it is not a function.',
                textKm: 'រកតម្លៃបញ្ចូលដដែលដែលមានតម្លៃបញ្ចេញពីរខុសគ្នា។ បើមាន វាមិនមែនជាអនុគមន៍ទេ។',
              },
              {
                label: 'Graph',
                labelKm: 'ក្រាប',
                text: 'Vertical line test: no vertical line may meet the graph more than once.',
                textKm: 'តេស្តបន្ទាត់ឈរ៖ គ្មានបន្ទាត់ឈរណាកាត់ក្រាបលើសពីមួយដងឡើយ។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Domain: list the inputs. Range: list the outputs, without repeats.',
            textKm: 'ដែនកំណត់៖ សរសេរតម្លៃបញ្ចូល។ សំណុំតម្លៃ៖ សរសេរតម្លៃបញ្ចេញ ដោយមិនសរសេរដដែល។',
          },
          {
            kind: 'step',
            text: String.raw`To find $f(a)$, replace every $x$ with $(a)$ in brackets.`,
            textKm: String.raw`ដើម្បីរក $f(a)$ ជំនួសគ្រប់ $x$ ដោយ $(a)$ ក្នុងវង់ក្រចក។`,
            math: String.raw`f(-1)=(-1)^2-4(-1)+1=6`,
          },
          {
            kind: 'end',
            text: String.raw`Write each result as a point $(a,f(a))$ on the graph.`,
            textKm: String.raw`សរសេរលទ្ធផលនីមួយៗជាចំណុច $(a,f(a))$ លើក្រាប។`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-evaluate-function',
        title: 'Inputs and outputs of f(x) = x² − 4x + 1',
        titleKm: 'តម្លៃបញ្ចូល និងតម្លៃបញ្ចេញនៃ f(x) = x² − 4x + 1',
        caption:
          'The points (−1, 6), (0, 1), and (3, −2) show f(−1) = 6, f(0) = 1, and f(3) = −2. The vertex is (2, −3). The dashed line x = 3 meets the graph once, as the vertical line test requires.',
        captionKm:
          'ចំណុច (−1, 6), (0, 1) និង (3, −2) បង្ហាញថា f(−1) = 6, f(0) = 1 និង f(3) = −2។ កំពូលគឺ (2, −3)។ បន្ទាត់ដាច់ៗ x = 3 កាត់ក្រាបតែមួយដង តាមតេស្តបន្ទាត់ឈរ។',
        xRange: [-2, 6],
        yRange: [-4, 8],
        equalScale: false,
        curves: [{ fn: (x) => x * x - 4 * x + 1, label: 'f(x) = x² − 4x + 1', color: 1 }],
        lines: [{ kind: 'vertical', at: 3, label: 'x = 3', color: 4, dashed: true }],
        points: [
          { x: -1, y: 6, anchor: 'e' },
          { x: 0, y: 1, anchor: 'e' },
          { x: 3, y: -2, anchor: 'e' },
          { x: 2, y: -3, label: 'V', anchor: 'sw', color: 3 },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Geometry                                                           */
  /* ------------------------------------------------------------------ */
  'similarity-and-dilations': {
    flowcharts: [
      {
        id: 'g9-flow-use-similarity',
        topicIds: ['similarity-and-dilations'],
        title: 'Use similarity to find a length or an area',
        titleKm: 'ប្រើភាពស្រដៀង ដើម្បីរកប្រវែង ឬផ្ទៃក្រឡា',
        summary: 'Prove similarity first, then let the scale factor do the work.',
        summaryKm: 'បង្ហាញភាពស្រដៀងជាមុនសិន រួចប្រើមេគុណមាត្រដ្ឋាន។',
        nodes: [
          {
            kind: 'start',
            text: 'Match corresponding vertices, writing both names in the same order.',
            textKm: 'ផ្គូផ្គងកំពូលដែលត្រូវគ្នា ដោយសរសេរឈ្មោះរូបទាំងពីរតាមលំដាប់ដូចគ្នា។',
          },
          {
            kind: 'decision',
            text: 'Are the figures similar?',
            textKm: 'តើរូបទាំងពីរស្រដៀងគ្នាឬទេ?',
            branches: [
              {
                label: 'Two equal angles',
                labelKm: 'មុំស្មើគ្នាពីរគូ',
                text: 'Triangles are similar by AA.',
                textKm: 'ត្រីកោណស្រដៀងគ្នាតាមលក្ខខណ្ឌ មុំ-មុំ (AA)។',
              },
              {
                label: 'All sides in one ratio',
                labelKm: 'ជ្រុងទាំងអស់សមាមាត្រ',
                text: 'The figures are similar if their angles also match.',
                textKm: 'រូបទាំងពីរស្រដៀងគ្នា បើមុំរបស់វាក៏ស្មើគ្នាដែរ។',
              },
              {
                label: 'Neither',
                labelKm: 'គ្មានទាំងពីរ',
                text: 'Similarity is not shown; do not use ratios.',
                textKm: 'មិនទាន់បង្ហាញភាពស្រដៀង កុំប្រើអនុបាត។',
              },
            ],
          },
          {
            kind: 'step',
            text: 'Find the scale factor from one known pair of corresponding sides.',
            textKm: 'រកមេគុណមាត្រដ្ឋាន ពីជ្រុងត្រូវគ្នាមួយគូដែលស្គាល់។',
            math: String.raw`k=\frac{\text{image length}}{\text{original length}}=\frac{DE}{AB}=\frac{8}{6}=\frac{4}{3}`,
          },
          {
            kind: 'decision',
            text: 'What do you need?',
            textKm: 'តើអ្នកត្រូវការអ្វី?',
            branches: [
              {
                label: 'A length',
                labelKm: 'ប្រវែង',
                text: String.raw`Multiply by $k$: $EF=9\cdot\frac{4}{3}=12$ cm.`,
                textKm: String.raw`គុណនឹង $k$៖ $EF=9\cdot\frac{4}{3}=12$ cm។`,
              },
              {
                label: 'An area',
                labelKm: 'ផ្ទៃក្រឡា',
                text: String.raw`Multiply by $k^2$, not by $k$.`,
                textKm: String.raw`គុណនឹង $k^2$ មិនមែននឹង $k$ ទេ។`,
              },
              {
                label: 'Coordinates',
                labelKm: 'កូអរដោនេ',
                text: String.raw`A dilation about the origin maps $(x,y)$ to $(kx,ky)$.`,
                textKm: String.raw`ការពង្រីកធៀបនឹងគល់តម្រុយ បំប្លែង $(x,y)$ ទៅ $(kx,ky)$។`,
              },
            ],
          },
          {
            kind: 'end',
            text: String.raw`Sense check: $k>1$ enlarges, $0<k<1$ reduces.`,
            textKm: String.raw`ពិនិត្យភាពសមហេតុផល៖ $k>1$ ពង្រីក ហើយ $0<k<1$ បង្រួម។`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-dilation-origin',
        title: 'Dilation about the origin, k = 2',
        titleKm: 'ការពង្រីកធៀបនឹងគល់តម្រុយ k = 2',
        caption:
          'Triangle ABC with A(1, 1), B(3, 1), C(1, 2) is dilated by k = 2 about O to A′(2, 2), B′(6, 2), C′(2, 4). Each image lies on the ray from O through its original. Lengths double; the area grows from 1 to 4 square units, a factor of k² = 4.',
        captionKm:
          'ត្រីកោណ ABC ដែល A(1, 1), B(3, 1), C(1, 2) ត្រូវបានពង្រីកដោយ k = 2 ធៀបនឹង O ទៅជា A′(2, 2), B′(6, 2), C′(2, 4)។ រូបភាពនីមួយៗស្ថិតលើកន្លះបន្ទាត់ពី O កាត់តាមចំណុចដើម។ ប្រវែងកើនទ្វេដង ផ្ទៃក្រឡាកើនពី 1 ទៅ 4 ឯកតាការ៉េ គឺ k² = 4 ដង។',
        xRange: [-1, 7],
        yRange: [-1, 5],
        lines: [
          { kind: 'segment', from: [1, 1], to: [3, 1], color: 1 },
          { kind: 'segment', from: [3, 1], to: [1, 2], color: 1 },
          { kind: 'segment', from: [1, 2], to: [1, 1], color: 1 },
          { kind: 'segment', from: [2, 2], to: [6, 2], color: 2 },
          { kind: 'segment', from: [6, 2], to: [2, 4], color: 2 },
          { kind: 'segment', from: [2, 4], to: [2, 2], color: 2 },
          { kind: 'segment', from: [0, 0], to: [2, 2], color: 4, dashed: true },
          { kind: 'segment', from: [0, 0], to: [6, 2], color: 4, dashed: true },
          { kind: 'segment', from: [0, 0], to: [2, 4], color: 4, dashed: true },
        ],
        points: [
          { x: 1, y: 1, label: 'A', anchor: 'se', color: 1 },
          { x: 3, y: 1, label: 'B', anchor: 'se', color: 1 },
          { x: 1, y: 2, label: 'C', anchor: 'w', color: 1 },
          { x: 2, y: 2, label: 'A′', anchor: 'se', color: 2 },
          { x: 6, y: 2, label: 'B′', anchor: 'n', color: 2 },
          { x: 2, y: 4, label: 'C′', anchor: 'e', color: 2 },
        ],
      },
    ],
  },

  'circle-geometry': {
    flowcharts: [
      {
        id: 'g9-flow-circle-facts',
        topicIds: ['circle-geometry'],
        title: 'Choose the circle fact',
        titleKm: 'ជ្រើសរើសលក្ខណៈរង្វង់',
        summary: 'Decide whether the unknown is an angle or a length, then apply the matching fact.',
        summaryKm: 'កំណត់ថាតម្លៃមិនស្គាល់ជាមុំ ឬប្រវែង រួចប្រើលក្ខណៈដែលត្រូវគ្នា។',
        nodes: [
          {
            kind: 'start',
            text: 'Mark the centre, every radius, and the arc each angle stands on.',
            textKm: 'គូសចំណាំផ្ចិត កាំនីមួយៗ និងធ្នូដែលមុំនីមួយៗឈរលើ។',
          },
          {
            kind: 'decision',
            text: 'Is the unknown an angle or a length?',
            textKm: 'តើតម្លៃមិនស្គាល់ជាមុំ ឬប្រវែង?',
            branches: [
              {
                label: 'Angle',
                labelKm: 'មុំ',
                text: String.raw`Central angle $=$ arc. Inscribed angle $=\frac{1}{2}$ central angle. Angle in a semicircle $=90^{\circ}$.`,
                textKm: String.raw`មុំផ្ចិត $=$ ធ្នូ។ មុំចារឹកក្នុងរង្វង់ $=\frac{1}{2}$ មុំផ្ចិត។ មុំក្នុងកន្លះរង្វង់ $=90^{\circ}$។`,
              },
              {
                label: 'Chord length',
                labelKm: 'ប្រវែងអង្កត់ធ្នូ',
                text: 'The perpendicular from the centre bisects the chord, forming a right triangle.',
                textKm: 'បន្ទាត់កែងពីផ្ចិតទៅអង្កត់ធ្នូ ពុះអង្កត់ធ្នូជាពីរស្មើគ្នា ហើយបង្កើតបានត្រីកោណកែង។',
                math: String.raw`r^2=d^2+\left(\tfrac{c}{2}\right)^2`,
              },
              {
                label: 'Tangent',
                labelKm: 'បន្ទាត់ប៉ះ',
                text: String.raw`The tangent meets the radius at $90^{\circ}$; use the Pythagorean theorem.`,
                textKm: String.raw`បន្ទាត់ប៉ះកែងនឹងកាំត្រង់ចំណុចប៉ះ $90^{\circ}$ ប្រើទ្រឹស្តីបទពីតាគ័រ។`,
              },
            ],
          },
          {
            kind: 'step',
            text: 'Write one equation for the unknown and solve it.',
            textKm: 'សរសេរសមីការមួយសម្រាប់តម្លៃមិនស្គាល់ ហើយដោះស្រាយ។',
          },
          {
            kind: 'end',
            text: String.raw`Check: angles in a triangle sum to $180^{\circ}$; a chord is never longer than the diameter.`,
            textKm: String.raw`ផ្ទៀងផ្ទាត់៖ ផលបូកមុំក្នុងត្រីកោណ $180^{\circ}$ ហើយអង្កត់ធ្នូមិនដែលវែងជាងអង្កត់ផ្ចិតទេ។`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-chord-distance',
        title: 'Distance from the centre to a chord',
        titleKm: 'ចម្ងាយពីផ្ចិតទៅអង្កត់ធ្នូ',
        caption:
          'A circle of radius 10 centred at O(0, 0) has chord AB from A(−8, −6) to B(8, −6), length 16. The perpendicular from O meets AB at its midpoint M(0, −6), so the distance is OM = 6 because 6² + 8² = 10².',
        captionKm:
          'រង្វង់កាំ 10 ផ្ចិត O(0, 0) មានអង្កត់ធ្នូ AB ពី A(−8, −6) ទៅ B(8, −6) ប្រវែង 16។ បន្ទាត់កែងពី O ជួប AB ត្រង់ចំណុចកណ្តាល M(0, −6) ដូច្នេះចម្ងាយ OM = 6 ព្រោះ 6² + 8² = 10²។',
        xRange: [-12, 12],
        yRange: [-12, 12],
        xStep: 2,
        yStep: 2,
        parametric: [
          { x: (t) => 10 * Math.cos(t), y: (t) => 10 * Math.sin(t), t: [0, 2 * Math.PI], label: 'x² + y² = 100', color: 1 },
        ],
        lines: [
          { kind: 'segment', from: [-8, -6], to: [8, -6], color: 2 },
          { kind: 'segment', from: [0, 0], to: [0, -6], color: 3 },
          { kind: 'segment', from: [0, 0], to: [8, -6], color: 4 },
        ],
        points: [
          { x: 0, y: 0, label: 'O', anchor: 'ne', color: 1 },
          { x: -8, y: -6, label: 'A', anchor: 'sw' },
          { x: 8, y: -6, label: 'B', anchor: 'se' },
          { x: 0, y: -6, label: 'M', anchor: 's', color: 3 },
        ],
      },
    ],
  },

  'surface-area-and-volume': {
    flowcharts: [
      {
        id: 'g9-flow-solid-formulas',
        topicIds: ['surface-area-and-volume'],
        title: 'Find the volume or surface area of a solid',
        titleKm: 'រកមាឌ ឬផ្ទៃក្រឡាសរុបនៃតួរាង',
        summary: 'Identify the solid, collect the right measurements, and keep π exact until the end.',
        summaryKm: 'កំណត់ប្រភេទតួរាង ប្រមូលរង្វាស់ត្រឹមត្រូវ ហើយរក្សា π ជាតម្លៃពិតរហូតដល់ចុងក្រោយ។',
        nodes: [
          {
            kind: 'start',
            text: 'Halve a given diameter to get the radius, and put all lengths in one unit.',
            textKm: 'ចែកអង្កត់ផ្ចិតនឹងពីរ ដើម្បីបានកាំ ហើយប្តូរប្រវែងទាំងអស់ទៅខ្នាតតែមួយ។',
          },
          {
            kind: 'decision',
            text: 'Which solid is it?',
            textKm: 'តើជាតួរាងអ្វី?',
            branches: [
              {
                label: 'Cylinder',
                labelKm: 'ស៊ីឡាំង',
                text: String.raw`$V=\pi r^2h$, $S=2\pi r^2+2\pi rh$.`,
                textKm: String.raw`$V=\pi r^2h$, $S=2\pi r^2+2\pi rh$។`,
              },
              {
                label: 'Cone',
                labelKm: 'កោណ',
                text: String.raw`$V=\frac{1}{3}\pi r^2h$, $S=\pi r^2+\pi r\ell$. Find the slant height first: $\ell=\sqrt{r^2+h^2}$.`,
                textKm: String.raw`$V=\frac{1}{3}\pi r^2h$, $S=\pi r^2+\pi r\ell$។ រកកម្ពស់ទ្រេតជាមុន៖ $\ell=\sqrt{r^2+h^2}$។`,
              },
              {
                label: 'Sphere',
                labelKm: 'ស្វ៊ែរ',
                text: String.raw`$V=\frac{4}{3}\pi r^3$, $S=4\pi r^2$.`,
                textKm: String.raw`$V=\frac{4}{3}\pi r^3$, $S=4\pi r^2$។`,
              },
            ],
          },
          {
            kind: 'step',
            text: String.raw`Substitute and simplify, keeping $\pi$ as a symbol: $V=\pi(3)^2(10)=90\pi$ cm³.`,
            textKm: String.raw`ជំនួស ហើយសម្រួល ដោយរក្សា $\pi$ ជានិមិត្តសញ្ញា៖ $V=\pi(3)^2(10)=90\pi$ cm³។`,
          },
          {
            kind: 'step',
            text: String.raw`Approximate only at the end: $90\pi\approx 282.74$ cm³.`,
            textKm: String.raw`គណនាតម្លៃប្រហាក់ប្រហែលតែនៅចុងក្រោយ៖ $90\pi\approx 282.74$ cm³។`,
          },
          {
            kind: 'end',
            text: 'Label the units: square units for surface area, cubic units for volume.',
            textKm: 'សរសេរខ្នាត៖ ឯកតាការ៉េសម្រាប់ផ្ទៃក្រឡា និងឯកតាគូបសម្រាប់មាឌ។',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Coordinate geometry                                                */
  /* ------------------------------------------------------------------ */
  'cartesian-plane': {
    flowcharts: [
      {
        id: 'g9-flow-locate-point',
        topicIds: ['cartesian-plane'],
        title: 'Locate a point and name its quadrant',
        titleKm: 'កំណត់ទីតាំងចំណុច និងកាដ្រង់របស់វា',
        summary: 'Read the signs of the coordinates before plotting.',
        summaryKm: 'អានសញ្ញានៃកូអរដោនេ មុននឹងដៅចំណុច។',
        nodes: [
          {
            kind: 'start',
            text: String.raw`Read $(x,y)$: move $x$ units horizontally from the origin, then $y$ units vertically.`,
            textKm: String.raw`អាន $(x,y)$៖ ផ្លាស់ទីតាមទិសដេក $x$ ឯកតាពីគល់តម្រុយ រួចតាមទិសឈរ $y$ ឯកតា។`,
          },
          {
            kind: 'decision',
            text: 'Is either coordinate zero?',
            textKm: 'តើមានកូអរដោនេណាមួយស្មើសូន្យទេ?',
            branches: [
              {
                label: 'Both',
                labelKm: 'ទាំងពីរ',
                text: String.raw`The point is the origin $(0,0)$.`,
                textKm: String.raw`ចំណុចនោះគឺគល់តម្រុយ $(0,0)$។`,
              },
              {
                label: 'One',
                labelKm: 'មួយ',
                text: String.raw`$x=0$: on the $y$-axis. $y=0$: on the $x$-axis. It is in no quadrant.`,
                textKm: String.raw`$x=0$៖ នៅលើអ័ក្ស $y$។ $y=0$៖ នៅលើអ័ក្ស $x$។ វាមិនស្ថិតក្នុងកាដ្រង់ណាទេ។`,
              },
              {
                label: 'Neither',
                labelKm: 'គ្មាន',
                text: 'Use the signs to find the quadrant.',
                textKm: 'ប្រើសញ្ញា ដើម្បីរកកាដ្រង់។',
              },
            ],
          },
          {
            kind: 'decision',
            text: 'What are the signs?',
            textKm: 'តើសញ្ញាជាអ្វី?',
            branches: [
              { label: '(+, +)', text: 'Quadrant I', textKm: 'កាដ្រង់ទី I' },
              { label: '(−, +)', text: 'Quadrant II', textKm: 'កាដ្រង់ទី II' },
              { label: '(−, −)', text: 'Quadrant III', textKm: 'កាដ្រង់ទី III' },
              { label: '(+, −)', text: 'Quadrant IV', textKm: 'កាដ្រង់ទី IV' },
            ],
          },
          {
            kind: 'end',
            text: String.raw`Points sharing an $x$-coordinate lie on a vertical line $x=a$; sharing a $y$-coordinate, on a horizontal line $y=b$.`,
            textKm: String.raw`ចំណុចដែលមាន $x$ ដូចគ្នា នៅលើបន្ទាត់ឈរ $x=a$។ ចំណុចដែលមាន $y$ ដូចគ្នា នៅលើបន្ទាត់ដេក $y=b$។`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-quadrant-points',
        title: 'Points in the four quadrants',
        titleKm: 'ចំណុចក្នុងកាដ្រង់ទាំងបួន',
        caption:
          'A(3, 4) is in Quadrant I, B(−2, 5) in Quadrant II, C(−1, −6) in Quadrant III, and D(4, −2) in Quadrant IV. E(0, −3) lies on the y-axis, so it is in no quadrant.',
        captionKm:
          'A(3, 4) នៅកាដ្រង់ទី I, B(−2, 5) នៅកាដ្រង់ទី II, C(−1, −6) នៅកាដ្រង់ទី III និង D(4, −2) នៅកាដ្រង់ទី IV។ E(0, −3) នៅលើអ័ក្សអរដោនេ ដូច្នេះវាមិនស្ថិតក្នុងកាដ្រង់ណាទេ។',
        xRange: [-7, 7],
        yRange: [-7, 7],
        points: [
          { x: 3, y: 4, label: 'A', color: 1 },
          { x: -2, y: 5, label: 'B', anchor: 'nw', color: 1 },
          { x: -1, y: -6, label: 'C', anchor: 'sw', color: 1 },
          { x: 4, y: -2, label: 'D', anchor: 'se', color: 1 },
          { x: 0, y: -3, label: 'E', anchor: 'e', color: 2 },
        ],
      },
      {
        id: 'g9-graph-vertical-segment',
        title: 'A segment on a vertical line',
        titleKm: 'អង្កត់លើបន្ទាត់ឈរ',
        caption:
          'A(2, −1) and B(2, 4) share x = 2, so AB lies on the vertical line x = 2. Its length is the difference of the y-coordinates: 4 − (−1) = 5 units.',
        captionKm:
          'A(2, −1) និង B(2, 4) មាន x = 2 ដូចគ្នា ដូច្នេះ AB ស្ថិតលើបន្ទាត់ឈរ x = 2។ ប្រវែងរបស់វាគឺផលដកនៃ y៖ 4 − (−1) = 5 ឯកតា។',
        xRange: [-3, 6],
        yRange: [-3, 6],
        lines: [
          { kind: 'vertical', at: 2, label: 'x = 2', color: 4, dashed: true },
          { kind: 'segment', from: [2, -1], to: [2, 4], color: 1 },
        ],
        points: [
          { x: 2, y: -1, label: 'A', anchor: 'e' },
          { x: 2, y: 4, label: 'B', anchor: 'e' },
        ],
      },
    ],
  },

  'distance-midpoint-slope': {
    flowcharts: [
      {
        id: 'g9-flow-distance-midpoint-slope',
        topicIds: ['distance-midpoint-slope'],
        title: 'Distance, midpoint, or slope of a segment',
        titleKm: 'ចម្ងាយ ចំណុចកណ្តាល ឬមេគុណប្រាប់ទិសនៃអង្កត់',
        summary: 'Compute the two differences once, then reuse them.',
        summaryKm: 'គណនាផលដកទាំងពីរតែម្តង រួចប្រើវាឡើងវិញ។',
        nodes: [
          {
            kind: 'start',
            text: String.raw`Label the points $(x_1,y_1)$ and $(x_2,y_2)$.`,
            textKm: String.raw`ដាក់ឈ្មោះចំណុចជា $(x_1,y_1)$ និង $(x_2,y_2)$។`,
          },
          {
            kind: 'step',
            text: String.raw`Find the run $\Delta x=x_2-x_1$ and the rise $\Delta y=y_2-y_1$.`,
            textKm: String.raw`រកបម្រែបម្រួលដេក $\Delta x=x_2-x_1$ និងបម្រែបម្រួលឈរ $\Delta y=y_2-y_1$។`,
          },
          {
            kind: 'decision',
            text: 'What is asked?',
            textKm: 'តើចំណោទសួររកអ្វី?',
            branches: [
              {
                label: 'Distance',
                labelKm: 'ចម្ងាយ',
                text: 'Square, add, take the root, and simplify the radical.',
                textKm: 'លើកជាការ៉េ បូក ដកឫស ហើយសម្រួលរ៉ាឌីកាល់។',
                math: String.raw`d=\sqrt{(\Delta x)^2+(\Delta y)^2}`,
              },
              {
                label: 'Midpoint',
                labelKm: 'ចំណុចកណ្តាល',
                text: 'Average the x-coordinates and the y-coordinates separately.',
                textKm: 'រកមធ្យមនៃ x ហើយរកមធ្យមនៃ y ដោយឡែកពីគ្នា។',
                math: String.raw`M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)`,
              },
              {
                label: 'Slope',
                labelKm: 'មេគុណប្រាប់ទិស',
                text: String.raw`$m=\frac{\Delta y}{\Delta x}$. If $\Delta x=0$ the line is vertical and the slope is undefined.`,
                textKm: String.raw`$m=\frac{\Delta y}{\Delta x}$។ បើ $\Delta x=0$ បន្ទាត់ឈរ ហើយមេគុណប្រាប់ទិសមិនកំណត់។`,
              },
            ],
          },
          {
            kind: 'end',
            text: 'Check on a sketch: a rising segment has positive slope, and the midpoint lies between the points.',
            textKm: 'ផ្ទៀងផ្ទាត់លើគំនូរ៖ អង្កត់ឡើងមានមេគុណប្រាប់ទិសវិជ្ជមាន ហើយចំណុចកណ្តាលនៅចន្លោះចំណុចទាំងពីរ។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-distance-midpoint-slope',
        title: 'Rise, run, distance, and midpoint',
        titleKm: 'បម្រែបម្រួលឈរ បម្រែបម្រួលដេក ចម្ងាយ និងចំណុចកណ្តាល',
        caption:
          'For A(−2, 1) and B(4, 9), the run AC is 6 and the rise CB is 8. So AB = √(6² + 8²) = 10, the slope is 8/6 = 4/3, and the midpoint is M(1, 5).',
        captionKm:
          'ចំពោះ A(−2, 1) និង B(4, 9) បម្រែបម្រួលដេក AC គឺ 6 ហើយបម្រែបម្រួលឈរ CB គឺ 8។ ដូច្នេះ AB = √(6² + 8²) = 10 មេគុណប្រាប់ទិសគឺ 8/6 = 4/3 ហើយចំណុចកណ្តាលគឺ M(1, 5)។',
        xRange: [-4, 7],
        yRange: [-1, 11],
        lines: [
          { kind: 'segment', from: [-2, 1], to: [4, 9], color: 1 },
          { kind: 'segment', from: [-2, 1], to: [4, 1], label: 'run = 6', color: 4, dashed: true },
          { kind: 'segment', from: [4, 1], to: [4, 9], label: 'rise = 8', color: 2, dashed: true },
        ],
        points: [
          { x: -2, y: 1, label: 'A', anchor: 'nw', color: 1 },
          { x: 4, y: 9, label: 'B', anchor: 'nw', color: 1 },
          { x: 4, y: 1, label: 'C', anchor: 'se', color: 4 },
          { x: 1, y: 5, label: 'M', anchor: 'nw', color: 3 },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Statistics and probability                                         */
  /* ------------------------------------------------------------------ */
  'scatter-plots': {
    flowcharts: [
      {
        id: 'g9-flow-read-scatter-plot',
        topicIds: ['scatter-plots'],
        title: 'Describe a scatter plot and predict',
        titleKm: 'ពិពណ៌នាក្រាហ្វព្រិល និងព្យាករណ៍',
        summary: 'Describe the pattern, fit a line, and judge whether a prediction is safe.',
        summaryKm: 'ពិពណ៌នាលំនាំ គូសបន្ទាត់តម្រែតម្រង់ ហើយវាយតម្លៃថាការព្យាករណ៍គួរទុកចិត្តឬទេ។',
        nodes: [
          {
            kind: 'start',
            text: 'Plot each pair, with the explanatory variable on the horizontal axis.',
            textKm: 'ដៅគូនីមួយៗ ដោយដាក់អថេរពន្យល់នៅលើអ័ក្សដេក។',
          },
          {
            kind: 'decision',
            text: 'As x increases, what does y do?',
            textKm: 'នៅពេល x កើនឡើង តើ y ប្រែប្រួលដូចម្តេច?',
            branches: [
              { label: 'Rises', labelKm: 'កើន', text: 'Positive association.', textKm: 'ទំនាក់ទំនងវិជ្ជមាន។' },
              { label: 'Falls', labelKm: 'ថយ', text: 'Negative association.', textKm: 'ទំនាក់ទំនងអវិជ្ជមាន។' },
              { label: 'No pattern', labelKm: 'គ្មានលំនាំ', text: 'No association; do not fit a line.', textKm: 'គ្មានទំនាក់ទំនង កុំគូសបន្ទាត់។' },
            ],
          },
          {
            kind: 'step',
            text: 'Describe form and strength: linear or curved, tightly or loosely clustered. Note any outliers.',
            textKm: 'ពិពណ៌នារាង និងកម្លាំង៖ លីនេអ៊ែរ ឬកោង ប្រមូលផ្តុំជិត ឬរាយ។ កត់សម្គាល់តម្លៃខុសប្រក្រតី។',
          },
          {
            kind: 'step',
            text: 'Draw a line through the middle of the points; find its equation from two points on it.',
            textKm: 'គូសបន្ទាត់កាត់កណ្តាលចំណុច ហើយរកសមីការរបស់វាពីចំណុចពីរនៅលើវា។',
            math: String.raw`m=\frac{22-8}{5-1}=3.5,\qquad \hat{y}=3.5x+4.5`,
          },
          {
            kind: 'decision',
            text: 'Is the new x inside the range of the data?',
            textKm: 'តើតម្លៃ x ថ្មីស្ថិតក្នុងចន្លោះទិន្នន័យឬទេ?',
            branches: [
              {
                label: 'Inside',
                labelKm: 'ខាងក្នុង',
                text: 'Interpolation: the prediction is reasonable.',
                textKm: 'អាំងទែប៉ូឡាស្យុង៖ ការព្យាករណ៍សមហេតុផល។',
              },
              {
                label: 'Outside',
                labelKm: 'ខាងក្រៅ',
                text: 'Extrapolation: the trend may not continue; treat it with caution.',
                textKm: 'អិចស្ត្រាប៉ូឡាស្យុង៖ និន្នាការអាចមិនបន្ត ត្រូវប្រុងប្រយ័ត្ន។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Interpret the slope in context. Association alone does not prove causation.',
            textKm: 'បកស្រាយមេគុណប្រាប់ទិសតាមបរិបទ។ ទំនាក់ទំនងតែឯងមិនបញ្ជាក់ពីមូលហេតុទេ។',
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-scatter-fit',
        title: 'Temperature after 6 a.m.',
        titleKm: 'សីតុណ្ហភាពក្រោយម៉ោង 6 ព្រឹក',
        caption:
          'Five readings (1, 8), (2, 11), (3, 15), (4, 18), (5, 22) show a strong positive linear association. The line through (1, 8) and (5, 22) is ŷ = 3.5x + 4.5, which predicts P(6, 25.5): about 25.5 °C at x = 6, an extrapolation.',
        captionKm:
          'ការវាស់ប្រាំដង (1, 8), (2, 11), (3, 15), (4, 18), (5, 22) បង្ហាញទំនាក់ទំនងលីនេអ៊ែរវិជ្ជមានខ្លាំង។ បន្ទាត់កាត់តាម (1, 8) និង (5, 22) គឺ ŷ = 3.5x + 4.5 ដែលព្យាករណ៍ P(6, 25.5)៖ ប្រហែល 25.5 °C ត្រង់ x = 6 ជាអិចស្ត្រាប៉ូឡាស្យុង។',
        xRange: [0, 7],
        yRange: [0, 30],
        yStep: 5,
        xLabel: 'x (h)',
        yLabel: 'y (°C)',
        equalScale: false,
        curves: [{ fn: (x) => 3.5 * x + 4.5, label: 'ŷ = 3.5x + 4.5', color: 1 }],
        points: [
          { x: 1, y: 8, anchor: 'se', color: 2 },
          { x: 2, y: 11, showCoords: false, color: 2 },
          { x: 3, y: 15, showCoords: false, color: 2 },
          { x: 4, y: 18, showCoords: false, color: 2 },
          { x: 5, y: 22, anchor: 'se', color: 2 },
          { x: 6, y: 25.5, label: 'P', anchor: 'se', color: 3, open: true },
        ],
      },
    ],
  },

  'measures-of-spread': {
    flowcharts: [
      {
        id: 'g9-flow-five-number-summary',
        topicIds: ['measures-of-spread'],
        title: 'Five-number summary and outliers',
        titleKm: 'សេចក្តីសង្ខេបប្រាំចំនួន និងតម្លៃខុសប្រក្រតី',
        summary: 'Build the box plot numbers and apply the 1.5 × IQR rule.',
        summaryKm: 'រកចំនួនសម្រាប់ក្រាហ្វប្រអប់ ហើយអនុវត្តច្បាប់ 1.5 × IQR។',
        nodes: [
          {
            kind: 'start',
            text: String.raw`Sort the data and count the values $n$.`,
            textKm: String.raw`តម្រៀបទិន្នន័យ ហើយរាប់ចំនួនតម្លៃ $n$។`,
          },
          {
            kind: 'decision',
            text: String.raw`Is $n$ odd or even?`,
            textKm: String.raw`តើ $n$ ជាចំនួនសេស ឬគូ?`,
            branches: [
              {
                label: 'Odd',
                labelKm: 'សេស',
                text: 'The median is the middle value; leave it out of both halves.',
                textKm: 'មេដ្យានជាតម្លៃកណ្តាល មិនត្រូវដាក់វាចូលក្នុងពាក់កណ្តាលណាមួយទេ។',
              },
              {
                label: 'Even',
                labelKm: 'គូ',
                text: 'The median is the mean of the two middle values; split the data into equal halves.',
                textKm: 'មេដ្យានជាមធ្យមនៃតម្លៃកណ្តាលទាំងពីរ ហើយចែកទិន្នន័យជាពីរពាក់កណ្តាលស្មើគ្នា។',
              },
            ],
          },
          {
            kind: 'step',
            text: String.raw`$Q_1$ and $Q_3$ are the medians of the lower and upper halves.`,
            textKm: String.raw`$Q_1$ និង $Q_3$ ជាមេដ្យាននៃពាក់កណ្តាលខាងក្រោម និងខាងលើ។`,
            math: String.raw`\text{IQR}=Q_3-Q_1`,
          },
          {
            kind: 'step',
            text: 'Compute the fences.',
            textKm: 'គណនាព្រំដែនតម្លៃខុសប្រក្រតី។',
            math: String.raw`Q_1-1.5\,\text{IQR}\quad\text{and}\quad Q_3+1.5\,\text{IQR}`,
          },
          {
            kind: 'decision',
            text: 'Does any value lie outside a fence?',
            textKm: 'តើមានតម្លៃណានៅក្រៅព្រំដែនទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មាន',
                text: 'It is an outlier: plot it as a dot and end the whisker at the last value inside.',
                textKm: 'វាជាតម្លៃខុសប្រក្រតី៖ ដៅវាជាចំណុច ហើយបញ្ចប់សសរត្រឹមតម្លៃចុងក្រោយខាងក្នុង។',
              },
              {
                label: 'No',
                labelKm: 'គ្មាន',
                text: 'The whiskers run to the minimum and maximum.',
                textKm: 'សសរលាតដល់តម្លៃតូចបំផុត និងធំបំផុត។',
              },
            ],
          },
          {
            kind: 'end',
            text: 'Draw the box from $Q_1$ to $Q_3$ with a line at the median.',
            textKm: String.raw`គូសប្រអប់ពី $Q_1$ ដល់ $Q_3$ ហើយគូសបន្ទាត់មួយត្រង់មេដ្យាន។`,
          },
        ],
      },
    ],
    graphs: [
      {
        id: 'g9-graph-box-plot',
        title: 'Box plot of 12, 15, 18, 20, 22, 25, 28, 31',
        titleKm: 'ក្រាហ្វប្រអប់នៃ 12, 15, 18, 20, 22, 25, 28, 31',
        caption:
          'Five-number summary: minimum 12, Q₁ = 16.5, median 21, Q₃ = 26.5, maximum 31. IQR = 10 and the fences are 1.5 and 41.5, so there are no outliers. Only the horizontal scale carries meaning.',
        captionKm:
          'សេចក្តីសង្ខេបប្រាំចំនួន៖ តម្លៃតូចបំផុត 12, Q₁ = 16.5, មេដ្យាន 21, Q₃ = 26.5, តម្លៃធំបំផុត 31។ IQR = 10 ហើយព្រំដែនគឺ 1.5 និង 41.5 ដូច្នេះគ្មានតម្លៃខុសប្រក្រតីទេ។ មានតែអ័ក្សដេកប៉ុណ្ណោះដែលមានន័យ។',
        xRange: [10, 34],
        yRange: [0, 4],
        xStep: 2,
        yLabel: '',
        lines: [
          { kind: 'segment', from: [12, 2], to: [16.5, 2], color: 1 },
          { kind: 'segment', from: [26.5, 2], to: [31, 2], color: 1 },
          { kind: 'segment', from: [16.5, 1.4], to: [26.5, 1.4], color: 1 },
          { kind: 'segment', from: [16.5, 2.6], to: [26.5, 2.6], color: 1 },
          { kind: 'segment', from: [16.5, 1.4], to: [16.5, 2.6], color: 1 },
          { kind: 'segment', from: [26.5, 1.4], to: [26.5, 2.6], color: 1 },
          { kind: 'segment', from: [21, 1.4], to: [21, 2.6], color: 2 },
        ],
        points: [
          { x: 12, y: 2, label: '12', showCoords: false, anchor: 's', color: 1 },
          { x: 16.5, y: 2.6, label: 'Q₁ = 16.5', showCoords: false, anchor: 'n', color: 1 },
          { x: 21, y: 1.4, label: 'Q₂ = 21', showCoords: false, anchor: 's', color: 2 },
          { x: 26.5, y: 2.6, label: 'Q₃ = 26.5', showCoords: false, anchor: 'n', color: 1 },
          { x: 31, y: 2, label: '31', showCoords: false, anchor: 's', color: 1 },
        ],
      },
    ],
  },

  'probability-compound-and-two-way': {
    flowcharts: [
      {
        id: 'g9-flow-two-way-probability',
        topicIds: ['probability-compound-and-two-way'],
        title: 'Read a probability from a two-way table',
        titleKm: 'អានប្រូបាប៊ីលីតេពីតារាងពីរផ្នែក',
        summary: 'The wording decides which count goes on top and which total goes underneath.',
        summaryKm: 'ពាក្យក្នុងសំណួរកំណត់ថា ចំនួនណាដាក់ភាគយក ហើយចំនួនសរុបណាដាក់ភាគបែង។',
        nodes: [
          {
            kind: 'start',
            text: 'Complete the table, including row totals, column totals, and the grand total.',
            textKm: 'បំពេញតារាងឲ្យគ្រប់ រួមទាំងផលបូកជួរដេក ជួរឈរ និងផលបូកសរុប។',
          },
          {
            kind: 'decision',
            text: 'What does the question ask for?',
            textKm: 'តើសំណួរសួររកអ្វី?',
            branches: [
              {
                label: 'A and B',
                labelKm: 'A និង B',
                text: 'Joint: one cell divided by the grand total.',
                textKm: 'ប្រូបាប៊ីលីតេរួម៖ ចំនួនក្នុងក្រឡាមួយ ចែកនឹងផលបូកសរុប។',
              },
              {
                label: 'A alone',
                labelKm: 'តែ A',
                text: 'Marginal: a row or column total divided by the grand total.',
                textKm: 'ប្រូបាប៊ីលីតេរឹម៖ ផលបូកជួរដេក ឬជួរឈរ ចែកនឹងផលបូកសរុប។',
              },
              {
                label: 'A given B',
                labelKm: 'A ដោយដឹង B',
                text: 'Conditional: the A-and-B cell divided by the total for B only.',
                textKm: 'ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ៖ ក្រឡា A និង B ចែកនឹងផលបូកនៃ B តែប៉ុណ្ណោះ។',
                math: String.raw`P(A\mid B)=\frac{n(A\text{ and }B)}{n(B)}`,
              },
              {
                label: 'A or B',
                labelKm: 'A ឬ B',
                text: 'Add the two totals and subtract the overlap once.',
                textKm: 'បូកផលបូកទាំងពីរ ហើយដកផ្នែកត្រួតគ្នាម្តង។',
                math: String.raw`P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)`,
              },
            ],
          },
          {
            kind: 'decision',
            text: 'Asked about independence?',
            textKm: 'តើសួរអំពីភាពឯករាជ្យឬទេ?',
            branches: [
              {
                label: 'Yes',
                labelKm: 'មែន',
                text: String.raw`Compare $P(A\text{ and }B)$ with $P(A)\,P(B)$. Equal means independent.`,
                textKm: String.raw`ប្រៀបធៀប $P(A\text{ and }B)$ ជាមួយ $P(A)\,P(B)$។ បើស្មើគ្នា នោះឯករាជ្យ។`,
              },
              {
                label: 'No',
                labelKm: 'ទេ',
                text: 'Simplify the fraction.',
                textKm: 'សម្រួលប្រភាគ។',
              },
            ],
          },
          {
            kind: 'end',
            text: String.raw`Check that every probability lies in $[0,1]$.`,
            textKm: String.raw`ផ្ទៀងផ្ទាត់ថាប្រូបាប៊ីលីតេនីមួយៗស្ថិតក្នុង $[0,1]$។`,
          },
        ],
      },
    ],
  },
}
