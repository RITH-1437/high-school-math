import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

if (!('IntersectionObserver' in window)) {
  class MockObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  ;(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = MockObserver
}

if (!('ResizeObserver' in window)) {
  class MockResize {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  ;(window as unknown as { ResizeObserver: unknown }).ResizeObserver = MockResize
}

window.scrollTo = (() => undefined) as typeof window.scrollTo
