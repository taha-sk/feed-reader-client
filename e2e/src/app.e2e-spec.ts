import { browser, logging, protractor } from 'protractor';
import { FeedReaderPage } from './app.po';

describe('workspace-project App', () => {
  let page: FeedReaderPage;

  beforeEach(() => {
    page = new FeedReaderPage();
  });

  it('should display login form', async () => {
    await page.navigateTo();
    expect(await page.getHeaderOneText()).toEqual('Please sign in');
  });

  it('should login and show main page & navigation links', async () => {
    await page.navigateTo();
    await page.login("admin", "admin");
    //check title
    expect(await page.getAppTitle()).toEqual('Feed Reader');
    const navLinks = await page.getNavLinks();
    //check nav links
    expect(await navLinks[0].getText()).toEqual('Manage Widgets');
    expect(await navLinks[1].getText()).toEqual('Log Out');
  });

  it('should open manage widgets with manage widgets link', async () => {
    await page.navigateTo();
    const navLinks = await page.getNavLinks();
    expect(await navLinks[0].getText()).toEqual('Manage Widgets');
    await navLinks[0].click();
    expect(await page.getHeaderTwoText()).toEqual('Manage Widgets');
  });

  it('should open manage widgets and add widget', async () => {
    await page.navigateTo();
    const navLinks = await page.getNavLinks();
    expect(await navLinks[0].getText()).toEqual('Manage Widgets');
    await navLinks[0].click();
    const addWidgetBtn = await page.getElementById('addWidgetBtn');
    expect(await addWidgetBtn[0].getText()).toEqual("Add Widget");
    await addWidgetBtn[0].click();
    //wait for animation
    let EC = protractor.ExpectedConditions;
    await browser.wait(EC.stalenessOf(addWidgetBtn[0]), 1000);
    //make sure that you're on the page
    expect(await page.getHeaderThreeText()).toEqual('Add Widget');
    //select quote
    await page.selectType("Quote");
    const widgetTitleInpt = await page.getElementById('widgetTitleInpt');
    await widgetTitleInpt[0].clear();
    await widgetTitleInpt[0].sendKeys("Test");
    const submit = await page.getSubmit();
    await submit[0].click();
    //return
    await browser.wait(EC.stalenessOf(submit[0]), 1000);
    expect(await page.getHeaderThreeText()).toEqual('Widgets');
  });

  it('should open manage widgets and delete widget', async () => {
    await page.navigateTo();
    const navLinks = await page.getNavLinks();
    expect(await navLinks[0].getText()).toEqual('Manage Widgets');
    await navLinks[0].click();
    const rowWidgetTitles = await page.getElementById('rowWidgetTitle');
    const deleteWidgetBtn = await page.getElementById('deleteWidgetBtn');
    //number of titles should equal to number of delete buttons
    expect(rowWidgetTitles.length).toEqual(deleteWidgetBtn.length);
    //last one should be the test
    const lastIndex = rowWidgetTitles.length - 1;
    expect(await rowWidgetTitles[lastIndex].getText()).toEqual("Test");
    //Then click delete button
    await deleteWidgetBtn[lastIndex].click();
    //wait for animation
    let EC = protractor.ExpectedConditions;
    await browser.wait(EC.stalenessOf(deleteWidgetBtn[lastIndex]), 1000);
    const deleteSubmit = await page.getElementById('deleteWidgetBtn');
    await deleteSubmit[0].click();
    //return
    await browser.wait(EC.stalenessOf(deleteSubmit[0]), 1000);
    expect(await page.getHeaderThreeText()).toEqual('Widgets');
  });

  it('should logout', async () => {
    await page.navigateTo();
    const navLinks = await page.getNavLinks();
    expect(await navLinks[1].getText()).toEqual('Log Out');
    await navLinks[1].click();
    //return to login page
    expect(await page.getHeaderOneText()).toEqual('Please sign in');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
