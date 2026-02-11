import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Window related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Calendar"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Calendar"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" My time is precious & your? ");
    await page.locator('a[href="/calendar"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot"); 

    //Select your Birthday
    await page.locator('[id="birthday"]').fill("1993-12-12");
    await expect(page.locator('p[class^="label"]')).toBeVisible();
    await attachScreenshot(page, testInfo, "Finished Screenshot");
})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string="Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: "image/png",
    })
}