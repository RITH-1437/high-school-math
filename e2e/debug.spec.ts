import { expect, test } from '@playwright/test'

test('debug search shortcut + mobile nav', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Control+k')
  await page.waitForTimeout(300)
  console.log('dialog after ctrl+k:', await page.locator('[role="dialog"]').count())
  console.log('overlay count:', await page.locator('.search-overlay').count())

  await page.locator('body').click({ position: { x: 5, y: 300 } })
  await page.keyboard.press('/')
  await page.waitForTimeout(300)
  console.log('dialog after slash:', await page.locator('[role="dialog"]').count())

  await page.keyboard.press('Escape')
  await page.waitForTimeout(200)
  console.log('dialog after esc:', await page.locator('[role="dialog"]').count())

  await page.goto('/')
  const mobileVisible = await page.locator('.mobile-nav').isVisible()
  const primaryVisible = await page.locator('.primary-nav').isVisible()
  console.log('viewport', page.viewportSize(), 'mobile visible', mobileVisible, 'primary visible', primaryVisible)
  console.log('mobile links', await page.locator('.mobile-nav a').count())
})