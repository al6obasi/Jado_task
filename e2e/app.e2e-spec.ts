import { JadoPage } from './app.po';

describe('jado App', function() {
  let page: JadoPage;

  beforeEach(() => {
    page = new JadoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
