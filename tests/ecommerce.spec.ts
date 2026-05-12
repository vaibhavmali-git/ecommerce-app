import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('main').getByRole('link').first()).toBeVisible({ timeout: 10000 });
});

test.describe('E-Commerce App - Basic Requirements', () => {

  /*----- 1. HOME PAGE -----*/

  test('displays a grid of products with name and price', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

    const firstProduct = page.getByRole('main').getByRole('link').first();
    await expect(firstProduct).toBeVisible();

    await expect(firstProduct.locator('[class*="title"]')).toBeVisible();
    await expect(firstProduct.locator('[class*="price"]')).toBeVisible();
  });

  test('each product card links to its detail page', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();
    await expect(page).toHaveURL(/\/product\/\d+/);
  });

  /*-----2. FILTER + SORT (URL-persisted) -----*/

  test('filter by category updates URL so link is shareable', async ({ page }) => {
    await page.getByRole('button', { name: /Filter/i }).click();
    await page.getByRole('button', { name: /Clothes/i }).click();

    await expect(page).toHaveURL(/category=/);

    await page.reload();
    await expect(page).toHaveURL(/category=/);

    await page.getByRole('button', { name: /Filter/i }).click();
    await expect(page.getByText('1 selected')).toBeVisible();
  });

  test('filter persists on back button navigation', async ({ page }) => {
    await page.getByRole('button', { name: /Filter/i }).click();
    await page.getByRole('button', { name: /Clothes/i }).click();
    await expect(page).toHaveURL(/category=/);

    await page.getByRole('heading', { name: 'Products' }).click();
    await expect(page.getByText('Select Categories')).not.toBeVisible();

    await page.getByRole('main').getByRole('link').first().click({ timeout: 10000 });
    await expect(page).toHaveURL(/\/product\/\d+/);

    await page.goBack();
    await expect(page).toHaveURL(/category=/);
  });

  test('sort by price updates URL so it persists on reload', async ({ page }) => {
    await page.getByRole('button', { name: /Sort:/i }).click();
    await page.getByRole('button', { name: 'Low to High' }).click();

    await expect(page).toHaveURL(/sort=price-asc/);

    await page.reload();
    await expect(page).toHaveURL(/sort=price-asc/);
    await expect(page.getByRole('button', { name: /Sort: Low to High/i })).toBeVisible();
  });

  /*----- 3. PRODUCT DETAIL PAGE -----*/

  test('product detail page shows title, description, price and add to cart button', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();
    await expect(page).toHaveURL(/\/product\/\d+/);

    await expect(page.locator('[class*="productDetailInfo"] h2')).toBeVisible();
    await expect(page.locator('[class*="productDescription"]')).toBeVisible();
    await expect(page.locator('[class*="productPrice"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
  });

  /*----- 4. CART FUNCTIONALITY -----*/

  test('add to cart updates cart count in navbar', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    await expect(page.locator('[class*="cartBadge"]')).toHaveText('1');
  });

  test('cart page shows total items, total price and remove button', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    await page.locator('a[href="/cart"]').click();
    await expect(page).toHaveURL(/\/cart/);

    await expect(page.getByRole('heading', { name: /Shopping Cart/i })).toBeVisible();
    await expect(page.locator('[class*="summaryTotal"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('removing item from cart shows empty state', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    await page.locator('a[href="/cart"]').click();
    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('heading', { name: 'Your Cart is Empty' })).toBeVisible();
  });

  /*----- 5. NAVIGATION -----*/

  test('logo navigates back to home from product detail', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();
    await expect(page).toHaveURL(/\/product\/\d+/);

    await page.locator('[class*="logoGroup"]').click();
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('"Back to products" button navigates to home', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();

    await page.getByRole('button', { name: /Back to products/i }).click();
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('cart icon navigates to cart page', async ({ page }) => {
    await page.locator('a[href="/cart"]').click();
    await expect(page).toHaveURL(/\/cart/);
  });

  /*----- 6.localStorage persistence -----*/

  test('cart persists after page refresh (localStorage)', async ({ page }) => {
    await page.getByRole('main').getByRole('link').first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).click();

    await page.reload();

    await expect(page.locator('[class*="cartBadge"]')).toHaveText('1');
  });

});