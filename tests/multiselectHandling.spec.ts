import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Multi Select element Scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Multi-Select"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Multi-Select"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Be a multi-tasker ");
    await page.locator('a[href="/selectable"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");
    await page.waitForLoadState('domcontentloaded');

    //Let's select 😉 all
    const common_ele = await page.locator('[class="list-container"] [class^="ng-star-inserted"]');
    const ele_count = await common_ele.count();

    for (let i=0; i<ele_count; i++) {
        await expect(common_ele.nth(i)).not.toContainClass('selected');
        await common_ele.nth(i).click();
        await expect(common_ele.nth(i)).toContainClass('selected');
        console.log(await common_ele.nth(i).textContent());
    }
    await page.waitForTimeout(1000);
    await attachScreenshot(page, testInfo, "After selecting Screenshot");

    for (let j=0; j<ele_count; j++) {
        await expect(common_ele.nth(j)).toContainClass('selected');
        await common_ele.nth(j).click();
        await expect(common_ele.nth(j)).not.toContainClass('selected');
    }
    await attachScreenshot(page, testInfo, "After de-selecting Screenshot");
})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name:string="Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png',
    })
}