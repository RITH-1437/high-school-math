import type { Flowchart, GraphSpec } from '../../types/content'
import { grade7Visuals } from './grade7'
import { grade8Visuals } from './grade8'
import { grade9Visuals } from './grade9'
import { grade10Visuals } from './grade10'
import { grade11Visuals } from './grade11'
import { grade12Visuals } from './grade12'
import type { TopicVisualSet, TopicVisuals } from './types'

export type { TopicVisualSet, TopicVisuals } from './types'

export const visualsByGrade: Record<string, TopicVisuals> = {
  '7': grade7Visuals,
  '8': grade8Visuals,
  '9': grade9Visuals,
  '10': grade10Visuals,
  '11': grade11Visuals,
  '12': grade12Visuals,
}

const merged: TopicVisuals = Object.assign({}, ...Object.values(visualsByGrade))

const EMPTY: Required<TopicVisualSet> = { flowcharts: [], graphs: [] }

export function visualsFor(topicId: string): Required<TopicVisualSet> {
  const set = merged[topicId]
  if (!set) return EMPTY
  return { flowcharts: set.flowcharts ?? [], graphs: set.graphs ?? [] }
}

export function hasVisuals(topicId: string): boolean {
  const { flowcharts, graphs } = visualsFor(topicId)
  return flowcharts.length + graphs.length > 0
}

export const allFlowcharts: Flowchart[] = Object.values(merged).flatMap((set) => set.flowcharts ?? [])
export const allGraphs: GraphSpec[] = Object.values(merged).flatMap((set) => set.graphs ?? [])
