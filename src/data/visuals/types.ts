import type { Flowchart, GraphSpec } from '../../types/content'

export interface TopicVisualSet {
  /** Decision/procedure flowcharts, shown first. */
  flowcharts?: Flowchart[]
  /** Exact coordinate-plane graphs. */
  graphs?: GraphSpec[]
}

/** Keyed by topic id. */
export type TopicVisuals = Record<string, TopicVisualSet>
