import { PropertyCrossPage } from './app.po';

describe('property-cross App', () => {
  let page: PropertyCrossPage;

  beforeEach(() => {
    page = new PropertyCrossPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
