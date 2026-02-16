import { expect, test, TestInfo , Page} from "@playwright/test";

test("Hanlding File upload download scenario in PW_TS", async ({page}, testInfo) => {
    
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Shadow"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Shadow"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Shadow never leaves us alone ");
    await page.locator('a[href="/shadow"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");
    await page.waitForLoadState('domcontentloaded');


    const shadowdomLocator = await page.locator('#open-shadow');
    await shadowdomLocator.locator('[id="fname"]').fill("Hemanth Kumar");
    await attachScreenshot(page, testInfo, "Verification Page Screenshot");


})


async function attachScreenshot(page: Page, testInfo: TestInfo, name: string="Screenshot") {
    
    const ss = await page.screenshot()
    testInfo.attach(name, {
        body: ss,
        contentType: 'image/png'
    })
}