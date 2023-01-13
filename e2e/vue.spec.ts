import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('https://vuejs.org/');
  await expect(page.locator('p.description')).toHaveText('An approachable, performant and versatile framework for building web user interfaces.');
})
