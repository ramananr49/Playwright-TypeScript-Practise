import { expect, test, Page, TestInfo } from "@playwright/test";

const slider_values = ["5", "10", "15"];

for (const value of slider_values) {

    test(`Handling Slider element Scenario in PW_TS - Slider Value ${value}`, async ({page}, testInfo) => {
        await page.goto('https://letcode.in/');
        await page.locator('a[id="testing"][href="/test"]').click();
        await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Slider"]')).toBeVisible();
        const input_content = await page.locator('//*[normalize-space()="Slider"]/parent::header/following-sibling::div//p').textContent();
        await expect(input_content).toContain(" Hmm.. Can you slide me? ");
        await page.locator('a[href="/slider"]').click();
        await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
        await attachScreenshot(page, testInfo, "Landing Page Screenshot");
        await page.waitForLoadState('domcontentloaded');

        /*Move the slider between 1 to 50
        Click on the get countries button
        Validate that countries are generated based on slider values    
        */
        await page.locator('[id="generate"]').fill(value);
        await page.getByRole("button", {name:"Get Countries"}).click();
        const countries = await page.locator('p[class="has-text-primary-light"]').textContent();
        const country = countries?.split(" - ");
        console.log(country);
        console.log(country?.length);
        await expect(country?.length).toEqual(parseInt(value));

        await attachScreenshot(page, testInfo, "Completion Screenshot")

})

}



async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name:string="Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png',
    })
}