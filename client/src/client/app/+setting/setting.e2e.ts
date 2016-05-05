describe('Setting', () => {
  beforeEach(() => {
    browser.get('/');
    browser.waitForAngular();
    element.all(by.css('nav > a')).get(1).click();
  });

  it('should have correct feature heading', () => {
    let el = element(by.css('teki-app teki-setting h2'));
    expect(el.getText()).toEqual('Features');
  });
});
