import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling waits Scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Waits"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Waits"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" It's ok to wait but you know.. ");
    await page.locator('a[href="/waits"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");
    await page.waitForLoadState('domcontentloaded');

    //Accept the Alert
    const dislogPromise = page.waitForEvent("dialog");
    await page.getByRole("button", {name:"Simple Alert"}).click();
    const dialog = await dislogPromise;
    console.log(dialog.message());
    dialog.accept();


})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name:string="Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png',
    })
}