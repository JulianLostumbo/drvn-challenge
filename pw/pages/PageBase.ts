import { Page } from 'playwright';
import pages from './data/pages.json';

type PageLabel = keyof typeof pages;

export class PageBase {
  protected page: Page;
  protected readonly baseUrl: string;
  static page: any;
  static baseUrl: any;

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com';
  }

  /**
   * Navigates to a named page based on the pages.json mapping.
   * @param pageName Page name without ".html"
   */
  async goToPage(pageName: string): Promise<void> {
    const url = `${this.baseUrl}/${pageName}.html`;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Gets the path for a named page based on the pages.json mapping.
   * @param label Label as defined in pages.json
   * @returns The path for the specified page
   */
  getPagePath(label: PageLabel): string {
    const path = pages[label];
    if (!path) {
      throw new Error(`No page path found for label: "${label}"`);
    }
    return path;
  }
}
