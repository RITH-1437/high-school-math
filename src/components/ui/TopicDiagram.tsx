import type { Language } from '../../i18n/types'

interface TopicDiagramProps {
  topicId: string
  language: Language
}

export function hasTopicDiagram(topicId: string): boolean {
  return [
    'integers',
    'pythagorean-theorem',
    'quadratic-equations',
    'quadratic-equations-intro',
    'distance-midpoint-slope',
    'differentiation',
    'systems-of-linear-equations',
    'probability-intro',
    'probability-compound-events',
    'factorization-common-factors',
    'polynomial-factorization',
    'right-triangle-trigonometry',
    'unit-circle-trigonometry',
    'limits-and-continuity',
    'integration',
    'permutations-and-combinations',
    'probability-rules-and-counting',
    'normal-distribution',
    'statistics-variance-and-distributions',
    'sequences-and-series',
    'circle-theorems',
    'circle-geometry',
    'exponential-and-logarithmic-functions',
    'exponential-functions-intro',
    'cartesian-plane',
    'linear-functions',
    'coordinate-geometry-of-lines',
    'vectors-in-two-dimensions',
    'circles-in-coordinate-geometry',
  ].includes(topicId)
}

export function TopicDiagram({ topicId, language }: TopicDiagramProps) {
  const isKm = language === 'km'

  switch (topicId) {
    case 'integers':
      return <IntegersDiagram isKm={isKm} />
    case 'pythagorean-theorem':
      return <PythagorasDiagram isKm={isKm} />
    case 'quadratic-equations':
    case 'quadratic-equations-intro':
      return <QuadraticFlowchart isKm={isKm} />
    case 'distance-midpoint-slope':
      return <CoordinatePlaneDiagram isKm={isKm} />
    case 'differentiation':
      return <CalculusExtremaFlowchart isKm={isKm} />
    case 'systems-of-linear-equations':
      return <SystemsSolvingFlowchart isKm={isKm} />
    case 'probability-intro':
    case 'probability-compound-events':
      return <ProbabilityTreeDiagram isKm={isKm} />
    case 'factorization-common-factors':
    case 'polynomial-factorization':
      return <FactoringFlowchart isKm={isKm} />
    case 'right-triangle-trigonometry':
      return <RightTriangleTrigDiagram isKm={isKm} />
    case 'unit-circle-trigonometry':
      return <UnitCircleDiagram isKm={isKm} />
    case 'limits-and-continuity':
      return <LimitsFlowchart isKm={isKm} />
    case 'integration':
      return <IntegrationFlowchart isKm={isKm} />
    case 'permutations-and-combinations':
    case 'probability-rules-and-counting':
      return <PermutationsCombinationsFlowchart isKm={isKm} />
    case 'normal-distribution':
    case 'statistics-variance-and-distributions':
      return <NormalDistributionDiagram isKm={isKm} />
    case 'sequences-and-series':
      return <SequencesSeriesFlowchart isKm={isKm} />
    case 'circle-theorems':
    case 'circle-geometry':
      return <CircleTheoremsDiagram isKm={isKm} />
    case 'exponential-and-logarithmic-functions':
    case 'exponential-functions-intro':
      return <ExponentsLogarithmsFlowchart isKm={isKm} />
    case 'cartesian-plane':
      return <CartesianPlaneExplorerDiagram isKm={isKm} />
    case 'linear-functions':
    case 'coordinate-geometry-of-lines':
      return <LinearFunctionsGraphDiagram isKm={isKm} />
    case 'vectors-in-two-dimensions':
      return <Vector2DCoordinateDiagram isKm={isKm} />
    case 'circles-in-coordinate-geometry':
      return <CircleCoordinateDiagram isKm={isKm} />
    default:
      return null
  }
}

/* -------------------------------------------------------------------------
   1. Integers: Number Line + Distance |a - b| + Sign Operations Flowchart
   ------------------------------------------------------------------------- */
function IntegersDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'បន្ទាត់ចំនួន និងចម្ងាយ |a - b| (Number Line & Distance)'
            : 'Number Line & Distance |a - b|'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ចម្ងាយរវាងចំនួនពីរ a និង b លើបន្ទាត់ចំនួនគឺ |a - b| = |b - a| ≥ 0 ជានិច្ច។'
            : 'The distance between any two integers a and b on the number line is |a - b| ≥ 0.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 170"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមបន្ទាត់ចំនួន និងចម្ងាយ' : 'Number line and distance diagram'}
        >
          <defs>
            <marker id="arrow-both" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#2457A7" />
            </marker>
            <marker id="arrow-left" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#64748B" />
            </marker>
            <marker id="arrow-right" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#64748B" />
            </marker>
          </defs>

          {/* Background grid / axis */}
          <rect x="10" y="10" width="740" height="150" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Region labels */}
          <rect x="40" y="24" width="280" height="26" rx="5" fill="#FDF2F3" stroke="#F87171" strokeWidth="0.8" />
          <text x="180" y="42" textAnchor="middle" fill="#C83B45" fontSize="12" fontWeight="600">
            {isKm ? '← ចំនួនអវិជ្ជមាន Negative (< 0)' : '← Negative Integers (< 0)'}
          </text>

          <rect x="440" y="24" width="280" height="26" rx="5" fill="#EAF2FF" stroke="#93C5FD" strokeWidth="0.8" />
          <text x="580" y="42" textAnchor="middle" fill="#2457A7" fontSize="12" fontWeight="600">
            {isKm ? 'ចំនួនវិជ្ជមាន Positive (> 0) →' : 'Positive Integers (> 0) →'}
          </text>

          {/* Main Axis Line */}
          <line
            x1="45"
            y1="95"
            x2="715"
            y2="95"
            stroke="#17263D"
            strokeWidth="2.5"
            markerStart="url(#arrow-left)"
            markerEnd="url(#arrow-right)"
          />

          {/* Ticks and integer labels (-6 to +6) */}
          {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((num) => {
            const x = 380 + num * 52
            const isZero = num === 0
            const isA = num === -2
            const isB = num === 4
            return (
              <g key={num}>
                <line
                  x1={x}
                  y1={isZero ? 80 : 87}
                  x2={x}
                  y2={isZero ? 110 : 103}
                  stroke={isZero ? '#D6A84B' : isA || isB ? '#2457A7' : '#94A3B8'}
                  strokeWidth={isZero ? 3 : isA || isB ? 2.5 : 1.5}
                />
                <text
                  x={x}
                  y={124}
                  textAnchor="middle"
                  fontSize={isZero ? 14 : 12}
                  fontWeight={isZero || isA || isB ? '700' : '500'}
                  fill={isZero ? '#B45309' : isA || isB ? '#102A56' : '#64748B'}
                >
                  {num}
                </text>
              </g>
            )
          })}

          {/* Distance Bracket between -2 and 4 */}
          {/* Point A at -2 (x=276), Point B at 4 (x=588) */}
          <circle cx="276" cy="95" r="5.5" fill="#C83B45" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="276" y="80" textAnchor="middle" fill="#C83B45" fontSize="11" fontWeight="700">
            a = -2
          </text>

          <circle cx="588" cy="95" r="5.5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="588" y="80" textAnchor="middle" fill="#2457A7" fontSize="11" fontWeight="700">
            b = 4
          </text>

          {/* Dimension Arc / Line */}
          <path
            d="M 276 66 L 432 66 L 588 66"
            fill="none"
            stroke="#2457A7"
            strokeWidth="1.8"
            strokeDasharray="4 2"
          />
          <line x1="276" y1="60" x2="276" y2="72" stroke="#2457A7" strokeWidth="1.8" />
          <line x1="588" y1="60" x2="588" y2="72" stroke="#2457A7" strokeWidth="1.8" />

          {/* Distance label pill */}
          <rect x="350" y="53" width="164" height="26" rx="13" fill="#2457A7" />
          <text x="432" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
            |a - b| = |-2 - 4| = 6
          </text>
        </svg>
      </div>

      {/* Integer Arithmetic Decision Steps */}
      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? '១. ផលបូក និងផលដក' : '1. Addition & Subtraction'}
          </div>
          <p className="flowchart-step-rule">
            {isKm
              ? 'សញ្ញាដូចគ្នា៖ បូកតម្លៃដាច់ខាត រក្សាសញ្ញារួម។'
              : 'Same signs: Add magnitudes, keep common sign.'}
          </p>
          <code className="flowchart-step-code">(-3) + (-5) = -8</code>
          <p className="flowchart-step-rule" style={{ marginTop: '0.4rem' }}>
            {isKm
              ? 'សញ្ញាខុសគ្នា៖ ដកតម្លៃតូចពីធំ យកសញ្ញាតាមចំនួនធំជាង។'
              : 'Different signs: Subtract magnitudes, take larger sign.'}
          </p>
          <code className="flowchart-step-code">(-7) + 10 = +3</code>
        </div>

        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? '២. ផលគុណ និងផលចែក' : '2. Multiplication & Division'}
          </div>
          <div className="flowchart-sign-table">
            <div><span className="badge-sign badge-sign--pos">(+) × (+) = (+)</span></div>
            <div><span className="badge-sign badge-sign--pos">(-) × (-) = (+)</span></div>
            <div><span className="badge-sign badge-sign--neg">(+) × (-) = (-)</span></div>
            <div><span className="badge-sign badge-sign--neg">(-) × (+) = (-)</span></div>
          </div>
          <code className="flowchart-step-code">(-4) × (-6) = +24 | (-20) ÷ 5 = -4</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   2. Pythagorean Theorem & Triangle Classification Flowchart
   ------------------------------------------------------------------------- */
function PythagorasDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'ទ្រឹស្តីបទពីតាករ និងការបែងចែកប្រភេទត្រីកោណ (Pythagorean Theorem & Classification)'
            : 'Pythagorean Theorem & Triangle Classification'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ក្នុងត្រីកោណកែង៖ a² + b² = c² (c = អ៊ីប៉ូតេនុស)។ យើងប្រើផលបូកការ៉េនេះ ដើម្បីកំណត់ថាតើត្រីកោណជាមុំកែង មុំស្រួច ឬមុំទាល។'
            : 'In a right triangle: a² + b² = c² (c = hypotenuse). Compare a² + b² with c² to classify any triangle.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 270"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមទ្រឹស្តីបទពីតាករ' : 'Pythagorean theorem geometric diagram'}
        >
          {/* Card background */}
          <rect x="10" y="10" width="740" height="250" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Geometric visual of 3-4-5 right triangle */}
          <g transform="translate(40, 25)">
            {/* Right triangle: vertices at (70, 160), (190, 160), (70, 70) */}
            {/* leg a = 90px (3 units), leg b = 120px (4 units), hyp c = 150px (5 units) */}
            <polygon
              points="70,160 190,160 70,70"
              fill="#EAF2FF"
              stroke="#2457A7"
              strokeWidth="2.5"
            />
            {/* Right angle symbol at (70, 160) */}
            <path d="M 70 144 L 86 144 L 86 160" fill="none" stroke="#2457A7" strokeWidth="1.8" />

            {/* Square on leg a (vertical: width 50 to the left) */}
            <rect x="20" y="70" width="50" height="90" fill="#FDF2F3" stroke="#C83B45" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="45" y="120" textAnchor="middle" fill="#C83B45" fontSize="11" fontWeight="700">a²</text>

            {/* Square on leg b (horizontal: height 50 below) */}
            <rect x="70" y="160" width="120" height="50" fill="#FDF8EE" stroke="#D6A84B" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="130" y="190" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">b²</text>

            {/* Labels on sides */}
            <text x="58" y="118" textAnchor="end" fill="#C83B45" fontSize="13" fontWeight="700">a</text>
            <text x="130" y="152" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="700">b</text>
            <text x="142" y="108" textAnchor="start" fill="#2457A7" fontSize="14" fontWeight="700">c (hypotenuse)</text>

            <rect x="25" y="218" width="200" height="24" rx="4" fill="#2457A7" />
            <text x="125" y="234" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              a² + b² = c²
            </text>
          </g>

          {/* Right panel: Classification Decision Flowchart */}
          <g transform="translate(300, 25)">
            {/* Start block */}
            <rect x="80" y="10" width="280" height="34" rx="8" fill="#102A56" stroke="#102A56" />
            <text x="220" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
              {isKm ? 'តម្រៀបជ្រុង៖ a ≤ b ≤ c (និង a + b > c)' : 'Order sides: a ≤ b ≤ c (and a + b > c)'}
            </text>

            {/* Arrow down */}
            <line x1="220" y1="44" x2="220" y2="64" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrow-both)" />

            {/* Compare block */}
            <rect x="110" y="66" width="220" height="34" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
            <text x="220" y="88" textAnchor="middle" fill="#102A56" fontSize="13" fontWeight="700">
              {isKm ? 'ប្រៀបធៀប a² + b² ជាមួយ c²' : 'Compare a² + b² with c²'}
            </text>

            {/* 3 branches: Left (<), Middle (=), Right (>) */}
            {/* Branch lines */}
            <path d="M 220 100 L 220 120" stroke="#64748B" strokeWidth="1.8" />
            <path d="M 50 120 L 390 120" stroke="#64748B" strokeWidth="1.8" />
            <line x1="50" y1="120" x2="50" y2="135" stroke="#64748B" strokeWidth="1.8" />
            <line x1="220" y1="120" x2="220" y2="135" stroke="#64748B" strokeWidth="1.8" />
            <line x1="390" y1="120" x2="390" y2="135" stroke="#64748B" strokeWidth="1.8" />

            {/* Left Result: Acute */}
            <rect x="0" y="138" width="115" height="74" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.2" />
            <text x="57" y="158" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">a² + b² &gt; c²</text>
            <text x="57" y="180" textAnchor="middle" fill="#065F46" fontSize="12" fontWeight="750">
              {isKm ? 'ត្រីកោណមុំស្រួច' : 'Acute'}
            </text>
            <text x="57" y="198" textAnchor="middle" fill="#047857" fontSize="10">
              {isKm ? 'គ្រប់មុំ < 90°' : 'All angles < 90°'}
            </text>

            {/* Middle Result: Right */}
            <rect x="155" y="138" width="130" height="74" rx="6" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
            <text x="220" y="158" textAnchor="middle" fill="#2457A7" fontSize="12" fontWeight="700">a² + b² = c²</text>
            <text x="220" y="180" textAnchor="middle" fill="#102A56" fontSize="13" fontWeight="800">
              {isKm ? 'ត្រីកោណកែង' : 'Right Triangle'}
            </text>
            <text x="220" y="198" textAnchor="middle" fill="#2457A7" fontSize="10" fontWeight="600">
              {isKm ? 'មុំមួយ = 90°' : 'One angle = 90°'}
            </text>

            {/* Right Result: Obtuse */}
            <rect x="325" y="138" width="115" height="74" rx="6" fill="#FDF2F3" stroke="#F87171" strokeWidth="1.2" />
            <text x="382" y="158" textAnchor="middle" fill="#C83B45" fontSize="11" fontWeight="700">a² + b² &lt; c²</text>
            <text x="382" y="180" textAnchor="middle" fill="#991B1B" fontSize="12" fontWeight="750">
              {isKm ? 'ត្រីកោណមុំទាល' : 'Obtuse'}
            </text>
            <text x="382" y="198" textAnchor="middle" fill="#C83B45" fontSize="10">
              {isKm ? 'មុំមួយ > 90°' : 'One angle > 90°'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   3. Quadratic Equations Solving Flowchart (Discriminant Δ)
   ------------------------------------------------------------------------- */
function QuadraticFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញ និងក្រាហ្វប៉ារ៉ាបូលនៃសមីការដឺក្រេទីពីរ'
            : 'Quadratic Equations Solving Strategy & Real Parabola Graph'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ទម្រង់ស្តង់ដារ ax² + bx + c = 0 (a ≠ 0)។ ឌីស្គ្រីមីណង់ Δ = b² - 4ac កំណត់ចំនួនចំណុចប្រសព្វនៃក្រាហ្វប៉ារ៉ាបូលជាមួយអ័ក្ស x។'
            : 'Standard form: ax² + bx + c = 0 (a ≠ 0). The discriminant Δ = b² - 4ac determines the number of real x-intercepts of the parabola.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 520"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញនិងក្រាហ្វសមីការដឺក្រេទីពីរ' : 'Quadratic formula decision flowchart and real parabola graph'}
        >
          {/* Section 1: Flowchart Background */}
          <rect x="10" y="10" width="740" height="270" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Node 1: Start */}
          <rect x="230" y="20" width="300" height="36" rx="6" fill="#102A56" />
          <text x="380" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="750">
            ax² + bx + c = 0 &nbsp;(a ≠ 0)
          </text>

          <line x1="380" y1="56" x2="380" y2="76" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrow-both)" />

          {/* Node 2: Discriminant */}
          <rect x="180" y="76" width="400" height="34" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="98" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="700">
            {isKm ? 'គណនាឌីស្គ្រីមីណង់ ៖  Δ = b² - 4ac' : 'Compute Discriminant:  Δ = b² - 4ac'}
          </text>

          {/* Split 3 branches */}
          <line x1="380" y1="110" x2="380" y2="130" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 130 130 L 630 130" stroke="#64748B" strokeWidth="1.8" />
          <line x1="130" y1="130" x2="130" y2="148" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="380" y1="130" x2="380" y2="148" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="630" y1="130" x2="630" y2="148" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />

          {/* Branch 1: Δ > 0 */}
          <rect x="35" y="150" width="190" height="115" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <rect x="80" y="158" width="100" height="20" rx="10" fill="#10B981" />
          <text x="130" y="172" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">Δ &gt; 0</text>
          <text x="130" y="196" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="750">
            {isKm ? 'ឫសពីរផ្សេងគ្នា' : 'Two Distinct Real Roots'}
          </text>
          <text x="130" y="214" textAnchor="middle" fill="#047857" fontSize="10">
            {isKm ? 'កាត់អ័ក្ស x ត្រង់ពីរចំណុច' : 'Crosses x-axis twice'}
          </text>
          <rect x="50" y="226" width="160" height="24" rx="4" fill="#FFFFFF" stroke="#10B981" />
          <text x="130" y="242" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="700">
            x = (-b ± √Δ) / (2a)
          </text>

          {/* Branch 2: Δ = 0 */}
          <rect x="285" y="150" width="190" height="115" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <rect x="330" y="158" width="100" height="20" rx="10" fill="#D6A84B" />
          <text x="380" y="172" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">Δ = 0</text>
          <text x="380" y="196" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="750">
            {isKm ? 'ឫសឌុបមួយ' : 'One Repeated Root'}
          </text>
          <text x="380" y="214" textAnchor="middle" fill="#B45309" fontSize="10">
            {isKm ? 'ប៉ះអ័ក្ស x ត្រង់កំពូល' : 'Touches x-axis at vertex'}
          </text>
          <rect x="300" y="226" width="160" height="24" rx="4" fill="#FFFFFF" stroke="#D6A84B" />
          <text x="380" y="242" textAnchor="middle" fill="#B45309" fontSize="10" fontWeight="700">
            x = -b / (2a)
          </text>

          {/* Branch 3: Δ < 0 */}
          <rect x="535" y="150" width="190" height="115" rx="8" fill="#FDF2F3" stroke="#F87171" strokeWidth="1.5" />
          <rect x="580" y="158" width="100" height="20" rx="10" fill="#C83B45" />
          <text x="630" y="172" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">Δ &lt; 0</text>
          <text x="630" y="196" textAnchor="middle" fill="#991B1B" fontSize="11" fontWeight="750">
            {isKm ? 'គ្មានឫសពិត (ឫសកុំផ្លិច)' : 'No Real Roots (Complex)'}
          </text>
          <text x="630" y="214" textAnchor="middle" fill="#C83B45" fontSize="10">
            {isKm ? 'មិនកាត់អ័ក្ស x ទេ' : 'Does not cross x-axis'}
          </text>
          <rect x="550" y="226" width="160" height="24" rx="4" fill="#FFFFFF" stroke="#F87171" />
          <text x="630" y="242" textAnchor="middle" fill="#C83B45" fontSize="10" fontWeight="700">
            x = (-b ± i√|Δ|) / (2a)
          </text>

          {/* Section 2: Real Parabola Coordinate Graph y = x² - 2x - 3 */}
          <g transform="translate(10, 290)">
            <rect x="0" y="0" width="740" height="220" rx="10" fill="var(--surface)" stroke="var(--line)" />

            {/* Left coordinate graph */}
            {/* Origin O(0, 0) at canvas (170, 140). Scale: 1 unit x = 24px, 1 unit y = 14px */}
            <g transform="translate(20, 15)">
              <rect x="0" y="0" width="340" height="190" rx="6" fill="var(--surface-sunken)" stroke="var(--line)" />

              {/* Grid lines */}
              {[-3, -2, -1, 0, 1, 2, 3, 4, 5].map((ux) => {
                const cx = 120 + ux * 26
                return (
                  <line key={`pgx-${ux}`} x1={cx} y1="0" x2={cx} y2="190" stroke="var(--line)" strokeWidth="0.8" opacity="0.6" />
                )
              })}
              {[-4, -3, -2, -1, 0, 1, 2].map((uy) => {
                const cy = 110 - uy * 16
                return (
                  <line key={`pgy-${uy}`} x1="0" y1={cy} x2="340" y2={cy} stroke="var(--line)" strokeWidth="0.8" opacity="0.6" />
                )
              })}

              {/* Axes */}
              <line x1="10" y1="110" x2="330" y2="110" stroke="#17263D" strokeWidth="2" />
              <line x1="120" y1="185" x2="120" y2="10" stroke="#17263D" strokeWidth="2" />
              <text x="334" y="114" fill="#17263D" fontSize="10" fontWeight="800">x</text>
              <text x="120" y="8" textAnchor="middle" fill="#17263D" fontSize="10" fontWeight="800">y</text>

              {/* Axis Ticks */}
              {[-2, -1, 1, 2, 3, 4].map((n) => (
                <g key={`ptx-${n}`}>
                  <line x1={120 + n * 26} y1="107" x2={120 + n * 26} y2="113" stroke="#17263D" strokeWidth="1" />
                  <text x={120 + n * 26} y="123" textAnchor="middle" fill="#64748B" fontSize="8">
                    {n}
                  </text>
                </g>
              ))}

              {/* Axis of Symmetry: x = 1 (dashed gold) */}
              <line x1="146" y1="15" x2="146" y2="185" stroke="#D6A84B" strokeWidth="1.8" strokeDasharray="3 2" />
              <rect x="150" y="20" width="70" height="16" rx="3" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="0.8" />
              <text x="185" y="32" textAnchor="middle" fill="#B45309" fontSize="8" fontWeight="700">Axis: x = 1</text>

              {/* Parabola Curve y = x² - 2x - 3 */}
              {/* Points: (-2, 5)->(68, 30), (-1, 0)->(94, 110), (0, -3)->(120, 158), (1, -4)->(146, 174), (2, -3)->(172, 158), (3, 0)->(198, 110), (4, 5)->(224, 30) */}
              <path
                d="M 68 30 Q 146 318 224 30"
                fill="none"
                stroke="#2457A7"
                strokeWidth="2.8"
              />

              {/* Vertex V(1, -4) */}
              <circle cx="146" cy="174" r="6" fill="rgba(200, 59, 69, 0.25)" />
              <circle cx="146" cy="174" r="3.5" fill="#C83B45" />
              <rect x="154" y="166" width="60" height="16" rx="3" fill="#C83B45" />
              <text x="184" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="750">V(1, -4)</text>

              {/* Roots x₁ = -1 and x₂ = 3 */}
              <circle cx="94" cy="110" r="4" fill="#10B981" />
              <rect x="52" y="94" width="46" height="15" rx="3" fill="#10B981" />
              <text x="75" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="750">x₁ = -1</text>

              <circle cx="198" cy="110" r="4" fill="#10B981" />
              <rect x="202" y="94" width="42" height="15" rx="3" fill="#10B981" />
              <text x="223" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="750">x₂ = 3</text>

              {/* y-intercept (0, -3) */}
              <circle cx="120" cy="158" r="3.5" fill="#2457A7" />
              <text x="114" y="162" textAnchor="end" fill="#2457A7" fontSize="8" fontWeight="700">(0, -3)</text>
            </g>

            {/* Right explanation of the real graph */}
            <g transform="translate(390, 20)">
              <rect x="0" y="0" width="330" height="180" rx="8" fill="var(--surface-sunken)" stroke="var(--line)" />
              <text x="16" y="24" fill="#102A56" fontSize="12" fontWeight="800">
                {isKm ? 'ក្រាហ្វប៉ារ៉ាបូលជាក់ស្តែង ៖ y = x² - 2x - 3' : 'Real Parabola Example: y = x² - 2x - 3'}
              </text>
              <text x="16" y="48" fill="#2457A7" fontSize="11" fontWeight="700">
                a = 1, b = -2, c = -3 ⟹ Δ = (-2)² - 4(1)(-3) = 16 &gt; 0
              </text>
              <text x="16" y="70" fill="#047857" fontSize="11" fontWeight="750">
                {isKm ? '• ឫសពិតពីរ (x-intercepts) ៖ x₁ = -1 និង x₂ = 3' : '• 2 Real Roots (x-intercepts): x₁ = -1 and x₂ = 3'}
              </text>
              <text x="16" y="92" fill="#C83B45" fontSize="11" fontWeight="750">
                {isKm ? '• កំពូល (Vertex V) ៖ h = -b/(2a) = 1, k = -4 ⟹ V(1, -4)' : '• Vertex V(h, k): h = -b/(2a) = 1, k = -4 ⟹ V(1, -4)'}
              </text>
              <text x="16" y="114" fill="#B45309" fontSize="11" fontWeight="750">
                {isKm ? '• អ័ក្សស៊ីមេទ្រី ៖ បន្ទាត់ឈរ x = 1' : '• Axis of Symmetry: vertical line x = 1'}
              </text>
              <text x="16" y="136" fill="#102A56" fontSize="11" fontWeight="750">
                {isKm ? '• កាត់អ័ក្ស y ត្រង់ចំណុច ៖ (0, c) = (0, -3)' : '• y-intercept at (0, c) = (0, -3)'}
              </text>
              <text x="16" y="158" fill="#64748B" fontSize="10">
                {isKm ? 'a = 1 &gt; 0 ⟹ ប៉ារ៉ាបូលបែរមាត់ឡើងលើ (∪ មានតម្លៃអប្បបរមា)' : 'a = 1 &gt; 0 ⟹ Parabola opens upward (∪ with minimum at vertex)'}
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}


function CoordinatePlaneDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'ធរណីមាត្រកូអរដោនេ៖ ចម្ងាយ ចំណុចកណ្តាល និងមេគុណប្រាប់ទិស'
            : 'Coordinate Geometry: Distance, Midpoint & Slope'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ភ្ជាប់ពីរចំណុច A(x₁, y₁) និង B(x₂, y₂)៖ បង្កើតត្រីកោណកែងដើម្បីទាញរករូបមន្តទាំងបី។'
            : 'Between two points A(x₁, y₁) and B(x₂, y₂): the right triangle provides distance, midpoint and slope.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 270"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមកូអរដោនេចម្ងាយ និងជម្រាល' : 'Cartesian distance midpoint and slope diagram'}
        >
          <rect x="10" y="10" width="740" height="250" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Realistic Cartesian Coordinate Graph */}
          {/* Origin O(0, 0) at canvas (50, 205). Scale 1 unit = 36px */}
          <g transform="translate(25, 20)">
            <rect x="10" y="10" width="310" height="215" rx="8" fill="var(--surface)" stroke="var(--line)" />

            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line
                key={`v-${i}`}
                x1={50 + i * 36}
                y1="10"
                x2={50 + i * 36}
                y2="225"
                stroke="var(--line)"
                strokeWidth="0.8"
                opacity={0.6}
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`h-${i}`}
                x1="10"
                y1={205 - i * 36}
                x2="320"
                y2={205 - i * 36}
                stroke="var(--line)"
                strokeWidth="0.8"
                opacity={0.6}
              />
            ))}

            {/* Axes */}
            <line x1="30" y1="205" x2="300" y2="205" stroke="#17263D" strokeWidth="2.2" />
            <line x1="50" y1="220" x2="50" y2="15" stroke="#17263D" strokeWidth="2.2" />
            <text x="305" y="209" fill="#17263D" fontSize="11" fontWeight="800">x</text>
            <text x="50" y="12" textAnchor="middle" fill="#17263D" fontSize="11" fontWeight="800">y</text>

            {/* Axis Ticks & Numbers */}
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const x = 50 + num * 36
              const isTargetX = num === 1 || num === 5
              return (
                <g key={`tx-${num}`}>
                  <line x1={x} y1="201" x2={x} y2="209" stroke={isTargetX ? '#2457A7' : '#17263D'} strokeWidth={isTargetX ? 2 : 1.2} />
                  <text x={x} y="221" textAnchor="middle" fill={isTargetX ? '#2457A7' : '#64748B'} fontSize="9" fontWeight={isTargetX ? '800' : '600'}>
                    {num === 1 ? 'x₁=1' : num === 5 ? 'x₂=5' : num}
                  </text>
                </g>
              )
            })}
            {[1, 2, 3, 4, 5].map((num) => {
              const y = 205 - num * 36
              const isTargetY = num === 1 || num === 4
              return (
                <g key={`ty-${num}`}>
                  <line x1="46" y1={y} x2="54" y2={y} stroke={isTargetY ? '#C83B45' : '#17263D'} strokeWidth={isTargetY ? 2 : 1.2} />
                  <text x="42" y={y + 3.5} textAnchor="end" fill={isTargetY ? '#C83B45' : '#64748B'} fontSize="9" fontWeight={isTargetY ? '800' : '600'}>
                    {num === 1 ? 'y₁=1' : num === 4 ? 'y₂=4' : num}
                  </text>
                </g>
              )
            })}
            <text x="42" y="217" textAnchor="end" fill="#17263D" fontSize="9" fontWeight="700">0</text>

            {/* Projections from Point A(1, 1) and Point B(5, 4) */}
            <line x1="86" y1="169" x2="86" y2="205" stroke="#2457A7" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="50" y1="169" x2="86" y2="169" stroke="#C83B45" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="230" y1="61" x2="230" y2="205" stroke="#2457A7" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1="50" y1="61" x2="230" y2="61" stroke="#C83B45" strokeWidth="1.2" strokeDasharray="3 2" />

            {/* Slope Right Triangle: C(5, 1) at (230, 169) */}
            <line x1="86" y1="169" x2="230" y2="169" stroke="#D6A84B" strokeWidth="2.5" />
            <text x="158" y="185" textAnchor="middle" fill="#B45309" fontSize="10" fontWeight="800">
              Δx = 5 - 1 = 4
            </text>

            <line x1="230" y1="169" x2="230" y2="61" stroke="#C83B45" strokeWidth="2.5" />
            <text x="238" y="118" textAnchor="start" fill="#C83B45" fontSize="10" fontWeight="800">
              Δy = 4 - 1 = 3
            </text>

            <path d="M 218 169 L 218 157 L 230 157" fill="none" stroke="#17263D" strokeWidth="1.5" />

            {/* Hypotenuse Segment AB */}
            <line x1="86" y1="169" x2="230" y2="61" stroke="#2457A7" strokeWidth="3.5" />

            {/* Point A(1, 1) */}
            <circle cx="86" cy="169" r="7" fill="rgba(36, 87, 167, 0.25)" />
            <circle cx="86" cy="169" r="4.5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="52" y="142" width="56" height="18" rx="3" fill="#2457A7" />
            <text x="80" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="750">
              A(1, 1)
            </text>

            {/* Point B(5, 4) */}
            <circle cx="230" cy="61" r="7" fill="rgba(36, 87, 167, 0.25)" />
            <circle cx="230" cy="61" r="4.5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="238" y="48" width="56" height="18" rx="3" fill="#2457A7" />
            <text x="266" y="61" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="750">
              B(5, 4)
            </text>

            {/* Midpoint M(3, 2.5) at (158, 115) */}
            <circle cx="158" cy="115" r="7" fill="rgba(16, 185, 129, 0.25)" />
            <circle cx="158" cy="115" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="126" y="94" width="66" height="18" rx="3" fill="#10B981" />
            <text x="159" y="107" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="750">
              M(3, 2.5)
            </text>

            {/* Distance label pill */}
            <rect x="120" y="132" width="76" height="20" rx="10" fill="#102A56" />
            <text x="158" y="146" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="750">
              d = 5.00
            </text>
          </g>

          {/* Right panel: Formula Cards with Numerical Demonstrations */}
          <g transform="translate(370, 25)">
            {/* Distance Card */}
            <rect x="0" y="8" width="360" height="66" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.2" />
            <text x="16" y="28" fill="#2457A7" fontSize="11" fontWeight="750">
              {isKm ? '១. ចម្ងាយរវាងពីរចំណុច (Distance d)' : '1. Distance Formula (Hypotenuse d)'}
            </text>
            <text x="16" y="48" fill="#102A56" fontSize="13" fontWeight="800">
              d = √[(5 - 1)² + (4 - 1)²] = √[16 + 9] = 5.00
            </text>
            <text x="16" y="64" fill="#64748B" fontSize="9.5">
              d = √[(x₂ - x₁)² + (y₂ - y₁)²]
            </text>

            {/* Midpoint Card */}
            <rect x="0" y="82" width="360" height="66" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.2" />
            <text x="16" y="102" fill="#047857" fontSize="11" fontWeight="750">
              {isKm ? '២. កូអរដោនេចំណុចកណ្តាល (Midpoint M)' : '2. Midpoint Coordinates (M)'}
            </text>
            <text x="16" y="122" fill="#065F46" fontSize="13" fontWeight="800">
              M = ( (1 + 5) / 2 , (1 + 4) / 2 ) = (3 , 2.5)
            </text>
            <text x="16" y="138" fill="#64748B" fontSize="9.5">
              M = ( (x₁ + x₂) / 2 , (y₁ + y₂) / 2 )
            </text>

            {/* Slope Card */}
            <rect x="0" y="156" width="360" height="66" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.2" />
            <text x="16" y="176" fill="#B45309" fontSize="11" fontWeight="750">
              {isKm ? '៣. មេគុណប្រាប់ទិស / ជម្រាល (Slope m)' : '3. Slope / Gradient (m)'}
            </text>
            <text x="16" y="196" fill="#92400E" fontSize="13" fontWeight="800">
              m = (4 - 1) / (5 - 1) = 3 / 4 = +0.75
            </text>
            <text x="16" y="212" fill="#64748B" fontSize="9.5">
              m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁) &nbsp;(x₁ ≠ x₂)
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}


/* -------------------------------------------------------------------------
   5. Differentiation: First Derivative Test Flowchart
   ------------------------------------------------------------------------- */
function CalculusExtremaFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញ និងក្រាហ្វដេរីវេទីមួយរកតម្លៃបរមា (First Derivative Extrema Graph)'
            : 'First Derivative Test Decision Flowchart & Real Curve Extrema Graph'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? "ដោះស្រាយ f'(x) = 0 ដើម្បីរកចំណុចស្ថានីយ រួចសិក្សាសញ្ញានៃ f'(x) ដើម្បីកំណត់អតិបរមា ឬអប្បបរមា ជាមួយបន្ទាត់ប៉ះដេក (m = 0)។"
            : "Find critical points where f'(x) = 0, test sign transitions, and observe horizontal tangent lines (slope m = 0) at peaks and troughs."}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 510"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញនិងក្រាហ្វដេរីវេទីមួយ' : 'First derivative test flowchart and real cubic curve graph'}
        >
          {/* Section 1: Decision Flowchart */}
          <rect x="10" y="10" width="740" height="260" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Step 1 */}
          <rect x="240" y="20" width="280" height="34" rx="6" fill="#102A56" />
          <text x="380" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
            {isKm ? "១. គណនាដេរីវេ y = f'(x)" : "1. Differentiate: y = f'(x)"}
          </text>

          <line x1="380" y1="54" x2="380" y2="72" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrow-both)" />

          {/* Step 2 */}
          <rect x="210" y="72" width="340" height="34" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="94" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="750">
            {isKm ? "២. រកចំណុចស្ថានីយ៖ ដោះស្រាយ f'(x) = 0" : "2. Solve f'(x) = 0 to find critical points c"}
          </text>

          <line x1="380" y1="106" x2="380" y2="128" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 140 128 L 620 128" stroke="#64748B" strokeWidth="1.8" />
          <line x1="140" y1="128" x2="140" y2="145" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="380" y1="128" x2="380" y2="145" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="620" y1="128" x2="620" y2="145" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />

          {/* Branch 1: Max */}
          <rect x="40" y="148" width="200" height="106" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="140" y="170" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">
            {isKm ? "សញ្ញា f'(x) ប្រែពី + ទៅ -" : "Sign changes from + to -"}
          </text>
          <text x="140" y="198" textAnchor="middle" fill="#065F46" fontSize="14" fontWeight="800">
            {isKm ? 'អតិបរមា Local Max' : 'Local Maximum'}
          </text>
          <text x="140" y="226" textAnchor="middle" fill="#047857" fontSize="10.5">
            {isKm ? "ក្រាហ្វឡើង រួចចុះ (∩) · f' = 0" : "Graph rises then falls (∩) · f' = 0"}
          </text>

          {/* Branch 2: Min */}
          <rect x="280" y="148" width="200" height="106" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="170" textAnchor="middle" fill="#2457A7" fontSize="11" fontWeight="700">
            {isKm ? "សញ្ញា f'(x) ប្រែពី - ទៅ +" : "Sign changes from - to +"}
          </text>
          <text x="380" y="198" textAnchor="middle" fill="#102A56" fontSize="14" fontWeight="800">
            {isKm ? 'អប្បបរមា Local Min' : 'Local Minimum'}
          </text>
          <text x="380" y="226" textAnchor="middle" fill="#2457A7" fontSize="10.5">
            {isKm ? "ក្រាហ្វចុះ រួចឡើង (∪) · f' = 0" : "Graph falls then rises (∪) · f' = 0"}
          </text>

          {/* Branch 3: Inflection */}
          <rect x="520" y="148" width="200" height="106" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <text x="620" y="170" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">
            {isKm ? "សញ្ញា f'(x) មិនផ្លាស់ប្តូរ" : "No sign change (+/+ or -/-)"}
          </text>
          <text x="620" y="198" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="800">
            {isKm ? 'ចំណុចរបត់ Inflection' : 'Stationary Inflection'}
          </text>
          <text x="620" y="226" textAnchor="middle" fill="#B45309" fontSize="10.5">
            {isKm ? 'មិនមែនជាបរមាទេ' : 'Not an extremum'}
          </text>

          {/* Section 2: Real Cubic Function Graph f(x) = (1/3)x³ - x */}
          <g transform="translate(10, 280)">
            <rect x="0" y="0" width="740" height="215" rx="10" fill="var(--surface)" stroke="var(--line)" />

            {/* Left coordinate graph */}
            <g transform="translate(20, 15)">
              <rect x="0" y="0" width="340" height="185" rx="6" fill="var(--surface-sunken)" stroke="var(--line)" />

              {/* Grid */}
              {[-3, -2, -1, 0, 1, 2, 3].map((ux) => {
                const cx = 170 + ux * 52
                return (
                  <line key={`cgx-${ux}`} x1={cx} y1="0" x2={cx} y2="185" stroke="var(--line)" strokeWidth="0.8" opacity="0.6" />
                )
              })}
              {[-1.5, -1, -0.5, 0, 0.5, 1, 1.5].map((uy) => {
                const cy = 95 - uy * 46
                return (
                  <line key={`cgy-${uy}`} x1="0" y1={cy} x2="340" y2={cy} stroke="var(--line)" strokeWidth="0.8" opacity="0.6" />
                )
              })}

              {/* Axes */}
              <line x1="10" y1="95" x2="330" y2="95" stroke="#17263D" strokeWidth="2" />
              <line x1="170" y1="180" x2="170" y2="8" stroke="#17263D" strokeWidth="2" />
              <text x="334" y="99" fill="#17263D" fontSize="10" fontWeight="800">x</text>
              <text x="170" y="6" textAnchor="middle" fill="#17263D" fontSize="10" fontWeight="800">y</text>

              {/* Ticks on X */}
              {[-2, -1, 1, 2].map((n) => (
                <g key={`ctx-${n}`}>
                  <line x1={170 + n * 52} y1="91" x2={170 + n * 52} y2="99" stroke="#17263D" strokeWidth="1" />
                  <text x={170 + n * 52} y="110" textAnchor="middle" fill="#64748B" fontSize="8.5">
                    {n}
                  </text>
                </g>
              ))}

              {/* Cubic Curve f(x) = (1/3)x³ - x */}
              <path
                d="M 56 165 C 80 145 102 64 118 64 C 136 64 154 95 170 95 C 186 95 204 126 222 126 C 238 126 260 45 284 25"
                fill="none"
                stroke="#2457A7"
                strokeWidth="2.8"
              />

              {/* Horizontal Tangent at Max: y = 0.67 (64px) */}
              <line x1="75" y1="64" x2="160" y2="64" stroke="#10B981" strokeWidth="1.8" strokeDasharray="3 2" />
              <rect x="70" y="48" width="60" height="15" rx="3" fill="#ECFDF5" stroke="#10B981" strokeWidth="0.8" />
              <text x="100" y="59" textAnchor="middle" fill="#065F46" fontSize="8" fontWeight="700">m = f'(-1) = 0</text>

              {/* Local Max Point A(-1, 0.67) */}
              <circle cx="118" cy="64" r="6" fill="rgba(16, 185, 129, 0.25)" />
              <circle cx="118" cy="64" r="3.5" fill="#10B981" />
              <rect x="124" y="54" width="75" height="16" rx="3" fill="#10B981" />
              <text x="161" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="750">Max (-1, 0.67)</text>

              {/* Horizontal Tangent at Min: y = -0.67 (126px) */}
              <line x1="180" y1="126" x2="265" y2="126" stroke="#2457A7" strokeWidth="1.8" strokeDasharray="3 2" />
              <rect x="210" y="132" width="60" height="15" rx="3" fill="#EAF2FF" stroke="#2457A7" strokeWidth="0.8" />
              <text x="240" y="143" textAnchor="middle" fill="#102A56" fontSize="8" fontWeight="700">m = f'(1) = 0</text>

              {/* Local Min Point B(1, -0.67) */}
              <circle cx="222" cy="126" r="6" fill="rgba(36, 87, 167, 0.25)" />
              <circle cx="222" cy="126" r="3.5" fill="#2457A7" />
              <rect x="144" y="122" width="72" height="16" rx="3" fill="#2457A7" />
              <text x="180" y="134" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="750">Min (1, -0.67)</text>

              {/* Inflection point (0, 0) */}
              <circle cx="170" cy="95" r="3.5" fill="#D6A84B" />
              <text x="176" y="90" fill="#B45309" fontSize="8" fontWeight="700">Inflection (0, 0)</text>
            </g>

            {/* Right panel: Interpretation of Extrema & Derivative Signs */}
            <g transform="translate(390, 18)">
              <rect x="0" y="0" width="330" height="180" rx="8" fill="var(--surface-sunken)" stroke="var(--line)" />
              <text x="16" y="24" fill="#102A56" fontSize="12" fontWeight="800">
                {isKm ? 'ក្រាហ្វអនុគមន៍ជាក់ស្តែង ៖ f(x) = (1/3)x³ - x' : 'Real Curve Extrema: f(x) = (1/3)x³ - x'}
              </text>
              <text x="16" y="46" fill="#2457A7" fontSize="11" fontWeight="700">
                f'(x) = x² - 1 = (x - 1)(x + 1) = 0 ⟹ c = ±1
              </text>
              <text x="16" y="68" fill="#047857" fontSize="11" fontWeight="750">
                {isKm ? "• x < -1 ៖ f'(x) > 0 ⟹ ក្រាហ្វកើន (ឡើងលើ)" : "• x < -1 : f'(x) > 0 ⟹ Curve is rising"}
              </text>
              <text x="16" y="88" fill="#C83B45" fontSize="11" fontWeight="750">
                {isKm ? "• -1 < x < 1 ៖ f'(x) < 0 ⟹ ក្រាហ្វចុះ (ចុះក្រោម)" : "• -1 < x < 1 : f'(x) < 0 ⟹ Curve is falling"}
              </text>
              <text x="16" y="108" fill="#047857" fontSize="11" fontWeight="750">
                {isKm ? "• x > 1 ៖ f'(x) > 0 ⟹ ក្រាហ្វកើនឡើងវិញ" : "• x > 1 : f'(x) > 0 ⟹ Curve is rising again"}
              </text>
              <text x="16" y="130" fill="#065F46" fontSize="10.5">
                {isKm ? "• ត្រង់ x = -1 ៖ សញ្ញាប្រែពី + ទៅ - ⟹ អតិបរមា (-1, 2/3)" : "• At x = -1: sign changes + to - ⟹ Local Max (-1, 2/3)"}
              </text>
              <text x="16" y="150" fill="#102A56" fontSize="10.5">
                {isKm ? "• ត្រង់ x = 1 ៖ សញ្ញាប្រែពី - ទៅ + ⟹ អប្បបរមា (1, -2/3)" : "• At x = 1: sign changes - to + ⟹ Local Min (1, -2/3)"}
              </text>
              <text x="16" y="168" fill="#64748B" fontSize="9.5">
                {isKm ? 'បន្ទាត់ប៉ះត្រង់បរមាទាំងពីរជាបន្ទាត់ដេកមានមេគុណប្រាប់ទិស m = 0' : 'Horizontal tangent lines have zero slope (m = 0) at all local extrema'}
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}


function SystemsSolvingFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'វិធីសាស្ត្រជ្រើសរើសដោះស្រាយប្រព័ន្ធសមីការលីនេអ៊ែរ'
            : 'Systems of Linear Equations Solving Strategy'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ជ្រើសរើសវិធីសាស្ត្រដែលលឿន និងត្រឹមត្រូវបំផុត៖ វិធីសាស្ត្រជំនួស ឬវិធីសាស្ត្របូកបំបាត់។'
            : 'Choose the most efficient algebraic method: substitution vs elimination.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 250"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញប្រព័ន្ធសមីការ' : 'Systems of equations solving strategy flowchart'}
        >
          <rect x="10" y="10" width="740" height="230" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          <rect x="220" y="24" width="320" height="38" rx="6" fill="#102A56" />
          <text x="380" y="48" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
            {isKm ? 'ប្រព័ន្ធសមីការពីរអថេរ (x, y)' : 'System of 2 linear equations in (x, y)'}
          </text>

          <line x1="380" y1="62" x2="380" y2="88" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 200 88 L 560 88" stroke="#64748B" strokeWidth="1.8" />
          <line x1="200" y1="88" x2="200" y2="105" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="560" y1="88" x2="560" y2="105" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />

          {/* Left: Substitution */}
          <rect x="50" y="108" width="300" height="112" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
          <text x="200" y="132" textAnchor="middle" fill="#102A56" fontSize="13" fontWeight="800">
            {isKm ? 'វិធីសាស្ត្រជំនួស (Substitution)' : 'Substitution Method'}
          </text>
          <text x="200" y="154" textAnchor="middle" fill="#2457A7" fontSize="11" fontWeight="600">
            {isKm ? 'ពេលមានអថេរមេគុណ ១ (ឧ. x = ... ឬ y = ...)' : 'Best when one variable has coefficient ±1'}
          </text>
          <rect x="70" y="168" width="260" height="36" rx="4" fill="#FFFFFF" stroke="#2457A7" />
          <text x="200" y="190" textAnchor="middle" fill="#102A56" fontSize="11">
            {isKm ? 'ទាញអថេរមួយ រួចយកទៅជួសក្នុងសមីការមួយទៀត' : 'Isolate one variable, substitute into the other'}
          </text>

          {/* Right: Elimination */}
          <rect x="410" y="108" width="300" height="112" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="560" y="132" textAnchor="middle" fill="#065F46" fontSize="13" fontWeight="800">
            {isKm ? 'វិធីសាស្ត្របូកបំបាត់ (Elimination)' : 'Elimination Method'}
          </text>
          <text x="560" y="154" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="600">
            {isKm ? 'ពេលសមីការទាំងពីរស្ថិតក្នុងទម្រង់ ax + by = c' : 'Best when both are in standard form ax + by = c'}
          </text>
          <rect x="430" y="168" width="260" height="36" rx="4" fill="#FFFFFF" stroke="#10B981" />
          <text x="560" y="190" textAnchor="middle" fill="#065F46" fontSize="11">
            {isKm ? 'គុណឲ្យមេគុណស្មើគ្នា រួចបូក ឬដកបំបាត់' : 'Multiply to match coefficients, add or subtract'}
          </text>
        </svg>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   7. Probability Decision Tree & Rules Diagram
   ------------------------------------------------------------------------- */
function ProbabilityTreeDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញច្បាប់ប្រូបាប៊ីលីតេ (Probability Decision Tree)'
            : 'Probability Decision Tree & Rules'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? '០ ≤ P(A) ≤ ១ ជានិច្ច។ ពិនិត្យភាពមិនចុះសម្រុងគ្នា (AND/OR) និងភាពឯករាជ្យនៃព្រឹត្តិការណ៍។'
            : 'Always 0 ≤ P(A) ≤ 1. Check mutual exclusivity for OR, independence for AND.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 250"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញប្រូបាប៊ីលីតេ' : 'Probability rules decision tree'}
        >
          <rect x="10" y="10" width="740" height="230" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Root node */}
          <rect x="250" y="24" width="260" height="36" rx="6" fill="#102A56" />
          <text x="380" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
            {isKm ? 'ច្បាប់ប្រូបាប៊ីលីតេផ្សំ P(A ∪ B) & P(A ∩ B)' : 'Compound Probability: OR vs AND'}
          </text>

          <line x1="380" y1="60" x2="380" y2="82" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 200 82 L 560 82" stroke="#64748B" strokeWidth="1.8" />
          <line x1="200" y1="82" x2="200" y2="100" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="560" y1="82" x2="560" y2="100" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />

          {/* Left: OR (Union) */}
          <rect x="50" y="102" width="300" height="120" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
          <text x="200" y="126" textAnchor="middle" fill="#102A56" fontSize="13" fontWeight="800">
            {isKm ? 'ច្បាប់បូក OR ៖ P(A ∪ B)' : 'Addition Rule (OR): P(A ∪ B)'}
          </text>
          <text x="200" y="150" textAnchor="middle" fill="#2457A7" fontSize="11" fontWeight="600">
            {isKm ? 'មិនចុះសម្រុង (Mutually Exclusive)៖ P(A ∩ B) = 0' : 'Mutually Exclusive: P(A ∪ B) = P(A) + P(B)'}
          </text>
          <rect x="65" y="162" width="270" height="46" rx="4" fill="#FFFFFF" stroke="#2457A7" />
          <text x="200" y="180" textAnchor="middle" fill="#102A56" fontSize="11" fontWeight="700">
            P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
          </text>
          <text x="200" y="198" textAnchor="middle" fill="#64748B" fontSize="10">
            {isKm ? 'ដកផ្នែកជាន់គ្នា (Overlapping elements)' : 'Subtract overlap to avoid double-counting'}
          </text>

          {/* Right: AND (Intersection) */}
          <rect x="410" y="102" width="300" height="120" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <text x="560" y="126" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="800">
            {isKm ? 'ច្បាប់គុណ AND ៖ P(A ∩ B)' : 'Multiplication Rule (AND): P(A ∩ B)'}
          </text>
          <text x="560" y="150" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="600">
            {isKm ? 'ព្រឹត្តិការណ៍ឯករាជ្យ (Independent)៖' : 'Independent Events: P(A ∩ B) = P(A) × P(B)'}
          </text>
          <rect x="425" y="162" width="270" height="46" rx="4" fill="#FFFFFF" stroke="#D6A84B" />
          <text x="560" y="180" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="700">
            P(A ∩ B) = P(A) × P(B | A)
          </text>
          <text x="560" y="198" textAnchor="middle" fill="#64748B" fontSize="10">
            {isKm ? 'P(B | A) = ប្រូបាប៊ីលីតេមានលក្ខខណ្ឌ' : 'P(B | A) = Conditional probability given A occurred'}
          </text>
        </svg>
      </div>
    </div>
  )
}


/* -------------------------------------------------------------------------
   8. Polynomial Factoring Decision Flowchart
   ------------------------------------------------------------------------- */
function FactoringFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញយុទ្ធសាស្ត្រដាក់ជាផលគុណកត្តា (Factoring Strategy Flowchart)'
            : 'Polynomial Factoring Decision Flowchart'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ជំហានទី១៖ ទាញកត្តារួមធំបំផុត (GCF) ជានិច្ច។ ជំហានទី២៖ រាប់ចំនួនតួនៃកន្សោម (២, ៣, ឬ ៤ តួ) ដើម្បីជ្រើសរើសរូបមន្តដែលត្រឹមត្រូវ។'
            : 'Step 1: Always factor out the GCF first. Step 2: Count terms (2, 3, or 4) to apply the corresponding factoring identity.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 340"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញដាក់ជាផលគុណកត្តា' : 'Polynomial factoring decision flowchart'}
        >
          <defs>
            <marker id="fact-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#2457A7" />
            </marker>
          </defs>

          <rect x="10" y="10" width="740" height="320" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Root node: Polynomial */}
          <rect x="250" y="20" width="260" height="36" rx="6" fill="#102A56" />
          <text x="380" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
            {isKm ? 'ពហុធា P(x) ដែលត្រូវដាក់ជាផលគុណកត្តា' : 'Given Polynomial P(x) to Factor'}
          </text>

          <line x1="380" y1="56" x2="380" y2="76" stroke="#64748B" strokeWidth="2" markerEnd="url(#fact-arrow)" />

          {/* Step 1: GCF */}
          <rect x="180" y="76" width="400" height="38" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="100" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="750">
            {isKm ? 'ជំហានទី ១ ៖ ទាញកត្តារួមធំបំផុត GCF : ab + ac = a(b + c)' : 'Step 1: Always factor out GCF first : ab + ac = a(b + c)'}
          </text>

          <line x1="380" y1="114" x2="380" y2="136" stroke="#64748B" strokeWidth="2" markerEnd="url(#fact-arrow)" />

          {/* Step 2: Count terms */}
          <rect x="230" y="136" width="300" height="34" rx="6" fill="#17263D" />
          <text x="380" y="158" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
            {isKm ? 'ជំហានទី ២ ៖ រាប់ចំនួនតួនៃកន្សោមនៅសល់' : 'Step 2: Count the Number of Remaining Terms'}
          </text>

          {/* 3 Branches */}
          <line x1="380" y1="170" x2="380" y2="190" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 130 190 L 630 190" stroke="#64748B" strokeWidth="1.8" />
          <line x1="130" y1="190" x2="130" y2="208" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#fact-arrow)" />
          <line x1="380" y1="190" x2="380" y2="208" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#fact-arrow)" />
          <line x1="630" y1="190" x2="630" y2="208" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#fact-arrow)" />

          {/* Branch 1: 2 terms */}
          <rect x="35" y="210" width="190" height="110" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <rect x="75" y="218" width="110" height="22" rx="11" fill="#10B981" />
          <text x="130" y="233" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
            {isKm ? '២ តួ (Binomial)' : '2 Terms (Binomial)'}
          </text>
          <text x="130" y="255" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="700">
            a² - b² = (a - b)(a + b)
          </text>
          <text x="130" y="275" textAnchor="middle" fill="#047857" fontSize="10">
            {isKm ? 'ផលដកការ៉េ ឬផលបូក/ដកគូប' : 'Difference of Squares / Cubes'}
          </text>
          <text x="130" y="295" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="600">
            a³ ± b³ = (a ± b)(a² ∓ ab + b²)
          </text>

          {/* Branch 2: 3 terms */}
          <rect x="285" y="210" width="190" height="110" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
          <rect x="325" y="218" width="110" height="22" rx="11" fill="#2457A7" />
          <text x="380" y="233" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
            {isKm ? '៣ តួ (Trinomial)' : '3 Terms (Trinomial)'}
          </text>
          <text x="380" y="255" textAnchor="middle" fill="#102A56" fontSize="11" fontWeight="700">
            x² + bx + c = (x + p)(x + q)
          </text>
          <text x="380" y="275" textAnchor="middle" fill="#2457A7" fontSize="10">
            {isKm ? 'រក p, q ៖ p+q = b និង p×q = c' : 'Find p, q: p+q = b and p×q = c'}
          </text>
          <text x="380" y="295" textAnchor="middle" fill="#102A56" fontSize="10" fontWeight="600">
            ax² + bx + c → ac-method
          </text>

          {/* Branch 3: 4 terms */}
          <rect x="535" y="210" width="190" height="110" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <rect x="575" y="218" width="110" height="22" rx="11" fill="#D6A84B" />
          <text x="630" y="233" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
            {isKm ? '៤ តួ (4 Terms)' : '4 Terms (Grouping)'}
          </text>
          <text x="630" y="255" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="700">
            {isKm ? 'ផ្ដុំជាគូ (Grouping)' : 'Factor by Grouping'}
          </text>
          <text x="630" y="275" textAnchor="middle" fill="#B45309" fontSize="10">
            (ax + ay) + (bx + by)
          </text>
          <text x="630" y="295" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="600">
            = a(x + y) + b(x + y) = (a + b)(x + y)
          </text>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? '១. ទាញកត្តារួម (GCF)' : '1. Greatest Common Factor'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'ទាញលេខ និងអថេររួមដែលមានស្វ័យគុណទាបបំផុតចេញក្រៅវង់ក្រចក។' : 'Extract highest common numerical and variable factor from all terms.'}
          </p>
          <code className="flowchart-step-code">6x³ + 9x² = 3x²(2x + 3)</code>
        </div>

        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? '២. ផលដកពីរការ៉េ' : '2. Difference of Squares'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'ទម្រង់ a² - b² = (a - b)(a + b)។ ចំណាំ៖ a² + b² មិនអាចបំបែកលើ R បានទេ។' : 'Form a² - b² = (a - b)(a + b). Note: sum of squares does not factor over R.'}
          </p>
          <code className="flowchart-step-code">4x² - 25 = (2x - 5)(2x + 5)</code>
        </div>

        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? '៣. ត្រីធាដឺក្រេទីពីរ' : '3. Quadratic Trinomial'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'ស្វែងរកចំនួនពីរដែលគុណគ្នាស្មើ c ហើយបូកគ្នាស្មើ b។' : 'Find two integers that multiply to give c and add to give b.'}
          </p>
          <code className="flowchart-step-code">x² + 5x + 6 = (x + 2)(x + 3)</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   9. Right Triangle Trigonometry (SOH · CAH · TOA)
   ------------------------------------------------------------------------- */
function RightTriangleTrigDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'ផលធៀបត្រីកោណមាត្រក្នុងត្រីកោណកែង (Right Triangle Trigonometry: SOH · CAH · TOA)'
            : 'Right Triangle Trigonometric Ratios (SOH · CAH · TOA)'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'កំណត់ជ្រុងឈម ជ្រុងជាប់ និងអ៊ីប៉ូតេនុស ធៀបនឹងមុំស្រួច θ។ រូបមន្តគ្រឹះ ៖ sin θ, cos θ, tan θ និង sin²θ + cos²θ = 1។'
            : 'Identify Opposite, Adjacent, and Hypotenuse relative to acute angle θ. Core ratios: sin, cos, tan and sin²θ + cos²θ = 1.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 270"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមផលធៀបត្រីកោណមាត្រ' : 'Right triangle trigonometry SOH CAH TOA diagram'}
        >
          <rect x="10" y="10" width="740" height="250" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Triangle */}
          <g transform="translate(40, 25)">
            {/* Vertices: A(60, 180), C(250, 180), B(250, 40) */}
            <polygon points="60,180 250,180 250,40" fill="#EAF2FF" stroke="#2457A7" strokeWidth="2.5" />

            {/* Right angle symbol at C(250, 180) */}
            <path d="M 234 180 L 234 164 L 250 164" fill="none" stroke="#2457A7" strokeWidth="1.8" />

            {/* Angle θ arc at A(60, 180) */}
            <path d="M 105 180 A 45 45 0 0 0 94 155" fill="none" stroke="#D6A84B" strokeWidth="2.5" />
            <text x="115" y="166" fill="#B45309" fontSize="14" fontWeight="800">θ</text>

            {/* Labels */}
            <text x="155" y="202" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="700">
              {isKm ? 'ជ្រុងជាប់ Adjacent (b)' : 'Adjacent side (b)'}
            </text>
            <text x="262" y="115" textAnchor="start" fill="#C83B45" fontSize="12" fontWeight="700">
              {isKm ? 'ជ្រុងឈម Opposite (a)' : 'Opposite side (a)'}
            </text>
            <text x="135" y="95" textAnchor="end" fill="#2457A7" fontSize="12" fontWeight="800">
              {isKm ? 'អ៊ីប៉ូតេនុស Hypotenuse (c)' : 'Hypotenuse (c)'}
            </text>

            <rect x="40" y="215" width="220" height="22" rx="4" fill="#102A56" />
            <text x="150" y="230" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
              a² + b² = c² &nbsp;|&nbsp; sin²θ + cos²θ = 1
            </text>
          </g>

          {/* Right panel: SOH CAH TOA Cards */}
          <g transform="translate(350, 25)">
            {/* SOH */}
            <rect x="0" y="10" width="370" height="60" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
            <text x="18" y="32" fill="#065F46" fontSize="13" fontWeight="800">
              SOH : sin(θ) = Opposite / Hypotenuse = a / c
            </text>
            <text x="18" y="52" fill="#047857" fontSize="11">
              {isKm ? 'ស៊ីនុស ៖ ផលធៀបរវាងជ្រុងឈម និងអ៊ីប៉ូតេនុស' : 'Sine: ratio of opposite side to hypotenuse'}
            </text>

            {/* CAH */}
            <rect x="0" y="80" width="370" height="60" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
            <text x="18" y="102" fill="#102A56" fontSize="13" fontWeight="800">
              CAH : cos(θ) = Adjacent / Hypotenuse = b / c
            </text>
            <text x="18" y="122" fill="#2457A7" fontSize="11">
              {isKm ? 'កូស៊ីនុស ៖ ផលធៀបរវាងជ្រុងជាប់ និងអ៊ីប៉ូតេនុស' : 'Cosine: ratio of adjacent side to hypotenuse'}
            </text>

            {/* TOA */}
            <rect x="0" y="150" width="370" height="60" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
            <text x="18" y="172" fill="#92400E" fontSize="13" fontWeight="800">
              TOA : tan(θ) = Opposite / Adjacent = a / b
            </text>
            <text x="18" y="192" fill="#B45309" fontSize="11">
              {isKm ? 'តង់សង់ ៖ ផលធៀបរវាងជ្រុងឈម និងជ្រុងជាប់ (sin θ / cos θ)' : 'Tangent: ratio of opposite to adjacent (sin θ / cos θ)'}
            </text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'មុំពិសេស ៣០° (π/6)' : 'Special Angle 30° (π/6)'}
          </div>
          <code className="flowchart-step-code">sin(30°) = 1/2 | cos(30°) = √3/2 | tan(30°) = √3/3</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'មុំពិសេស ៤៥° (π/4)' : 'Special Angle 45° (π/4)'}
          </div>
          <code className="flowchart-step-code">sin(45°) = √2/2 | cos(45°) = √2/2 | tan(45°) = 1</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'មុំពិសេស ៦០° (π/3)' : 'Special Angle 60° (π/3)'}
          </div>
          <code className="flowchart-step-code">sin(60°) = √3/2 | cos(60°) = 1/2 | tan(60°) = √3</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   10. Unit Circle & ASTC Quadrant Sign Rules
   ------------------------------------------------------------------------- */
function UnitCircleDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'រង្វង់ត្រីកោណមាត្រ និងច្បាប់សញ្ញា ASTC (Unit Circle & ASTC Signs)'
            : 'Unit Circle & ASTC Quadrant Sign Rules'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'រង្វង់កាំ r = 1៖ កូអរដោនេចំណុច (x, y) = (cos θ, sin θ)។ ចងចាំច្បាប់ ASTC ដើម្បីដឹងពីសញ្ញាត្រីកោណមាត្រក្នុងចតុកោណនីមួយៗ។'
            : 'Unit circle with radius r = 1: coordinates (x, y) = (cos θ, sin θ). Use ASTC rule to determine trigonometric signs across all 4 quadrants.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 310"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមរង្វង់ត្រីកោណមាត្រ' : 'Unit circle and ASTC quadrant signs diagram'}
        >
          <rect x="10" y="10" width="740" height="290" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Unit Circle */}
          <g transform="translate(170, 155)">
            {/* Coordinate Axes */}
            <line x1="-135" y1="0" x2="135" y2="0" stroke="#17263D" strokeWidth="1.8" />
            <line x1="0" y1="135" x2="0" y2="-135" stroke="#17263D" strokeWidth="1.8" />
            <text x="142" y="4" fill="#17263D" fontSize="11" fontWeight="700">x = cos θ</text>
            <text x="0" y="-140" textAnchor="middle" fill="#17263D" fontSize="11" fontWeight="700">y = sin θ</text>

            {/* Circle r = 90 */}
            <circle cx="0" cy="0" r="90" fill="none" stroke="#2457A7" strokeWidth="2.5" />

            {/* Intercepts */}
            <circle cx="90" cy="0" r="3.5" fill="#2457A7" />
            <text x="100" y="14" fill="#64748B" fontSize="10">(1, 0)</text>
            <circle cx="0" cy="-90" r="3.5" fill="#2457A7" />
            <text x="6" y="-96" fill="#64748B" fontSize="10">(0, 1)</text>
            <circle cx="-90" cy="0" r="3.5" fill="#2457A7" />
            <text x="-115" y="14" fill="#64748B" fontSize="10">(-1, 0)</text>
            <circle cx="0" cy="90" r="3.5" fill="#2457A7" />
            <text x="6" y="104" fill="#64748B" fontSize="10">(0, -1)</text>

            {/* Angle θ ray at 40°: x=90*cos(40)=68.9, y=-90*sin(40)=-57.8 */}
            <line x1="0" y1="0" x2="69" y2="-58" stroke="#D6A84B" strokeWidth="2.5" />
            <circle cx="69" cy="-58" r="4.5" fill="#C83B45" />

            {/* Projections */}
            <line x1="69" y1="0" x2="69" y2="-58" stroke="#C83B45" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="0" y1="-58" x2="69" y2="-58" stroke="#2457A7" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Point label */}
            <text x="76" y="-64" fill="#C83B45" fontSize="11" fontWeight="750">P(cos θ, sin θ)</text>
            <text x="32" y="-12" fill="#B45309" fontSize="11" fontWeight="700">θ</text>
          </g>

          {/* Right panel: The ASTC Rule Cards (2x2 Grid) */}
          <g transform="translate(380, 25)">
            <rect x="0" y="10" width="350" height="30" rx="6" fill="#102A56" />
            <text x="175" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">
              {isKm ? 'ច្បាប់សញ្ញា ASTC (All · Sine · Tan · Cos)' : 'ASTC Quadrant Sign Rule'}
            </text>

            {/* Quad II (Top Left) */}
            <rect x="0" y="48" width="170" height="98" rx="6" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.2" />
            <text x="14" y="68" fill="#102A56" fontSize="12" fontWeight="800">Q II (90°–180°)</text>
            <text x="14" y="88" fill="#2457A7" fontSize="13" fontWeight="800">S = Sine (+)</text>
            <text x="14" y="106" fill="#047857" fontSize="10">sin θ &gt; 0</text>
            <text x="14" y="122" fill="#C83B45" fontSize="10">cos θ &lt; 0 | tan θ &lt; 0</text>

            {/* Quad I (Top Right) */}
            <rect x="180" y="48" width="170" height="98" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
            <text x="194" y="68" fill="#065F46" fontSize="12" fontWeight="800">Q I (0°–90°)</text>
            <text x="194" y="88" fill="#047857" fontSize="13" fontWeight="800">A = ALL (+)</text>
            <text x="194" y="106" fill="#047857" fontSize="10">sin θ &gt; 0</text>
            <text x="194" y="122" fill="#047857" fontSize="10">cos θ &gt; 0 | tan θ &gt; 0</text>

            {/* Quad III (Bottom Left) */}
            <rect x="0" y="154" width="170" height="98" rx="6" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.2" />
            <text x="14" y="174" fill="#92400E" fontSize="12" fontWeight="800">Q III (180°–270°)</text>
            <text x="14" y="194" fill="#B45309" fontSize="13" fontWeight="800">T = Tangent (+)</text>
            <text x="14" y="212" fill="#047857" fontSize="10">tan θ &gt; 0</text>
            <text x="14" y="228" fill="#C83B45" fontSize="10">sin θ &lt; 0 | cos θ &lt; 0</text>

            {/* Quad IV (Bottom Right) */}
            <rect x="180" y="154" width="170" height="98" rx="6" fill="#FDF2F3" stroke="#F87171" strokeWidth="1.2" />
            <text x="194" y="174" fill="#991B1B" fontSize="12" fontWeight="800">Q IV (270°–360°)</text>
            <text x="194" y="194" fill="#C83B45" fontSize="13" fontWeight="800">C = Cosine (+)</text>
            <text x="194" y="212" fill="#047857" fontSize="10">cos θ &gt; 0</text>
            <text x="194" y="228" fill="#C83B45" fontSize="10">sin θ &lt; 0 | tan θ &lt; 0</text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'បំលែងរ៉ាដ្យង់ និងដឺក្រេ' : 'Radian-Degree Conversion'}
          </div>
          <code className="flowchart-step-code">π rad = 180° ⟺ θ_rad = θ° × (π / 180°)</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'រូបមន្តគ្រឹះពីរ៉ាដ្យង់' : 'Core Identity on Unit Circle'}
          </div>
          <code className="flowchart-step-code">x² + y² = 1 ⟺ cos²(θ) + sin²(θ) = 1</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   11. Limits Evaluation Decision Flowchart
   ------------------------------------------------------------------------- */
function LimitsFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញយុទ្ធសាស្ត្រគណនាលីមីត (Limits Evaluation Strategy Flowchart)'
            : 'Limits Evaluation Strategy Decision Flowchart'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ជំហានទី១៖ ជំនួសតម្លៃផ្ទាល់ x = c។ បើចេញទម្រង់មិនកំណត់ 0/0 ត្រូវប្រើវិធីដាក់ជាផលគុណកត្តា គុណកន្សោមឆ្លាស់ ឬក្បួនឡូពីតាល់។'
            : "Step 1: Direct substitution x = c. If the indeterminate form 0/0 arises, resolve algebraically via factoring, conjugate rationalization, or L'Hopital rule."}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 320"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញគណនាលីមីត' : 'Limits evaluation decision flowchart'}
        >
          <defs>
            <marker id="lim-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#2457A7" />
            </marker>
          </defs>

          <rect x="10" y="10" width="740" height="300" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Node 1 */}
          <rect x="250" y="20" width="260" height="36" rx="6" fill="#102A56" />
          <text x="380" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
            {isKm ? 'គណនាលីមីត ៖ lim_{x → c} f(x)' : 'Evaluate: lim_{x → c} f(x)'}
          </text>

          <line x1="380" y1="56" x2="380" y2="76" stroke="#64748B" strokeWidth="2" markerEnd="url(#lim-arrow)" />

          {/* Node 2 */}
          <rect x="190" y="76" width="380" height="36" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="99" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="750">
            {isKm ? 'ជំហានទី ១ ៖ ជំនួសតម្លៃផ្ទាល់ x = c ចូលក្នុង f(x)' : 'Step 1: Direct Substitution: Calculate f(c)'}
          </text>

          {/* 3 Outcome Branches */}
          <line x1="380" y1="112" x2="380" y2="135" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 130 135 L 630 135" stroke="#64748B" strokeWidth="1.8" />
          <line x1="130" y1="135" x2="130" y2="155" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#lim-arrow)" />
          <line x1="380" y1="135" x2="380" y2="155" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#lim-arrow)" />
          <line x1="630" y1="135" x2="630" y2="155" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#lim-arrow)" />

          {/* Branch 1: Finite L */}
          <rect x="35" y="158" width="190" height="130" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="130" y="180" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="800">
            {isKm ? 'ចេញលេខពិត L' : 'Finite Value L'}
          </text>
          <text x="130" y="202" textAnchor="middle" fill="#065F46" fontSize="13" fontWeight="800">
            lim f(x) = L
          </text>
          <text x="130" y="224" textAnchor="middle" fill="#047857" fontSize="11">
            {isKm ? 'ចប់! អនុគមន៍ជាប់ត្រង់ c' : 'Done! Function is continuous at c'}
          </text>
          <rect x="50" y="240" width="160" height="26" rx="4" fill="#FFFFFF" stroke="#10B981" />
          <text x="130" y="258" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="700">
            lim (x² + 3) = 2² + 3 = 7
          </text>

          {/* Branch 2: k / 0 */}
          <rect x="285" y="158" width="190" height="130" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <text x="380" y="180" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="800">
            k / 0 &nbsp;(k ≠ 0)
          </text>
          <text x="380" y="202" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="800">
            {isKm ? 'អាស៊ីមតូតឈរ' : 'Vertical Asymptote'}
          </text>
          <text x="380" y="224" textAnchor="middle" fill="#92400E" fontSize="11">
            {isKm ? 'លីមីតស្មើ ±∞ ឬគ្មានលីមីត' : 'Limit is ±∞ or does not exist'}
          </text>
          <rect x="300" y="240" width="160" height="26" rx="4" fill="#FFFFFF" stroke="#D6A84B" />
          <text x="380" y="258" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="700">
            {"lim_{x→0⁺} (1/x) = +∞"}
          </text>

          {/* Branch 3: 0 / 0 */}
          <rect x="535" y="158" width="190" height="130" rx="8" fill="#FDF2F3" stroke="#F87171" strokeWidth="1.5" />
          <text x="630" y="180" textAnchor="middle" fill="#C83B45" fontSize="12" fontWeight="800">
            {isKm ? 'ទម្រង់មិនកំណត់ 0/0' : 'Indeterminate 0/0'}
          </text>
          <text x="630" y="200" textAnchor="middle" fill="#991B1B" fontSize="11" fontWeight="750">
            {isKm ? 'វិធីដោះស្រាយទាំង ៣' : '3 Resolution Methods:'}
          </text>
          <text x="630" y="222" textAnchor="middle" fill="#C83B45" fontSize="10">
            {isKm ? '១. ដាក់ជាកត្តាសម្រួល (x - c)' : '1. Factor & cancel (x - c)'}
          </text>
          <text x="630" y="240" textAnchor="middle" fill="#C83B45" fontSize="10">
            {isKm ? '២. គុណកន្សោមឆ្លាស់' : '2. Rationalize conjugate'}
          </text>
          <text x="630" y="258" textAnchor="middle" fill="#C83B45" fontSize="10" fontWeight="600">
            {isKm ? "៣. ក្បួនឡូពីតាល់ L'Hopital" : "3. L'Hopital: lim f'/g'"}
          </text>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'វិធីដាក់ជាកត្តាសម្រួល' : 'Factoring Cancellation Example'}
          </div>
          <code className="flowchart-step-code">{'lim_{x→2} (x² - 4)/(x - 2) = lim (x + 2) = 4'}</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'វិធីគុណកន្សោមឆ្លាស់' : 'Conjugate Rationalization Example'}
          </div>
          <code className="flowchart-step-code">(√x - 2)/(x - 4) × (√x + 2)/(√x + 2) = 1/(√x + 2) → 1/4</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   12. Integration Techniques Decision Flowchart
   ------------------------------------------------------------------------- */
function IntegrationFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញវិធីសាស្ត្រគណនាអាំងតេក្រាល (Integration Strategy Flowchart)'
            : 'Integration Techniques Decision Flowchart'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'កំណត់ទម្រង់កន្សោមក្រោមអាំងតេក្រាល ៖ រូបមន្តផ្ទាល់ អាំងតេក្រាលដោយប្តូរអថេរ (u-sub) ឬអាំងតេក្រាលដោយផ្នែក (by parts)។'
            : 'Identify the integrand structure: basic standard formulas, u-substitution for composite functions, or integration by parts for function products.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 320"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញអាំងតេក្រាល' : 'Integration techniques decision flowchart'}
        >
          <defs>
            <marker id="int-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#2457A7" />
            </marker>
          </defs>

          <rect x="10" y="10" width="740" height="300" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Root */}
          <rect x="250" y="20" width="260" height="36" rx="6" fill="#102A56" />
          <text x="380" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
            {isKm ? 'គណនាអាំងតេក្រាល ៖ ∫ f(x) dx' : 'Evaluate Integral: ∫ f(x) dx'}
          </text>

          <line x1="380" y1="56" x2="380" y2="80" stroke="#64748B" strokeWidth="2" markerEnd="url(#int-arrow)" />

          {/* 3 Technique Branches */}
          <path d="M 130 80 L 630 80" stroke="#64748B" strokeWidth="1.8" />
          <line x1="130" y1="80" x2="130" y2="100" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#int-arrow)" />
          <line x1="380" y1="80" x2="380" y2="100" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#int-arrow)" />
          <line x1="630" y1="80" x2="630" y2="100" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#int-arrow)" />

          {/* Branch 1: Basic Formulas */}
          <rect x="35" y="102" width="190" height="135" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="130" y="125" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="800">
            {isKm ? '១. រូបមន្តគ្រឹះផ្ទាល់' : '1. Standard Basic Rule'}
          </text>
          <text x="130" y="148" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="700">
            ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C
          </text>
          <text x="130" y="170" textAnchor="middle" fill="#047857" fontSize="11">
            ∫ eˣ dx = eˣ + C
          </text>
          <text x="130" y="192" textAnchor="middle" fill="#047857" fontSize="11">
            ∫ (1/x) dx = ln|x| + C
          </text>
          <text x="130" y="214" textAnchor="middle" fill="#065F46" fontSize="10">
            {isKm ? 'ប្រើភ្លាមៗតាមតារាង' : 'Direct lookup from table'}
          </text>

          {/* Branch 2: u-sub */}
          <rect x="285" y="102" width="190" height="135" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="125" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="800">
            {isKm ? '២. ប្តូរអថេរ u-Substitution' : '2. u-Substitution'}
          </text>
          <text x="380" y="148" textAnchor="middle" fill="#2457A7" fontSize="11" fontWeight="700">
            ∫ f(g(x)) · g'(x) dx
          </text>
          <text x="380" y="170" textAnchor="middle" fill="#102A56" fontSize="10">
            {isKm ? "តាង u = g(x) ⟹ du = g'(x)dx" : "Let u = g(x) ⟹ du = g'(x)dx"}
          </text>
          <text x="380" y="192" textAnchor="middle" fill="#2457A7" fontSize="11" fontWeight="700">
            = ∫ f(u) du
          </text>
          <text x="380" y="214" textAnchor="middle" fill="#102A56" fontSize="10">
            {isKm ? 'ពេលកន្សោមមានដេរីវេរបស់វា' : 'When derivative is present'}
          </text>

          {/* Branch 3: By Parts */}
          <rect x="535" y="102" width="190" height="135" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <text x="630" y="125" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="800">
            {isKm ? '៣. អាំងតេក្រាលដោយផ្នែក' : '3. Integration by Parts'}
          </text>
          <text x="630" y="148" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">
            ∫ u dv = u·v - ∫ v du
          </text>
          <text x="630" y="170" textAnchor="middle" fill="#92400E" fontSize="10">
            {isKm ? 'ផលគុណនៃអនុគមន៍ពីរគ្រួសារ' : 'Product of dissimilar functions'}
          </text>
          <text x="630" y="192" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">
            LIATE Priority for u
          </text>
          <text x="630" y="214" textAnchor="middle" fill="#92400E" fontSize="10">
            Log &gt; InvTrig &gt; Alg &gt; Trig &gt; Exp
          </text>

          {/* Bottom Banner: FTC */}
          <rect x="80" y="250" width="600" height="34" rx="6" fill="#102A56" />
          <text x="380" y="272" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="750">
            {isKm
              ? 'ទ្រឹស្តីបទគ្រឹះនៃការគណនា ៖ ∫ₐᵇ f(x) dx = F(b) - F(a) = ក្រឡាផ្ទៃសុទ្ធក្រោមក្រាហ្វ'
              : 'Fundamental Theorem of Calculus: ∫ₐᵇ f(x) dx = F(b) - F(a) = Net Area Under Curve'}
          </text>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'ក្បួន LIATE ជ្រើសរើស u' : 'LIATE Rule for Integration by Parts'}
          </div>
          <p className="flowchart-step-rule">
            {isKm
              ? 'លំដាប់អាទិភាពដើម្បីជ្រើសរើស u ៖ Logarithm → Inverse Trig → Algebraic → Trigonometric → Exponential។'
              : 'Priority order to select u: Logarithmic → Inverse Trig → Algebraic → Trigonometric → Exponential.'}
          </p>
          <code className="flowchart-step-code">∫ x·eˣ dx : u = x, dv = eˣ dx ⟹ x·eˣ - eˣ + C</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'អាំងតេក្រាលកំណត់ និងក្រឡាផ្ទៃ' : 'Definite Integral & Area Interpretation'}
          </div>
          <p className="flowchart-step-rule">
            {isKm
              ? 'ក្រឡាផ្ទៃរវាងខ្សែកោង f(x) ≥ g(x) លើចន្លោះ [a, b] គឺ A = ∫ₐᵇ [f(x) - g(x)] dx។'
              : 'The area between curves f(x) ≥ g(x) on interval [a, b] is A = ∫ₐᵇ [f(x) - g(x)] dx.'}
          </p>
          <code className="flowchart-step-code">Area = ∫ₐᵇ [f(x) - g(x)] dx ≥ 0</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   13. Permutations vs. Combinations Decision Flowchart
   ------------------------------------------------------------------------- */
function PermutationsCombinationsFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញជ្រើសរើសចម្លាស់ ឬបន្សំ (Permutations vs Combinations Flowchart)'
            : 'Permutations vs. Combinations Decision Flowchart'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ជ្រើសរើស r វត្ថុពីចំណោម n វត្ថុខុសៗគ្នា៖ សួរខ្លួនឯងថាតើ «លំដាប់លំដោយសំខាន់ ឬអត់?» ដើម្បីជ្រើសរើស P(n, r) ឬ C(n, r)។'
            : 'Selecting r items from n distinct objects: ask yourself "Does ORDER matter?" to choose between P(n, r) and C(n, r).'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 290"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញចម្លាស់និងបន្សំ' : 'Permutations vs combinations decision flowchart'}
        >
          <defs>
            <marker id="perm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#2457A7" />
            </marker>
          </defs>

          <rect x="10" y="10" width="740" height="270" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Top Node */}
          <rect x="220" y="20" width="320" height="36" rx="6" fill="#102A56" />
          <text x="380" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
            {isKm ? 'ជ្រើសរើស r វត្ថុ ពីចំណោម n វត្ថុខុសៗគ្នា' : 'Selecting r items from n distinct objects'}
          </text>

          <line x1="380" y1="56" x2="380" y2="76" stroke="#64748B" strokeWidth="2" markerEnd="url(#perm-arrow)" />

          {/* Decision Node */}
          <polygon points="380,78 490,105 380,132 270,105" fill="#F0F4FA" stroke="#2457A7" strokeWidth="2" />
          <text x="380" y="109" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="800">
            {isKm ? 'តើលំដាប់សំខាន់ទេ?' : 'Does ORDER matter?'}
          </text>

          {/* Left: YES (Permutations) */}
          <line x1="270" y1="105" x2="200" y2="105" stroke="#64748B" strokeWidth="1.8" />
          <line x1="200" y1="105" x2="200" y2="135" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#perm-arrow)" />
          <text x="225" y="100" fill="#047857" fontSize="12" fontWeight="800">{isKm ? 'បាទ/ចាស (YES)' : 'YES'}</text>

          <rect x="50" y="138" width="300" height="120" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="200" y="162" textAnchor="middle" fill="#065F46" fontSize="13" fontWeight="800">
            {isKm ? 'ចម្លាស់ ៖ Permutations P(n, r)' : 'Permutations: P(n, r)'}
          </text>
          <text x="200" y="184" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="750">
            P(n, r) = n! / (n - r)!
          </text>
          <text x="200" y="206" textAnchor="middle" fill="#065F46" fontSize="10">
            {isKm ? 'ពាក្យគន្លឹះ ៖ រៀបលំដាប់ ចំណាត់ថ្នាក់ លេខកូដ សម្ងាត់' : 'Keywords: arrange, order, rank, password, line up'}
          </text>
          <rect x="70" y="218" width="260" height="24" rx="4" fill="#FFFFFF" stroke="#10B981" />
          <text x="200" y="234" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="700">
            {isKm ? 'ឧ. រង្វាន់លេខ ១, ២, ៣ ក្នុងចំណោម ៨ នាក់ = P(8, 3) = 336' : 'e.g. 1st, 2nd, 3rd place from 8 runners = P(8, 3) = 336'}
          </text>

          {/* Right: NO (Combinations) */}
          <line x1="490" y1="105" x2="560" y2="105" stroke="#64748B" strokeWidth="1.8" />
          <line x1="560" y1="105" x2="560" y2="135" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#perm-arrow)" />
          <text x="505" y="100" fill="#92400E" fontSize="12" fontWeight="800">{isKm ? 'ទេ (NO)' : 'NO'}</text>

          <rect x="410" y="138" width="300" height="120" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <text x="560" y="162" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="800">
            {isKm ? 'បន្សំ ៖ Combinations C(n, r)' : 'Combinations: C(n, r) = nCr'}
          </text>
          <text x="560" y="184" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="750">
            C(n, r) = n! / [r! · (n - r)!]
          </text>
          <text x="560" y="206" textAnchor="middle" fill="#92400E" fontSize="10">
            {isKm ? 'ពាក្យគន្លឹះ ៖ ជ្រើសរើស បង្កើតក្រុម គណៈកម្មការ បៀ' : 'Keywords: select, choose, team, committee, hand'}
          </text>
          <rect x="430" y="218" width="260" height="24" rx="4" fill="#FFFFFF" stroke="#D6A84B" />
          <text x="560" y="234" textAnchor="middle" fill="#B45309" fontSize="10" fontWeight="700">
            {isKm ? 'ឧ. ជ្រើសរើសគណៈកម្មការ ៣ នាក់ពី ៨ នាក់ = C(8, 3) = 56' : 'e.g. Choose 3-person committee from 8 = C(8, 3) = 56'}
          </text>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'គោលការណ៍ផលគុណនៃការរាប់' : 'Fundamental Counting Principle'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'បើកិច្ចការទី១ ធ្វើបាន m របៀប និងកិច្ចការទី២ ធ្វើបាន n របៀប នោះកិច្ចការទាំងពីរធ្វើបាន m × n របៀប។' : 'If task 1 has m outcomes and task 2 has n outcomes, together there are m × n outcomes.'}
          </p>
          <code className="flowchart-step-code">Total Ways = n₁ × n₂ × ... × n_k</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'លក្ខណៈស៊ីមេទ្រីនៃបន្សំ' : 'Symmetry of Combinations'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'ជ្រើសរើស r វត្ថុ មានចំនួនវិធីស្មើគ្នានឹងការទុកចោល (n - r) វត្ថុ។' : 'Choosing r items is identical to leaving behind (n - r) items.'}
          </p>
          <code className="flowchart-step-code">C(n, r) = C(n, n - r) | C(10, 8) = C(10, 2) = 45</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   14. Normal Distribution & Empirical Rule (68-95-99.7%)
   ------------------------------------------------------------------------- */
function NormalDistributionDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'បំណែងចែកប្រក្រតី និងក្បួនពិសោធន៍ ៦៨-៩៥-៩៩.៧% (Normal Distribution & Empirical Rule)'
            : 'Normal Distribution & Empirical Rule (68–95–99.7%)'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ខ្សែរាងកណ្តឹងស៊ីមេទ្រីធៀបនឹងមធ្យមភាគ μ៖ ៦៨.៣% ក្នុងចន្លោះ ±១σ, ៩៥.៥% ក្នុងចន្លោះ ±២σ, ៩៩.៧% ក្នុងចន្លោះ ±៣σ។'
            : 'Symmetric bell curve centered at mean μ: 68.3% lies within ±1σ, 95.5% within ±2σ, and 99.7% within ±3σ.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 280"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមបំណែងចែកប្រក្រតី' : 'Normal distribution bell curve and empirical rule'}
        >
          <rect x="10" y="10" width="740" height="260" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Center line and axes */}
          {/* Base axis at y = 200 */}
          <line x1="50" y1="200" x2="710" y2="200" stroke="#17263D" strokeWidth="2" />

          {/* Shaded regions under bell curve:
              Mean μ at x = 380, σ = 80px
              μ-3σ = 140, μ-2σ = 220, μ-σ = 300, μ = 380, μ+σ = 460, μ+2σ = 540, μ+3σ = 620
          */}
          {/* Shaded ±1σ (300 to 460): 68.3% */}
          <polygon
            points="300,200 300,126 340,78 380,60 420,78 460,126 460,200"
            fill="#EAF2FF"
            stroke="none"
          />
          {/* Shaded ±2σ wings (220 to 300 and 460 to 540): 13.6% each */}
          <polygon
            points="220,200 220,178 260,158 300,126 300,200"
            fill="#ECFDF5"
            stroke="none"
          />
          <polygon
            points="460,200 460,126 500,158 540,178 540,200"
            fill="#ECFDF5"
            stroke="none"
          />

          {/* The Gaussian Bell Path */}
          <path
            d="M 60 199 C 140 198 220 180 300 126 C 340 78 360 60 380 60 C 400 60 420 78 460 126 C 540 180 620 198 700 199"
            fill="none"
            stroke="#2457A7"
            strokeWidth="3"
          />

          {/* Mean center line */}
          <line x1="380" y1="60" x2="380" y2="200" stroke="#C83B45" strokeWidth="2" strokeDasharray="4 2" />

          {/* Area labels */}
          <text x="380" y="115" textAnchor="middle" fill="#102A56" fontSize="14" fontWeight="800">68.27%</text>
          <text x="380" y="132" textAnchor="middle" fill="#2457A7" fontSize="10">μ ± 1σ</text>

          <text x="260" y="175" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">13.6%</text>
          <text x="500" y="175" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">13.6%</text>

          <text x="180" y="190" textAnchor="middle" fill="#B45309" fontSize="10">2.1%</text>
          <text x="580" y="190" textAnchor="middle" fill="#B45309" fontSize="10">2.1%</text>

          {/* Ticks and labels on x-axis */}
          {[
            { x: 140, label: 'μ - 3σ' },
            { x: 220, label: 'μ - 2σ' },
            { x: 300, label: 'μ - 1σ' },
            { x: 380, label: 'μ (Mean)' },
            { x: 460, label: 'μ + 1σ' },
            { x: 540, label: 'μ + 2σ' },
            { x: 620, label: 'μ + 3σ' },
          ].map((item) => (
            <g key={item.x}>
              <line x1={item.x} y1="196" x2={item.x} y2="206" stroke="#17263D" strokeWidth="1.5" />
              <text x={item.x} y="222" textAnchor="middle" fill="#17263D" fontSize="10" fontWeight="700">
                {item.label}
              </text>
            </g>
          ))}

          {/* Z-Score formula pill */}
          <rect x="270" y="235" width="220" height="24" rx="12" fill="#102A56" />
          <text x="380" y="251" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
            Z-Score: z = (x - μ) / σ
          </text>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'លក្ខណៈគ្រឹះនៃខ្សែកោងកណ្តឹង' : 'Key Bell Curve Properties'}
          </div>
          <p className="flowchart-step-rule">
            {isKm
              ? 'ស៊ីមេទ្រីជុំវិញ μ (មធ្យម = មេដ្យាន = ម៉ូដ) និងក្រឡាផ្ទៃសរុបស្មើ ១.០ (១០០%)។'
              : 'Symmetric about mean μ (Mean = Median = Mode); total area under curve equals 1.0 (100%).'}
          </p>
          <code className="flowchart-step-code">P(μ - 2σ ≤ X ≤ μ + 2σ) ≈ 0.9545</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'ពិន្ទុស្តង់ដារ Z-Score' : 'Standard Normal Distribution Z ~ N(0, 1)'}
          </div>
          <p className="flowchart-step-rule">
            {isKm
              ? 'z បង្ហាញពីចំនួនគម្លាតស្តង់ដារដែលទិន្នន័យ x ស្ថិតនៅឆ្ងាយពីមធ្យមភាគ μ។'
              : 'z indicates how many standard deviations data point x lies above or below mean μ.'}
          </p>
          <code className="flowchart-step-code">z = (x - μ) / σ | x = μ + z·σ</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   15. Arithmetic vs. Geometric Sequences Decision Flowchart
   ------------------------------------------------------------------------- */
function SequencesSeriesFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'គំនូសបំព្រួញស្វ៊ីតនព្វន្ត និងស្វ៊ីតធរណីមាត្រ (Arithmetic vs Geometric Sequences)'
            : 'Arithmetic vs. Geometric Sequences Decision Flowchart'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ពិនិត្យទំនាក់ទំនងរវាងតួបន្ទាប់បន្ទាប់៖ បើផលដកថេរជាស្វ៊ីតនព្វន្ត (d)។ បើផលធៀបថេរជាស្វ៊ីតធរណីមាត្រ (r)។'
            : 'Compare consecutive terms: constant difference implies an Arithmetic Sequence (d), while constant ratio implies a Geometric Sequence (r).'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 300"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញស្វ៊ីតនព្វន្តនិងធរណីមាត្រ' : 'Arithmetic vs geometric sequences flowchart'}
        >
          <defs>
            <marker id="seq-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#2457A7" />
            </marker>
          </defs>

          <rect x="10" y="10" width="740" height="280" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Root Node */}
          <rect x="220" y="20" width="320" height="36" rx="6" fill="#102A56" />
          <text x="380" y="43" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
            {isKm ? 'ស្វ៊ីតចំនួន ៖ a₁, a₂, a₃, ..., aₙ' : 'Given Sequence: a₁, a₂, a₃, ..., aₙ'}
          </text>

          <line x1="380" y1="56" x2="380" y2="76" stroke="#64748B" strokeWidth="2" markerEnd="url(#seq-arrow)" />

          {/* Decision Node */}
          <rect x="180" y="76" width="400" height="36" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="99" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="750">
            {isKm ? 'ពិនិត្យទំនាក់ទំនងរវាងពីរតួជាប់គ្នា aₙ₊₁ និង aₙ' : 'Test Relationship Between Consecutive Terms'}
          </text>

          {/* 2 Branches */}
          <line x1="380" y1="112" x2="380" y2="135" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 200 135 L 560 135" stroke="#64748B" strokeWidth="1.8" />
          <line x1="200" y1="135" x2="200" y2="152" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#seq-arrow)" />
          <line x1="560" y1="135" x2="560" y2="152" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#seq-arrow)" />

          {/* Left: Arithmetic */}
          <rect x="50" y="154" width="300" height="120" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="200" y="176" textAnchor="middle" fill="#065F46" fontSize="13" fontWeight="800">
            {isKm ? 'ស្វ៊ីតនព្វន្ត Arithmetic (d)' : 'Arithmetic Sequence (d)'}
          </text>
          <text x="200" y="196" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">
            {isKm ? 'ផលសងរួមថេរ ៖ d = aₙ₊₁ - aₙ' : 'Constant Difference: d = aₙ₊₁ - aₙ'}
          </text>
          <rect x="65" y="206" width="270" height="24" rx="4" fill="#FFFFFF" stroke="#10B981" />
          <text x="200" y="222" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="700">
            aₙ = a₁ + (n - 1)d
          </text>
          <text x="200" y="246" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="600">
            Sₙ = n/2 · (a₁ + aₙ) = n/2 · [2a₁ + (n - 1)d]
          </text>

          {/* Right: Geometric */}
          <rect x="410" y="154" width="300" height="120" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
          <text x="560" y="176" textAnchor="middle" fill="#102A56" fontSize="13" fontWeight="800">
            {isKm ? 'ស្វ៊ីតធរណីមាត្រ Geometric (r)' : 'Geometric Sequence (r)'}
          </text>
          <text x="560" y="196" textAnchor="middle" fill="#2457A7" fontSize="11" fontWeight="700">
            {isKm ? 'ផលធៀបរួមថេរ ៖ r = aₙ₊₁ / aₙ' : 'Constant Ratio: r = aₙ₊₁ / aₙ'}
          </text>
          <rect x="425" y="206" width="270" height="24" rx="4" fill="#FFFFFF" stroke="#2457A7" />
          <text x="560" y="222" textAnchor="middle" fill="#102A56" fontSize="11" fontWeight="700">
            aₙ = a₁ · rⁿ⁻¹
          </text>
          <text x="560" y="246" textAnchor="middle" fill="#2457A7" fontSize="10" fontWeight="600">
            Sₙ = a₁(1 - rⁿ) / (1 - r) &nbsp;|&nbsp; S_∞ = a₁ / (1 - r) (|r| &lt; 1)
          </text>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'មធ្យมนព្វន្ត (Arithmetic Mean)' : 'Arithmetic Mean Property'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'បើ a, b, c ជាបីតួជាប់គ្នានៃស្វ៊ីតនព្វន្ត នោះ b = (a + c) / 2។' : 'If a, b, c are consecutive terms of an arithmetic sequence, then b = (a + c) / 2.'}
          </p>
          <code className="flowchart-step-code">2b = a + c ⟺ b = (a + c) / 2</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'មធ្យមធរណីមាត្រ (Geometric Mean)' : 'Geometric Mean Property'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'បើ a, b, c ជាបីតួជាប់គ្នានៃស្វ៊ីតធរណីមាត្រ នោះ b² = a · c។' : 'If a, b, c are consecutive terms of a geometric sequence, then b² = a · c.'}
          </p>
          <code className="flowchart-step-code">b² = a × c ⟺ b = √(a × c)</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   16. Circle Theorems Visual Guide & Tangent Properties
   ------------------------------------------------------------------------- */
function CircleTheoremsDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'ទ្រឹស្តីបទមុំក្នុងរង្វង់ និងបន្ទាត់ប៉ះ (Key Circle Theorems & Tangents)'
            : 'Key Circle Theorems & Tangent Properties'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'មុំផ្ចិតស្មើពីរដងមុំចារឹកក្នុងរង្វង់ មុំចារឹកក្នុងកន្លះរង្វង់ស្មើ ៩០° និងកាំកែងនឹងបន្ទាត់ប៉ះត្រង់ចំណុចប៉ះ។'
            : 'Central angle is twice the inscribed angle subtending the same arc; angle in a semicircle is 90°; radius is perpendicular to the tangent line.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 270"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមទ្រឹស្តីបទរង្វង់' : 'Circle theorems geometric diagram'}
        >
          <rect x="10" y="10" width="740" height="250" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Panel 1: Inscribed Angle Theorem */}
          <g transform="translate(30, 25)">
            <rect x="0" y="0" width="220" height="220" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="110" y="24" textAnchor="middle" fill="#102A56" fontSize="11" fontWeight="800">
              {isKm ? '១. មុំផ្ចិត = ២ × មុំចារឹក' : '1. Inscribed Angle Theorem'}
            </text>

            {/* Circle center at (110, 120), r=60 */}
            <circle cx="110" cy="120" r="56" fill="none" stroke="#2457A7" strokeWidth="2" />
            <circle cx="110" cy="120" r="3" fill="#102A56" />
            <text x="116" y="125" fill="#102A56" fontSize="10">O</text>

            {/* Arc points A(70, 160), B(150, 160), C(110, 64) */}
            <line x1="70" y1="160" x2="110" y2="120" stroke="#D6A84B" strokeWidth="1.8" />
            <line x1="150" y1="160" x2="110" y2="120" stroke="#D6A84B" strokeWidth="1.8" />
            <line x1="70" y1="160" x2="110" y2="64" stroke="#C83B45" strokeWidth="1.8" />
            <line x1="150" y1="160" x2="110" y2="64" stroke="#C83B45" strokeWidth="1.8" />

            <circle cx="70" cy="160" r="3.5" fill="#2457A7" />
            <text x="60" y="172" fill="#2457A7" fontSize="10" fontWeight="700">A</text>
            <circle cx="150" cy="160" r="3.5" fill="#2457A7" />
            <text x="156" y="172" fill="#2457A7" fontSize="10" fontWeight="700">B</text>
            <circle cx="110" cy="64" r="3.5" fill="#C83B45" />
            <text x="110" y="56" textAnchor="middle" fill="#C83B45" fontSize="10" fontWeight="700">C (θ)</text>

            <rect x="25" y="186" width="170" height="22" rx="4" fill="#EAF2FF" />
            <text x="110" y="201" textAnchor="middle" fill="#2457A7" fontSize="10" fontWeight="750">
              ∠AOB = 2 × ∠ACB (2θ)
            </text>
          </g>

          {/* Panel 2: Thales' Semicircle Theorem */}
          <g transform="translate(270, 25)">
            <rect x="0" y="0" width="220" height="220" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="110" y="24" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="800">
              {isKm ? '២. មុំក្នុងកន្លះរង្វង់ (៩០°)' : '2. Angle in a Semicircle (90°)'}
            </text>

            {/* Circle */}
            <circle cx="110" cy="120" r="56" fill="none" stroke="#10B981" strokeWidth="2" />
            <circle cx="110" cy="120" r="3" fill="#065F46" />
            <text x="110" y="135" textAnchor="middle" fill="#065F46" fontSize="10">O</text>

            {/* Diameter AB: A(54, 120), B(166, 120) */}
            <line x1="54" y1="120" x2="166" y2="120" stroke="#10B981" strokeWidth="2.5" />
            <circle cx="54" cy="120" r="3.5" fill="#10B981" />
            <text x="46" y="124" fill="#065F46" fontSize="10" fontWeight="700">A</text>
            <circle cx="166" cy="120" r="3.5" fill="#10B981" />
            <text x="174" y="124" fill="#065F46" fontSize="10" fontWeight="700">B</text>

            {/* Point C(135, 71) on circle */}
            <line x1="54" y1="120" x2="135" y2="71" stroke="#102A56" strokeWidth="1.8" />
            <line x1="166" y1="120" x2="135" y2="71" stroke="#102A56" strokeWidth="1.8" />
            <circle cx="135" cy="71" r="3.5" fill="#C83B45" />
            <text x="142" y="65" fill="#C83B45" fontSize="10" fontWeight="700">C</text>

            {/* Right angle mark at C */}
            <rect x="25" y="186" width="170" height="22" rx="4" fill="#ECFDF5" />
            <text x="110" y="201" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="750">
              AB = អង្កត់ផ្ចិត ⟹ ∠ACB = 90°
            </text>
          </g>

          {/* Panel 3: Tangent Perpendicular to Radius */}
          <g transform="translate(510, 25)">
            <rect x="0" y="0" width="220" height="220" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="110" y="24" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="800">
              {isKm ? '៣. កាំកែងនឹងបន្ទាត់ប៉ះ' : '3. Tangent ⊥ Radius'}
            </text>

            <circle cx="110" cy="110" r="52" fill="none" stroke="#D6A84B" strokeWidth="2" />
            <circle cx="110" cy="110" r="3" fill="#92400E" />
            <text x="118" y="114" fill="#92400E" fontSize="10">O</text>

            {/* Radius to point P(110, 162) */}
            <line x1="110" y1="110" x2="110" y2="162" stroke="#2457A7" strokeWidth="2" />
            <circle cx="110" cy="162" r="3.5" fill="#C83B45" />
            <text x="118" y="160" fill="#C83B45" fontSize="10" fontWeight="700">P</text>

            {/* Tangent line at y=162 from x=40 to 180 */}
            <line x1="40" y1="162" x2="180" y2="162" stroke="#C83B45" strokeWidth="2.5" />
            <text x="182" y="166" fill="#C83B45" fontSize="10" fontWeight="700">Tangent</text>

            {/* Right angle box at P */}
            <path d="M 110 152 L 120 152 L 120 162" fill="none" stroke="#102A56" strokeWidth="1.5" />

            <rect x="25" y="186" width="170" height="22" rx="4" fill="#FFFBEB" />
            <text x="110" y="201" textAnchor="middle" fill="#92400E" fontSize="10" fontWeight="750">
              OP ⊥ បន្ទាត់ប៉ះ (∠OPT = 90°)
            </text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'ចតុកោណចារឹកក្នុងរង្វង់' : 'Cyclic Quadrilateral Theorem'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'ផលបូកមុំឈមនៃចតុកោណចារឹកក្នុងរង្វង់ស្មើ ១៨០° ជានិច្ច។' : 'Opposite angles of a cyclic quadrilateral always sum to 180°.'}
          </p>
          <code className="flowchart-step-code">∠A + ∠C = 180° &nbsp;|&nbsp; ∠B + ∠D = 180°</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'ប្រវែងបន្ទាត់ប៉ះគូសពីចំណុចក្រៅ' : 'Tangents from an External Point'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'បន្ទាត់ប៉ះទាំងពីរគូសពីចំណុច P ខាងក្រៅទៅកាន់រង្វង់មានប្រវែងស្មើគ្នា (PA = PB)។' : 'Two tangents drawn from external point P to a circle are equal in length (PA = PB).'}
          </p>
          <code className="flowchart-step-code">PA = PB &nbsp;(Right Triangles ΔOAP ≅ ΔOBP)</code>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   17. Exponents & Logarithms Conversion & Laws Flowchart
   ------------------------------------------------------------------------- */
function ExponentsLogarithmsFlowchart({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'ទំនាក់ទំនងស្វ័យគុណ និងលោការីត (Exponents & Logarithms Conversion & Laws)'
            : 'Exponential & Logarithmic Equivalence & Laws'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'លោការីតគឺជាប្រតិបត្តិការបញ្ច្រាសនៃស្វ័យគុណ៖ bʸ = x ⟺ log_b(x) = y (b > 0, b ≠ 1, x > 0)។'
            : 'Logarithms are the inverse operations of exponentiation: bʸ = x ⟺ log_b(x) = y (b > 0, b ≠ 1, x > 0).'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 280"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមស្វ័យគុណនិងលោការីត' : 'Exponential and logarithmic equivalence and laws'}
        >
          <defs>
            <marker id="log-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#2457A7" />
            </marker>
          </defs>

          <rect x="10" y="10" width="740" height="260" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: The Equivalence Bridge */}
          <g transform="translate(30, 25)">
            <rect x="0" y="10" width="320" height="200" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="160" y="36" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ស្ពានបំលែងទម្រង់ (Equivalence Bridge)' : 'Equivalence Bridge'}
            </text>

            {/* Exponential form */}
            <rect x="30" y="52" width="260" height="42" rx="6" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.2" />
            <text x="160" y="77" textAnchor="middle" fill="#102A56" fontSize="15" fontWeight="800">
              bʸ = x
            </text>

            {/* Double Arrow with labels */}
            <path d="M 120 102 L 120 120" stroke="#64748B" strokeWidth="2" markerEnd="url(#log-arrow)" />
            <path d="M 200 120 L 200 102" stroke="#64748B" strokeWidth="2" markerEnd="url(#log-arrow)" />
            <text x="160" y="115" textAnchor="middle" fill="#D6A84B" fontSize="13" fontWeight="800">⟺</text>

            {/* Logarithmic form */}
            <rect x="30" y="126" width="260" height="42" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.2" />
            <text x="160" y="151" textAnchor="middle" fill="#065F46" fontSize="15" fontWeight="800">
              log_b(x) = y
            </text>

            {/* Domain condition */}
            <rect x="30" y="174" width="260" height="24" rx="4" fill="#F0F4FA" />
            <text x="160" y="190" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
              {isKm ? 'លក្ខខណ្ឌ ៖ គោល b &gt; 0, b ≠ 1 និង x &gt; 0' : 'Restrictions: Base b &gt; 0, b ≠ 1, and x &gt; 0'}
            </text>
          </g>

          {/* Right panel: 4 Core Logarithm Laws */}
          <g transform="translate(380, 25)">
            <rect x="0" y="10" width="350" height="200" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="175" y="34" textAnchor="middle" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ច្បាប់គ្រឹះទាំង ៤ នៃលោការីត (4 Core Laws)' : '4 Fundamental Logarithm Laws'}
            </text>

            {/* Law 1: Product */}
            <rect x="15" y="44" width="320" height="34" rx="5" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1" />
            <text x="25" y="65" fill="#102A56" fontSize="11" fontWeight="750">
              ១. ផលគុណ ៖ log_b(M · N) = log_b(M) + log_b(N)
            </text>

            {/* Law 2: Quotient */}
            <rect x="15" y="84" width="320" height="34" rx="5" fill="#ECFDF5" stroke="#10B981" strokeWidth="1" />
            <text x="25" y="105" fill="#065F46" fontSize="11" fontWeight="750">
              ២. ផលចែក ៖ log_b(M / N) = log_b(M) - log_b(N)
            </text>

            {/* Law 3: Power */}
            <rect x="15" y="124" width="320" height="34" rx="5" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1" />
            <text x="25" y="145" fill="#92400E" fontSize="11" fontWeight="750">
              ៣. ស្វ័យគុណ ៖ log_b(Mᵏ) = k · log_b(M)
            </text>

            {/* Law 4: Change of Base */}
            <rect x="15" y="164" width="320" height="38" rx="5" fill="#FDF2F3" stroke="#F87171" strokeWidth="1" />
            <text x="25" y="187" fill="#991B1B" fontSize="11" fontWeight="750">
              ៤. ប្តូរគោល ៖ log_b(A) = ln(A) / ln(b) = log(A) / log(b)
            </text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'លោការីតនេពែ (Natural Logarithm ln)' : 'Natural Logarithm ln(x) = log_e(x)'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'លោការីតគោល e (e ≈ 2.71828) ៖ ln(e) = 1, ln(1) = 0, និង eˡⁿ⁽ˣ⁾ = x។' : 'Base e logarithm (e ≈ 2.71828): ln(e) = 1, ln(1) = 0, and e^{ln(x)} = x.'}
          </p>
          <code className="flowchart-step-code">ln(eˣ) = x &nbsp;|&nbsp; eˡⁿ⁽ˣ⁾ = x &nbsp;(x &gt; 0)</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'ស្វ័យគុណអវិជ្ជមាន និងប្រភាគ' : 'Negative & Fractional Exponent Rules'}
          </div>
          <p className="flowchart-step-rule">
            {isKm ? 'ស្វ័យគុណអវិជ្ជមានប្តូរជាផលចែក ស្វ័យគុណប្រភាគប្តូរជារ៉ាឌីកាល់ឫស។' : 'Negative exponents become reciprocals; fractional exponents become radicals.'}
          </p>
          <code className="flowchart-step-code">b⁻ⁿ = 1/bⁿ &nbsp;|&nbsp; b^(m/n) = ⁿ√(bᵐ)</code>
        </div>
      </div>
    </div>
  )
}


/* -------------------------------------------------------------------------
   18. Cartesian Plane 4-Quadrant & Point Coordinates Explorer
   ------------------------------------------------------------------------- */
function CartesianPlaneExplorerDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'ប្លង់កូអរដោនេដេកាត និងការកំណត់ទីតាំងចំណុច (The Cartesian Plane & Point Coordinates)'
            : 'The Cartesian Plane & Point Coordinates Explorer'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'អ័ក្សផ្ដេក (x) និងអ័ក្សឈរ (y) កាត់គ្នាត្រង់គល់ O(0, 0) បែងចែកប្លង់ជា ៤ ចតុកោណ (Quadrants I, II, III, IV)។ គ្រប់ចំណុចមានអាសយដ្ឋានកូអរដោនេ (x, y)។'
            : 'The horizontal x-axis and vertical y-axis meet at origin O(0, 0), dividing the plane into 4 quadrants. Every point has a unique coordinate address (x, y).'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 380"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមប្លង់កូអរដោនេដេកាត' : 'Cartesian plane four quadrants and point coordinates diagram'}
        >
          <defs>
            <marker id="cp-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#17263D" />
            </marker>
            <marker id="cp-arrow-rev" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
              <path d="M 0 1 L 6 4 L 0 7 z" fill="#17263D" />
            </marker>
          </defs>

          {/* Background */}
          <rect x="10" y="10" width="740" height="360" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Realistic Cartesian Coordinate Plane */}
          {/* Origin O(0, 0) at canvas (220, 185). 1 unit = 26px */}
          <g transform="translate(25, 20)">
            {/* Graph Paper Box */}
            <rect x="10" y="10" width="416" height="320" rx="8" fill="var(--surface)" stroke="var(--line)" />

            {/* Minor & Major Grid lines: x in [-7, 7], y in [-5, 5] */}
            {[-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7].map((ux) => {
              const cx = 218 + ux * 26
              if (cx < 10 || cx > 426) return null
              return (
                <line
                  key={`gx-${ux}`}
                  x1={cx}
                  y1="10"
                  x2={cx}
                  y2="330"
                  stroke="var(--line)"
                  strokeWidth={ux === 0 ? 0 : 0.8}
                  strokeDasharray={ux % 2 === 0 ? undefined : '2 2'}
                  opacity={0.7}
                />
              )
            })}

            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((uy) => {
              const cy = 170 - uy * 26
              if (cy < 10 || cy > 330) return null
              return (
                <line
                  key={`gy-${uy}`}
                  x1="10"
                  y1={cy}
                  x2="426"
                  y2={cy}
                  stroke="var(--line)"
                  strokeWidth={uy === 0 ? 0 : 0.8}
                  strokeDasharray={uy % 2 === 0 ? undefined : '2 2'}
                  opacity={0.7}
                />
              )
            })}

            {/* Quadrant Watermark Labels */}
            <text x="325" y="55" fill="var(--muted)" fontSize="11" fontWeight="750" opacity="0.6">
              Q I (+, +)
            </text>
            <text x="110" y="55" fill="var(--muted)" fontSize="11" fontWeight="750" opacity="0.6">
              Q II (-, +)
            </text>
            <text x="110" y="295" fill="var(--muted)" fontSize="11" fontWeight="750" opacity="0.6">
              Q III (-, -)
            </text>
            <text x="325" y="295" fill="var(--muted)" fontSize="11" fontWeight="750" opacity="0.6">
              Q IV (+, -)
            </text>

            {/* Horizontal Line y = 3 (dashed teal) */}
            <line x1="10" y1="92" x2="426" y2="92" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 3" />
            <rect x="20" y="78" width="55" height="18" rx="3" fill="#CCFBF1" stroke="#0D9488" strokeWidth="0.8" />
            <text x="47" y="91" textAnchor="middle" fill="#0F766E" fontSize="9" fontWeight="700">y = 3</text>

            {/* Vertical Line x = -2 (dashed amber) */}
            <line x1="166" y1="10" x2="166" y2="330" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 3" />
            <rect x="138" y="306" width="56" height="18" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.8" />
            <text x="166" y="319" textAnchor="middle" fill="#B45309" fontSize="9" fontWeight="700">x = -2</text>

            {/* Main Axes */}
            {/* X-Axis */}
            <line
              x1="18"
              y1="170"
              x2="418"
              y2="170"
              stroke="#17263D"
              strokeWidth="2.5"
              markerStart="url(#cp-arrow-rev)"
              markerEnd="url(#cp-arrow)"
            />
            {/* Y-Axis */}
            <line
              x1="218"
              y1="322"
              x2="218"
              y2="18"
              stroke="#17263D"
              strokeWidth="2.5"
              markerStart="url(#cp-arrow-rev)"
              markerEnd="url(#cp-arrow)"
            />
            <text x="424" y="174" fill="#17263D" fontSize="12" fontWeight="800">x</text>
            <text x="218" y="12" textAnchor="middle" fill="#17263D" fontSize="12" fontWeight="800">y</text>

            {/* X-Axis Ticks & Numbers */}
            {[-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6].map((num) => {
              const x = 218 + num * 26
              return (
                <g key={`tx-${num}`}>
                  <line x1={x} y1="166" x2={x} y2="174" stroke="#17263D" strokeWidth="1.5" />
                  <text x={x} y="186" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">
                    {num}
                  </text>
                </g>
              )
            })}

            {/* Y-Axis Ticks & Numbers */}
            {[-4, -3, -2, -1, 1, 2, 3, 4].map((num) => {
              const y = 170 - num * 26
              return (
                <g key={`ty-${num}`}>
                  <line x1="214" y1={y} x2="222" y2={y} stroke="#17263D" strokeWidth="1.5" />
                  <text x="208" y={y + 3.5} textAnchor="end" fill="#64748B" fontSize="9" fontWeight="600">
                    {num}
                  </text>
                </g>
              )
            })}

            {/* Origin O(0, 0) */}
            <circle cx="218" cy="170" r="4" fill="#17263D" />
            <text x="208" y="184" textAnchor="end" fill="#17263D" fontSize="10" fontWeight="700">O</text>

            {/* Plotted Point A(3, 4) in Q I */}
            {/* Canvas: (218 + 3*26, 170 - 4*26) = (296, 66) */}
            <line x1="296" y1="66" x2="296" y2="170" stroke="#2457A7" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="218" y1="66" x2="296" y2="66" stroke="#2457A7" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="296" cy="66" r="8" fill="rgba(36, 87, 167, 0.2)" />
            <circle cx="296" cy="66" r="4.5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="306" y="52" width="58" height="20" rx="4" fill="#2457A7" />
            <text x="335" y="66" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="750">A(3, 4)</text>

            {/* Plotted Point B(-4, 2) in Q II */}
            {/* Canvas: (218 - 4*26, 170 - 2*26) = (114, 118) */}
            <line x1="114" y1="118" x2="114" y2="170" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="218" y1="118" x2="114" y2="118" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="114" cy="118" r="8" fill="rgba(16, 185, 129, 0.2)" />
            <circle cx="114" cy="118" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="48" y="104" width="60" height="20" rx="4" fill="#10B981" />
            <text x="78" y="118" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="750">B(-4, 2)</text>

            {/* Plotted Point C(-3, -3) in Q III */}
            {/* Canvas: (218 - 3*26, 170 + 3*26) = (140, 248) */}
            <line x1="140" y1="248" x2="140" y2="170" stroke="#D6A84B" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="218" y1="248" x2="140" y2="248" stroke="#D6A84B" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="140" cy="248" r="8" fill="rgba(214, 168, 75, 0.2)" />
            <circle cx="140" cy="248" r="4.5" fill="#D6A84B" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="68" y="246" width="66" height="20" rx="4" fill="#D6A84B" />
            <text x="101" y="260" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="750">C(-3, -3)</text>

            {/* Plotted Point D(4, -3) in Q IV */}
            {/* Canvas: (218 + 4*26, 170 + 3*26) = (322, 248) */}
            <line x1="322" y1="248" x2="322" y2="170" stroke="#C83B45" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="218" y1="248" x2="322" y2="248" stroke="#C83B45" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="322" cy="248" r="8" fill="rgba(200, 59, 69, 0.2)" />
            <circle cx="322" cy="248" r="4.5" fill="#C83B45" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="332" y="246" width="62" height="20" rx="4" fill="#C83B45" />
            <text x="363" y="260" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="750">D(4, -3)</text>
          </g>

          {/* Right panel: Reference Cards */}
          <g transform="translate(470, 30)">
            {/* Card 1: 4 Quadrants */}
            <rect x="0" y="0" width="265" height="96" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="14" y="22" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ចតុកោណទាំង ៤ (Four Quadrants)' : 'The 4 Quadrants & Signs'}
            </text>
            <text x="14" y="42" fill="#2457A7" fontSize="11" fontWeight="700">
              Q I : (+, +) &nbsp;|&nbsp; x &gt; 0, y &gt; 0
            </text>
            <text x="14" y="58" fill="#047857" fontSize="11" fontWeight="700">
              Q II : (-, +) &nbsp;|&nbsp; x &lt; 0, y &gt; 0
            </text>
            <text x="14" y="74" fill="#B45309" fontSize="11" fontWeight="700">
              Q III : (-, -) &nbsp;|&nbsp; x &lt; 0, y &lt; 0
            </text>
            <text x="14" y="90" fill="#C83B45" fontSize="11" fontWeight="700">
              Q IV : (+, -) &nbsp;|&nbsp; x &gt; 0, y &lt; 0
            </text>

            {/* Card 2: Anatomy of (x, y) */}
            <rect x="0" y="108" width="265" height="104" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="14" y="130" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'រចនាសម្ព័ន្ធគូមានលំដាប់ (x, y)' : 'Anatomy of Ordered Pair (x, y)'}
            </text>
            <text x="14" y="152" fill="#2457A7" fontSize="11" fontWeight="700">
              {isKm ? 'x = អាប់ស៊ីស (Abscissa)' : 'x = Abscissa (Horizontal displacement)'}
            </text>
            <text x="14" y="168" fill="#64748B" fontSize="10">
              {isKm ? 'វិជ្ជមាន ទៅស្តាំ · អវិជ្ជមាន ទៅឆ្វេង' : 'Positive → Right | Negative → Left'}
            </text>
            <text x="14" y="188" fill="#C83B45" fontSize="11" fontWeight="700">
              {isKm ? 'y = អ័រដោនេ (Ordinate)' : 'y = Ordinate (Vertical displacement)'}
            </text>
            <text x="14" y="204" fill="#64748B" fontSize="10">
              {isKm ? 'វិជ្ជមាន ទៅលើ · អវិជ្ជមាន ចុះក្រោម' : 'Positive → Up | Negative → Down'}
            </text>

            {/* Card 3: Lines Parallel to Axes */}
            <rect x="0" y="224" width="265" height="96" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="14" y="246" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'បន្ទាត់ស្របនឹងអ័ក្ស' : 'Lines Parallel to Axes'}
            </text>
            <text x="14" y="268" fill="#0D9488" fontSize="11" fontWeight="700">
              y = b : {isKm ? 'បន្ទាត់ដេក (Horizontal)' : 'Horizontal line (Slope m = 0)'}
            </text>
            <text x="14" y="284" fill="#64748B" fontSize="10">
              {isKm ? 'កាត់អ័ក្ស y ត្រង់ (0, b)' : 'Passes through (0, b), parallel to x-axis'}
            </text>
            <text x="14" y="302" fill="#D97706" fontSize="11" fontWeight="700">
              x = a : {isKm ? 'បន្ទាត់ឈរ (Vertical)' : 'Vertical line (Slope undefined)'}
            </text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'របៀបកំណត់ទីតាំងចំណុច' : 'How to Plot Point (x, y)'}
          </div>
          <p className="flowchart-step-rule">
            {isKm
              ? 'ចាប់ផ្តើមពីគល់ O(0, 0)៖ រំកិលតាមអ័ក្ស x ចំនួន x ឯកតា រួចរំកិលឡើងលើ ឬចុះក្រោមចំនួន y ឯកតា។'
              : 'Start at origin O(0, 0): move horizontally x units, then move vertically y units.'}
          </p>
          <code className="flowchart-step-code">A(3, 4) : 3 units Right, 4 units Up</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'ចំណុចប្រសព្វលើអ័ក្ស' : 'Points on the Coordinate Axes'}
          </div>
          <p className="flowchart-step-rule">
            {isKm
              ? 'ចំណុចលើអ័ក្ស x មាន y = 0 ជានិច្ច ៖ (x, 0)។ ចំណុចលើអ័ក្ស y មាន x = 0 ជានិច្ច ៖ (0, y)។'
              : 'Points on x-axis always have y = 0: (x, 0). Points on y-axis always have x = 0: (0, y).'}
          </p>
          <code className="flowchart-step-code">x-intercept (4, 0) | y-intercept (0, -3)</code>
        </div>
      </div>
    </div>
  )
}


/* -------------------------------------------------------------------------
   19. Linear Functions Graph & Slope Analysis Diagram
   ------------------------------------------------------------------------- */
function LinearFunctionsGraphDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'ក្រាហ្វបន្ទាត់ និងមេគុណប្រាប់ទិស y = mx + b (Linear Equations & Slope)'
            : 'Linear Equations Graph & Slope Analysis (y = mx + b)'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'សមីការបន្ទាត់ y = mx + b៖ m ជាមេគុណប្រាប់ទិស (ជម្រាល = Rise / Run) និង b ជាចំណុចប្រសព្វអ័ក្ស y (0, b)។ បន្ទាត់កែងគ្នាមាន m₁ · m₂ = -1។'
            : 'Slope-intercept form y = mx + b: m is the slope (rise over run) and b is the y-intercept (0, b). Perpendicular lines satisfy m₁ · m₂ = -1.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 340"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមក្រាហ្វបន្ទាត់លីនេអ៊ែរ' : 'Linear function graph and slope triangle diagram'}
        >
          <rect x="10" y="10" width="740" height="320" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Coordinate Graph Paper */}
          {/* Origin O(0, 0) at canvas (200, 165). Scale 1 unit = 26px */}
          <g transform="translate(25, 20)">
            <rect x="10" y="10" width="380" height="280" rx="8" fill="var(--surface)" stroke="var(--line)" />

            {/* Grid */}
            {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((ux) => {
              const cx = 200 + ux * 26
              if (cx < 10 || cx > 390) return null
              return (
                <line
                  key={`lgx-${ux}`}
                  x1={cx}
                  y1="10"
                  x2={cx}
                  y2="290"
                  stroke="var(--line)"
                  strokeWidth="0.8"
                  strokeDasharray={ux % 2 === 0 ? undefined : '2 2'}
                  opacity={0.6}
                />
              )
            })}
            {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((uy) => {
              const cy = 150 - uy * 26
              if (cy < 10 || cy > 290) return null
              return (
                <line
                  key={`lgy-${uy}`}
                  x1="10"
                  y1={cy}
                  x2="390"
                  y2={cy}
                  stroke="var(--line)"
                  strokeWidth="0.8"
                  strokeDasharray={uy % 2 === 0 ? undefined : '2 2'}
                  opacity={0.6}
                />
              )
            })}

            {/* Axes */}
            <line x1="18" y1="150" x2="382" y2="150" stroke="#17263D" strokeWidth="2.2" />
            <line x1="200" y1="282" x2="200" y2="18" stroke="#17263D" strokeWidth="2.2" />
            <text x="386" y="154" fill="#17263D" fontSize="11" fontWeight="800">x</text>
            <text x="200" y="14" textAnchor="middle" fill="#17263D" fontSize="11" fontWeight="800">y</text>

            {/* Ticks */}
            {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((n) => (
              <g key={`ltx-${n}`}>
                <line x1={200 + n * 26} y1="146" x2={200 + n * 26} y2="154" stroke="#17263D" strokeWidth="1.2" />
                <text x={200 + n * 26} y="165" textAnchor="middle" fill="#64748B" fontSize="8.5">
                  {n}
                </text>
              </g>
            ))}
            {[-3, -2, -1, 1, 2, 3].map((n) => (
              <g key={`lty-${n}`}>
                <line x1="196" y1={150 - n * 26} x2="204" y2={150 - n * 26} stroke="#17263D" strokeWidth="1.2" />
                <text x="192" y={150 - n * 26 + 3} textAnchor="end" fill="#64748B" fontSize="8.5">
                  {n}
                </text>
              </g>
            ))}

            {/* Line 1: y = (2/3)x + 1 (Blue) */}
            {/* For x = -6, y = -3 -> (44, 228). For x = 6, y = 5 -> (356, 20) */}
            <line x1="44" y1="228" x2="356" y2="20" stroke="#2457A7" strokeWidth="3" />

            {/* Slope Triangle on Line 1 between (0, 1) and (3, 3) */}
            {/* (0, 1) is at (200, 124). (3, 3) is at (278, 72) */}
            {/* Run: (200, 124) to (278, 124) */}
            <line x1="200" y1="124" x2="278" y2="124" stroke="#D6A84B" strokeWidth="2" strokeDasharray="3 2" />
            <text x="239" y="138" textAnchor="middle" fill="#B45309" fontSize="10" fontWeight="700">
              Run = +3
            </text>
            {/* Rise: (278, 124) to (278, 72) */}
            <line x1="278" y1="124" x2="278" y2="72" stroke="#C83B45" strokeWidth="2" strokeDasharray="3 2" />
            <text x="284" y="102" textAnchor="start" fill="#C83B45" fontSize="10" fontWeight="700">
              Rise = +2
            </text>
            {/* Right angle symbol */}
            <path d="M 268 124 L 268 114 L 278 114" fill="none" stroke="#17263D" strokeWidth="1.2" />

            {/* Points on Line 1 */}
            {/* y-intercept (0, 1) */}
            <circle cx="200" cy="124" r="5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="122" y="112" width="72" height="18" rx="3" fill="#2457A7" />
            <text x="158" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">
              b = (0, 1)
            </text>

            {/* Point (3, 3) */}
            <circle cx="278" cy="72" r="5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="286" y="62" width="60" height="18" rx="3" fill="#102A56" />
            <text x="316" y="75" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">
              (3, 3)
            </text>

            {/* Line 2: y = -1.5x + 1 (Perpendicular, Red dashed) */}
            {/* Passes through (0, 1). Slope = -1.5. For x=-2, y=4 -> (148, 46). For x=2, y=-2 -> (252, 202) */}
            <line x1="148" y1="46" x2="252" y2="202" stroke="#C83B45" strokeWidth="2" strokeDasharray="4 3" />
            <rect x="100" y="32" width="85" height="18" rx="3" fill="#FDF2F3" stroke="#F87171" strokeWidth="0.8" />
            <text x="142" y="45" textAnchor="middle" fill="#C83B45" fontSize="9" fontWeight="700">
              y = -1.5x + 1
            </text>

            {/* Line 1 equation tag */}
            <rect x="250" y="24" width="120" height="20" rx="4" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1" />
            <text x="310" y="38" textAnchor="middle" fill="#2457A7" fontSize="10" fontWeight="750">
              y = (2/3)x + 1 (m = 2/3)
            </text>
          </g>

          {/* Right panel: Formula & Slope Rules */}
          <g transform="translate(440, 30)">
            {/* Card 1: Slope-Intercept */}
            <rect x="0" y="0" width="290" height="85" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="22" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ទម្រង់ជម្រាល-កាត់អ័ក្ស (Slope-Intercept Form)' : 'Slope-Intercept Form: y = mx + b'}
            </text>
            <text x="16" y="44" fill="#2457A7" fontSize="13" fontWeight="750">
              m = Rise / Run = (y₂ - y₁) / (x₂ - x₁)
            </text>
            <text x="16" y="64" fill="#64748B" fontSize="11">
              {isKm ? 'b = កូអរដោនេកាត់អ័ក្ស y ត្រង់ចំណុច (0, b)' : 'b = y-intercept where line crosses y-axis at (0, b)'}
            </text>

            {/* Card 2: 4 Types of Slopes */}
            <rect x="0" y="95" width="290" height="96" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="117" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ប្រភេទជម្រាលទាំង ៤ (4 Types of Slopes)' : 'The 4 Types of Slopes'}
            </text>
            <text x="16" y="137" fill="#047857" fontSize="11" fontWeight="700">
              m &gt; 0 : {isKm ? 'បន្ទាត់ឡើងពីឆ្វេងទៅស្តាំ (↗)' : 'Positive: Line rises left-to-right (↗)'}
            </text>
            <text x="16" y="153" fill="#C83B45" fontSize="11" fontWeight="700">
              m &lt; 0 : {isKm ? 'បន្ទាត់ចុះពីឆ្វេងទៅស្តាំ (↘)' : 'Negative: Line falls left-to-right (↘)'}
            </text>
            <text x="16" y="169" fill="#B45309" fontSize="11" fontWeight="700">
              m = 0 : {isKm ? 'បន្ទាត់ដេក y = c (→)' : 'Zero: Horizontal flat line y = c (→)'}
            </text>
            <text x="16" y="185" fill="#64748B" fontSize="10">
              m {isKm ? 'មិនកំណត់ ៖ បន្ទាត់ឈរ x = c (↑)' : 'undefined: Vertical line x = c (↑)'}
            </text>

            {/* Card 3: Parallel & Perpendicular */}
            <rect x="0" y="201" width="290" height="85" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="223" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'បន្ទាត់ស្រប និងបន្ទាត់កែង' : 'Parallel & Perpendicular Lines'}
            </text>
            <text x="16" y="245" fill="#2457A7" fontSize="11" fontWeight="750">
              {isKm ? 'ស្របគ្នា (Parallel) ៖ m₁ = m₂' : 'Parallel Lines: m₁ = m₂'}
            </text>
            <text x="16" y="267" fill="#C83B45" fontSize="11" fontWeight="750">
              {isKm ? 'កែងគ្នា (Perpendicular) ៖ m₁ · m₂ = -1' : 'Perpendicular Lines: m₁ · m₂ = -1'}
            </text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'សមីការបន្ទាត់ស្គាល់មួយចំណុច និងជម្រាល' : 'Point-Slope Equation Form'}
          </div>
          <code className="flowchart-step-code">y - y₁ = m(x - x₁) ⟺ y = mx - mx₁ + y₁</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'លក្ខខណ្ឌកែងគ្នានៃបន្ទាត់' : 'Perpendicular Slope Negative Reciprocal'}
          </div>
          <code className="flowchart-step-code">m₂ = -1 / m₁ | (2/3) × (-3/2) = -1</code>
        </div>
      </div>
    </div>
  )
}


/* -------------------------------------------------------------------------
   20. 2D Vector in Cartesian Coordinate Plane Diagram
   ------------------------------------------------------------------------- */
function Vector2DCoordinateDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'វ៉ិចទ័រក្នុងប្លង់កូអរដោនេ ២D (Vectors in 2D Coordinate Plane)'
            : 'Vectors in 2D Cartesian Coordinate Plane'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'វ៉ិចទ័រ v⃗ = ⟨x, y⟩ = x·i⃗ + y·j⃗ ចាប់ផ្តើមពីគល់ O(0, 0) ទៅចំណុច P(x, y)។ ប្រវែងម៉ូឌុល ||v⃗|| = √(x² + y²) និងទិសដៅមុំ θ = arctan(y/x)។'
            : 'Position vector v⃗ = ⟨x, y⟩ = x·i⃗ + y·j⃗ from origin O(0, 0) to point P(x, y). Magnitude ||v⃗|| = √(x² + y²) and direction angle θ = arctan(y/x).'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 310"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមវ៉ិចទ័រកូអរដោនេ' : '2D vector coordinates magnitude and direction diagram'}
        >
          <defs>
            <marker id="vec-arrow" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
              <path d="M 0 1 L 7 4 L 0 7 z" fill="#2457A7" />
            </marker>
            <marker id="comp-arrow-x" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
              <path d="M 0 1 L 6 3.5 L 0 6 z" fill="#D6A84B" />
            </marker>
            <marker id="comp-arrow-y" markerWidth="7" markerHeight="7" refX="4" refY="3.5" orient="auto">
              <path d="M 0 1 L 6 3.5 L 0 6 z" fill="#C83B45" />
            </marker>
          </defs>

          <rect x="10" y="10" width="740" height="290" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Coordinate Grid */}
          {/* Origin O(0, 0) at canvas (70, 240). Scale 1 unit = 36px */}
          <g transform="translate(30, 20)">
            <rect x="10" y="10" width="360" height="250" rx="8" fill="var(--surface)" stroke="var(--line)" />

            {/* Grid */}
            {[0, 1, 2, 3, 4, 5, 6].map((ux) => {
              const cx = 50 + ux * 36
              return (
                <line
                  key={`vgx-${ux}`}
                  x1={cx}
                  y1="10"
                  x2={cx}
                  y2="260"
                  stroke="var(--line)"
                  strokeWidth="0.8"
                  opacity={0.6}
                />
              )
            })}
            {[0, 1, 2, 3, 4, 5].map((uy) => {
              const cy = 230 - uy * 36
              return (
                <line
                  key={`vgy-${uy}`}
                  x1="10"
                  y1={cy}
                  x2="370"
                  y2={cy}
                  stroke="var(--line)"
                  strokeWidth="0.8"
                  opacity={0.6}
                />
              )
            })}

            {/* Axes */}
            <line x1="30" y1="230" x2="350" y2="230" stroke="#17263D" strokeWidth="2.2" />
            <line x1="50" y1="245" x2="50" y2="25" stroke="#17263D" strokeWidth="2.2" />
            <text x="355" y="234" fill="#17263D" fontSize="11" fontWeight="800">x</text>
            <text x="50" y="18" textAnchor="middle" fill="#17263D" fontSize="11" fontWeight="800">y</text>

            {/* Ticks */}
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <g key={`vtx-${n}`}>
                <line x1={50 + n * 36} y1="226" x2={50 + n * 36} y2="234" stroke="#17263D" strokeWidth="1.2" />
                <text x={50 + n * 36} y="246" textAnchor="middle" fill="#64748B" fontSize="9">
                  {n}
                </text>
              </g>
            ))}
            {[1, 2, 3, 4, 5].map((n) => (
              <g key={`vty-${n}`}>
                <line x1="46" y1={230 - n * 36} x2="54" y2={230 - n * 36} stroke="#17263D" strokeWidth="1.2" />
                <text x="42" y={230 - n * 36 + 3.5} textAnchor="end" fill="#64748B" fontSize="9">
                  {n}
                </text>
              </g>
            ))}
            <text x="42" y="242" textAnchor="end" fill="#17263D" fontSize="9" fontWeight="700">0</text>

            {/* Vector Components: v = <4, 3> */}
            {/* Horizontal component v_x from (50, 230) to (194, 230) */}
            <line x1="50" y1="230" x2="190" y2="230" stroke="#D6A84B" strokeWidth="3" markerEnd="url(#comp-arrow-x)" />
            <text x="122" y="222" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="800">
              v_x = 4 i⃗
            </text>

            {/* Vertical component v_y from (194, 230) to (194, 122) */}
            <line x1="194" y1="230" x2="194" y2="126" stroke="#C83B45" strokeWidth="3" markerEnd="url(#comp-arrow-y)" />
            <text x="204" y="176" textAnchor="start" fill="#C83B45" fontSize="11" fontWeight="800">
              v_y = 3 j⃗
            </text>

            {/* Right angle symbol at (194, 230) */}
            <path d="M 182 230 L 182 218 L 194 218" fill="none" stroke="#17263D" strokeWidth="1.5" />

            {/* The Position Vector v⃗ = <4, 3> from (50, 230) to (194, 122) */}
            <line x1="50" y1="230" x2="190" y2="125" stroke="#2457A7" strokeWidth="3.5" markerEnd="url(#vec-arrow)" />

            {/* Point P(4, 3) */}
            <circle cx="194" cy="122" r="7" fill="rgba(36, 87, 167, 0.25)" />
            <circle cx="194" cy="122" r="4.5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="204" y="108" width="62" height="20" rx="4" fill="#2457A7" />
            <text x="235" y="122" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="750">
              P(4, 3)
            </text>

            {/* Direction Angle θ arc */}
            <path d="M 85 230 A 35 35 0 0 0 78 209" fill="none" stroke="#D6A84B" strokeWidth="2.5" />
            <text x="94" y="218" fill="#B45309" fontSize="11" fontWeight="800">θ</text>

            {/* Vector Magnitude Pill */}
            <rect x="95" y="155" width="85" height="22" rx="11" fill="#102A56" />
            <text x="137" y="170" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="750">
              ||v⃗|| = 5.00
            </text>
          </g>

          {/* Right panel: Formulas & Laws */}
          <g transform="translate(430, 25)">
            {/* Card 1: Vector Coordinates */}
            <rect x="0" y="0" width="300" height="78" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="22" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ទម្រង់កូអរដោនេនៃវ៉ិចទ័រ (Vector Coordinates)' : 'Vector Component Form'}
            </text>
            <text x="16" y="44" fill="#2457A7" fontSize="13" fontWeight="750">
              v⃗ = ⟨x, y⟩ = x·i⃗ + y·j⃗ = ⟨4, 3⟩
            </text>
            <text x="16" y="64" fill="#64748B" fontSize="10">
              {isKm ? 'i⃗ = ⟨1, 0⟩ និង j⃗ = ⟨0, 1⟩ ជាវ៉ិចទ័រឯកតា' : 'i⃗ = ⟨1, 0⟩ and j⃗ = ⟨0, 1⟩ are standard basis unit vectors'}
            </text>

            {/* Card 2: Magnitude & Direction */}
            <rect x="0" y="88" width="300" height="88" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="110" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ប្រវែងម៉ូឌុល និងទិសដៅមុំ (Magnitude & Angle)' : 'Magnitude & Direction Angle'}
            </text>
            <text x="16" y="132" fill="#047857" fontSize="12" fontWeight="750">
              ||v⃗|| = √(x² + y²) = √(4² + 3²) = 5
            </text>
            <text x="16" y="152" fill="#B45309" fontSize="12" fontWeight="750">
              tan(θ) = y / x = 3 / 4 ⟹ θ ≈ 36.87°
            </text>
            <text x="16" y="168" fill="#64748B" fontSize="10">
              {isKm ? 'វ៉ិចទ័រឯកតា ៖ û = v⃗ / ||v⃗|| = ⟨0.8, 0.6⟩' : 'Unit vector: û = v⃗ / ||v⃗|| = ⟨0.8, 0.6⟩'}
            </text>

            {/* Card 3: Dot Product */}
            <rect x="0" y="186" width="300" height="78" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="208" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ផលគុណស្កាលែ (Dot Product)' : 'Scalar Dot Product: u⃗ · v⃗'}
            </text>
            <text x="16" y="228" fill="#C83B45" fontSize="12" fontWeight="750">
              u⃗ · v⃗ = u_x·v_x + u_y·v_y = ||u⃗||·||v⃗||·cos(θ)
            </text>
            <text x="16" y="248" fill="#64748B" fontSize="10">
              {isKm ? 'លក្ខខណ្ឌកែងគ្នា ៖ u⃗ · v⃗ = 0 ⟺ u⃗ ⊥ v⃗' : 'Orthogonal condition: u⃗ · v⃗ = 0 ⟺ u⃗ ⊥ v⃗'}
            </text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'ផលបូកវ៉ិចទ័រតាមកូអរដោនេ' : 'Vector Addition Components'}
          </div>
          <code className="flowchart-step-code">⟨u₁, u₂⟩ + ⟨v₁, v₂⟩ = ⟨u₁ + v₁, u₂ + v₂⟩</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'ផលគុណស្កាលែ និងមុំរវាងវ៉ិចទ័រ' : 'Angle Between Two Vectors'}
          </div>
          <code className="flowchart-step-code">cos(θ) = (u⃗ · v⃗) / (||u⃗|| × ||v⃗||)</code>
        </div>
      </div>
    </div>
  )
}


/* -------------------------------------------------------------------------
   21. Circles in Cartesian Coordinate Geometry Diagram
   ------------------------------------------------------------------------- */
function CircleCoordinateDiagram({ isKm }: { isKm: boolean }) {
  return (
    <div className="flowchart-container">
      <div className="flowchart-header">
        <h3 className="flowchart-title">
          {isKm
            ? 'សមីការរង្វង់ក្នុងប្លង់កូអរដោនេ (Circles in Coordinate Geometry)'
            : 'Circles in Cartesian Coordinate Geometry'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'សមីការស្តង់ដារនៃរង្វង់មានផ្ចិត C(h, k) និងកាំ r គឺ (x - h)² + (y - k)² = r²។'
            : 'Standard equation of a circle with center C(h, k) and radius r is (x - h)² + (y - k)² = r².'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 310"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមរង្វង់កូអរដោនេ' : 'Circle in coordinate geometry center and radius diagram'}
        >
          <rect x="10" y="10" width="740" height="290" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Coordinate Plane */}
          {/* Origin O(0, 0) at canvas (50, 250). Scale 1 unit = 32px */}
          <g transform="translate(30, 20)">
            <rect x="10" y="10" width="370" height="250" rx="8" fill="var(--surface)" stroke="var(--line)" />

            {/* Grid */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((ux) => {
              const cx = 50 + ux * 32
              return (
                <line
                  key={`cgx-${ux}`}
                  x1={cx}
                  y1="10"
                  x2={cx}
                  y2="260"
                  stroke="var(--line)"
                  strokeWidth="0.8"
                  opacity={0.6}
                />
              )
            })}
            {[0, 1, 2, 3, 4, 5, 6].map((uy) => {
              const cy = 240 - uy * 32
              return (
                <line
                  key={`cgy-${uy}`}
                  x1="10"
                  y1={cy}
                  x2="380"
                  y2={cy}
                  stroke="var(--line)"
                  strokeWidth="0.8"
                  opacity={0.6}
                />
              )
            })}

            {/* Axes */}
            <line x1="30" y1="240" x2="360" y2="240" stroke="#17263D" strokeWidth="2.2" />
            <line x1="50" y1="255" x2="50" y2="18" stroke="#17263D" strokeWidth="2.2" />
            <text x="365" y="244" fill="#17263D" fontSize="11" fontWeight="800">x</text>
            <text x="50" y="12" textAnchor="middle" fill="#17263D" fontSize="11" fontWeight="800">y</text>

            {/* Ticks */}
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <g key={`ctx-${n}`}>
                <line x1={50 + n * 32} y1="236" x2={50 + n * 32} y2="244" stroke="#17263D" strokeWidth="1.2" />
                <text x={50 + n * 32} y="254" textAnchor="middle" fill="#64748B" fontSize="8.5">
                  {n}
                </text>
              </g>
            ))}
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <g key={`cty-${n}`}>
                <line x1="46" y1={240 - n * 32} x2="54" y2={240 - n * 32} stroke="#17263D" strokeWidth="1.2" />
                <text x="42" y={240 - n * 32 + 3.5} textAnchor="end" fill="#64748B" fontSize="8.5">
                  {n}
                </text>
              </g>
            ))}

            {/* Circle: Center C(3, 3) at canvas (50 + 3*32, 240 - 3*32) = (146, 144) */}
            {/* Radius r = 2.5 units -> 2.5 * 32 = 80px */}
            <circle cx="146" cy="144" r="80" fill="rgba(36, 87, 167, 0.08)" stroke="#2457A7" strokeWidth="2.5" />

            {/* Center C(3, 3) */}
            <circle cx="146" cy="144" r="5" fill="#C83B45" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="74" y="132" width="66" height="20" rx="3" fill="#C83B45" />
            <text x="107" y="146" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="750">
              C(3, 3)
            </text>

            {/* Radius Line to P(5, 4.5): P is at (50 + 5*32, 240 - 4.5*32) = (210, 96) */}
            {/* Distance: sqrt(2^2 + 1.5^2) = sqrt(4 + 2.25) = 2.5 units */}
            <line x1="146" y1="144" x2="210" y2="96" stroke="#D6A84B" strokeWidth="2.5" />
            <circle cx="210" cy="96" r="5" fill="#2457A7" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="218" y="86" width="68" height="20" rx="3" fill="#2457A7" />
            <text x="252" y="100" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="750">
              P(x, y)
            </text>

            {/* Radius label */}
            <text x="172" y="114" fill="#B45309" fontSize="11" fontWeight="800">r = 2.5</text>

            {/* Horizontal Tangent Line at top: y = 5.5 -> y = 240 - 5.5*32 = 64 */}
            <line x1="70" y1="64" x2="222" y2="64" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
            <rect x="90" y="48" width="115" height="18" rx="3" fill="#ECFDF5" stroke="#10B981" strokeWidth="0.8" />
            <text x="147" y="61" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="700">
              Tangent Line y = 5.5
            </text>

            {/* Perpendicular right-angle mark at (146, 64) */}
            <path d="M 146 76 L 158 76 L 158 64" fill="none" stroke="#10B981" strokeWidth="1.5" />
          </g>

          {/* Right panel: Circle Formulas */}
          <g transform="translate(440, 25)">
            {/* Card 1: Standard Equation */}
            <rect x="0" y="0" width="290" height="90" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="24" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'សមីការស្តង់ដារនៃរង្វង់ (Standard Form)' : 'Standard Circle Equation'}
            </text>
            <text x="16" y="48" fill="#2457A7" fontSize="14" fontWeight="800">
              (x - h)² + (y - k)² = r²
            </text>
            <text x="16" y="70" fill="#64748B" fontSize="11">
              {isKm ? 'ផ្ចិត C(h, k) = (3, 3) និងកាំ r = 2.5' : 'Center C(h, k) = (3, 3) and radius r = 2.5'}
            </text>

            {/* Card 2: General Equation */}
            <rect x="0" y="100" width="290" height="90" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="124" fill="#102A56" fontSize="12" fontWeight="800">
              {isKm ? 'ទម្រង់ទូទៅ (General Form)' : 'General Form Equation'}
            </text>
            <text x="16" y="148" fill="#047857" fontSize="13" fontWeight="750">
              x² + y² + Dx + Ey + F = 0
            </text>
            <text x="16" y="170" fill="#64748B" fontSize="10">
              {isKm ? 'ផ្ចិត ៖ h = -D/2, k = -E/2 | កាំ ៖ r = √(h² + k² - F)' : 'Center: h = -D/2, k = -E/2 | Radius: r = √(h² + k² - F)'}
            </text>

            {/* Card 3: Specific Equation */}
            <rect x="0" y="200" width="290" height="70" rx="8" fill="var(--surface)" stroke="var(--line)" />
            <text x="16" y="222" fill="#102A56" fontSize="11" fontWeight="750">
              {isKm ? 'សមីការរង្វង់ក្នុងរូបខាងឆ្វេង ៖' : 'Equation of Circle Shown Above:'}
            </text>
            <text x="16" y="246" fill="#102A56" fontSize="13" fontWeight="800">
              (x - 3)² + (y - 3)² = 6.25
            </text>
          </g>
        </svg>
      </div>

      <div className="flowchart-steps-grid">
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--blue">
            {isKm ? 'វិធីបំពេញជាការ៉េ រកផ្ចិតនិងកាំ' : 'Completing the Square for Circles'}
          </div>
          <code className="flowchart-step-code">x² - 6x + y² - 6y = -11.75 ⟺ (x-3)² + (y-3)² = 2.5²</code>
        </div>
        <div className="flowchart-step-card">
          <div className="flowchart-step-badge flowchart-step-badge--gold">
            {isKm ? 'បន្ទាត់ប៉ះកែងនឹងកាំត្រង់ចំណុចប៉ះ' : 'Tangent Line Perpendicular to Radius'}
          </div>
          <code className="flowchart-step-code">Radius ⊥ Tangent Line at Contact Point</code>
        </div>
      </div>
    </div>
  )
}
