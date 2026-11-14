import type { Shape } from '../../types/content'
import { Shape2DGlyph } from './Shape2D'
import { Shape3DGlyph } from './Shape3D'

export function ShapeGlyph({ shape }: { shape: Shape }) {
  return shape.category === '3d' ? <Shape3DGlyph shapeId={shape.id} /> : <Shape2DGlyph shape={shape} />
}
