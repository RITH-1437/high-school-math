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
            ? 'គំនូសបំព្រួញដោះស្រាយសមីការដឺក្រេទីពីរ (Quadratic Equations Flowchart)'
            : 'Quadratic Equations Solving Strategy Flowchart'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ទម្រង់ស្តង់ដារ ax² + bx + c = 0 (a ≠ 0)។ គណនាឌីស្គ្រីមីណង់ Δ = b² - 4ac ដើម្បីដឹងពីចំនួន និងលក្ខណៈនៃឫស។'
            : 'Standard form: ax² + bx + c = 0 (a ≠ 0). Calculate Discriminant Δ = b² - 4ac to determine nature of roots.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 330"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញដោះស្រាយសមីការដឺក្រេទីពីរ' : 'Quadratic formula decision flowchart'}
        >
          {/* Card background */}
          <rect x="10" y="10" width="740" height="310" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Node 1: Start */}
          <rect x="230" y="22" width="300" height="40" rx="8" fill="#102A56" />
          <text x="380" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="750">
            ax² + bx + c = 0 &nbsp;(a ≠ 0)
          </text>

          {/* Line down to special check or discriminant */}
          <line x1="380" y1="62" x2="380" y2="88" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrow-both)" />

          {/* Node 2: Check shortcuts */}
          <rect x="180" y="88" width="400" height="38" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="112" textAnchor="middle" fill="#102A56" fontSize="13" fontWeight="700">
            {isKm ? 'គណនាឌីស្គ្រីមីណង់ ៖  Δ = b² - 4ac' : 'Compute Discriminant:  Δ = b² - 4ac'}
          </text>

          {/* Split 3 branches: Δ > 0, Δ = 0, Δ < 0 */}
          <line x1="380" y1="126" x2="380" y2="155" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 130 155 L 630 155" stroke="#64748B" strokeWidth="1.8" />
          <line x1="130" y1="155" x2="130" y2="175" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="380" y1="155" x2="380" y2="175" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="630" y1="155" x2="630" y2="175" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />

          {/* Branch 1: Δ > 0 */}
          <rect x="35" y="178" width="190" height="122" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <rect x="80" y="190" width="100" height="24" rx="12" fill="#10B981" />
          <text x="130" y="206" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">Δ &gt; 0</text>
          <text x="130" y="232" textAnchor="middle" fill="#065F46" fontSize="12" fontWeight="750">
            {isKm ? 'ឫសពីរផ្សេងគ្នា' : 'Two Distinct Real Roots'}
          </text>
          <text x="130" y="250" textAnchor="middle" fill="#047857" fontSize="11">
            {isKm ? 'កាត់អ័ក្ស x ត្រង់ពីរចំណុច' : 'Crosses x-axis twice'}
          </text>
          <rect x="50" y="260" width="160" height="26" rx="4" fill="#FFFFFF" stroke="#10B981" />
          <text x="130" y="278" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="700">
            x = (-b ± √Δ) / (2a)
          </text>

          {/* Branch 2: Δ = 0 */}
          <rect x="285" y="178" width="190" height="122" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <rect x="330" y="190" width="100" height="24" rx="12" fill="#D6A84B" />
          <text x="380" y="206" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">Δ = 0</text>
          <text x="380" y="232" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="750">
            {isKm ? 'ឫសឌុបមួយ' : 'One Repeated Root'}
          </text>
          <text x="380" y="250" textAnchor="middle" fill="#B45309" fontSize="11">
            {isKm ? 'ប៉ះអ័ក្ស x ត្រង់កំពូល' : 'Touches x-axis at vertex'}
          </text>
          <rect x="300" y="260" width="160" height="26" rx="4" fill="#FFFFFF" stroke="#D6A84B" />
          <text x="380" y="278" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">
            x = -b / (2a)
          </text>

          {/* Branch 3: Δ < 0 */}
          <rect x="535" y="178" width="190" height="122" rx="8" fill="#FDF2F3" stroke="#F87171" strokeWidth="1.5" />
          <rect x="580" y="190" width="100" height="24" rx="12" fill="#C83B45" />
          <text x="630" y="206" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">Δ &lt; 0</text>
          <text x="630" y="232" textAnchor="middle" fill="#991B1B" fontSize="12" fontWeight="750">
            {isKm ? 'គ្មានឫសពិត (ឫសកុំផ្លិច)' : 'No Real Roots (Complex)'}
          </text>
          <text x="630" y="250" textAnchor="middle" fill="#C83B45" fontSize="11">
            {isKm ? 'មិនកាត់អ័ក្ស x ទេ' : 'Does not cross x-axis'}
          </text>
          <rect x="550" y="260" width="160" height="26" rx="4" fill="#FFFFFF" stroke="#F87171" />
          <text x="630" y="278" textAnchor="middle" fill="#C83B45" fontSize="11" fontWeight="700">
            x = (-b ± i√|Δ|) / (2a)
          </text>
        </svg>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   4. Coordinate Geometry: Distance, Midpoint & Slope Diagram
   ------------------------------------------------------------------------- */
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
          viewBox="0 0 760 260"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'ដ្យាក្រាមកូអរដោនេចម្ងាយ និងជម្រាល' : 'Cartesian distance midpoint and slope diagram'}
        >
          <rect x="10" y="10" width="740" height="240" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Left panel: Coordinate Graph */}
          <g transform="translate(30, 25)">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`v-${i}`} x1={40 + i * 36} y1="15" x2={40 + i * 36} y2="195" stroke="#E2E8F0" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={`h-${i}`} x1="40" y1="15 + i * 36" x2="256" y2="15 + i * 36" stroke="#E2E8F0" strokeWidth="1" />
            ))}

            {/* Axes */}
            <line x1="40" y1="195" x2="270" y2="195" stroke="#17263D" strokeWidth="2" markerEnd="url(#arrow-right)" />
            <line x1="40" y1="195" x2="40" y2="10" stroke="#17263D" strokeWidth="2" markerEnd="url(#arrow-right)" />
            <text x="275" y="200" fill="#17263D" fontSize="12" fontWeight="700">x</text>
            <text x="40" y="8" textAnchor="middle" fill="#17263D" fontSize="12" fontWeight="700">y</text>

            {/* Right triangle: Point A(1, 1) -> (76, 159), Point B(5, 4) -> (220, 51) */}
            {/* Run line (horizontal): (76, 159) to (220, 159) */}
            <line x1="76" y1="159" x2="220" y2="159" stroke="#D6A84B" strokeWidth="2" strokeDasharray="3 2" />
            <text x="148" y="175" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">
              Δx = x₂ - x₁
            </text>

            {/* Rise line (vertical): (220, 159) to (220, 51) */}
            <line x1="220" y1="159" x2="220" y2="51" stroke="#C83B45" strokeWidth="2" strokeDasharray="3 2" />
            <text x="232" y="110" textAnchor="start" fill="#C83B45" fontSize="11" fontWeight="700">
              Δy = y₂ - y₁
            </text>

            {/* Hypotenuse segment AB */}
            <line x1="76" y1="159" x2="220" y2="51" stroke="#2457A7" strokeWidth="3" />

            {/* Point A */}
            <circle cx="76" cy="159" r="5" fill="#2457A7" />
            <text x="65" y="174" textAnchor="end" fill="#102A56" fontSize="11" fontWeight="750">A(x₁, y₁)</text>

            {/* Point B */}
            <circle cx="220" cy="51" r="5" fill="#2457A7" />
            <text x="230" y="44" fill="#102A56" fontSize="11" fontWeight="750">B(x₂, y₂)</text>

            {/* Midpoint M */}
            <circle cx="148" cy="105" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="135" y="98" fill="#047857" fontSize="11" fontWeight="750">M</text>
          </g>

          {/* Right panel: Formula Cards */}
          <g transform="translate(360, 25)">
            {/* Distance Card */}
            <rect x="0" y="10" width="360" height="58" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.2" />
            <text x="16" y="32" fill="#2457A7" fontSize="12" fontWeight="750">
              {isKm ? '១. ចម្ងាយរវាងពីរចំណុច (Distance d)' : '1. Distance Formula (d)'}
            </text>
            <text x="16" y="52" fill="#102A56" fontSize="13" fontWeight="700">
              d = √[(x₂ - x₁)² + (y₂ - y₁)²]
            </text>

            {/* Midpoint Card */}
            <rect x="0" y="78" width="360" height="58" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.2" />
            <text x="16" y="100" fill="#047857" fontSize="12" fontWeight="750">
              {isKm ? '២. ចំណុចកណ្តាល (Midpoint M)' : '2. Midpoint Coordinates (M)'}
            </text>
            <text x="16" y="120" fill="#065F46" fontSize="13" fontWeight="700">
              M = ( (x₁ + x₂) / 2 , (y₁ + y₂) / 2 )
            </text>

            {/* Slope Card */}
            <rect x="0" y="146" width="360" height="58" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.2" />
            <text x="16" y="168" fill="#B45309" fontSize="12" fontWeight="750">
              {isKm ? '៣. មេគុណប្រាប់ទិស / ជម្រាល (Slope m)' : '3. Slope / Gradient (m)'}
            </text>
            <text x="16" y="188" fill="#92400E" fontSize="13" fontWeight="700">
              m = (y₂ - y₁) / (x₂ - x₁) = Δy / Δx &nbsp;(x₁ ≠ x₂)
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
            ? 'គំនូសបំព្រួញរកតម្លៃបរមាដោយដេរីវេទីមួយ (First Derivative Test)'
            : 'Finding Local Extrema with First Derivative Test'}
        </h3>
        <p className="flowchart-desc">
          {isKm
            ? 'ដោះស្រាយ f\'(x) = 0 ដើម្បីរកចំណុចស្ថានីយ រួចសិក្សាសញ្ញានៃ f\'(x) ដើម្បីកំណត់អតិបរមា ឬអប្បបរមា។'
            : 'Find critical points where f\'(x) = 0, then test sign transitions to determine local maxima and minima.'}
        </p>
      </div>

      <div className="flowchart-canvas-wrap">
        <svg
          viewBox="0 0 760 300"
          className="flowchart-svg"
          role="img"
          aria-label={isKm ? 'គំនូសបំព្រួញដេរីវេទីមួយ' : 'First derivative test flowchart'}
        >
          <rect x="10" y="10" width="740" height="280" rx="10" fill="var(--surface-sunken)" stroke="var(--line)" />

          {/* Step 1 */}
          <rect x="240" y="22" width="280" height="36" rx="6" fill="#102A56" />
          <text x="380" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
            {isKm ? '១. គណនាដេរីវេ y = f\'(x)' : '1. Differentiate: y = f\'(x)'}
          </text>

          <line x1="380" y1="58" x2="380" y2="78" stroke="#64748B" strokeWidth="2" markerEnd="url(#arrow-both)" />

          {/* Step 2 */}
          <rect x="210" y="78" width="340" height="36" rx="6" fill="#F0F4FA" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="101" textAnchor="middle" fill="#102A56" fontSize="13" fontWeight="700">
            {isKm ? '២. រកចំណុចស្ថានីយ៖ ដោះស្រាយ f\'(x) = 0' : '2. Solve f\'(x) = 0 to find critical points c'}
          </text>

          <line x1="380" y1="114" x2="380" y2="140" stroke="#64748B" strokeWidth="1.8" />
          <path d="M 140 140 L 620 140" stroke="#64748B" strokeWidth="1.8" />
          <line x1="140" y1="140" x2="140" y2="158" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="380" y1="140" x2="380" y2="158" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />
          <line x1="620" y1="140" x2="620" y2="158" stroke="#64748B" strokeWidth="1.8" markerEnd="url(#arrow-both)" />

          {/* Branch 1: Max */}
          <rect x="40" y="160" width="200" height="110" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
          <text x="140" y="185" textAnchor="middle" fill="#047857" fontSize="12" fontWeight="700">
            {isKm ? 'សញ្ញា f\'(x) ប្រែពី + ទៅ -' : 'Sign changes from + to -'}
          </text>
          <text x="140" y="215" textAnchor="middle" fill="#065F46" fontSize="15" fontWeight="800">
            {isKm ? 'អតិបរមា Local Max' : 'Local Maximum'}
          </text>
          <text x="140" y="245" textAnchor="middle" fill="#047857" fontSize="11">
            {isKm ? 'ក្រាហ្វឡើង រួចចុះ (∩)' : 'Graph rises then falls (∩)'}
          </text>

          {/* Branch 2: Min */}
          <rect x="280" y="160" width="200" height="110" rx="8" fill="#EAF2FF" stroke="#2457A7" strokeWidth="1.5" />
          <text x="380" y="185" textAnchor="middle" fill="#2457A7" fontSize="12" fontWeight="700">
            {isKm ? 'សញ្ញា f\'(x) ប្រែពី - ទៅ +' : 'Sign changes from - to +'}
          </text>
          <text x="380" y="215" textAnchor="middle" fill="#102A56" fontSize="15" fontWeight="800">
            {isKm ? 'អប្បបរមា Local Min' : 'Local Minimum'}
          </text>
          <text x="380" y="245" textAnchor="middle" fill="#2457A7" fontSize="11">
            {isKm ? 'ក្រាហ្វចុះ រួចឡើង (∪)' : 'Graph falls then rises (∪)'}
          </text>

          {/* Branch 3: Inflection */}
          <rect x="520" y="160" width="200" height="110" rx="8" fill="#FFFBEB" stroke="#D6A84B" strokeWidth="1.5" />
          <text x="620" y="185" textAnchor="middle" fill="#B45309" fontSize="12" fontWeight="700">
            {isKm ? 'សញ្ញា f\'(x) មិនផ្លាស់ប្តូរ' : 'No sign change (+/+ or -/-)'}
          </text>
          <text x="620" y="215" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="800">
            {isKm ? 'ចំណុចរបត់ Inflection' : 'Stationary Inflection'}
          </text>
          <text x="620" y="245" textAnchor="middle" fill="#B45309" fontSize="11">
            {isKm ? 'មិនមែនជាបរមាទេ' : 'Not an extremum'}
          </text>
        </svg>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   6. Systems of Linear Equations Strategy Flowchart
   ------------------------------------------------------------------------- */
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
