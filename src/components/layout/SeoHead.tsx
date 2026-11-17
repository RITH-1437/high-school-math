import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  OG_IMAGE,
  absoluteUrl,
  getRouteMeta,
  serializeJsonLd,
  type RouteMeta,
} from '../../lib/seo'

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function syncCanonical(meta: RouteMeta) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (meta.status !== 200) {
    link?.remove()
    return
  }
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = absoluteUrl(meta.path)
}

function syncJsonLd(meta: RouteMeta) {
  let script = document.getElementById('seo-jsonld')
  if (!meta.jsonLd.length) {
    script?.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.id = 'seo-jsonld'
    script.setAttribute('type', 'application/ld+json')
    document.head.appendChild(script)
  }
  script.textContent = serializeJsonLd(meta.jsonLd)
}

/** Applies route metadata to the document head. */
export function applyRouteMeta(meta: RouteMeta) {
  const url = absoluteUrl(meta.path)
  document.title = meta.title
  upsertMeta('name', 'description', meta.description)
  upsertMeta('name', 'robots', meta.robots)
  upsertMeta('property', 'og:type', meta.ogType)
  upsertMeta('property', 'og:title', meta.title)
  upsertMeta('property', 'og:description', meta.description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:image', OG_IMAGE)
  upsertMeta('name', 'twitter:title', meta.title)
  upsertMeta('name', 'twitter:description', meta.description)
  syncCanonical(meta)
  syncJsonLd(meta)
}

/**
 * Keeps <title>, description, canonical, robots, Open Graph and JSON-LD in
 * sync with the current route. The same data produces the prerendered head,
 * so the first paint and every client-side navigation agree.
 */
export function SeoHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    applyRouteMeta(getRouteMeta(pathname))
  }, [pathname])

  return null
}
