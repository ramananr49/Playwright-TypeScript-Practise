import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Window related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Window"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Window"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Switch different types of tabs or windows ");
    await page.locator('a[href="/window"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot"); 
    
    //Goto Home
    console.log(`Before URL : ${await page.url()}`);
    console.log(`Before Title : ${await page.title()}`);
    const [newtabs] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('[id="home"]').click(),
    ])
    await newtabs.waitForLoadState();
    console.log(`After URL : ${await newtabs.url()}`);
    console.log(`After Title : ${await newtabs.title()}`);
    await attachScreenshot(newtabs, testInfo, "Before Closing Screenshot");
    await newtabs.close();
    await page.bringToFront();
    await attachScreenshot(page, testInfo, "After Closing Screenshot");

    //Open muiltple windows
    console.log("*****Multi tab*********");
    await page.locator('[id="multi"]').click();
    await page.waitForTimeout(4000);
    const allPages = await page.context().pages();
    

    console.log(`Total Pages count is ${await allPages.length}`);

    for (let tab of allPages) {
        await tab.waitForLoadState('domcontentloaded');
        await tab.bringToFront();
        console.log(await tab.title());
        console.log(await tab.url());
    }
})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string="Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: "image/png",
    })
}