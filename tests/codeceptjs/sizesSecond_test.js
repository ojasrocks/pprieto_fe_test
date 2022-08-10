Feature('Compare different screen sizes | movie ');

Scenario('Browse movie details page and take screenshots of different sizes', async ({ I }) => {
        const sizes = [[375,812],[414,896],[768,1024],[1024,1366],[1280,720],[1280,800],[1680,1050],[1920,1080],[2560,1440]]
        I.amOnPage('/');
        I.seeElement('#whatsin');
        I.fillField('input','italy');
        I.pressKey('Enter');
        I.waitForElement("#tt6957966",5);
        I.moveCursorTo('#tt6957966');
        I.waitForElement("#tt6957966_toclick",1)
        I.click('#tt6957966_toclick');
        I.wait(2)
        I.waitForElement('#tt6957966_data',2)
        sizes.forEach(([width,height])=> {
            I.resizeWindow(width,height)
            I.wait(1)
            I.saveScreenshot(`Page2_${width}x${height}.png`)
        })
        I.wait(1)
});


