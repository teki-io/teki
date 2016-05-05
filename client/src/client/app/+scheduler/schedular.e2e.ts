describe('Scheduler', () => {
  beforeEach(() => {
    browser.get('/');
    browser.waitForAngular();
    element.all(by.css('nav > a')).get(1).click();
  });

  it('should have correct feature heading', () => {
    let el = element(by.css('teki-app teki-scheduler h2'));
    expect(el.getText()).toEqual('Features');
  });
});
