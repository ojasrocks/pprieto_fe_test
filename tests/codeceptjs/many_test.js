Feature('Too many results.');

Scenario('Search "it" and see "Too many results." response ', async ({ I }) => {
        I.amOnPage('/');
        I.seeElement('#whatsin');
        I.fillField('input','it');
        I.pressKey('Enter');
        I.waitForText('Too many results.',5)
        I.see('Too many results.','h2');
        I.wait(1)
});
