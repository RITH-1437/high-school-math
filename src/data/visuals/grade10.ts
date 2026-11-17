import type { TopicVisuals } from './types'

/**
 * Flowcharts and exact graphs for Grade 10 topics, keyed by topic id.
 * Rendered in the topic page's "Visual guide" section.
 */
export const grade10Visuals: TopicVisuals = {
  'mathematical-logic': {
    flowcharts: [
      {
        id: 'flowchart-logic-truth-evaluation',
        title: 'Evaluating Compound Proposition Truth Value',
        titleKm: 'ការកំណត់តម្លៃភាពពិតនៃសំណើសមាស',
        summary:
          'Decision flowchart for evaluating logical operations (AND, OR, implication) using truth values 1 and 0.',
        summaryKm:
          'គំនូសតាងលំហូរសម្រាប់កំណត់តម្លៃភាពពិតនៃឈ្នាប់តក្កវិទ្យា (និង, ឬ, នាំឱ្យ) ដោយប្រើតម្លៃ ១ និង ០។',
        topicIds: ['mathematical-logic'],
        nodes: [
          {
            kind: 'start',
            text: 'Identify the primary logical connective in the compound statement.',
            textKm: 'កំណត់ឈ្នាប់តក្កវិទ្យាចម្បងនៅក្នុងសំណើសមាស។',
          },
          {
            kind: 'decision',
            text: 'Which connective links the propositions $p$ and $q$?',
            textKm: 'តើឈ្នាប់មួយណាភ្ជាប់សំណើ $p$ និង $q$?',
            branches: [
              {
                label: 'Conjunction (AND)',
                labelKm: 'ឈ្នាប់ និង (AND)',
                text: 'True ($1$) only if both $p=1$ and $q=1$. If either is $0$, the result is $0$.',
                textKm: 'ពិត ($1$) លុះត្រាតែ $p=1$ និង $q=1$ ទាំងពីរ។ បើមានមួយស្មើ $0$ លទ្ធផលគឺ $0$។',
                math: String.raw`p \land q`,
              },
              {
                label: 'Disjunction (OR)',
                labelKm: 'ឈ្នាប់ ឬ (OR)',
                text: 'True ($1$) if at least one is $1$. False ($0$) only when both $p=0$ and $q=0$.',
                textKm: 'ពិត ($1$) បើមានយ៉ាងហោចណាស់មួយស្មើ $1$។ មិនពិត ($0$) តែពេល $p=0$ និង $q=0$ ទាំងពីរ។',
                math: String.raw`p \lor q`,
              },
              {
                label: 'Implication (IF-THEN)',
                labelKm: 'ឈ្នាប់ នាំឱ្យ (IF-THEN)',
                text: 'False ($0$) only when $p=1$ and $q=0$. In all other cases, the result is $1$.',
                textKm: 'មិនពិត ($0$) តែពេល $p=1$ ហើយ $q=0$ ប៉ុណ្ណោះ។ ករណីផ្សេងទៀតទាំងអស់ លទ្ធផលគឺ $1$។',
                math: String.raw`p \Rightarrow q`,
              },
            ],
          },
          {
            kind: 'step',
            text: 'Substitute the input truth values ($1$ or $0$) and compute the result step-by-step.',
            textKm: 'ជំនួសតម្លៃភាពពិត ($1$ ឬ $0$) នៃសំណើនីមួយៗ រួចគណនាតាមលំដាប់លំដោយ។',
          },
          {
            kind: 'end',
            text: 'The compound statement evaluates definitively to either $1$ (True) or $0$ (False).',
            textKm: 'សំណើសមាសទទួលបានតម្លៃភាពពិតច្បាស់លាស់ គឺ $1$ (ពិត) ឬ $0$ (មិនពិត)។',
          },
        ],
      },
    ],
  },
  'quadratic-equations': {
    graphs: [
      {
        id: 'graph-quadratic-parabola-curve',
        title: 'Parabola Curve of y = x² − 2x − 3',
        titleKm: 'ក្រាហ្វប៉ារ៉ាបូល y = x² − 2x − 3',
        caption:
          'Plotted parabola y = x² - 2x - 3 showing vertex V(1, -4), axis of symmetry x = 1, and real roots at x = -1 and x = 3.',
        captionKm:
          'ក្រាហ្វប៉ារ៉ាបូល y = x² - 2x - 3 បង្ហាញកំពូល V(1, -4) អ័ក្សស៊ីមេទ្រី x = 1 និងឫសពិត x = -1 និង x = 3។',
        xRange: [-3, 5],
        yRange: [-5, 5],
        xStep: 1,
        yStep: 1,
        equalScale: true,
        curves: [
          {
            fn: (x) => x * x - 2 * x - 3,
            label: 'y = x² − 2x − 3',
            color: 1,
          },
        ],
        points: [
          { x: 1, y: -4, label: 'V', color: 2, showCoords: true },
          { x: -1, y: 0, label: 'x₁', color: 3, showCoords: true },
          { x: 3, y: 0, label: 'x₂', color: 3, showCoords: true },
          { x: 0, y: -3, label: 'y-int', color: 4, showCoords: true },
        ],
        lines: [
          { kind: 'vertical', at: 1, label: 'x = 1', dashed: true, color: 4 },
        ],
      },
    ],
  },
  'coordinate-geometry-of-lines': {
    graphs: [
      {
        id: 'graph-linear-perpendicular-lines',
        title: 'Perpendicular Lines and Slope Triangles',
        titleKm: 'បន្ទាត់កែងគ្នា និងត្រីកោណជម្រាល',
        caption:
          'Lines y = 0.5x + 1 and y = -2x + 1 intersecting perpendicularly at (0, 1) where m₁ · m₂ = -1.',
        captionKm:
          'បន្ទាត់ y = 0.5x + 1 និង y = -2x + 1 កាត់គ្នាកែងត្រង់ (0, 1) ដែល m₁ · m₂ = -1។',
        xRange: [-4, 4],
        yRange: [-3, 4],
        xStep: 1,
        yStep: 1,
        equalScale: true,
        curves: [
          {
            fn: (x) => 0.5 * x + 1,
            label: 'y = 0.5x + 1 (m = 0.5)',
            color: 1,
          },
          {
            fn: (x) => -2 * x + 1,
            label: 'y = -2x + 1 (m = -2)',
            color: 2,
            dashed: true,
          },
        ],
        points: [
          { x: 0, y: 1, label: 'P', color: 3, showCoords: true },
          { x: 2, y: 2, label: 'A', color: 1, showCoords: true },
          { x: -2, y: 0, label: 'B', color: 1, showCoords: true },
        ],
      },
    ],
  },
}
