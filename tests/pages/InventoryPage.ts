import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryItemNames = page.locator('.inventory_item_name');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('.inventory_item button, .btn_inventory');
  }

  async navigateToInventory() {
    await this.page.goto('https://www.saucedemo.com/v1/inventory.html');
  }

  async waitForInventoryToLoad() {
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }

  async getInventoryItemsCount(): Promise<number> {
    await this.waitForInventoryToLoad();
    return await this.inventoryItems.count();
  }

  async getInventoryItemNames(): Promise<string[]> {
    await this.waitForInventoryToLoad();
    return await this.inventoryItemNames.allTextContents();
  }

  async isInventoryPageLoaded(): Promise<boolean> {
    try {
      await this.inventoryContainer.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async validateMinimumItemsPresent(minimumCount: number): Promise<boolean> {
    const actualCount = await this.getInventoryItemsCount();
    return actualCount >= minimumCount;
  }
}