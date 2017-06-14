import { Mean2AppPage } from './app.po';

describe('test-angular App', () => {
  let page: Mean2AppPage;

  beforeEach(() => {
    page = new Mean2AppPage();
  });

  it('should  first page be defined', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toBeDefined;
  });
});
