import { BcPage } from './app.po';

describe('bc App', function() {
  let page: BcPage;

  beforeEach(() => {
    page = new BcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
