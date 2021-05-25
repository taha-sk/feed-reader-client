import { browser, by, element, ElementFinder } from 'protractor';

export class FeedReaderPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getHeaderOneText(): Promise<string> {
    return element(by.css('h1')).getText();
  }

  async getHeaderTwoText(): Promise<string> {
    return element(by.css('h2')).getText();
  }

  async getHeaderThreeText(): Promise<string> {
    return element(by.css('h3')).getText();
  }

  async login(user: string, password: string): Promise<void> {
    await element(by.id('inputUsername')).sendKeys(user);
    await element(by.id('inputPassword')).sendKeys(password);
    const submit = await this.getSubmit();
    await submit[0].click();
  }

  async getAppTitle(): Promise<string> {
    return element(by.css('nav > a')).getText();
  }

  async getNavLinks(): Promise<ElementFinder[]> {
    return element.all(by.css('a[ngbNavLink]'));
  }

  async getElementById(id: string): Promise<ElementFinder[]> {
    return element.all(by.id(id));
    
  }

  async selectType(type: string): Promise<void> {
    await element(by.cssContainingText('option', type)).click();
  }

  async getSubmit(): Promise<ElementFinder[]> {
    return element.all(by.css('[type=submit]'));
  }

}
