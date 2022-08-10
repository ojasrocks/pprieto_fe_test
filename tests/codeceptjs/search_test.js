Feature('search');

Scenario('search movie id=tt6957966 and favourite it', async ({ I }) => {
        I.amOnPage('/');
        I.see('Don’t know what to search?','h2');
        I.saveScreenshot('1search_homepage.png')
        I.fillField("input","italy");
        I.saveScreenshot('2search_input_filled.png')
        I.pressKey('Enter');
        I.waitForElement("#tt6957966",5);
        I.wait(1);
        I.moveCursorTo("#tt6957966");
        I.saveScreenshot('3search_onMouse_on.png')
        I.wait(1);
        I.click('#tt6957966_heart')
        I.saveScreenshot('4search_onHeart_beat.png')
        I.wait(1);
        I.click('#tt6957966_heart')
        I.saveScreenshot('5search_onHeart_unbeat.png')
        I.wait(1);
        I.click('#tt6957966_toclick');
        I.waitForElement('#tt6957966_data',2)
        I.saveScreenshot('6search_onMovieDetails.png')
        I.moveCursorTo('#tt6957966_favourite');
        I.saveScreenshot('7search_onMouse_onFavourite.png')
        I.wait(1);
        I.click('#tt6957966_favourite');
        I.saveScreenshot('8search_onMouse_ClickFavourite.png')
        I.wait(1);
        I.moveCursorTo('#tt6957966_arrow');
        I.saveScreenshot('9search_onMouse_ToArrow.png')
        I.wait(1);
        I.click('#tt6957966_arrow')
        I.wait(1);
        I.see('Don’t know what to search?','h2');
});
