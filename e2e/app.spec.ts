import { expect, test } from '@playwright/test'

test.describe('homepage', () => {
  test('renders the hero, grade grid and featured formulas', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('formulas')
    await expect(page.locator('.grade-card')).toHaveCount(6)
    await expect(page.locator('.formula-card').first()).toBeVisible()
  })

  test('primary navigation is visible on desktop', async ({ page, isMobile }) => {
    test.skip(Boolean(isMobile), 'desktop only')
    await page.goto('/')
    const nav = page.locator('.primary-nav')
    await expect(nav).toBeVisible()
    for (const label of ['Home', 'Grades', 'Shapes', 'Search', 'Bookmarks']) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible()
    }
  })

  test('mobile navigation keeps all five destinations reachable', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only')
    await page.goto('/')
    const nav = page.locator('.mobile-nav')
    await expect(nav).toBeVisible()
    for (const label of ['Home', 'Grades', 'Shapes', 'Search', 'Saved']) {
      await expect(nav.getByRole('link', { name: label, exact: true })).toBeVisible()
    }
  })
})

test.describe('grade and topic browsing', () => {
  test('walks grade → subject → topic and renders mathematics', async ({ page }) => {
    await page.goto('/grades/8')
    await expect(page.locator('.subject-card').first()).toBeVisible()

    // Subject cards expose topic links directly; follow one to a topic page.
    await page.locator('.subject-card__topics a').first().click()
    await expect(page).toHaveURL(/\/topics\//)
    await expect(page.locator('.formula-detail').first()).toBeVisible()
    await expect(page.locator('.katex').first()).toBeVisible()

    // The same subject also has a dedicated page with a topic list.
    await page.goto('/grades/8')
    await page.locator('.subject-card__title a').first().click()
    await expect(page).toHaveURL(/\/subjects\//)
    await expect(page.locator('.topic-row').first()).toBeVisible()
  })

  test('every grade 7–12 page loads with content', async ({ page }) => {
    for (const grade of [7, 8, 9, 10, 11, 12]) {
      await page.goto(`/grades/${grade}`)
      await expect(page.locator('.subject-card').first()).toBeVisible()
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    }
  })

  test('unknown routes show a designed 404', async ({ page }) => {
    await page.goto('/grades/99')
    await expect(page.getByText("doesn’t add up", { exact: false })).toBeVisible()
  })
})

test.describe('search', () => {
  test('finds a formula and opens it', async ({ page }) => {
    await page.goto('/search')
    const input = page.getByRole('searchbox')
    await input.fill('quadratic formula')
    await expect(page.locator('.result-card').first()).toBeVisible()
    await page.locator('.result-card').first().click()
    await expect(page.locator('.formula-detail').first()).toBeVisible()
  })

  test('shows a useful empty state for nonsense', async ({ page }) => {
    await page.goto('/search')
    await page.getByRole('searchbox').fill('zzzqqq')
    await expect(page.getByText('No results for', { exact: false })).toBeVisible()
  })

  test('keyboard shortcut opens the search dialog', async ({ page }) => {
    await page.goto('/')
    await page.locator('body').click({ position: { x: 5, y: 300 } })
    await page.keyboard.press('Control+k')
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
  })
})

test.describe('bookmarks', () => {
  test('a saved formula survives a reload', async ({ page }) => {
    await page.goto('/search')
    await page.getByRole('searchbox').fill('area of a circle')
    await page.locator('.result-card').first().click()
    const toggle = page.locator('.formula-detail .bookmark-toggle').first()
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await page.reload()
    await expect(page.locator('.formula-detail .bookmark-toggle').first()).toHaveAttribute('aria-pressed', 'true')

    await page.goto('/bookmarks')
    await expect(page.locator('.bookmark-item').first()).toBeVisible()
  })
})

test.describe('shape lab', () => {
  test('changing a dimension updates a live measurement', async ({ page }) => {
    await page.goto('/shapes/circle')
    await expect(page.locator('.lab')).toBeVisible()

    const slider = page.locator('.slider input[type="range"]').first()
    const readout = page.locator('.readout strong').first()
    const before = await readout.textContent()

    await slider.focus()
    for (let i = 0; i < 6; i += 1) await slider.press('ArrowRight')

    await expect.poll(async () => (await readout.textContent()) ?? '').not.toBe(before)
  })

  test('reset restores the default dimensions', async ({ page }) => {
    await page.goto('/shapes/circle')
    await expect(page.locator('.lab')).toBeVisible()
    const slider = page.locator('.slider input[type="range"]').first()
    const initial = await slider.inputValue()
    await slider.focus()
    for (let i = 0; i < 4; i += 1) await slider.press('ArrowLeft')
    await page.getByRole('button', { name: /reset dimensions/i }).click()
    await expect(slider).toHaveValue(initial)
  })

  test('shape search filters the gallery', async ({ page }) => {
    await page.goto('/shapes')
    await expect(page.locator('#collection')).toBeVisible()
    await page.locator('#shape-search').fill('cone')
    const names = await page.locator('#collection .shape-card__name').allTextContents()
    expect(names.length).toBeGreaterThan(0)
    expect(names.every((name) => name.toLowerCase().includes('cone'))).toBe(true)
  })

  test('a 3D solid renders a canvas with an accessible label', async ({ page }) => {
    await page.goto('/shapes/sphere')
    await expect(page.locator('.lab')).toBeVisible()
    const canvas = page.locator('.shape-canvas canvas')
    await expect(canvas).toBeVisible()
    await expect(canvas).toHaveAttribute('aria-label', /sphere/i)
  })
})

test.describe('exercises', () => {
  test('answering a multiple-choice question shows feedback', async ({ page }) => {
    await page.goto('/grades/7/subjects/number-systems/topics/integers')
    const firstChoice = page.locator('.choice').first()
    await expect(firstChoice).toBeVisible()
    await firstChoice.scrollIntoViewIfNeeded()
    await firstChoice.click({ force: true })
    const checkBtn = page.getByRole('button', { name: 'Check answer' })
    await checkBtn.scrollIntoViewIfNeeded()
    await checkBtn.click({ force: true })
    await expect(page.locator('.feedback')).toBeVisible()
  })

  test('a numeric answer can be checked and advanced', async ({ page }) => {
    await page.goto('/grades/7/subjects/number-systems/topics/integers')
    const numeric = page.locator('.numeric-answer input').first()
    if ((await numeric.count()) === 0) return
    await numeric.fill('42')
    await page.getByRole('button', { name: 'Check answer' }).click()
    await expect(page.locator('.feedback')).toBeVisible()
    await page.getByRole('button', { name: /next question|see score/i }).click()
    await expect(page.locator('.exercise-prompt').first()).toBeVisible()
  })
})