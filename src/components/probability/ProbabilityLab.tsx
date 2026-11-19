/**
 * Probability Tree & Counting Lab (ដើមឈើប្រូបាប)
 * Route: /labs/probability  —  Grade 10–12 BacII
 *
 * SVG tree grows left to right.
 * Default: 2-stage experiment (MoEYS standard problem type).
 * Branch probabilities validated to sum to 1 at each node (red if not).
 * Tabs: Probability Tree | Permutations Aₙᵏ | Combinations Cₙᵏ
 */
import { useEffect, useMemo, useState } from 'react'
import { MathBlock } from '../ui/Math'
import { useI18n } from '../../lib/i18n'

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */
type NodeId = string

interface PNode {
  id: NodeId
  parentId: NodeId | null
  label: string
  prob: string   // user-editable: "1/2", "0.5", "33%"
}

type PTree = Record<NodeId, PNode>

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
let _uid = 0
function uid() { return `n${++_uid}` }

function parseProb(s: string): number {
  const t = s.trim()
  if (t.endsWith('%')) return parseFloat(t) / 100
  if (t.includes('/')) {
    const [a, b] = t.split('/').map(Number)
    return b ? a / b : NaN
  }
  return parseFloat(t)
}

function fmt(n: number, dp = 4): string {
  if (!isFinite(n)) return '?'
  return n.toFixed(dp).replace(/\.?0+$/, '') || '0'
}

function factorial(n: number): number {
  if (n < 0 || n > 20) return NaN
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}
function permutation(n: number, k: number) {
  if (k > n || k < 0 || n < 0) return 0
  return factorial(n) / factorial(n - k)
}
function combination(n: number, k: number) {
  if (k > n || k < 0 || n < 0) return 0
  return factorial(n) / (factorial(k) * factorial(n - k))
}

/* ------------------------------------------------------------------ */
/* Default tree (2-stage MoEYS experiment)                             */
/* ------------------------------------------------------------------ */
function defaultTree(): PTree {
  return {
    root: { id: 'root', parentId: null,   label: '',  prob: '1'   },
    n1:   { id: 'n1',   parentId: 'root', label: 'A', prob: '1/2' },
    n2:   { id: 'n2',   parentId: 'root', label: 'Ā', prob: '1/2' },
    n3:   { id: 'n3',   parentId: 'n1',  label: 'B', prob: '2/3' },
    n4:   { id: 'n4',   parentId: 'n1',  label: 'B̄', prob: '1/3' },
    n5:   { id: 'n5',   parentId: 'n2',  label: 'B', prob: '1/4' },
    n6:   { id: 'n6',   parentId: 'n2',  label: 'B̄', prob: '3/4' },
  }
}

/* ------------------------------------------------------------------ */
/* Layout computation                                                   */
/* ------------------------------------------------------------------ */
const LEVEL_W = 160
const X_START = 50
const NODE_R  = 18
const LEAF_H  = 72   // px per leaf node

interface LayoutNode extends PNode {
  x: number
  y: number
  depth: number
  pathProb: number
  probVal: number
  isLeaf: boolean
  children: NodeId[]
  branchSumValid: boolean
}

function computeLayout(tree: PTree): Record<NodeId, LayoutNode> {
  // Build children lists
  const childMap: Record<NodeId, NodeId[]> = {}
  for (const id of Object.keys(tree)) childMap[id] = []
  for (const node of Object.values(tree)) {
    if (node.parentId) childMap[node.parentId].push(node.id)
  }
  for (const id of Object.keys(childMap)) childMap[id].sort()

  // Depths via BFS
  const depth: Record<NodeId, number> = { root: 0 }
  const queue: NodeId[] = ['root']
  while (queue.length) {
    const id = queue.shift()!
    for (const c of childMap[id]) { depth[c] = depth[id] + 1; queue.push(c) }
  }

  // Collect leaves in DFS order
  const leaves: NodeId[] = []
  function dfs(id: NodeId) {
    if (!childMap[id].length) { leaves.push(id); return }
    for (const c of childMap[id]) dfs(c)
  }
  dfs('root')

  // Y positions: leaves evenly spaced, parents average of children
  const svgH = Math.max(300, leaves.length * LEAF_H)
  const leafStep = svgH / leaves.length
  const rawY: Record<NodeId, number> = {}
  leaves.forEach((id, i) => { rawY[id] = leafStep * (i + 0.5) })

  function computeY(id: NodeId): number {
    if (rawY[id] !== undefined) return rawY[id]
    const ys = childMap[id].map(computeY)
    rawY[id] = ys.reduce((a, b) => a + b, 0) / ys.length
    return rawY[id]
  }
  for (const id of Object.keys(tree)) computeY(id)

  // Path probabilities
  const pathProb: Record<NodeId, number> = { root: 1 }
  function computePathProb(id: NodeId) {
    const p = tree[id].parentId
    const v = parseProb(tree[id].prob)
    pathProb[id] = p ? (pathProb[p] ?? 1) * (isNaN(v) ? 0 : v) : 1
    for (const c of childMap[id]) computePathProb(c)
  }
  computePathProb('root')

  // Branch sum validation
  const valid: Record<NodeId, boolean> = {}
  for (const id of Object.keys(tree)) {
    if (!childMap[id].length) { valid[id] = true; continue }
    const sum = childMap[id].reduce((acc, c) => acc + (parseProb(tree[c].prob) || 0), 0)
    valid[id] = Math.abs(sum - 1) < 0.0015
  }

  const result: Record<NodeId, LayoutNode> = {}
  for (const [id, node] of Object.entries(tree)) {
    result[id] = {
      ...node,
      x: X_START + depth[id] * LEVEL_W,
      y: rawY[id],
      depth: depth[id],
      pathProb: pathProb[id],
      probVal: parseProb(node.prob),
      isLeaf: !childMap[id].length,
      children: childMap[id],
      branchSumValid: valid[id],
    }
  }
  return result
}

/* ================================================================== */
/* Component                                                            */
/* ================================================================== */
export function ProbabilityLab() {
  const { language } = useI18n()
  const isKm = language === 'km'
  const pick = (en: string, km: string) => (isKm ? km : en)

  /* --- state -------------------------------------------------------- */
  const [tree, setTree] = useState<PTree>(() => {
    try {
      const s = localStorage.getItem('prob-lab-tree')
      return s ? (JSON.parse(s) as PTree) : defaultTree()
    } catch { return defaultTree() }
  })
  const [selected, setSelected] = useState<NodeId | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [editProb, setEditProb]   = useState('')
  const [tab, setTab] = useState<'tree' | 'perm' | 'comb'>('tree')
  const [permN, setPermN] = useState(5)
  const [permK, setPermK] = useState(2)
  const [combN, setCombN] = useState(5)
  const [combK, setCombK] = useState(2)

  /* --- persist ------------------------------------------------------- */
  useEffect(() => {
    try { localStorage.setItem('prob-lab-tree', JSON.stringify(tree)) } catch { /* ignore */ }
  }, [tree])

  /* --- layout -------------------------------------------------------- */
  const layout = useMemo(() => computeLayout(tree), [tree])

  const svgH = useMemo(() => {
    const ys = Object.values(layout).map(n => n.y)
    return Math.max(300, Math.max(...ys) + 50)
  }, [layout])

  const maxDepth = useMemo(
    () => Math.max(...Object.values(layout).map(n => n.depth)),
    [layout],
  )
  const svgW = X_START + (maxDepth + 1) * LEVEL_W + 40

  /* --- selection ----------------------------------------------------- */
  function selectNode(id: NodeId) {
    if (id === 'root') return
    setSelected(id)
    setEditLabel(tree[id].label)
    setEditProb(tree[id].prob)
  }

  function commitEdit() {
    if (!selected) return
    setTree(t => ({ ...t, [selected]: { ...t[selected], label: editLabel, prob: editProb } }))
  }

  function addChildren(parentId: NodeId) {
    const c1 = uid(), c2 = uid()
    setTree(t => ({
      ...t,
      [c1]: { id: c1, parentId, label: 'B',  prob: '1/2' },
      [c2]: { id: c2, parentId, label: 'B̄', prob: '1/2' },
    }))
    setSelected(c1)
    setEditLabel('B')
    setEditProb('1/2')
  }

  function removeNode(id: NodeId) {
    if (id === 'root') return
    const toRemove = new Set<NodeId>()
    function collect(nid: NodeId) {
      toRemove.add(nid)
      for (const on of Object.values(tree)) {
        if (on.parentId === nid) collect(on.id)
      }
    }
    collect(id)
    const next: PTree = {}
    for (const [oid, on] of Object.entries(tree)) {
      if (!toRemove.has(oid)) next[oid] = on
    }
    setTree(next)
    setSelected(null)
  }

  /* --- derived values ----------------------------------------------- */
  const leaves = useMemo(
    () => Object.values(layout).filter(n => n.isLeaf),
    [layout],
  )
  const leafSum = leaves.reduce((s, l) => s + l.pathProb, 0)
  const leafSumOk = Math.abs(leafSum - 1) < 0.0015

  // First depth-1 node ("A") and its first child ("B") for formula panel
  const d1Nodes = Object.values(layout)
    .filter(n => n.depth === 1)
    .sort((a, b) => a.id.localeCompare(b.id))
  const nodeA = d1Nodes[0]
  const nodeAB = nodeA
    ? Object.values(layout).find(n => n.parentId === nodeA.id && n.depth === 2)
    : undefined
  const pA   = nodeA?.pathProb ?? NaN
  const pAB  = nodeAB?.pathProb ?? NaN
  const pBgA = isFinite(pA) && pA > 0 ? pAB / pA : NaN

  // Total probability for label matching nodeAB
  const targetLabel = nodeAB?.label ?? 'B'
  const matchLeaves = leaves.filter(l => l.label === targetLabel)
  const pBTotal = matchLeaves.reduce((s, l) => s + l.pathProb, 0)

  const lA  = nodeA?.label  || 'A'
  const lB  = nodeAB?.label || 'B'

  /* --- render -------------------------------------------------------- */
  return (
    <div className="prob-lab">

      {/* Tab bar */}
      <div className="prob-lab__tabs">
        {(['tree', 'perm', 'comb'] as const).map(t => (
          <button key={t} type="button"
            className={`prob-lab__tab${tab === t ? ' is-active' : ''}`}
            onClick={() => setTab(t)}>
            {t === 'tree' ? pick('Probability Tree', 'ដើមឈើប្រូបាប')
             : t === 'perm' ? pick('Permutations Aₙᵏ', 'ផ្លាស់ប្ដូរ Aₙᵏ')
             : pick('Combinations Cₙᵏ', 'ផ្សំ Cₙᵏ')}
          </button>
        ))}
      </div>

      {/* ---- TREE TAB ---- */}
      {tab === 'tree' && (
        <div className="prob-lab__inner">

          {/* SVG tree */}
          <div className="prob-lab__svg-wrap">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="prob-lab__svg"
              role="img"
              aria-label={pick('Probability tree diagram', 'គំនូសតំណាងដើមឈើប្រូបាប')}>

              {/* Edges */}
              {Object.values(layout).map(node => {
                if (!node.parentId) return null
                const par = layout[node.parentId]
                const invalid = !par.branchSumValid
                const mx = (par.x + node.x) / 2
                const my = (par.y + node.y) / 2
                return (
                  <g key={`e-${node.id}`}>
                    <line x1={par.x} y1={par.y} x2={node.x} y2={node.y}
                      stroke={invalid ? '#C83B45' : 'var(--line-strong)'}
                      strokeWidth={1.5} />
                    <text x={mx - 2} y={my - 7} fontSize={10} textAnchor="middle"
                      fill={invalid ? '#C83B45' : 'var(--accent)'}
                      fontFamily="'Inter Variable',Inter,sans-serif" fontWeight={600}>
                      {node.prob}
                    </text>
                  </g>
                )
              })}

              {/* Nodes */}
              {Object.values(layout).map(node => {
                if (node.id === 'root') {
                  return <circle key="root" cx={node.x} cy={node.y} r={7} fill="var(--accent)" />
                }
                const isSel = selected === node.id
                return (
                  <g key={node.id} style={{ cursor: 'pointer' }}
                    onClick={() => selectNode(node.id)}>
                    <circle cx={node.x} cy={node.y} r={NODE_R + 4} fill="transparent" />
                    <circle cx={node.x} cy={node.y} r={NODE_R}
                      fill={isSel ? 'var(--accent)' : 'var(--surface-raised, var(--surface))'}
                      stroke={isSel ? 'var(--accent)' : 'var(--line-strong)'}
                      strokeWidth={1.5} />
                    <text x={node.x} y={node.y + 4} textAnchor="middle"
                      fontSize={12} fontWeight={700}
                      fontFamily="'Inter Variable',Inter,sans-serif"
                      fill={isSel ? '#fff' : 'var(--ink)'}>
                      {node.label || '?'}
                    </text>
                    {node.isLeaf && (
                      <text x={node.x + NODE_R + 6} y={node.y + 4}
                        fontSize={9} fill="var(--muted)"
                        fontFamily="'Inter Variable',Inter,sans-serif">
                        {fmt(node.pathProb, 3)}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Panel */}
          <div className="prob-lab__panel">

            {/* Node editor */}
            {selected && selected !== 'root' ? (
              <div className="prob-lab__editor">
                <p className="prob-lab__section-title">
                  {pick('Edit node', 'កែប្រែថ្នាំង')}
                </p>
                <div className="prob-lab__field-row">
                  <label className="prob-lab__field-label">{pick('Label', 'ស្លាក')}</label>
                  <input type="text" value={editLabel} maxLength={8}
                    className="prob-lab__text-input"
                    onChange={e => setEditLabel(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={e => e.key === 'Enter' && commitEdit()} />
                </div>
                <div className="prob-lab__field-row">
                  <label className="prob-lab__field-label">{pick('Probability', 'លទ្ធភាព')}</label>
                  <input type="text" value={editProb} placeholder="e.g. 1/3"
                    className="prob-lab__text-input"
                    onChange={e => setEditProb(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={e => e.key === 'Enter' && commitEdit()} />
                </div>
                <div className="prob-lab__editor-btns">
                  {layout[selected]?.isLeaf && layout[selected].depth < 3 && (
                    <button type="button" className="prob-lab__add-btn"
                      onClick={() => addChildren(selected)}>
                      + {pick('Add branches', 'បន្ថែមមែក')}
                    </button>
                  )}
                  <button type="button" className="prob-lab__remove-btn"
                    onClick={() => removeNode(selected)}>
                    {pick('Remove', 'លុប')}
                  </button>
                </div>
              </div>
            ) : (
              <p className="prob-lab__hint">
                {pick(
                  'Click a node to edit it. Click a leaf node to add branches.',
                  'ចុចថ្នាំងដើម្បីកែប្រែ។ ចុចស្លឹកដើម្បីបន្ថែមមែក។',
                )}
              </p>
            )}

            {/* Path probabilities */}
            <div className="prob-lab__paths">
              <p className="prob-lab__section-title">
                {pick('Path probabilities', 'លទ្ធភាពតាមមាគ៌ា')}
              </p>
              {leaves.map(leaf => {
                const path: string[] = []
                let cur: NodeId | null = leaf.id
                while (cur && cur !== 'root') {
                  path.unshift(tree[cur]?.label || cur)
                  cur = tree[cur]?.parentId ?? null
                }
                return (
                  <div key={leaf.id} className="prob-lab__path-row">
                    <span className="prob-lab__path-label">{path.join(' → ')}</span>
                    <span className="prob-lab__path-val">{fmt(leaf.pathProb, 4)}</span>
                  </div>
                )
              })}
              <div className="prob-lab__path-row prob-lab__path-row--total">
                <span className="prob-lab__path-label">{pick('Total', 'សរុប')}</span>
                <span className="prob-lab__path-val"
                  style={{ color: leafSumOk ? 'var(--success, #0F7A5C)' : '#C83B45' }}>
                  {fmt(leafSum, 4)}
                </span>
              </div>
            </div>

            {/* Key formulas — shown when tree has at least 2 stages */}
            {d1Nodes.length >= 1 && nodeAB && (
              <div className="prob-lab__formulas">
                <p className="prob-lab__section-title">
                  {pick('Key formulas (BacII)', 'រូបមន្តសំខាន់ (BacII)')}
                </p>
                <div className="prob-lab__formula-block">
                  <MathBlock tex={
                    `P(${lA} \\cap ${lB}) = P(${lA}) \\cdot P(${lB}|${lA}) = ${fmt(pA, 3)} \\times ${fmt(pBgA, 3)} = ${fmt(pAB, 3)}`
                  } />
                </div>
                <div className="prob-lab__formula-block">
                  <MathBlock tex={
                    `P(${lB}|${lA}) = \\dfrac{P(${lA} \\cap ${lB})}{P(${lA})} = \\dfrac{${fmt(pAB, 3)}}{${fmt(pA, 3)}} = ${fmt(pBgA, 3)}`
                  } />
                </div>
                {matchLeaves.length > 1 && (
                  <div className="prob-lab__formula-block">
                    <MathBlock tex={
                      `P(${lB}) = \\sum P(B_i) \\cdot P(${lB}|B_i) = ${fmt(pBTotal, 4)}`
                    } />
                  </div>
                )}
              </div>
            )}

            {/* Reset */}
            <button type="button" className="prob-lab__reset-btn"
              onClick={() => { setTree(defaultTree()); setSelected(null) }}>
              {pick('Reset tree', 'កំណត់ដើមឈើឡើងវិញ')}
            </button>
          </div>
        </div>
      )}

      {/* ---- PERMUTATIONS TAB ---- */}
      {tab === 'perm' && (
        <div className="prob-lab__counting">
          <div className="prob-lab__formula-block">
            <MathBlock tex={`A_n^k = \\frac{n!}{(n-k)!}`} />
          </div>
          <div className="prob-lab__count-inputs">
            <div className="prob-lab__count-field">
              <label>n</label>
              <input type="number" min={0} max={20} value={permN}
                className="prob-lab__num-input"
                onChange={e => setPermN(Math.min(20, Math.max(0, Number(e.target.value))))} />
            </div>
            <div className="prob-lab__count-field">
              <label>k</label>
              <input type="number" min={0} max={permN} value={permK}
                className="prob-lab__num-input"
                onChange={e => setPermK(Math.min(permN, Math.max(0, Number(e.target.value))))} />
            </div>
          </div>
          <div className="prob-lab__count-result">
            <MathBlock tex={`A_{${permN}}^{${permK}} = ${permutation(permN, permK).toLocaleString()}`} />
          </div>
        </div>
      )}

      {/* ---- COMBINATIONS TAB ---- */}
      {tab === 'comb' && (
        <div className="prob-lab__counting">
          <div className="prob-lab__formula-block">
            <MathBlock tex={`C_n^k = \\binom{n}{k} = \\frac{n!}{k!\\,(n-k)!}`} />
          </div>
          <div className="prob-lab__count-inputs">
            <div className="prob-lab__count-field">
              <label>n</label>
              <input type="number" min={0} max={20} value={combN}
                className="prob-lab__num-input"
                onChange={e => setCombN(Math.min(20, Math.max(0, Number(e.target.value))))} />
            </div>
            <div className="prob-lab__count-field">
              <label>k</label>
              <input type="number" min={0} max={combN} value={combK}
                className="prob-lab__num-input"
                onChange={e => setCombK(Math.min(combN, Math.max(0, Number(e.target.value))))} />
            </div>
          </div>
          <div className="prob-lab__count-result">
            <MathBlock tex={`C_{${combN}}^{${combK}} = \\binom{${combN}}{${combK}} = ${combination(combN, combK).toLocaleString()}`} />
          </div>
        </div>
      )}
    </div>
  )
}
