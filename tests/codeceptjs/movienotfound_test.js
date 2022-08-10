Feature('Movie not found!')

Scenario('Search "sadlnfn" and see "Movie not found!" response', async ({ I }) => {
    I.amOnPage('/');
    I.seeElement('#whatsin');
    I.fillField('input','sadlnfn');
    I.pressKey('Enter');
    I.waitForText('Movie not found!',5)
    I.see('Movie not found!','h2');
    I.wait(1)
})