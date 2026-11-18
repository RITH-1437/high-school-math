export type SprintTopic = 'limits' | 'derivatives' | 'integrals' | 'complex' | 'probability'

export interface SprintQuestion {
  id: string
  topic: SprintTopic
  topicLabel: { en: string; km: string }
  prompt: string
  options: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanation: { en: string; km: string }
}

export const BACII_SPRINT_TOPICS: { id: SprintTopic; labelEn: string; labelKm: string }[] = [
  { id: 'limits', labelEn: 'Limits', labelKm: 'លីមីត' },
  { id: 'derivatives', labelEn: 'Derivatives', labelKm: 'ដេរីវេ' },
  { id: 'integrals', labelEn: 'Integrals', labelKm: 'អាំងតេក្រាល' },
  { id: 'complex', labelEn: 'Complex Numbers', labelKm: 'ចំនួនកុំផ្លិច' },
  { id: 'probability', labelEn: 'Probability', labelKm: 'ប្រូបាប' },
]

export const BACII_SPRINT_QUESTIONS: SprintQuestion[] = [
  // --- LIMITS ---
  {
    id: 'lim-1',
    topic: 'limits',
    topicLabel: { en: 'Limits', km: 'លីមីត' },
    prompt: '\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}',
    options: ['0', '1', '3', '+\\infty'],
    correctIndex: 2,
    explanation: {
      en: '\\lim_{x \\to 0} \\frac{\\sin(ax)}{x} = a \\implies a = 3',
      km: 'រូបមន្តគ្រឹះ \\lim_{x \\to 0} \\frac{\\sin(ax)}{x} = a \\implies 3',
    },
  },
  {
    id: 'lim-2',
    topic: 'limits',
    topicLabel: { en: 'Limits', km: 'លីមីត' },
    prompt: '\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}',
    options: ['2', '4', '0', '8'],
    correctIndex: 1,
    explanation: {
      en: '\\frac{x^2 - 4}{x - 2} = x + 2 \\implies 2 + 2 = 4',
      km: 'សម្រួលកន្សោម \\frac{(x-2)(x+2)}{x-2} = x+2 \\implies 2+2=4',
    },
  },
  {
    id: 'lim-3',
    topic: 'limits',
    topicLabel: { en: 'Limits', km: 'លីមីត' },
    prompt: '\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2}',
    options: ['0', '1', '\\frac{1}{2}', '-\\frac{1}{2}'],
    correctIndex: 2,
    explanation: {
      en: '\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x^2} = \\frac{1}{2}',
      km: 'រូបមន្តស្តង់ដារ \\lim_{x \\to 0} \\frac{1-\\cos x}{x^2} = \\frac{1}{2}',
    },
  },
  {
    id: 'lim-4',
    topic: 'limits',
    topicLabel: { en: 'Limits', km: 'លីមីត' },
    prompt: '\\lim_{x \\to +\\infty} \\frac{3x^2 + 5x}{x^2 - 2}',
    options: ['3', '5', '0', '+\\infty'],
    correctIndex: 0,
    explanation: {
      en: 'Ratio of highest-degree coefficients: \\frac{3}{1} = 3',
      km: 'ផលធៀបមេគុណដឺក្រេខ្ពស់បំផុត \\frac{3x^2}{x^2} = 3',
    },
  },
  {
    id: 'lim-5',
    topic: 'limits',
    topicLabel: { en: 'Limits', km: 'លីមីត' },
    prompt: '\\lim_{x \\to 0} \\frac{e^{2x} - 1}{x}',
    options: ['1', '2', '0', 'e^2'],
    correctIndex: 1,
    explanation: {
      en: '\\lim_{x \\to 0} \\frac{e^{ax} - 1}{x} = a \\implies a = 2',
      km: 'រូបមន្ត \\lim_{x \\to 0} \\frac{e^{ax}-1}{x} = a \\implies 2',
    },
  },

  // --- DERIVATIVES ---
  {
    id: 'der-1',
    topic: 'derivatives',
    topicLabel: { en: 'Derivatives', km: 'ដេរីវេ' },
    prompt: 'f(x) = \\ln(3x + 1) \\implies f\'(x) = ?',
    options: ['\\frac{1}{3x+1}', '\\frac{3}{3x+1}', '3\\ln(3x+1)', '\\frac{1}{3}'],
    correctIndex: 1,
    explanation: {
      en: '(\\ln u)\' = \\frac{u\'}{u} = \\frac{3}{3x+1}',
      km: 'រូបមន្ត (\\ln u)\' = \\frac{u\'}{u} = \\frac{3}{3x+1}',
    },
  },
  {
    id: 'der-2',
    topic: 'derivatives',
    topicLabel: { en: 'Derivatives', km: 'ដេរីវេ' },
    prompt: 'f(x) = e^{-2x} \\implies f\'(x) = ?',
    options: ['-2e^{-2x}', '2e^{-2x}', '-e^{-2x}', 'e^{-2x}'],
    correctIndex: 0,
    explanation: {
      en: '(e^u)\' = u\' e^u = -2e^{-2x}',
      km: 'រូបមន្ត (e^u)\' = u\' e^u \\implies -2e^{-2x}',
    },
  },
  {
    id: 'der-3',
    topic: 'derivatives',
    topicLabel: { en: 'Derivatives', km: 'ដេរីវេ' },
    prompt: 'f(x) = \\sin(2x) \\implies f\'(x) = ?',
    options: ['\\cos(2x)', '2\\cos(2x)', '-2\\cos(2x)', '2\\sin(2x)'],
    correctIndex: 1,
    explanation: {
      en: '(\\sin u)\' = u\' \\cos u = 2\\cos(2x)',
      km: 'រូបមន្ត (\\sin u)\' = u\' \\cos u \\implies 2\\cos(2x)',
    },
  },
  {
    id: 'der-4',
    topic: 'derivatives',
    topicLabel: { en: 'Derivatives', km: 'ដេរីវេ' },
    prompt: 'f(x) = x^3 - 3x + 2 \\implies f\'(1) = ?',
    options: ['0', '3', '-3', '2'],
    correctIndex: 0,
    explanation: {
      en: 'f\'(x) = 3x^2 - 3 \\implies f\'(1) = 3(1) - 3 = 0',
      km: 'f\'(x) = 3x^2 - 3 \\implies f\'(1) = 3 - 3 = 0',
    },
  },
  {
    id: 'der-5',
    topic: 'derivatives',
    topicLabel: { en: 'Derivatives', km: 'ដេរីវេ' },
    prompt: 'f(x) = \\frac{1}{2x - 1} \\implies f\'(x) = ?',
    options: ['\\frac{2}{(2x-1)^2}', '-\\frac{2}{(2x-1)^2}', '-\\frac{1}{(2x-1)^2}', '\\frac{1}{2}'],
    correctIndex: 1,
    explanation: {
      en: '(\\frac{1}{u})\' = -\\frac{u\'}{u^2} = -\\frac{2}{(2x-1)^2}',
      km: 'រូបមន្ត (\\frac{1}{u})\' = -\\frac{u\'}{u^2} \\implies -\\frac{2}{(2x-1)^2}',
    },
  },

  // --- INTEGRALS ---
  {
    id: 'int-1',
    topic: 'integrals',
    topicLabel: { en: 'Integrals', km: 'អាំងតេក្រាល' },
    prompt: '\\int (2x + 3)\\,dx = ?',
    options: ['x^2 + 3x + C', '2x^2 + 3x + C', 'x^2 + C', '\\frac{x^2}{2} + 3x + C'],
    correctIndex: 0,
    explanation: {
      en: '\\int 2x\\,dx + \\int 3\\,dx = x^2 + 3x + C',
      km: 'អាំងតេក្រាលព្រីមីទីវ \\int 2x\\,dx + 3x = x^2 + 3x + C',
    },
  },
  {
    id: 'int-2',
    topic: 'integrals',
    topicLabel: { en: 'Integrals', km: 'អាំងតេក្រាល' },
    prompt: '\\int_0^1 e^{2x}\\,dx = ?',
    options: ['e^2 - 1', '\\frac{e^2 - 1}{2}', '\\frac{e^2}{2}', '2(e^2 - 1)'],
    correctIndex: 1,
    explanation: {
      en: '[\\frac{e^{2x}}{2}]_0^1 = \\frac{e^2 - 1}{2}',
      km: '[\\frac{e^{2x}}{2}]_0^1 = \\frac{e^2}{2} - \\frac{1}{2} = \\frac{e^2-1}{2}',
    },
  },
  {
    id: 'int-3',
    topic: 'integrals',
    topicLabel: { en: 'Integrals', km: 'អាំងតេក្រាល' },
    prompt: '\\int \\frac{1}{2x + 1}\\,dx = ?',
    options: ['\\frac{1}{2}\\ln|2x + 1| + C', '\\ln|2x + 1| + C', '2\\ln|2x + 1| + C', '-\\frac{1}{(2x+1)^2} + C'],
    correctIndex: 0,
    explanation: {
      en: '\\int \\frac{u\'}{u}\\,dx = \\frac{1}{2}\\ln|2x+1| + C',
      km: 'រូបមន្ត \\int \\frac{u\'}{u} = \\ln|u| \\implies \\frac{1}{2}\\ln|2x+1| + C',
    },
  },
  {
    id: 'int-4',
    topic: 'integrals',
    topicLabel: { en: 'Integrals', km: 'អាំងតេក្រាល' },
    prompt: '\\int \\cos(3x)\\,dx = ?',
    options: ['-\\frac{1}{3}\\sin(3x) + C', '3\\sin(3x) + C', '\\frac{1}{3}\\sin(3x) + C', '\\frac{1}{3}\\cos(3x) + C'],
    correctIndex: 2,
    explanation: {
      en: '\\int \\cos(ax)\\,dx = \\frac{1}{a}\\sin(ax) + C',
      km: 'រូបមន្ត \\int \\cos(ax)\\,dx = \\frac{1}{a}\\sin(ax) + C \\implies \\frac{1}{3}\\sin(3x) + C',
    },
  },
  {
    id: 'int-5',
    topic: 'integrals',
    topicLabel: { en: 'Integrals', km: 'អាំងតេក្រាល' },
    prompt: '\\int_1^2 \\frac{1}{x}\\,dx = ?',
    options: ['\\ln 2', '\\ln 3', '1', '\\frac{1}{2}'],
    correctIndex: 0,
    explanation: {
      en: '[\\ln|x|]_1^2 = \\ln 2 - \\ln 1 = \\ln 2',
      km: '[\\ln x]_1^2 = \\ln 2 - \\ln 1 = \\ln 2',
    },
  },

  // --- COMPLEX NUMBERS ---
  {
    id: 'cplx-1',
    topic: 'complex',
    topicLabel: { en: 'Complex Numbers', km: 'ចំនួនកុំផ្លិច' },
    prompt: 'z = 3 + 4i \\implies |z| = ?',
    options: ['7', '5', '25', '\\sqrt{7}'],
    correctIndex: 1,
    explanation: {
      en: '|z| = \\sqrt{a^2 + b^2} = \\sqrt{9 + 16} = 5',
      km: 'ម៉ូឌុល |z| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5',
    },
  },
  {
    id: 'cplx-2',
    topic: 'complex',
    topicLabel: { en: 'Complex Numbers', km: 'ចំនួនកុំផ្លិច' },
    prompt: '(1 + i)^2 = ?',
    options: ['2', '2i', '1 + 2i', '-2i'],
    correctIndex: 1,
    explanation: {
      en: '1 + 2i + i^2 = 1 + 2i - 1 = 2i',
      km: 'ពន្លាត (1+i)^2 = 1 + 2i - 1 = 2i',
    },
  },
  {
    id: 'cplx-3',
    topic: 'complex',
    topicLabel: { en: 'Complex Numbers', km: 'ចំនួនកុំផ្លិច' },
    prompt: 'z = 1 + i\\sqrt{3} \\implies \\operatorname{arg}(z) = ?',
    options: ['\\frac{\\pi}{6}', '\\frac{\\pi}{3}', '\\frac{\\pi}{4}', '\\frac{2\\pi}{3}'],
    correctIndex: 1,
    explanation: {
      en: '\\tan\\theta = \\frac{\\sqrt{3}}{1} \\implies \\theta = \\frac{\\pi}{3}',
      km: '\\cos\\theta = \\frac{1}{2}, \\sin\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = \\frac{\\pi}{3}',
    },
  },
  {
    id: 'cplx-4',
    topic: 'complex',
    topicLabel: { en: 'Complex Numbers', km: 'ចំនួនកុំផ្លិច' },
    prompt: 'i^{2026} = ?',
    options: ['-1', '1', 'i', '-i'],
    correctIndex: 0,
    explanation: {
      en: '2026 = 4 \\times 506 + 2 \\implies i^2 = -1',
      km: 'ព្រោះ 2026 \\equiv 2 \\pmod 4 \\implies i^2 = -1',
    },
  },
  {
    id: 'cplx-5',
    topic: 'complex',
    topicLabel: { en: 'Complex Numbers', km: 'ចំនួនកុំផ្លិច' },
    prompt: 'z = 2(\\cos\\frac{\\pi}{4} + i\\sin\\frac{\\pi}{4}) \\implies z^2 = ?',
    options: ['4', '4i', '2i', '-4i'],
    correctIndex: 1,
    explanation: {
      en: 'z^2 = 2^2(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}) = 4i',
      km: 'ទ្រឹស្តីបទដឺម័រ z^2 = 4(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}) = 4i',
    },
  },

  // --- PROBABILITY ---
  {
    id: 'prob-1',
    topic: 'probability',
    topicLabel: { en: 'Probability', km: 'ប្រូបាប' },
    prompt: 'C_5^2 = ?',
    options: ['20', '10', '5', '15'],
    correctIndex: 1,
    explanation: {
      en: 'C_5^2 = \\frac{5 \\times 4}{2 \\times 1} = 10',
      km: 'បន្ទំ C_n^k = \\frac{n!}{k!(n-k)!} \\implies C_5^2 = 10',
    },
  },
  {
    id: 'prob-2',
    topic: 'probability',
    topicLabel: { en: 'Probability', km: 'ប្រូបាប' },
    prompt: 'P_4^2 = ?',
    options: ['12', '6', '24', '8'],
    correctIndex: 0,
    explanation: {
      en: 'P_4^2 = 4 \\times 3 = 12',
      km: 'ចារឹក P_n^k = \\frac{n!}{(n-k)!} \\implies P_4^2 = 12',
    },
  },
  {
    id: 'prob-3',
    topic: 'probability',
    topicLabel: { en: 'Probability', km: 'ប្រូបាប' },
    prompt: 'P(\\text{2 Heads in 3 fair coin tosses}) = ?',
    options: ['\\frac{1}{2}', '\\frac{3}{8}', '\\frac{1}{4}', '\\frac{1}{8}'],
    correctIndex: 1,
    explanation: {
      en: 'P = \\frac{C_3^2}{2^3} = \\frac{3}{8}',
      km: 'លទ្ធផលស្រប C_3^2 = 3, លទ្ធផលអាច 2^3 = 8 \\implies \\frac{3}{8}',
    },
  },
  {
    id: 'prob-4',
    topic: 'probability',
    topicLabel: { en: 'Probability', km: 'ប្រូបាប' },
    prompt: '\\text{A bag has 3 red and 2 blue balls. } P(\\text{Red}) = ?',
    options: ['\\frac{3}{5}', '\\frac{2}{5}', '\\frac{1}{2}', '\\frac{3}{2}'],
    correctIndex: 0,
    explanation: {
      en: 'P = \\frac{3}{3 + 2} = \\frac{3}{5}',
      km: 'ប្រូបាប = \\frac{ចំនួនបាល់ក្រហម}{បាល់សរុប} = \\frac{3}{5}',
    },
  },
  {
    id: 'prob-5',
    topic: 'probability',
    topicLabel: { en: 'Probability', km: 'ប្រូបាប' },
    prompt: 'A \\cap B = \\emptyset \\implies P(A \\cup B) = ?',
    options: ['P(A) + P(B)', 'P(A) \\times P(B)', 'P(A) + P(B) - P(A \\cap B)', '1'],
    correctIndex: 0,
    explanation: {
      en: 'For mutually exclusive events, P(A \\cup B) = P(A) + P(B)',
      km: 'ព្រឹត្តិការណ៍មិនចុះសម្រុងគ្នា P(A \\cap B) = 0 \\implies P(A \\cup B) = P(A) + P(B)',
    },
  },
]
