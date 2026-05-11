import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test.describe('StoreFront E2E User Flows', () => {

  test('Home page loads and displays products', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'StoreFront' })).toBeVisible();

    const firstProduct = page.locator('.product-grid').getByRole('link').first();
    await expect(firstProduct).toBeVisible({ timeout: 10000 });
  });

  test('Full cart flow: View product, add to cart, and verify checkout page', async ({ page }) => {
    const firstProduct = page.locator('.product-grid').getByRole('link').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/product\/\d+/);

    const addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

   const cartLink = page.getByRole('link', { name: /Cart 1/ });
    await expect(cartLink).toBeVisible();

    await cartLink.click();
   await expect(page).toHaveURL(/.*\/cart/);

    await expect(page.getByRole('heading', { name: 'Your Cart (1 items)' })).toBeVisible();
    const removeBtn = page.getByRole('button', { name: 'Remove' });
    await expect(removeBtn).toBeVisible();

    await removeBtn.click();
    await expect(page.getByRole('heading', { name: 'Your Cart is Empty' })).toBeVisible();
  });
});