import { Browser, Page, BrowserContext } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

export interface TestWorld {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  confirmationPage: ConfirmationPage;
}