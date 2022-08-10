Feature('404 page');

Scenario('Wrong imbdID -> 404 not found page', async ({ I }) => {
        I.amOnPage('/posts/c45u4l1mdb1D');
        I.see('404','h1');
        I.see('This page could not be found.','h2');
        I.wait(1)
});
