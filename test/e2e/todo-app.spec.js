const { test, expect } = require('@playwright/test');

test('user can add a todo and see the footer count update', async ({ page }) => {
  await page.goto('/');

  await page.locator('#new-todo').fill('Write end-to-end tests');
  await page.locator('#new-todo').press('Enter');

  await expect(page.locator('#item-count span')).toHaveText('2');
  await expect(page.locator('#list-items .todo-title').last()).toHaveText('Write end-to-end tests');
});
