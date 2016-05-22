describe('schedule', function() {

  beforeEach(function() {
    browser.get('');
  });

  it('should have correct h1', function() {
      expect(element(by.css('app section schedule h1')).getText())
      .toEqual('Howdy!');
  });

  it('should have correct h2', function() {
      expect(element(by.css('app section schedule h2')).getText())
      .toEqual('Gratz!');
  });

  it('should have correct success msg', function() {
      expect(element(by.css('app section schedule p')).getText())
      .toEqual('Your deployment of Angular 2 Seed worked perfectly! Click about (above) to get your reward!');
  });
});
