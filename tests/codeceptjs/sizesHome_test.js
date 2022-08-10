Feature('Compare different screen sizes');

Scenario('Browse homepage and take screenshots of different sizes', async ({ I }) => {
        const sizes = [[375,812],[414,896],[768,1024],[1024,1366],[1280,720],[1280,800],[1680,1050],[1920,1080],[2560,1440]]
        I.amOnPage('/');
        I.seeElement('#whatsin');
        sizes.forEach(([width,height])=> {
            I.resizeWindow(width,height)
            I.wait(1)
            I.saveScreenshot(`Page1_${width}x${height}.png`)
        })
        I.fillField('input','italy');
        I.pressKey('Enter');
        I.waitForElement("#tt6957966",5);
        sizes.forEach(([width,height])=> {
            I.resizeWindow(width,height)
            I.wait(1)
            I.saveScreenshot(`Page1_get_${width}x${height}.png`)
        })
});


