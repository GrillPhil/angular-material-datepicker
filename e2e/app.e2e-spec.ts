import { Ng2MaterialDatePickerPage } from './app.po';

describe('ng2-material-date-picker App', function() {
  let page: Ng2MaterialDatePickerPage;

  beforeEach(() => {
    page = new Ng2MaterialDatePickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
