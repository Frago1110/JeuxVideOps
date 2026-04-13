import {test, expect} from '@playwright/test';

test('Game should be playable', async ({page}) => {
  // 1. Naviguer vers la page
  await page.goto('http://localhost:3000/index.html');

  // 2. Vérifier quelque chose
  await expect(page).toHaveTitle('js13k-2021');
});

test('Game should have a canvas', async ({page}) => {
  // 1. Naviguer vers la page
  await page.goto('http://localhost:3000/index.html');

  await expect(page.locator('#canvas')).toBeVisible();
});

test('Game should have a title', async ({page}) => {
  await page.goto('http://localhost:3000/index.html');

  await expect(page.locator('h1')).toContainText('Two');
});

