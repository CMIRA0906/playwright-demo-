import { test, expect } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';

test.describe('Sauce Demo Inventory Page', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
  });

  test('should load at least 6 inventory items', async ({ page }) => {
    // Navigate to the inventory page
    await inventoryPage.navigateToInventory();

    // Verify the page loads successfully
    const isPageLoaded = await inventoryPage.isInventoryPageLoaded();
    expect(isPageLoaded).toBe(true);

    // Validate that at least 6 items are present
    const hasMinimumItems = await inventoryPage.validateMinimumItemsPresent(6);
    expect(hasMinimumItems).toBe(true);

    // Get actual count for better test reporting
    const actualItemCount = await inventoryPage.getInventoryItemsCount();
    console.log(`Found ${actualItemCount} inventory items`);
    
    // Additional assertion with descriptive message
    expect(actualItemCount, `Expected at least 6 items, but found ${actualItemCount}`).toBeGreaterThanOrEqual(6);
  });

  test('should display inventory item details correctly', async ({ page }) => {
    await inventoryPage.navigateToInventory();
    
    // Verify items have names
    const itemNames = await inventoryPage.getInventoryItemNames();
    expect(itemNames.length).toBeGreaterThanOrEqual(6);
    
    // Verify all items have non-empty names
    itemNames.forEach((name, index) => {
      expect(name.trim(), `Item ${index + 1} should have a non-empty name`).not.toBe('');
    });
  });

  test('should have functional add to cart buttons for all items', async ({ page }) => {
    await inventoryPage.navigateToInventory();
    
    const itemCount = await inventoryPage.getInventoryItemsCount();
    const buttonCount = await inventoryPage.addToCartButtons.count();
    
    // Verify each item has an add to cart button
    expect(buttonCount).toEqual(itemCount);
    expect(buttonCount).toBeGreaterThanOrEqual(6);
  });
});